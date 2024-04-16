import React from 'react';
import { Address } from '@/app/icons/Address';
import { Phone } from '@/app/icons/Phone';
import { Store } from '@/app/types';

export const StoreOpenStatus: React.FC<{ open: boolean }> = ({ open }) => {
  return (
    <span className={
      `text-sm rounded-md py-1 px-3 ${open ? 'bg-green-400 text-white' : 'bg-red-500 text-red-600'}`
    }>
      {open ? 'Åpent' : 'Stengt'}
    </span>
  );
}

export const StoreCard: React.FC<{ store: Store }> = ({ store }) => {
  return (
    <li className="w-[90%] sm:w-[45%] md:w-[32%] rounded-2xl block p-5 bg-[#EFEFE9]">
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
  );
}

export const StoreList: React.FC<{ stores: Store[] }> = ({ stores }) => {
  return (
    <ul className="flex mt-5 justify-center flex-wrap gap-4">
      {stores.map((store) => (
        <StoreCard key={store.StoreId} store={store} />
      ))}
    </ul>
  );
}