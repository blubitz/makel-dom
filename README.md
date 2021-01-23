# makel-dom

> Easily make DOM elements with CSS selector-like syntax

### Description

This project was forked from [hekigan](https://github.com/hekigan/dom-create-element-query-selector) and is under devleopment.

### Usage

#### Basic

The simplest example add an empty `div` tag to the document's `body`.
```js
import {makel, dom} from 'makel-dom';

const body = dom('body');
body.appendChild(makel());
```

#### Other usages
```js
import {makel, dom} from 'makel-dom';

let elt = null;

// some examples

elt = makel(); // <div></div>

// create a span node with an id
elt = makel('span#my-id'); // <span id="my-id"></span>

// add class
elt = makel('span.my-class'); // <span class="my-class"></span>

// add id and class
elt = makel('span#my-id.my-class'); // <span id="my-id" class="my-class"></span>

// add class and attributes
elt = makel('a[href=#].link'); // <a class="link" href="#"></a>

// add content to the new element (text & other nodes)
elt = makel('div',
    'paragraphs',
    makel('p', 'paragraph 1'),
    makel('p', 'paragraph 2')
);
// <div>
//  paragraphs
//  <p>paragraph 1</p>
//  <p>paragraph 2</p>
// </div>

// add the generated element to the DOM
dom('body').appendChild(elt);

```

### Installation
Coming soon.

### Examples

See [`example`](example/script.js) folder or the ~~[runkit](https://runkit.com/hekigan/dom-create-element-query-selector) example.~~

### Builds

If you don't use a package manager, you can ~~[access `dom-create-element-query-selector` via unpkg (CDN)](https://unpkg.com/dom-create-element-query-selector/)~~, download the source, or point your package manager to the url.

`dom-create-element-query-selector` is compiled as a collection of [CommonJS](http://webpack.github.io/docs/commonjs.html) modules & [ES2015 modules](http://www.2ality.com/2014/09/es6-modules-final.html) for bundlers that support the `jsnext:main` or `module` field in package.json (Rollup, Webpack 2)

~~The `dom-create-element-query-selector` package includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the [`dist` folder](https://unpkg.com/dom-create-element-query-selector/dist/). They can be used directly without a bundler and are thus compatible with many popular JavaScript module loaders and environments. You can drop a UMD build as a [`<script>` tag](https://unpkg.com/dom-create-element-query-selector) on your page. The UMD builds make `dom-create-element-query-selector` available as a `window.createElement` global variable.~~

### License

The code is available under the [MPL-2.0](LICENSE) license.

### Contributing

We are open to contributions, ~~see [CONTRIBUTING.md](CONTRIBUTING.md) for more info.~~

### Misc

This module was created using [generator-module-boilerplate](https://github.com/duivvv/generator-module-boilerplate). But not anymore.
