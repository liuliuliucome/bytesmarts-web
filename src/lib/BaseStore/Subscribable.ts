export interface Subscription {
  cancel(): void;
}

export interface Subscribable<T> {
  on(listener: (msg: T) => void, context?: any): void;

  off(listener?: (msg: T) => void, context?: any): void;

  listen(listener: (msg: T) => void): Subscription;
}
