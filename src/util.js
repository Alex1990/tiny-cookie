  // Escape special characters.
  function escapeRe (str) {
    return str.replace(/[.*+?^$|[\](){}\\-]/g, '\\$&')
  }

  // Return a future date by the given string.
  function computeExpires (str) {
    const lastCh = str.charAt(str.length - 1)
    const value = parseInt(str, 10)
    let expires = new Date()

    switch (lastCh) {
      case 'Y': expires.setFullYear(expires.getFullYear() + value); break
      case 'M': expires.setMonth(expires.getMonth() + value); break
      case 'D': expires.setDate(expires.getDate() + value); break
      case 'h': expires.setHours(expires.getHours() + value); break
      case 'm': expires.setMinutes(expires.getMinutes() + value); break
      case 's': expires.setSeconds(expires.getSeconds() + value); break
      default: expires = new Date(str)
    }

    return expires
  }

  // Convert an object to a cookie option string.
  function convert (opts) {
    let res = ''

    for (const key in opts) {
      if (opts.hasOwnProperty(key)) {
        if (key === 'expires') {
          let expires = opts[key]

          if (typeof expires !== 'object') {
            expires += typeof expires === 'number' ? 'D' : ''
            expires = computeExpires(expires)
          }
          opts[key] = expires.toUTCString()
        }

        if (key === 'secure') {
          if (opts[key]) {
            res += `;${key}`
          }
          continue
        }

        res += `;${key}=${opts[key]}`
      }
    }

    if (!opts.hasOwnProperty('path')) {
      res += ';path=/'
    }

    return res
  }

  export {
    escapeRe,
    computeExpires,
    convert
  }
