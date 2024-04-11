import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Squirtle from '../screens/SquirtleScreen';
import PokemonScreen from '../screens/PokemonScreen';

export type RootStackParamList = {
  Home: undefined;
  Squirtle: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function SquirtleStack() {
  return (
    <Stack.Navigator
      initialRouteName="SquirtleScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007bff',
          justifyContent: 'center',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="SquirtleScreen"
        component={Squirtle}
        options={{ title: 'Squirtle' }}
      />
      <Stack.Screen
        name="PokemonScreen"
        component={PokemonScreen}
        options={({ route }) => ({ title: route.params.pokemon })}
      />
    </Stack.Navigator>
  );
}
