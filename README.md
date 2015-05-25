# tiny-cookie

A tiny cookie manipulation plugin.

The tiny-cookie will expose a method `Cookie` on the global scope. Also, it can be as a CommonJS/AMD module.

## Packages

**NPM:**

```bash
npm install tiny-cookie
```

## APIs

### Cookie.enabled()

Check if the cookie is enabled.

### Cookie.get(key)

**Alias: Cookie(key)**

Get the cookie value with decoding, using `decodeURIComponent`.

### Cookie.getRaw(key)

**Also: Cookie.get(key, true)**

Get the cookie value without decoding.

### Cookie.set(key, value, options)

**Alias: Cookie(key, value, options)**

Set a cookie with encoding the value, using `encodeURIComponent`. The `options` parameter is an object. And its property can be a valid cookie option, such as `path`, `domain`, `expires`/`max-age` or `secure`. For example, you can set the expiration:

```js
var now = new Date;
now.setMonth(now.getMonth() + 1);

Cookie.set('foo', 'Foo', { expires: now.toGMTString() });
```

### Cookie.setRaw(key, value, options)

**Also: Cookie.set(key, value, true, options)**

Set a cookie without encoding.

### Cookie.remove(key)

**Alias: Cookie(key, null)**

Remove a cookie.

## License

MIT.
