describe('Cookie()', function() {

  // Check the below cookies setting manually.
  if (Cookie.isEnabled()) {
    var now = new Date();
    now.setDate(now.getDate() + 1);
    var i = 0;
    var prefix = function() {
      i++;
      return 'expires_' + i + '_';
    };

    Cookie.setRaw(prefix() + '_dateString', 'A parsable date string', { expires: now.toGMTString() });
    Cookie.setRaw(prefix() + '_dateObject', 'A date object', { expires: now });
    Cookie.setRaw(prefix() + '_numberValue', 'Default unit is day', { expires: 7 });
    Cookie.setRaw(prefix() + '_oneYearLater', 'Suffix char is an uppercase "Y"', { expires: '1Y' });
    Cookie.setRaw(prefix() + '_oneMonthLater', 'Suffix char is an uppercase "M"', { expires: '1M' });
    Cookie.setRaw(prefix() + '_oneDayLater', 'Suffix char is an uppercase "D"', { expires: '1D' });
    Cookie.setRaw(prefix() + '_oneHourLater', 'Suffix char is an lowercase "h"', { expires: '1h' });
    Cookie.setRaw(prefix() + '_tenMinutesLater', 'Suffix char is an lowercase "m"', { expires: '10m' });
    Cookie.setRaw(prefix() + '_thirtySecondsLater', 'Suffix char is an lowercase "s"', { expires: '30s' });
  };
});

describe('Cookie.isEnabled()', function() {
  it('should return true if the cookie is enabled', function() {
    expect(Cookie.isEnabled()).to.equal(true);
  });
});

describe('Cookie.get()', function() {
  it('should return null if the cookie key isn\'t exist', function() {
    expect(Cookie.get('nokey')).to.equal(null);
  });

  it('should return null if no parameter passed', function() {
    expect(Cookie.get()).to.equal(null);
  });

  it('should return "Bar" if "foo" passed', function() {
    document.cookie = 'foo=Bar';
    document.cookie = 'foofoo=BarBar';
    expect(Cookie.get('foo')).to.equal('Bar');
  });

  it('should return the decoded string if cookie value is encoded', function() {
    var homepage = 'https://github.com/Alex1990/tiny-cookie';
    document.cookie = 'homepage=' + encodeURIComponent(homepage);
    expect(Cookie.get('homepage')).to.equal(homepage);
  });

  it('should return the value without decoding if second parameter is true', function() {
    var key = 'withoutDecoding';
    var value = encodeURIComponent('https://github.com/Alex1990/tiny-cookie');
    document.cookie = key + '=' + value;
    expect(Cookie.get(key, true)).to.equal(value);
  });

  it('should return right value if cookie key contains whitespace', function() {
    var key = 'he  llo';
    var value = 'world';
    document.cookie = key + '=' + value;
    expect(Cookie.get(key)).to.equal(value);
  });

  it('should return right value if cookie value contains whitespace', function() {
    var key = 'whitespacevalue';
    var value = 'va  lue';
    document.cookie = key + '=' + value;
    expect(Cookie.get(key)).to.equal(value);
  });

  it('should return null if empty string passed', function() {
    document.cookie = 'onlyvalue';
    expect(Cookie.get('')).to.equal(null);

    document.cookie = '=tiny=cookie';
    expect(Cookie.get('')).to.equal(null);
  });

  // At least, in IE 9, it is impossible that cookie value is an empty string.
  it('should return an empty string if only key is set', function() {
    document.cookie = 'onlykey=';
    expect(Cookie.get('onlykey')).to.equal('');
  });
});

describe('Cookie.getRaw()', function() {
  it('should return the value without decoding', function() {
    var key = 'withoutDecoding';
    var value = encodeURIComponent('https://github.com/Alex1990/tiny-cookie');
    document.cookie = key + '=' + value;
    expect(Cookie.getRaw(key)).to.equal(value);
  });
});

describe('Cookie.getAll()', function() {
  it('should return all the cookies', function() {
    document.cookie = 'foo=hello';
    document.cookie = 'bar=world';
    document.cookie = 'baz=42';
    var cookies = Cookie.getAll();
    expect(cookies.foo).to.equal('hello');
    expect(cookies.bar).to.equal('world');
    expect(cookies.baz).to.equal('42');
  });
});

describe('Cookie.set()', function() {
  it('should return the set cookie value', function() {
    Cookie.set('someKey', 'someValue');
    expect(Cookie.get('someKey')).to.equal('someValue');
  });

  it('should return the decoded value', function() {
    var github = 'https://github.com/Alex1990';
    Cookie.set('github', github);
    expect(Cookie.getRaw('github')).to.equal(encodeURIComponent(github));

    var tinyCookie = 'https://github.com/Alex1990/tiny-cookie';
    Cookie.set('tinyCookie', tinyCookie, { expires: 7 });
    expect(Cookie.getRaw('tinyCookie')).to.equal(encodeURIComponent(tinyCookie));
  });

  it('should return the value without encoding if the third parameter is true', function() {
    var key = 'withoutEncoding';
    var value = 'https://github.com/Alex1990/tiny-cookie';
    Cookie.setRaw(key, value);
    expect(Cookie.getRaw(key)).to.equal(value);
  });

  it('should return null when cookie path is restricted', function() {
    Cookie.set('path_cookie', 'some_value', { path: '/the-other-path/' });
    expect(Cookie.get('path_cookie')).to.equal(null);
  });
});

describe('Cookie.setRaw()', function() {
  it('should return the value without encoding', function() {
    var key = 'withoutEncoding';
    var value = 'https://github.com/Alex1990/tiny-cookie';
    Cookie.setRaw(key, value);
    expect(Cookie.getRaw(key)).to.equal(value);
  });
});

describe('Cookie.remove()', function() {
  it('should return null when remove "removeKey" cookie', function() {
    document.cookie = 'removeKey=removeValue;path=/';
    Cookie.remove('removeKey');
    expect(Cookie.get('removeKey')).to.equal(null);
  });

  it('should remove the cookie under the specified path', function () {
    document.cookie = 'pathCookie=pathCookie;';
    var path = location.pathname;
    var lastSlashIndex = path.lastIndexOf('/');
    if (lastSlashIndex > -1) {
      path = path.slice(0, lastSlashIndex);
    }
    Cookie.remove('pathCookie', {
      path: path || '/',
    });
    expect(Cookie.get('pathCookie')).to.equal(null);
  });
});

describe('Aliases', function () {
  it('isCookieEnabled should be equal to isEnabled', function () {
    expect(Cookie.isCookieEnabled).to.equal(Cookie.isEnabled);
  });

  it('getCookie should be equal to get', function () {
    expect(Cookie.getCookie).to.equal(Cookie.get);
  });

  it('getAllCookies should be equal to getAll', function () {
    expect(Cookie.getAllCookies).to.equal(Cookie.getAll);
  });

  it('setCookie should be equal to set', function () {
    expect(Cookie.setCookie).to.equal(Cookie.set);
  });

  it('removeCookie should be equal to remove', function () {
    expect(Cookie.removeCookie).to.equal(Cookie.remove);
  });

  it('getRawCookie should be equal to getRaw', function () {
    expect(Cookie.getRawCookie).to.equal(Cookie.getRaw);
  });

  it('setRawCookie should be equal to setRaw', function () {
    expect(Cookie.setRawCookie).to.equal(Cookie.setRaw);
  });
});
