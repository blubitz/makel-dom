// get the script
const {makel, dom} = require(`../`);

let elt = null;

// some examples

elt = makel(); // <div></div>

elt = makel('span#my-id'); // <span id="my-id"></span>

elt = makel('span.my-class'); // <span class="my-class"></span>

elt = makel('span#my-id.my-class'); // <span id="my-id" class="my-class"></span>

elt = makel('a[href=#].link'); // <a class="link" href="#"></a>

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
