describe('Cookie.isEnabled()', function() {
  it('should return false if the cookie is disabled', function() {
    expect(Cookie.isEnabled()).to.equal(false);
  });
});

