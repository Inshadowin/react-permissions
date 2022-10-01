import type { CheckResult, PermissionsContainerType } from '../types';

export const initializePermissions = <T extends string>(
  initialPermissions?: CheckResult<T>
): PermissionsContainerType<T> => {
  if (!initialPermissions?.length) {
    return {
      allowedPermissions: [],
      checkedPermissions: [],
    };
  }

  return {
    allowedPermissions: initialPermissions
      .filter(p => p.allowed)
      .map(p => p.action),
    checkedPermissions: initialPermissions.map(p => p.action),
  };
};
