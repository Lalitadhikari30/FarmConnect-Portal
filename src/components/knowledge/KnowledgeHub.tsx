import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Play, 
  Download, 
  Star, 
  Clock,
  Users,
  Award,
  Search,
  Filter,
  Bookmark,
  TrendingUp,
  Leaf,
  Lightbulb,
  Video,
  FileText,
  Headphones
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'podcast' | 'guide';
  category: string;
  author: string;
  duration: string;
  rating: number;
  reviews: number;
  image: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isBookmarked: boolean;
  isPremium: boolean;
}

const KnowledgeHub: React.FC = () => {
  const { currentUser } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 'all', label: 'All Topics', icon: BookOpen },
    { id: 'organic-farming', label: 'Organic Farming', icon: Leaf },
    { id: 'sustainable-eating', label: 'Sustainable Eating', icon: TrendingUp },
    { id: 'seasonal-cooking', label: 'Seasonal Cooking', icon: Star },
    { id: 'food-waste', label: 'Food Waste Reduction', icon: Award },
    { id: 'business-tips', label: 'Farm Business', icon: Lightbulb }
  ];

  const resourceTypes = [
    { id: 'all', label: 'All Types', icon: BookOpen },
    { id: 'article', label: 'Articles', icon: FileText },
    { id: 'video', label: 'Videos', icon: Video },
    { id: 'podcast', label: 'Podcasts', icon: Headphones },
    { id: 'guide', label: 'Guides', icon: BookOpen }
  ];

  const mockResources: Resource[] = [
    {
      id: '1',
      title: 'Complete Guide to Organic Farming',
      description: 'Learn the fundamentals of organic farming, from soil preparation to harvest. This comprehensive guide covers everything you need to know to start your organic farming journey.',
      type: 'guide',
      category: 'organic-farming',
      author: 'Dr. Sarah Green',
      duration: '45 min read',
      rating: 4.8,
      reviews: 234,
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
      difficulty: 'beginner',
      isBookmarked: true,
      isPremium: false
    },
    {
      id: '2',
      title: 'Seasonal Cooking: Spring Vegetables',
      description: 'Discover delicious ways to prepare spring vegetables. From asparagus to peas, learn techniques that bring out the best flavors of the season.',
      type: 'video',
      category: 'seasonal-cooking',
      author: 'Chef Maria Rodriguez',
      duration: '25 min',
      rating: 4.9,
      reviews: 156,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      difficulty: 'intermediate',
      isBookmarked: false,
      isPremium: true
    },
    {
      id: '3',
      title: 'Reducing Food Waste at Home',
      description: 'Practical tips and strategies to minimize food waste in your kitchen. Learn storage techniques, meal planning, and creative ways to use leftovers.',
      type: 'article',
      category: 'food-waste',
      author: 'Emma Thompson',
      duration: '12 min read',
      rating: 4.7,
      reviews: 89,
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400',
      difficulty: 'beginner',
      isBookmarked: true,
      isPremium: false
    },
    {
      id: '4',
      title: 'Building a Sustainable Farm Business',
      description: 'Expert insights on creating a profitable and sustainable farm business. Learn about marketing, customer relationships, and financial planning.',
      type: 'podcast',
      category: 'business-tips',
      author: 'Farm Business Weekly',
      duration: '38 min',
      rating: 4.6,
      reviews: 67,
      image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=400',
      difficulty: 'advanced',
      isBookmarked: false,
      isPremium: true
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return FileText;
      case 'video': return Video;
      case 'podcast': return Headphones;
      case 'guide': return BookOpen;
      default: return BookOpen;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const filteredResources = mockResources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-display font-bold gradient-text mb-2">Knowledge Hub</h1>
              <p className="text-slate-600 text-lg">Learn, grow, and master sustainable farming and eating</p>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <button className="btn-secondary flex items-center">
                <Bookmark className="h-4 w-4 mr-2" />
                My Bookmarks
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className={`glass-effect rounded-2xl shadow-xl p-6 mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles, videos, guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-lg backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300'
                          : 'bg-white/80 text-slate-600 border border-slate-200 hover:bg-white'
                      }`}
                    >
                      <Icon className="h-3 w-3 mr-2" />
                      {category.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Content Type</h3>
              <div className="flex flex-wrap gap-2">
                {resourceTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedType === type.id
                          ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                          : 'bg-white/80 text-slate-600 border border-slate-200 hover:bg-white'
                      }`}
                    >
                      <Icon className="h-3 w-3 mr-2" />
                      {type.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource, index) => {
            const TypeIcon = getTypeIcon(resource.type);
            
            return (
              <div
                key={resource.id}
                className={`glass-effect rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden card-hover fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(resource.difficulty)}`}>
                      {resource.difficulty.charAt(0).toUpperCase() + resource.difficulty.slice(1)}
                    </span>
                    {resource.isPremium && (
                      <span className="bg-yellow-100/90 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold border border-yellow-300 backdrop-blur-sm">
                        <Award className="h-3 w-3 mr-1 inline" />
                        Premium
                      </span>
                    )}
                  </div>

                  {/* Type Icon */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-white/90 p-2 rounded-full backdrop-blur-sm">
                      <TypeIcon className="h-4 w-4 text-slate-600" />
                    </div>
                  </div>

                  {/* Play Button for Videos/Podcasts */}
                  {(resource.type === 'video' || resource.type === 'podcast') && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <button className="bg-white/90 p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                        <Play className="h-6 w-6 text-slate-700 ml-1" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {resource.duration}
                    </span>
                    <button className={`p-1 rounded-full transition-colors duration-200 ${
                      resource.isBookmarked ? 'text-yellow-500' : 'text-slate-400 hover:text-yellow-500'
                    }`}>
                      <Bookmark className={`h-4 w-4 ${resource.isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  
                  <h3 className="font-bold text-slate-800 text-lg mb-3 line-clamp-2">{resource.title}</h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed">{resource.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-slate-500">by {resource.author}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-semibold text-slate-700">{resource.rating}</span>
                      <span className="text-sm text-slate-500 ml-1">({resource.reviews})</span>
                    </div>
                  </div>

                  <button className="w-full btn-primary justify-center">
                    {resource.type === 'video' || resource.type === 'podcast' ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Watch Now
                      </>
                    ) : (
                      <>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Read Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <div className="text-slate-400 mb-6">
              <BookOpen className="h-20 w-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">No resources found</h3>
            <p className="text-slate-600 text-lg">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeHub;