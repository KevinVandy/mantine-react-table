import pkg from './package.json' assert { type: 'json' };
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
        file: `./${pkg.main}`,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: `./${pkg.module}`,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      external(),
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
    input: './dist/types/index.d.ts',
    output: [
      { file: `./${pkg.types}`, format: 'cjs' },
      { file: `./${pkg.types}`.replace('.ts', '.mts'), format: 'esm' },
    ],
    plugins: [
      copy({
        hook: 'buildStart',
        targets: [
          { dest: './', rename: 'styles.css', src: 'dist/cjs/index.css' },
        ],
      }),
      del({
        hook: 'buildEnd',
        targets: ['dist/index.css', 'dist/index.esm.css', 'dist/types'],
      }),
      dts(),
    ],
  },
];
