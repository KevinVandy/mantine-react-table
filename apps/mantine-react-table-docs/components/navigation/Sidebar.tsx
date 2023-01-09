import { FC } from 'react';
import { Navbar, Overlay } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import SideBarItems from './SidebarItems';
import { routes } from './routes';

interface Props {
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
}

const SideBar: FC<Props> = ({ navOpen, setNavOpen }) => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  return (
    <>
      {navOpen && isMobile && (
        <Overlay
          onClick={() => setNavOpen(false)}
          sx={{ backgroundColor: 'black', position: 'fixed' }}
          zIndex={3}
        />
      )}
      <Navbar
        fixed
        hidden={!navOpen}
        width={{ xl: 275, xs: 275 }}
        withBorder
        // @ts-ignore
        sx={{
          display: navOpen ? 'flex' : 'none',
          overflowY: 'overlay',
          paddingBottom: '20rem',
          zIndex: 4,
          left: 0,
        }}
      >
        <Navbar.Section>
          <SideBarItems routes={routes} setNavOpen={setNavOpen} />
        </Navbar.Section>
      </Navbar>
    </>
  );
};

export default SideBar;
