import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import StarRating from "./StartRatingDisplay";
import routes from "../../navigation/PetTraining/routes";
import colors from "../../utils/colors";
import { getAllReviewsByItemSub } from "../../services/PetTraining/reviewService";

export default function ItemsRow({ navigation, listings }) {
  const [avgRate, setAvgState] = useState(3);
  const [newList, setNewList] = useState([]);
  useEffect(() => {
    // const unsubscribeFunctions = listings.map((item) => {
    //   const listener = getAllReviewsByItemSub(newList,setNewList, item);
    //   return listener;
    // });
    getRating()
    // return () => {
    //   unsubscribeFunctions.forEach((unsubscribe) => {
    //     unsubscribe();
    //   });
    // };
  }, []);
  const getRating = () => {
    console.log("first");
    console.log(listings)
    listings.map((item) => {
      
      return getAllReviewsByItemSub(newList, setNewList, item);
    });
  };

  return (
    <ScrollView horizontal={true}>
      <View style={styles.itemRow}>
        {listings.map((item, index) => {
          return (
            <TouchableHighlight
              key={index}
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
          );
        })}
      </View>
    </ScrollView>
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
