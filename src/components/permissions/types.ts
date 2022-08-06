export type ActionType = string;
export type PermissionType = string;

export type ProgressPermissionsRefType = React.MutableRefObject<
  PermissionType[]
>;

export type PermissionsContainerType = {
  allowedPermissions: PermissionType[];
  checkedPermissions: PermissionType[];
};

export type ActionStatusType = {
  action: ActionType;
  allowed: boolean;
  checked: boolean;
};

type CheckResultItem = {
  action: ActionType;
  allowed?: boolean;
};

export type AllowedLogicType = (
  allowed: ActionType[],
  denied: ActionType[]
) => boolean;

export type CheckResult = CheckResultItem[];

export type OnCheckPermissionsType = (
  actions: ActionType[]
) => Promise<CheckResult> | CheckResult;
