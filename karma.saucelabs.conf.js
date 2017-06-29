// Karma configuration
// Generated on Sat Jun 17 2017 00:55:49 GMT+0800 (CST)

module.exports = function(config) {
  const customLanchers = {
    'SL_Chrome': {
      base: 'SauceLabs',
      browserName: 'chrome',
      version: '45'
    },
    'SL_Firefox': {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '45'
    },
    'SL_Safari_8': {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.10',
      version: '8'
    },
    'SL_Safari_9': {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.11',
      version: '9'
    },
    'SL_Safari_10': {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.12',
      version: '10'
    },
    'SL_IE_8': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows XP',
      version: '8'
    },
    'SL_IE_9': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9'
    },
    'SL_IE_10': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '10'
    },
    'SL_IE_11': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '11'
    },
    'SL_EDGE': {
      base: 'SauceLabs',
      browserName: 'microsoftedge',
      platform: 'Windows 10',
      version: '14'
    },
    'SL_iOS_8_1': {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'iPhone 6',
      version: '8.1'
    },
    'SL_iOS_9_0': {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'iPhone 6',
      version: '9.0'
    },
    'SL_iOS_10_2': {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'iPhone 7',
      version: '10.2'
    },
    'SL_Android_4_4': {
      base: 'SauceLabs',
      browserName: 'android',
      version: '4.4'
    },
    'SL_Android_5': {
      base: 'SauceLabs',
      browserName: 'android',
      version: '5'
    },
    'SL_Android_6': {
      base: 'SauceLabs',
      browserName: 'android',
      version: '6'
    },
    'SL_Android_7': {
      base: 'SauceLabs',
      browserName: 'android',
      version: '7'
    },
  };

  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'node_modules/chai/chai.js',
      'dist/tiny-cookie.js',
      'test/setup.js',
      'test/index.spec.js'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: false,
    browsers: Object.keys(customLaunchers),
    sauceLabs: {
      testName: 'tiny-cookie'
    },
    customLanchers: customLaunchers,
    singleRun: true,
    concurrency: Infinity
  })
}
