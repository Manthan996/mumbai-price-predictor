
import { Badge } from "@/components/ui/badge";

export const Header = () => {
  return (
    <header className="w-full py-6 mb-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <Badge 
            variant="outline" 
            className="px-3 py-1 text-xs bg-white/50 backdrop-blur-sm animate-fade-in"
          >
            Powered by Machine Learning
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 animate-slide-down">
            Real Estate Genie
          </h1>
          <p className="text-neutral-600 max-w-2xl animate-fade-in">
            Enter your property details to get an accurate machine learning-based prediction of its market value in Mumbai
          </p>
        </div>
      </div>
    </header>
  );
};
