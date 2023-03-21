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
import { React, useState, useLayoutEffect } from "react";
import Google_map from "./Google_map";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import {
  update_selling_pet_by_id,
  update_selling_pet,
} from "../../services/pet_selling/selling_service";
//   import ImageViewer from "../../components/pet_selling/ImageViewer";
import { Snackbar } from "react-native-paper";

export default function EditPage({ navigation, route }) {
  const {
    petId,
    name,
    age1,
    gender1,
    latitudePass1,
    longitudePass1,
    price1,
    category1,
    description1,
    contactNumber1,
    img1,
  } = route.params;
  const [number, onChangeNumber] = useState("");
  const [latitudePass, setlatitudePass] = useState(latitudePass1);
  const [longitudePass, setlongitudePass] = useState(longitudePass1);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const url_id = route.params?.id;
  const [sellingPets, setsellingPets] = useState([]);
  const [snakVisible, SetSnackVisible] = useState(false);

  // form Data
  const [names, setnames] = useState(name);
  const [gender, setgender] = useState(gender1);
  const [price, setprice] = useState(price1);
  const [category, setcategory] = useState(category1);
  const [age, setage] = useState(age1);
  const [description, setdescription] = useState(description1);
  const [contactNumber, setcontactNumber] = useState(contactNumber1);
  const user = "bf734bc34r74vb";

  function handleChoosePhoto() {}
  function showAlert() {
    navigation.navigate("google-map");
  }
  // function getLocation(latitudePass, longitudePass) {
  //   setlatitudePass(latitudePass);
  //   setlongitudePass(longitudePass);
  // }

  const update_pets_by_id = async () => {
    console.log("====================================================");
    const request_obj = {
      user_id: user,
      name: names,
      gender: gender,
      price: price,
      category: category,
      age: age,
      description: description,
      contactNumber: contactNumber,
      latitudePass: latitudePass,
      longitudePass: longitudePass,
      img: img1,
    };
    console.log(petId);
    console.log(request_obj);

    await update_selling_pet(request_obj, petId)
      .then((result) => {
        console.log(result);
        SetSnackVisible(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.longTextStyles}>
          <View>
            <Text style={styles.titleOfPage}>Edit dog Information{name}</Text>
          </View>
          <View style={styles.container}>
            <View style={styles.boxLeft}>
              <View style={[styles.formDataBox, styles.shadowProp]}>
                <Image
                  source={{
                    uri: img1,
                  }}
                  style={styles.tinyLogo}
                />
              </View>
            </View>
            <View style={styles.boxRight}>
              <View style={[styles.formDataBox, styles.shadowProp]}>
                <Text>Pet Name</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setnames}
                  value={names}
                  placeholder="useless placeholder"
                  keyboardType="text"
                />
              </View>
              <View style={[styles.formDataBox, styles.shadowProp]}>
                <Text>Price{price}</Text>
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
            {/* <View style={styles.mapStyle}>
              <Google_map getLocation={getLocation} />
            </View> */}
          </View>
          <View style={styles.btnStyling}>
            <Pressable style={styles.button} onPress={update_pets_by_id}>
              <Text style={styles.text}>Save</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Snackbar
        visible={snakVisible}
        onDismiss={() => SetSnackVisible(false)}
        duration={2000}
        action={{
          label: "OK",
          labelStyle: { color: "white", fontSize: 18 },
          onPress: () => {
            SetSnackVisible(false);
          },
        }}
        style={{ backgroundColor: "#B32AD8" }}
      >
        <View>
          <Text>Successfully Updated</Text>
        </View>
      </Snackbar>
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
