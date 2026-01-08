import React from 'react';
import CalendarView from '../../components/CalendarView';
import { TIME_SLOTS } from '../../data/innovatec/constants';
import { useMechanicContext } from '../MechanicContext';

const InnovatecCalendarMechanic: React.FC = () => {
  const { gameState } = useMechanicContext();
  return (
    <CalendarView
      calendar={gameState.calendar}
      currentDay={gameState.day}
      projectDeadline={gameState.projectDeadline}
      timeSlots={TIME_SLOTS}
    />
  );
};

export default InnovatecCalendarMechanic;
