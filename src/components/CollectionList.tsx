import { FlatList, HStack, Image, Pressable, Text, VStack } from '@gluestack-ui/themed';

type TracklistProps = {
  data: Collection[];
  refreshing: boolean;
  onRefresh: () => void;
  onClickListItem: (collection: Collection) => void;
};

const CollectionList = ({ data, refreshing, onRefresh, onClickListItem }: TracklistProps) => {
  return (
    <VStack gap={8} pb={142}>
      <FlatList
        contentContainerStyle={{
          padding: 16,
          gap: 8,
        }}
        data={data}
        keyExtractor={(item) => (item as Collection).id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) => {
          const collection = item as Collection;
          return (
            <Pressable key={collection.id} onPress={() => onClickListItem(collection)}>
              <HStack alignItems='center' gap={16}>
                <Image
                  source={{ uri: collection.artworkUrl100 }}
                  width={64}
                  height={64}
                  borderRadius={4}
                  role='listitem'
                  alt={collection.name}
                />
                <Text flex={1}>{collection.name}</Text>
              </HStack>
            </Pressable>
          );
        }}
      />
    </VStack>
  );
};

export default CollectionList;
