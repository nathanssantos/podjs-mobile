import { MaterialIcons } from '@expo/vector-icons';
import { Button, HStack, Image, Text, VStack } from '@gluestack-ui/themed';
import TrackPlayer, {
  State,
  useActiveTrack,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import formatDuration from '../utils/formatDuration';

const Player = () => {
  const activeTrack = useActiveTrack();
  const { position } = useProgress();
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
              {activeTrack.title}
            </Text>
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
              {formatDuration(position)}
            </Text>
          </VStack>

          <HStack gap={4}>
            {state === State.Playing ? (
              <Button variant='link' onPress={TrackPlayer.pause}>
                <MaterialIcons name='pause' size={32} color='#0084ff' />
              </Button>
            ) : (
              <Button variant='link' onPress={TrackPlayer.play}>
                <MaterialIcons name='play-arrow' size={32} color='#0084ff' />
              </Button>
            )}
          </HStack>
        </VStack>
      )}
    </VStack>
  );
};

export default Player;
