export const expand = <T extends string = string>(
  expandTarget: T[],
  expandWith: T[]
) => {
  return Array.from(new Set([...expandTarget, ...expandWith]));
};
