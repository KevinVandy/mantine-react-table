import Link from 'next/link';
import { Box, Anchor, Text } from '@mantine/core';
import { LinkHeading } from '../mdx/LinkHeading';

interface Props {
  items: Array<any>;
  isFooter?: boolean;
  variant?: 'list' | 'heading';
}

export const TableOfContentsList = ({
  items,
  isFooter = false,
  variant = 'list',
}: Props) => {
  if (variant === 'list') {
    return (
      <ul
        style={{
          listStyle: isFooter ? 'none' : undefined,
          padding: isFooter ? 0 : undefined,
        }}
      >
        {items.map((item, index) => (
          <li key={index}>
            <Link href={item.href} passHref legacyBehavior>
              <Anchor
                sx={(theme) => ({
                  color: !isFooter
                    ? theme.colorScheme === 'dark'
                      ? theme.white
                      : theme.black
                    : theme.colorScheme === 'dark'
                    ? theme.colors.gray[3]
                    : theme.colors.gray[7],
                  cursor: 'pointer',
                  lineHeight: isFooter ? '1.6rem' : '2rem',
                  fontSize: isFooter ? '0.9rem' : '1.2rem',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                })}
              >
                {item.label}
              </Anchor>
            </Link>
          </li>
        ))}
      </ul>
    );
  } else if (variant === 'heading') {
    return (
      <>
        {items.map((item, index) => (
          <Box key={index}>
            <LinkHeading order={3} href={item.href}>
              {item.label}
            </LinkHeading>
            {item.items && <TableOfContentsList items={item.items} />}
          </Box>
        ))}
      </>
    );
  }
  return <></>;
};
