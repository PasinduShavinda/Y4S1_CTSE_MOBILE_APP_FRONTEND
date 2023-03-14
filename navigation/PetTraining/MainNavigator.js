import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../../screens/PetTraining/HomeScreen";
import ProfileScreen from "../../screens/PetTraining/ProfileScreen";
import Selling_Page from "../../screens/pet_selling/Selling_Page";
import colors from "../../utils/colors";
import PetsittingNavigation from "../PetSitting/PetsittingNavigation";
import HomeNavigator from "./HomeNavigator";
import ProfileNavigator from "./ProfileNavigator";

const Tab = createBottomTabNavigator();
export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60, backgroundColor: colors.lightPurple },
      }}
    >
      <Tab.Screen
        name="Main"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <MaterialCommunityIcons
              name="home"
              size={40}
              color={focused ? colors.secondary : colors.primary}
            />
          ),
          tabBarLabelStyle: { color: colors.secondary },
        }}
      />
      <Tab.Screen
        name={"buy"}
        component={Selling_Page}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <FontAwesome
              name="user-circle-o"
              size={40}
              color={focused ? colors.secondary : colors.primary}
            />
          ),
          tabBarLabelStyle: { color: colors.secondary },
        }}
      />
      <Tab.Screen
        name="sitter"
        component={PetsittingNavigation}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <FontAwesome
              name="user-circle-o"
              size={40}
              color={focused ? colors.secondary : colors.primary}
            />
          ),
          tabBarLabelStyle: { color: colors.secondary },
        }}
      />
      <Tab.Screen
        name="ProfileNav"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <FontAwesome
              name="user-circle-o"
              size={40}
              color={focused ? colors.secondary : colors.primary}
            />
          ),
          tabBarLabelStyle: { color: colors.secondary },
        }}
      />
    </Tab.Navigator>
  );
}
