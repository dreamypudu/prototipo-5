import React, { createContext, useContext } from 'react';
import { GameState, ScheduleAssignment, StaffMember, Stakeholder, TimeSlotType } from '../types';
import { mechanicEngine } from '../services/MechanicEngine';
import { SessionExport } from '../services/sessionExport';

export interface MechanicActions {
  updateSchedule: (newSchedule: ScheduleAssignment[]) => void;
  executeWeek: () => void;
  markEmailAsRead: (emailId: string) => void;
  markDocumentAsRead: (documentId: string) => void;
  updateNotes: (notes: string) => void;
  mapInteract: (staff: StaffMember) => boolean;
  callStakeholder: (stakeholder: Stakeholder) => void;
  updateScenarioSchedule: (id: string, day: number, slot: TimeSlotType) => void;
}

export interface MechanicContextValue {
  gameState: GameState;
  engine: typeof mechanicEngine;
  actions: MechanicActions;
  sessionExport: SessionExport;
}

const MechanicContext = createContext<MechanicContextValue | null>(null);

export const MechanicProvider: React.FC<{
  value: MechanicContextValue;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return <MechanicContext.Provider value={value}>{children}</MechanicContext.Provider>;
};

export const useMechanicContext = (): MechanicContextValue => {
  const context = useContext(MechanicContext);
  if (!context) {
    throw new Error('useMechanicContext must be used within a MechanicProvider');
  }
  return context;
};
