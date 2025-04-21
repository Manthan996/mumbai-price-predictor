import { useState } from "react";
import { PredictionForm } from "@/components/PredictionForm";
import { PredictionResult } from "@/components/PredictionResult";
import { VisualizationPanel } from "@/components/VisualizationPanel";
import { MapComponent } from "@/components/MapComponent";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { predictPrice } from "@/lib/mockData";
import { useToast } from "@/components/ui/use-toast";
import { ComparisonTool } from "@/components/ComparisonTool";
import { v4 as uuidv4 } from "uuid";

const Index = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [compareItems, setCompareItems] = useState([]);

  const handlePredict = (data: any) => {
    setFormData(data);
    setIsLoading(true);
    setPrediction(null);
    
    // Simulate Python ML model processing delay
    setTimeout(() => {
      try {
        // In a real app, this would call a Python backend API
        const result = predictPrice(data);
        setPrediction(result);
        toast({
          title: "Prediction Complete",
          description: `Your property price prediction for ${data.city} is ready (Python ML model)`,
          duration: 3000,
        });
      } catch (error) {
        console.error("Prediction error:", error);
        toast({
          title: "ML Model Error",
          description: "There was an error in the Python prediction model",
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    }, 4000); // Increased to simulate ML model processing time
  };

  const handleAddToCompare = () => {
    if (!formData || !prediction) return;
    // Avoid duplicates (check by all same property fields)
    const duplicate = compareItems.some(
      (item) =>
        item.formData.city === formData.city &&
        item.formData.neighborhood === formData.neighborhood &&
        item.formData.propertyType === formData.propertyType &&
        item.formData.size === formData.size &&
        item.formData.bedrooms === formData.bedrooms
    );
    if (!duplicate) {
      setCompareItems([
        ...compareItems,
        {
          id: uuidv4(),
          prediction,
          formData,
        },
      ]);
      toast({
        title: "Added to Comparison",
        description: "This property has been added to the comparison tool.",
      });
    } else {
      toast({
        title: "Already Added",
        description: "This property is already in your comparison list.",
      });
    }
  };

  const handleRemoveFromCompare = (id: string) => {
    setCompareItems(compareItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 md:px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left column - Input form */}
          <div className="lg:col-span-5">
            <PredictionForm 
              onPredict={handlePredict} 
              isLoading={isLoading} 
            />
          </div>
          
          {/* Right column - Results and Visualizations */}
          <div className="lg:col-span-7 space-y-6">
            <PredictionResult 
              prediction={prediction} 
              formData={formData} 
              isLoading={isLoading} 
              onAddToCompare={handleAddToCompare}
            />
            
            <ComparisonTool
              items={compareItems}
              onRemove={handleRemoveFromCompare}
            />
            
            {formData && (
              <MapComponent 
                city={formData.city} 
                neighborhood={formData.neighborhood}
                isLoading={isLoading}
              />
            )}
            
            <VisualizationPanel prediction={prediction} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
