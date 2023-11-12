import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
import PlayerScreen from '../screens/PlayerScreen';
import { MaterialIcons } from '@expo/vector-icons';
import ExploreScreen from '../screens/ExploreScreen';
import DownloadsScreen from '../screens/DownloadsScreen';

const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// const PlayerStack = () => {
//   return (
//     <Stack.Navigator initialRouteName='Player'>
//       <Stack.Screen name='Player' component={PlayerScreen} />
//     </Stack.Navigator>
//   );
// };

const Router = () => {
  return (
    <Tab.Navigator initialRouteName='Player'>
      <Tab.Screen
        name='Player'
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name='audiotrack' size={size} color={color} />,
        }}
        component={PlayerScreen}
      />
      <Tab.Screen
        name='Explore'
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name='explore' size={size} color={color} />,
        }}
        component={ExploreScreen}
      />
      <Tab.Screen
        name='Downloads'
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name='file-download' size={size} color={color} />,
        }}
        component={DownloadsScreen}
      />
    </Tab.Navigator>
  );
};

export default Router;
