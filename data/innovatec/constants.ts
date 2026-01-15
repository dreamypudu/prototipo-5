import { GameState, TimeSlotType, DirectorObjectives } from '../../types';
import { INNOVATEC_QUESTIONS } from './questions';

export const TIME_SLOTS: TimeSlotType[] = ['mañana', 'tarde', 'noche'];

export const SECRETARY_ROLE = "Asistente Ejecutiva";

export const DIRECTOR_OBJECTIVES: DirectorObjectives = {
  maxDeadline: 28,
  minBudget: 0,
  minReputation: 30,
  minProgress: 100,
  minTrustWithRequired: 40,
  requiredStakeholdersRoles: [
    "Chief Financial Officer (CFO)",
    "Lead Engineer"
  ]
};

export const INITIAL_GAME_STATE: GameState = {
  playerName: '',
  projectTitle: "Proyecto Quantum Leap",
  budget: 1000000,
  day: 1,
  timeSlot: 'mañana',
  projectDeadline: 28,
  reputation: 60,
  projectProgress: 0,
  stakeholders: [
    {
      id: "laura-fernandez",
      shortId: "LF",
      name: "Laura Fernandez",
      role: "Asistente Ejecutiva",
      power: 20, interest: 100, trust: 80, support: 100, minSupport: 50, maxSupport: 100, mood: 'neutral',
      personality: "Profesional, eficiente y leal. Actúa como tu principal interfaz para gestionar la compleja red de relaciones humanas del proyecto.",
      portraitUrl: 'https://i.imgur.com/4JB2b3C.png',
      agenda: ["Asegurar que el proyecto avance sin problemas y proteger al CTO de distracciones innecesarias."],
      commitments: [],
      informationTiers: [],
      questions: INNOVATEC_QUESTIONS['laura-fernandez'] ?? [],
      questionsAsked: [],
      status: 'ok',
      lastMetDay: 0,
    },
    {
      id: "ricardo-vargas",
      shortId: "RV",
      name: "Ricardo Vargas",
      role: "Chief Financial Officer (CFO)",
      power: 95, interest: 80, trust: 50, support: 40, minSupport: 0, maxSupport: 80, mood: 'neutral',
      personality: "Analítico, directo, averso al riesgo, pragmático y escéptico. Valora los datos duros (ROI) por sobre las promesas. Es el guardián del presupuesto.",
      portraitUrl: "https://i.pinimg.com/736x/ee/2c/7f/ee2c7f170f5fc1680eb12f8700d92ea6.jpg",
      agenda: [
        "Asegurar que el proyecto se mantenga dentro del presupuesto.",
        "Minimizar el riesgo financiero para la compañía.",
        "Ver un Retorno de Inversión (ROI) claro y cuantificable."
      ],
      commitments: [],
      informationTiers: [
        { trustThreshold: 60, information: "Está bajo presión del directorio para cortar gastos en proyectos 'experimentales'." },
        { trustThreshold: 80, information: "Tiene un presupuesto de contingencia, pero solo lo liberará si el proyecto demuestra un éxito temprano y tangible." }
      ],
      questions: INNOVATEC_QUESTIONS['ricardo-vargas'] ?? [],
      questionsAsked: [],
      status: 'ok',
      lastMetDay: 0,
    },
    {
      id: "carolina-soto",
      shortId: "CS",
      name: "Carolina Soto",
      role: "Chief Marketing Officer (CMO)",
      power: 80, interest: 90, trust: 60, support: 70, minSupport: 20, maxSupport: 100, mood: 'neutral',
      personality: "Ambiciosa, carismática, enfocada en la imagen pública y la percepción del cliente. Valora las victorias rápidas y visibles. Puede ser una aliada poderosa o una competidora.",
      portraitUrl: "https://i.pinimg.com/736x/7a/70/ad/7a70ad5bb4f8dc033a4acca07b0291f3.jpg",
      agenda: [
        "Utilizar el proyecto para posicionar a Innovatec como un líder en innovación.",
        "Generar noticias positivas y mejorar la imagen de marca.",
        "Asegurar que cualquier producto resultante sea 'vendible' y atractivo para el cliente."
      ],
      commitments: [],
      informationTiers: [
        { trustThreshold: 50, information: "Está compitiendo directamente contigo por el presupuesto del próximo año." },
        { trustThreshold: 75, information: "Tiene una relación cercana con un influyente periodista de tecnología." }
      ],
      questions: INNOVATEC_QUESTIONS['carolina-soto'] ?? [],
      questionsAsked: [],
      status: 'ok',
      lastMetDay: 0,
    },
    {
        id: "david-reyes",
        shortId: "DR",
        name: "David Reyes",
        role: "Lead Engineer",
        power: 75, interest: 95, trust: 65, support: 80, minSupport: 30, maxSupport: 100, mood: 'neutral',
        personality: "Brillante técnicamente, leal a su equipo, pragmático y protector. Se preocupa profundamente por la calidad del código y el bienestar de sus ingenieros. Es la clave para la ejecución técnica.",
        portraitUrl: "https://i.pinimg.com/736x/55/1a/02/551a02fdf15721d107b0a03f665eec25.jpg",
        agenda: [
          "Construir una plataforma técnicamente sólida y escalable.",
          "Proteger a su equipo de la burocracia y las presiones externas.",
          "Asegurar que el equipo tenga las herramientas y el tiempo necesarios para hacer un buen trabajo."
        ],
        commitments: [],
        informationTiers: [
          { trustThreshold: 60, information: "El equipo está sufriendo de 'burnout' por proyectos anteriores mal gestionados." },
          { trustThreshold: 80, information: "Sabe de una solución tecnológica alternativa que podría ser mejor, pero requeriría re-evaluar el plan del proyecto." }
        ],
        questions: INNOVATEC_QUESTIONS['david-reyes'] ?? [],
        questionsAsked: [],
        status: 'ok',
        lastMetDay: 0,
    },
    {
        id: "monica-flores",
        shortId: "MF",
        name: "Mónica Flores",
        role: "Project Manager Senior",
        power: 60, interest: 85, trust: 55, support: 50, minSupport: -20, maxSupport: 70, mood: 'neutral',
        personality: "Metódica, experimentada y muy apegada a los procesos existentes ('así es como siempre lo hemos hecho'). Ve el cambio como una fuente de caos y riesgo.",
        portraitUrl: "https://i.pinimg.com/736x/50/c3/0a/50c30a7142ca5c18d7bc4e2524e4ee4c.jpg",
        agenda: [
          "Asegurar que el proyecto siga la metodología y los estándares de la empresa.",
          "Mantener un registro documental exhaustivo de todas las decisiones.",
          "Evitar desviaciones del plan original que puedan generar auditorías."
        ],
        commitments: [],
        informationTiers: [
          { trustThreshold: 70, information: "Fue la autora principal del manual de metodología que ahora defiendes." },
        ],
        questions: INNOVATEC_QUESTIONS['monica-flores'] ?? [],
        questionsAsked: [],
        status: 'ok',
        lastMetDay: 0,
    },
    {
      id: "javier-nunez",
      shortId: "JN",
      name: "Javier Núñez",
      role: "Gerente de Recursos Humanos",
      power: 65, interest: 70, trust: 60, support: 60, minSupport: 10, maxSupport: 90, mood: 'neutral',
      personality: "Empático, centrado en las políticas, la cultura y el bienestar de los empleados. Es el guardián de las reglas y los procedimientos formales de personal.",
      portraitUrl: "https://i.pinimg.com/736x/ad/f1/a6/adf1a6910b4f4d764c18a11dc11edd53.jpg",
      agenda: [
        "Garantizar que todas las acciones de personal cumplan con la política de la empresa y la ley.",
        "Mantener la moral y minimizar el conflicto dentro del equipo del proyecto.",
        "Supervisar los procesos de evaluación de desempeño y contratación."
      ],
      commitments: [],
      informationTiers: [
        { trustThreshold: 75, information: "Está lidiando con un aumento de quejas anónimas sobre estrés laboral en toda la empresa." }
      ],
      questions: INNOVATEC_QUESTIONS['javier-nunez'] ?? [],
      questionsAsked: [],
      status: 'ok',
      lastMetDay: 0,
    }
  ],
  staffRoster: [],
  weeklySchedule: [],
  eventsLog: [],
  calendar: [],
  history: {},
  strategy: {
    budgetAllocation: {
      community: 20,
      environment: 20,
      pr: 20,
      legal: 20,
      safety: 20,
    },
    projectScope: {
      technicalApproach: 'standard',
      mitigationMeasures: [],
    },
    timeline: {
      schedule: 'normal',
    },
    publicRelations: {
      transparency: 'controlled',
      narrative: 'jobs',
    },
  },
  completedScenarios: [],
  completedSequences: [],
  criticalWarnings: [],
  decisionLog: [],
  questionLog: [],
  processLog: [],
  inbox: [],
  stakeholder_preferences: {},
  readDocuments: [],
  playerActionsLog: [],
  playerNotes: "",
  scenarioSchedule: {},

  mechanicEvents: [],
  canonicalActions: [],
  expectedActions: [],
  comparisons: [],
};
