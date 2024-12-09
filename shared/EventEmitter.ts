export class EventEmitter {
  private listeners: Record<string, Set<(args: unknown) => void> > = {};

  on(eventName: string, callBack: (args: unknown) => void) {
    if (eventName in this.listeners) {
      this.listeners[eventName].add(callBack);
    } else {
      this.listeners[eventName] = new Set();
      this.listeners[eventName].add(callBack)
    }
  }

  emit(eventName: string, args: unknown) {
    if (eventName in this.listeners) {
      this.listeners[eventName].forEach((callBack) => {
        callBack(args);
      })
    }
  }

  unsubscribe(eventName: string) {
    if (eventName in this.listeners) {
        console.log(`${eventName} unsubscribed`)
      delete this.listeners[eventName];
    }
  }
}