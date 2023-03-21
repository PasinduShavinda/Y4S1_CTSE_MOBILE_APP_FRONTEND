import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  Button,
  Alert,
  FlatList,
  StatusBar,
  ScrollView,
} from "react-native";
import { React, useState, useEffect, useLayoutEffect } from "react";
import { ListItem, Overlay, SearchBar } from "react-native-elements";
// import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Item from "../../components/pet_selling/Item";
import { Foundation } from "@expo/vector-icons";
import { get_all_pets } from "../../services/pet_selling/selling_service";

var petsType = "Cats";

export default function Selling_Page({ navigation, route }) {
  const [sellingPets, setsellingPets] = useState([]);
  const [petType, setPetType] = useState("Dog");

  useLayoutEffect(() => {
    const mountSellingPets = async () => {
      const data_ = await get_all_pets();
      const array_data = [];
      data_.forEach((response) => {
        array_data.push({ id: response.id, ...response.data() });
      });
      setsellingPets(array_data);
      console.log(
        "===============data===================>>>>>>>>>>>>>>>>>>>>>>"
      );
      console.log(sellingPets);
    };
    mountSellingPets();
  }, []);
  const filterByTypeDog = async () => {
    petsType = "Dogs";
    // alert(petsType);
    // const filteredArray =
    const data_ = await get_all_pets();
    const array_data = [];
    data_.forEach((response) => {
      array_data.push({ id: response.id, ...response.data() });
    });
    setsellingPets(array_data);
    const data = sellingPets.filter(function(item) {
      return item.category == "Dog";
    });
    // alert("");
    // petsType = type;
    setsellingPets(data);
  };
  const filterByTypeCats = async () => {
    // alert(petsType);
    petsType = "Cats";
    // const filteredArray =
    // const data = sellingPets.filter(function (item) {
    //   return item.category == "Dog";
    // });
    // alert("");
    // petsType = type;
    // setsellingPets(data);
    const data_ = await get_all_pets();
    const array_data = [];
    data_.forEach((response) => {
      array_data.push({ id: response.id, ...response.data() });
    });
    setsellingPets(array_data);
    const data = sellingPets.filter(function(item) {
      return item.category == "Cats";
    });
    // alert("");
    // petsType = type;
    setsellingPets(data);

    // .filter((item) => item.category === petsType)
  };

  return (
    <View style={styles.mainContainer}>
      <SearchBar
        placeholder="Search Here..."
        lightTheme
        round
        autoCorrect={false}
      />
      <View>
        <Text>{petsType}</Text>
        <View style={styles.container}>
          <View style={styles.topBtn}>
            <FontAwesome5.Button
              style={styles.iconStyle}
              name="dog"
              size={30}
              color="black"
              backgroundColor="#ffffff"
              onPress={filterByTypeDog}
            />
            <Text style={styles.categoryNames}>Dogs</Text>
          </View>
          <View style={styles.topBtn}>
            <FontAwesome5.Button
              name="cat"
              size={30}
              color="black"
              style={styles.iconStyle}
              backgroundColor="#ffffff"
              onPress={filterByTypeCats}
            />
            <Text style={styles.categoryNames}>Cats</Text>
          </View>
          <View style={styles.topBtn}>
            <MaterialCommunityIcons.Button
              style={styles.iconStyle}
              name="bird"
              size={30}
              color="black"
              backgroundColor="#ffffff"
            />
            <Text style={styles.categoryNames}>Birds</Text>
          </View>
        </View>
      </View>
      <Text>{petsType}</Text>
      <ScrollView>
        <View>
          {sellingPets.map((title, key) => {
            return (
              <View key={title.id}>
                <View style={styles.container}>
                  <View style={styles.eachItem}>
                    <Image
                      style={styles.tinyLogo}
                      source={{
                        uri: title.img,
                      }}
                    />
                  </View>
                  <View style={styles.eachItemDetails}>
                    <View style={styles.itemFullDetails}>
                      <View>
                        <Text style={styles.itemTitle}>{title.name}</Text>
                        <Text style={styles.itemTypePet}>Abyssinian</Text>
                        <Text>{title.age} Years old</Text>
                      </View>
                      <View>
                        <View>
                          {title.gender == 1 ? (
                            <Foundation
                              name="male-symbol"
                              size={24}
                              color="blue"
                            />
                          ) : (
                            <Foundation
                              name="female-symbol"
                              size={24}
                              color="pink"
                            />
                          )}
                        </View>
                        <View>
                          <Button
                            title="more"
                            onPress={() => {
                              // Pass and merge params back to home screen
                              navigation.navigate("selected-item", {
                                petId: title.id,
                                name: title.name,
                                age1: title.age,
                                gender1: title.gender,
                                latitudePass1: title.latitudePass,
                                longitudePass1: title.longitudePass,
                                price1: title.price,
                                category1: title.category,
                                description1: title.description,
                                contactNumber1: title.contactNumber,
                                img1: title.img,
                                date: title.date,
                              });
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    // backgroundColor: "#CCD1F9",
    borderRadius: 20,
    padding: 10,
    margin: 15,
  },
  scrolViewStyle: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  topBtn: {
    width: 70,
    height: 70,
    shadowColor: "#000",
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 5,
    shadowRadius: 1,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 15,
    elevation: 30,
  },
  iconStyle: {
    textAlign: "center",
    marginTop: 5,
  },
  categoryNames: {
    marginLeft: 8,
    marginTop: 15,
    fontWeight: "bold",
  },
  eachItem: {
    width: "40%",
    height: 135,
    elevation: 20,
    shadowColor: "#52006A",
    backgroundColor: "transparent",
    padding: 10,
    // borderRadius: 10,
    alignItems: "center",
  },
  eachItemDetails: {
    width: "60%",
    height: 100,
    elevation: 20,
    shadowColor: "#52006A",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    display: "flex",
  },
  mainContainer: {
    backgroundColor: "#EFF0F9",
  },
  tinyLogo: {
    width: 125,
    height: 125,
    padding: 10,
    elevation: 50,
    shadowColor: "#0000",
    borderRadius: 10,
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#5F5F61",
    paddingBottom: 5,
  },
  itemFullDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  itemTypePet: {
    color: "#5F5F61",
    paddingBottom: 5,
  },
});
