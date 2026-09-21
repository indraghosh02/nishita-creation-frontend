
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Mail, 
//   Lock, 
//   Eye, 
//   EyeOff, 
//   ArrowRight,
//   Shield,
//   Flower2,
//   Leaf,
//   Sparkles,
//   Heart,
//   Star,
//   Gift,
//   ShoppingBag
// } from 'lucide-react';
// import Navbar from '../components/layout/Navbar';
// import GoogleLoginButton from '../components/GoogleLoginButton';
// import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';
// import Footer from '../components/layout/Footer';

// // Font family constant
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";

// // Product-related texts for rotation
// const productMessages = [
//    {
//     text: "Luxury makeup collection — from natural everyday to bold glam."
//   },
//   {
//     text: "Discover premium skincare essentials for radiant, glowing skin."
//   },
 
//   {
//     text: "Nourish your hair with our sulfate-free, damage-repair formulas."
//   },
//   {
//     text: "Transform your skincare routine with our best-selling serums."
//   },
//   {
//     text: "Cruelty-free beauty that loves your skin and the planet."
//   },
//   {
//     text: "Complete beauty solutions — makeup, skincare, and hair care."
//   },
//   {
//     text: "Achieve flawless complexion with our dermatologist-tested products."
//   },
//   {
//     text: "Professional-grade hair care for strength, shine, and vitality."
//   }
// ];

// export default function LoginClient() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showForgotPassword, setShowForgotPassword] = useState(false);
//   const [messageIndex, setMessageIndex] = useState(0);

//   // Rotate messages
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setMessageIndex((prev) => (prev + 1) % productMessages.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   // Load remembered email
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const rememberedEmail = localStorage.getItem('rememberedEmail');
//       if (rememberedEmail) {
//         setFormData(prev => ({ ...prev, email: rememberedEmail, rememberMe: true }));
//       }
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   // ========== HELPER: MERGE GUEST CART ==========
//   const mergeGuestCart = async (token) => {
//     try {
//       const guestCartSessionId = localStorage.getItem('cartSessionId');
//       if (!guestCartSessionId) return null;

//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${apiUrl}/api/cart/merge`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           'x-session-id': guestCartSessionId
//         },
//         body: JSON.stringify({ sessionId: guestCartSessionId })
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         localStorage.removeItem('cartSessionId');
//         window.dispatchEvent(new Event('cart-update'));
//         window.dispatchEvent(new Event('auth-change'));
//         return data.data;
//       }
//       return null;
//     } catch (error) {
//       console.error('❌ Merge cart error:', error);
//       return null;
//     }
//   };

//   // ========== HELPER: MERGE GUEST WISHLIST ==========
//   const mergeGuestWishlist = async (token) => {
//     try {
//       const guestWishlistSessionId = localStorage.getItem('wishlistSessionId');
//       if (!guestWishlistSessionId) return null;

//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${apiUrl}/api/wishlist/merge`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           'x-session-id': guestWishlistSessionId
//         },
//         body: JSON.stringify({ sessionId: guestWishlistSessionId })
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         localStorage.removeItem('wishlistSessionId');
//         window.dispatchEvent(new Event('wishlist-update'));
//         return data.data;
//       }
//       return null;
//     } catch (error) {
//       console.error('❌ Merge wishlist error:', error);
//       return null;
//     }
//   };

//   // ========== STORE AUTH DATA ==========
//   const storeAuthData = (token, user) => {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('token', token);
//       localStorage.setItem('user', JSON.stringify(user));
      
//       if (formData.rememberMe) {
//         localStorage.setItem('rememberedEmail', formData.email);
//       } else {
//         localStorage.removeItem('rememberedEmail');
//       }
      
//       return true;
//     }
//     return false;
//   };

//   const getDashboardPath = (role) => {
//     switch(role) {
//       case 'super_admin':
//       case 'admin':
//       case 'moderator':
//         return '/authorize/dashboard';
//       case 'call_center_agent':
//         return '/agent/dashboard';
//       default:
//         return '/customer/dashboard';
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const loadingToast = toast.loading('Logging in...');

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${apiUrl}/api/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password
//         }),
//       });

//       const data = await response.json();
//       toast.dismiss(loadingToast);

//       if (!response.ok) {
//         if (data.requiresVerification) {
//           toast.info('Verify Your Email', {
//             description: 'Please check your email for verification code.',
//             duration: 5000,
//           });
//           setIsSubmitting(false);
//           return;
//         }
        
//         if (data.error && data.error.includes('google')) {
//           toast.error('Google Account Detected', {
//             description: 'This account uses Google Sign-In. Please use the "Continue with Google" button.',
//             duration: 6000,
//           });
//           setIsSubmitting(false);
//           return;
//         }
        
//         toast.error('Login failed', {
//           description: data.error || 'Please check your credentials and try again.',
//           duration: 5000,
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       toast.success('Welcome back!', {
//         description: `Logged in as ${data.user.contactPerson || data.user.email?.split('@')[0]}`,
//         duration: 4000,
//       });

//       const storeSuccess = storeAuthData(data.token, data.user);
//       if (!storeSuccess) {
//         toast.error('Storage Error', {
//           description: 'Failed to save login session. Please try again.',
//         });
//         setIsSubmitting(false);
//         return;
//       }

//       window.dispatchEvent(new Event('auth-change'));
//       await new Promise(resolve => setTimeout(resolve, 300));

//       await mergeGuestCart(data.token);
//       await mergeGuestWishlist(data.token);

//       setTimeout(() => {
//         const userRole = data.user.role;
//         const dashboardPath = getDashboardPath(userRole);
//         window.location.href = dashboardPath;
//       }, 1500);

//     } catch (error) {
//       console.error('Login error:', error);
//       toast.dismiss(loadingToast);
//       toast.error('Connection Error', {
//         description: 'Unable to connect. Please try again!',
//         duration: 5000,
//       });
//       setIsSubmitting(false);
//     }
//   };

//   const handleGoogleSuccess = async (data) => {
//     console.log('✅ Google sign in success:', data);
    
//     if (data.token) {
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify(data.user));
//       window.dispatchEvent(new Event('auth-change'));

//       await new Promise(resolve => setTimeout(resolve, 300));
//       await mergeGuestCart(data.token);
//       await mergeGuestWishlist(data.token);
      
//       setTimeout(() => {
//         const userRole = data.user.role;
//         const dashboardPath = getDashboardPath(userRole);
//         window.location.href = dashboardPath;
//       }, 1500);
      
//       if (data.requiresAdditionalInfo) {
//         toast.success('Google Sign In Successful!', {
//           description: 'Please complete your profile to continue.',
//           duration: 4000,
//         });
//       } else {
//         toast.success('Welcome back!', {
//           description: `Logged in as ${data.user.contactPerson || data.user.email?.split('@')[0]}`,
//           duration: 4000,
//         });
//       }
//     }
//   };

//   const handleGoogleError = (error) => {
//     console.error('Google sign in error:', error);
//     toast.error('Google Sign In Failed', {
//       description: error || 'Unable to sign in with Google. Please try again.',
//     });
//   };

//   return (
//     <>
//       <Navbar />
    
//       <div className="min-h-[calc(100vh-64px)] overflow-hidden relative flex items-center justify-center">
        
//         {/* Background Image with No Overlay */}
//         <div
//           className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//           style={{
//             backgroundImage: 'url(/images/login-1.jpg)',
//           }}
//         />

//         {/* Decorative botanical elements */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute top-10 left-[5%] opacity-8 animate-float">
//             <Leaf className="w-8 h-8 text-white/20" />
//           </div>
//           <div className="absolute bottom-20 right-[8%] opacity-6 animate-float-delayed">
//             <Leaf className="w-10 h-10 text-white/15 rotate-45" />
//           </div>
//           <div className="absolute top-1/4 right-[3%] opacity-6 animate-float-slow">
//             <Leaf className="w-6 h-6 text-white/15 -rotate-12" />
//           </div>
//           <div className="absolute bottom-1/4 left-[3%] opacity-5 animate-float">
//             <Leaf className="w-7 h-7 text-white/10 -rotate-30" />
//           </div>
//         </div>

//         {/* Centered Login Form Container */}
//         <div className="relative z-10 w-full max-w-sm mx-auto px-4 py-6">
//           {/* Mobile Brand - Visible on small screens */}
//           <div className="lg:hidden text-center mb-5">
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="inline-block mb-2">
//                 <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mx-auto shadow-xl">
//                   <Flower2 className="w-7 h-7 text-[#8B9D83]" />
//                 </div>
//               </div>
//               <h1
//                 className="text-2xl font-light text-white mb-0.5"
//                 style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.05em' }}
//               >
//                 Welcome Back
//               </h1>
//               <p
//                 className="text-white/40 text-xs font-light"
//                 style={{ fontFamily: FONT_FAMILY }}
//               >
//                 Sign in to continue
//               </p>
//             </motion.div>
//           </div>

//           {/* Rotating Product Messages - Compact for centered view */}
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//             className="text-center mb-5"
//           >
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={messageIndex}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.5, ease: "easeOut" }}
//               >
//                 <div className="flex items-center justify-center gap-2">
//                   <Sparkles className="w-3.5 h-3.5 text-[#8B9D83] flex-shrink-0" />
//                   <p 
//                     className="text-sm text-white/70 font-light"
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     {productMessages[messageIndex].text}
//                   </p>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
            
//             {/* Message Navigation Dots */}
//             <div className="flex justify-center gap-2 mt-3">
//               {productMessages.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setMessageIndex(i)}
//                   className={`transition-all duration-300 rounded-full ${
//                     i === messageIndex 
//                       ? 'w-6 h-1 bg-[#8B9D83]' 
//                       : 'w-1 h-1 bg-white/20 hover:bg-white/40'
//                   }`}
//                 />
//               ))}
//             </div>
//           </motion.div>

//           {/* Login Card with Animated Border */}
//           <div className="relative">
//             {/* Animated Border Container */}
//             <div className="absolute -inset-0.5 rounded-xl overflow-hidden">
//               <div className="absolute inset-0 rounded-xl border-2 border-transparent">
//                 {/* Top-left to top-right */}
//                 <div className="absolute top-[-2px] left-0 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#8B9D83] to-transparent animate-border-top" />
//                 {/* Top-right to bottom-right */}
//                 <div className="absolute top-0 right-[-2px] w-[2px] h-1/3 bg-gradient-to-b from-transparent via-[#8B9D83] to-transparent animate-border-right" />
//                 {/* Bottom-right to bottom-left */}
//                 <div className="absolute bottom-[-2px] right-0 w-1/3 h-[2px] bg-gradient-to-l from-transparent via-[#8B9D83] to-transparent animate-border-bottom" />
//                 {/* Bottom-left to top-left */}
//                 <div className="absolute bottom-0 left-[-2px] w-[2px] h-1/3 bg-gradient-to-t from-transparent via-[#8B9D83] to-transparent animate-border-left" />
//               </div>
//             </div>

//             {/* Form Card - White Background */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="relative bg-white rounded-xl border border-gray-200 p-5 shadow-2xl"
//             >
//               {/* Desktop Header - Visible on large screens */}
//               <div className="hidden lg:block mb-4">
//                 <h1
//                   className="text-xl font-light text-gray-800"
//                   style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.05em' }}
//                 >
//                   Welcome Back
//                 </h1>
//                 <p
//                   className="text-gray-400 text-xs font-light"
//                   style={{ fontFamily: FONT_FAMILY }}
//                 >
//                   Sign in to continue your journey
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-3.5">
//                 {/* Email Field */}
//                 <div className="space-y-0.5">
//                   <label
//                     htmlFor="email"
//                     className="block text-[10px] font-medium tracking-wider uppercase text-gray-500"
//                     style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}
//                   >
//                     Email
//                   </label>
//                   <div className="relative group">
//                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-[#8B9D83] transition-colors" />
//                     <input
//                       id="email"
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
//                       style={{ fontFamily: FONT_FAMILY }}
//                       placeholder="you@example.com"
//                     />
//                   </div>
//                 </div>

//                 {/* Password Field */}
//                 <div className="space-y-0.5">
//                   <div className="flex justify-between items-center">
//                     <label
//                       htmlFor="password"
//                       className="block text-[10px] font-medium tracking-wider uppercase text-gray-500"
//                       style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.15em' }}
//                     >
//                       Password
//                     </label>
//                     <button
//                       type="button"
//                       onClick={() => setShowForgotPassword(true)}
//                       className="text-[10px] text-gray-400 hover:text-[#8B9D83] transition-colors"
//                       style={{ fontFamily: FONT_FAMILY }}
//                     >
//                       Forgot?
//                     </button>
//                   </div>
//                   <div className="relative group">
//                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-[#8B9D83] transition-colors" />
//                     <input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                       className="w-full pl-9 pr-9 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B9D83]/50 focus:border-transparent transition-all duration-300"
//                       style={{ fontFamily: FONT_FAMILY }}
//                       placeholder="Enter your password"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="w-3.5 h-3.5" />
//                       ) : (
//                         <Eye className="w-3.5 h-3.5" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Submit Button */}
//                 <motion.button
//                   whileHover={{ scale: 1.01 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full py-2.5 px-4 bg-[#8B9D83] text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-[#7a8d72] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
//                   style={{ fontFamily: FONT_FAMILY, letterSpacing: '0.06em' }}
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       Signing in...
//                     </>
//                   ) : (
//                     <>
//                       Sign In
//                       <ArrowRight className="w-3.5 h-3.5" />
//                     </>
//                   )}
//                 </motion.button>

//                 {/* Divider */}
//                 <div className="relative my-2.5">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-gray-200" />
//                   </div>
//                   <div className="relative flex justify-center">
//                     <span
//                       className="px-2 bg-white text-gray-400 text-[10px]"
//                       style={{ fontFamily: FONT_FAMILY }}
//                     >
//                       OR
//                     </span>
//                   </div>
//                 </div>

//                 {/* Google Login Button */}
//                 <div className="w-full">
//                   <GoogleLoginButton 
//                     mode="login"
//                     onSuccess={handleGoogleSuccess}
//                     onError={handleGoogleError}
//                   />
//                 </div>

//                 {/* Create Account Button - On Form */}
//                 <div className="text-center pt-1">
//                   <p
//                     className="text-[11px] text-gray-400"
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     Don't have an account?{' '}
//                     <Link
//                       href="/register"
//                       className="text-[#8B9D83] hover:text-[#7a8d72] transition-colors font-medium inline-flex items-center gap-1"
//                     >
//                       Create Account
//                       <ArrowRight className="w-3 h-3" />
//                     </Link>
//                   </p>
//                 </div>
//               </form>
//             </motion.div>
//           </div>

//           {/* Trust Badge */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//             className="flex items-center justify-center gap-4 mt-4"
//           >
//             <div className="flex items-center gap-1.5">
//               <Shield className="w-2.5 h-2.5 text-white/80" />
//               <span className="text-[8px] text-white/80 tracking-widest uppercase" style={{ fontFamily: FONT_FAMILY }}>
//                 Secure
//               </span>
//             </div>
//             <div className="w-px h-3 bg-white/70" />
//             <div className="flex items-center gap-1.5">
//               <Lock className="w-2.5 h-2.5 text-white/80" />
//               <span className="text-[8px] text-white/80 tracking-widest uppercase" style={{ fontFamily: FONT_FAMILY }}>
//                 Encrypted
//               </span>
//             </div>
//             <div className="w-px h-3 bg-white/70" />
//             <div className="flex items-center gap-1.5">
//               <Shield className="w-2.5 h-2.5 text-white/80" />
//               <span className="text-[8px] text-white/80 tracking-widest uppercase" style={{ fontFamily: FONT_FAMILY }}>
//                 Protected
//               </span>
//             </div>
//           </motion.div>
//         </div>

//         {/* Forgot Password Modal */}
//         <ForgotPasswordModal 
//           isOpen={showForgotPassword}
//           onClose={() => setShowForgotPassword(false)}
//         />
//       </div>
//       <Footer />

//       {/* Animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-10px) rotate(3deg); }
//         }
//         @keyframes float-delayed {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           50% { transform: translateY(-8px) rotate(-2deg); }
//         }
//         @keyframes float-slow {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-12px); }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//         .animate-float-delayed {
//           animation: float-delayed 7s ease-in-out infinite;
//         }
//         .animate-float-slow {
//           animation: float-slow 8s ease-in-out infinite;
//         }

//         /* Animated Border Keyframes */
//         @keyframes borderTop {
//           0% { left: 0; width: 0; }
//           25% { left: 0; width: 100%; }
//           50% { left: 100%; width: 0; }
//           75% { left: 100%; width: 0; }
//           100% { left: 0; width: 0; }
//         }
//         @keyframes borderRight {
//           0% { top: 0; height: 0; }
//           25% { top: 0; height: 0; }
//           50% { top: 0; height: 100%; }
//           75% { top: 100%; height: 0; }
//           100% { top: 0; height: 0; }
//         }
//         @keyframes borderBottom {
//           0% { right: 0; width: 0; }
//           25% { right: 0; width: 0; }
//           50% { right: 0; width: 0; }
//           75% { right: 0; width: 100%; }
//           100% { right: 100%; width: 0; }
//         }
//         @keyframes borderLeft {
//           0% { bottom: 0; height: 0; }
//           25% { bottom: 0; height: 0; }
//           50% { bottom: 0; height: 0; }
//           75% { bottom: 0; height: 0; }
//           100% { bottom: 0; height: 100%; }
//         }

//         .animate-border-top {
//           animation: borderTop 4s ease-in-out infinite;
//         }
//         .animate-border-right {
//           animation: borderRight 4s ease-in-out infinite;
//         }
//         .animate-border-bottom {
//           animation: borderBottom 4s ease-in-out infinite;
//         }
//         .animate-border-left {
//           animation: borderLeft 4s ease-in-out infinite;
//         }
//       `}</style>
//     </>
//   );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  ArrowRight,
  Shield,
  Sparkles,
  Smartphone,
  Home,
  Building2,
  MapPinned,
  Leaf,
  Globe,
  CheckCircle,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import GoogleLoginButton from '../components/GoogleLoginButton';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal';
import Footer from '../components/layout/Footer';
import { useNavbar } from '@/app/hooks/useNavbar';

// ============================================================
// 🎨 NISHAT'S COLOR PALETTE
// ============================================================
const BRAND = '#CC1D34';
const BRAND_DARK = '#8A2530';
const ACCENT_SAGE = '#8B9D83';
const DARK_TEXT = '#29362f';
const MUTED_TEXT = '#687169';
const CREAM_BG = '#f7f4ef';
const CREAM_BORDER = '#e8e2d6';

// Fonts
const FONT_HEADING = "'Fraunces', serif";
const FONT_BODY = "'Plus Jakarta Sans', 'Inter', sans-serif";

// ============================================================
// LOGO HELPER
// ============================================================
const getLogoUrl = (url) => {
  if (!url) return '/logo.png';
  if (url.includes('cloudinary.com')) {
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      return `${parts[0]}/upload/f_auto,q_auto:good,fl_preserve_transparency/${parts[1]}`;
    }
  }
  return url;
};

// Product-related texts for rotation
const productMessages = [
  { text: 'Exclusive saree collection — handloom, batik & block print elegance.' },
  { text: 'Timeless 3-piece sets crafted with traditional block print artistry.' },
  { text: 'Handpicked sarees for weddings, festivals, and everyday elegance.' },
  { text: 'Discover our batik collection — where heritage meets modern grace.' },
  { text: 'Authentic Bangladeshi handloom sarees, woven with love and tradition.' },
  { text: 'Complete ethnic wear — sarees, 3-piece sets, and unstitched kameez.' },
  { text: 'Premium block print sarees that celebrate your timeless beauty.' },
  { text: 'Celebrate every occasion with our exclusive batik & block print range.' },
];

// Required field label
const RequiredLabel = ({ children }) => (
  <span>
    {children}
    <span className="text-[#CC1D34] ml-0.5">*</span>
  </span>
);

// Compact form field wrapper
const FormField = ({ label, icon: Icon, required, optional, children }) => (
  <div>
    <label
      className="flex items-center gap-1 mb-0.5 text-[9px] font-semibold tracking-wider uppercase text-[#687169]"
      style={{ fontFamily: FONT_BODY, letterSpacing: '0.1em' }}
    >
      {Icon && <Icon className="w-2.5 h-2.5 text-[#CC1D34]" />}
      {required ? <RequiredLabel>{label}</RequiredLabel> : label}
      {optional && (
        <span className="text-[#8a938a] normal-case tracking-normal font-normal text-[8px] ml-0.5">
          (optional)
        </span>
      )}
    </label>
    {children}
  </div>
);

export default function AuthClient() {
  const router = useRouter();
  const { navbarData } = useNavbar();
  const [activeTab, setActiveTab] = useState('login');
  const [messageIndex, setMessageIndex] = useState(0);

  // ============ LOGIN STATE ============
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // ============ REGISTER STATE ============
  const [registerData, setRegisterData] = useState({
    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: '',
    address: '',
    city: '',
    zipCode: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [isRegisterSubmitting, setIsRegisterSubmitting] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ============ OTP MODAL STATE ============
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const timerRef = useRef(null);

  // Rotate messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % productMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Load remembered email
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail) {
        setLoginData((prev) => ({
          ...prev,
          email: rememberedEmail,
          rememberMe: true,
        }));
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // ============================================================
  // HELPERS
  // ============================================================
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const mergeGuestCart = async (token) => {
    try {
      const guestCartSessionId = localStorage.getItem('cartSessionId');
      if (!guestCartSessionId) return null;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/cart/merge`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'x-session-id': guestCartSessionId,
        },
        body: JSON.stringify({ sessionId: guestCartSessionId }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.removeItem('cartSessionId');
        window.dispatchEvent(new Event('cart-update'));
        window.dispatchEvent(new Event('auth-change'));
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('❌ Merge cart error:', error);
      return null;
    }
  };

  const mergeGuestWishlist = async (token) => {
    try {
      const guestWishlistSessionId = localStorage.getItem('wishlistSessionId');
      if (!guestWishlistSessionId) return null;

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/wishlist/merge`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'x-session-id': guestWishlistSessionId,
        },
        body: JSON.stringify({ sessionId: guestWishlistSessionId }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.removeItem('wishlistSessionId');
        window.dispatchEvent(new Event('wishlist-update'));
        return data.data;
      }
      return null;
    } catch (error) {
      console.error('❌ Merge wishlist error:', error);
      return null;
    }
  };

  const getDashboardPath = (role) => {
    switch (role) {
      case 'super_admin':
      case 'admin':
      case 'moderator':
        return '/authorize/dashboard';
      case 'call_center_agent':
        return '/agent/dashboard';
      default:
        return '/customer/dashboard';
    }
  };

  const storeAuthData = (token, user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      if (loginData.rememberMe) {
        localStorage.setItem('rememberedEmail', loginData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      return true;
    }
    return false;
  };

  // ============================================================
  // LOGIN HANDLERS
  // ============================================================
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoginSubmitting(true);

    const loadingToast = toast.loading('Logging in...');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        if (data.requiresVerification) {
          toast.info('Verify Your Email', {
            description: 'Please check your email for verification code.',
            duration: 5000,
          });
          setIsLoginSubmitting(false);
          return;
        }

        if (data.error && data.error.includes('google')) {
          toast.error('Google Account Detected', {
            description:
              'This account uses Google Sign-In. Please use the "Continue with Google" button.',
            duration: 6000,
          });
          setIsLoginSubmitting(false);
          return;
        }

        toast.error('Login failed', {
          description:
            data.error || 'Please check your credentials and try again.',
          duration: 5000,
        });
        setIsLoginSubmitting(false);
        return;
      }

      toast.success('Welcome back!', {
        description: `Logged in as ${
          data.user.contactPerson || data.user.email?.split('@')[0]
        }`,
        duration: 4000,
      });

      const storeSuccess = storeAuthData(data.token, data.user);
      if (!storeSuccess) {
        toast.error('Storage Error', {
          description: 'Failed to save login session. Please try again.',
        });
        setIsLoginSubmitting(false);
        return;
      }

      window.dispatchEvent(new Event('auth-change'));
      await new Promise((resolve) => setTimeout(resolve, 300));

      await mergeGuestCart(data.token);
      await mergeGuestWishlist(data.token);

      setTimeout(() => {
        const dashboardPath = getDashboardPath(data.user.role);
        window.location.href = dashboardPath;
      }, 1500);
    } catch (error) {
      console.error('Login error:', error);
      toast.dismiss(loadingToast);
      toast.error('Connection Error', {
        description: 'Unable to connect. Please try again!',
        duration: 5000,
      });
      setIsLoginSubmitting(false);
    }
  };

  // ============================================================
  // REGISTER HANDLERS
  // ============================================================
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsRegisterSubmitting(true);

    if (registerData.password !== registerData.confirmPassword) {
      toast.error('Passwords do not match!');
      setIsRegisterSubmitting(false);
      return;
    }

    if (!registerData.agreeToTerms) {
      toast.error('Please agree to the terms and conditions');
      setIsRegisterSubmitting(false);
      return;
    }

    const loadingToast = toast.loading('Creating your account...');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactPerson: registerData.contactPerson,
          email: registerData.email,
          phone: registerData.phone,
          whatsapp: registerData.whatsapp,
          country: registerData.country,
          address: registerData.address,
          city: registerData.city,
          zipCode: registerData.zipCode,
          password: registerData.password,
          role: 'customer',
        }),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        toast.error(data.error || 'Registration failed');
        setIsRegisterSubmitting(false);
        return;
      }

      toast.success('Account created!', {
        description: 'Please enter the OTP sent to your email.',
        duration: 4000,
      });

      setOtpEmail(registerData.email);
      setShowOtpModal(true);
      setOtp('');
      setIsRegisterSubmitting(false);
      startCountdown();
    } catch (error) {
      console.error('Registration error:', error);
      toast.dismiss(loadingToast);
      toast.error('Connection Error', {
        description: 'Unable to connect to server. Please try again!',
      });
      setIsRegisterSubmitting(false);
    }
  };

  // ============================================================
  // OTP HANDLERS
  // ============================================================
  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    setIsVerifying(true);
    const verifyingToast = toast.loading('Verifying OTP...');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: otpEmail,
          otp: otp,
        }),
      });

      const data = await response.json();
      toast.dismiss(verifyingToast);

      if (!response.ok) {
        toast.error(data.error || 'Invalid OTP');
        setIsVerifying(false);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success('Email verified successfully!', {
        description: "Welcome to Nishat's Collection!",
      });

      setShowOtpModal(false);

      setTimeout(() => {
        router.push('/customer/dashboard');
      }, 1500);
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.dismiss(verifyingToast);
      toast.error('Verification failed', {
        description: 'Please try again',
      });
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendDisabled) return;

    const resendToast = toast.loading('Resending OTP...');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/resend-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: otpEmail }),
      });

      const data = await response.json();
      toast.dismiss(resendToast);

      if (!response.ok) {
        toast.error(data.error || 'Failed to resend OTP');
        return;
      }

      toast.success('OTP resent!', {
        description: 'Check your email for the new code.',
      });

      startCountdown();
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.dismiss(resendToast);
      toast.error('Failed to resend OTP');
    }
  };

  const startCountdown = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setResendDisabled(true);
    setCountdown(600);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // ============================================================
  // GOOGLE HANDLERS
  // ============================================================
  const handleGoogleSuccess = async (data) => {
    console.log('✅ Google sign in success:', data);

    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.dispatchEvent(new Event('auth-change'));

      await new Promise((resolve) => setTimeout(resolve, 300));
      await mergeGuestCart(data.token);
      await mergeGuestWishlist(data.token);

      setTimeout(() => {
        const dashboardPath = getDashboardPath(data.user.role);
        window.location.href = dashboardPath;
      }, 1500);

      if (data.requiresAdditionalInfo) {
        toast.success('Google Sign In Successful!', {
          description: 'Please complete your profile to continue.',
          duration: 4000,
        });
      } else {
        toast.success('Welcome back!', {
          description: `Logged in as ${
            data.user.contactPerson || data.user.email?.split('@')[0]
          }`,
          duration: 4000,
        });
      }
    }
  };

  const handleGoogleError = (error) => {
    console.error('Google sign in error:', error);
    toast.error('Google Sign In Failed', {
      description: error || 'Unable to sign in with Google. Please try again.',
    });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-64px)] overflow-hidden relative flex items-center justify-center bg-[#f7f4ef]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/login-2.png)',
          }}
        />
        {/* Light vignette only — keeps the image visible */}

        {/* Decorative botanical elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-[5%] opacity-10 animate-float">
            <Leaf className="w-8 h-8 text-white/30" />
          </div>
          <div className="absolute bottom-20 right-[8%] opacity-8 animate-float-delayed">
            <Leaf className="w-10 h-10 text-white/25 rotate-45" />
          </div>
          <div className="absolute top-1/4 right-[3%] opacity-8 animate-float-slow">
            <Leaf className="w-6 h-6 text-white/25 -rotate-12" />
          </div>
          <div className="absolute bottom-1/4 left-[3%] opacity-6 animate-float">
            <Leaf className="w-7 h-7 text-white/20 -rotate-30" />
          </div>
        </div>

        {/* Centered Card Container */}
        <div className="relative z-10 w-full max-w-md mx-auto px-4 py-4">
          {/* ==================================================
              LOGO + WELCOME HEADER (COMPACT)
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-3"
          >
          
<Link
              href="/"
              className="inline-flex items-center justify-center "
            >
              {navbarData?.logo?.logoUrl ? (
                <img
                  src={getLogoUrl(navbarData.logo.logoUrl)}
                  alt={navbarData.logo.text || 'Logo'}
                  className="h-11 sm:h-12 w-auto max-w-[170px] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <span
                    className="text-[20px] font-light text-white tracking-[-0.02em]"
                    style={{ fontFamily: FONT_HEADING }}
                  >
                    {navbarData?.logo?.text || "Nishat's Collection"}
                  </span>
                  {navbarData?.logo?.highlightText && (
                    <span
                      className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.3em]"
                      style={{ fontFamily: FONT_BODY, color: '#FFD9DE' }}
                    >
                      {navbarData.logo.highlightText}
                    </span>
                  )}
                </div>
              )}
            </Link>
            <h1
              className="text-[22px] sm:text-[26px] font-light leading-tight tracking-[-0.02em] text-[#CC1D34] drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] -mt-2"
              style={{ fontFamily: FONT_HEADING }}
            >
              {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p
              className="mt-0.5 text-[11px] text-black/80"
              style={{ fontFamily: FONT_BODY }}
            >
              {activeTab === 'login'
                ? 'Sign in to continue your journey'
                : 'Join our community in just a minute'}
            </p>
          </motion.div>

        <motion.div
  initial={{ opacity: 0, y: 6 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.1 }}
  className="flex justify-center mb-3"
>
  <div
    className="inline-flex items-center gap-1 rounded-full p-1"
    style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e8e2d6',
      boxShadow: '0 8px 24px -8px rgba(0, 0, 0, 0.35)',
    }}
  >
    {/* ============ SIGN IN TAB ============ */}
    <button
      type="button"
      onClick={() => setActiveTab('login')}
      className={`relative px-5 py-2 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors ${
        activeTab === 'login'
          ? 'text-white'
          : 'text-[#687169] hover:text-[#29362f]'
      }`}
      style={{ fontFamily: FONT_BODY }}
    >
      {activeTab === 'login' && (
        <motion.span
          layoutId="authTabPill"
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
            boxShadow: '0 4px 12px -4px rgba(204, 29, 52, 0.5)',
          }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 32,
          }}
        />
      )}
      <span className="relative z-10">Sign In</span>
    </button>

    {/* ============ SIGN UP TAB ============ */}
    <button
      type="button"
      onClick={() => setActiveTab('register')}
      className={`relative px-5 py-2 rounded-full text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors ${
        activeTab === 'register'
          ? 'text-white'
          : 'text-[#687169] hover:text-[#29362f]'
      }`}
      style={{ fontFamily: FONT_BODY }}
    >
      {activeTab === 'register' && (
        <motion.span
          layoutId="authTabPill"
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
            boxShadow: '0 4px 12px -4px rgba(204, 29, 52, 0.5)',
          }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 32,
          }}
        />
      )}
      <span className="relative z-10">Sign Up</span>
    </button>
  </div>
</motion.div>

          {/* ==================================================
              AUTH CARD (COMPACT)
          ================================================== */}
        {/* <motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.15 }}
  className="relative bg-white rounded-2xl border-2 p-4 sm:p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]"
  style={{
    borderColor: BRAND,
    boxShadow: `0 0 0 4px rgba(204, 29, 52, 0.08), 0 20px 60px -20px rgba(0, 0, 0, 0.5)`,
  }}
> */}

<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: 0.15 }}
  className="relative bg-white rounded-2xl border border-[#e8e2d6] p-4 sm:p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]"
>
          

            <AnimatePresence mode="wait">
              {/* ==================================================
                  LOGIN FORM (COMPACT)
              ================================================== */}
              {activeTab === 'login' && (
                <motion.form
                  key="login-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleLoginSubmit}
                  className="space-y-2.5 mt-1"
                >
                  {/* Email */}
                  <div className="space-y-1">
                    <label
                      htmlFor="login-email"
                      className="block text-[9px] font-semibold tracking-wider uppercase text-[#687169]"
                      style={{ fontFamily: FONT_BODY, letterSpacing: '0.12em' }}
                    >
                      Email
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-[#687169]/60 group-focus-within:text-[#CC1D34] transition-colors" />
                      <input
                        id="login-email"
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        required
                        className="w-full pl-9 pr-3 py-2 text-[13px] bg-[#f7f4ef] border border-[#e8e2d6] rounded-lg text-[#29362f] placeholder-[#687169]/50 focus:outline-none focus:ring-2 focus:ring-[#CC1D34]/40 focus:border-[#CC1D34]/50 focus:bg-white transition-all"
                        style={{ fontFamily: FONT_BODY }}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="login-password"
                        className="block text-[9px] font-semibold tracking-wider uppercase text-[#687169]"
                        style={{
                          fontFamily: FONT_BODY,
                          letterSpacing: '0.12em',
                        }}
                      >
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="text-[9px] font-medium text-[#687169] hover:text-[#CC1D34] transition-colors"
                        style={{ fontFamily: FONT_BODY }}
                      >
                        Forgot?
                      </button>
                    </div>
                    <div className="relative group">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-[#687169]/60 group-focus-within:text-[#CC1D34] transition-colors" />
                      <input
                        id="login-password"
                        type={showLoginPassword ? 'text' : 'password'}
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                        className="w-full pl-9 pr-9 py-2 text-[13px] bg-[#f7f4ef] border border-[#e8e2d6] rounded-lg text-[#29362f] placeholder-[#687169]/50 focus:outline-none focus:ring-2 focus:ring-[#CC1D34]/40 focus:border-[#CC1D34]/50 focus:bg-white transition-all"
                        style={{ fontFamily: FONT_BODY }}
                        placeholder="Your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#687169]/60 hover:text-[#29362f] transition-colors"
                      >
                        {showLoginPassword ? (
                          <EyeOff className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

               

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoginSubmitting}
                    className="w-full py-2.5 px-4 text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-[#CC1D34]/25 hover:shadow-lg hover:shadow-[#CC1D34]/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-[13px]"
                    style={{
                      background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
                      fontFamily: FONT_BODY,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {isLoginSubmitting ? (
                      <>
                        <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </motion.button>

                  {/* Divider */}
                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#e8e2d6]" />
                    </div>
                    <div className="relative flex justify-center">
                      <span
                        className="px-2 bg-white text-[#687169]/60 text-[9px] font-medium uppercase tracking-wider"
                        style={{ fontFamily: FONT_BODY }}
                      >
                        OR
                      </span>
                    </div>
                  </div>

                  {/* Google */}
                  <GoogleLoginButton
                    mode="login"
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                  />

                  {/* Switch to register */}
                  <div className="text-center pt-1">
                    <p
                      className="text-[11px] text-[#687169]"
                      style={{ fontFamily: FONT_BODY }}
                    >
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setActiveTab('register')}
                        className="text-[#CC1D34] hover:text-[#8A2530] transition-colors font-semibold inline-flex items-center gap-1"
                      >
                        Sign Up
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    </p>
                  </div>
                </motion.form>
              )}

              {/* ==================================================
                  REGISTER FORM (COMPACT)
              ================================================== */}
              {activeTab === 'register' && (
                <motion.form
                  key="register-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleRegisterSubmit}
                  className="space-y-2.5 mt-1"
                >
                  {/* Two-column grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2.5 gap-y-2.5">
                    {/* Full Name */}
                    <FormField label="Full Name" icon={User} required>
                      <input
                        type="text"
                        name="contactPerson"
                        value={registerData.contactPerson}
                        onChange={handleRegisterChange}
                        required
                        className="w-full px-3 py-2 text-[13px] bg-[#f7f4ef] border border-[#e8e2d6] rounded-lg text-[#29362f] placeholder-[#687169]/50 focus:outline-none focus:ring-2 focus:ring-[#CC1D34]/40 focus:border-[#CC1D34]/50 focus:bg-white transition-all"
                        style={{ fontFamily: FONT_BODY }}
                        placeholder="Your name"
                      />
                    </FormField>

                    {/* Email */}
                    <FormField label="Email Address" icon={Mail} required>
                      <input
                        type="email"
                        name="email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        required
                        className="w-full px-3 py-2 text-[13px] bg-[#f7f4ef] border border-[#e8e2d6] rounded-lg text-[#29362f] placeholder-[#687169]/50 focus:outline-none focus:ring-2 focus:ring-[#CC1D34]/40 focus:border-[#CC1D34]/50 focus:bg-white transition-all"
                        style={{ fontFamily: FONT_BODY }}
                        placeholder="your@email.com"
                      />
                    </FormField>

                    {/* Phone */}
                    <FormField label="Phone Number" icon={Phone} required>
                      <input
                        type="tel"
                        name="phone"
                        value={registerData.phone}
                        onChange={handleRegisterChange}
                        required
                        className="w-full px-3 py-2 text-[13px] bg-[#f7f4ef] border border-[#e8e2d6] rounded-lg text-[#29362f] placeholder-[#687169]/50 focus:outline-none focus:ring-2 focus:ring-[#CC1D34]/40 focus:border-[#CC1D34]/50 focus:bg-white transition-all"
                        style={{ fontFamily: FONT_BODY }}
                        placeholder="01XXXXXXXXX"
                      />
                    </FormField>

                    {/* WhatsApp */}
                    <FormField label="WhatsApp" icon={Smartphone} optional>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={registerData.whatsapp}
                        onChange={handleRegisterChange}
                        className="w-full px-3 py-2 text-[13px] bg-[#f7f4ef] border border-[#e8e2d6] rounded-lg text-[#29362f] placeholder-[#687169]/50 focus:outline-none focus:ring-2 focus:ring-[#CC1D34]/40 focus:border-[#CC1D34]/50 focus:bg-white transition-all"
                        style={{ fontFamily: FONT_BODY }}
                        placeholder="+880-1XXXXXXXXX"
                      />
                    </FormField>

                    {/* Country */}
                    <FormField label="Country" icon={Globe} required>
                      <input
                        type="text"
                        name="country"
                        value={registerData.country}
                        onChange={handleRegisterChange}
                        required
                        className="w-full px-3 py-2 text-[13px] bg-[#f7f4ef] border border-[#e8e2d6] rounded-lg text-[#29362f] placeholder-[#687169]/50 focus:outline-none focus:ring-2 focus:ring-[#CC1D34]/40 focus:border-[#CC1D34]/50 focus:bg-white transition-all"
                        style={{ fontFamily: FONT_BODY }}
                        placeholder="Bangladesh"
                      />
                    </FormField>

                    {/* City */}
                    <FormField label="City" icon={Building2} required>
                      <input
                        type="text"
                        name="city"
                        value={registerData.city}
                        onChange={handleRegisterChange}
                        required
                        className="w-full px-3 py-2 text-[13px] bg-[#f7f4ef] border border-[#e8e2d6] rounded-lg text-[#29362f] placeholder-[#687169]/50 focus:outline-none focus:ring-2 focus:ring-[#CC1D34]/40 focus:border-[#CC1D34]/50 focus:bg-white transition-all"
                        style={{ fontFamily: FONT_BODY }}
                        placeholder="Dhaka"
                      />
                    </FormField>

                    {/* Address */}
                    <FormField label="Street Address" icon={Home} required>
                      <input
                        type="text"
                        name="address"
                        value={registerData.address}
                        onChange={handleRegisterChange}
                        required
                        className="w-full px-3 py-2 text-[13px] bg-[#f7f4ef] border border-[#e8e2d6] rounded-lg text-[#29362f] placeholder-[#687169]/50 focus:outline-none focus:ring-2 focus:ring-[#CC1D34]/40 focus:border-[#CC1D34]/50 focus:bg-white transition-all"
                        style={{ fontFamily: FONT_BODY }}
                        placeholder="Address"
                      />
                    </FormField>

                    {/* Zip Code */}
                    <FormField label="Zip Code" icon={MapPinned} required>
                      <input
                        type="text"
                        name="zipCode"
                        value={registerData.zipCode}
                        onChange={handleRegisterChange}
                        required
                        className="w-full px-3 py-2 text-[13px] bg-[#f7f4ef] border border-[#e8e2d6] rounded-lg text-[#29362f] placeholder-[#687169]/50 focus:outline-none focus:ring-2 focus:ring-[#CC1D34]/40 focus:border-[#CC1D34]/50 focus:bg-white transition-all"
                        style={{ fontFamily: FONT_BODY }}
                        placeholder="10001"
                      />
                    </FormField>

                    {/* Password */}
                    <FormField label="Password" icon={Lock} required>
                      <div className="relative">
                        <input
                          type={showRegisterPassword ? 'text' : 'password'}
                          name="password"
                          value={registerData.password}
                          onChange={handleRegisterChange}
                          required
                          minLength="8"
                          className="w-full px-3 py-2 pr-8 text-[13px] bg-[#f7f4ef] border border-[#e8e2d6] rounded-lg text-[#29362f] placeholder-[#687169]/50 focus:outline-none focus:ring-2 focus:ring-[#CC1D34]/40 focus:border-[#CC1D34]/50 focus:bg-white transition-all"
                          style={{ fontFamily: FONT_BODY }}
                          placeholder="Min. 8 chars"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowRegisterPassword(!showRegisterPassword)
                          }
                          className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-[#687169]/60 hover:text-[#29362f] transition-colors"
                        >
                          {showRegisterPassword ? (
                            <EyeOff className="w-3 h-3" />
                          ) : (
                            <Eye className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </FormField>

                    {/* Confirm Password */}
                    <FormField label="Confirm Password" icon={Lock} required>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={registerData.confirmPassword}
                          onChange={handleRegisterChange}
                          required
                          minLength="8"
                          className="w-full px-3 py-2 pr-8 text-[13px] bg-[#f7f4ef] border border-[#e8e2d6] rounded-lg text-[#29362f] placeholder-[#687169]/50 focus:outline-none focus:ring-2 focus:ring-[#CC1D34]/40 focus:border-[#CC1D34]/50 focus:bg-white transition-all"
                          style={{ fontFamily: FONT_BODY }}
                          placeholder="Re-enter"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-[#687169]/60 hover:text-[#29362f] transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-3 h-3" />
                          ) : (
                            <Eye className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </FormField>
                  </div>

                  {/* Terms */}
                  <div className="pt-0.5">
                    <label className="flex items-start gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={registerData.agreeToTerms}
                        onChange={handleRegisterChange}
                        className="mt-0.5 rounded border-[#e8e2d6] text-[#CC1D34] focus:ring-2 focus:ring-[#CC1D34]/40 w-3.5 h-3.5 cursor-pointer"
                      />
                      <span
                        className="text-[10px] text-[#687169] leading-snug"
                        style={{ fontFamily: FONT_BODY }}
                      >
                        I agree to the{' '}
                        <Link
                          href="/terms"
                          className="text-[#CC1D34] hover:text-[#8A2530] transition-colors font-semibold"
                        >
                          Terms
                        </Link>{' '}
                        and{' '}
                        <Link
                          href="/privacy"
                          className="text-[#CC1D34] hover:text-[#8A2530] transition-colors font-semibold"
                        >
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={
                      isRegisterSubmitting || !registerData.agreeToTerms
                    }
                    className="w-full py-2.5 px-4 text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-[#CC1D34]/25 hover:shadow-lg hover:shadow-[#CC1D34]/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-[13px]"
                    style={{
                      background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
                      fontFamily: FONT_BODY,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {isRegisterSubmitting ? (
                      <>
                        <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </motion.button>

                  {/* Divider */}
                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#e8e2d6]" />
                    </div>
                    <div className="relative flex justify-center">
                      <span
                        className="px-2 bg-white text-[#687169]/60 text-[9px] font-medium uppercase tracking-wider"
                        style={{ fontFamily: FONT_BODY }}
                      >
                        OR
                      </span>
                    </div>
                  </div>

                  {/* Google */}
                  <GoogleLoginButton
                    mode="signup"
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                  />

                  {/* Switch to login */}
                  <div className="text-center pt-1">
                    <p
                      className="text-[11px] text-[#687169]"
                      style={{ fontFamily: FONT_BODY }}
                    >
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setActiveTab('login')}
                        className="text-[#CC1D34] hover:text-[#8A2530] transition-colors font-semibold inline-flex items-center gap-1"
                      >
                        Sign In
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        {/* ==================================================
    TRUST BADGES (COMPACT) — Dark text, minimal
================================================== */}
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.4, delay: 0.3 }}
  className="flex items-center justify-center gap-3 mt-4"
>
  <div className="flex items-center gap-1">
    <Shield className="w-2.5 h-2.5" style={{ color: BRAND }} />
    <span
      className="text-[8px] tracking-[0.15em] uppercase font-semibold drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]"
      style={{ fontFamily: FONT_BODY, color: '#29362f' }}
    >
      Secure
    </span>
  </div>
  <div className="w-px h-2.5" style={{ backgroundColor: '#e8e2d6' }} />
  <div className="flex items-center gap-1">
    <Lock className="w-2.5 h-2.5" style={{ color: BRAND }} />
    <span
      className="text-[8px] tracking-[0.15em] uppercase font-semibold drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]"
      style={{ fontFamily: FONT_BODY, color: '#29362f' }}
    >
      Encrypted
    </span>
  </div>
  <div className="w-px h-2.5" style={{ backgroundColor: '#e8e2d6' }} />
  <div className="flex items-center gap-1">
    <Shield className="w-2.5 h-2.5" style={{ color: BRAND }} />
    <span
      className="text-[8px] tracking-[0.15em] uppercase font-semibold drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]"
      style={{ fontFamily: FONT_BODY, color: '#29362f' }}
    >
      Protected
    </span>
  </div>
</motion.div>

          {/* ==================================================
              ROTATING PRODUCT MESSAGES (COMPACT)
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-center mt-4"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={messageIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center justify-center gap-2 px-4">
                  <Sparkles className="w-3 h-3 text-[#C01E33] flex-shrink-0" />
                  <p
                    className="text-[10px] text-[#972330] font-light max-w-md drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
                    style={{ fontFamily: FONT_BODY }}
                  >
                    {productMessages[messageIndex].text}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-1.5 mt-2">
              {productMessages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMessageIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === messageIndex
                      ? 'w-4 h-0.5 bg-[#FFD9DE]'
                      : 'w-0.5 h-0.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Message ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ==================================================
            OTP VERIFICATION MODAL
        ================================================== */}
        <AnimatePresence>
          {showOtpModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{
                background: 'rgba(24,34,29,0.85)',
                backdropFilter: 'blur(12px)',
              }}
              onClick={() => !isVerifying && setShowOtpModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative bg-[#f7f4ef] rounded-2xl border border-[#e8e2d6] p-5 sm:p-6 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.6)] max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top accent stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
                  style={{
                    background: `linear-gradient(90deg, ${BRAND} 0%, ${BRAND_DARK} 50%, ${ACCENT_SAGE} 100%)`,
                  }}
                />

                <div className="text-center mb-4 mt-1">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2.5 shadow-inner"
                    style={{ backgroundColor: 'rgba(204,29,52,0.10)' }}
                  >
                    <Mail className="w-5 h-5" style={{ color: BRAND }} />
                  </div>
                  <h3
                    className="text-[18px] font-light text-[#29362f] mb-0.5"
                    style={{ fontFamily: FONT_HEADING }}
                  >
                    Verify Your Email
                  </h3>
                  <p
                    className="text-[11px] text-[#687169]"
                    style={{ fontFamily: FONT_BODY }}
                  >
                    Code sent to
                    <br />
                    <span className="font-semibold" style={{ color: BRAND }}>
                      {otpEmail}
                    </span>
                  </p>
                </div>

                <div className="mb-3">
                  <label
                    className="block text-[9px] font-semibold tracking-wider uppercase text-[#687169] mb-1.5 text-center"
                    style={{ fontFamily: FONT_BODY, letterSpacing: '0.12em' }}
                  >
                    Enter 6-Digit Code
                  </label>
                  <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, ''))
                    }
                    placeholder="000000"
                    className="w-full px-4 py-2.5 text-center text-xl tracking-[0.4em] bg-white border border-[#e8e2d6] rounded-lg text-[#29362f] placeholder-[#687169]/30 focus:outline-none focus:ring-2 focus:ring-[#CC1D34]/40 focus:border-[#CC1D34]/50 transition-all font-mono"
                    style={{ fontFamily: FONT_BODY }}
                    autoFocus
                    disabled={isVerifying}
                  />
                </div>

                <button
                  onClick={handleVerifyOTP}
                  disabled={isVerifying || otp.length !== 6}
                  className="w-full py-2.5 px-4 text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-[#CC1D34]/25 hover:shadow-lg hover:shadow-[#CC1D34]/40 disabled:opacity-50 text-[13px] flex items-center justify-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
                    fontFamily: FONT_BODY,
                    letterSpacing: '0.05em',
                  }}
                >
                  {isVerifying ? (
                    <>
                      <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      Verify & Continue
                    </>
                  )}
                </button>

                <div className="mt-3 text-center">
                  <button
                    onClick={handleResendOTP}
                    disabled={resendDisabled}
                    className="text-[10px] font-medium transition-colors disabled:opacity-50"
                    style={{
                      fontFamily: FONT_BODY,
                      color: resendDisabled ? '#8a938a' : BRAND,
                    }}
                  >
                    {resendDisabled
                      ? `Resend in ${formatTime(countdown)}`
                      : 'Resend OTP'}
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-[#e8e2d6]">
                  <button
                    onClick={() => {
                      if (timerRef.current) {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                      }
                      setShowOtpModal(false);
                    }}
                    disabled={isVerifying}
                    className="w-full text-[10px] text-[#8a938a] hover:text-[#687169] transition-colors"
                    style={{ fontFamily: FONT_BODY }}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ==================================================
            FORGOT PASSWORD MODAL
        ================================================== */}
        <ForgotPasswordModal
          isOpen={showForgotPassword}
          onClose={() => setShowForgotPassword(false)}
        />
      </div>

      <Footer />

      {/* Floating animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(3deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(-2deg);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}