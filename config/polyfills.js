'use strict';

if (typeof Promise === 'undefined') {
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// axios use XMLHttpRequest so we don't need fetch polyfill
// require('whatwg-fetch');

Object.assign = require('object-assign');
