export function runIfFn<ReturnTypeWhenValue, ReturnTypeWhenFn, ArgTypes extends unknown[]>(
  fnOrValue: ((...args: ArgTypes) => ReturnTypeWhenFn) | ReturnTypeWhenValue,
  ...args: ArgTypes
) {
  if (typeof fnOrValue === 'function') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return fnOrValue(...args) as ReturnTypeWhenFn;
  }
  return fnOrValue as ReturnTypeWhenValue;
}

export function throwError(message?: string) {
  const error = new Error(message ?? 'Error');
  throw error;
}

export function log(...args: Parameters<typeof console.log>) {
  console.log(...args);
}
