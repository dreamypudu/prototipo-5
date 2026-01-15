import React, { useMemo, useState } from 'react';
import { QuestionRequirement, Stakeholder, StakeholderQuestion } from '../types';

interface NpcQuestionsPanelProps {
  stakeholder: Stakeholder;
  reputation: number;
  onAskQuestion: (question: StakeholderQuestion) => void;
}

type QuestionStatus = 'available' | 'locked' | 'asked';

const getRequirementText = (requirements: QuestionRequirement | undefined): string => {
  if (!requirements) return '';
  const parts: string[] = [];
  if (typeof requirements.trust_min === 'number') parts.push(`Confianza >= ${requirements.trust_min}`);
  if (typeof requirements.support_min === 'number') parts.push(`Apoyo >= ${requirements.support_min}`);
  if (typeof requirements.reputation_min === 'number') parts.push(`Reputacion >= ${requirements.reputation_min}`);
  return parts.join(' | ');
};

const meetsRequirements = (
  question: StakeholderQuestion,
  stakeholder: Stakeholder,
  reputation: number
): boolean => {
  const req = question.requirements;
  if (!req) return true;
  if (typeof req.trust_min === 'number' && stakeholder.trust < req.trust_min) return false;
  if (typeof req.support_min === 'number' && stakeholder.support < req.support_min) return false;
  if (typeof req.reputation_min === 'number' && reputation < req.reputation_min) return false;
  return true;
};

const NpcQuestionsPanel: React.FC<NpcQuestionsPanelProps> = ({ stakeholder, reputation, onAskQuestion }) => {
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const questions = stakeholder.questions ?? [];
  const askedSet = useMemo(() => new Set(stakeholder.questionsAsked ?? []), [stakeholder.questionsAsked]);

  const getStatus = (question: StakeholderQuestion): QuestionStatus => {
    if (askedSet.has(question.question_id)) return 'asked';
    return meetsRequirements(question, stakeholder, reputation) ? 'available' : 'locked';
  };

  const handleQuestionClick = (question: StakeholderQuestion) => {
    const status = getStatus(question);
    if (status !== 'available') return;
    onAskQuestion(question);
    setActiveQuestionId(question.question_id);
  };

  const activeQuestion = questions.find(q => q.question_id === activeQuestionId) || null;

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 h-full flex flex-col animate-fade-in">
      <h2 className="text-2xl font-bold mb-2 text-blue-300">Preguntas a {stakeholder.name}</h2>
      <p className="text-gray-400 mb-4 text-sm">
        Solo puedes preguntar al inicio o al final de la reunion. Las preguntas bloqueadas muestran requisitos.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow">
        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 overflow-y-auto">
          <ul className="space-y-3">
            {questions.length === 0 && (
              <li className="text-sm text-gray-400 italic">No hay preguntas disponibles.</li>
            )}
            {questions.map(question => {
              const status = getStatus(question);
              const requirementText = getRequirementText(question.requirements);
              const isActive = activeQuestionId === question.question_id;
              return (
                <li key={question.question_id}>
                  <button
                    onClick={() => handleQuestionClick(question)}
                    disabled={status !== 'available'}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      status === 'asked'
                        ? 'bg-gray-800/60 border-gray-700 text-gray-400'
                        : status === 'locked'
                          ? 'bg-gray-900/50 border-gray-800 text-gray-500 cursor-not-allowed'
                          : isActive
                            ? 'bg-blue-900/50 border-blue-500 text-white'
                            : 'bg-gray-800/60 border-gray-600 text-gray-200 hover:bg-gray-700/60 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex justify-between gap-2">
                      <span className="text-sm font-semibold">{question.text}</span>
                      {status === 'asked' && (
                        <span className="text-[10px] uppercase text-green-300">Preguntado</span>
                      )}
                      {status === 'locked' && (
                        <span className="text-[10px] uppercase text-yellow-300">Bloqueado</span>
                      )}
                    </div>
                    {status === 'locked' && requirementText && (
                      <div className="text-[10px] text-gray-500 mt-1">{requirementText}</div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 flex flex-col">
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">Respuesta</h3>
          {activeQuestion ? (
            <div className="mt-3 text-sm text-gray-200 leading-relaxed">
              {activeQuestion.answer}
            </div>
          ) : (
            <div className="mt-3 text-sm text-gray-500 italic">
              Selecciona una pregunta disponible para ver la respuesta.
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.5s ease-in forwards; }
      `}</style>
    </div>
  );
};

export default NpcQuestionsPanel;
