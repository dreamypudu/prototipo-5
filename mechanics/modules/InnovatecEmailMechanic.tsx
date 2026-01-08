import React from 'react';
import EmailClient from '../../components/innovatec/EmailClient';
import { useMechanicContext } from '../MechanicContext';

const InnovatecEmailMechanic: React.FC = () => {
  const { gameState, actions } = useMechanicContext();
  return (
    <EmailClient inbox={gameState.inbox} onMarkAsRead={actions.markEmailAsRead} />
  );
};

export default InnovatecEmailMechanic;
