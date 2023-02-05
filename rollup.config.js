import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const isProd = process.env.NODE_ENV === 'production';
const format = process.env.FORMAT;

const config = {
  input: 'src/index.ts',
  output: {
    file: 'dist/tiny-cookie.js',
    format,
    name: 'Cookie',
  },
  plugins: [typescript()],
};

if (format === 'es') {
  config.output.file = 'dist/tiny-cookie.esm.js';
} else if (format === 'cjs') {
  config.output.file = 'dist/tiny-cookie.cjs.js';
}

if (isProd) {
  config.output.file = 'dist/tiny-cookie.min.js';
  config.plugins.push(terser());
}

export default config;
