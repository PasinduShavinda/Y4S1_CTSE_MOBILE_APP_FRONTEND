import { createMaterialTopTabNavigator, MaterialTopTabBar } from "@react-navigation/material-top-tabs";
import ReviewScreen from "../../screens/PetTraining/ReviewScreen";
import TrainingItemScreen from "../../screens/PetTraining/TrainingItemScreen";
import colors from "../../utils/colors";

const Tab = createMaterialTopTabNavigator();

export default function ItemTopNavigator({ route }) {
   const { item } = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: colors.primary}, 
      }}
    >
      <Tab.Screen name="Details">
        {(props)=> <TrainingItemScreen {...props} item={item} />}
      </Tab.Screen>
      <Tab.Screen name="Review" component={ReviewScreen} />
    </Tab.Navigator>
  );
}
