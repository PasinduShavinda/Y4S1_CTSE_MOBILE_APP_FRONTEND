import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  Button,
  Alert,
  Pressable,
  ScrollView,
} from "react-native";
import { React, useState, useLayoutEffect } from "react";
import { Foundation } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { get_pet_by_id } from "../../services/pet_selling/selling_service";

export default function Selected_item_page({ navigation, route }) {
  const type = true;
  const [liked, setLiked] = useState(true);
  const url_id = route.params?.id;

  function cliedLikeBtn() {
    setLiked(!liked);
  }
  useLayoutEffect(() => {
    const mountSellingPets = async () => {
      console.log("================hhhhhhhhhhhhhh===================");
      const data_ = await get_pet_by_id(url_id);

      console.log(
        "===============data===================>>>>>>>>>>>>>>>>>>>>>>"
      );
      console.log(data_);
    };
    mountSellingPets();
    // console.log(url_data);
  });
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View>
          <Text>itemId: {route.params?.id}</Text>
        </View>

        <View style={styles.imageStyling}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri:
                "https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg",
            }}
          />
        </View>
        <View style={styles.contentStyling}>
          <View style={styles.summeryStyling}>
            <View style={styles.leftTopStyling}>
              <Text style={styles.itemTitle}>Solo</Text>
              <Text style={styles.itemTypePet}>Abyssinian</Text>
            </View>
            <View style={styles.contentStyle}>
              <View>
                {type ? (
                  <Foundation name="male-symbol" size={30} color="blue" />
                ) : (
                  <Foundation name="female-symbol" size={30} color="pink" />
                )}
              </View>
              <Text style={styles.genderStyling}>2 Years old</Text>
            </View>
          </View>
          <View style={styles.fullDetails}>
            <View>
              <View style={styles.row}>
                <View style={styles.profileBox}>
                  <Image
                    source={{
                      uri:
                        "https://kb.rspca.org.au/wp-content/uploads/2018/11/golder-retriever-puppy.jpeg",
                    }}
                    style={styles.profileImage}
                  />
                </View>
                <View style={styles.nameBox}>
                  <Text style={styles.ownerNameStyl}>Jhone</Text>
                  <Text>Owner</Text>
                </View>
                <View style={styles.dateStyle}>
                  <Text style={styles.priceStyle}>8000 LKR</Text>
                  <Text>20/02/2023</Text>
                </View>
              </View>
              <View style={styles.description}>
                <Text>
                  vnsdjvnvnsdjvnvnsdjvnvnsdjvnvnsdjvnvnsdjvnvnsdjvnvnsdjvnvnsdjvnvnsdjvnvnsdjvn
                </Text>
              </View>
              <View style={styles.bottomBtns}>
                <View style={styles.likeBtn}>
                  <Pressable style={styles.button} onPress={cliedLikeBtn}>
                    {liked ? (
                      <Ionicons name="heart-outline" size={36} color="white" />
                    ) : (
                      <Ionicons name="heart-sharp" size={36} color="white" />
                    )}
                  </Pressable>
                </View>
                <View style={styles.adoptionBtn}>
                  <Pressable
                    style={styles.button}
                    onPress={() => {
                      // Pass and merge params back to home screen
                      navigation.navigate({
                        name: "contact-details",
                        params: { id: 1 },
                        merge: true,
                      });
                    }}
                  >
                    <Text style={styles.text}>Adoption</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: "100%",
    height: 400,
    padding: 10,
    elevation: 50,
    shadowColor: "#0000",
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#5F5F61",
    paddingBottom: 5,
    marginTop: 10,
  },
  mainContainer: {
    backgroundColor: "#EFF0F9",
  },
  imageStyling: {
    alignItems: "center",
  },
  summeryStyling: {
    flexDirection: "row",
    backgroundColor: "white",
    marginLeft: 50,
    marginRight: 50,
    height: 100,
    borderRadius: 20,
    marginTop: -30,
    elevation: 30,
    shadowColor: "#000",
    paddingLeft: 15,
    paddingTop: 5,
  },
  contentStyling: {
    backgroundColor: "white",
  },
  contentStyle: {
    backgroundColor: "white",
    marginTop: 10,
    padding: 10,
  },
  itemTypePet: {
    color: "#5F5F61",
    paddingBottom: 0,
    marginTop: 5,
  },
  leftTopStyling: {
    width: "60%",
    paddingLeft: 20,
  },
  genderStyling: {
    marginBottom: 10,
  },
  fullDetails: {
    marginTop: 30,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 5,
  },
  profileBox: {
    paddingLeft: 0,
    paddingTop: 10,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 50,
  },
  nameBox: {
    marginTop: 0,
    padding: 10,
  },
  ownerNameStyl: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 18,
  },
  dateStyle: {
    paddingLeft: "67%",
    marginTop: -60,
  },
  description: {
    padding: 15,
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
  bottomBtns: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 30,
    marginBottom: 30,
  },
  likeBtn: {
    width: "20%",
    marginRight: 20,
    marginLeft: 10,
  },
  adoptionBtn: {
    width: "60%",
    marginLeft: 30,
  },
  priceStyle: {
    fontSize: 22,
    color: "orange",
    fontWeight: "bold",
  },
});
