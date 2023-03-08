import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { Image } from 'react-native';
import LoginScreen from '../../screens/PetTraining/LoginScreen';
import RegistrationScreen from '../../screens/PetTraining/RegistrationScreen';
import colors from '../../utils/colors';
import ActionBarImage from '../../utils/headerImage';
import HomeNavigator from './HomeNavigator';

const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeNav"
        component={HomeNavigator}
        options={{
          headerTitle: "PetCare",
          headerLeft: () => <ActionBarImage />,
          headerTitleStyle: {
            color: colors.primary,
            fontSize: 20,
            fontWeight: "bold",
          },
        }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false }}
        zx
      />
    </Stack.Navigator>
  );
}