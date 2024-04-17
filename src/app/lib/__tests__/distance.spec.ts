import { SortingOrder, Store } from '@/app/types';
import { haversineDistance, Coordinate, sortStoresByDistance } from '../distance';

describe('haversineDistance', () => {
  it('should calculate the distance between two coordinates', () => {
    const coords1: Coordinate = { latitude: 52.520008, longitude: 13.404954 };
    const coords2: Coordinate = { latitude: 48.8566, longitude: 2.3522 };

    const distance = haversineDistance(coords1, coords2);

    expect(distance).toBeCloseTo(877.4608, 4);
  });
});

describe('test storesInAscendingOrder', () => {
  const storesInAscendingOrder = [
    { Lat: 59.964614945757944, Lng: 10.87906643137481 },
    { Lat: 59.96793468183689, Lng: 10.89924293765493 },
    { Lat: 59.94470828694738, Lng: 10.900908640754215 },
    { Lat: 59.93197194496434, Lng: 10.884917284083983 },
    { Lat: 59.528597419725294, Lng: 10.768514666048064 }
  ] as Store[];

  const storesInDescendingOrder = [...storesInAscendingOrder].reverse();
  
  const currentLocation: Coordinate = {
    latitude: 59.965855428374695,
    longitude: 10.881469690644419,
  };

  const unSortedStores = [
    storesInAscendingOrder[3],
    storesInAscendingOrder[1],
    storesInAscendingOrder[4],
    storesInAscendingOrder[0],
    storesInAscendingOrder[2]
  ];

  it('sorts stores by ascending distance', () => {
    const sortedStores = sortStoresByDistance(unSortedStores, currentLocation, SortingOrder.ASC);
    expect(sortedStores).toEqual(storesInAscendingOrder);
  });

  it('sorts stores by descending distance', () => {
    const sortedStores = sortStoresByDistance(unSortedStores, currentLocation, SortingOrder.DESC);
    expect(sortedStores).toEqual(storesInDescendingOrder);
  });
});
