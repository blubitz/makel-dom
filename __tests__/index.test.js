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

  it('should bind events to query selected element', () => {
    document.body.replaceWith(document.createElement("body"))
    const el = document.createElement('input')
    el.id = 'el'
    document.body.append(el)
    let result = ''
    evans('#el', {
      'mousedown': event => {
        result += 'b'
      },
      'click': event => {
        result += 'a'
      },
      'blur': event => {
        result += 'c'
      },
      'mouseenter': event => {
        result += 'd'
      }
    })
    el.click()
    el.dispatchEvent(new Event('mousedown'))
    el.dispatchEvent(new Event('blur'))
    el.dispatchEvent(new Event('mouseenter'))
    expect(result).toBe('abcd')
  });

  it('should bubble children events of query selected element', () => {
    document.body.replaceWith(document.createElement("body"))
    const el = document.createElement('div')
    el.id = 'el'
    const elChild = document.createElement('input')
    elChild.id = 'elChild'
    el.append(elChild)
    document.body.append(el)
    let result = 3
    evans('#el', {
      'click': event => {
        result += 1
      }
    })
    elChild.click()
    expect(result).toBe(4)
  });

  it('should bind events to dynamically appended elements', () => {
    document.body.replaceWith(document.createElement("body"))
    let result = 3
    evans('.listItem', {
      'click': event => {
        result += 1
      }
    })
    const el1 = document.createElement('input')
    el1.id = 'el1'
    el1.classList.add('listItem')
    const el2 = document.createElement('input')
    el2.id = 'el2'
    el2.classList.add('listItem')
    const el = document.createElement('div')
    el.id = 'el'
    el.append(el1, el2)
    document.body.append(el)
    el1.click()
    el2.click()
    expect(result).toBe(5)
  });

  it('should trigger multiple listeners when bubbling events', () => {
    document.body.replaceWith(document.createElement("body"))
    let result = ''
    const popup = document.createElement('div')
    popup.id = 'popup'
    const background = document.createElement('div')
    background.id = 'bg'
    background.append(popup)
    document.body.append(background)
    evans('#bg', {
      'click': event => result += 'bg'
    })
    evans('#popup', {
      'click': event => {
        result += 'popup'
      }
    })
    evans('body', {
      'click': event => {
        result += 'body'
      }
    })
    popup.click()
    expect(result).toBe('popupbgbody')
  });

  it('should not bubble events after calling stopPropagation()', () => {
    document.body.replaceWith(document.createElement("body"))
    let result = ''
    const popup = document.createElement('div')
    popup.id = 'popup'
    const background = document.createElement('div')
    background.id = 'bg'
    background.append(popup)
    document.body.append(background)
    evans('#bg', {
      'click': event => {
        result += 'bg'
        event.stopPropagation()
      }
    })
    evans('#popup', {
      'click': event => {
        result += 'popup'
      }
    })
    evans('body', {
      'click': event => {
        result += 'body'
      }
    })
    popup.click()
    expect(result).toBe('popupbg')
  });

  it('should propagate to multiple listeners of the same event', () => {
    document.body.replaceWith(document.createElement("body"))
    let result = ''
    const el = document.createElement('div')
    el.id = 'el'
    document.body.append(el)
    evans('#el', {
      'click': event => result += 'a'
    })
    evans('#el', {
      'click': event => result += 'b'
    })
    el.click()
    expect(result).toBe('ab')
  });

  it('should not propagate to other listeners when using stopImmediatePropagation()', () => {
    document.body.replaceWith(document.createElement("body"))
    let result = ''
    const el = document.createElement('div')
    el.id = 'el'
    const elChild = document.createElement('div')
    elChild.id = 'elChild'
    el.append(elChild)
    document.body.append(el)
    evans('#el', {
      'click': event => {
        result += 'a'
      }
    })
    evans('#elChild', {
      'click': event => {
        result += 'b'
        event.stopImmediatePropagation()
      }
    })
    evans('#elChild', {
      'click': event => result += 'c'
    })
    elChild.click()
    expect(result).toBe('b')
  });

  it('should handle events by element and query selection together', () => {
    document.body.replaceWith(document.createElement("body"))
    const el = document.createElement('div')
    el.id = 'el'
    document.body.append(el)
    let result = ''
    evans(el, {
      'click': e => result += 'a'
    })
    evans('#el', {
      'click': e => result += 'b'
    })
    el.click()
    expect(result).toBe('ba')
  })
});
