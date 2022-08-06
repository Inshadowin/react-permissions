import { has } from '.';
import type {
  ActionType,
  PermissionType,
  ProgressPermissionsRefType,
} from '../types';

type GetActionsToCheckParams = {
  actions: ActionType[];
  checkedPermissions: PermissionType[];
  progressPermissionsRef: ProgressPermissionsRefType;
};

export const getActionsToCheck = ({
  actions,
  checkedPermissions = [],
  progressPermissionsRef,
}: GetActionsToCheckParams): ActionType[] => {
  const actionsToCheck = [actions]
    .flat(Infinity)
    .filter(a => !!a)
    .filter((a: ActionType) => !has(checkedPermissions, a))
    .filter((a: ActionType) => !has(progressPermissionsRef?.current, a));

  return actionsToCheck as ActionType[];
};
