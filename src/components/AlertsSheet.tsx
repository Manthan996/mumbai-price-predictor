
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { BellRing } from "lucide-react";
import { AlertForm } from "./AlertForm";
import { AlertsList } from "./AlertsList";

export const AlertsSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  if (!user) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <BellRing className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Property Alerts</SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <AlertForm onSuccess={() => {
            toast({
              title: "Alert Created",
              description: "You will be notified when matching properties are found.",
            });
          }} />
          <AlertsList />
        </div>
      </SheetContent>
    </Sheet>
  );
};
