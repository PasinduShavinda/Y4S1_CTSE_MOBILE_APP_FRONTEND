import { createMaterialTopTabNavigator, MaterialTopTabBar } from "@react-navigation/material-top-tabs";
import ReviewScreen from "../../screens/PetTraining/ReviewScreen";
import TrainingItemScreen from "../../screens/PetTraining/TrainingItemScreen";
import colors from "../../utils/colors";

const Tab = createMaterialTopTabNavigator();

export default function ItemTopNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: colors.primary}, 
      }}
    >
      <Tab.Screen name="Details" component={TrainingItemScreen} />
      <Tab.Screen name="Review" component={ReviewScreen} />
    </Tab.Navigator>
  );
}
