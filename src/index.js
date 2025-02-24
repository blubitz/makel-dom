/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export function dom(parent, child = null) {
    if (child === null) return document.querySelector(parent)
    return parent.querySelector(child)
}

export function doms(parent, child = null) {
    if (child === null) return document.querySelectorAll(parent)
    return parent.querySelectorAll(child)
}

export function evans(el, obj) {
    if (typeof el == 'object') {
        for (const eventName in obj) {
            el.addEventListener(eventName, obj[eventName])
        }
    }
    else if (typeof el == 'string') {
        // A delegator is a CSS selector that specifies elements whose 
        // events are handled by a user-defined handler on document.body
        const delegator = el

        // The delegateListeners DOM attribute maintains a global object of listeners
        // { event1: { delegator1: [handler1, handler2, ...] } }
        document.body.delegateListeners ??= {}

        // same handler for all events of document.body
        // returns handler function once given event type
        const delegatedHandler = eventName => (event, ...rest) => {
            let element = event.target
            let matched = false
            let stopProp = false
            let stopImmediateProp = false

            // override stopPropagation()
            const _stopPropagation = event.stopPropagation
            event.stopPropagation = () => stopProp = true

            // override stopImmediatePropagation()
            const _stopImmediatePropagation = event.stopImmediatePropagation
            event.stopImmediatePropagation = () => stopImmediateProp = true

            const delegatorsInEvent = document.body.delegateListeners[eventName]
            // 'bubble' event from event.target to document
            while (!matched && element != document.documentElement) {
                let delegator = Object.keys(delegatorsInEvent).find(selector => element.matches(selector))
                matched = delegator != undefined
                if (matched) {
                    for (const handler of delegatorsInEvent[delegator]) {
                        if (!stopImmediateProp) handler(event, ...rest)
                    }
                    matched = stopProp
                }
                // go up the DOM tree
                element = element.parentElement
            }

            // restore default function
            event.stopPropagation = _stopPropagation

            // restore default function
            event.stopImmediatePropagation = _stopImmediatePropagation
        }

        for (const eventName in obj) {
            // add listener to document body only for unique event types
            if (document.body.delegateListeners[eventName] == undefined) {
                document.body.delegateListeners[eventName] = {}
                document.body.addEventListener(
                    eventName, delegatedHandler(eventName),
                    true    // use capture mode to enable handling events that do not bubble
                )
            }
            document.body.delegateListeners[eventName][delegator] ??= []
            document.body.delegateListeners[eventName][delegator].push(obj[eventName])
        }
    }
}

export function makel(querySelector = 'div', ...content) {
    const attr_regex = /\[([a-z][a-z-]+)(=['|"]?([^\]]*)['|"]?)?\]/gi
    let attributes = querySelector.match(attr_regex);

    // remove all attribute tags before continuing matching
    querySelector = querySelector.replace(attr_regex, '')

    let nodeType = querySelector.match(/^[a-z0-9]+/i);
    let id = querySelector.match(/#([a-z]+[a-z0-9-]*)/gi);
    let classes = querySelector.match(/\.([a-z]+[a-z0-9-]*)/gi);
    let node = (nodeType) ? nodeType[0] : 'div';

    if (id && id.length > 1) {
        throw 'only 1 ID is allowed';
    }

    const elt = document.createElement(node);

    if (id) {
        elt.id = id[0].replace('#', '');
    }

    if (classes) {
        const attrClasses = classes.join(' ').replace(/\./g, '');
        elt.setAttribute('class', attrClasses);
    }

    if (attributes) {
        attributes.forEach(item => {
            item = item.slice(0, -1).slice(1);
            let [label, value] = item.split('=');
            if (value) {
                value = value.replace(/^['"](.*)['"]$/, '$1');
            }
            elt.setAttribute(label, value || '');
        });
    }

    content.forEach(item => {
        if (typeof item === 'string' || typeof item === 'number') {
            elt.appendChild(document.createTextNode(item));
        } else if (item.nodeType === document.ELEMENT_NODE) {
            elt.appendChild(item);
        }
    });

    return elt;
}
