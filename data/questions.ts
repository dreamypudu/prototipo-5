import { StakeholderQuestion } from '../types';

export const CESFAM_QUESTIONS: Record<string, StakeholderQuestion[]> = {
  'sofia-castro': [
    {
      question_id: 'sc_priority_today',
      text: 'Cual es la prioridad administrativa de hoy?',
      answer: 'Ordenar agenda, evitar atrasos y mantener los informes al dia.',
      tags: ['admin', 'priorities']
    },
    {
      question_id: 'sc_pending_conflicts',
      text: 'Hay conflictos activos entre sectores?',
      answer: 'Si, Azul y Amarillo discuten por espacios y recursos en box.',
      requirements: { reputation_min: 50 },
      tags: ['conflict']
    },
    {
      question_id: 'sc_service_pressure',
      text: 'Que esta esperando el Servicio de Salud este mes?',
      answer: 'Piden cumplimiento estricto de IAAS y reportes de productividad.',
      requirements: { trust_min: 60 },
      tags: ['compliance']
    }
  ],
  'andres-guzman': [
    {
      question_id: 'ag_success_definition',
      text: 'Que seria un exito para el Sector Azul?',
      answer: 'Horas protegidas para investigacion y acceso a mejores box.',
      tags: ['goals']
    },
    {
      question_id: 'ag_external_allies',
      text: 'Con quien tienes alianzas externas?',
      answer: 'Tengo apoyo en la universidad y contactos en el servicio regional.',
      requirements: { trust_min: 60 },
      tags: ['politics']
    },
    {
      question_id: 'ag_support_for_change',
      text: 'Que necesitas para apoyar decisiones impopulares?',
      answer: 'Garantias de recursos y autonomia tecnica para mi sector.',
      requirements: { reputation_min: 55 },
      tags: ['negotiation']
    }
  ],
  'paz-herrera': [
    {
      question_id: 'ph_bottlenecks',
      text: 'Cuales son los mayores cuellos de botella clinicos?',
      answer: 'Faltan insumos y se pierde tiempo en tareas administrativas.',
      tags: ['operations']
    },
    {
      question_id: 'ph_low_value_tasks',
      text: 'Que tareas consideras impropias para el equipo Azul?',
      answer: 'Visitas basicas que deberian cubrir otros sectores.',
      tags: ['preferences']
    },
    {
      question_id: 'ph_yellow_friction',
      text: 'Hay friccion con el Sector Amarillo?',
      answer: 'Si, por derivaciones que llegan sin informacion completa.',
      requirements: { trust_min: 50 },
      tags: ['conflict']
    }
  ],
  'javier-castro': [
    {
      question_id: 'jc_workload',
      text: 'Como esta la carga diaria del equipo?',
      answer: 'Alta, con muchos pendientes y poco apoyo en terreno.',
      tags: ['workload']
    },
    {
      question_id: 'jc_hidden_errors',
      text: 'Hay errores que te preocupen?',
      answer: 'Algunos registros quedan incompletos por falta de tiempo.',
      requirements: { trust_min: 50 },
      tags: ['risk']
    },
    {
      question_id: 'jc_support_need',
      text: 'Que te ayudaria a reducir el estres?',
      answer: 'Turnos mas claros y apoyo administrativo en horas pico.',
      tags: ['support']
    }
  ],
  'marcela-soto': [
    {
      question_id: 'ms_non_negotiable',
      text: 'Que protocolo es innegociable para el Rojo?',
      answer: 'IAAS y descanso laboral, sin excepciones.',
      tags: ['compliance']
    },
    {
      question_id: 'ms_legal_risks',
      text: 'Cuales son los riesgos legales inmediatos?',
      answer: 'Auditorias pendientes y exceso de horas no justificadas.',
      requirements: { trust_min: 60 },
      tags: ['risk']
    },
    {
      question_id: 'ms_union_pressure',
      text: 'Hay presion sindical activa?',
      answer: 'Si, el equipo exige limites claros de carga laboral.',
      requirements: { reputation_min: 55 },
      tags: ['labor']
    }
  ],
  'eduardo-naranjo': [
    {
      question_id: 'en_controls_block',
      text: 'Que impide aumentar controles cardiovasculares?',
      answer: 'Tiempo de consulta y burocracia de registro.',
      tags: ['operations']
    },
    {
      question_id: 'en_patient_load',
      text: 'Como evaluas la carga de pacientes?',
      answer: 'Alta y con casos mas complejos cada semana.',
      tags: ['workload']
    },
    {
      question_id: 'en_cross_sector',
      text: 'Hay conflictos con otros sectores?',
      answer: 'Si, por derivaciones tardias sin coordinacion previa.',
      requirements: { trust_min: 50 },
      tags: ['conflict']
    }
  ],
  'claudia-morales': [
    {
      question_id: 'cm_team_mood',
      text: 'Como esta el clima del equipo Rojo?',
      answer: 'Cansado, pero comprometido con los protocolos.',
      tags: ['mood']
    },
    {
      question_id: 'cm_time_drains',
      text: 'Que tareas te quitan mas tiempo?',
      answer: 'Documentacion repetida y coordinacion de curaciones.',
      tags: ['operations']
    },
    {
      question_id: 'cm_conflicting_orders',
      text: 'Recibes instrucciones contradictorias?',
      answer: 'A veces llegan pedidos urgentes sin aviso ni contexto.',
      requirements: { trust_min: 50 },
      tags: ['risk']
    }
  ],
  'daniel-rios': [
    {
      question_id: 'dr_community_needs',
      text: 'Que necesita la comunidad ahora?',
      answer: 'Atencion rapida y presencia territorial constante.',
      tags: ['community']
    },
    {
      question_id: 'dr_missing_resources',
      text: 'Que recursos faltan en el Amarillo?',
      answer: 'Boxes disponibles y personal extra en horarios criticos.',
      tags: ['resources']
    },
    {
      question_id: 'dr_conflict_person',
      text: 'Con quien chocas mas seguido?',
      answer: 'Con el Azul por uso de boxes y horarios.',
      requirements: { trust_min: 60 },
      tags: ['conflict']
    }
  ],
  'francisca-solis': [
    {
      question_id: 'fs_overflow_patients',
      text: 'Que tipo de pacientes desbordan el sector?',
      answer: 'Postrados y casos sociales complejos.',
      tags: ['community']
    },
    {
      question_id: 'fs_critical_hours',
      text: 'Cual es el horario mas critico?',
      answer: 'Mananas de lunes y martes por alta demanda.',
      tags: ['operations']
    },
    {
      question_id: 'fs_support_need',
      text: 'Que apoyo necesitas del director?',
      answer: 'Prioridad en boxes y mejor coordinacion con farmacia.',
      requirements: { trust_min: 50 },
      tags: ['support']
    }
  ],
  'ricardo-meza': [
    {
      question_id: 'rm_ecografo_impact',
      text: 'Que impacto tiene no contar con ecografo?',
      answer: 'Aumentan derivaciones y se retrasan diagnosticos.',
      tags: ['resources']
    },
    {
      question_id: 'rm_retention',
      text: 'Que condiciones te harian quedarte?',
      answer: 'Herramientas clinicas y apoyo real en terreno.',
      requirements: { trust_min: 50 },
      tags: ['retention']
    },
    {
      question_id: 'rm_home_visits',
      text: 'Que visitas domiciliarias son prioridad?',
      answer: 'Adultos mayores sin red y pacientes cronicos descompensados.',
      tags: ['community']
    }
  ]
};
