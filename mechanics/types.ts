import type { ComponentType } from 'react';

export interface MechanicRegistryEntry {
  mechanic_id: string;
  label: string;
  tab_id: string;
  Module?: ComponentType;
}

export type MechanicRegistry = Record<string, MechanicRegistryEntry>;
