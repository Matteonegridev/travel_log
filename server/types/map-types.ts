type IdLabel = {
  id: number;
  label: string;
};

export type MapPin = IdLabel & LatLong;

export type LatLong = {
  lat: number;
  long: number;
};

export type Links = {
  href: string;
  icon: string;
} & IdLabel;
