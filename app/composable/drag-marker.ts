// import type { MapPin } from "~~/server/types/map-types";

// export function useDragMarker() {
//   const markOnMap = ref(null);
//   const dragMarker = async (
//     map: any,
//     coords: MapPin[],

//   ) => {
//     const { Marker } = await import("maplibre-gl");
//     // const coordinates = document.getElementById("coordinates") as HTMLDivElement;

//     const points = coords[0];
//     if (!points)
//       return;

//     const marker = new Marker({ draggable: true })
//       .setLngLat([points?.long, points?.lat])
//       .addTo(map.map);

//     function onDragEnd() {
//       const lngLat = marker.getLngLat();
//       markOnMap.value?.style.display = "block";
//       markOnMap.value.innerHTML
//             = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
//     }

//     marker.on("dragend", onDragEnd);
//   };
//   return { dragMarker, markOnMap };
// }
