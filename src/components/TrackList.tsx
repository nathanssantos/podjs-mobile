import { FlatList, VStack } from '@gluestack-ui/themed';
import TrackListItem from './TrackListItem';

type TracklistProps = {
  data: Track[];
  refreshing: boolean;
  onRefresh: () => void;
  onClickListItem: (track: Track) => void;
};

const TrackList = ({ data, refreshing, onRefresh, onClickListItem }: TracklistProps) => {
  return (
    <VStack gap={8}>
      <FlatList
        contentContainerStyle={{
          padding: 16,
          gap: 8,
        }}
        data={data}
        keyExtractor={(item) => (item as Track).id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) => <TrackListItem data={item as Track} onClick={onClickListItem} />}
      />
    </VStack>
  );
};

export default TrackList;
