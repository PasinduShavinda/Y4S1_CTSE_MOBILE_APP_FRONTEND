import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
// import { firebase } from "../firebase/config";

export default function MapScreen({onSave, style, preLocation}) {
  const [location, setLocation] = useState(null);
  const [marker, setMarker] = useState(null);
  const [markers, setMarkers] = useState(preLocation !== null ? [preLocation ]: []);

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
    }
    

    getCurrentLocation();
  }, []);

  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarker({ latitude, longitude });
  };

  const handleSavePress = () => {
    
    onSave(marker)
    const newMarker = {
      latitude: marker.latitude,
      longitude: marker.longitude,
    };
    console.log(marker)
    setMarkers([]);
    setMarkers([newMarker]);
    setMarker(null);
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={style}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={handleMapPress}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            />
          ))}
          {marker && (
            <Marker
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            />
          )}
        </MapView>
      )}
      <View style={styles.buttonContainer}>
        {marker && (
          <View>
            <Button title="Save" onPress={handleSavePress} />
          </View>
        )}
        {markers.length !==0 && (
          <View style={{marginLeft:10}} >
            <Button title="Clear" onPress={() => {
              setMarkers([])
              setMarker(null)
            }} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    flexDirection:"row"
  },
});
