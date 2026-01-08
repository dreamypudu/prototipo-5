import React from 'react';
import { Stakeholder } from '../types';

interface StakeholderListProps {
  stakeholders: Stakeholder[];
  onSelectStakeholder: (stakeholder: Stakeholder) => void;
  activeStakeholderName?: string;
}

const StatBar: React.FC<{ label: string, value: number, max?: number, colorClass?: string }> = ({ label, value, max = 100, colorClass = 'bg-blue-500' }) => (
    <div className="w-full">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{label}</span>
            <span>{value}</span>
        </div>
        <div className="w-full bg-gray-900/50 rounded-full h-2 border border-gray-700">
            <div
                className={`${colorClass} h-full rounded-full transition-all duration-300`}
                style={{ width: `${(value / max) * 100}%` }}
            />
        </div>
    </div>
);

const SupportBar: React.FC<{ value: number }> = ({ value }) => {
    const isPositive = value >= 0;
    const widthPercentage = Math.abs(value);

    return (
        <div className="w-full">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Opposition / Support</span>
                <span className={isPositive ? 'text-green-400' : 'text-red-400'}>{value}</span>
            </div>
            <div className="relative w-full bg-gray-900/50 rounded-full h-2 flex items-center border border-gray-700">
                <div className="absolute left-1/2 w-px h-full bg-gray-600" />
                <div
                    className={`absolute h-full rounded-full ${isPositive ? 'bg-green-500 left-1/2' : 'bg-red-500 right-1/2'}`}
                    style={{ width: `${widthPercentage / 2}%` }}
                />
            </div>
        </div>
    );
};


const StakeholderList: React.FC<StakeholderListProps> = ({ stakeholders, onSelectStakeholder, activeStakeholderName }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-blue-300 border-b-2 border-blue-500/30 pb-2">Stakeholders</h2>
      <ul className="space-y-3">
        {stakeholders.map((sh) => (
          <li key={sh.name}>
            <button
              onClick={() => onSelectStakeholder(sh)}
              className={`w-full text-left p-3 rounded-lg flex items-center gap-4 transition-all duration-200 ${
                activeStakeholderName === sh.name
                  ? 'bg-blue-600/30 ring-2 ring-blue-500 shadow-lg'
                  : 'bg-gray-700/50 hover:bg-gray-700'
              }`}
            >
              <img src={sh.portraitUrl} alt={sh.name} className="w-16 h-16 rounded-full border-2 border-gray-600 object-cover" />
              <div className="flex-grow">
                <p className="font-semibold text-white">{sh.name}</p>
                <p className="text-sm text-gray-400 mb-2">{sh.role}</p>
                <div className="space-y-2">
                    <StatBar label="Trust" value={sh.trust} colorClass="bg-sky-500" />
                    <SupportBar value={sh.support} />
                    <StatBar label="Power" value={sh.power} colorClass="bg-purple-500" />
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StakeholderList;