### v2.0.2

2017-11-19

- **Feature**: The `remove()` method supports configuring the domain parameter.

2017-08-21

- **Fix**: Fix the es modules build [#16](https://github.com/Alex1990/tiny-cookie/issues/16)

### v2.0.1

2017-07-12

- **Fix**: Fix the "main" entry in package.json [#13](https://github.com/Alex1990/tiny-cookie/issues/13)

### v2.0.0

With modern development workflow, such as Babel, Rollup, Karma, npm scripts and so on.

2017-07-06

- **Breaking change**: Do not support the `Cookie` as a function.
- **Breaking change**: There is not a default export. That is, `import cookie from 'tiny-cookie` doesn't work. The reason why it hasn't a default export is it will prevent the webpack tree-shaking working. You can do it like this `import * as cookie from 'tiny-cookie'`.[#14](https://github.com/Alex1990/tiny-cookie/issues/14)
- **Breaking change**: Rename `enabled` method to `isEnabled`.
- **Feature**: Add `getAll` method to get all cookie pairs at a time.
- **Feature**: Add aliases for all methods, for details, you can see [API](https://github.com/Alex1990/tiny-cookie#apis)
- Add a command to start an http(s) server.
