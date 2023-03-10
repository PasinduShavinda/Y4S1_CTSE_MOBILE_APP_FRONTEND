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
import { ImageSlider } from "react-native-image-slider-banner";
import Map from "../../components/PetTraining/Map";
import { auth } from "../../database/firebaseConfig";

export default function TrainingItemScreen({ item }) {
  console.log(item);
  const [user, setUser] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  async function getCurrentUser() {
    await currentUser().then((res) => {
      setUser(res.data());
      setRefreshing(false);
    });
  }
  const imageData = [];
  const images = [...item.images];
  images.forEach((image) => {
    imageData.push({ img: image });
  });
  const types = [...item.petType];

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
          <ImageSlider
            data={imageData}
            autoPlay={true}
            closeIconColor={colors.primary}
          />
        </View>
        {/* 2 */}
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
          {auth.currentUser.uid == item.userId && (
            <View style={styles.like}>
              <MaterialCommunityIcons
                name="file-document-edit"
                size={33}
                color={colors.primary}
              />
              <MaterialCommunityIcons
                style={{ marginLeft: 15 }}
                name="delete"
                size={33}
                color={colors.primary}
              />
            </View>
          )}
        </View>
        {/* 3 */}
        <View>
          <View>
            <Text style={styles.secHeading}>Description</Text>
            <Text style={styles.secText}>{item.description}</Text>
          </View>
          <View>
            <Text style={styles.secHeading}>Training Experience</Text>
            <Text style={styles.secText}>{item.experience}</Text>
          </View>
          <View>
            <Text style={styles.secHeading}>Accepting Pet Types</Text>
            {item.petType.map((type, index) => {
              return (
                <View
                  key={index}
                  style={{ flexDirection: "row", marginLeft: 10 }}
                >
                  <MaterialCommunityIcons name={type.icon} size={20} />
                  <Text style={styles.secText}>{type.lable}</Text>
                </View>
              );
            })}
          </View>
          <View>
            <Text style={styles.secHeading}>Accepting Pet Age</Text>
            {item.petAge.map((type, index) => {
              return (
                <View
                  key={index}
                  style={{ flexDirection: "row", marginLeft: 10 }}
                >
                  <MaterialCommunityIcons name={type.icon} size={20} />
                  <Text style={styles.secText}>{type.lable}</Text>
                </View>
              );
            })}
          </View>
          <View>
            <Text style={styles.secHeading}>Accepting Pet Size</Text>
            {item.petSize.map((type, index) => {
              return (
                <View
                  key={index}
                  style={{ flexDirection: "row", marginLeft: 10 }}
                >
                  <MaterialCommunityIcons name={type.icon} size={type.size} />
                  <Text style={styles.secText}>{type.lable}</Text>
                </View>
              );
            })}
          </View>
        </View>
        {/* 3 */}
        <View>
          <View>
            <Text style={styles.secHeading}>Location</Text>
            <Text style={styles.secText}>{item.locationDetails}</Text>
          </View>
          <View>
            <Map location={item.location} style={styles.map} />
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
    marginBottom: 20,
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
    color: colors.secondary,
  },
  secText: {
    fontSize: 15,
    paddingLeft: 10,
    marginBottom: 10,
  },
  contactBtn: {
    height: 40,
    width: 200,
    marginLeft: 10,
  },
  like: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -40,
    justifyContent: "space-between",
    marginLeft: -10,
    
  },
  map: {
    height: 400,
    width: "99%",
    marginBottom: 10,
  },
});
