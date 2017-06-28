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
  const matchedValue = reKey.exec(document.cookie);

  if (matchedValue === null) {
    return null;
  }

  return typeof decoder === 'function' ? decoder(matchedValue[1]) : matchedValue[1];
}

// Set a cookie.
function set(key, value, encoder = encodeURIComponent, attrs) {
  if (typeof encoder === 'object') {
    /* eslint-disable no-param-reassign */
    attrs = encoder;
    encoder = null;
    /* eslint-enable no-param-reassign */
  }
  const attrsStr = convert(attrs || {});
  const valueStr = typeof encoder === 'function' ? encoder(value) : value;
  const newCookie = `${key}=${valueStr}${attrsStr}`;
  document.cookie = newCookie;
}

// Remove a cookie by the specified key.
function remove(key) {
  return set(key, 'a', { expires: new Date() });
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
  set,
  getRaw,
  setRaw,
  remove,
  isEnabled as isCookieEnabled,
  get as getCookie,
  set as setCookie,
  getRaw as getRawCookie,
  setRaw as setRawCookie,
  remove as removeCookie,
};
