export interface UsersResponse {
  results: User[];
  info: Info;
}

export interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}

export interface User {
  gender: (typeof Gender)[keyof typeof Gender];
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: Dob;
  registered: Dob;
  phone: string;
  cell: string;
  id: ID;
  picture: Picture;
  nat: string;
}

export interface Dob {
  date: Date;
  age: number;
}

export const Gender = {
  Female: "female",
  Male: "male"
} as const;

export interface ID {
  name: string;
  value: null | string;
}

export interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number | string;
  coordinates: Coordinates;
  timezone: Timezone;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface Street {
  number: number;
  name: string;
}

export interface Timezone {
  offset: string;
  description: string;
}

export interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

export interface Name {
  title: (typeof Title)[keyof typeof Title];
  first: string;
  last: string;
}

export const Title = {
  MS: "Ms",
  Madame: "Madame",
  Mademoiselle: "Mademoiselle",
  Miss: "Miss",
  Monsieur: "Monsieur",
  Mr: "Mr",
  Mrs: "Mrs"
} as const;

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export const SORT_BY = {
  NONE: "none",
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  COUNTRY: "country"
} as const;

export type SortBy = (typeof SORT_BY)[keyof typeof SORT_BY];
