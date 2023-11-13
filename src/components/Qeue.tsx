import { FlatList, HStack, Image, Pressable, Text, VStack } from '@gluestack-ui/themed';

type TracklistProps = {
  data: Track[];
  activeTrackIndex: number | undefined;
  onClickListItem: (index: number) => Promise<void>;
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
        renderItem={({ item, index }) => {
          const track = item as Track;
          return (
            <Pressable key={track.id} onPress={() => onClickListItem(index)}>
              <HStack alignItems='center' gap={16}>
                <Image
                  source={{ uri: track.artwork }}
                  width={64}
                  height={64}
                  borderRadius={4}
                  role='banner'
                  alt={track.title}
                />
                <Text color={activeTrackIndex === index ? '$blue500' : '$light200'} flex={1}>
                  {track.title}
                </Text>
              </HStack>
            </Pressable>
          );
        }}
      />
    </VStack>
  );
};

export default Queue;
