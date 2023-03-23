import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  TouchableHighlight,
  RefreshControl,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Screen from "../../components/PetTraining/common/Screen";
import { auth, db } from "../../database/firebaseConfig";
import { currentUser } from "../../services/PetTraining/userService";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import routes from "../../navigation/PetTraining/routes";
import colors from "../../utils/colors";
import {
  getAllTrainings,
  getAllTrainingsByUserSub,
  getAllTrainingsSub,
} from "../../services/PetTraining/trainingService";
import ItemsRow from "../../components/PetTraining/ItemsRow";
import { onValue, ref } from "firebase/database";
import ProflePicUploadDialogBody from "../../components/PetTraining/ProflePicUploadDialogBody";
import generatePDF from "../../services/Vet/PDF_Generator";
import generatepdf from "../../services/PetTraining/pdfGenerator";
import AppButton from "../../components/PetTraining/common/AppButton";

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState({});
  const [listings, setListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getCurrentUser();
    getAllTrainingsByUserSub(setListings);
    getAll();
  }, []);
  async function getCurrentUser() {
    const cUser = currentUser();
    setUser(cUser);
  }
  const getAll = () => {
    setRefreshing(false);
  };

  const signOut = async () => {
    await auth
      .signOut()
      .then(() => {
        setTimeout(() => {
          navigation.navigate(routes.LOGIN);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getCurrentUser();
    getAllTrainingsByUserSub(setListings);
    getAll();
  }, []);

  const openDialog = () => {
    setModalVisible(true);
  };

  const closeDialog = () => {
    setModalVisible(false);
  };
  const handleGeneratePDF = async () => {
    await generatepdf(listings);
  };
  return (
    <Screen>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.user}>
          <TouchableOpacity onPress={openDialog}>
            <Image
              style={styles.avatar}
              source={
                user.dp !== "null"
                  ? { uri: user.dp }
                  : require("../../assets/avatar.png")
              }
            />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{user.name}</Text>
            <Text>Edit </Text>
          </View>
          <MaterialCommunityIcons
            name="logout"
            size={40}
            onPress={() => {
              Alert.alert("Sign Out", "Are you sure want sign out?", [
                {
                  text: "Sign Out",
                  onPress: () => signOut(),
                },
                {
                  text: "Cancel",
                  onPress: () => {},
                },
              ]);
            }}
          />
        </View>
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeDialog}
        >
          <ProflePicUploadDialogBody onClose={closeDialog} user={user} />
        </Modal>
        {/* end of upper section */}
        <View style={styles.addListings}>
          <Text style={styles.secHeading}>Add New Listings</Text>
          <View style={styles.itemRow}>
            <TouchableHighlight
              underlayColor={colors.lightPurple}
              onPress={() => navigation.navigate(routes.ADDTRAINING)}
            >
              <View style={styles.itemwithText}>
                <Image
                  style={styles.item}
                  source={require("../../assets/training.png")}
                />
                <Text style={styles.itemText}>Training</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight>
              <View style={styles.itemwithText}>
                <Image style={styles.item} />
                <Text style={styles.itemText}>Sitting</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={colors.lightPurple}
              onPress={() => navigation.navigate("new-pets")}
            >
              <View style={styles.itemwithText}>
                <Image
                  style={styles.item}
                  source={require("../../assets/selling.png")}
                />
                <Text style={styles.itemText}>Selling</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              underlayColor={colors.lightPurple}
              onPress={() => navigation.navigate("CustHome")}
            >
              <View style={styles.itemwithText}>
                <Image
                  style={styles.item}
                  source={require("../../assets/vet.jpg")}
                />
                <Text style={styles.itemText}>VET</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.myListings}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 10,
            }}
          >
            <Text style={styles.secHeading}>My Listings</Text>
            <AppButton style={styles.pdf} title="Generate PDF" onPress={handleGeneratePDF} />
          </View>
          <ItemsRow listings={listings} navigation={navigation} />
        </View>
        <Button
          title="owner items"
          onPress={() => {
            navigation.navigate("owner-items");
          }}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  user: {
    flexDirection: "row",
    borderWidth: 1,
    alignItems: "center",
    borderColor: colors.white,
    borderWidth: 1,
    marginBottom: 30,
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 8,
    shadowColor: colors.secondary,
  },
  avatar: {
    flex: 0.4,
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.secondary,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  addListings: {
    borderColor: colors.white,
    borderWidth: 1,
    marginBottom: 30,
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 8,
    shadowColor: colors.secondary,
    paddingBottom: 20,
  },
  secHeading: {
    fontSize: 18,
    fontWeight: "bold",
    paddingLeft: 10,
    color: colors.secondary,
  },
  pdf: {
    width: 130,
    height: 35,
    
  },
  itemRow: {
    flexDirection: "row",
    marginTop: 7,
  },
  itemwithText: {
    flexDirection: "column",
    alignItems: "center",
  },
  itemText: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: -8,
    color: colors.secondary,
  },
  item: {
    width: 80,
    height: 80,
    borderColor: colors.primary,
    borderWidth: 3,
    borderRadius: 50,
    margin: 8,
  },
  myListings: {
    borderColor: colors.white,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    elevation: 8,
    shadowColor: colors.secondary,
  },
});
