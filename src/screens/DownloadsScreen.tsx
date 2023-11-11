import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
});

const DownloadsScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <Text style={{ color: '#fff' }}>Downloads</Text>
    </View>
  );
};

export default DownloadsScreen;
