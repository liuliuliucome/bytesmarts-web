import { BaseStore } from "@/store";
import { isFunction } from "lodash";
import { useCallback, useEffect, useState } from "react";

export function useStore<T>(store: BaseStore<T>) {
  const storeState = useState<T>(store.state);

  const [_storeState, _setStoreState] = storeState;

  useEffect(() => {
    const onSubscription = (val: T) => {
      _setStoreState(val);
    };

    store.observer(onSubscription);
    return () => {
      store.clear(onSubscription);
    };
  }, []);

  const setStoreState: typeof _setStoreState = useCallback((value) => {
    if (isFunction(value)) {
      _setStoreState((prev) => {
        return value(prev);
      });
      return;
    }

    _setStoreState(value);
  }, []);

  return [_storeState, setStoreState] as [T, typeof _setStoreState];
}
