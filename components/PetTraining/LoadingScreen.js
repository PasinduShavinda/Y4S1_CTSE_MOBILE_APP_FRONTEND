import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import colors from "../../utils/colors";

export default function LoadingScreen (){
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.lightPurple} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
});
