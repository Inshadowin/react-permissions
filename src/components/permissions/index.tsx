import React, { useContext, useRef, useState } from 'react';

import { useIsMounted } from '../../hooks';
import {
  has,
  performActionsCheck,
  initializePermissions,
  defaultOnCheckPermissions,
} from './utilities';
import type {
  CheckResult,
  ActionStatusType,
  OnCheckPermissionsType,
  PermissionsContainerType,
} from './types';

export type PermissionsContextType<T extends string = string> = {
  permissions: PermissionsContainerType;
  check: (actions: T[] | T) => Promise<CheckResult | null> | CheckResult | null;
  allowed: (actions: T) => ActionStatusType<T>;
};

export type PermissionsProps<T extends string = string> = {
  children: React.ReactNode;
  initialPermissions?: CheckResult<T>;
  onCheckPermissions?: OnCheckPermissionsType<T>;
};

const PermissionsContext = React.createContext<PermissionsContextType>({
  check: actions => [],
  permissions: initializePermissions(),
  allowed: action => ({ action: action, allowed: false, checked: true }),
});

const Permissions = <T extends string = string>({
  children,
  initialPermissions,
  onCheckPermissions = defaultOnCheckPermissions,
}: PermissionsProps<T>) => {
  const isMounted = useIsMounted();
  const progressPermissionsRef = useRef<string[]>([]);

  const [permissions, setPermissions] = useState<PermissionsContainerType>(
    initializePermissions(initialPermissions)
  );

  const handleCheckActions = async <T extends string = string>(actions: T[]) =>
    await performActionsCheck({
      isMounted,
      actions,
      onCheckPermissions,
      setPermissions,
      checkedPermissions: permissions.checkedPermissions,
      progressPermissionsRef,
    });

  const getActionStatus = <T extends string = string>(action: T) => {
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
export const usePermissions = <T extends string = string>() =>
  useContext(PermissionsContext) as PermissionsContextType<T>;

export const PermissionsProvider = Permissions;
export { PermissionCheck } from './PermissionCheck';
export type { PermissionCheckProps } from './PermissionCheck';
export { useCheckPermission } from './useCheckPermission';
export { useCheckPermissions } from './useCheckPermissions';
