import React, { useEffect, useState } from 'react';
import { Leaf, Users, Truck, Heart, Sparkles, ArrowRight, Star } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Welcome: React.FC = () => {
  const { setCurrentPage, setOnboarding } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    setOnboarding(true);
    setCurrentPage('onboarding-type');
  };

  const features = [
    {
      icon: Leaf,
      title: 'Sustainable',
      description: 'Support eco-friendly farming practices and reduce your carbon footprint',
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50',
      delay: '0ms',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect directly with local farmers and build lasting relationships',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      delay: '200ms',
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Truck,
      title: 'Fresh Delivery',
      description: 'Get farm-fresh produce delivered straight to your door',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50',
      delay: '400ms',
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      icon: Heart,
      title: 'Local Impact',
      description: 'Make a positive impact on your local community and economy',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      delay: '600ms',
      image: 'https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const stats = [
    { number: '500+', label: 'Local Farmers', color: 'text-emerald-600' },
    { number: '10,000+', label: 'Happy Customers', color: 'text-blue-600' },
    { number: '50,000+', label: 'Pounds of Produce', color: 'text-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-teal-400/10 to-emerald-400/10 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <Leaf className="h-16 w-16 text-emerald-600 floating-animation" />
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500 animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold gradient-text">
              FarmConnect
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Connecting local farmers with conscious consumers for a 
            <span className="gradient-text font-semibold"> more sustainable future</span>
          </p>
        </div>

        {/* Hero Section */}
        <div className={`relative mb-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img
              src="https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Beautiful farm landscape with green fields"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-6">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
                  Farm Fresh, <br />
                  <span className="text-emerald-400">Locally Sourced</span>
                </h2>
                <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed opacity-90">
                  Discover the freshest produce from local farmers in your area while supporting sustainable agriculture and building community connections
                </p>
                <button
                  onClick={handleGetStarted}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-emerald-700 hover:to-green-700"
                >
                  <span className="relative z-10 flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-green-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`glass-effect p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 card-hover fade-in-up`}
                style={{ animationDelay: feature.delay }}
              >
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-32 object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className={`${feature.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                  <Icon className={`h-8 w-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 text-center">{feature.title}</h3>
                <p className="text-slate-600 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className={`glass-effect rounded-3xl shadow-2xl p-10 mb-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-display font-bold text-slate-800 mb-4">
              Join Our <span className="gradient-text">Growing Community</span>
            </h2>
            <p className="text-slate-600 text-lg">
              Thousands of farmers and consumers are already making a difference
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center group">
                <div className={`text-5xl font-bold ${stat.color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
                <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mx-auto mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Section */}
        <div className={`mb-20 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="glass-effect rounded-3xl p-10 text-center">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl font-display text-slate-700 mb-6 italic">
              "FarmConnect has transformed how we connect with our community. The platform is beautiful, easy to use, and has helped us reach customers who truly value sustainable farming."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <img
                src="https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Sarah Johnson"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="font-semibold text-slate-800">Sarah Johnson</div>
                <div className="text-slate-600">Green Acres Farm</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-1100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl font-display font-bold text-slate-800 mb-6">
            Ready to <span className="gradient-text">Get Started?</span>
          </h2>
          <p className="text-slate-600 mb-10 max-w-3xl mx-auto text-lg leading-relaxed">
            Whether you're a farmer looking to reach more customers or a consumer wanting fresh, local produce, we're here to help you connect and build a more sustainable future together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleGetStarted}
              className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 pulse-glow"
            >
              <span className="relative z-10 flex items-center">
                Join FarmConnect Today
                <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </button>
            <div className="flex items-center space-x-2 text-slate-600">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=100" alt="" />
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100" alt="" />
                <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100" alt="" />
              </div>
              <span className="text-sm">Join 10,000+ happy users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;