
import React from 'react';
import { ScheduledMeeting, TimeSlotType } from '../types';
import { TIME_SLOTS } from '../constants';

interface CalendarViewProps {
  calendar: ScheduledMeeting[];
  currentDay: number;
  projectDeadline: number;
  timeSlots?: TimeSlotType[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ calendar, currentDay, projectDeadline, timeSlots }) => {
  const allDays = Array.from({ length: projectDeadline }, (_, i) => i + 1);
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const slots = timeSlots ?? TIME_SLOTS;

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-blue-300 border-b-2 border-blue-500/30 pb-3">Project Calendar</h2>
      
      <div className="grid grid-cols-7 gap-1 text-center font-bold text-gray-400 text-xs mb-2">
          {weekDays.map(day => <div key={day}>{day}</div>)}
      </div>

      <div className="grid grid-cols-7 grid-flow-row gap-2">
        {allDays.map(day => {
          const isCurrent = day === currentDay;
          const meetingsForDay = calendar.filter(m => m.day === day);

          return (
            <div
              key={day}
              className={`p-2 rounded-lg border min-h-[120px] flex flex-col
                ${isCurrent ? 'bg-blue-800/30 border-blue-600' : 'bg-gray-900/50 border-gray-700'}
              `}
            >
              <div className={`font-bold text-sm ${isCurrent ? 'text-blue-300' : 'text-gray-300'}`}>{day}</div>
              <ul className="mt-1 space-y-1 text-xs flex-grow">
                 {slots.map(slot => {
                    const meeting = meetingsForDay.find(m => m.slot === slot);
                    return (
                        <li key={slot} className="flex items-center gap-1.5 p-1 rounded-md bg-gray-800/50">
                           <span className={`w-2 h-2 rounded-full ${meeting ? 'bg-red-500' : 'bg-green-500'}`}></span>
                           <span className={`truncate ${meeting ? 'text-red-200' : 'text-gray-500'}`} title={meeting?.stakeholderName}>
                             {meeting ? meeting.stakeholderName : 'Free'}
                           </span>
                        </li>
                    )
                 })}
              </ul>
            </div>
          );
        })}
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

export default CalendarView;
