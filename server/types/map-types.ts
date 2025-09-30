export type MapPin = {
  lat: number;
  long: number;
  id: number;
  name: string;
  description: string | null;
};

export type Links = {
  href: string;
  icon: string;
} & MapPin;
