
[].slice.call(document.querySelectorAll('[type="text/babel"]'))
.map(scriptSrc)
.map(transform)
.map(scriptify)

function scriptSrc(script) {
    return script.src
        ? fetch(script.src)
            .then(function (resp) { return resp.text(); })
        : Promise.resolve(script.textContent)
}

function transform(srcPromise) {
    return srcPromise.then(function(src) {
        var code = Babel.transform(src,
          { presets: ['es2015', 'stage-0', 'react']
          // , plugins: ['transform-es2015-modules-amd']
        }).code
        return code;
    });
}

function scriptify(jsPromise) {
    jsPromise.then(function (js) {
        var s = document.createElement('script');
        s.textContent = js;
        document.head.appendChild(s);
    });
}
