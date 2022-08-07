import React from 'react';

import { useCheckPermissions } from '..';
import { createPayload } from './createPayload';
import { checkIfAllowed } from './checkIfAllowed';
import { defaultAllowLogic } from './defaultAllowLogic';
import type { ActionType, ActionStatusType, AllowedLogicType } from '../types';

export type PermissionCheckProps = {
  action: ActionType | ActionType[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
  isAllowed?: AllowedLogicType;
  onDenied?: (action: ActionType) => void;
};

export const PermissionCheck: React.FC<PermissionCheckProps> = ({
  children,
  action,
  onDenied,
  loading = null,
  fallback = null,
  isAllowed = defaultAllowLogic,
}) => {
  const onActionDenied = (status: ActionStatusType) => {
    if (!status.checked || status.allowed) return;

    return onDenied?.(status.action);
  };
  const payload = createPayload(action);
  const actionsStatus = useCheckPermissions(payload, onActionDenied);

  const checked = actionsStatus.every(s => !!s.checked);
  const allowed = checkIfAllowed(actionsStatus, isAllowed, payload);

  if (!checked) return loading as JSX.Element;
  if (!allowed) return fallback as JSX.Element;

  return children as JSX.Element;
};
