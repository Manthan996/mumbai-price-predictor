
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

// This function simulates calling the Python machine learning model
// In a real application, this would make an API call to a Python backend
export const predictPrice = (formData: any): { price: number; confidence: number } => {
  // Location importance factors (realistic for Mumbai market)
  const locationPricing: Record<string, number> = {
    "Andheri East": 22000,
    "Andheri West": 28000,
    "Bandra East": 42000,
    "Bandra West": 65000,
    "Borivali": 18000,
    "Chembur": 22000,
    "Colaba": 78000,
    "Dadar": 35000,
    "Goregaon": 20000,
    "Juhu": 55000,
    "Kandivali": 17000,
    "Khar": 52000,
    "Lower Parel": 45000,
    "Malad": 18000,
    "Mira Road": 12000,
    "Mulund": 17000,
    "Powai": 25000,
    "Santacruz": 38000,
    "Thane": 14000,
    "Versova": 30000,
    "Vikhroli": 19000,
    "Worli": 60000
  };
  
  // Get base price for selected neighborhood
  const basePrice = locationPricing[formData.neighborhood] || 25000;
  
  // Size factor with diminishing returns for larger properties
  const sizeFactor = Math.pow(formData.size / 1000, 0.9);
  
  // Room configuration factors
  const bedroomsFactor = Math.min(1.25, 1 + (formData.bedrooms * 0.07)); 
  const bathroomsFactor = Math.min(1.15, 1 + (formData.bathrooms * 0.04));
  
  // Property type multipliers based on Mumbai luxury segment
  const propertyTypeFactor = 
    formData.propertyType === "Villa" ? 1.5 :
    formData.propertyType === "Independent House" ? 1.35 :
    formData.propertyType === "Penthouse" ? 1.4 :
    formData.propertyType === "Apartment" ? 1.0 :
    formData.propertyType === "Builder Floor" ? 0.95 :
    0.85; // Studio
  
  // Furnishing premium
  const furnishingFactor = 
    formData.furnishing === "Fully Furnished" ? 1.15 :
    formData.furnishing === "Semi-Furnished" ? 1.07 :
    1.0; // Unfurnished
  
  // Age depreciation with exponential decay and floor
  const ageFactor = Math.max(0.75, Math.exp(-0.015 * formData.age));
  
  // Amenities boost with diminishing returns
  const amenitiesCount = formData.amenities.length;
  const amenitiesFactor = 1 + (amenitiesCount > 0 ? 0.02 + (amenitiesCount - 1) * 0.01 : 0);
  
  // Calculate per square foot price
  const pricePerSqFt = basePrice * propertyTypeFactor * ageFactor * furnishingFactor * amenitiesFactor;
  
  // Calculate total price
  let price = pricePerSqFt * formData.size * bedroomsFactor * bathroomsFactor;
  
  // Apply realistic market variance (±5%)
  const marketVariance = 0.95 + Math.random() * 0.1;
  price = price * marketVariance;
  
  // Add additional randomness to simulate ML prediction variations
  const mlNoise = 0.98 + Math.random() * 0.04;
  price = price * mlNoise;
  
  // Round to nearest lakh (100,000) for realistic presentation
  price = Math.round(price / 100000) * 100000;
  
  // Calculate confidence based on data completeness and property attributes
  let confidenceBase = 0.85;
  
  // Reduce confidence for outlier configurations
  if (formData.bedrooms > 4) confidenceBase -= 0.02;
  if (formData.bathrooms > formData.bedrooms + 1) confidenceBase -= 0.03;
  if (formData.size > 3000) confidenceBase -= 0.02;
  if (formData.age > 20) confidenceBase -= 0.02;
  
  // Increase confidence for well-documented properties
  if (amenitiesCount > 5) confidenceBase += 0.02;
  
  // Add small random factor to confidence
  const confidence = Math.min(0.95, Math.max(0.75, confidenceBase + (Math.random() * 0.04 - 0.02)));
  
  // In a real implementation, this would be an API call:
  // const response = await fetch('/api/predict', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(formData)
  // });
  // return await response.json();
  
  return { price, confidence };
};

// Mock location factor data for visualization
export const getLocationFactors = () => {
  const locationRates: Record<string, number> = {};
  
  // Use the same pricing model as in predictPrice for consistency
  mumbaiNeighborhoods.forEach(neighborhood => {
    const locationPricing: Record<string, number> = {
      "Andheri East": 22000,
      "Andheri West": 28000,
      "Bandra East": 42000,
      "Bandra West": 65000,
      "Borivali": 18000,
      "Chembur": 22000,
      "Colaba": 78000,
      "Dadar": 35000,
      "Goregaon": 20000,
      "Juhu": 55000,
      "Kandivali": 17000,
      "Khar": 52000,
      "Lower Parel": 45000,
      "Malad": 18000,
      "Mira Road": 12000,
      "Mulund": 17000,
      "Powai": 25000,
      "Santacruz": 38000,
      "Thane": 14000,
      "Versova": 30000,
      "Vikhroli": 19000,
      "Worli": 60000
    };
    
    // Add a small random variance (±7%) for the visualization
    const baseRate = locationPricing[neighborhood] || 25000;
    locationRates[neighborhood] = baseRate * (0.93 + Math.random() * 0.14);
  });
  
  // Convert to array format for the chart
  return Object.entries(locationRates).map(([name, value]) => ({
    name,
    value
  })).sort((a, b) => b.value - a.value);
};

// Mock price trends data with realistic yearly growth
export const getPriceTrends = () => {
  const years = [2018, 2019, 2020, 2021, 2022, 2023];
  
  // Create realistic trend with COVID dip in 2020 and recovery after
  const priceIndex = [
    20000, // 2018 base
    21400, // 2019 (+7% growth)
    20500, // 2020 (COVID dip -4%)
    22300, // 2021 (recovery +8.5%)
    24200, // 2022 (strong growth +8.5%)
    26400  // 2023 (continued growth +9%)
  ];
  
  return {
    labels: years,
    datasets: [
      {
        name: "Average Price (₹/sq ft)",
        data: priceIndex,
      }
    ]
  };
};

// Feature importance based on industry research
export const getFeatureImportance = () => {
  return [
    { feature: "Location", importance: 0.42 },
    { feature: "Size", importance: 0.22 },
    { feature: "Property Type", importance: 0.12 },
    { feature: "Age", importance: 0.08 },
    { feature: "Bedrooms", importance: 0.06 },
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
