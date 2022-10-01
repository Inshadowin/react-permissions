import type { CheckResult } from '../types';

/**
 * function default to all permissions set as false
 * @param actions - actions check payload
 */
export const defaultOnCheckPermissions = <T extends string>(
  actions: T[]
): CheckResult<T> => {
  return actions?.map(action => ({ action, allowed: false }));
};
