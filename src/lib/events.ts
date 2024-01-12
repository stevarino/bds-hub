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
export class EventEmitter<T = unknown> {
  listenerCounter = 0;
  messageCounter = 0;
  // event name -> listener id -> Callback<T>
  listeners: Record<string, Record<number, Callback<T>>> = {};

  addListener(eventName: string, callback: Callback<T>) {
    let event = this.listeners[eventName];
    if (event === undefined) {
      event = [];
      this.listeners[eventName] = event;
    }
    const id = this.listenerCounter++;
    event[id] = callback;
    return id;
  }

  removeListener(eventName: string, id: number) {
    const event = this.listeners[eventName];
    if (event === undefined) return false;
    if (event[id] === undefined) return false;
    delete event[id];
    return true;
  }

  emit(eventName: string, event: T) {
    for (const listener of Object.values(this.listeners[eventName])) {
      listener(event);
    }
  }

  getHandler(eventName: string) {
    return new EventHandler<T>(this as EventEmitter<unknown>, eventName);
  }
}

/** EventEmitter interface for a single event type for typescript support */
export class EventHandler<T> {
  listeners: Callback<T>[] = [];
  constructor(
    private emitter: EventEmitter<unknown>,
    private eventName: string,
  ) {
    // this.emitter.addListener(this.eventName, event => this.listener(event));
  }

  // listener(event: T) {
  //   // for (const listener of this.listeners) {
  //   //   listener(event);
  //   // }
  // }

  addListener(callback: Callback<T>) {
    this.emitter.addListener(this.eventName, callback as Callback<unknown>);
  }

  emit(event: T) {
    this.emitter.emit(this.eventName, event);
  }
}
