import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../utils/colors";

export default function Rating({ onRate }) {
  const [rating, setRating] = useState(0);

  const handleRating = (value) => {
    setRating(value);
    onRate(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <Ionicons
              name={star <= rating ? "ios-star" : "ios-star-outline"}
              size={25}
              color={colors.yellow}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginLeft: 0,
    marginBottom: 0,
    flexDirection: "row",
  },
  stars: {
    flexDirection: "row",
  },
  rating: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
