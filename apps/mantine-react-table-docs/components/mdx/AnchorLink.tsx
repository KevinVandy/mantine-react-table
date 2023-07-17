import { Anchor } from '@mantine/core';
import Link from 'next/link';

export const AnchorLink = (props) => {
  return (
    <Link href={props.href} passHref legacyBehavior>
      <Anchor
        target={props.href.startsWith('http') ? '_blank' : undefined}
        rel="noopener"
        {...props}
      >
        {props.children}
      </Anchor>
    </Link>
  );
};
