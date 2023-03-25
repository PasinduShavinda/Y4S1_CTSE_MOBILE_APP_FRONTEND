import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { auth } from "../../database/firebaseConfig";
import LoginScreen from "../../screens/PetTraining/LoginScreen";
import RegistrationScreen from "../../screens/PetTraining/RegistrationScreen";
import colors from "../../utils/colors";
import ActionBarImage from "../../utils/headerImage";
import MainNavigator from "./MainNavigator";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={auth.currentUser !== null ? "HomeNav" : "Login"}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeNav"
        component={MainNavigator}
        options={{
          headerTitle: "PetCare",
          headerLeft: () => <ActionBarImage />,
          headerTitleStyle: {
            color: colors.primary,
            fontSize: 20,
            fontWeight: "bold",
          },
        }}
      />
    </Stack.Navigator>
  );
}
