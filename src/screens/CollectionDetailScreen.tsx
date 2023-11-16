import { VStack } from '@gluestack-ui/themed';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import TrackPlayer from 'react-native-track-player';
import Screen from '../components/Screen';
import TrackList from '../components/TrackList';
import useStore from '../hooks/useStore';

const CollectionDetailScreen = ({
  route,
  navigation,
}: StackScreenProps<NavigationParamList, 'CollectionDetail'>) => {
  const { collectionStore } = useStore();

  const { id } = route.params as { id: string };

  const init = () => {
    collectionStore.getDetail({ id });
  };

  const handleListItemClick = async ({ track }: { track: Track }) => {
    try {
      const index = await TrackPlayer.add(track);
      await TrackPlayer.skip(index || 0);
      navigation.navigate('PlayerStack', { screen: 'Player' });
      TrackPlayer.play();
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Screen>
      <VStack>
        <TrackList
          data={collectionStore.detail?.items || []}
          refreshing={collectionStore.detailStatus === 'fetching'}
          onRefresh={init}
          onClickListItem={handleListItemClick}
        />
      </VStack>
    </Screen>
  );
};

export default observer(CollectionDetailScreen);
