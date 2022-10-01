import { has } from '.';
import type { ProgressPermissionsRefType } from '../types';

type GetActionsToCheckParams<T extends string = string> = {
  actions: T[];
  checkedPermissions: T[];
  progressPermissionsRef: ProgressPermissionsRefType;
};

export const getActionsToCheck = <T extends string = string>({
  actions,
  checkedPermissions = [],
  progressPermissionsRef,
}: GetActionsToCheckParams): T[] => {
  const actionsToCheck = [actions]
    .flat(Infinity)
    .filter(a => !!a)
    .filter((a: T) => !has(checkedPermissions, a))
    .filter((a: T) => !has(progressPermissionsRef?.current, a));

  return actionsToCheck as T[];
};
