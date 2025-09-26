type IdLabel = {
  id: number;
  label: string;

};
export type LatLong = {
  lat: number;
  long: number;
};

export type MapPin = IdLabel & LatLong;

export type Links = {
  href: string;
  icon: string;
} & IdLabel;
