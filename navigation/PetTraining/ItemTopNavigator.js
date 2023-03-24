import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ReviewScreen from "../../screens/PetTraining/ReviewScreen";
import colors from "../../utils/colors";
import TrainingItemNavigator from "./TrainingItemNavigator";

const Tab = createMaterialTopTabNavigator();

export default function ItemTopNavigator({ route }) {
  const { item } = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: colors.primary },
      }}
    >
      <Tab.Screen name="Details">
        {(props) => <TrainingItemNavigator {...props} item={item} />}
      </Tab.Screen>
      <Tab.Screen name="Review">
        {(props) => <ReviewScreen {...props} item={item} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
