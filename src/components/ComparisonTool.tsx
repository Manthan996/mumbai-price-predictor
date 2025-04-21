
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/mockData";

type CompareItem = {
  id: string;
  prediction: { price: number; confidence: number };
  formData: any;
};

interface ComparisonToolProps {
  items: CompareItem[];
  onRemove: (id: string) => void;
}

export const ComparisonTool = ({ items, onRemove }: ComparisonToolProps) => {
  if (!items.length) return null;

  return (
    <div className="my-4 md:my-6">
      <h2 className="text-xl font-semibold mb-2">Property Comparison</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map(({ id, prediction, formData }, idx) => (
          <Card
            key={id}
            className={cn(
              "min-w-[320px] max-w-xs shadow hover:scale-105 focus-within:ring-2 transition-transform relative"
            )}
          >
            <button
              className="absolute top-3 right-3 z-10 p-1 text-xs bg-gray-100 rounded hover:bg-red-500 hover:text-white transition-colors"
              aria-label="Remove"
              onClick={() => onRemove(id)}
            >
              ×
            </button>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                {formData.city}, {formData.neighborhood}
                <Badge variant="outline" className="text-[10px] py-0.5">
                  {formData.propertyType}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1 text-gray-900">
                {formatPrice(prediction.price)}
              </div>
              <div className="text-sm mb-3">Confidence: <span className="font-medium">{Math.round(prediction.confidence*100)}%</span></div>
              <ul className="text-xs space-y-1">
                <li>
                  <b>Size:</b> {formData.size} sq ft
                </li>
                <li>
                  <b>BHK:</b> {formData.bedrooms} BHK
                </li>
                <li>
                  <b>Price/sqft:</b> ₹
                  {Math.round(prediction.price / formData.size).toLocaleString("en-IN")}
                </li>
                <li>
                  <b>Type:</b> {formData.propertyType}
                </li>
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
