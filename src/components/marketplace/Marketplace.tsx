// import React, { useState, useEffect } from 'react';
// import { Search, Filter, MapPin, Star, Leaf, Clock, Heart, ShoppingCart, Zap, Check } from 'lucide-react';
// import { useApp } from '../../context/AppContext';
// import { Product, Farmer } from '../../types';

// const Marketplace: React.FC = () => {
//   const { products, farmers, addToCart, cartItems } = useApp();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');
//   const [showFilters, setShowFilters] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [addedToCart, setAddedToCart] = useState<string | null>(null);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const categories = ['all', 'Vegetables', 'Fruits', 'Herbs', 'Grains'];

//   const filteredProducts = products.filter(product => {
//     const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   const getFarmerById = (farmerId: string): Farmer | undefined => {
//     return farmers.find(farmer => farmer.id === farmerId);
//   };

//   const isInCart = (productId: string) => {
//     return cartItems.some(item => item.productId === productId);
//   };

//   const handleAddToCart = (product: Product) => {
//     addToCart(product, product.farmerId);
//     setAddedToCart(product.id);
    
//     // Reset the button state after 2 seconds
//     setTimeout(() => {
//       setAddedToCart(null);
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <h1 className="text-4xl font-display font-bold gradient-text mb-2">Fresh Local Marketplace</h1>
//           <p className="text-slate-600 text-lg">Discover the freshest produce from local farmers in your area</p>
//         </div>

//         {/* Search and Filters */}
//         <div className={`glass-effect rounded-2xl shadow-xl p-6 mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1 relative">
//               <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
//               <input
//                 type="text"
//                 placeholder="Search for fresh produce..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-4 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-lg backdrop-blur-sm"
//               />
//             </div>
            
//             <div className="flex gap-4">
//               <select
//                 value={selectedCategory}
//                 onChange={(e) => setSelectedCategory(e.target.value)}
//                 className="px-6 py-4 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 backdrop-blur-sm font-medium"
//               >
//                 {categories.map(category => (
//                   <option key={category} value={category}>
//                     {category === 'all' ? 'All Categories' : category}
//                   </option>
//                 ))}
//               </select>
              
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center px-6 py-4 bg-white/80 border border-slate-200 rounded-xl hover:bg-white transition-all duration-300 backdrop-blur-sm font-medium"
//               >
//                 <Filter className="h-5 w-5 mr-2" />
//                 Filters
//               </button>
//             </div>
//           </div>

//           {/* Extended Filters */}
//           {showFilters && (
//             <div className="mt-6 pt-6 border-t border-slate-200/50 animate-slideDown">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div>
//                   <h3 className="font-semibold text-slate-800 mb-3">Distance</h3>
//                   <div className="space-y-2">
//                     {['Within 5 miles', 'Within 10 miles', 'Within 25 miles'].map((option) => (
//                       <label key={option} className="flex items-center group cursor-pointer">
//                         <input type="radio" name="distance" className="text-emerald-600 focus:ring-emerald-500" />
//                         <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-800 transition-colors duration-200">{option}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-slate-800 mb-3">Certifications</h3>
//                   <div className="space-y-2">
//                     {['Organic', 'Biodynamic', 'Non-GMO'].map((cert) => (
//                       <label key={cert} className="flex items-center group cursor-pointer">
//                         <input type="checkbox" className="text-emerald-600 focus:ring-emerald-500 rounded" />
//                         <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-800 transition-colors duration-200">{cert}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-slate-800 mb-3">Availability</h3>
//                   <div className="space-y-2">
//                     {['In Stock', 'Seasonal Special'].map((option) => (
//                       <label key={option} className="flex items-center group cursor-pointer">
//                         <input type="checkbox" className="text-emerald-600 focus:ring-emerald-500 rounded" />
//                         <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-800 transition-colors duration-200">{option}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredProducts.map((product, index) => {
//             const farmer = getFarmerById(product.farmerId);
//             const inCart = isInCart(product.id);
//             const justAdded = addedToCart === product.id;
            
//             return (
//               <div 
//                 key={product.id} 
//                 className={`glass-effect rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group card-hover fade-in-up`}
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className="relative overflow-hidden">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
//                   {/* Badges */}
//                   <div className="absolute top-3 left-3 flex flex-col gap-2">
//                     {product.organic && (
//                       <span className="bg-emerald-100/90 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center backdrop-blur-sm">
//                         <Leaf className="h-3 w-3 mr-1" />
//                         Organic
//                       </span>
//                     )}
//                     {product.seasonal && (
//                       <span className="bg-orange-100/90 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center backdrop-blur-sm">
//                         <Clock className="h-3 w-3 mr-1" />
//                         Seasonal
//                       </span>
//                     )}
//                   </div>

//                   {/* Quick Actions */}
//                   <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
//                     <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors duration-200 backdrop-blur-sm">
//                       <Heart className="h-4 w-4 text-slate-600 hover:text-red-500 transition-colors duration-200" />
//                     </button>
//                     <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors duration-200 backdrop-blur-sm">
//                       <Zap className="h-4 w-4 text-slate-600 hover:text-yellow-500 transition-colors duration-200" />
//                     </button>
//                   </div>
//                 </div>

//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-3">
//                     <h3 className="font-bold text-slate-800 text-lg group-hover:text-emerald-700 transition-colors duration-300">{product.name}</h3>
//                     <div className="text-right">
//                       <span className="text-2xl font-bold text-emerald-600">
//                         ₹{product.price.toFixed(2)}
//                       </span>
//                       <span className="text-sm text-slate-500">/{product.unit}</span>
//                     </div>
//                   </div>
                  
//                   <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
                  
//                   {farmer && (
//                     <div className="flex items-center mb-4 p-3 bg-slate-50/50 rounded-xl">
//                       <img
//                         src={farmer.avatar || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400'}
//                         alt={farmer.name}
//                         className="w-8 h-8 rounded-full mr-3 ring-2 ring-emerald-500/20"
//                       />
//                       <div className="flex-1">
//                         <p className="text-sm font-semibold text-slate-800">{farmer.farmName}</p>
//                         <div className="flex items-center">
//                           <MapPin className="h-3 w-3 text-slate-400 mr-1" />
//                           <span className="text-xs text-slate-500">{farmer.location}</span>
//                         </div>
//                       </div>
//                       <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
//                         <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
//                         <span className="text-xs font-semibold text-yellow-700">{farmer.rating}</span>
//                       </div>
//                     </div>
//                   )}

//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center text-sm text-slate-500">
//                       <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
//                       {product.inStock} {product.unit} available
//                     </div>
//                     <button 
//                       onClick={() => handleAddToCart(product)}
//                       disabled={justAdded}
//                       className={`flex items-center text-sm py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
//                         justAdded
//                           ? 'bg-green-500 text-white'
//                           : inCart
//                           ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
//                           : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg hover:-translate-y-0.5'
//                       }`}
//                     >
//                       {justAdded ? (
//                         <>
//                           <Check className="h-4 w-4 mr-2" />
//                           Added!
//                         </>
//                       ) : inCart ? (
//                         <>
//                           <ShoppingCart className="h-4 w-4 mr-2" />
//                           Add More
//                         </>
//                       ) : (
//                         <>
//                           <ShoppingCart className="h-4 w-4 mr-2" />
//                           Add to Cart
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {filteredProducts.length === 0 && (
//           <div className="text-center py-16">
//             <div className="text-slate-400 mb-6">
//               <Search className="h-20 w-20 mx-auto" />
//             </div>
//             <h3 className="text-2xl font-bold text-slate-800 mb-3">No products found</h3>
//             <p className="text-slate-600 text-lg">Try adjusting your search or filter criteria</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Marketplace;


import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star, Leaf, Clock, Heart, ShoppingCart, Zap, Check, Plus, Minus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product, Farmer } from '../../types';

const Marketplace: React.FC = () => {
  const { products, farmers, addToCart, cartItems, updateCartQuantity, removeFromCart } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = ['all', 'Vegetables', 'Fruits', 'Herbs', 'Grains'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFarmerById = (farmerId: string): Farmer | undefined => {
    return farmers.find(farmer => farmer.id === farmerId);
  };

  const isInCart = (productId: string) => {
    return cartItems.some(item => item.productId === productId);
  };

  const getCartQuantity = (productId: string) => {
    const item = cartItems.find(item => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, product.farmerId);
    setAddedToCart(product.id);
    
    // Reset the button state after 1.5 seconds
    setTimeout(() => {
      setAddedToCart(null);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl font-display font-bold gradient-text mb-2">Fresh Local Marketplace</h1>
          <p className="text-slate-600 text-lg">Discover the freshest produce from local farmers in your area</p>
        </div>

        {/* Search and Filters */}
        <div className={`glass-effect rounded-2xl shadow-xl p-6 mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search for fresh produce..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-lg backdrop-blur-sm"
              />
            </div>
            
            <div className="flex gap-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-6 py-4 bg-white/80 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 backdrop-blur-sm font-medium"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-6 py-4 bg-white/80 border border-slate-200 rounded-xl hover:bg-white transition-all duration-300 backdrop-blur-sm font-medium"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>
          </div>

          {/* Extended Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-slate-200/50 animate-slideDown">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">Distance</h3>
                  <div className="space-y-2">
                    {['Within 5 miles', 'Within 10 miles', 'Within 25 miles'].map((option) => (
                      <label key={option} className="flex items-center group cursor-pointer">
                        <input type="radio" name="distance" className="text-emerald-600 focus:ring-emerald-500" />
                        <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-800 transition-colors duration-200">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">Certifications</h3>
                  <div className="space-y-2">
                    {['Organic', 'Biodynamic', 'Non-GMO'].map((cert) => (
                      <label key={cert} className="flex items-center group cursor-pointer">
                        <input type="checkbox" className="text-emerald-600 focus:ring-emerald-500 rounded" />
                        <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-800 transition-colors duration-200">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-800 mb-3">Availability</h3>
                  <div className="space-y-2">
                    {['In Stock', 'Seasonal Special'].map((option) => (
                      <label key={option} className="flex items-center group cursor-pointer">
                        <input type="checkbox" className="text-emerald-600 focus:ring-emerald-500 rounded" />
                        <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-800 transition-colors duration-200">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => {
            const farmer = getFarmerById(product.farmerId);
            const inCart = isInCart(product.id);
            const justAdded = addedToCart === product.id;
            
            return (
              <div 
                key={product.id} 
                className={`glass-effect rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group card-hover fade-in-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.organic && (
                      <span className="bg-emerald-100/90 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center backdrop-blur-sm">
                        <Leaf className="h-3 w-3 mr-1" />
                        Organic
                      </span>
                    )}
                    {product.seasonal && (
                      <span className="bg-orange-100/90 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center backdrop-blur-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        Seasonal
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors duration-200 backdrop-blur-sm">
                      <Heart className="h-4 w-4 text-slate-600 hover:text-red-500 transition-colors duration-200" />
                    </button>
                    <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors duration-200 backdrop-blur-sm">
                      <Zap className="h-4 w-4 text-slate-600 hover:text-yellow-500 transition-colors duration-200" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-emerald-700 transition-colors duration-300">{product.name}</h3>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-emerald-600">
                        ₹{product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-slate-500">/{product.unit}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
                  
                  {farmer && (
                    <div className="flex items-center mb-4 p-3 bg-slate-50/50 rounded-xl">
                      <img
                        src={farmer.avatar || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400'}
                        alt={farmer.name}
                        className="w-8 h-8 rounded-full mr-3 ring-2 ring-emerald-500/20"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-800">{farmer.farmName}</p>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 text-slate-400 mr-1" />
                          <span className="text-xs text-slate-500">{farmer.location}</span>
                        </div>
                      </div>
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                        <span className="text-xs font-semibold text-yellow-700">{farmer.rating}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-slate-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      {product.inStock} {product.unit} available
                    </div>
                    
                    <button 
                      onClick={() => handleAddToCart(product)}
                      disabled={justAdded}
                      className={`flex items-center text-sm py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                        justAdded
                          ? 'bg-green-500 text-white'
                          : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg hover:-translate-y-0.5'
                      }`}
                    >
                      {justAdded ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Added!
                        </>
                      ) : inCart ? (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const qty = getCartQuantity(product.id);
                              if (qty === 1) {
                                removeFromCart(product.id);
                              } else {
                                updateCartQuantity(product.id, qty - 1);
                              }
                            }}
                            className="hover:scale-110 transition-transform duration-200"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-bold min-w-[1.5rem] text-center">
                            {getCartQuantity(product.id)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="hover:scale-110 transition-transform duration-200"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-slate-400 mb-6">
              <Search className="h-20 w-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">No products found</h3>
            <p className="text-slate-600 text-lg">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;