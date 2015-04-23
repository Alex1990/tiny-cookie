describe('Cookie()', function() {
  it('should return null if no parameter', function() {
    expect(Cookie()).toBe(null);
  });

  it('should return the cookie value if only one parameter', function() {
    document.cookie = 'only_one=value';
    expect(Cookie('only_one')).toBe('value');
  });

  it('should remove the cookie value if the second parameter is null', function() {
    document.cookie = 'second_null=value';
    expect(Cookie('second_null')).toBe('value');

    Cookie('second_null', null);
    expect(Cookie('second_null')).toBe(null);
  });

  it('should return the set cookie value if the second parater is not null', function() {
    Cookie('one', '1');
    expect(Cookie('one')).toBe('1');
  });
});

describe('Cookie.enabled()', function() {
  it('should return true if the cookie is enabled', function() {
    expect(Cookie.enabled()).toBe(true);
  });

  it('should return false if the cookie is disabled', function() {
    expect(Cookie.enabled()).toBe(false);
  });
});

describe('Cookie.get()', function() {
  it('should return null if the cookie key isn\'t exist', function() {
    expect(Cookie.get('nokey')).toBe(null);
  });

  it('should return null if no parameter passed', function() {
    expect(Cookie.get()).toBe(null);
  });

  it('should return "Bar" if "foo" passed', function() {
    document.cookie = 'foo=Bar';
    document.cookie = 'foofoo=BarBar';
    expect(Cookie.get('foo')).toBe('Bar');
  });

  it('should return the decoded string if cookie value is encoded', function() {
    var homepage = 'https://github.com/Alex1990/tiny-cookie';
    document.cookie = 'homepage=' + encodeURIComponent(homepage);
    expect(Cookie.get('homepage')).toBe(homepage);
  });

  it('should return null if empty string passed', function() {
    document.cookie = 'onlyvalue';
    expect(Cookie.get('')).toBe(null);

    document.cookie = '=tiny=cookie';
    expect(Cookie.get('')).toBe(null);
  });

  // At least, in IE 9, it is impossible that cookie value is an empty string.
  it('should return an empty string if only key is set', function() {
    document.cookie = 'onlykey=';
    expect(Cookie.get('onlykey')).toBe('');
  });
});

describe('Cookie.set()', function() {
  it('should return the set cookie value', function() {
    Cookie.set('someKey', 'someValue');
    expect(Cookie.get('someKey')).toBe('someValue');
  });

  it('should return the decoded value', function() {
    var github = 'https://github.com/Alex1990';
    Cookie.set('github', github);
    expect(Cookie.get('github')).toBe(github);
  });

  it('should return null when cookie path is restricted', function() {
    Cookie.set('path_cookie', 'some_value', { path: '/the-other-path/' });
    expect(Cookie.get('path_cookie')).toBe(null);
  });
});

describe('Cookie.remove()', function() {
  it('should return null when remove "foo" cookie', function() {
    Cookie.remove('foo');
    expect(Cookie.get('foo')).toBe(null);
  });

  // it('should return null whe remove the empty string key', function() {
  //   Cookie.remove('');
  //   expect(Cookie.get('')).toBe(null);
  // });
});
