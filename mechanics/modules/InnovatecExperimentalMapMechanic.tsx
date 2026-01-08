import React from 'react';
import ExperimentalMap from '../../components/innovatec/ExperimentalMap';
import { useMechanicContext } from '../MechanicContext';

const InnovatecExperimentalMapMechanic: React.FC = () => {
  const { gameState } = useMechanicContext();
  return <ExperimentalMap gameState={gameState} />;
};

export default InnovatecExperimentalMapMechanic;
