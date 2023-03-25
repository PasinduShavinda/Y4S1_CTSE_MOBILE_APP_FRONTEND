import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllTrainings from "../../screens/PetTraining/AllTrainings";
import HomeScreen from "../../screens/PetTraining/HomeScreen";
import NearByTrainingsScreen from "../../screens/PetTraining/NearByTrainingsScreen";
import ItemTopNavigator from "./ItemTopNavigator";

const Stack = createNativeStackNavigator();
export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="AllTraining" component={AllTrainings} />
      <Stack.Screen name="NearBy" component={NearByTrainingsScreen} />
      <Stack.Screen name="ItemTopNav" component={ItemTopNavigator} />
    </Stack.Navigator>
  );
}
