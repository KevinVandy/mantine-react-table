import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePlausible } from 'next-plausible';
import {
  Header,
  Box,
  Tooltip,
  Text,
  ActionIcon,
  Flex,
  Burger,
  useMantineTheme,
  Select,
} from '@mantine/core';
import { IconBrandGithub, IconBrandDiscord } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { useThemeContext } from '../../styles/ThemeContext';
import docsearch from '@docsearch/js';
import '@docsearch/css';
import { getPrimaryColor } from 'mantine-react-table/src/column.utils';
import { useRouter } from 'next/router';

interface Props {
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
}

export const TopBar = ({ navOpen, setNavOpen }: Props) => {
  const { pathname } = useRouter();
  const plausible = usePlausible();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');
  const isDesktop = useMediaQuery('(min-width: 1500px)');
  const { isLightTheme, setIsLightTheme } = useThemeContext();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      docsearch({
        appId: 'GA9W0E15I8',
        apiKey: 'd1d8da70283d84d7669881d993eff727',
        indexName: 'mantine-react-table',
        container: '#docsearch',
      });
    }
  }, []);

  return (
    <>
      <style global jsx>
        {`
          :root {
            --docsearch-primary-color: ${theme.colors[theme.primaryColor][8]};
            --docsearch-highlight-color: ${theme.colors[theme.primaryColor][8]};
            --docsearch-logo-color: ${theme.colors[theme.primaryColor][8]};
            ${!isLightTheme
              ? `--docsearch-container-background: rgba(11, 11, 11, 0.8);
            --docsearch-footer-background: #222;
            --docsearch-hit-background: #333;
            --docsearch-hit-color: #fff;
            --docsearch-hit-shadow: none;
            --docsearch-modal-background: #222;
            --docsearch-modal-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
            --docsearch-searchbox-background: #000;
            --docsearch-searchbox-focus-background: #000;
            --docsearch-text-color: #fff;
           `
              : ''}
          }
        `}
      </style>
      <Header
        fixed
        height={55}
        sx={(theme) => ({
          alignContent: 'center',
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[7]
              : getPrimaryColor(theme, 8),
          display: 'flex',
          justifyContent: 'space-between',
          padding: '4px 20px',
          zIndex: 5,
        })}
      >
        <Flex align="center" gap="md">
          {(!isDesktop || pathname === '/') && (
            <Burger
              color="white"
              opened={navOpen}
              onClick={() => setNavOpen(!navOpen)}
              title="Open nav menu"
            />
          )}
          <Link href="/" passHref legacyBehavior>
            <Text
              sx={{
                alignItems: 'center',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                fontSize: '24px',
                gap: '16px',
                transition: 'color 0.2s ease',
                '&:hover': {
                  color: '#fff',
                },
              }}
              component="h1"
            >
              <Image
                alt="MRT logo"
                src={`/mrt_logo.svg`}
                height={isTablet ? 35 : 45}
                width={isTablet ? 35 : 45}
              />
              {!isMobile && 'Mantine React Table'}
            </Text>
          </Link>
          <Select
            data={[
              { value: 'www.mantine-react-table.com', label: 'V1' },
              { value: 'v2.mantine-react-table.com', label: 'V2' },
            ]}
            onChange={(value) =>
              (location.href = `https://${value}/${pathname}`)
            }
            onClick={() => plausible('version-select')}
            value="www.mantine-react-table.com"
            size="xs"
            maw="60px"
          />
        </Flex>
        <Box
          onClick={() => plausible('open-search')}
          id="docsearch"
          sx={{
            display: 'grid',
            width: isDesktop ? '400px' : !isTablet ? '250px' : undefined,
            alignItems: 'center',
          }}
        />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            '@media (max-width: 480px)': {
              gap: '4px',
            },
          }}
        >
          <Tooltip label="Github">
            <a
              href="https://github.com/KevinVandy/mantine-react-table"
              rel="noopener"
              target="_blank"
            >
              <ActionIcon
                aria-label="Github"
                size={isMobile ? 'sm' : 'lg'}
                sx={{
                  color: 'white',
                  '&:hover': { backgroundColor: 'transparent' },
                }}
              >
                <IconBrandGithub />
              </ActionIcon>
            </a>
          </Tooltip>
          <Tooltip label="Discord">
            <a
              href="https://discord.gg/5wqyRx6fnm"
              rel="noopener"
              target="_blank"
            >
              <ActionIcon
                aria-label="Discord"
                size={isMobile ? 'sm' : 'lg'}
                sx={{
                  color: 'white',
                  '&:hover': { backgroundColor: 'transparent' },
                }}
              >
                <IconBrandDiscord />
              </ActionIcon>
            </a>
          </Tooltip>
          <Tooltip label="Toggle Light/Dark Mode">
            <ActionIcon
              aria-label="Toggle Light/Dark Mode"
              onClick={() => {
                setIsLightTheme(!isLightTheme);
                plausible(
                  `toggle-theme-${isLightTheme ? 'dark' : 'light'}-mode`,
                );
              }}
              size={isMobile ? 'sm' : 'lg'}
              sx={{
                color: 'white',
                '&:hover': { backgroundColor: 'transparent' },
              }}
            >
              {isLightTheme ? <IconSun /> : <IconMoonStars />}
            </ActionIcon>
          </Tooltip>
        </Box>
      </Header>
    </>
  );
};
