
// City selection options
export const availableCities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Pune",
  "Hyderabad",
  "Chennai"
];

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

// Delhi neighborhoods
export const delhiNeighborhoods = [
  "Connaught Place",
  "Defence Colony",
  "Dwarka",
  "Greater Kailash",
  "Hauz Khas",
  "Janakpuri",
  "Lajpat Nagar",
  "Mayur Vihar",
  "New Friends Colony",
  "Paharganj",
  "Rohini",
  "Saket",
  "South Extension",
  "Vasant Kunj",
  "Vasant Vihar"
];

// Bangalore neighborhoods
export const bangaloreNeighborhoods = [
  "Indiranagar",
  "Koramangala",
  "Whitefield",
  "HSR Layout",
  "Jayanagar",
  "JP Nagar",
  "Electronic City",
  "Bannerghatta Road",
  "Hebbal",
  "Malleswaram",
  "Marathahalli",
  "Yelahanka",
  "BTM Layout",
  "MG Road",
  "Rajajinagar"
];

// Pune neighborhoods
export const puneNeighborhoods = [
  "Koregaon Park",
  "Kalyani Nagar",
  "Viman Nagar",
  "Aundh",
  "Baner",
  "Kothrud",
  "Hadapsar",
  "Hinjewadi",
  "Kharadi",
  "Magarpatta City",
  "Camp",
  "Shivaji Nagar",
  "Kondhwa",
  "Wakad",
  "Pimpri-Chinchwad"
];

// Hyderabad neighborhoods
export const hyderabadNeighborhoods = [
  "Banjara Hills",
  "Jubilee Hills",
  "Gachibowli",
  "Madhapur",
  "HITEC City",
  "Kondapur",
  "Kukatpally",
  "Miyapur",
  "Secunderabad",
  "Begumpet",
  "Ameerpet",
  "Somajiguda",
  "Manikonda",
  "Uppal",
  "LB Nagar"
];

// Chennai neighborhoods
export const chennaiNeighborhoods = [
  "Anna Nagar",
  "Adyar",
  "T. Nagar",
  "Velachery",
  "Nungambakkam",
  "Mylapore",
  "Porur",
  "Thoraipakkam",
  "Sholinganallur",
  "Guindy",
  "Perungudi",
  "Egmore",
  "Besant Nagar",
  "Kilpauk",
  "OMR"
];

// Get neighborhoods for a given city
export const getNeighborhoodsByCity = (city: string) => {
  switch (city) {
    case "Mumbai":
      return mumbaiNeighborhoods;
    case "Delhi":
      return delhiNeighborhoods;
    case "Bangalore":
      return bangaloreNeighborhoods;
    case "Pune":
      return puneNeighborhoods;
    case "Hyderabad":
      return hyderabadNeighborhoods;
    case "Chennai":
      return chennaiNeighborhoods;
    default:
      return mumbaiNeighborhoods;
  }
};

// Property types common in Indian cities
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

// City base rates (per square foot in rupees)
const cityBaseRates: Record<string, number> = {
  "Mumbai": 30000,
  "Delhi": 25000,
  "Bangalore": 18000,
  "Pune": 15000,
  "Hyderabad": 13000,
  "Chennai": 16000
};

// Location factors for each city (multiplier on city base rate)
const cityLocationFactors: Record<string, Record<string, number>> = {
  "Mumbai": {
    "Andheri East": 0.73,
    "Andheri West": 0.93,
    "Bandra East": 1.40,
    "Bandra West": 2.17,
    "Borivali": 0.60,
    "Chembur": 0.73,
    "Colaba": 2.60,
    "Dadar": 1.17,
    "Goregaon": 0.67,
    "Juhu": 1.83,
    "Kandivali": 0.57,
    "Khar": 1.73,
    "Lower Parel": 1.50,
    "Malad": 0.60,
    "Mira Road": 0.40,
    "Mulund": 0.57,
    "Powai": 0.83,
    "Santacruz": 1.27,
    "Thane": 0.47,
    "Versova": 1.00,
    "Vikhroli": 0.63,
    "Worli": 2.00
  },
  "Delhi": {
    "Connaught Place": 2.20,
    "Defence Colony": 1.70,
    "Dwarka": 0.65,
    "Greater Kailash": 1.45,
    "Hauz Khas": 1.50,
    "Janakpuri": 0.70,
    "Lajpat Nagar": 1.15,
    "Mayur Vihar": 0.75,
    "New Friends Colony": 1.25,
    "Paharganj": 0.60,
    "Rohini": 0.55,
    "Saket": 1.35,
    "South Extension": 1.60,
    "Vasant Kunj": 1.40,
    "Vasant Vihar": 1.80
  },
  "Bangalore": {
    "Indiranagar": 1.60,
    "Koramangala": 1.70,
    "Whitefield": 0.85,
    "HSR Layout": 1.40,
    "Jayanagar": 1.35,
    "JP Nagar": 1.20,
    "Electronic City": 0.65,
    "Bannerghatta Road": 0.90,
    "Hebbal": 0.80,
    "Malleswaram": 1.45,
    "Marathahalli": 0.80,
    "Yelahanka": 0.60,
    "BTM Layout": 1.10,
    "MG Road": 1.80,
    "Rajajinagar": 1.25
  },
  "Pune": {
    "Koregaon Park": 1.70,
    "Kalyani Nagar": 1.60,
    "Viman Nagar": 1.45,
    "Aundh": 1.30,
    "Baner": 1.25,
    "Kothrud": 1.15,
    "Hadapsar": 0.75,
    "Hinjewadi": 0.90,
    "Kharadi": 0.95,
    "Magarpatta City": 1.10,
    "Camp": 1.40,
    "Shivaji Nagar": 1.35,
    "Kondhwa": 0.80,
    "Wakad": 0.85,
    "Pimpri-Chinchwad": 0.65
  },
  "Hyderabad": {
    "Banjara Hills": 1.80,
    "Jubilee Hills": 1.95,
    "Gachibowli": 1.30,
    "Madhapur": 1.40,
    "HITEC City": 1.35,
    "Kondapur": 1.10,
    "Kukatpally": 0.85,
    "Miyapur": 0.70,
    "Secunderabad": 1.00,
    "Begumpet": 1.25,
    "Ameerpet": 1.15,
    "Somajiguda": 1.30,
    "Manikonda": 0.80,
    "Uppal": 0.65,
    "LB Nagar": 0.60
  },
  "Chennai": {
    "Anna Nagar": 1.50,
    "Adyar": 1.70,
    "T. Nagar": 1.60,
    "Velachery": 1.15,
    "Nungambakkam": 1.80,
    "Mylapore": 1.65,
    "Porur": 0.85,
    "Thoraipakkam": 0.95,
    "Sholinganallur": 0.90,
    "Guindy": 1.20,
    "Perungudi": 0.85,
    "Egmore": 1.45,
    "Besant Nagar": 1.75,
    "Kilpauk": 1.40,
    "OMR": 0.80
  }
};

// This function simulates calling the Python machine learning model
// In a real application, this would make an API call to a Python backend
export const predictPrice = (formData: any): { price: number; confidence: number } => {
  // Get base rate for selected city
  const cityBaseRate = cityBaseRates[formData.city] || 20000;
  
  // Get location factor for the selected neighborhood in the selected city
  const locationFactors = cityLocationFactors[formData.city] || cityLocationFactors["Mumbai"];
  const locationFactor = locationFactors[formData.neighborhood] || 1.0;
  
  // Calculate base price for selected neighborhood
  const basePrice = cityBaseRate * locationFactor;
  
  // Size factor with diminishing returns for larger properties
  const sizeFactor = Math.pow(formData.size / 1000, 0.9);
  
  // Room configuration factors
  const bedroomsFactor = Math.min(1.25, 1 + (formData.bedrooms * 0.07)); 
  const bathroomsFactor = Math.min(1.15, 1 + (formData.bathrooms * 0.04));
  
  // Property type multipliers based on luxury segment
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
