import { escapeRe, convert } from "./util";
import { Encoder, Decoder, Cookies, CookieOptions } from "./types";

// Check if the browser cookie is enabled.
function isEnabled(): boolean {
  const key = "@key@";
  const value = "1";
  const re = new RegExp(`(?:^|; )${key}=${value}(?:;|$)`);

  document.cookie = `${key}=${value};path=/`;

  const enabled = re.test(document.cookie);

  if (enabled) {
    // eslint-disable-next-line
    remove(key);
  }

  return enabled;
}

// Get the cookie value by key.
function get<T = string>(
  key: string,
  decoder: Decoder<T> | null = decodeURIComponent as Decoder<T>
): T | null {
  if (typeof key !== "string" || !key) {
    return null;
  }

  const reKey = new RegExp(`(?:^|; )${escapeRe(key)}(?:=([^;]*))?(?:;|$)`);
  const match = reKey.exec(document.cookie);

  if (match === null) {
    return null;
  }

  if (typeof decoder === "function") {
    return decoder(match[1]);
  }
  return match[1] as T | null;
}

// The all cookies
function getAll<T = string>(
  decoder: Decoder<T> | null = decodeURIComponent as Decoder<T>
): Cookies<T> {
  const reKey = /(?:^|; )([^=]+?)(?:=([^;]*))?(?:;|$)/g;
  const cookies: Cookies<T> = {};
  let match;

  /* eslint-disable no-cond-assign */
  while ((match = reKey.exec(document.cookie))) {
    reKey.lastIndex = match.index + match.length - 1;
    cookies[match[1]] =
      typeof decoder === "function" ? decoder(match[2]) : (match[2] as T);
  }

  return cookies;
}

// Set a cookie.
function set(key: string, value: any, options?: CookieOptions): void;
function set<T = string>(
  key: string,
  value: any,
  encoder: Encoder<T> | null,
  options?: CookieOptions
): void;
function set<T = string>(
  key: string,
  value: any,
  encoder: CookieOptions | Encoder<T> | null = encodeURIComponent as Encoder<T>,
  options?: CookieOptions
): void {
  if (typeof encoder === "object" && encoder !== null) {
    /* eslint-disable no-param-reassign */
    options = encoder;
    encoder = encodeURIComponent as Encoder<T>;
    /* eslint-enable no-param-reassign */
  }
  const attrsStr = convert(options || {});
  const valueStr = typeof encoder === "function" ? encoder(value) : value;
  const newCookie = `${key}=${valueStr}${attrsStr}`;
  document.cookie = newCookie;
}

// Remove a cookie by the specified key.
function remove(key: string, options?: CookieOptions): void {
  let opts: CookieOptions = { expires: -1 };

  if (options) {
    opts = { ...options, ...opts };
  }

  return set(key, "a", opts);
}

// Get the cookie's value without decoding.
function getRaw(key: string): string | null {
  return get(key, null);
}

// Set a cookie without encoding the value.
function setRaw(key: string, value: string, options?: CookieOptions): void {
  return set(key, value, null, options);
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
