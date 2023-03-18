import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Tempo_file from "../../screens/pet_selling/Tempo_file";
import Home_screen from "../../screens/pet_selling/Home_screen";
import Add_new_pets from "../../screens/pet_selling/Add_new_pets";
import Selling_Page from "../../screens/pet_selling/Selling_Page";
import Selected_item_page from "../../screens/pet_selling/Selected_item_page";
import Google_map from "../../screens/pet_selling/Google_map";
import AdoptionPage from "../../screens/pet_selling/AdoptionPage";
import Owner_items from "../../screens/pet_selling/Owner_items";
import EditPage from "../../screens/pet_selling/EditPage";

export default function Pet_navigation() {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      {/* <Stack.Screen name="home" component={Add_Pets_Components} /> */}
      <Stack.Screen name="add-pets" component={Tempo_file} />
      <Stack.Screen name="homes" component={Home_screen} />
      <Stack.Screen name="new-pets" component={Add_new_pets} />
      <Stack.Screen name="buy-pets" component={Selling_Page} />
      <Stack.Screen name="selected-item" component={Selected_item_page} />
      <Stack.Screen name="google-map" component={Google_map} />
      <Stack.Screen name="contact-details" component={AdoptionPage} />
      <Stack.Screen name="owner-items" component={Owner_items} />
      <Stack.Screen name="Edit" component={EditPage} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
