import { config } from '@gluestack-ui/config';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { ReactNode } from 'react';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <GluestackUIProvider config={config} colorMode='dark'>
      {children}
    </GluestackUIProvider>
  );
};

export default ThemeProvider;
