import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PetSittingHomeScreen from "./../../screens/PetSitting/PetSittingHomeScreen";
import AllPetsSitters from "./../../screens/PetSitting/AllPetsSitters"
import PetSitterRegister from "../../screens/PetSitting/PetSitterRegister";
import SpecificPetSitter from "./../../screens/PetSitting/SpecificPetSitter"
import ContactPetSitter from "./../../screens/PetSitting/ContactPetSitter"
const Stack = createNativeStackNavigator();

const PetsittingNavigation = () => {
  return (
    <TailwindProvider>
   
      <Stack.Navigator>
        <Stack.Screen name="PetSittingHomeScreen" component={PetSittingHomeScreen} />
        <Stack.Screen name="AllPetsSitters" component={AllPetsSitters} />
        <Stack.Screen name="PetSitterRegister" component={PetSitterRegister} />
        <Stack.Screen name="SpecificPetSitter" component={SpecificPetSitter} />
        <Stack.Screen name="ContactPetSitter" component={ContactPetSitter} />
        
      </Stack.Navigator>
  
  </TailwindProvider>
  )
}

export default PetsittingNavigation