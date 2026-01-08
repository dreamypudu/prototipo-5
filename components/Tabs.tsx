
import React from 'react';

type ActiveTab = 'interaction' | 'emails' | 'calendar' | 'summary' | 'data_export' | 'experimental_map' | 'documents' | 'schedule' | 'map';

interface TabsProps {
  activeTab: string;
  onTabChange: (tab: ActiveTab) => void;
  unreadEmailCount: number;
  unreadDocumentCount: number;
}

const TABS = [
    { id: 'interaction', label: 'Oficina Central' },
    { id: 'summary', label: 'Stakeholders' },
];

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-700 mt-4 overflow-x-auto">
      <nav className="-mb-px flex space-x-6 min-w-max" aria-label="Tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as ActiveTab)}
            className={`${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
            } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-lg transition-colors duration-200 flex items-center gap-2`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;
