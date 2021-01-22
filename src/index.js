/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

// Create a DOM element from a CSS query with option to include content

export default function createElement (querySelector = 'div', ...content) {
    let nodeType = querySelector.match(/^[a-z0-9]+/i);
    let id = querySelector.match(/#([a-z]+[a-z0-9-]*)/gi);
    let classes = querySelector.match(/\.([a-z]+[a-z0-9-]*)/gi);
    let attributes = querySelector.match(/\[([a-z][a-z-]+)(=['|"]?([^\]]*)['|"]?)?\]/gi);
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

function CreateElementException (message) {
    this.message = message;
    this.name = 'CreateElementException';
}
