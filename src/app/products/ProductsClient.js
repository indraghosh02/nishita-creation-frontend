

// 'use client';

// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import Link from 'next/link';
// import { 
//   Search, 
//   Grid, 
//   List, 
//   SlidersHorizontal, 
//   X, 
//   Filter,
//   Loader2,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   ChevronUp,
//   Tag,
//   Users,
//   DollarSign,
//   Sparkles,
//   Eye, 
//   ShoppingCart,
//   ArrowLeft,
//   Package,
//   TrendingUp,
//   Palette,
//   Ruler,
//   FolderTree,
//   Gift,
//   Heart,
//   Truck,
//   Star,
//   Clock,
//   Zap,
//   Building2,
//   Box,
//   Scale,
//   AlertTriangle,
//   Flower2,
//   Flame,
//   ShoppingBag
// } from 'lucide-react';
// import { toast } from 'sonner';
// import CartSidebar from '../components/CartSidebar';

// // Font constants - Beauty Bucket Green Theme
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// // Loading Bar Component
// const LoadingBar = ({ isVisible }) => {
//   return (
//     <div className={`fixed top-0 left-0 w-full h-0.5 bg-[#c5d5be] z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
//       <div className="h-full bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] animate-loading-bar"></div>
//     </div>
//   );
// };

// // Helper functions
// const getUnitLabel = (unit) => {
//   const units = {
//     'pcs': 'pcs',
//     'ton': 'ton',
//     'other': 'unit'
//   };
//   return units[unit] || unit;
// };

// const formatPrice = (price) => {
//   return price?.toFixed(2) || '0.00';
// };

// const truncateText = (text, limit = 40) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// const calculateDiscountPercentage = (regularPrice, discountPrice) => {
//   if (regularPrice && discountPrice && discountPrice < regularPrice) {
//     return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
//   }
//   return 0;
// };



// // ============================================================
// //  PRODUCT GRID CARD - Green Theme
// // ============================================================
// const ProductGridCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isInCart, setIsInCart] = useState(propIsInCart || false);
//   const [imageErrors, setImageErrors] = useState({});
//   const [isCartHovered, setIsCartHovered] = useState(false);
//   const [hasUserNavigated, setHasUserNavigated] = useState(false);

//   // Safe data extraction
//   const productId = product?._id || product?.id || 'unknown';
//   const productName = product?.productName || product?.name || 'Product';
//   const regularPrice = Number(product?.regularPrice || product?.price || 0);
//   const discountPrice = Number(product?.discountPrice || 0);
//   const stockQuantity = Number(product?.stockQuantity || 0);

//   // Brand
//   const brand = product?.brand
//     ? typeof product.brand === 'string'
//       ? product.brand
//       : product.brand?.name || product.brand?.title || 'General'
//     : product?.brandName || 'General';

//   // Images
//   let productImages = [];
//   if (product?.images && Array.isArray(product.images)) {
//     productImages = product.images
//       .map((img) => {
//         if (typeof img === 'string') return img;
//         if (img?.url) return img.url;
//         return null;
//       })
//       .filter(Boolean);
//   }
//   if (productImages.length === 0 && product?.image) {
//     productImages = [typeof product.image === 'string' ? product.image : product.image?.url || ''].filter(Boolean);
//   }
//   if (productImages.length === 0) {
//     productImages = ['/placeholder-product.jpg'];
//   }

//   // Tags
//   let tagNames = [];
//   if (product?.tags && Array.isArray(product.tags)) {
//     tagNames = product.tags
//       .map((tag) => {
//         if (typeof tag === 'string') return tag;
//         if (tag?.name) return tag.name;
//         return null;
//       })
//       .filter(Boolean);
//   }
//   const primaryTag = tagNames[0] || null;

//   // Price & discount
//   const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
//   const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
//   const originalPrice = regularPrice;

//   // Stock
//   const isLowStock = product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
//   const isOutOfStock = stockQuantity <= 0;

//   // Rating
//   const rating = product?.rating ? Number(product.rating) : 4.7;
//   const reviewCount = product?.reviewStats?.totalReviews || product?.reviews?.length || 0;
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating - fullStars >= 0.5;

//   const hasMultipleImages = productImages.length > 1;
//   const hasHoverImage = productImages.length > 1;

//   // Mobile detection
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     setIsInCart(propIsInCart || false);
//   }, [propIsInCart]);

//   // Reset navigation state when hover ends
//   useEffect(() => {
//     if (!isHovered) {
//       setHasUserNavigated(false);
//       setActiveIndex(0);
//     }
//   }, [isHovered]);

//   // Image navigation
//   const nextImage = (e) => {
//     if (e) {
//       e.preventDefault();
//       e.stopPropagation();
//     }
//     if (hasMultipleImages) {
//       setActiveIndex((prev) => (prev + 1) % productImages.length);
//       setHasUserNavigated(true);
//     }
//   };

//   const prevImage = (e) => {
//     if (e) {
//       e.preventDefault();
//       e.stopPropagation();
//     }
//     if (hasMultipleImages) {
//       setActiveIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
//       setHasUserNavigated(true);
//     }
//   };

//   const goToImage = (e, index) => {
//     if (e) {
//       e.preventDefault();
//       e.stopPropagation();
//     }
//     setActiveIndex(index);
//     setHasUserNavigated(true);
//   };

//   const handleImageError = (index) => {
//     setImageErrors((prev) => ({ ...prev, [index]: true }));
//   };

//   const getCurrentImage = () => {
//     // If hovered AND user hasn't manually navigated, show the second image
//     if (isHovered && hasHoverImage && !isMobile && !hasUserNavigated) {
//       const hoverIndex = 1;
//       const image = productImages[hoverIndex] || productImages[0];
//       if (imageErrors[hoverIndex]) {
//         return productImages[0] || '/placeholder-product.jpg';
//       }
//       return image;
//     }
    
//     const image = productImages[activeIndex] || productImages[0];
//     if (imageErrors[activeIndex]) {
//       return '/placeholder-product.jpg';
//     }
//     return image;
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     setHasUserNavigated(false);
//     setActiveIndex(0);
//   };

//   // Add to cart
//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (isInCart) {
//       if (onViewInCart) onViewInCart();
//       return;
//     }

//     if (isOutOfStock) {
//       toast.error('Product is out of stock!');
//       return;
//     }

//     setCartStatusLoading(true);
//     const toastId = toast.loading('Adding to cart...');

//     try {
//       const token = localStorage.getItem('token');
//       let sessionId = localStorage.getItem('cartSessionId');

//       const headers = { 'Content-Type': 'application/json' };

//       if (!token && !sessionId) {
//         sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
//         localStorage.setItem('cartSessionId', sessionId);
//       }

//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }

//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({ productId: productId, quantity: 1 })
//       });

//       const data = await response.json();

//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//         toast.success('Added to cart!', { id: toastId });
//         setIsInCart(true);
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         toast.error(data.error || 'Failed to add to cart', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Add to cart error:', error);
//       toast.error('Network error. Please try again.', { id: toastId });
//     } finally {
//       setCartStatusLoading(false);
//     }
//   };

//   // Render stars
//   const renderStars = () => {
//     const stars = [];
//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<Star key={i} className="h-2.5 sm:h-3 w-2.5 sm:w-3 fill-current text-yellow-400" />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(
//           <div key={i} className="relative h-2.5 sm:h-3 w-2.5 sm:w-3">
//             <Star className="absolute h-2.5 sm:h-3 w-2.5 sm:w-3 text-gray-200" />
//             <div className="absolute left-0 top-0 h-2.5 sm:h-3 w-1/2 overflow-hidden">
//               <Star className="h-2.5 sm:h-3 w-2.5 sm:w-3 fill-current text-yellow-400" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(<Star key={i} className="h-2.5 sm:h-3 w-2.5 sm:w-3 text-[#8B9D83]/30" />);
//       }
//     }
//     return stars;
//   };

//   // Navigate to product page
//   const navigateToProduct = () => {
//     router.push(`/product/${product.slug || product._id}`);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.4 }}
//       className="group w-full h-full"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={handleMouseLeave}
//     >
//       <Link
//         href={`/product/${product.slug || product._id}`}
//         className="block h-full"
//       >
//         <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border bg-[#FDF7EF] p-1.5 sm:p-2 transition-all duration-300 hover:-translate-y-1.5 border-[#8B9D83]/20 shadow-[0_2px_9px_rgba(139,157,131,0.06)] hover:border-[#8B9D83] hover:shadow-[0_18px_40px_rgba(139,157,131,0.12)]">
          
//           {/* ===== IMAGE SECTION ===== */}
//           <div className="relative overflow-hidden rounded-xl bg-[#FDF7EF]">
//             <div className="relative aspect-square w-full overflow-hidden">
//               <img
//                 src={getCurrentImage()}
//                 alt={productName}
//                 className={`w-full h-full object-contain p-2 sm:p-4 transition-transform duration-500 ease-out ${
//                   isHovered ? 'scale-[1.06]' : 'scale-100'
//                 }`}
//                 onError={() => handleImageError(isHovered && hasHoverImage && !isMobile && !hasUserNavigated ? 1 : activeIndex)}
//                 loading="lazy"
//               />

//               {/* Discount Badge - Sage Green */}
//               {discountPercent > 0 && (
//                 <motion.div
//                   className="absolute left-1.5 sm:left-2 top-1.5 sm:top-2 z-10"
//                   animate={isHovered ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] } : {}}
//                   transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
//                 >
//                   <div
//                     className="relative flex h-9 sm:h-12 w-7 sm:w-10 items-start justify-center overflow-hidden bg-[#8B9D83] px-0.5 sm:px-1 pt-1 sm:pt-2 text-center text-[7px] sm:text-[9px] font-bold uppercase leading-[0.8] sm:leading-[0.9] tracking-wide text-white"
//                     style={{
//                       clipPath: 'polygon(0 0, 100% 0, 100% 100%, 85% 91%, 70% 100%, 55% 91%, 40% 100%, 25% 91%, 0 100%)',
//                       fontFamily: FONT_FAMILY
//                     }}
//                   >
//                     {isHovered && (
//                       <motion.div
//                         className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
//                         initial={{ x: '-100%' }}
//                         animate={{ x: '200%' }}
//                         transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
//                       />
//                     )}
//                     <span className="relative z-10 block leading-tight">
//                       {discountPercent}%<br />OFF
//                     </span>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Tag Badge - Black with white text, right side */}
//               {primaryTag && (
//                 <div className={`absolute z-10 flex items-center gap-0.5 sm:gap-1 rounded bg-black/80 px-1 sm:px-2 py-0.5 sm:py-1 text-[7px] sm:text-[9px] font-medium text-white backdrop-blur-sm ${
//                   isMobile ? 'right-1.5 top-1.5' : 'right-1.5 sm:right-2 top-1.5 sm:top-2'
//                 }`}>
//                   <Sparkles className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5" />
//                   <span className="truncate max-w-[25px] sm:max-w-none" style={{ fontFamily: FONT_FAMILY }}>
//                     {primaryTag}
//                   </span>
//                 </div>
//               )}

//               {/* Out of Stock Overlay */}
//               {isOutOfStock && (
//                 <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-black/60">
//                   <span className="rounded-full bg-black px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-medium text-white" style={{ fontFamily: FONT_FAMILY }}>
//                     Out of Stock
//                   </span>
//                 </div>
//               )}

//               {/* Low Stock Badge */}
//               {!isOutOfStock && isLowStock && (
//                 <div className="absolute bottom-2 left-2 z-10 flex items-center gap-0.5 sm:gap-1 rounded bg-orange-500 px-1 sm:px-2 py-0.5 sm:py-1 text-[7px] sm:text-[9px] font-medium text-white">
//                   <AlertTriangle className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5" />
//                   <span className="hidden xs:inline" style={{ fontFamily: FONT_FAMILY }}>Only {stockQuantity} left</span>
//                   <span className="xs:hidden" style={{ fontFamily: FONT_FAMILY }}>{stockQuantity} left</span>
//                 </div>
//               )}

//               {/* Desktop Hover Actions - Always visible on mobile */}
//               <div className={`absolute right-2 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-1.5 sm:gap-2 transition-all duration-300 ${
//                 isMobile 
//                   ? 'opacity-100 translate-x-0' 
//                   : isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'
//               }`}>
//                 <motion.button
//                   type="button"
//                   onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigateToProduct(); }}
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   className={`flex items-center justify-center rounded-full border border-[#8B9D83]/30 bg-white text-gray-700 shadow-md transition-all hover:bg-[#8B9D83] hover:text-white ${
//                     isMobile ? 'h-6 w-6' : 'h-8 w-8'
//                   }`}
//                   aria-label="View product"
//                 >
//                   <Eye className={isMobile ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5'} />
//                 </motion.button>

//                 <motion.button
//                   type="button"
//                   onClick={handleAddToCart}
//                   disabled={isOutOfStock || cartStatusLoading}
//                   whileHover={!isOutOfStock ? { scale: 1.1 } : {}}
//                   whileTap={!isOutOfStock ? { scale: 0.9 } : {}}
//                   className={`flex items-center justify-center rounded-full border shadow-md transition-all ${
//                     isInCart
//                       ? 'border-[#8B9D83] bg-[#8B9D83] text-white'
//                       : isOutOfStock
//                       ? 'border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed'
//                       : 'border-[#8B9D83]/30 bg-white text-gray-700 hover:bg-[#8B9D83] hover:text-white'
//                   } ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`}
//                   aria-label={isInCart ? 'In Cart' : 'Add to cart'}
//                 >
//                   {cartStatusLoading ? (
//                     <Loader2 className={isMobile ? 'h-2.5 w-2.5 animate-spin' : 'h-3.5 w-3.5 animate-spin'} />
//                   ) : (
//                     <ShoppingBag className={isMobile ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5'} />
//                   )}
//                 </motion.button>
//               </div>

//               {/* Image Navigation - Arrows & Dots */}
//               {hasMultipleImages && (
//                 <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1 sm:gap-2">
//                   <motion.button
//                     type="button"
//                     onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
//                     onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevImage(e); }}
//                     className="rounded-full p-0.5"
//                     aria-label="Previous image"
//                     whileHover={{ scale: 1.2 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-[#8B9D83] drop-shadow-md" />
//                   </motion.button>

//                   <div className="flex items-center gap-0.5 sm:gap-1.5">
//                     {productImages.map((_, index) => (
//                       <motion.button
//                         key={index}
//                         type="button"
//                         onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
//                         onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToImage(e, index); }}
//                         className={`rounded-full transition-all duration-200 ${
//                           activeIndex === index
//                             ? 'h-1.5 w-1.5 sm:h-2 sm:w-2 bg-[#8B9D83]'
//                             : 'h-1 w-1 sm:h-1.5 sm:w-1.5 bg-[#8B9D83]/40 hover:bg-[#8B9D83]/70'
//                         }`}
//                         whileHover={{ scale: 1.3 }}
//                         aria-label={`Go to image ${index + 1}`}
//                       />
//                     ))}
//                   </div>

//                   <motion.button
//                     type="button"
//                     onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
//                     onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextImage(e); }}
//                     className="rounded-full p-0.5"
//                     aria-label="Next image"
//                     whileHover={{ scale: 1.2 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-[#8B9D83] drop-shadow-md" />
//                   </motion.button>
//                 </div>
//               )}

//               {/* Hover Image Hint */}
//               {hasHoverImage && !isMobile && !isHovered && (
//                 <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   <span className="text-[8px] text-white/70 bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
//                     Hover to view
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* ===== PRODUCT INFO ===== */}
//           <div className="flex flex-1 flex-col px-1 sm:px-1.5 pb-1 pt-1.5 sm:pt-3">
//             {/* Brand + Stock Status */}
//             <div className="mb-0.5 sm:mb-1 flex items-center justify-between gap-2">
//               <span className="min-w-0 truncate text-[7px] sm:text-[8px] font-semibold uppercase tracking-[0.12em] text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY }}>
//                 {brand}
//               </span>
//               <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
//                 <span className={`h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full ${stockQuantity > 0 ? 'bg-emerald-500' : 'bg-red-500'}`} />
//                 <span className={`text-[6px] sm:text-[8px] font-medium ${stockQuantity > 0 ? 'text-emerald-600' : 'text-red-500'}`} style={{ fontFamily: FONT_FAMILY }}>
//                   {stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
//                 </span>
//               </div>
//             </div>

//             {/* Product Name */}
//             <h3
//               className="min-h-[26px] sm:min-h-[34px] line-clamp-2 text-[11px] sm:text-[13px] font-semibold leading-[1.2] sm:leading-[1.3] text-[#263b32] transition-colors group-hover:text-[#8B9D83]"
//               style={{ fontFamily: FONT_FAMILY }}
//               title={productName}
//             >
//               {truncateText(productName, 50)}
//             </h3>

//             {/* Rating */}
//             <div className="mt-1 flex items-center gap-0.5 sm:gap-1.5">
//               <div className="flex items-center gap-0.5">{renderStars()}</div>
//               <span className="text-[8px] sm:text-[9px] font-medium text-gray-500" style={{ fontFamily: FONT_FAMILY }}>
//                 {rating.toFixed(1)}
//               </span>
//               {reviewCount > 0 && (
//                 <>
//                   <span className="text-gray-300 hidden xs:inline">•</span>
//                   <span className="text-[7px] sm:text-[9px] text-gray-400 hidden xs:inline" style={{ fontFamily: FONT_FAMILY }}>
//                     {reviewCount} reviews
//                   </span>
//                 </>
//               )}
//             </div>

//             {/* Divider */}
//             <div className="my-1.5 sm:my-2.5 h-px bg-gradient-to-r from-[#8B9D83]/30 to-transparent" />

//             {/* Price + Cart */}
//             <div className="mt-auto flex items-center justify-between gap-2 pt-0.5 sm:pt-1">
//               <div className="flex min-w-0 flex-col whitespace-nowrap">
//                 <span className="text-[13px] sm:text-[15px] font-bold tracking-tight text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY }}>
//                   ৳{formatPrice(currentPrice)}
//                 </span>
//                 {discountPercent > 0 && (
//                   <span className="text-[6px] sm:text-[8px] text-gray-400 line-through" style={{ fontFamily: FONT_FAMILY }}>
//                     ৳{formatPrice(originalPrice)}
//                   </span>
//                 )}
//               </div>

//               <motion.button
//                 type="button"
//                 onClick={handleAddToCart}
//                 disabled={isOutOfStock || cartStatusLoading}
//                 onMouseEnter={() => setIsCartHovered(true)}
//                 onMouseLeave={() => setIsCartHovered(false)}
//                 whileHover={!isOutOfStock ? { scale: 1.08 } : {}}
//                 whileTap={!isOutOfStock ? { scale: 0.92 } : {}}
//                 animate={isCartHovered && !isOutOfStock ? { rotate: [0, -10, 10, -6, 6, 0] } : {}}
//                 transition={{ duration: 0.5 }}
//                 aria-label={isInCart ? 'View cart' : 'Add to cart'}
//                 className={`flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
//                   isInCart
//                     ? 'bg-[#8B9D83] text-white shadow-[0_4px_12px_rgba(139,157,131,0.22)]'
//                     : isOutOfStock
//                     ? 'cursor-not-allowed bg-gray-100 text-gray-300'
//                     : 'border border-[#8B9D83]/30 bg-white text-[#8B9D83] hover:border-[#8B9D83] hover:bg-[#8B9D83] hover:text-white hover:shadow-[0_4px_12px_rgba(139,157,131,0.18)]'
//                 }`}
//               >
//                 {cartStatusLoading ? (
//                   <Loader2 className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 animate-spin" />
//                 ) : (
//                   <ShoppingBag className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5" />
//                 )}
//               </motion.button>
//             </div>
//           </div>
//         </article>
//       </Link>
//     </motion.div>
//   );
// };

// // ============================================================
// //  PRODUCT LIST CARD - Green Theme
// // ============================================================
// const ProductListCard = ({ product, router, isInCart: propIsInCart, onViewInCart }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isInCart, setIsInCart] = useState(propIsInCart || false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [imageErrors, setImageErrors] = useState({});
//   const [isCartHovered, setIsCartHovered] = useState(false);

//   // Safe data extraction
//   const productId = product?._id || product?.id || 'unknown';
//   const productName = product?.productName || product?.name || 'Product';
//   const regularPrice = Number(product?.regularPrice || product?.price || 0);
//   const discountPrice = Number(product?.discountPrice || 0);
//   const stockQuantity = Number(product?.stockQuantity || 0);

//   // Brand
//   const brand = product?.brand
//     ? typeof product.brand === 'string'
//       ? product.brand
//       : product.brand?.name || product.brand?.title || 'General'
//     : product?.brandName || 'General';

//   // Category name
//   const categoryName = product?.category?.name || product?.categoryName || '';

//   // Images
//   let productImages = [];
//   if (product?.images && Array.isArray(product.images)) {
//     productImages = product.images
//       .map((img) => {
//         if (typeof img === 'string') return img;
//         if (img?.url) return img.url;
//         return null;
//       })
//       .filter(Boolean);
//   }
//   if (productImages.length === 0 && product?.image) {
//     productImages = [typeof product.image === 'string' ? product.image : product.image?.url || ''].filter(Boolean);
//   }
//   if (productImages.length === 0) {
//     productImages = ['/placeholder-product.jpg'];
//   }

//   // Tags
//   let tagNames = [];
//   if (product?.tags && Array.isArray(product.tags)) {
//     tagNames = product.tags
//       .map((tag) => {
//         if (typeof tag === 'string') return tag;
//         if (tag?.name) return tag.name;
//         return null;
//       })
//       .filter(Boolean);
//   }
//   const primaryTag = tagNames[0] || null;

//   // Price & discount
//   const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
//   const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
//   const originalPrice = regularPrice;

//   // Stock
//   const isLowStock = product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
//   const isOutOfStock = stockQuantity <= 0;

//   // Rating
//   const rating = product?.rating ? Number(product.rating) : 4.7;
//   const reviewCount = product?.reviewStats?.totalReviews || product?.reviews?.length || 0;
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating - fullStars >= 0.5;

//   const hasMultipleImages = productImages.length > 1;

//   // Mobile detection
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     setIsInCart(propIsInCart || false);
//   }, [propIsInCart]);

//   // Image navigation
//   const nextImage = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (hasMultipleImages) {
//       setActiveIndex((prev) => (prev + 1) % productImages.length);
//     }
//   };

//   const prevImage = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (hasMultipleImages) {
//       setActiveIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
//     }
//   };

//   const goToImage = (e, index) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setActiveIndex(index);
//   };

//   const handleImageError = (index) => {
//     setImageErrors((prev) => ({ ...prev, [index]: true }));
//   };

//   const getCurrentImage = () => {
//     const image = productImages[activeIndex] || productImages[0];
//     if (imageErrors[activeIndex]) {
//       return '/placeholder-product.jpg';
//     }
//     return image;
//   };

//   // Add to cart
//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (isInCart) {
//       if (onViewInCart) onViewInCart();
//       return;
//     }

//     if (isOutOfStock) {
//       toast.error('Product is out of stock!');
//       return;
//     }

//     setCartStatusLoading(true);
//     const toastId = toast.loading('Adding to cart...');

//     try {
//       const token = localStorage.getItem('token');
//       let sessionId = localStorage.getItem('cartSessionId');

//       const headers = { 'Content-Type': 'application/json' };

//       if (!token && !sessionId) {
//         sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
//         localStorage.setItem('cartSessionId', sessionId);
//       }

//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }

//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({ productId: productId, quantity: 1 })
//       });

//       const data = await response.json();

//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//         toast.success('Added to cart!', { id: toastId });
//         setIsInCart(true);
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         toast.error(data.error || 'Failed to add to cart', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Add to cart error:', error);
//       toast.error('Network error. Please try again.', { id: toastId });
//     } finally {
//       setCartStatusLoading(false);
//     }
//   };

//   // Render stars
//   const renderStars = () => {
//     const stars = [];
//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(<Star key={i} className="h-2.5 w-2.5 fill-current text-yellow-400" />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(
//           <div key={i} className="relative h-2.5 w-2.5">
//             <Star className="absolute h-2.5 w-2.5 text-gray-200" />
//             <div className="absolute left-0 top-0 h-2.5 w-1/2 overflow-hidden">
//               <Star className="h-2.5 w-2.5 fill-current text-yellow-400" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(<Star key={i} className="h-2.5 w-2.5 text-[#8B9D83]/30" />);
//       }
//     }
//     return stars;
//   };

//   // Navigate to product page
//   const navigateToProduct = () => {
//     router.push(`/product/${product.slug || product._id}`);
//   };

//   // Get description
//   const getDescription = () => {
//     const fullDesc = product.fullDescription?.replace(/<[^>]*>/g, '') || '';
//     const shortDesc = product.shortDescription?.replace(/<[^>]*>/g, '') || '';
//     const desc = fullDesc || shortDesc || 'No description available';
//     return desc.length > 120 ? desc.substring(0, 120) + '...' : desc;
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.4 }}
//       className="group w-full"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Link
//         href={`/product/${product.slug || product._id}`}
//         className="block h-full"
//       >
//         <article className="relative flex flex-col sm:flex-row overflow-hidden rounded-xl border border-[#c5d5be]/30 bg-white p-2 sm:p-3 shadow-[0_2px_9px_rgba(139,157,131,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#8B9D83]/50 hover:shadow-[0_18px_40px_rgba(139,157,131,0.12)]">
          
//           {/* IMAGE SECTION */}
//           <div className="sm:w-32 md:w-40 lg:w-44 relative flex-shrink-0">
//             <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-[#c5d5be]/10 to-[#8B9D83]/5">
//               <div className="relative aspect-square w-full overflow-hidden">
//                 <img
//                   src={getCurrentImage()}
//                   alt={productName}
//                   className="w-full h-full object-contain p-2 sm:p-3 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
//                   onError={() => handleImageError(activeIndex)}
//                   loading="lazy"
//                 />

//                 {discountPercent > 0 && (
//                   <motion.div
//                     className="absolute left-1.5 top-1.5 z-10"
//                     animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
//                     transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
//                   >
//                     <div
//                       className="relative flex h-9 w-8 items-start justify-center overflow-hidden bg-[#8B9D83] px-0.5 pt-1.5 text-center text-[7px] font-bold uppercase leading-[0.8] tracking-wide text-white"
//                       style={{
//                         clipPath: 'polygon(0 0, 100% 0, 100% 100%, 85% 91%, 70% 100%, 55% 91%, 40% 100%, 25% 91%, 0 100%)',
//                         fontFamily: FONT_FAMILY
//                       }}
//                     >
//                       {isHovered && (
//                         <motion.div
//                           className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
//                           initial={{ x: '-100%' }}
//                           animate={{ x: '200%' }}
//                           transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
//                         />
//                       )}
//                       <span className="relative z-10 block leading-tight">
//                         {discountPercent}%<br />OFF
//                       </span>
//                     </div>
//                   </motion.div>
//                 )}

//                 {primaryTag && (
//                   <div className="absolute right-1.5 top-1.5 z-10 flex items-center gap-0.5 rounded bg-black/80 px-1.5 py-0.5 text-[7px] font-medium text-white backdrop-blur-sm">
//                     <Sparkles className="h-2 w-2" />
//                     <span style={{ fontFamily: FONT_FAMILY }}>{primaryTag}</span>
//                   </div>
//                 )}

//                 {isOutOfStock && (
//                   <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-black/60">
//                     <span className="rounded-full bg-black px-2 py-1 text-[9px] font-medium text-white" style={{ fontFamily: FONT_FAMILY }}>
//                       Out of Stock
//                     </span>
//                   </div>
//                 )}

//                 {!isOutOfStock && isLowStock && (
//                   <div className="absolute bottom-1.5 left-1.5 z-10 flex items-center gap-0.5 rounded bg-orange-500 px-1.5 py-0.5 text-[7px] font-medium text-white">
//                     <AlertTriangle className="h-2 w-2" />
//                     <span style={{ fontFamily: FONT_FAMILY }}>Only {stockQuantity} left</span>
//                   </div>
//                 )}

//                 {!isMobile && (
//                   <div className={`absolute right-1.5 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-1.5 transition-all duration-300 ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-2 opacity-0'}`}>
//                     <motion.button
//                       type="button"
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={(e) => { e.preventDefault(); e.stopPropagation(); navigateToProduct(); }}
//                       className="flex h-6 w-6 items-center justify-center rounded-full border border-[#c5d5be]/30 bg-white text-gray-700 shadow-md transition-all hover:bg-[#8B9D83] hover:text-white"
//                       aria-label="View product"
//                     >
//                       <Eye className="h-3 w-3" />
//                     </motion.button>
//                     <motion.button
//                       type="button"
//                       onClick={handleAddToCart}
//                       disabled={isOutOfStock || cartStatusLoading}
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       className={`flex h-6 w-6 items-center justify-center rounded-full border border-[#c5d5be]/30 bg-white shadow-md transition-all hover:bg-[#8B9D83] hover:text-white ${cartStatusLoading ? 'pointer-events-none opacity-50' : ''}`}
//                       aria-label="Add to cart"
//                     >
//                       {cartStatusLoading ? (
//                         <Loader2 className="h-3 w-3 animate-spin" />
//                       ) : isInCart ? (
//                         <ShoppingBag className="h-3 w-3 text-green-500" />
//                       ) : (
//                         <ShoppingBag className="h-3 w-3" />
//                       )}
//                     </motion.button>
//                   </div>
//                 )}

//                 {hasMultipleImages && (
//                   <div className="absolute bottom-1.5 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1">
//                     <motion.button
//                       type="button"
//                       onClick={prevImage}
//                       className="rounded-full p-0.5"
//                       aria-label="Previous image"
//                       whileHover={{ scale: 1.2 }}
//                       whileTap={{ scale: 0.9 }}
//                     >
//                       <ChevronLeft className="h-2.5 w-2.5 text-[#8B9D83]" />
//                     </motion.button>
//                     <div className="flex items-center gap-0.5">
//                       {productImages.map((_, index) => (
//                         <motion.button
//                           key={index}
//                           type="button"
//                           onClick={(e) => goToImage(e, index)}
//                           className={`rounded-full transition-all duration-200 ${activeIndex === index ? 'h-1.5 w-1.5 bg-[#8B9D83]' : 'h-1 w-1 bg-[#c5d5be]/60 hover:bg-[#8B9D83]/50'}`}
//                           whileHover={{ scale: 1.3 }}
//                           aria-label={`Go to image ${index + 1}`}
//                         />
//                       ))}
//                     </div>
//                     <motion.button
//                       type="button"
//                       onClick={nextImage}
//                       className="rounded-full p-0.5"
//                       aria-label="Next image"
//                       whileHover={{ scale: 1.2 }}
//                       whileTap={{ scale: 0.9 }}
//                     >
//                       <ChevronRight className="h-2.5 w-2.5 text-[#8B9D83]" />
//                     </motion.button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* PRODUCT INFO */}
//           <div className="flex-1 flex flex-col p-2 sm:p-3">
//             <div className="flex items-center gap-1.5 mb-1">
//               <div className="flex items-center gap-1">
//                 <Building2 className="w-2.5 h-2.5 text-[#8B9D83]" />
//                 <span className="text-[9px] sm:text-[10px] font-medium text-[#8B9D83] tracking-wide" style={{ fontFamily: FONT_FAMILY }}>
//                   {brand}
//                 </span>
//               </div>
//               <span className="w-0.5 h-0.5 rounded-full bg-[#c5d5be]"></span>
//               {categoryName && (
//                 <div className="flex items-center gap-1">
//                   <FolderTree className="w-2.5 h-2.5 text-[#53645a]" />
//                   <span className="text-[9px] sm:text-[10px] font-medium text-[#53645a] tracking-wide" style={{ fontFamily: FONT_FAMILY }}>
//                     {categoryName}
//                   </span>
//                 </div>
//               )}
//             </div>

//             <h3
//               className="text-xs sm:text-sm md:text-base font-semibold text-[#263b32] mb-0.5 line-clamp-1 transition-colors group-hover:text-[#8B9D83]"
//               style={{ fontFamily: FONT_FAMILY }}
//               title={productName}
//             >
//               {productName}
//             </h3>

//             <p className="text-[10px] sm:text-xs text-[#53645a] mb-1.5 line-clamp-2 leading-relaxed tracking-wide" style={{ fontFamily: FONT_FAMILY }}>
//               {getDescription()}
//             </p>

//             <div className="flex items-center gap-1 mb-1.5">
//               <div className="flex items-center gap-0.5">{renderStars()}</div>
//               <span className="text-[8px] font-medium text-gray-500" style={{ fontFamily: FONT_FAMILY }}>
//                 {rating.toFixed(1)}
//               </span>
//               {reviewCount > 0 && (
//                 <>
//                   <span className="text-gray-300">•</span>
//                   <span className="text-[8px] text-gray-400" style={{ fontFamily: FONT_FAMILY }}>
//                     {reviewCount} reviews
//                   </span>
//                 </>
//               )}
//             </div>

//             <div className="my-1 h-px bg-gradient-to-r from-[#c5d5be]/30 to-transparent" />

//             <div className="mt-auto flex items-center justify-between gap-2 pt-0.5 flex-wrap">
//               <div className="flex min-w-0 items-center gap-1 whitespace-nowrap flex-wrap">
//                 <span className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY }}>
//                   ৳{formatPrice(currentPrice)}
//                 </span>
//                 {discountPercent > 0 && (
//                   <span className="text-[8px] sm:text-[9px] text-gray-400 line-through" style={{ fontFamily: FONT_FAMILY }}>
//                     ৳{formatPrice(originalPrice)}
//                   </span>
//                 )}
//                 {discountPercent > 0 && (
//                   <span className="text-[7px] sm:text-[8px] font-medium text-white bg-[#8B9D83] px-1.5 py-0.5 rounded" style={{ fontFamily: FONT_FAMILY }}>
//                     -{discountPercent}%
//                   </span>
//                 )}
//                 <span className="text-[8px] sm:text-[9px] text-gray-500" style={{ fontFamily: FONT_FAMILY }}>
//                   /{getUnitLabel(product.unit)}
//                 </span>
//               </div>

//               <motion.button
//                 type="button"
//                 onClick={handleAddToCart}
//                 disabled={isOutOfStock || cartStatusLoading}
//                 whileHover={!isOutOfStock ? { scale: 1.05 } : {}}
//                 whileTap={!isOutOfStock ? { scale: 0.95 } : {}}
//                 aria-label={isInCart ? 'View cart' : 'Add to cart'}
//                 className={`flex h-7 sm:h-8 px-3 sm:px-4 items-center justify-center gap-1 rounded-lg text-[9px] sm:text-[10px] md:text-xs font-medium transition-all duration-200 ${
//                   isInCart
//                     ? 'bg-[#465641] text-white shadow-[0_4px_12px_rgba(70,86,65,0.22)] hover:shadow-[0_6px_20px_rgba(70,86,65,0.3)]'
//                     : isOutOfStock
//                     ? 'cursor-not-allowed bg-gray-100 text-gray-400'
//                     : 'bg-[#8B9D83] text-white hover:shadow-lg hover:shadow-[#8B9D83]/25'
//                 }`}
//               >
//                 {cartStatusLoading ? (
//                   <Loader2 className="h-3 w-3 animate-spin" />
//                 ) : isInCart ? (
//                   <>
//                     <ShoppingBag className="h-3 w-3" />
//                     <span className="hidden sm:inline">View in Bag</span>
//                   </>
//                 ) : (
//                   <>
//                     <ShoppingBag className="h-3 w-3" />
//                     <span className="hidden sm:inline">Add to Bag</span>
//                   </>
//                 )}
//               </motion.button>
//             </div>
//           </div>
//         </article>
//       </Link>
//     </motion.div>
//   );
// };

// const FilterSidebar = ({ 
//   isOpen,
//   onClose,
//   expandedSections, 
//   toggleSection, 
//   categories, 
//   subcategories,
//   childSubcategories,
//   brands,
//   filters, 
//   handleCategoryChange, 
//   handleRemoveCategory,
//   handleSubcategoryChange,
//   handleRemoveSubcategory,
//   handleChildSubcategoryChange,
//   handleRemoveChildSubcategory,
//   handleBrandChange,
//   handleRemoveBrand,
//   handleUnitChange,
//   handleRemoveUnit,
//   minPriceInput,
//   maxPriceInput,
//   setMinPriceInput,
//   setMaxPriceInput,
//   applyPriceRange,
//   clearPriceRange,
//   getActiveFilterCount,
//   clearFilters,
//   selectedCategory,
//   selectedSubcategory,
//   showChildSubcategory,
//   availableUnits,      
//   unitsLoading   
// }) => {
//   return (
//     <>
//       {/* Overlay */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 z-50 bg-black/50"
//             onClick={onClose}
//           />
//         )}
//       </AnimatePresence>

//       {/* Sidebar - Reduced Width */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ x: '-100%' }}
//             animate={{ x: 0 }}
//             exit={{ x: '-100%' }}
//             transition={{ type: 'tween', duration: 0.3 }}
//             className="fixed left-0 top-0 z-50 h-full w-72 md:w-80 bg-white overflow-y-auto shadow-2xl"
//           >
//             {/* Header */}
//             <div className="sticky top-0 bg-white z-10 p-3 border-b border-[#c5d5be]/30 flex items-center justify-between">
//               <h3 className="text-sm font-semibold text-[#465641] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                 <Filter className="w-4 h-4 text-[#8B9D83]" />
//                 Filters
//               </h3>
//               <div className="flex items-center gap-2">
//                 {getActiveFilterCount() > 0 && (
//                   <button onClick={clearFilters} className="text-[10px] text-[#8B9D83] hover:text-[#465641] transition-colors font-medium">
//                     Clear All ({getActiveFilterCount()})
//                   </button>
//                 )}
//                 <button onClick={onClose} className="p-1 hover:bg-[#e8eee4] rounded-full transition-colors">
//                   <X className="w-4 h-4 text-[#465641]" />
//                 </button>
//               </div>
//             </div>

//             {/* Content - Reduced padding */}
//             <div className="p-3">
//               {/* Price Range */}
//               <div className="mb-3 border-b border-[#c5d5be]/20 pb-3">
//                 <button onClick={() => toggleSection('price')} className="flex items-center justify-between w-full text-left mb-2 hover:bg-[#f0f5ed] px-2 py-1 rounded-lg transition-colors">
//                   <h4 className="font-semibold text-xs text-[#465641] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                     <DollarSign className="w-3.5 h-3.5 text-[#8B9D83]" />
//                     Price Range
//                   </h4>
//                   {expandedSections.price ? <ChevronUp className="w-3.5 h-3.5 text-[#465641]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#465641]" />}
//                 </button>
                
//                 {expandedSections.price && (
//                   <div className="space-y-2">
//                     <div className="space-y-1.5">
//                       <div className="flex justify-between items-center">
//                         <span className="text-[11px] font-medium text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>Min (৳)</span>
//                         <input
//                           type="text"
//                           inputMode="decimal"
//                           value={minPriceInput}
//                           onChange={(e) => {
//                             const value = e.target.value;
//                             if (value === '' || /^\d*\.?\d*$/.test(value)) setMinPriceInput(value);
//                           }}
//                           placeholder="0"
//                           className="w-20 px-2 py-1 text-right text-[11px] text-[#465641] font-medium border border-[#c5d5be]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-white hover:border-[#8B9D83]/60 transition-colors"
//                         />
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-[11px] font-medium text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>Max (৳)</span>
//                         <input
//                           type="text"
//                           inputMode="decimal"
//                           value={maxPriceInput}
//                           onChange={(e) => {
//                             const value = e.target.value;
//                             if (value === '' || /^\d*\.?\d*$/.test(value)) setMaxPriceInput(value);
//                           }}
//                           placeholder="Any"
//                           className="w-20 px-2 py-1 text-right text-[11px] text-[#465641] font-medium border border-[#c5d5be]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent bg-white hover:border-[#8B9D83]/60 transition-colors"
//                         />
//                       </div>
//                     </div>
                    
//                     <button
//                       onClick={applyPriceRange}
//                       disabled={!minPriceInput && !maxPriceInput}
//                       className="w-full py-1.5 bg-[#8B9D83] text-white text-[11px] font-medium rounded-lg hover:bg-[#465641] hover:shadow-lg hover:shadow-[#465641]/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       Apply Price Range
//                     </button>

//                     {(filters.priceRange.min || filters.priceRange.max) && (
//                       <div className="flex items-center justify-between bg-[#f0f5ed] p-1.5 rounded-lg border border-[#c5d5be]/30">
//                         <span className="text-[11px] font-medium text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>৳{filters.priceRange.min || '0'} - ৳{filters.priceRange.max || '∞'}</span>
//                         <button onClick={clearPriceRange} className="text-gray-500 hover:text-[#465641] transition-colors"><X className="w-2.5 h-2.5" /></button>
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Categories */}
//               <div className="mb-3 border-b border-[#c5d5be]/20 pb-3">
//                 <button onClick={() => toggleSection('categories')} className="flex items-center justify-between w-full text-left mb-2 hover:bg-[#f0f5ed] px-2 py-1 rounded-lg transition-colors">
//                   <h4 className="font-semibold text-xs text-[#465641] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                     <Tag className="w-3.5 h-3.5 text-[#8B9D83]" />
//                     Categories
//                   </h4>
//                   {expandedSections.categories ? <ChevronUp className="w-3.5 h-3.5 text-[#465641]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#465641]" />}
//                 </button>
                
//                 {expandedSections.categories && (
//                   <div className="space-y-1.5">
//                     {filters.categories.length > 0 && (
//                       <div className="mb-1.5 p-1.5 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/30">
//                         <p className="text-[10px] font-medium text-[#465641] mb-1" style={{ fontFamily: FONT_FAMILY }}>Selected Categories:</p>
//                         {filters.categories.map(catId => {
//                           const category = categories.find(c => c._id === catId);
//                           return category ? (
//                             <div key={catId} className="flex items-center justify-between py-0.5">
//                               <span className="text-[11px] font-medium text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>{category.name}</span>
//                               <button onClick={() => handleRemoveCategory(catId)} className="text-gray-400 hover:text-[#465641] transition-colors"><X className="w-2.5 h-2.5" /></button>
//                             </div>
//                           ) : null;
//                         })}
//                       </div>
//                     )}
                    
//                     <div className="max-h-40 overflow-y-auto pr-1 space-y-1">
//                       {categories.map(category => (
//                         <label key={category._id} className="flex items-center gap-2 cursor-pointer hover:bg-[#e8eee4] px-1 py-0.5 rounded transition-colors">
//                           <input
//                             type="checkbox"
//                             checked={filters.categories.includes(category._id)}
//                             onChange={() => handleCategoryChange(category._id)}
//                             className="w-3.5 h-3.5 rounded border-[#8B9D83]/40 text-[#8B9D83] focus:ring-[#8B9D83] focus:ring-offset-0 hover:border-[#465641] transition-colors"
//                           />
//                           <span className="text-[12px] font-medium text-[#1f251c] hover:text-[#030403] transition-colors" style={{ fontFamily: FONT_FAMILY }}>{category.name}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Subcategories */}
//               {selectedCategory && subcategories.length > 0 && (
//                 <div className="mb-3 border-b border-[#c5d5be]/20 pb-3">
//                   <button onClick={() => toggleSection('subcategories')} className="flex items-center justify-between w-full text-left mb-2 hover:bg-[#f0f5ed] px-2 py-1 rounded-lg transition-colors">
//                     <h4 className="font-semibold text-xs text-[#465641] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                       <FolderTree className="w-3.5 h-3.5 text-[#8B9D83]" />
//                       Subcategories
//                     </h4>
//                     {expandedSections.subcategories ? <ChevronUp className="w-3.5 h-3.5 text-[#465641]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#465641]" />}
//                   </button>
                  
//                   {expandedSections.subcategories && (
//                     <div className="space-y-1.5">
//                       {filters.subcategories.length > 0 && (
//                         <div className="mb-1.5 p-1.5 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/30">
//                           <p className="text-[10px] font-medium text-[#465641] mb-1" style={{ fontFamily: FONT_FAMILY }}>Selected Subcategories:</p>
//                           {filters.subcategories.map(subId => {
//                             const subcategory = subcategories.find(s => s._id === subId);
//                             return subcategory ? (
//                               <div key={subId} className="flex items-center justify-between py-0.5">
//                                 <span className="text-[11px] font-medium text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>{subcategory.name}</span>
//                                 <button onClick={() => handleRemoveSubcategory(subId)} className="text-gray-400 hover:text-[#465641] transition-colors"><X className="w-2.5 h-2.5" /></button>
//                               </div>
//                             ) : null;
//                           })}
//                         </div>
//                       )}
                      
//                       <div className="max-h-40 overflow-y-auto pr-1 space-y-1">
//                         {subcategories.map(sub => (
//                           <label key={sub._id} className="flex items-center gap-2 cursor-pointer hover:bg-[#e8eee4] px-1 py-0.5 rounded transition-colors">
//                             <input
//                               type="checkbox"
//                               checked={filters.subcategories.includes(sub._id)}
//                               onChange={() => handleSubcategoryChange(sub._id)}
//                               className="w-3.5 h-3.5 rounded border-[#8B9D83]/40 text-[#8B9D83] focus:ring-[#8B9D83] focus:ring-offset-0 hover:border-[#465641] transition-colors"
//                             />
//                             <span className="text-[12px] font-medium text-[#1f251c] hover:text-[#030403] transition-colors" style={{ fontFamily: FONT_FAMILY }}>{sub.name}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Child Subcategories */}
//               {showChildSubcategory && childSubcategories.length > 0 && (
//                 <div className="mb-3 border-b border-[#c5d5be]/20 pb-3">
//                   <button onClick={() => toggleSection('childSubcategories')} className="flex items-center justify-between w-full text-left mb-2 hover:bg-[#f0f5ed] px-2 py-1 rounded-lg transition-colors">
//                     <h4 className="font-semibold text-xs text-[#465641] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                       <FolderTree className="w-3.5 h-3.5 text-[#8B9D83]" />
//                       Child Subcategories
//                     </h4>
//                     {expandedSections.childSubcategories ? <ChevronUp className="w-3.5 h-3.5 text-[#465641]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#465641]" />}
//                   </button>
                  
//                   {expandedSections.childSubcategories && (
//                     <div className="space-y-1.5">
//                       {filters.childSubcategories.length > 0 && (
//                         <div className="mb-1.5 p-1.5 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/30">
//                           <p className="text-[10px] font-medium text-[#465641] mb-1" style={{ fontFamily: FONT_FAMILY }}>Selected Child Subcategories:</p>
//                           {filters.childSubcategories.map(childId => {
//                             const child = childSubcategories.find(c => c._id === childId);
//                             return child ? (
//                               <div key={childId} className="flex items-center justify-between py-0.5">
//                                 <span className="text-[11px] font-medium text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>{child.name}</span>
//                                 <button onClick={() => handleRemoveChildSubcategory(childId)} className="text-gray-400 hover:text-[#465641] transition-colors"><X className="w-2.5 h-2.5" /></button>
//                               </div>
//                             ) : null;
//                           })}
//                         </div>
//                       )}
                      
//                       <div className="max-h-40 overflow-y-auto pr-1 space-y-1">
//                         {childSubcategories.map(child => (
//                           <label key={child._id} className="flex items-center gap-2 cursor-pointer hover:bg-[#e8eee4] px-1 py-0.5 rounded transition-colors">
//                             <input
//                               type="checkbox"
//                               checked={filters.childSubcategories.includes(child._id)}
//                               onChange={() => handleChildSubcategoryChange(child._id)}
//                               className="w-3.5 h-3.5 rounded border-[#8B9D83]/40 text-[#8B9D83] focus:ring-[#8B9D83] focus:ring-offset-0 hover:border-[#465641] transition-colors"
//                             />
//                             <span className="text-[12px] font-medium text-[#465641] hover:text-[#8B9D83] transition-colors" style={{ fontFamily: FONT_FAMILY }}>{child.name}</span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Brands */}
//               <div className="mb-3 border-b border-[#c5d5be]/20 pb-3">
//                 <button onClick={() => toggleSection('brands')} className="flex items-center justify-between w-full text-left mb-2 hover:bg-[#f0f5ed] px-2 py-1 rounded-lg transition-colors">
//                   <h4 className="font-semibold text-xs text-[#465641] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                     <Building2 className="w-3.5 h-3.5 text-[#8B9D83]" />
//                     Brands
//                   </h4>
//                   {expandedSections.brands ? <ChevronUp className="w-3.5 h-3.5 text-[#465641]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#465641]" />}
//                 </button>
                
//                 {expandedSections.brands && (
//                   <div className="space-y-1.5">
//                     {filters.brands.length > 0 && (
//                       <div className="mb-1.5 p-1.5 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/30">
//                         <p className="text-[10px] font-medium text-[#465641] mb-1" style={{ fontFamily: FONT_FAMILY }}>Selected Brands:</p>
//                         {filters.brands.map((brand, index) => (
//                           <div key={brand || index} className="flex items-center justify-between py-0.5">
//                             <span className="text-[11px] font-medium text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>{brand}</span>
//                             <button onClick={() => handleRemoveBrand(brand)} className="text-gray-400 hover:text-[#465641] transition-colors"><X className="w-2.5 h-2.5" /></button>
//                           </div>
//                         ))}
//                       </div>
//                     )}
                    
//                     <div className="max-h-40 overflow-y-auto pr-1 space-y-1">
//                       {brands.map((brand, index) => (
//                         <label key={brand._id || brand.name || index} className="flex items-center gap-2 cursor-pointer hover:bg-[#e8eee4] px-1 py-0.5 rounded transition-colors">
//                           <input
//                             type="checkbox"
//                             checked={filters.brands.includes(brand.name)}
//                             onChange={() => handleBrandChange(brand.name)}
//                             className="w-3.5 h-3.5 rounded border-[#8B9D83]/40 text-[#8B9D83] focus:ring-[#8B9D83] focus:ring-offset-0 hover:border-[#465641] transition-colors"
//                           />
//                           <span className="text-[12px] font-medium text-[#465641] hover:text-[#8B9D83] transition-colors" style={{ fontFamily: FONT_FAMILY }}>{brand.name}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Unit Filter */}
//               <div className="mb-3">
//                 <button onClick={() => toggleSection('unit')} className="flex items-center justify-between w-full text-left mb-2 hover:bg-[#f0f5ed] px-2 py-1 rounded-lg transition-colors">
//                   <h4 className="font-semibold text-xs text-[#465641] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                     <Scale className="w-3.5 h-3.5 text-[#8B9D83]" />
//                     Unit
//                   </h4>
//                   {expandedSections.unit ? <ChevronUp className="w-3.5 h-3.5 text-[#465641]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#465641]" />}
//                 </button>
                
//                 {expandedSections.unit && (
//                   <div className="space-y-1.5">
//                     {filters.units.length > 0 && (
//                       <div className="mb-1.5 p-1.5 bg-[#f0f5ed] rounded-lg border border-[#c5d5be]/30">
//                         <p className="text-[10px] font-medium text-[#465641] mb-1" style={{ fontFamily: FONT_FAMILY }}>Selected Units:</p>
//                         {filters.units.map((unit, index) => {
//                           const unitLabel = availableUnits.find(u => u.value === unit)?.label || unit;
//                           return (
//                             <div key={unit || index} className="flex items-center justify-between py-0.5">
//                               <span className="text-[11px] font-medium text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>{unitLabel}</span>
//                               <button onClick={() => handleRemoveUnit(unit)} className="text-gray-400 hover:text-[#465641] transition-colors">
//                                 <X className="w-2.5 h-2.5" />
//                               </button>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     )}
                    
//                     <div className="space-y-1 max-h-40 overflow-y-auto pr-1">
//                       {availableUnits.length === 0 ? (
//                         <p className="text-[11px] text-[#465641]" style={{ fontFamily: FONT_FAMILY }}>No units available</p>
//                       ) : (
//                         availableUnits.map((unit, index) => (
//                           <label key={unit.value || index} className="flex items-center gap-2 cursor-pointer hover:bg-[#e8eee4] px-1 py-0.5 rounded transition-colors">
//                             <input
//                               type="checkbox"
//                               checked={filters.units.includes(unit.value)}
//                               onChange={() => handleUnitChange(unit.value)}
//                               className="w-3.5 h-3.5 rounded border-[#8B9D83]/40 text-[#8B9D83] focus:ring-[#8B9D83] focus:ring-offset-0 hover:border-[#465641] transition-colors"
//                             />
//                             <span className="text-[12px] font-medium text-[#465641] hover:text-[#8B9D83] transition-colors" style={{ fontFamily: FONT_FAMILY }}>
//                               {unit.label}
//                             </span>
//                           </label>
//                         ))
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// // ============================================================
// //  MAIN PRODUCTS PAGE
// // ============================================================
// export default function ProductsClient() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewMode, setViewMode] = useState('grid');
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [subcategories, setSubcategories] = useState([]);
//   const [childSubcategories, setChildSubcategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [showChildSubcategory, setShowChildSubcategory] = useState(false);
//   const [productsInCart, setProductsInCart] = useState({});
//   const [forceFetch, setForceFetch] = useState(0);
//   const [brands, setBrands] = useState([]);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

//   const [availableUnits, setAvailableUnits] = useState([]);
//   const [unitsLoading, setUnitsLoading] = useState(true);
  
//   const [expandedSections, setExpandedSections] = useState({
//     price: true,
//     categories: true,
//     subcategories: true,
//     childSubcategories: true,
//     brands: true,
//     unit: true
//   });

//   const productsContainerRef = useRef(null);
//   const scrollPositionRef = useRef(0);
//   const searchTimerRef = useRef(null);

//   const [filters, setFilters] = useState({
//     search: '',
//     categories: [],
//     subcategories: [],
//     childSubcategories: [],
//     brands: [],
//     units: [],
//     priceRange: { min: '', max: '' },
//     sortBy: 'newest'
//   });

//   const [searchInput, setSearchInput] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [minPriceInput, setMinPriceInput] = useState('');
//   const [maxPriceInput, setMaxPriceInput] = useState('');
//   const [initialCategorySet, setInitialCategorySet] = useState(false);

//   // Items per page - 20
//   const ITEMS_PER_PAGE = 20;

//   const openCartSidebar = () => {
//     setIsCartOpen(true);
//   };

//   const closeCartSidebar = () => {
//     setIsCartOpen(false);
//   };

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const saveScrollPosition = () => {
//     scrollPositionRef.current = window.scrollY;
//   };

//   const restoreScrollPosition = () => {
//     if (scrollPositionRef.current > 0) {
//       window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
//     }
//   };

//   const debouncedSearch = useCallback((searchValue) => {
//     if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
//     searchTimerRef.current = setTimeout(() => {
//       saveScrollPosition();
//       setFilters(prev => ({ ...prev, search: searchValue }));
//       setCurrentPage(1);
//     }, 500);
//   }, []);

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchInput(value);
//     debouncedSearch(value);
//   };

//   const handleClearSearch = () => {
//     setSearchInput('');
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, search: '' }));
//     setCurrentPage(1);
//   };

//   // Category chip click handler
//   // const handleCategoryChipClick = (categoryId) => {
//   //   saveScrollPosition();
//   //   if (categoryId === 'all') {
//   //     setActiveCategoryFilter('all');
//   //     setFilters(prev => ({ ...prev, categories: [], subcategories: [], childSubcategories: [] }));
//   //     setCurrentPage(1);
//   //     const params = new URLSearchParams(window.location.search);
//   //     params.delete('category');
//   //     window.history.pushState({}, '', `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`);
//   //     window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: null } }));
//   //   } else {
//   //     setActiveCategoryFilter(categoryId);
//   //     setFilters(prev => ({ ...prev, categories: [categoryId], subcategories: [], childSubcategories: [] }));
//   //     setCurrentPage(1);
//   //     const params = new URLSearchParams(window.location.search);
//   //     params.set('category', categoryId);
//   //     window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
//   //     window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId } }));
//   //   }
//   // };

//   const handleCategoryChipClick = (categoryId) => {
//   saveScrollPosition();
//   const params = new URLSearchParams(window.location.search);
//   params.delete('subcategory');
//   params.delete('childSubcategory');

//   if (categoryId === 'all') {
//     setActiveCategoryFilter('all');
//     setFilters(prev => ({ ...prev, categories: [], subcategories: [], childSubcategories: [] }));
//     setCurrentPage(1);
//     params.delete('category');
//     window.history.pushState({}, '', `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`);
//     window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: null } }));
//   } else {
//     setActiveCategoryFilter(categoryId);
//     setFilters(prev => ({ ...prev, categories: [categoryId], subcategories: [], childSubcategories: [] }));
//     setCurrentPage(1);
//     params.set('category', categoryId);
//     window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`);
//     window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId } }));
//   }
// };

//   useEffect(() => {
//     fetchCategories();
//     fetchBrands();
//   }, []);

//   useEffect(() => {
//     const fetchUnits = async () => {
//       try {
//         const response = await fetch('http://localhost:5000/api/products/units/all');
//         const data = await response.json();
//         if (data.success) {
//           setAvailableUnits(data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching units:', error);
//       } finally {
//         setUnitsLoading(false);
//       }
//     };
//     fetchUnits();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/categories/with-products');
//       const data = await response.json();
//       if (data.success) {
//         setCategories(data.data);
//       }
//       setCategoriesLoaded(true);
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       setCategoriesLoaded(true);
//     }
//   };

//   const fetchBrands = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/products/brands/with-products');
//       const data = await response.json();
//       if (data.success) {
//         setBrands(data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching brands:', error);
//     }
//   };

//   // useEffect(() => {
//   //   if (categories.length > 0 && !initialCategorySet) {
//   //     const categoryParam = searchParams.get('category');
//   //     if (categoryParam && categories.some(cat => cat._id === categoryParam)) {
//   //       setFilters(prev => ({ ...prev, categories: [categoryParam] }));
//   //       setActiveCategoryFilter(categoryParam);
//   //     }
//   //     setInitialCategorySet(true);
//   //   }
//   // }, [categories, searchParams]);


//   useEffect(() => {
//   if (categories.length > 0 && !initialCategorySet) {
//     const categoryParam = searchParams.get('category');
    
//     if (categoryParam) {
//       // Try to find category by _id OR slug
//       const matchedCategory = categories.find(
//         cat => cat._id === categoryParam || cat.slug === categoryParam
//       );
      
//       if (matchedCategory) {
//         // Always use the _id internally
//         setFilters(prev => ({ ...prev, categories: [matchedCategory._id] }));
//         setActiveCategoryFilter(matchedCategory._id);
//       }
//     }
//     setInitialCategorySet(true);
//   }
// }, [categories, searchParams]);


// // ============================================================
// // ✅ Handle category changes from URL (Navbar clicks, browser back/forward)
// // Works even when already on /products page
// // ============================================================
// // useEffect(() => {
// //   if (categories.length === 0) return;

// //   const categoryParam = searchParams.get('category');

// //   // If no category in URL → reset to "all"
// //   if (!categoryParam) {
// //     // Only reset if currently filtered (avoid unnecessary re-renders)
// //     if (filters.categories.length > 0) {
// //       setFilters(prev => ({
// //         ...prev,
// //         categories: [],
// //         subcategories: [],
// //         childSubcategories: [],
// //       }));
// //       setActiveCategoryFilter('all');
// //       setCurrentPage(1);
// //     }
// //     return;
// //   }

// //   // Match by _id OR slug (Navbar sends slug)
// //   const matchedCategory = categories.find(
// //     cat => cat._id === categoryParam || cat.slug === categoryParam
// //   );

// //   if (!matchedCategory) return;

// //   // Only update if the category actually changed
// //   if (filters.categories[0] !== matchedCategory._id) {
// //     setFilters(prev => ({
// //       ...prev,
// //       categories: [matchedCategory._id],
// //       subcategories: [],
// //       childSubcategories: [],
// //     }));
// //     setActiveCategoryFilter(matchedCategory._id);
// //     setCurrentPage(1);
// //     setForceFetch(prev => prev + 1); // ✅ force a fetch
// //   }
// // }, [searchParams, categories]);


// // ============================================================
// // ✅ Sync URL params (category, subcategory, childSubcategory) → filters
// // Handles Navbar clicks, chip clicks, browser back/forward, and
// // landing directly on a deep URL.
// // ============================================================
// useEffect(() => {
//   if (categories.length === 0) return;

//   const categoryParam = searchParams.get('category');
//   const subcategoryParam = searchParams.get('subcategory');
//   const childParam = searchParams.get('childSubcategory');

//   // ---- No category param → reset everything ----
//   if (!categoryParam) {
//     if (
//       filters.categories.length > 0 ||
//       filters.subcategories.length > 0 ||
//       filters.childSubcategories.length > 0
//     ) {
//       setFilters(prev => ({
//         ...prev,
//         categories: [],
//         subcategories: [],
//         childSubcategories: [],
//       }));
//       setActiveCategoryFilter('all');
//       setCurrentPage(1);
//       setForceFetch(prev => prev + 1);
//     }
//     return;
//   }

//   // ---- Resolve category (by _id OR slug) ----
//   const matchedCategory = categories.find(
//     cat => cat._id === categoryParam || cat.slug === categoryParam
//   );
//   if (!matchedCategory) return;

//   const newCategoryId = matchedCategory._id;
//   let newSubcategoryId = null;
//   let newChildId = null;

//   // ---- Resolve subcategory (needs category doc) ----
//   if (subcategoryParam) {
//     // Try from already-loaded subcategories first
//     let matchedSub = subcategories.find(
//       s => s._id === subcategoryParam || s.slug === subcategoryParam
//     );

//     // Not in state yet → look it up from the category object
//     if (!matchedSub && matchedCategory.subcategories) {
//       matchedSub = matchedCategory.subcategories.find(
//         s => s._id === subcategoryParam || s.slug === subcategoryParam
//       );
//     }

//     if (matchedSub) {
//       newSubcategoryId = matchedSub._id;

//       // ---- Resolve child subcategory ----
//     if (childParam) {
//   // 1. Try inside matchedSub.children (if API returned them)
//   let matchedChild = matchedSub.children?.find(
//     c => c._id === childParam || c.slug === childParam
//   );

//   // 2. Fall back to already-loaded childSubcategories state
//   if (!matchedChild) {
//     matchedChild = childSubcategories.find(
//       c => c._id === childParam || c.slug === childParam
//     );
//   }

//   if (matchedChild) {
//     newChildId = matchedChild._id;
//   }
// }
//     }
//   }

//   // ---- Compare against current filters to avoid loops ----
//   const currentCategory = filters.categories[0] || null;
//   const currentSub = filters.subcategories[0] || null;
//   const currentChild = filters.childSubcategories[0] || null;

//   const changed =
//     currentCategory !== newCategoryId ||
//     currentSub !== newSubcategoryId ||
//     currentChild !== newChildId;

//   if (!changed) return;

//   setFilters(prev => ({
//     ...prev,
//     categories: [newCategoryId],
//     subcategories: newSubcategoryId ? [newSubcategoryId] : [],
//     childSubcategories: newChildId ? [newChildId] : [],
//   }));

//   setActiveCategoryFilter(newCategoryId);
//   setCurrentPage(1);
//   setForceFetch(prev => prev + 1);
// }, [searchParams, categories, subcategories, childSubcategories]);




//   useEffect(() => {
//     if (filters.categories.length === 1) {
//       const categoryId = filters.categories[0];
//       setSelectedCategory(categoryId);
//       fetchSubcategories(categoryId);
//     } else {
//       setSubcategories([]);
//       setSelectedCategory(null);
//       setChildSubcategories([]);
//       setSelectedSubcategory(null);
//       setShowChildSubcategory(false);
//       if (filters.subcategories.length > 0) setFilters(prev => ({ ...prev, subcategories: [] }));
//       if (filters.childSubcategories.length > 0) setFilters(prev => ({ ...prev, childSubcategories: [] }));
//     }
//   }, [filters.categories]);

//   // useEffect(() => {
//   //   if (filters.subcategories.length === 1 && selectedCategory) {
//   //     const subcategoryId = filters.subcategories[0];
//   //     setSelectedSubcategory(subcategoryId);
//   //     fetchChildSubcategories(selectedCategory, subcategoryId);
//   //   } else {
//   //     setChildSubcategories([]);
//   //     setSelectedSubcategory(null);
//   //     setShowChildSubcategory(false);
//   //     if (filters.childSubcategories.length > 0) setFilters(prev => ({ ...prev, childSubcategories: [] }));
//   //   }
//   // }, [filters.subcategories, selectedCategory]);


//   useEffect(() => {
//   // ✅ Read category id directly from filters (atomically set with subcategories),
//   //    NOT from the lagging selectedCategory state.
//   const categoryId = filters.categories[0] || null;

//   if (filters.subcategories.length === 1 && categoryId) {
//     const subcategoryId = filters.subcategories[0];
//     setSelectedSubcategory(subcategoryId);
//     fetchChildSubcategories(categoryId, subcategoryId);
//   } else {
//     setChildSubcategories([]);
//     setSelectedSubcategory(null);
//     setShowChildSubcategory(false);
//     if (filters.childSubcategories.length > 0) {
//       setFilters(prev => ({ ...prev, childSubcategories: [] }));
//     }
//   }
// }, [filters.subcategories, filters.categories]); // ✅ deps: filters.categories instead of selectedCategory

//   useEffect(() => {
//     if (initialCategorySet) fetchProducts();
//   }, [filters.categories, filters.subcategories, filters.childSubcategories, filters.brands, filters.units, filters.priceRange, filters.search, filters.sortBy, currentPage, initialCategorySet, forceFetch]);

//   useEffect(() => {
//     if (!loading) restoreScrollPosition();
//   }, [loading]);

//   const checkAllProductsCartStatus = async (productIds) => {
//     if (!productIds || productIds.length === 0) return;
    
//     const token = localStorage.getItem('token');
//     let sessionId = localStorage.getItem('cartSessionId');
    
//     if (!token && !sessionId) {
//       sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
//       localStorage.setItem('cartSessionId', sessionId);
//     }
    
//     const headers = {};
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     } else if (sessionId) {
//       headers['x-session-id'] = sessionId;
//     }
    
//     try {
//       const response = await fetch('http://localhost:5000/api/cart/check-status', {
//         method: 'POST',
//         headers: { ...headers, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ productIds })
//       });
//       const data = await response.json();
//       if (data.success) {
//         setProductsInCart(data.data);
//       }
//     } catch (error) {
//       console.error('Error checking cart status:', error);
//     }
//   };

//   useEffect(() => {
//     if (products.length > 0) {
//       const productIds = products.map(p => p._id);
//       checkAllProductsCartStatus(productIds);
//     }
//   }, [products]);

//   useEffect(() => {
//     const refreshCartStatus = async () => {
//       if (products.length === 0) return;
//       const productIds = products.map(p => p._id);
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       const headers = {};
//       if (token) headers['Authorization'] = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;
      
//       try {
//         const response = await fetch('http://localhost:5000/api/cart/check-status', {
//           method: 'POST',
//           headers: { ...headers, 'Content-Type': 'application/json' },
//           body: JSON.stringify({ productIds })
//         });
//         const data = await response.json();
//         if (data.success) setProductsInCart(data.data);
//       } catch (error) { console.error('Error refreshing cart status:', error); }
//     };
//     const handleCartUpdate = () => refreshCartStatus();
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => window.removeEventListener('cart-update', handleCartUpdate);
//   }, [products]);

//   useEffect(() => {
//     // const handleCategoryFilterChange = (event) => {
//     //   const categoryId = event.detail?.categoryId;
//     //   if (categoryId) {
//     //     saveScrollPosition();
//     //     setFilters(prev => ({ ...prev, categories: [categoryId], subcategories: [], childSubcategories: [] }));
//     //     setActiveCategoryFilter(categoryId);
//     //     setCurrentPage(1);
//     //     setForceFetch(prev => prev + 1);
//     //     const url = new URL(window.location.href);
//     //     url.searchParams.set('category', categoryId);
//     //     window.history.pushState({}, '', url);
//     //   } else if (event.detail?.categoryId === null) {
//     //     saveScrollPosition();
//     //     setFilters(prev => ({ ...prev, categories: [], subcategories: [], childSubcategories: [] }));
//     //     setActiveCategoryFilter('all');
//     //     setCurrentPage(1);
//     //     setForceFetch(prev => prev + 1);
//     //     const url = new URL(window.location.href);
//     //     url.searchParams.delete('category');
//     //     window.history.pushState({}, '', url);
//     //   }
//     // };

//     const handleCategoryFilterChange = (event) => {
//   const categoryId = event.detail?.categoryId;
//   const url = new URL(window.location.href);
//   url.searchParams.delete('subcategory');
//   url.searchParams.delete('childSubcategory');

//   if (categoryId) {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, categories: [categoryId], subcategories: [], childSubcategories: [] }));
//     setActiveCategoryFilter(categoryId);
//     setCurrentPage(1);
//     setForceFetch(prev => prev + 1);
//     url.searchParams.set('category', categoryId);
//   } else if (event.detail?.categoryId === null) {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, categories: [], subcategories: [], childSubcategories: [] }));
//     setActiveCategoryFilter('all');
//     setCurrentPage(1);
//     setForceFetch(prev => prev + 1);
//     url.searchParams.delete('category');
//   }
//   window.history.pushState({}, '', url);
// };
//     window.addEventListener('categoryFilterChanged', handleCategoryFilterChange);
//     return () => window.removeEventListener('categoryFilterChanged', handleCategoryFilterChange);
//   }, []);

//   // useEffect(() => {
//   //   const handlePopState = () => {
//   //     const categoryParam = new URLSearchParams(window.location.search).get('category');
//   //     if (categoryParam) {
//   //       setFilters(prev => ({ ...prev, categories: [categoryParam], subcategories: [], childSubcategories: [] }));
//   //       setActiveCategoryFilter(categoryParam);
//   //     } else {
//   //       setFilters(prev => ({ ...prev, categories: [], subcategories: [], childSubcategories: [] }));
//   //       setActiveCategoryFilter('all');
//   //     }
//   //     setCurrentPage(1);
//   //   };
//   //   window.addEventListener('popstate', handlePopState);
//   //   return () => window.removeEventListener('popstate', handlePopState);
//   // }, []);

//   const fetchSubcategories = async (categoryId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories`);
//       const data = await response.json();
//       if (data.success && Array.isArray(data.data.subcategories)) {
//         setSubcategories(data.data.subcategories);
//         return data.data.subcategories;
//       } else {
//         setSubcategories([]);
//         return [];
//       }
//     } catch (error) { console.error('Error fetching subcategories:', error); setSubcategories([]); return []; }
//   };

//   const fetchChildSubcategories = async (categoryId, subcategoryId) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`);
//       const data = await response.json();
//       if (data.success && Array.isArray(data.data.children)) {
//         setChildSubcategories(data.data.children);
//         setShowChildSubcategory(data.data.children.length > 0);
//         return data.data.children;
//       } else {
//         setChildSubcategories([]);
//         setShowChildSubcategory(false);
//         return [];
//       }
//     } catch (error) { console.error('Error fetching child subcategories:', error); setChildSubcategories([]); setShowChildSubcategory(false); return []; }
//   };

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const queryParams = new URLSearchParams();
//       queryParams.append('page', currentPage);
//       queryParams.append('limit', ITEMS_PER_PAGE);
//       if (filters.search) queryParams.append('search', filters.search);
//       if (filters.categories.length > 0) filters.categories.forEach(cat => queryParams.append('category', cat));
//       if (filters.subcategories.length > 0) filters.subcategories.forEach(sub => queryParams.append('subcategory', sub));
//       if (filters.childSubcategories.length > 0) filters.childSubcategories.forEach(child => queryParams.append('childSubcategory', child));
//       if (filters.brands.length > 0) filters.brands.forEach(brand => queryParams.append('brand', brand));
//       if (filters.units.length > 0) filters.units.forEach(unit => queryParams.append('unit', unit));
//       if (filters.priceRange.min) queryParams.append('minPrice', filters.priceRange.min);
//       if (filters.priceRange.max) queryParams.append('maxPrice', filters.priceRange.max);
      
//       let sortParam = '-createdAt';
//       switch (filters.sortBy) {
//         case 'price_low': sortParam = 'price_asc'; break;
//         case 'price_high': sortParam = 'price_desc'; break;
//         case 'name_asc': sortParam = 'name_asc'; break;
//         default: sortParam = 'newest';
//       }
//       queryParams.append('sort', sortParam);

//       const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`);
//       const data = await response.json();
//       if (data.success) {
//         setProducts(data.data || []);
//         setTotalPages(data.pagination?.pages || 1);
//         setTotalProducts(data.pagination?.total || 0);
//       }
//     } catch (error) { console.error('Error fetching products:', error); } finally { setLoading(false); }
//   };

//   const handleCategoryChange = (categoryId) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newCategories = prev.categories.includes(categoryId) ? prev.categories.filter(id => id !== categoryId) : [...prev.categories, categoryId];
//       return { ...prev, categories: newCategories, subcategories: [], childSubcategories: [] };
//     });
//     setCurrentPage(1);
    
//     const isSelected = !filters.categories.includes(categoryId);
//     const newCategory = isSelected ? categoryId : null;
//     setActiveCategoryFilter(newCategory || 'all');
//     const params = new URLSearchParams(window.location.search);
//     if (newCategory) params.set('category', newCategory);
//     else params.delete('category');
//     window.history.pushState({}, '', `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`);
//     window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: newCategory } }));
//   };

//   const handleRemoveCategory = (categoryId) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, categories: prev.categories.filter(id => id !== categoryId), subcategories: [], childSubcategories: [] }));
//     setActiveCategoryFilter('all');
//     setCurrentPage(1);
//     const params = new URLSearchParams(window.location.search);
//     params.delete('category');
//     window.history.pushState({}, '', `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`);
//     window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: null } }));
//   };

//   const handleSubcategoryChange = (subcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newSubcategories = prev.subcategories.includes(subcategoryId) ? prev.subcategories.filter(id => id !== subcategoryId) : [...prev.subcategories, subcategoryId];
//       return { ...prev, subcategories: newSubcategories, childSubcategories: [] };
//     });
//     setCurrentPage(1);
//   };

//   const handleRemoveSubcategory = (subcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, subcategories: prev.subcategories.filter(id => id !== subcategoryId), childSubcategories: [] }));
//     setCurrentPage(1);
//   };

//   const handleChildSubcategoryChange = (childSubcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newChildSubcategories = prev.childSubcategories.includes(childSubcategoryId) ? prev.childSubcategories.filter(id => id !== childSubcategoryId) : [...prev.childSubcategories, childSubcategoryId];
//       return { ...prev, childSubcategories: newChildSubcategories };
//     });
//     setCurrentPage(1);
//   };

//   const handleRemoveChildSubcategory = (childSubcategoryId) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, childSubcategories: prev.childSubcategories.filter(id => id !== childSubcategoryId) }));
//     setCurrentPage(1);
//   };

//   const handleBrandChange = (brand) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newBrands = prev.brands.includes(brand) ? prev.brands.filter(b => b !== brand) : [...prev.brands, brand];
//       return { ...prev, brands: newBrands };
//     });
//     setCurrentPage(1);
//   };

//   const handleRemoveBrand = (brand) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, brands: prev.brands.filter(b => b !== brand) }));
//     setCurrentPage(1);
//   };

//   const handleUnitChange = (unit) => {
//     saveScrollPosition();
//     setFilters(prev => {
//       const newUnits = prev.units.includes(unit) ? prev.units.filter(u => u !== unit) : [...prev.units, unit];
//       return { ...prev, units: newUnits };
//     });
//     setCurrentPage(1);
//   };

//   const handleRemoveUnit = (unit) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, units: prev.units.filter(u => u !== unit) }));
//     setCurrentPage(1);
//   };

//   const applyPriceRange = () => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, priceRange: { min: minPriceInput || '', max: maxPriceInput || '' } }));
//     setCurrentPage(1);
//   };

//   const clearPriceRange = () => {
//     saveScrollPosition();
//     setMinPriceInput('');
//     setMaxPriceInput('');
//     setFilters(prev => ({ ...prev, priceRange: { min: '', max: '' } }));
//   };

//   const clearFilters = () => {
//     saveScrollPosition();
//     setSearchInput('');
//     setFilters({
//       search: '',
//       categories: [],
//       subcategories: [],
//       childSubcategories: [],
//       brands: [],
//       units: [],
//       priceRange: { min: '', max: '' },
//       sortBy: 'newest'
//     });
//     setActiveCategoryFilter('all');
//     setMinPriceInput('');
//     setMaxPriceInput('');
//     setCurrentPage(1);
//     window.history.pushState({}, '', window.location.pathname);
//     window.dispatchEvent(new CustomEvent('categoryFilterChanged', { detail: { categoryId: null } }));
//   };

//   const handleFilterChange = (filterType, value) => {
//     saveScrollPosition();
//     setFilters(prev => ({ ...prev, [filterType]: value }));
//     setCurrentPage(1);
//   };

//   const handlePageChange = (newPage) => {
//     saveScrollPosition();
//     setCurrentPage(newPage);
//   };

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
//   };

//   const getActiveFilterCount = () => {
//     let count = 0;
//     if (filters.search) count++;
//     if (filters.categories.length > 0) count += filters.categories.length;
//     if (filters.subcategories.length > 0) count += filters.subcategories.length;
//     if (filters.childSubcategories.length > 0) count += filters.childSubcategories.length;
//     if (filters.brands.length > 0) count += filters.brands.length;
//     if (filters.units.length > 0) count += filters.units.length;
//     if (filters.priceRange.min || filters.priceRange.max) count++;
//     return count;
//   };

//   useEffect(() => {
//     return () => { if (searchTimerRef.current) clearTimeout(searchTimerRef.current); };
//   }, []);

//   return (
//     <>
//       <LoadingBar isVisible={loading} />
//       <Navbar />

//       {/* Hero / Header Section */}
//      <div className="bg-gradient-to-r from-[#f0f5ed] via-white to-[#f0f5ed] border-b border-[#c5d5be]/20">
//   <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
//     <div className="flex flex-col items-center text-center">
//       <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-[#263b32] mb-1" style={{ fontFamily: FONT_FAMILY }}>
//         All <span className="text-[#8B9D83] font-medium">Products</span>
//       </h1>
      
//       <p className="text-[#53645a] text-sm mb-3" style={{ fontFamily: FONT_FAMILY }}>
//         Curated essentials for your everyday beauty routine.
//       </p>
      
//       {/* Search Bar */}
//       <div className="w-full max-w-md">
//         <div className="relative flex items-center bg-white border border-[#8B9D83]/20 rounded-full shadow-sm overflow-hidden focus-within:border-[#8B9D83] focus-within:ring-2 focus-within:ring-[#8B9D83]/20 transition-all">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search beauty products..."
//             value={searchInput}
//             onChange={handleSearchChange}
//             className="w-full pl-10 pr-10 py-2 text-sm border-0 focus:outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
//             style={{ fontFamily: FONT_FAMILY }}
//           />
//           {searchInput && (
//             <button onClick={handleClearSearch} className="absolute right-3 p-1 text-gray-400 hover:text-[#8B9D83] rounded-full transition-colors">
//               <X className="w-4 h-4" />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

//       {/* Main Content */}
//       <div className="min-h-screen" style={{ 
//         background: 'linear-gradient(to right, #c5d5be 0%, #f0f5ed 25%, #FFFFFF 50%, #f0f5ed 75%, #c5d5be 100%)'
//       }}>
//         <div className="container mx-auto px-4 max-w-7xl py-4">
          
//           {/* Filter, Categories, Sort, Toggle - All on same row */}
       
//      <div className="mb-4">
//    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
//     {/* Filter Button - Always visible */}
//     <button
//       onClick={() => setIsFilterOpen(true)}
//       className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#8B9D83]/30 rounded-full hover:bg-[#f0f5ed] transition-colors text-xs font-medium text-gray-700 shadow-sm shrink-0"
//     >
//       <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B9D83]" />
//       Filters
//       {getActiveFilterCount() > 0 && (
//         <span className="px-1.5 py-0.5 bg-[#8B9D83] text-white text-[9px] rounded-full min-w-[16px] text-center">
//           {getActiveFilterCount()}
//         </span>
//       )}
//     </button>

//     {/* Category Chips - Hidden on mobile, visible on md and up */}
//     <div className="hidden md:flex items-center gap-1.5 overflow-x-auto flex-1 justify-center min-w-0 pb-0.5 scrollbar-hide">
//       <button
//         onClick={() => handleCategoryChipClick('all')}
//         className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-all shrink-0 ${
//           activeCategoryFilter === 'all'
//             ? 'bg-[#8B9D83] text-white shadow-md shadow-[#8B9D83]/25'
//             : 'bg-white border border-[#c5d5be]/30 text-gray-700 hover:border-[#8B9D83]/50 hover:text-[#8B9D83]'
//         }`}
//         style={{ fontFamily: FONT_FAMILY }}
//       >
//         All
//       </button>
//       {categories.map(category => (
//         <button
//           key={category._id}
//           onClick={() => handleCategoryChipClick(category._id)}
//           className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-all shrink-0 ${
//             activeCategoryFilter === category._id
//               ? 'bg-[#8B9D83] text-white shadow-md shadow-[#8B9D83]/25'
//               : 'bg-white border border-[#c5d5be]/30 text-gray-700 hover:border-[#8B9D83]/50 hover:text-[#8B9D83]'
//           }`}
//           style={{ fontFamily: FONT_FAMILY }}
//         >
//           {category.name}
//         </button>
//       ))}
//     </div>

//     {/* Sort Dropdown - Always visible */}
//     <select
//       value={filters.sortBy}
//       onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//       className="px-2 py-1 text-xs border border-[#8B9D83]/30 rounded-full bg-white focus:outline-none focus:ring-1 focus:ring-[#8B9D83] shrink-0"
//       style={{ fontFamily: FONT_FAMILY }}
//     >
//       <option value="newest">Newest</option>
//       <option value="price_low">Price: Low</option>
//       <option value="price_high">Price: High</option>
//       <option value="name_asc">A to Z</option>
//     </select>

//     {/* View Toggle - Hidden on mobile, visible on md and up */}
//     <div className="hidden md:flex items-center gap-0.5 bg-white border border-[#8B9D83]/30 rounded-full p-0.5 shrink-0">
//       <button 
//         onClick={() => setViewMode('grid')} 
//         className={`p-1.5 rounded-full transition-all ${viewMode === 'grid' ? 'bg-[#8B9D83] text-white shadow-md shadow-[#8B9D83]/20' : 'text-gray-500 hover:bg-[#f0f5ed]'}`} 
//         title="Grid View"
//       >
//         <Grid className="w-3.5 h-3.5" />
//       </button>
//       <button 
//         onClick={() => setViewMode('list')} 
//         className={`p-1.5 rounded-full transition-all ${viewMode === 'list' ? 'bg-[#8B9D83] text-white shadow-md shadow-[#8B9D83]/20' : 'text-gray-500 hover:bg-[#f0f5ed]'}`} 
//         title="List View"
//       >
//         <List className="w-3.5 h-3.5" />
//       </button>
//     </div>
//   </div>

//             {/* Active Filters Display */}
//             {getActiveFilterCount() > 0 && (
//               <div className="mt-2 flex items-center gap-1.5 flex-wrap">
//                 {filters.search && (
//                   <div className="flex items-center gap-1 px-2 py-0.5 bg-[#f0f5ed] text-gray-700 text-[10px] rounded-full border border-[#c5d5be]/30">
//                     <span>🔍 "{filters.search}"</span>
//                     <button onClick={handleClearSearch} className="ml-1 hover:text-[#8B9D83] transition-colors"><X className="w-2.5 h-2.5" /></button>
//                   </div>
//                 )}
//                 {filters.categories.map(catId => {
//                   const category = categories.find(c => c._id === catId);
//                   return category ? (
//                     <div key={catId} className="flex items-center gap-1 px-2 py-0.5 bg-[#f0f5ed] text-gray-700 text-[10px] rounded-full border border-[#c5d5be]/30">
//                       <Tag className="w-2.5 h-2.5 text-[#8B9D83]" />
//                       <span style={{ fontFamily: FONT_FAMILY }}>{category.name}</span>
//                       <button onClick={() => handleRemoveCategory(catId)} className="ml-1 hover:text-[#8B9D83] transition-colors"><X className="w-2.5 h-2.5" /></button>
//                     </div>
//                   ) : null;
//                 })}
//                 {filters.subcategories.map(subId => {
//                   const sub = subcategories.find(s => s._id === subId);
//                   return sub ? (
//                     <div key={subId} className="flex items-center gap-1 px-2 py-0.5 bg-[#f0f5ed] text-gray-700 text-[10px] rounded-full border border-[#c5d5be]/30">
//                       <FolderTree className="w-2.5 h-2.5 text-[#8B9D83]" />
//                       <span style={{ fontFamily: FONT_FAMILY }}>{sub.name}</span>
//                       <button onClick={() => handleRemoveSubcategory(subId)} className="ml-1 hover:text-[#8B9D83] transition-colors"><X className="w-2.5 h-2.5" /></button>
//                     </div>
//                   ) : null;
//                 })}
//                 {filters.brands.map(brand => (
//                   <div key={brand} className="flex items-center gap-1 px-2 py-0.5 bg-[#f0f5ed] text-gray-700 text-[10px] rounded-full border border-[#c5d5be]/30">
//                     <Building2 className="w-2.5 h-2.5 text-[#8B9D83]" />
//                     <span style={{ fontFamily: FONT_FAMILY }}>{brand}</span>
//                     <button onClick={() => handleRemoveBrand(brand)} className="ml-1 hover:text-[#8B9D83] transition-colors"><X className="w-2.5 h-2.5" /></button>
//                   </div>
//                 ))}
//                 {filters.units.map(unit => (
//                   <div key={unit} className="flex items-center gap-1 px-2 py-0.5 bg-[#f0f5ed] text-gray-700 text-[10px] rounded-full border border-[#c5d5be]/30">
//                     <Scale className="w-2.5 h-2.5 text-[#8B9D83]" />
//                     <span style={{ fontFamily: FONT_FAMILY }}>{unit === 'pcs' ? 'Pieces' : 'Ton'}</span>
//                     <button onClick={() => handleRemoveUnit(unit)} className="ml-1 hover:text-[#8B9D83] transition-colors"><X className="w-2.5 h-2.5" /></button>
//                   </div>
//                 ))}
//                 {(filters.priceRange.min || filters.priceRange.max) && (
//                   <div className="flex items-center gap-1 px-2 py-0.5 bg-[#f0f5ed] text-gray-700 text-[10px] rounded-full border border-[#c5d5be]/30">
//                     <DollarSign className="w-2.5 h-2.5 text-[#8B9D83]" />
//                     <span style={{ fontFamily: FONT_FAMILY }}>৳{filters.priceRange.min || '0'} - ৳{filters.priceRange.max || '∞'}</span>
//                     <button onClick={clearPriceRange} className="ml-1 hover:text-[#8B9D83] transition-colors"><X className="w-2.5 h-2.5" /></button>
//                   </div>
//                 )}
//                 {getActiveFilterCount() > 0 && (
//                   <button onClick={clearFilters} className="px-2 py-0.5 text-[10px] text-[#8B9D83] hover:text-[#6b7d63] underline transition-colors" style={{ fontFamily: FONT_FAMILY }}>
//                     Clear All
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Products Grid */}
//           <div ref={productsContainerRef}>
//             {loading ? (
//               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
//                 {[...Array(15)].map((_, index) => (
//                   <div key={index} className="bg-white rounded-2xl border border-[#c5d5be]/30 overflow-hidden animate-pulse">
//                     <div className="h-40 bg-gradient-to-br from-[#c5d5be]/10 to-[#8B9D83]/5"></div>
//                     <div className="p-3">
//                       <div className="h-3 bg-gray-100 rounded mb-2 w-3/4"></div>
//                       <div className="h-4 bg-gray-100 rounded mb-2 w-1/2"></div>
//                       <div className="h-2 bg-gray-100 rounded w-1/3"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <>
//                 {products.length === 0 ? (
//                   <div className="text-center py-16 bg-white rounded-2xl border border-[#c5d5be]/30">
//                     <Package className="w-12 h-12 text-[#c5d5be] mx-auto mb-3" />
//                     <p className="text-sm text-gray-500 mb-3" style={{ fontFamily: FONT_FAMILY }}>No products found</p>
//                     <button onClick={clearFilters} className="px-4 py-1.5 bg-[#8B9D83] text-white text-xs font-medium rounded-full hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all" style={{ fontFamily: FONT_FAMILY }}>
//                       Clear Filters
//                     </button>
//                   </div>
//                 ) : (
//                   <>
//                     {viewMode === 'grid' ? (
//                       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
//                         {products.map(product => (
//                           <ProductGridCard key={product._id} product={product} router={router} isInCart={productsInCart[product._id] || false} onViewInCart={openCartSidebar} />
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="space-y-3">
//                         {products.map(product => (
//                           <ProductListCard key={product._id} product={product} router={router} isInCart={productsInCart[product._id] || false} onViewInCart={openCartSidebar} />
//                         ))}
//                       </div>
//                     )}

//                     {/* Pagination */}
//                     {totalPages > 1 && (
//                       <div className="flex justify-center items-center gap-1.5 mt-8">
//                         <button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1} className="px-2 py-1 border border-[#c5d5be]/30 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f0f5ed] text-xs transition-colors" style={{ fontFamily: FONT_FAMILY }}>
//                           Prev
//                         </button>
//                         {[...Array(totalPages)].map((_, i) => {
//                           const pageNum = i + 1;
//                           if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)) {
//                             return (
//                               <button key={i} onClick={() => handlePageChange(pageNum)} className={`min-w-[28px] h-7 text-xs font-medium rounded-full transition-all ${currentPage === pageNum ? 'bg-[#8B9D83] text-white shadow-md shadow-[#8B9D83]/25' : 'border border-[#c5d5be]/30 text-gray-700 hover:bg-[#f0f5ed]'}`} style={{ fontFamily: FONT_FAMILY }}>
//                                 {pageNum}
//                               </button>
//                             );
//                           } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
//                             return <span key={i} className="text-xs text-gray-400">...</span>;
//                           }
//                           return null;
//                         })}
//                         <button onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages} className="px-2 py-1 border border-[#c5d5be]/30 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f0f5ed] text-xs transition-colors" style={{ fontFamily: FONT_FAMILY }}>
//                           Next
//                         </button>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Filter Sidebar */}
//       <FilterSidebar 
//         isOpen={isFilterOpen}
//         onClose={() => setIsFilterOpen(false)}
//         expandedSections={expandedSections}
//         toggleSection={toggleSection}
//         categories={categories}
//         subcategories={subcategories}
//         childSubcategories={childSubcategories}
//         brands={brands}
//         filters={filters}
//         handleCategoryChange={handleCategoryChange}
//         handleRemoveCategory={handleRemoveCategory}
//         handleSubcategoryChange={handleSubcategoryChange}
//         handleRemoveSubcategory={handleRemoveSubcategory}
//         handleChildSubcategoryChange={handleChildSubcategoryChange}
//         handleRemoveChildSubcategory={handleRemoveChildSubcategory}
//         handleBrandChange={handleBrandChange}
//         handleRemoveBrand={handleRemoveBrand}
//         handleUnitChange={handleUnitChange}
//         handleRemoveUnit={handleRemoveUnit}
//         minPriceInput={minPriceInput}
//         maxPriceInput={maxPriceInput}
//         setMinPriceInput={setMinPriceInput}
//         setMaxPriceInput={setMaxPriceInput}
//         applyPriceRange={applyPriceRange}
//         clearPriceRange={clearPriceRange}
//         getActiveFilterCount={getActiveFilterCount}
//         clearFilters={clearFilters}
//         selectedCategory={selectedCategory}
//         selectedSubcategory={selectedSubcategory}
//         showChildSubcategory={showChildSubcategory}
//         availableUnits={availableUnits}
//         unitsLoading={unitsLoading}
//       />

//       {/* Cart Sidebar */}
//       <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />

//       <Footer />

//       <style jsx>{`
//         @keyframes loading-bar {
//           0% { transform: translateX(-100%); }
//           50% { transform: translateX(0); }
//           100% { transform: translateX(100%); }
//         }
//         .animate-loading-bar {
//           animation: loading-bar 1.5s ease-in-out infinite;
//         }
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </>
//   );
// }
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Grid,
  List,
  SlidersHorizontal,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Eye,
  Package,
  FolderTree,
  Heart,
  Building2,
  ShoppingBag,
  Star,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import CartSidebar from '../components/CartSidebar';

// ============================================================
// THEME CONSTANTS
// ============================================================
const BRAND = '#CC1D34';
const BG_CREAM = '#f7f4ef';
const TEXT_DARK = '#29362f';
const TEXT_MUTED = '#7e897e';
const TEXT_BODY = '#687169';
const SOFT_GREEN = '#edf1ea';
const BORDER_SOFT = '#e2ddd4';

const FONT_HEADING = "'Fraunces', 'Playfair Display', Georgia, serif";
const FONT_BODY = " sans-serif";

// ============================================================
// LOADING BAR
// ============================================================
const LoadingBar = ({ isVisible }) => (
  <div
    className={`fixed top-0 left-0 w-full h-0.5 z-50 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
    style={{ backgroundColor: '#e9d5d8' }}
  >
    <div
      className="h-full animate-loading-bar"
      style={{ background: `linear-gradient(to right, ${BRAND}, #e07888)` }}
    />
  </div>
);

const getUnitLabel = (unit) => {
  const units = {
    pcs: 'pcs',
    ton: 'ton',
    other: 'unit',
  };
  return units[unit] || unit || 'pcs';
};

// ============================================================
// HELPERS
// ============================================================
const formatPrice = (price) => {
  if (!price) return '0';
  const num = Number(price);
  return num.toLocaleString('en-IN', { maximumFractionDigits: 0 });
};

const truncateText = (text, limit = 60) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

const ProductGridCard = ({
  product,
  router,
  isInCart: propIsInCart,
  onViewInCart,
  onCartStatusChange,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInCart, setIsInCart] = useState(propIsInCart || false);
  const [imageErrors, setImageErrors] = useState({});
  const [hasUserNavigated, setHasUserNavigated] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likedLoading, setLikedLoading] = useState(false);

  const productId = product?._id || product?.id || 'unknown';
  const productName = product?.productName || product?.name || 'Product';
  const productSlug = product?.slug || productId;
  const regularPrice = Number(product?.regularPrice || product?.price || 0);
  const discountPrice = Number(product?.discountPrice || 0);
  const stockQuantity = Number(product?.stockQuantity || 0);

  let productImages = [];
  if (product?.images && Array.isArray(product.images)) {
    productImages = product.images
      .map((img) => {
        if (typeof img === 'string') return img;
        if (img?.url) return img.url;
        return null;
      })
      .filter(Boolean);
  }
  if (productImages.length === 0 && product?.image) {
    productImages = [
      typeof product.image === 'string' ? product.image : product.image?.url || '',
    ].filter(Boolean);
  }
  if (productImages.length === 0) productImages = ['/placeholder-product.jpg'];

  const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
  const currentPrice =
    discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
  const originalPrice = regularPrice;

  const isLowStock =
    product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
  const isOutOfStock = stockQuantity <= 0;

  const rating = product?.rating ? Number(product.rating) : 4.7;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const hasMultipleImages = productImages.length > 1;
  const hasHoverImage = productImages.length > 1;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => setIsInCart(propIsInCart || false), [propIsInCart]);

  useEffect(() => {
    if (!isHovered) {
      setHasUserNavigated(false);
      setActiveIndex(0);
    }
  }, [isHovered]);

  useEffect(() => {
    const fetchWishlistState = async () => {
      if (!productId || productId === 'unknown') return;
      try {
        const token = localStorage.getItem('token');
        const sessionId = localStorage.getItem('wishlistSessionId');
        if (!token && !sessionId) return;
        const headers = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;
        else headers['x-session-id'] = sessionId;
        const res = await fetch(
          `http://localhost:5000/api/wishlist/check/${productId}`,
          { headers }
        );
        const data = await res.json();
        if (data.success) setIsLiked(data.data.inWishlist);
      } catch (err) {
        console.error('Wishlist check error:', err);
      }
    };
    fetchWishlistState();
  }, [productId]);

  const handleToggleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (likedLoading) return;
    setLikedLoading(true);
    try {
      const token = localStorage.getItem('token');
      let sessionId = localStorage.getItem('wishlistSessionId');
      if (!token && !sessionId) {
        sessionId = `wish_session_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        localStorage.setItem('wishlistSessionId', sessionId);
      }
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else headers['x-session-id'] = sessionId;

      const response = await fetch('http://localhost:5000/api/wishlist', {
        method: 'POST',
        headers,
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      if (data.success) {
        if (data.sessionId && !token)
          localStorage.setItem('wishlistSessionId', data.sessionId);
        setIsLiked(data.isInWishlist);
        toast.success(
          data.isInWishlist ? 'Added to wishlist' : 'Removed from wishlist'
        );
        window.dispatchEvent(new Event('wishlist-update'));
      } else {
        toast.error(data.error || 'Failed to update wishlist');
      }
    } catch (error) {
      console.error('Wishlist toggle error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLikedLoading(false);
    }
  };

  const nextImage = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (hasMultipleImages) {
      setActiveIndex((p) => (p + 1) % productImages.length);
      setHasUserNavigated(true);
    }
  };
  const prevImage = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (hasMultipleImages) {
      setActiveIndex((p) => (p - 1 + productImages.length) % productImages.length);
      setHasUserNavigated(true);
    }
  };
  const goToImage = (e, i) => {
    e?.preventDefault();
    e?.stopPropagation();
    setActiveIndex(i);
    setHasUserNavigated(true);
  };
  const handleImageError = (i) => setImageErrors((p) => ({ ...p, [i]: true }));

  const getCurrentImage = () => {
    if (isHovered && hasHoverImage && !isMobile && !hasUserNavigated) {
      const hoverIndex = 1;
      if (imageErrors[hoverIndex]) return productImages[0] || '/placeholder-product.jpg';
      return productImages[hoverIndex] || productImages[0];
    }
    if (imageErrors[activeIndex]) return '/placeholder-product.jpg';
    return productImages[activeIndex] || productImages[0];
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHasUserNavigated(false);
    setActiveIndex(0);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart) {
      onViewInCart?.();
      return;
    }
    if (isOutOfStock) {
      toast.error('Product is out of stock!');
      return;
    }
    setCartStatusLoading(true);
    const toastId = toast.loading('Adding to cart...');
    try {
      const token = localStorage.getItem('token');
      let sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      if (!token && !sessionId) {
        sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        localStorage.setItem('cartSessionId', sessionId);
      }
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;

      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers,
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      const data = await response.json();
      if (data.success) {
        if (data.sessionId && !token)
          localStorage.setItem('cartSessionId', data.sessionId);
        toast.success('Added to cart!', { id: toastId });
        setIsInCart(true);
        onCartStatusChange?.(productId, true);
        window.dispatchEvent(new Event('cart-update'));
      } else {
        toast.error(data.error || 'Failed to add to cart', { id: toastId });
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Network error. Please try again.', { id: toastId });
    } finally {
      setCartStatusLoading(false);
    }
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/product/${productSlug}`);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className="h-2.5 w-2.5 fill-current text-yellow-400 sm:h-3 sm:w-3"
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-2.5 w-2.5 sm:h-3 sm:w-3">
            <Star className="absolute h-2.5 w-2.5 text-gray-200 sm:h-3 sm:w-3" />
            <div className="absolute left-0 top-0 h-2.5 w-1/2 overflow-hidden sm:h-3">
              <Star className="h-2.5 w-2.5 fill-current text-yellow-400 sm:h-3 sm:w-3" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star
            key={i}
            className="h-2.5 w-2.5 text-gray-300 sm:h-3 sm:w-3"
          />
        );
      }
    }
    return stars;
  };

  return (
    <div
      className="group h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/product/${productSlug}`} className="block h-full">
        <article className="relative flex h-full flex-col">
          {/* IMAGE SECTION — aspect 0.79 like Featured */}
          <div className="relative aspect-[0.79] w-full overflow-hidden bg-[#f5f5f5]">
            <Image
              src={getCurrentImage()}
              alt={productName}
              fill
              sizes="(max-width: 640px) 48vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              className={`object-cover transition-transform duration-500 ease-out ${
                isHovered ? 'scale-[1.03]' : 'scale-100'
              }`}
              onError={() =>
                handleImageError(
                  isHovered && hasHoverImage && !isMobile && !hasUserNavigated
                    ? 1
                    : activeIndex
                )
              }
              quality={90}
            />

            {/* Subtle darkening on hover */}
            <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/[0.03]" />

            {/* Radial gradient for icon visibility */}
            <div
              className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 ${
                isMobile ? 'opacity-100' : isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                background:
                  'radial-gradient(circle 130px at 100% 0%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.28) 35%, rgba(0,0,0,0.10) 65%, rgba(0,0,0,0) 100%)',
              }}
            />

            {/* Discount badge */}
            {discountPercent > 0 && (
              <div className="absolute left-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#d92f45] text-white shadow-md">
                <span className="text-center text-[10px] font-bold leading-none">
                  {discountPercent}%
                  <br />
                  OFF
                </span>
              </div>
            )}

            {/* Out of stock */}
            {isOutOfStock && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/55">
                <span className="rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white">
                  Out of Stock
                </span>
              </div>
            )}

            {/* Low stock */}
            {!isOutOfStock && isLowStock && (
              <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 rounded bg-orange-500 px-2 py-1 text-[9px] font-medium text-white shadow-md">
                <AlertTriangle className="h-2.5 w-2.5" />
                <span>Only {stockQuantity} left</span>
              </div>
            )}

            {/* HOVER ACTION ICONS — vertical stack top-right */}
            <div
              className={`absolute right-2.5 top-2.5 z-30 flex flex-col gap-2.5 transition-all duration-300 ease-out ${
                isMobile
                  ? 'translate-x-0 opacity-100'
                  : isHovered
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-3 opacity-0'
              }`}
            >
              {/* Wishlist */}
              <button
                type="button"
                onClick={handleToggleLike}
                disabled={likedLoading}
                aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
                className="group/btn flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] transition-all duration-200 hover:scale-125 disabled:opacity-60"
              >
                {likedLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Heart
                    className={`h-5 w-5 transition-all duration-200 ${
                      isLiked
                        ? 'fill-[#d92f45] text-[#d92f45]'
                        : 'fill-transparent text-white group-hover/btn:text-[#d92f45] group-hover/btn:fill-[#d92f45]'
                    }`}
                  />
                )}
              </button>

              {/* Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock || cartStatusLoading}
                aria-label={isInCart ? 'View in cart' : 'Add to cart'}
                className={`flex items-center justify-center rounded-full transition-all duration-200 hover:scale-125 disabled:cursor-not-allowed disabled:opacity-60 ${
                  isInCart
                    ? 'h-6 w-6 bg-[#d92f45] text-white shadow-md'
                    : 'h-5 w-5 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]'
                }`}
              >
                {cartStatusLoading ? (
                  <Loader2
                    className={`animate-spin ${
                      isInCart ? 'h-3.5 w-3.5' : 'h-5 w-5'
                    }`}
                  />
                ) : (
                  <ShoppingBag className={isInCart ? 'h-3.5 w-3.5' : 'h-5 w-5'} />
                )}
              </button>

              {/* Eye / quick view */}
              <button
                type="button"
                onClick={handleViewDetails}
                aria-label="Quick view"
                className="group/btn flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] transition-all duration-200 hover:scale-125"
              >
                <Eye className="h-5 w-5 transition-colors duration-200 group-hover/btn:text-[#d92f45]" />
              </button>
            </div>

            {/* Image navigation dots */}
            {hasMultipleImages && (
              <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    prevImage(e);
                  }}
                  className="rounded-full p-0.5"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-3 w-3 text-white drop-shadow-md sm:h-4 sm:w-4" />
                </button>

                <div className="flex items-center gap-1.5">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        goToImage(e, index);
                      }}
                      className={`rounded-full transition-all duration-200 ${
                        activeIndex === index
                          ? 'h-1.5 w-1.5 bg-white'
                          : 'h-1 w-1 bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    nextImage(e);
                  }}
                  className="rounded-full p-0.5"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-3 w-3 text-white drop-shadow-md sm:h-4 sm:w-4" />
                </button>
              </div>
            )}
          </div>

          {/* PRODUCT DETAILS — Featured style */}
          <div className="pt-2">
            <h3
              className="line-clamp-2 min-h-[42px] text-[15px] font-normal leading-[1.35] text-[#292929] sm:text-[16px] lg:text-[17px]"
              style={{ fontFamily: FONT_BODY }}
              title={productName}
            >
              {truncateText(productName, 60)}
            </h3>

            <div className="mt-0.5 flex items-center gap-1">
              <div className="flex items-center gap-0.5">{renderStars()}</div>
              <span className="text-[11px] font-normal text-[#292929]">
                {rating.toFixed(1)}
              </span>
            </div>

            <div className="-mt-1 flex items-center justify-between gap-2">
              <p
                className="text-[16px] font-normal text-[#292929] sm:text-[17px]"
                style={{ fontFamily: FONT_BODY }}
              >
                Tk. {formatPrice(currentPrice)}
                {discountPercent > 0 && (
                  <span className="ml-2 text-[12px] text-gray-400 line-through">
                    Tk. {formatPrice(originalPrice)}
                  </span>
                )}
              </p>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock || cartStatusLoading}
                aria-label={isInCart ? 'View in cart' : 'Add to cart'}
                className={`flex shrink-0 items-center justify-center transition-all duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-60 ${
                  isInCart
                    ? 'h-8 w-8 rounded-full bg-[#d92f45] text-white shadow-md'
                    : isOutOfStock
                    ? 'h-9 w-9 text-gray-300'
                    : 'h-9 w-9 text-[#d92f45] hover:text-[#b82238]'
                }`}
              >
                {cartStatusLoading ? (
                  <Loader2
                    className={`animate-spin ${
                      isInCart ? 'h-4 w-4' : 'h-5 w-5'
                    }`}
                  />
                ) : (
                  <ShoppingBag
                    className={isInCart ? 'h-4 w-4' : 'h-5 w-5'}
                    strokeWidth={1.8}
                  />
                )}
              </button>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
};

// ============================================================
// PRODUCT LIST CARD
// ============================================================
const ProductListCard = ({
  product,
  router,
  isInCart: propIsInCart,
  onViewInCart,
  onCartStatusChange,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(propIsInCart || false);
  const [imageErrors, setImageErrors] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [likedLoading, setLikedLoading] = useState(false);

  const productId = product?._id || product?.id || 'unknown';
  const productName = product?.productName || product?.name || 'Product';
  const productSlug = product?.slug || productId;
  const regularPrice = Number(product?.regularPrice || product?.price || 0);
  const discountPrice = Number(product?.discountPrice || 0);
  const stockQuantity = Number(product?.stockQuantity || 0);

  const brand = product?.brand
    ? typeof product.brand === 'string'
      ? product.brand
      : product.brand?.name || product.brand?.title || 'General'
    : product?.brandName || 'General';

  const categoryName = product?.category?.name || product?.categoryName || '';

  let productImages = [];
  if (product?.images && Array.isArray(product.images)) {
    productImages = product.images
      .map((img) => {
        if (typeof img === 'string') return img;
        if (img?.url) return img.url;
        return null;
      })
      .filter(Boolean);
  }
  if (productImages.length === 0 && product?.image) {
    productImages = [
      typeof product.image === 'string'
        ? product.image
        : product.image?.url || '',
    ].filter(Boolean);
  }
  if (productImages.length === 0) productImages = ['/placeholder-product.jpg'];

  let tagNames = [];
  if (product?.tags && Array.isArray(product.tags)) {
    tagNames = product.tags
      .map((tag) => {
        if (typeof tag === 'string') return tag;
        if (tag?.name) return tag.name;
        return null;
      })
      .filter(Boolean);
  }
  const primaryTag = tagNames[0] || null;

  const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
  const currentPrice =
    discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
  const originalPrice = regularPrice;

  const isLowStock =
    product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
  const isOutOfStock = stockQuantity <= 0;

  const rating = product?.rating ? Number(product.rating) : 4.7;
  const reviewCount =
    product?.reviewStats?.totalReviews || product?.reviews?.length || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const hasMultipleImages = productImages.length > 1;

  useEffect(() => setIsInCart(propIsInCart || false), [propIsInCart]);

  useEffect(() => {
    const fetchWishlistState = async () => {
      if (!productId || productId === 'unknown') return;
      try {
        const token = localStorage.getItem('token');
        const sessionId = localStorage.getItem('wishlistSessionId');
        if (!token && !sessionId) return;
        const headers = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;
        else headers['x-session-id'] = sessionId;
        const res = await fetch(
          `http://localhost:5000/api/wishlist/check/${productId}`,
          { headers }
        );
        const data = await res.json();
        if (data.success) setIsLiked(data.data.inWishlist);
      } catch (err) {
        console.error('Wishlist check error:', err);
      }
    };
    fetchWishlistState();
  }, [productId]);

  const handleToggleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (likedLoading) return;
    setLikedLoading(true);
    try {
      const token = localStorage.getItem('token');
      let sessionId = localStorage.getItem('wishlistSessionId');
      if (!token && !sessionId) {
        sessionId = `wish_session_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        localStorage.setItem('wishlistSessionId', sessionId);
      }
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else headers['x-session-id'] = sessionId;

      const response = await fetch('http://localhost:5000/api/wishlist', {
        method: 'POST',
        headers,
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      if (data.success) {
        if (data.sessionId && !token)
          localStorage.setItem('wishlistSessionId', data.sessionId);
        setIsLiked(data.isInWishlist);
        toast.success(
          data.isInWishlist ? 'Added to wishlist' : 'Removed from wishlist'
        );
        window.dispatchEvent(new Event('wishlist-update'));
      } else {
        toast.error(data.error || 'Failed to update wishlist');
      }
    } catch (error) {
      console.error('Wishlist toggle error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLikedLoading(false);
    }
  };

  const nextImage = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (hasMultipleImages)
      setActiveIndex((prev) => (prev + 1) % productImages.length);
  };
  const prevImage = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (hasMultipleImages)
      setActiveIndex(
        (prev) => (prev - 1 + productImages.length) % productImages.length
      );
  };
  const goToImage = (e, index) => {
    e?.preventDefault();
    e?.stopPropagation();
    setActiveIndex(index);
  };
  const handleImageError = (index) =>
    setImageErrors((prev) => ({ ...prev, [index]: true }));

  const getCurrentImage = () => {
    const image = productImages[activeIndex] || productImages[0];
    if (imageErrors[activeIndex]) return '/placeholder-product.jpg';
    return image;
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart) {
      if (onViewInCart) onViewInCart();
      return;
    }
    if (isOutOfStock) {
      toast.error('Product is out of stock!');
      return;
    }
    setCartStatusLoading(true);
    const toastId = toast.loading('Adding to cart...');
    try {
      const token = localStorage.getItem('token');
      let sessionId = localStorage.getItem('cartSessionId');
      const headers = { 'Content-Type': 'application/json' };
      if (!token && !sessionId) {
        sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        localStorage.setItem('cartSessionId', sessionId);
      }
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;

      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers,
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      const data = await response.json();
      if (data.success) {
        if (data.sessionId && !token)
          localStorage.setItem('cartSessionId', data.sessionId);
        toast.success('Added to cart!', { id: toastId });
        setIsInCart(true);
        onCartStatusChange?.(productId, true);
        window.dispatchEvent(new Event('cart-update'));
      } else {
        toast.error(data.error || 'Failed to add to cart', { id: toastId });
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Network error. Please try again.', { id: toastId });
    } finally {
      setCartStatusLoading(false);
    }
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/product/${productSlug}`);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-3 w-3 fill-current text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-3 w-3">
            <Star className="absolute h-3 w-3 text-gray-200" />
            <div className="absolute left-0 top-0 h-3 w-1/2 overflow-hidden">
              <Star className="h-3 w-3 fill-current text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="h-3 w-3 text-gray-300" />);
      }
    }
    return stars;
  };

  const getDescription = () => {
    const fullDesc = product.fullDescription?.replace(/<[^>]*>/g, '') || '';
    const shortDesc = product.shortDescription?.replace(/<[^>]*>/g, '') || '';
    const desc = fullDesc || shortDesc || 'No description available';
    return desc.length > 110 ? desc.substring(0, 110) + '...' : desc;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${productSlug}`} className="block">
        <article
          className="relative flex flex-row gap-3 rounded-xl border bg-white p-2.5 transition-all duration-300 hover:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.12)] sm:gap-4 sm:p-3"
          style={{ borderColor: BORDER_SOFT }}
        >
          {/* ============================================ */}
          {/* LEFT: IMAGE with hover icons + arrows        */}
          {/* ============================================ */}
          <div className="relative h-[120px] w-[100px] shrink-0 overflow-hidden rounded-lg bg-[#f5f5f5] sm:h-[140px] sm:w-[115px] md:h-[155px] md:w-[125px]">
            <img
              src={getCurrentImage()}
              alt={productName}
              className={`h-full w-full object-cover transition-transform duration-500 ease-out ${
                isHovered ? 'scale-105' : 'scale-100'
              }`}
              onError={() => handleImageError(activeIndex)}
              loading="lazy"
            />

            {/* Dark gradient overlay on hover for icon visibility */}
            <div
              className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.35) 100%)',
              }}
            />

            {/* Discount badge */}
            {discountPercent > 0 && (
              <div className="absolute left-1.5 top-1.5 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#d92f45] text-white shadow-md">
                <span className="text-center text-[8px] font-bold leading-none">
                  {discountPercent}%
                  <br />
                  OFF
                </span>
              </div>
            )}

            {/* Out of stock */}
            {isOutOfStock && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/55">
                <span className="rounded-full bg-black px-2 py-1 text-[9px] font-medium text-white">
                  Out of Stock
                </span>
              </div>
            )}

            {/* ============ HOVER ICONS (top-right) ============ */}
            <div
              className={`absolute right-1.5 top-1.5 z-30 flex flex-col gap-1.5 transition-all duration-300 ${
                isHovered
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-2 opacity-0'
              }`}
            >
              {/* Love / wishlist */}
              <button
                type="button"
                onClick={handleToggleLike}
                disabled={likedLoading}
                aria-label={
                  isLiked ? 'Remove from wishlist' : 'Add to wishlist'
                }
                className="group/btn flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] transition-all hover:scale-125 disabled:opacity-60"
              >
                {likedLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Heart
                    className={`h-4 w-4 transition-all ${
                      isLiked
                        ? 'fill-[#d92f45] text-[#d92f45]'
                        : 'fill-transparent text-white group-hover/btn:text-[#d92f45] group-hover/btn:fill-[#d92f45]'
                    }`}
                  />
                )}
              </button>

              {/* Cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock || cartStatusLoading}
                aria-label={isInCart ? 'View in cart' : 'Add to cart'}
                className={`flex items-center justify-center rounded-full transition-all hover:scale-125 disabled:cursor-not-allowed disabled:opacity-60 ${
                  isInCart
                    ? 'h-5 w-5 bg-[#d92f45] text-white shadow-md'
                    : 'h-4 w-4 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]'
                }`}
              >
                {cartStatusLoading ? (
                  <Loader2
                    className={`animate-spin ${
                      isInCart ? 'h-3 w-3' : 'h-4 w-4'
                    }`}
                  />
                ) : (
                  <ShoppingBag
                    className={isInCart ? 'h-3 w-3' : 'h-4 w-4'}
                  />
                )}
              </button>

              {/* View / quick view */}
              <button
                type="button"
                onClick={handleViewDetails}
                aria-label="Quick view"
                className="group/btn flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] transition-all hover:scale-125"
              >
                <Eye className="h-4 w-4 transition-colors group-hover/btn:text-[#d92f45]" />
              </button>
            </div>

            {/* ============ LEFT / RIGHT ARROWS ============ */}
            {hasMultipleImages && isHovered && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  aria-label="Previous image"
                  className="absolute left-1 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/90 p-1 shadow-md transition-all hover:scale-110 hover:bg-white"
                >
                  <ChevronLeft
                    className="h-3 w-3"
                    style={{ color: TEXT_DARK }}
                  />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  aria-label="Next image"
                  className="absolute right-1 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/90 p-1 shadow-md transition-all hover:scale-110 hover:bg-white"
                >
                  <ChevronRight
                    className="h-3 w-3"
                    style={{ color: TEXT_DARK }}
                  />
                </button>
              </>
            )}
{/* ============ Bottom row: arrows + dots (no bg) ============ */}
{hasMultipleImages && (
  <div className="absolute bottom-1.5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5">
    <button
      type="button"
      onClick={prevImage}
      aria-label="Previous image"
      className="flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] transition-transform hover:scale-125"
    >
      <ChevronLeft className="h-3.5 w-3.5" />
    </button>

    <div className="flex items-center gap-1">
      {productImages.map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={(e) => goToImage(e, index)}
          className={`rounded-full transition-all ${
            activeIndex === index
              ? 'h-1 w-3.5 bg-white'
              : 'h-1 w-1 bg-white/60 hover:bg-white/90'
          }`}
          aria-label={`Go to image ${index + 1}`}
        />
      ))}
    </div>

    <button
      type="button"
      onClick={nextImage}
      aria-label="Next image"
      className="flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] transition-transform hover:scale-125"
    >
      <ChevronRight className="h-3.5 w-3.5" />
    </button>
  </div>
)}
          </div>

          {/* ============================================ */}
          {/* RIGHT: DETAILS                               */}
          {/* ============================================ */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Brand · Category */}
            <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
              <span
                className="text-[9px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: BRAND, fontFamily: FONT_BODY }}
              >
                {brand}
              </span>
              {categoryName && (
                <>
                  <span
                    className="h-1 w-1 rounded-full"
                    style={{ backgroundColor: TEXT_MUTED }}
                  />
                  <span
                    className="text-[9px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
                  >
                    {categoryName}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h3
              className="mb-0.5 line-clamp-2 text-[13px] font-semibold leading-snug sm:text-sm"
              style={{ color: TEXT_DARK, fontFamily: FONT_BODY }}
              title={productName}
            >
              {productName}
            </h3>

            {/* Rating */}
            <div className="mb-1 flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">{renderStars()}</div>
              <span
                className="text-[10px] font-medium"
                style={{ color: TEXT_DARK, fontFamily: FONT_BODY }}
              >
                {rating.toFixed(1)}
              </span>
              {reviewCount > 0 && (
                <>
                  <span style={{ color: TEXT_MUTED }}>•</span>
                  <span
                    className="text-[10px]"
                    style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
                  >
                    {reviewCount}
                  </span>
                </>
              )}
            </div>

            {/* Description (hidden on <sm) */}
            <p
              className="mb-1.5 hidden line-clamp-1 text-[11px] leading-relaxed sm:block"
              style={{ color: TEXT_BODY, fontFamily: FONT_BODY }}
            >
              {getDescription()}
            </p>

            {/* Price + button (pushed to bottom) */}
            <div className="mt-auto flex flex-wrap items-end justify-between gap-2">
              <div className="flex items-baseline gap-1.5">
                <span
                  className="text-base font-bold tracking-tight sm:text-lg"
                  style={{ color: TEXT_DARK, fontFamily: FONT_BODY }}
                >
                  ৳{formatPrice(currentPrice)}
                </span>
                {discountPercent > 0 && (
                  <span
                    className="text-[10px] line-through"
                    style={{ color: TEXT_MUTED }}
                  >
                    ৳{formatPrice(originalPrice)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span
                    className="rounded px-1.5 py-0.5 text-[9px] font-semibold text-white"
                    style={{ backgroundColor: BRAND, fontFamily: FONT_BODY }}
                  >
                    -{discountPercent}%
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock || cartStatusLoading}
                aria-label={isInCart ? 'View in cart' : 'Add to cart'}
                className="flex h-8 items-center justify-center gap-1.5 rounded-full px-3.5 text-[10px] font-semibold text-white transition-all hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60 sm:text-[11px]"
                style={{
                  backgroundColor: isOutOfStock
                    ? '#b5b5b5'
                    : isInCart
                    ? '#8f1729'
                    : BRAND,
                  fontFamily: FONT_BODY,
                }}
              >
                {cartStatusLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <>
                    <ShoppingBag className="h-3 w-3" strokeWidth={2} />
                    <span>{isInCart ? 'In Bag' : 'Add to Bag'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
};
// ============================================================
// RIGHT SIDEBAR FILTER PANEL
// ============================================================
const FilterSidebar = ({
  isOpen,
  onClose,
  activeSection,
  categories,
  subcategories,
  childSubcategories,
  brands,
  filters,
  handleCategoryChange,
  handleSubcategoryChange,
  handleChildSubcategoryChange,
  handleBrandChange,
  minPriceInput,
  maxPriceInput,
  setMinPriceInput,
  setMaxPriceInput,
  applyPriceRange,
  clearPriceRange,
  getActiveFilterCount,
  clearFilters,
  selectedCategory,
  showChildSubcategory,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-[2px]"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed right-0 top-0 z-[100] flex h-screen w-[85vw] flex-col shadow-2xl sm:w-[340px] lg:w-1/5 lg:min-w-[280px] lg:max-w-[340px]"
            style={{ backgroundColor: BG_CREAM }}
          >
            <div
              className="flex h-[56px] shrink-0 items-center justify-between border-b px-4"
              style={{ borderColor: BORDER_SOFT }}
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal
                  size={15}
                  strokeWidth={1.6}
                  style={{ color: BRAND }}
                />
                <h3
                  className="text-[12px] font-semibold uppercase tracking-[0.08em]"
                  style={{ color: TEXT_DARK, fontFamily: FONT_BODY }}
                >
                  {activeSection === 'categories'
                    ? 'Categories'
                    : activeSection === 'price'
                    ? 'Price Range'
                    : activeSection === 'brands'
                    ? 'Brands'
                    : 'Filters'}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close filters"
                className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black/5"
                style={{ color: TEXT_MUTED }}
              >
                <X size={17} strokeWidth={1.8} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {getActiveFilterCount() > 0 && (
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.15em]"
                    style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
                  >
                    {getActiveFilterCount()} active
                  </span>
                  <button
                    onClick={clearFilters}
                    className="text-[11px] font-medium underline"
                    style={{ color: BRAND, fontFamily: FONT_BODY }}
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* PRICE RANGE */}
              {(activeSection === 'all' || activeSection === 'price') && (
                <div className="mb-6">
                  <h4
                    className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em]"
                    style={{ color: TEXT_DARK, fontFamily: FONT_BODY }}
                  >
                    Price Range
                  </h4>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        inputMode="decimal"
                        value={minPriceInput}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v === '' || /^\d*\.?\d*$/.test(v)) setMinPriceInput(v);
                        }}
                        placeholder="Min"
                        className="w-full rounded border bg-white px-2.5 py-2 text-[12px] focus:outline-none"
                        style={{ color: TEXT_DARK, borderColor: BORDER_SOFT }}
                      />
                      <span style={{ color: TEXT_MUTED }}>—</span>
                      <input
                        type="text"
                        inputMode="decimal"
                        value={maxPriceInput}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v === '' || /^\d*\.?\d*$/.test(v)) setMaxPriceInput(v);
                        }}
                        placeholder="Max"
                        className="w-full rounded border bg-white px-2.5 py-2 text-[12px] focus:outline-none"
                        style={{ color: TEXT_DARK, borderColor: BORDER_SOFT }}
                      />
                    </div>

                    <button
                      onClick={applyPriceRange}
                      disabled={!minPriceInput && !maxPriceInput}
                      className="w-full rounded py-2 text-[12px] font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50"
                      style={{ backgroundColor: BRAND, fontFamily: FONT_BODY }}
                    >
                      Apply
                    </button>

                    {(filters.priceRange.min || filters.priceRange.max) && (
                      <div
                        className="flex items-center justify-between rounded border p-2"
                        style={{
                          backgroundColor: SOFT_GREEN,
                          borderColor: BORDER_SOFT,
                        }}
                      >
                        <span
                          className="text-[11px] font-medium"
                          style={{ color: TEXT_DARK }}
                        >
                          Tk {filters.priceRange.min || '0'} — Tk{' '}
                          {filters.priceRange.max || '∞'}
                        </span>
                        <button
                          onClick={clearPriceRange}
                          className="hover:opacity-70"
                          style={{ color: BRAND }}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    )}
                  </div>

                  {activeSection === 'all' && (
                    <div
                      className="mt-6 border-t pt-5"
                      style={{ borderColor: BORDER_SOFT }}
                    />
                  )}
                </div>
              )}

              {/* CATEGORIES */}
              {(activeSection === 'all' || activeSection === 'categories') && (
                <div className="mb-6">
                  <h4
                    className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em]"
                    style={{ color: TEXT_DARK, fontFamily: FONT_BODY }}
                  >
                    Categories
                  </h4>

                  <div className="space-y-2">
                    {categories.map((c) => (
                      <label
                        key={c._id}
                        className="flex cursor-pointer items-center gap-2.5 py-0.5"
                      >
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(c._id)}
                          onChange={() => handleCategoryChange(c._id)}
                          className="h-4 w-4 rounded"
                          style={{ accentColor: BRAND }}
                        />
                        <span
                          className="text-[12.5px]"
                          style={{ color: TEXT_DARK, fontFamily: FONT_BODY }}
                        >
                          {c.name}
                        </span>
                      </label>
                    ))}
                  </div>

                  {selectedCategory && subcategories.length > 0 && (
                    <div
                      className="mt-4 border-t pt-4"
                      style={{ borderColor: BORDER_SOFT }}
                    >
                      <h5
                        className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em]"
                        style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
                      >
                        Subcategories
                      </h5>
                      <div className="space-y-2">
                        {subcategories.map((s) => (
                          <label
                            key={s._id}
                            className="flex cursor-pointer items-center gap-2.5 py-0.5"
                          >
                            <input
                              type="checkbox"
                              checked={filters.subcategories.includes(s._id)}
                              onChange={() => handleSubcategoryChange(s._id)}
                              className="h-4 w-4 rounded"
                              style={{ accentColor: BRAND }}
                            />
                            <span
                              className="text-[12.5px]"
                              style={{ color: TEXT_DARK, fontFamily: FONT_BODY }}
                            >
                              {s.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {showChildSubcategory && childSubcategories.length > 0 && (
                    <div
                      className="mt-4 border-t pt-4"
                      style={{ borderColor: BORDER_SOFT }}
                    >
                      <h5
                        className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em]"
                        style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
                      >
                        Child Subcategories
                      </h5>
                      <div className="space-y-2">
                        {childSubcategories.map((c) => (
                          <label
                            key={c._id}
                            className="flex cursor-pointer items-center gap-2.5 py-0.5"
                          >
                            <input
                              type="checkbox"
                              checked={filters.childSubcategories.includes(c._id)}
                              onChange={() => handleChildSubcategoryChange(c._id)}
                              className="h-4 w-4 rounded"
                              style={{ accentColor: BRAND }}
                            />
                            <span
                              className="text-[12.5px]"
                              style={{ color: TEXT_DARK, fontFamily: FONT_BODY }}
                            >
                              {c.name}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeSection === 'all' && (
                    <div
                      className="mt-6 border-t pt-5"
                      style={{ borderColor: BORDER_SOFT }}
                    />
                  )}
                </div>
              )}

              {/* BRANDS */}
              {(activeSection === 'all' || activeSection === 'brands') && (
                <div className="mb-6">
                  <h4
                    className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em]"
                    style={{ color: TEXT_DARK, fontFamily: FONT_BODY }}
                  >
                    Brands
                  </h4>

                  <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                    {brands.length === 0 ? (
                      <p
                        className="text-[12px]"
                        style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
                      >
                        No brands available
                      </p>
                    ) : (
                      brands.map((brand, i) => (
                        <label
                          key={brand._id || brand.name || i}
                          className="flex cursor-pointer items-center gap-2.5 py-0.5"
                        >
                          <input
                            type="checkbox"
                            checked={filters.brands.includes(brand.name)}
                            onChange={() => handleBrandChange(brand.name)}
                            className="h-4 w-4 rounded"
                            style={{ accentColor: BRAND }}
                          />
                          <span
                            className="text-[12.5px]"
                            style={{ color: TEXT_DARK, fontFamily: FONT_BODY }}
                          >
                            {brand.name}
                          </span>
                        </label>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

// ============================================================
// MAIN PAGE
// ============================================================
export default function ProductsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilterSection, setActiveFilterSection] = useState('all');
  const [subcategories, setSubcategories] = useState([]);
  const [childSubcategories, setChildSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showChildSubcategory, setShowChildSubcategory] = useState(false);
  const [productsInCart, setProductsInCart] = useState({});
  const [forceFetch, setForceFetch] = useState(0);
  const [brands, setBrands] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');

  const scrollPositionRef = useRef(0);
  const searchTimerRef = useRef(null);

  const [filters, setFilters] = useState({
    search: '',
    categories: [],
    subcategories: [],
    childSubcategories: [],
    brands: [],
    priceRange: { min: '', max: '' },
    sortBy: 'newest',
  });

  const [searchInput, setSearchInput] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');
  const [initialCategorySet, setInitialCategorySet] = useState(false);

  const ITEMS_PER_PAGE = 20;

  const openCartSidebar = () => setIsCartOpen(true);
  const closeCartSidebar = () => setIsCartOpen(false);

  const saveScrollPosition = () => {
    scrollPositionRef.current = window.scrollY;
  };
  const restoreScrollPosition = () => {
    if (scrollPositionRef.current > 0) {
      window.scrollTo({ top: scrollPositionRef.current, behavior: 'instant' });
    }
  };

  const debouncedSearch = useCallback((val) => {
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      saveScrollPosition();
      setFilters((prev) => ({ ...prev, search: val }));
      setCurrentPage(1);
    }, 500);
  }, []);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchInput(val);
    debouncedSearch(val);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    saveScrollPosition();
    setFilters((prev) => ({ ...prev, search: '' }));
    setCurrentPage(1);
  };

  const openFilterSidebar = (section) => {
    setActiveFilterSection(section);
    setIsFilterOpen(true);
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/categories/with-products');
      const data = await res.json();
      if (data.success) setCategories(data.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await fetch(
        'http://localhost:5000/api/products/brands/with-products'
      );
      const data = await res.json();
      if (data.success) setBrands(data.data);
    } catch (err) {
      console.error('Error fetching brands:', err);
    }
  };

  // Fetch subcategories for a given category
  const fetchSubcategories = async (categoryId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/categories/${categoryId}/subcategories`
      );
      const data = await res.json();
      if (data.success && Array.isArray(data.data.subcategories)) {
        setSubcategories(data.data.subcategories);
        return data.data.subcategories;
      }
      setSubcategories([]);
      return [];
    } catch (err) {
      console.error(err);
      setSubcategories([]);
      return [];
    }
  };

  // Fetch child subcategories for a given subcategory
  const fetchChildSubcategories = async (categoryId, subcategoryId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/categories/${categoryId}/subcategories/${subcategoryId}/children`
      );
      const data = await res.json();
      if (data.success && Array.isArray(data.data.children)) {
        setChildSubcategories(data.data.children);
        setShowChildSubcategory(data.data.children.length > 0);
        return data.data.children;
      }
      setChildSubcategories([]);
      setShowChildSubcategory(false);
      return [];
    } catch (err) {
      console.error(err);
      setChildSubcategories([]);
      setShowChildSubcategory(false);
      return [];
    }
  };

const lastProcessedUrlRef = useRef('');

useEffect(() => {
  if (categories.length === 0) return;

  const categoryParam = searchParams.get('category');
  const subcategoryParam = searchParams.get('subcategory');
  const childParam = searchParams.get('childSubcategory');

  // Signature of just the URL params
  const urlSig = `${categoryParam || ''}|${subcategoryParam || ''}|${
    childParam || ''
  }`;

  // Signature including the loaded data so we retry when data arrives
  const fullSig = `${urlSig}::${subcategories.length}::${childSubcategories.length}`;

  if (lastProcessedUrlRef.current === fullSig) return;
  lastProcessedUrlRef.current = fullSig;

  // -------- Resolve everything --------
  if (!categoryParam) {
    setFilters((prev) => {
      if (
        prev.categories.length === 0 &&
        prev.subcategories.length === 0 &&
        prev.childSubcategories.length === 0
      ) {
        return prev; // no change
      }
      return {
        ...prev,
        categories: [],
        subcategories: [],
        childSubcategories: [],
      };
    });
    setActiveCategoryFilter('all');
    setCurrentPage(1);
    setForceFetch((prev) => prev + 1);
    return;
  }

  const matchedCategory = categories.find(
    (cat) => cat._id === categoryParam || cat.slug === categoryParam
  );
  if (!matchedCategory) return;

  const newCategoryId = matchedCategory._id;
  let newSubcategoryId = null;
  let newChildId = null;

  if (subcategoryParam) {
    let matchedSub = subcategories.find(
      (s) => s._id === subcategoryParam || s.slug === subcategoryParam
    );
    if (!matchedSub && matchedCategory.subcategories) {
      matchedSub = matchedCategory.subcategories.find(
        (s) => s._id === subcategoryParam || s.slug === subcategoryParam
      );
    }
    if (matchedSub) {
      newSubcategoryId = matchedSub._id;

      if (childParam) {
        let matchedChild = matchedSub.children?.find(
          (c) => c._id === childParam || c.slug === childParam
        );
        if (!matchedChild) {
          matchedChild = childSubcategories.find(
            (c) => c._id === childParam || c.slug === childParam
          );
        }
        if (matchedChild) {
          newChildId = matchedChild._id;
        } else if (newSubcategoryId) {
          // Trigger fetch — will re-run effect when children arrive
          fetchChildSubcategories(newCategoryId, newSubcategoryId);
          // Invalidate signature so next run re-checks
          lastProcessedUrlRef.current = '';
          return;
        }
      }
    }
  }

  // -------- Apply --------
  setFilters((prev) => {
    const sameCat = prev.categories[0] === newCategoryId;
    const sameSub =
      (prev.subcategories[0] || null) === (newSubcategoryId || null);
    const sameChild =
      (prev.childSubcategories[0] || null) === (newChildId || null);

    if (sameCat && sameSub && sameChild) return prev; // no change

    return {
      ...prev,
      categories: [newCategoryId],
      subcategories: newSubcategoryId ? [newSubcategoryId] : [],
      childSubcategories: newChildId ? [newChildId] : [],
    };
  });

  setActiveCategoryFilter(newCategoryId);
  setCurrentPage(1);
  setForceFetch((prev) => prev + 1);
  // eslint-disable-next-line
}, [searchParams, categories, subcategories, childSubcategories]);

  // ------------------------------------------------------------
  // When filters.categories changes → fetch subcategories
  // ------------------------------------------------------------
  useEffect(() => {
    if (filters.categories.length === 1) {
      const categoryId = filters.categories[0];
      setSelectedCategory(categoryId);
      fetchSubcategories(categoryId);
    } else {
      setSubcategories([]);
      setSelectedCategory(null);
      setChildSubcategories([]);
      setShowChildSubcategory(false);
    }
    // eslint-disable-next-line
  }, [filters.categories]);

  // ------------------------------------------------------------
  // When filters.subcategories has 1 item → fetch children
  // (do NOT clear children here — that's handled by the toggle handlers)
  // ------------------------------------------------------------
  useEffect(() => {
    const categoryId = filters.categories[0] || null;
    if (filters.subcategories.length === 1 && categoryId) {
      const subcategoryId = filters.subcategories[0];
      fetchChildSubcategories(categoryId, subcategoryId);
    }
    // eslint-disable-next-line
  }, [filters.subcategories, filters.categories]);

  // ------------------------------------------------------------
  // Initial category set from URL
  // ------------------------------------------------------------
  useEffect(() => {
    if (categories.length > 0 && !initialCategorySet) {
      const categoryParam = searchParams.get('category');
      if (categoryParam) {
        const matched = categories.find(
          (cat) => cat._id === categoryParam || cat.slug === categoryParam
        );
        if (matched) {
          setFilters((prev) => ({ ...prev, categories: [matched._id] }));
          setActiveCategoryFilter(matched._id);
        }
      }
      setInitialCategorySet(true);
    }
  }, [categories, searchParams]);

  // ------------------------------------------------------------
  // Fetch products when filters change
  // ------------------------------------------------------------
  useEffect(() => {
    if (initialCategorySet) fetchProducts();
    // eslint-disable-next-line
  }, [
    filters.categories,
    filters.subcategories,
    filters.childSubcategories,
    filters.brands,
    filters.priceRange,
    filters.search,
    filters.sortBy,
    currentPage,
    initialCategorySet,
    forceFetch,
  ]);

  useEffect(() => {
    if (!loading) restoreScrollPosition();
  }, [loading]);

  // ------------------------------------------------------------
  // Cart status check
  // ------------------------------------------------------------
  const checkAllProductsCartStatus = async (productIds) => {
    if (!productIds || productIds.length === 0) return;
    const token = localStorage.getItem('token');
    let sessionId = localStorage.getItem('cartSessionId');
    if (!token && !sessionId) {
      sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem('cartSessionId', sessionId);
    }
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    else if (sessionId) headers['x-session-id'] = sessionId;

    try {
      const res = await fetch('http://localhost:5000/api/cart/check-status', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds }),
      });
      const data = await res.json();
      if (data.success) setProductsInCart(data.data);
    } catch (err) {
      console.error('Error checking cart status:', err);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      const ids = products.map((p) => p._id);
      checkAllProductsCartStatus(ids);
    }
  }, [products]);

  useEffect(() => {
    const refresh = async () => {
      if (products.length === 0) return;
      const ids = products.map((p) => p._id);
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;
      try {
        const res = await fetch('http://localhost:5000/api/cart/check-status', {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds: ids }),
        });
        const data = await res.json();
        if (data.success) setProductsInCart(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    const handler = () => refresh();
    window.addEventListener('cart-update', handler);
    return () => window.removeEventListener('cart-update', handler);
  }, [products]);

  // ------------------------------------------------------------
  // Navbar event: category filter changed
  // ------------------------------------------------------------
  useEffect(() => {
    const handleCategoryFilterChange = (event) => {
      const categoryId = event.detail?.categoryId;
      const url = new URL(window.location.href);
      url.searchParams.delete('subcategory');
      url.searchParams.delete('childSubcategory');

      if (categoryId) {
        saveScrollPosition();
        setFilters((prev) => ({
          ...prev,
          categories: [categoryId],
          subcategories: [],
          childSubcategories: [],
        }));
        setActiveCategoryFilter(categoryId);
        setCurrentPage(1);
        setForceFetch((prev) => prev + 1);
        url.searchParams.set('category', categoryId);
      } else if (event.detail?.categoryId === null) {
        saveScrollPosition();
        setFilters((prev) => ({
          ...prev,
          categories: [],
          subcategories: [],
          childSubcategories: [],
        }));
        setActiveCategoryFilter('all');
        setCurrentPage(1);
        setForceFetch((prev) => prev + 1);
        url.searchParams.delete('category');
      }
      window.history.pushState({}, '', url);
    };
    window.addEventListener('categoryFilterChanged', handleCategoryFilterChange);
    return () =>
      window.removeEventListener('categoryFilterChanged', handleCategoryFilterChange);
  }, []);

  // ------------------------------------------------------------
  // Fetch products
  // ------------------------------------------------------------
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      q.append('page', currentPage);
      q.append('limit', ITEMS_PER_PAGE);
      if (filters.search) q.append('search', filters.search);
      if (filters.categories.length > 0)
        filters.categories.forEach((c) => q.append('category', c));
      if (filters.subcategories.length > 0)
        filters.subcategories.forEach((s) => q.append('subcategory', s));
      if (filters.childSubcategories.length > 0)
        filters.childSubcategories.forEach((c) => q.append('childSubcategory', c));
      if (filters.brands.length > 0)
        filters.brands.forEach((b) => q.append('brand', b));
      if (filters.priceRange.min) q.append('minPrice', filters.priceRange.min);
      if (filters.priceRange.max) q.append('maxPrice', filters.priceRange.max);

      let sort = 'newest';
      switch (filters.sortBy) {
        case 'price_low':
          sort = 'price_asc';
          break;
        case 'price_high':
          sort = 'price_desc';
          break;
        case 'name_asc':
          sort = 'name_asc';
          break;
        default:
          sort = 'newest';
      }
      q.append('sort', sort);

      const res = await fetch(`http://localhost:5000/api/products?${q.toString()}`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalProducts(data.pagination?.total || 0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------------------
  // Category change (sidebar)
  // ------------------------------------------------------------
  const handleCategoryChange = (categoryId) => {
    saveScrollPosition();
    setFilters((prev) => {
      const next = prev.categories.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId];
      return { ...prev, categories: next, subcategories: [], childSubcategories: [] };
    });
    setChildSubcategories([]);
    setShowChildSubcategory(false);
    setCurrentPage(1);

    const isSelected = !filters.categories.includes(categoryId);
    const newCategory = isSelected ? categoryId : null;
    setActiveCategoryFilter(newCategory || 'all');
    const params = new URLSearchParams(window.location.search);
    if (newCategory) params.set('category', newCategory);
    else params.delete('category');
    params.delete('subcategory');
    params.delete('childSubcategory');
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`
    );
    window.dispatchEvent(
      new CustomEvent('categoryFilterChanged', { detail: { categoryId: newCategory } })
    );
  };

  const handleRemoveCategory = (categoryId) => {
    saveScrollPosition();
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.filter((id) => id !== categoryId),
      subcategories: [],
      childSubcategories: [],
    }));
    setSubcategories([]);
    setChildSubcategories([]);
    setShowChildSubcategory(false);
    setActiveCategoryFilter('all');
    setCurrentPage(1);
    const params = new URLSearchParams(window.location.search);
    params.delete('category');
    params.delete('subcategory');
    params.delete('childSubcategory');
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`
    );
    window.dispatchEvent(
      new CustomEvent('categoryFilterChanged', { detail: { categoryId: null } })
    );
  };

  // ------------------------------------------------------------
  // Subcategory change (sidebar) — updates URL + fetches children
  // ------------------------------------------------------------
  const handleSubcategoryChange = (subId) => {
    saveScrollPosition();

    const isCurrentlySelected = filters.subcategories.includes(subId);
    const nextSubs = isCurrentlySelected
      ? filters.subcategories.filter((id) => id !== subId)
      : [...filters.subcategories, subId];

    setFilters((prev) => ({
      ...prev,
      subcategories: nextSubs,
      childSubcategories: [], // reset children when sub list changes
    }));
    setChildSubcategories([]);
    setShowChildSubcategory(false);
    setCurrentPage(1);

    // Update URL
    const params = new URLSearchParams(window.location.search);
    params.delete('childSubcategory');

    if (nextSubs.length === 0) {
      params.delete('subcategory');
    } else {
      params.set('subcategory', subId);
    }

    window.history.pushState(
      {},
      '',
      `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`
    );

    setForceFetch((prev) => prev + 1);
  };

  const handleRemoveSubcategory = (subId) => {
    saveScrollPosition();

    setFilters((prev) => ({
      ...prev,
      subcategories: prev.subcategories.filter((id) => id !== subId),
      childSubcategories: [],
    }));
    setChildSubcategories([]);
    setShowChildSubcategory(false);
    setCurrentPage(1);

    const params = new URLSearchParams(window.location.search);
    params.delete('subcategory');
    params.delete('childSubcategory');

    window.history.pushState(
      {},
      '',
      `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`
    );

    setForceFetch((prev) => prev + 1);
  };

  // ------------------------------------------------------------
  // Child subcategory change (sidebar) — updates URL
  // ------------------------------------------------------------
  const handleChildSubcategoryChange = (cid) => {
    saveScrollPosition();

    const isCurrentlySelected = filters.childSubcategories.includes(cid);
    const nextChildren = isCurrentlySelected
      ? filters.childSubcategories.filter((id) => id !== cid)
      : [...filters.childSubcategories, cid];

    setFilters((prev) => ({
      ...prev,
      childSubcategories: nextChildren,
    }));
    setCurrentPage(1);

    const params = new URLSearchParams(window.location.search);

    // Ensure subcategory is in URL for context
    if (filters.subcategories[0] && !params.get('subcategory')) {
      params.set('subcategory', filters.subcategories[0]);
    }

    if (nextChildren.length === 0) {
      params.delete('childSubcategory');
    } else {
      params.set('childSubcategory', cid);
    }

    window.history.pushState(
      {},
      '',
      `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`
    );

    setForceFetch((prev) => prev + 1);
  };

  const handleRemoveChildSubcategory = (cid) => {
    saveScrollPosition();

    setFilters((prev) => ({
      ...prev,
      childSubcategories: prev.childSubcategories.filter((id) => id !== cid),
    }));
    setCurrentPage(1);

    const params = new URLSearchParams(window.location.search);
    params.delete('childSubcategory');

    window.history.pushState(
      {},
      '',
      `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`
    );

    setForceFetch((prev) => prev + 1);
  };

  // ------------------------------------------------------------
  // Brand, price, clear, pagination
  // ------------------------------------------------------------
  const handleBrandChange = (brand) => {
    saveScrollPosition();
    setFilters((prev) => {
      const next = prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand];
      return { ...prev, brands: next };
    });
    setCurrentPage(1);
    setForceFetch((prev) => prev + 1);
  };

  const handleRemoveBrand = (brand) => {
    saveScrollPosition();
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.filter((b) => b !== brand),
    }));
    setCurrentPage(1);
    setForceFetch((prev) => prev + 1);
  };

  const applyPriceRange = () => {
    saveScrollPosition();
    setFilters((prev) => ({
      ...prev,
      priceRange: { min: minPriceInput || '', max: maxPriceInput || '' },
    }));
    setCurrentPage(1);
    setForceFetch((prev) => prev + 1);
  };

  const clearPriceRange = () => {
    saveScrollPosition();
    setMinPriceInput('');
    setMaxPriceInput('');
    setFilters((prev) => ({ ...prev, priceRange: { min: '', max: '' } }));
    setCurrentPage(1);
    setForceFetch((prev) => prev + 1);
  };

  const clearFilters = () => {
    saveScrollPosition();
    setSearchInput('');
    setFilters({
      search: '',
      categories: [],
      subcategories: [],
      childSubcategories: [],
      brands: [],
      priceRange: { min: '', max: '' },
      sortBy: 'newest',
    });
    setSubcategories([]);
    setChildSubcategories([]);
    setShowChildSubcategory(false);
    setActiveCategoryFilter('all');
    setMinPriceInput('');
    setMaxPriceInput('');
    setCurrentPage(1);
    window.history.pushState({}, '', window.location.pathname);
    window.dispatchEvent(
      new CustomEvent('categoryFilterChanged', { detail: { categoryId: null } })
    );
    setForceFetch((prev) => prev + 1);
  };

  const handlePageChange = (newPage) => {
    saveScrollPosition();
    setCurrentPage(newPage);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.subcategories.length > 0) count += filters.subcategories.length;
    if (filters.childSubcategories.length > 0)
      count += filters.childSubcategories.length;
    if (filters.brands.length > 0) count += filters.brands.length;
    if (filters.priceRange.min || filters.priceRange.max) count++;
    return count;
  };

  const onCartStatusChange = useCallback((productId, isInCart) => {
    setProductsInCart((prev) => ({ ...prev, [productId]: isInCart }));
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, []);

  // ------------------------------------------------------------
  // Active filter items for the pills row
  // ------------------------------------------------------------
  const activeFilterItems = (() => {
    const items = [];

    if (filters.search) {
      items.push({
        key: `search-${filters.search}`,
        label: `Search: "${filters.search}"`,
        onRemove: handleClearSearch,
      });
    }

    filters.categories.forEach((catId) => {
      const c = categories.find((x) => x._id === catId);
      if (c) {
        items.push({
          key: `cat-${catId}`,
          label: c.name,
          onRemove: () => handleRemoveCategory(catId),
        });
      }
    });

    filters.subcategories.forEach((subId) => {
      const s = subcategories.find((x) => x._id === subId);
      if (s) {
        items.push({
          key: `sub-${subId}`,
          label: s.name,
          onRemove: () => handleRemoveSubcategory(subId),
        });
      }
    });

    filters.childSubcategories.forEach((cid) => {
      const c = childSubcategories.find((x) => x._id === cid);
      if (c) {
        items.push({
          key: `child-${cid}`,
          label: c.name,
          onRemove: () => handleRemoveChildSubcategory(cid),
        });
      }
    });

    filters.brands.forEach((brand, i) => {
      items.push({
        key: `brand-${brand || i}`,
        label: brand,
        onRemove: () => handleRemoveBrand(brand),
      });
    });

    if (filters.priceRange.min || filters.priceRange.max) {
      items.push({
        key: 'price',
        label: `Tk ${filters.priceRange.min || '0'} - ${
          filters.priceRange.max || '∞'
        }`,
        onRemove: clearPriceRange,
      });
    }

    return items;
  })();

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <>
      <LoadingBar isVisible={loading} />
      <Navbar />

      <main className="relative min-h-screen" style={{ backgroundColor: BG_CREAM }}>
        {/* BANNER */}
        <section className="relative h-[140px] overflow-hidden sm:h-[170px] -mt-16">
          <Image
            src="/images/probg.jpg"
            alt="Shop banner"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
            <h1
              className="mb-3 text-[20px] font-semibold tracking-wide text-white sm:text-[26px]"
              style={{ fontFamily: FONT_HEADING }}
            >
              SHOP ALL PRODUCTS
            </h1>
            <div className="w-full max-w-md">
              <div className="relative flex items-center overflow-hidden rounded-full border border-white/20 bg-white shadow-sm">
                <Search
                  className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2"
                  style={{ color: TEXT_MUTED }}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  className="w-full bg-transparent py-2.5 pl-11 pr-11 text-sm focus:outline-none"
                  style={{ color: TEXT_DARK, fontFamily: FONT_BODY }}
                />
                {searchInput && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 rounded-full p-1"
                    style={{ color: TEXT_MUTED }}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* BREADCRUMB */}
        <div className="px-4 pt-4 sm:px-6 lg:px-10">
          <div
            className="flex items-center gap-2 text-[11px] sm:text-xs"
            style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
          >
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span>/</span>
            <span>Products</span>
            {filters.categories.length > 0 && (
              <>
                <span>/</span>
                <span style={{ color: TEXT_DARK }}>
                  {categories.find((c) => c._id === filters.categories[0])?.name ||
                    'Category'}
                </span>
              </>
            )}
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="px-4 pb-4 pt-3 sm:px-6 lg:px-10">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <span
              className="mr-1 shrink-0 text-xs font-semibold sm:text-sm"
              style={{ color: TEXT_DARK, fontFamily: FONT_BODY }}
            >
              Filters:
            </span>

            <button
              type="button"
              onClick={() => openFilterSidebar('all')}
              className="flex h-[31px] w-[47px] shrink-0 items-center justify-center border transition"
              style={{
                borderColor: TEXT_DARK,
                color: TEXT_DARK,
                backgroundColor: '#fff',
              }}
              aria-label="Open all filters"
            >
              <SlidersHorizontal size={17} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={() => openFilterSidebar('categories')}
              className="flex h-[31px] shrink-0 items-center gap-2 border px-3 text-xs transition sm:text-sm"
              style={{
                borderColor: TEXT_DARK,
                color: TEXT_DARK,
                backgroundColor: '#fff',
                fontFamily: FONT_BODY,
              }}
            >
              <span>Categories</span>
              <ChevronDown size={13} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={() => openFilterSidebar('price')}
              className="flex h-[31px] shrink-0 items-center gap-2 border px-3 text-xs transition sm:text-sm"
              style={{
                borderColor: TEXT_DARK,
                color: TEXT_DARK,
                backgroundColor: '#fff',
                fontFamily: FONT_BODY,
              }}
            >
              <span>Price Range</span>
              <ChevronDown size={13} strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={() => openFilterSidebar('brands')}
              className="flex h-[31px] shrink-0 items-center gap-2 border px-3 text-xs transition sm:text-sm"
              style={{
                borderColor: TEXT_DARK,
                color: TEXT_DARK,
                backgroundColor: '#fff',
                fontFamily: FONT_BODY,
              }}
            >
              <span>Brands</span>
              <ChevronDown size={13} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* TOOLBAR */}
      {/* TOOLBAR */}
<div className="px-4 pb-4 sm:px-6 lg:px-10">
  <div className="flex flex-wrap items-center justify-between gap-3">
    {/* LEFT: Grid/List toggle (desktop only) + item count */}
    <div className="flex items-center gap-1">
      <div className="hidden items-center gap-1 md:flex">
        <button
          type="button"
          onClick={() => setViewMode('grid')}
          className="flex h-[31px] w-[31px] items-center justify-center transition"
          style={
            viewMode === 'grid'
              ? { backgroundColor: BRAND, color: '#fff' }
              : {
                  border: `1px solid ${BORDER_SOFT}`,
                  color: TEXT_MUTED,
                  backgroundColor: '#fff',
                }
          }
          aria-label="Grid view"
        >
          <Grid size={14} />
        </button>
        <button
          type="button"
          onClick={() => setViewMode('list')}
          className="flex h-[31px] w-[31px] items-center justify-center transition"
          style={
            viewMode === 'list'
              ? { backgroundColor: BRAND, color: '#fff' }
              : {
                  border: `1px solid ${BORDER_SOFT}`,
                  color: TEXT_MUTED,
                  backgroundColor: '#fff',
                }
          }
          aria-label="List view"
        >
          <List size={14} />
        </button>
      </div>

    </div>

    {/* RIGHT: Sort dropdown */}
    <label
      className="flex items-center gap-2 text-[11px]"
      style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
    >
      <span>Sort By:</span>
      <select
        value={filters.sortBy}
        onChange={(e) => {
          const val = e.target.value;
          setFilters((prev) => ({ ...prev, sortBy: val }));
          setCurrentPage(1);
        }}
        className="border bg-white px-2 py-1.5 text-[11px] focus:outline-none"
        style={{
          borderColor: BORDER_SOFT,
          color: TEXT_DARK,
          fontFamily: FONT_BODY,
        }}
      >
        <option value="newest">Newest</option>
        <option value="price_low">Price: Low → High</option>
        <option value="price_high">Price: High → Low</option>
        <option value="name_asc">Name: A → Z</option>
      </select>
    </label>
  </div>
</div>

        {/* ACTIVE FILTERS */}
        {activeFilterItems.length > 0 && (
          <div className="px-4 pb-4 sm:px-6 lg:px-10">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-[11px] font-semibold"
                style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
              >
                Active:
              </span>

              {activeFilterItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={item.onRemove}
                  className="group flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-all hover:opacity-80"
                  style={{
                    borderColor: BRAND,
                    color: BRAND,
                    backgroundColor: '#fff',
                    fontFamily: FONT_BODY,
                  }}
                >
                  <span className="font-medium">{item.label}</span>
                  <X
                    size={11}
                    strokeWidth={2.5}
                    className="transition-transform group-hover:scale-125"
                  />
                </button>
              ))}

              <button
                type="button"
                onClick={clearFilters}
                className="text-[11px] underline"
                style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
              >
                Clear all
              </button>
            </div>
          </div>
        )}

        {/* PRODUCTS */}
        <div className="px-4 pb-16 sm:px-6 lg:px-10">
          {loading ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-5'
                  : 'grid grid-cols-1 gap-5'
              }
            >
              {[...Array(10)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] w-full bg-[#f0f0f2]" />
                  <div className="pt-2.5">
                    <div className="mb-2 h-3 w-3/4 rounded bg-gray-100" />
                    <div className="h-3 w-1/2 rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div
              className="rounded-2xl border bg-white py-16 text-center"
              style={{ borderColor: BORDER_SOFT }}
            >
              <Package
                className="mx-auto mb-3 h-12 w-12"
                style={{ color: TEXT_MUTED }}
              />
              <p
                className="mb-3 text-sm"
                style={{ color: TEXT_BODY, fontFamily: FONT_BODY }}
              >
                No products found
              </p>
              <button
                onClick={clearFilters}
                className="rounded-full px-4 py-1.5 text-xs font-medium text-white"
                style={{ backgroundColor: BRAND, fontFamily: FONT_BODY }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-5">
                  {products.map((p) => (
                    <ProductGridCard
                      key={p._id}
                      product={p}
                      router={router}
                      isInCart={productsInCart[p._id] || false}
                      onViewInCart={openCartSidebar}
                      onCartStatusChange={onCartStatusChange}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {products.map((p) => (
                    <ProductListCard
                      key={p._id}
                      product={p}
                      router={router}
                      isInCart={productsInCart[p._id] || false}
                      onViewInCart={openCartSidebar}
                      onCartStatusChange={onCartStatusChange}
                    />
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div
                  className="mt-12 flex items-center justify-center border-t pt-6"
                  style={{ borderColor: BORDER_SOFT }}
                >
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                      disabled={currentPage === 1}
                      className="flex h-8 w-8 items-center justify-center border disabled:cursor-not-allowed disabled:opacity-30"
                      style={{
                        borderColor: BORDER_SOFT,
                        color: TEXT_MUTED,
                        backgroundColor: '#fff',
                      }}
                    >
                      <ChevronLeft size={12} />
                    </button>
                    {[...Array(totalPages)].map((_, i) => {
                      const p = i + 1;
                      if (
                        p === 1 ||
                        p === totalPages ||
                        (p >= currentPage - 1 && p <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handlePageChange(p)}
                            className={`h-8 w-8 text-[10px] font-medium transition ${
                              currentPage === p ? 'text-white' : ''
                            }`}
                            style={
                              currentPage === p
                                ? { backgroundColor: BRAND }
                                : {
                                    border: `1px solid ${BORDER_SOFT}`,
                                    color: TEXT_DARK,
                                    backgroundColor: '#fff',
                                  }
                            }
                          >
                            {p}
                          </button>
                        );
                      } else if (
                        p === currentPage - 2 ||
                        p === currentPage + 2
                      ) {
                        return (
                          <span
                            key={i}
                            className="text-xs"
                            style={{ color: TEXT_MUTED }}
                          >
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                    <button
                      type="button"
                      onClick={() =>
                        handlePageChange(Math.min(currentPage + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="flex h-8 w-8 items-center justify-center border disabled:cursor-not-allowed disabled:opacity-30"
                      style={{
                        borderColor: BORDER_SOFT,
                        color: TEXT_MUTED,
                        backgroundColor: '#fff',
                      }}
                    >
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* RIGHT SIDEBAR */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        activeSection={activeFilterSection}
        categories={categories}
        subcategories={subcategories}
        childSubcategories={childSubcategories}
        brands={brands}
        filters={filters}
        handleCategoryChange={handleCategoryChange}
        handleSubcategoryChange={handleSubcategoryChange}
        handleChildSubcategoryChange={handleChildSubcategoryChange}
        handleBrandChange={handleBrandChange}
        minPriceInput={minPriceInput}
        maxPriceInput={maxPriceInput}
        setMinPriceInput={setMinPriceInput}
        setMaxPriceInput={setMaxPriceInput}
        applyPriceRange={applyPriceRange}
        clearPriceRange={clearPriceRange}
        getActiveFilterCount={getActiveFilterCount}
        clearFilters={clearFilters}
        selectedCategory={selectedCategory}
        showChildSubcategory={showChildSubcategory}
      />

      <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />

      <Footer />

      <style jsx>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}