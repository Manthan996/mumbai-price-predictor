
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  getLocationFactors, 
  getPriceTrends, 
  getFeatureImportance 
} from "@/lib/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

interface VisualizationPanelProps {
  prediction: { price: number; confidence: number } | null;
}

export const VisualizationPanel = ({ prediction }: VisualizationPanelProps) => {
  const [locationData, setLocationData] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any>({ labels: [], datasets: [] });
  const [featureData, setFeatureData] = useState<any[]>([]);
  
  useEffect(() => {
    // Simulate data loading
    setLocationData(getLocationFactors().slice(0, 10));
    setTrendData(getPriceTrends());
    setFeatureData(getFeatureImportance());
  }, []);
  
  const formatIndianRupees = (value: number) => {
    return `₹${Math.round(value).toLocaleString('en-IN')}`;
  };
  
  return (
    <Card className="w-full shadow-subtle bg-white/80 backdrop-blur-sm border border-gray-100 animate-slide-up">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-neutral-800">
          Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-2">
        <Tabs defaultValue="locations">
          <TabsList className="w-full mb-4 bg-gray-100">
            <TabsTrigger value="locations" className="flex-1">
              Top Locations
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex-1">
              Price Trends
            </TabsTrigger>
            <TabsTrigger value="factors" className="flex-1">
              Key Factors
            </TabsTrigger>
          </TabsList>
          <TabsContent value="locations" className="mt-0">
            <div className="h-[300px] px-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={locationData}
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis 
                    type="number" 
                    tickFormatter={formatIndianRupees} 
                    domain={[0, 'auto']}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    scale="band"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatIndianRupees(value), "Avg. Price/sq ft"]} 
                    labelStyle={{ fontWeight: 600 }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index < 3 ? "#3b82f6" : "#93c5fd"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="trends" className="mt-0">
            <div className="h-[300px] px-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={trendData.labels.map((year: number, index: number) => ({
                    year,
                    price: trendData.datasets[0].data[index]
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tickFormatter={formatIndianRupees} 
                    domain={[0, 'auto']}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatIndianRupees(value), "Avg. Price/sq ft"]} 
                    labelStyle={{ fontWeight: 600 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6", r: 4 }}
                    activeDot={{ r: 6, fill: "#1d4ed8" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="factors" className="mt-0 px-4">
            <div className="space-y-4 py-2">
              {featureData.map((feature) => (
                <div key={feature.feature} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{feature.feature}</span>
                    <span className="text-neutral-500">
                      {Math.round(feature.importance * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={feature.importance * 100}
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
