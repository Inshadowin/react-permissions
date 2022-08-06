import type { PermissionType } from '../types';

export const expand = (
  expandTarget: PermissionType[],
  expandWith: PermissionType[]
) => {
  return Array.from(new Set([...expandTarget, ...expandWith]));
};
