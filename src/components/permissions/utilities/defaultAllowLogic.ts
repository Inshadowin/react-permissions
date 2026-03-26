import xor from 'lodash.xor';

import type { AllowedLogicType } from '../types';

export const defaultAllowLogic: AllowedLogicType = (
  allowedActions,
  denied,
  payload
) => {
  return !denied?.length && !xor(allowedActions, payload).length;
};
