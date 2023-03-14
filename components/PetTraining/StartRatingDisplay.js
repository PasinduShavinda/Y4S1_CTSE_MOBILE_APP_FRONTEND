import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

export default function StarRating({ rating, text=true }){

  const renderStar = (index) => {
    if (index <= Math.floor(rating)) {
      return (
        <MaterialCommunityIcons
          name="star"
          size={24}
          color="gold"
        />
      );
    } else if (index === (Math.floor(rating)) + 1 && (rating % 1 !== 0)) {
      return (
        <MaterialCommunityIcons name="star-half-full" size={24} color="gold" />
      );
    } else {
      return (
        <MaterialCommunityIcons name="star-outline" size={24} color="gold" />
      );
    }
  };

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((index) => (
        <View key={index}>{renderStar(index)}</View>
      ))}
      {text && <Text style={styles.ratingText}>({rating.toFixed(1)})</Text>}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "bold",
    marginLeft:10
  },
});

