import type { ActionStatusType, AllowedLogicType } from '../types';

export const checkIfAllowed = <T extends string = string>(
  actionsStatus: ActionStatusType<T>[],
  isAllowed: AllowedLogicType,
  payload: T[]
) => {
  const allowed = actionsStatus.filter(as => as.allowed).map(as => as.action);
  const denied = actionsStatus.filter(as => !as.allowed).map(as => as.action);

  return isAllowed(allowed, denied, payload);
};
