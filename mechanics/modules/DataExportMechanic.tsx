import React from 'react';
import DataExport from '../../components/DataExport';
import { useMechanicContext } from '../MechanicContext';

const DataExportMechanic: React.FC = () => {
  const { gameState, sessionExport } = useMechanicContext();
  return (
    <DataExport
      decisionLog={gameState.decisionLog}
      processLog={gameState.processLog}
      playerActionsLog={gameState.playerActionsLog}
      mechanicEvents={gameState.mechanicEvents}
      canonicalActions={gameState.canonicalActions}
      expectedActions={gameState.expectedActions}
      questionLog={gameState.questionLog}
      sessionExport={sessionExport}
    />
  );
};

export default DataExportMechanic;
