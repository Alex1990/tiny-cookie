/*!
 * tiny-cookie - A tiny cookie manipulation plugin
 * https://github.com/Alex1990/tiny-cookie
 * Under the MIT license | (c) Alex Chao
 */

!(function(root, factory) {

  // Uses CommonJS, AMD or browser global to create a jQuery plugin.
  // See: https://github.com/umdjs/umd
  if (typeof define === 'function' && define.amd) {
    // Expose this plugin as an AMD module. Register an anonymous module.
    define(factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS module
    module.exports = factory();
  } else {
    // Browser globals 
    factory(root);
  }

}(this, function(root) {

  'use strict';

  var cookie = {

    get: function(key) {
      key = '(?:^|;)' + escapeRe(key) + (key ? '=' : '') +
            '([^' + (key ? '' : '=') + ';]*?)(?:;|$)';
      var reKey = new RegExp(key);
      var res = reKey.exec(document.cookie.replace(/\s+/g, ''));
      return res !== null ? decodeURIComponent(res[1]) : null;
    },

    set: function(key, value, opts) {
      opts = opts ? convert(opts) : '';
      var cookie = key + '=' + encodeURIComponent(value) + opts;
      document.cookie = cookie;
    },

    remove: function(key) {
      cookie.set(key, 'a', { expires: new Date().toGMTString() });
    }

  };

  function escapeRe(str) {
    return str.replace(/[.*+?^$|[\](){}\\-]/g, '\\$&');
  }

  function convert(opts) {
    var res = '';
    for (var p in opts) {
      if (opts.hasOwnProperty(p)) {
        res = ';' + p + '=' + opts[p];
      }
    }
    return res;
  }

  if (root) {
    root.Cookie = cookie;
  }

  return cookie;

}));
