import { NavigationContainer } from "@react-navigation/native";
import VetNavigation from "./navigation/Vet/vet-navigation";

export default function App() {
  return (
    <NavigationContainer>
      <VetNavigation/>
    </NavigationContainer>
  );
}
