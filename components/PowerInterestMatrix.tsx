
import React from 'react';
import { ResponsiveContainer, ScatterChart, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Scatter, Legend } from 'recharts';
import { Stakeholder } from '../types';

interface PowerInterestMatrixProps {
  stakeholders: Stakeholder[];
}

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-gray-800 p-2 border border-gray-600 rounded shadow-lg text-sm">
                <p className="font-bold text-blue-300">{data.name}</p>
                <p className="text-gray-300">Power: {data.power}</p>
                <p className="text-gray-300">Interest: {data.interest}</p>
            </div>
        );
    }
    return null;
};


const PowerInterestMatrix: React.FC<PowerInterestMatrixProps> = ({ stakeholders }) => {
  const data = stakeholders.map(sh => ({ ...sh, size: 100 })); // Add size for ZAxis
  
  return (
    <div className="w-full h-full flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-blue-300 border-b-2 border-blue-500/30 pb-2">Power/Interest Matrix</h2>
        <div className="flex-grow w-full min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
                    <XAxis 
                        dataKey="interest" 
                        type="number" 
                        name="Interest" 
                        domain={[0, 100]} 
                        label={{ value: 'Interest', position: 'insideBottom', offset: -10, fill: '#A0AEC0' }}
                        tick={{ fill: '#A0AEC0' }}
                    />
                    <YAxis 
                        dataKey="power" 
                        type="number" 
                        name="Power" 
                        domain={[0, 100]} 
                        label={{ value: 'Power', angle: -90, position: 'insideLeft', fill: '#A0AEC0' }}
                        tick={{ fill: '#A0AEC0' }}
                    />
                    <ZAxis dataKey="size" range={[50, 200]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                    <Scatter name="Stakeholders" data={data} fill="#4299E1" shape="circle" />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};

export default PowerInterestMatrix;
