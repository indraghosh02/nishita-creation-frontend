
// 'use client';

// import { useState, useEffect, Suspense, useRef } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import Link from 'next/link';
// import { 
//   Search, 
//   Package, 
//   Loader2,
//   ChevronRight,
//   TrendingUp,
//   ArrowRight,
//   ShoppingBag,
//   FolderOpen,
//   Eye,
//   ShoppingCart,
//   ChevronUp,
//   Zap,
//   CheckCircle,
//   Clock,
//   Star,
//   ChevronLeft,
//   Building2,
//   AlertTriangle,
//   X,
//   Filter,
//   SlidersHorizontal,
//   Flower2,
//   Flame,
//   Sparkles
// } from 'lucide-react';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import { toast } from 'sonner';
// import CartSidebar from '../components/CartSidebar';

// // Font constants - Beauty Bucket Style
// const FONT_FAMILY = "'Playfair Display', Georgia, serif";
// const FONT_FAMILY_CURSIVE = "'Courgette', cursive";

// // ========== LOADING BAR COMPONENT ==========
// const LoadingBar = ({ isVisible }) => {
//   return (
//     <div className={`fixed top-0 left-0 w-full h-0.5 bg-[#c5d5be] z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
//       <div className="h-full bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] animate-loading-bar"></div>
//     </div>
//   );
// };

// // ========== HELPER FUNCTIONS ==========
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

// const stripHtml = (html) => {
//   if (!html) return '';
//   if (typeof window !== 'undefined') {
//     const tmp = document.createElement('div');
//     tmp.innerHTML = html;
//     return tmp.textContent || tmp.innerText || '';
//   }
//   return html.replace(/<[^>]*>/g, '');
// };

// // ========== PRODUCT GRID CARD - Matches ProductsClient Design ==========
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

// // ========== CATEGORY CARD - Green Theme ==========
// function CategoryCard({ category, index }) {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.4) }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       className="flex-shrink-0 w-56 sm:w-72 md:w-80 lg:w-96"
//     >
//       <Link href={`/products?category=${category._id}`}>
//         <motion.div 
//           className="cursor-pointer group/card flex h-32 sm:h-40 md:h-38 overflow-hidden rounded-2xl border border-[#c5d5be]/40"
//           style={{
//             background: isHovered 
//               ? 'linear-gradient(135deg, #8B9D83 0%, #6b7d63 100%)'
//               : 'linear-gradient(135deg, #f0f5ed 0%, #c5d5be/30 100%)',
//             boxShadow: isHovered 
//               ? '0 12px 40px rgba(139, 157, 131, 0.25)' 
//               : '0 2px 8px rgba(139, 157, 131, 0.06)',
//             transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
//             transition: 'all 0.3s ease',
//           }}
//         >
//           {/* Left - Content (60%) */}
//           <div className="flex-1 p-3 sm:p-4 md:p-5 flex flex-col justify-between">
//             <div>
//               <h3 
//                 className="text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300 line-clamp-2"
//                 style={{
//                   color: isHovered ? '#FFFFFF' : '#263b32',
//                   fontFamily: FONT_FAMILY
//                 }}
//               >
//                 {category.name}
//               </h3>
//               <p 
//                 className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 line-clamp-3 transition-colors duration-300"
//                 style={{
//                   color: isHovered ? 'rgba(255,255,255,0.8)' : '#53645a',
//                   fontFamily: FONT_FAMILY
//                 }}
//               >
//                 {category.description || 'Premium products for your needs'}
//               </p>
//             </div>
            
//             <div className="flex items-center gap-2 mt-2 sm:mt-3">
//               <span 
//                 className="text-[10px] sm:text-xs font-medium flex items-center gap-1 transition-all duration-300 group-hover:gap-2"
//                 style={{
//                   color: isHovered ? '#FFFFFF' : '#8B9D83',
//                   fontFamily: FONT_FAMILY
//                 }}
//               >
//                 Browse
//                 <ArrowRight 
//                   className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:translate-x-1" 
//                   style={{
//                     color: isHovered ? '#FFFFFF' : '#8B9D83',
//                   }}
//                 />
//               </span>
//               <div 
//                 className="w-6 sm:w-8 h-0.5 rounded-full transition-all duration-300"
//                 style={{
//                   background: isHovered 
//                     ? 'linear-gradient(to right, rgba(255,255,255,0.5), rgba(255,255,255,0.1))'
//                     : 'linear-gradient(to right, #8B9D83, rgba(139, 157, 131, 0.1))',
//                 }}
//               />
//             </div>
//           </div>

//           {/* Right - Image (40%) */}
//           <div className="w-[40%] h-full flex-shrink-0 overflow-hidden relative p-1.5 sm:p-2">
//             <div className="w-full h-full overflow-hidden rounded-lg">
//               <img
//                 src={category.image}
//                 alt={category.name}
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 loading="lazy"
//                 onError={(e) => {
//                   e.target.onerror = null;
//                   e.target.src = 'https://images.unsplash.com/photo-1609091839311-d34b4f9d9c3a?w=400&h=400&fit=crop';
//                 }}
//               />
//             </div>
            
//             {/* Subtle gradient overlay */}
//             <div 
//               className="absolute inset-0 pointer-events-none"
//               style={{
//                 background: isHovered 
//                   ? 'linear-gradient(to left, rgba(139, 157, 131, 0.15), transparent)'
//                   : 'linear-gradient(to left, rgba(139, 157, 131, 0.05), transparent)',
//                 transition: 'all 0.3s ease',
//               }}
//             />
//           </div>
//         </motion.div>
//       </Link>
//     </motion.div>
//   );
// }

// // ========== ANIMATED ARROW ==========
// function AnimatedArrow({ show, direction, onClick, Icon }) {
//   if (!show) return null;

//   return (
//     <motion.button
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.8 }}
//       onClick={onClick}
//       className={`absolute top-1/2 -translate-y-1/2 z-20 text-[#8B9D83] hover:text-[#465641] transition-all duration-300 p-1 ${
//         direction === 'left' ? '-left-5' : '-right-5'
//       }`}
//       whileHover={{ scale: 1.2 }}
//       whileTap={{ scale: 0.9 }}
//     >
//       <Icon className="w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9" strokeWidth={1.5} />
//     </motion.button>
//   );
// }

// // ========== SEARCH CONTENT ==========
// function SearchContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const query = searchParams.get('q') || '';
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchInput, setSearchInput] = useState(query);
//   const [displayCount, setDisplayCount] = useState(8);
//   const [showAll, setShowAll] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [productsInCart, setProductsInCart] = useState({});
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [forceFetch, setForceFetch] = useState(0);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const [showRightArrow, setShowRightArrow] = useState(false);
//   const scrollContainerRef = useRef(null);
//   const searchTimeoutRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Initial search on page load
//   useEffect(() => {
//     if (query) {
//       performSearch(query);
//     } else {
//       setLoading(false);
//     }
//   }, [query]);

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchInput(value);
    
//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current);
//     }
    
//     if (!value.trim()) {
//       setResults([]);
//       setCategories([]);
//       router.push('/search');
//       return;
//     }
    
//     searchTimeoutRef.current = setTimeout(() => {
//       router.push(`/search?q=${encodeURIComponent(value)}`);
//       performSearch(value);
//     }, 500);
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (searchInput.trim()) {
//       if (searchTimeoutRef.current) {
//         clearTimeout(searchTimeoutRef.current);
//       }
//       router.push(`/search?q=${encodeURIComponent(searchInput)}`);
//       performSearch(searchInput);
//     }
//   };

//   const performSearch = async (searchQuery) => {
//     if (!searchQuery || !searchQuery.trim()) {
//       setResults([]);
//       setCategories([]);
//       setLoading(false);
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const response = await fetch(`http://localhost:5000/api/products?search=${encodeURIComponent(searchQuery)}&limit=50`);
//       const data = await response.json();
      
//       if (data.success) {
//         setResults(data.data);
//         await fetchRelatedCategories(searchQuery);
//       } else {
//         setResults([]);
//       }
//     } catch (error) {
//       console.error('Search error:', error);
//       setResults([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchRelatedCategories = async (searchQuery) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/categories`);
//       const data = await response.json();
      
//       if (data.success) {
//         const matchedCategories = data.data
//           .filter(category => 
//             category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             category.description?.toLowerCase().includes(searchQuery.toLowerCase())
//           )
//           .map((cat, index) => ({
//             _id: cat._id,
//             name: cat.name,
//             description: cat.description || 'Premium products for your needs',
//             image: cat.image?.url || `https://images.unsplash.com/photo-1609091839311-d34b4f9d9c3a?w=400&h=400&fit=crop`,
//             slug: cat.slug,
//             productCount: cat.productCount || 0,
//           }));
        
//         setCategories(matchedCategories.slice(0, 8));
//         setTimeout(() => checkScroll(), 100);
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       setCategories([]);
//     }
//   };

//   const checkScroll = () => {
//     if (scrollContainerRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
//       setShowLeftArrow(scrollLeft > 20);
//       setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
//     }
//   };

//   const scroll = (direction) => {
//     if (scrollContainerRef.current) {
//       const cardWidth = scrollContainerRef.current.children[0]?.offsetWidth || 200;
//       const gap = 16;
//       const scrollAmount = (cardWidth + gap) * 2;
      
//       const newScrollLeft = direction === 'left' 
//         ? scrollContainerRef.current.scrollLeft - scrollAmount
//         : scrollContainerRef.current.scrollLeft + scrollAmount;
      
//       scrollContainerRef.current.scrollTo({
//         left: newScrollLeft,
//         behavior: 'smooth'
//       });
//     }
//   };

//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (container) {
//       container.addEventListener('scroll', checkScroll);
//       checkScroll();
//       window.addEventListener('resize', checkScroll);
//       return () => {
//         container.removeEventListener('scroll', checkScroll);
//         window.removeEventListener('resize', checkScroll);
//       };
//     }
//   }, [categories]);

//   useEffect(() => {
//     return () => {
//       if (searchTimeoutRef.current) {
//         clearTimeout(searchTimeoutRef.current);
//       }
//     };
//   }, []);

//   const handleShowMore = () => {
//     setDisplayCount(prev => prev + 8);
//     setShowAll(true);
//   };

//   const handleShowLess = () => {
//     setDisplayCount(8);
//     setShowAll(false);
//     const productsSection = document.getElementById('products-section');
//     if (productsSection) {
//       productsSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   // Check cart status for products
//   useEffect(() => {
//     const checkAllProductsCartStatus = async () => {
//       if (results.length === 0) return;
//       const productIds = results.map(p => p._id);
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
//       } catch (error) {
//         console.error('Error checking cart status:', error);
//       }
//     };
//     checkAllProductsCartStatus();
//   }, [results, forceFetch]);

//   useEffect(() => {
//     const handleCartUpdate = async () => {
//       if (results.length === 0) return;
//       const productIds = results.map(p => p._id);
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
//       } catch (error) {
//         console.error('Error refreshing cart status:', error);
//       }
//     };
    
//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => window.removeEventListener('cart-update', handleCartUpdate);
//   }, [results]);

//   const openCartSidebar = () => setIsCartOpen(true);
//   const closeCartSidebar = () => setIsCartOpen(false);

//   const displayedProducts = results.slice(0, displayCount);

//   return (
//     <>
//       <LoadingBar isVisible={loading} />
//       <Navbar />
      
//       {/* Hero Section - Green Theme */}
//       <div className="bg-gradient-to-r from-[#f0f5ed] via-white to-[#f0f5ed] border-b border-[#c5d5be]/30">
//         <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
//           <div className="flex flex-col items-center">
//             <div className="flex items-center justify-center gap-3">
//               <Flower2 className="w-6 h-6 text-[#8B9D83]" />
//               <h1 className="text-2xl md:text-4xl font-bold text-[#263b32] text-center" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>
//                 Search <span className="text-[#8B9D83]">Results</span>
//               </h1>
//               <Flower2 className="w-6 h-6 text-[#8B9D83]" />
//             </div>
//             <p className="text-[#53645a] text-center text-sm mt-1" style={{ fontFamily: FONT_FAMILY }}>
//               {loading ? 'Searching...' : `Found ${results.length} ${results.length === 1 ? 'result' : 'results'} for`}
//             </p>
            
//             {/* Search Bar */}
//             <div className="w-full max-w-2xl mt-4 md:mt-5">
//               <form onSubmit={handleSearchSubmit}>
//                 <div className="relative flex items-center bg-white border border-[#c5d5be]/40 rounded-full shadow-sm overflow-hidden focus-within:border-[#8B9D83] focus-within:ring-2 focus-within:ring-[#8B9D83]/20 transition-all">
//                   <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search beauty products..."
//                     value={searchInput}
//                     onChange={handleSearchChange}
//                     className="w-full pl-11 pr-28 py-2.5 text-sm border-0 focus:outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
//                     style={{ fontFamily: FONT_FAMILY }}
//                   />
//                   {searchInput && (
//                     <button 
//                       type="button"
//                       onClick={() => {
//                         setSearchInput('');
//                         setResults([]);
//                         setCategories([]);
//                         router.push('/search');
//                       }} 
//                       className="absolute right-14 p-1.5 text-gray-400 hover:text-[#8B9D83] rounded-full transition-colors"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   )}
//                   <button
//                     type="submit"
//                     className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white text-xs font-medium rounded-full hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all"
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     Search
//                   </button>
//                 </div>
//               </form>
              
//               {query && !loading && results.length > 0 && (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.3 }}
//                   className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#c5d5be]/40 rounded-full shadow-sm"
//                 >
//                   <span className="text-[10px] text-gray-500" style={{ fontFamily: FONT_FAMILY }}>Showing results for:</span>
//                   <span className="font-semibold text-[#8B9D83] text-xs" style={{ fontFamily: FONT_FAMILY }}>"{query}"</span>
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Results Section */}
//       <div className="py-8 md:py-12 bg-white">
//         <div className="container mx-auto px-4 max-w-7xl">
//           {/* Result Stats */}
//           {!loading && results.length > 0 && (
//             <div className="mb-4">
//               <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f0f5ed] rounded-full border border-[#c5d5be]/40">
//                 <TrendingUp className="w-3.5 h-3.5 text-[#8B9D83]" />
//                 <span className="text-[10px] text-[#53645a]" style={{ fontFamily: FONT_FAMILY }}>
//                   {results.length} {results.length === 1 ? 'result' : 'results'} found
//                 </span>
//               </div>
//             </div>
//           )}

//           {/* Loading State */}
//           {loading && (
//             <div className="flex flex-col items-center justify-center py-16 md:py-20">
//               <div className="relative">
//                 <div className="w-16 h-16 border-4 border-[#c5d5be]/40 rounded-full"></div>
//                 <div className="absolute top-0 left-0 w-16 h-16 border-4 border-[#8B9D83] rounded-full border-t-transparent animate-spin"></div>
//               </div>
//               <p className="mt-4 text-base text-[#53645a] animate-pulse" style={{ fontFamily: FONT_FAMILY }}>Searching through our collection...</p>
//             </div>
//           )}

//           {/* No Results */}
//           {!loading && results.length === 0 && searchInput && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-center py-16 bg-white rounded-2xl border border-[#c5d5be]/40"
//             >
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-[#f0f5ed] rounded-full mb-4">
//                 <Search className="w-10 h-10 text-[#c5d5be]" />
//               </div>
//               <h2 className="text-2xl font-bold text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>No results found</h2>
//               <p className="text-base text-[#53645a] mb-6 max-w-md mx-auto px-4" style={{ fontFamily: FONT_FAMILY }}>
//                 We couldn't find anything matching "{searchInput}". Try different keywords or browse our categories.
//               </p>
//               <div className="flex flex-wrap items-center justify-center gap-4">
//                 <Link
//                   href="/products"
//                   className="px-6 py-2 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white font-medium rounded-full hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all"
//                   style={{ fontFamily: FONT_FAMILY }}
//                 >
//                   Browse Products
//                 </Link>
//               </div>
//             </motion.div>
//           )}

//           {/* Initial State - No search query */}
//           {!loading && results.length === 0 && !searchInput && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-center py-16 bg-white rounded-2xl border border-[#c5d5be]/40"
//             >
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-[#f0f5ed] rounded-full mb-4">
//                 <Search className="w-10 h-10 text-[#c5d5be]" />
//               </div>
//               <h2 className="text-2xl font-bold text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>Search for Products</h2>
//               <p className="text-base text-[#53645a] mb-6 max-w-md mx-auto px-4" style={{ fontFamily: FONT_FAMILY }}>
//                 Type in the search box above to find products and categories.
//               </p>
//             </motion.div>
//           )}

//           {/* Products Grid */}
//           {!loading && results.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="mb-8"
//               id="products-section"
//             >
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f0f5ed] rounded-full border border-[#c5d5be]/40">
//                   <ShoppingBag className="w-3.5 h-3.5 text-[#8B9D83]" />
//                   <span className="text-[10px] font-medium text-[#8B9D83] tracking-widest uppercase" style={{ fontFamily: FONT_FAMILY }}>
//                     Products ({results.length})
//                   </span>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
//                 {displayedProducts.map((product) => (
//                   <ProductGridCard 
//                     key={product._id} 
//                     product={product} 
//                     router={router}
//                     isInCart={productsInCart[product._id] || false} 
//                     onViewInCart={openCartSidebar}
//                   />
//                 ))}
//               </div>

//               {/* Show More / Show Less Buttons */}
//               {results.length > 8 && (
//                 <div className="flex justify-center mt-6 gap-4">
//                   {displayCount < results.length && (
//                     <button
//                       onClick={handleShowMore}
//                       className="px-6 py-2 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white font-medium rounded-full hover:shadow-lg hover:shadow-[#8B9D83]/25 transition-all flex items-center gap-2"
//                       style={{ fontFamily: FONT_FAMILY }}
//                     >
//                       <span>Show More Products</span>
//                       <ChevronRight className="w-4 h-4" />
//                     </button>
//                   )}
                  
//                   {displayCount > 8 && (
//                     <button
//                       onClick={handleShowLess}
//                       className="px-6 py-2 bg-[#f0f5ed] text-[#465641] font-medium rounded-full hover:bg-[#c5d5be]/30 transition-all flex items-center gap-2 border border-[#c5d5be]/40"
//                       style={{ fontFamily: FONT_FAMILY }}
//                     >
//                       <ChevronUp className="w-4 h-4" />
//                       <span>Show Less</span>
//                     </button>
//                   )}
//                 </div>
//               )}
//             </motion.div>
//           )}

//           {/* Categories Section */}
//           {!loading && categories.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               <div className="mb-4">
//                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f0f5ed] rounded-full border border-[#c5d5be]/40 mb-3">
//                   <FolderOpen className="w-3.5 h-3.5 text-[#8B9D83]" />
//                   <span className="text-[10px] font-medium text-[#8B9D83] tracking-widest uppercase" style={{ fontFamily: FONT_FAMILY }}>
//                     Related Categories
//                   </span>
//                 </div>
//                 <h2 className="text-xl font-bold text-[#263b32]" style={{ fontFamily: FONT_FAMILY_CURSIVE }}>
//                   Browse <span className="text-[#8B9D83]">Categories</span>
//                 </h2>
//                 <p className="text-sm text-[#53645a] mt-1" style={{ fontFamily: FONT_FAMILY }}>
//                   {categories.length} categories related to your search
//                 </p>
//               </div>

//               {/* Categories Row with Scroll Arrows */}
//               <div className="relative group px-2">
//                 <AnimatedArrow
//                   show={showLeftArrow}
//                   direction="left"
//                   onClick={() => scroll('left')}
//                   Icon={ChevronLeft}
//                 />

//                 <AnimatedArrow
//                   show={showRightArrow}
//                   direction="right"
//                   onClick={() => scroll('right')}
//                   Icon={ChevronRight}
//                 />

//                 <div
//                   ref={scrollContainerRef}
//                   className="flex overflow-x-auto gap-3 sm:gap-5 pb-4 scroll-smooth"
//                   style={{ 
//                     scrollbarWidth: 'none', 
//                     msOverflowStyle: 'none',
//                     WebkitOverflowScrolling: 'touch'
//                   }}
//                 >
//                   {categories.map((category, index) => (
//                     <CategoryCard 
//                       key={category._id || index} 
//                       category={category} 
//                       index={index}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>

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

// // ========== MAIN PAGE WITH SUSPENSE ==========
// export default function SearchPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-white">
//         <Navbar />
//         <div className="flex justify-center items-center h-64">
//           <Loader2 className="w-8 h-8 animate-spin text-[#8B9D83]" />
//         </div>
//         <Footer />
//       </div>
//     }>
//       <SearchContent />
//     </Suspense>
//   );
// }



'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  Package,
  Loader2,
  ChevronRight,
  TrendingUp,
  ArrowRight,
  ShoppingBag,
  FolderOpen,
  Eye,
  ChevronUp,
  ChevronLeft,
  AlertTriangle,
  X,
  Heart,
  Star,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { toast } from 'sonner';
import CartSidebar from '../components/CartSidebar';

/* =========================================================
   DESIGN TOKENS — matched to Featured Products section
========================================================= */
const BRAND = '#d92f45';
const BRAND_DARK = '#b82238';
const TEXT_MAIN = '#25282b';
const TEXT_STRONG = '#292929';
const DIVIDER = '#d9d9d9';
const IMG_BG = '#f5f5f5';

const FONT_HEADING = "'Playfair Display', Georgia, serif";
const FONT_BODY = "'Raleway', 'Inter', sans-serif";

/* =========================================================
   HELPERS
========================================================= */
const getUnitLabel = (unit) => {
  const units = { pcs: 'pcs', ton: 'ton', other: 'unit' };
  return units[unit] || unit;
};

const formatPrice = (price) => (price ? price.toFixed(0) : '0');

const truncateText = (text, limit = 40) => {
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

/* =========================================================
   LOADING BAR
========================================================= */
const LoadingBar = ({ isVisible }) => (
  <div
    className={`fixed top-0 left-0 w-full h-0.5 z-50 transition-opacity duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
    style={{ backgroundColor: `${BRAND}33` }}
  >
    <div
      className="h-full animate-loading-bar"
      style={{
        background: `linear-gradient(to right, ${BRAND}, ${BRAND_DARK})`,
      }}
    />
  </div>
);

/* =========================================================
   PRODUCT GRID CARD — mirrors FeaturedProductCard design
========================================================= */
const ProductGridCard = ({
  product,
  router,
  isInCart: propIsInCart,
  onViewInCart,
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

  /* --- Safe data extraction --- */
  const productId = product?._id || product?.id || 'unknown';
  const productName = product?.productName || product?.name || 'Product';
  const productSlug = product?.slug || productId;
  const regularPrice = Number(product?.regularPrice || product?.price || 0);
  const discountPrice = Number(product?.discountPrice || 0);
  const stockQuantity = Number(product?.stockQuantity || 0);

  /* --- Images --- */
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
  if (productImages.length === 0) {
    productImages = ['/placeholder-product.jpg'];
  }

  /* --- Derived --- */
  const hasMultipleImages = productImages.length > 1;
  const hasHoverImage = productImages.length > 1;
  const discountPercent = calculateDiscountPercentage(
    regularPrice,
    discountPrice
  );
  const currentPrice =
    discountPrice > 0 && discountPrice < regularPrice
      ? discountPrice
      : regularPrice;
  const originalPrice = regularPrice;
  const isLowStock =
    product?.stockAlertQuantity > 0 &&
    stockQuantity <= product.stockAlertQuantity;
  const isOutOfStock = stockQuantity <= 0;
  const rating = product?.rating ? Number(product.rating) : 4.7;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  /* --- Mobile detection --- */
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsInCart(propIsInCart || false);
  }, [propIsInCart]);

  useEffect(() => {
    if (!isHovered) {
      setHasUserNavigated(false);
      setActiveIndex(0);
    }
  }, [isHovered]);

  /* --- Wishlist (localStorage) --- */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const liked = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsLiked(liked.includes(productId));
    } catch (_) {}
  }, [productId]);

  const handleToggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedLoading(true);
    try {
      const liked = JSON.parse(localStorage.getItem('wishlist') || '[]');
      let updated;
      if (liked.includes(productId)) {
        updated = liked.filter((id) => id !== productId);
        setIsLiked(false);
        toast.success('Removed from wishlist');
      } else {
        updated = [...liked, productId];
        setIsLiked(true);
        toast.success('Added to wishlist');
      }
      localStorage.setItem('wishlist', JSON.stringify(updated));
      window.dispatchEvent(new Event('wishlist-update'));
    } catch (error) {
      toast.error('Failed to update wishlist');
    } finally {
      setLikedLoading(false);
    }
  };

  /* --- Image navigation --- */
  const nextImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (hasMultipleImages) {
      setActiveIndex((prev) => (prev + 1) % productImages.length);
      setHasUserNavigated(true);
    }
  };

  const prevImage = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (hasMultipleImages) {
      setActiveIndex(
        (prev) => (prev - 1 + productImages.length) % productImages.length
      );
      setHasUserNavigated(true);
    }
  };

  const goToImage = (e, index) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setActiveIndex(index);
    setHasUserNavigated(true);
  };

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const getCurrentImage = () => {
    if (isHovered && hasHoverImage && !isMobile && !hasUserNavigated) {
      const hoverIndex = 1;
      const image = productImages[hoverIndex] || productImages[0];
      if (imageErrors[hoverIndex]) {
        return productImages[0] || '/placeholder-product.jpg';
      }
      return image;
    }
    const image = productImages[activeIndex] || productImages[0];
    if (imageErrors[activeIndex]) {
      return '/placeholder-product.jpg';
    }
    return image;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHasUserNavigated(false);
    setActiveIndex(0);
  };

  /* --- Add to cart (functionality unchanged) --- */
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
        sessionId = `guest_${Date.now()}_${Math.random()
          .toString(36)
          .substring(7)}`;
        localStorage.setItem('cartSessionId', sessionId);
      }

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      } else if (sessionId) {
        headers['x-session-id'] = sessionId;
      }

      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers,
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.sessionId && !token) {
          localStorage.setItem('cartSessionId', data.sessionId);
        }
        toast.success('Added to cart!', { id: toastId });
        setIsInCart(true);
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

  const navigateToProduct = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    router.push(`/product/${productSlug}`);
  };

  /* --- Star renderer --- */
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current text-yellow-400"
          />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-2.5 w-2.5 sm:h-3 sm:w-3">
            <Star className="absolute h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-200" />
            <div className="absolute left-0 top-0 h-2.5 w-2.5 sm:h-3 sm:w-3 w-1/2 overflow-hidden">
              <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star
            key={i}
            className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-300"
          />
        );
      }
    }
    return stars;
  };

  return (
    <div
      className="group w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/product/${productSlug}`} className="block h-full">
        <article className="relative flex h-full flex-col">
          {/* ================= IMAGE ================= */}
          <div
            className="relative w-full aspect-[0.79] overflow-hidden"
            style={{ backgroundColor: IMG_BG }}
          >
            <Image
              src={getCurrentImage()}
              alt={productName}
              fill
              sizes="(max-width: 640px) 48vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className={`object-cover transition-transform duration-500 ease-out ${
                isHovered ? 'scale-[1.03]' : 'scale-100'
              }`}
              onError={() =>
                handleImageError(
                  isHovered &&
                    hasHoverImage &&
                    !isMobile &&
                    !hasUserNavigated
                    ? 1
                    : activeIndex
                )
              }
              quality={90}
            />

            {/* Hover dark gradient */}
            <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/[0.03]" />

            <div
              className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 ${
                isMobile
                  ? 'opacity-100'
                  : isHovered
                  ? 'opacity-100'
                  : 'opacity-0'
              }`}
              style={{
                background:
                  'radial-gradient(circle 130px at 100% 0%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.28) 35%, rgba(0,0,0,0.10) 65%, rgba(0,0,0,0) 100%)',
              }}
            />

            {/* Discount badge — red circle */}
            {discountPercent > 0 && (
              <div
                className="absolute left-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full text-white shadow-md"
                style={{ backgroundColor: BRAND }}
              >
                <span className="text-[10px] font-bold leading-none text-center">
                  {discountPercent}%
                  <br />
                  OFF
                </span>
              </div>
            )}

            {/* Out of stock overlay */}
            {isOutOfStock && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/55">
                <span className="rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white">
                  Out of Stock
                </span>
              </div>
            )}

            {/* Low stock badge */}
            {!isOutOfStock && isLowStock && (
              <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 rounded bg-orange-500 px-2 py-1 text-[9px] font-medium text-white shadow-md">
                <AlertTriangle className="h-2.5 w-2.5" />
                <span className="hidden xs:inline">
                  Only {stockQuantity} left
                </span>
                <span className="xs:hidden">{stockQuantity} left</span>
              </div>
            )}

            {/* Hover actions — heart / bag / eye */}
            <div
              className={`absolute right-2.5 top-2.5 z-30 flex flex-col gap-2.5 transition-all duration-300 ease-out ${
                isMobile
                  ? 'translate-x-0 opacity-100'
                  : isHovered
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-3 opacity-0'
              }`}
            >
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

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock || cartStatusLoading}
                aria-label={isInCart ? 'View in cart' : 'Add to cart'}
                className={`flex items-center justify-center rounded-full transition-all duration-200 hover:scale-125 disabled:cursor-not-allowed disabled:opacity-60 ${
                  isInCart
                    ? 'h-6 w-6 text-white shadow-md'
                    : 'h-5 w-5 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]'
                }`}
                style={isInCart ? { backgroundColor: BRAND } : {}}
              >
                {cartStatusLoading ? (
                  <Loader2
                    className={`animate-spin ${
                      isInCart ? 'h-3.5 w-3.5' : 'h-5 w-5'
                    }`}
                  />
                ) : (
                  <ShoppingBag
                    className={isInCart ? 'h-3.5 w-3.5' : 'h-5 w-5'}
                  />
                )}
              </button>

              <button
                type="button"
                onClick={navigateToProduct}
                aria-label="Quick view"
                className="group/btn flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] transition-all duration-200 hover:scale-125"
              >
                <Eye className="h-5 w-5 transition-colors duration-200 group-hover/btn:text-[#d92f45]" />
              </button>
            </div>

            {/* Image arrows / dots */}
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
                  <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-white drop-shadow-md" />
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
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-white drop-shadow-md" />
                </button>
              </div>
            )}
          </div>

          {/* ================= DETAILS ================= */}
          <div className="pt-2">
            {/* Product name */}
            <h3
              className="min-h-[42px] text-[15px] font-normal leading-[1.35] text-[#292929] sm:text-[16px] lg:text-[17px] line-clamp-2"
              style={{ fontFamily: FONT_BODY }}
              title={productName}
            >
              {truncateText(productName, 60)}
            </h3>

            {/* Rating */}
            <div className="mt-0.5 flex items-center gap-1">
              <div className="flex items-center gap-0.5">{renderStars()}</div>
              <span
                className="text-[11px] font-normal text-[#292929]"
                style={{ fontFamily: FONT_BODY }}
              >
                {rating.toFixed(1)}
              </span>
            </div>

            {/* Price + cart */}
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
                className={`
                  flex shrink-0 items-center justify-center
                  transition-all duration-200
                  hover:scale-110
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  ${
                    isInCart
                      ? 'h-8 w-8 rounded-full text-white shadow-md'
                      : isOutOfStock
                      ? 'h-9 w-9 text-gray-300'
                      : 'h-9 w-9 text-[#d92f45] hover:text-[#b82238]'
                  }
                `}
                style={isInCart ? { backgroundColor: BRAND } : {}}
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

/* =========================================================
   CATEGORY CARD — Restyled to match (red accent, serif heading)
========================================================= */
function CategoryCard({ category, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.06, 0.4) }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex-shrink-0 w-56 sm:w-72 md:w-80 lg:w-96"
    >
      <Link href={`/products?category=${category._id}`}>
        <motion.div
          className="cursor-pointer group/card flex h-32 sm:h-40 md:h-38 overflow-hidden rounded-2xl"
          style={{
            background: isHovered ? BRAND : IMG_BG,
            boxShadow: isHovered
              ? '0 12px 40px rgba(217, 47, 69, 0.25)'
              : '0 2px 8px rgba(0,0,0,0.04)',
            transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Left - content */}
          <div className="flex-1 p-3 sm:p-4 md:p-5 flex flex-col justify-between">
            <div>
              <h3
                className="text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300 line-clamp-2"
                style={{
                  color: isHovered ? '#FFFFFF' : TEXT_MAIN,
                  fontFamily: FONT_HEADING,
                }}
              >
                {category.name}
              </h3>
              <p
                className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 line-clamp-3 transition-colors duration-300"
                style={{
                  color: isHovered ? 'rgba(255,255,255,0.85)' : '#6b6b6b',
                  fontFamily: FONT_BODY,
                }}
              >
                {category.description || 'Premium products for your needs'}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-2 sm:mt-3">
              <span
                className="text-[10px] sm:text-xs font-medium flex items-center gap-1 transition-all duration-300 group-hover:gap-2"
                style={{
                  color: isHovered ? '#FFFFFF' : BRAND,
                  fontFamily: FONT_BODY,
                }}
              >
                Browse
                <ArrowRight
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                  style={{ color: isHovered ? '#FFFFFF' : BRAND }}
                />
              </span>
              <div
                className="w-6 sm:w-8 h-0.5 rounded-full transition-all duration-300"
                style={{
                  background: isHovered
                    ? 'linear-gradient(to right, rgba(255,255,255,0.5), rgba(255,255,255,0.1))'
                    : `linear-gradient(to right, ${BRAND}, rgba(217,47,69,0.1))`,
                }}
              />
            </div>
          </div>

          {/* Right - image */}
          <div className="w-[40%] h-full flex-shrink-0 overflow-hidden relative p-1.5 sm:p-2">
            <div className="w-full h-full overflow-hidden rounded-lg">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    'https://images.unsplash.com/photo-1609091839311-d34b4f9d9c3a?w=400&h=400&fit=crop';
                }}
              />
            </div>
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isHovered
                  ? 'linear-gradient(to left, rgba(217,47,69,0.15), transparent)'
                  : 'linear-gradient(to left, rgba(0,0,0,0.05), transparent)',
                transition: 'all 0.3s ease',
              }}
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

/* =========================================================
   ANIMATED ARROW
========================================================= */
function AnimatedArrow({ show, direction, onClick, Icon }) {
  if (!show) return null;
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-20 transition-all duration-300 p-1 ${
        direction === 'left' ? '-left-5' : '-right-5'
      }`}
      style={{ color: BRAND }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      <Icon
        className="w-6 h-6 md:w-8 md:h-8 lg:w-9 lg:h-9"
        strokeWidth={1.5}
      />
    </motion.button>
  );
}

/* =========================================================
   SEARCH CONTENT
========================================================= */
function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState(query);
  const [displayCount, setDisplayCount] = useState(8);
  const [showAll, setShowAll] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productsInCart, setProductsInCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [forceFetch, setForceFetch] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (query) performSearch(query);
    else setLoading(false);
  }, [query]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (!value.trim()) {
      setResults([]);
      setCategories([]);
      router.push('/search');
      return;
    }

    searchTimeoutRef.current = setTimeout(() => {
      router.push(`/search?q=${encodeURIComponent(value)}`);
      performSearch(value);
    }, 500);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (searchInput.trim()) {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      router.push(`/search?q=${encodeURIComponent(searchInput)}`);
      performSearch(searchInput);
    }
  };

  const performSearch = async (searchQuery) => {
    if (!searchQuery || !searchQuery.trim()) {
      setResults([]);
      setCategories([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/products?search=${encodeURIComponent(
          searchQuery
        )}&limit=50`
      );
      const data = await response.json();
      if (data.success) {
        setResults(data.data);
        await fetchRelatedCategories(searchQuery);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedCategories = async (searchQuery) => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      if (data.success) {
        const matchedCategories = data.data
          .filter(
            (category) =>
              category.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              category.description
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase())
          )
          .map((cat) => ({
            _id: cat._id,
            name: cat.name,
            description: cat.description || 'Premium products for your needs',
            image:
              cat.image?.url ||
              `https://images.unsplash.com/photo-1609091839311-d34b4f9d9c3a?w=400&h=400&fit=crop`,
            slug: cat.slug,
            productCount: cat.productCount || 0,
          }));
        setCategories(matchedCategories.slice(0, 8));
        setTimeout(() => checkScroll(), 100);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.children[0]?.offsetWidth || 200;
      const gap = 16;
      const scrollAmount = (cardWidth + gap) * 2;
      const newScrollLeft =
        direction === 'left'
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [categories]);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  const handleShowMore = () => {
    setDisplayCount((prev) => prev + 8);
    setShowAll(true);
  };

  const handleShowLess = () => {
    setDisplayCount(8);
    setShowAll(false);
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* Cart status check */
  useEffect(() => {
    const checkAllProductsCartStatus = async () => {
      if (results.length === 0) return;
      const productIds = results.map((p) => p._id);
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;

      try {
        const response = await fetch(
          'http://localhost:5000/api/cart/check-status',
          {
            method: 'POST',
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({ productIds }),
          }
        );
        const data = await response.json();
        if (data.success) setProductsInCart(data.data);
      } catch (error) {
        console.error('Error checking cart status:', error);
      }
    };
    checkAllProductsCartStatus();
  }, [results, forceFetch]);

  useEffect(() => {
    const handleCartUpdate = async () => {
      if (results.length === 0) return;
      const productIds = results.map((p) => p._id);
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;

      try {
        const response = await fetch(
          'http://localhost:5000/api/cart/check-status',
          {
            method: 'POST',
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({ productIds }),
          }
        );
        const data = await response.json();
        if (data.success) setProductsInCart(data.data);
      } catch (error) {
        console.error('Error refreshing cart status:', error);
      }
    };
    window.addEventListener('cart-update', handleCartUpdate);
    return () => window.removeEventListener('cart-update', handleCartUpdate);
  }, [results]);

  const openCartSidebar = () => setIsCartOpen(true);
  const closeCartSidebar = () => setIsCartOpen(false);
  const displayedProducts = results.slice(0, displayCount);

  return (
    <>
      <LoadingBar isVisible={loading} />
      <Navbar />

      {/* ================= HERO ================= */}
      <div
      >
        <div className="container mx-auto px-4 max-w-7xl py-8 md:py-10">
          <div className="flex flex-col items-center">
            <h1
              className="text-2xl md:text-4xl font-semibold tracking-[-1px] text-center"
              style={{ fontFamily: FONT_HEADING, color: TEXT_MAIN }}
            >
              Search <span style={{ color: BRAND }}>Results</span>
            </h1>

            <p
              className="text-center text-sm mt-1.5"
              style={{ fontFamily: FONT_BODY, color: '#6b6b6b' }}
            >
              {loading
                ? 'Searching...'
                : `Found ${results.length} ${
                    results.length === 1 ? 'result' : 'results'
                  } for`}
            </p>

            {/* Search bar */}
            <div className="w-full max-w-2xl mt-5">
              <form onSubmit={handleSearchSubmit}>
                <div
                  className="relative flex items-center bg-white rounded-full shadow-sm overflow-hidden transition-all focus-within:ring-2"
                  style={{
                    border: `1px solid ${DIVIDER}`,
                    // focus ring color handled via focus-within on wrapper below
                  }}
                >
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search beauty products..."
                    value={searchInput}
                    onChange={handleSearchChange}
                    className="w-full pl-11 pr-28 py-2.5 text-sm border-0 focus:outline-none bg-transparent text-gray-800 placeholder:text-gray-400"
                    style={{ fontFamily: FONT_BODY }}
                  />
                  {searchInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchInput('');
                        setResults([]);
                        setCategories([]);
                        router.push('/search');
                      }}
                      className="absolute right-14 p-1.5 text-gray-400 hover:text-[#d92f45] rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 text-white text-xs font-medium rounded-full transition-all hover:shadow-lg"
                    style={{
                      fontFamily: FONT_BODY,
                      backgroundColor: BRAND,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = BRAND_DARK)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = BRAND)
                    }
                  >
                    Search
                  </button>
                </div>
              </form>

              {query && !loading && results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm"
                  style={{ border: `1px solid ${DIVIDER}` }}
                >
                  <span
                    className="text-[10px] text-gray-500"
                    style={{ fontFamily: FONT_BODY }}
                  >
                    Showing results for:
                  </span>
                  <span
                    className="font-semibold text-xs"
                    style={{ fontFamily: FONT_BODY, color: BRAND }}
                  >
                    "{query}"
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= RESULTS ================= */}
      <div className="py-8 md:py-12 bg-white -mt-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Stats pill */}
          {!loading && results.length > 0 && (
            <div className="mb-4">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full"
                style={{ backgroundColor: `${BRAND}0D`, border: `1px solid ${BRAND}33` }}
              >
                <TrendingUp className="w-3.5 h-3.5" style={{ color: BRAND }} />
                <span
                  className="text-[10px]"
                  style={{ fontFamily: FONT_BODY, color: BRAND }}
                >
                  {results.length} {results.length === 1 ? 'result' : 'results'} found
                </span>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 md:py-20">
              <div className="relative">
                <div
                  className="w-16 h-16 border-4 rounded-full"
                  style={{ borderColor: `${BRAND}33` }}
                />
                <div
                  className="absolute top-0 left-0 w-16 h-16 border-4 rounded-full border-t-transparent animate-spin"
                  style={{ borderColor: BRAND, borderTopColor: 'transparent' }}
                />
              </div>
              <p
                className="mt-4 text-base animate-pulse"
                style={{ fontFamily: FONT_BODY, color: '#6b6b6b' }}
              >
                Searching through our collection...
              </p>
            </div>
          )}

          {/* No results */}
          {!loading && results.length === 0 && searchInput && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-2xl"
              style={{ border: `1px solid ${DIVIDER}` }}
            >
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                style={{ backgroundColor: `${BRAND}0D` }}
              >
                <Search className="w-10 h-10" style={{ color: BRAND }} />
              </div>
              <h2
                className="text-2xl font-semibold mb-2"
                style={{ fontFamily: FONT_HEADING, color: TEXT_MAIN }}
              >
                No results found
              </h2>
              <p
                className="text-base mb-6 max-w-md mx-auto px-4"
                style={{ fontFamily: FONT_BODY, color: '#6b6b6b' }}
              >
                We couldn't find anything matching "{searchInput}". Try
                different keywords or browse our categories.
              </p>
              <Link
                href="/products"
                className="inline-block px-6 py-2 text-white font-medium rounded-full transition-all hover:shadow-lg"
                style={{ fontFamily: FONT_BODY, backgroundColor: BRAND }}
              >
                Browse Products
              </Link>
            </motion.div>
          )}

          {/* Initial state */}
          {!loading && results.length === 0 && !searchInput && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-2xl"
              style={{ border: `1px solid ${DIVIDER}` }}
            >
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
                style={{ backgroundColor: `${BRAND}0D` }}
              >
                <Search className="w-10 h-10" style={{ color: BRAND }} />
              </div>
              <h2
                className="text-2xl font-semibold mb-2"
                style={{ fontFamily: FONT_HEADING, color: TEXT_MAIN }}
              >
                Search for Products
              </h2>
              <p
                className="text-base mb-6 max-w-md mx-auto px-4"
                style={{ fontFamily: FONT_BODY, color: '#6b6b6b' }}
              >
                Type in the search box above to find products and categories.
              </p>
            </motion.div>
          )}

          {/* Products grid */}
          {!loading && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
              id="products-section"
            >
              {/* Section title — matching Featured Products style */}
              <div className="mb-8 flex w-full items-center gap-4 sm:mb-10">
                <div className="h-px flex-1" style={{ backgroundColor: DIVIDER }} />
                <h2
                  className="whitespace-nowrap text-center text-[16px] font-semibold uppercase tracking-[-1px] sm:text-[20px] lg:text-[24px]"
                  style={{ fontFamily: FONT_BODY, color: TEXT_MAIN }}
                >
                  Products ({results.length})
                </h2>
                <div className="h-px flex-1" style={{ backgroundColor: DIVIDER }} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-5">
                {displayedProducts.map((product) => (
                  <ProductGridCard
                    key={product._id}
                    product={product}
                    router={router}
                    isInCart={productsInCart[product._id] || false}
                    onViewInCart={openCartSidebar}
                  />
                ))}
              </div>

              {/* Show More / Less */}
              {results.length > 8 && (
                <div className="flex justify-center mt-8 gap-4">
                  {displayCount < results.length && (
                    <button
                      onClick={handleShowMore}
                      className="px-6 py-2 text-white font-medium rounded-full transition-all hover:shadow-lg flex items-center gap-2"
                      style={{ fontFamily: FONT_BODY, backgroundColor: BRAND }}
                    >
                      <span>Show More Products</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                  {displayCount > 8 && (
                    <button
                      onClick={handleShowLess}
                      className="px-6 py-2 font-medium rounded-full transition-all flex items-center gap-2"
                      style={{
                        fontFamily: FONT_BODY,
                        backgroundColor: `${BRAND}0D`,
                        color: BRAND,
                        border: `1px solid ${BRAND}33`,
                      }}
                    >
                      <ChevronUp className="w-4 h-4" />
                      <span>Show Less</span>
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Categories section */}
          {!loading && categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Section title */}
              <div className="mb-8 flex w-full items-center gap-4">
                <div className="h-px flex-1" style={{ backgroundColor: DIVIDER }} />
                <h2
                  className="whitespace-nowrap text-center text-[16px] font-semibold uppercase tracking-[-1px] sm:text-[20px] lg:text-[24px]"
                  style={{ fontFamily: FONT_BODY, color: TEXT_MAIN }}
                >
                  Browse Categories
                </h2>
                <div className="h-px flex-1" style={{ backgroundColor: DIVIDER }} />
              </div>

              <p
                className="text-sm mb-4 -mt-4"
                style={{ fontFamily: FONT_BODY, color: '#6b6b6b' }}
              >
                {categories.length} categories related to your search
              </p>

              <div className="relative group px-2">
                <AnimatedArrow
                  show={showLeftArrow}
                  direction="left"
                  onClick={() => scroll('left')}
                  Icon={ChevronLeft}
                />
                <AnimatedArrow
                  show={showRightArrow}
                  direction="right"
                  onClick={() => scroll('right')}
                  Icon={ChevronRight}
                />

                <div
                  ref={scrollContainerRef}
                  className="flex overflow-x-auto gap-3 sm:gap-5 pb-4 scroll-smooth"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  {categories.map((category, index) => (
                    <CategoryCard
                      key={category._id || index}
                      category={category}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

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
      `}</style>
    </>
  );
}

/* =========================================================
   PAGE WRAPPER
========================================================= */
export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white">
          <Navbar />
          <div className="flex justify-center items-center h-64">
            <Loader2
              className="w-8 h-8 animate-spin"
              style={{ color: BRAND }}
            />
          </div>
          <Footer />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}