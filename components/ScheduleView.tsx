import React from 'react';
import { TimeSlotType, ScheduledMeeting } from '../types';
import { TIME_SLOTS } from '../constants';

interface ScheduleViewProps {
  currentDay: number;
  currentTimeSlot: TimeSlotType;
  projectDeadline: number;
  calendar: ScheduledMeeting[];
  onSlotSelect: (day: number, slot: TimeSlotType) => void;
  timeSlots?: TimeSlotType[];
}

const ScheduleView: React.FC<ScheduleViewProps> = ({ currentDay, currentTimeSlot, calendar, onSlotSelect, timeSlots }) => {
    const daysToShow = Array.from({ length: 7 }, (_, i) => currentDay + i);
    const slots = timeSlots ?? TIME_SLOTS;

    const isSlotInPast = (day: number, slot: TimeSlotType) => {
        if (day < currentDay) return true;
        if (day === currentDay && slots.indexOf(slot) <= slots.indexOf(currentTimeSlot)) {
            return true;
        }
        return false;
    };

    return (
        <div className="p-4 h-full flex flex-col animate-fade-in">
            <h2 className="text-xl font-bold mb-4 text-blue-300 border-b-2 border-blue-500/30 pb-2 flex-shrink-0">Agendar una Reunión</h2>
            <p className="text-gray-400 mb-4 flex-shrink-0">Seleccione un bloque de tiempo disponible para solicitar una reunión. Planifique con cuidado, el tiempo es su recurso más valioso.</p>
            <div className="flex-grow overflow-y-auto">
                <div className="grid grid-cols-7 gap-1 text-center font-bold text-gray-400 text-xs mb-2">
                    {daysToShow.map(day => <div key={day}>Día {day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1 h-full" style={{ gridTemplateRows: `repeat(${slots.length}, minmax(0, 1fr))` }}>
                    {slots.map(slot => (
                        <React.Fragment key={slot}>
                            {daysToShow.map(day => {
                                const meeting = calendar.find(m => m.day === day && m.slot === slot);
                                const isPast = isSlotInPast(day, slot);
                                const isDisabled = !!meeting || isPast;

                                return (
                                    <button
                                        key={`${day}-${slot}`}
                                        disabled={isDisabled}
                                        onClick={() => onSlotSelect(day, slot)}
                                        className={`p-2 rounded-md text-xs transition-colors duration-200 flex flex-col justify-center items-center h-full
                                            ${isPast ? 'bg-gray-900/50 text-gray-600' : ''}
                                            ${meeting ? 'bg-red-800/70 text-red-200 border border-red-700' : ''}
                                            ${!isDisabled ? 'bg-gray-700/60 hover:bg-blue-600/50 text-gray-300 border border-gray-600' : ''}
                                            disabled:cursor-not-allowed
                                        `}
                                    >
                                        <span className="font-bold capitalize">{slot}</span>
                                        {meeting && <span className="text-xxs truncate">{meeting.stakeholderName}</span>}
                                        {isPast && !meeting && <span className="text-xxs">Pasado</span>}
                                    </button>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </div>
            </div>
             <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-in forwards; }
                .text-xxs { font-size: 0.65rem; line-height: 0.8rem; }
            `}</style>
        </div>
    );
};

export default ScheduleView;
