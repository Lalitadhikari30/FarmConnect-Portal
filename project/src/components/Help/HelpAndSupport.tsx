import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle,
  Send,
  Bot,
  User,
  HelpCircle,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Loader,
  X,
  Minimize2,
  Maximize2,
  BookOpen,
  Search,
  Lightbulb
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const HelpAndSupport: React.FC = () => {
  const { currentUser } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsVisible(true);
    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: `Hello ${currentUser?.name}! 👋 I'm your FarmConnect assistant. How can I help you today? You can ask me about orders, farmers, payments, or anything else!`,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [currentUser?.name]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Sample FAQs - you can expand this
  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'How do I track my order?',
      answer: 'You can track your order by going to the Orders page and clicking on the "Track Order" button for your specific order.',
      category: 'orders'
    },
    {
      id: '2',
      question: 'How do I contact a farmer?',
      answer: 'You can contact farmers through the Messages section or find their contact info in your order details.',
      category: 'farmers'
    },
    {
      id: '3',
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards, debit cards, UPI, net banking, and cash on delivery for eligible orders.',
      category: 'payments'
    },
    {
      id: '4',
      question: 'How do I cancel an order?',
      answer: 'You can cancel orders that haven\'t been prepared yet. Go to your Orders page and look for the cancel option.',
      category: 'orders'
    },
    {
      id: '5',
      question: 'How do I leave a review?',
      answer: 'After your order is delivered, you\'ll see a "Leave Review" button in your order details.',
      category: 'reviews'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Topics' },
    { value: 'orders', label: 'Orders' },
    { value: 'farmers', label: 'Farmers' },
    { value: 'payments', label: 'Payments' },
    { value: 'reviews', label: 'Reviews' },
    { value: 'account', label: 'Account' }
  ];

  const quickActions = [
    { text: 'Track my recent order', icon: '📦' },
    { text: 'Find organic farmers near me', icon: '🌱' },
    { text: 'Payment issues', icon: '💳' },
    { text: 'How to leave a review?', icon: '⭐' },
    { text: 'Account settings help', icon: '⚙️' },
    { text: 'Delivery questions', icon: '🚚' }
  ];

  // This is where you'll integrate your API
  const sendMessageToAPI = async (message: string): Promise<string> => {
    // TODO: Replace this with your actual API call
    /*
    Example API integration:
    
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${your_api_token}`,
        },
        body: JSON.stringify({
          message: message,
          userId: currentUser?.id,
          context: 'farmconnect_support'
        }),
      });
      
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('API Error:', error);
      return "I'm sorry, I'm having trouble connecting right now. Please try again or contact our support team.";
    }
    */
    
    // Simulated API response for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Simple response logic for demo - replace with actual API
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('order') && lowerMessage.includes('track')) {
      return "To track your order, go to the Orders page in your dashboard. You'll see a 'Track Order' button for each active order. This will show you real-time updates on your order status! 📦";
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return "We accept various payment methods including credit/debit cards, UPI, net banking, and cash on delivery. If you're having payment issues, please check your payment method or try a different one. Need specific help with a payment? 💳";
    } else if (lowerMessage.includes('farmer') || lowerMessage.includes('contact')) {
      return "You can contact farmers directly through our Messages section or find their contact details in your order information. All our farmers are verified and responsive! 👨‍🌾";
    } else if (lowerMessage.includes('cancel')) {
      return "You can cancel orders that haven't been prepared yet. Go to your Orders page, find the order you want to cancel, and look for the cancel option. Orders in 'preparing' or later stages might not be cancellable. 🚫";
    } else if (lowerMessage.includes('review')) {
      return "After your order is delivered, you'll automatically see a 'Leave Review' button in your order details. Your reviews help other customers and support our farmers! ⭐";
    } else {
      return `I understand you're asking about "${message}". I'm here to help! You can ask me about orders, payments, farmers, reviews, or any other FarmConnect related questions. Is there something specific you'd like to know more about? 🤔`;
    }
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await sendMessageToAPI(messageText);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm experiencing some technical difficulties. Please try again in a moment or contact our support team directly.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-display font-bold gradient-text mb-2 flex items-center">
                <HelpCircle className="h-10 w-10 mr-4 text-emerald-600" />
                Help & Support
              </h1>
              <p className="text-slate-600 text-lg">Get instant help with our AI assistant or browse our help resources</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-center">
                <div className="flex items-center text-emerald-600 font-semibold">
                  <Clock className="h-4 w-4 mr-2" />
                  24/7 Available
                </div>
                <p className="text-sm text-slate-600">AI Support</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chatbot Interface */}
          <div className="lg:col-span-2">
            <div className={`glass-effect rounded-2xl shadow-lg overflow-hidden fade-in-up ${isChatMinimized ? 'h-20' : 'h-[600px]'} transition-all duration-300`}>
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-emerald-500 to-green-500 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Bot className="h-8 w-8" />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold">FarmConnect Assistant</h3>
                      <p className="text-sm opacity-90">Always here to help</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsChatMinimized(!isChatMinimized)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
                    >
                      {isChatMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {!isChatMinimized && (
                <>
                  {/* Messages Area */}
                  <div className="flex-1 p-4 overflow-y-auto bg-white/30" style={{ height: '450px' }}>
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex items-start space-x-3 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
                        >
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            message.sender === 'user' 
                              ? 'bg-emerald-500 text-white' 
                              : 'bg-blue-500 text-white'
                          }`}>
                            {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                          </div>
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            message.sender === 'user'
                              ? 'bg-emerald-500 text-white rounded-br-md'
                              : 'bg-white border border-slate-200 text-slate-800 rounded-bl-md'
                          }`}>
                            <p className="text-sm">{message.text}</p>
                            <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-emerald-100' : 'text-slate-500'}`}>
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {isLoading && (
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                            <Bot className="h-4 w-4" />
                          </div>
                          <div className="bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-bl-md px-4 py-2">
                            <div className="flex items-center space-x-2">
                              <Loader className="h-4 w-4 animate-spin text-blue-500" />
                              <span className="text-sm text-slate-600">Typing...</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Actions */}
                  {messages.length <= 1 && (
                    <div className="px-4 py-2 bg-white/50 border-t border-slate-200/50">
                      <p className="text-xs text-slate-600 mb-2">Quick actions:</p>
                      <div className="flex flex-wrap gap-2">
                        {quickActions.slice(0, 3).map((action, index) => (
                          <button
                            key={index}
                            onClick={() => handleSendMessage(action.text)}
                            className="text-xs px-3 py-1 bg-white border border-slate-200 rounded-full hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-200"
                          >
                            {action.icon} {action.text}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input Area */}
                  <div className="p-4 bg-white/50 border-t border-slate-200/50">
                    <div className="flex items-center space-x-3">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        disabled={isLoading}
                      />
                      <button
                        onClick={() => handleSendMessage()}
                        disabled={!inputText.trim() || isLoading}
                        className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="glass-effect rounded-2xl shadow-lg p-6 fade-in-up" style={{ animationDelay: '200ms' }}>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-3 text-emerald-600" />
                Direct Support
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-600">
                  <Phone className="h-4 w-4 mr-3 text-blue-500" />
                  <span>+91 1800-FARM-HELP</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Mail className="h-4 w-4 mr-3 text-emerald-500" />
                  <span>support@farmconnect.com</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Clock className="h-4 w-4 mr-3 text-orange-500" />
                  <span>24/7 AI Support</span>
                </div>
              </div>
            </div>

            {/* FAQs Section */}
            <div className="glass-effect rounded-2xl shadow-lg p-6 fade-in-up" style={{ animationDelay: '300ms' }}>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                <BookOpen className="h-5 w-5 mr-3 text-blue-600" />
                Frequently Asked Questions
              </h3>

              {/* Search and Filter */}
              <div className="space-y-3 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white/70 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                  />
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white/70 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* FAQ List */}
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="bg-white/50 border border-slate-200/50 rounded-lg p-3 hover:bg-white/80 transition-all duration-200">
                    <button
                      onClick={() => handleSendMessage(faq.question)}
                      className="w-full text-left"
                    >
                      <h4 className="font-medium text-slate-800 text-sm mb-1 flex items-center">
                        <Lightbulb className="h-3 w-3 mr-2 text-yellow-500 flex-shrink-0" />
                        {faq.question}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2">{faq.answer}</p>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-effect rounded-2xl shadow-lg p-6 fade-in-up" style={{ animationDelay: '400ms' }}>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.slice(3).map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(action.text)}
                    className="w-full text-left px-3 py-2 bg-white/50 border border-slate-200/50 rounded-lg hover:bg-white/80 transition-all duration-200 text-sm"
                  >
                    {action.icon} {action.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;