export type Image = {
  url: string;
};

export type Genre = {
  id: number;
  name: string;
  image: Image;
};

export type TravelSpot = {
  id: number;
  userId: number;
  genreId: number;
  name: string;
  rating: number;
  isNew: boolean;
  images: Image[];
  postcode: string;
  prefectureCode: number;
  addressCity: string;
  addressStreet: string;
  addressBuilding: string;
  fullAddress: string;
  introduction: string;
  access: string;
  phoneNumber: string;
  businessHour: string;
  parking: string;
  homePage: string;
  latitude: number;
  longitude: number;
  reviews: Review[];
  favorites: Favorite[];
};

export type User = {
  id: number;
  email: string;
  password: string;
  passwordConfirmation: string;
  passwordDigest: string;
  name: string;
  sex: string;
  age: number;
  introduction: string;
  profileImage: Image;
  isAdmin: boolean;
  reviews: Review[];
  favorites: Favorite[];
};

export type Review = {
  id: number;
  userId: number;
  travelSpotId: number;
  title: string;
  body: string;
  rating: number;
  images: Image[];
};

export type Favorite = {
  id: number;
  userId: number;
  travelSpotId: number;
};
