import { GluestackUIProvider, Box, Button, ButtonText } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { ReactNode, useState } from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleTheme = () => {
    setTheme(theme == 'light' ? 'dark' : 'light');
  };

  return (
    <GluestackUIProvider config={config} colorMode={theme}>
      <Box
        style={styles.container}
        sx={{
          _dark: {
            bg: '$light900',
          },
          _light: {
            bg: '$light200',
          },
        }}
      >
        {children}
        <Button onPress={toggleTheme}>
          <ButtonText>Toggle Theme</ButtonText>
        </Button>
      </Box>
    </GluestackUIProvider>
  );
};

export default ThemeProvider;
