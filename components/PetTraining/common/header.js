import React from 'react'
import { StyleSheet, View } from 'react-native';
import colors from "../../../utils/colors";
import { statusBarHeight} from "expo-constants";

export default function Header() {
  return (
    <View style={styles.header}>

    </View>
  )
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black,
    height: 60,
    width: "100%",
  },
});