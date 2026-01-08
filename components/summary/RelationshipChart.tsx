import React from 'react';
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ReferenceLine } from 'recharts';
import { Stakeholder, GameState, ScheduledMeeting } from '../../types';

interface RelationshipChartProps {
  stakeholder: Stakeholder;
  history: GameState['history'];
  meetings: ScheduledMeeting[];
  currentDay: number;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-gray-800 p-2 border border-gray-600 rounded shadow-lg text-sm">
                <p className="font-bold text-blue-300">Day {label}</p>
                {payload.map((p: any) => (
                     <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
                ))}
            </div>
        );
    }
    return null;
};

const RelationshipChart: React.FC<RelationshipChartProps> = ({ stakeholder, history, meetings, currentDay }) => {

    const processHistoryForChart = () => {
        const chartDataMap = new Map<number, { day: number; trust: number; support: number }>();

        // Add historical data (snapshots from previous days)
        for (const day in history) {
            const numericDay = parseInt(day, 10);
            const stakeholderSnapshot = history[numericDay].find(s => s.name === stakeholder.name);
            if (stakeholderSnapshot) {
                chartDataMap.set(numericDay, {
                    day: numericDay,
                    trust: stakeholderSnapshot.trust,
                    support: stakeholderSnapshot.support
                });
            }
        }

        // Add or overwrite the current day's data with the live state
        // This ensures interactions on the current day are reflected immediately.
        chartDataMap.set(currentDay, {
            day: currentDay,
            trust: stakeholder.trust,
            support: stakeholder.support
        });
        
        // Convert map to array and sort by day
        return Array.from(chartDataMap.values()).sort((a, b) => a.day - b.day);
    };

    const chartData = processHistoryForChart();
    const meetingDays = meetings.map(m => m.day);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart 
                data={chartData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                <XAxis 
                    dataKey="day"
                    type="number" 
                    name="Day" 
                    domain={['dataMin', 'dataMax']} 
                    tick={{ fill: '#A0AEC0', fontSize: 12 }}
                    label={{ value: 'Project Day', position: 'insideBottom', offset: -5, fill: '#A0AEC0' }}
                />
                <YAxis 
                    domain={[-100, 100]} 
                    tick={{ fill: '#A0AEC0', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{fontSize: "14px"}}/>
                <Line type="monotone" dataKey="trust" stroke="#38bdf8" strokeWidth={2} name="Trust" dot={false} />
                <Line type="monotone" dataKey="support" stroke="#4ade80" strokeWidth={2} name="Support" dot={false} />

                {meetingDays.map(day => (
                    <ReferenceLine 
                        key={`meeting-${day}`} 
                        x={day} 
                        stroke="#fde047" 
                        strokeDasharray="2 4"
                    >
                        <Legend />
                    </ReferenceLine>
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default RelationshipChart;
