import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatPrice } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { useAuth, useToast } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

interface PredictionResultProps {
  prediction: { price: number; confidence: number } | null;
  formData: any;
  isLoading: boolean;
  onAddToCompare?: () => void;
}

export const PredictionResult = ({
  prediction,
  formData,
  isLoading,
  onAddToCompare,
}: PredictionResultProps) => {
  const [priceDisplay, setPriceDisplay] = useState("0");
  const [progress, setProgress] = useState(0);
  const [animatePrice, setAnimatePrice] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (isLoading) {
      setPriceDisplay("...");
      setProgress(0);
      setAnimatePrice(false);

      const timer = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 300);

      return () => clearInterval(timer);
    }

    if (prediction && prediction.price > 0) {
      setProgress(100);
      setTimeout(() => {
        setPriceDisplay(formatPrice(prediction.price));
        setAnimatePrice(true);
      }, 300);
    }
  }, [prediction, isLoading]);

  useEffect(() => {
    if (animatePrice) {
      const timeout = setTimeout(() => setAnimatePrice(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [animatePrice]);

  const getConfidenceLabel = (confidence: number) => {
    if (confidence > 0.9) return "Very High";
    if (confidence > 0.8) return "High";
    if (confidence > 0.7) return "Good";
    if (confidence > 0.6) return "Moderate";
    return "Low";
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 0.9) return "bg-green-500";
    if (confidence > 0.8) return "bg-green-400";
    if (confidence > 0.7) return "bg-yellow-400";
    if (confidence > 0.6) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleSaveProperty = async () => {
    if (!user) {
      toast({
        title: "Please log in",
        description: "You need to be logged in to save properties",
        variant: "destructive",
      });
      return;
    }

    try {
      const propertyData = {
        ...formData,
        prediction,
      };

      const { error } = await supabase
        .from("saved_properties")
        .insert([
          {
            property_data: propertyData,
          },
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Property saved successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card
      className={cn(
        "w-full shadow-subtle border border-gray-100 backdrop-blur-sm transition-all duration-700",
        prediction ? "bg-white/80 animate-fade-in" : "bg-white/50"
      )}
      style={{
        animation: prediction
          ? "fade-in 0.7s cubic-bezier(0.21,1,0.37,1) both"
          : undefined,
      }}
    >
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-neutral-800 flex items-center">
            <span
              className={cn(
                "inline-block transition-transform duration-500",
                prediction && !isLoading ? "animate-float" : ""
              )}
              style={{
                display: "inline-block",
              }}
            >
              Estimated Price
            </span>
          </CardTitle>
          {prediction && (
            <Badge variant="outline" className="text-xs font-medium py-1">
              ML Prediction
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4 pt-2">
            <Progress value={progress} className="h-2 w-full" />
            <div className="h-10 w-full animate-pulse bg-gray-200 rounded-md" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-6 w-full animate-pulse bg-gray-200 rounded-md" />
              <div className="h-6 w-full animate-pulse bg-gray-200 rounded-md" />
            </div>
          </div>
        ) : prediction ? (
          <div className="space-y-4 pt-2 animate-fade-in">
            <div
              className={cn(
                "text-4xl font-bold text-neutral-900 tracking-tight mb-2 transition-transform",
                animatePrice
                  ? "scale-110 animate-float animate-bounce"
                  : "scale-100"
              )}
              style={{
                animation:
                  animatePrice &&
                  "bounce 1s cubic-bezier(.5,1.8,.5,1) both, fade-in 0.6s",
              }}
            >
              {priceDisplay}
            </div>
            <div className="flex gap-2 mt-4">
              {onAddToCompare && formData && (
                <button
                  onClick={onAddToCompare}
                  className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white text-xs px-4 py-1 rounded-full transition-colors"
                >
                  + Add to Compare
                </button>
              )}
              <button
                onClick={handleSaveProperty}
                className="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white text-xs px-4 py-1 rounded-full transition-colors"
              >
                💾 Save Property
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm mt-4">
              <div className="space-y-1">
                <div className="text-neutral-500">Confidence</div>
                <div className="flex items-center space-x-2">
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full",
                      getConfidenceColor(prediction.confidence)
                    )}
                  />
                  <div className="font-medium">
                    {getConfidenceLabel(prediction.confidence)}
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-neutral-500">City</div>
                <div className="font-medium truncate">{formData.city}</div>
              </div>
              <div className="space-y-1">
                <div className="text-neutral-500">Location</div>
                <div className="font-medium truncate">
                  {formData.neighborhood}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-neutral-500">Property Type</div>
                <div className="font-medium truncate">
                  {formData.propertyType}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-neutral-500">Area</div>
                <div className="font-medium">{formData.size} sq ft</div>
              </div>
              <div className="space-y-1">
                <div className="text-neutral-500">Price per sq ft</div>
                <div className="font-medium">
                  ₹
                  {Math.round(
                    prediction.price / formData.size
                  ).toLocaleString("en-IN")}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-neutral-500">Configuration</div>
                <div className="font-medium">{formData.bedrooms} BHK</div>
              </div>
            </div>

            <div className="pt-2 text-xs text-neutral-500">
              Prediction based on current market trends and similar properties
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-neutral-500">
            Enter property details and click "Predict Price" to get an estimate
          </div>
        )}
      </CardContent>
      <style>
        {`
          @keyframes bounce {
            0% { transform: scale(1); }
            30% { transform: scale(1.18); }
            60% { transform: scale(.95); }
            100% { transform: scale(1); }
          }
          .animate-bounce {
            animation: bounce 0.7s cubic-bezier(.5,1.8,.5,1) both;
          }
          .animate-float {
            animation: float 2.4s cubic-bezier(.45,0,.55,1) infinite;
          }
          @keyframes float {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </Card>
  );
};
