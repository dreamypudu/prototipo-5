import React from 'react';
import EmailClient from '../../components/EmailClient';
import { useMechanicContext } from '../MechanicContext';

const EmailMechanic: React.FC = () => {
  const { gameState, actions } = useMechanicContext();
  return <EmailClient inbox={gameState.inbox} onMarkAsRead={actions.markEmailAsRead} />;
};

export default EmailMechanic;
