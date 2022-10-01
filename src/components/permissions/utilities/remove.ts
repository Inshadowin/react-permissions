import { has } from '.';

export const remove = <T extends string = string>(
  removeFrom: T[],
  removeWhat: T[]
) => {
  return (removeFrom ?? []).filter(item => !has(removeWhat, item));
};
