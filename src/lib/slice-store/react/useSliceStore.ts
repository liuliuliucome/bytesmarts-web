import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SliceStore } from "../core/SliceStore";

function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === "function";
}

export function useSliceStore<T>(
  sliceStore: SliceStore<T> | (() => SliceStore<T>),
) {
  const store = useMemo(() => {
    if (isFunction(sliceStore)) {
      return sliceStore();
    }
    return sliceStore;
  }, [sliceStore]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setStoreState: typeof _setStoreState = useCallback(
    (value) => {
      if (isFunction(value)) {
        _setStoreState((prev) => {
          return value(prev);
        });
        return;
      }

      _setStoreState(value);
    },
    [_setStoreState],
  );

  return [_storeState, setStoreState] as [T, typeof _setStoreState];
}
