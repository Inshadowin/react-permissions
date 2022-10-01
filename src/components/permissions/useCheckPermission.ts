import { useEffect } from 'react';

import { usePermissions } from '.';
import { useRefValue } from '../../hooks';

export const useCheckPermission = <T extends string = string>(action: T) => {
  const { check, allowed } = usePermissions();

  const checkRef = useRefValue(check);

  useEffect(() => {
    checkRef.current?.(action);
  }, [action, checkRef]);

  return allowed(action);
};
