import {
  Consequences,
  EffectMagnitude,
  GlobalAttributeId,
  GlobalEffectsReal,
  GlobalEffectsUI
} from '../types';

const BUDGET_THRESHOLDS = {
  small: 10000,
  medium: 50000
};

const REPUTATION_THRESHOLDS = {
  small: 5,
  medium: 10
};

const BUDGET_MAGNITUDE_VALUES: Record<EffectMagnitude, number> = {
  S: 10000,
  M: 50000,
  L: 100000
};

const REPUTATION_MAGNITUDE_VALUES: Record<EffectMagnitude, number> = {
  S: 5,
  M: 10,
  L: 15
};

const getMagnitudeForBudget = (value: number): EffectMagnitude | null => {
  if (value <= 0) return null;
  if (value <= BUDGET_THRESHOLDS.small) return 'S';
  if (value <= BUDGET_THRESHOLDS.medium) return 'M';
  return 'L';
};

const getMagnitudeForReputation = (value: number): EffectMagnitude | null => {
  if (value <= 0) return null;
  if (value <= REPUTATION_THRESHOLDS.small) return 'S';
  if (value <= REPUTATION_THRESHOLDS.medium) return 'M';
  return 'L';
};

const resolveLegacyEffect = (
  attribute: GlobalAttributeId,
  change: number | undefined
): { magnitude: EffectMagnitude; direction: '+' | '-' } | null => {
  if (typeof change !== 'number' || change === 0) return null;
  const absValue = Math.abs(change);
  const magnitude = attribute === 'budget'
    ? getMagnitudeForBudget(absValue)
    : getMagnitudeForReputation(absValue);
  if (!magnitude) return null;
  const direction = change > 0 ? '+' : '-';
  return { magnitude, direction };
};

const getDeltaFromReal = (
  attribute: GlobalAttributeId,
  real: { magnitude: EffectMagnitude; direction: '+' | '-' }
): number => {
  const magnitudeValue = attribute === 'budget'
    ? BUDGET_MAGNITUDE_VALUES[real.magnitude]
    : REPUTATION_MAGNITUDE_VALUES[real.magnitude];
  return real.direction === '+' ? magnitudeValue : -magnitudeValue;
};

export const clampReputation = (value: number): number => {
  return Math.max(0, Math.min(100, value));
};

export const resolveGlobalEffects = (consequences: Consequences): {
  ui: GlobalEffectsUI;
  real: GlobalEffectsReal;
  deltas: { budget: number; reputation: number };
} => {
  const ui: GlobalEffectsUI = { ...(consequences.global_effects_ui ?? {}) };
  const real: GlobalEffectsReal = {};
  const deltas = { budget: 0, reputation: 0 };

  const budgetReal = consequences.global_effects_real?.budget;
  if (budgetReal) {
    real.budget = budgetReal;
    deltas.budget = getDeltaFromReal('budget', budgetReal);
  } else {
    const legacy = resolveLegacyEffect('budget', consequences.budgetChange);
    if (legacy) {
      real.budget = legacy;
      deltas.budget = consequences.budgetChange ?? 0;
    }
  }

  const reputationReal = consequences.global_effects_real?.reputation;
  if (reputationReal) {
    real.reputation = reputationReal;
    deltas.reputation = getDeltaFromReal('reputation', reputationReal);
  } else {
    const legacy = resolveLegacyEffect('reputation', consequences.reputationChange);
    if (legacy) {
      real.reputation = legacy;
      deltas.reputation = consequences.reputationChange ?? 0;
    }
  }

  if (!ui.budget && real.budget) {
    ui.budget = real.budget.magnitude;
  }
  if (!ui.reputation && real.reputation) {
    ui.reputation = real.reputation.magnitude;
  }

  return { ui, real, deltas };
};
