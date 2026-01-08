
import { EmailTemplate } from '../types';

export const EMAIL_TEMPLATES: EmailTemplate[] = [
    {
        email_id: 'email-001-welcome',
        trigger: { type: 'ON_MEETING_COMPLETE', stakeholder_id: 'system-startup' },
        from: 'Servicio de Salud',
        subject: 'Nombramiento y Desafío de Gestión',
        body: `Estimado/a Director/a:\n\nConfirmamos su nombramiento a cargo del CESFAM. Usted hereda una institución compleja, dividida en tres "feudos" históricos:\n\n1. SECTOR AZUL (Dr. Guzmán): Académico, elitista, difícil de manejar pero técnicamente impecable.\n2. SECTOR ROJO (Enf. Soto): Rígido, normativo, defensivo ante cualquier cambio.\n3. SECTOR AMARILLO (Sr. Ríos): Caótico, volcado a la comunidad, pero administrativamente riesgoso.\n\nSu misión es alinear a estos tres líderes. Si falla, el conflicto interno paralizará la atención a los pacientes.\n\nSu asistente, Sofía, ya ha agendado las primeras reuniones de presentación.\n\nÉxito en su gestión.`
    }
];
