import { VStack } from '@gluestack-ui/themed';
import { useEffect, useState } from 'react';
import TrackPlayer from 'react-native-track-player';
import Queue from '../components/Qeue';
import Screen from '../components/Screen';

const QueueScreen = () => {
  const [queue, setQueue] = useState<Track[]>([]);
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | undefined>();

  const handleListItemClick = async (index: number) => {
    try {
      TrackPlayer.skip(index);
    } catch (error) {
      console.error({ error });
    }
  };

  const watchQueue = async () => {
    setInterval(async () => {
      const [currentQueue, currentActiveTrackIndex] = await Promise.all([
        TrackPlayer.getQueue(),
        TrackPlayer.getActiveTrackIndex(),
      ]);

      setQueue(currentQueue as Track[]);
      setActiveTrackIndex(currentActiveTrackIndex);
    }, 1000);
  };

  useEffect(() => {
    setTimeout(watchQueue, 0);
  }, []);

  return (
    <Screen>
      <VStack>
        <Queue data={queue} activeTrackIndex={activeTrackIndex} onClickListItem={handleListItemClick} />
      </VStack>
    </Screen>
  );
};

export default QueueScreen;
