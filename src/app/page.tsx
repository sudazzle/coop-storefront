'use client';

import axios from 'axios';
import { Address } from '@/app/icons/Address';
import { Phone } from '@/app/icons/Phone';
import { Coordinate, haversineDistance } from '@/app/lib/distance';
import { SortingButtons } from './components/SortingButtons';
import { useEffect, useState } from 'react';
import { SortingOrder } from './types';

type OpeningHour = {
  Day: number
  Open: string
  Close: string
}

type Store = {
  StoreId: string
  Name: string
  Chain: string
  ChainClassName: string
  ChainId: string
  IsEcommerce: boolean
  NewspaperUrl: string
  ChainImage: string
  InStoreServices: string
  Lat: number
  Lng: number
  OpeningHoursToday: string
  OpenNow: boolean
  Phone: string
  Address: string
  City: string
  Distance: number
  Email: string
  SLag: string
  OrganizationNumber: string
  SpecialOpeningHours: string[]
  OpeningHours: OpeningHour[]
  AdditionalInformation: unknown
}

type StoreByLocation = {
  Location: { Bounds: null, Longitude: number, Latitude: number }
  Stores: Store[]
  AdditionalStores: Store[]
  InfoMessage?: string
}

const sortStoresByDistance = (stores: Store[], currentLocation: Coordinate, sortOrder: SortingOrder) => {
  const clone = [...stores];
  return clone.sort((a, b) => {
    const distanceA = haversineDistance(currentLocation, {latitude: a.Lat, longitude: a.Lng});
    const distanceB = haversineDistance(currentLocation, {latitude: b.Lat, longitude: b.Lng});
    console.log(distanceA - distanceB)
    console.log(distanceB - distanceA)

    if (sortOrder === SortingOrder.ASC) {
      return distanceA - distanceB;
    } else {
      return distanceB - distanceA;
    }
  });

  return clone;
}

async function getData() {
  const res = await axios.get('/api/get-stores');
  return res.data as StoreByLocation;
}

const StoreOpenStatus: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <span className={
      `text-sm rounded-md py-1 px-3 ${open ? 'bg-green-400 text-white' : 'bg-red-500 text-red-600'}`
    }>
      {open ? 'Åpent' : 'Stengt'}
    </span>
  );
}

export default function Home() {
  const [userLocation, setUserLocation] = useState<Coordinate>();
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    getData().then((data) => {
      setStores(data.Stores);
      setUserLocation({ latitude: data.Location.Latitude, longitude: data.Location.Longitude });
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="text-center text-black p-5">Lasting...</div>;
  }

  const onSort = (sortOrder: SortingOrder) => {
    if (!userLocation) return;

    const sortedStores = sortStoresByDistance(stores, userLocation, sortOrder);
    setStores(sortedStores);
  }

  return (
    <main>
      <h1 className="bg-slate-50 p-4 font-semibold text-center text-xl">Våre Butikker</h1>
      <div className="flex justify-center gap-3 p-4">
        <SortingButtons onSort={onSort} />
      </div>
      <ul className="flex mt-5 justify-center flex-wrap gap-4">
        {stores.map((store) => (
          <li className="w-[90%] sm:w-[45%] md:w-[32%] rounded-2xl block p-5 bg-[#EFEFE9]" key={store.StoreId}>
            <h3 className="font-medium mb-3">{store.Chain}, {store.City}</h3>
            <p className="text-sm gap-1 text-gray-500 flex items-center">
              <span><Address /></span>
              <span>{ store.Address }</span>
            </p>
            <p className="text-sm gap-1 text-gray-500 flex items-center">
              <span><Phone /></span>
              <span>{ store.Phone }</span>
            </p>
            <p className="mt-5 text-sm">
              <StoreOpenStatus open={store.OpenNow} />
              <span className="pl-4 text-gray-500">{store.OpeningHoursToday}</span>
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
