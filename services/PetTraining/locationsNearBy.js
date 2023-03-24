export function getNearByPlaces(list, currentLocation) {
  function distance(lat1, lng1, lat2, lng2) {
    const earthRadius = 6371;
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
    return distance;
  }

  const nearbyLocations = list.filter(
    (item) =>
      distance(
        currentLocation.latitude,
        currentLocation.longitude,
        item.location.latitude,
        item.location.longitude
      ) <= 20
  );
  return nearbyLocations;
}
