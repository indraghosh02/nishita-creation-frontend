
// 'use client';

// import { useState, useEffect, useCallback, useRef } from 'react';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   ArrowRight, 
//   ShoppingBag,
//   Loader2,
//   ShoppingCart,
//   Zap,
//   Eye,
//   CheckCircle,
//   Clock,
//   ChevronLeft,
//   ChevronRight,
//   AlertTriangle,
//   Sparkles,
//   Star,
//   Flame,
//   Flower2,
//   Building2,
//   Package,
//   Tag,
//   ChevronDown,
//   ChevronUp
// } from 'lucide-react';
// import { toast } from 'sonner';
// import CartSidebar from '../CartSidebar';

// // Font constants - Beauty Bucket Style
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// // Helper functions
// const calculateDiscountPercentage = (regularPrice, discountPrice) => {
//   if (regularPrice && discountPrice && discountPrice < regularPrice) {
//     return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
//   }
//   return 0;
// };

// const truncateText = (text, limit = 35) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// const formatPrice = (price) => {
//   return price?.toFixed(2) || '0.00';
// };

// // Product Card Component - Beauty Bucket Style with Hover Functionality
// const ProductCard = ({ 
//   product, 
//   isInCart: propIsInCart, 
//   onCartStatusChange, 
//   onViewInCart 
// }) => {
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isInCart, setIsInCart] = useState(propIsInCart || false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [imageErrors, setImageErrors] = useState({});
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
  
//   // Safe image extraction
//   let productImages = [];
//   if (product?.images && Array.isArray(product.images)) {
//     productImages = product.images.map(img => {
//       if (typeof img === 'string') return img;
//       if (img?.url) return img.url;
//       return null;
//     }).filter(Boolean);
//   }
//   if (productImages.length === 0 && product?.image) {
//     productImages = [typeof product.image === 'string' ? product.image : product.image?.url || ''].filter(Boolean);
//   }
//   if (productImages.length === 0) {
//     productImages = ['/placeholder-product.jpg'];
//   }
  
//   // Determine if we should show hover image (only if more than 1 image)
//   const hasHoverImage = productImages.length > 1;
  
//   const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
//   const hasMultipleImages = productImages.length > 1;
//   const currentPrice = discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
//   const originalPrice = regularPrice;
  
//   const isLowStock = product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
//   const isOutOfStock = stockQuantity <= 0;

//   // Rating - Get from backend
//   const rating = product?.rating ? Number(product.rating) : 0;
//   const reviewCount = product?.reviewStats?.totalReviews || product?.reviews?.length || 0;
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating - fullStars >= 0.5;

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

//   // Reset navigation state and active index when hover ends
//   useEffect(() => {
//     if (!isHovered) {
//       setHasUserNavigated(false);
//       setActiveIndex(0);
//     }
//   }, [isHovered]);

//   // Listen for cart update events
//   useEffect(() => {
//     const handleCartUpdate = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const sessionId = localStorage.getItem('cartSessionId');
        
//         const headers = {};
//         if (token) {
//           headers['Authorization'] = `Bearer ${token}`;
//         } else if (sessionId) {
//           headers['x-session-id'] = sessionId;
//         } else {
//           setIsInCart(false);
//           if (onCartStatusChange) {
//             onCartStatusChange(productId, false);
//           }
//           return;
//         }
        
//         const response = await fetch('http://localhost:5000/api/cart/check-status', {
//           method: 'POST',
//           headers: { ...headers, 'Content-Type': 'application/json' },
//           body: JSON.stringify({ productIds: [productId] })
//         });
        
//         const data = await response.json();
//         if (data.success) {
//           const inCart = data.data[productId] || false;
//           setIsInCart(inCart);
//           if (onCartStatusChange) {
//             onCartStatusChange(productId, inCart);
//           }
//         }
//       } catch (error) {
//         console.error('Error checking cart status:', error);
//       }
//     };

//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => {
//       window.removeEventListener('cart-update', handleCartUpdate);
//     };
//   }, [productId, onCartStatusChange]);

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
    
//     // Otherwise show the active index
//     const image = productImages[activeIndex] || productImages[0];
//     if (imageErrors[activeIndex]) {
//       return '/placeholder-product.jpg';
//     }
//     return image;
//   };

//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (isInCart) {
//       onViewInCart();
//       return;
//     }
    
//     if (stockQuantity <= 0) {
//       toast.error('Product is out of stock!');
//       return;
//     }
    
//     setCartStatusLoading(true);
//     const toastId = toast.loading('Adding to cart...');
    
//     try {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
      
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }
      
//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify({ productId: productId, quantity: 1 })
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//         toast.success('Added to cart!', { id: toastId });
//         setIsInCart(true);
//         if (onCartStatusChange) {
//           onCartStatusChange(productId, true);
//         }
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
//         stars.push(<Star key={i} className="h-2.5 w-2.5 fill-current text-[#8B9D83]" />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(
//           <div key={i} className="relative h-2.5 w-2.5">
//             <Star className="absolute h-2.5 w-2.5 text-gray-200" />
//             <div className="absolute left-0 top-0 h-2.5 w-1/2 overflow-hidden">
//               <Star className="h-2.5 w-2.5 fill-current text-[#8B9D83]" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(<Star key={i} className="h-2.5 w-2.5 text-[#8B9D83]/30" />);
//       }
//     }
//     return stars;
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     setHasUserNavigated(false);
//     setActiveIndex(0);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.4 }}
//       className="group w-full"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={handleMouseLeave}
//     >
//       <Link href={`/product/${product?.slug || productId}`} className="block h-full">
//         <article 
//           className={`
//             group
//             relative
//             flex
//             w-full
//             flex-col
//             rounded-[3px]
//             bg-[#FDF7EF]
//             px-2.5
//             pb-3
//             pt-2
//             transition-all
//             duration-300
//             ${isHovered ? '-translate-y-1 shadow-[0_5px_20px_rgba(139,157,131,0.15)]' : ''}
//           `}
//         >
          
//           {/* =================================
//               DISCOUNT PERCENT BADGE
//           ================================== */}
//           {discountPercent > 0 && (
//             <motion.div
//               className="absolute left-2.5 top-2 z-10"
//               animate={isHovered ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] } : {}}
//               transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
//             >
//               <span className="relative flex items-center justify-center overflow-hidden rounded-full bg-[#8B9D83] px-2 py-[3px] text-[7px] font-semibold tracking-wide text-white sm:text-[8px]" style={{ fontFamily: FONT_FAMILY }}>
//                 {isHovered && (
//                   <motion.div
//                     className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
//                     initial={{ x: '-100%' }}
//                     animate={{ x: '200%' }}
//                     transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
//                   />
//                 )}
//                 <span className="relative z-10">{discountPercent}% OFF</span>
//               </span>
//             </motion.div>
//           )}

//           {/* =================================
//               SHOPPING BAG ICON (Add to Cart)
//           ================================== */}
//           <button
//             type="button"
//             onClick={handleAddToCart}
//             disabled={isOutOfStock || cartStatusLoading}
//             aria-label="Add to cart"
//             className={`
//               absolute
//               right-2.5
//               top-2
//               z-10
//               flex
//               h-6
//               w-6
//               items-center
//               justify-center
//               rounded-full
//               text-gray-500
//               transition-all
//               duration-200
//               hover:bg-white
//               hover:text-[#8B9D83]
//               disabled:opacity-50
//               disabled:cursor-not-allowed
//               ${isHovered ? 'opacity-100' : 'opacity-70'}
//             `}
//           >
//             {cartStatusLoading ? (
//               <Loader2 className="h-3.5 w-3.5 animate-spin" />
//             ) : (
//               <ShoppingBag size={15} strokeWidth={1.7} />
//             )}
//           </button>

//           {/* =================================
//               PRODUCT IMAGE
//           ================================== */}
//           <div
//             className="
//               flex
//               h-[145px]
//               w-full
//               items-center
//               justify-center
//               overflow-hidden
//               rounded-sm
//               bg-[#FDF7EF]
//               relative
//               sm:h-[165px]
//               lg:h-[180px]
//             "
//           >
//             <motion.img
//               src={getCurrentImage()}
//               alt={productName}
//               className="
//                 h-full
//                 w-full
//                 object-contain
//                 p-2
//                 transition-transform
//                 duration-500
//               "
//               animate={{ scale: isHovered ? 1.06 : 1 }}
//               transition={{ duration: 0.5, ease: 'easeOut' }}
//               onError={() => handleImageError(isHovered && hasHoverImage && !isMobile && !hasUserNavigated ? 1 : activeIndex)}
//               loading="lazy"
//             />

//             {/* Image Navigation Arrows - Only if multiple images */}
//             {hasMultipleImages && (
//               <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1">
//                 <motion.button
//                   type="button"
//                   onMouseDown={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                   }}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     prevImage(e);
//                   }}
//                   className="rounded-full bg-white/80 p-0.5 shadow-sm hover:bg-white"
//                   aria-label="Previous image"
//                   whileHover={{ scale: 1.2 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <ChevronLeft className="h-3 w-3 text-[#8B9D83]" />
//                 </motion.button>
                
//                 <div className="flex items-center gap-0.5">
//                   {productImages.map((_, index) => (
//                     <motion.button
//                       key={index}
//                       type="button"
//                       onMouseDown={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                       }}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                         goToImage(e, index);
//                       }}
//                       className={`rounded-full transition-all duration-200 ${
//                         activeIndex === index 
//                           ? 'h-1.5 w-1.5 bg-[#8B9D83]' 
//                           : 'h-1 w-1 bg-[#8B9D83]/30 hover:bg-[#8B9D83]/60'
//                       }`}
//                       whileHover={{ scale: 1.3 }}
//                       aria-label={`Go to image ${index + 1}`}
//                     />
//                   ))}
//                 </div>
                
//                 <motion.button
//                   type="button"
//                   onMouseDown={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                   }}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     nextImage(e);
//                   }}
//                   className="rounded-full bg-white/80 p-0.5 shadow-sm hover:bg-white"
//                   aria-label="Next image"
//                   whileHover={{ scale: 1.2 }}
//                   whileTap={{ scale: 0.9 }}
//                 >
//                   <ChevronRight className="h-3 w-3 text-[#8B9D83]" />
//                 </motion.button>
//               </div>
//             )}

//             {/* Out of Stock Overlay */}
//             {isOutOfStock && (
//               <div className="absolute inset-0 z-20 flex items-center justify-center rounded-sm bg-black/50">
//                 <span className="rounded-full bg-black px-3 py-1 text-[10px] font-medium text-white" style={{ fontFamily: FONT_FAMILY }}>
//                   Out of Stock
//                 </span>
//               </div>
//             )}
//           </div>

//           {/* =================================
//               PRODUCT NAME
//           ================================== */}
//           <h3
//             className="
//               mt-1
//               truncate
//               text-center
//               text-[11px]
//               font-semibold
//               text-[#2D1B2E]
//               transition-colors
//               duration-300
//               group-hover:text-[#465641]
//               sm:text-xs
//             "
//             style={{ fontFamily: FONT_FAMILY }}
//           >
//             {truncateText(productName, 25)}
//           </h3>

//           {/* =================================
//               RATING - Shows actual rating from backend
//           ================================== */}
//           <div className="mt-1 flex items-center justify-center gap-[2px]">
//             <div className="flex">
//               {renderStars()}
//             </div>
//             {reviewCount > 0 && (
//               <span className="ml-1 text-[9px] text-[#8B9D83] sm:text-[10px]" style={{ fontFamily: FONT_FAMILY }}>
//                 ({reviewCount})
//               </span>
//             )}
//           </div>

//           {/* =================================
//               PRICE
//           ================================== */}
//           <div className="mt-1 text-center">
//             {discountPercent > 0 ? (
//               <>
//                 <span className="text-[12px] font-bold text-[#8B9D83] sm:text-sm" style={{ fontFamily: FONT_FAMILY }}>
//                   ৳{formatPrice(currentPrice)}
//                 </span>
//                 <span className="ml-1.5 text-[10px] text-gray-400 line-through sm:text-[11px]" style={{ fontFamily: FONT_FAMILY }}>
//                   ৳{formatPrice(originalPrice)}
//                 </span>
//               </>
//             ) : (
//               <span className="text-[12px] font-bold text-[#2D1B2E] sm:text-sm" style={{ fontFamily: FONT_FAMILY }}>
//                 ৳{formatPrice(currentPrice)}
//               </span>
//             )}
//           </div>

//           {/* =================================
//               ADD TO BAG BUTTON - NO MOVING EFFECT
//           ================================== */}
//           <motion.button
//             type="button"
//             onClick={handleAddToCart}
//             disabled={isOutOfStock || cartStatusLoading}
//             whileHover={!isOutOfStock ? { scale: 1.02 } : {}}
//             whileTap={!isOutOfStock ? { scale: 0.98 } : {}}
//             className={`
//               mt-2
//               h-[29px]
//               w-full
//               rounded-[2px]
//               border
//               text-[9px]
//               font-medium
//               uppercase
//               tracking-wide
//               transition-all
//               duration-200
//               sm:h-[31px]
//               sm:text-[10px]
//               ${isInCart
//                 ? 'border-[#8B9D83] bg-[#8B9D83] text-white'
//                 : isOutOfStock
//                 ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
//                 : 'border-[#8B9D83]/30 bg-white text-[#2D1B2E] hover:border-[#8B9D83] hover:bg-[#8B9D83] hover:text-white'
//               }
//             `}
//             style={{ fontFamily: FONT_FAMILY }}
//           >
//             {cartStatusLoading ? (
//               <Loader2 className="mx-auto h-3 w-3 animate-spin" />
//             ) : isInCart ? (
//               'IN BAG'
//             ) : isOutOfStock ? (
//               'OUT OF STOCK'
//             ) : (
//               'ADD TO BAG'
//             )}
//           </motion.button>

//         </article>
//       </Link>
//     </motion.div>
//   );
// };

// // Main Product Grid Section Component - Horizontal Scroll with Arrow Navigation
// // export default function ProductGridSection({ 
// //   title, 
// //   description, 
// //   products = [], 
// //   layout = 'grid',
// //   itemsPerRow = 6,
// //   showViewAll = true,
// //   viewAllLink = '/products',
// //   sectionBadge = 'Products'
// // }) {
// //   const [isCartOpen, setIsCartOpen] = useState(false);
// //   const [productsInCart, setProductsInCart] = useState({});
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const [isMobile, setIsMobile] = useState(false);
// //   const [isPaused, setIsPaused] = useState(false);
// //   const sliderRef = useRef(null);
// //   const containerRef = useRef(null);

// //   useEffect(() => {
// //     const checkMobile = () => {
// //       setIsMobile(window.innerWidth < 768);
// //     };
// //     checkMobile();
// //     window.addEventListener('resize', checkMobile);
// //     return () => window.removeEventListener('resize', checkMobile);
// //   }, []);

// //   // Check cart status for products
// //   const checkCartStatus = async (productsList) => {
// //     if (!productsList || productsList.length === 0) return;
    
// //     const productIds = productsList.map(p => p._id || p.id).filter(Boolean);
// //     if (productIds.length === 0) return;
    
// //     const token = localStorage.getItem('token');
// //     const sessionId = localStorage.getItem('cartSessionId');
    
// //     const headers = {};
// //     if (token) {
// //       headers['Authorization'] = `Bearer ${token}`;
// //     } else if (sessionId) {
// //       headers['x-session-id'] = sessionId;
// //     } else {
// //       const emptyCartStatus = {};
// //       productIds.forEach(id => {
// //         emptyCartStatus[id] = false;
// //       });
// //       setProductsInCart(emptyCartStatus);
// //       return;
// //     }
    
// //     try {
// //       const response = await fetch('http://localhost:5000/api/cart/check-status', {
// //         method: 'POST',
// //         headers: { ...headers, 'Content-Type': 'application/json' },
// //         body: JSON.stringify({ productIds })
// //       });
      
// //       const data = await response.json();
// //       if (data.success) {
// //         setProductsInCart(data.data);
// //       } else {
// //         const emptyCartStatus = {};
// //         productIds.forEach(id => {
// //           emptyCartStatus[id] = false;
// //         });
// //         setProductsInCart(emptyCartStatus);
// //       }
// //     } catch (error) {
// //       console.error('Error checking cart status:', error);
// //       const emptyCartStatus = {};
// //       productIds.forEach(id => {
// //         emptyCartStatus[id] = false;
// //       });
// //       setProductsInCart(emptyCartStatus);
// //     }
// //   };

// //   // Listen for cart update events
// //   useEffect(() => {
// //     const handleCartUpdate = () => {
// //       if (products.length > 0) {
// //         checkCartStatus(products);
// //       }
// //     };

// //     window.addEventListener('cart-update', handleCartUpdate);
// //     return () => {
// //       window.removeEventListener('cart-update', handleCartUpdate);
// //     };
// //   }, [products]);

// //   // Initial cart status check
// //   useEffect(() => {
// //     if (products.length > 0) {
// //       checkCartStatus(products);
// //     }
// //   }, [products]);

// //   const onCartStatusChange = useCallback((productId, isInCart) => {
// //     setProductsInCart(prev => ({
// //       ...prev,
// //       [productId]: isInCart
// //     }));
// //   }, []);

// //   const openCartSidebar = () => {
// //     setIsCartOpen(true);
// //   };

// //   const closeCartSidebar = () => {
// //     setIsCartOpen(false);
// //   };

// //   if (!products || products.length === 0) {
// //     return null;
// //   }

// //   const totalPages = Math.ceil(products.length / itemsPerRow);
// //   const currentProducts = products.slice(
// //     currentIndex * itemsPerRow,
// //     (currentIndex + 1) * itemsPerRow
// //   );

// //   const handleNext = () => {
// //     if (currentIndex < totalPages - 1) {
// //       setCurrentIndex(currentIndex + 1);
// //       if (isMobile && containerRef.current) {
// //         containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
// //       }
// //     }
// //   };

// //   const handlePrev = () => {
// //     if (currentIndex > 0) {
// //       setCurrentIndex(currentIndex - 1);
// //       if (isMobile && containerRef.current) {
// //         containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
// //       }
// //     }
// //   };

// //   const gridCols = {
// //     2: 'grid-cols-2',
// //     3: 'grid-cols-2 md:grid-cols-3',
// //     4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
// //     5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
// //     6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
// //   }[itemsPerRow] || 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6';

// //   const getResponsiveItemsPerRow = () => {
// //     if (isMobile) return 2;
// //     if (itemsPerRow <= 2) return 2;
// //     if (itemsPerRow <= 3) return 3;
// //     if (itemsPerRow <= 4) return 4;
// //     if (itemsPerRow <= 5) return 5;
// //     return 6;
// //   };

// //   const displayItemsPerRow = getResponsiveItemsPerRow();

// //   return (
// //     <>
// //       <section className="w-full bg-white py-4 sm:py-6 md:py-10" ref={containerRef}>
// //         <div className="mx-auto w-full max-w-[1450px] px-3 sm:px-4 lg:px-8">
          
// //           {/* =========================
// //               SECTION HEADER - Beauty Bucket Style
// //           ========================== */}
// //           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
// //             <div>
// //               <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-[#263b32] tracking-tight leading-[1.1]" style={{ fontFamily: FONT_FAMILY }}>
// //                 {title || 'Our Products'}
// //               </h2>
// //               {description && (
// //                 <p className="text-[10px] sm:text-xs md:text-sm text-[#53645a] mt-0.5 sm:mt-1" style={{ fontFamily: FONT_FAMILY }}>
// //                   {description}
// //                 </p>
// //               )}
// //             </div>
// //           </div>

// //           {/* =========================
// //               PRODUCTS CAROUSEL WITH ARROWS
// //           ========================== */}
// //           <div className="relative">
// //             {/* Left Arrow - Desktop */}
// //             {totalPages > 1 && (
// //               <button
// //                 onClick={handlePrev}
// //                 disabled={currentIndex === 0}
// //                 className={`
// //                   absolute left-0 top-1/2 -translate-y-1/2 z-10 
// //                   hidden md:flex
// //                   items-center justify-center -ml-8
// //                   w-8 h-8 rounded-full 
// //                   bg-white border border-[#8B9D83]/30 shadow-md 
// //                   transition-all duration-200
// //                   ${currentIndex > 0 
// //                     ? 'hover:bg-[#8B9D83] hover:text-white hover:border-[#8B9D83]' 
// //                     : 'opacity-40 cursor-not-allowed'
// //                   }
// //                 `}
// //                 aria-label="Previous products"
// //               >
// //                 <ChevronLeft className="w-4 h-4" />
// //               </button>
// //             )}

// //             {/* Products Grid - Desktop */}
// //             <div className="hidden md:block">
// //               <AnimatePresence mode="wait">
// //                 <motion.div
// //                   key={currentIndex}
// //                   initial={{ opacity: 0, x: 20 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   exit={{ opacity: 0, x: -20 }}
// //                   transition={{ duration: 0.4 }}
// //                   className={`grid ${gridCols} gap-2 sm:gap-3`}
// //                 >
// //                   {currentProducts.map((product) => {
// //                     const productId = product._id || product.id;
// //                     return (
// //                       <ProductCard 
// //                         key={productId}
// //                         product={product}
// //                         isInCart={productsInCart[productId] || false}
// //                         onCartStatusChange={onCartStatusChange}
// //                         onViewInCart={openCartSidebar}
// //                       />
// //                     );
// //                   })}
// //                 </motion.div>
// //               </AnimatePresence>
// //             </div>

// //             {/* Products Grid - Mobile (Horizontal Scroll) */}
// //             <div className="md:hidden">
// //               <div 
// //                 ref={sliderRef}
// //                 className="flex gap-2 overflow-x-auto scroll-smooth pb-2"
// //                 style={{
// //                   scrollbarWidth: 'none',
// //                   msOverflowStyle: 'none',
// //                   WebkitOverflowScrolling: 'touch'
// //                 }}
// //               >
// //                 {products.map((product) => {
// //                   const productId = product._id || product.id;
// //                   return (
// //                     <div key={productId} className="w-[48%] flex-shrink-0">
// //                       <ProductCard 
// //                         product={product}
// //                         isInCart={productsInCart[productId] || false}
// //                         onCartStatusChange={onCartStatusChange}
// //                         onViewInCart={openCartSidebar}
// //                       />
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             </div>

// //             {/* Right Arrow - Desktop */}
// //             {totalPages > 1 && (
// //               <button
// //                 onClick={handleNext}
// //                 disabled={currentIndex === totalPages - 1}
// //                 className={`
// //                   absolute right-0 top-1/2 -translate-y-1/2 z-10 
// //                   hidden md:flex
// //                   items-center justify-center
// //                   w-8 h-8 rounded-full 
// //                   bg-white border border-[#8B9D83]/30 shadow-md -mr-8
// //                   transition-all duration-200
// //                   ${currentIndex < totalPages - 1 
// //                     ? 'hover:bg-[#8B9D83] hover:text-white hover:border-[#8B9D83]' 
// //                     : 'opacity-40 cursor-not-allowed'
// //                   }
// //                 `}
// //                 aria-label="Next products"
// //               >
// //                 <ChevronRight className="w-4 h-4" />
// //               </button>
// //             )}

// //             {/* Mobile Scroll Hint */}
// //             {isMobile && products.length > displayItemsPerRow && (
// //               <div className="text-center mt-3">
// //                 <span className="text-[8px] text-gray-400 flex items-center justify-center gap-1" style={{ fontFamily: FONT_FAMILY }}>
// //                   <span>← Swipe to see more →</span>
// //                 </span>
// //               </div>
// //             )}
// //           </div>

// //           {/* =========================
// //               PAGE INDICATOR - Desktop
// //           ========================== */}
// //           {totalPages > 1 && (
// //             <div className="hidden md:flex items-center justify-center mt-4 sm:mt-6 gap-2">
// //               {Array.from({ length: totalPages }).map((_, index) => (
// //                 <button
// //                   key={index}
// //                   onClick={() => setCurrentIndex(index)}
// //                   className={`rounded-full transition-all duration-300 ${
// //                     index === currentIndex
// //                       ? 'w-5 h-1.5 bg-[#8B9D83]'
// //                       : 'w-1.5 h-1.5 bg-[#8B9D83]/30 hover:bg-[#8B9D83]/60'
// //                   }`}
// //                   aria-label={`Go to page ${index + 1}`}
// //                 />
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </section>

// //       {/* Cart Sidebar */}
// //       <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
// //     </>
// //   );
// // }


// // Main Product Grid Section Component - Horizontal Scroll with Arrow Navigation
// export default function ProductGridSection({ 
//   title, 
//   description, 
//   products = [], 
//   layout = 'grid',
//   itemsPerRow = 6,
//   showViewAll = true,
//   viewAllLink = '/products',
//   sectionBadge = 'Products'
// }) {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [productsInCart, setProductsInCart] = useState({});
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isPaused, setIsPaused] = useState(false);
//   const sliderRef = useRef(null);
//   const containerRef = useRef(null);

//   // Mobile scroll state
//   const [mobileStartIndex, setMobileStartIndex] = useState(0);
//   const mobileItemsPerView = 2;

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Reset mobile index when products change
//   useEffect(() => {
//     setMobileStartIndex(0);
//   }, [products]);

//   // Check cart status for products
//   const checkCartStatus = async (productsList) => {
//     if (!productsList || productsList.length === 0) return;
    
//     const productIds = productsList.map(p => p._id || p.id).filter(Boolean);
//     if (productIds.length === 0) return;
    
//     const token = localStorage.getItem('token');
//     const sessionId = localStorage.getItem('cartSessionId');
    
//     const headers = {};
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     } else if (sessionId) {
//       headers['x-session-id'] = sessionId;
//     } else {
//       const emptyCartStatus = {};
//       productIds.forEach(id => {
//         emptyCartStatus[id] = false;
//       });
//       setProductsInCart(emptyCartStatus);
//       return;
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
//       } else {
//         const emptyCartStatus = {};
//         productIds.forEach(id => {
//           emptyCartStatus[id] = false;
//         });
//         setProductsInCart(emptyCartStatus);
//       }
//     } catch (error) {
//       console.error('Error checking cart status:', error);
//       const emptyCartStatus = {};
//       productIds.forEach(id => {
//         emptyCartStatus[id] = false;
//       });
//       setProductsInCart(emptyCartStatus);
//     }
//   };

//   // Listen for cart update events
//   useEffect(() => {
//     const handleCartUpdate = () => {
//       if (products.length > 0) {
//         checkCartStatus(products);
//       }
//     };

//     window.addEventListener('cart-update', handleCartUpdate);
//     return () => {
//       window.removeEventListener('cart-update', handleCartUpdate);
//     };
//   }, [products]);

//   // Initial cart status check
//   useEffect(() => {
//     if (products.length > 0) {
//       checkCartStatus(products);
//     }
//   }, [products]);

//   const onCartStatusChange = useCallback((productId, isInCart) => {
//     setProductsInCart(prev => ({
//       ...prev,
//       [productId]: isInCart
//     }));
//   }, []);

//   const openCartSidebar = () => {
//     setIsCartOpen(true);
//   };

//   const closeCartSidebar = () => {
//     setIsCartOpen(false);
//   };

//   if (!products || products.length === 0) {
//     return null;
//   }

//   const totalPages = Math.ceil(products.length / itemsPerRow);
//   const currentProducts = products.slice(
//     currentIndex * itemsPerRow,
//     (currentIndex + 1) * itemsPerRow
//   );

//   // Mobile navigation handlers
//   const handleMobileNext = () => {
//     const maxStart = Math.max(0, products.length - mobileItemsPerView);
//     if (mobileStartIndex < maxStart) {
//       setMobileStartIndex(Math.min(mobileStartIndex + mobileItemsPerView, maxStart));
//     }
//   };

//   const handleMobilePrev = () => {
//     if (mobileStartIndex > 0) {
//       setMobileStartIndex(Math.max(mobileStartIndex - mobileItemsPerView, 0));
//     }
//   };

//   // Get mobile visible products
//   const getMobileVisibleProducts = () => {
//     return products.slice(mobileStartIndex, mobileStartIndex + mobileItemsPerView);
//   };

//   const handleNext = () => {
//     if (currentIndex < totalPages - 1) {
//       setCurrentIndex(currentIndex + 1);
//       if (isMobile && containerRef.current) {
//         containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//       if (isMobile && containerRef.current) {
//         containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//       }
//     }
//   };

//   const gridCols = {
//     2: 'grid-cols-2',
//     3: 'grid-cols-2 md:grid-cols-3',
//     4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
//     5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
//     6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
//   }[itemsPerRow] || 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6';

//   const getResponsiveItemsPerRow = () => {
//     if (isMobile) return 2;
//     if (itemsPerRow <= 2) return 2;
//     if (itemsPerRow <= 3) return 3;
//     if (itemsPerRow <= 4) return 4;
//     if (itemsPerRow <= 5) return 5;
//     return 6;
//   };

//   const displayItemsPerRow = getResponsiveItemsPerRow();
//   const mobileVisibleProducts = getMobileVisibleProducts();
//   const showMobilePrev = mobileStartIndex > 0;
//   const showMobileNext = mobileStartIndex + mobileItemsPerView < products.length;

//   return (
//     <>
//       <section className="w-full bg-white py-4 sm:py-6 md:py-10" ref={containerRef}>
//         <div className="mx-auto w-full max-w-[1450px] px-3 sm:px-4 lg:px-8">
          
//           {/* =========================
//               SECTION HEADER - Beauty Bucket Style
//           ========================== */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
//             <div>
//               <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-[#263b32] tracking-tight leading-[1.1]" style={{ fontFamily: FONT_FAMILY }}>
//                 {title || 'Our Products'}
//               </h2>
//               {description && (
//                 <p className="text-[10px] sm:text-xs md:text-sm text-[#53645a] mt-0.5 sm:mt-1" style={{ fontFamily: FONT_FAMILY }}>
//                   {description}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* =========================
//               PRODUCTS CAROUSEL WITH ARROWS
//           ========================== */}
//           <div className="relative">
//             {/* Left Arrow - Desktop */}
//             {totalPages > 1 && (
//               <button
//                 onClick={handlePrev}
//                 disabled={currentIndex === 0}
//                 className={`
//                   absolute left-0 top-1/2 -translate-y-1/2 z-10 
//                   hidden md:flex
//                   items-center justify-center -ml-8
//                   w-8 h-8 rounded-full 
//                   bg-white border border-[#8B9D83]/30 shadow-md 
//                   transition-all duration-200
//                   ${currentIndex > 0 
//                     ? 'hover:bg-[#8B9D83] hover:text-white hover:border-[#8B9D83]' 
//                     : 'opacity-40 cursor-not-allowed'
//                   }
//                 `}
//                 aria-label="Previous products"
//               >
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//             )}

//             {/* Products Grid - Desktop */}
//             <div className="hidden md:block">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={currentIndex}
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.4 }}
//                   className={`grid ${gridCols} gap-2 sm:gap-3`}
//                 >
//                   {currentProducts.map((product) => {
//                     const productId = product._id || product.id;
//                     return (
//                       <ProductCard 
//                         key={productId}
//                         product={product}
//                         isInCart={productsInCart[productId] || false}
//                         onCartStatusChange={onCartStatusChange}
//                         onViewInCart={openCartSidebar}
//                       />
//                     );
//                   })}
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* Products Grid - Mobile */}
//             <div className="md:hidden">
//               <div className="flex gap-2 overflow-hidden">
//                 {mobileVisibleProducts.map((product) => {
//                   const productId = product._id || product.id;
//                   return (
//                     <div key={productId} className="w-[48%] flex-shrink-0">
//                       <ProductCard 
//                         product={product}
//                         isInCart={productsInCart[productId] || false}
//                         onCartStatusChange={onCartStatusChange}
//                         onViewInCart={openCartSidebar}
//                       />
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Right Arrow - Desktop */}
//             {totalPages > 1 && (
//               <button
//                 onClick={handleNext}
//                 disabled={currentIndex === totalPages - 1}
//                 className={`
//                   absolute right-0 top-1/2 -translate-y-1/2 z-10 
//                   hidden md:flex
//                   items-center justify-center
//                   w-8 h-8 rounded-full 
//                   bg-white border border-[#8B9D83]/30 shadow-md -mr-8
//                   transition-all duration-200
//                   ${currentIndex < totalPages - 1 
//                     ? 'hover:bg-[#8B9D83] hover:text-white hover:border-[#8B9D83]' 
//                     : 'opacity-40 cursor-not-allowed'
//                   }
//                 `}
//                 aria-label="Next products"
//               >
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             )}
//           </div>

//           {/* =========================
//               PAGE INDICATOR - Desktop
//           ========================== */}
//           {totalPages > 1 && (
//             <div className="hidden md:flex items-center justify-center mt-4 sm:mt-6 gap-2">
//               {Array.from({ length: totalPages }).map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentIndex(index)}
//                   className={`rounded-full transition-all duration-300 ${
//                     index === currentIndex
//                       ? 'w-5 h-1.5 bg-[#8B9D83]'
//                       : 'w-1.5 h-1.5 bg-[#8B9D83]/30 hover:bg-[#8B9D83]/60'
//                   }`}
//                   aria-label={`Go to page ${index + 1}`}
//                 />
//               ))}
//             </div>
//           )}

//           {/* =========================
//               MOBILE ARROW BUTTONS - Bottom (No Background)
//           ========================== */}
//           {isMobile && products.length > mobileItemsPerView && (
//             <div className="flex items-center justify-center gap-4 mt-3 md:hidden">
//               <button
//                 onClick={handleMobilePrev}
//                 disabled={!showMobilePrev}
//                 className={`
//                   flex items-center justify-center
//                   w-8 h-8
//                   transition-all duration-200
//                   text-[#8B9D83]
//                   ${showMobilePrev 
//                     ? 'hover:text-[#6b7d63]' 
//                     : 'opacity-30 cursor-not-allowed'
//                   }
//                 `}
//                 aria-label="Previous products"
//               >
//                 <ChevronLeft className="w-5 h-5" />
//               </button>
              
//               {/* Page Indicator - Mobile */}
//               <div className="flex items-center gap-1.5">
//                 {Array.from({ length: Math.ceil(products.length / mobileItemsPerView) }).map((_, index) => {
//                   const isActive = Math.floor(mobileStartIndex / mobileItemsPerView) === index;
//                   return (
//                     <button
//                       key={index}
//                       onClick={() => {
//                         const newStart = index * mobileItemsPerView;
//                         setMobileStartIndex(Math.min(newStart, products.length - mobileItemsPerView));
//                       }}
//                       className={`rounded-full transition-all duration-300 ${
//                         isActive
//                           ? 'w-4 h-1.5 bg-[#8B9D83]'
//                           : 'w-1.5 h-1.5 bg-[#8B9D83]/30 hover:bg-[#8B9D83]/60'
//                       }`}
//                       aria-label={`Go to page ${index + 1}`}
//                     />
//                   );
//                 })}
//               </div>
              
//               <button
//                 onClick={handleMobileNext}
//                 disabled={!showMobileNext}
//                 className={`
//                   flex items-center justify-center
//                   w-8 h-8
//                   transition-all duration-200
//                   text-[#8B9D83]
//                   ${showMobileNext 
//                     ? 'hover:text-[#6b7d63]' 
//                     : 'opacity-30 cursor-not-allowed'
//                   }
//                 `}
//                 aria-label="Next products"
//               >
//                 <ChevronRight className="w-5 h-5" />
//               </button>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Cart Sidebar */}
//       <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
//     </>
//   );
// }


'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Star,
  AlertTriangle,
  Heart,
  Eye
} from 'lucide-react';
import { toast } from 'sonner';
import CartSidebar from '../CartSidebar';

// ============================================================
// Font Constants
// ============================================================
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";

// ============================================================
// Helpers
// ============================================================
const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

const truncateText = (text, limit = 25) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const formatPrice = (price) => {
  return price ? price.toFixed(0) : '0';
};

// ============================================================
// Product Card — Matching Featured Design (white/black/red)
// ============================================================
const ProductCard = ({
  product,
  isInCart: propIsInCart,
  onCartStatusChange,
  onViewInCart,
}) => {
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(propIsInCart || false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
      typeof product.image === 'string'
        ? product.image
        : product.image?.url || '',
    ].filter(Boolean);
  }
  if (productImages.length === 0) {
    productImages = ['/placeholder-product.jpg'];
  }

  const hasHoverImage = productImages.length > 1;
  const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
  const currentPrice =
    discountPrice > 0 && discountPrice < regularPrice
      ? discountPrice
      : regularPrice;
  const originalPrice = regularPrice;

  const isLowStock =
    product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
  const isOutOfStock = stockQuantity <= 0;

  const rating = product?.rating ? Number(product.rating) : 4.7;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const hasMultipleImages = productImages.length > 1;

  // ----------------------------------------------------------------
  // Wishlist
  // ----------------------------------------------------------------
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

      if (token) {
        headers.Authorization = `Bearer ${token}`;
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
        if (onCartStatusChange) onCartStatusChange(productId, true);
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
    window.location.href = `/product/${productSlug}`;
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current text-yellow-400" />
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
          <Star key={i} className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-300" />
        );
      }
    }
    return stars;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHasUserNavigated(false);
    setActiveIndex(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/product/${productSlug}`} className="block h-full">
        <article
          className="
            relative flex h-full flex-col
            bg-white
            border border-gray-200
            rounded-md
            overflow-hidden
            transition-all duration-300
            hover:border-[#d92f45]
            hover:shadow-[0_8px_24px_rgba(217,47,69,0.10)]
          "
        >
          {/* PRODUCT IMAGE */}
          <div className="relative w-full aspect-[0.79] overflow-hidden bg-[#fafafa]">
            <Image
              src={getCurrentImage()}
              alt={productName}
              fill
              sizes="(max-width: 640px) 82vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
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

            <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/[0.03]" />

            {/* Top-right radial shade */}
            <div
              className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 ${
                isMobile ? 'opacity-100' : isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                background:
                  'radial-gradient(circle 130px at 100% 0%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.28) 35%, rgba(0,0,0,0.10) 65%, rgba(0,0,0,0) 100%)',
              }}
            />

            {/* Discount Badge — Red */}
            {discountPercent > 0 && (
              <div className="absolute left-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#d92f45] text-white shadow-md">
                <span className="text-[10px] font-bold leading-none text-center">
                  {discountPercent}%
                  <br />
                  OFF
                </span>
              </div>
            )}

            {/* Out of Stock */}
            {isOutOfStock && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/55">
                <span className="rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white">
                  Out of Stock
                </span>
              </div>
            )}

            {/* Low Stock */}
            {!isOutOfStock && isLowStock && (
              <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 rounded bg-orange-500 px-2 py-1 text-[9px] font-medium text-white shadow-md">
                <AlertTriangle className="h-2.5 w-2.5" />
                <span className="hidden xs:inline">Only {stockQuantity} left</span>
                <span className="xs:hidden">{stockQuantity} left</span>
              </div>
            )}

            {/* Hover action icons */}
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
                  <Loader2 className={`animate-spin ${isInCart ? 'h-3.5 w-3.5' : 'h-5 w-5'}`} />
                ) : (
                  <ShoppingBag className={isInCart ? 'h-3.5 w-3.5' : 'h-5 w-5'} />
                )}
              </button>

              {/* View */}
              <button
                type="button"
                onClick={handleViewDetails}
                aria-label="Quick view"
                className="group/btn flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] transition-all duration-200 hover:scale-125"
              >
                <Eye className="h-5 w-5 transition-colors duration-200 group-hover/btn:text-[#d92f45]" />
              </button>
            </div>

            {/* Image navigation */}
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

          {/* PRODUCT DETAILS */}
          <div className="flex flex-1 flex-col px-3 pt-2 pb-3">
            <h3
              className="
                min-h-[42px]
                text-[14px]
                font-normal
                leading-[1.35]
                text-[#1a1a1a]
                sm:text-[15px]
                lg:text-[16px]
                line-clamp-2
              "
              style={{ fontFamily: FONT_FAMILY }}
              title={productName}
            >
              {truncateText(productName, 60)}
            </h3>

            <div className="mt-0.5 flex items-center gap-1">
              <div className="flex items-center gap-0.5">{renderStars()}</div>
              <span
                className="text-[11px] font-normal text-gray-600"
                style={{ fontFamily: FONT_FAMILY }}
              >
                {rating.toFixed(1)}
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between gap-2">
              <p
                className="text-[15px] font-semibold text-[#1a1a1a] sm:text-[16px]"
                style={{ fontFamily: FONT_FAMILY }}
              >
                Tk. {formatPrice(currentPrice)}
                {discountPercent > 0 && (
                  <span className="ml-2 text-[11px] font-normal text-gray-400 line-through">
                    Tk. {formatPrice(originalPrice)}
                  </span>
                )}
              </p>

              {/* Price row cart icon */}
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
                  ${isInCart
                    ? 'h-8 w-8 rounded-full bg-[#d92f45] text-white shadow-md'
                    : isOutOfStock
                    ? 'h-9 w-9 text-gray-300'
                    : 'h-9 w-9 text-[#d92f45] hover:text-[#b82238]'
                  }
                `}
              >
                {cartStatusLoading ? (
                  <Loader2 className={`animate-spin ${isInCart ? 'h-4 w-4' : 'h-5 w-5'}`} />
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
    </motion.div>
  );
};

// ============================================================
// Main Product Grid Section
// ============================================================
export default function ProductGridSection({
  title,
  description,
  products = [],
  itemsPerRow = 6,
  showViewAll = true,
  viewAllLink = '/products',
  sectionBadge = 'Products',
}) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productsInCart, setProductsInCart] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  // Mobile scroll state
  const [mobileStartIndex, setMobileStartIndex] = useState(0);
  const mobileItemsPerView = 2;

  // ------------------------------------------------------------
  // Mobile detection
  // ------------------------------------------------------------
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setMobileStartIndex(0);
  }, [products]);

  // ------------------------------------------------------------
  // Cart status
  // ------------------------------------------------------------
  const checkCartStatus = async (productsList) => {
    if (!productsList || productsList.length === 0) return;

    const productIds = productsList.map((p) => p._id || p.id).filter(Boolean);
    if (productIds.length === 0) return;

    const token = localStorage.getItem('token');
    const sessionId = localStorage.getItem('cartSessionId');

    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else if (sessionId) {
      headers['x-session-id'] = sessionId;
    } else {
      const emptyCartStatus = {};
      productIds.forEach((id) => (emptyCartStatus[id] = false));
      setProductsInCart(emptyCartStatus);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/cart/check-status', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds }),
      });

      const data = await response.json();
      if (data.success) {
        setProductsInCart(data.data);
      } else {
        const emptyCartStatus = {};
        productIds.forEach((id) => (emptyCartStatus[id] = false));
        setProductsInCart(emptyCartStatus);
      }
    } catch (error) {
      console.error('Error checking cart status:', error);
      const emptyCartStatus = {};
      productIds.forEach((id) => (emptyCartStatus[id] = false));
      setProductsInCart(emptyCartStatus);
    }
  };

  useEffect(() => {
    const handleCartUpdate = () => {
      if (products.length > 0) checkCartStatus(products);
    };

    window.addEventListener('cart-update', handleCartUpdate);
    return () => {
      window.removeEventListener('cart-update', handleCartUpdate);
    };
  }, [products]);

  useEffect(() => {
    if (products.length > 0) checkCartStatus(products);
  }, [products]);

  const onCartStatusChange = useCallback((productId, isInCart) => {
    setProductsInCart((prev) => ({ ...prev, [productId]: isInCart }));
  }, []);

  const openCartSidebar = () => setIsCartOpen(true);
  const closeCartSidebar = () => setIsCartOpen(false);

  if (!products || products.length === 0) return null;

  const totalPages = Math.ceil(products.length / itemsPerRow);
  const currentProducts = products.slice(
    currentIndex * itemsPerRow,
    (currentIndex + 1) * itemsPerRow
  );

  const handleMobileNext = () => {
    const maxStart = Math.max(0, products.length - mobileItemsPerView);
    if (mobileStartIndex < maxStart) {
      setMobileStartIndex(Math.min(mobileStartIndex + mobileItemsPerView, maxStart));
    }
  };

  const handleMobilePrev = () => {
    if (mobileStartIndex > 0) {
      setMobileStartIndex(Math.max(mobileStartIndex - mobileItemsPerView, 0));
    }
  };

  const mobileVisibleProducts = products.slice(
    mobileStartIndex,
    mobileStartIndex + mobileItemsPerView
  );

  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
      if (isMobile && containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      if (isMobile && containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // 6 columns on xl, 4 on lg, 3 on md, 2 on mobile
  const gridCols =
    'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6';

  const showMobilePrev = mobileStartIndex > 0;
  const showMobileNext = mobileStartIndex + mobileItemsPerView < products.length;

  return (
    <>
      <section className="w-full bg-white py-6 sm:py-8 md:py-12" ref={containerRef}>
        <div className="mx-auto w-full max-w-[1450px] px-3 sm:px-4 lg:px-8">

          {/* SECTION HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <h2
                className="text-xl sm:text-2xl md:text-3xl font-light text-[#1a1a1a] tracking-tight leading-[1.1]"
                style={{ fontFamily: FONT_FAMILY }}
              >
                {title || 'Our Products'}
              </h2>
              {description && (
                <p
                  className="text-[11px] sm:text-xs md:text-sm text-gray-500 mt-1"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  {description}
                </p>
              )}
              <div className="mt-2 h-[2px] w-12 bg-[#d92f45]" />
            </div>
          </div>

          {/* PRODUCTS CAROUSEL WITH ARROWS */}
          <div className="relative">

            {/* LEFT ARROW */}
            {totalPages > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                aria-label="Previous products"
                className={`
                  absolute left-0 top-1/2 -translate-y-1/2 z-10
                  hidden md:flex
                  items-center justify-center
                  -ml-8
                  w-8 h-8 rounded-full
                  bg-white border border-[#d92f45]/30 shadow-md
                  transition-all duration-200
                  ${currentIndex > 0
                    ? 'cursor-pointer hover:bg-[#d92f45] hover:text-white hover:border-[#d92f45]'
                    : 'opacity-40 cursor-not-allowed'
                  }
                `}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {/* DESKTOP GRID — 6 per page */}
            <div className="hidden md:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className={`grid ${gridCols} gap-3 sm:gap-4`}
                >
                  {currentProducts.map((product) => {
                    const productId = product._id || product.id;
                    return (
                      <ProductCard
                        key={productId}
                        product={product}
                        isInCart={productsInCart[productId] || false}
                        onCartStatusChange={onCartStatusChange}
                        onViewInCart={openCartSidebar}
                      />
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* MOBILE GRID */}
            <div className="md:hidden">
              <div className="flex gap-3 overflow-hidden">
                {mobileVisibleProducts.map((product) => {
                  const productId = product._id || product.id;
                  return (
                    <div key={productId} className="w-[48%] flex-shrink-0">
                      <ProductCard
                        product={product}
                        isInCart={productsInCart[productId] || false}
                        onCartStatusChange={onCartStatusChange}
                        onViewInCart={openCartSidebar}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT ARROW */}
            {totalPages > 1 && (
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex === totalPages - 1}
                aria-label="Next products"
                className={`
                  absolute right-0 top-1/2 -translate-y-1/2 z-10
                  hidden md:flex
                  items-center justify-center
                  w-8 h-8 rounded-full
                  bg-white border border-[#d92f45]/30 shadow-md
                  -mr-8
                  transition-all duration-200
                  ${currentIndex < totalPages - 1
                    ? 'cursor-pointer hover:bg-[#d92f45] hover:text-white hover:border-[#d92f45]'
                    : 'opacity-40 cursor-not-allowed'
                  }
                `}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* DESKTOP DOTS */}
          {totalPages > 1 && (
            <div className="hidden md:flex items-center justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to page ${index + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-6 h-[6px] bg-[#d92f45]'
                      : 'w-[6px] h-[6px] bg-[#d92f45]/30 hover:bg-[#d92f45]/60'
                  }`}
                />
              ))}
            </div>
          )}

          {/* MOBILE ARROWS + DOTS */}
          {isMobile && products.length > mobileItemsPerView && (
            <div className="flex items-center justify-center gap-4 mt-4 md:hidden">
              <button
                onClick={handleMobilePrev}
                disabled={!showMobilePrev}
                className={`
                  flex items-center justify-center
                  w-8 h-8
                  transition-all duration-200
                  text-[#d92f45]
                  ${showMobilePrev ? 'hover:text-[#b82238]' : 'opacity-30 cursor-not-allowed'}
                `}
                aria-label="Previous products"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({
                  length: Math.ceil(products.length / mobileItemsPerView),
                }).map((_, index) => {
                  const isActive =
                    Math.floor(mobileStartIndex / mobileItemsPerView) === index;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        const newStart = index * mobileItemsPerView;
                        setMobileStartIndex(
                          Math.min(newStart, products.length - mobileItemsPerView)
                        );
                      }}
                      aria-label={`Go to page ${index + 1}`}
                      className={`rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-5 h-[5px] bg-[#d92f45]'
                          : 'w-[5px] h-[5px] bg-[#d92f45]/30 hover:bg-[#d92f45]/60'
                      }`}
                    />
                  );
                })}
              </div>

              <button
                onClick={handleMobileNext}
                disabled={!showMobileNext}
                className={`
                  flex items-center justify-center
                  w-8 h-8
                  transition-all duration-200
                  text-[#d92f45]
                  ${showMobileNext ? 'hover:text-[#b82238]' : 'opacity-30 cursor-not-allowed'}
                `}
                aria-label="Next products"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </section>

      <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
    </>
  );
}