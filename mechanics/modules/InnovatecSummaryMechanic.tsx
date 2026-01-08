import React from 'react';
import StakeholderSummaryDashboard from '../../components/StakeholderSummaryDashboard';
import { SECRETARY_ROLE } from '../../data/innovatec/constants';
import { useMechanicContext } from '../MechanicContext';

const InnovatecSummaryMechanic: React.FC = () => {
  const { gameState } = useMechanicContext();
  return (
    <StakeholderSummaryDashboard gameState={gameState} secretaryRole={SECRETARY_ROLE} />
  );
};

export default InnovatecSummaryMechanic;
