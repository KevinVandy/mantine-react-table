import { FC } from 'react';
import Link from 'next/link';
import { usePlausible } from 'next-plausible';
import { Header, Box, Tooltip, Text, ActionIcon, Flex } from '@mantine/core';
import { IconBrandGithub, IconBrandDiscord } from '@tabler/icons';
import { useMediaQuery } from '@mantine/hooks';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from 'next/image';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

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
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');
  const isDesktop = useMediaQuery('(min-width: 1500px)');

  return (
    <Header
      height={55}
      sx={{
        alignContent: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '4px 12px',
      }}
    >
      <Flex align="center" gap="md">
        {!isDesktop && (
          <ActionIcon
            aria-label="Open nav menu"
            onClick={() => setNavOpen(!navOpen)}
            size="xl"
          >
            {navOpen ? (
              <MenuOpenIcon color="inherit" />
            ) : (
              <MenuIcon color="inherit" />
            )}
          </ActionIcon>
        )}
        <Link href="/" passHref legacyBehavior>
          <Text
            sx={{
              alignItems: 'center',
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
              src="/mrt_logo.svg"
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
            <ActionIcon aria-label="Github" size={isMobile ? 'sm' : 'lg'}>
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
            <ActionIcon aria-label="Discord" size={isMobile ? 'sm' : 'lg'}>
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
          >
            {isLightTheme ? (
              <LightModeIcon fontSize={isMobile ? 'medium' : 'large'} />
            ) : (
              <DarkModeIcon fontSize={isMobile ? 'medium' : 'large'} />
            )}
          </ActionIcon>
        </Tooltip>
      </Box>
    </Header>
  );
};

export default TopBar;
