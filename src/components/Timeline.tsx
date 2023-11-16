import TrackPlayer, { Progress } from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import { Box } from '@gluestack-ui/themed';

const Timeline = ({ progress }: { progress: Progress }) => {
  if (!progress.duration) return null;

  return (
    <Box w={300}>
      <Slider
        value={progress.position}
        maximumValue={progress.duration}
        thumbTintColor='#0084ff'
        minimumTrackTintColor='#0084ff'
        maximumTrackTintColor='#fff'
        onSlidingComplete={async (value) => await TrackPlayer.seekTo(value)}
      />
    </Box>
  );
};

export default Timeline;
