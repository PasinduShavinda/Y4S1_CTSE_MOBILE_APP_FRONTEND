import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/PetTraining/ProfileScreen";
import ItemTopNavigator from "./ItemTopNavigator";
import AddTrainingScreen from "../../screens/PetTraining/AddTrainingScreen";
import EditTrainingScreen from "../../screens/PetTraining/EditTrainingScreen";
import Tempo_file from "../../screens/pet_selling/Tempo_file";
import Add_new_pets from "../../screens/pet_selling/Add_new_pets";
import Selected_item_page from "../../screens/pet_selling/Selected_item_page";
import Google_map from "../../screens/pet_selling/Google_map";
import AdoptionPage from "../../screens/pet_selling/AdoptionPage";
import Owner_items from "../../screens/pet_selling/Owner_items";
import EditPage from "../../screens/pet_selling/EditPage";
import AddReviewScreen from "../../screens/PetTraining/AddReviewScreen";

const Stack = createNativeStackNavigator();
export default function ProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditTraining" component={EditTrainingScreen} />
      <Stack.Screen name="ItemTopNav" component={ItemTopNavigator} />
      <Stack.Screen name="AddTraining" component={AddTrainingScreen} />
      <Stack.Screen name ="AddReview" component={AddReviewScreen} />
      {/* kavindu */}
      <Stack.Screen name="add-pets" component={Tempo_file} />
      <Stack.Screen name="new-pets" component={Add_new_pets} />
      <Stack.Screen name="selected-item" component={Selected_item_page} />
      <Stack.Screen name="google-map" component={Google_map} />
      <Stack.Screen name="contact-details" component={AdoptionPage} />
      <Stack.Screen name="owner-items" component={Owner_items} />
      <Stack.Screen name="Edit" component={EditPage} />
    </Stack.Navigator>
  );
}
