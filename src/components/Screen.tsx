import { Box } from '@gluestack-ui/themed';
import React, { ReactNode } from 'react';

const Screen = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      flex={1}
      alignItems='center'
      justifyContent='center'
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
    </Box>
  );
};

export default Screen;
