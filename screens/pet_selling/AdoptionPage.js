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
import MapView, { Marker } from "react-native-maps";

export default function AdoptionPage({ navigation, route }) {
  const { petId, latitudePass1, longitudePass1, contactNumber1 } = route.params;

  const ownerLocation = {
    latitude: latitudePass1,
    longitude: longitudePass1,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  return (
    <View style={styles.containerStyle}>
      <View>
        {/* <Text>Contact Details{route.params?.id}</Text> */}
        <Text style={styles.contactTitleDetails}>Owner Contact Details</Text>
      </View>
      <View style={styles.contactDetails}>
        <View>
          <Text>Contact number: {contactNumber1}</Text>
        </View>
      </View>
      <View>
        <MapView
          style={styles.map}
          initialRegion={ownerLocation} //your region data goes here.
        >
          {/*Make sure the Marker component is a child of MapView. Otherwise it won't render*/}
          <Marker coordinate={ownerLocation} />
        </MapView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  contactDetails: {
    padding: 10,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
    elevation: 20,
    shadowColor: "#000",
  },
  containerStyle: {
    backgroundColor: "aliceblue",
  },
  contactTitleDetails: {
    fontSize: 22,
    color: "purple",
    margin: 10,
    textAlign: "center",
  },
});
