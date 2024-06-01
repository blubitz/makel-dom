import { makel, dom, doms, evans } from '../src/index';

describe('list all possibilities of makel', () => {
    it('should return <div></div>', () => {
        var elt = makel();
        var result = '<div></div>';
        expect(elt.outerHTML).toBe(result);
    });

    it('should return <span id="my-id"></span>', () => {
        var elt = makel('span#my-id');
        var result = '<span id="my-id"></span>';
        expect(elt.outerHTML).toBe(result);
    });

    it('should return <span class="my-class"></span>', () => {
        var elt = makel('span.my-class');
        var result = '<span class="my-class"></span>';
        expect(elt.outerHTML).toBe(result);
    });

    it('should return <span id="my-id" class="my-class"></span>', () => {
        var elt = makel('span#my-id.my-class');
        var result = '<span id="my-id" class="my-class"></span>';
        expect(elt.outerHTML).toBe(result);
    });

    it('should return <a class="link" href="#"></a>', () => {
        var elt = makel('a[href=#].link');
        var result = '<a class="link" href="#"></a>';
        expect(elt.outerHTML).toBe(result);
    });

    it('should return <div></div>', () => {
        var elt = makel('div',
            'paragraphs',
            makel('p', 'paragraph 1'),
            makel('p', 'paragraph 2')
        );
        var result = '<div>paragraphs<p>paragraph 1</p><p>paragraph 2</p></div>';
        expect(elt.outerHTML).toBe(result);
    });

    it('should return <h1></h1>', () => {
        var elt = makel('h1');
        var result = '<h1></h1>';
        expect(elt.outerHTML).toBe(result);
    });
});

describe('list all possibilities of dom', () => {
  it('should return a single HTMLElement', () => {
    document.body.innerHTML = `<div id="test"></div>`
    const result = dom('#test')
    expect(result.outerHTML).toBe(document.body.innerHTML)
  });
  it('should query relative to another HTMLElement', () => {
    let el = document.createElement('div')
    let elchild = document.createElement('p')
    elchild.id = 'test'
    el.appendChild(elchild)
    const result = dom(el, '#test')
    expect(result.outerHTML).toBe(elchild.outerHTML)
  });
});

describe('list all possibilities of doms', () => {
  it('should return multiple HTMLElements', () => {
    document.body.innerHTML = `<div class="test"></div><div class="test"></div>`
    const result = doms('.test')
    expect(result.length).toBe(2)
  });
  it('should query relative to another HTMLElement', () => {
    let el = document.createElement('div')
    let elchild = document.createElement('p')
    let elchild2 = document.createElement('p')
    el.appendChild(elchild).appendChild(elchild2)
    const result = doms(el, 'p')
    expect(result.length).toBe(2)
  });
});

describe('list all possibilities of evans', () => {
  it('should bind an event', () => {
    const el = document.createElement('button')
    let result = 3
    evans(el, {
      'click': event => {
        result += 1
      }
    })
    el.click()
    expect(result).toBe(4)
  });
  it('should bind multiple events', () => {
    const el = document.createElement('input')
    let result = ''
    evans(el, {
      'mousedown': event => {
        result += 'b'
      },
      'click': event => {
        result += 'a'
      }
    })
    el.click()
    el.dispatchEvent(new Event('mousedown'))
    expect(result).toBe('ab')
  });
});
