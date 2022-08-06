import { has } from '.';
import type { PermissionType } from '../types';

export const remove = (
  removeFrom: PermissionType[],
  removeWhat: PermissionType[]
) => {
  return (removeFrom ?? []).filter(item => !has(removeWhat, item));
};
