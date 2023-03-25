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
import { React, useState, useEffect } from "react";
import { ListItem, Overlay, SearchBar } from "react-native-elements";
// import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
// import Item from "../../components/pet_selling/Item";
import { Foundation } from "@expo/vector-icons";
import { get_all_pets } from "../../services/pet_selling/selling_service";

var petsType = "Cats";

export default function Selling_Page({ navigation, route }) {
  const [sellingPets, setsellingPets] = useState([]);
  // const [petType, setPetType] = useState("Dog");
  const [searchBar, setSearchBar] = useState("");

  useEffect(() => {
    const mountSellingPets = async () => {
      const data_ = await get_all_pets();
      const array_data = [];
      data_.forEach((response) => {
        array_data.push({ id: response.id, ...response.data() });
      });
      setsellingPets(array_data);
    };
    mountSellingPets();
  }, []);

  const mountSellingPetsAll = async () => {
    const data_ = await get_all_pets();
    const array_data = [];
    data_.forEach((response) => {
      array_data.push({ id: response.id, ...response.data() });
    });
    setsellingPets(array_data);
  };

  const filterByTypeDog = async () => {
    petsType = "Dogs";
    // alert(petsType);
    // const filteredArray =
    const data_Dog = await get_all_pets();
    console.log(">>>>>>>>>>>>>>>>>>>>>>Dog1");
    console.log(data_Dog);
    const array_data_Dog = [];
    data_Dog.forEach((response) => {
      array_data_Dog.push({ id: response.id, ...response.data() });
    });
    // setsellingPets(array_data);
    const data_dog = array_data_Dog.filter(function(item) {
      return item.category == "Dog";
    });
    // alert("");
    // petsType = type;
    console.log(">>>>>>>>>>>>>>>>>>>>>>Dog2");
    console.log(data_dog);
    setsellingPets(data_dog);
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
    const data_Cat = await get_all_pets();
    console.log(">>>>>>>>>>>>>>>>>>>>>>Cat1");
    console.log(data_Cat);
    const array_data_cat = [];
    data_Cat.forEach((response) => {
      array_data_cat.push({ id: response.id, ...response.data() });
    });
    // setsellingPets(array_data_cat);
    const data_cat = array_data_cat.filter(function(item) {
      return item.category == "Cats";
    });
    // alert("");
    // petsType = type;
    console.log(">>>>>>>>>>>>>>>>>>>>>>Cat2");
    console.log(data_cat);
    setsellingPets(data_cat);

    // .filter((item) => item.category === petsType)
  };

  const filterByTypeBirds = async () => {
    // alert(petsType);
    petsType = "Birds";
    // const filteredArray =
    // const data = sellingPets.filter(function (item) {
    //   return item.category == "Dog";
    // });
    // alert("");
    // petsType = type;
    // setsellingPets(data);
    const data__Birds = await get_all_pets();
    console.log(">>>>>>>>>>>>>>>>>>>>>>Birds1");
    console.log(data__Birds);
    const array_data_Birds = [];
    data__Birds.forEach((response) => {
      array_data_Birds.push({ id: response.id, ...response.data() });
    });
    // setsellingPets(array_data_Birds);
    const data_Birds = array_data_Birds.filter(function(item) {
      return item.category == "Birds";
    });
    // alert("");
    // petsType = type;
    console.log(">>>>>>>>>>>>>>>>>>>>>>Birds2");
    console.log(data_Birds);
    setsellingPets(data_Birds);

    // .filter((item) => item.category === petsType)
  };
  const updateSearch = async (search) => {
    setSearchBar(search);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>updateSearch");
    console.log(searchBar);
    const search_data = await get_all_pets();
    console.log(">>>>>>>>>>>>>>>>>>>>>>Birds1");
    console.log(search_data);
    const array_data_Birds = [];
    search_data.forEach((response) => {
      array_data_Birds.push({ id: response.id, ...response.data() });
    });
    // setsellingPets(array_data_Birds);
    const data_Birds = array_data_Birds.filter(function(item) {
      return item.name == searchBar;
    });
    // alert("");
    // petsType = type;
    console.log(">>>>>>>>>>>>>>>>>>>>>>Birds2");
    console.log(data_Birds);
    setsellingPets(data_Birds);
  };

  return (
    <View style={styles.mainContainer}>
      {/* <View style={styles.searchBarComponent}> */}
      <SearchBar
        placeholder="Search Here..."
        lightTheme
        round
        autoCorrect={false}
        onChangeText={updateSearch}
        value={searchBar}
      />
      {/* <FontAwesome5.Button
          style={styles.iconStyle}
          name="dog"
          size={30}
          color="black"
          backgroundColor="#ffffff"
          onPress={filterByTypeDog}
        />
      </View> */}
      <View>
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
              onPress={filterByTypeBirds}
            />
            <Text style={styles.categoryNames}>Birds</Text>
          </View>
          <View style={styles.topBtn}>
            <MaterialIcons.Button
              style={styles.iconStyle}
              name="clear-all"
              size={30}
              color="black"
              backgroundColor="#ffffff"
              onPress={mountSellingPetsAll}
            />
            <Text style={styles.categoryNames}>All</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.scrollMargin}>
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
    marginBottom: 60,
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
  scrollMargin: {
    marginBottom: 40,
    paddingBottom: 100,
  },
  searchBarComponent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
