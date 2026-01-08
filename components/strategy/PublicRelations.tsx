import React from 'react';
import { StrategyState } from '../../types';

interface PublicRelationsProps {
  publicRelations: StrategyState['publicRelations'];
  onUpdate: (field: keyof StrategyState['publicRelations'], value: any) => void;
}

const RadioOption: React.FC<{ name: string; value: string; label: string; description: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ name, value, label, description, checked, onChange }) => (
    <label className="flex items-start p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
        <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="mt-1 h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500" />
        <div className="ml-3 text-sm">
            <p className="font-medium text-gray-200">{label}</p>
            <p className="text-gray-400">{description}</p>
        </div>
    </label>
);

const PublicRelations: React.FC<PublicRelationsProps> = ({ publicRelations, onUpdate }) => {
  return (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-blue-300">4. Public Posture & Communication</h3>
      <div className="space-y-4">
        <div>
            <h4 className="font-semibold text-gray-300 mb-2">Transparency Level</h4>
            <div className="space-y-2">
                <RadioOption 
                    name="transparency" 
                    value="radical" 
                    label="Radical Transparency"
                    description="Publish all reports, even negative ones. High trust, high risk."
                    checked={publicRelations.transparency === 'radical'} 
                    onChange={e => onUpdate('transparency', e.target.value)}
                />
                <RadioOption 
                    name="transparency" 
                    value="controlled" 
                    label="Controlled Communication"
                    description="Share only positive or legally required info. Standard approach."
                    checked={publicRelations.transparency === 'controlled'} 
                    onChange={e => onUpdate('transparency', e.target.value)}
                />
                <RadioOption 
                    name="transparency" 
                    value="silent" 
                    label="Strategic Silence"
                    description="Communicate only when absolutely necessary. Efficient but risky."
                    checked={publicRelations.transparency === 'silent'} 
                    onChange={e => onUpdate('transparency', e.target.value)}
                />
            </div>
        </div>
        <div>
            <h4 className="font-semibold text-gray-300 mb-2">Main Narrative (PR Angle)</h4>
             <div className="space-y-2">
                <RadioOption 
                    name="narrative" 
                    value="jobs" 
                    label="Progress & Employment"
                    description="Focus on economic benefits. Appeals to government, investors."
                    checked={publicRelations.narrative === 'jobs'} 
                    onChange={e => onUpdate('narrative', e.target.value)}
                />
                <RadioOption 
                    name="narrative" 
                    value="sustainability" 
                    label="Sustainable Innovation"
                    description="Focus on tech and environment. Appeals to NGOs, modernists."
                    checked={publicRelations.narrative === 'sustainability'} 
                    onChange={e => onUpdate('narrative', e.target.value)}
                />
                <RadioOption 
                    name="narrative" 
                    value="national" 
                    label="National Strategic Development"
                    description="Focus on patriotism and country-wide importance."
                    checked={publicRelations.narrative === 'national'} 
                    onChange={e => onUpdate('narrative', e.target.value)}
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default PublicRelations;
