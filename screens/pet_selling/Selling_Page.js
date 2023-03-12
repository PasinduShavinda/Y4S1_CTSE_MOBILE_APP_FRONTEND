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
// import Item from "../../components/pet_selling/Item";
import { Foundation } from "@expo/vector-icons";
import { get_all_pets } from "../../services/pet_selling/selling_service";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    img: "https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg",
    address: "No 2, Road Galle",
    age: 2,
    gender: 1,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    img: "https://guidedogs.com.au/wp-content/uploads/2021/01/Two-Gold-St-Kilda-610x525-lqip.jpg",
    address: "No 2, Road Galle",
    age: 2,
    gender: 0,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    img: "https://media.npr.org/assets/img/2017/10/12/gettyimages-742252833_custom-fe7325ac21c8d2cdf29b8e079c246c8c70847137-s1100-c50.jpg",
    address: "No 2, Road Galle",
    age: 2,
    gender: 0,
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28bh",
    title: "First Item",
    img: "https://cdn.britannica.com/16/234216-050-C66F8665/beagle-hound-dog.jpg",
    address: "No 2, Road Galle",
    age: 2,
    gender: 1,
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f64",
    title: "Second Item",
    img: "https://d2kl333iheywy2.cloudfront.net/assets/main/lab-hero-square-1fe2f13fa943105fe2c521df43eeb11c.jpg",
    address: "No 2, Road Galle",
    age: 2,
    gender: 1,
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d75",
    title: "Third Item",
    img: "https://irishtherapydogs.ie/wp-content/uploads/2021/09/Lucy-Sharon-scaled-600x579.jpg",
    address: "No 2, Road Galle",
    age: 2,
    gender: 1,
  },
];

export default function Selling_Page({ navigation, route }) {
  const [sellingPets, setsellingPets] = useState([]);

  useEffect(() => {
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
  return (
    <View style={styles.mainContainer}>
      <SearchBar
        placeholder="Search Here..."
        lightTheme
        round
        autoCorrect={false}
      />
      <View>
        <View style={styles.container}>
          <View style={styles.topBtn}>
            <FontAwesome5.Button
              style={styles.iconStyle}
              name="dog"
              size={30}
              color="black"
              backgroundColor="#ffffff"
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
      <ScrollView>
        <View>
          {DATA.map((title, key) => {
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
                        <Text style={styles.itemTitle}>{title.title}</Text>
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
                              navigation.navigate({
                                name: "selected-item",
                                params: { id: title.id },
                                merge: true,
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
