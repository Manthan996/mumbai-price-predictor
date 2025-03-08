
import { cn } from "@/lib/utils";

export const Footer = () => {
  return (
    <footer className="w-full py-6 mt-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-2 text-center text-neutral-500 text-sm">
          <div className="flex items-center space-x-1">
            <span className={cn(
              "inline-block w-2 h-2 rounded-full",
              "bg-gradient-to-r from-blue-400 to-indigo-500",
              "animate-pulse"
            )} />
            <span>AI-Powered Price Prediction Model</span>
          </div>
          <p className="text-xs">
            Results are based on a machine learning model trained on Mumbai property data. 
            Predictions are for informational purposes only.
          </p>
          <p className="text-xs">
            © {new Date().getFullYear()} Mumbai Price Predictor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
