import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../../screens/PetTraining/HomeScreen";
import ProfileScreen from "../../screens/PetTraining/ProfileScreen";
import colors from "../../utils/colors";

const Tab = createBottomTabNavigator();
export default function HomeNavigator() {
  return (
    <Tab.Navigator
      
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60, backgroundColor: colors.lightPurple },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
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
        name="Profile"
        component={ProfileScreen}
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
