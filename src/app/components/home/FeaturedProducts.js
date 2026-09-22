

// 'use client';

// import { useState, useEffect, useCallback, useRef } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { 
//   ShoppingBag,
//   Loader2,
//   ChevronLeft,
//   ChevronRight,
//   Star,
//   Package,
//   AlertTriangle,
//   Heart,
//   Eye
// } from 'lucide-react';
// import { toast } from 'sonner';
// import CartSidebar from '../CartSidebar';

// // ============================================================
// // Helpers
// // ============================================================
// const calculateDiscountPercentage = (regularPrice, discountPrice) => {
//   if (regularPrice && discountPrice && discountPrice < regularPrice) {
//     return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
//   }
//   return 0;
// };

// const truncateText = (text, limit = 25) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// const formatPrice = (price) => {
//   return price ? price.toFixed(0) : '0';
// };

// // ============================================================
// // Product Card
// // ============================================================
// const FeaturedProductCard = ({
//   product,
//   isInCart: propIsInCart,
//   onCartStatusChange,
//   onViewInCart,
// }) => {
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isInCart, setIsInCart] = useState(propIsInCart || false);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [imageErrors, setImageErrors] = useState({});
//   const [hasUserNavigated, setHasUserNavigated] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);
//   const [likedLoading, setLikedLoading] = useState(false);

//   const productId = product?._id || product?.id || 'unknown';
//   const productName = product?.productName || product?.name || 'Product';
//   const productSlug = product?.slug || productId;
//   const regularPrice = Number(product?.regularPrice || product?.price || 0);
//   const discountPrice = Number(product?.discountPrice || 0);
//   const stockQuantity = Number(product?.stockQuantity || 0);

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
//     productImages = [
//       typeof product.image === 'string'
//         ? product.image
//         : product.image?.url || '',
//     ].filter(Boolean);
//   }
//   if (productImages.length === 0) {
//     productImages = ['/placeholder-product.jpg'];
//   }

//   const hasHoverImage = productImages.length > 1;
//   const discountPercent = calculateDiscountPercentage(
//     regularPrice,
//     discountPrice
//   );
//   const currentPrice =
//     discountPrice > 0 && discountPrice < regularPrice
//       ? discountPrice
//       : regularPrice;
//   const originalPrice = regularPrice;

//   const isLowStock =
//     product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
//   const isOutOfStock = stockQuantity <= 0;

//   const rating = product?.rating ? Number(product.rating) : 4.7;
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating - fullStars >= 0.5;
//   const hasMultipleImages = productImages.length > 1;

//   useEffect(() => {
//     if (typeof window === 'undefined') return;
//     try {
//       const liked = JSON.parse(localStorage.getItem('wishlist') || '[]');
//       setIsLiked(liked.includes(productId));
//     } catch (_) {}
//   }, [productId]);

//   const handleToggleLike = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setLikedLoading(true);

//     try {
//       const liked = JSON.parse(localStorage.getItem('wishlist') || '[]');
//       let updated;
//       if (liked.includes(productId)) {
//         updated = liked.filter((id) => id !== productId);
//         setIsLiked(false);
//         toast.success('Removed from wishlist');
//       } else {
//         updated = [...liked, productId];
//         setIsLiked(true);
//         toast.success('Added to wishlist');
//       }
//       localStorage.setItem('wishlist', JSON.stringify(updated));
//       window.dispatchEvent(new Event('wishlist-update'));
//     } catch (error) {
//       toast.error('Failed to update wishlist');
//     } finally {
//       setLikedLoading(false);
//     }
//   };

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     setIsInCart(propIsInCart || false);
//   }, [propIsInCart]);

//   useEffect(() => {
//     if (!isHovered) {
//       setHasUserNavigated(false);
//       setActiveIndex(0);
//     }
//   }, [isHovered]);

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
//       setActiveIndex(
//         (prev) => (prev - 1 + productImages.length) % productImages.length
//       );
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
//         headers.Authorization = `Bearer ${token}`;
//       } else if (sessionId) {
//         headers['x-session-id'] = sessionId;
//       }

//       const response = await fetch('http://localhost:5000/api/cart', {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({ productId, quantity: 1 }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//         toast.success('Added to cart!', { id: toastId });
//         setIsInCart(true);
//         if (onCartStatusChange) onCartStatusChange(productId, true);
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

//   const handleViewDetails = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     window.location.href = `/product/${productSlug}`;
//   };

//   const renderStars = () => {
//     const stars = [];
//     for (let i = 0; i < 5; i++) {
//       if (i < fullStars) {
//         stars.push(
//           <Star
//             key={i}
//             className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current text-yellow-400"
//           />
//         );
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(
//           <div key={i} className="relative h-2.5 w-2.5 sm:h-3 sm:w-3">
//             <Star className="absolute h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-200" />
//             <div className="absolute left-0 top-0 h-2.5 w-2.5 sm:h-3 sm:w-3 w-1/2 overflow-hidden">
//               <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current text-yellow-400" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(
//           <Star
//             key={i}
//             className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-300"
//           />
//         );
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
//     <div
//       className="group w-full h-full"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={handleMouseLeave}
//     >
//       <Link href={`/product/${productSlug}`} className="block h-full">
//         <article className="relative flex h-full flex-col">

//           {/* PRODUCT IMAGE */}
//           <div className="relative w-full aspect-[0.79] overflow-hidden bg-[#f5f5f5]">
//             <Image
//               src={getCurrentImage()}
//               alt={productName}
//               fill
//               sizes="(max-width: 640px) 82vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
//               className={`object-cover transition-transform duration-500 ease-out ${
//                 isHovered ? 'scale-[1.03]' : 'scale-100'
//               }`}
//               onError={() =>
//                 handleImageError(
//                   isHovered && hasHoverImage && !isMobile && !hasUserNavigated
//                     ? 1
//                     : activeIndex
//                 )
//               }
//               quality={90}
//             />

//             <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/[0.03]" />

//             <div
//               className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 ${
//                 isMobile
//                   ? 'opacity-100'
//                   : isHovered
//                   ? 'opacity-100'
//                   : 'opacity-0'
//               }`}
//               style={{
//                 background:
//                   'radial-gradient(circle 130px at 100% 0%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.28) 35%, rgba(0,0,0,0.10) 65%, rgba(0,0,0,0) 100%)',
//               }}
//             />

//             {discountPercent > 0 && (
//               <div className="absolute left-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#d92f45] text-white shadow-md">
//                 <span className="text-[10px] font-bold leading-none text-center">
//                   {discountPercent}%
//                   <br />
//                   OFF
//                 </span>
//               </div>
//             )}

//             {isOutOfStock && (
//               <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/55">
//                 <span className="rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white">
//                   Out of Stock
//                 </span>
//               </div>
//             )}

//             {!isOutOfStock && isLowStock && (
//               <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 rounded bg-orange-500 px-2 py-1 text-[9px] font-medium text-white shadow-md">
//                 <AlertTriangle className="h-2.5 w-2.5" />
//                 <span className="hidden xs:inline">
//                   Only {stockQuantity} left
//                 </span>
//                 <span className="xs:hidden">{stockQuantity} left</span>
//               </div>
//             )}

//             {/* HOVER ACTION ICONS */}
//             <div
//               className={`absolute right-2.5 top-2.5 z-30 flex flex-col gap-2.5 transition-all duration-300 ease-out ${
//                 isMobile
//                   ? 'translate-x-0 opacity-100'
//                   : isHovered
//                   ? 'translate-x-0 opacity-100'
//                   : 'translate-x-3 opacity-0'
//               }`}
//             >
//               {/* Wishlist */}
//               <button
//                 type="button"
//                 onClick={handleToggleLike}
//                 disabled={likedLoading}
//                 aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
//                 className="group/btn flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] transition-all duration-200 hover:scale-125 disabled:opacity-60"
//               >
//                 {likedLoading ? (
//                   <Loader2 className="h-5 w-5 animate-spin" />
//                 ) : (
//                   <Heart
//                     className={`h-5 w-5 transition-all duration-200 ${
//                       isLiked
//                         ? 'fill-[#d92f45] text-[#d92f45]'
//                         : 'fill-transparent text-white group-hover/btn:text-[#d92f45] group-hover/btn:fill-[#d92f45]'
//                     }`}
//                   />
//                 )}
//               </button>

//               {/* Cart — filled red circle with white bag when in cart */}
//               <button
//                 type="button"
//                 onClick={handleAddToCart}
//                 disabled={isOutOfStock || cartStatusLoading}
//                 aria-label={isInCart ? 'View in cart' : 'Add to cart'}
//                 className={`flex items-center justify-center rounded-full transition-all duration-200 hover:scale-125 disabled:cursor-not-allowed disabled:opacity-60 ${
//                   isInCart
//                     ? 'h-6 w-6 bg-[#d92f45] text-white shadow-md'
//                     : 'h-5 w-5 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)]'
//                 }`}
//               >
//                 {cartStatusLoading ? (
//                   <Loader2 className={`animate-spin ${isInCart ? 'h-3.5 w-3.5' : 'h-5 w-5'}`} />
//                 ) : (
//                   <ShoppingBag className={isInCart ? 'h-3.5 w-3.5' : 'h-5 w-5'} />
//                 )}
//               </button>

//               {/* View */}
//               <button
//                 type="button"
//                 onClick={handleViewDetails}
//                 aria-label="Quick view"
//                 className="group/btn flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] transition-all duration-200 hover:scale-125"
//               >
//                 <Eye className="h-5 w-5 transition-colors duration-200 group-hover/btn:text-[#d92f45]" />
//               </button>
//             </div>

//             {hasMultipleImages && (
//               <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
//                 <button
//                   type="button"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     prevImage(e);
//                   }}
//                   className="rounded-full p-0.5"
//                   aria-label="Previous image"
//                 >
//                   <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 text-white drop-shadow-md" />
//                 </button>

//                 <div className="flex items-center gap-1.5">
//                   {productImages.map((_, index) => (
//                     <button
//                       key={index}
//                       type="button"
//                       onClick={(e) => {
//                         e.preventDefault();
//                         e.stopPropagation();
//                         goToImage(e, index);
//                       }}
//                       className={`rounded-full transition-all duration-200 ${
//                         activeIndex === index
//                           ? 'h-1.5 w-1.5 bg-white'
//                           : 'h-1 w-1 bg-white/50 hover:bg-white/80'
//                       }`}
//                       aria-label={`Go to image ${index + 1}`}
//                     />
//                   ))}
//                 </div>

//                 <button
//                   type="button"
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     nextImage(e);
//                   }}
//                   className="rounded-full p-0.5"
//                   aria-label="Next image"
//                 >
//                   <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-white drop-shadow-md" />
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* PRODUCT DETAILS */}
//           <div className="pt-2">
//             <h3
//               className="
//                 min-h-[42px]
//                 text-[15px]
//                 font-normal
//                 leading-[1.35]
//                 text-[#292929]
//                 sm:text-[16px]
//                 lg:text-[17px]
//                 line-clamp-2
//               "
//               title={productName}
//             >
//               {truncateText(productName, 60)}
//             </h3>

//             <div className="mt-0.5 flex items-center gap-1">
//               <div className="flex items-center gap-0.5">{renderStars()}</div>
//               <span className="text-[11px] font-normal text-[#292929]">
//                 {rating.toFixed(1)}
//               </span>
//             </div>

//             <div className="-mt-1 flex items-center justify-between gap-2">
//               <p className="text-[16px] font-normal text-[#292929] sm:text-[17px]">
//                 Tk. {formatPrice(currentPrice)}
//                 {discountPercent > 0 && (
//                   <span className="ml-2 text-[12px] text-gray-400 line-through">
//                     Tk. {formatPrice(originalPrice)}
//                   </span>
//                 )}
//               </p>

//               {/* Cart icon — filled red circle with white bag when in cart */}
//               <button
//                 type="button"
//                 onClick={handleAddToCart}
//                 disabled={isOutOfStock || cartStatusLoading}
//                 aria-label={isInCart ? 'View in cart' : 'Add to cart'}
//                 className={`
//                   flex shrink-0 items-center justify-center
//                   transition-all duration-200
//                   hover:scale-110
//                   disabled:cursor-not-allowed
//                   disabled:opacity-60
//                   ${isInCart
//                     ? 'h-8 w-8 rounded-full bg-[#d92f45] text-white shadow-md'
//                     : isOutOfStock
//                     ? 'h-9 w-9 text-gray-300'
//                     : 'h-9 w-9 text-[#d92f45] hover:text-[#b82238]'
//                   }
//                 `}
//               >
//                 {cartStatusLoading ? (
//                   <Loader2 className={`animate-spin ${isInCart ? 'h-4 w-4' : 'h-5 w-5'}`} />
//                 ) : (
//                   <ShoppingBag
//                     className={isInCart ? 'h-4 w-4' : 'h-5 w-5'}
//                     strokeWidth={1.8}
//                   />
//                 )}
//               </button>
//             </div>
//           </div>
//         </article>
//       </Link>
//     </div>
//   );
// };

// // ============================================================
// // Main Featured Products Component
// // ============================================================
// export default function FeaturedProducts() {
//   const sliderRef = useRef(null);

//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [productsInCart, setProductsInCart] = useState({});
//   const [isMobile, setIsMobile] = useState(false);

//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(false);
//   const [activePage, setActivePage] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(
//           'http://localhost:5000/api/products?isFeatured=true&limit=50'
//         );
//         const data = await response.json();

//         if (data.success) {
//           const filtered = data.data.filter((p) => p.isActive !== false);
//           setProducts(filtered);
//           await checkCartStatus(filtered);
//         }
//       } catch (error) {
//         console.error('Error fetching featured products:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const checkCartStatus = async (productsList) => {
//     if (!productsList || productsList.length === 0) return;
//     const productIds = productsList.map((p) => p._id || p.id).filter(Boolean);
//     if (productIds.length === 0) return;

//     const token = localStorage.getItem('token');
//     let sessionId = localStorage.getItem('cartSessionId');
//     const headers = {};

//     if (!token && !sessionId) {
//       sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
//       localStorage.setItem('cartSessionId', sessionId);
//     }

//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     } else if (sessionId) {
//       headers['x-session-id'] = sessionId;
//     } else {
//       const emptyCartStatus = {};
//       productIds.forEach((id) => (emptyCartStatus[id] = false));
//       setProductsInCart(emptyCartStatus);
//       return;
//     }

//     try {
//       const response = await fetch(
//         'http://localhost:5000/api/cart/check-status',
//         {
//           method: 'POST',
//           headers: { ...headers, 'Content-Type': 'application/json' },
//           body: JSON.stringify({ productIds }),
//         }
//       );

//       const data = await response.json();
//       if (data.success) {
//         setProductsInCart(data.data);
//       } else {
//         const emptyCartStatus = {};
//         productIds.forEach((id) => (emptyCartStatus[id] = false));
//         setProductsInCart(emptyCartStatus);
//       }
//     } catch (error) {
//       console.error('Error checking cart status:', error);
//       const emptyCartStatus = {};
//       productIds.forEach((id) => (emptyCartStatus[id] = false));
//       setProductsInCart(emptyCartStatus);
//     }
//   };

//   const updateCartStatus = useCallback(async () => {
//     if (products.length === 0) return;
//     const productIds = products.map((p) => p._id || p.id).filter(Boolean);
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
//       productIds.forEach((id) => (emptyCartStatus[id] = false));
//       setProductsInCart(emptyCartStatus);
//       return;
//     }

//     try {
//       const response = await fetch(
//         'http://localhost:5000/api/cart/check-status',
//         {
//           method: 'POST',
//           headers: { ...headers, 'Content-Type': 'application/json' },
//           body: JSON.stringify({ productIds }),
//         }
//       );
//       const data = await response.json();
//       if (data.success) {
//         setProductsInCart(data.data);
//       } else {
//         const emptyCartStatus = {};
//         productIds.forEach((id) => (emptyCartStatus[id] = false));
//         setProductsInCart(emptyCartStatus);
//       }
//     } catch (error) {
//       console.error('Error refreshing cart status:', error);
//     }
//   }, [products]);

//   useEffect(() => {
//     const handleCartUpdate = () => updateCartStatus();
//     window.addEventListener('cart-update', handleCartUpdate);
//     window.addEventListener('auth-change', handleCartUpdate);
//     return () => {
//       window.removeEventListener('cart-update', handleCartUpdate);
//       window.removeEventListener('auth-change', handleCartUpdate);
//     };
//   }, [updateCartStatus]);

//   const onCartStatusChange = useCallback((productId, isInCart) => {
//     setProductsInCart((prev) => ({ ...prev, [productId]: isInCart }));
//   }, []);

//   const openCartSidebar = () => setIsCartOpen(true);
//   const closeCartSidebar = () => setIsCartOpen(false);

//   const updateSlider = useCallback(() => {
//     const slider = sliderRef.current;
//     if (!slider) return;

//     const { scrollLeft, scrollWidth, clientWidth } = slider;
//     const TOLERANCE = 10;

//     const isAtStart = scrollLeft <= TOLERANCE;
//     const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - TOLERANCE;

//     setCanScrollLeft(!isAtStart);
//     setCanScrollRight(!isAtEnd);

//     const pageWidth = clientWidth;
//     if (pageWidth > 0) {
//       const page = Math.round(scrollLeft / pageWidth);
//       setActivePage(page);
//     }
//   }, []);

//   useEffect(() => {
//     const slider = sliderRef.current;
//     if (!slider || isLoading || products.length === 0) return;

//     updateSlider();

//     const resizeObserver = new ResizeObserver(() => updateSlider());
//     resizeObserver.observe(slider);
//     if (slider.firstElementChild) {
//       resizeObserver.observe(slider.firstElementChild);
//     }

//     slider.addEventListener('scroll', updateSlider, { passive: true });

//     return () => {
//       slider.removeEventListener('scroll', updateSlider);
//       resizeObserver.disconnect();
//     };
//   }, [products, isLoading, updateSlider]);

//   const itemsPerPage = isMobile ? 1 : 5;

//   useEffect(() => {
//     if (products.length === 0) {
//       setTotalPages(1);
//       return;
//     }
//     setTotalPages(Math.max(1, Math.ceil(products.length / itemsPerPage)));
//   }, [products, itemsPerPage]);

//   const scrollSlider = (direction) => {
//     const slider = sliderRef.current;
//     if (!slider) return;

//     const scrollAmount = slider.clientWidth;
//     slider.scrollBy({
//       left: direction === 'left' ? -scrollAmount : scrollAmount,
//       behavior: 'smooth',
//     });
//   };

//   const goToPage = (page) => {
//     const slider = sliderRef.current;
//     if (!slider) return;

//     slider.scrollTo({
//       left: page * slider.clientWidth,
//       behavior: 'smooth',
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-[400px] bg-white flex justify-center items-center">
//         <Loader2 className="w-8 h-8 animate-spin text-[#d92f45]" />
//       </div>
//     );
//   }

//   if (products.length === 0) return null;

//   return (
//     <>
//       {/* ============================================================
//           SECTION — with background image, no overlay
//       ============================================================ */}
//       <section
//         className="relative w-full py-10 sm:py-12 lg:py-14"
//         style={{
//           backgroundImage:
//             "url('/images/f4.jpg')",
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//         }}
//       >
//         <div className="relative z-10 mx-auto w-full max-w-[1450px] px-3 sm:px-4 lg:px-8">

//           {/* SECTION TITLE */}
//           <div className="mb-12 flex w-full items-center gap-4">
//             <div className="h-px flex-1 bg-[#d9d9d9]" />

//             <h2
//               className="
//                 whitespace-nowrap
//                 text-center
//                 text-[18px]
//                 font-semibold
//                 uppercase
//                 tracking-[-1px]
//                 text-[#25282b]
//                 sm:text-[24px]
//                 lg:text-[32px]
//               "
//             >
//               DON'T MISS OUR ELEGANT PICKS
//             </h2>

//             <div className="h-px flex-1 bg-[#d9d9d9]" />
//           </div>

//           {/* PRODUCTS CAROUSEL */}
//           <div className="relative">

//             {/* LEFT ARROW */}
//             {totalPages > 1 && (
//               <button
//                 type="button"
//                 onClick={() => scrollSlider('left')}
//                 disabled={!canScrollLeft}
//                 aria-label="Previous products"
//                 className={`
//                   absolute left-0 top-[38%] z-20
//                   hidden md:flex
//                   items-center justify-center
//                   -ml-8
//                   w-8 h-8 rounded-full
//                   bg-white border border-[#d92f45]/30 shadow-md
//                   transition-all duration-200
//                   ${canScrollLeft
//                     ? 'cursor-pointer hover:bg-[#d92f45] hover:text-white hover:border-[#d92f45]'
//                     : 'opacity-40 cursor-not-allowed'
//                   }
//                 `}
//               >
//                 <ChevronLeft className="w-4 h-4" />
//               </button>
//             )}

//             {/* PRODUCT SLIDER */}
//             <div
//               ref={sliderRef}
//               className="
//                 scrollbar-hide
//                 flex
//                 snap-x
//                 snap-mandatory
//                 overflow-x-auto
//                 scroll-smooth
//                 pb-1
//                 gap-2
//                 sm:gap-3
//               "
//               style={{
//                 scrollbarWidth: 'none',
//                 msOverflowStyle: 'none',
//               }}
//             >
//               {products.map((product) => (
//                 <article
//                   key={product._id || product.id}
//                   className="
//                     w-[82vw]
//                     shrink-0
//                     snap-start
//                     sm:w-[calc((100%-12px)/2)]
//                     md:w-[calc((100%-24px)/3)]
//                     lg:w-[calc((100%-48px)/5)]
//                   "
//                 >
//                   <FeaturedProductCard
//                     product={product}
//                     isInCart={productsInCart[product._id || product.id] || false}
//                     onCartStatusChange={onCartStatusChange}
//                     onViewInCart={openCartSidebar}
//                   />
//                 </article>
//               ))}
//             </div>

//             {/* RIGHT ARROW */}
//             {totalPages > 1 && (
//               <button
//                 type="button"
//                 onClick={() => scrollSlider('right')}
//                 disabled={!canScrollRight}
//                 aria-label="Next products"
//                 className={`
//                   absolute right-0 top-[38%] z-20
//                   hidden md:flex
//                   items-center justify-center
//                   -mr-8
//                   w-8 h-8 rounded-full
//                   bg-white border border-[#d92f45]/30 shadow-md
//                   transition-all duration-200
//                   ${canScrollRight
//                     ? 'cursor-pointer hover:bg-[#d92f45] hover:text-white hover:border-[#d92f45]'
//                     : 'opacity-40 cursor-not-allowed'
//                   }
//                 `}
//               >
//                 <ChevronRight className="w-4 h-4" />
//               </button>
//             )}
//           </div>

//           {/* CAROUSEL DOTS */}
//           {totalPages > 1 && (
//             <div className="mt-8 flex items-center justify-center gap-2">
//               {[...Array(totalPages)].map((_, page) => (
//                 <button
//                   key={page}
//                   type="button"
//                   onClick={() => goToPage(page)}
//                   aria-label={`Go to slide ${page + 1}`}
//                   className={`
//                     h-[6px]
//                     transition-all
//                     duration-300
//                     rounded-full
//                     ${
//                       activePage === page
//                         ? 'w-[24px] bg-[#d92f45]'
//                         : 'w-[6px] bg-[#e07888]/50 hover:bg-[#d92f45]/60'
//                     }
//                   `}
//                 />
//               ))}
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
import {
  ShoppingBag,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Star,
  Package,
  AlertTriangle,
  Heart,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner';
import CartSidebar from '../CartSidebar';

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

const formatPrice = (price) => (price ? price.toFixed(0) : '0');

// ============================================================
// Product Card
// ============================================================
const FeaturedProductCard = ({
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
    product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
  const isOutOfStock = stockQuantity <= 0;

  const rating = product?.rating ? Number(product.rating) : 4.7;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const hasMultipleImages = productImages.length > 1;

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

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHasUserNavigated(false);
    setActiveIndex(0);
  };

  return (
    <div
      className="group w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={`/product/${productSlug}`} className="block h-full">
        <article className="relative flex h-full flex-col">

          {/* PRODUCT IMAGE */}
          <div className="relative w-full aspect-[0.79] overflow-hidden bg-[#f5f5f5]">
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
                  isHovered && hasHoverImage && !isMobile && !hasUserNavigated
                    ? 1
                    : activeIndex
                )
              }
              quality={90}
            />

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

            {discountPercent > 0 && (
              <div className="absolute left-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#d92f45] text-white shadow-md">
                <span className="text-[10px] font-bold leading-none text-center">
                  {discountPercent}%
                  <br />
                  OFF
                </span>
              </div>
            )}

            {isOutOfStock && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/55">
                <span className="rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white">
                  Out of Stock
                </span>
              </div>
            )}

            {!isOutOfStock && isLowStock && (
              <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 rounded bg-orange-500 px-2 py-1 text-[9px] font-medium text-white shadow-md">
                <AlertTriangle className="h-2.5 w-2.5" />
                <span className="hidden xs:inline">
                  Only {stockQuantity} left
                </span>
                <span className="xs:hidden">{stockQuantity} left</span>
              </div>
            )}

            {/* HOVER ACTION ICONS — always visible on mobile */}
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

              <button
                type="button"
                onClick={handleViewDetails}
                aria-label="Quick view"
                className="group/btn flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] transition-all duration-200 hover:scale-125"
              >
                <Eye className="h-5 w-5 transition-colors duration-200 group-hover/btn:text-[#d92f45]" />
              </button>
            </div>

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
          <div className="pt-2">
            <h3
              className="
                min-h-[42px]
                text-[15px]
                font-normal
                leading-[1.35]
                text-[#292929]
                sm:text-[16px]
                lg:text-[17px]
                line-clamp-2
              "
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
              <p className="text-[16px] font-normal text-[#292929] sm:text-[17px]">
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
    </div>
  );
};

// ============================================================
// Main Featured Products Component
// ============================================================
export default function FeaturedProducts() {
  const sliderRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productsInCart, setProductsInCart] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activePage, setActivePage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'http://localhost:5000/api/products?isFeatured=true&limit=50'
        );
        const data = await response.json();

        if (data.success) {
          const filtered = data.data.filter((p) => p.isActive !== false);
          setProducts(filtered);
          await checkCartStatus(filtered);
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const checkCartStatus = async (productsList) => {
    if (!productsList || productsList.length === 0) return;
    const productIds = productsList.map((p) => p._id || p.id).filter(Boolean);
    if (productIds.length === 0) return;

    const token = localStorage.getItem('token');
    let sessionId = localStorage.getItem('cartSessionId');
    const headers = {};

    if (!token && !sessionId) {
      sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem('cartSessionId', sessionId);
    }

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
      const response = await fetch(
        'http://localhost:5000/api/cart/check-status',
        {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds }),
        }
      );

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

  const updateCartStatus = useCallback(async () => {
    if (products.length === 0) return;
    const productIds = products.map((p) => p._id || p.id).filter(Boolean);
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
      const response = await fetch(
        'http://localhost:5000/api/cart/check-status',
        {
          method: 'POST',
          headers: { ...headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setProductsInCart(data.data);
      } else {
        const emptyCartStatus = {};
        productIds.forEach((id) => (emptyCartStatus[id] = false));
        setProductsInCart(emptyCartStatus);
      }
    } catch (error) {
      console.error('Error refreshing cart status:', error);
    }
  }, [products]);

  useEffect(() => {
    const handleCartUpdate = () => updateCartStatus();
    window.addEventListener('cart-update', handleCartUpdate);
    window.addEventListener('auth-change', handleCartUpdate);
    return () => {
      window.removeEventListener('cart-update', handleCartUpdate);
      window.removeEventListener('auth-change', handleCartUpdate);
    };
  }, [updateCartStatus]);

  const onCartStatusChange = useCallback((productId, isInCart) => {
    setProductsInCart((prev) => ({ ...prev, [productId]: isInCart }));
  }, []);

  const openCartSidebar = () => setIsCartOpen(true);
  const closeCartSidebar = () => setIsCartOpen(false);

  const updateSlider = useCallback(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const { scrollLeft, scrollWidth, clientWidth } = slider;
    const TOLERANCE = 10;

    const isAtStart = scrollLeft <= TOLERANCE;
    const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - TOLERANCE;

    setCanScrollLeft(!isAtStart);
    setCanScrollRight(!isAtEnd);

    const pageWidth = clientWidth;
    if (pageWidth > 0) {
      const page = Math.round(scrollLeft / pageWidth);
      setActivePage(page);
    }
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || isLoading || products.length === 0) return;

    updateSlider();

    const resizeObserver = new ResizeObserver(() => updateSlider());
    resizeObserver.observe(slider);
    if (slider.firstElementChild) {
      resizeObserver.observe(slider.firstElementChild);
    }

    slider.addEventListener('scroll', updateSlider, { passive: true });

    return () => {
      slider.removeEventListener('scroll', updateSlider);
      resizeObserver.disconnect();
    };
  }, [products, isLoading, updateSlider]);

  // Mobile: 4 per page (2×2). Desktop: 5 per page.
  const itemsPerPage = isMobile ? 4 : 5;

  useEffect(() => {
    if (products.length === 0) {
      setTotalPages(1);
      return;
    }
    setTotalPages(Math.max(1, Math.ceil(products.length / itemsPerPage)));
  }, [products, itemsPerPage]);

  const scrollSlider = (direction) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollAmount = slider.clientWidth;
    slider.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const goToPage = (page) => {
    const slider = sliderRef.current;
    if (!slider) return;

    slider.scrollTo({
      left: page * slider.clientWidth,
      behavior: 'smooth',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] bg-white flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#d92f45]" />
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <>
      <section
        className="relative w-full py-10 sm:py-12 lg:py-14"
        style={{
          backgroundImage: "url('/images/f4.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="relative z-10 mx-auto w-full max-w-[1450px] px-3 sm:px-4 lg:px-8">

          {/* SECTION TITLE */}
          <div className="mb-10 flex w-full items-center gap-4 sm:mb-12">
            <div className="h-px flex-1 bg-[#d9d9d9]" />

            <h2
              className="
                whitespace-nowrap
                text-center
                text-[18px]
                font-semibold
                uppercase
                tracking-[-1px]
                text-[#25282b]
                sm:text-[24px]
                lg:text-[32px]
              "
            >
              DON'T MISS OUR ELEGANT PICKS
            </h2>

            <div className="h-px flex-1 bg-[#d9d9d9]" />
          </div>

          {/* ============================================================
              MOBILE VIEW — 2×2 grid, 4 per page, arrows BELOW the grid
          ============================================================ */}
          <div className="md:hidden">
            <div
              ref={sliderRef}
              className="
                scrollbar-hide
                flex
                snap-x
                snap-mandatory
                overflow-x-auto
                scroll-smooth
                pb-1
                gap-2
              "
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIdx) => {
                const start = pageIdx * itemsPerPage;
                const pageProducts = products.slice(start, start + itemsPerPage);

                return (
                  <div
                    key={pageIdx}
                    className="w-full shrink-0 snap-start"
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {pageProducts.map((product) => (
                        <FeaturedProductCard
                          key={product._id || product.id}
                          product={product}
                          isInCart={productsInCart[product._id || product.id] || false}
                          onCartStatusChange={onCartStatusChange}
                          onViewInCart={openCartSidebar}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* MOBILE BOTTOM CONTROLS — arrows + dots row */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-4">
                {/* PREV */}
                <button
                  type="button"
                  onClick={() => scrollSlider('left')}
                  disabled={!canScrollLeft}
                  aria-label="Previous products"
                  className={`
                    flex h-9 w-9 items-center justify-center rounded-full
                    bg-white border border-[#d92f45]/30 shadow-sm
                    transition-all duration-200
                    ${canScrollLeft
                      ? 'cursor-pointer text-[#d92f45] hover:bg-[#d92f45] hover:text-white hover:border-[#d92f45]'
                      : 'opacity-40 cursor-not-allowed text-[#d92f45]'
                    }
                  `}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {/* DOTS */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }).map((_, page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => goToPage(page)}
                      aria-label={`Go to slide ${page + 1}`}
                      className={`
                        h-[6px] rounded-full transition-all duration-300
                        ${
                          activePage === page
                            ? 'w-[22px] bg-[#d92f45]'
                            : 'w-[6px] bg-[#e07888]/50 hover:bg-[#d92f45]/60'
                        }
                      `}
                    />
                  ))}
                </div>

                {/* NEXT */}
                <button
                  type="button"
                  onClick={() => scrollSlider('right')}
                  disabled={!canScrollRight}
                  aria-label="Next products"
                  className={`
                    flex h-9 w-9 items-center justify-center rounded-full
                    bg-white border border-[#d92f45]/30 shadow-sm
                    transition-all duration-200
                    ${canScrollRight
                      ? 'cursor-pointer text-[#d92f45] hover:bg-[#d92f45] hover:text-white hover:border-[#d92f45]'
                      : 'opacity-40 cursor-not-allowed text-[#d92f45]'
                    }
                  `}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          {/* ============================================================
              DESKTOP VIEW — unchanged carousel (single row)
          ============================================================ */}
          <div className="relative hidden md:block">
            {/* LEFT ARROW */}
            {totalPages > 1 && (
              <button
                type="button"
                onClick={() => scrollSlider('left')}
                disabled={!canScrollLeft}
                aria-label="Previous products"
                className={`
                  absolute left-0 top-[38%] z-20
                  flex items-center justify-center
                  -ml-8 w-8 h-8 rounded-full
                  bg-white border border-[#d92f45]/30 shadow-md
                  transition-all duration-200
                  ${canScrollLeft
                    ? 'cursor-pointer hover:bg-[#d92f45] hover:text-white hover:border-[#d92f45]'
                    : 'opacity-40 cursor-not-allowed'
                  }
                `}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {/* DESKTOP SLIDER */}
            <div
              ref={sliderRef}
              className="
                scrollbar-hide
                flex
                snap-x
                snap-mandatory
                overflow-x-auto
                scroll-smooth
                pb-1
                gap-3
              "
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {products.map((product) => (
                <article
                  key={product._id || product.id}
                  className="
                    shrink-0 snap-start
                    w-[calc((100%-24px)/3)]
                    lg:w-[calc((100%-48px)/5)]
                  "
                >
                  <FeaturedProductCard
                    product={product}
                    isInCart={productsInCart[product._id || product.id] || false}
                    onCartStatusChange={onCartStatusChange}
                    onViewInCart={openCartSidebar}
                  />
                </article>
              ))}
            </div>

            {/* RIGHT ARROW */}
            {totalPages > 1 && (
              <button
                type="button"
                onClick={() => scrollSlider('right')}
                disabled={!canScrollRight}
                aria-label="Next products"
                className={`
                  absolute right-0 top-[38%] z-20
                  flex items-center justify-center
                  -mr-8 w-8 h-8 rounded-full
                  bg-white border border-[#d92f45]/30 shadow-md
                  transition-all duration-200
                  ${canScrollRight
                    ? 'cursor-pointer hover:bg-[#d92f45] hover:text-white hover:border-[#d92f45]'
                    : 'opacity-40 cursor-not-allowed'
                  }
                `}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}

            {/* DESKTOP DOTS */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {[...Array(totalPages)].map((_, page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => goToPage(page)}
                    aria-label={`Go to slide ${page + 1}`}
                    className={`
                      h-[6px] rounded-full transition-all duration-300
                      ${
                        activePage === page
                          ? 'w-[24px] bg-[#d92f45]'
                          : 'w-[6px] bg-[#e07888]/50 hover:bg-[#d92f45]/60'
                      }
                    `}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
    </>
  );
}