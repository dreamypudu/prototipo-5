import { SimulatorConfig, SimulatorVersion } from '../types';

export const SIMULATOR_CONFIGS: Record<SimulatorVersion, SimulatorConfig> = {
  CESFAM: {
    version_id: 'CESFAM',
    title: 'Gestion Directiva CESFAM',
    mechanics: [
      { mechanic_id: 'office', label: 'Oficina Central', tab_id: 'interaction' },
      { mechanic_id: 'stakeholders', label: 'Relaciones', tab_id: 'summary' },
      { mechanic_id: 'map', label: 'Plano Centro', tab_id: 'map' },
      { mechanic_id: 'scheduler', label: 'Agenda Semanal', tab_id: 'schedule' },
      { mechanic_id: 'inbox', label: 'Correos', tab_id: 'emails' },
      { mechanic_id: 'documents', label: 'Archivos', tab_id: 'documents' }
    ],
    comparison_rules: [
      'visit_priority_rule_v1',
      'research_hours_rule_v1',
      'scheduler_war_rule_v1'
    ]
  },
  SERCOTEC: {
    version_id: 'SERCOTEC',
    title: 'Consultoria PyME SERCOTEC',
    mechanics: [
      { mechanic_id: 'office', label: 'Oficina Central', tab_id: 'interaction' },
      { mechanic_id: 'inbox', label: 'Correos', tab_id: 'emails' }
    ],
    comparison_rules: []
  },
  MUNICIPAL: {
    version_id: 'MUNICIPAL',
    title: 'Alcaldia Municipal',
    mechanics: [
      { mechanic_id: 'office', label: 'Palacio Municipal', tab_id: 'interaction' },
      { mechanic_id: 'map', label: 'Mapa Comunal', tab_id: 'map' }
    ],
    comparison_rules: []
  },
  INNOVATEC: {
    version_id: 'INNOVATEC',
    title: 'Innovatec: Proyecto Quantum Leap',
    mechanics: [
      { mechanic_id: 'office', label: 'Oficina Central', tab_id: 'interaction' },
      { mechanic_id: 'inbox', label: 'Correos', tab_id: 'emails' },
      { mechanic_id: 'calendar', label: 'Calendario', tab_id: 'calendar' },
      { mechanic_id: 'stakeholders', label: 'Stakeholders', tab_id: 'summary' },
      { mechanic_id: 'data_export', label: 'Datos', tab_id: 'data_export' },
      { mechanic_id: 'experimental_map', label: 'Mapa Experimental', tab_id: 'experimental_map' }
    ],
    comparison_rules: []
  }
};
