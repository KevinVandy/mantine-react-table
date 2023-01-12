import { FC } from 'react';
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
} from '@mantine/core';
import { IconBrandGithub, IconBrandDiscord } from '@tabler/icons';
import { useMediaQuery } from '@mantine/hooks';
import { IconSun, IconMoonStars } from '@tabler/icons';

interface Props {
  isLightTheme: boolean;
  navOpen: boolean;
  setIsLightTheme: (isLightTheme: boolean) => void;
  setNavOpen: (navOpen: boolean) => void;
}

const TopBar: FC<Props> = ({
  isLightTheme,
  navOpen,
  setIsLightTheme,
  setNavOpen,
}) => {
  const plausible = usePlausible();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');
  const isDesktop = useMediaQuery('(min-width: 1500px)');

  return (
    <Header
      fixed
      height={55}
      sx={(theme) => ({
        alignContent: 'center',
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[7]
            : theme.colors[theme.primaryColor][8],
        display: 'flex',
        justifyContent: 'space-between',
        padding: '4px 20px',
        zIndex: 5,
      })}
    >
      <Flex align="center" gap="md">
        {!isDesktop && (
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
              fontSize: '1.5rem',
              gap: '1rem',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: '#fff',
              },
            }}
            component="h1"
          >
            <Image
              alt="MRT logo"
              src={`/mrt_logo-2.svg`}
              height={isTablet ? 35 : 45}
              width={isTablet ? 35 : 45}
            />
            {!isMobile && 'Mantine React Table'}
          </Text>
        </Link>
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
          gap: '0.5rem',
          '@media (max-width: 480px)': {
            gap: '0.25rem',
          },
        }}
      >
        <Tooltip withArrow label="Github">
          <a
            href="https://github.com/KevinVandy/mantine-react-table"
            rel="noreferrer"
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
        <Tooltip withArrow label="Discord">
          <a
            href="https://discord.gg/5wqyRx6fnm"
            rel="noreferrer"
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
        <Tooltip withArrow label="Toggle Light/Dark Mode">
          <ActionIcon
            aria-label="Toggle Light/Dark Mode"
            onClick={() => {
              setIsLightTheme(!isLightTheme);
              plausible(`toggle-theme-${isLightTheme ? 'dark' : 'light'}-mode`);
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
  );
};

export default TopBar;
