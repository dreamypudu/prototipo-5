
import React from 'react';

interface ProgressBarProps {
  currentValue: number;
  maxValue: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentValue, maxValue }) => {
  const percentage = Math.max(0, Math.min(100, (currentValue / maxValue) * 100));

  return (
    <div className="w-full bg-gray-700 rounded-full h-4 relative overflow-hidden border border-gray-600">
      <div
        className="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
       <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-white text-shadow-sm">{Math.round(percentage)}%</span>
       </div>
    </div>
  );
};

export default ProgressBar;
