export const has = <T extends string = string>(
  permissions: T[],
  permission: T
) => {
  return !!permissions?.includes(permission);
};
