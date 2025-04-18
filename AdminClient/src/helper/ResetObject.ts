export const resetObject = <T extends Record<string, any>>(obj: T): void => {
  Object.keys(obj).forEach((key: keyof T) => {
    obj[key] = "" as T[keyof T];
  });
};
