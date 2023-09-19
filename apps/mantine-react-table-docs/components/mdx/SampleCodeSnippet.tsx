import {
  CodeHighlight,
  type CodeHighlightProps,
} from '@mantine/code-highlight';
import { Code, Paper, useMantineTheme } from '@mantine/core';

interface Props extends CodeHighlightProps {
  children: string;
}

export function SampleCodeSnippet(props: Props) {
  const { primaryColor } = useMantineTheme();

  if (!props.language && !props.className) {
    return <Code color={primaryColor} fz="0.9em" {...props} />;
  }

  if (!props.withCopyButton) {
    return <CodeHighlight code={props.children} />;
  }

  return (
    <Paper radius="sm" shadow="sm" withBorder={props.withCopyButton}>
      <CodeHighlight
        {...props}
        code={props.children}
        language={props.language ?? props?.className?.replace(/language-/, '')}
      />
    </Paper>
  );
}
