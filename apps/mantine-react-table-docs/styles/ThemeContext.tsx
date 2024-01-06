import { createContext, useEffect, useState } from 'react';
import {
  type MantineColor,
  MantineProvider,
  createTheme,
  useMantineColorScheme,
} from '@mantine/core';
import { type MantineShade } from 'mantine-react-table';
import { useContext } from 'react';

const ThemeContext = createContext<{
  darkDark: boolean;
  setDarkDark: (darkDark: boolean) => void;
  primaryColor: MantineColor;
  setPrimaryColor: (primaryColor: MantineColor) => void;
  primaryShade: MantineShade;
  setPrimaryShade: (primaryShade: MantineShade) => void;
}>({} as any);

export const ThemeContextProvider = ({ children }) => {
  const [darkDark, setDarkDark] = useState<boolean>(true);
  const [primaryColor, setPrimaryColor] = useState<MantineColor>('teal');
  const [primaryShade, setPrimaryShade] = useState<MantineShade>(7);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDarkDark(localStorage.getItem('darkDark') === 'true');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLightTheme', darkDark.toString());
    }
  }, [darkDark]);

  return (
    <ThemeContext.Provider
      value={{
        darkDark,
        setDarkDark,
        primaryColor,
        setPrimaryColor,
        primaryShade,
        setPrimaryShade,
      }}
    >
      <MantineProvider
        theme={createTheme({
          colors: darkDark
            ? {
                dark: [
                  '#C1C2C5',
                  '#A6A7AB',
                  '#909296',
                  '#5c5f66',
                  '#373A40',
                  '#2C2E33',
                  '#25262b',
                  '#1A1B1E',
                  '#141517',
                  '#101113',
                ],
              }
            : {},
          cursorType: 'pointer',
          primaryColor,
          primaryShade,
          headings: {
            sizes: {
              h1: { fontWeight: '100', fontSize: '32px', lineHeight: '1.4' },
              h2: { fontSize: '30px', lineHeight: '1.5' },
              h3: { fontSize: '26px', lineHeight: '1.5' },
              h4: { fontSize: '22px', lineHeight: '1.5' },
              h5: { fontSize: '20px', lineHeight: '1.5' },
              h6: { fontWeight: '900' },
            },
          },
          components: {
            Card: {
              defaultProps: {
                shadow: 'sm',
                withBorder: true,
              },
            },
            Code: {
              defaultProps: {
                fz: '0.9em',
              },
            },
            Tooltip: {
              defaultProps: {
                withArrow: true,
                portalProps: {
                  target: '.mantine-tooltips',
                },
              },
            },
            Tabs: {
              styles: () => ({
                tab: {
                  fontSize: '1.1rem',
                  marginTop: '2rem',
                  alignItems: 'center',
                  display: 'flex',
                },
              }),
            },
          },
        })}
      >
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
