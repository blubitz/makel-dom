[![npm](https://img.shields.io/npm/v/makel-dom?style=flat-square)](https://www.npmjs.com/package/makel-dom) ![npm bundle size](https://img.shields.io/bundlephobia/min/makel-dom)
# makel-dom

> easily create and retrieve DOM elements with CSS like syntax

## Installation
```shell
npm i makel-dom
```

## Description

Makel and Dom are good partners. Makel creates dom elements while Dom retrieves them. Together they make dynamically loading HTML simple and elegant.

Suppose we want to dynamically add a new blog post.
```html
<!-- page html-->
<body>
  <div id="blog-container">
    <article class="blog-post">
      <p>Paragraph 1</p>
      <img class="thumbnail" src="photo1.png">
    </article>
    <!-- we want to add another post here
    <article class="blog-post">
      <p>Paragraph 2</p>
      <img class="thumbnail" src="photo2.png">
    </article>
    -->
  </div>
</body>
```

Doing this using plain javascript can be a hassle.
```js
// typical way of dynamically add a blog post with javascript
let blog = document.createElement('article')
blog.classList.add('blog-post')
let p = document.createElement('p')
p.innerText = 'Paragraph 2'
let img = document.createElement('img')
img.classList.add('thumbnail')
img.src = 'photo2.png'
blog.appendChild(p).appendChild(img)
document.getElementById('blog-container').appendChild(blog)
```

With the help of Makel and Dom, things become easier.
```js
// using makel-dom
const {makel, dom} = require('makel-dom')

let blog = makel('article.blog-post',
              makel('p', 'Paragraph 2'),
              makel('img.thumbnail[src=photo1.png]'))

dom('#blog-container').appendChild(blog)
```

## Usage

### Basic

The simplest example is adding an empty `div` tag to the document's `body`.

#### CommonJS
```js
const {makel, dom} = require('makel-dom')

const body = dom('body')
body.appendChild(makel()) // makel without parameters creates a <div>
```

#### ES6
```js
import {makel, dom} from "./node_modules/makel-dom/src/index.js"

const body = dom('body')
body.appendChild(makel()) // makel without parameters creates a <div>
```

### Makel usages
Makel helps create DOM elements.
```js
const {makel, dom} = require('makel-dom')

let elt = null

// some examples

elt = makel() // <div></div>

// create a span node with an id
elt = makel('span#my-id') // <span id="my-id"></span>

// add class
elt = makel('span.my-class') // <span class="my-class"></span>

// add id and class
elt = makel('span#my-id.my-class') // <span id="my-id" class="my-class"></span>

// add class and attributes
elt = makel('a[href=#].link') // <a class="link" href="#"></a>

// add content to the new element (text & other nodes)
elt = makel('div',
    'paragraphs',
    makel('p', 'paragraph 1'),
    makel('p', 'paragraph 2')
)
// <div>
//  paragraphs
//  <p>paragraph 1</p>
//  <p>paragraph 2</p>
// </div>

// add the generated element to the DOM
dom('body').appendChild(elt)
```
### Dom usages
Dom is equivalent to `document.querySelector()`.
```js
const {dom} = require('makel-dom')

// return the element in DOM with given id
// same as document.querySelector('#myid')
dom('#myid')  

// return the first <div> in DOM that contains a child <p>
// same as document.querySelector('div>p')
dom('div>p')

// return the first element with class blog-post
// same as document.querySelector('.blog-post')
dom('.blog-post')
```
In addition, Dom can select elements relative to another element, even ones not yet added to the DOM.
```js
const {makel, dom} = require('makel-dom')

let elt = makel('',  // short for 'div'
            makel('#1'), // short for 'div#1'
            makel('#2.selected'),
            makel('#3.selected')
          )
 // <div>
 //  <div id="1"></div>
 //  <div id="2" class="selected"></div>
 //  <div id="3" class="selected"></div>
 // </div>

// highlight the first <div> in elt with class 'selected'
dom(elt, 'div.selected').style.backgroundColor = '#FFFF00'

// finally add to DOM
dom('body').appendChild(elt)
```
### _Doms_ usages
Overlooked by most, Dom has a brother Doms who likes to keep to himself. Yet when called upon, Doms is kind and offers plenty of help. Doms can find all the elements Dom misses.
```html
<!--page html-->
<ol>
  <li>item1</li>
  <li>item2</li>
  <li>item3</li>
</ol>
```
```js
const {dom, doms} = require('makel-dom')

dom('ol>li') // <li>item1</li>

// same as document.querySelectorAll('ol>li')
doms('ol>li')
// NodeList(3) [
//   <li>item1</li>,
//   <li>item2</li>,
//   <li>item3</li>
// ]
```

### Evans usages
Evans is a hoarder of events. Instead of assigning individual event listeners, Evans groups all listeners of an element together.
```html
<!--page html-->
<input id="textbox" type="text">

<button id="btn">Submit</button>
```
```js
const {evans, dom} = require('makel-dom') 

const input = dom('#textbox')
const button = dom('#btn')

// Instead of this
input.addEventListener('input', event => console.log('user entered text'))
input.addEventListener('blur', event => console.log('user exited textbox'))
button.addEventListener('click', event => console.log(input.value))

// Evans does this
evans(input, {
    'input': event => console.log('user entered text'),
    'blur': event => console.log('user exited textbox')
})

evans(button, {
    'click': event => console.log(input.value)
})
```

### Module Imports
To `require()` a module, your code will have to be running on a server that supports CommonJS. Alternatively, bundlers such as [Browserify](http://browserify.org/) and [Webpack](https://webpack.js.org/) can bundle the code for use with non-CommonJS servers.

```js
// ---------- app.js ----------
const {makel, dom, doms} require('makel-dom');

dom("body").appendChild(
  makel("p", "Hello World")
);
```

Then run the bundle command.

```shell
browserify app.js > bundle.js
```
```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <script src="bundle.js"></script>
</html>
```

If you are using ES6, then CommonJS is not needed. Simply add an `import` statement and run the module from a server.
```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <script type="module" src="app.js"></script>
</html>
```
```js
// ---------- app.js ----------
import {makel, dom, doms} from "./node_modules/makel-dom/src/index.js"

dom("body").appendChild(
  makel("p", "Hello World")
);
```

You can also reference the code directly through a `<script>` tag. Download the source [here](https://github.com/blubitz/makel-dom/releases/tag/v1.1.0).
```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <script src="./makel-dom.js"></script>
  <script>
  dom("body").appendChild(
    makel("p", "Hello World")
  );
  </script>
</html>
```

## Builds
The ES6 version is located in the `src` folder. The CommonJS version gets placed in `lib` and is auto compiled by Babel.
```shell
npm run build # compile with babel
```
 The non-module version for use with `<script>` tags is in the `dist` folder and compiles from `src`.
```shell
npm run vanilla # generate plain js
```

## Tests
```shell
npm run test
```
```shell
npm run lint:test
```

## License

The code is available under the [MPL-2.0](LICENSE) license.

## Contributing

If you want to help fix a bug or add new features,
1. fork this repository
2. apply changes
3. past tests
4. submit a pull request

Don't worry about making mistakes or if this is your first time contributing, Makel and Dom are understanding folks.
