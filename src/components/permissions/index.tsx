import React, { useContext, useRef, useState } from 'react';

import { useIsMounted } from '../../hooks';
import {
  has,
  performActionsCheck,
  initializePermissions,
  defaultOnCheckPermissions,
} from './utilities';
import type {
  ActionType,
  CheckResult,
  PermissionType,
  ActionStatusType,
  OnCheckPermissionsType,
  PermissionsContainerType,
} from './types';

export type PermissionsContextType = {
  permissions: PermissionsContainerType;
  check: (
    actions: ActionType[] | ActionType
  ) => Promise<CheckResult | null> | CheckResult | null;
  allowed: (actions: ActionType) => ActionStatusType;
};

export type PermissionsProps = {
  children: React.ReactNode;
  initialPermissions?: CheckResult;
  onCheckPermissions?: OnCheckPermissionsType;
};

const PermissionsContext = React.createContext<PermissionsContextType>({
  check: actions => [],
  permissions: initializePermissions(),
  allowed: action => ({ action: action, allowed: false, checked: true }),
});

const Permissions: React.FC<PermissionsProps> = ({
  children,
  initialPermissions,
  onCheckPermissions = defaultOnCheckPermissions,
}) => {
  const isMounted = useIsMounted();
  const progressPermissionsRef = useRef<PermissionType[]>([]);

  const [permissions, setPermissions] = useState<PermissionsContainerType>(
    initializePermissions(initialPermissions)
  );

  const handleCheckActions = async (actions: ActionType[]) =>
    await performActionsCheck({
      isMounted,
      actions,
      onCheckPermissions,
      setPermissions,
      checkedPermissions: permissions.checkedPermissions,
      progressPermissionsRef,
    });

  const getActionStatus = (action: ActionType) => {
    const checked = has(permissions.checkedPermissions, action);
    const allowed = has(permissions.allowedPermissions, action);

    return { action, allowed, checked };
  };

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        check: handleCheckActions,
        allowed: getActionStatus,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

export default Permissions;
export const usePermissions = () => useContext(PermissionsContext);
export const PermissionsProvider = Permissions;
export { PermissionCheck } from './PermissionCheck';
export type { PermissionCheckProps } from './PermissionCheck';
export { useCheckPermission } from './useCheckPermission';
export { useCheckPermissions } from './useCheckPermissions';
