
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export const Header = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="w-full py-6 mb-4">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-full flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
          <Badge 
            variant="outline" 
            className="px-3 py-1 text-xs bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm animate-fade-in"
          >
            Powered by Machine Learning
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white animate-slide-down">
            Real Estate Genie
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 max-w-2xl animate-fade-in">
            Enter your property details to get an accurate machine learning-based prediction of its market value in Mumbai
          </p>
        </div>
      </div>
    </header>
  );
};
