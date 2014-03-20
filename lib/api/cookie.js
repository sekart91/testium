/*
Copyright (c) 2014, Groupon, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:

Redistributions of source code must retain the above copyright notice,
this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the
documentation and/or other materials provided with the distribution.

Neither the name of GROUPON nor the names of its contributors may be
used to endorse or promote products derived from this software without
specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// Generated by CoffeeScript 2.0.0-beta7
void function () {
  var cache$, decode, getCookie, getTestiumCookie, hasType, parseTestiumCookie, removeTestiumCookie, truthy, tryParse, validateCookie;
  tryParse = require('./json').tryParse;
  cache$ = require('assertive');
  truthy = cache$.truthy;
  hasType = cache$.hasType;
  decode = function (value) {
    return new Buffer(value, 'base64').toString('utf8');
  };
  parseTestiumCookie = function (cookie) {
    var value;
    value = decode(cookie.value);
    return tryParse(value);
  };
  getCookie = function (cookies, name) {
    var cookie, foundCookie;
    foundCookie = null;
    for (var i$ = 0, length$ = cookies.length; i$ < length$; ++i$) {
      cookie = cookies[i$];
      if (cookie.name === name)
        foundCookie = cookie;
    }
    return foundCookie;
  };
  getTestiumCookie = function (cookies) {
    var testiumCookie;
    testiumCookie = getCookie(cookies, '_testium_');
    if (!(null != testiumCookie))
      throw new Error('Unable to communicate with internal proxy. Make sure you are using relative paths.');
    return parseTestiumCookie(testiumCookie);
  };
  removeTestiumCookie = function (cookies) {
    return cookies.filter(function (item) {
      return item.name !== '_testium_';
    });
  };
  validateCookie = function (invocation, cookie) {
    hasType('' + invocation + ' - cookie must be an object', Object, cookie);
    if (!cookie.name)
      throw new Error('' + invocation + ' - cookie must contain `name`');
    if (!cookie.value)
      throw new Error('' + invocation + ' - cookie must contain `value`');
  };
  module.exports = function (driver) {
    return {
      setCookie: function (cookie) {
        validateCookie('setCookie(cookie)', cookie);
        return driver.setCookie(cookie);
      },
      setCookies: function (cookies) {
        return function (accum$) {
          var cookie;
          for (var i$ = 0, length$ = cookies.length; i$ < length$; ++i$) {
            cookie = cookies[i$];
            accum$.push(this.setCookie(cookie));
          }
          return accum$;
        }.call(this, []);
      },
      getCookie: function (name) {
        var cookies;
        hasType('getCookie(name) - requires (String) name', String, name);
        cookies = driver.getCookies();
        return getCookie(cookies, name);
      },
      getCookies: function () {
        return removeTestiumCookie(driver.getCookies());
      },
      clearCookies: function () {
        return driver.clearCookies();
      },
      getStatusCode: function () {
        var cookies, testiumCookie;
        cookies = driver.getCookies();
        testiumCookie = getTestiumCookie(cookies);
        return null != testiumCookie ? testiumCookie.statusCode : void 0;
      },
      getHeaders: function () {
        var cookies, testiumCookie;
        cookies = driver.getCookies();
        testiumCookie = getTestiumCookie(cookies);
        return null != testiumCookie ? testiumCookie.headers : void 0;
      },
      getHeader: function (name) {
        hasType('getHeader(name) - require (String) name', String, name);
        return this.getHeaders()[name];
      }
    };
  };
}.call(this);