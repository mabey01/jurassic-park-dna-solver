import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export function useSyncUrlState<T>(
  name: string,
  defaultState: T,
  serializeState: (state: T) => string,
  unserializeState: (serializedState: string) => T
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const serializedState = searchParams.get(name);

  const state = useMemo(() => {
    if (serializedState === null) return defaultState;

    return unserializeState(serializedState);
  }, [serializedState]);

  const setState = (newState: T) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, serializeState(newState));
    setSearchParams(params);
  };

  return [state, setState] as const;
}
