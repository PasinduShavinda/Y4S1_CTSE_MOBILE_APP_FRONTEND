import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import ImageSlider from "react-native-image-slider";
import colors from "../../utils/colors";

export default function ImageSliderCon(){
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/ctse-mobile-app.appspot.com/o/petTraining%2FFireShot_Capture_001_-__-_dribbble.com-removebg-preview%20(1).png?alt=media&token=a885b370-4d0f-4c93-9986-385f8bcc068c",
  ];

  return (
    <View style={styles.container}>
      <ImageSlider
        loopBothSides
        autoPlayWithInterval={1000}
        images={images}
        customSlide={({ index, item, style, width }) => (
          <View key={index} style={[style, styles.imageContainer]}>
            <Image source={{ uri: item }} style={styles.image} />
            <Text>sga</Text>
          </View>
        )}
        customButtons={(position, move) => (
          <View style={styles.buttons}>
            {images.map((image, index) => (
              <View
                key={index}
                style={position === index ? styles.activeButton : styles.button}
              />
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
  },
  button: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: colors.secondary,
    opacity: 0.5,
  },
  activeButton: {
    width: 16,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: "#fff",
  },
});
