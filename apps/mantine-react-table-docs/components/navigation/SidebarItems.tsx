import { FC, Fragment, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UnstyledButton, Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import LaunchIcon from '@mui/icons-material/Launch';
import { RouteItem } from './routes';

interface Props {
  depth?: number;
  routes: RouteItem[];
  setNavOpen: (navOpen: boolean) => void;
}

const SideBarItems: FC<Props> = ({ depth = 1, routes, setNavOpen }) => {
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
      {routes.map(({ href, items, label, divider, external }) => (
        <Fragment key={label}>
          <Link href={href ?? ''} passHref legacyBehavior>
            <a
              style={{ display: 'grid' }}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
            >
              <UnstyledButton
                ref={(node) => selectedItemRef(node, pathname === href)}
                onClick={handleCloseMenu}
                sx={(theme) => ({
                  backgroundColor:
                    pathname === href
                      ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
                      : 'transparent',
                  color: !items
                    ? theme.colorScheme === 'dark'
                      ? theme.colors[theme.primaryColor][3]
                      : theme.colors[theme.primaryColor][8]
                    : depth === 1
                    ? theme.colorScheme === 'dark'
                      ? theme.white
                      : theme.black
                    : theme.colorScheme === 'dark'
                    ? theme.colors.gray[3]
                    : theme.colors.gray[7],
                  display: 'block',
                  fontSize: !items
                    ? '0.9rem'
                    : depth === 1
                    ? '1.25rem'
                    : '1rem',
                  height: items ? '2.5rem' : '2rem',
                  lineHeight: depth === 0 && !items ? '1.25rem' : '0.75rem',
                  padding: '0',
                  whiteSpace: 'nowrap',
                  transition: 'background-color 0.1s ease',
                  '&:hover': {
                    backgroundColor: theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.1),
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
                    <LaunchIcon fontSize="small" sx={{ m: '-0.25rem 4px' }} />
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

export default SideBarItems;
