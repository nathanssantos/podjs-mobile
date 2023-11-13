import { VStack } from '@gluestack-ui/themed';
import React, { ReactNode } from 'react';

const Screen = ({ children }: { children: ReactNode }) => {
  return (
    <VStack
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
