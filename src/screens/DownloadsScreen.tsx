import { Text, VStack } from '@gluestack-ui/themed';
import Screen from '../components/Screen';

const DownloadsScreen = () => {
  return (
    <Screen avoidStatusBar>
      <VStack>
        <Text>Downloads</Text>
      </VStack>
    </Screen>
  );
};

export default DownloadsScreen;
