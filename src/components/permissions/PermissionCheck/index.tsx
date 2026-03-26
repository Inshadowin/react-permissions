import React from 'react';

import { useCheckPermissions } from '..';
import { createPayload } from './createPayload';
import { defaultAllowLogic } from '../utilities';
import { checkIfAllowed } from './checkIfAllowed';
import type { ActionStatusType, AllowedLogicType } from '../types';

export type PermissionCheckProps<T extends string = string> = {
  action: T | T[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
  isAllowed?: AllowedLogicType;
  onDenied?: (action: T) => void;
};

export const PermissionCheck = <T extends string = string>({
  children,
  action,
  onDenied,
  loading = null,
  fallback = null,
  isAllowed = defaultAllowLogic,
}: PermissionCheckProps<T>): React.ReactElement => {
  const onActionDenied = (status: ActionStatusType<T>) => {
    if (!status.checked || status.allowed) return;

    return onDenied?.(status.action);
  };
  const payload = createPayload(action);
  const actionsStatus = useCheckPermissions<T>(payload, onActionDenied);

  const checked = actionsStatus.every(s => !!s.checked);
  if (!checked) return loading as React.ReactElement;

  const allowed = checkIfAllowed(actionsStatus, isAllowed, payload);
  if (!allowed) return fallback as React.ReactElement;

  return children as React.ReactElement;
};
