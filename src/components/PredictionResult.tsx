
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatPrice } from "@/lib/mockData";
import { cn } from "@/lib/utils";

interface PredictionResultProps {
  prediction: { price: number; confidence: number } | null;
  formData: any;
  isLoading: boolean;
}

export const PredictionResult = ({ prediction, formData, isLoading }: PredictionResultProps) => {
  const [priceDisplay, setPriceDisplay] = useState("0");
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (isLoading) {
      setPriceDisplay("...");
      setProgress(0);
      
      const timer = setInterval(() => {
        setProgress(prev => (prev < 90 ? prev + 10 : prev));
      }, 300);
      
      return () => clearInterval(timer);
    }
    
    if (prediction && prediction.price > 0) {
      setProgress(100);
      setPriceDisplay(formatPrice(prediction.price));
    }
  }, [prediction, isLoading]);
  
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
  
  return (
    <Card className={cn(
      "w-full shadow-subtle border border-gray-100 backdrop-blur-sm transition-all duration-500",
      prediction ? "bg-white/80 animate-fade-in" : "bg-white/50"
    )}>
      <CardHeader className="pb-0">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-neutral-800">
            Estimated Price
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
          <div className="space-y-4 pt-2">
            <div className="text-4xl font-bold text-neutral-900 tracking-tight">
              {priceDisplay}
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm mt-4">
              <div className="space-y-1">
                <div className="text-neutral-500">Confidence</div>
                <div className="flex items-center space-x-2">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    getConfidenceColor(prediction.confidence)
                  )} />
                  <div className="font-medium">
                    {getConfidenceLabel(prediction.confidence)}
                  </div>
                </div>
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
                <div className="font-medium">
                  {formData.size} sq ft
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-neutral-500">Price per sq ft</div>
                <div className="font-medium">
                  ₹{Math.round(prediction.price / formData.size).toLocaleString('en-IN')}
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-neutral-500">Configuration</div>
                <div className="font-medium">
                  {formData.bedrooms} BHK
                </div>
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
    </Card>
  );
};
