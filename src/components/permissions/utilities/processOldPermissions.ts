import { expand } from '.';
import type {
  ActionType,
  CheckResult,
  PermissionsContainerType,
} from '../types';

type ProcessOldPermissionsParams = {
  setPermissions: SetPermissionsType;
  result: CheckResult;
  actionsToCheck: ActionType[];
};

type ExpandAllowedPermissionsParams = {
  oldPermissions: PermissionsContainerType;
  result: CheckResult;
};

type ExpandCheckedPermissionsParams = {
  oldPermissions: PermissionsContainerType;
  actionsToCheck: ActionType[];
};

type SetPermissionsType = React.Dispatch<
  React.SetStateAction<PermissionsContainerType>
>;

const expandAllowedPermissions = ({
  oldPermissions,
  result = [],
}: ExpandAllowedPermissionsParams) => {
  const allowedPermissions = result.filter(p => !!p.allowed).map(p => p.action);

  return expand(oldPermissions.allowedPermissions, allowedPermissions);
};

const expandCheckedPermissions = ({
  oldPermissions,
  actionsToCheck = [],
}: ExpandCheckedPermissionsParams) => {
  const checkedPermissions = actionsToCheck;

  return expand(oldPermissions.checkedPermissions, checkedPermissions);
};

export const processOldPermissions = ({
  setPermissions,
  result = [],
  actionsToCheck = [],
}: ProcessOldPermissionsParams) => {
  return setPermissions(oldPermissions => ({
    allowedPermissions: expandAllowedPermissions({
      oldPermissions,
      result,
    }),
    checkedPermissions: expandCheckedPermissions({
      oldPermissions,
      // result might not have these permissions, if they don't send not allowed back
      actionsToCheck,
    }),
  }));
};
