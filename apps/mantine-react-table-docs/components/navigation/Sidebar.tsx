import { AppShell, Overlay } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { SideBarItems } from './SidebarItems';
import { routes } from './routes';

interface Props {
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
}

export const SideBar = ({ navOpen, setNavOpen }: Props) => {
  const isMobile = useMediaQuery('(max-width: 900px)');

  return (
    <>
      {navOpen && isMobile && (
        <Overlay
          onClick={() => setNavOpen(false)}
          style={{ backgroundColor: 'black', position: 'fixed' }}
          zIndex={3}
        />
      )}
      <AppShell.Navbar
        hidden={!navOpen}
        w={{ xl: 275, xs: 275 }}
        withBorder
        style={{
          display: navOpen ? 'flex' : 'none',
          overflowY: 'auto',
          paddingBottom: '20rem',
          zIndex: 4,
          left: 0,
        }}
      >
        <SideBarItems routes={routes} setNavOpen={setNavOpen} />
      </AppShell.Navbar>
    </>
  );
};
