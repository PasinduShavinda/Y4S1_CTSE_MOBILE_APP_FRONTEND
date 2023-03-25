import { NavigationContainer } from "@react-navigation/native";
import { LogBox } from "react-native";
import AppNavigator from "./navigation/PetTraining/AppNavigator";

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
