'use strict'

var __events = {}

/**
 * Subscribe listener to an event
 * @param {string} name Name of event
 * @param {callback} listener Function to call on event trigger
 */
function subscribe(name, listener) {
    if (!__events[name]) {
        __events[name] = { last: 0, listeners: {} };
    }

    const index = __events[name].last;
    __events[name].listeners[index] = listener;
    __events[name].last = (++__events[name].last) % Number.MAX_SAFE_INTEGER;

    return () => {
        delete __events[name].listeners[index]; 
    }
}

/**
 * Subscribes once to an event
 * @param {*} name Name of event
 * @param {*} listener Function to call on event trigger
 */
function subscribeOnce(name, listener) {
    const unsubscribe = subscribe(name, (args) => {
        listener.apply(null, args);
        unsubscribe();
    });
    return unsubscribe;
}

/**
 * Emit event to subscribed listeners
 * @param {string} name Event to emit
 * @param {any} args Event arguments
 */
function emit(name, args) {
    if (!__events[name]) {
        return;
    }
    const listeners = __events[name].listeners;
    for (var index in listeners) {
        listeners[index](args);
    }
}

export const subscribe = subscribe;
export const subscribeOnce = subscribeOnce;
export const emit = emit;