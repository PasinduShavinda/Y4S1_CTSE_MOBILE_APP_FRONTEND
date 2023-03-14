import React from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../../../utils/colors";

function AppTextInput({ icon,width,height, ...otherProps }) {
  return (
    <View style={[styles.container, { width: width,height :height ? height :40}]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.mediumGray}
          style={styles.icon}
        />
      )}
      <TextInput style={styles.textInput} {...otherProps} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    paddingLeft: 15,
    marginVertical: 10,
    alignItems: "center",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.primary,
    borderRadius: 5,
    height:40
  },
  textInput: {
    color: colors.darkGray,
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  icon: {
    marginRight: 10,
  },
});
export default AppTextInput;
