export type Decoder<T> = (value: string) => T;
export type Encoder<T> = (value: T) => string;

export interface Cookies<T = string> {
  [key: string]: T;
}

export interface CookieOptions {
  domain?: string;
  path?: string;
  expires?: Date | string | number;
  "max-age"?: number;
  secure?: boolean;
  samesite?: string;
  partitioned?: boolean;
}
