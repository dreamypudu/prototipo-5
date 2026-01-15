import { StakeholderQuestion } from '../../types';

export const INNOVATEC_QUESTIONS: Record<string, StakeholderQuestion[]> = {
  'laura-fernandez': [
    {
      question_id: 'lf_priorities',
      text: 'Cuales son las prioridades operativas de hoy?',
      answer: 'Mantener la agenda protegida y evitar distracciones politicas.',
      tags: ['operations']
    },
    {
      question_id: 'lf_stakeholder_mood',
      text: 'Como percibes el clima con los directivos?',
      answer: 'Hay presion por resultados visibles en el corto plazo.',
      requirements: { reputation_min: 50 },
      tags: ['context']
    },
    {
      question_id: 'lf_reporting',
      text: 'Que reportes son criticos esta semana?',
      answer: 'Indicadores de progreso, gastos y riesgos tecnicos.',
      tags: ['compliance']
    }
  ],
  'ricardo-vargas': [
    {
      question_id: 'rv_runway',
      text: 'Cuanto margen financiero real tenemos?',
      answer: 'El presupuesto cubre solo si evitamos desviaciones mayores.',
      tags: ['finance']
    },
    {
      question_id: 'rv_risk_tolerance',
      text: 'Que nivel de riesgo aceptarias?',
      answer: 'Moderado, siempre que haya plan de mitigacion claro.',
      requirements: { trust_min: 60 },
      tags: ['risk']
    },
    {
      question_id: 'rv_approval_metrics',
      text: 'Que metricas definen aprobacion financiera?',
      answer: 'ROI, control de costos y cumplimiento de hitos.',
      requirements: { reputation_min: 55 },
      tags: ['finance']
    }
  ],
  'carolina-soto': [
    {
      question_id: 'cs_message_focus',
      text: 'Que mensaje central quieres posicionar?',
      answer: 'Innovacion responsable con impacto tangible.',
      tags: ['marketing']
    },
    {
      question_id: 'cs_overpromise_risk',
      text: 'Que limite no debemos cruzar en comunicacion?',
      answer: 'Nunca prometer algo que el equipo tecnico no pueda sostener.',
      requirements: { reputation_min: 55 },
      tags: ['risk']
    },
    {
      question_id: 'cs_internal_support',
      text: 'Que aliados necesitas para tu plan?',
      answer: 'Ingenieria y Finanzas alineados desde el inicio.',
      tags: ['alignment']
    }
  ],
  'david-reyes': [
    {
      question_id: 'dr_tech_risks',
      text: 'Cual es el mayor riesgo tecnico hoy?',
      answer: 'Integracion de datos y deuda tecnica acumulada.',
      tags: ['engineering']
    },
    {
      question_id: 'dr_needed_resources',
      text: 'Que recursos son mas urgentes?',
      answer: 'Tiempo de QA y refuerzo en analisis de datos.',
      tags: ['resources']
    },
    {
      question_id: 'dr_deadline_pressure',
      text: 'Como ves el calendario realista?',
      answer: 'El plan actual es muy agresivo sin ajustes.',
      requirements: { trust_min: 55 },
      tags: ['schedule']
    }
  ],
  'monica-flores': [
    {
      question_id: 'mf_bottlenecks',
      text: 'Donde se atasca el flujo del proyecto?',
      answer: 'En revisiones cruzadas y dependencias externas.',
      tags: ['process']
    },
    {
      question_id: 'mf_team_velocity',
      text: 'Como esta la velocidad del equipo?',
      answer: 'Estable, pero sensible a cambios de alcance.',
      tags: ['process']
    },
    {
      question_id: 'mf_hidden_dependencies',
      text: 'Hay dependencias que no vemos?',
      answer: 'Si, aprobaciones legales y tiempos de proveedores.',
      requirements: { trust_min: 55 },
      tags: ['risk']
    }
  ],
  'javier-nunez': [
    {
      question_id: 'jn_morale',
      text: 'Como esta la moral del equipo?',
      answer: 'Alta en ingenieria, mas baja en areas de soporte.',
      tags: ['hr']
    },
    {
      question_id: 'jn_talent_risk',
      text: 'Hay riesgo de rotacion critica?',
      answer: 'Si el estres sube, podriamos perder talento clave.',
      requirements: { trust_min: 55 },
      tags: ['hr']
    },
    {
      question_id: 'jn_policy_limits',
      text: 'Que limites de politica interna debo respetar?',
      answer: 'Teletrabajo y horarios requieren aprobacion formal.',
      requirements: { reputation_min: 50 },
      tags: ['compliance']
    }
  ]
};
