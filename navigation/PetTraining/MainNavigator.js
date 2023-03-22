import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import Screen from "../../components/PetTraining/common/Screen";
import LoadingScreen from "../../components/PetTraining/LoadingScreen";
import { auth, db } from "../../database/firebaseConfig";
import Selling_Page from "../../screens/pet_selling/Selling_Page";
import { AdminDash } from "../../screens/Vet/admin-vet-management/admin-dashboard";
import { CustHome } from "../../screens/Vet/customer-vet/cust-vet-home";
import { currentUser } from "../../services/PetTraining/userService";
import colors from "../../utils/colors";
import PetsittingNavigation from "../PetSitting/PetsittingNavigation";
import VetAdminNavigator from "../Vet/adminNavigator";
import VetCustNavigator from "../Vet/customerNavigator";
import HomeNavigator from "./HomeNavigator";
import ProfileNavigator from "./ProfileNavigator";

const Tab = createBottomTabNavigator();
export default function MainNavigator({ route }) {
  const [user, setuser] = useState(null);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = () => {
    const user = auth.currentUser;
    const Ref = ref(db, `users/${user.uid}`);
    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setuser(data);
      }
    });
  };
  if (user === null) {
    return (
      <Screen key={user}>
        <LoadingScreen />
      </Screen>
    );
  }
  return (
    <Tab.Navigator
      key={user}
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
              name="shopping-basket"
              size={30}
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
        component={VetCustNavigator}
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
          component={VetAdminNavigator}
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
  );
}
