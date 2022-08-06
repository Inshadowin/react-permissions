import { useEffect, useRef } from 'react';
import isEqual from 'lodash.isequal';

const useDeepCompareMemoize = (deps: any[]) => {
  const ref = useRef<any[]>([]);

  if (!isEqual(deps, ref.current)) {
    ref.current = deps;
  }

  return ref.current;
};

export const useDeepEffect = (factory: () => void, deps: any[]) => {
  //eslint-disable-next-line
  return useEffect(factory, useDeepCompareMemoize(deps));
};
