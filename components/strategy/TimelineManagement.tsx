import React from 'react';
import { StrategyState } from '../../types';

interface TimelineManagementProps {
  timeline: StrategyState['timeline'];
  onUpdate: (field: keyof StrategyState['timeline'], value: any) => void;
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


const TimelineManagement: React.FC<TimelineManagementProps> = ({ timeline, onUpdate }) => {
  return (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-blue-300">3. Timeline Management</h3>
       <div className="space-y-2">
            <RadioOption 
                name="schedule" 
                value="normal" 
                label="Normal Schedule"
                description="Follow the current plan. No extra costs or risks."
                checked={timeline.schedule === 'normal'} 
                onChange={e => onUpdate('schedule', e.target.value)}
            />
            <RadioOption 
                name="schedule" 
                value="accelerated" 
                label="Accelerate ('Crash') Schedule"
                description="Spend more money to go faster. Increases risk of accidents."
                checked={timeline.schedule === 'accelerated'} 
                onChange={e => onUpdate('schedule', e.target.value)}
            />
            <RadioOption 
                name="schedule" 
                value="delayed" 
                label="Delay Schedule"
                description="Accept a delay to gain time for negotiations. Annoys investors."
                checked={timeline.schedule === 'delayed'} 
                onChange={e => onUpdate('schedule', e.target.value)}
            />
        </div>
    </div>
  );
};

export default TimelineManagement;
