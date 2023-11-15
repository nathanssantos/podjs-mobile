import { VStack } from '@gluestack-ui/themed';
import React, { ReactNode } from 'react';
import { Platform, StatusBar } from 'react-native';

const Screen = ({ children, avoidStatusBar }: { children: ReactNode; avoidStatusBar?: boolean }) => {
  return (
    <VStack
      pt={avoidStatusBar && Platform.OS === 'android' ? StatusBar.currentHeight : 0}
      flex={1}
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
      {/* <Button onPress={toggleTheme}>
        <ButtonText>Toggle Theme</ButtonText>
      </Button> */}
    </VStack>
  );
};

export default Screen;
