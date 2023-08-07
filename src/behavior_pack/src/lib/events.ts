/**
 * A basic version of node:events.EventEmitter
 * 
 * Coded blindly, probably missing features, but it works for this setup.
 * 
 * Needed as whatever flavor of JS runs in Minecraft servers does not have
 * EventEmitters built in.
 */


export type Callback<T> = (e: T) => void;

/** Standard event-emitter */
export class EventEmitter {
  listeners: {[eventType: string]: Callback<unknown>[]} = {}

  addListener(eventName: string, callback: Callback<unknown>) {
    if (this.listeners[eventName] === undefined) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName]?.push(callback);
  }

  emit(eventName: string, event: unknown) {
    for (const listener of this.listeners[eventName] ?? []) {
      listener(event);
    }
  }

  getHandler<T>(eventName: string) {
    return new EventHandler<T>(this, eventName);
  }
}

/** EventEmitter interface for a single event type for typescript support */
export class EventHandler<T> {
  listeners: Callback<T>[] = []
  constructor(
    private emitter: EventEmitter,
    private eventName: string,
  ) {
    this.emitter.addListener(this.eventName, (event) => this.listener(event as T));
  }

  listener(event: T) {
    for (const listener of this.listeners) {
      listener(event);
    }
  }

  addListener(callback: Callback<T>) {
    this.listeners.push(callback);
  }

  emit(event: T) {
    this.emitter.emit(this.eventName, event);
  }
}