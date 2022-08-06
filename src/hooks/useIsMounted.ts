import { useRef, useEffect } from 'react';

export const useIsMounted = () => {
  const mounted = useRef<boolean>(false);

  useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);

  return mounted;
};
