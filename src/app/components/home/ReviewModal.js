
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   X, Star, AlertCircle, CheckCircle, 
//   Loader2, 
//   Sparkles, User, Mail, MessageSquare, 
//   Send, Award, Zap, Shield, 
//   Crown, UserCog, Headphones, Ban,
//   Flower2
// } from 'lucide-react';
// import { toast } from 'sonner';

// // ========== FONT CONSTANTS - MATCHING ABOUT PAGE ==========
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', Georgia, serif";
// const FONT_FAMILY_INTER = "'Inter', sans-serif";

// // ========== COLOR PALETTE - MATCHING ABOUT PAGE ==========
// const COLORS = {
//   // Primary sage green
//   primary: '#52665a',
//   primaryDark: '#405347',
//   primaryLight: '#71816F',
  
//   // Accent muted rose
//   accent: '#B88C8D',
//   accentLight: '#E8C8C7',
//   accentDark: '#9C7072',
  
//   // Backgrounds
//   bgCream: '#f7f4ef',
//   bgWarm: '#F8F5F0',
//   bgLight: '#faf9f5',
  
//   // Text
//   textDark: '#29362f',
//   textMedium: '#526257',
//   textLight: '#687169',
//   textMuted: '#85827B',
  
//   // Borders
//   borderLight: '#e2e3dd',
//   borderMedium: '#DED8D1',
//   borderAccent: '#bfc5bd',
// };

// export default function ReviewModal({ 
//   isOpen, 
//   onClose, 
//   productId, 
//   productName,
//   onReviewSubmitted 
// }) {
//   const [formData, setFormData] = useState({
//     reviewerName: '',
//     email: '',
//     rating: 0,
//     productId: productId || '',
//     productName: productName || '',
//     title: '',
//     comment: ''
//   });
  
//   const [uploading, setUploading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [hoveredRating, setHoveredRating] = useState(0);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
//   const closeTimeoutRef = useRef(null);

//   // Check auth status when modal opens
//   useEffect(() => {
//     if (isOpen) {
//       checkAuthStatus();
//       setFormData(prev => ({
//         ...prev,
//         productId: productId || '',
//         productName: productName || ''
//       }));
//       resetForm();
//       setShowSuccessMessage(false);
//       setSuccess('');
//     }
    
//     return () => {
//       if (closeTimeoutRef.current) {
//         clearTimeout(closeTimeoutRef.current);
//       }
//     };
//   }, [isOpen, productId, productName]);

//   const checkAuthStatus = () => {
//     const token = localStorage.getItem('token');
//     const userDataFromStorage = localStorage.getItem('user');
    
//     if (token && userDataFromStorage) {
//       try {
//         const parsedUser = JSON.parse(userDataFromStorage);
//         setIsLoggedIn(true);
//         setUserRole(parsedUser.role);
        
//         const restrictedRoles = ['super_admin', 'admin', 'moderator', 'call_center_agent'];
//         if (restrictedRoles.includes(parsedUser.role)) {
//           setError('Staff members cannot write reviews');
//           return;
//         }
        
//         const userName = parsedUser.contactPerson || 
//                         parsedUser.companyName || 
//                         (parsedUser.email ? parsedUser.email.split('@')[0] : '') || 
//                         'User';
        
//         const userEmail = parsedUser.email || '';
        
//         setFormData(prev => ({
//           ...prev,
//           reviewerName: userName,
//           email: userEmail
//         }));
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         clearUserData();
//       }
//     } else {
//       clearUserData();
//     }
//   };

//   const clearUserData = () => {
//     setIsLoggedIn(false);
//     setUserRole(null);
//     setFormData(prev => ({
//       ...prev,
//       reviewerName: '',
//       email: ''
//     }));
//   };

//   const resetForm = () => {
//     setFormData(prev => ({
//       ...prev,
//       rating: 0,
//       title: '',
//       comment: ''
//     }));
//     setError('');
//     setHoveredRating(0);
//   };

//   const handleRatingClick = (rating) => {
//     setFormData({ ...formData, rating });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setLoading(true);

//     if (!formData.reviewerName.trim()) {
//       setError('Please enter your name');
//       setLoading(false);
//       return;
//     }

//     if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       setError('Please enter a valid email address');
//       setLoading(false);
//       return;
//     }

//     if (formData.rating === 0) {
//       setError('Please select a rating');
//       setLoading(false);
//       return;
//     }

//     if (!formData.comment.trim() || formData.comment.trim().length < 10) {
//       setError('Review must be at least 10 characters long');
//       setLoading(false);
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
      
//       const requestBody = {
//         rating: formData.rating,
//         reviewerName: formData.reviewerName,
//         email: formData.email || '',
//         title: formData.title.trim() || '',
//         comment: formData.comment.trim(),
//         isAnonymous: false,
//         productId: formData.productId,
//         productName: formData.productName,
//         images: [],
//         video: null
//       };

//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           ...(token && { 'Authorization': `Bearer ${token}` })
//         },
//         body: JSON.stringify(requestBody)
//       });

//       const data = await response.json();

//       if (data.success) {
//         setShowSuccessMessage(true);
//         setSuccess('Your review has been submitted successfully!');
        
//         closeTimeoutRef.current = setTimeout(() => {
//           onReviewSubmitted?.();
//           onClose();
//           resetForm();
//           setShowSuccessMessage(false);
//           setSuccess('');
//         }, 2000);
//       } else {
//         setError(data.error || data.message || 'Failed to submit review.');
//       }
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       setError('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     if (closeTimeoutRef.current) {
//       clearTimeout(closeTimeoutRef.current);
//     }
//     resetForm();
//     onClose();
//   };

//   const restrictedRoles = ['super_admin', 'admin', 'moderator', 'call_center_agent'];
//   const isRestrictedUser = isLoggedIn && userRole && restrictedRoles.includes(userRole);

//   const getRestrictedContent = () => {
//     const roleMap = {
//       'super_admin': {
//         icon: Crown,
//         title: 'Super Admin Access',
//         description: 'Super Admins are not allowed to write product reviews.',
//       },
//       'admin': {
//         icon: Shield,
//         title: 'Admin Access',
//         description: 'Admins are not allowed to write product reviews.',
//       },
//       'moderator': {
//         icon: UserCog,
//         title: 'Moderator Access',
//         description: 'Moderators are not allowed to write product reviews.',
//       },
//       'call_center_agent': {
//         icon: Headphones,
//         title: 'Call Center Agent Access',
//         description: 'Call Center Agents are not allowed to write product reviews.',
//       }
//     };
//     return roleMap[userRole] || roleMap['admin'];
//   };

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-[10000] overflow-y-auto"
//         >
//           <div className="flex items-center justify-center min-h-screen px-4 py-8">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/70 backdrop-blur-md"
//               onClick={handleClose}
//             />

//             <motion.div
//               initial={{ opacity: 0, scale: 0.95, y: 30 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.95, y: 30 }}
//               transition={{ type: "spring", duration: 0.6, damping: 25 }}
//               className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
//             >
//               {/* Header - Sage Green Gradient Matching About Page */}
//               <div 
//                 className="sticky top-0 z-10 px-6 py-5 flex items-center justify-between rounded-t-2xl"
//                 style={{ 
//                   background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)` 
//                 }}
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
//                     {isRestrictedUser ? (
//                       <Ban className="w-5 h-5 text-white" />
//                     ) : showSuccessMessage ? (
//                       <Award className="w-5 h-5 text-white" />
//                     ) : (
//                       <Flower2 className="w-5 h-5 text-white" />
//                     )}
//                   </div>
//                   <div>
//                     <h2 
//                       className="text-xl font-light text-white tracking-tight" 
//                       style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                     >
//                       {showSuccessMessage ? 'Review Submitted!' : isRestrictedUser ? 'Access Restricted' : 'Write a Review'}
//                     </h2>
//                     <p 
//                       className="text-white/80 text-sm" 
//                       style={{ fontFamily: FONT_FAMILY_INTER }}
//                     >
//                       {showSuccessMessage 
//                         ? 'Thank you for your feedback!' 
//                         : isRestrictedUser 
//                           ? 'Staff members cannot write reviews' 
//                           : `Share your experience with ${formData.productName || 'this product'}`}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={handleClose}
//                   className="p-2 hover:bg-white/20 rounded-xl transition-all duration-300 group"
//                 >
//                   <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
//                 </button>
//               </div>

//               {/* Body */}
//               <div className="p-6" style={{ background: COLORS.bgLight }}>
//                 {showSuccessMessage ? (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="text-center py-12"
//                   >
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ type: "spring", delay: 0.2 }}
//                       className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
//                       style={{ 
//                         background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
//                         boxShadow: `0 10px 30px ${COLORS.primary}30`
//                       }}
//                     >
//                       <CheckCircle className="w-12 h-12 text-white" />
//                     </motion.div>
//                     <h3 
//                       className="text-2xl font-light mb-2" 
//                       style={{ fontFamily: FONT_FAMILY_PLAYFAIR, color: COLORS.textDark }}
//                     >
//                       Review Submitted! 🎉
//                     </h3>
//                     <p 
//                       className="mb-4 max-w-sm mx-auto" 
//                       style={{ fontFamily: FONT_FAMILY_INTER, color: COLORS.textLight }}
//                     >
//                       Thank you for sharing your experience. Your review will be published after moderation.
//                     </p>
//                     <div className="flex items-center justify-center gap-2 text-sm" style={{ color: COLORS.textMuted }}>
//                       <Loader2 className="w-4 h-4 animate-spin" style={{ color: COLORS.primary }} />
//                       <span style={{ fontFamily: FONT_FAMILY_INTER }}>Closing in a moment...</span>
//                     </div>
//                   </motion.div>
//                 ) : isRestrictedUser ? (
//                   <motion.div
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     className="text-center py-12"
//                   >
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ type: "spring", delay: 0.2 }}
//                       className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
//                       style={{ 
//                         background: `linear-gradient(135deg, ${COLORS.accent} 0%, ${COLORS.accentLight} 100%)`,
//                         boxShadow: `0 10px 30px ${COLORS.accent}30`
//                       }}
//                     >
//                       {(() => {
//                         const Icon = getRestrictedContent().icon;
//                         return <Icon className="w-12 h-12 text-white" />;
//                       })()}
//                     </motion.div>
//                     <h3 
//                       className="text-2xl font-light mb-2" 
//                       style={{ fontFamily: FONT_FAMILY_PLAYFAIR, color: COLORS.textDark }}
//                     >
//                       {getRestrictedContent().title}
//                     </h3>
//                     <div 
//                       className="rounded-xl p-4 max-w-md mx-auto mb-4 border"
//                       style={{ 
//                         background: COLORS.bgWarm,
//                         borderColor: COLORS.borderMedium
//                       }}
//                     >
//                       <p style={{ fontFamily: FONT_FAMILY_INTER, color: COLORS.textMedium }}>
//                         {getRestrictedContent().description}
//                       </p>
//                     </div>
//                     <p className="text-sm" style={{ fontFamily: FONT_FAMILY_INTER, color: COLORS.textMuted }}>
//                       This feature is available for customers only.
//                     </p>
//                     <button
//                       onClick={handleClose}
//                       className="mt-6 px-6 py-2.5 text-white font-medium rounded-xl transition-all duration-300 hover:-translate-y-0.5"
//                       style={{ 
//                         fontFamily: FONT_FAMILY_INTER,
//                         background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
//                         boxShadow: `0 10px 30px ${COLORS.primary}25`
//                       }}
//                     >
//                       Close
//                     </button>
//                   </motion.div>
//                 ) : (
//                   <form onSubmit={handleSubmit} className="space-y-5">
//                     {/* Error Message */}
//                     <AnimatePresence>
//                       {error && (
//                         <motion.div
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -10 }}
//                           className="p-4 rounded-xl flex items-center gap-3 border"
//                           style={{ 
//                             background: `linear-gradient(135deg, #fdf2f2 0%, #fce8e8 100%)`,
//                             borderColor: '#f5c6c6'
//                           }}
//                         >
//                           <div className="p-1.5 rounded-full" style={{ background: COLORS.accent }}>
//                             <AlertCircle className="w-4 h-4 text-white" />
//                           </div>
//                           <p className="text-sm flex-1" style={{ fontFamily: FONT_FAMILY_INTER, color: COLORS.accentDark }}>
//                             {error}
//                           </p>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>

//                     {/* Name and Email */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div className="relative">
//                         <label 
//                           className="block text-sm font-medium mb-1.5" 
//                           style={{ fontFamily: FONT_FAMILY_INTER, color: COLORS.textDark }}
//                         >
//                           Your Name <span style={{ color: COLORS.accent }}>*</span>
//                         </label>
//                         <div className="relative">
//                           <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: COLORS.primary }} />
//                           <input
//                             type="text"
//                             name="reviewerName"
//                             value={formData.reviewerName}
//                             onChange={handleChange}
//                             disabled={isLoggedIn}
//                             className={`w-full pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all duration-200 border-2 ${
//                               isLoggedIn 
//                                 ? 'text-gray-500' 
//                                 : ''
//                             }`}
//                             style={{ 
//                               fontFamily: FONT_FAMILY_INTER,
//                               borderColor: isLoggedIn ? COLORS.borderLight : COLORS.borderAccent,
//                               background: isLoggedIn ? COLORS.bgWarm : 'white',
//                               color: isLoggedIn ? COLORS.textMuted : COLORS.textDark
//                             }}
//                             onFocus={(e) => {
//                               e.target.style.borderColor = COLORS.primary;
//                               e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary}15`;
//                             }}
//                             onBlur={(e) => {
//                               e.target.style.borderColor = isLoggedIn ? COLORS.borderLight : COLORS.borderAccent;
//                               e.target.style.boxShadow = 'none';
//                             }}
//                             placeholder="Enter your full name"
//                             required
//                           />
//                         </div>
//                         {isLoggedIn && (
//                           <p className="text-xs mt-1 flex items-center gap-1" style={{ fontFamily: FONT_FAMILY_INTER, color: COLORS.textMuted }}>
//                             <CheckCircle className="w-3 h-3" style={{ color: COLORS.primary }} />
//                             Auto-filled from your account
//                           </p>
//                         )}
//                       </div>

//                       <div>
//                         <label 
//                           className="block text-sm font-medium mb-1.5" 
//                           style={{ fontFamily: FONT_FAMILY_INTER, color: COLORS.textDark }}
//                         >
//                           Email Address <span className="text-xs" style={{ color: COLORS.textMuted }}>(Optional)</span>
//                         </label>
//                         <div className="relative">
//                           <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: COLORS.primary }} />
//                           <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             disabled={isLoggedIn}
//                             className={`w-full pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all duration-200 border-2 ${
//                               isLoggedIn 
//                                 ? 'text-gray-500' 
//                                 : ''
//                             }`}
//                             style={{ 
//                               fontFamily: FONT_FAMILY_INTER,
//                               borderColor: isLoggedIn ? COLORS.borderLight : COLORS.borderAccent,
//                               background: isLoggedIn ? COLORS.bgWarm : 'white',
//                               color: isLoggedIn ? COLORS.textMuted : COLORS.textDark
//                             }}
//                             onFocus={(e) => {
//                               e.target.style.borderColor = COLORS.primary;
//                               e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary}15`;
//                             }}
//                             onBlur={(e) => {
//                               e.target.style.borderColor = isLoggedIn ? COLORS.borderLight : COLORS.borderAccent;
//                               e.target.style.boxShadow = 'none';
//                             }}
//                             placeholder="your@email.com"
//                           />
//                         </div>
//                         {isLoggedIn ? (
//                           <p className="text-xs mt-1 flex items-center gap-1" style={{ fontFamily: FONT_FAMILY_INTER, color: COLORS.textMuted }}>
//                             <CheckCircle className="w-3 h-3" style={{ color: COLORS.primary }} />
//                             Auto-filled from your account
//                           </p>
//                         ) : (
//                           <p className="text-xs mt-1" style={{ fontFamily: FONT_FAMILY_INTER, color: COLORS.textMuted }}>
//                             Used for review verification
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     {/* Rating Stars */}
//                     <div>
//                       <label 
//                         className="block text-sm font-medium mb-2" 
//                         style={{ fontFamily: FONT_FAMILY_INTER, color: COLORS.textDark }}
//                       >
//                         Your Rating <span style={{ color: COLORS.accent }}>*</span>
//                       </label>
//                       <div 
//                         className="flex items-center gap-1 p-3 rounded-xl border-2"
//                         style={{ 
//                           background: COLORS.bgWarm,
//                           borderColor: COLORS.borderLight
//                         }}
//                       >
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <button
//                             key={star}
//                             type="button"
//                             onClick={() => handleRatingClick(star)}
//                             onMouseEnter={() => setHoveredRating(star)}
//                             onMouseLeave={() => setHoveredRating(0)}
//                             className="focus:outline-none transition-all duration-200 hover:scale-110 p-1"
//                           >
//                             <Star
//                               className="w-9 h-9 transition-all duration-200"
//                               style={{
//                                 fill: star <= (hoveredRating || formData.rating) ? COLORS.accent : 'transparent',
//                                 color: star <= (hoveredRating || formData.rating) ? COLORS.accent : COLORS.borderAccent,
//                                 filter: star <= (hoveredRating || formData.rating) ? `drop-shadow(0 2px 4px ${COLORS.accent}40)` : 'none'
//                               }}
//                             />
//                           </button>
//                         ))}
//                         <span 
//                           className="ml-2 text-sm font-medium min-w-[60px]" 
//                           style={{ fontFamily: FONT_FAMILY_INTER, color: COLORS.textMedium }}
//                         >
//                           {formData.rating === 0 && 'Rate now'}
//                           {formData.rating === 1 && 'Poor'}
//                           {formData.rating === 2 && 'Fair'}
//                           {formData.rating === 3 && 'Good'}
//                           {formData.rating === 4 && 'Great'}
//                           {formData.rating === 5 && 'Excellent!'}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Review Title */}
//                     <div>
//                       <label 
//                         className="block text-sm font-medium mb-1.5" 
//                         style={{ fontFamily: FONT_FAMILY_INTER, color: COLORS.textDark }}
//                       >
//                         Review Title
//                       </label>
//                       <div className="relative">
//                         <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: COLORS.primary }} />
//                         <input
//                           type="text"
//                           name="title"
//                           value={formData.title}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-4 py-2.5 rounded-xl outline-none transition-all duration-200 border-2"
//                           style={{ 
//                             fontFamily: FONT_FAMILY_INTER,
//                             borderColor: COLORS.borderAccent,
//                             background: 'white',
//                             color: COLORS.textDark
//                           }}
//                           onFocus={(e) => {
//                             e.target.style.borderColor = COLORS.primary;
//                             e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary}15`;
//                           }}
//                           onBlur={(e) => {
//                             e.target.style.borderColor = COLORS.borderAccent;
//                             e.target.style.boxShadow = 'none';
//                           }}
//                           placeholder="Summarize your experience"
//                           maxLength={100}
//                         />
//                       </div>
//                       <p className="text-xs mt-1 text-right" style={{ fontFamily: FONT_FAMILY_INTER, color: COLORS.textMuted }}>
//                         {formData.title.length}/100
//                       </p>
//                     </div>

//                     {/* Your Review */}
//                     <div>
//                       <label 
//                         className="block text-sm font-medium mb-1.5" 
//                         style={{ fontFamily: FONT_FAMILY_INTER, color: COLORS.textDark }}
//                       >
//                         Your Review <span style={{ color: COLORS.accent }}>*</span>
//                       </label>
//                       <div className="relative">
//                         <textarea
//                           name="comment"
//                           value={formData.comment}
//                           onChange={handleChange}
//                           rows={4}
//                           className="w-full px-4 py-2.5 rounded-xl outline-none transition-all duration-200 resize-none border-2"
//                           style={{ 
//                             fontFamily: FONT_FAMILY_INTER,
//                             borderColor: COLORS.borderAccent,
//                             background: 'white',
//                             color: COLORS.textDark
//                           }}
//                           onFocus={(e) => {
//                             e.target.style.borderColor = COLORS.primary;
//                             e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary}15`;
//                           }}
//                           onBlur={(e) => {
//                             e.target.style.borderColor = COLORS.borderAccent;
//                             e.target.style.boxShadow = 'none';
//                           }}
//                           placeholder="Share your detailed experience with this product..."
//                           minLength={10}
//                           maxLength={500}
//                           required
//                         />
//                       </div>
//                       <div className="flex justify-between items-center mt-1">
//                         <p className="text-xs" style={{ fontFamily: FONT_FAMILY_INTER, color: COLORS.textMuted }}>
//                           Minimum 10 characters
//                         </p>
//                         <p className="text-xs" style={{ fontFamily: FONT_FAMILY_INTER, color: COLORS.textMuted }}>
//                           {formData.comment.length}/500
//                         </p>
//                       </div>
//                     </div>

//                     {/* Note */}
//                     <div 
//                       className="rounded-xl p-4 flex items-center justify-center gap-2 border-2"
//                       style={{ 
//                         background: `linear-gradient(135deg, ${COLORS.bgCream} 0%, ${COLORS.bgWarm} 100%)`,
//                         borderColor: COLORS.borderLight
//                       }}
//                     >
//                       <Sparkles className="w-4 h-4 animate-pulse" style={{ color: COLORS.accent }} />
//                       <p className="text-xs" style={{ fontFamily: FONT_FAMILY_INTER, color: COLORS.textMedium }}>
//                         Your review helps others make informed decisions!
//                       </p>
//                       <Sparkles className="w-4 h-4 animate-pulse" style={{ color: COLORS.accent }} />
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex gap-3 pt-2">
//                       <button
//                         type="button"
//                         onClick={handleClose}
//                         className="flex-1 px-4 py-2.5 font-medium rounded-xl transition-all duration-300 border-2"
//                         style={{ 
//                           fontFamily: FONT_FAMILY_INTER,
//                           borderColor: COLORS.borderAccent,
//                           color: COLORS.textMedium,
//                           background: 'transparent'
//                         }}
//                         onMouseEnter={(e) => {
//                           e.target.style.background = COLORS.bgWarm;
//                           e.target.style.borderColor = COLORS.primary;
//                         }}
//                         onMouseLeave={(e) => {
//                           e.target.style.background = 'transparent';
//                           e.target.style.borderColor = COLORS.borderAccent;
//                         }}
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={loading}
//                         className="flex-1 px-4 py-2.5 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group hover:-translate-y-0.5"
//                         style={{ 
//                           fontFamily: FONT_FAMILY_INTER,
//                           background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
//                           boxShadow: `0 10px 30px ${COLORS.primary}25`
//                         }}
//                       >
//                         {loading ? (
//                           <>
//                             <Loader2 className="w-4 h-4 animate-spin" />
//                             Submitting...
//                           </>
//                         ) : (
//                           <>
//                             <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//                             Submit Review
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </form>
//                 )}
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }



'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Star, AlertCircle, CheckCircle, 
  Loader2, 
  Sparkles, User, Mail, MessageSquare, 
  Send, Award, Zap, Shield, 
  Crown, UserCog, Headphones, Ban,
  Flower2
} from 'lucide-react';
import { toast } from 'sonner';

// ========== FONT CONSTANTS ==========
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', Georgia, serif";

// ========== COLOR PALETTE — NISHITA'S SITE ==========
const COLORS = {
  // Primary red (matches product page)
  primary: '#CF1B34',
  primaryDark: '#a81428',
  primaryLight: '#e33a52',
  
  // Neutral blacks
  ink: '#1a1a1a',
  inkSoft: '#333333',
  inkMuted: '#6b6b6b',
  inkFaint: '#9a9a9a',
  
  // Backgrounds
  bgWhite: '#ffffff',
  bgSoft: '#fafafa',
  bgTint: '#fef2f3',
  
  // Borders
  borderLight: '#ececec',
  borderMedium: '#d9d9d9',
  borderDark: '#1a1a1a',
};

export default function ReviewModal({ 
  isOpen, 
  onClose, 
  productId, 
  productName,
  onReviewSubmitted 
}) {
  const [formData, setFormData] = useState({
    reviewerName: '',
    email: '',
    rating: 0,
    productId: productId || '',
    productName: productName || '',
    title: '',
    comment: ''
  });
  
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const closeTimeoutRef = useRef(null);

  // Check auth status when modal opens
  useEffect(() => {
    if (isOpen) {
      checkAuthStatus();
      setFormData(prev => ({
        ...prev,
        productId: productId || '',
        productName: productName || ''
      }));
      resetForm();
      setShowSuccessMessage(false);
      setSuccess('');
    }
    
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [isOpen, productId, productName]);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const userDataFromStorage = localStorage.getItem('user');
    
    if (token && userDataFromStorage) {
      try {
        const parsedUser = JSON.parse(userDataFromStorage);
        setIsLoggedIn(true);
        setUserRole(parsedUser.role);
        
        const restrictedRoles = ['super_admin', 'admin', 'moderator', 'call_center_agent'];
        if (restrictedRoles.includes(parsedUser.role)) {
          setError('Staff members cannot write reviews');
          return;
        }
        
        const userName = parsedUser.contactPerson || 
                        parsedUser.companyName || 
                        (parsedUser.email ? parsedUser.email.split('@')[0] : '') || 
                        'User';
        
        const userEmail = parsedUser.email || '';
        
        setFormData(prev => ({
          ...prev,
          reviewerName: userName,
          email: userEmail
        }));
      } catch (error) {
        console.error('Error parsing user data:', error);
        clearUserData();
      }
    } else {
      clearUserData();
    }
  };

  const clearUserData = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setFormData(prev => ({
      ...prev,
      reviewerName: '',
      email: ''
    }));
  };

  const resetForm = () => {
    setFormData(prev => ({
      ...prev,
      rating: 0,
      title: '',
      comment: ''
    }));
    setError('');
    setHoveredRating(0);
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!formData.reviewerName.trim()) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (formData.rating === 0) {
      setError('Please select a rating');
      setLoading(false);
      return;
    }

    if (!formData.comment.trim() || formData.comment.trim().length < 10) {
      setError('Review must be at least 10 characters long');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      const requestBody = {
        rating: formData.rating,
        reviewerName: formData.reviewerName,
        email: formData.email || '',
        title: formData.title.trim() || '',
        comment: formData.comment.trim(),
        isAnonymous: false,
        productId: formData.productId,
        productName: formData.productName,
        images: [],
        video: null
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccessMessage(true);
        setSuccess('Your review has been submitted successfully!');
        
        closeTimeoutRef.current = setTimeout(() => {
          onReviewSubmitted?.();
          onClose();
          resetForm();
          setShowSuccessMessage(false);
          setSuccess('');
        }, 2000);
      } else {
        setError(data.error || data.message || 'Failed to submit review.');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    resetForm();
    onClose();
  };

  const restrictedRoles = ['super_admin', 'admin', 'moderator', 'call_center_agent'];
  const isRestrictedUser = isLoggedIn && userRole && restrictedRoles.includes(userRole);

  const getRestrictedContent = () => {
    const roleMap = {
      'super_admin': {
        icon: Crown,
        title: 'Super Admin Access',
        description: 'Super Admins are not allowed to write product reviews.',
      },
      'admin': {
        icon: Shield,
        title: 'Admin Access',
        description: 'Admins are not allowed to write product reviews.',
      },
      'moderator': {
        icon: UserCog,
        title: 'Moderator Access',
        description: 'Moderators are not allowed to write product reviews.',
      },
      'call_center_agent': {
        icon: Headphones,
        title: 'Call Center Agent Access',
        description: 'Call Center Agents are not allowed to write product reviews.',
      }
    };
    return roleMap[userRole] || roleMap['admin'];
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] overflow-y-auto"
        >
          <div className="flex items-center justify-center min-h-screen px-4 py-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
              onClick={handleClose}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.6, damping: 25 }}
              className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Header — Red gradient (matches product page CTA) */}
              <div
                className="sticky top-0 z-10 px-6 py-5 flex items-center justify-between rounded-t-lg"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 100%)`,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    {isRestrictedUser ? (
                      <Ban className="w-5 h-5 text-white" />
                    ) : showSuccessMessage ? (
                      <Award className="w-5 h-5 text-white" />
                    ) : (
                      <Star className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <h2
                      className="text-xl font-medium text-white tracking-tight"
                      style={{ fontFamily: FONT_FAMILY }}
                    >
                      {showSuccessMessage ? 'Review Submitted!' : isRestrictedUser ? 'Access Restricted' : 'Write a Review'}
                    </h2>
                    <p
                      className="text-white/80 text-sm"
                      style={{ fontFamily: FONT_FAMILY }}
                    >
                      {showSuccessMessage
                        ? 'Thank you for your feedback!'
                        : isRestrictedUser
                          ? 'Staff members cannot write reviews'
                          : `Share your experience with ${formData.productName || 'this product'}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-white/20 rounded-lg transition-all duration-300 group"
                >
                  <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6" style={{ background: COLORS.bgWhite }}>
                {showSuccessMessage ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-24 h-24 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 100%)`,
                        boxShadow: `0 10px 30px ${COLORS.primary}30`
                      }}
                    >
                      <CheckCircle className="w-12 h-12 text-white" />
                    </motion.div>
                    <h3
                      className="text-2xl font-medium mb-2"
                      style={{ fontFamily: FONT_FAMILY, color: COLORS.ink }}
                    >
                      Review Submitted! 🎉
                    </h3>
                    <p
                      className="mb-4 max-w-sm mx-auto"
                      style={{ fontFamily: FONT_FAMILY, color: COLORS.inkMuted }}
                    >
                      Thank you for sharing your experience. Your review will be published after moderation.
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm" style={{ color: COLORS.inkFaint }}>
                      <Loader2 className="w-4 h-4 animate-spin" style={{ color: COLORS.primary }} />
                      <span style={{ fontFamily: FONT_FAMILY }}>Closing in a moment...</span>
                    </div>
                  </motion.div>
                ) : isRestrictedUser ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-24 h-24 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.inkSoft} 0%, ${COLORS.ink} 100%)`,
                        boxShadow: `0 10px 30px ${COLORS.ink}30`
                      }}
                    >
                      {(() => {
                        const Icon = getRestrictedContent().icon;
                        return <Icon className="w-12 h-12 text-white" />;
                      })()}
                    </motion.div>
                    <h3
                      className="text-2xl font-medium mb-2"
                      style={{ fontFamily: FONT_FAMILY, color: COLORS.ink }}
                    >
                      {getRestrictedContent().title}
                    </h3>
                    <div
                      className="rounded-lg p-4 max-w-md mx-auto mb-4 border"
                      style={{
                        background: COLORS.bgSoft,
                        borderColor: COLORS.borderLight
                      }}
                    >
                      <p style={{ fontFamily: FONT_FAMILY, color: COLORS.inkSoft }}>
                        {getRestrictedContent().description}
                      </p>
                    </div>
                    <p className="text-sm" style={{ fontFamily: FONT_FAMILY, color: COLORS.inkMuted }}>
                      This feature is available for customers only.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-6 px-6 py-2.5 text-white font-medium rounded-lg transition-all duration-300 hover:opacity-90"
                      style={{
                        fontFamily: FONT_FAMILY,
                        background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 100%)`,
                        boxShadow: `0 10px 30px ${COLORS.primary}25`
                      }}
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Error Message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-4 rounded-lg flex items-center gap-3 border"
                          style={{
                            background: COLORS.bgTint,
                            borderColor: `${COLORS.primary}40`
                          }}
                        >
                          <div className="p-1.5 rounded-full" style={{ background: COLORS.primary }}>
                            <AlertCircle className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-sm flex-1" style={{ fontFamily: FONT_FAMILY, color: COLORS.primaryDark }}>
                            {error}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <label
                          className="block text-sm font-medium mb-1.5"
                          style={{ fontFamily: FONT_FAMILY, color: COLORS.ink }}
                        >
                          Your Name <span style={{ color: COLORS.primary }}>*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: COLORS.primary }} />
                          <input
                            type="text"
                            name="reviewerName"
                            value={formData.reviewerName}
                            onChange={handleChange}
                            disabled={isLoggedIn}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg outline-none transition-all duration-200 border"
                            style={{
                              fontFamily: FONT_FAMILY,
                              borderColor: isLoggedIn ? COLORS.borderLight : COLORS.borderMedium,
                              background: isLoggedIn ? COLORS.bgSoft : 'white',
                              color: isLoggedIn ? COLORS.inkMuted : COLORS.ink
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = COLORS.primary;
                              e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary}15`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = isLoggedIn ? COLORS.borderLight : COLORS.borderMedium;
                              e.target.style.boxShadow = 'none';
                            }}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        {isLoggedIn && (
                          <p className="text-xs mt-1 flex items-center gap-1" style={{ fontFamily: FONT_FAMILY, color: COLORS.inkMuted }}>
                            <CheckCircle className="w-3 h-3" style={{ color: COLORS.primary }} />
                            Auto-filled from your account
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium mb-1.5"
                          style={{ fontFamily: FONT_FAMILY, color: COLORS.ink }}
                        >
                          Email Address <span className="text-xs" style={{ color: COLORS.inkFaint }}>(Optional)</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: COLORS.primary }} />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={isLoggedIn}
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg outline-none transition-all duration-200 border"
                            style={{
                              fontFamily: FONT_FAMILY,
                              borderColor: isLoggedIn ? COLORS.borderLight : COLORS.borderMedium,
                              background: isLoggedIn ? COLORS.bgSoft : 'white',
                              color: isLoggedIn ? COLORS.inkMuted : COLORS.ink
                            }}
                            onFocus={(e) => {
                              e.target.style.borderColor = COLORS.primary;
                              e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary}15`;
                            }}
                            onBlur={(e) => {
                              e.target.style.borderColor = isLoggedIn ? COLORS.borderLight : COLORS.borderMedium;
                              e.target.style.boxShadow = 'none';
                            }}
                            placeholder="your@email.com"
                          />
                        </div>
                        {isLoggedIn ? (
                          <p className="text-xs mt-1 flex items-center gap-1" style={{ fontFamily: FONT_FAMILY, color: COLORS.inkMuted }}>
                            <CheckCircle className="w-3 h-3" style={{ color: COLORS.primary }} />
                            Auto-filled from your account
                          </p>
                        ) : (
                          <p className="text-xs mt-1" style={{ fontFamily: FONT_FAMILY, color: COLORS.inkFaint }}>
                            Used for review verification
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-2"
                        style={{ fontFamily: FONT_FAMILY, color: COLORS.ink }}
                      >
                        Your Rating <span style={{ color: COLORS.primary }}>*</span>
                      </label>
                      <div
                        className="flex items-center gap-1 p-3 rounded-lg border"
                        style={{
                          background: COLORS.bgSoft,
                          borderColor: COLORS.borderLight
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleRatingClick(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="focus:outline-none transition-all duration-200 hover:scale-110 p-1"
                          >
                            <Star
                              className="w-9 h-9 transition-all duration-200"
                              style={{
                                fill: star <= (hoveredRating || formData.rating) ? '#f5a623' : 'transparent',
                                color: star <= (hoveredRating || formData.rating) ? '#f5a623' : COLORS.borderMedium,
                                filter: star <= (hoveredRating || formData.rating) ? `drop-shadow(0 2px 4px #f5a62340)` : 'none'
                              }}
                            />
                          </button>
                        ))}
                        <span
                          className="ml-2 text-sm font-medium min-w-[60px]"
                          style={{ fontFamily: FONT_FAMILY, color: COLORS.inkSoft }}
                        >
                          {formData.rating === 0 && 'Rate now'}
                          {formData.rating === 1 && 'Poor'}
                          {formData.rating === 2 && 'Fair'}
                          {formData.rating === 3 && 'Good'}
                          {formData.rating === 4 && 'Great'}
                          {formData.rating === 5 && 'Excellent!'}
                        </span>
                      </div>
                    </div>

                    {/* Review Title */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1.5"
                        style={{ fontFamily: FONT_FAMILY, color: COLORS.ink }}
                      >
                        Review Title
                      </label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: COLORS.primary }} />
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg outline-none transition-all duration-200 border"
                          style={{
                            fontFamily: FONT_FAMILY,
                            borderColor: COLORS.borderMedium,
                            background: 'white',
                            color: COLORS.ink
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = COLORS.primary;
                            e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary}15`;
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = COLORS.borderMedium;
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="Summarize your experience"
                          maxLength={100}
                        />
                      </div>
                      <p className="text-xs mt-1 text-right" style={{ fontFamily: FONT_FAMILY, color: COLORS.inkFaint }}>
                        {formData.title.length}/100
                      </p>
                    </div>

                    {/* Your Review */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1.5"
                        style={{ fontFamily: FONT_FAMILY, color: COLORS.ink }}
                      >
                        Your Review <span style={{ color: COLORS.primary }}>*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          name="comment"
                          value={formData.comment}
                          onChange={handleChange}
                          rows={4}
                          className="w-full px-4 py-2.5 rounded-lg outline-none transition-all duration-200 resize-none border"
                          style={{
                            fontFamily: FONT_FAMILY,
                            borderColor: COLORS.borderMedium,
                            background: 'white',
                            color: COLORS.ink
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = COLORS.primary;
                            e.target.style.boxShadow = `0 0 0 3px ${COLORS.primary}15`;
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = COLORS.borderMedium;
                            e.target.style.boxShadow = 'none';
                          }}
                          placeholder="Share your detailed experience with this product..."
                          minLength={10}
                          maxLength={500}
                          required
                        />
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs" style={{ fontFamily: FONT_FAMILY, color: COLORS.inkFaint }}>
                          Minimum 10 characters
                        </p>
                        <p className="text-xs" style={{ fontFamily: FONT_FAMILY, color: COLORS.inkFaint }}>
                          {formData.comment.length}/500
                        </p>
                      </div>
                    </div>

                    {/* Note */}
                    <div
                      className="rounded-lg p-4 flex items-center justify-center gap-2 border"
                      style={{
                        background: COLORS.bgTint,
                        borderColor: `${COLORS.primary}30`
                      }}
                    >
                      <Sparkles className="w-4 h-4 animate-pulse" style={{ color: COLORS.primary }} />
                      <p className="text-xs" style={{ fontFamily: FONT_FAMILY, color: COLORS.inkSoft }}>
                        Your review helps others make informed decisions!
                      </p>
                      <Sparkles className="w-4 h-4 animate-pulse" style={{ color: COLORS.primary }} />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 px-4 py-2.5 font-medium rounded-lg transition-all duration-300 border"
                        style={{
                          fontFamily: FONT_FAMILY,
                          borderColor: COLORS.borderMedium,
                          color: COLORS.inkSoft,
                          background: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = COLORS.bgSoft;
                          e.target.style.borderColor = COLORS.ink;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                          e.target.style.borderColor = COLORS.borderMedium;
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 px-4 py-2.5 text-white font-medium rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group hover:opacity-90"
                        style={{
                          fontFamily: FONT_FAMILY,
                          background: `linear-gradient(135deg, ${COLORS.primaryDark} 0%, ${COLORS.primary} 100%)`,
                          boxShadow: `0 10px 30px ${COLORS.primary}25`
                        }}
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            Submit Review
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}