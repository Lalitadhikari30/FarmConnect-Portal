// // import React, { useState } from 'react';
// // import { ArrowLeft, ArrowRight, MapPin, Award, Leaf } from 'lucide-react';
// // import { useApp } from '../../context/AppContext';
// // import { Farmer } from '../../types';
// // import { db } from '../../firebase';
// // import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// // const FarmerOnboarding: React.FC = () => {
// //   const { setCurrentUser, setCurrentPage, setOnboarding } = useApp();
// //   const [step, setStep] = useState(1);
// //  const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [formData, setFormData] = useState({
// //     name: '',
// //     email: '',
// //     farmName: '',
// //     location: '',
// //     farmSize: '',
// //     description: '',
// //     certifications: [] as string[],
// //     practices: [] as string[]
// //   });

// //   const certificationOptions = [
// //     'USDA Organic',
// //     'Certified Naturally Grown',
// //     'Biodynamic',
// //     'Fair Trade',
// //     'Rainforest Alliance',
// //     'Non-GMO Project'
// //   ];

// //   const practiceOptions = [
// //     'Crop Rotation',
// //     'Companion Planting',
// //     'Cover Cropping',
// //     'Water Conservation',
// //     'Integrated Pest Management',
// //     'Composting',
// //     'No-Till Farming',
// //     'Permaculture'
// //   ];

// //    const handleInputChange = (field: string, value: string) => {
// //     setFormData(prev => ({ ...prev, [field]: value }));
// //     setError('');
// //   };

// //   const handleArrayToggle = (field: 'certifications' | 'practices', value: string) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [field]: prev[field].includes(value)
// //         ? prev[field].filter(item => item !== value)
// //         : [...prev[field], value]
// //     }));
// //   };

// //   const handleComplete = async () => {
// //     setLoading(true);
// //     setError('');

// //  try {
// //       // Create the farmer data object for Firestore
// //       const farmerData = {
// //         type: 'farmer',
// //         name: formData.name,
// //         email: formData.email,
// //         farmName: formData.farmName,
// //         location: formData.location,
// //         farmSize: formData.farmSize,
// //         description: formData.description,
// //         certifications: formData.certifications,
// //         practices: formData.practices,
// //         rating: 0,
// //         totalReviews: 0,
// //         joinDate: serverTimestamp(),
// //         createdAt: serverTimestamp(),
// //         updatedAt: serverTimestamp(),
// //         isActive: true
// //       };

// //       // Add document to Firestore 'farmers' collection
// //       const docRef = await addDoc(collection(db, 'farmers'), farmerData);

// //       // Create the local farmer object with the Firestore document ID
// //       const newFarmer: Farmer = {
// //         id: docRef.id,
// //         type: 'farmer',
// //         joinDate: new Date().toISOString(),
// //         rating: 0,
// //         totalReviews: 0,
// //         ...formData
// //       };
// // // Update local state
// //       setCurrentUser(newFarmer);
// //       setOnboarding(false);
// //       setCurrentPage('dashboard');
// //       onsole.log('Farmer profile created successfully with ID:', docRef.id);
// //     } catch (err) {
// //       console.error('Error creating farmer profile:', err);
// //       setError('Failed to create profile. Please try again.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const renderStep = () => {
// //     switch (step) {
// //       case 1:
// //         return (
// //           <div className="space-y-6">
// //             <div className="text-center mb-8">
// //               <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's get to know you</h2>
// //               <p className="text-gray-600">Tell us about yourself and your farm</p>
// //             </div>

// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Your Name *
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={formData.name}
// //                   onChange={(e) => handleInputChange('name', e.target.value)}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                   placeholder="Enter your full name"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Email Address *
// //                 </label>
// //                 <input
// //                   type="email"
// //                   value={formData.email}
// //                   onChange={(e) => handleInputChange('email', e.target.value)}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                   placeholder="Enter your email"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Farm Name *
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={formData.farmName}
// //                   onChange={(e) => handleInputChange('farmName', e.target.value)}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                   placeholder="What's your farm called?"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Location *
// //                 </label>
// //                 <div className="relative">
// //                   <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
// //                   <input
// //                     type="text"
// //                     value={formData.location}
// //                     onChange={(e) => handleInputChange('location', e.target.value)}
// //                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                     placeholder="City, State"
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         );

// //       case 2:
// //         return (
// //           <div className="space-y-6">
// //             <div className="text-center mb-8">
// //               <h2 className="text-2xl font-bold text-gray-900 mb-2">About your farm</h2>
// //               <p className="text-gray-600">Help customers understand your operation</p>
// //             </div>

// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Farm Size
// //                 </label>
// //                 <select
// //                   value={formData.farmSize}
// //                   onChange={(e) => handleInputChange('farmSize', e.target.value)}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                 >
// //                   <option value="">Select farm size</option>
// //                   <option value="Less than 1 acre">Less than 1 acre</option>
// //                   <option value="1-5 acres">1-5 acres</option>
// //                   <option value="5-10 acres">5-10 acres</option>
// //                   <option value="10-25 acres">10-25 acres</option>
// //                   <option value="25-50 acres">25-50 acres</option>
// //                   <option value="50+ acres">50+ acres</option>
// //                 </select>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">
// //                   Farm Description
// //                 </label>
// //                 <textarea
// //                   value={formData.description}
// //                   onChange={(e) => handleInputChange('description', e.target.value)}
// //                   rows={4}
// //                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
// //                   placeholder="Tell customers about your farm, what you grow, and what makes you special..."
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         );

// //       case 3:
// //         return (
// //           <div className="space-y-6">
// //             <div className="text-center mb-8">
// //               <h2 className="text-2xl font-bold text-gray-900 mb-2">Certifications & Practices</h2>
// //               <p className="text-gray-600">Showcase your farming credentials and methods</p>
// //             </div>

// //             <div className="space-y-6">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-3">
// //                   <Award className="inline h-4 w-4 mr-1" />
// //                   Certifications
// //                 </label>
// //                 <div className="grid grid-cols-2 gap-3">
// //                   {certificationOptions.map((cert) => (
// //                     <label key={cert} className="flex items-center space-x-2 cursor-pointer">
// //                       <input
// //                         type="checkbox"
// //                         checked={formData.certifications.includes(cert)}
// //                         onChange={() => handleArrayToggle('certifications', cert)}
// //                         className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
// //                       />
// //                       <span className="text-sm text-gray-700">{cert}</span>
// //                     </label>
// //                   ))}
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-3">
// //                   <Leaf className="inline h-4 w-4 mr-1" />
// //                   Farming Practices
// //                 </label>
// //                 <div className="grid grid-cols-2 gap-3">
// //                   {practiceOptions.map((practice) => (
// //                     <label key={practice} className="flex items-center space-x-2 cursor-pointer">
// //                       <input
// //                         type="checkbox"
// //                         checked={formData.practices.includes(practice)}
// //                         onChange={() => handleArrayToggle('practices', practice)}
// //                         className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
// //                       />
// //                       <span className="text-sm text-gray-700">{practice}</span>
// //                     </label>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         );

// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12">
// //       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="bg-white rounded-2xl shadow-xl p-8">
// //           {/* Header */}
// //           <div className="flex items-center justify-between mb-8">
// //             <button
// //               onClick={() => step > 1 ? setStep(step - 1) : setCurrentPage('onboarding-type')}
// //               className="flex items-center text-green-600 hover:text-green-700"
// //             >
// //               <ArrowLeft className="h-4 w-4 mr-2" />
// //               Back
// //             </button>
// //             <div className="text-sm text-gray-500">
// //               Step {step} of 3
// //             </div>
// //           </div>

// //           {/* Progress Bar */}
// //           <div className="mb-8">
// //             <div className="w-full bg-gray-200 rounded-full h-2">
// //               <div
// //                 className="bg-green-600 h-2 rounded-full transition-all duration-300"
// //                 style={{ width: `${(step / 3) * 100}%` }}
// //               />
// //             </div>
// //           </div>

// //           {/* Step Content */}
// //           {renderStep()}

// //           {/* Navigation */}
// //           <div className="flex justify-end mt-8">
// //             {step < 3 ? (
// //               <button
// //                 onClick={() => setStep(step + 1)}
// //                 disabled={!formData.name || !formData.email || !formData.farmName || !formData.location}
// //                 className="flex items-center bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
// //               >
// //                 Next
// //                 <ArrowRight className="h-4 w-4 ml-2" />
// //               </button>
// //             ) : (
// //               <button
// //                 onClick={handleComplete}
// //                 className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
// //               >
// //                 Complete Setup
// //               </button>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FarmerOnboarding;


// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { ArrowLeft, ArrowRight, MapPin, Award, Leaf } from 'lucide-react';
// import { useApp } from '../../context/AppContext';
// import { Farmer } from '../../types';
// import { db, auth } from '../../firebase';
// import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   UserCredential
// } from 'firebase/auth';

// type Mode = 'signup' | 'signin';

// const certificationOptions = [
//   'USDA Organic',
//   'Certified Naturally Grown',
//   'Biodynamic',
//   'Fair Trade',
//   'Rainforest Alliance',
//   'Non-GMO Project'
// ];

// const practiceOptions = [
//   'Crop Rotation',
//   'Companion Planting',
//   'Cover Cropping',
//   'Water Conservation',
//   'Integrated Pest Management',
//   'Composting',
//   'No-Till Farming',
//   'Permaculture'
// ];

// const FarmerOnboarding: React.FC = () => {
//   const { setCurrentUser, setCurrentPage, setOnboarding } = useApp();
//   const [step, setStep] = useState<number>(1);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const [mode, setMode] = useState<Mode>('signup');
//   const [signinData, setSigninData] = useState<{ email: string; password: string }>({
//     email: '',
//     password: ''
//   });
//   const [formData, setFormData] = useState<{
//     name: string;
//     email: string;
//     password: string;
//     farmName: string;
//     location: string;
//     farmSize: string;
//     description: string;
//     certifications: string[];
//     practices: string[];
//   }>({
//     name: '',
//     email: '',
//     password: '',
//     farmName: '',
//     location: '',
//     farmSize: '',
//     description: '',
//     certifications: [],
//     practices: []
//   });

//   const handleInputChange = (field: keyof typeof formData, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     setError('');
//   };

//   const handleArrayToggle = (field: 'certifications' | 'practices', value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: prev[field].includes(value)
//         ? prev[field].filter(item => item !== value)
//         : [...prev[field], value]
//     }));
//   };

//   // Signup logic
//   const handleComplete = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const userCred: UserCredential = await createUserWithEmailAndPassword(
//         auth,
//         formData.email,
//         formData.password
//       );
//       const farmerData = {
//         uid: userCred.user.uid,
//         type: 'farmer',
//         name: formData.name,
//         email: formData.email,
//         farmName: formData.farmName,
//         location: formData.location,
//         farmSize: formData.farmSize,
//         description: formData.description,
//         certifications: formData.certifications,
//         practices: formData.practices,
//         rating: 0,
//         totalReviews: 0,
//         joinDate: serverTimestamp(),
//         createdAt: serverTimestamp(),
//         updatedAt: serverTimestamp(),
//         isActive: true
//       };
//       const docRef = await addDoc(collection(db, 'farmers'), farmerData);
//       const newFarmer: Farmer = {
//         id: docRef.id,
//         type: 'farmer',
//         joinDate: new Date().toISOString(),
//         rating: 0,
//         totalReviews: 0,
//         ...formData
//       };
//       setCurrentUser(newFarmer);
//       setOnboarding(false);
//       setCurrentPage('dashboard');
//     } catch (err: any) {
//       setError(err.message || 'Failed to create profile. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Sign-in logic
//   const handleSignIn = async (e: FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       const res = await signInWithEmailAndPassword(
//         auth,
//         signinData.email,
//         signinData.password
//       );
//       // Fetch the farmer profile from Firestore by uid
//       const farmerSnap = await getDocs(query(collection(db, 'farmers'), where('uid', '==', res.user.uid)));
//       if (!farmerSnap.empty) {
//         const farmerDoc = farmerSnap.docs[0];
//         setCurrentUser({
//           id: farmerDoc.id,
//           ...farmerDoc.data()
//         } as Farmer);
//         setOnboarding(false);
//         setCurrentPage('dashboard');
//       } else {
//         setError('Farmer profile not found.');
//       }
//     } catch (err: any) {
//       setError(err.message || 'Failed to sign in. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Multi-step signup form rendering
//   const renderStep = () => {
//     switch (step) {
//       case 1:
//         return (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
//               <input
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => handleInputChange('name', e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 placeholder="Enter your full name"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
//               <input
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleInputChange('email', e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 placeholder="Enter your email"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
//               <input
//                 type="password"
//                 value={formData.password}
//                 onChange={(e) => handleInputChange('password', e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 placeholder="Create a strong password"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Farm Name *</label>
//               <input
//                 type="text"
//                 value={formData.farmName}
//                 onChange={(e) => handleInputChange('farmName', e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 placeholder="What's your farm called?"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
//                 <input
//                   type="text"
//                   value={formData.location}
//                   onChange={(e) => handleInputChange('location', e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="City, State"
//                   required
//                 />
//               </div>
//             </div>
//           </div>
//         );
//       case 2:
//         return (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Farm Size</label>
//               <select
//                 value={formData.farmSize}
//                 onChange={(e) => handleInputChange('farmSize', e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               >
//                 <option value="">Select farm size</option>
//                 <option value="Less than 1 acre">Less than 1 acre</option>
//                 <option value="1-5 acres">1-5 acres</option>
//                 <option value="5-10 acres">5-10 acres</option>
//                 <option value="10-25 acres">10-25 acres</option>
//                 <option value="25-50 acres">25-50 acres</option>
//                 <option value="50+ acres">50+ acres</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">Farm Description</label>
//               <textarea
//                 value={formData.description}
//                 onChange={(e) => handleInputChange('description', e.target.value)}
//                 rows={4}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 placeholder="Describe your farm, what you grow, and what makes you special..."
//               />
//             </div>
//           </div>
//         );
//       case 3:
//         return (
//           <div className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 <Award className="inline h-4 w-4 mr-1" />
//                 Certifications
//               </label>
//               <div className="grid grid-cols-2 gap-3">
//                 {certificationOptions.map((cert) => (
//                   <label key={cert} className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={formData.certifications.includes(cert)}
//                       onChange={() => handleArrayToggle('certifications', cert)}
//                       className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//                     />
//                     <span className="text-sm text-gray-700">{cert}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-3">
//                 <Leaf className="inline h-4 w-4 mr-1" />
//                 Farming Practices
//               </label>
//               <div className="grid grid-cols-2 gap-3">
//                 {practiceOptions.map((practice) => (
//                   <label key={practice} className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={formData.practices.includes(practice)}
//                       onChange={() => handleArrayToggle('practices', practice)}
//                       className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
//                     />
//                     <span className="text-sm text-gray-700">{practice}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   // Sign-in form
//   const renderSignIn = () => (
//     <form className="space-y-6" onSubmit={handleSignIn}>
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
//         <input
//           type="email"
//           value={signinData.email}
//           onChange={(e) => setSigninData(prev => ({ ...prev, email: e.target.value }))}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
//         <input
//           type="password"
//           value={signinData.password}
//           onChange={(e) => setSigninData(prev => ({ ...prev, password: e.target.value }))}
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//           required
//         />
//       </div>
//       <div>
//         <button
//           type="submit"
//           className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold w-full"
//           disabled={loading}
//         >
//           {loading ? 'Signing in...' : 'Sign In'}
//         </button>
//       </div>
//     </form>
//   );


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 flex items-center">
//       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <div className="flex items-center justify-between mb-8">
//             <button
//               onClick={() => mode === 'signup' && step > 1 ? setStep(step - 1) : setCurrentPage('onboarding-type')}
//               className="flex items-center text-green-600 hover:text-green-700"
//               type="button"
//             >
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Back
//             </button>
//             <div className="text-sm text-gray-500">
//               {mode === 'signup' ? `Step ${step} of 3` : ''}
//             </div>
//           </div>

//           <div className="mb-8 w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-green-600 h-2 rounded-full transition-all duration-300"
//               style={{ width: mode === 'signup' ? `${(step / 3) * 100}%` : '100%' }}
//             />
//           </div>

//           {error && (
//             <div className="mb-4 text-red-600 font-bold">{error}</div>
//           )}

//           {mode === 'signup' ? (
//             <>
//               {renderStep()}
//               <div className="flex justify-end mt-8">
//                 {step < 3 ? (
//                   <button
//                     onClick={() => setStep(step + 1)}
//                     disabled={
//                       loading ||
//                       (step === 1 && (!formData.name || !formData.email || !formData.password || !formData.farmName || !formData.location))
//                     }
//                     className="flex items-center bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold shadow transition-colors duration-200"
//                   >
//                     Next
//                     <ArrowRight className="h-4 w-4 ml-2" />
//                   </button>
//                 ) : (
//                   <button
//                     onClick={handleComplete}
//                     disabled={loading}
//                     className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition-colors duration-200"
//                   >
//                     {loading ? 'Creating Account...' : 'Complete Setup'}
//                   </button>
//                 )}
//               </div>
//             </>
//           ) : (
//             <>
//               {renderSignIn()}
//             </>
//           )}
//           <div className="mt-8 text-center">
//             {mode === 'signup' ? (
//               <span>
//                 Already have an account?{" "}
//                 <button
//                   onClick={() => setMode('signin')}
//                   className="text-green-600 hover:underline font-semibold"
//                   type="button"
//                 >
//                   Sign In
//                 </button>
//               </span>
//             ) : (
//               <span>
//                 New to FarmConnect?{" "}
//                 <button
//                   onClick={() => setMode('signup')}
//                   className="text-green-600 hover:underline font-semibold"
//                   type="button"
//                 >
//                   Create Account
//                 </button>
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FarmerOnboarding;



import React, { useState, ChangeEvent, FormEvent } from 'react';
import { ArrowLeft, ArrowRight, MapPin, Award, Leaf } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Farmer } from '../../types';
import { db, auth } from '../../firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential
} from 'firebase/auth';

type Mode = 'signup' | 'signin';

const certificationOptions = [
  'USDA Organic',
  'Certified Naturally Grown',
  'Biodynamic',
  'Fair Trade',
  'Rainforest Alliance',
  'Non-GMO Project'
];

const practiceOptions = [
  'Crop Rotation',
  'Companion Planting',
  'Cover Cropping',
  'Water Conservation',
  'Integrated Pest Management',
  'Composting',
  'No-Till Farming',
  'Permaculture'
];

const FarmerOnboarding: React.FC = () => {
  const { setCurrentUser, setCurrentPage, setOnboarding } = useApp();
  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [mode, setMode] = useState<Mode>('signup');
  const [signinData, setSigninData] = useState<{ email: string; password: string }>({
    email: '',
    password: ''
  });
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    farmName: string;
    location: string;
    farmSize: string;
    description: string;
    certifications: string[];
    practices: string[];
  }>({
    name: '',
    email: '',
    password: '',
    farmName: '',
    location: '',
    farmSize: '',
    description: '',
    certifications: [],
    practices: []
  });

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleArrayToggle = (field: 'certifications' | 'practices', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  // Signup logic
  const handleComplete = async () => {
    setLoading(true);
    setError('');
    try {
      const userCred: UserCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const farmerData = {
        uid: userCred.user.uid,
        type: 'farmer',
        name: formData.name,
        email: formData.email,
        farmName: formData.farmName,
        location: formData.location,
        farmSize: formData.farmSize,
        description: formData.description,
        certifications: formData.certifications,
        practices: formData.practices,
        rating: 0,
        totalReviews: 0,
        joinDate: serverTimestamp(),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isActive: true
      };
      const docRef = await addDoc(collection(db, 'farmers'), farmerData);
      const newFarmer: Farmer = {
        id: docRef.id,
        type: 'farmer',
        joinDate: new Date().toISOString(),
        rating: 0,
        totalReviews: 0,
        ...formData
      };
      setCurrentUser(newFarmer);
      setOnboarding(false);
      setCurrentPage('dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Sign-in logic
  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        signinData.email,
        signinData.password
      );
      // Fetch the farmer profile from Firestore by uid
      const farmerSnap = await getDocs(query(collection(db, 'farmers'), where('uid', '==', res.user.uid)));
      if (!farmerSnap.empty) {
        const farmerDoc = farmerSnap.docs[0];
        setCurrentUser({
          id: farmerDoc.id,
          ...farmerDoc.data()
        } as Farmer);
        setOnboarding(false);
        setCurrentPage('dashboard');
      } else {
        setError('Farmer profile not found.');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Multi-step signup form rendering
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Create a strong password"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Farm Name *</label>
              <input
                type="text"
                value={formData.farmName}
                onChange={(e) => handleInputChange('farmName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="What's your farm called?"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="City, State"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Farm Size</label>
              <select
                value={formData.farmSize}
                onChange={(e) => handleInputChange('farmSize', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select farm size</option>
                <option value="Less than 1 acre">Less than 1 acre</option>
                <option value="1-5 acres">1-5 acres</option>
                <option value="5-10 acres">5-10 acres</option>
                <option value="10-25 acres">10-25 acres</option>
                <option value="25-50 acres">25-50 acres</option>
                <option value="50+ acres">50+ acres</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Farm Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe your farm, what you grow, and what makes you special..."
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Award className="inline h-4 w-4 mr-1" />
                Certifications
              </label>
              <div className="grid grid-cols-2 gap-3">
                {certificationOptions.map((cert) => (
                  <label key={cert} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.certifications.includes(cert)}
                      onChange={() => handleArrayToggle('certifications', cert)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{cert}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                <Leaf className="inline h-4 w-4 mr-1" />
                Farming Practices
              </label>
              <div className="grid grid-cols-2 gap-3">
                {practiceOptions.map((practice) => (
                  <label key={practice} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.practices.includes(practice)}
                      onChange={() => handleArrayToggle('practices', practice)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">{practice}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Exact visual match to your screenshot
  const renderSignIn = () => (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-10">
      <button
        className="text-green-600 hover:text-green-700 mb-4 flex items-center"
        type="button"
        onClick={() => setCurrentPage('onboarding-type')}
      >
        &larr; Back
      </button>
      <h2 className="text-3xl font-bold text-center text-green-700 mb-2">Welcome Back</h2>
      <p className="text-gray-600 text-center mb-8">Sign in to your FarmConnect account</p>
      <form className="space-y-6" onSubmit={handleSignIn}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your email address"
            value={signinData.email}
            onChange={e => setSigninData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter your password"
            value={signinData.password}
            onChange={e => setSigninData(prev => ({ ...prev, password: e.target.value }))}
            required
          />
        </div>
        <div className="flex justify-between items-center">
          <div />
          <button type="button" className="text-green-600 hover:underline text-sm font-medium">
            Forgot Password?
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg py-3 transition duration-200"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      {error && <div className="mt-4 text-red-600 text-center font-bold">{error}</div>}
      <hr className="my-8" />
      <div className="text-center text-gray-700">
        <span>Don't have an account?</span>{' '}
        <button
          className="text-green-700 font-semibold hover:underline"
          type="button"
          onClick={() => setMode('signup')}
        >
          Create New Account
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        {mode === 'signup' ? (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => step > 1 ? setStep(step - 1) : setCurrentPage('onboarding-type')}
                className="flex items-center text-green-600 hover:text-green-700"
                type="button"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
              <div className="text-sm text-gray-500">
                Step {step} of 3
              </div>
            </div>
            <div className="mb-8 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
            {error && (
              <div className="mb-4 text-red-600 font-bold">{error}</div>
            )}
            {renderStep()}
            <div className="flex justify-end mt-8">
              {step < 3 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={
                    loading ||
                    (step === 1 && (!formData.name || !formData.email || !formData.password || !formData.farmName || !formData.location))
                  }
                  className="flex items-center bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold shadow transition-colors duration-200"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleComplete}
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition-colors duration-200"
                >
                  {loading ? 'Creating Account...' : 'Complete Setup'}
                </button>
              )}
            </div>
            <div className="mt-8 text-center">
              <span>
                Already have an account?{" "}
                <button
                  onClick={() => setMode('signin')}
                  className="text-green-600 hover:underline font-semibold"
                  type="button"
                >
                  Sign In
                </button>
              </span>
            </div>
          </div>
        ) : (
          renderSignIn()
        )}
      </div>
    </div>
  );
};

export default FarmerOnboarding;
