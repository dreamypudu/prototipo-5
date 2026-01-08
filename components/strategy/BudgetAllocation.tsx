import React from 'react';
import { StrategyState } from '../../types';

interface BudgetAllocationProps {
  budgetAllocation: StrategyState['budgetAllocation'];
  onUpdate: (field: keyof StrategyState['budgetAllocation'], value: number) => void;
}

const Slider: React.FC<{ label: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, value, onChange }) => (
    <div>
        <label className="flex justify-between items-center text-gray-300">
            <span>{label}</span>
            <span className="font-bold text-blue-300">{Math.round(value)}%</span>
        </label>
        <input
            type="range"
            min="0"
            max="100"
            value={value}
            onChange={onChange}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg accent-blue-500"
        />
    </div>
);

const BudgetAllocation: React.FC<BudgetAllocationProps> = ({ budgetAllocation, onUpdate }) => {
  return (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-blue-300">1. Budget Allocation</h3>
      <div className="space-y-4">
        <Slider label="Community Compensations" value={budgetAllocation.community} onChange={e => onUpdate('community', parseInt(e.target.value, 10))} />
        <Slider label="Environmental Studies" value={budgetAllocation.environment} onChange={e => onUpdate('environment', parseInt(e.target.value, 10))} />
        <Slider label="Public Relations & Marketing" value={budgetAllocation.pr} onChange={e => onUpdate('pr', parseInt(e.target.value, 10))} />
        <Slider label="Legal & Lobbying" value={budgetAllocation.legal} onChange={e => onUpdate('legal', parseInt(e.target.value, 10))} />
        <Slider label="Technology & Safety" value={budgetAllocation.safety} onChange={e => onUpdate('safety', parseInt(e.target.value, 10))} />
      </div>
    </div>
  );
};

export default BudgetAllocation;
