
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type InteractiveMapProps = {
  city: string;
  neighborhood: string;
  isLoading: boolean;
};

const getMapboxCoords = async (city: string, neighborhood: string, mapboxToken: string) => {
  const query = encodeURIComponent(`${neighborhood}, ${city}, India`);
  const resp = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxToken}&limit=1`
  );
  if (!resp.ok) throw new Error("Failed to fetch coordinates");
  const data = await resp.json();
  if (
    data &&
    data.features &&
    data.features.length > 0 &&
    data.features[0].center
  ) {
    return {
      lng: data.features[0].center[0],
      lat: data.features[0].center[1],
      place: data.features[0].place_name,
    };
  } else {
    throw new Error("Location not found");
  }
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  city,
  neighborhood,
  isLoading,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [coords, setCoords] = useState<{ lng: number; lat: number; place: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tokenInput, setTokenInput] = useState<string>("");

  // Reset map and coords when location or token changes
  useEffect(() => {
    setCoords(null);
    setError(null);
  }, [city, neighborhood, mapboxToken]);

  // Fetch coordinates when all required info is present
  useEffect(() => {
    if (!mapboxToken || !city || !neighborhood || isLoading) return;
    getMapboxCoords(city, neighborhood, mapboxToken)
      .then(setCoords)
      .catch((e) => setError(e.message || "Error retrieving location"));
  }, [city, neighborhood, isLoading, mapboxToken]);

  // Initialize map when coords become available
  useEffect(() => {
    if (!coords || !mapboxToken) return;
    if (!mapContainer.current) return;

    // Remove previous map instance
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    mapboxgl.accessToken = mapboxToken;
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [coords.lng, coords.lat],
      zoom: 13,
    });

    // Add navigation controls
    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add marker for location
    new mapboxgl.Marker({ color: "#2563eb" }) // blue-600
      .setLngLat([coords.lng, coords.lat])
      .setPopup(
        new mapboxgl.Popup().setHTML(`<strong>${coords.place}</strong>`)
      )
      .addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [coords, mapboxToken]);

  // Render: show map if all info present
  if (!city || !neighborhood) {
    return (
      <div className="w-full h-[280px] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800/50 rounded-lg">
        <p className="text-neutral-500 dark:text-neutral-300">
          Enter property details to see location on map.
        </p>
      </div>
    );
  }

  if (!mapboxToken) {
    return (
      <Card className="mb-2 p-3 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-900">
        <CardContent>
          <div className="flex flex-col gap-2">
            <Label htmlFor="mapbox-token" className="text-blue-700 dark:text-blue-200">
              Enter your Mapbox public token to enable interactive map:
            </Label>
            <Input
              id="mapbox-token"
              className="mt-1"
              type="password"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="Paste your Mapbox public token here"
            />
            <Button
              type="button"
              variant="default"
              className="mt-2"
              size="sm"
              onClick={() => setMapboxToken(tokenInput)}
              disabled={!tokenInput}
            >
              Enable Map
            </Button>
            <a
              href="https://account.mapbox.com/access-tokens/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 underline dark:text-blue-300 mt-2"
            >
              Get your free Mapbox public token
            </a>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[280px] flex flex-col items-center justify-center bg-red-100 dark:bg-red-900/50 rounded-lg">
        <p className="text-red-600 dark:text-red-300">
          {error}
        </p>
        <Button className="mt-2" size="sm" variant="outline" onClick={() => setMapboxToken("")}>
          Change Mapbox Token
        </Button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[280px] rounded-lg overflow-hidden shadow">
      <div className="absolute left-4 top-3 bg-white/70 dark:bg-black/70 z-10 rounded flex items-center px-3 py-1 text-sm font-medium gap-1 text-blue-800 dark:text-blue-300">
        <MapPin size={18} className="mr-1" />
        {coords?.place}
      </div>
      <div ref={mapContainer} className="w-full h-full rounded-lg" />
    </div>
  );
};

