import type { CSSProperties } from 'react';
import type { MantineStyleProp, MantineTheme } from '@mantine/core';

export function funcValue<T, U>(
  fn: T | ((arg: U) => T) | undefined,
  arg: U,
): T | undefined {
  return fn instanceof Function ? fn(arg) : fn;
}

export function styleValue(
  x: { style?: MantineStyleProp } | undefined,
  theme: MantineTheme,
) {
  return funcValue(x?.style, theme) as CSSProperties | undefined;
}
