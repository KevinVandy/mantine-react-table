import { Prism, type PrismProps } from '@mantine/prism';
import { Code, Paper, useMantineTheme } from '@mantine/core';
import { type Language } from 'prism-react-renderer';

interface Props extends Partial<PrismProps> {
  children: string;
}

export const SampleCodeSnippet = (props: Props) => {
  const { primaryColor } = useMantineTheme();

  if (!props.language && !props.className) {
    return <Code color={primaryColor} fz="0.9em" {...props} />;
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
