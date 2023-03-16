import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  TouchableHighlight,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getAllTrainings } from "../../services/PetTraining/trainingService";
import Screen from "../../components/PetTraining/common/Screen";
import { FlatGrid } from "react-native-super-grid";
import colors from "../../utils/colors";
import StarRating from "../../components/PetTraining/StartRatingDisplay";
import routes from "../../navigation/PetTraining/routes";
import { onValue, ref } from "firebase/database";
import { db } from "../../database/firebaseConfig";

export default function AllTrainings({ navigation }) {
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
    const Ref = ref(db, "trainings/");

    onValue(Ref, (snapshot) => {
      const data = snapshot.val();
      const listings = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setListings(listings);
      setRefreshing(false);
    });
  };
  return (
    <Screen>
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
              <StarRating rating={1} />
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
