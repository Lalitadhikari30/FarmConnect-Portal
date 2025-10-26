import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Heart, 
  MessageCircle, 
  Share2, 
  Camera,
  Filter,
  Search,
  Bookmark,
  TrendingUp,
  Award,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorType: 'farmer' | 'consumer';
  authorAvatar: string;
  title: string;
  content: string;
  category: 'recipe' | 'tip' | 'story' | 'question';
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked: boolean;
  isBookmarked: boolean;
}

const Community: React.FC = () => {
  const { currentUser } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    { id: 'all', label: 'All Posts', icon: Users },
    { id: 'recipe', label: 'Recipes', icon: Heart },
    { id: 'tip', label: 'Tips', icon: TrendingUp },
    { id: 'story', label: 'Stories', icon: MessageCircle },
    { id: 'question', label: 'Questions', icon: Award }
  ];

  const mockPosts: Post[] = [
    {
      id: '1',
      authorId: '1',
      authorName: 'Sarah Johnson',
      authorType: 'farmer',
      authorAvatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=100',
      title: 'Harvest Day at Green Acres! 🌱',
      content: 'What an incredible day! We harvested over 200 pounds of heirloom tomatoes today. The weather has been perfect this season, and you can really taste the difference in our organic produce. Thank you to all our customers who support sustainable farming!',
      category: 'story',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 47,
      comments: 12,
      shares: 8,
      timestamp: '2 hours ago',
      isLiked: false,
      isBookmarked: true
    },
    {
      id: '2',
      authorId: '2',
      authorName: 'Emma Wilson',
      authorType: 'consumer',
      authorAvatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100',
      title: 'Amazing Tomato Basil Pasta Recipe! 🍝',
      content: 'Made this incredible pasta using tomatoes from Green Acres Farm and fresh basil from Valley Herbs. The flavors are absolutely amazing when you use local, fresh ingredients. Here\'s my recipe...',
      category: 'recipe',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
      likes: 32,
      comments: 18,
      shares: 15,
      timestamp: '4 hours ago',
      isLiked: true,
      isBookmarked: false
    },
    {
      id: '3',
      authorId: '3',
      authorName: 'Michael Chen',
      authorType: 'farmer',
      authorAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
      title: 'Companion Planting Tips for Better Yields',
      content: 'After 20 years of farming, I\'ve learned that companion planting can increase yields by up to 30%. Here are my top combinations that work every time: Tomatoes + Basil, Carrots + Onions, Lettuce + Radishes...',
      category: 'tip',
      likes: 89,
      comments: 25,
      shares: 34,
      timestamp: '1 day ago',
      isLiked: false,
      isBookmarked: true
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'recipe': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'tip': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'story': return 'bg-green-100 text-green-800 border-green-200';
      case 'question': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const filteredPosts = mockPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-display font-bold gradient-text mb-2">Community Stories</h1>
              <p className="text-slate-600 text-lg">Share experiences, recipes, and connect with fellow farmers and food lovers</p>
            </div>
            <button
              onClick={() => setShowCreatePost(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Share Story
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className={`glass-effect rounded-2xl shadow-xl p-6 mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search stories, recipes, tips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-lg backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300'
                      : 'bg-white/80 text-slate-600 border border-slate-200 hover:bg-white'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPosts.map((post, index) => (
            <div
              key={post.id}
              className={`glass-effect rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden card-hover fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Post Header */}
              <div className="p-6 border-b border-slate-200/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-emerald-500/20"
                    />
                    <div>
                      <h3 className="font-semibold text-slate-800">{post.authorName}</h3>
                      <div className="flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          post.authorType === 'farmer' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {post.authorType === 'farmer' ? '🌱 Farmer' : '🛒 Consumer'}
                        </span>
                        <span className="text-slate-500 text-sm ml-2 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(post.category)}`}>
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-3">{post.title}</h2>
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}

              {/* Post Content */}
              <div className="p-6">
                <p className="text-slate-600 mb-6 leading-relaxed">{post.content}</p>

                {/* Post Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button className={`flex items-center space-x-2 transition-colors duration-200 ${
                      post.isLiked ? 'text-red-500' : 'text-slate-500 hover:text-red-500'
                    }`}>
                      <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-slate-500 hover:text-blue-500 transition-colors duration-200">
                      <MessageCircle className="h-5 w-5" />
                      <span className="font-medium">{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-slate-500 hover:text-green-500 transition-colors duration-200">
                      <Share2 className="h-5 w-5" />
                      <span className="font-medium">{post.shares}</span>
                    </button>
                  </div>
                  <button className={`p-2 rounded-full transition-colors duration-200 ${
                    post.isBookmarked ? 'text-yellow-500 bg-yellow-50' : 'text-slate-400 hover:text-yellow-500 hover:bg-yellow-50'
                  }`}>
                    <Bookmark className={`h-5 w-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-slate-400 mb-6">
              <Users className="h-20 w-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">No posts found</h3>
            <p className="text-slate-600 text-lg mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => setShowCreatePost(true)}
              className="btn-primary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Share Your Story
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;