import { FC } from 'react';
import { Prism, PrismProps } from '@mantine/prism';
import { Paper, useMantineTheme } from '@mantine/core';
import { Language } from 'prism-react-renderer';
import { getPrimaryShade } from 'mantine-react-table/src/column.utils';

interface Props extends Partial<PrismProps> {
  children: string;
}

export const SampleCodeSnippet: FC<Props> = (props) => {
  const theme = useMantineTheme();

  if (!props.language && !props.className) {
    return (
      <code
        style={{
          backgroundColor: theme.fn.rgba(
            theme.colors[theme.primaryColor][getPrimaryShade(theme)],
            0.1,
          ),
          padding: '4px',
          margin: '0 0.5ch',
        }}
        {...props}
      />
    );
  }

  if (props.noCopy) {
    return (
      <Prism
        {...props}
        language={
          props.language ??
          (props?.className?.replace(/language-/, '') as Language)
        }
        styles={{
          code: {
            backgroundColor: 'transparent !important',
            padding: 0,
          },
        }}
      />
    );
  }

  return (
    <Paper radius="sm" shadow="sm" withBorder={!props.noCopy}>
      <Prism
        {...props}
        language={
          props.language ??
          (props?.className?.replace(/language-/, '') as Language)
        }
      />
    </Paper>
  );
};
