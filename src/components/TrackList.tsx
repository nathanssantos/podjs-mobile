import { FlatList, HStack, Image, Pressable, Text, VStack } from '@gluestack-ui/themed';

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
        renderItem={({ item }) => {
          const track = item as Track;
          return (
            <Pressable key={track.id} onPress={() => onClickListItem({ ...track })}>
              <HStack alignItems='center' gap={16}>
                <Image
                  source={{ uri: track.artwork }}
                  width={64}
                  height={64}
                  borderRadius={4}
                  role='banner'
                  alt={track.title}
                />
                <Text flex={1}>{track.title}</Text>
              </HStack>
            </Pressable>
          );
        }}
      />
    </VStack>
  );
};

export default TrackList;
