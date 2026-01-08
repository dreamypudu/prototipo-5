
import React, { useState, useMemo } from 'react';
import { scenarios } from '../data/scenarios';
import { GameState, TimeSlotType, MeetingSequence, ScenarioNode } from '../types';
import { TIME_SLOTS, getGameDate } from '../constants';

// --- TYPES ---

type LaneType = 'PROACTIVE' | 'INEVITABLE' | 'CONTINGENCY';
type AvailabilityStatus = 'PLAYED' | 'AVAILABLE' | 'BLOCKED' | 'MISSED';

interface MapNode {
    id: string;
    title: string;
    description: string;
    stakeholderId?: string;
    stakeholderName?: string;
    lane: LaneType;
    trigger: string;
    sequenceData?: MeetingSequence;
}

interface ScenarioSchedule {
    [nodeId: string]: { day: number; slot: TimeSlotType };
}

// --- HELPER LOGIC ---

const getNodesForTimeBlock = (
    day: number, 
    slot: TimeSlotType, 
    schedule: ScenarioSchedule
): MapNode[] => {
    const nodes: MapNode[] = [];
    
    // Iterate through schedule to find nodes matching current view
    Object.entries(schedule).forEach(([id, time]) => {
        if (time.day === day && time.slot === slot) {
            // Reconstruct MapNode based on ID (In a real app, this would be a lookup)
            
            // 1. Try finding in Sequences
            const sequence = scenarios.sequences.find(s => s.sequence_id === id);
            if (sequence) {
                let lane: LaneType = 'PROACTIVE';
                
                // Logic to determine Lane based on sequence properties
                if (sequence.isInevitable) {
                    lane = 'INEVITABLE';
                }
                
                nodes.push({
                    id: id,
                    title: `Secuencia: ${sequence.stakeholderRole}`,
                    description: sequence.initialDialogue.substring(0, 60) + "...",
                    stakeholderName: sequence.stakeholderRole,
                    lane: lane,
                    trigger: sequence.isInevitable ? 'Evento Obligatorio (Automático)' : 'Jugador inicia reunión',
                    sequenceData: sequence
                });
                return;
            }

            // 2. Mock Nodes (Static definitions for demo/fallback)
            if (id === 'EVENT_STORM') {
                nodes.push({
                    id: 'EVENT_STORM',
                    title: 'Alerta Meteorológica',
                    description: 'Lluvia intensa en Sector Amarillo.',
                    lane: 'CONTINGENCY',
                    trigger: 'Clima = Lluvia'
                });
            } else if (id === 'AZUL_MEETING_BLOCKED') {
                nodes.push({
                    id: 'AZUL_MEETING_BLOCKED',
                    title: 'Visita Dr. Guzmán (Bloqueada)',
                    description: 'Guzmán está en seminario externo.',
                    stakeholderName: 'Dr. Guzmán',
                    lane: 'PROACTIVE',
                    trigger: 'Jugador visita Sector Azul'
                });
            }
        }
    });

    return nodes;
};

const checkAvailability = (node: MapNode, gameState: GameState, day: number, slot: TimeSlotType): AvailabilityStatus => {
    // 1. Check if played
    const wasPlayed = node.sequenceData 
        ? gameState.completedSequences.includes(node.sequenceData.sequence_id)
        : false;

    if (wasPlayed) return 'PLAYED';

    // 2. Check if blocked
    if (node.id === 'AZUL_MEETING_BLOCKED') return 'BLOCKED';

    // 3. Check if missed (Past time in real game state)
    // IMPORTANT: The map allows viewing future/past, but "Missed" depends on the actual Game State progress
    // If the node is scheduled for Day 1 AM, and Game State is Day 1 PM, it is missed.
    const nodeTimeValue = day * 10 + (slot === 'mañana' ? 1 : 2);
    const gameTimeValue = gameState.day * 10 + (gameState.timeSlot === 'mañana' ? 1 : 2);

    if (nodeTimeValue < gameTimeValue) {
        return 'MISSED';
    }

    return 'AVAILABLE';
};

// --- MODALS ---

const ScenarioDetailModal: React.FC<{ 
    node: MapNode; 
    gameState: GameState; 
    onClose: () => void; 
}> = ({ node, gameState, onClose }) => {
    
    // Helper to find the decision made for a specific dialogue node
    const getDecisionForNode = (nodeId: string) => {
        return gameState.decisionLog.find(log => log.nodeId === nodeId);
    };

    const renderSequenceTree = (sequence: MeetingSequence) => {
        return (
            <div className="space-y-8 relative">
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gray-700 -z-10"></div>
                
                {/* Initial Dialogue */}
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-900 border-2 border-blue-500 flex items-center justify-center shrink-0 z-10">
                        <span className="text-xl">💬</span>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg border border-gray-600 flex-grow">
                        <h4 className="text-blue-300 text-sm font-bold mb-1">Inicio de Interacción</h4>
                        <p className="text-gray-300 italic text-sm">"{sequence.initialDialogue}"</p>
                    </div>
                </div>

                {/* Nodes Loop */}
                {sequence.nodes.map((scenarioId, index) => {
                    const scenarioData = scenarios.scenarios.find(s => s.node_id === scenarioId);
                    if (!scenarioData) return null;

                    const decision = getDecisionForNode(scenarioId);
                    const isResolved = !!decision;

                    return (
                        <div key={scenarioId} className="flex gap-4">
                             <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 z-10 transition-colors
                                ${isResolved ? 'bg-green-900 border-green-500 text-green-300' : 'bg-gray-800 border-gray-600 text-gray-500'}
                             `}>
                                <span className="text-lg font-bold">{index + 1}</span>
                            </div>
                            
                            <div className="flex-col flex-grow gap-4">
                                {/* The Question */}
                                <div className={`p-4 rounded-lg border ${isResolved ? 'bg-green-900/10 border-green-900' : 'bg-gray-800/50 border-gray-700'} mb-2`}>
                                    <h5 className="text-xs uppercase text-gray-500 font-bold mb-1">Nodo: {scenarioId}</h5>
                                    <p className="text-gray-200 text-sm">{scenarioData.dialogue}</p>
                                </div>

                                {/* The Options */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-4 border-l-2 border-gray-700">
                                    {scenarioData.options.map(opt => {
                                        const wasChosen = decision?.choiceId === opt.option_id;
                                        const isIgnored = isResolved && !wasChosen;

                                        return (
                                            <div key={opt.option_id} className={`p-3 rounded border text-xs relative overflow-hidden
                                                ${wasChosen 
                                                    ? 'bg-green-600/20 border-green-500 text-white' 
                                                    : isIgnored 
                                                        ? 'bg-gray-900/30 border-gray-800 text-gray-600' 
                                                        : 'bg-gray-800 border-gray-600 text-gray-400'}
                                            `}>
                                                {wasChosen && <div className="absolute top-0 right-0 bg-green-500 text-black px-2 py-0.5 text-[10px] font-bold">ELEGIDO</div>}
                                                <span className="font-bold mr-1">{opt.option_id})</span>
                                                {opt.text}
                                                
                                                <div className="mt-2 pt-2 border-t border-dashed border-white/10 flex gap-2 text-[10px] opacity-70">
                                                    {Object.entries(opt.consequences).map(([key, val]) => {
                                                         if (key === 'dialogueResponse') return null;
                                                         return <span key={key} className={val > 0 ? 'text-green-400' : 'text-red-400'}>{key}: {val}</span>
                                                    })}
                                                </div>
                                                {/* Bridge Response (Consequence) */}
                                                 <div className="mt-1 text-[10px] italic text-blue-200/60">
                                                    " {opt.consequences.dialogueResponse.substring(0, 50)}... "
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* Final Dialogue */}
                 <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-900 border-2 border-gray-700 flex items-center justify-center shrink-0 z-10">
                        <span className="text-xl">🏁</span>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 border-dashed flex-grow">
                        <h4 className="text-gray-500 text-sm font-bold mb-1">Cierre de Secuencia</h4>
                        <p className="text-gray-400 italic text-sm">"{sequence.finalDialogue}"</p>
                    </div>
                </div>

            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in backdrop-blur-sm">
            <div className="bg-gray-900 rounded-xl border border-gray-600 w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center bg-gray-800/50 rounded-t-xl">
                    <div>
                        <h3 className="text-2xl font-bold text-blue-300">Diagrama de Escenario</h3>
                        <p className="text-gray-400 text-sm">Inspeccionando estructura narrativa y decisiones tomadas.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl font-bold px-3">&times;</button>
                </div>
                
                <div className="flex-grow overflow-y-auto p-6 bg-gray-900 custom-scrollbar">
                    {node.sequenceData ? (
                        renderSequenceTree(node.sequenceData)
                    ) : (
                         <div className="flex flex-col items-center justify-center h-full text-gray-500">
                             <span className="text-4xl mb-4">🚧</span>
                             <p>Este nodo es un evento simple o bloqueado y no tiene un árbol de decisión complejo.</p>
                             <p className="text-sm mt-2">ID: {node.id}</p>
                         </div>
                    )}
                </div>
                
                <div className="p-4 border-t border-gray-700 bg-gray-800/30 flex justify-end">
                    <button onClick={onClose} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold">Cerrar Inspector</button>
                </div>
            </div>
        </div>
    );
};

const RescheduleModal: React.FC<{
    node: MapNode;
    onConfirm: (day: number, slot: TimeSlotType) => void;
    onClose: () => void;
}> = ({ node, onConfirm, onClose }) => {
    const [day, setDay] = useState(1);
    const [slot, setSlot] = useState<TimeSlotType>('mañana');

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-600 shadow-xl w-80">
                <h4 className="text-lg font-bold text-white mb-4">Reprogramar Evento</h4>
                <p className="text-sm text-gray-400 mb-4">{node.title}</p>
                
                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-xs uppercase text-gray-500 font-bold mb-1">Día</label>
                        <select 
                            value={day} 
                            onChange={(e) => setDay(Number(e.target.value))}
                            className="w-full bg-gray-900 border border-gray-700 text-white rounded p-2"
                        >
                            {[1,2,3,4,5,6,7].map(d => (
                                <option key={d} value={d}>Día {d}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs uppercase text-gray-500 font-bold mb-1">Bloque</label>
                         <select 
                            value={slot} 
                            onChange={(e) => setSlot(e.target.value as TimeSlotType)}
                            className="w-full bg-gray-900 border border-gray-700 text-white rounded p-2"
                        >
                            {TIME_SLOTS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="px-3 py-1 text-sm text-gray-400 hover:text-white">Cancelar</button>
                    <button 
                        onClick={() => { onConfirm(day, slot); onClose(); }} 
                        className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white text-sm font-bold rounded"
                    >
                        Mover
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- SUB-COMPONENTS ---

const TimelineHeader: React.FC<{ 
    selectedDay: number; 
    selectedSlot: TimeSlotType; 
    onSelect: (day: number, slot: TimeSlotType) => void 
}> = ({ selectedDay, selectedSlot, onSelect }) => {
    const days = [1, 2, 3, 4, 5]; 
    
    return (
        <div className="flex flex-col gap-2 mb-6 bg-gray-900/50 p-4 rounded-xl border border-gray-700">
            <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Línea de Tiempo Experimental</h3>
                <span className="text-[10px] bg-gray-800 px-2 py-1 rounded text-gray-500">Modo Debug: Activo</span>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {days.map(day => {
                    const date = getGameDate(day);
                    return (
                        <div key={day} className="flex flex-col gap-1 shrink-0">
                            <span className="text-xs text-center font-mono text-gray-500">{date.dayName}</span>
                            <div className="flex bg-gray-800 rounded-lg border border-gray-600 overflow-hidden">
                                {TIME_SLOTS.map(slot => {
                                    const isSelected = selectedDay === day && selectedSlot === slot;
                                    return (
                                        <button
                                            key={slot}
                                            onClick={() => onSelect(day, slot)}
                                            className={`px-4 py-2 text-sm font-bold transition-all ${
                                                isSelected 
                                                    ? 'bg-blue-600 text-white shadow-inner' 
                                                    : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                            }`}
                                        >
                                            {slot === 'mañana' ? 'AM' : 'PM'}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const NodeCard: React.FC<{ 
    node: MapNode; 
    status: AvailabilityStatus;
    onClick: () => void;
    onReschedule: () => void;
}> = ({ node, status, onClick, onReschedule }) => {
    
    const getStatusStyles = () => {
        switch (status) {
            case 'PLAYED':
                return 'border-green-500 bg-green-900/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
            case 'AVAILABLE':
                return 'border-blue-500/50 bg-gray-800 hover:border-blue-400 hover:bg-gray-700 cursor-pointer';
            case 'MISSED':
                return 'border-gray-700 bg-gray-900/50 text-gray-500 opacity-70 cursor-pointer'; // Still clickable to see what happened
            case 'BLOCKED':
                return 'border-red-900/50 bg-red-900/10 opacity-60 cursor-pointer';
            default:
                return 'border-gray-700 bg-gray-800';
        }
    };

    const getIcon = () => {
        if (status === 'BLOCKED') return '🔒';
        if (node.lane === 'PROACTIVE') return '📍';
        if (node.lane === 'INEVITABLE') return '🚨';
        if (node.lane === 'CONTINGENCY') return '⚡';
        return '•';
    };

    return (
        <div 
            onClick={onClick}
            className={`relative p-4 rounded-lg border-l-4 transition-all duration-300 ${getStatusStyles()} flex flex-col gap-2 min-h-[100px] group`}
        >
            {/* Header */}
            <div className="flex justify-between items-start">
                <span className="text-2xl">{getIcon()}</span>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${status === 'PLAYED' ? 'bg-green-900 text-green-300' : 'bg-gray-900 text-gray-500'}`}>
                    {status}
                </span>
            </div>
            
            {/* Content */}
            <div>
                <h4 className={`font-bold text-sm ${status === 'MISSED' ? 'text-gray-500' : 'text-gray-200'}`}>
                    {node.title}
                </h4>
                {node.stakeholderName && (
                    <p className="text-xs text-blue-300/80">{node.stakeholderName}</p>
                )}
            </div>

            <p className="text-xs text-gray-400 leading-tight">
                {node.description}
            </p>

            {/* Trigger Info */}
            <div className="mt-2 pt-2 border-t border-gray-700/50 flex justify-between items-end">
                <p className="text-[10px] font-mono text-gray-500 truncate max-w-[70%]">
                    Trigger: {node.trigger}
                </p>
                
                {/* Manual Reschedule Button (Visible on Hover in Debug Mode) */}
                <button 
                    onClick={(e) => { e.stopPropagation(); onReschedule(); }}
                    className="p-1 rounded bg-gray-700 hover:bg-yellow-600 text-gray-300 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                    title="Mover manualmente (Debug)"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </button>
            </div>
            
            {status === 'BLOCKED' && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px] rounded-lg pointer-events-none">
                    <span className="bg-black/80 text-red-400 text-xs px-2 py-1 rounded border border-red-900">
                        Bloqueado
                    </span>
                </div>
            )}
        </div>
    );
};

const Lane: React.FC<{ 
    title: string; 
    nodes: MapNode[]; 
    gameState: GameState; 
    day: number; 
    slot: TimeSlotType;
    onNodeClick: (node: MapNode) => void;
    onNodeReschedule: (node: MapNode) => void;
}> = ({ title, nodes, gameState, day, slot, onNodeClick, onNodeReschedule }) => {
    return (
        <div className="flex-1 min-w-[300px] flex flex-col bg-gray-900/30 rounded-xl border border-gray-800/50">
            <div className="p-3 border-b border-gray-700/50 bg-gray-800/20 rounded-t-xl">
                <h3 className="text-sm font-bold text-gray-300 text-center uppercase tracking-wider">{title}</h3>
            </div>
            <div className="p-4 space-y-4 flex-grow">
                {nodes.length === 0 ? (
                    <div className="h-full flex items-center justify-center opacity-30">
                        <span className="text-2xl text-gray-600">∅</span>
                    </div>
                ) : (
                    nodes.map(node => (
                        <NodeCard 
                            key={node.id} 
                            node={node} 
                            status={checkAvailability(node, gameState, day, slot)} 
                            onClick={() => onNodeClick(node)}
                            onReschedule={() => onNodeReschedule(node)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

// --- MAIN COMPONENT ---

const ExperimentalMap: React.FC<{ gameState: GameState, onUpdateScenarioSchedule: (id: string, day: number, slot: TimeSlotType) => void }> = ({ gameState, onUpdateScenarioSchedule }) => {
    const [selectedDay, setSelectedDay] = useState<number>(gameState.day);
    const [selectedSlot, setSelectedSlot] = useState<TimeSlotType>(gameState.timeSlot);
    
    // Modal States
    const [viewingNode, setViewingNode] = useState<MapNode | null>(null);
    const [reschedulingNode, setReschedulingNode] = useState<MapNode | null>(null);

    // Get nodes for the selected timeframe based on GAME STATE schedule
    const nodes = useMemo(() => 
        getNodesForTimeBlock(selectedDay, selectedSlot, gameState.scenarioSchedule), 
    [selectedDay, selectedSlot, gameState.scenarioSchedule]);

    const handleReschedule = (day: number, slot: TimeSlotType) => {
        if (reschedulingNode) {
            onUpdateScenarioSchedule(reschedulingNode.id, day, slot);
            setReschedulingNode(null);
        }
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 animate-fade-in flex flex-col h-full min-h-[600px]">
            {viewingNode && (
                <ScenarioDetailModal 
                    node={viewingNode} 
                    gameState={gameState} 
                    onClose={() => setViewingNode(null)} 
                />
            )}
            {reschedulingNode && (
                <RescheduleModal
                    node={reschedulingNode}
                    onConfirm={handleReschedule}
                    onClose={() => setReschedulingNode(null)}
                />
            )}

            <h2 className="text-3xl font-bold mb-2 text-blue-300">Mapa Experimental: Rutas Condicionales</h2>
            <p className="text-gray-400 mb-6 max-w-4xl">
                Visualizador de la Máquina de Estados. 
                <span className="text-yellow-400 font-bold ml-2">Nuevo:</span> Haz clic en una tarjeta para ver el diagrama de decisiones. 
                Usa el ícono de calendario en la tarjeta para moverla de día.
            </p>

            <TimelineHeader 
                selectedDay={selectedDay} 
                selectedSlot={selectedSlot} 
                onSelect={(d, s) => { setSelectedDay(d); setSelectedSlot(s); }}
            />

            <div className="flex flex-col lg:flex-row gap-6 flex-grow overflow-x-auto pb-4">
                <Lane 
                    title="Interacciones Proactivas" 
                    nodes={nodes.filter(n => n.lane === 'PROACTIVE')} 
                    gameState={gameState}
                    day={selectedDay}
                    slot={selectedSlot}
                    onNodeClick={setViewingNode}
                    onNodeReschedule={setReschedulingNode}
                />
                <Lane 
                    title="Eventos Inevitables" 
                    nodes={nodes.filter(n => n.lane === 'INEVITABLE')} 
                    gameState={gameState}
                    day={selectedDay}
                    slot={selectedSlot}
                    onNodeClick={setViewingNode}
                    onNodeReschedule={setReschedulingNode}
                />
                <Lane 
                    title="Contingencias" 
                    nodes={nodes.filter(n => n.lane === 'CONTINGENCY')} 
                    gameState={gameState}
                    day={selectedDay}
                    slot={selectedSlot}
                    onNodeClick={setViewingNode}
                    onNodeReschedule={setReschedulingNode}
                />
            </div>
            
            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.5s ease-in forwards; }
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { bg: #1f2937; }
                .custom-scrollbar::-webkit-scrollbar-thumb { bg: #4b5563; border-radius: 4px; }
            `}</style>
        </div>
    );
};

export default ExperimentalMap;
