import { useCallback, useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => ReturnType<T>>(
  fn: T,
  delay: number
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeoutId = useRef<any>();
  return useCallback(
    (...args: unknown[]) => {
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => fn(...args), delay);
    },
    [fn, delay]
  );
}
