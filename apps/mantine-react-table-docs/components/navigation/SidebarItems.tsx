import { Fragment, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UnstyledButton, Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconExternalLink } from '@tabler/icons-react';
import { type RouteItem } from './routes';
import { getPrimaryColor } from 'mantine-react-table/src/column.utils';

interface Props {
  depth?: number;
  routes: RouteItem[];
  setNavOpen: (navOpen: boolean) => void;
}

export const SideBarItems = ({ depth = 1, routes, setNavOpen }: Props) => {
  const { pathname } = useRouter();
  const isMobile = useMediaQuery('(max-width: 900px)');

  const handleCloseMenu = () => {
    if (isMobile) setTimeout(() => setNavOpen(false), 200);
  };

  const selectedItemRef = useCallback((node, selected) => {
    if (node && selected) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      {routes.map(({ href, items, label, external, secondaryHrefs }) => (
        <Fragment key={label}>
          <Link href={href ?? ''} passHref legacyBehavior>
            <a
              style={{ display: 'grid' }}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
            >
              <UnstyledButton
                ref={(node) =>
                  selectedItemRef(
                    node,
                    pathname === href || secondaryHrefs?.includes(pathname),
                  )
                }
                onClick={handleCloseMenu}
                sx={(theme) => ({
                  backgroundColor:
                    pathname === href || secondaryHrefs?.includes(pathname)
                      ? theme.fn.rgba(getPrimaryColor(theme), 0.2)
                      : 'transparent',
                  color: !items
                    ? getPrimaryColor(
                        theme,
                        theme.colorScheme === 'dark' ? 3 : 8,
                      )
                    : depth === 1
                    ? theme.colorScheme === 'dark'
                      ? theme.white
                      : theme.black
                    : theme.colorScheme === 'dark'
                    ? theme.colors.gray[3]
                    : theme.colors.gray[7],
                  display: 'block',
                  fontSize: !items ? '0.9rem' : depth === 1 ? '20px' : '16px',
                  height: items ? '32px' : '2rem',
                  lineHeight: depth === 0 && !items ? '20px' : '12px',
                  padding: '0',
                  whiteSpace: 'nowrap',
                  transition: 'background-color 0.1s ease',
                  '&:hover': {
                    backgroundColor: theme.fn.rgba(getPrimaryColor(theme), 0.1),
                  },
                })}
              >
                <Flex
                  sx={{
                    marginLeft: `${depth}rem`,
                  }}
                >
                  {label}
                  {external && (
                    <IconExternalLink
                      style={{ margin: '-6px 4px', transform: 'scale(0.7)' }}
                    />
                  )}
                </Flex>
              </UnstyledButton>
            </a>
          </Link>
          {items && (
            <SideBarItems
              routes={items}
              depth={depth + 1}
              setNavOpen={setNavOpen}
            />
          )}
        </Fragment>
      ))}
    </>
  );
};
