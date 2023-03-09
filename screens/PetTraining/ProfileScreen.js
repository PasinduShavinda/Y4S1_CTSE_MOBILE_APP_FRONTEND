import { View, Text, StyleSheet, Image, Alert, ScrollView, TouchableHighlight, Touchable } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../components/PetTraining/common/Screen";
import { auth } from "../../database/firebaseConfig";
import { currentUser } from "../../services/PetTraining/userService";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import routes from "../../navigation/PetTraining/routes";
import colors from "../../utils/colors";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({});
  async function getCurrentUser() {
    await currentUser().then((res) => {
      setUser(res.data());
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
            Alert.alert("Sign Out", "Are you sure want sign out?", [
              {
                text: "Sign Out",
                onPress: () => signOut(),
              },
              {
                text: "Cancel",
                onPress: () => {},
              },
            ]);
          }}
        />
      </View>
      {/* end of upper section */}
      <View style={styles.addListings}>
        <Text style={styles.secHeading}>Add New Listings</Text>
        <View style={styles.itemRow}>
          <View style={styles.item}>
            <Text>Training</Text>
          </View>
          <View style={styles.item}>
            <Text>sitting</Text>
          </View>
          <View style={styles.item}>
            <Text>Selling</Text>
          </View>
          <View style={styles.item}>
            <Text>Vet</Text>
          </View>
        </View>
      </View>
      <View style={styles.myListings}>
        <Text style={styles.secHeading}>My Listings</Text>
        <ScrollView horizontal={true}>
          <View style={styles.itemRow}>
            <TouchableHighlight underlayColor={colors.lightPurple} onPress={()=> navigation.navigate(routes.TRAININGITEMNav)}>
              <Image
                style={styles.item2}
                source={require("../../assets/item.jpg")}
              />
            </TouchableHighlight>
            <TouchableHighlight underlayColor={colors.lightPurple} onPress={()=> navigation.navigate(routes.TRAININGITEMNav)}>
              <Image
                style={styles.item2}
                source={require("../../assets/item.jpg")}
              />
            </TouchableHighlight>
            <TouchableHighlight underlayColor={colors.lightPurple} onPress={()=> navigation.navigate(routes.TRAININGITEMNav)}>
              <Image
                style={styles.item2}
                source={require("../../assets/item.jpg")}
              />
            </TouchableHighlight>
            <TouchableHighlight underlayColor={colors.lightPurple} onPress={()=> navigation.navigate(routes.TRAININGITEMNav)}>
              <Image
                style={styles.item2}
                source={require("../../assets/item.jpg")}
              />
            </TouchableHighlight>
          </View>
        </ScrollView>
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
    marginBottom: 30,
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
  addListings: {
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 30,
  },
  secHeading: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  itemRow: {
    flexDirection: "row",
    marginTop: 5,
  },
  item: {
    width: 80,
    height: 80,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 50,
    margin: 10,
  },
  myListings: {
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 10,
  },
  item2: {
    width: 170,
    height: 170,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
  },
});
