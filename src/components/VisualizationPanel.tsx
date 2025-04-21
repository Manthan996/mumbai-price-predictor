
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  getLocationFactors,
  getPriceTrends,
  getFeatureImportance,
} from "@/lib/mockData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  ReferenceLine,
} from "recharts";
import { useState as useReactState } from "react";
import { TrendingUp, Clock } from "lucide-react";

interface VisualizationPanelProps {
  prediction: { price: number; confidence: number } | null;
}

export const VisualizationPanel = ({ prediction }: VisualizationPanelProps) => {
  const [locationData, setLocationData] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any>({ labels: [], datasets: [] });
  const [featureData, setFeatureData] = useState<any[]>([]);
  // For interactivity
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    // Simulate data loading
    setLocationData(getLocationFactors().slice(0, 10));
    setTrendData(getPriceTrends());
    setFeatureData(getFeatureImportance());
  }, []);

  const formatIndianRupees = (value: number) => {
    return `₹${Math.round(value).toLocaleString("en-IN")}`;
  };

  // Prepare data for recharts
  const chartData = trendData.labels.map((year: number, index: number) => ({
    year,
    price: trendData.datasets[0].data[index],
  }));

  return (
    <Card className="w-full shadow-subtle bg-white/80 backdrop-blur-sm border border-gray-100 animate-slide-up">
      <CardHeader className="pb-2 flex gap-2 items-center">
        <CardTitle className="text-lg font-semibold text-neutral-800 flex gap-2 items-center">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Market Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-2">
        <Tabs defaultValue="locations">
          <TabsList className="w-full mb-4 bg-gray-100">
            <TabsTrigger value="locations" className="flex-1">
              Top Locations
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex-1 flex gap-2 items-center">
              <Clock className="w-4 h-4 text-blue-700" />
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
                    domain={[0, "auto"]}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    scale="band"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      formatIndianRupees(value),
                      "Avg. Price/sq ft",
                    ]}
                    labelStyle={{ fontWeight: 600 }}
                  />
                  <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                    {locationData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index < 3 ? "#3b82f6" : "#93c5fd"}
                      />
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
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  onMouseMove={(state: any) => {
                    if (
                      state &&
                      state.activeTooltipIndex !== undefined &&
                      state.activeTooltipIndex !== null
                    ) {
                      setActiveIndex(state.activeTooltipIndex);
                    } else {
                      setActiveIndex(null);
                    }
                  }}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="year"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    tickFormatter={formatIndianRupees}
                    domain={["auto", "auto"]}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      formatIndianRupees(value),
                      "Avg. Price/sq ft",
                    ]}
                    labelStyle={{ fontWeight: 600 }}
                    cursor={{
                      stroke: "#1d4ed8",
                      strokeDasharray: "2 4",
                      strokeWidth: 2,
                    }}
                    contentStyle={{
                      borderRadius: 10,
                      background: "#f0f7ff",
                      border: "1px solid #3b82f6",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    dot={(props) => {
                      const { cx, cy, index } = props;
                      return (
                        <circle
                          cx={cx}
                          cy={cy}
                          r={activeIndex === index ? 8 : 4}
                          fill={activeIndex === index ? "#1d4ed8" : "#3b82f6"}
                          style={{
                            transition: "r 200ms, fill 200ms",
                            filter:
                              activeIndex === index
                                ? "drop-shadow(0 0 8px #3b82f6cc)"
                                : undefined,
                          }}
                        />
                      );
                    }}
                    activeDot={{
                      r: 10,
                      fill: "#1d4ed8",
                      stroke: "#3b82f6",
                      strokeWidth: 3,
                    }}
                    isAnimationActive={true}
                    animationDuration={600}
                    animationEasing="ease"
                  />
                  {/* ReferenceLine (pointer line) for hover */}
                  {activeIndex !== null && (
                    <ReferenceLine
                      x={chartData[activeIndex].year}
                      stroke="#818cf8"
                      strokeDasharray="4 4"
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
              <div className="text-xs text-neutral-500 pt-2 px-3 text-center select-none transition-opacity duration-300">
                {activeIndex !== null ? (
                  <>
                    <span className="font-semibold text-blue-900">
                      {chartData[activeIndex].year}
                    </span>
                    {" – "}
                    <span className="font-bold text-blue-700">
                      {formatIndianRupees(chartData[activeIndex].price)}
                    </span>
                    {" per sq ft"}
                  </>
                ) : (
                  "Hover graph points to explore yearly avg. price"
                )}
              </div>
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
                  <Progress value={feature.importance * 100} className="h-2" />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
