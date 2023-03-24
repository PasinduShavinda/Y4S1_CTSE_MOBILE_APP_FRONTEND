import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import colors from "../../utils/colors";
import StarRating from "./StartRatingDisplay";

export default function ReviewCard({ item }) {
  return (
    <View style={styles.container}>
      <View style={styles.img}>
        <Image
          style={styles.avatar}
          source={
            item.dp ? { uri: item.dp } : require("../../assets/avatar.png")
          }
        />
      </View>
      <View style={styles.reviewContainer}>
        <View style={styles.reviewDetails}>
          <View style={styles.reviewDetailsTop}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              {item.userName}
            </Text>
            <Text style={{ fontWeight: "bold", color: colors.secondary }}>
              {item.date}
            </Text>
          </View>
          <StarRating rating={item.rating} text={false} />
        </View>
        <View style={styles.reviewText}>
          <Text>{item.review}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    borderColor: colors.black,
    borderWidth: 1,
    padding: 10,
    paddingLeft: 0,
    marginBottom: 10,
  },
  img: {
    flex: 0.7,
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 10,
    borderRadius: 30,
    borderColor: colors.secondary,
    borderWidth: 3,
  },
  reviewContainer: {
    flex: 3,
  },
  reviewDetails: {},
  reviewDetailsTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewText: {
    padding: 5,
  },
});
