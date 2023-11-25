import { BaseStore } from "@/store";
import { throttle } from "lodash";
import { useEffect, useRef, useState } from "react";

export function useStore<T, S extends BaseStore<T>>(store: S) {
  const storeState = useState<S["state"]>(store.state);
  console.log("storeState", storeState[0]);

  useEffect(() => {
    const [, setStoreState] = storeState;
    const onSubscription = (val: T) => {
      console.log("subscription");
      setStoreState(val);
    };

    store.observer(onSubscription);
    return () => {
      store.clear(onSubscription);
    };
  }, []);

  return storeState;
}
