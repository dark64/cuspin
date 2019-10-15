'use strict'

var __subscribes = {}

/**
 * Subscribe listener to an event
 * @param {string} name Name of event
 * @param {callback} listener Listener function
 */
function subscribe(name, listener) {
    if (!__subscribes[name]) {
        __subscribes[name] = [];
    }
    __subscribes[name].push(listener);
    const index = __subscribes[name].length - 1;
    return function() {
        __subscribes[name].splice(index, 1);
    }
}

/**
 * Emits event to all subscribed listeners
 * @param {string} name Event to emit
 * @param {any} args Event arguments
 */
function emit(name, args) {
    __subscribes[name].forEach(listener => listener(args))
}

export const subscribe = subscribe;
export const emit = emit;