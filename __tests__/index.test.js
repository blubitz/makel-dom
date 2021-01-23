import { makel } from '../src/index';

describe('list all possibilities', () => {
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
