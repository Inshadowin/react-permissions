import { useMemo } from 'react';

import { useCheckPermissions } from './useCheckPermissions';

export const useAllowed = <T extends string = string>(actions: T[]) => {
  const result = useCheckPermissions(actions);

  return useMemo(() => {
    const set = new Set(result.filter(a => a.allowed).map(a => a.action));
    return actions.filter(a => set.has(a));
  }, [result]);
};
