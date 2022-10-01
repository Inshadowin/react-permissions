import { expand } from '.';
import type { CheckResult, PermissionsContainerType } from '../types';

type ProcessOldPermissionsParams<T extends string> = {
  setPermissions: SetPermissionsType<T>;
  result: CheckResult<T>;
  actionsToCheck: T[];
};

type ExpandAllowedPermissionsParams<T extends string> = {
  oldPermissions: PermissionsContainerType<T>;
  result: CheckResult<T>;
};

type ExpandCheckedPermissionsParams<T extends string> = {
  oldPermissions: PermissionsContainerType<T>;
  actionsToCheck: T[];
};

type SetPermissionsType<T extends string> = React.Dispatch<
  React.SetStateAction<PermissionsContainerType<T>>
>;

const expandAllowedPermissions = <T extends string>({
  oldPermissions,
  result = [],
}: ExpandAllowedPermissionsParams<T>) => {
  const allowedPermissions = result.filter(p => !!p.allowed).map(p => p.action);

  return expand(oldPermissions.allowedPermissions, allowedPermissions);
};

const expandCheckedPermissions = <T extends string>({
  oldPermissions,
  actionsToCheck = [],
}: ExpandCheckedPermissionsParams<T>) => {
  const checkedPermissions = actionsToCheck;

  return expand(oldPermissions.checkedPermissions, checkedPermissions);
};

export const processOldPermissions = <T extends string>({
  setPermissions,
  result = [],
  actionsToCheck = [],
}: ProcessOldPermissionsParams<T>) => {
  return setPermissions(oldPermissions => ({
    allowedPermissions: expandAllowedPermissions<T>({
      oldPermissions,
      result,
    }),
    checkedPermissions: expandCheckedPermissions<T>({
      oldPermissions,
      // result might not have these permissions, if they don't send not allowed back
      actionsToCheck,
    }),
  }));
};
