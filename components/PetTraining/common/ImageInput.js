import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "../../../utils/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

function ImageInput({ imageUri, onChangeImage }) {
  const requestPermision = async () => {
    // const result2 = Permissions.askAsync(Permissions.MEDIA_LIBRARY, Permissions.LOCATION_FOREGROUND)
    //  if (!result.granted)
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!result.granted) {
      alert("you need permisions to access the camara");
    }
  };
  useEffect(() => {
    requestPermision();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) onChangeImage(result.uri);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePress = () => {
    if (!imageUri) {
      selectImage();
    } else {
      Alert.alert("Delete", "Are you sure you want to delete this?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
    }
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            name="camera"
            size={40}
            color={colors.mediumGray}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
export default ImageInput;
