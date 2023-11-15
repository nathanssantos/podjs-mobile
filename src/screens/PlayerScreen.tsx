import { MaterialIcons } from '@expo/vector-icons';
import { Button, VStack } from '@gluestack-ui/themed';
import Player from '../components/Player';
import Screen from '../components/Screen';

const PlayerScreen = ({ navigation }: StackScreenProps<PlayerStackParamList, 'Player'>) => {
  return (
    <Screen avoidStatusBar>
      <VStack px={16} flex={1}>
        <Button variant='link' alignSelf='flex-end' onPress={() => navigation.navigate('Queue')}>
          <MaterialIcons name='queue-music' size={32} color='#0084ff' />
        </Button>
        <Player />
      </VStack>
    </Screen>
  );
};

export default PlayerScreen;
