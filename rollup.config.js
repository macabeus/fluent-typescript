import typescript from '@rollup/plugin-typescript'
import resolve from 'rollup-plugin-node-resolve'
import commonJS from 'rollup-plugin-commonjs'

export default {
  input: './src/index.ts',
  output: {
    file: './dist/index.js',
    format: 'iife',
  },
  plugins: [
    typescript(),
    resolve(),
    commonJS({
      include: 'node_modules/**',
    }),
  ],
}
