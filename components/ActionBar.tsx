

import React from 'react';
import { GlobalEffectsUI, PlayerAction } from '../types';
import { logEvent } from '../services/Timelogger';

interface ActionBarProps {
  actions: PlayerAction[];
  onAction: (action: PlayerAction) => void;
  disabled: boolean;
  onHoverEffects?: (effects: GlobalEffectsUI | null) => void;
}

const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
        case 'Low': return 'text-green-400';
        case 'Medium': return 'text-yellow-400';
        case 'High': return 'text-red-400';
        default: return 'text-gray-400';
    }
};

const ActionCard: React.FC<{ action: PlayerAction, onAction: (action: PlayerAction) => void, disabled: boolean; onHoverEffects?: (effects: GlobalEffectsUI | null) => void }> = ({ action, onAction, disabled, onHoverEffects }) => {
    const handleEnter = () => {
        logEvent('hover_enter', { option_id: action.action });
        const effects = action.globalEffectsUI;
        const hasEffects = effects && Object.keys(effects).length > 0;
        onHoverEffects?.(hasEffects ? effects : null);
    };
    const handleLeave = () => {
        logEvent('hover_leave', { option_id: action.action });
        onHoverEffects?.(null);
    };
    return (
        <button
            onClick={() => onAction(action)}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onFocus={handleEnter}
            onBlur={handleLeave}
            disabled={disabled}
            className="col-span-1 md:col-span-2 text-left bg-gray-900/50 p-3 rounded-lg border border-gray-700 hover:bg-gray-800/70 hover:border-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900/50 disabled:hover:border-gray-700 flex flex-col justify-between"
        >
            <div>
                <h4 className="font-bold text-blue-300">{action.label}</h4>
                <p className="text-sm text-gray-400 mt-1 mb-3">{action.description}</p>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs border-t border-gray-700/50 pt-2">
                <div className="flex items-center gap-1.5" title="Time Cost"><ClockIcon /> <span className="text-gray-300">{action.timeCost}</span></div>
                <div className="flex items-center gap-1.5" title="Resource Cost"><WalletIcon /> <span className="text-gray-300">{action.cost}</span></div>
                <div className="flex items-center gap-1.5" title="Focus"><FocusIcon /> <span className="text-gray-300">{action.focusType}</span></div>
                <div className="flex items-center gap-1.5" title="Risk Level"><RiskIcon /> <span className={getRiskColor(action.riskLevel || '')}>{action.riskLevel}</span></div>
                <div className="flex items-center gap-1.5 col-span-2" title="Relationship Impact"><EffectIcon /> <span className="text-gray-300 truncate">{action.relationshipImpact}</span></div>
                <div className="flex items-center gap-1.5" title="Information Depth"><InfoIcon /> <span className="text-gray-300">{action.informationDepth}</span></div>
            </div>
        </button>
    );
};

const getSimpleButtonClasses = (action: PlayerAction, disabled: boolean) => {
    const base = "col-span-1 md:col-span-2 font-semibold py-3 px-4 rounded-lg text-center transition-all duration-200 ease-in-out transform flex flex-col items-center justify-center shadow-md hover:shadow-lg disabled:shadow-none";
    const state = "disabled:cursor-not-allowed disabled:scale-100";
    if (action.uiVariant === 'muted') {
        return `${base} ${state} bg-transparent border border-gray-600 text-gray-400 hover:bg-gray-800/40 hover:text-gray-300 hover:scale-100`;
    }
    if (action.uiVariant === 'danger') {
        return `${base} ${state} bg-red-600/20 border border-red-500/40 text-red-300 hover:bg-red-600/30 hover:scale-100`;
    }
    if (action.uiVariant === 'success') {
        return `${base} ${state} bg-green-600 hover:bg-green-500 text-white hover:scale-105 active:scale-100 disabled:bg-gray-600`;
    }
    return `${base} ${state} bg-blue-600 hover:bg-blue-500 text-white hover:scale-105 active:scale-100 disabled:bg-gray-600`;
};

const SimpleButton: React.FC<{ action: PlayerAction, onAction: (action: PlayerAction) => void, disabled: boolean; onHoverEffects?: (effects: GlobalEffectsUI | null) => void }> = ({ action, onAction, disabled, onHoverEffects }) => {
    const handleEnter = () => {
        logEvent('hover_enter', { option_id: action.action });
        const effects = action.globalEffectsUI;
        const hasEffects = effects && Object.keys(effects).length > 0;
        onHoverEffects?.(hasEffects ? effects : null);
    };
    const handleLeave = () => {
        logEvent('hover_leave', { option_id: action.action });
        onHoverEffects?.(null);
    };
    return (
        <button
            onClick={() => onAction(action)}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onFocus={handleEnter}
            onBlur={handleLeave}
            disabled={disabled || action.isLocked}
            className={getSimpleButtonClasses(action, disabled)}
        >
             <div className="flex items-center justify-center gap-2">
                {action.isLocked && (
                    <span className="text-sm" aria-hidden="true">🔒</span>
                )}
                <span>{action.label}</span>
             </div>
            <div className="text-xs font-normal text-blue-200/80">{action.cost}</div>
        </button>
    );
};


const ActionBar: React.FC<ActionBarProps> = ({ actions, onAction, disabled, onHoverEffects }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-center text-blue-300">Your Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {actions.map((action, index) => (
           action.description ? 
            <ActionCard key={`${action.action}-${index}`} action={action} onAction={onAction} disabled={disabled} onHoverEffects={onHoverEffects} /> :
            <SimpleButton key={`${action.action}-${index}`} action={action} onAction={onAction} disabled={disabled} onHoverEffects={onHoverEffects} />
        ))}
      </div>
    </div>
  );
};

export default ActionBar;

// Icons
const ClockIcon = () => <svg xmlns="http://www.w.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" /></svg>;
const WalletIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" /><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" /></svg>;
const FocusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 3.636a1 1 0 011.414 0L10 7.172l3.536-3.536a1 1 0 111.414 1.414L11.414 8.586l3.536 3.535a1 1 0 11-1.414 1.414L10 9.999l-3.536 3.536a1 1 0 01-1.414-1.414L8.586 8.586 5.05 5.05a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
const RiskIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 3.001-1.742 3.001H4.42c-1.53 0-2.493-1.667-1.743-3.001l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>;
const EffectIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>;
const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>;
