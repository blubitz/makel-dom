# makel-dom

> easily create and retrieve DOM elements with CSS like syntax

## Installation
```shell
npm i makel-dom
```

## Description

This project was forked from [hekigan](https://github.com/hekigan/dom-create-element-query-selector).

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
```js
const {makel, dom} = require('makel-dom')

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

## Builds

If you don't use a package manager, you can ~~[access `dom-create-element-query-selector` via unpkg (CDN)](https://unpkg.com/dom-create-element-query-selector/)~~, download the source, or point your package manager to the url.

`dom-create-element-query-selector` is compiled as a collection of [CommonJS](http://webpack.github.io/docs/commonjs.html) modules & [ES2015 modules](http://www.2ality.com/2014/09/es6-modules-final.html) for bundlers that support the `jsnext:main` or `module` field in package.json (Rollup, Webpack 2)

~~The `dom-create-element-query-selector` package includes precompiled production and development [UMD](https://github.com/umdjs/umd) builds in the [`dist` folder](https://unpkg.com/dom-create-element-query-selector/dist/). They can be used directly without a bundler and are thus compatible with many popular JavaScript module loaders and environments. You can drop a UMD build as a [`<script>` tag](https://unpkg.com/dom-create-element-query-selector) on your page. The UMD builds make `dom-create-element-query-selector` available as a `window.createElement` global variable.~~

## License

The code is available under the [MPL-2.0](LICENSE) license.

## Contributing

If you want to help fix a bug or add new features,
1. fork this repository
2. apply changes
3. submit a pull request

Don't worry about making mistakes or if this is your first time contributing, Makel and Dom are understanding.
