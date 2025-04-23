
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { availableCities, getNeighborhoodsByCity } from "@/lib/mockData";

interface AlertFormProps {
  onSuccess?: () => void;
}

export const AlertForm = ({ onSuccess }: AlertFormProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    city: "Mumbai",
    neighborhood: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.from("property_alerts").insert({
        user_id: user.id,
        city: formData.city,
        neighborhood: formData.neighborhood || null,
        min_price: formData.minPrice ? parseInt(formData.minPrice) : null,
        max_price: formData.maxPrice ? parseInt(formData.maxPrice) : null,
      });

      if (error) throw error;
      
      setFormData({
        city: "Mumbai",
        neighborhood: "",
        minPrice: "",
        maxPrice: "",
      });
      
      onSuccess?.();
    } catch (error: any) {
      console.error("Error creating alert:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label>City</Label>
          <Select
            value={formData.city}
            onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}
          >
            <SelectTrigger>
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

        <div className="grid gap-2">
          <Label>Neighborhood (Optional)</Label>
          <Select
            value={formData.neighborhood}
            onValueChange={(value) => setFormData(prev => ({ ...prev, neighborhood: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select neighborhood" />
            </SelectTrigger>
            <SelectContent>
              {getNeighborhoodsByCity(formData.city).map((neighborhood) => (
                <SelectItem key={neighborhood} value={neighborhood}>
                  {neighborhood}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label>Min Price (₹)</Label>
            <Input
              type="number"
              value={formData.minPrice}
              onChange={(e) => setFormData(prev => ({ ...prev, minPrice: e.target.value }))}
              placeholder="Minimum price"
            />
          </div>
          <div className="grid gap-2">
            <Label>Max Price (₹)</Label>
            <Input
              type="number"
              value={formData.maxPrice}
              onChange={(e) => setFormData(prev => ({ ...prev, maxPrice: e.target.value }))}
              placeholder="Maximum price"
            />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating Alert..." : "Create Alert"}
      </Button>
    </form>
  );
};
