export enum SortingOrder {
  ASC = 'asc',
  DESC = 'desc'
}

export type OpeningHour = {
  Day: number
  Open: string
  Close: string
}

export type Store = {
  StoreId: string
  Name: string
  Chain: string
  ChainClassName: string
  ChainId: string
  IsEcommerce: boolean
  NewspaperUrl: string
  ChainImage: string
  InStoreServices: string[]
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

export type StoreByLocation = {
  Location: { Bounds: null, Longitude: number, Latitude: number }
  Stores: Store[]
  AdditionalStores: Store[]
  InfoMessage?: string
}