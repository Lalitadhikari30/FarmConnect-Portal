import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, MapPin, Heart, Leaf, Eye, EyeOff, Mail, User, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Consumer } from '../../types';
import { auth, db } from '../../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp 
} from 'firebase/firestore';

const ConsumerOnboarding: React.FC = () => {
  const { setCurrentUser, setCurrentPage, setOnboarding } = useApp();
  const [mode, setMode] = useState<'signin' | 'register'>('register'); // Toggle between signin and register
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    preferences: [] as string[]
  });

  // Sign In Form Data
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const preferenceOptions = [
    'Organic Produce',
    'Seasonal Vegetables',
    'Fresh Fruits',
    'Herbs & Spices',
    'Root Vegetables',
    'Leafy Greens',
    'Berries',
    'Stone Fruits',
    'Citrus Fruits',
    'Heirloom Varieties',
    'Locally Grown',
    'Pesticide-Free'
  ];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 && 
           /(?=.*[a-z])/.test(password) && 
           /(?=.*[A-Z])/.test(password) && 
           /(?=.*\d)/.test(password);
  };

  const validateSignIn = () => {
    const newErrors: {[key: string]: string} = {};

    if (!signInData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(signInData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!signInData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep1 = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSignInInputChange = (field: string, value: string) => {
    setSignInData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePreferenceToggle = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };
// Firebase Sign In
  const handleSignIn = async () => {
    if (!validateSignIn()) return;

    setLoading(true);
    setErrors({});

    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        signInData.email, 
        signInData.password
      );

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'consumers', userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const consumer: Consumer = {
          id: userCredential.user.uid,
          type: 'consumer',
          joinDate: userData.joinDate,
          sustainabilityScore: userData.sustainabilityScore || 0,
          favoritesFarmers: userData.favoritesFarmers || [],
          greenBadges: userData.greenBadges || [],
          name: userData.name,
          email: userData.email,
          phone: userData.phone || '',
          location: userData.location,
          preferences: userData.preferences || []
        };

        setCurrentUser(consumer);
        setOnboarding(false);
        setCurrentPage('marketplace');
      } else {
        setErrors({ general: 'User profile not found. Please contact support.' });
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/user-not-found') {
        setErrors({ email: 'No account found with this email' });
      } else if (error.code === 'auth/wrong-password') {
        setErrors({ password: 'Incorrect password' });
      } else if (error.code === 'auth/invalid-credential') {
        setErrors({ general: 'Invalid email or password' });
      } else {
        setErrors({ general: 'Failed to sign in. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  // Firebase Registration
  const handleComplete = async () => {
    setLoading(true);
    setErrors({});

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // Update user profile with display name
      await updateProfile(user, {
        displayName: formData.name
      });

      // Create user document in Firestore
      const consumerData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        location: formData.location,
        preferences: formData.preferences,
        type: 'consumer',
        joinDate: serverTimestamp(),
        sustainabilityScore: 0,
        favoritesFarmers: [],
        greenBadges: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'consumers', user.uid), consumerData);

      // Create Consumer object for app state
      const newConsumer: Consumer = {
        id: user.uid,
        type: 'consumer',
        joinDate: new Date().toISOString(),
        sustainabilityScore: 0,
        favoritesFarmers: [],
        greenBadges: [],
        name: formData.name,
        email: formData.email,
        // phone: formData.phone,
        location: formData.location,
        preferences: formData.preferences
      };

      setCurrentUser(newConsumer);
      setOnboarding(false);
      setCurrentPage('marketplace');
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle specific Firebase errors
      if (error.code === 'auth/email-already-in-use') {
        setErrors({ email: 'This email is already registered' });
        setStep(1);
      } else if (error.code === 'auth/weak-password') {
        setErrors({ password: 'Password is too weak' });
        setStep(1);
      } else {
        setErrors({ general: 'Failed to create account. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode: 'signin' | 'register') => {
    setMode(newMode);
    setStep(1);
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Sign In Form
  if (mode === 'signin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 py-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setCurrentPage('onboarding-type')}
                className="flex items-center text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200 hover:bg-emerald-50 px-3 py-2 rounded-lg"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
            </div>

            {/* Sign In Form */}
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
                  Welcome Back
                </h2>
                <p className="text-slate-600">Sign in to your FarmConnect account</p>
              </div>

              <div className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={signInData.email}
                    onChange={(e) => handleSignInInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                      errors.email 
                        ? 'border-red-300 focus:border-red-500 bg-red-50' 
                        : 'border-slate-200 focus:border-emerald-500 bg-white'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <Lock className="inline h-4 w-4 mr-1" />
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={signInData.password}
                      onChange={(e) => handleSignInInputChange('password', e.target.value)}
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                        errors.password 
                          ? 'border-red-300 focus:border-red-500 bg-red-50' 
                          : 'border-slate-200 focus:border-emerald-500 bg-white'
                      }`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                    Forgot Password?
                  </button>
                </div>
              </div>

              {/* Sign In Button */}
              <button
                onClick={handleSignIn}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Sign In
              </button>

              {/* Switch to Register */}
              <div className="text-center pt-6 border-t border-slate-200">
                <p className="text-slate-600 mb-3">Don't have an account?</p>
                <button
                  onClick={() => switchMode('register')}
                  className="text-emerald-600 hover:text-emerald-700 font-semibold hover:bg-emerald-50 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  Create New Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Registration Form
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
                Create Your Account
              </h2>
              <p className="text-slate-600">Join FarmConnect and discover fresh, local produce</p>
            </div>

            <div className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                    errors.name 
                      ? 'border-red-300 focus:border-red-500 bg-red-50' 
                      : 'border-slate-200 focus:border-emerald-500 bg-white'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                    errors.email 
                      ? 'border-red-300 focus:border-red-500 bg-red-50' 
                      : 'border-slate-200 focus:border-emerald-500 bg-white'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Lock className="inline h-4 w-4 mr-1" />
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full px-4 py-3 pr-12 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                      errors.password 
                        ? 'border-red-300 focus:border-red-500 bg-red-50' 
                        : 'border-slate-200 focus:border-emerald-500 bg-white'
                    }`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.password}
                  </p>
                )}
                {formData.password && !errors.password && (
                  <div className="mt-2 space-y-1">
                    <div className={`text-xs flex items-center ${formData.password.length >= 8 ? 'text-green-600' : 'text-slate-400'}`}>
                      <CheckCircle className={`h-3 w-3 mr-1 ${formData.password.length >= 8 ? 'text-green-500' : 'text-slate-300'}`} />
                      At least 8 characters
                    </div>
                    <div className={`text-xs flex items-center ${/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'text-green-600' : 'text-slate-400'}`}>
                      <CheckCircle className={`h-3 w-3 mr-1 ${/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'text-green-500' : 'text-slate-300'}`} />
                      Upper & lowercase letters
                    </div>
                    <div className={`text-xs flex items-center ${/(?=.*\d)/.test(formData.password) ? 'text-green-600' : 'text-slate-400'}`}>
                      <CheckCircle className={`h-3 w-3 mr-1 ${/(?=.*\d)/.test(formData.password) ? 'text-green-500' : 'text-slate-300'}`} />
                      At least one number
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Lock className="inline h-4 w-4 mr-1" />
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`w-full px-4 py-3 pr-12 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                      errors.confirmPassword 
                        ? 'border-red-300 focus:border-red-500 bg-red-50' 
                        : 'border-slate-200 focus:border-emerald-500 bg-white'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.confirmPassword}
                  </p>
                )}
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="mt-1 text-sm text-green-600 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Passwords match
                  </p>
                )}
              </div>

              {/* Phone Field (Optional) */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-emerald-500 focus:outline-none bg-white transition-all duration-200"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Location Field */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                      errors.location 
                        ? 'border-red-300 focus:border-red-500 bg-red-50' 
                        : 'border-slate-200 focus:border-emerald-500 bg-white'
                    }`}
                    placeholder="City, State"
                  />
                </div>
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.location}
                  </p>
                )}
              </div>
            </div>

            {/* Switch to Sign In */}
            <div className="text-center pt-6 border-t border-slate-200">
              <p className="text-slate-600 mb-3">Already have an account?</p>
              <button
                onClick={() => switchMode('signin')}
                className="text-emerald-600 hover:text-emerald-700 font-semibold hover:bg-emerald-50 px-4 py-2 rounded-lg transition-all duration-200"
              >
                Sign In Instead
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">What are you looking for?</h2>
              <p className="text-slate-600">Select your preferences to get personalized recommendations</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-4">
                <Heart className="inline h-4 w-4 mr-1 text-emerald-500" />
                Food Preferences (select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {preferenceOptions.map((preference) => (
                  <label 
                    key={preference} 
                    className={`flex items-center space-x-3 p-3 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:bg-emerald-50 ${
                      formData.preferences.includes(preference)
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                        : 'border-slate-200 hover:border-emerald-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.preferences.includes(preference)}
                      onChange={() => handlePreferenceToggle(preference)}
                      className="w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                    />
                    <span className="text-sm font-medium">{preference}</span>
                  </label>
                ))}
              </div>
              <p className="mt-3 text-sm text-slate-500">
                Selected: {formData.preferences.length} preferences
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-green-100 p-6 rounded-2xl border border-emerald-200">
              <div className="flex items-center mb-3">
                <Leaf className="h-6 w-6 text-emerald-600 mr-2" />
                <h3 className="font-bold text-emerald-800">Sustainability Benefits</h3>
              </div>
              <ul className="text-sm text-emerald-700 space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                  Reduce carbon footprint by shopping locally
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                  Support sustainable farming practices
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                  Get fresher, more nutritious produce
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                  Build connections with your local community
                </li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => step > 1 ? setStep(step - 1) : setCurrentPage('onboarding-type')}
              className="flex items-center text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-200 hover:bg-emerald-50 px-3 py-2 rounded-lg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
            <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full font-medium">
              Step {step} of 2
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-emerald-500 to-green-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${(step / 2) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-end mt-8">
            {step < 2 ? (
              <button
                onClick={handleNext}
                className="flex items-center bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Next Step
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                Start Shopping 🛒
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerOnboarding;