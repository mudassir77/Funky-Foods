import React, { createContext, useContext, useEffect, useState } from 'react';
import { MantineColor, MantineProvider } from '@mantine/core';
import { MantineShade } from 'mantine-react-table';

const ThemeContext = createContext<{
  isLightTheme: boolean;
  setIsLightTheme: (isLightTheme: boolean) => void;
  primaryColor: MantineColor;
  setPrimaryColor: (primaryColor: MantineColor) => void;
  primaryShade: MantineShade;
  setPrimaryShade: (primaryShade: MantineShade) => void;
}>({} as any);

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLightTheme, setIsLightTheme] = useState(true);
  const [primaryColor, setPrimaryColor] = useState<MantineColor>('teal');
  const [primaryShade, setPrimaryShade] = useState<MantineShade>(7);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // setIsLightTheme(localStorage.getItem('isLightTheme') === 'true');
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.style.backgroundColor = isLightTheme ? '#fff' : '#111';
      localStorage.setItem('isLightTheme', isLightTheme.toString());
    }
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
          colorScheme: 'light',
          primaryColor,
          primaryShade,
          headings: {
            sizes: {
              h1: { fontWeight: 100, fontSize: '32px', lineHeight: 1.4 },
              h2: { fontSize: '30px', lineHeight: 1.5 },
              h3: { fontSize: '26px', lineHeight: 1.5 },
              h4: { fontSize: '22px', lineHeight: 1.5 },
              h5: { fontSize: '20px', lineHeight: 1.5 },
              h6: { fontWeight: 900 },
            },
          },
          defaultRadius: 'lg',
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