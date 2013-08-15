var grunt = require('grunt');

exports['requirejs'] = {
  main: function(test) {
    'use strict';

    var expect, result;

    test.expect(1);

    expect = 'define("hello",[],function(){return"hello"}),define("world",[],function(){return"world"}),require(["hello","world"],function(e,t){console.log(e,t)}),define("project",function(){});';
    result = grunt.file.read('tmp/requirejs.js');
    test.equal(expect, result, 'should optimize javascript modules with requireJS');

    test.done();
  },

  template: function(test) {
    'use strict';

    var expect, result;

    test.expect(1);

    expect = 'define("hello",[],function(){return"hello"}),define("world",[],function(){return"world"}),require(["hello","world"],function(e,t){console.log(e,t)}),define("project",function(){});';
    result = grunt.file.read('tmp/requirejs-template.js');
    test.equal(expect, result, 'should process options with template variables.');

    test.done();
  },

  done: function(test) {
    'use strict';

    var expect, result;

    test.expect(1);

    expect = 7;
    result = grunt.file.read('tmp/done-build.txt').split(require('os').EOL).length;
    test.equal(expect, result, 'should provide a done hook with the output');

    test.done();
  },

  almond: function(test) {
    'use strict';

    var expect, result;

    test.expect(2);

    expect = 'var requirejs,require,define;(function(e){function c(e,t){return f.call(e,t)}function h(e,t){var n,r,i,s,o,a,f,l,c,h,p=t&&t.split("/"),d=u.map,v=d&&d["*"]||{};if(e&&e.charAt(0)===".")if(t){p=p.slice(0,p.length-1),e=p.concat(e.split("/"));for(l=0;l<e.length;l+=1){h=e[l];if(h===".")e.splice(l,1),l-=1;else if(h===".."){if(l===1&&(e[2]===".."||e[0]===".."))break;l>0&&(e.splice(l-1,2),l-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((p||v)&&d){n=e.split("/");for(l=n.length;l>0;l-=1){r=n.slice(0,l).join("/");if(p)for(c=p.length;c>0;c-=1){i=d[p.slice(0,c).join("/")];if(i){i=i[r];if(i){s=i,o=l;break}}}if(s)break;!a&&v&&v[r]&&(a=v[r],f=l)}!s&&a&&(s=a,o=f),s&&(n.splice(0,o,s),e=n.join("/"))}return e}function p(t,r){return function(){return n.apply(e,l.call(arguments,0).concat([t,r]))}}function d(e){return function(t){return h(t,e)}}function v(e){return function(t){s[e]=t}}function m(n){if(c(o,n)){var r=o[n];delete o[n],a[n]=!0,t.apply(e,r)}if(!c(s,n)&&!c(a,n))throw new Error("No "+n);return s[n]}function g(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function y(e){return function(){return u&&u.config&&u.config[e]||{}}}var t,n,r,i,s={},o={},u={},a={},f=Object.prototype.hasOwnProperty,l=[].slice;r=function(e,t){var n,r=g(e),i=r[0];return e=r[1],i&&(i=h(i,t),n=m(i)),i?n&&n.normalize?e=n.normalize(e,d(t)):e=h(e,t):(e=h(e,t),r=g(e),i=r[0],e=r[1],i&&(n=m(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},i={require:function(e){return p(e)},exports:function(e){var t=s[e];return typeof t!="undefined"?t:s[e]={}},module:function(e){return{id:e,uri:"",exports:s[e],config:y(e)}}},t=function(t,n,u,f){var l,h,d,g,y,b=[],w;f=f||t;if(typeof u=="function"){n=!n.length&&u.length?["require","exports","module"]:n;for(y=0;y<n.length;y+=1){g=r(n[y],f),h=g.f;if(h==="require")b[y]=i.require(t);else if(h==="exports")b[y]=i.exports(t),w=!0;else if(h==="module")l=b[y]=i.module(t);else if(c(s,h)||c(o,h)||c(a,h))b[y]=m(h);else{if(!g.p)throw new Error(t+" missing "+h);g.p.load(g.n,p(f,!0),v(h),{}),b[y]=s[h]}}d=u.apply(s[t],b);if(t)if(l&&l.exports!==e&&l.exports!==s[t])s[t]=l.exports;else if(d!==e||!w)s[t]=d}else t&&(s[t]=u)},requirejs=require=n=function(s,o,a,f,l){return typeof s=="string"?i[s]?i[s](o):m(r(s,o).f):(s.splice||(u=s,o.splice?(s=o,o=a,a=null):s=e),o=o||function(){},typeof a=="function"&&(a=f,f=l),f?t(e,s,o,a):setTimeout(function(){t(e,s,o,a)},4),n)},n.config=function(e){return u=e,u.deps&&n(u.deps,u.callback),n},requirejs._defined=s,define=function(e,t,n){t.splice||(n=t,t=[]),!c(s,e)&&!c(o,e)&&(o[e]=[e,t,n])},define.amd={jQuery:!0}})(),define("vendor/almond",function(){}),define("hello",[],function(){return"hello"}),define("world",[],function(){return"world"}),require(["hello","world"],function(e,t){console.log(e,t)}),define("project",function(){}),require(["project"]);';
    result = grunt.file.read('tmp/requirejs-almond.js');
    test.ok(result.indexOf(expect) !== -1, 'should optimize javascript modules using almond.js');

    expect = '<script src="requirejs-almond.js"></script>';
    result = grunt.file.read('tmp/index.html');
    test.equal(expect, result, 'should update the html file with the optimized almond build file');

    test.done();
  }
};
