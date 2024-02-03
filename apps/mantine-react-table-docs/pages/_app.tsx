import '../styles/globals.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css'; //if using mantine component features
import '@mantine/code-highlight/styles.css';
import 'mantine-react-table/styles.css';
import { useState } from 'react';
import { type AppProps } from 'next/app';
import Head from 'next/head';
import PlausibleProvider from 'next-plausible';
import { useRouter } from 'next/router';
import { MDXProvider } from '@mdx-js/react';
import { AppShell } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { mdxComponents } from '../components/mdx/mdxComponents';
import { ThemeContextProvider } from '../styles/ThemeContext';
import { TopBar } from '../components/navigation/TopBar';
import { SideBar } from '../components/navigation/Sidebar';
import { BreadCrumbs } from '../components/navigation/BreadCrumbs';
import { MiniNav } from '../components/navigation/MiniNav';
import { Footer } from '../components/navigation/Footer';
import { SuggestsEditsButton } from '../components/mdx/SuggestsEditsButton';

function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  const showBreadCrumbs = pathname !== '/';
  const showMiniNav =
    (pathname.includes('/docs/') &&
      !pathname.includes('/examples') &&
      !pathname.includes('/api')) ||
    pathname === '/about' ||
    pathname === '/changelog';

  const isMobile = !!useMediaQuery('(max-width: 900px)');
  const isDesktop = !!useMediaQuery('(min-width: 1500px)');
  const isXLDesktop = !!useMediaQuery('(min-width: 1800px)');
  const [navOpen, setNavOpen] = useState(false);
  const isNavOpen = navOpen || (isDesktop && pathname !== '/');

  return (
    <>
      <Head>
        <title>Mantine React Table</title>
        <meta
          name="description"
          content="Mantine React Table, a fully featured Mantine implementation of TanStack React Table V8. Written from the ground up in TypeScript."
        />
        <link
          rel="canonical"
          href={`https://www.mantine-react-table.com${pathname}`}
        />
        <link rel="icon" href="/mrt_logo.png" />
        <meta property="og:image" content="/mrt_logo.png" />
        <meta
          property="og:url"
          content={`https://www.mantine-react-table.com${pathname}`}
        />
        {process.env.NODE_ENV === 'production' && (
          <>
            <link
              rel="preconnect"
              href="https://GA9W0E15I8-dsn.algolia.net"
              crossOrigin="anonymous"
            />
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1076638783489959"
              crossOrigin="anonymous"
            />
          </>
        )}
      </Head>
      <PlausibleProvider
        domain="v2.mantine-react-table.com"
        enabled={process.env.NODE_ENV === 'production'}
      >
        <ThemeContextProvider>
          <MDXProvider components={mdxComponents}>
            <AppShell
              header={{ height: 55 }}
              navbar={{ width: 300, breakpoint: 'sm' }}
              padding="md"
            >
              <TopBar navOpen={isNavOpen} setNavOpen={setNavOpen} />
              <SideBar navOpen={isNavOpen} setNavOpen={setNavOpen} />
              <AppShell.Main
                style={{
                  maxWidth: showMiniNav ? '1800px' : '1600px',
                  margin: 'auto',
                  minHeight: '100vh',
                  padding: `75px ${
                    isMobile
                      ? '16px'
                      : showMiniNav && isXLDesktop
                        ? '300px'
                        : '36px'
                  } 0 ${isMobile ? '16px' : isNavOpen ? '300px' : '36px'}`,
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
              </AppShell.Main>
              {showMiniNav && isXLDesktop && <MiniNav />}
            </AppShell>
          </MDXProvider>
        </ThemeContextProvider>
      </PlausibleProvider>
    </>
  );
}

export default App;
