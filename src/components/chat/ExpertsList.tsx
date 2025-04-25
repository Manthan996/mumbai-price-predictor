
import { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ExpertsList = ({ onSelectExpert }: { onSelectExpert: (expertId: string) => void }) => {
  const [experts, setExperts] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchExperts = async () => {
      const { data, error } = await supabase
        .from('property_experts')
        .select('*')
        .eq('is_available', true);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load property experts",
          variant: "destructive",
        });
        return;
      }

      setExperts(data || []);
    };

    fetchExperts();
  }, [toast]);

  return (
    <ScrollArea className="h-[400px] rounded-md border p-4">
      <div className="space-y-4">
        {experts.map((expert) => (
          <Card key={expert.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{expert.name}</h3>
                <p className="text-sm text-muted-foreground">{expert.expertise}</p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="secondary">{expert.years_experience} years exp.</Badge>
                  <Badge variant="outline" className="bg-green-50">Available</Badge>
                </div>
              </div>
              <Button onClick={() => onSelectExpert(expert.id)}>
                Chat Now
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};
