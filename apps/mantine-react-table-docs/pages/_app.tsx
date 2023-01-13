import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import PlausibleProvider from 'next-plausible';
import { useRouter } from 'next/router';
import { MDXProvider } from '@mdx-js/react';
import { ThemeProvider } from '@mui/material';
import { ColorSchemeProvider, MantineProvider, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { mdxComponents } from '../components/mdx/mdxComponents';
import TopBar from '../components/navigation/TopBar';
import SideBar from '../components/navigation/Sidebar';
import BreadCrumbs from '../components/navigation/BreadCrumbs';
import MiniNav from '../components/navigation/MiniNav';
import Footer from '../components/navigation/Footer';
import { SuggestsEditsButton } from '../components/mdx/SuggestsEditsButton';
import { theme } from '../styles/MuiTheme';
import docsearch from '@docsearch/js';
import '../styles/globals.css';
import '@docsearch/css';

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const showBreadCrumbs = pathname !== '/';
  const showMiniNav =
    (pathname.includes('/docs/') &&
      !pathname.includes('/examples/') &&
      !pathname.includes('/api/')) ||
    pathname === '/about' ||
    pathname === '/changelog';

  const isMobile = useMediaQuery('(max-width: 900px)');
  const isTablet = useMediaQuery('(min-width: 900px)');
  const isDesktop = useMediaQuery('(min-width: 1500px)');
  const isXLDesktop = useMediaQuery('(min-width: 1800px)');

  const [navOpen, setNavOpen] = useState(pathname === '/');
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      docsearch({
        appId: '1W9SWN5ZAH',
        apiKey: '680b219eaef484622046bf76cef8544a',
        indexName: 'mantine-react-table',
        container: '#docsearch',
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLightTheme(localStorage.getItem('isLightTheme') === 'true');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.backgroundColor = isLightTheme ? '#fff' : '#111';
      localStorage.setItem('isLightTheme', isLightTheme.toString());
    }
  }, [isLightTheme]);

  useEffect(() => {
    if (typeof window !== 'undefined' && isTablet) {
      setNavOpen(true);
    }
  }, [isTablet]);

  return (
    <>
      <Head>
        <title>Mantine React Table</title>
        <meta
          name="description"
          content="Mantine React Table, a fully featured Material UI V5 implementation of TanStack React Table V8. Written from the ground up in TypeScript."
        />
        <link rel="icon" href="/mrt_logo-2.png" />
        <meta property="og:image" content="/mrt_logo-2.png" />
        <meta
          property="og:url"
          content={`https://www.mantine-react-table.com${pathname}`}
        />
        {process.env.NODE_ENV === 'production' && (
          <link
            rel="preconnect"
            href="https://1W9SWN5ZAH-dsn.algolia.net"
            crossOrigin="true"
          />
        )}
      </Head>
      <style global jsx>
        {`
          :root {
            --docsearch-primary-color: ${isLightTheme ? '#1565c0' : '#f08c00'};
            --docsearch-highlight-color: ${isLightTheme
              ? '#1565c0'
              : '#f08c00'};
            --docsearch-logo-color: ${isLightTheme ? '#1565c0' : '#f08c00'};
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
      <PlausibleProvider
        domain="mantine-react-table.com"
        enabled={process.env.NODE_ENV === 'production'}
      >
        <ColorSchemeProvider
          colorScheme={isLightTheme ? 'light' : 'dark'}
          toggleColorScheme={() => {}}
        >
          <MantineProvider
            theme={{
              colorScheme: isLightTheme ? 'light' : 'dark',
              primaryColor: isLightTheme ? 'orange' : 'yellow',
            }}
            withGlobalStyles
            withNormalizeCSS
          >
            <ThemeProvider theme={theme(isLightTheme)}>
              <MDXProvider components={mdxComponents}>
                <TopBar
                  isLightTheme={isLightTheme}
                  navOpen={navOpen || isDesktop}
                  setIsLightTheme={setIsLightTheme}
                  setNavOpen={setNavOpen}
                />
                <SideBar
                  navOpen={navOpen || isDesktop}
                  setNavOpen={setNavOpen}
                />
                <Box
                  component="main"
                  sx={{
                    maxWidth: '1800px',
                    margin: 'auto',
                    minHeight: '100vh',
                    padding: `75px ${
                      isMobile
                        ? '16px'
                        : showMiniNav && isXLDesktop
                        ? '300px'
                        : '36px'
                    } 0 ${
                      isMobile
                        ? '16px'
                        : navOpen || isDesktop
                        ? '300px'
                        : '36px'
                    }`,
                    transition: 'all 100ms ease-in-out',
                    width: '100%',
                  }}
                >
                  {showBreadCrumbs && <BreadCrumbs />}
                  {showMiniNav && !isXLDesktop && <MiniNav />}
                  {pathname === '/' ? (
                    <Component {...pageProps} />
                  ) : (
                    <article>
                      <Component {...pageProps} />
                    </article>
                  )}
                  <SuggestsEditsButton />
                  <Footer />
                </Box>
                {showMiniNav && isXLDesktop && <MiniNav />}
              </MDXProvider>
            </ThemeProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </PlausibleProvider>
    </>
  );
}

export default App;
