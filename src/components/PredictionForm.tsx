
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  availableCities,
  getNeighborhoodsByCity,
  propertyTypes, 
  amenities, 
  furnishingOptions
} from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface PredictionFormProps {
  onPredict: (formData: any) => void;
  isLoading: boolean;
}

export const PredictionForm = ({ onPredict, isLoading }: PredictionFormProps) => {
  const [formData, setFormData] = useState({
    city: "Mumbai",
    neighborhood: "Andheri West",
    propertyType: "Apartment",
    size: 800,
    bedrooms: 2,
    bathrooms: 2,
    age: 5,
    furnishing: "Semi-Furnished",
    amenities: ["Parking", "Lift", "Security"] as string[]
  });

  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);

  useEffect(() => {
    // Update neighborhoods when city changes
    const cityNeighborhoods = getNeighborhoodsByCity(formData.city);
    setNeighborhoods(cityNeighborhoods);
    
    // Set a default neighborhood from the selected city
    if (!cityNeighborhoods.includes(formData.neighborhood)) {
      setFormData(prev => ({ 
        ...prev, 
        neighborhood: cityNeighborhoods[0] 
      }));
    }
  }, [formData.city]);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (amenity: string) => {
    setFormData(prev => {
      const amenitiesList = [...prev.amenities];
      const index = amenitiesList.indexOf(amenity);
      
      if (index > -1) {
        amenitiesList.splice(index, 1);
      } else {
        amenitiesList.push(amenity);
      }
      
      return { ...prev, amenities: amenitiesList };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  return (
    <Card className="w-full shadow-subtle bg-white/80 backdrop-blur-sm border border-gray-100 animate-scale-in">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="city" className="text-sm font-medium">
                City
              </Label>
              <Select
                value={formData.city}
                onValueChange={(value) => handleChange("city", value)}
              >
                <SelectTrigger className="input-field mt-1">
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {availableCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="neighborhood" className="text-sm font-medium">
                Neighborhood
              </Label>
              <Select
                value={formData.neighborhood}
                onValueChange={(value) => handleChange("neighborhood", value)}
              >
                <SelectTrigger className="input-field mt-1">
                  <SelectValue placeholder="Select neighborhood" />
                </SelectTrigger>
                <SelectContent>
                  {neighborhoods.map((neighborhood) => (
                    <SelectItem key={neighborhood} value={neighborhood}>
                      {neighborhood}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="propertyType" className="text-sm font-medium">
                Property Type
              </Label>
              <Select
                value={formData.propertyType}
                onValueChange={(value) => handleChange("propertyType", value)}
              >
                <SelectTrigger className="input-field mt-1">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="size" className="text-sm font-medium">
                  Size (sq ft)
                </Label>
                <span className="text-sm text-muted-foreground">
                  {formData.size} sq ft
                </span>
              </div>
              <div className="pt-2 px-1">
                <Slider
                  value={[formData.size]}
                  min={300}
                  max={5000}
                  step={50}
                  onValueChange={(value) => handleChange("size", value[0])}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bedrooms" className="text-sm font-medium">
                  Bedrooms
                </Label>
                <Select
                  value={formData.bedrooms.toString()}
                  onValueChange={(value) => handleChange("bedrooms", parseInt(value))}
                >
                  <SelectTrigger className="input-field mt-1">
                    <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="bathrooms" className="text-sm font-medium">
                  Bathrooms
                </Label>
                <Select
                  value={formData.bathrooms.toString()}
                  onValueChange={(value) => handleChange("bathrooms", parseInt(value))}
                >
                  <SelectTrigger className="input-field mt-1">
                    <SelectValue placeholder="Bathrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="age" className="text-sm font-medium">
                  Property Age (years)
                </Label>
                <span className="text-sm text-muted-foreground">
                  {formData.age} {formData.age === 1 ? "year" : "years"}
                </span>
              </div>
              <div className="pt-2 px-1">
                <Slider
                  value={[formData.age]}
                  min={0}
                  max={30}
                  step={1}
                  onValueChange={(value) => handleChange("age", value[0])}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="furnishing" className="text-sm font-medium">
                Furnishing
              </Label>
              <Select
                value={formData.furnishing}
                onValueChange={(value) => handleChange("furnishing", value)}
              >
                <SelectTrigger className="input-field mt-1">
                  <SelectValue placeholder="Select furnishing type" />
                </SelectTrigger>
                <SelectContent>
                  {furnishingOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">
                Amenities
              </Label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`amenity-${amenity}`}
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <Label 
                      htmlFor={`amenity-${amenity}`}
                      className="text-sm cursor-pointer"
                    >
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className={cn(
              "w-full transition-all duration-300",
              isLoading ? "opacity-90" : "hover:shadow-md"
            )}
            disabled={isLoading}
          >
            {isLoading ? "Calculating..." : "Predict Price"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
