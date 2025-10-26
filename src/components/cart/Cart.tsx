import React, { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  CreditCard, 
  Wallet,
  Building2,
  Smartphone,
  ArrowRight,
  Tag,
  Truck,
  Shield,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Cart: React.FC = () => {
  const { cartItems, updateCartQuantity, removeFromCart, setCurrentPage } = useApp();

  const [promoCode, setPromoCode] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [showPromoInput, setShowPromoInput] = useState(false);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 50 ? 0 : 5.00;
  const discount = 0; // Apply promo code logic here
  const total = subtotal + deliveryFee - discount;

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Visa, Mastercard, Amex' },
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
    { id: 'wallet', name: 'Wallet', icon: Wallet, description: 'Paytm, Amazon Pay' },
    { id: 'netbanking', name: 'Net Banking', icon: Building2, description: 'All major banks' },
    { id: 'cod', name: 'Cash on Delivery', icon: Truck, description: 'Pay when you receive' }
  ];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <ShoppingBag className="h-24 w-24 text-emerald-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Your Cart is Empty</h2>
            <p className="text-slate-600 mb-8">Add some fresh produce from our marketplace!</p>
            <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              Browse Marketplace
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Shopping Cart</h1>
          <p className="text-slate-600">{cartItems.length} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* Delivery Info Banner */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-4 text-white flex items-center justify-between shadow-lg">
              <div className="flex items-center space-x-3">
                <Truck className="h-6 w-6" />
                <div>
                  <p className="font-semibold">Free Delivery on orders above ₹299</p>
                  <p className="text-sm text-emerald-100">
                    {subtotal < 50 ? `Add ₹${(50 - subtotal).toFixed(2)} more for free delivery` : 'You got free delivery!'}
                  </p>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl overflow-hidden">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 md:p-6 border-b border-slate-200 last:border-b-0 hover:bg-emerald-50/50 transition-colors duration-200">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl ring-2 ring-emerald-500/20"
                      />
                      {item.organic && (
                        <span className="absolute -top-2 -left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-md">
                          🌿 Organic
                        </span>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-slate-800 mb-1">{item.name}</h3>
                          <p className="text-sm text-slate-600">Sold by: <span className="font-semibold text-emerald-600">{item.seller}</span></p>
                          {item.seasonal && (
                            <span className="inline-flex items-center text-xs text-orange-600 mt-1">
                              <span className="mr-1">🍂</span> Seasonal
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors duration-200"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-lg font-semibold text-slate-800 w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors duration-200"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-sm text-slate-600">₹{item.price.toFixed(2)}/{item.unit}</p>
                          <p className="text-xl font-bold text-emerald-600">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary & Payment Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {/* Promo Code */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl p-6">
                <button
                  onClick={() => setShowPromoInput(!showPromoInput)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <div className="flex items-center space-x-2">
                    <Tag className="h-5 w-5 text-emerald-600" />
                    <span className="font-semibold text-slate-800">Apply Promo Code</span>
                  </div>
                  <span className={`transform transition-transform ${showPromoInput ? 'rotate-180' : ''}`}>
                    ▼
                  </span>
                </button>
                
                {showPromoInput && (
                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors">
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4 pb-4 border-b border-slate-200">
                  <div className="flex justify-between text-slate-700">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Delivery Fee</span>
                    <span className={`font-semibold ${deliveryFee === 0 ? 'text-emerald-600' : ''}`}>
                      {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount</span>
                      <span className="font-semibold">-₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-lg font-bold mb-6">
                  <span className="text-slate-800">Total</span>
                  <span className="text-2xl text-emerald-600">₹{total.toFixed(2)}</span>
                </div>

                <div className="flex items-start space-x-2 text-sm text-slate-600 mb-4 bg-blue-50 p-3 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p>Safe and secure payments. 100% authentic products.</p>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Select Payment Method</h2>
                
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 ${
                          selectedPayment === method.id
                            ? 'border-emerald-500 bg-emerald-50 shadow-md'
                            : 'border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            selectedPayment === method.id
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-slate-800">{method.name}</p>
                            <p className="text-xs text-slate-600">{method.description}</p>
                          </div>
                        </div>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedPayment === method.id
                            ? 'border-emerald-500 bg-emerald-500'
                            : 'border-slate-300'
                        }`}>
                          {selectedPayment === method.id && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={!selectedPayment}
                  className={`w-full mt-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    selectedPayment
                      ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-xl hover:-translate-y-0.5'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;