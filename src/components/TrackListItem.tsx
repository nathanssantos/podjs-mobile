import { HStack, Image, Pressable, Text } from '@gluestack-ui/themed';

type TrackListItemProps = {
  data: Track;
  isActive?: boolean;
  index: number;
  onClick: ({ track, index }: { track: Track; index: number }) => void;
};

const TrackListItem = ({ data, isActive, index, onClick }: TrackListItemProps) => {
  return (
    <Pressable key={data.id} onPress={() => onClick({ track: { ...data }, index })}>
      <HStack alignItems='center' gap={16}>
        <Image
          source={{ uri: data.artwork }}
          width={64}
          height={64}
          borderRadius={4}
          role='listitem'
          alt={data.title}
        />
        <Text flex={1} fontSize={14} color={isActive ? '$blue500' : '$light200'}>
          {data.title}
        </Text>
      </HStack>
    </Pressable>
  );
};

export default TrackListItem;
