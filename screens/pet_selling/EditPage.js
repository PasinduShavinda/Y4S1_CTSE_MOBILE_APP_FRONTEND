import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  Button,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import { React, useState } from "react";
import Google_map from "./Google_map";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
//   import ImageViewer from "../../components/pet_selling/ImageViewer";

export default function EditPage({ navigation }) {
  const [number, onChangeNumber] = useState("");
  const [latitudePass, setlatitudePass] = useState(null);
  const [longitudePass, setlongitudePass] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);

  // form Data
  const [names, setnames] = useState("");
  const [gender, setgender] = useState(1);
  const [price, setprice] = useState(0);
  const [category, setcategory] = useState("");
  const [age, setage] = useState(0);
  const [description, setdescription] = useState("");
  const [contactNumber, setcontactNumber] = useState(0);

  function handleChoosePhoto() {}
  function showAlert() {
    navigation.navigate("google-map");
  }
  function getLocation(latitudePass, longitudePass) {
    setlatitudePass(latitudePass);
    setlongitudePass(longitudePass);
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.longTextStyles}>
          <View>
            <Text style={styles.titleOfPage}>Edit dog Information</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.boxLeft}>
              <View style={[styles.formDataBox, styles.shadowProp]}>
                <Image
                  source={{
                    uri: "https://irishtherapydogs.ie/wp-content/uploads/2021/09/Lucy-Sharon-scaled-600x579.jpg",
                  }}
                  style={styles.tinyLogo}
                />
              </View>
            </View>
            <View style={styles.boxRight}>
              <View style={[styles.formDataBox, styles.shadowProp]}>
                <Text>Pet Name{names}</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setnames}
                  value={names}
                  placeholder="useless placeholder"
                  keyboardType="text"
                />
              </View>
              <View style={[styles.formDataBox, styles.shadowProp]}>
                <Text>Price</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setprice}
                  value={price}
                  placeholder="useless placeholder"
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
          <View>
            <View style={styles.contentStyles}>
              <View style={[styles.formDataBox, styles.shadowProp]}>
                <Text>Pet Category</Text>
                <Picker
                  selectedValue={category}
                  onValueChange={(itemValue, itemIndex) =>
                    setcategory(itemValue)
                  }
                >
                  <Picker.Item label="Dog" value="Dog" />
                  <Picker.Item label="Cats" value="Cats" />
                  <Picker.Item label="Birds" value="Birds" />
                </Picker>
              </View>
              <View style={[styles.formDataBox, styles.shadowProp]}>
                <Text>Age</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setage}
                  value={age}
                  placeholder="useless placeholder"
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.formDataBox, styles.shadowProp]}>
                <Text>Contact Number</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setcontactNumber}
                  value={contactNumber}
                  placeholder="useless placeholder"
                  keyboardType="numeric"
                />
              </View>
              <View style={[styles.formDataBox, styles.shadowProp]}>
                <Text>Description</Text>
                <TextInput
                  editable
                  multiline
                  numberOfLines={4}
                  maxLength={40}
                  onChangeText={(text) => setdescription(text)}
                  value={description}
                  style={{ padding: 10 }}
                />
              </View>
            </View>
            <View style={styles.mapStyle}>
              <Google_map getLocation={getLocation} />
            </View>
          </View>
          <View style={styles.btnStyling}>
            <Pressable style={styles.button}>
              <Text style={styles.text}>Save</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  formDataBox: {
    backgroundColor: "white",
    padding: 5,
    marginBottom: 5,
    borderRadius: 10,
    marginRight: 10,
  },
  mapStyle: {
    width: "95%",
    height: 500,
    marginLeft: 10,
    marginRight: 10,
  },
  contentStyles: {
    margin: 15,
  },
  btnStyling: {
    marginLeft: 20,
    marginRight: 25,
    marginBottom: 30,
  },
  text: {
    fontSize: 22,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 20,
    shadowColor: "#000",
    backgroundColor: "#B648B8",
    height: 60,
  },
  longTextStyles: {
    backgroundColor: "aliceblue",
  },
  shadowProp: {
    elevation: 20,
    shadowColor: "#52006A",
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 2,
  },
  tinyLogo: {
    width: 120,
    height: 120,
    marginLeft: 5,
    marginBottom: 75,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 5,
  },
  boxRight: {
    paddingLeft: 0,
    paddingTop: 10,
    width: "60%",
  },
  boxLeft: {
    paddingLeft: 0,
    paddingTop: 10,
    width: "40%",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    backgroundColor: "aliceblue",
    borderRadius: 15,
    padding: 10,
    paddingBottom: 30,
  },
  titleOfPage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 20,
    marginBottom: 20,
  },
});
