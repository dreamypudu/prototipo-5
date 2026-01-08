import React from 'react';
import SchedulerInterface from '../../components/SchedulerInterface';
import { useMechanicContext } from '../MechanicContext';

const ScheduleMechanic: React.FC = () => {
  const { gameState, actions } = useMechanicContext();
  return (
    <SchedulerInterface
      gameState={gameState}
      onUpdateSchedule={actions.updateSchedule}
      onExecuteWeek={actions.executeWeek}
    />
  );
};

export default ScheduleMechanic;
