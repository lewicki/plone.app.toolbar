var TestCase = buster.testCase,
    assert = buster.assert;


TestCase("iframe stuff", {

  // create element which triggers iframe to be created
  setUp: function() {
    this.el = createElement('example',
        'test/example.js;test/example.css', '<p>example content</p>');
  },

  // remove iframe and element which triggers iframe to be created
  tearDown: function() {
    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0; frames.length !== 0; ) {
      iframes[i].parentNode.removeChild(iframes[i]);
    }
    this.el.parentNode.removeChild(this.el);
  },


  //  --- tests --- //

  "check html of generated iframe": function(done) {
    window.iframed_initialize();

    var iframe = document.getElementsByTagName('iframe')[0],
        iframe_document =  iframe.contentWindow.document;

    function on_load() {
      if (window.iframed.example.loaded === true) {
        assert(document.getElementsByTagName('iframe').length === 1);
        assert(iframe_document.body.childNodes.length === 3);
        assert(iframe_document.getElementsByTagName('p').length === 1);
        assert(iframe_document.getElementsByTagName('p')[0].innerHTML === 'example content');

        var link = iframe_document.getElementsByTagName('link')[0];
        assert(iframe_document.getElementsByTagName('link').length === 1);
        assert(link.getAttribute('href') === 'test/example.css');
        assert(link.getAttribute('type') === 'text/css');
        assert(link.getAttribute('rel') === 'stylesheet');

        var script = iframe_document.getElementsByTagName('script')[0];
        assert(iframe_document.getElementsByTagName('script').length === 1);
        assert(script.getAttribute('src') === 'test/example.js');
        assert(script.getAttribute('type') === 'text/javascript');

        assert(iframe.getAttribute('frameBorder') === '0');
        assert(iframe.getAttribute('border') === '0');
        assert(iframe.getAttribute('allowTransparency') === 'true');
        assert(iframe.getAttribute('scrolling') === 'no');
        assert(iframe.getAttribute('id') === 'example');
        assert(iframe.getAttribute('name') === 'example');
        assert(iframe.getAttribute('style').indexOf('height:0px') === -1);

        assert(window.iframed.example.el === iframe);

        // TODO: test updateOption method
        // TODO: test add method

        done();
        return;
      }
      window.setTimeout(on_load, 23);
      return;
    }
    on_load();

  },

  "height of empty iframe should be 0px": function(done) {
    var el = createElement('example2', '', '');

    window.iframed_initialize();

    var iframe = document.getElementsByName('example2')[0];

    function on_load() {
      if (window.iframed.example2.loaded === true) {
        assert(iframe.getAttribute('style').indexOf('height:0px') !== -1);
        el.parentNode.removeChild(el);
        done();
        return;
      }
      window.setTimeout(on_load, 23);
      return;
    }
    on_load();
  },

  "2 elements gets content into DIFFERENT iframe": function() {
    var el = createElement('example3',
        'test/example.js;test/example.css', '<p>example content</p>');

    window.iframed_initialize();

    assert(document.getElementsByTagName('iframe').length === 2);

    el.parentNode.removeChild(el);
  },

  "2 elements gets content into SAME iframe": function() {
    var el = createElement('example',
        'test/example.js;test/example.css', '<p>example content</p>');

    window.iframed_initialize();

    assert(document.getElementsByTagName('iframe').length === 1);

    el.parentNode.removeChild(el);
  }

});