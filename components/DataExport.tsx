
import React, { useState } from 'react';
import { DecisionLogEntry, ProcessLogEntry, PlayerActionLogEntry, MechanicEvent, CanonicalAction, ExpectedAction, QuestionLogEntry } from '../types';
import { SessionExport } from '../services/sessionExport';

interface DataExportProps {
    decisionLog: DecisionLogEntry[];
    processLog: ProcessLogEntry[];
    playerActionsLog: PlayerActionLogEntry[];
    mechanicEvents: MechanicEvent[];
    canonicalActions: CanonicalAction[];
    expectedActions: ExpectedAction[];
    questionLog: QuestionLogEntry[];
    sessionExport: SessionExport;
}

const DataExport: React.FC<DataExportProps> = ({ 
    decisionLog, processLog, playerActionsLog, 
    mechanicEvents, canonicalActions, expectedActions, questionLog, sessionExport
}) => {

    const downloadJSON = (data: any, filename: string) => {
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(data, null, 2)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = filename;
        link.click();
    };
    const hasSessionData = decisionLog.length > 0 || canonicalActions.length > 0 || expectedActions.length > 0 || mechanicEvents.length > 0 || processLog.length > 0 || questionLog.length > 0;
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const [sendStatus, setSendStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [sendError, setSendError] = useState<string | null>(null);

    const handleSendSession = async () => {
        if (!hasSessionData || sendStatus === 'sending') return;
        setSendStatus('sending');
        setSendError(null);
        try {
            const url = `${apiBaseUrl.replace(/\/$/, '')}/sessions`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(sessionExport)
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `Request failed (${response.status})`);
            }
            setSendStatus('success');
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            setSendStatus('error');
            setSendError(message);
        }
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 animate-fade-in custom-scrollbar overflow-y-auto max-h-full">
            <h2 className="text-3xl font-bold mb-6 text-blue-300 border-b-2 border-blue-500/30 pb-3">Centro de Exportación de Datos</h2>
            <p className="text-gray-400 mb-8 max-w-3xl">
                Descargue los datasets generados durante la sesión. Estos archivos contienen la telemetría rica y las acciones canónicas para análisis psicométrico y machine learning.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* 0. Session Export */}
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 flex flex-col">
                    <h3 className="text-xl font-bold text-indigo-300">Sesion Completa</h3>
                    <p className="text-xs text-gray-500 mt-2 mb-4 flex-grow italic">
                        Paquete unificado con metadata, decisiones, eventos, acciones y comparaciones.
                    </p>
                    <button
                        onClick={() => downloadJSON(sessionExport, "session_export.json")}
                        disabled={!hasSessionData}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 rounded-lg disabled:opacity-50"
                    >
                        JSON: Sesion
                    </button>
                    <button
                        onClick={handleSendSession}
                        disabled={!hasSessionData || sendStatus === 'sending'}
                        className="w-full mt-3 bg-indigo-700 hover:bg-indigo-600 text-white font-bold py-2 rounded-lg disabled:opacity-50"
                    >
                        {sendStatus === 'sending' ? 'Enviando...' : 'Enviar sesion'}
                    </button>
                    {sendStatus === 'success' && (
                        <p className="text-xs text-green-400 mt-2">Sesion enviada.</p>
                    )}
                    {sendStatus === 'error' && (
                        <p className="text-xs text-red-400 mt-2">Error al enviar: {sendError}</p>
                    )}
                </div>

                
                {/* 1. Decisiones Explícitas */}
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 flex flex-col">
                    <h3 className="text-xl font-bold text-blue-300">Decisiones Explícitas</h3>
                    <p className="text-xs text-gray-500 mt-2 mb-4 flex-grow italic">
                        "Lo que el usuario DIJO". Registro de opciones elegidas en diálogos y sus consecuencias declaradas.
                    </p>
                    <button
                        onClick={() => downloadJSON(decisionLog, "explicit_decisions.json")}
                        disabled={decisionLog.length === 0}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-lg disabled:opacity-50"
                    >
                        JSON: Decisiones ({decisionLog.length})
                    </button>
                </div>

                {/* 2. Expected Actions */}
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 flex flex-col">
                    <h3 className="text-xl font-bold text-yellow-300">Expected Actions</h3>
                    <p className="text-xs text-gray-500 mt-2 mb-4 flex-grow italic">
                        "Lo que el usuario DEBERÍA hacer". Acciones esperadas derivadas de sus decisiones previas.
                    </p>
                    <button
                        onClick={() => downloadJSON(expectedActions, "expected_actions.json")}
                        disabled={expectedActions.length === 0}
                        className="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 rounded-lg disabled:opacity-50"
                    >
                        JSON: Expectativas ({expectedActions.length})
                    </button>
                </div>

                {/* 3. Canonical Actions */}
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 flex flex-col">
                    <h3 className="text-xl font-bold text-green-300">Canonical Actions</h3>
                    <p className="text-xs text-gray-500 mt-2 mb-4 flex-grow italic">
                        "Lo que el usuario HIZO (estandarizado)". Acciones concretas realizadas en las mecánicas.
                    </p>
                    <button
                        onClick={() => downloadJSON(canonicalActions, "canonical_actions.json")}
                        disabled={canonicalActions.length === 0}
                        className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2 rounded-lg disabled:opacity-50"
                    >
                        JSON: Acciones ({canonicalActions.length})
                    </button>
                </div>

                {/* 4. Mechanic Events (Log Rico) */}
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 flex flex-col">
                    <h3 className="text-xl font-bold text-purple-300">Mechanic Events</h3>
                    <p className="text-xs text-gray-500 mt-2 mb-4 flex-grow italic">
                        Telemetría cruda (clicks, drags, tiempos) por mecánica. Oro puro para modelos de ML.
                    </p>
                    <button
                        onClick={() => downloadJSON(mechanicEvents, "mechanic_events.json")}
                        disabled={mechanicEvents.length === 0}
                        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 rounded-lg disabled:opacity-50"
                    >
                        JSON: Telemetría ({mechanicEvents.length})
                    </button>
                </div>

                {/* 5. Process Log */}
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 flex flex-col">
                    <h3 className="text-xl font-bold text-teal-300">Process Data</h3>
                    <p className="text-xs text-gray-500 mt-2 mb-4 flex-grow italic">
                        Micro-análisis del proceso de decisión en cada nodo (hovering, dudas, tiempo de lectura).
                    </p>
                    <button
                        onClick={() => downloadJSON(processLog, "process_log.json")}
                        disabled={processLog.length === 0}
                        className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 rounded-lg disabled:opacity-50"
                    >
                        JSON: Proceso ({processLog.length})
                    </button>
                </div>



                {/* 6. NPC Questions */}
                <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700 flex flex-col">
                    <h3 className="text-xl font-bold text-pink-300">Preguntas a NPC</h3>
                    <p className="text-xs text-gray-500 mt-2 mb-4 flex-grow italic">
                        Registro de preguntas realizadas, requisitos y contexto al momento de preguntar.
                    </p>
                    <button
                        onClick={() => downloadJSON(questionLog, "npc_questions.json")}
                        disabled={questionLog.length === 0}
                        className="w-full bg-pink-600 hover:bg-pink-500 text-white font-bold py-2 rounded-lg disabled:opacity-50"
                    >
                        JSON: Preguntas ({questionLog.length})
                    </button>
                </div>
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

export default DataExport;
