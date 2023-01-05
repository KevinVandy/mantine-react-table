import { FC } from 'react';
import { Prism } from '@mantine/prism';

import { useMantineTheme } from '@mantine/core';

  export const SampleCodeSnippet: FC<any> = (props) => {
  const theme = useMantineTheme();

  if (!props.className) {
    return (
      <code
        style={{
          backgroundColor: theme.colors.blue[9],
          padding: '4px',
          margin: '0 0.5ch',
        }}
        {...props}
      />
    );
  }

  return (
    <Prism {...props} language={props.className.replace(/language-/, '')}>
      {props.children}
    </Prism>
  );
};
