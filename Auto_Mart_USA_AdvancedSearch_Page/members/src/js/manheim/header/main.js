'use strict';
require('./utils/polyfill.js')();

(function (global) {
  if (global) {

    var Guava = require('./Guava');
    var Peekaboo = require('./Peekaboo');
    var ManualAuth = require('./ManualAuth');
    var TriggerOneSearch = require('./TriggerOneSearch');
    var GreetUser = require('./GreetUser');

    var HFS = global.HFS || {};

    global.HFS = Object.assign(HFS, { Guava, Peekaboo, ManualAuth, TriggerOneSearch, GreetUser });
  }
})(global || window);
