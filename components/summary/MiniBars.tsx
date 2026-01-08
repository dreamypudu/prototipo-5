
import React from 'react';

export const StatBar: React.FC<{ label: string, value: number, max?: number, colorClass?: string }> = ({ label, value, max = 100, colorClass = 'bg-blue-500' }) => (
    <div className="w-full">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{label}</span>
            <span>{value}</span>
        </div>
        <div className="w-full bg-gray-900/50 rounded-full h-2 border border-gray-700">
            <div
                className={`${colorClass} h-full rounded-full transition-all duration-300`}
                style={{ width: `${(value / max) * 100}%` }}
            />
        </div>
    </div>
);

export const SupportBar: React.FC<{ value: number }> = ({ value }) => {
    const isPositive = value >= 0;
    const widthPercentage = Math.abs(value);

    return (
        <div className="w-full">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Support</span>
                <span className={isPositive ? 'text-green-400' : 'text-red-400'}>{value}</span>
            </div>
            <div className="relative w-full bg-gray-900/50 rounded-full h-2 flex items-center border border-gray-700">
                <div className="absolute left-1/2 w-px h-full bg-gray-600" />
                <div
                    className={`absolute h-full rounded-full ${isPositive ? 'bg-green-500 left-1/2' : 'bg-red-500 right-1/2'}`}
                    style={{ width: `${widthPercentage / 2}%` }}
                />
            </div>
        </div>
    );
};