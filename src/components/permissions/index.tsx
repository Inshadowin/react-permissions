import React, { useContext, useMemo, useRef, useState } from 'react';

import { useIsMounted } from '../../hooks';
import { has, performActionsCheck, initializePermissions } from './utilities';
import type {
  CheckResult,
  ActionStatusType,
  OnCheckPermissionsType,
  PermissionsContainerType,
} from './types';

export type PermissionsContextType<T extends string = string> = {
  permissions: PermissionsContainerType<T>;
  check: (
    actions: T[] | T
  ) => Promise<CheckResult<T> | null> | CheckResult<T> | null;
  allowed: (actions: T) => ActionStatusType<T>;
};

export type PermissionsProps<T extends string = string> = {
  children: React.ReactNode;
  permissions?: CheckResult<T>;
  initialPermissions?: CheckResult<T>;

  onCheckPermissions?: OnCheckPermissionsType<T>;
  isAllowed?: (action: T, allowed: T[]) => boolean;
};

const defaultIsAllowed = <T extends string = string>(
  action: T,
  allowed: T[]
) => {
  return has(allowed, action);
};

const PermissionsContext = React.createContext<PermissionsContextType>({
  check: _actions => [],
  permissions: initializePermissions(),
  allowed: action => ({ action: action, allowed: false, checked: true }),
});

const Permissions = <T extends string = string>({
  children,
  initialPermissions,
  permissions: valuePermissions,
  onCheckPermissions,
  isAllowed = defaultIsAllowed,
}: PermissionsProps<T>): React.ReactElement => {
  const isMounted = useIsMounted();
  const progressPermissionsRef = useRef<T[]>([]);

  const isStaticMode = !onCheckPermissions;
  const [localPerm, setPermissions] = useState<PermissionsContainerType<T>>(
    initializePermissions(initialPermissions)
  );
  const permissions = useMemo(() => {
    return valuePermissions
      ? initializePermissions(valuePermissions)
      : localPerm;
  }, [valuePermissions, localPerm]);

  const handleCheckActions = async (actions: T[]) =>
    await performActionsCheck<T>({
      isMounted,
      actions,
      onCheckPermissions,
      setPermissions,
      checkedPermissions: permissions.checkedPermissions,
      progressPermissionsRef,
    });

  const getActionStatus = (action: T) => {
    const checked = has(permissions.checkedPermissions, action) || isStaticMode;
    const allowed = isAllowed(action, permissions.allowedPermissions);

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
export { useAllowed } from './useAllowed';
export { PermissionCheck } from './PermissionCheck';
export { useCheckPermission } from './useCheckPermission';
export { useCheckPermissions } from './useCheckPermissions';
export type { PermissionCheckProps } from './PermissionCheck';
