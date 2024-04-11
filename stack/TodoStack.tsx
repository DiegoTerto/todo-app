import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TodoScreen } from '../screens/TodoScreen'

const Stack = createNativeStackNavigator();

export function TodoStack() {
  return (
    <Stack.Navigator
      initialRouteName="TodoScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#808080',
          justifyContent: 'center',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'left',
      }}>
      <Stack.Screen
        name="TodoScreen"
        component={TodoScreen}
        options={{ title: 'To do' }}
      />
    </Stack.Navigator>
  )
}