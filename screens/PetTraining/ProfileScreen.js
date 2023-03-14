import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  TouchableHighlight,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Screen from "../../components/PetTraining/common/Screen";
import { auth } from "../../database/firebaseConfig";
import { currentUser } from "../../services/PetTraining/userService";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import routes from "../../navigation/PetTraining/routes";
import colors from "../../utils/colors";
import { getAllTrainings } from "../../services/PetTraining/trainingService";
import ItemsRow from "../../components/PetTraining/ItemsRow";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({});
  const [listings, setListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function getCurrentUser() {
    await currentUser().then(async (res) => {
      setUser(res.data());
    });
  }
  const getAll = async () => {
    const listings = [];
    await getAllTrainings()
      .then((querySnapshot) => {
        querySnapshot.forEach((snapshot) => {
          if (auth.currentUser.uid == snapshot.data().userId) {
            listings.push(snapshot.data());
          }
        });
        setRefreshing(false);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    setListings(listings);
  };

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
    getAll();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getCurrentUser();
    getAll();
  }, []);
  return (
    <Screen>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
            <TouchableHighlight
              underlayColor={colors.lightPurple}
              onPress={() => navigation.navigate(routes.ADDTRAINING)}
            >
              <View style={styles.itemwithText}>
                <Image
                  style={styles.item}
                  source={require("../../assets/training.png")}
                />
                <Text style={styles.itemText}>Training</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight>
              <View style={styles.itemwithText}>
                <Image style={styles.item} />
                <Text style={styles.itemText}>Sitting</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight>
              <View style={styles.itemwithText}>
                <Image style={styles.item} />
                <Text style={styles.itemText}>Selling</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight>
              <View style={styles.itemwithText}>
                <Image style={styles.item} />
                <Text style={styles.itemText}>Vat</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.myListings}>
          <Text style={styles.secHeading}>My Listings</Text>
          <ItemsRow listings={listings} navigation={navigation} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  user: {
    flexDirection: "row",
    borderWidth: 1,
    alignItems: "center",
    borderColor: colors.white,
    borderWidth: 1,
    marginBottom: 30,
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 8,
    shadowColor: colors.secondary,
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
    borderColor: colors.white,
    borderWidth: 1,
    marginBottom: 30,
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 8,
    shadowColor: colors.secondary,
    paddingBottom: 10,
  },
  secHeading: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
    color: colors.secondary,
  },
  itemRow: {
    flexDirection: "row",
    marginTop: 5,
  },
  itemwithText: {
    flexDirection: "column",
    alignItems: "center",
  },
  itemText: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: -8,
    color: colors.secondary,
  },
  item: {
    width: 80,
    height: 80,
    borderColor: colors.primary,
    borderWidth: 3,
    borderRadius: 50,
    margin: 10,
  },
  myListings: {
    borderColor: colors.white,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 8,
    shadowColor: colors.secondary,
  },
});
