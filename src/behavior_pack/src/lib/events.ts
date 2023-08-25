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
  nextId = 0;
  listeners: {[eventType: string]: Callback<unknown>[]} = {}

  addListener(eventName: string, callback: Callback<unknown>) {
    let event = this.listeners[eventName];
    if (event === undefined) {
      event = [];
      this.listeners[eventName] = event;
    }
    const id = this.nextId++;
    event[id] = callback;
    return id;
  }

  removeListener(eventName: string, id: number) {
    let event = this.listeners[eventName];
    if (event === undefined) return false;
    if (event[id] === undefined) return false;
    delete event[id];
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