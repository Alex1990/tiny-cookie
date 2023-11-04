import { CookieOptions } from "./types";

export function hasOwn(obj: any, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

// Escape special characters.
export function escapeRe(str: string): string {
  return str.replace(/[.*+?^$|[\](){}\\-]/g, "\\$&");
}

// Return a future date by the given string.
export function computeExpires(str: string): Date {
  const lastCh = str.charAt(str.length - 1);
  const value = parseInt(str, 10);
  let expires = new Date();

  switch (lastCh) {
    case "Y":
      expires.setFullYear(expires.getFullYear() + value);
      break;
    case "M":
      expires.setMonth(expires.getMonth() + value);
      break;
    case "D":
      expires.setDate(expires.getDate() + value);
      break;
    case "h":
      expires.setHours(expires.getHours() + value);
      break;
    case "m":
      expires.setMinutes(expires.getMinutes() + value);
      break;
    case "s":
      expires.setSeconds(expires.getSeconds() + value);
      break;
    default:
      expires = new Date(str);
  }

  return expires;
}

// Convert an object to a cookie option string.
export function convert(opts: CookieOptions): string {
  let res = "";

  for (const key of Object.keys(opts)) {
    if (/^expires$/i.test(key)) {
      let expires = opts[key as keyof CookieOptions];
      let expiresDate: Date;

      if (typeof expires === "object") {
        expiresDate = expires;
      } else {
        expires += typeof expires === "number" ? "D" : "";
        expiresDate = computeExpires(String(expires));
      }
      res += `;${key}=${expiresDate.toUTCString()}`;
    } else if (/^secure|partitioned$/.test(key)) {
      if (opts[key as keyof CookieOptions]) {
        res += `;${key}`;
      }
    } else {
      res += `;${key}=${opts[key as keyof CookieOptions]}`;
    }
  }

  if (!hasOwn(opts, "path")) {
    res += ";path=/";
  }

  return res;
}
