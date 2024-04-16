export type Coordinate = {
  latitude: number
  longitude: number
}

// 1 radian is equal to PI/180 radians
export const toRadians = (degrees: number) => {
  return degrees * Math.PI / 180;
}

// Calculate the distance between two coordinates using the Haversine formula
// Formula for distance between two points borrowed from:
// https://en.wikipedia.org/wiki/Haversine_formula
// https://www.movable-type.co.uk/scripts/latlong.html
export const haversineDistance = (coords1: Coordinate, coords2: Coordinate) => {
  // https://en.wikipedia.org/wiki/Earth_radius
  // A globally-average value is usually considered to be 6,371
  const earthRadiusInKm = 6371;

  const differenceInLatitude = toRadians(coords2.latitude - coords1.latitude);
  const differenceInLongitue = toRadians(coords2.longitude - coords1.longitude);

  const lattitudeInRadianCoords1 = toRadians(coords1.latitude);
  const lattitudeInRadianCoords2 = toRadians(coords2.latitude);
  const haversineFunction = (theta: number ) => Math.sin(theta / 2) * Math.sin(theta / 2);
  
  const a = haversineFunction(differenceInLatitude) +
    haversineFunction(differenceInLongitue) * Math.cos(lattitudeInRadianCoords1) * Math.cos(lattitudeInRadianCoords2); 
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  
  return earthRadiusInKm * c;
}
