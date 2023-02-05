# tiny-cookie

[![Node.js CI](https://github.com/Alex1990/tiny-cookie/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/Alex1990/tiny-cookie/actions/workflows/node.js.yml)
[![codecov](https://codecov.io/gh/Alex1990/tiny-cookie/branch/main/graph/badge.svg)](https://codecov.io/gh/Alex1990/tiny-cookie)
[![npm](https://img.shields.io/npm/dm/tiny-cookie.svg)](https://www.npmjs.com/package/tiny-cookie)
[![npm](https://img.shields.io/npm/v/tiny-cookie.svg)](https://www.npmjs.com/package/tiny-cookie)

**[English](README.md) | 简体中文**

一款浏览器端的极简 Cookie 操作插件。

**从 1.x 升级到 2.x**: 可以查看 [CHANGELOG.md](https://github.com/Alex1990/tiny-cookie/blob/master/CHANGELOG.md#v200)

## 安装

**NPM:**

```bash
npm install tiny-cookie
```

## 使用

**ES2015 (推荐)**

```js
// 可以一次引入所有方法
import * as Cookies from 'tiny-cookie'

// 或者，可以按需引入方法
import { isEnabled, get, set, remove } from 'tiny-cookie'

// 可以直接引入方法别名
import { isCookieEnabled, getCookie, setCookie, removeCookie } from 'tiny-cookie'
```

tiny-cookie 会在全局作用域添加一个`Cookie`对象。或者，也可以把它作为一个
CommonJS/AMD/ES2015 模块引入 (**推荐**)。

## 接口

### isEnabled()

**别名: isCookieEnabled**

检测浏览器是否支持 cookie。

### get(key)

**别名: getCookie**

获取名称为`key`的 cookie 值，默认使用`decodeURIComponent`解码。

### getRaw(key)

**别名: getRawCookie**

获取名称为`key`的原始 cookie 值。

### getAll()

**别名: getAllCookies**

获取所有 cookie 值，默认使用`decodeURIComponent`解码。

### set(key, value, options)

**别名: setCookie**

设置一个名称为`key`的 cookie，使用`encodeURIComponent`编码。`options`参数是一个对象，其属性可以是合法的 cookie 属性值，比如`path`（默认：根路径`/`）、`domain`、`expires`/`max-age`、`samesite`或`secure`。（备注：如果`secure`的值为一个真值，比如`true`，就会被设置，否则不会被设置）。

```js
import { setCookie } from 'tiny-cookie';

const now = new Date;
now.setMonth(now.getMonth() + 1);

setCookie('foo', 'Foo', { expires: now.toGMTString() });
```

`expires`属性值可以是一个`Date`对象，一个可被`Date.parse()`解析的日期字符串，一个整数（单位：天），或者一个带时间后缀的数值字符串。

| 单位后缀     | 含义            |
| ----------- | -------------- |
| Y           | 年             |
| M           | 月             |
| D           | 天             |
| h           | 日             |
| m           | 分             |
| s           | 秒             |

**示例**

```js
import { setCookie } from 'tiny-cookie';
const date = new Date;

date.setDate(date.getDate() + 21);

setCookie('dateObject', 'A date object', { expires: date });
setCookie('dateString', 'A parsable date string', { expires: date.toGMTString() });
setCookie('integer', 'Seven days later', { expires: 7 });
setCookie('stringSuffixY', 'One year later', { expires: '1Y' });
setCookie('stringSuffixM', 'One month later', { expires: '1M' });
setCookie('stringSuffixD', 'One day later', { expires: '1D' });
setCookie('stringSuffixh', 'One hour later', { expires: '1h' });
setCookie('stringSuffixm', 'Ten minutes later', { expires: '10m' });
setCookie('stringSuffixs', 'Thirty seconds later', { expires: '30s' });
```

### setRaw(key, value, options)

**别名: setRawCookie**

设置一个 Cookie 值，无编码。

### remove(key, options)

**别名: removeCookie**

从当前域名移除名称为`key`的 cookie 值。如果你想移除父域名下的 cookie，可以使用`options`参数，比如`remove('cookieName', { domain: 'parentdomain.com' })`。

## 问题

1. 怎么使用 JSON 编解码？

可以通过下面代码实现自己的 cookie 获取和设置方法，使用 JSON 编解码。

```js
import { getCookie, setCookie } from 'tiny-cookie';

export const getJSON = (key) => getCookie(key, JSON.parse);
export const setJSON = (key, value, options) => setCookie(key, value, JSON.stringify, options);
```

## 许可证

MIT.
