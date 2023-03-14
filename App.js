import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/PetTraining/AppNavigator';
import Pet_navigation from "./navigation/pet_selling/Pet_navigation";

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
      <Pet_navigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
