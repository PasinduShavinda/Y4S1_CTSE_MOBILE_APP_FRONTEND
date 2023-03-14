import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import colors from "../../utils/colors";
import StarRating from "./StartRatingDisplay";

export default function ReviewCard() {
  return (
    <View style={styles.container}>
      <View style={styles.img}>
        <Image
          style={styles.avatar}
          source={require("../../assets/avatar.png")}
        />
      </View>
      <View style={styles.reviewContainer}>
        <View style={styles.reviewDetails}>
          <View style={styles.reviewDetailsTop}>
            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
              Chamath Kavindya
            </Text>
            <Text style={{ fontWeight: "bold", color:colors.secondary }}>
              Novermber 14 2023
            </Text>
          </View>
          <StarRating rating={2} text={false} />
        </View>
        <View style={styles.reviewText}>
          <Text>
            In English, the phrase can be translated to mean: "I am a monk who
            experiences the suffering of all, and I am mindful and
            concentrated."
          </Text>
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
    marginBottom:10
  },
  img: {
    flex:0.7,
  },
  avatar: {
    width: 50,
    height: 50,
    margin: 10,
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
