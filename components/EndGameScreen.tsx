
import React from 'react';

interface EndGameScreenProps {
  status: 'won' | 'lost';
  message: string;
}

const EndGameScreen: React.FC<EndGameScreenProps> = ({ status, message }) => {
  const isWin = status === 'won';
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className={`w-full max-w-2xl bg-gray-900 rounded-2xl border-4 ${isWin ? 'border-green-500' : 'border-red-500'} shadow-2xl p-8 text-center`}>
        <h1 className={`text-4xl font-bold mb-4 ${isWin ? 'text-green-400' : 'text-red-400'}`}>
          {isWin ? 'Decisión Tomada' : 'Project Failure'}
        </h1>
        <p className="text-lg text-gray-300 mb-6 whitespace-pre-line">
          {message}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className={`px-8 py-3 rounded-lg font-bold text-white transition-transform transform hover:scale-105 ${isWin ? 'bg-green-600 hover:bg-green-500' : 'bg-red-600 hover:bg-red-500'}`}
        >
          Jugar de Nuevo
        </button>
      </div>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default EndGameScreen;