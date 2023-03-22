import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAllTrainingsSub } from "../../services/PetTraining/trainingService";
import Screen from "../../components/PetTraining/common/Screen";
import { FlatGrid } from "react-native-super-grid";
import colors from "../../utils/colors";
import StarRating from "../../components/PetTraining/StartRatingDisplay";
import routes from "../../navigation/PetTraining/routes";
import * as Location from "expo-location";
import { getNearByPlaces } from "../../services/PetTraining/locationsNearBy";
export default function AllTrainings({ navigation }) {
  const [listings, setListings] = useState([]);
  const [location, setLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    getAll();
    if (listings.length !== 0) {
      async function getCurrentLocation() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }

        const { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
      }
      getCurrentLocation();
    }
  }, []);

  const getNearBy = () => {
    const list = [];
    listings.forEach((item) => {
      list.push(item.location);
    });
    //console.log(location)

    const places = getNearByPlaces(list, location);
    console.log(places);
  };

  const getAll = () => {
    getAllTrainingsSub(setListings);
  };
  return (
    <Screen>
      <Text>Training Available</Text>
      <Button
        title="Near by"
        onPress={() => {
          getNearBy();
        }}
      />
      <FlatGrid
        itemDimension={130}
        data={listings}
        spacing={10}
        renderItem={({ item }) => (
          <TouchableHighlight
            underlayColor={colors.lightPurple}
            onPress={() => navigation.navigate(routes.ITEMTOPNAV, { item })}
          >
            <View style={{ margin: 10 }}>
              <Image style={styles.item} source={{ uri: item.images[0] }} />
              <StarRating rating={item.rating} />
              <Image
                style={styles.itemIcon}
                source={require("../../assets/training.png")}
              />
            </View>
          </TouchableHighlight>
        )}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    marginTop: 5,
  },
  item: {
    width: 170,
    height: 170,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    position: "relative",
    zIndex: 1,
  },
  itemIcon: {
    width: 30,
    height: 30,
    borderColor: colors.primary,
    borderWidth: 3,
    borderRadius: 50,
    position: "absolute",
    zIndex: 999,
    alignSelf: "flex-end",
  },
});
