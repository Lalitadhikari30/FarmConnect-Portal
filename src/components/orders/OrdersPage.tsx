import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  Truck, 
  MapPin,
  Calendar,
  DollarSign,
  Eye,
  MessageCircle,
  Filter,
  Search,
  ArrowUpDown,
  Star,
  Phone,
  Mail
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const OrdersPage: React.FC = () => {
  const { currentUser } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const orders = [
    {
      id: 'ORD-2024-001',
      farmer: 'Green Acres Farm',
      farmerImage: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
      items: [
        { name: 'Heirloom Tomatoes', quantity: '2 Kg', price: 12.00 },
        { name: 'Fresh Basil', quantity: '1 bunch', price: 4.50 },
        { name: 'Organic Lettuce', quantity: '1 head', price: 8.00 }
      ],
      total: 24.50,
      status: 'delivered',
      orderDate: '2024-09-20',
      deliveryDate: '2024-09-22',
      address: '123 Main St, Delhi, IN',
      phone: '+91 98765 43210',
      email: 'greenacres@farmconnect.com'
    },
    {
      id: 'ORD-2024-002',
      farmer: 'Valley Fruits Orchard',
      farmerImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      items: [
        { name: 'Mixed Berries', quantity: '1.5 Kg', price: 18.00 },
        { name: 'Organic Apples', quantity: '3 Kg', price: 14.00 }
      ],
      total: 32.00,
      status: 'shipped',
      orderDate: '2024-09-23',
      deliveryDate: '2024-09-25',
      address: '456 Garden Ave, Delhi, IN',
      phone: '+91 98765 43211',
      email: 'valleyfruits@farmconnect.com'
    },
    {
      id: 'ORD-2024-003',
      farmer: 'Sunrise Vegetables',
      farmerImage: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=400',
      items: [
        { name: 'Fresh Carrots', quantity: '2 Kg', price: 6.00 },
        { name: 'Bell Peppers', quantity: '1.5 Kg', price: 9.00 },
        { name: 'Zucchini', quantity: '2 Kg', price: 7.00 }
      ],
      total: 22.00,
      status: 'preparing',
      orderDate: '2024-09-24',
      deliveryDate: '2024-09-26',
      address: '789 Fresh St, Delhi, IN',
      phone: '+91 98765 43212',
      email: 'sunrise@farmconnect.com'
    },
    {
      id: 'ORD-2024-004',
      farmer: 'Organic Harvest Co.',
      farmerImage: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400',
      items: [
        { name: 'Kale Bunch', quantity: '2 bunches', price: 8.00 },
        { name: 'Sweet Potatoes', quantity: '3 lbs', price: 12.00 }
      ],
      total: 20.00,
      status: 'pending',
      orderDate: '2024-09-24',
      deliveryDate: '2024-09-27',
      address: '321 Organic Way, Delhi, IN',
      phone: '+91 98765 43213',
      email: 'organic@farmconnect.com'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparing': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return CheckCircle;
      case 'shipped': return Truck;
      case 'preparing': return Package;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = selectedFilter === 'all' || order.status === selectedFilter;
    const matchesSearch = order.farmer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterOptions = [
    { value: 'all', label: 'All Orders', count: orders.length },
    { value: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length },
    { value: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
    { value: 'preparing', label: 'Preparing', count: orders.filter(o => o.status === 'preparing').length },
    { value: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-display font-bold gradient-text mb-2 flex items-center">
                <Package className="h-10 w-10 mr-4 text-emerald-600" />
                My Orders
              </h1>
              <p className="text-slate-600 text-lg">Track and manage all your farm-fresh orders</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="glass-effect rounded-2xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedFilter(option.value)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md
                      ${selectedFilter === option.value 
                        ? 'bg-emerald-500 text-white shadow-lg' 
                        : 'bg-white/70 text-slate-700 border border-slate-200 hover:bg-white/90 hover:border-slate-300'
                      }`}
                  >
                    {option.label} ({option.count})
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search orders or farmers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white/70 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredOrders.map((order, index) => {
            const StatusIcon = getStatusIcon(order.status);
            return (
              <div 
                key={order.id}
                className={`glass-effect rounded-2xl shadow-lg p-6 card-hover fade-in-up cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 
                  ${selectedOrder === order.id ? 'ring-2 ring-emerald-500' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
              >
                {/* Order Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={order.farmerImage}
                      alt={order.farmer}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20"
                    />
                    <div>
                      <h3 className="font-semibold text-slate-800">{order.farmer}</h3>
                      <p className="text-sm text-slate-500">{order.id}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                    <StatusIcon className="h-3 w-3" />
                    <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <div className="space-y-2">
                    {order.items.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-slate-600">{item.name} ({item.quantity})</span>
                        <span className="font-medium text-slate-800">₹{item.price.toFixed(2)}</span>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-xs text-slate-500">+{order.items.length - 2} more items</p>
                    )}
                  </div>
                </div>

                {/* Order Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-slate-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Ordered: {new Date(order.orderDate).toLocaleDateString()}</span>
                    </div>
                    <div className="font-bold text-emerald-600 text-lg">₹{order.total.toFixed(2)}</div>
                  </div>

                  <div className="flex items-center text-sm text-slate-600">
                    <Truck className="h-4 w-4 mr-2" />
                    <span>Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center text-sm text-slate-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="truncate">{order.address}</span>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedOrder === order.id && (
                  <div className="mt-6 pt-4 border-t border-slate-200/50 animate-fadeIn">
                    {/* All Items */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-slate-800 mb-3">Order Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm bg-white/30 p-2 rounded-lg">
                            <span className="text-slate-700">{item.name} ({item.quantity})</span>
                            <span className="font-medium text-slate-800">₹{item.price.toFixed(2)}</span>
                          </div>
                        ))}
                        <div className="flex justify-between font-bold text-emerald-600 pt-2 border-t border-slate-200/50">
                          <span>Total</span>
                          <span>₹{order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-slate-800 mb-3">Farmer Contact</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-slate-600">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{order.phone}</span>
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                          <Mail className="h-4 w-4 mr-2" />
                          <span>{order.email}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button className="flex-1 flex items-center justify-center px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 hover:bg-emerald-600">
                        <Eye className="h-4 w-4 mr-2" />
                        Track Order
                      </button>
                      <button className="flex-1 flex items-center justify-center px-4 py-2 bg-white/70 border border-slate-200 text-slate-700 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 hover:bg-white/90 hover:border-slate-300">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </button>
                    </div>

                    {/* Review Section for Delivered Orders */}
                    {/* {order.status === 'delivered' && (
                      <div className="mt-4 p-4 bg-emerald-50/50 rounded-lg border border-emerald-200/50">
                        <h4 className="font-semibold text-slate-800 mb-2 flex items-center">
                          <Star className="h-4 w-4 mr-2 text-yellow-500" />
                          Rate your experience
                        </h4>
                        <button className="w-full flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 hover:bg-yellow-600">
                          Leave Review
                        </button>
                      </div>
                    )} */}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No orders found</h3>
            <p className="text-slate-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;