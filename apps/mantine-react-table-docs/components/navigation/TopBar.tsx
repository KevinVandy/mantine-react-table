import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePlausible } from 'next-plausible';
import {
  Box,
  Tooltip,
  Text,
  ActionIcon,
  Flex,
  Burger,
  useMantineTheme,
  AppShell,
  useMantineColorScheme,
  Select,
} from '@mantine/core';
import {
  IconBrandGithub,
  IconBrandDiscord,
  IconSun,
  IconMoonStars,
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import docsearch from '@docsearch/js';
import '@docsearch/css';
import { getPrimaryColor } from 'mantine-react-table';
import { useRouter } from 'next/router';

interface Props {
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
}

export const TopBar = ({ navOpen, setNavOpen }: Props) => {
  const { pathname } = useRouter();
  const plausible = usePlausible();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');
  const isDesktop = useMediaQuery('(min-width: 1500px)');
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const isLightTheme = colorScheme === 'light';

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
      <AppShell.Header
        style={{
          alignContent: 'center',
          backgroundColor:
            colorScheme === 'dark'
              ? theme.colors.dark[7]
              : getPrimaryColor(theme, 8),
          display: 'flex',
          justifyContent: 'space-between',
          padding: '4px 20px',
          zIndex: 101,
          opacity: 0.97,
        }}
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
              c="white"
              style={{
                alignItems: 'center',
                cursor: 'pointer',
                display: 'flex',
                fontSize: '24px',
                gap: '16px',
                transition: 'color 0.2s ease',
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
            value="v2.mantine-react-table.com"
            size="xs"
            maw="60px"
          />
        </Flex>
        <Box
          onClick={() => plausible('open-search')}
          id="docsearch"
          style={{
            display: 'grid',
            width: isDesktop ? '400px' : !isTablet ? '250px' : undefined,
            alignItems: 'center',
          }}
        />
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            // '@media (max-width: 480px)': {
            //   gap: '4px',
            // },
          }}
        >
          <Tooltip label="Github">
            <ActionIcon
              component={Link}
              aria-label="Github"
              c="white"
              variant="transparent"
              size={isMobile ? 'sm' : 'lg'}
              href="https://github.com/KevinVandy/mantine-react-table"
              rel="noopener"
              target="_blank"
            >
              <IconBrandGithub />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Discord">
            <ActionIcon
              component={Link}
              aria-label="Discord"
              size={isMobile ? 'sm' : 'lg'}
              variant="transparent"
              c="white"
              href="https://discord.gg/5wqyRx6fnm"
              rel="noopener"
              target="_blank"
            >
              <IconBrandDiscord />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Toggle Light/Dark Mode">
            <ActionIcon
              aria-label="Toggle Light/Dark Mode"
              c="white"
              variant="transparent"
              onClick={toggleColorScheme}
              size={isMobile ? 'sm' : 'lg'}
            >
              {colorScheme == 'dark' ? <IconSun /> : <IconMoonStars />}
            </ActionIcon>
          </Tooltip>
        </Box>
      </AppShell.Header>
    </>
  );
};
