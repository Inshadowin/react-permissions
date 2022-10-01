export const createPayload = <T extends string>(action: T | T[]): T[] => {
  return Array.isArray(action) ? action : [action];
};
