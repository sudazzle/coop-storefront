'use client';

import axios from 'axios';
import { Coordinate, haversineDistance, sortStoresByDistance } from '@/app/lib/distance';
import { SortingButtons } from './components/SortingButtons';
import { useEffect, useState } from 'react';
import { SortingOrder, Store, StoreByLocation } from '@/app/types';
import { StoreList } from './components/StoreList';

async function getData() {
  const res = await axios.get('/api/get-stores');
  return res.data as StoreByLocation;
}

export default function Home() {
  const [userLocation, setUserLocation] = useState<Coordinate>();
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    getData().then((data) => {
      setStores(data.Stores);

      if (data.Location) {
        setUserLocation({ latitude: data.Location.Latitude, longitude: data.Location.Longitude });
      }

    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="text-center text-black p-5">Lasting...</div>;
  }

  const onSort = (sortOrder: SortingOrder) => {
    const sortedStores = sortStoresByDistance(stores, userLocation!, sortOrder);
    setStores(sortedStores);
  }

  return (
    <main>
      <h1 className="bg-slate-50 p-4 font-semibold text-center text-xl">Våre Butikker</h1>
      <div className="flex justify-center gap-3 p-4">
        {
          userLocation &&
          <SortingButtons onSort={onSort} />
        }
      </div>
      <StoreList stores={stores} />
    </main>
  );
}
