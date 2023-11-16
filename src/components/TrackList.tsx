import { FlatList, VStack } from '@gluestack-ui/themed';
import TrackListItem from './TrackListItem';

type TracklistProps = {
  data: Track[];
  refreshing: boolean;
  onRefresh: () => void;
  onClickListItem: ({ track, index }: { track: Track; index: number }) => void;
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
        renderItem={({ item, index }) => (
          <TrackListItem data={item as Track} index={index} onClick={onClickListItem} />
        )}
      />
    </VStack>
  );
};

export default TrackList;
