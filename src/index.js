import { escapeRe, convert } from './util';

// Check if the browser cookie is enabled.
function isEnabled() {
  const key = '@key@';
  const value = '1';
  const re = new RegExp(`(?:^|; )${key}=${value}(?:;|$)`);

  document.cookie = `${key}=${value}`;

  const enabled = re.test(document.cookie);

  if (enabled) {
    // eslint-disable-next-line
    remove(key);
  }

  return enabled;
}

// Get the cookie value by key.
function get(key, decoder = decodeURIComponent) {
  if ((typeof key !== 'string') || !key) {
    return null;
  }

  const reKey = new RegExp(`(?:^|; )${escapeRe(key)}(?:=([^;]*))?(?:;|$)`);
  const match = reKey.exec(document.cookie);

  if (match === null) {
    return null;
  }

  return typeof decoder === 'function' ? decoder(match[1]) : match[1];
}

// The all cookies
function getAll(decoder = decodeURIComponent) {
  const reKey = /(?:^|; )([^=]+?)(?:=([^;]*))?(?:;|$)/g;
  const cookies = {};
  let match;

  /* eslint-disable no-cond-assign */
  while ((match = reKey.exec(document.cookie))) {
    reKey.lastIndex = (match.index + match.length) - 1;
    cookies[match[1]] = typeof decoder === 'function' ? decoder(match[2]) : match[2];
  }

  return cookies;
}

// Set a cookie.
function set(key, value, encoder = encodeURIComponent, attrs) {
  if (typeof encoder === 'object' && encoder !== null) {
    /* eslint-disable no-param-reassign */
    attrs = encoder;
    encoder = encodeURIComponent;
    /* eslint-enable no-param-reassign */
  }
  const attrsStr = convert(attrs || {});
  const valueStr = typeof encoder === 'function' ? encoder(value) : value;
  const newCookie = `${key}=${valueStr}${attrsStr}`;
  document.cookie = newCookie;
}

// Remove a cookie by the specified key.
function remove(key, options) {
  const opts = { expires: -1 };

  if (options && options.domain) {
    opts.domain = options.domain;
  }

  return set(key, 'a', opts);
}

// Get the cookie's value without decoding.
function getRaw(key) {
  return get(key, null);
}

// Set a cookie without encoding the value.
function setRaw(key, value, opts) {
  return set(key, value, null, opts);
}

export {
  isEnabled,
  get,
  getAll,
  set,
  getRaw,
  setRaw,
  remove,
  isEnabled as isCookieEnabled,
  get as getCookie,
  getAll as getAllCookies,
  set as setCookie,
  getRaw as getRawCookie,
  setRaw as setRawCookie,
  remove as removeCookie,
};
