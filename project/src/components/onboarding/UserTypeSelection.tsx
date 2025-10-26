import React, { useEffect, useState } from 'react';
import { Tractor, ShoppingCart, ArrowLeft, Sparkles, Users, Leaf } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const UserTypeSelection: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleUserTypeSelect = (userType: 'farmer' | 'consumer') => {
    setCurrentPage(`onboarding-${userType}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button
            onClick={() => setCurrentPage('welcome')}
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8 font-medium transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <h1 className="text-5xl font-display font-bold gradient-text mb-6">
            How will you use <span className="text-emerald-600">FarmConnect?</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Choose your role to get a personalized experience tailored just for you
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Farmer Card */}
          <div
            onClick={() => handleUserTypeSelect('farmer')}
            className={`glass-effect rounded-3xl shadow-2xl p-8 cursor-pointer hover:shadow-3xl transition-all duration-500 transform hover:scale-105 border-2 border-transparent hover:border-emerald-200 group card-hover fade-in-up`}
            style={{ animationDelay: '300ms' }}
          >
            <div className="text-center">
              <div className="bg-gradient-to-br from-emerald-100 to-green-100 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Tractor className="h-12 w-12 text-emerald-600" />
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h2 className="text-3xl font-display font-bold text-slate-800 mb-4">I'm a Farmer</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Sell your fresh produce directly to consumers in your community. Manage your inventory, connect with customers, and grow your sustainable business.
              </p>
              
              <div className="space-y-4 text-left mb-8">
                {[
                  'List and manage your produce',
                  'Connect with local consumers',
                  'Track your sales and impact',
                  'Access farming resources'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-slate-700">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Started as Farmer
              </button>
            </div>
          </div>

          {/* Consumer Card */}
          <div
            onClick={() => handleUserTypeSelect('consumer')}
            className={`glass-effect rounded-3xl shadow-2xl p-8 cursor-pointer hover:shadow-3xl transition-all duration-500 transform hover:scale-105 border-2 border-transparent hover:border-blue-200 group card-hover fade-in-up`}
            style={{ animationDelay: '500ms' }}
          >
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="h-12 w-12 text-blue-600" />
                <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h2 className="text-3xl font-display font-bold text-slate-800 mb-4">I'm a Consumer</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Discover fresh, local produce from farmers in your area. Support sustainable agriculture while getting the best ingredients for your table.
              </p>
              
              <div className="space-y-4 text-left mb-8">
                {[
                  'Shop fresh, local produce',
                  'Connect with local farmers',
                  'Track your sustainability impact',
                  'Learn about sustainable eating'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-slate-700">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Get Started as Consumer
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="glass-effect rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-emerald-600 mr-2" />
              <Leaf className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-slate-600 text-lg">
              Don't worry - you can always change your preferences later in your profile settings. 
              Join our community of <span className="font-semibold text-emerald-600">10,000+ users</span> making a difference!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;