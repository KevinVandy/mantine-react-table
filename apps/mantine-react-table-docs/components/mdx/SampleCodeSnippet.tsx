import {
  CodeHighlight,
  type CodeHighlightProps,
} from '@mantine/code-highlight';
import { Code, Paper, useMantineTheme } from '@mantine/core';

export function SampleCodeSnippet(props: CodeHighlightProps) {
  const { primaryColor } = useMantineTheme();

  if (!props.language && !props.className) {
    return <Code color={primaryColor} fz="0.9em" {...props} />;
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
