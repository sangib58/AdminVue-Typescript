export const camelToPascal = <T>(obj: T): T => {
  const toPascalCase = (str: string): string =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const transformKeys = (input: any): any => {
    if (Array.isArray(input)) {
      return input.map(transformKeys); // Recursively handle arrays
    } else if (input !== null && typeof input === "object") {
      return Object.entries(input).reduce(
        (acc: Record<string, any>, [key, value]) => {
          const pascalKey = toPascalCase(key);
          acc[pascalKey] = transformKeys(value); // Recursively handle nested objects
          return acc;
        },
        {}
      );
    }
    return input; // Return non-object types as is
  };

  return transformKeys(obj);
};
