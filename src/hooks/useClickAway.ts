/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useCallback, useEffect } from 'react';

type UseClickAwayArg = {
  enabled?: boolean;
  refs: RefObject<any>[];
  callback: () => void;
};

export default function useClickAway(arg: UseClickAwayArg) {
  const { enabled, refs, callback } = arg;

  const handle = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!enabled) {
        return;
      }
      if (refs.some((ref) => ref.current?.contains(e.target as Node))) {
        return;
      }
      callback();
    },
    [callback, enabled],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handle);
    document.addEventListener('touchstart', handle);
    return () => {
      document.removeEventListener('mousedown', handle);
      document.removeEventListener('touchstart', handle);
    };
  }, [handle]);
}
