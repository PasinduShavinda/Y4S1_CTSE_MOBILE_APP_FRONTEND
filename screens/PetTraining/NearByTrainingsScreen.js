import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";
import Screen from "../../components/PetTraining/common/Screen";
import routes from "../../navigation/PetTraining/routes";
import colors from "../../utils/colors";
export default function NearByTrainingsScreen({ route, navigation }) {
  const { data } = route.params;
  console.log("DATA:", data);
  const nearbyLocations = data.nearbyLocations;
  const currentLocation = data.currentLocation;

  function distance(lat1, lng1, lat2, lng2) {
    const earthRadius = 6371; // in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance; // in kilometers
  }
  return (
    <Screen>
      <View>
        <MapView
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}
        >
          {nearbyLocations.map((item) => (
            <Marker
              key={item.location.latitude + item.location.longitude}
              coordinate={{
                latitude: item.location.latitude,
                longitude: item.location.longitude,
              }}
              title="Location"
              description={`Distance: ${distance(
                currentLocation.latitude,
                currentLocation.longitude,
                item.location.latitude,
                item.location.longitude
              ).toFixed(2)} KM.  Tap to Display`}
              onCalloutPress={() =>
                navigation.navigate(routes.ITEMTOPNAV, { item })
              }
            >
              <View>
                <Image style={styles.img} source={{ uri: item.images[0] }} />
                <Text>hellow</Text>
              </View>
            </Marker>
          ))}
        </MapView>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  map: { height: "99%", width: "99%", marginBottom: 10 },
  img: {
    width: 60,
    height: 60,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
});
