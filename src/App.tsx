import 'react-native-gesture-handler';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import TrackPlayer from 'react-native-track-player';
import Router from './router/Router';
import playbackService from './services/playback';
import RootStoreProvider from './store/RootStoreProvider';
import ThemeProvider from './theme/ThemeProvider';

const App = () => {
  useEffect(() => {
    return () => {
      TrackPlayer.reset();
    };
  }, []);

  return (
    <NavigationContainer theme={DarkTheme}>
      <RootStoreProvider>
        <ThemeProvider>
          <Router />
          <Toast />
          <StatusBar />
        </ThemeProvider>
      </RootStoreProvider>
    </NavigationContainer>
  );
};

registerRootComponent(App);

TrackPlayer.registerPlaybackService(() => playbackService);
