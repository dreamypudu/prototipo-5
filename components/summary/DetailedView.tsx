

import React from 'react';
import { GameState, Stakeholder, ScheduledMeeting } from '../../types';
import RelationshipChart from './RelationshipChart';
import MeetingLog from './MeetingLog';

interface DetailedViewProps {
    stakeholder: Stakeholder;
    gameState: GameState;
    onBack: () => void;
}

const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 3.001-1.742 3.001H4.42c-1.53 0-2.493-1.667-1.743-3.001l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);

const DetailedView: React.FC<DetailedViewProps> = ({ stakeholder, gameState, onBack }) => {
    // We infer the "meetings" from the decision log, as calendar is removed.
    const meetings: ScheduledMeeting[] = gameState.decisionLog
        .filter(entry => entry.stakeholder === stakeholder.name)
        .map(entry => ({
            day: entry.day,
            slot: entry.timeSlot,
            stakeholderName: entry.stakeholder
        }));

    return (
        <div>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <button onClick={onBack} className="text-sm text-blue-400 hover:underline mb-2">&larr; Back to Overview</button>
                    <h2 className="text-3xl font-bold text-blue-300">{stakeholder.name}</h2>
                    <p className="text-gray-400">{stakeholder.role}</p>
                </div>
                <img src={stakeholder.portraitUrl} alt={stakeholder.name} className="w-20 h-20 rounded-full border-2 border-gray-600 object-cover" />
            </div>

             {stakeholder.status === 'critical' && (
                <div className="p-4 mb-6 bg-red-900/50 border-2 border-red-600 rounded-lg text-red-200 flex items-center gap-4">
                    <WarningIcon />
                    <div>
                        <h4 className="font-bold">RELACIÓN CRÍTICA</h4>
                        <p className="text-sm">La confianza con este stakeholder ha caído por debajo del mínimo aceptable. El proyecto está en grave riesgo debido a su falta de apoyo.</p>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Chart */}
                <div className="lg:col-span-2 bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                    <h3 className="text-xl font-bold mb-4 text-blue-300">Relationship Timeline</h3>
                    <div className="w-full h-80">
                         <RelationshipChart 
                            stakeholder={stakeholder}
                            history={gameState.history}
                            meetings={meetings}
                            currentDay={gameState.day}
                         />
                    </div>
                </div>

                {/* Right Column: Notes & Log */}
                <div className="space-y-6">
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                        <h3 className="text-xl font-bold mb-2 text-yellow-300">Known Agenda</h3>
                        <ul className="text-gray-300 text-sm list-disc list-inside space-y-1">
                            {stakeholder.agenda.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                         <h3 className="text-xl font-bold mb-3 text-blue-300">Meeting Log</h3>
                         <MeetingLog meetings={meetings} currentDay={gameState.day} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailedView;