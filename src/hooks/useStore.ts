import { BaseStore } from "@/store";
import { useEffect, useState } from "react";

export function useStore<T>(store: BaseStore<T>) {
  const storeState = useState<T>(store.state);
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
