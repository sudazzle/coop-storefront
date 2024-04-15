import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { storesJson } from './store-json';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get('https://minside.coop.no/StoreService/SearchStores');
    res.status(200).json(response.data);
  } catch (err) {
    return res.status(200).json(storesJson);
  }
}