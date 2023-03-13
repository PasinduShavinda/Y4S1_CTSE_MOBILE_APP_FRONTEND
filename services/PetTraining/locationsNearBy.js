const locations = [
  { latitude: 37.7749, longitude: -122.4194 },
  { latitude: 37.7831, longitude: -122.4039 },
  { latitude: 37.7875, longitude: -122.3964 },
  // add more locations here
];
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

const nearbyLocations = locations.filter(
  (location) =>
    distance(currentLat, currentLng, location.latitude, location.longitude) <=
    20
);
<MapView style={styles.map}>
  {nearbyLocations.map((location) => (
    <Marker
      key={location.latitude + location.longitude}
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
      }}
      title="Location"
      description={`Distance: ${distance(
        currentLat,
        currentLng,
        location.latitude,
        location.longitude
      ).toFixed(2)} km`}
    />
  ))}
</MapView>;
