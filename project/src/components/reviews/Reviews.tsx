import React, { useState, useEffect } from 'react';
import { 
  Star, 
  ThumbsUp, 
  MessageCircle, 
  Filter,
  Search,
  Calendar,
  Award,
  TrendingUp,
  Users,
  CheckCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerType: 'farmer' | 'consumer';
  reviewerAvatar: string;
  targetId: string;
  targetName: string;
  targetType: 'farmer' | 'consumer';
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  helpful: number;
  replies: number;
  verified: boolean;
  createdAt: string;
  categories: string[];
}

const Reviews: React.FC = () => {
  const { currentUser } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filters = [
    { id: 'all', label: 'All Reviews' },
    { id: 'given', label: 'Reviews I Gave' },
    { id: 'received', label: 'Reviews I Received' },
    { id: 'recent', label: 'Recent Reviews' }
  ];

  const ratingFilters = [
    { id: 'all', label: 'All Ratings' },
    { id: '5', label: '5 Stars' },
    { id: '4', label: '4+ Stars' },
    { id: '3', label: '3+ Stars' }
  ];

  const mockReviews: Review[] = [
    {
      id: '1',
      reviewerId: '2',
      reviewerName: 'Emma Wilson',
      reviewerType: 'consumer',
      reviewerAvatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100',
      targetId: '1',
      targetName: 'Green Acres Farm',
      targetType: 'farmer',
      rating: 5,
      title: 'Outstanding quality and service!',
      comment: 'The heirloom tomatoes from Green Acres Farm are absolutely incredible! Sarah is so knowledgeable and passionate about organic farming. The produce arrived fresh and perfectly ripe. I\'ve been a customer for 6 months now and the quality is consistently amazing.',
      images: ['https://images.pexels.com/photos/6824422/pexels-photo-6824422.jpeg?auto=compress&cs=tinysrgb&w=300'],
      helpful: 23,
      replies: 3,
      verified: true,
      createdAt: '2 days ago',
      categories: ['Quality', 'Service', 'Freshness']
    },
    {
      id: '2',
      reviewerId: '1',
      reviewerName: 'Sarah Johnson',
      reviewerType: 'farmer',
      reviewerAvatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=100',
      targetId: '2',
      targetName: 'Emma Wilson',
      targetType: 'consumer',
      rating: 5,
      title: 'Wonderful customer!',
      comment: 'Emma is such a pleasure to work with! She always picks up her orders on time, asks thoughtful questions about our farming practices, and really appreciates the work we put into growing quality produce. Customers like Emma make farming so rewarding!',
      helpful: 15,
      replies: 1,
      verified: true,
      createdAt: '1 week ago',
      categories: ['Communication', 'Reliability', 'Appreciation']
    },
    {
      id: '3',
      reviewerId: '3',
      reviewerName: 'James Chen',
      reviewerType: 'consumer',
      reviewerAvatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
      targetId: '1',
      targetName: 'Green Acres Farm',
      targetType: 'farmer',
      rating: 4,
      title: 'Great produce, minor delivery issue',
      comment: 'The vegetables are always fresh and delicious. Had one small issue with a delayed delivery, but Sarah was quick to communicate and make it right. The organic certification and sustainable practices are exactly what I\'m looking for.',
      helpful: 8,
      replies: 2,
      verified: true,
      createdAt: '2 weeks ago',
      categories: ['Quality', 'Communication', 'Sustainability']
    }
  ];

  const stats = [
    {
      label: 'Average Rating',
      value: '4.8',
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'Total Reviews',
      value: '127',
      icon: MessageCircle,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Helpful Votes',
      value: '89',
      icon: ThumbsUp,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-50'
    },
    {
      label: 'Response Rate',
      value: '98%',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    }
  ];

  const renderStars = (rating: number, size: string = 'h-4 w-4') => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-slate-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredReviews = mockReviews.filter(review => {
    const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.targetName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = selectedRating === 'all' || 
                         (selectedRating === '5' && review.rating === 5) ||
                         (selectedRating === '4' && review.rating >= 4) ||
                         (selectedRating === '3' && review.rating >= 3);
    return matchesSearch && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-display font-bold gradient-text mb-2">Reviews & Ratings</h1>
              <p className="text-slate-600 text-lg">Build trust through authentic feedback and ratings</p>
            </div>
          </div>
        </div>

        {/* Stats */}
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
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                    <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Filters */}
        <div className={`glass-effect rounded-2xl shadow-xl p-6 mb-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-lg backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Filter Reviews</h3>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedFilter === filter.id
                        ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300'
                        : 'bg-white/80 text-slate-600 border border-slate-200 hover:bg-white'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Rating Filter</h3>
              <div className="flex flex-wrap gap-2">
                {ratingFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedRating(filter.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedRating === filter.id
                        ? 'bg-yellow-100 text-yellow-700 border-2 border-yellow-300'
                        : 'bg-white/80 text-slate-600 border border-slate-200 hover:bg-white'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((review, index) => (
            <div
              key={review.id}
              className={`glass-effect rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 card-hover fade-in-up`}
              style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={review.reviewerAvatar}
                    alt={review.reviewerName}
                    className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-emerald-500/20"
                  />
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-semibold text-slate-800 mr-2">{review.reviewerName}</h3>
                      {review.verified && (
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      )}
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                        review.reviewerType === 'farmer' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {review.reviewerType === 'farmer' ? '🌱 Farmer' : '🛒 Consumer'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600">
                      Review for <span className="font-medium">{review.targetName}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  {renderStars(review.rating, 'h-5 w-5')}
                  <p className="text-sm text-slate-500 mt-1 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {review.createdAt}
                  </p>
                </div>
              </div>

              {/* Review Content */}
              <div className="mb-4">
                <h4 className="font-bold text-slate-800 text-lg mb-2">{review.title}</h4>
                <p className="text-slate-600 leading-relaxed mb-4">{review.comment}</p>

                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-3 mb-4">
                    {review.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`Review image ${idx + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border border-slate-200"
                      />
                    ))}
                  </div>
                )}

                {/* Review Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {review.categories.map((category) => (
                    <span
                      key={category}
                      className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>

              {/* Review Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-slate-500 hover:text-emerald-500 transition-colors duration-200">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm font-medium">{review.helpful} helpful</span>
                  </button>
                  <button className="flex items-center space-x-2 text-slate-500 hover:text-blue-500 transition-colors duration-200">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">{review.replies} replies</span>
                  </button>
                </div>
                <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm">
                  Reply
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <div className="text-center py-16">
            <div className="text-slate-400 mb-6">
              <Star className="h-20 w-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">No reviews found</h3>
            <p className="text-slate-600 text-lg">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;