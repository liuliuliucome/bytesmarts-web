import { Observer } from "./Observer";

export class BaseStore<T> extends Observer<T> {
  mounted = false;
  state: T;

  constructor(initState: () => T) {
    super();
    this.state = initState();
  }

  initWith = (fn: any) => {
    if (this.mounted) {
      return;
    }
    this.mounted = true;
    fn();
  };

  emit = (state: T) => {
    this.state = state;
    this.notify(state);
  };
}
