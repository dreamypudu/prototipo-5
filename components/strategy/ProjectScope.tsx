import React from 'react';
import { StrategyState } from '../../types';

interface ProjectScopeProps {
  projectScope: StrategyState['projectScope'];
  onScopeUpdate: (field: keyof StrategyState['projectScope'], value: any) => void;
  onMitigationChange: (measure: string, checked: boolean) => void;
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

const CheckboxOption: React.FC<{ id: string; label: string; description: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ id, label, description, checked, onChange }) => (
     <label className="flex items-start p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
        <input type="checkbox" id={id} checked={checked} onChange={onChange} className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500" />
        <div className="ml-3 text-sm">
            <p className="font-medium text-gray-200">{label}</p>
            <p className="text-gray-400">{description}</p>
        </div>
    </label>
);


const ProjectScope: React.FC<ProjectScopeProps> = ({ projectScope, onScopeUpdate, onMitigationChange }) => {
  return (
    <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-blue-300">2. Project Scope & Features</h3>
      <div className="space-y-4">
        <div>
            <h4 className="font-semibold text-gray-300 mb-2">Technical Approach</h4>
            <div className="space-y-2">
                <RadioOption 
                    name="technicalApproach" 
                    value="standard" 
                    label="Standard Approach"
                    description="Faster & cheaper, but with higher environmental/social impact."
                    checked={projectScope.technicalApproach === 'standard'} 
                    onChange={e => onScopeUpdate('technicalApproach', e.target.value)}
                />
                <RadioOption 
                    name="technicalApproach" 
                    value="sustainable" 
                    label="Sustainable Approach"
                    description="Slower & costlier, but with advanced tech and lower impact."
                    checked={projectScope.technicalApproach === 'sustainable'} 
                    onChange={e => onScopeUpdate('technicalApproach', e.target.value)}
                />
            </div>
        </div>
        <div>
            <h4 className="font-semibold text-gray-300 mb-2">Mitigation & Compensation Initiatives</h4>
             <div className="space-y-2">
                <CheckboxOption 
                    id="reforestation"
                    label="Fund Reforestation Program"
                    description="Pleasess environmental groups and government."
                    checked={projectScope.mitigationMeasures.includes('reforestation')}
                    onChange={e => onMitigationChange('reforestation', e.target.checked)}
                />
                 <CheckboxOption 
                    id="local_training"
                    label="Fund Local Training Programs"
                    description="Boosts trust with local communities."
                    checked={projectScope.mitigationMeasures.includes('local_training')}
                    onChange={e => onMitigationChange('local_training', e.target.checked)}
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectScope;
