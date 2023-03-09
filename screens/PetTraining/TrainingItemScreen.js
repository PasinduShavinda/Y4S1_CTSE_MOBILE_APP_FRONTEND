import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Screen from "../../components/PetTraining/common/Screen";
import { currentUser } from "../../services/PetTraining/userService";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../utils/colors";
import Rating from "../../components/PetTraining/Rating";
import AppButton from "../../components/PetTraining/common/AppButton";

export default function TrainingItemScreen() {
  const [user, setUser] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  async function getCurrentUser() {
    await currentUser().then((res) => {
      setUser(res.data());
      setRefreshing(false);
    });
  }
  useEffect(() => {
    getCurrentUser();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getCurrentUser();
  }, []);
  return (
    <Screen>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.imageContainer}>
          <Image
            style={styles.item2}
            source={require("../../assets/item.jpg")}
          />
        </View>
        <View style={styles.contactDetails}>
          <Image
            style={styles.avatar}
            source={require("../../assets/avatar.png")}
          />
          <View style={{ marginRight: 30 }}>
            <Text style={styles.secHeading}>{user.name}</Text>
            <AppButton title={"Contact"} style={styles.contactBtn} />
            <Rating />
          </View>
          <View style={styles.like}>
            <MaterialCommunityIcons
              name="cards-heart"
              size={33}
              color={colors.primary}
            />
            <Text style={[{ fontSize: 16, fontWeight: "bold" }]}>6</Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  imageContainer: {},
  item2: {
    width: "95%",
    height: 400,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    marginBottom:20
  },
  contactDetails: {
    flexDirection: "row",
  },
  avatar: {
    width: 70,
    height: 70,
    margin: 10,
  },
  secHeading: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
    marginBottom: 10,
  },
  contactBtn: {
    height: 40,
    width: 200,
    marginLeft:10
  },
  like: {
    flexDirection: "row",
    alignItems: "center",
    marginTop:-40
  }
});
