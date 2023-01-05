import { FC } from 'react';
import { Prism } from '@mantine/prism';
import { Paper, useMantineTheme } from '@mantine/core';

export const SampleCodeSnippet: FC<any> = (props) => {
  const theme = useMantineTheme();

  if (!props.className) {
    return (
      <code
        style={{
          backgroundColor: theme.fn.rgba(theme.colors.blue[7], 0.2),
          padding: '4px',
          margin: '0 0.5ch',
        }}
        {...props}
      />
    );
  }

  return (
    <Paper radius="sm" shadow="md">
      <Prism {...props} language={props.className.replace(/language-/, '')}>
        {props.children}
      </Prism>
    </Paper>
  );
};
