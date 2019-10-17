(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.cuspin = {}));
}(this, function (exports) { 'use strict';

    var __context = {
        default: {}
    }

    /**
     * Subscribe listener to an event
     * @param {string} name Name of event
     * @param {callback} listener Function to call on event trigger
     */
    function subscribe(name, listener, scope = 'default') {
        if (!__context[scope]) __context[scope] = {}
        if (!__context[scope][name]) {
            __context[scope] = { 
                [name]: { last: 0, listeners: {} } 
            };
        }

        const index = __context[scope][name].last;
        __context[scope][name].listeners[index] = listener;
        __context[scope][name].last = (++__context[scope][name].last) % Number.MAX_SAFE_INTEGER;
    
        return () => {
            delete __context[scope][name].listeners[index]; 
        }
    }

    /**
     * Subscribes once to an event
     * @param {*} name Name of event
     * @param {*} listener Function to call on event trigger
     */
    function subscribeOnce(name, listener, scope = 'default') {
        const unsubscribe = subscribe(name, (args) => {
            listener.call(undefined, args);
            unsubscribe();
        }, scope);
        return unsubscribe;
    }

    /**
     * Emit event to subscribed listeners
     * @param {string} name Event to emit
     * @param {any} args Event arguments
     */
    function emit(name, args, scope = 'default') {
        if (!__context[scope] || !__context[scope][name]) {
            return;
        }
        const listeners = __context[scope][name].listeners;
        for (var index in listeners) {
            listeners[index].call(undefined, args);
        }
    }

    exports.emit = emit;
    exports.subscribe = subscribe;
    exports.subscribeOnce = subscribeOnce;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
