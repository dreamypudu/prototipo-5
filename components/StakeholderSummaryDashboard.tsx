import React, { useState, useEffect } from 'react';
import { GameState, Stakeholder } from '../types';
import DetailedView from './summary/DetailedView';
import { StatBar, SupportBar } from './summary/MiniBars';
import { SECRETARY_ROLE } from '../constants';

interface StakeholderSummaryDashboardProps {
    gameState: GameState;
    secretaryRole?: string;
}

const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 3.001-1.742 3.001H4.42c-1.53 0-2.493-1.667-1.743-3.001l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);


const OverviewList: React.FC<{ stakeholders: Stakeholder[], onSelect: (stakeholder: Stakeholder) => void, secretaryRole: string }> = ({ stakeholders, onSelect, secretaryRole }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stakeholders.filter(s => s.role !== secretaryRole).map(sh => (
                <button
                    key={sh.name}
                    onClick={() => onSelect(sh)}
                    className={`bg-gray-900/50 p-4 rounded-lg border hover:bg-gray-800/60 transition-all text-left flex flex-col justify-between
                        ${sh.status === 'critical' ? 'border-red-500/80 hover:border-red-400' : 'border-gray-700 hover:border-blue-500'}
                    `}
                >
                    <div>
                        <div className="flex items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3">
                                <img src={sh.portraitUrl} alt={sh.name} className="w-14 h-14 rounded-full border-2 border-gray-600 object-cover" />
                                <div>
                                    <p className="font-semibold text-white">{sh.name}</p>
                                    <p className="text-sm text-gray-400">{sh.role}</p>
                                </div>
                            </div>
                            {sh.status === 'critical' && <WarningIcon />}
                        </div>
                        <div className="space-y-2">
                            <StatBar label="Trust" value={sh.trust} colorClass="bg-sky-500" />
                            <SupportBar value={sh.support} />
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-3 text-right">
                        Last Met: Day {sh.lastMetDay || 'N/A'}
                    </div>
                </button>
            ))}
        </div>
    );
}

const StakeholderSummaryDashboard: React.FC<StakeholderSummaryDashboardProps> = ({ gameState, secretaryRole }) => {
    const [selectedStakeholder, setSelectedStakeholder] = useState<Stakeholder | null>(null);
    const roleToHide = secretaryRole ?? SECRETARY_ROLE;

    useEffect(() => {
        // If a stakeholder is selected, check if its data has been updated in the main gameState
        // and update the local state to reflect the latest information. This prevents stale data
        // from being shown in the detailed view after an interaction.
        if (selectedStakeholder) {
            const updatedStakeholder = gameState.stakeholders.find(s => s.name === selectedStakeholder.name);
            if (updatedStakeholder) {
                setSelectedStakeholder(updatedStakeholder);
            }
        }
    }, [gameState.stakeholders]);


    return (
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 animate-fade-in">
            {selectedStakeholder ? (
                <DetailedView
                    stakeholder={selectedStakeholder}
                    gameState={gameState}
                    onBack={() => setSelectedStakeholder(null)}
                />
            ) : (
                <>
                    <h2 className="text-3xl font-bold mb-6 text-blue-300 border-b-2 border-blue-500/30 pb-3">Stakeholder Summary</h2>
                    <OverviewList stakeholders={gameState.stakeholders} onSelect={setSelectedStakeholder} secretaryRole={roleToHide} />
                </>
            )}
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.5s ease-in forwards; }
            `}</style>
        </div>
    );
};

export default StakeholderSummaryDashboard;
