import { CanonicalAction, ExpectedAction } from '../types';

export type ComparisonOutcome = 'DONE_OK' | 'DEVIATION';

export type ComparisonRule = (
  expected: ExpectedAction,
  actual: CanonicalAction
) => { outcome: ComparisonOutcome; deviation?: any };

const isObject = (value: unknown): value is Record<string, any> => {
  return value !== null && typeof value === 'object';
};

const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (!isObject(a) || !isObject(b)) return false;
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  return aKeys.every((key) => deepEqual(a[key], b[key]));
};

const defaultRule: ComparisonRule = (expected, actual) => {
  const constraints = expected.constraints || {};
  const constraintKeys = Object.keys(constraints);
  if (constraintKeys.length === 0) {
    return { outcome: 'DONE_OK' };
  }

  const actualValues = isObject(actual.value_final) ? actual.value_final : {};
  const actualContext = isObject(actual.context) ? actual.context : {};
  const mergedActual = { ...actualContext, ...actualValues };
  const missing: Record<string, any> = {};

  constraintKeys.forEach((key) => {
    if (!(key in mergedActual) || !deepEqual(mergedActual[key], constraints[key])) {
      missing[key] = constraints[key];
    }
  });

  if (Object.keys(missing).length === 0) {
    return { outcome: 'DONE_OK' };
  }

  return {
    outcome: 'DEVIATION',
    deviation: {
      missing,
      actual: mergedActual
    }
  };
};

export const comparisonRules: Record<string, ComparisonRule> = {
  default_rule: defaultRule
};
