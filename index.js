'use strict'

var __subscribes = {}

/**
 * Subscribe listener to an event
 * @param {string} name Name of event
 * @param {callback} listener Listener function
 */
function subscribe(name, listener) {
    if (!__subscribes[name]) {
        __subscribes[name] = { last: 0, listeners: {} };
    }

    const index = __subscribes[name].last;
    __subscribes[name].listeners[index] = listener;
    __subscribes[name].last = (++__subscribes[name].last) % Number.MAX_SAFE_INTEGER;

    return () => {
        delete __subscribes[name].listeners[index]; 
    }
}

/**
 * Emit event to subscribed listeners
 * @param {string} name Event to emit
 * @param {any} args Event arguments
 */
function emit(name, args) {
    if (!__subscribes[name]) {
        return;
    }
    const listeners = __subscribes[name].listeners;
    for (var index in listeners) {
        listeners[index](args);
    }
}

export const subscribe = subscribe;
export const emit = emit;