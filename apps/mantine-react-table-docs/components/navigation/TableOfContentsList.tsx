import { Fragment } from 'react';
import Link from 'next/link';
import { Box, Anchor } from '@mantine/core';
import { LinkHeading } from '../mdx/LinkHeading';
import { type RouteItem } from './routes';
import classes from './TableOfContent.module.css';

export const TableOfContentsListItem = ({
  item,
  isFooter = false,
}: {
  item: RouteItem;
  isFooter?: boolean;
}) => {
  return (
    <li>
      <Link href={item.href} passHref legacyBehavior>
        <Anchor
          className={
            isFooter
              ? classes.navigationLinkFooter
              : classes.isNotNavigationLinkFooter
          }
        >
          {item.label}
        </Anchor>
      </Link>
    </li>
  );
};

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
            <Fragment key={index}>
              <TableOfContentsListItem item={item} isFooter={isFooter} />
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
            </Fragment>
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
