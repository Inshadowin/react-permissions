import { expand, remove } from '.';
import type { ProgressPermissionsRefType } from '../types';

type ProcessProgressAction<T extends string = string> = {
  progressPermissionsRef: ProgressPermissionsRefType<T>;
  actionsToCheck: T[];
};

export const addActionsToProgress = <T extends string = string>({
  progressPermissionsRef,
  actionsToCheck = [],
}: ProcessProgressAction<T>) => {
  const newInProgressPermissions = expand(
    progressPermissionsRef.current,
    actionsToCheck
  );

  return (progressPermissionsRef.current = newInProgressPermissions);
};

export const removeActionsFromProgress = <T extends string = string>({
  progressPermissionsRef,
  actionsToCheck = [],
}: ProcessProgressAction<T>) => {
  const newInProgressPermissions = remove<T>(
    progressPermissionsRef.current,
    actionsToCheck
  );

  return (progressPermissionsRef.current = newInProgressPermissions);
};
