import type { OnCheckPermissionsType } from '../types';

/**
 * function default to all permissions set as false
 * @param actions - actions check payload
 */
export const defaultOnCheckPermissions: OnCheckPermissionsType = actions => {
  return actions?.map(action => ({ action, allowed: false }));
};
