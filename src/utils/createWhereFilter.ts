export const createWhereFilter = (parameters: any) =>
  Object.fromEntries(
    Object.entries(parameters).filter(([_, value]) => value !== undefined)
  );
