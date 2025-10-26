import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { 
  Home, 
  Store, 
  User, 
  MessageCircle, 
  BarChart3, 
  Heart, 
  BookOpen,
  Users,
  Leaf,
  Star,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navigation: React.FC = () => {
  const { currentUser, currentPage, setCurrentPage } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!currentUser) return null;

  const navItems = currentUser.type === 'farmer' ? [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'marketplace', label: 'Marketplace', icon: Store },
    { id: 'orders', label: 'Orders', icon: Home },
    { id: 'Help', label: 'Help & Support', icon: MessageCircle },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'knowledge', label: 'Knowledge Hub', icon: BookOpen },
    { id: 'sustainability', label: 'Impact', icon: Leaf },
    { id: 'Profile', label: 'Profile', icon: User }
  ] : [
    { id: 'marketplace', label: 'Marketplace', icon: Store },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'orders', label: 'Orders', icon: Home },
    { id: 'Help', label: 'Help & Support', icon: MessageCircle },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'knowledge', label: 'Knowledge Hub', icon: BookOpen },
    { id: 'sustainability', label: 'Impact', icon: Leaf },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'Profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="glass-effect border-b border-white/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 min-w-fit">
            <div className="relative">
              <Leaf className="h-8 w-8 text-emerald-600 floating-animation" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-display font-bold gradient-text whitespace-nowrap">FarmConnect</span>
          </div>
          
          {/* Desktop Navigation - Centered with uniform spacing */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-4xl mx-8">
            <div className="flex items-center space-x-2 xl:space-x-4">
              {navItems.slice(0, 6).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`nav-item ${currentPage === item.id ? 'active' : ''} 
                      flex items-center justify-center space-x-2 px-3 py-2 rounded-lg 
                      transition-all duration-300 hover:bg-white/20 hover:backdrop-blur-sm hover:shadow-md hover:-translate-y-0.5
                      ${currentPage === item.id ? 'bg-emerald-500/20 text-emerald-700 font-semibold shadow-md' : 'text-slate-600 hover:text-emerald-600'}
                      min-w-fit whitespace-nowrap`}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    <span className="hidden xl:block text-sm">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3 min-w-fit">
            {/* Notifications */}
            <button className="relative p-2 text-slate-600 hover:text-emerald-600 transition-colors duration-200 rounded-lg hover:bg-white/10">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </button>

            {/* User Profile - Now Clickable */}
            <button
              onClick={() => setCurrentPage('Profile')}
              className="flex items-center space-x-3 bg-white/50 rounded-xl px-3 py-2 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-emerald-500/30"
            >
              <img
                src={currentUser.avatar || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400'}
                alt={currentUser.name}
                className="h-8 w-8 rounded-full object-cover ring-2 ring-emerald-500/20"
              />
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-slate-800 whitespace-nowrap">{currentUser.name}</div>
                <div className="text-xs text-slate-500 capitalize">{currentUser.type}</div>
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-emerald-600 transition-colors duration-200 rounded-lg hover:bg-white/10"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="glass-effect border-t border-white/20 px-4 py-4">
          <div className="grid grid-cols-2 gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`nav-item ${currentPage === item.id ? 'active' : ''} 
                    flex items-center space-x-2 justify-center py-3 px-3 rounded-lg
                    transition-all duration-300 hover:bg-white/20 hover:shadow-md hover:-translate-y-0.5
                    ${currentPage === item.id ? 'bg-emerald-500/20 text-emerald-700 font-semibold shadow-md' : 'text-slate-600 hover:text-emerald-600'}`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span className="text-sm whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;