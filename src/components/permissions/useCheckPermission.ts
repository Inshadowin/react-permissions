import { useEffect } from 'react';

import { usePermissions } from '.';
import { useRefValue } from '../../hooks';
import type { ActionType } from './types';

export const useCheckPermission = (action: ActionType) => {
  const { check, allowed } = usePermissions();

  const checkRef = useRefValue(check);

  useEffect(() => {
    checkRef.current?.(action);
  }, [action, checkRef]);

  return allowed(action);
};
