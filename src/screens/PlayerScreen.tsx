import { Button, ButtonText, HStack, Text, VStack } from '@gluestack-ui/themed';
import { useEffect, useState } from 'react';
import TrackPlayer from 'react-native-track-player';
import Qeue from '../components/Qeue';
import Tracklist from '../components/TrackList';
import formatDuration from '../utils/formatDuration';

const PlayerScreen = () => {
  const [progress, setProgress] = useState(0);

  const watchProgress = async () => {
    setInterval(async () => {
      const currentProgress = await TrackPlayer.getProgress();
      setProgress(currentProgress.position);
    }, 1000);
  };

  useEffect(() => {
    setTimeout(() => {
      watchProgress();
    }, 0);
  }, []);

  return (
    <VStack>
      <Tracklist />
      <Qeue />
      <Text
        sx={{
          _dark: {
            color: '$light200',
          },
          _light: {
            color: '$light900',
          },
        }}
      >
        {formatDuration(progress)}
      </Text>
      <HStack gap={4}>
        <Button onPress={TrackPlayer.play}>
          <ButtonText>Play</ButtonText>
        </Button>
        <Button onPress={TrackPlayer.pause}>
          <ButtonText>Pause</ButtonText>
        </Button>
      </HStack>
    </VStack>
  );
};

export default PlayerScreen;
