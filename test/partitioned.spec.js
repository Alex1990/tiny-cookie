describe('Cookie.set()', function () {
  // Check the partitioned flag in browser devtools
  // It should have the partitioned flag if you comment the next test cases.
  it('should set partitioned when partitioned option is true', function () {
    Cookie.set('ssl_key', 'ssl_value', { secure: true, partitioned: true });
    expect(Cookie.get('ssl_key')).to.equal('ssl_value');
  });

  // It should have not the partitioned flag.
  it('should not set partitioned when secure option is false', function () {
    Cookie.set('ssl_key', 'ssl_value', { secure: false, partitioned: true });
    expect(Cookie.get('ssl_key')).to.equal(null);
  });

  // It should have not the partitioned flag.
  it('should not set partitioned when partitioned option is false', function () {
    Cookie.set('ssl_key', 'ssl_value', { secure: true, partitioned: false });
    expect(Cookie.get('ssl_key')).to.equal('ssl_value');
  });
});
