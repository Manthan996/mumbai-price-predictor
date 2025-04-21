
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InteractiveMap } from "@/components/InteractiveMap";
import { Map } from "lucide-react";

interface MapComponentProps {
  city: string;
  neighborhood: string;
  isLoading: boolean;
}

export const MapComponent = ({ city, neighborhood, isLoading }: MapComponentProps) => {
  return (
    <Card className="w-full shadow-subtle bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700 animate-slide-up">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
          <Map className="h-5 w-5" />
          Property Location
        </CardTitle>
      </CardHeader>
      <CardContent>
        <InteractiveMap city={city} neighborhood={neighborhood} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};
