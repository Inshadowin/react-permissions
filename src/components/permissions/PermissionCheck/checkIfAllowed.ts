import type { ActionType, ActionStatusType, AllowedLogicType } from '../types';

export const checkIfAllowed = (
  actionsStatus: ActionStatusType[],
  isAllowed: AllowedLogicType,
  payload: ActionType[]
) => {
  const allowed = actionsStatus.filter(as => as.allowed).map(as => as.action);
  const denied = actionsStatus.filter(as => !as.allowed).map(as => as.action);

  return isAllowed(allowed, denied, payload);
};
