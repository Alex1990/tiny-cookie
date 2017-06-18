describe('Cookie.set()', function() {
  it('should set secure when option is true', function() {
    Cookie.set('someKey', 'someValue', { secure: true });
    expect(Cookie.get('someKey')).to.equal(null);
  });
});
