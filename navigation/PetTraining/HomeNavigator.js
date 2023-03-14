import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllTrainings from "../../screens/PetTraining/AllTrainings";
import HomeScreen from "../../screens/PetTraining/HomeScreen";

const Stack = createNativeStackNavigator();
export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="AllTraining" component={AllTrainings} />
    </Stack.Navigator>
  );
}
