import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditTrainingScreen from "../../screens/PetTraining/EditTrainingScreen";
import TrainingItemScreen from "../../screens/PetTraining/TrainingItemScreen";

const Stack = createNativeStackNavigator();

export default function TrainingItemNavigator({ item }) {
  return (
    <Stack.Navigator
      initialRouteName="TrainingItem"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="TrainingItem">
        {(props) => <TrainingItemScreen {...props} item={item} />}
      </Stack.Screen>
      <Stack.Screen name="EditTraining">
        {(props) => <EditTrainingScreen {...props} item={item} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
