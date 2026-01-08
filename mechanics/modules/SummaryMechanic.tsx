import React from 'react';
import StakeholderSummaryDashboard from '../../components/StakeholderSummaryDashboard';
import { useMechanicContext } from '../MechanicContext';

const SummaryMechanic: React.FC = () => {
  const { gameState } = useMechanicContext();
  return <StakeholderSummaryDashboard gameState={gameState} />;
};

export default SummaryMechanic;
