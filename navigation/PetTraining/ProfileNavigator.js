import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/PetTraining/ProfileScreen";
import TrainingItemScreen from "../../screens/PetTraining/TrainingItemScreen";
import ItemTopNavigator from "./ItemTopNavigator";

const Stack = createNativeStackNavigator();
export default function ProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="TraingItemNav" component={ItemTopNavigator} />
    </Stack.Navigator>
  );
}
