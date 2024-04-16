import { haversineDistance, Coordinate } from '../distance';

describe('haversineDistance', () => {
  it('should calculate the distance between two coordinates', () => {
    const coords1: Coordinate = { latitude: 52.520008, longitude: 13.404954 };
    const coords2: Coordinate = { latitude: 48.8566, longitude: 2.3522 };

    const distance = haversineDistance(coords1, coords2);

    expect(distance).toBeCloseTo(877.4608, 4);
  });
});
