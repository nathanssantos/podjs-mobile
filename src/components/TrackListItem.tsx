import { HStack, Image, Pressable, Text } from '@gluestack-ui/themed';

type TrackListItemProps = {
  data: Track;
  onClick: (track: Track) => void;
};

const TrackListItem = ({ data, onClick }: TrackListItemProps) => {
  return (
    <Pressable key={data.id} onPress={() => onClick({ ...data })}>
      <HStack alignItems='center' gap={16}>
        <Image
          source={{ uri: data.artwork }}
          width={64}
          height={64}
          borderRadius={4}
          role='listitem'
          alt={data.title}
        />
        <Text flex={1}>{data.title}</Text>
      </HStack>
    </Pressable>
  );
};

export default TrackListItem;
