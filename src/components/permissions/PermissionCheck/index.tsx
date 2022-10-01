import React from 'react';

import { useCheckPermissions } from '..';
import { createPayload } from './createPayload';
import { checkIfAllowed } from './checkIfAllowed';
import { defaultAllowLogic } from './defaultAllowLogic';
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
}: PermissionCheckProps<T>) => {
  const onActionDenied = (status: ActionStatusType<T>) => {
    if (!status.checked || status.allowed) return;

    return onDenied?.(status.action);
  };
  const payload = createPayload(action);
  const actionsStatus = useCheckPermissions<T>(payload, onActionDenied);

  const checked = actionsStatus.every(s => !!s.checked);
  if (!checked) return loading as JSX.Element;

  const allowed = checkIfAllowed(actionsStatus, isAllowed, payload);
  if (!allowed) return fallback as JSX.Element;

  return children as JSX.Element;
};
