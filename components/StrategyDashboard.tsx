
import React from 'react';
import { GameState } from '../types';
import BudgetAllocation from './strategy/BudgetAllocation';
import ProjectScope from './strategy/ProjectScope';
import TimelineManagement from './strategy/TimelineManagement';
import PublicRelations from './strategy/PublicRelations';

interface StrategyDashboardProps {
  strategy: GameState['strategy'];
  onStrategyChange: React.Dispatch<React.SetStateAction<GameState>>;
}

const StrategyDashboard: React.FC<StrategyDashboardProps> = ({ strategy, onStrategyChange }) => {
    
    const handleUpdate = <T extends keyof GameState['strategy']>(
        category: T, 
        field: keyof GameState['strategy'][T], 
        value: any
    ) => {
        onStrategyChange(prevState => ({
            ...prevState,
            strategy: {
                ...prevState.strategy,
                [category]: {
                    ...prevState.strategy[category],
                    [field]: value
                }
            }
        }));
    };
    
    const handleBudgetUpdate = (field: keyof GameState['strategy']['budgetAllocation'], value: number) => {
         onStrategyChange(prevState => {
            const currentAllocation = { ...prevState.strategy.budgetAllocation };
            const oldValue = currentAllocation[field];
            const diff = value - oldValue;

            // Simple redistribution logic: take from other sliders proportionally
            let totalOther = 100 - oldValue;
            if (totalOther <= 0) { // Avoid division by zero if this is the only slider at 100%
                // This case is tricky, for now, we just cap it. A more robust solution would be needed for complex scenarios.
                 currentAllocation[field] = Math.min(100, Math.max(0, value));
                 return {...prevState, strategy: {...prevState.strategy, budgetAllocation: currentAllocation}};
            }
            
            currentAllocation[field] = value;
            
            let sum = 0;
            for (const key in currentAllocation) {
                 if (key !== field) {
                    const k = key as keyof typeof currentAllocation;
                    const share = (currentAllocation[k] / totalOther);
                    currentAllocation[k] -= diff * share;
                 }
            }
            
            // Normalize to ensure it sums to 100
            // FIX: Assert the result of Object.values to be number[] to ensure type safety in the reduce function.
            sum = (Object.values(currentAllocation) as number[]).reduce((acc: number, v) => acc + v, 0);
            if (sum !== 100) {
                 const normalizationFactor = 100 / sum;
                 for (const key in currentAllocation) {
                    const k = key as keyof typeof currentAllocation;
                    currentAllocation[k] *= normalizationFactor;
                    currentAllocation[k] = Math.round(currentAllocation[k]);
                 }
            }
            // Final check to ensure it's exactly 100 due to rounding
             // FIX: Assert the result of Object.values to be number[] to ensure type safety in the reduce function.
             sum = (Object.values(currentAllocation) as number[]).reduce((acc: number, v) => acc + v, 0);
             if (sum !== 100) {
                const keys = Object.keys(currentAllocation) as (keyof typeof currentAllocation)[];
                currentAllocation[keys[0]] += 100 - sum;
             }


            return {
                ...prevState,
                strategy: {
                    ...prevState.strategy,
                    budgetAllocation: currentAllocation
                }
            };
        });
    };
    
    const handleMitigationMeasuresChange = (measure: string, checked: boolean) => {
        onStrategyChange(prevState => {
            const currentMeasures = prevState.strategy.projectScope.mitigationMeasures;
            const newMeasures = checked
                ? [...currentMeasures, measure]
                : currentMeasures.filter(m => m !== measure);
            return {
                ...prevState,
                strategy: {
                    ...prevState.strategy,
                    projectScope: {
                        ...prevState.strategy.projectScope,
                        mitigationMeasures: newMeasures
                    }
                }
            };
        });
    };

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-blue-300 border-b-2 border-blue-500/30 pb-3">Project Strategy Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BudgetAllocation 
            budgetAllocation={strategy.budgetAllocation} 
            onUpdate={handleBudgetUpdate} 
        />
        <ProjectScope 
            projectScope={strategy.projectScope}
            onScopeUpdate={(field, value) => handleUpdate('projectScope', field, value)}
            onMitigationChange={handleMitigationMeasuresChange}
        />
        <TimelineManagement
            timeline={strategy.timeline}
            onUpdate={(field, value) => handleUpdate('timeline', field, value)}
        />
        <PublicRelations
            publicRelations={strategy.publicRelations}
            onUpdate={(field, value) => handleUpdate('publicRelations', field, value)}
        />
      </div>
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

export default StrategyDashboard;