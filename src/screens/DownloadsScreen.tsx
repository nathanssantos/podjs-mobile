import { Box, Text } from '@gluestack-ui/themed';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

const DownloadsScreen = () => {
  return (
    <Box flex={1} alignItems='center' justifyContent='center'>
      <StatusBar style='auto' />
      <Text color='#fff'>Downloads</Text>
    </Box>
  );
};

export default DownloadsScreen;
