import { View, Text, StyleSheet, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/PetTraining/common/Screen";
import { auth, user } from "../../database/firebaseConfig";
import { currentUser } from "../../services/PetTraining/userService";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import routes from "../../navigation/PetTraining/routes";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({});
  async function getCurrentUser() {
    await currentUser().then((res) => {
      setUser(res.data());
      console.log("data", res.data());
    });
  }
  const signOut = async () => {
    await auth
      .signOut()
      .then(() => {
        setTimeout(() => {
          navigation.navigate(routes.LOGIN);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Screen>
      <View style={styles.user}>
        <Image
          style={styles.avatar}
          source={require("../../assets/avatar.png")}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{user.name}</Text>
          <Text>Edit </Text>
        </View>
        <MaterialCommunityIcons
          name="logout"
          size={40}
          onPress={() => {
            Alert.alert(
              "Sign Out", // Alert title
              "Are you sure want sign out?", // Alert message
              [
                {
                  text: "OK",
                  onPress: () => signOut(),
                },
                // You can add more buttons here
              ],
              { cancelable: false } // Prevent tapping outside of the alert to dismiss it
            );
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  user: {
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
  },
  avatar: {
    flex: 0.4,
    width: 100,
    height: 100,
    margin: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
