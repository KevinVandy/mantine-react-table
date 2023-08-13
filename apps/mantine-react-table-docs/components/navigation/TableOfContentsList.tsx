import Link from 'next/link';
import { Box, Anchor } from '@mantine/core';
import { LinkHeading } from '../mdx/LinkHeading';
import { type RouteItem } from './routes';

export const TableOfContentsListItem = ({
  item,
  isFooter = false,
}: {
  item: RouteItem;
  isFooter?: boolean;
}) => (
  <li>
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
);

interface Props {
  items: Array<RouteItem>;
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
        {items.map((item, index) => {
          return (
            <>
              <TableOfContentsListItem
                key={index}
                item={item}
                isFooter={isFooter}
              />
              {item.secondaryItems
                ? item.secondaryItems.map((item, index) => {
                    return (
                      <TableOfContentsListItem
                        key={index}
                        item={item}
                        isFooter={isFooter}
                      />
                    );
                  })
                : null}
            </>
          );
        })}
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
            {item.items && (
              <TableOfContentsList
                items={[
                  ...item.items,
                  ...(item.secondaryItems ? item.secondaryItems : []),
                ]}
              />
            )}
          </Box>
        ))}
      </>
    );
  }
  return <></>;
};
