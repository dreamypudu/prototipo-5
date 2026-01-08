import React from 'react';
import ExperimentalMap from '../../components/ExperimentalMap';
import { useMechanicContext } from '../MechanicContext';

const ExperimentalMapMechanic: React.FC = () => {
  const { gameState, actions } = useMechanicContext();
  return (
    <ExperimentalMap
      gameState={gameState}
      onUpdateScenarioSchedule={actions.updateScenarioSchedule}
    />
  );
};

export default ExperimentalMapMechanic;
