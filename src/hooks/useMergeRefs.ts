import { MutableRefObject, RefCallback, useCallback } from 'react';

export default function useMergeRefs<T = unknown | null>(...refs: (RefCallback<T> | MutableRefObject<T> | null)[]) {
  return useCallback((value: T) => {
    refs.forEach((ref) => {
      if (ref === null) {
        return;
      } else if (typeof ref === 'function') {
        ref(value);
      } else if (ref) {
        ref.current = value;
      }
    });
  }, []);
}
