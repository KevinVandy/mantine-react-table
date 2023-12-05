import {
  CodeHighlight,
  type CodeHighlightProps,
} from '@mantine/code-highlight';
import { Code, Paper, rgba, useMantineTheme } from '@mantine/core';

export function SampleCodeSnippet(props: CodeHighlightProps) {
  const theme = useMantineTheme();

  if (!props.language && !props.className) {
    return (
      <Code color={rgba(theme.colors[theme.primaryColor][7], 0.2)} fz="0.9em">
        {props.code}
      </Code>
    );
  }

  return (
    <Paper radius="sm" shadow="sm" withBorder={props.withCopyButton}>
      <CodeHighlight
        {...props}
        language={props.language ?? props?.className?.replace(/language-/, '')}
      />
    </Paper>
  );
}
