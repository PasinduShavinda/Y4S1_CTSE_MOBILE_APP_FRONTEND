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
          <ImageSlider
            data={[
              {
                img: "https://firebasestorage.googleapis.com/v0/b/ctse-mobile-app.appspot.com/o/petTraining%2Fafb17b0d-b952-4637-b0d3-1ed0e3ac3839.jpeg?alt=media&token=e44e3717-0269-4314-9dbd-c182c6225476",
                
              },
              {
                img: "https://firebasestorage.googleapis.com/v0/b/ctse-mobile-app.appspot.com/o/petTraining%2Fa3594b63-842b-4cb9-aba9-a188aef7383d.jpeg?alt=media&token=6b0c3610-e93f-42b9-a3c5-cada8fe5172d",
              },
            ]}
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
          <View style={styles.like}>
            <MaterialCommunityIcons
              name="cards-heart"
              size={33}
              color={colors.primary}
            />
            <Text style={[{ fontSize: 16, fontWeight: "bold" }]}>6</Text>
          </View>
        </View>
        {/* 3 */}
        <View>
          <View>
            <Text style={styles.secHeading}>Description</Text>
            <Text style={styles.secText}>
              Material Top Tabs is a component in Material Design that displays
              a horizontal row of tabs at the top of a screen, allowing users to
              switch between different sections or views of an app.
            </Text>
          </View>
          <View>
            <Text style={styles.secHeading}>Training Experience</Text>
            <Text style={styles.secText}>
              Material Top Tabs is a component in Material Design that displays
              a horizontal row of tabs at the top of a screen, allowing users to
              switch between different sections or views of an app.
            </Text>
          </View>
          <View>
            <Text style={styles.secHeading}>Accepting Pet Types</Text>
            <Text style={styles.secText}>Dogs</Text>
            <Text style={styles.secText}>Cats</Text>
            <Text style={styles.secText}>Others</Text>
          </View>
          <View>
            <Text style={styles.secHeading}>Accepting Pet Age</Text>
            <Text style={styles.secText}>3months</Text>
            <Text style={styles.secText}>Over 1year</Text>
            <Text style={styles.secText}>Any</Text>
          </View>
          <View>
            <Text style={styles.secHeading}>Accepting Pet Size</Text>
            <Text style={styles.secText}>1-5KG</Text>
            <Text style={styles.secText}>5-10KG</Text>
            <Text style={styles.secText}>10+KG</Text>
          </View>
        </View>
        {/* 3 */}
        <View>
          <View>
            <Text style={styles.secHeading}>Location</Text>
            <Text style={styles.secText}>
              Material Top Tabs is a component in Material Design that displays
              a horizontal row of tabs at the top of a screen, allowing users to
              switch between different sections or views of an app.
            </Text>
          </View>
          <View>
            <Image
              style={styles.item2}
              source={require("../../assets/location.jpg")}
            />
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
  },
});
