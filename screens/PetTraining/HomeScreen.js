import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getAllTrainings } from "../../services/PetTraining/trainingService";
import ItemsRow from "../../components/PetTraining/ItemsRow";
import Screen from "../../components/PetTraining/common/Screen";
import colors from "../../utils/colors";
import { ImageSlider } from "react-native-image-slider-banner";
import ImageSliderCon from "../../components/PetTraining/ImageSlider";

export default function HomeScreen({ navigation }) {
  const [listings, setListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAll();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAll();
  }, []);
  const getAll = async () => {
    const listings = [];
    await getAllTrainings()
      .then((querySnapshot) => {
        querySnapshot.forEach((snapshot, index) => {
          listings.push(snapshot.data());
        });
        setRefreshing(false);
      })
      .catch((error) => {
        console.log("Error: ", error);
        setRefreshing(false);
      });
    setListings(listings);
  };
  return (
    <Screen>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ paddingBottom: 20 }}>
          <View style={styles.home}>
            <ImageSliderCon/>
          </View>
          <View style={styles.myListings}>
            <Text style={styles.secHeading}>Train Your Pet</Text>
            <ItemsRow listings={listings} navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  home: {
    width: "100%",
    height: 500,
    borderColor: colors.white,
    borderWidth: 1,
    marginBottom: 30,
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 8,
    shadowColor: colors.secondary,
  },
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
