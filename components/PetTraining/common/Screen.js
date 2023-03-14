import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

function Screen(props) {
  return (
    <SafeAreaView style={[styles.screen, props.style]}>
      <View style={[styles.view, props.style]}>{props.children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  view: {
    flex: 1,
  },
});

export default Screen;
