describe('Cookie.set()', function() {
  it('should set secure when option is true', function() {
    Cookie.set('ssl_key', 'ssl_value', { secure: true });
    expect(Cookie.get('ssl_key')).to.equal('ssl_value');
  });

  it('should not set secure when option is false', function() {
    Cookie.set('ssl_key', 'ssl_value', { secure: false });
    expect(Cookie.get('ssl_key')).to.equal('ssl_value');
  });
});
