import React from "react";
import routes from "../../../navigation/PetTraining/routes";
import { Text, View, Image, TouchableHighlight, StyleSheet, ScrollView, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function AdminDash({ navigation }) {

  return (
    <ScrollView>
      <View>
      <MaterialCommunityIcons
            name="logout"
            size={40}
            onPress={() => {
              Alert.alert("Sign Out", "Are you sure want  Logout?", [
                {
                  text: "Logout",
                  onPress: () => navigation.navigate(routes.LOGIN),
                },
                {
                  text: "Cancel",
                  onPress: () => {},
                },
              ]);
            }}
          />
      </View>
      <View>
        <TouchableHighlight style={{
          marginTop: 20,
          backgroundColor: "#dfddea",
          height: 260,
          width: 310,
          elevation: 2,
          borderRadius: 10,
          padding: 15,
          marginRight: 30,
          marginLeft: 37,
          marginBottom: 5
        }} onPress={() => navigation.navigate('AdminAddDoc')}>
          <View style={{ alignItems: 'center' }}>
            <Image style={styles.categoriesPhoto} source={{ uri: 'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/512x512/shadow/users3_add.png' }} />
            <Text>ADD VETS</Text>
            <Text style={styles.categoriesInfo}>Click here to add vets to the system</Text>
          </View>
        </TouchableHighlight>
      </View>
      <View style={{ marginTop: 67 }}>
        <TouchableHighlight style={{
          marginTop: 30,
          backgroundColor: "#dfddea",
          height: 260,
          width: 310,
          elevation: 2,
          borderRadius: 10,
          padding: 15,
          marginRight: 30,
          marginLeft: 37,
          marginBottom: 5
        }} onPress={() => navigation.navigate('AdminViewDoc')}>
          <View style={{ alignItems: 'center' }}>
            <Image style={styles.categoriesPhoto} source={{ uri: 'https://cdn.create.vista.com/api/media/small/218007348/stock-photo-happy-male-doctor-stethoscope-neck' }} />
            <Text>VIEW VETS</Text>
            <Text style={styles.categoriesInfo}>Click here to view vets</Text>
          </View>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoriesItemContainer: {
    flex: 2,
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 215,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  categoriesPhoto: {
    width: 180,
    height: 160,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: 'blue',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 1
  },
  categoriesName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 20
  },
  categoriesInfo: {
    marginTop: 1,
    marginBottom: 5
  }
});
