import React, { useEffect, useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Leaf, 
  Star, 
  TrendingUp, 
  MapPin,
  Calendar,
  Award,
  Zap,
  Eye,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const ConsumerDashboard: React.FC = () => {
  const { currentUser } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      label: 'Orders This Month',
      value: '8',
      change: '+2 from last month',
      icon: ShoppingBag,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Favorite Farmers',
      value: '5',
      change: '2 new this month',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50'
    }
  ];

  const recentOrders = [
    {
      id: '1',
      farmer: 'Green Acres Farm',
      items: 'Heirloom Tomatoes, Fresh Basil',
      total: '₹24,000',
      status: 'delivered',
      date: '2 days ago',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      farmer: 'Valley Fruits Orchard',
      items: 'Mixed Berries, Organic Apples',
      total: '₹320.00',
      status: 'preparing',
      date: '1 day ago',
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const favoriteFarmers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      farmName: 'Green Acres Farm',
      specialty: 'Organic Vegetables',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '2',
      name: 'Michael Chen',
      farmName: 'Valley Fruits Orchard',
      specialty: 'Stone Fruits & Berries',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const sustainabilityTips = [
    {
      title: 'Seasonal Eating',
      description: 'Choose seasonal produce to reduce environmental impact',
      icon: Calendar
    },
    {
      title: 'Local Sourcing',
      description: 'Shop within 25 miles to minimize transportation emissions',
      icon: MapPin
    },
    {
      title: 'Organic Choices',
      description: 'Support sustainable farming practices',
      icon: Leaf
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'preparing': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-display font-bold gradient-text mb-2">
                Welcome back, {currentUser?.name}! 🌱
              </h1>
              <p className="text-slate-600 text-lg">Track your sustainable shopping journey</p>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <button className="flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 hover:from-emerald-600 hover:to-green-600">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Browse Marketplace
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className={`glass-effect rounded-2xl shadow-lg p-6 card-hover fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.bgColor} p-3 rounded-xl`}>
                    <Icon className={`h-6 w-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-emerald-500 mr-2" />
                  <span className="text-sm text-slate-500">{stat.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2 glass-effect rounded-2xl shadow-lg">
            <div className="p-6 border-b border-slate-200/50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-800 flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-3 text-emerald-600" />
                  Recent Orders
                </h2>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                  View All Orders
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div 
                    key={order.id} 
                    className={`flex items-center p-4 bg-white/50 border border-slate-200/50 rounded-xl hover:bg-white/80 transition-all duration-300 card-hover fade-in-up`}
                    style={{ animationDelay: `${(index + 4) * 100}ms` }}
                  >
                    <img
                      src={order.image}
                      alt={order.farmer}
                      className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-emerald-500/20"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-800">{order.farmer}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{order.items}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-500">{order.date}</span>
                        <span className="font-bold text-emerald-600">{order.total}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Favorite Farmers */}
            <div className={`glass-effect rounded-2xl shadow-lg p-6 fade-in-up`} style={{ animationDelay: '600ms' }}>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <Heart className="h-5 w-5 mr-3 text-pink-600" />
                Favorite Farmers
              </h2>
              <div className="space-y-4">
                {favoriteFarmers.map((farmer) => (
                  <div key={farmer.id} className="flex items-center p-3 bg-white/50 border border-slate-200/50 rounded-xl hover:bg-white/80 transition-all duration-300">
                    <img
                      src={farmer.image}
                      alt={farmer.name}
                      className="w-10 h-10 rounded-full object-cover mr-3 ring-2 ring-pink-500/20"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 text-sm">{farmer.farmName}</h3>
                      <p className="text-xs text-slate-600">{farmer.specialty}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                        <span className="text-xs text-slate-600">{farmer.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sustainability Tips */}
            <div className={`glass-effect rounded-2xl shadow-lg p-6 fade-in-up`} style={{ animationDelay: '700ms' }}>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <Leaf className="h-5 w-5 mr-3 text-emerald-600" />
                Sustainability Tips
              </h2>
              <div className="space-y-4">
                {sustainabilityTips.map((tip, index) => {
                  const Icon = tip.icon;
                  return (
                    <div key={index} className="flex items-start p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/50">
                      <Icon className="h-4 w-4 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-semibold text-slate-800">{tip.title}</h3>
                        <p className="text-xs text-slate-600 mt-1">{tip.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`glass-effect rounded-2xl shadow-lg p-6 fade-in-up`} style={{ animationDelay: '800ms' }}>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <Zap className="h-5 w-5 mr-3 text-yellow-500" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-emerald-600 hover:to-green-600">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Browse Marketplace
                </button>
                <button className="w-full flex items-center justify-center px-6 py-3 bg-white/70 border border-slate-200 text-slate-700 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 hover:bg-white/90 hover:border-slate-300">
                  <Award className="h-4 w-4 mr-2" />
                  View Sustainability Report
                </button>
                <button className="w-full flex items-center justify-center px-6 py-3 bg-white/70 border border-slate-200 text-slate-700 rounded-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 hover:bg-white/90 hover:border-slate-300">
                  <Users className="h-4 w-4 mr-2" />
                  Join Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;