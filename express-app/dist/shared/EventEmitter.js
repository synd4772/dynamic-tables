"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
class EventEmitter {
    constructor() {
        this.listeners = {};
    }
    on(eventName, callBack) {
        if (eventName in this.listeners) {
            this.listeners[eventName].add(callBack);
        }
        else {
            this.listeners[eventName] = new Set();
            this.listeners[eventName].add(callBack);
        }
    }
    emit(eventName, args) {
        if (eventName in this.listeners) {
            this.listeners[eventName].forEach((callBack) => {
                callBack(args);
            });
        }
    }
    unsubscribe(eventName) {
        if (eventName in this.listeners) {
            console.log(`${eventName} unsubscribed`);
            delete this.listeners[eventName];
        }
    }
}
exports.EventEmitter = EventEmitter;
