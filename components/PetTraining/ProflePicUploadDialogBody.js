import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import ImageInput from "./common/ImageInput";
import imageUpload from "../../services/PetTraining/imageUpload";
import AppButton from "./common/AppButton";
import colors from "../../utils/colors";
import { updateUser } from "../../services/PetTraining/userService";

export default function ProflePicUploadDialogBody({ onClose, user }) {
  const [uri, setUri] = useState(null);
  const handleAdd = (uri) => {
    setUri(uri);
  };
  const handleSave = async () => {
    await imageUpload([uri]).then(async (res) => {
      const data = {
        id: user.id,
        name: user.name,
        isAdmin: user.isAdmin,
        dp: res[0],
      };
      await updateUser(data).then(() => {
        onClose();
      });
    });
  };
  return (
    <View style={styles.modalContainer}>
      <View style={styles.popup}>
        <Text style={styles.title}>Upload yout profile picture</Text>
        {uri ? (
          <View style={styles.imgbtns}>
            <Image
              style={styles.avatar}
              source={{
                uri: uri,
              }}
            />
            <View style={styles.buttons}>
              <AppButton
                title={"Remove"}
                style={styles.btn}
                onPress={onClose}
              />
              <AppButton
                title={"Save"}
                style={styles.btn}
                onPress={() => handleSave()}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              marginBottom: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageInput onChangeImage={handleAdd} />
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  avatar: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 50,
  },
  popup: {
    backgroundColor: "white",
    width: "90%",
    height: "auto",
    padding: 10,
    borderRadius: 10,
  },
  buttons: { flexDirection: "row", justifyContent: "flex-end" },
  btn: {
    width: 100,
    margin: 10,
    height: 40,
  },
  imgbtns: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.secondary,
    marginBottom: 20,
    alignSelf: "center",
  },
});
