export type MapPin = {
  id: number;
  label: string;
} & LatLong;

export type LatLong = {
  lat: number;
  long: number;
};
