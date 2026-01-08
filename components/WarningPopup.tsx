
import React from 'react';

interface WarningPopupProps {
  message: string;
  onClose: () => void;
}

const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 3.001-1.742 3.001H4.42c-1.53 0-2.493-1.667-1.743-3.001l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);


const WarningPopup: React.FC<WarningPopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="w-full max-w-lg bg-gray-900 rounded-2xl border-4 border-yellow-500 shadow-2xl p-8 text-center">
        <div className="flex justify-center mb-4">
           <WarningIcon />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-yellow-400">
          Alerta Crítica
        </h1>
        <p className="text-md text-gray-300 mb-6 whitespace-pre-line">
          {message}
        </p>
        <button 
          onClick={onClose}
          className="px-8 py-3 rounded-lg font-bold text-white transition-transform transform hover:scale-105 bg-yellow-600 hover:bg-yellow-500"
        >
          Entendido
        </button>
      </div>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default WarningPopup;
