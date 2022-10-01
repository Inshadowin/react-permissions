export type ProgressPermissionsRefType<T extends string = string> =
  React.MutableRefObject<T[]>;

export type PermissionsContainerType<T extends string = string> = {
  allowedPermissions: T[];
  checkedPermissions: T[];
};

export type ActionStatusType<T extends string = string> = {
  action: T;
  allowed: boolean;
  checked: boolean;
};

type CheckResultItem<T extends string = string> = {
  action: T;
  allowed?: boolean;
};

export type AllowedLogicType<T extends string = string> = (
  allowed: T[],
  denied: T[],
  payload: T[]
) => boolean;

export type CheckResult = CheckResultItem[];

export type OnCheckPermissionsType<T extends string = string> = (
  actions: T[]
) => Promise<CheckResult> | CheckResult;
