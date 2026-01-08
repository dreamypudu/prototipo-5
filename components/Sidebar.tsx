import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: 'data_export' | 'experimental_map') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigate }) => {
  const handleNavigation = (tab: 'data_export' | 'experimental_map') => {
    onNavigate(tab);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gray-800 border-l border-gray-700 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-300">Herramientas</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavigation('data_export')}
                  className="w-full text-left flex items-center gap-3 p-3 rounded-lg text-lg text-gray-300 hover:bg-blue-800/50 hover:text-white transition-colors"
                >
                  <DataExportIcon />
                  <span>Exportar Datos</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('experimental_map')}
                  className="w-full text-left flex items-center gap-3 p-3 rounded-lg text-lg text-gray-300 hover:bg-blue-800/50 hover:text-white transition-colors"
                >
                  <MapIcon />
                  <span>Mapa Experimental</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

// Icons for the sidebar buttons
const DataExportIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const MapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13v-6m0-6v6m0-6h6m-6 6h6m6-3l-5.447 2.724A1 1 0 0115 16.382V5.618a1 1 0 011.447-.894L21 7m0 0v6" />
    </svg>
);


export default Sidebar;
