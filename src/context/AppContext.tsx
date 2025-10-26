import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Farmer, Consumer, Product, Order, Message, ForumPost, Review } from '../types';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  seller: string;
  unit: string;
  organic?: boolean;
  seasonal?: boolean;
}

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
  cartItems: CartItem[];
  addToCart: (product: Product, farmerId: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
      unit: 'Kg',
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
      unit: 'Kg',
      description: 'Sweet, juicy strawberries picked at peak ripeness',
      image: 'https://media.cnn.com/api/v1/images/stellar/prod/220506091853-01-strawberries-may-recipe-stock.jpg?c=16x9&q=h_833,w_1480,c_fill',
      inStock: 30,
      organic: true,
      seasonal: true,
      harvestDate: '2024-01-14',
      availableUntil: '2024-01-20'
    },
    {
      id: '3',
      farmerId: '1',
      name: 'Spinach',
      category: 'Vegetables',
      price: 4.50,
      unit: 'Kg',
      description: 'Fresh, crispy organic spinach perfect for salads',
      image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=600',
      inStock: 50,
      organic: true,
      seasonal: false,
      harvestDate: '2024-01-16',
      availableUntil: '2024-01-22'
    },
    {
      id: '4',
      farmerId: '2',
      name: 'Blueberries',
      category: 'Fruits',
      price: 9.50,
      unit: 'Kg',
      description: 'Plump, sweet blueberries bursting with flavor',
      image: 'https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg?auto=compress&cs=tinysrgb&w=600',
      inStock: 25,
      organic: true,
      seasonal: true,
      harvestDate: '2024-01-15',
      availableUntil: '2024-01-28'
    },
    {
      id: '5',
      farmerId: '1',
      name: 'Carrots',
      category: 'Vegetables',
      price: 3.50,
      unit: 'Kg',
      description: 'Crunchy, sweet carrots straight from the farm',
      image: 'https://images.pexels.com/photos/3650647/pexels-photo-3650647.jpeg?auto=compress&cs=tinysrgb&w=600',
      inStock: 60,
      organic: true,
      seasonal: false,
      harvestDate: '2024-01-14',
      availableUntil: '2024-02-14'
    },
    {
      id: '6',
      farmerId: '2',
      name: 'Fresh Apples',
      category: 'Fruits',
      price: 5.00,
      unit: 'Kg',
      description: 'Crisp, juicy apples perfect for snacking',
      image: 'https://images.pexels.com/photos/672101/pexels-photo-672101.jpeg?auto=compress&cs=tinysrgb&w=600',
      inStock: 75,
      organic: false,
      seasonal: true,
      harvestDate: '2024-01-10',
      availableUntil: '2024-02-10'
    },
    {
      id: '7',
      farmerId: '1',
      name: 'Bell Peppers',
      category: 'Vegetables',
      price: 7.00,
      unit: 'Kg',
      description: 'Colorful bell peppers in red, yellow, and green',
      image: 'https://images.pexels.com/photos/2280545/pexels-photo-2280545.jpeg?auto=compress&cs=tinysrgb&w=600',
      inStock: 40,
      organic: true,
      seasonal: false,
      harvestDate: '2024-01-17',
      availableUntil: '2024-01-27'
    },
    {
      id: '8',
      farmerId: '2',
      name: 'Peaches',
      category: 'Fruits',
      price: 7.50,
      unit: 'Kg',
      description: 'Juicy, ripe peaches with a sweet aroma',
      image: 'https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg?auto=compress&cs=tinysrgb&w=600',
      inStock: 35,
      organic: true,
      seasonal: true,
      harvestDate: '2024-01-13',
      availableUntil: '2024-01-23'
    },
    {
      id: '9',
      farmerId: '1',
      name: 'Fresh Basil',
      category: 'Herbs',
      price: 3.00,
      unit: 'bunch',
      description: 'Aromatic fresh basil for all your cooking needs',
      image: 'https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg?auto=compress&cs=tinysrgb&w=600',
      inStock: 20,
      organic: true,
      seasonal: false,
      harvestDate: '2024-01-18',
      availableUntil: '2024-01-25'
    },
    {
      id: '10',
      farmerId: '2',
      name: 'Avocados',
      category: 'Fruits',
      price: 6.00,
      unit: 'Kg',
      description: 'Creamy, ripe avocados perfect for guacamole',
      image: 'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&w=600',
      inStock: 45,
      organic: false,
      seasonal: false,
      harvestDate: '2024-01-12',
      availableUntil: '2024-01-26'
    },
    {
      id: '11',
      farmerId: '1',
      name: 'Broccoli',
      category: 'Vegetables',
      price: 4.00,
      unit: 'Kg',
      description: 'Fresh, green broccoli crowns packed with nutrients',
      image: 'https://images.pexels.com/photos/47347/broccoli-vegetable-food-healthy-47347.jpeg?auto=compress&cs=tinysrgb&w=600',
      inStock: 38,
      organic: true,
      seasonal: false,
      harvestDate: '2024-01-16',
      availableUntil: '2024-01-30'
    },
    {
      id: '12',
      farmerId: '2',
      name: 'Oranges',
      category: 'Fruits',
      price: 5.50,
      unit: 'Kg',
      description: 'Sweet, tangy oranges bursting with vitamin C',
      image: 'https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=600',
      inStock: 55,
      organic: false,
      seasonal: true,
      harvestDate: '2024-01-11',
      availableUntil: '2024-02-11'
    }
  ]);

  const [orders] = useState<Order[]>([]);
  const [messages] = useState<Message[]>([]);
  const [forumPosts] = useState<ForumPost[]>([]);
  const [reviews] = useState<Review[]>([]);

  // Cart functions
  const addToCart = (product: Product, farmerId: string) => {
    const farmer = farmers.find(f => f.id === farmerId);
    const existingItem = cartItems.find(item => item.productId === product.id);

    if (existingItem) {
      // If item exists, increase quantity
      setCartItems(items =>
        items.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Add new item
      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        seller: farmer?.farmName || 'Unknown Farm',
        unit: product.unit,
        organic: product.organic,
        seasonal: product.seasonal
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(items => items.filter(item => item.productId !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

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
      setOnboarding,
      cartItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart
    }}>
      {children}
    </AppContext.Provider>
  );
};