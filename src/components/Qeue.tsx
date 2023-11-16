import { FlatList, VStack } from '@gluestack-ui/themed';
import TrackListItem from './TrackListItem';

type TracklistProps = {
  data: Track[];
  activeTrackIndex: number | undefined;
  onClickListItem: ({ track, index }: { track: Track; index: number }) => void;
};

const Queue = ({ data, activeTrackIndex, onClickListItem }: TracklistProps) => {
  return (
    <VStack gap={8}>
      <FlatList
        contentContainerStyle={{
          padding: 16,
          gap: 8,
        }}
        data={data}
        keyExtractor={(item) => (item as Track).id}
        renderItem={({ item, index }) => (
          <TrackListItem
            data={item as Track}
            index={index}
            isActive={activeTrackIndex === index}
            onClick={onClickListItem}
          />
        )}
      />
    </VStack>
  );
};

export default Queue;
