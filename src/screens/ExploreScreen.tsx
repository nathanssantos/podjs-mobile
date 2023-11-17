import { VStack } from '@gluestack-ui/themed';
import { observer } from 'mobx-react';
import { useEffect, useMemo, useState } from 'react';
import CollectionList from '../components/CollectionList';
import Screen from '../components/Screen';
import useStore from '../hooks/useStore';
import Search from '../components/Search';
import debounce from '../utils/debounce';

const ExploreScreen = ({ navigation }: StackScreenProps<ExploreStackParamList, 'Explore'>) => {
  const { collectionStore } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useMemo(() => {
    return debounce(collectionStore.getList, 1500);
  }, [collectionStore.getList, 1500]);

  const searchCollection = (term: string) => {
    setSearchTerm(term);
    debouncedSearch({ term, country: 'br' });
  };

  const listContent =
    searchTerm && collectionStore.list?.length ? collectionStore.list : collectionStore.rank!;

  useEffect(() => {
    collectionStore.getRank();
  }, []);

  return (
    <Screen avoidStatusBar>
      <VStack>
        <Search value={searchTerm} onChangeText={searchCollection} />
        <CollectionList
          data={listContent}
          refreshing={collectionStore.rankStatus === 'fetching'}
          onRefresh={collectionStore.getRank}
          onClickListItem={({ id }) => navigation.navigate('CollectionDetail', { id })}
        />
      </VStack>
    </Screen>
  );
};

export default observer(ExploreScreen);
