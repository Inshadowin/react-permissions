import type { ActionType } from '../types';

export const createPayload = (
  action: ActionType | ActionType[]
): ActionType[] => {
  return Array.isArray(action) ? action : [action];
};
