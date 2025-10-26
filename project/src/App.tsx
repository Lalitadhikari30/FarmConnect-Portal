import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navigation from './components/Navigation';
import Welcome from './components/onboarding/Welcome';
import UserTypeSelection from './components/onboarding/UserTypeSelection';
import FarmerOnboarding from './components/onboarding/FarmerOnboarding';
import ConsumerOnboarding from './components/onboarding/ConsumerOnboarding';
import Marketplace from './components/marketplace/Marketplace';
import FarmerDashboard from './components/dashboard/FarmerDashboard';
import ConsumerDashboard from './components/dashboard/ConsumerDashboard';
import Community from './components/community/Community';
import Sustainability from './components/sustainability/Sustainability';
import KnowledgeHub from './components/knowledge/KnowledgeHub';
import Reviews from './components/reviews/Reviews';
import OrdersPage from './components/orders/OrdersPage';
import HelpAndSupport from './components/Help/HelpAndSupport';
import ProfilePage from './components/Profile/ProfilePage';
import Footer from "./components/footer/Footer";

const AppContent: React.FC = () => {
  const { currentUser, currentPage } = useApp();

  const renderPage = () => {
    if (!currentUser) {
      switch (currentPage) {
        case 'welcome': return <Welcome />;
        case 'onboarding-type': return <UserTypeSelection />;
        case 'onboarding-farmer': return <FarmerOnboarding />;
        case 'onboarding-consumer': return <ConsumerOnboarding />;
        default: return <Welcome />;
      }
    }

    switch (currentPage) {
      case 'marketplace': return <Marketplace />;
      case 'dashboard': 
        return currentUser.type === 'farmer' ? <FarmerDashboard /> : <ConsumerDashboard />;
      case 'orders': return <OrdersPage />;
      case 'Help': return <HelpAndSupport />;
      case 'community': return <Community />;
      case 'knowledge': return <KnowledgeHub />;
      case 'sustainability': return <Sustainability />;
      case 'Profile': return <ProfilePage />;
      case 'reviews': return <Reviews />;
      default: return <Marketplace />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navigation at top */}
      <Navigation />

      {/* Main content */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Footer at bottom */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
