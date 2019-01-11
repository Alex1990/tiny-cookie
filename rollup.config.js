import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

const env = process.env.NODE_ENV;

const config = {
  input: 'src/index.js',
  output: {
    file: 'dist/tiny-cookie.js',
    format: 'umd',
    name: 'Cookie',
  },
  plugins: [
    babel(),
  ],
};

if (env === 'production') {
  config.output.file = 'dist/tiny-cookie.min.js';
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        warnings: false,
      },
    }),
  );
}

export default config;
