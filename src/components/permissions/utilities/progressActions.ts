import { expand, remove } from '.';
import type { ActionType, ProgressPermissionsRefType } from '../types';

type ProcessProgressAction = {
  progressPermissionsRef: ProgressPermissionsRefType;
  actionsToCheck: ActionType[];
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
