export interface User {
  id: string;
  name: string;
  email: string;
  type: 'farmer' | 'consumer';
  avatar?: string;
  location?: string;
  joinDate: string;
}

export interface Farmer extends User {
  type: 'farmer';
  farmName: string;
  description: string;
  farmSize: string;
  certifications: string[];
  practices: string[];
  coordinates?: [number, number];
  rating: number;
  totalReviews: number;
}

export interface Consumer extends User {
  type: 'consumer';
  preferences: string[];
  sustainabilityScore: number;
  favoritesFarmers: string[];
  greenBadges: string[];
}

export interface Product {
  id: string;
  farmerId: string;
  name: string;
  category: string;
  price: number;
  unit: 'kg' | 'bunch' | 'dozen' | 'each';
  description: string;
  image: string;
  inStock: number;
  organic: boolean;
  seasonal: boolean;
  harvestDate: string;
  availableUntil: string;
}

export interface Order {
  id: string;
  consumerId: string;
  farmerId: string;
  items: OrderItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  total: number;
  deliveryDate: string;
  deliveryAddress: string;
  createdAt: string;
  specialInstructions?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Message {
  id: string;
  fromId: string;
  toId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface ForumPost {
  id: string;
  authorId: string;
  title: string;
  content: string;
  category: 'recipe' | 'tip' | 'story' | 'question';
  images?: string[];
  likes: number;
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  authorId: string;
  content: string;
  likes: number;
  createdAt: string;
}

export interface Review {
  id: string;
  reviewerId: string;
  targetId: string;
  targetType: 'farmer' | 'consumer';
  rating: number;
  comment: string;
  createdAt: string;
}