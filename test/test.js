describe('Cookie.get', function() {
  it('should return null if the cookie key isn\'t exist', function() {
    expect(Cookie.get('nokey')).toBe(null);
  });

  it('should return null if no parameter passed', function() {
    expect(Cookie.get()).toBe(null);
  });

  it('should return "Bar" if "foo" passed', function() {
    document.cookie = 'foo=Bar';
    expect(Cookie.get('foo')).toBe('Bar');
  });

  it('should return the decoded string if cookie value is encoded', function() {
    var homepage = 'https://github.com/Alex1990/tiny-cookie';
    document.cookie = 'homepage=' + encodeURIComponent(homepage);
    expect(Cookie.get('homepage')).toBe(homepage);
  });

  it('should return "onlyvalue" if empty string passed', function() {
    document.cookie = 'onlyvalue';
    expect(Cookie.get('')).toBe('onlyvalue');
  });

  // In IE6/7/8/9, it is impossible only key is set.
  it('should return an empty string if only key is set', function() {
    document.cookie = 'onlykey=';
    expect(Cookie.get('onlykey')).toBe('');
  });
});

describe('Cookie.set', function() {
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

describe('Cookie.remove', function() {
  it('should return null when remove "foo" cookie', function() {
    Cookie.remove('foo');
    expect(Cookie.get('foo')).toBe(null);
  });

  it('should return null whe remove the empty string key', function() {
    Cookie.remove('');
    expect(Cookie.get('')).toBe(null);
  });
});
