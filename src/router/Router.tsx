import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PlayerScreen from '../screens/PlayerScreen';
import { MaterialIcons } from '@expo/vector-icons';
import ExploreScreen from '../screens/ExploreScreen';
import DownloadsScreen from '../screens/DownloadsScreen';
import QueueScreen from '../screens/QueueScreen';
import CollectionDetailScreen from '../screens/CollectionDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PlayerStack = () => {
  return (
    <Stack.Navigator initialRouteName='Player'>
      <Stack.Screen name='Player' component={PlayerScreen} options={{ headerShown: false }} />
      <Stack.Screen name='Queue' component={QueueScreen} />
    </Stack.Navigator>
  );
};

const ExploreStack = () => {
  return (
    <Stack.Navigator initialRouteName='Explore'>
      <Stack.Screen name='Explore' component={ExploreScreen} options={{ headerShown: false }} />
      <Stack.Screen name='CollectionDetail' component={CollectionDetailScreen} />
    </Stack.Navigator>
  );
};

const Router = () => {
  return (
    <Tab.Navigator initialRouteName='ExploreStack' screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name='PlayerStack'
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name='audiotrack' size={size} color={color} />,
          title: 'Player',
        }}
        component={PlayerStack}
      />
      <Tab.Screen
        name='ExploreStack'
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name='explore' size={size} color={color} />,
          title: 'Explore',
        }}
        component={ExploreStack}
      />
      <Tab.Screen
        name='DownloadsStack'
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name='file-download' size={size} color={color} />,
          title: 'Downloads',
        }}
        component={DownloadsScreen}
      />
    </Tab.Navigator>
  );
};

export default Router;
