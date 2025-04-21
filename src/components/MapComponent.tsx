
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { map } from "lucide-react";

interface MapComponentProps {
  city: string;
  neighborhood: string;
  isLoading: boolean;
}

export const MapComponent = ({ city, neighborhood, isLoading }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!city || !neighborhood || isLoading) return;
    
    // In a real implementation, this would use a mapping API like Google Maps or Mapbox
    // For this demo, we're just showing a placeholder
    
    const mapElement = mapRef.current;
    if (!mapElement) return;
    
    // Clear previous content
    mapElement.innerHTML = '';
    
    // Create map placeholder with location info
    const mapPlaceholder = document.createElement('div');
    mapPlaceholder.className = 'w-full h-full flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-lg';
    
    const iconContainer = document.createElement('div');
    iconContainer.className = 'p-4 rounded-full bg-blue-100 dark:bg-blue-800 mb-3';
    
    // Add styling for the placeholder
    mapElement.style.minHeight = '250px';
    
    // Add location text
    const locationText = document.createElement('p');
    locationText.className = 'text-lg font-medium text-neutral-800 dark:text-neutral-200';
    locationText.textContent = `${neighborhood}, ${city}`;
    
    const subText = document.createElement('p');
    subText.className = 'text-sm text-neutral-600 dark:text-neutral-400 mt-1';
    subText.textContent = 'Property Location';
    
    mapPlaceholder.appendChild(iconContainer);
    mapPlaceholder.appendChild(locationText);
    mapPlaceholder.appendChild(subText);
    
    mapElement.appendChild(mapPlaceholder);
    
  }, [city, neighborhood, isLoading]);
  
  return (
    <Card className="w-full shadow-subtle bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700 animate-slide-up">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
          <map className="h-5 w-5" />
          Property Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          ref={mapRef} 
          className="w-full min-h-[250px] rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
        >
          {(!city || !neighborhood || isLoading) ? (
            <div className="w-full h-full min-h-[250px] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800/50">
              <p className="text-neutral-500 dark:text-neutral-400">
                {isLoading ? "Loading location..." : "Enter property details to see location"}
              </p>
            </div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};
