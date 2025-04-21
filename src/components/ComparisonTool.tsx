
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/mockData";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

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
  const exportRef = useRef<HTMLDivElement>(null);

  if (!items.length) return null;

  const handleExportPDF = async () => {
    if (!exportRef.current) return;
    // Capture the export area as an image
    const canvas = await html2canvas(exportRef.current, {
      backgroundColor: "#fff",
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4",
    });
    // Fit the image width to PDF page
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgProps = (pdf as any).getImageProperties
      ? (pdf as any).getImageProperties(imgData)
      : { width: canvas.width, height: canvas.height };
    // Calculate image height to preserve aspect ratio
    const imgWidth = pageWidth - 60;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.text("Property Comparison Report", pageWidth / 2, 40, {
      align: "center",
    });
    pdf.addImage(
      imgData,
      "PNG",
      30,
      60,
      imgWidth,
      imgHeight > pageHeight - 100 ? pageHeight - 100 : imgHeight
    );
    pdf.save("property-comparison.pdf");
  };

  return (
    <div className="my-4 md:my-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Property Comparison</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportPDF}
          className="border-blue-200 text-blue-700 hover:bg-blue-100"
        >
          Export as PDF
        </Button>
      </div>
      <div ref={exportRef}>
        <div className="flex gap-4 overflow-x-auto pb-2 print:overflow-visible">
          {items.map(({ id, prediction, formData }, idx) => (
            <Card
              key={id}
              className={cn(
                "min-w-[320px] max-w-xs shadow hover:scale-105 focus-within:ring-2 transition-transform relative print:shadow-none print:min-w-0 print:max-w-none"
              )}
            >
              <button
                className="absolute top-3 right-3 z-10 p-1 text-xs bg-gray-100 rounded hover:bg-red-500 hover:text-white transition-colors print:hidden"
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
                <div className="text-sm mb-3">
                  Confidence:{" "}
                  <span className="font-medium">
                    {Math.round(prediction.confidence * 100)}%
                  </span>
                </div>
                <ul className="text-xs space-y-1">
                  <li>
                    <b>Size:</b> {formData.size} sq ft
                  </li>
                  <li>
                    <b>BHK:</b> {formData.bedrooms} BHK
                  </li>
                  <li>
                    <b>Price/sqft:</b> ₹
                    {Math.round(
                      prediction.price / formData.size
                    ).toLocaleString("en-IN")}
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
    </div>
  );
};
