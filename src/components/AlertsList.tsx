
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const AlertsList = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from("property_alerts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAlerts(data || []);
    } catch (error: any) {
      console.error("Error fetching alerts:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAlert = async (id: string, currentState: boolean) => {
    try {
      const { error } = await supabase
        .from("property_alerts")
        .update({ is_active: !currentState })
        .eq("id", id);

      if (error) throw error;

      setAlerts(alerts.map(alert => 
        alert.id === id ? { ...alert, is_active: !currentState } : alert
      ));

      toast({
        title: !currentState ? "Alert Activated" : "Alert Deactivated",
        description: !currentState ? "You will receive notifications for this alert." : "You won't receive notifications for this alert.",
      });
    } catch (error: any) {
      console.error("Error toggling alert:", error.message);
    }
  };

  const deleteAlert = async (id: string) => {
    try {
      const { error } = await supabase
        .from("property_alerts")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setAlerts(alerts.filter(alert => alert.id !== id));
      toast({
        title: "Alert Deleted",
        description: "The property alert has been removed.",
      });
    } catch (error: any) {
      console.error("Error deleting alert:", error.message);
    }
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading alerts...</div>;
  }

  if (alerts.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No alerts set up yet. Create one above to get notified about properties.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Your Alerts</h3>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="space-y-1">
              <p className="font-medium">
                {alert.city}
                {alert.neighborhood && ` - ${alert.neighborhood}`}
              </p>
              <p className="text-sm text-muted-foreground">
                Price Range: {alert.min_price ? `₹${formatPrice(alert.min_price)}` : 'Any'} 
                {' - '}
                {alert.max_price ? `₹${formatPrice(alert.max_price)}` : 'Any'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={alert.is_active}
                onCheckedChange={() => toggleAlert(alert.id, alert.is_active)}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteAlert(alert.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
