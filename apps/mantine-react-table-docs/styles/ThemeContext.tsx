import React, { createContext, useContext, useEffect, useState } from 'react';
import { MantineColor, MantineProvider } from '@mantine/core';

const ThemeContext = createContext<{
  isLightTheme: boolean;
  setIsLightTheme: (isLightTheme: boolean) => void;
  primaryColor: MantineColor;
  setPrimaryColor: (primaryColor: MantineColor) => void;
}>({} as any);

export const ThemeContextProvider = ({ children }) => {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [primaryColor, setPrimaryColor] = useState<MantineColor>('yellow');

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
    if (isLightTheme && primaryColor === 'yellow') {
      setPrimaryColor('orange');
    } else if (!isLightTheme && primaryColor === 'orange') {
      setPrimaryColor('yellow');
    }
  }, [isLightTheme]);

  return (
    <ThemeContext.Provider
      value={{
        isLightTheme,
        setIsLightTheme,
        primaryColor,
        setPrimaryColor,
      }}
    >
      <MantineProvider
        theme={{ colorScheme: isLightTheme ? 'light' : 'dark', primaryColor }}
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
