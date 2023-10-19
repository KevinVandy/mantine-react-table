import { Divider, Text, Title } from '@mantine/core';
import { Blockquote } from './Blockquote';
import { SampleCodeSnippet } from './SampleCodeSnippet';
import { LinkHeading } from './LinkHeading';
import { AnchorLink } from './AnchorLink';
import { Paragraph } from './Paragraph';

export const mdxComponents = {
  a: (props: any) => <AnchorLink {...props} />,
  blockquote: (props: any) => <Blockquote {...props} />,
  code: ({ children, ...props }: any) => (
    <SampleCodeSnippet {...props} code={children} />
  ),
  h1: (props: any) => <Title order={1} my="lg" {...props} />,
  h2: (props: any) => <LinkHeading order={2} my="lg" {...props} />,
  h3: (props: any) => (
    <LinkHeading order={3} style={{ marginTop: '3rem' }} my="lg" {...props} />
  ),
  h4: (props: any) => (
    <LinkHeading order={4} style={{ marginTop: '2rem' }} my="lg" {...props} />
  ),
  h5: (props: any) => (
    <LinkHeading order={5} style={{ marginTop: '2rem' }} my="lg" {...props} />
  ),
  h6: (props: any) => <Title order={6} my="md" {...props} />,
  hr: (props: any) => <Divider style={{ marginBottom: '16px' }} {...props} />,
  li: (props: any) => (
    <li className="docsearch-content" {...props}>
      <Text>{props.children}</Text>
    </li>
  ),
  p: (props: any) => <Paragraph {...props} />,
};
