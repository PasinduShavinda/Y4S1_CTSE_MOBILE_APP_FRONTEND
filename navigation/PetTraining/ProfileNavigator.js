import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/PetTraining/ProfileScreen";
import TrainingItemScreen from "../../screens/PetTraining/TrainingItemScreen";
import ItemTopNavigator from "./ItemTopNavigator";
import AddTrainingScreen from "../../screens/PetTraining/AddTrainingScreen";
import EditTrainingScreen from "../../screens/PetTraining/EditTrainingScreen";

const Stack = createNativeStackNavigator();
export default function ProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditTraining" component={EditTrainingScreen} />
      <Stack.Screen name="ItemTopNav" component={ItemTopNavigator} />
      <Stack.Screen name="AddTraining" component={AddTrainingScreen} />
    </Stack.Navigator>
  );
}
