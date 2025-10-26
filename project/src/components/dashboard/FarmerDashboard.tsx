import React, { useEffect, useState } from 'react';
import { 
  BarChart3, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  TrendingUp, 
  Package, 
  Star,
  Calendar,
  Plus,
  Eye,
  MessageSquare,
  Zap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const FarmerDashboard: React.FC = () => {
  const { currentUser } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      label: 'Total Sales',
      value: '₹25,000',
      change: '+12%',
      changeType: 'positive' as const,
      icon: DollarSign,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50'
    },
    {
      label: 'Active Orders',
      value: '18',
      change: '+3',
      changeType: 'positive' as const,
      icon: ShoppingCart,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'New Customers',
      value: '24',
      change: '+8%',
      changeType: 'positive' as const,
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Products Listed',
      value: '12',
      change: '+2',
      changeType: 'positive' as const,
      icon: Package,
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentOrders = [
    {
      id: '1',
      customer: 'Isha Saxena',
      items: 'Heirloom Tomatoes, Fresh Basil',
      total: '₹240',
      status: 'pending',
      date: '2 hours ago',
      avatar: 'https://i.pinimg.com/736x/63/f6/39/63f6391faa4c52309bbe8819ff32fa85.jpg'
    },
    {
      id: '2',
      customer: 'Ram Bhardwaj',
      items: 'Mixed Greens, Carrots',
      total: '₹180.75',
      status: 'confirmed',
      date: '4 hours ago',
      avatar: 'https://t4.ftcdn.net/jpg/03/67/70/91/360_F_367709147_W4Q2pRjMcz7jUkuH4e1BIhmtCDceu3FH.jpg'
    },
    {
      id: '3',
      customer: 'Lakshay Sharma',
      items: 'Strawberries, Spinach',
      total: '₹320.00',
      status: 'preparing',
      date: '6 hours ago',
      avatar: 'https://cdn.pixabay.com/photo/2022/03/11/06/14/indian-man-7061278_1280.jpg'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparing': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'ready': return 'bg-green-100 text-green-800 border-green-200';
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
                Welcome back, {currentUser?.name}! 👋
              </h1>
              <p className="text-slate-600 text-lg">Here's what's happening with your farm today</p>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              {/* <button className="btn-secondary flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                View Store
              </button> */}
              <button className="btn-primary flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                  <span className="text-sm text-emerald-600 font-semibold">{stat.change}</span>
                  <span className="text-sm text-slate-500 ml-1">from last week</span>
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
                  <ShoppingCart className="h-5 w-5 mr-3 text-emerald-600" />
                  Recent Orders
                </h2>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                  View All
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
                      src={order.avatar}
                      alt={order.customer}
                      className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-emerald-500/20"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-800">{order.customer}</h3>
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
            {/* Quick Actions */}
            {/* <div className={`glass-effect rounded-2xl shadow-lg p-6 fade-in-up`} style={{ animationDelay: '700ms' }}>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <Zap className="h-5 w-5 mr-3 text-yellow-500" />
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full btn-primary justify-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Product
                </button>
                <button className="w-full btn-secondary justify-center">
                  <Package className="h-4 w-4 mr-2" />
                  Update Inventory
                </button>
                <button className="w-full btn-secondary justify-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View Messages
                </button>
              </div>
            </div> */}

            {/* Performance Overview */}
            <div className={`glass-effect rounded-2xl shadow-lg p-6 fade-in-up`} style={{ animationDelay: '800ms' }}>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <Star className="h-5 w-5 mr-3 text-yellow-500" />
                Performance
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-slate-600">Customer Rating</span>
                    <span className="font-bold text-slate-800">4.8/5</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full shadow-sm" style={{ width: '96%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-slate-600">Order Fulfillment</span>
                    <span className="font-bold text-slate-800">94%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-emerald-400 to-green-400 h-3 rounded-full shadow-sm" style={{ width: '94%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-medium text-slate-600">Response Time</span>
                    <span className="font-bold text-slate-800">2.1 hrs</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-3 rounded-full shadow-sm" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className={`glass-effect rounded-2xl shadow-lg p-6 fade-in-up`} style={{ animationDelay: '900ms' }}>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-blue-500" />
                Upcoming
              </h2>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-blue-50/50 rounded-xl border border-blue-200/50">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-4 animate-pulse"></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Farmers Market</p>
                    <p className="text-xs text-slate-600">Saturday, 8:00 AM</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/50">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-4 animate-pulse"></div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Harvest Season</p>
                    <p className="text-xs text-slate-600">Tomatoes ready next week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;