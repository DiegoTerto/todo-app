import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SquirtleStack from './stack/SquirtleStack'
import { TodoStack } from './stack/TodoStack'
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={SquirtleStack}
          options={{ headerShown: false }} 
        />
        <Tab.Screen
          name="To do"
          component={TodoStack}
          options={{ headerShown: false }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
