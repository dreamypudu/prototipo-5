
import { GameState, TimeSlotType, DirectorObjectives, StaffMember, ScheduleAssignment, DayOfWeek, ScheduleBlock, RoomDefinition } from './types';
import { CESFAM_QUESTIONS } from './data/questions';

export const TIME_SLOTS: TimeSlotType[] = ['mañana', 'tarde'];

export const SECRETARY_ROLE = "Asistente Administrativa";

export const DAYS_OF_WEEK: DayOfWeek[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
export const SCHEDULE_BLOCKS: ScheduleBlock[] = ['AM', 'PM'];

// Helper to convert linear Game Day (1..28) to Week/Day format
export const getGameDate = (dayNumber: number): { week: number, dayName: string, dayIndex: number } => {
    // Assuming 5 work days per week
    const dayIndex = (dayNumber - 1) % 5;
    const week = Math.floor((dayNumber - 1) / 5) + 1;
    return {
        week,
        dayName: DAYS_OF_WEEK[dayIndex],
        dayIndex
    };
};

// Room Definitions used in Map and Scheduler
// Updated colors to be translucent (bg-opacity-20) for better background visibility
export const CESFAM_ROOMS: RoomDefinition[] = [
    { id: 'COORDINACION', name: 'Coordinación', sector: 'ADMIN', gridArea: '1 / 1 / 2 / 2', color: 'bg-purple-900/20 border-purple-500/50 hover:bg-purple-900/40' },
    { id: 'FARMACIA', name: 'Farmacia', sector: 'ADMIN', gridArea: '1 / 2 / 2 / 4', color: 'bg-teal-900/20 border-teal-500/50 hover:bg-teal-900/40' },
    
    // AZUL (Left)
    { id: 'BOX_1', name: 'Box 1 (Azul)', sector: 'AZUL', gridArea: '2 / 1 / 3 / 2', color: 'bg-blue-900/20 border-blue-500/50 hover:bg-blue-900/40' },
    { id: 'BOX_2', name: 'Box 2 (Azul)', sector: 'AZUL', gridArea: '3 / 1 / 4 / 2', color: 'bg-blue-900/20 border-blue-500/50 hover:bg-blue-900/40' },
    { id: 'BOX_3', name: 'Box 3 (Azul)', sector: 'AZUL', gridArea: '4 / 1 / 5 / 2', color: 'bg-blue-900/20 border-blue-500/50 hover:bg-blue-900/40' },
    
    // ROJO (Center)
    { id: 'BOX_4', name: 'Box 4 (Rojo)', sector: 'ROJO', gridArea: '2 / 2 / 3 / 3', color: 'bg-red-900/20 border-red-500/50 hover:bg-red-900/40' },
    { id: 'BOX_5', name: 'Box 5 (Rojo)', sector: 'ROJO', gridArea: '3 / 2 / 4 / 3', color: 'bg-red-900/20 border-red-500/50 hover:bg-red-900/40' },
    { id: 'BOX_6', name: 'Box 6 (Rojo)', sector: 'ROJO', gridArea: '4 / 2 / 5 / 3', color: 'bg-red-900/20 border-red-500/50 hover:bg-red-900/40' },

    // AMARILLO (Right)
    { id: 'BOX_7', name: 'Box 7 (Amarillo)', sector: 'AMARILLO', gridArea: '2 / 3 / 3 / 4', color: 'bg-yellow-900/20 border-yellow-500/50 hover:bg-yellow-900/40' },
    { id: 'BOX_8', name: 'Box 8 (Amarillo)', sector: 'AMARILLO', gridArea: '3 / 3 / 4 / 4', color: 'bg-yellow-900/20 border-yellow-500/50 hover:bg-yellow-900/40' },
    { id: 'OFICINA_TECNICA', name: 'Oficinas Técnicas', sector: 'AMARILLO', gridArea: '4 / 3 / 5 / 4', color: 'bg-gray-900/30 border-gray-500/50 hover:bg-gray-800/50' }, 

    // BOTTOM
    { id: 'AREA_COMUN', name: 'Área Común', sector: 'COMMON', gridArea: '5 / 1 / 6 / 3', color: 'bg-gray-900/30 border-gray-600/50 hover:bg-gray-800/50' },
    { id: 'TERRENO', name: 'Salida a Terreno', sector: 'OUTSIDE', gridArea: '5 / 3 / 6 / 4', color: 'bg-green-900/20 border-green-500/50 hover:bg-green-900/40' },
];

export const INITIAL_STAFF: StaffMember[] = [
    // --- SECTOR AZUL (Elite, Academia) ---
    { 
        id: 'andres-guzman', 
        name: 'Dr. Andrés Guzmán', 
        role: 'Medico', 
        sectorId: 'AZUL', 
        burnout: 10, 
        morale: 90, 
        contractHours: 44,
        portraitUrl: "https://i.imgur.com/haTtDtC.png" 
    },
    { 
        id: 'paz-herrera', 
        name: 'Enf. Paz Herrera', 
        role: 'Enfermera', 
        sectorId: 'AZUL', 
        burnout: 30, 
        morale: 85, 
        contractHours: 44,
        portraitUrl: "https://i.imgur.com/JLlAfIm.png" 
    },
    { 
        id: 'javier-castro', 
        name: 'TENS Javier Castro', 
        role: 'TENS', 
        sectorId: 'AZUL', 
        burnout: 60, // Riesgo Oculto inicial alto
        morale: 50, 
        contractHours: 44,
        portraitUrl: "https://i.imgur.com/egOSYNj.png" 
    },

    // --- SECTOR ROJO (Normativa, Derechos) ---
    { 
        id: 'marcela-soto', 
        name: 'Enf. Marcela Soto', 
        role: 'Enfermera', 
        sectorId: 'ROJO', 
        burnout: 20, 
        morale: 80, 
        contractHours: 44,
        portraitUrl: "https://i.imgur.com/JLlAfIm.png" 
    },
    { 
        id: 'eduardo-naranjo', 
        name: 'Dr. Eduardo Naranjo', 
        role: 'Medico', 
        sectorId: 'ROJO', 
        burnout: 40, 
        morale: 60, 
        contractHours: 44,
        portraitUrl: "https://i.imgur.com/haTtDtC.png" 
    },
    { 
        id: 'claudia-morales', 
        name: 'TENS Claudia Morales', 
        role: 'TENS', 
        sectorId: 'ROJO', 
        burnout: 30, 
        morale: 70, 
        contractHours: 44,
        portraitUrl: "https://i.imgur.com/egOSYNj.png" 
    },

    // --- SECTOR AMARILLO (Comunidad, Calle) ---
    { 
        id: 'daniel-rios', 
        name: 'Sr. Daniel Ríos', 
        role: 'TENS', 
        sectorId: 'AMARILLO', 
        burnout: 50, 
        morale: 90, 
        contractHours: 44,
        portraitUrl: "https://i.imgur.com/egOSYNj.png" 
    },
    { 
        id: 'francisca-solis', 
        name: 'Enf. Francisca Solís', 
        role: 'Enfermera', 
        sectorId: 'AMARILLO', 
        burnout: 60, 
        morale: 40, // Moral baja por empatía/sufrimiento
        contractHours: 44,
        portraitUrl: "https://i.imgur.com/JLlAfIm.png" 
    },
    { 
        id: 'ricardo-meza', 
        name: 'Dr. Ricardo Meza', 
        role: 'Medico', 
        sectorId: 'AMARILLO', 
        burnout: 70, // Riesgo de renuncia
        morale: 30, 
        contractHours: 44,
        portraitUrl: "https://i.imgur.com/haTtDtC.png" 
    },
];

// Helper to determine default room based on staff ID and sector
const getDefaultRoom = (staff: StaffMember): string => {
    // AZUL
    if (staff.id === 'andres-guzman') return 'BOX_1'; // Box Principal Azul
    if (staff.id === 'paz-herrera') return 'BOX_2';
    if (staff.id === 'javier-castro') return 'BOX_3';
    
    // ROJO
    if (staff.id === 'marcela-soto') return 'COORDINACION'; // Suele estar gestionando
    if (staff.id === 'eduardo-naranjo') return 'BOX_5';
    if (staff.id === 'claudia-morales') return 'BOX_4';
    
    // AMARILLO
    if (staff.id === 'daniel-rios') return 'TERRENO'; // Siempre en la calle
    if (staff.id === 'francisca-solis') return 'BOX_7';
    if (staff.id === 'ricardo-meza') return 'BOX_8'; 

    return 'AREA_COMUN';
};

// Helper to generate default Clinical schedule
const generateDefaultSchedule = (): ScheduleAssignment[] => {
    const assignments: ScheduleAssignment[] = [];
    INITIAL_STAFF.forEach(staff => {
        const defaultRoom = getDefaultRoom(staff);
        DAYS_OF_WEEK.forEach(day => {
            SCHEDULE_BLOCKS.forEach(block => {
                // Default assignments based on personality
                let activity: 'CLINICAL' | 'ADMIN' | 'TERRAIN' | 'TRAINING' = 'CLINICAL';
                let roomId = defaultRoom;

                if (staff.id === 'daniel-rios') {
                    activity = 'TERRAIN';
                    roomId = 'TERRENO';
                }
                if (staff.id === 'andres-guzman' && day === 'Viernes') {
                    activity = 'ADMIN'; // Investigación
                    roomId = 'OFICINA_TECNICA';
                }

                assignments.push({
                    staffId: staff.id,
                    day,
                    block,
                    activity, 
                    roomId
                });
            });
        });
    });
    return assignments;
};


export const DIRECTOR_OBJECTIVES: DirectorObjectives = {
  maxDeadline: 28,
  minBudget: 0,
  minReputation: 30,
  minProgress: 100,
  minTrustWithRequired: 40,
  requiredStakeholdersRoles: [
    "Jefe Sector Azul",
    "Jefa Sector Rojo",
    "Jefe Sector Amarillo"
  ]
};

export const INITIAL_GAME_STATE: GameState = {
  playerName: '',
  projectTitle: "Gestión Directiva CESFAM: Los Tres Sectores",
  budget: 1000000,
  day: 1,
  timeSlot: 'mañana',
  projectDeadline: 28,
  reputation: 60,
  projectProgress: 0,
  stakeholders: [
    // --- SOPORTE ADMINISTRATIVO ---
    {
      id: "sofia-castro",
      shortId: "SC",
      name: "Sofía Castro",
      role: "Asistente Administrativa",
      power: 20, interest: 100, trust: 80, support: 100, minSupport: 50, maxSupport: 100, mood: 'neutral',
      personality: "Profesional, discreta y experta en la burocracia. Es el nexo entre la Dirección y la realidad operativa de los sectores.",
      portraitUrl: 'https://i.imgur.com/6ZCdB5G.png',
      agenda: ["Mantener el orden administrativo.", "Evitar conflictos legales.", "Asegurar que el Director tenga la información correcta."],
      commitments: [],
      informationTiers: [],
      questions: CESFAM_QUESTIONS['sofia-castro'] ?? [],
      questionsAsked: [],
      status: 'ok',
      lastMetDay: 0,
    },

    // --- SECTOR AZUL ---
    {
      id: "andres-guzman",
      shortId: "AG",
      name: "Dr. Andrés Guzmán",
      role: "Jefe Sector Azul",
      power: 90, interest: 80, trust: 50, support: 50, minSupport: 20, maxSupport: 90, mood: 'neutral',
      personality: "El Académico Político. Carismático y conectado, pero elitista. Valora el prestigio y la investigación sobre la productividad asistencial.",
      portraitUrl: "https://i.imgur.com/haTtDtC.png",
      agenda: [
        "Obtener horas protegidas para investigación.",
        "Asegurar el mejor equipamiento (Box 5) para su sector.",
        "Mantener el estatus del Sector Azul como referente académico."
      ],
      commitments: [],
      informationTiers: [
        { trustThreshold: 60, information: "Está negociando un convenio con la Universidad a espaldas de la Dirección." },
        { trustThreshold: 80, information: "Usa su influencia política externa como amenaza si no consigue recursos." }
      ],
      questions: CESFAM_QUESTIONS['andres-guzman'] ?? [],
      questionsAsked: [],
      status: 'ok',
      lastMetDay: 0,
    },
    {
      id: "paz-herrera",
      shortId: "PH",
      name: "Enf. Paz Herrera",
      role: "Enfermera Sector Azul",
      power: 40, interest: 70, trust: 60, support: 60, minSupport: 30, maxSupport: 80, mood: 'neutral',
      personality: "La Ejecutora Leal. Brillante técnicamente, eficiente, pero ve a los pacientes 'difíciles' como una molestia. Lealtad total a Guzmán.",
      portraitUrl: "https://i.imgur.com/JLlAfIm.png",
      agenda: [
        "Maximizar la eficiencia clínica.",
        "Evitar tareas 'menores' (visitas domiciliarias básicas).",
        "Seguir la visión académica de Guzmán."
      ],
      commitments: [],
      informationTiers: [],
      questions: CESFAM_QUESTIONS['paz-herrera'] ?? [],
      questionsAsked: [],
      status: 'ok',
      lastMetDay: 0,
    },
    {
      id: "javier-castro",
      shortId: "JC",
      name: "TENS Javier Castro",
      role: "TENS Sector Azul",
      power: 10, interest: 50, trust: 50, support: 50, minSupport: 10, maxSupport: 70, mood: 'anxious',
      personality: "El Eslabón Silencioso. Tímido y muy trabajador. Absorbe toda la carga que Guzmán y Herrera rechazan. Riesgo alto de colapso silencioso.",
      portraitUrl: "https://i.imgur.com/egOSYNj.png",
      agenda: [
        "Sobrevivir a la carga laboral sin conflictos.",
        "Evitar errores administrativos.",
        "No decepcionar a sus jefes."
      ],
      commitments: [],
      informationTiers: [
        { trustThreshold: 50, information: "Está cubriendo errores de registro de Herrera para evitar problemas." }
      ],
      questions: CESFAM_QUESTIONS['javier-castro'] ?? [],
      questionsAsked: [],
      status: 'ok',
      lastMetDay: 0,
    },

    // --- SECTOR ROJO ---
    {
      id: "marcela-soto",
      shortId: "MS",
      name: "Enf. Marcela Soto",
      role: "Jefa Sector Rojo",
      power: 80, interest: 95, trust: 50, support: 50, minSupport: 10, maxSupport: 80, mood: 'neutral',
      personality: "La Guardiana del Reglamento. Maternal con su equipo, inflexible con la dirección. Su prioridad son los derechos laborales y los protocolos.",
      portraitUrl: "https://i.imgur.com/JLlAfIm.png",
      agenda: [
        "Bloquear horas extra no reglamentadas.",
        "Cumplimiento estricto de protocolos (cero riesgo legal).",
        "Proteger a su equipo de la sobrecarga."
      ],
      commitments: [],
      informationTiers: [
        { trustThreshold: 70, information: "Tiene preparada una denuncia a Contraloría si se violan los descansos." }
      ],
      questions: CESFAM_QUESTIONS['marcela-soto'] ?? [],
      questionsAsked: [],
      status: 'ok',
      lastMetDay: 0,
    },
    {
      id: "eduardo-naranjo",
      shortId: "EN",
      name: "Dr. Eduardo Naranjo",
      role: "Médico Sector Rojo",
      power: 30, interest: 40, trust: 60, support: 60, minSupport: 20, maxSupport: 70, mood: 'neutral',
      personality: "El Pasivo Complaciente. Competente pero sin carácter. Evita conflictos dando licencias o demorándose en las consultas. Protegido por Soto.",
      portraitUrl: "https://i.imgur.com/haTtDtC.png",
      agenda: [
        "Evitar conflictos con pacientes y jefatura.",
        "Mantener su rutina sin sobresaltos.",
        "No ser responsabilizado por decisiones difíciles."
      ],
      commitments: [],
      informationTiers: [],
      questions: CESFAM_QUESTIONS['eduardo-naranjo'] ?? [],
      questionsAsked: [],
      status: 'ok',
      lastMetDay: 0,
    },
    {
      id: "claudia-morales",
      shortId: "CM",
      name: "TENS Claudia Morales",
      role: "TENS Sector Rojo",
      power: 50, interest: 90, trust: 40, support: 40, minSupport: 0, maxSupport: 80, mood: 'angry',
      personality: "La Activista. Fuerte sentido de justicia. Vocal y conflictiva. Detonante de conflictos de clima laboral y Ley Karin.",
      portraitUrl: "https://i.imgur.com/egOSYNj.png",
      agenda: [
        "Denunciar cualquier injusticia o maltrato.",
        "Movilizar al gremio si es necesario.",
        "Exigir respeto para el estamento TENS."
      ],
      commitments: [],
      informationTiers: [
        { trustThreshold: 40, information: "Está recopilando antecedentes para una acusación por acoso laboral." }
      ],
      questions: CESFAM_QUESTIONS['claudia-morales'] ?? [],
      questionsAsked: [],
      status: 'ok',
      lastMetDay: 0,
    },

    // --- SECTOR AMARILLO ---
    {
        id: "daniel-rios",
        shortId: "DR",
        name: "Sr. Daniel Ríos",
        role: "Jefe Sector Amarillo",
        power: 70, interest: 90, trust: 60, support: 60, minSupport: 30, maxSupport: 90, mood: 'neutral',
        personality: "El Líder Callejero. Pragmático, anti-burocracia, orientado a la acción social. Se salta las reglas para ayudar al vecino. Respaldo de la comunidad.",
        portraitUrl: "https://i.imgur.com/egOSYNj.png",
        agenda: [
          "Soluciones rápidas para los pacientes (saltarse protocolos).",
          "Conseguir recursos para terreno.",
          "Mantener la paz social con la Junta de Vecinos."
        ],
        commitments: [],
        informationTiers: [
          { trustThreshold: 60, information: "Ha autorizado entregas de medicamentos sin receta completa para ayudar a vecinos." }
        ],
        questions: CESFAM_QUESTIONS['daniel-rios'] ?? [],
        questionsAsked: [],
        status: 'ok',
        lastMetDay: 0,
    },
    {
        id: "francisca-solis",
        shortId: "FS",
        name: "Enf. Francisca Solís",
        role: "Enfermera Sector Amarillo",
        power: 30, interest: 80, trust: 70, support: 70, minSupport: 40, maxSupport: 90, mood: 'sad',
        personality: "El Corazón Emocional. Empática hasta el dolor. Sufre con las fallas del sistema. Barómetro ético de la gestión.",
        portraitUrl: "https://i.imgur.com/JLlAfIm.png",
        agenda: [
          "Humanizar la atención.",
          "Ayudar a los casos sociales complejos.",
          "No perder la sensibilidad ante el sufrimiento."
        ],
        commitments: [],
        informationTiers: [],
        questions: CESFAM_QUESTIONS['francisca-solis'] ?? [],
        questionsAsked: [],
        status: 'ok',
        lastMetDay: 0,
    },
    {
        id: "ricardo-meza",
        shortId: "RM",
        name: "Dr. Ricardo Meza",
        role: "Médico Sector Amarillo",
        power: 40, interest: 60, trust: 50, support: 50, minSupport: 10, maxSupport: 80, mood: 'frustrated',
        personality: "El Inconformista Impaciente. Joven, moderno, quiere cambios rápidos. Se frustra con la falta de tecnología. Riesgo de renuncia.",
        portraitUrl: "https://i.imgur.com/haTtDtC.png",
        agenda: [
          "Modernizar la gestión (menos papel, más apps).",
          "Obtener herramientas tecnológicas (ecógrafos, tablets).",
          "Ver resultados rápidos o irse al sector privado."
        ],
        commitments: [],
        informationTiers: [
          { trustThreshold: 50, information: "Ya tuvo una entrevista en una clínica privada la semana pasada." }
        ],
        questions: CESFAM_QUESTIONS['ricardo-meza'] ?? [],
        questionsAsked: [],
        status: 'ok',
        lastMetDay: 0,
    }
  ],
  staffRoster: INITIAL_STAFF,
  weeklySchedule: generateDefaultSchedule(),
  calendar: [],
  eventsLog: [],
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
  scenarioSchedule: {}, // Initialize empty, will be populated by App on startup
};
