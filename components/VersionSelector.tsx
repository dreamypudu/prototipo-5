
import React from 'react';
import { SimulatorVersion } from '../types';

interface VersionSelectorProps {
  onSelect: (version: SimulatorVersion) => void;
}

interface VersionOption {
    id: SimulatorVersion;
    title: string;
    description: string;
    icon: string;
    active: boolean;
}

const VERSIONS: VersionOption[] = [
    {
        id: 'CESFAM',
        title: 'Gestión en Salud (CESFAM)',
        description: 'Enfrenta el desafío de alinear a tres sectores en un centro de salud primaria de alta complejidad.',
        icon: '🏥',
        active: true
    },
    {
        id: 'SERCOTEC',
        title: 'Gestión PyME (SERCOTEC)',
        description: 'Asesora a emprendedores y gestiona fondos concursables para el desarrollo regional.',
        icon: '🏢',
        active: false
    },
    {
        id: 'MUNICIPAL',
        title: 'Gestión Municipal',
        description: 'Equilibra las necesidades de la comunidad, el presupuesto público y los tiempos políticos.',
        icon: '🏛️',
        active: false
    },
    {
        id: 'INNOVATEC',
        title: 'Innovatec (Proyecto Quantum Leap)',
        description: 'Lidera un proyecto de IA corporativa y gestiona decisiones éticas, presupuestarias y de talento.',
        icon: '🧠',
        active: true
    }
];

const VersionSelector: React.FC<VersionSelectorProps> = ({ onSelect }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Módulo de Simulación COMPASS</h1>
          <p className="text-xl text-blue-300">Seleccione el contexto de la simulación para comenzar</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
          {VERSIONS.map((version) => (
            <button
              key={version.id}
              onClick={() => version.active && onSelect(version.id)}
              disabled={!version.active}
              className={`group relative text-left p-6 rounded-2xl border-2 transition-all duration-300 h-full flex flex-col
                ${version.active 
                    ? 'bg-gray-800 border-gray-700 hover:border-blue-500 hover:bg-gray-700 cursor-pointer' 
                    : 'bg-gray-800/40 border-gray-800 cursor-not-allowed grayscale'
                }
              `}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{version.icon}</div>
              <h2 className={`text-xl font-bold mb-2 ${version.active ? 'text-blue-300' : 'text-gray-500'}`}>{version.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{version.description}</p>
              
              {!version.active ? (
                  <div className="mt-auto pt-4 border-t border-gray-700">
                    <span className="text-[10px] uppercase font-bold text-gray-600 bg-gray-900 px-2 py-1 rounded">Próximamente</span>
                  </div>
              ) : (
                  <div className="mt-auto pt-4 border-t border-gray-700 flex items-center gap-2 text-blue-400 font-bold group-hover:gap-3 transition-all">
                    <span>Iniciar Versión</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
              )}

              {version.active && (
                  <div className="absolute top-2 right-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                  </div>
              )}
            </button>
          ))}
        </div>
        
        <p className="text-center text-gray-500 mt-12 text-sm">
          Competency & Profiling Simulation System © 2026
        </p>
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out 0.3s forwards; opacity: 0; }
      `}</style>
    </div>
  );
};

export default VersionSelector;
