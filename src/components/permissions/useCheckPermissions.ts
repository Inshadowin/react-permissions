import { useRef } from 'react';

import { has } from './utilities';
import { usePermissions } from '.';
import { useRefValue, useDeepEffect } from '../../hooks';
import type { ActionStatusType } from './types';

const getCheckedActions = <T extends string>(
  result: ActionStatusType<T>[]
): T[] => result.filter(a => a.checked).map(a => a.action);

const getNewCheckedActions = <T extends string>(
  result: ActionStatusType<T>[],
  checked: T[]
) => {
  return result.filter(ar => ar.checked && !has(checked, ar.action));
};

export const useCheckPermissions = <T extends string = string>(
  actions: T[],
  onCheck?: (status: ActionStatusType<T>) => void
) => {
  const { check, allowed } = usePermissions<T>();

  const allowedResult = actions.map(allowed);
  const checkedRef = useRef(getCheckedActions(allowedResult));

  const checkRef = useRefValue(check);
  const onCheckRef = useRefValue(onCheck);

  useDeepEffect(() => {
    checkRef.current?.(actions);
  }, [actions, checkRef]);

  useDeepEffect(() => {
    const checked = checkedRef.current;
    const newCheckedActions = getNewCheckedActions(allowedResult, checked);

    checkedRef.current = getCheckedActions(allowedResult);

    newCheckedActions.map(a => onCheckRef.current?.(a));
  }, [allowedResult, onCheckRef, checkedRef]);

  return allowedResult;
};
