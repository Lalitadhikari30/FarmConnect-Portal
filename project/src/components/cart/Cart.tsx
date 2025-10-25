import React, { useState } from 'react';
import { 
  Bell, 
  BellRing, 
  Package, 
  Truck, 
  ShoppingCart, 
  Star, 
  Users, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Leaf,
  X,
  Settings,
  Filter,
  MoreVertical,
  ChevronDown
} from 'lucide-react';

const NotificationsPage = () => {
  const [filter, setFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order of organic tomatoes from Green Valley Farm has been shipped!',
      time: '2 minutes ago',
      read: false,
      icon: Truck,
      color: 'text-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      borderColor: 'border-blue-200'
    },
    {
      id: 2,
      type: 'product',
      title: 'New Seasonal Produce Available',
      message: 'Fresh strawberries are now available from Sunrise Farm. Limited quantity!',
      time: '15 minutes ago',
      read: false,
      icon: Leaf,
      color: 'text-emerald-600',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-green-100',
      borderColor: 'border-emerald-200'
    },
    {
      id: 3,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order has been successfully delivered. Enjoy your fresh produce!',
      time: '1 hour ago',
      read: true,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
      borderColor: 'border-green-200'
    },
    {
      id: 4,
      type: 'community',
      title: 'New Review',
      message: 'Someone left a 5-star review for Mountain View Farm!',
      time: '2 hours ago',
      read: false,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-gradient-to-br from-yellow-50 to-amber-100',
      borderColor: 'border-yellow-200'
    },
    {
      id: 5,
      type: 'alert',
      title: 'Weather Alert',
      message: 'Heavy rain expected in your area. Some deliveries might be delayed.',
      time: '3 hours ago',
      read: true,
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-50 to-red-100',
      borderColor: 'border-orange-200'
    },
    {
      id: 6,
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your order from Organic Valley Farm has been confirmed and is being prepared.',
      time: '5 hours ago',
      read: true,
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-indigo-100',
      borderColor: 'border-purple-200'
    },
    {
      id: 7,
      type: 'community',
      title: 'New Farmer Joined',
      message: 'Riverside Gardens has joined FarmConnect! Check out their organic herbs.',
      time: '1 day ago',
      read: true,
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-blue-100',
      borderColor: 'border-indigo-200'
    },
    {
      id: 8,
      type: 'product',
      title: 'Price Drop Alert',
      message: 'Organic carrots from Happy Fields are now 20% off for a limited time!',
      time: '2 days ago',
      read: true,
      icon: Package,
      color: 'text-pink-600',
      bgColor: 'bg-gradient-to-br from-pink-50 to-rose-100',
      borderColor: 'border-pink-200'
    }
  ]);

  const filterOptions = [
    { value: 'all', label: 'All Notifications', count: notifications.length },
    { value: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { value: 'order', label: 'Orders', count: notifications.filter(n => n.type === 'order').length },
    { value: 'product', label: 'Products', count: notifications.filter(n => n.type === 'product').length },
    { value: 'community', label: 'Community', count: notifications.filter(n => n.type === 'community').length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.type === filter;
  });

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-emerald-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="relative">
                  <Leaf className="h-10 w-10 text-emerald-500 animate-bounce drop-shadow-sm" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse shadow-sm"></div>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  Notifications
                </h1>
                <p className="text-slate-600 font-medium">
                  {unreadCount > 0 ? (
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
                      {unreadCount} unread notifications
                    </span>
                  ) : (
                    <span className="flex items-center text-emerald-600">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      All caught up!
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={markAllAsRead}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={unreadCount === 0}
              >
                Mark all as read
              </button>
              <button className="p-3 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 hover:shadow-md">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
            <nav className="flex space-x-2 overflow-x-auto">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={`whitespace-nowrap px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center space-x-2 ${
                    filter === option.value
                      ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg transform scale-105'
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50'
                  }`}
                >
                  <span>{option.label}</span>
                  {option.count > 0 && (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                      filter === option.value
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {option.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-green-200 rounded-full mx-auto flex items-center justify-center">
                  <Bell className="h-10 w-10 text-emerald-500" />
                </div>
                <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-700 mb-2">No notifications</h3>
              <p className="text-slate-500">
                {filter === 'all' 
                  ? "You're all caught up! Check back later for updates."
                  : `No ${filter} notifications at the moment.`
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <div
                  key={notification.id}
                  className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    !notification.read 
                      ? 'border-l-4 border-l-emerald-500 border-emerald-200 ring-2 ring-emerald-100' 
                      : 'border-slate-200 hover:border-emerald-200'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-12 h-12 ${notification.bgColor} rounded-2xl flex items-center justify-center shadow-sm border ${notification.borderColor}`}>
                        <Icon className={`h-6 w-6 ${notification.color}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`text-base font-bold flex items-center ${
                            !notification.read ? 'text-slate-800' : 'text-slate-600'
                          }`}>
                            {notification.title}
                            {!notification.read && (
                              <span className="ml-3 w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-pulse shadow-sm"></span>
                            )}
                          </h3>
                          
                          <div className="flex items-center space-x-3">
                            <span className="text-xs text-slate-500 flex items-center bg-slate-100 px-3 py-1 rounded-full">
                              <Clock className="h-3 w-3 mr-1" />
                              {notification.time}
                            </span>
                            <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all duration-200">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <p className={`text-sm leading-relaxed ${
                          !notification.read ? 'text-slate-700' : 'text-slate-500'
                        }`}>
                          {notification.message}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center space-x-4 mt-4">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-sm text-emerald-600 hover:text-emerald-700 font-semibold hover:bg-emerald-50 px-3 py-1 rounded-lg transition-all duration-200"
                            >
                              Mark as read
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-sm text-slate-500 hover:text-red-600 font-medium hover:bg-red-50 px-3 py-1 rounded-lg transition-all duration-200"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Load More Button */}
        {filteredNotifications.length > 0 && (
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-2xl text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex items-center space-x-2 mx-auto">
              <span>Load more notifications</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;