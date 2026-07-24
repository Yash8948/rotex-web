"use client";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

type Pin = { name: string; coordinates: [number, number] };

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const pins: Pin[] = [
  { name: "United Kingdom", coordinates: [-2.5, 54.5] },
  { name: "Netherlands", coordinates: [5.29, 52.13] },
  { name: "UAE", coordinates: [54.3, 23.9] },
  { name: "Saudi Arabia", coordinates: [45.08, 23.89] },
  { name: "India", coordinates: [78.96, 20.59] },
  { name: "Malaysia", coordinates: [101.98, 4.21] },
];

export default function TrustedWorldMap() {
  return (
    <ComposableMap
      projection="geoOrthographic"
      projectionConfig={{ scale: 480, rotate: [-55, -18, 0] }}
      className="w-full h-full"
    >
      <Geographies geography={GEO_URL}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#E4E4E7"
              stroke="#FFFFFF"
              strokeWidth={0.75}
              style={{
                default: { outline: "none" },
                hover: { outline: "none", fill: "#D4D4D8" },
                pressed: { outline: "none" },
              }}
            />
          ))
        }
      </Geographies>

      {pins.map((pin) => (
        <Marker key={pin.name} coordinates={pin.coordinates}>
          <circle r={5} fill="#EF3E23" stroke="#fff" strokeWidth={1.5} />
          <foreignObject x={-70} y={-30} width={140} height={20} className="pointer-events-none overflow-visible">
            <div className="flex justify-center">
              <span className="whitespace-nowrap rounded bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold font-montserrat text-red-600">
                {pin.name}
              </span>
            </div>
          </foreignObject>
        </Marker>
      ))}
    </ComposableMap>
  );
}
