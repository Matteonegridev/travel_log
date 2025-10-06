import type { MapPin } from "~~/server/types/map-types";

export function useMapBounds() {
  async function mapBounds(
    map: any,
    getCoords: MapPin[],
    draggablePoint?: MapPin | null,
  ) {
    const { LngLatBounds } = await import("maplibre-gl");

    effect(() => {
      const firstPoint = getCoords[0];
      if (!firstPoint)
        return;

      // se c'e una sola location:
      if (getCoords.length === 1) {
        const points = getCoords[0];
        if (!points)
          return;
        map.map?.flyTo({ center: [points?.long, points?.lat], zoom: 12, padding: 60 });
      }
      else {
        if (draggablePoint)
          return;
        const bounds = getCoords.reduce((bounds, coordinates) => {
          return bounds.extend([coordinates.long, coordinates.lat]);
        }, new LngLatBounds([firstPoint.long, firstPoint.lat], [firstPoint.long, firstPoint.lat]));

        map.map?.fitBounds(bounds, { padding: 60 });
      }
    });
  }
  return { mapBounds };
}
