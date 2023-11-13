import { VStack } from '@gluestack-ui/themed';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import CollectionList from '../components/CollectionList';
import Screen from '../components/Screen';
import useStore from '../hooks/useStore';

const ExploreScreen = ({ navigation }: StackScreenProps<ExploreStackParamList, 'Explore'>) => {
  const { collectionStore } = useStore();

  const init = () => {
    collectionStore.getRank();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Screen>
      <VStack>
        <CollectionList
          data={collectionStore.rank!}
          refreshing={collectionStore.rankStatus === 'fetching'}
          onRefresh={init}
          onClickListItem={({ id }) => navigation.navigate('CollectionDetail', { id })}
        />
      </VStack>
    </Screen>
  );
};

export default observer(ExploreScreen);
