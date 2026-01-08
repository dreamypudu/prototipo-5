import { EmailTemplate } from '../../types';

export const EMAIL_TEMPLATES: EmailTemplate[] = [
    {
        email_id: 'email-001-welcome',
        trigger: { type: 'ON_MEETING_COMPLETE', stakeholder_id: 'system-startup' }, // Special trigger for day 1
        from: 'Dirección General (CEO Office)',
        subject: 'Bienvenida y expectativas para el Proyecto Quantum Leap',
        body: `Estimado/a nuevo/a CTO,\n\nLe damos la más cordial bienvenida a Innovatec S.A. Confiamos plenamente en su capacidad para liderar el 'Proyecto Quantum Leap', nuestra iniciativa más estratégica hasta la fecha.\n\nEl Directorio tiene grandes expectativas. La finalización exitosa de este proyecto no solo es crucial para nuestro futuro tecnológico, sino que también será un factor determinante en la evaluación de su desempeño.\n\nNo dude en utilizar todos los recursos a su disposición. Esperamos ver resultados tangibles pronto.\n\nAtentamente,\nLa Dirección.`
    },
    // Ricardo Vargas Availability Emails (Randomized)
    {
      email_id: "E002_RV_AVAIL_PROFESSIONAL",
      trigger: {
        type: "ON_MEETING_COMPLETE",
        stakeholder_id: "ricardo-vargas" 
      },
      from: "Laura Fernandez, Asistente Ejecutiva",
      subject: "Ventana de disponibilidad para Ricardo Vargas",
      body: "Hola, \n\nPara el seguimiento de la próxima semana, Ricardo me pide que te informe que estará extremadamente ocupado terminando el **informe trimestral para la auditoría**. \n\nDebido a esto, su única disponibilidad será el **jueves por la tarde**. \n\nSaludos.",
      grants_information: "THURSDAY_tarde"
    },
    {
      email_id: "E003_RV_AVAIL_PERSONAL",
      trigger: {
        type: "ON_MEETING_COMPLETE",
        stakeholder_id: "ricardo-vargas"
      },
      from: "Laura Fernandez, Asistente Ejecutiva",
      subject: "Ventana de disponibilidad para Ricardo Vargas",
      body: "Hola, \n\nPara el seguimiento de la próxima semana, Ricardo me pide que te informe que se tomará unos días libres porque es el **cumpleaños de su hija** y le prometió un viaje. \n\nDebido a esto, su única disponibilidad será el **miércoles por la mañana**. \n\nSaludos.",
      grants_information: "WEDNESDAY_mañana"
    },
    // Carolina Soto Availability Emails (Randomized)
    {
      email_id: "E004_CS_AVAIL_PROFESSIONAL",
      trigger: {
        type: "ON_MEETING_COMPLETE",
        stakeholder_id: "carolina-soto"
      },
      from: "Laura Fernandez, Asistente Ejecutiva",
      subject: "Disponibilidad de Carolina Soto",
      body: "Hola,\n\nCarolina me informa que la próxima semana estará en una conferencia de Marketing Digital fuera de la ciudad. \n\nSu única ventana para una reunión de seguimiento será el **martes por la mañana** antes de su vuelo.\n\nGracias.",
      grants_information: "TUESDAY_mañana"
    },
    {
      email_id: "E005_CS_AVAIL_NEUTRAL",
      trigger: {
        type: "ON_MEETING_COMPLETE",
        stakeholder_id: "carolina-soto"
      },
      from: "Laura Fernandez, Asistente Ejecutiva",
      subject: "Disponibilidad de Carolina Soto",
      body: "Hola,\n\nRevisando la agenda de Carolina para la próxima semana, tiene varios compromisos ya fijados.\n\nEl único bloque que tiene completamente libre para una reunión es el **viernes por la tarde**.\n\nSaludos.",
      grants_information: "FRIDAY_tarde"
    }
];