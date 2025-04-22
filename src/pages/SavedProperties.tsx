
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function SavedProperties() {
  const [savedProperties, setSavedProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchSavedProperties();
  }, [user, navigate]);

  const fetchSavedProperties = async () => {
    try {
      const { data, error } = await supabase
        .from("saved_properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSavedProperties(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load saved properties",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("saved_properties")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setSavedProperties((prev) => prev.filter((prop) => prop.id !== id));
      toast({
        title: "Success",
        description: "Property removed from saved list",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to remove property",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Saved Properties</h1>
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="h-48" />
              </Card>
            ))}
          </div>
        ) : savedProperties.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {savedProperties.map((property) => (
              <Card key={property.id} className="relative">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {property.property_data.city} - {property.property_data.neighborhood}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p>Price: ₹{property.property_data.prediction.price.toLocaleString("en-IN")}</p>
                    <p>{property.property_data.size} sq ft</p>
                    <p>{property.property_data.bedrooms} BHK</p>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-4"
                      onClick={() => handleDelete(property.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No saved properties yet</p>
          </div>
        )}
      </main>
    </div>
  );
}
