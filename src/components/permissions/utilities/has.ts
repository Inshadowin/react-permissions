import type { PermissionType } from '../types';

export const has = (
  permissions: PermissionType[],
  permission: PermissionType
) => {
  return !!permissions?.includes(permission);
};
