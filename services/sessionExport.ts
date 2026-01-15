import {
  CanonicalAction,
  ComparisonResult,
  DecisionLogEntry,
  ExpectedAction,
  GameState,
  MechanicEvent,
  PlayerActionLogEntry,
  ProcessLogEntry,
  QuestionLogEntry,
  SimulatorConfig
} from '../types';
import { compareExpectedVsActual } from './ComparisonEngine';

export interface SessionExport {
  session_metadata: {
    session_id: string;
    simulator_version_id: string;
    user_id?: string;
    start_time: string;
    end_time: string;
  };
  explicit_decisions: DecisionLogEntry[];
  expected_actions: ExpectedAction[];
  mechanic_events: MechanicEvent[];
  canonical_actions: CanonicalAction[];
  comparisons: ComparisonResult[];
  process_log: ProcessLogEntry[];
  player_actions_log: PlayerActionLogEntry[];
  question_log: QuestionLogEntry[];
  final_state: {
    stakeholders: GameState['stakeholders'];
    global: {
      day: number;
      timeSlot: GameState['timeSlot'];
      budget: number;
      reputation: number;
      projectProgress: number;
    };
  };
}

interface SessionExportParams {
  gameState: GameState;
  config: SimulatorConfig | null;
  sessionId: string;
  startedAt?: number | null;
  endedAt?: number | null;
}

export const buildSessionExport = ({
  gameState,
  config,
  sessionId,
  startedAt,
  endedAt
}: SessionExportParams): SessionExport => {
  const startTime = new Date(startedAt ?? Date.now()).toISOString();
  const endTime = new Date(endedAt ?? Date.now()).toISOString();
  const newComparisons = compareExpectedVsActual(
    gameState.expectedActions,
    gameState.canonicalActions,
    gameState.comparisons,
    { includeNotDone: true }
  );
  const comparisons = newComparisons.length > 0
    ? [...gameState.comparisons, ...newComparisons]
    : gameState.comparisons;

  return {
    session_metadata: {
      session_id: sessionId,
      simulator_version_id: config?.version_id ?? 'UNKNOWN',
      user_id: gameState.playerName || undefined,
      start_time: startTime,
      end_time: endTime
    },
    explicit_decisions: gameState.decisionLog,
    expected_actions: gameState.expectedActions,
    mechanic_events: gameState.mechanicEvents,
    canonical_actions: gameState.canonicalActions,
    comparisons,
    process_log: gameState.processLog,
    player_actions_log: gameState.playerActionsLog,
    question_log: gameState.questionLog,
    final_state: {
      stakeholders: gameState.stakeholders,
      global: {
        day: gameState.day,
        timeSlot: gameState.timeSlot,
        budget: gameState.budget,
        reputation: gameState.reputation,
        projectProgress: gameState.projectProgress
      }
    }
  };
};
