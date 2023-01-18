import React, { createContext, useContext, useEffect, useState } from 'react';
import { MantineColor, MantineProvider } from '@mantine/core';

export type MantineShade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const ThemeContext = createContext<{
  isLightTheme: boolean;
  setIsLightTheme: (isLightTheme: boolean) => void;
  primaryColor: MantineColor;
  setPrimaryColor: (primaryColor: MantineColor) => void;
  primaryShade: MantineShade;
  setPrimaryShade: (primaryShade: MantineShade) => void;
}>({} as any);

export const ThemeContextProvider = ({ children }) => {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [primaryColor, setPrimaryColor] = useState<MantineColor>('teal');
  const [primaryShade, setPrimaryShade] = useState<MantineShade>(8);

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
    setPrimaryShade(isLightTheme ? 8 : 6);
  }, [isLightTheme]);

  return (
    <ThemeContext.Provider
      value={{
        isLightTheme,
        setIsLightTheme,
        primaryColor,
        setPrimaryColor,
        primaryShade,
        setPrimaryShade,
      }}
    >
      <MantineProvider
        theme={{
          colorScheme: isLightTheme ? 'light' : 'dark',
          primaryColor,
          primaryShade,
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
