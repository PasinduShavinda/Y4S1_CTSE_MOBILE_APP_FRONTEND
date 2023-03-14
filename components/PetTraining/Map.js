import { View, Text } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";

export default function Map({ location, style }) {
  return (
    <View>
      <MapView
        style={style}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={location} />
      </MapView>
    </View>
  );
}
