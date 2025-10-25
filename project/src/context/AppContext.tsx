import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Farmer, Consumer, Product, Order, Message, ForumPost, Review } from '../types';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  farmers: Farmer[];
  consumers: Consumer[];
  products: Product[];
  orders: Order[];
  messages: Message[];
  forumPosts: ForumPost[];
  reviews: Review[];
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onboarding: boolean;
  setOnboarding: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('welcome');
  const [onboarding, setOnboarding] = useState(false);

  // Mock data
  const [farmers] = useState<Farmer[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@greenacres.com',
      type: 'farmer',
      avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Sonoma County, CA',
      joinDate: '2023-01-15',
      farmName: 'Green Acres Farm',
      description: 'Organic vegetable farm specializing in heirloom tomatoes and seasonal produce',
      farmSize: '25 acres',
      certifications: ['USDA Organic', 'Biodynamic'],
      practices: ['Crop Rotation', 'Companion Planting', 'Water Conservation'],
      coordinates: [38.291859, -122.4580356],
      rating: 4.8,
      totalReviews: 127
    },
    {
      id: '2',
      name: 'Michael Chen',
      email: 'mike@valleyfruits.com',
      type: 'farmer',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Central Valley, CA',
      joinDate: '2022-08-22',
      farmName: 'Valley Fruits Orchard',
      description: 'Family-owned orchard growing stone fruits and berries for three generations',
      farmSize: '50 acres',
      certifications: ['USDA Organic', 'Fair Trade'],
      practices: ['Integrated Pest Management', 'Cover Cropping'],
      coordinates: [36.7783, -119.4179],
      rating: 4.9,
      totalReviews: 89
    }
  ]);

  const [consumers] = useState<Consumer[]>([]);

  const [products] = useState<Product[]>([
    {
      id: '1',
      farmerId: '1',
      name: 'Heirloom Tomatoes',
      category: 'Vegetables',
      price: 6.50,
      unit: 'lb',
      description: 'Beautiful heirloom tomatoes in various colors and sizes',
      image: 'https://images.pexels.com/photos/6824422/pexels-photo-6824422.jpeg?auto=compress&cs=tinysrgb&w=600',
      inStock: 45,
      organic: true,
      seasonal: true,
      harvestDate: '2024-01-15',
      availableUntil: '2024-01-25'
    },
    {
      id: '2',
      farmerId: '2',
      name: 'Fresh Strawberries',
      category: 'Fruits',
      price: 8.00,
      unit: 'lb',
      description: 'Sweet, juicy strawberries picked at peak ripeness',
      image: 'https://images.pexels.com/photos/5529461/pexels-photo-5529461.jpeg?auto=compress&cs=tinysrgb&w=600',
      inStock: 30,
      organic: true,
      seasonal: true,
      harvestDate: '2024-01-14',
      availableUntil: '2024-01-20'
    }
  ]);

  const [orders] = useState<Order[]>([]);
  const [messages] = useState<Message[]>([]);
  const [forumPosts] = useState<ForumPost[]>([]);
  const [reviews] = useState<Review[]>([]);

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      farmers,
      consumers,
      products,
      orders,
      messages,
      forumPosts,
      reviews,
      currentPage,
      setCurrentPage,
      onboarding,
      setOnboarding
    }}>
      {children}
    </AppContext.Provider>
  );
};