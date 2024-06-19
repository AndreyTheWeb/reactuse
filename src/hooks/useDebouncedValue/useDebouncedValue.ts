import { useEffect, useMemo, useRef, useState } from 'react';

import { debounce } from '@/utils/helpers';

// делаем value и state
// усложняем ли хуки value и state

interface UseDebouncedValueOptions {
  maxWait?: number;
}

export const useDebouncedValue = <Value>(
  value: Value,
  delay: number,
  options?: UseDebouncedValueOptions
) => {
  console.log('@', options);
  const previousValueRef = useRef(value);
  const [state, setState] = useState(value);

  const debouncedSetState = useMemo(
    () => debounce((value: Value) => setState(value), delay),
    [delay]
  );

  useEffect(() => {
    if (previousValueRef.current === value) return;
    debouncedSetState(value);
    previousValueRef.current = value;
  }, [value]);

  return [state, debouncedSetState] as const;
};
