import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import Selling_Page from "../../screens/pet_selling/Selling_Page";
import { AdminDash } from "../../screens/Vet/admin-vet-management/admin-dashboard";
import { CustHome } from "../../screens/Vet/customer-vet/cust-vet-home";
import { currentUser } from "../../services/PetTraining/userService";
import colors from "../../utils/colors";
import PetsittingNavigation from "../PetSitting/PetsittingNavigation";
import vetAdminNavigator from "../Vet/adminNavigator";
import vetCustNavigator from "../Vet/customerNavigator";
import HomeNavigator from "./HomeNavigator";
import ProfileNavigator from "./ProfileNavigator";

const Tab = createBottomTabNavigator();
export default function MainNavigator() {
  const [user, setuser] = useState(null);

  useEffect(() => {
    getUser()
  },[])

  const getUser = async () => {
    await currentUser().then((res) => {
      setuser(res.data());
      console.log(res.data())
    });
  };

  return user !== null ? (
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
        name="vet"
        component={vetCustNavigator}
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
      {!user.isAdmin ? (
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
      ) : (
        <Tab.Screen
          name="admin"
          component={vetAdminNavigator}
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
      )}
    </Tab.Navigator>
  ) : null;
}
