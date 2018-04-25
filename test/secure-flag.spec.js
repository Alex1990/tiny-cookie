describe('Cookie.set()', function() {
  // Check the secure flag in browser devtools
  // It should have the secure flag if you comment the next test case.
  it('should set secure when option is true', function() {
    Cookie.set('ssl_key', 'ssl_value', { secure: true });
    expect(Cookie.get('ssl_key')).to.equal('ssl_value');
  });

  // It should have not the secure flag.
  it('should not set secure when option is false', function() {
    Cookie.set('ssl_key', 'ssl_value', { secure: false });
    expect(Cookie.get('ssl_key')).to.equal('ssl_value');
  });
});
