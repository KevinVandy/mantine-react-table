import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import { babel } from '@rollup/plugin-babel';

export default [
  {
    external: [
      '@mantine/core',
      '@mantine/dates',
      '@mantine/hooks',
      '@tabler/icons-react',
      '@tanstack/match-sorter-utils',
      '@tanstack/react-table',
      '@tanstack/react-virtual',
      'dayjs',
      'react',
    ],
    input: './src/index.ts',
    output: [
      {
        file: './dist/cjs/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/esm/mantine-react-table.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react'],
      }),
      external(),
      resolve(),
      typescript({
        rootDir: './src',
      }),
      postcss({
        extract: true,
        modules: true,
        minimize: true,
      }),
    ],
  },
  {
    input: './dist/esm/types/index.d.ts',
    output: [
      {
        file: './dist/index.d.ts',
        format: 'esm',
      },
    ],
    plugins: [
      copy({
        targets: [
          { src: 'dist/cjs/index.css', dest: 'dist', rename: 'mrt.css' },
        ],
        verbose: true,
        hook: 'buildStart',
      }),
      del({
        targets: ['dist/cjs/index.css', 'dist/esm/mantine-react-table.esm.css'],
        verbose: true,
        hook: 'buildEnd',
      }),
      dts(),
    ],
  },
];
