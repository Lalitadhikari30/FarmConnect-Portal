import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  TrendingUp, 
  Award, 
  Target,
  Recycle,
  Droplets,
  Sun,
  TreePine,
  BarChart3,
  Calendar,
  MapPin,
  Users
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Sustainability: React.FC = () => {
  const { currentUser } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const impactStats = [
    {
      label: 'CO2 Saved',
      value: '127 lbs',
      change: '+23%',
      icon: Leaf,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50',
      description: 'Carbon footprint reduced by shopping locally'
    },
    {
      label: 'Water Conserved',
      value: '2,340 gal',
      change: '+18%',
      icon: Droplets,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      description: 'Water saved through sustainable farming practices'
    },
    {
      label: 'Miles Saved',
      value: '1,250 mi',
      change: '+31%',
      icon: MapPin,
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-50',
      description: 'Transportation miles reduced by local sourcing'
    },
    {
      label: 'Trees Equivalent',
      value: '12 trees',
      change: '+15%',
      icon: TreePine,
      color: 'from-green-600 to-emerald-600',
      bgColor: 'bg-green-50',
      description: 'Environmental impact equivalent to planting trees'
    }
  ];

  const sustainabilityGoals = [
    {
      title: 'Reduce Carbon Footprint',
      current: 127,
      target: 200,
      unit: 'lbs CO2',
      color: 'emerald',
      icon: Leaf
    },
    {
      title: 'Support Local Farmers',
      current: 8,
      target: 12,
      unit: 'farmers',
      color: 'blue',
      icon: Users
    },
    {
      title: 'Seasonal Shopping',
      current: 75,
      target: 90,
      unit: '% seasonal',
      color: 'orange',
      icon: Sun
    },
    {
      title: 'Waste Reduction',
      current: 85,
      target: 95,
      unit: '% utilized',
      color: 'green',
      icon: Recycle
    }
  ];

  const badges = [
    {
      name: 'Local Hero',
      description: 'Shopped from 5+ local farmers',
      icon: Award,
      earned: true,
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300'
    },
    {
      name: 'Eco Warrior',
      description: 'Saved 100+ lbs of CO2',
      icon: Leaf,
      earned: true,
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    {
      name: 'Seasonal Shopper',
      description: '80% seasonal purchases',
      icon: Sun,
      earned: true,
      color: 'bg-orange-100 text-orange-800 border-orange-300'
    },
    {
      name: 'Water Guardian',
      description: 'Conserved 2000+ gallons',
      icon: Droplets,
      earned: false,
      color: 'bg-slate-100 text-slate-500 border-slate-300'
    }
  ];

  const getProgressColor = (color: string) => {
    switch (color) {
      case 'emerald': return 'from-emerald-400 to-emerald-600';
      case 'blue': return 'from-blue-400 to-blue-600';
      case 'orange': return 'from-orange-400 to-orange-600';
      case 'green': return 'from-green-400 to-green-600';
      default: return 'from-slate-400 to-slate-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-display font-bold gradient-text mb-2">Sustainability Impact</h1>
              <p className="text-slate-600 text-lg">Track your environmental impact and sustainable choices</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 backdrop-blur-sm"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {impactStats.map((stat, index) => {
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
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  <TrendingUp className="h-4 w-4 text-emerald-500 mr-2" />
                  <span className="text-sm text-emerald-600 font-semibold">{stat.change}</span>
                  <span className="text-sm text-slate-500 ml-1">from last {selectedPeriod}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{stat.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sustainability Goals */}
          <div className="lg:col-span-2 glass-effect rounded-2xl shadow-lg">
            <div className="p-6 border-b border-slate-200/50">
              <h2 className="text-xl font-bold text-slate-800 flex items-center">
                <Target className="h-5 w-5 mr-3 text-emerald-600" />
                Sustainability Goals
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {sustainabilityGoals.map((goal, index) => {
                  const Icon = goal.icon;
                  const progress = (goal.current / goal.target) * 100;
                  
                  return (
                    <div 
                      key={goal.title} 
                      className={`p-4 bg-white/50 border border-slate-200/50 rounded-xl fade-in-up`}
                      style={{ animationDelay: `${(index + 4) * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <Icon className="h-5 w-5 text-slate-600 mr-3" />
                          <h3 className="font-semibold text-slate-800">{goal.title}</h3>
                        </div>
                        <span className="text-sm font-medium text-slate-600">
                          {goal.current} / {goal.target} {goal.unit}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
                        <div 
                          className={`bg-gradient-to-r ${getProgressColor(goal.color)} h-3 rounded-full transition-all duration-1000 shadow-sm`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>{Math.round(progress)}% complete</span>
                        <span>{goal.target - goal.current} {goal.unit} to go</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Green Badges */}
            <div className={`glass-effect rounded-2xl shadow-lg p-6 fade-in-up`} style={{ animationDelay: '800ms' }}>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <Award className="h-5 w-5 mr-3 text-yellow-500" />
                Green Badges
              </h2>
              <div className="space-y-4">
                {badges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <div 
                      key={badge.name} 
                      className={`flex items-center p-3 rounded-xl border transition-all duration-300 ${
                        badge.earned ? badge.color + ' hover:scale-105' : badge.color
                      }`}
                    >
                      <Icon className="h-6 w-6 mr-3" />
                      <div>
                        <h3 className="font-semibold text-sm">{badge.name}</h3>
                        <p className="text-xs opacity-80">{badge.description}</p>
                      </div>
                      {badge.earned && (
                        <div className="ml-auto">
                          <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Monthly Challenge */}
            <div className={`glass-effect rounded-2xl shadow-lg p-6 fade-in-up`} style={{ animationDelay: '900ms' }}>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-blue-500" />
                Monthly Challenge
              </h2>
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Recycle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-800 mb-2">Zero Waste Week</h3>
                <p className="text-sm text-slate-600 mb-4">Use 100% of your purchased produce this week</p>
                <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <p className="text-xs text-slate-500">65% complete • 2 days left</p>
              </div>
            </div>

            {/* Impact Comparison */}
            <div className={`glass-effect rounded-2xl shadow-lg p-6 fade-in-up`} style={{ animationDelay: '1000ms' }}>
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <BarChart3 className="h-5 w-5 mr-3 text-emerald-500" />
                Community Impact
              </h2>
              <div className="space-y-4">
                <div className="text-center p-4 bg-emerald-50/50 rounded-xl">
                  <p className="text-2xl font-bold text-emerald-600">Top 15%</p>
                  <p className="text-sm text-slate-600">Most sustainable shoppers</p>
                </div>
                <div className="text-center p-4 bg-blue-50/50 rounded-xl">
                  <p className="text-2xl font-bold text-blue-600">2,340 lbs</p>
                  <p className="text-sm text-slate-600">Community CO2 saved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;