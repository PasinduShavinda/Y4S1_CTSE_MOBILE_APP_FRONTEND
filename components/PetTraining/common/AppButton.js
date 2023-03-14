import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../../../utils/colors";

export default function AppButton({ title, onPress, style, fontSize, icon, disabled,color=colors.white }) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, style]}
      onPress={onPress}
    >
      {icon}
      <Text style={[styles.text, { fontSize: fontSize, color: color }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent:"center",
    width: "100%",
    flexDirection:"row"
  },
  text: {
    color: colors.white,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
