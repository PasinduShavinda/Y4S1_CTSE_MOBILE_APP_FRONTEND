import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  Dimensions,
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
import AppButton from "../../components/PetTraining/common/AppButton";
import AppTextInput from "../../components/PetTraining/common/AppTextInput";
export default function AllTrainings({ navigation }) {
  const [listings, setListings] = useState([]);
  const [location, setLocation] = useState(null);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    getCurrentLocation();
    getAll();
  }, []);

  const getCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    const { coords } = await Location.getCurrentPositionAsync({});
    setLocation(coords);
  };

  const getNearBy = () => {
    const places = getNearByPlaces(listings, location);

    const data = {
      nearbyLocations: places,
      currentLocation: location,
    };
    navigation.navigate(routes.NEARBY, { data });
  };
  const getAll = () => {
    getAllTrainingsSub(setListings);
  };
  const handleSearch = (value) => {
    setSearch(value);
  };
  const getFilteredItems = () => {
    if (search === null) {
      return listings;
    }
    return listings.filter((item) =>
      (item.locationDetails + "")
        .toLowerCase()
        .includes((search + "").toLowerCase())
    );
  };
  return (
    <Screen>
      <View>
        <Text style={styles.heading}>Training Available</Text>
      </View>
      <View style={styles.search}>
        <AppTextInput
          width={Dimensions.get("window").width - 20}
          icon={"text-search"}
          onChangeText={(value) => handleSearch(value)}
        />
      </View>
      <AppButton
        title="Find All Near By Trainers"
        onPress={() => {
          getNearBy();
        }}
        style={styles.nearby}
      />
      <FlatGrid
        itemDimension={130}
        data={getFilteredItems()}
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
  search: {
    alignSelf: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.secondary,
    margin: 10,
    marginBottom: 0,
  },
  nearby: {
    width: Dimensions.get("window").width - 25,
    height: 40,
    alignSelf: "center",
  },
});
