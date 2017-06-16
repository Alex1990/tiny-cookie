import { escapeRe, convert } from './util'

// Check if the browser cookie is enabled.
function isEnabled () {
  const key = '@key@'
  let enabled

  document.cookie = `${key}=1`
  enabled = !!document.cookie

  if (enabled) remove(key)

  return enabled
}

// Get the cookie value by key.
function get (key, decoder = decodeURIComponent) {
  if (typeof key !== 'string' || !key) return null

  const reKey = new RegExp(`(?:^|; )${escapeRe(key)}(?:=([^;]*))?(?:;|$)`)
  const matchedValue = reKey.exec(document.cookie)

  return matchedValue !== null
    ? (typeof decoder === 'function' ? decoder(matchedValue[1]) : matchedValue[1])
    : null
}

// Set a cookie.
function set (key, value, encoder = encodeURIComponent, opts) {
  if (typeof encoder === 'object') {
    opts = encoder
    encoder = null
  }
  opts = opts ? convert(opts) : convert({})
  const newCookie = `${key}=${(typeof encoder === 'function' ? encoder(value) : value)}${opts}`
  document.cookie = newCookie
}

// Remove a cookie by the specified key.
function remove (key) {
  return set(key, 'a', { expires: new Date() })
}

// Get the cookie's value without decoding.
function getRaw (key) {
  return get(key, null)
}

// Set a cookie without encoding the value.
function setRaw (key, value, opts) {
  return set(key, value, null, opts)
}

export {
  isEnabled,
  get,
  getRaw,
  set,
  setRaw,
  remove,
  isEnabled as isCookieEnabled,
  get as getCookie,
  set as setCookie,
  remove as removeCookie
}
