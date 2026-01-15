
import React from 'react';
import { EffectMagnitude, GameState, GlobalEffectsUI, TimeSlotType } from '../types';
import { getGameDate } from '../constants';

interface HeaderProps {
  gameState: GameState;
  countdown: number;
  isTimerPaused: boolean;
  onTogglePause: () => void;
  onAdvanceTime: () => void;
  onOpenSidebar: () => void;
  periodDuration?: number;
  globalEffectsHighlight?: GlobalEffectsUI | null;
}

const TimeDisplay: React.FC<{ day: number; deadline: number; slot: TimeSlotType; countdown: number; isPaused: boolean; onTogglePause: () => void; onAdvance: () => void; periodDuration: number; }> = ({ day, deadline, slot, countdown, isPaused, onTogglePause, onAdvance, periodDuration }) => {
    const progress = ((periodDuration - countdown) / periodDuration) * 100;
    const { week, dayName } = getGameDate(day);
    const slotLabel = slot === 'ma\u00f1ana' ? 'Ma\u00f1ana' : slot === 'tarde' ? 'Tarde' : 'Noche';

    return (
        <div className="flex items-center gap-3 bg-gray-800/60 p-2 rounded-md border border-gray-700 flex-grow">
            <div className="text-yellow-400"><ClockIcon /></div>
            <div className="flex-grow">
                <div className="flex justify-between items-baseline">
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Semana {week} - {dayName}</div>
                    <div className="text-lg font-bold text-white leading-tight">{slotLabel}</div>
                </div>
                <div className="w-full bg-gray-900/50 rounded-full h-2.5 border border-gray-700 mt-1 relative overflow-hidden">
                    <div className={`h-full rounded-full absolute top-0 left-0 ${isPaused ? 'bg-gray-500' : 'bg-yellow-500'}`} style={{ width: `${progress}%`, transition: isPaused ? 'none' : 'width 1s linear' }}/>
                </div>
            </div>
             <div className="flex items-center gap-2 pl-3 border-l border-gray-700">
                <button onClick={onTogglePause} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-yellow-300 transition-colors" title={isPaused ? 'Reanudar' : 'Pausar'}>
                    {isPaused ? <PlayIcon /> : <PauseIcon />}
                </button>
                <button onClick={onAdvance} className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-yellow-300 transition-colors" title="Avanzar al Siguiente Bloque">
                   <ForwardIcon />
                </button>
            </div>
        </div>
    );
};


const getMagnitudeSize = (magnitude: EffectMagnitude): string => {
    if (magnitude === 'S') return 'w-2 h-2';
    if (magnitude === 'M') return 'w-3 h-3';
    return 'w-4 h-4';
};

const GlobalStat: React.FC<{
    label: string;
    value: number;
    highlight?: EffectMagnitude;
    accentClass: string;
}> = ({ label, value, highlight, accentClass }) => {
    return (
        <div className={`flex items-center gap-2 bg-gray-800/60 p-2 rounded-md border transition-colors ${highlight ? 'border-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.4)]' : 'border-gray-700'}`}>
            <div className={`w-2 h-2 rounded-full ${accentClass}`} />
            <div className="flex flex-col">
                <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
                <span className="text-sm font-bold text-white">{value.toLocaleString()}</span>
            </div>
            {highlight && (
                <span className={`ml-2 rounded-full bg-yellow-300 ${getMagnitudeSize(highlight)}`} />
            )}
        </div>
    );
};

const Header: React.FC<HeaderProps> = ({ gameState, countdown, isTimerPaused, onTogglePause, onAdvanceTime, onOpenSidebar, periodDuration = 90, globalEffectsHighlight }) => {
  const budgetHighlight = globalEffectsHighlight?.budget;
  const reputationHighlight = globalEffectsHighlight?.reputation;
  return (
    <header className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-blue-300">{gameState.projectTitle}</h1>
            <button 
                onClick={onOpenSidebar} 
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white transition-colors" 
                title="Herramientas y Opciones"
            >
                <SettingsIcon />
            </button>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-3 items-stretch">
            <div className="flex flex-wrap gap-3">
                <GlobalStat label="Presupuesto" value={gameState.budget} highlight={budgetHighlight} accentClass="bg-emerald-400" />
                <GlobalStat label="Reputacion" value={gameState.reputation} highlight={reputationHighlight} accentClass="bg-sky-400" />
            </div>
            <div className="min-w-[300px]">
                <TimeDisplay 
                    day={gameState.day} 
                    deadline={gameState.projectDeadline} 
                    slot={gameState.timeSlot} 
                    countdown={countdown}
                    isPaused={isTimerPaused}
                    onTogglePause={onTogglePause}
                    onAdvance={onAdvanceTime}
                    periodDuration={periodDuration}
                 />
            </div>
        </div>
      </div>
    </header>
  );
};

// SVG Icons
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8.006v3.988a1 1 0 001.555.832l3.197-1.994a1 1 0 000-1.664l-3.197-1.994z" clipRule="evenodd" />
    </svg>
);
const PauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);
const ForwardIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M4.555 5.168A1 1 0 003 6.006v7.988a1 1 0 001.555.832l6.197-3.994a1 1 0 000-1.664L4.555 5.168zM10.555 5.168A1 1 0 009 6.006v7.988a1 1 0 001.555.832l6.197-3.994a1 1 0 000-1.664l-6.197-3.994z" />
    </svg>
);

const SettingsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


export default Header;
