import { type Renderable, flexRender } from '@tanstack/react-table';
import { type ReactNode } from 'react';

const MRT_FlexRender = flexRender as (
  Comp: Renderable<any>,
  props: any,
) => ReactNode | JSX.Element;

export { MRT_FlexRender };

export * from './MantineReactTable';
export * from './aggregationFns';
export * from './body';
export * from './buttons';
export * from './filterFns';
export * from './footer';
export * from './head';
export * from './inputs';
export * from './menus';
export * from './sortingFns';
export * from './table';
export * from './toolbar';
export * from './types';
export * from './useMantineReactTable';
