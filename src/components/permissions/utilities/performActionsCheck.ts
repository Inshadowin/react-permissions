import {
  addActionsToProgress,
  removeActionsFromProgress,
} from './progressActions';
import { getActionsToCheck } from './getActionsToCheck';
import { processOldPermissions } from './processOldPermissions';
import type {
  CheckResult,
  OnCheckPermissionsType,
  PermissionsContainerType,
  ProgressPermissionsRefType,
} from '../types';

type PerformActionsCheckParams<T extends string> = {
  isMounted: React.MutableRefObject<boolean>;
  actions: T[];
  onCheckPermissions?: OnCheckPermissionsType<T>;
  checkedPermissions: PermissionsContainerType<T>['checkedPermissions'];
  progressPermissionsRef: ProgressPermissionsRefType<T>;
  setPermissions: SetPermissionsType<T>;
};

type SetPermissionsType<T extends string> = React.Dispatch<
  React.SetStateAction<PermissionsContainerType<T>>
>;

export const performActionsCheck = async <T extends string>({
  isMounted,
  actions,
  onCheckPermissions,
  checkedPermissions,
  progressPermissionsRef,
  setPermissions,
}: PerformActionsCheckParams<T>): Promise<CheckResult<T> | null> => {
  if (!onCheckPermissions) return;

  const actionsToCheck = getActionsToCheck<T>({
    actions,
    checkedPermissions,
    progressPermissionsRef,
  });
  if (!actionsToCheck.length) return;

  const performCheck = async () => {
    try {
      addActionsToProgress<T>({ progressPermissionsRef, actionsToCheck });

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
