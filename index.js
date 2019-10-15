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
    const index = __subscribes[name].push(listener) - 1;
    return () => {
        __subscribes[name].splice(index, 1);
    }
}

/**
 * Emit event to subscribed listeners
 * @param {string} name Event to emit
 * @param {any} args Event arguments
 */
function emit(name, args) {
    if (!__subscribes[name]) return;
    __subscribes[name].forEach(listener => listener(args))
}

export const subscribe = subscribe;
export const emit = emit;