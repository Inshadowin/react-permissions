import React, { useEffect } from 'react';

import { useCheckPermission } from '.';
import { useRefValue } from '../../hooks';
import type { ActionType } from './types';

type FallbackContainerProps = Pick<
  PermissionCheckProps,
  'action' | 'fallback' | 'onDenied'
>;

export type PermissionCheckProps = {
  action: ActionType;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
  onDenied?: (action: ActionType) => void;
};

const FallbackContainer: React.FC<FallbackContainerProps> = ({
  action,
  fallback,
  onDenied,
}) => {
  const onDeniedRef = useRefValue(onDenied);

  useEffect(() => {
    if (!onDeniedRef.current) return;
    onDeniedRef.current?.(action);
  }, [action, onDeniedRef]);

  return fallback as JSX.Element;
};

export const PermissionCheck: React.FC<PermissionCheckProps> = ({
  children,
  action,
  onDenied,
  loading = null,
  fallback = null,
}) => {
  const { allowed, checked } = useCheckPermission(action);

  if (!checked) return loading as JSX.Element;
  if (!allowed) {
    return (
      <FallbackContainer
        action={action}
        fallback={fallback}
        onDenied={onDenied}
      />
    );
  }

  return children as JSX.Element;
};
