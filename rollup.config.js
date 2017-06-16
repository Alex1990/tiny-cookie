import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'
import uglify from 'rollup-plugin-uglify'

const env = process.env.NODE_ENV

const config = {
  format: 'umd',
  moduleName: 'Cookie',
  plugins: [
    babel(babelrc())
  ]
}

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        warnings: false,
        screw_ie8: false
      },
      mangle: {
        screw_ie8: false
      },
      output: {
        screw_ie8: false
      }
    })
  )
}

export default config
