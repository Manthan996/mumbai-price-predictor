
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer

# This is a simulation of a trained model
# In a real application, you would train this on actual property data
class IndianPropertyPriceModel:
    def __init__(self):
        # City base rates (per square foot in rupees)
        self.city_base_rates = {
            "Mumbai": 30000,
            "Delhi": 25000,
            "Bangalore": 18000,
            "Pune": 15000,
            "Hyderabad": 13000,
            "Chennai": 16000
        }
        
        # Location importance factors for each city
        self.location_factors = {
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
        }
        
        # Property type multipliers
        self.property_type_factors = {
            "Villa": 1.5,
            "Independent House": 1.35,
            "Penthouse": 1.4,
            "Apartment": 1.0,
            "Builder Floor": 0.95,
            "Studio Apartment": 0.85
        }
        
        # Furnishing premium factors
        self.furnishing_factors = {
            "Fully Furnished": 1.15,
            "Semi-Furnished": 1.07,
            "Unfurnished": 1.0
        }
        
        # In a real implementation, we would build and train a model:
        # self.model = self._build_model()
        # self._train_model(data)

    def predict(self, input_data):
        """
        Predict property price based on input features
        This implementation uses a rule-based approach mimicking a ML model
        A real implementation would use: return self.model.predict(processed_input)[0]
        """
        # Extract features
        city = input_data.get("city", "Mumbai")
        neighborhood = input_data.get("neighborhood", "Andheri West")
        property_type = input_data.get("propertyType", "Apartment")
        size = input_data.get("size", 800)
        bedrooms = input_data.get("bedrooms", 2)
        bathrooms = input_data.get("bathrooms", 2)
        age = input_data.get("age", 5)
        furnishing = input_data.get("furnishing", "Semi-Furnished")
        amenities = input_data.get("amenities", [])
        
        # Get base rate for selected city
        city_base_rate = self.city_base_rates.get(city, 20000)
        
        # Get location factor for the selected neighborhood in the selected city
        city_locations = self.location_factors.get(city, {})
        location_factor = city_locations.get(neighborhood, 1.0)
        
        # Calculate base price based on location
        base_price = city_base_rate * location_factor
        
        # Apply size factor (with diminishing returns for larger properties)
        size_factor = np.power(size / 1000, 0.9)
        
        # Apply room configurations
        bedrooms_factor = min(1.25, 1 + (bedrooms * 0.07))
        bathrooms_factor = min(1.15, 1 + (bathrooms * 0.04))
        
        # Apply property type factor
        property_type_factor = self.property_type_factors.get(property_type, 1.0)
        
        # Apply furnishing factor
        furnishing_factor = self.furnishing_factors.get(furnishing, 1.0)
        
        # Apply age factor (exponential decay with floor)
        age_factor = max(0.75, np.exp(-0.015 * age))
        
        # Apply amenities factor
        amenities_count = len(amenities)
        amenities_factor = 1 + (amenities_count > 0) * (0.02 + (amenities_count - 1) * 0.01)
        
        # Calculate price per square foot
        price_per_sqft = base_price * property_type_factor * age_factor * furnishing_factor * amenities_factor
        
        # Calculate total price
        total_price = price_per_sqft * size * bedrooms_factor * bathrooms_factor
        
        # Apply realistic market variance (+/- 5%)
        market_variance = 0.95 + np.random.random() * 0.1
        total_price = total_price * market_variance
        
        # Round to nearest lakh (100,000)
        total_price = round(total_price / 100000) * 100000
        
        # Calculate confidence score
        confidence_base = 0.85
        if bedrooms > 4: confidence_base -= 0.02
        if bathrooms > bedrooms + 1: confidence_base -= 0.03
        if size > 3000: confidence_base -= 0.02
        if age > 20: confidence_base -= 0.02
        if amenities_count > 5: confidence_base += 0.02
        
        confidence = min(0.95, max(0.75, confidence_base + (np.random.random() * 0.04 - 0.02)))
        
        return {
            "price": total_price,
            "confidence": confidence
        }

# For demonstration - in a real app this would be an API endpoint
def predict_price(input_data):
    model = IndianPropertyPriceModel()
    return model.predict(input_data)
