import {
  CodeHighlight,
  type CodeHighlightProps,
} from '@mantine/code-highlight';
import { Paper } from '@mantine/core';

export function SampleCodeSnippet(props: CodeHighlightProps) {
  return (
    <Paper radius="sm" shadow="sm" withBorder={props.withCopyButton}>
      <CodeHighlight
        {...props}
        language={props.language ?? props?.className?.replace(/language-/, '')}
      />
    </Paper>
  );
}
