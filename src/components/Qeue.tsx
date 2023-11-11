import { HStack, Image, Pressable, Text, VStack } from '@gluestack-ui/themed';
import { useEffect, useState } from 'react';
import TrackPlayer, { Track } from 'react-native-track-player';

const Qeue = () => {
  const [queue, setQueue] = useState<Track[]>([]);
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | undefined>();

  const watchQueue = async () => {
    setInterval(async () => {
      const [currentQueue, currentActiveTrackIndex] = await Promise.all([
        TrackPlayer.getQueue(),
        TrackPlayer.getActiveTrackIndex(),
      ]);

      setQueue(currentQueue);
      setActiveTrackIndex(currentActiveTrackIndex);
    }, 1000);
  };

  useEffect(() => {
    setTimeout(watchQueue, 0);
  }, []);

  return (
    <VStack mb={32}>
      <Text mb={8}>Queue</Text>
      <VStack gap={8}>
        {queue.map((track, index) => (
          <Pressable key={track.id} onPress={() => TrackPlayer.skip(index)}>
            <HStack>
              <Image
                source={{ uri: track.artwork }}
                width={50}
                height={50}
                role='banner'
                alt={track.title}
              />
              <Text color={activeTrackIndex === index ? '$blue500' : '$light200'}>{track.title}</Text>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </VStack>
  );
};

export default Qeue;
