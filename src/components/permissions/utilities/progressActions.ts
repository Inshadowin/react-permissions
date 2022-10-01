import { expand, remove } from '.';
import type { ProgressPermissionsRefType } from '../types';

type ProcessProgressAction<T extends string = string> = {
  progressPermissionsRef: ProgressPermissionsRefType;
  actionsToCheck: T[];
};

export const addActionsToProgress = ({
  progressPermissionsRef,
  actionsToCheck = [],
}: ProcessProgressAction) => {
  const newInProgressPermissions = expand(
    progressPermissionsRef.current,
    actionsToCheck
  );

  return (progressPermissionsRef.current = newInProgressPermissions);
};

export const removeActionsFromProgress = ({
  progressPermissionsRef,
  actionsToCheck = [],
}: ProcessProgressAction) => {
  const newInProgressPermissions = remove(
    progressPermissionsRef.current,
    actionsToCheck
  );

  return (progressPermissionsRef.current = newInProgressPermissions);
};
