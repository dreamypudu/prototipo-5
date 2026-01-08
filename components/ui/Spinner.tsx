
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-blue-300">AI is thinking...</p>
    </div>
  );
};

export default Spinner;
