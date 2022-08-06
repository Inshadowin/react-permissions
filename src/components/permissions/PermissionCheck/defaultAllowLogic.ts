import type { AllowedLogicType } from '../types';

export const defaultAllowLogic: AllowedLogicType = (allowedActions, denied) => {
  return !denied?.length;
};
