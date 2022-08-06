import type { ActionStatusType, AllowedLogicType } from '../types';

export const checkIfAllowed = (
  actionsStatus: ActionStatusType[],
  isAllowed: AllowedLogicType
) => {
  const allowed = actionsStatus.filter(as => as.allowed).map(as => as.action);
  const denied = actionsStatus.filter(as => !as.allowed).map(as => as.action);

  return isAllowed(allowed, denied);
};
