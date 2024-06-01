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
    for (const eventName in obj) {
        el.addEventListener(eventName, obj[eventName])
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
        throw CreateElementException('only 1 ID is allowed');
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

function CreateElementException(message) {
    this.message = message;
    this.name = 'CreateElementException';
}
