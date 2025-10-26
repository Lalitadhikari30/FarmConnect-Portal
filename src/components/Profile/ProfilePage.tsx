import React, { useState, useEffect } from 'react';
import {
  User, Edit3, Save, Camera, MapPin, Phone, Mail, Calendar, Shield, Bell,
  Eye, EyeOff, Lock, Trash2, CheckCircle, AlertCircle, Settings, Star, Award, Leaf, ShoppingBag, Heart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from 'firebase/firestore';
import { db } from "../../firebase"; // your firebase.js must export db

const ProfilePage: React.FC = () => {
  const { currentUser } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const safeUser = currentUser || {};
  const [profileData, setProfileData] = useState({
    name: safeUser.name || 'User',
    email: safeUser.email || '',
    phone: safeUser.phone || '+91 98765 43210',
    address: safeUser.address || '123 Green Street, Delhi, IN 110001',
    bio: safeUser.bio || 'Passionate about sustainable farming and supporting local agriculture. Love discovering fresh, organic produce from local farmers.',
    joinDate: safeUser.joinDate || '2024-01-15',
    avatar: safeUser.avatar || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400'
  });

  useEffect(() => {
    setIsVisible(true);
    setProfileData(prev => ({
      ...prev,
      name: safeUser.name || 'User',
      email: safeUser.email || '',
      avatar: safeUser.avatar || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400'
    }));
    // eslint-disable-next-line
  }, [currentUser]);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    farmerMessages: true,
    promotions: false,
    newsletter: true,
    newFarmers: true,
    priceAlerts: false
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    showAddress: false,
    allowMessages: true
  });

  // ---- Only this function is changed ----
  const handleSaveProfile = async () => {
    setIsEditing(false);
    if (!currentUser?.uid) return;
    try {
      await setDoc(doc(db, "users", currentUser.uid), {
        ...profileData,
        notifications,
        privacy,
        type: currentUser?.type || 'User',
        lastUpdated: new Date().toISOString()
      }, { merge: true });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    // TODO: Save password change to backend
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string | keyof typeof privacy, value: string | boolean) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/Welcome", { replace: true });
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Error signing out. Please try again.");
    }
  };

  const stats = [
    { label: 'Total Orders', value: '24', icon: ShoppingBag, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50' },
    { label: 'Favorite Farmers', value: '8', icon: Heart, color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-50' },
    { label: 'Reviews Given', value: '15', icon: Star, color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-50' },
    { label: 'Sustainability Score', value: '850', icon: Leaf, color: 'from-emerald-500 to-green-500', bgColor: 'bg-emerald-50' }
  ];

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Eye },
    { id: 'preferences', label: 'Preferences', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-display font-bold gradient-text mb-2 flex items-center">
                <User className="h-10 w-10 mr-4 text-emerald-600" />
                My Profile
              </h1>
              <p className="text-slate-600 text-lg">Manage your account settings and preferences</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl shadow-lg p-6 fade-in-up">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={profileData.avatar}
                    alt={profileData.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-emerald-500/20 shadow-lg"
                  />
                  <button className="absolute -bottom-2 -right-2 p-2 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mt-4">{profileData.name}</h3>
                <p className="text-slate-600 capitalize">{currentUser?.type || 'User'}</p>
                <div className="flex items-center justify-center mt-2 text-sm text-slate-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined {profileData.joinDate ? new Date(profileData.joinDate).toLocaleDateString() : ""}
                </div>
              </div>
              <div className="space-y-3">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.label} className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-slate-200/50">
                      <div className="flex items-center">
                        <div className={`${stat.bgColor} p-2 rounded-lg mr-3`}>
                          <Icon className={`h-4 w-4 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{stat.label}</span>
                      </div>
                      <span className="font-bold text-slate-800">{stat.value}</span>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={handleSignOut}
                className="w-full mb-4 py-2 mt-6 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg shadow transition"
              >
                Sign Out
              </button>
              <div className="mt-2 p-4 bg-emerald-50/50 rounded-lg border border-emerald-200/50">
                <div className="flex items-center mb-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600 mr-2" />
                  <span className="font-semibold text-emerald-800">Verified Account</span>
                </div>
                <p className="text-xs text-emerald-700">Your account has been verified for secure transactions.</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="glass-effect rounded-2xl shadow-lg overflow-hidden fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="border-b border-slate-200/50">
                <div className="flex overflow-x-auto">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-all duration-300 border-b-2 ${
                          activeTab === tab.id
                            ? 'text-emerald-600 border-emerald-500 bg-emerald-50/50'
                            : 'text-slate-600 border-transparent hover:text-emerald-600 hover:bg-emerald-50/30'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="p-6">
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-slate-800">Personal Information</h2>
                      <button
                        onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                        className={`flex items-center px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 ${
                          isEditing
                            ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                            : 'bg-white/70 border border-slate-200 text-slate-700 hover:bg-white/90'
                        }`}
                      >
                        {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit3 className="h-4 w-4 mr-2" />}
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                            disabled={!isEditing}
                            className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <textarea
                            value={profileData.address}
                            onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                            disabled={!isEditing}
                            rows={3}
                            className="w-full pl-10 pr-4 py-3 bg-white/70 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all duration-200 resize-none"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Bio</label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        disabled={!isEditing}
                        rows={4}
                        placeholder="Tell us about yourself..."
                        className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-slate-50 disabled:cursor-not-allowed transition-all duration-200 resize-none"
                      />
                    </div>
                  </div>
                )}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Security Settings</h2>
                    <div className="bg-blue-50/50 border border-blue-200/50 rounded-lg p-4 mb-6">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-blue-600 mr-2" />
                        <span className="font-semibold text-blue-800">Account Security Status: Strong</span>
                      </div>
                      <p className="text-sm text-blue-700 mt-1">Your account is secure with verified email and strong password.</p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Current Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                            className="w-full pl-10 pr-12 py-3 bg-white/70 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                            className="w-full pl-10 pr-12 py-3 bg-white/70 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                            placeholder="Enter new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm New Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                            className="w-full pl-10 pr-12 py-3 bg-white/70 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                            placeholder="Confirm new password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={handlePasswordChange}
                        className="flex items-center px-6 py-3 bg-emerald-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 hover:bg-emerald-600"
                      >
                        <Lock className="h-4 w-4 mr-2" />
                        Change Password
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Notification Preferences</h2>
                    <div className="space-y-4">
                      {Object.entries({
                        orderUpdates: 'Order Updates',
                        farmerMessages: 'Messages from Farmers',
                        promotions: 'Promotions & Deals',
                        newsletter: 'Newsletter',
                        newFarmers: 'New Farmers in Your Area',
                        priceAlerts: 'Price Drop Alerts'
                      }).map(([key, label]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-white/50 border border-slate-200/50 rounded-lg">
                          <div>
                            <h3 className="font-medium text-slate-800">{label}</h3>
                            <p className="text-sm text-slate-600">Receive notifications about {label.toLowerCase()}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={notifications[key as keyof typeof notifications]}
                              onChange={(e) => handleNotificationChange(key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Privacy Settings</h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-white/50 border border-slate-200/50 rounded-lg">
                        <h3 className="font-medium text-slate-800 mb-2">Profile Visibility</h3>
                        <select
                          value={privacy.profileVisibility}
                          onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        >
                          <option value="public">Public - Visible to all users</option>
                          <option value="farmers">Farmers Only - Only farmers can see your profile</option>
                          <option value="private">Private - Only you can see your profile</option>
                        </select>
                      </div>
                      {Object.entries({
                        showEmail: 'Show Email Address',
                        showPhone: 'Show Phone Number',
                        showAddress: 'Show Address',
                        allowMessages: 'Allow Direct Messages'
                      }).map(([key, label]) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-white/50 border border-slate-200/50 rounded-lg">
                          <div>
                            <h3 className="font-medium text-slate-800">{label}</h3>
                            <p className="text-sm text-slate-600">Control who can see this information</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={privacy[key as keyof typeof privacy] as boolean}
                              onChange={(e) => handlePrivacyChange(key, e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'preferences' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">App Preferences</h2>
                    <div className="space-y-4">
                      <div className="p-4 bg-white/50 border border-slate-200/50 rounded-lg">
                        <h3 className="font-medium text-slate-800 mb-2">Language</h3>
                        <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200">
                          <option value="en">English</option>
                          <option value="hi">Hindi</option>
                          <option value="es">Spanish</option>
                        </select>
                      </div>
                      <div className="p-4 bg-white/50 border border-slate-200/50 rounded-lg">
                        <h3 className="font-medium text-slate-800 mb-2">Currency</h3>
                        <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200">
                          <option value="inr">INR (₹)</option>
                          <option value="usd">USD ($)</option>
                          <option value="eur">EUR (€)</option>
                        </select>
                      </div>
                      <div className="p-4 bg-white/50 border border-slate-200/50 rounded-lg">
                        <h3 className="font-medium text-slate-800 mb-2">Distance Unit</h3>
                        <select className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200">
                          <option value="km">Kilometers</option>
                          <option value="miles">Miles</option>
                        </select>
                      </div>
                      <div className="p-4 bg-red-50/50 border border-red-200/50 rounded-lg">
                        <h3 className="font-medium text-red-800 mb-2 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Danger Zone
                        </h3>
                        <p className="text-sm text-red-700 mb-4">These actions cannot be undone. Please be careful.</p>
                        <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 hover:bg-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
