import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { Coordinate } from '@/app/lib/distance';
import { SortingOrder, Store } from '@/app/types';
import Home, { sortStoresByDistance } from '../page';
import { act } from 'react-dom/test-utils';
import { stores } from '@/app/test-data/store';

jest.useFakeTimers();
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
describe('Home', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders page after loading state', async () => {
    mockedAxios.get.mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          return resolve({ data: { Stores: stores, Location: { Latitude: 0, Longitude: 0 } } });
        }, 1000);
      });
    })
    await act(() => render(<Home />));
    await waitFor(() => expect(screen.getByText('Lasting...')).toBeInTheDocument());
    expect(screen.queryByText('Våre Butikker')).not.toBeInTheDocument();
    await act(() => jest.runOnlyPendingTimers());
    expect(screen.queryByText('Våre Butikker')).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.getAllByRole('listitem').length).toBe(stores.length);
  });

  it('sorts stores by ascending distance', async () => {
    mockedAxios.get.mockResolvedValue({ data: { Stores: stores, Location: { Latitude: 0, Longitude: 0 } } });
    await act(() => render(<Home />));
    await act(() => {
      const sortButton = screen.getByText('Sorter etter Nærmeste');
      sortButton.click();
    });
    const sortedStores = sortStoresByDistance(stores, { latitude: 0, longitude: 0 }, SortingOrder.ASC);
    expect(screen.getAllByRole('listitem').length).toBe(stores.length);
    sortedStores.forEach((store, index) => {
      expect(screen.getAllByRole('listitem')[index]).toHaveTextContent(`${store.Chain}, ${store.City}`);
    });
  });

  it('sorts stores by descending distance', async () => {
    mockedAxios.get.mockResolvedValue({ data: { Stores: stores, Location: { Latitude: 0, Longitude: 0 } } });
    await act(() => render(<Home />));
    await act(() => {
      const sortButton = screen.getByText('Sorter etter Fjerneste');
      sortButton.click();
    });
    const sortedStores = sortStoresByDistance(stores, { latitude: 0, longitude: 0 }, SortingOrder.DESC);
    expect(screen.getAllByRole('listitem').length).toBe(stores.length);
    sortedStores.forEach((store, index) => {
      expect(screen.getAllByRole('listitem')[index]).toHaveTextContent(`${store.Chain}, ${store.City}`);
    });
  });

  it('sorting buttons should be hidden current location do not exist', async () => {
    mockedAxios.get.mockResolvedValue({ data: { Stores: stores } });
    await act(() => render(<Home />));
    expect(screen.queryByText('Sorter etter Nærmeste')).not.toBeInTheDocument();
    expect(screen.queryByText('Sorter etter Fjerneste')).not.toBeInTheDocument();
  });
});

describe('test utils', () => {
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