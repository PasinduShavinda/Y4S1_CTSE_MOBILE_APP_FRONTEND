import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import HomeScreen from '../../screens/PetTraining/HomeScreen';
import LoginScreen from '../../screens/PetTraining/LoginScreen';
import RegistrationScreen from '../../screens/PetTraining/RegistrationScreen';

const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false }}zx
      />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}