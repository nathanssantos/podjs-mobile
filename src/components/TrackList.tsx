import {
  Button,
  ButtonText,
  Text,
  HStack,
  VStack,
  Image,
  Pressable,
} from '@gluestack-ui/themed';
import TrackPlayer, { Track } from 'react-native-track-player';

const trackList = [
  {
    id: '123',
    url: 'https://nerdcast.jovemnerd.com.br/marketplace_27.mp3',
    title: 'Nerdcast',
    artist: 'Jovem Nerd',
    artwork:
      'https://uploads.jovemnerd.com.br/wp-content/uploads/2023/10/nc_parceiro27_mercado_sazonal_3000x3000__m21167.jpg',
  },
  {
    id: '456',
    url: 'https://nerdcast.jovemnerd.com.br/marketplace_27.mp3',
    title: 'Nerdcast',
    artist: 'Jovem Nerd',
    artwork:
      'https://uploads.jovemnerd.com.br/wp-content/uploads/2023/10/nc_parceiro27_mercado_sazonal_3000x3000__m21167.jpg',
  },
  {
    id: '789',
    url: 'https://nerdcast.jovemnerd.com.br/marketplace_27.mp3',
    title: 'Nerdcast',
    artist: 'Jovem Nerd',
    artwork:
      'https://uploads.jovemnerd.com.br/wp-content/uploads/2023/10/nc_parceiro27_mercado_sazonal_3000x3000__m21167.jpg',
  },
];

const Tracklist = () => {
  return (
    <VStack mb={32}>
      <Text mb={8}>Track List</Text>
      <VStack gap={8}>
        {trackList.map((track) => (
          <Pressable key={track.id} onPress={() => TrackPlayer.add(track)}>
            <HStack>
              <Image
                source={{ uri: track.artwork }}
                width={40}
                height={40}
                role='banner'
                alt={track.title}
              />
              <Text>{track.title}</Text>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </VStack>
  );
};

export default Tracklist;
