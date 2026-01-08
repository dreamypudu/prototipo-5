import React from 'react';
import CesfamMap from '../../components/CesfamMap';
import { useMechanicContext } from '../MechanicContext';

const MapMechanic: React.FC = () => {
  const { gameState, actions } = useMechanicContext();
  return <CesfamMap gameState={gameState} onInteract={actions.mapInteract} />;
};

export default MapMechanic;
