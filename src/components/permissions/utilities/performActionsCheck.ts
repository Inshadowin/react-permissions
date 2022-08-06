import {
  addActionsToProgress,
  removeActionsFromProgress,
} from './progressActions';
import { getActionsToCheck } from './getActionsToCheck';
import { processOldPermissions } from './processOldPermissions';
import type {
  ActionType,
  CheckResult,
  OnCheckPermissionsType,
  PermissionsContainerType,
  ProgressPermissionsRefType,
} from '../types';

type PerformActionsCheckParams = {
  isMounted: React.MutableRefObject<boolean>;
  actions: ActionType[];
  onCheckPermissions?: OnCheckPermissionsType;
  checkedPermissions: PermissionsContainerType['checkedPermissions'];
  progressPermissionsRef: ProgressPermissionsRefType;
  setPermissions: SetPermissionsType;
};

type SetPermissionsType = React.Dispatch<
  React.SetStateAction<PermissionsContainerType>
>;

export const performActionsCheck = async ({
  isMounted,
  actions,
  onCheckPermissions,
  checkedPermissions,
  progressPermissionsRef,
  setPermissions,
}: PerformActionsCheckParams): Promise<CheckResult | null> => {
  if (!onCheckPermissions) return;

  const actionsToCheck = getActionsToCheck({
    actions,
    checkedPermissions,
    progressPermissionsRef,
  });
  if (!actionsToCheck.length) return;

  const performCheck = async () => {
    try {
      addActionsToProgress({ progressPermissionsRef, actionsToCheck });

      const result = await onCheckPermissions?.(actionsToCheck);
      if (!isMounted.current) return null;

      processOldPermissions({ setPermissions, actionsToCheck, result });

      return result;
    } catch (ex) {
      console.error(ex);
    } finally {
      if (!isMounted.current) return null;

      removeActionsFromProgress({ progressPermissionsRef, actionsToCheck });
    }
  };

  return await performCheck();
};
