import { MaterialIcons } from '@expo/vector-icons';
import { Button, HStack, Image, Text, VStack } from '@gluestack-ui/themed';
import TrackPlayer, {
  State,
  useActiveTrack,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import formatDuration from '../utils/formatDuration';
import Timeline from './Timeline';

const Player = () => {
  const activeTrack = useActiveTrack();
  const { duration, position, buffered } = useProgress();
  const { state } = usePlaybackState();

  return (
    <VStack alignItems='center' gap={16} flex={1}>
      {activeTrack && (
        <VStack alignItems='center' gap={16} flex={1} justifyContent='space-around'>
          <VStack alignItems='center' gap={16}>
            <Image
              source={{ uri: activeTrack.artwork }}
              role='banner'
              alt={activeTrack.title}
              w={200}
              h={200}
              borderRadius={4}
            />
            <VStack alignItems='center' gap={8}>
              <Text
                textAlign='center'
                fontSize={14}
                sx={{
                  _dark: {
                    color: '$light200',
                  },
                  _light: {
                    color: '$light900',
                  },
                }}
              >
                {activeTrack.title}
              </Text>
              <Text
                textAlign='center'
                fontSize={14}
                fontWeight='bold'
                sx={{
                  _dark: {
                    color: '$light200',
                  },
                  _light: {
                    color: '$light900',
                  },
                }}
              >
                {activeTrack.artist}
              </Text>
            </VStack>
          </VStack>

          <VStack gap={16} alignItems='center'>
            <Timeline progress={{ duration, position, buffered }} />
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
              {formatDuration(position || 0)}
            </Text>
            <HStack gap={4} justifyContent='center'>
              <Button variant='link' onPress={() => TrackPlayer.seekBy(-30)}>
                <MaterialIcons name='replay-30' size={40} color='#0084ff' />
              </Button>
              {state === State.Playing ? (
                <Button variant='link' onPress={TrackPlayer.pause}>
                  <MaterialIcons name='pause' size={40} color='#0084ff' />
                </Button>
              ) : (
                <Button variant='link' onPress={TrackPlayer.play}>
                  <MaterialIcons name='play-arrow' size={40} color='#0084ff' />
                </Button>
              )}
              <Button variant='link' onPress={() => TrackPlayer.seekBy(30)}>
                <MaterialIcons name='forward-30' size={40} color='#0084ff' />
              </Button>
            </HStack>
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};

export default Player;
