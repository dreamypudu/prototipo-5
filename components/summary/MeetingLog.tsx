
import React from 'react';
import { ScheduledMeeting } from '../../types';

interface MeetingLogProps {
    meetings: ScheduledMeeting[];
    currentDay: number;
}

const MeetingLog: React.FC<MeetingLogProps> = ({ meetings, currentDay }) => {
    if (meetings.length === 0) {
        return <p className="text-sm text-gray-500">No meetings scheduled.</p>;
    }

    const sortedMeetings = [...meetings].sort((a, b) => a.day - b.day);

    return (
        <ul className="space-y-2 text-sm max-h-48 overflow-y-auto pr-2">
            {sortedMeetings.map((meeting, index) => {
                const isPast = meeting.day < currentDay;
                return (
                    <li key={index} className={`p-2 rounded-md flex justify-between items-center ${isPast ? 'bg-gray-800/60 text-gray-400' : 'bg-blue-800/40 text-blue-200'}`}>
                        <span>
                            Day {meeting.day}, {meeting.slot}
                        </span>
                        <span className={`font-semibold text-xs uppercase px-2 py-0.5 rounded-full ${isPast ? 'bg-gray-700' : 'bg-blue-600'}`}>
                            {isPast ? 'Completed' : 'Upcoming'}
                        </span>
                    </li>
                );
            })}
        </ul>
    );
};

export default MeetingLog;