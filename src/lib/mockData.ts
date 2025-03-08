
// Mumbai neighborhoods for the demonstration
export const mumbaiNeighborhoods = [
  "Andheri East",
  "Andheri West",
  "Bandra East",
  "Bandra West",
  "Borivali",
  "Chembur",
  "Colaba",
  "Dadar",
  "Goregaon",
  "Juhu",
  "Kandivali",
  "Khar",
  "Lower Parel",
  "Malad",
  "Mira Road",
  "Mulund",
  "Powai",
  "Santacruz",
  "Thane",
  "Versova",
  "Vikhroli",
  "Worli"
];

// Property types common in Mumbai
export const propertyTypes = [
  "Apartment",
  "Builder Floor",
  "Penthouse",
  "Studio Apartment",
  "Independent House",
  "Villa"
];

// Amenities options
export const amenities = [
  "Swimming Pool",
  "Gym",
  "Garden",
  "Clubhouse",
  "Security",
  "Power Backup",
  "Parking",
  "Lift",
  "Children's Play Area",
  "Intercom"
];

// Furnishing options
export const furnishingOptions = [
  "Unfurnished",
  "Semi-Furnished",
  "Fully Furnished"
];

// Mock function to simulate price prediction
export const predictPrice = (formData: any): { price: number; confidence: number } => {
  // This is a simplified mock model for demonstration
  // In a real application, this would use an actual trained ML model
  
  // Base price per sq ft based on location (completely fictional for demo)
  const locationPricing: Record<string, number> = {
    "Andheri East": 18000,
    "Andheri West": 22000,
    "Bandra East": 35000,
    "Bandra West": 45000,
    "Borivali": 16000,
    "Chembur": 17000,
    "Colaba": 65000,
    "Dadar": 32000,
    "Goregaon": 18000,
    "Juhu": 42000,
    "Kandivali": 16000,
    "Khar": 40000,
    "Lower Parel": 38000,
    "Malad": 16000,
    "Mira Road": 10000,
    "Mulund": 15000,
    "Powai": 21000,
    "Santacruz": 30000,
    "Thane": 12000,
    "Versova": 25000,
    "Vikhroli": 16000,
    "Worli": 50000
  };
  
  const basePrice = locationPricing[formData.neighborhood] || 20000;
  
  // Adjustments based on other factors
  const sizeFactor = formData.size / 100; // Price increases with size
  const bedroomsFactor = 1 + (formData.bedrooms * 0.05); // Each bedroom adds 5%
  const bathroomsFactor = 1 + (formData.bathrooms * 0.03); // Each bathroom adds 3%
  
  // Property type adjustment
  const propertyTypeFactor = formData.propertyType === "Villa" ? 1.4 :
                             formData.propertyType === "Independent House" ? 1.3 :
                             formData.propertyType === "Penthouse" ? 1.25 :
                             formData.propertyType === "Apartment" ? 1.0 :
                             formData.propertyType === "Builder Floor" ? 0.95 :
                             0.9; // Studio
  
  // Furnishing adjustment
  const furnishingFactor = formData.furnishing === "Fully Furnished" ? 1.2 :
                           formData.furnishing === "Semi-Furnished" ? 1.1 :
                           1.0; // Unfurnished
  
  // Age adjustment (newer properties are more expensive)
  const ageFactor = Math.max(0.7, 1 - (formData.age * 0.02)); // Each year reduces by 2%, min 70%
  
  // Amenities adjustment
  const amenitiesFactor = 1 + (formData.amenities.length * 0.015); // Each amenity adds 1.5%
  
  // Calculate final price
  let price = basePrice * sizeFactor * bedroomsFactor * bathroomsFactor * 
              propertyTypeFactor * furnishingFactor * ageFactor * amenitiesFactor;
  
  // Add some randomness to simulate model variance
  price = price * (0.9 + Math.random() * 0.2);
  
  // Round to nearest 100,000
  price = Math.round(price / 100000) * 100000;
  
  // Calculate confidence (higher for standard configurations, lower for unusual ones)
  const confidence = Math.min(0.95, 0.7 + Math.random() * 0.2);
  
  return { price, confidence };
};

// Mock location factor data for visualization
export const getLocationFactors = () => {
  return Object.entries(mumbaiNeighborhoods).map(([index, area]) => ({
    name: area,
    value: 10000 + Math.random() * 50000,
  })).sort((a, b) => b.value - a.value);
};

// Mock price trends data
export const getPriceTrends = () => {
  const years = [2018, 2019, 2020, 2021, 2022, 2023];
  return {
    labels: years,
    datasets: [
      {
        name: "Average Price (₹/sq ft)",
        data: years.map(() => 15000 + Math.random() * 10000),
      }
    ]
  };
};

// Mock feature importance for ML model
export const getFeatureImportance = () => {
  return [
    { feature: "Location", importance: 0.35 },
    { feature: "Size", importance: 0.25 },
    { feature: "Property Type", importance: 0.15 },
    { feature: "Age", importance: 0.1 },
    { feature: "Bedrooms", importance: 0.05 },
    { feature: "Furnishing", importance: 0.05 },
    { feature: "Amenities", importance: 0.03 },
    { feature: "Bathrooms", importance: 0.02 }
  ];
};

// Format price in Indian Rupees
export const formatPrice = (price: number) => {
  // Convert to crores and lakhs format
  const crores = Math.floor(price / 10000000);
  const lakhs = Math.floor((price % 10000000) / 100000);
  
  if (crores > 0) {
    return `₹${crores}.${lakhs.toString().padStart(2, '0')} Cr`;
  } else {
    return `₹${lakhs} Lakhs`;
  }
};
