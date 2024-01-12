import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

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
      'clsx',
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
        minimize: true,
        modules: true,
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
        hook: 'buildStart',
        targets: [
          { dest: './', rename: 'styles.css', src: 'dist/cjs/index.css' },
        ],
        verbose: true,
      }),
      del({
        hook: 'buildEnd',
        targets: ['dist/cjs/index.css', 'dist/esm/mantine-react-table.esm.css'],
        verbose: true,
      }),
      dts(),
    ],
  },
];
