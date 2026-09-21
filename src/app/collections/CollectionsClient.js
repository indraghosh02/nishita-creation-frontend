
// 'use client';

// import React, { useEffect, useState, useCallback, useRef } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import Link from 'next/link';
// import Image from 'next/image';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import CartSidebar from '../components/CartSidebar';
// import {
//   Search,
//   Grid,
//   List,
//   X,
//   Loader2,
//   Package,
//   Sparkles,
//   Star,
//   AlertTriangle,
//   ShoppingBag,
//   Heart,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
// } from 'lucide-react';
// import { toast } from 'sonner';

// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
// const ITEMS_PER_PAGE = 20;

// // ============================================================
// // HELPERS
// // ============================================================
// const calculateDiscountPercentage = (regularPrice, discountPrice) => {
//   if (regularPrice && discountPrice && discountPrice < regularPrice) {
//     return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
//   }
//   return 0;
// };

// const truncateText = (text, limit = 60) => {
//   if (!text) return '';
//   if (text.length <= limit) return text;
//   return text.substring(0, limit) + '...';
// };

// const formatPrice = (price) => (price ? price.toFixed(0) : '0');

// // ============================================================
// // PRODUCT CARD — Red/Black/White theme (matching ProductGridSection)
// // ============================================================
// const ProductCard = ({ product, onViewInCart }) => {
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isInCart, setIsInCart] = useState(false);
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
//     productImages = [
//       typeof product.image === 'string' ? product.image : product.image?.url || '',
//     ].filter(Boolean);
//   }
//   if (productImages.length === 0) productImages = ['/placeholder-product.jpg'];

//   const hasHoverImage = productImages.length > 1;
//   const hasMultipleImages = productImages.length > 1;
//   const discountPercent = calculateDiscountPercentage(regularPrice, discountPrice);
//   const currentPrice =
//     discountPrice > 0 && discountPrice < regularPrice ? discountPrice : regularPrice;
//   const originalPrice = regularPrice;

//   const isLowStock =
//     product?.stockAlertQuantity > 0 && stockQuantity <= product.stockAlertQuantity;
//   const isOutOfStock = stockQuantity <= 0;

//   const rating = product?.rating ? Number(product.rating) : 4.7;
//   const fullStars = Math.floor(rating);
//   const hasHalfStar = rating - fullStars >= 0.5;

//   // Wishlist
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

//   // Mobile detection
//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 768);
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   useEffect(() => {
//     if (!isHovered) {
//       setHasUserNavigated(false);
//       setActiveIndex(0);
//     }
//   }, [isHovered]);

//   // Check cart status
//   useEffect(() => {
//     const checkStatus = async () => {
//       const token = localStorage.getItem('token');
//       const sessionId = localStorage.getItem('cartSessionId');
//       if (!token && !sessionId) return;
//       const headers = { 'Content-Type': 'application/json' };
//       if (token) headers.Authorization = `Bearer ${token}`;
//       else headers['x-session-id'] = sessionId;
//       try {
//         const res = await fetch(`${API_URL}/api/cart/check-status`, {
//           method: 'POST',
//           headers,
//           body: JSON.stringify({ productIds: [productId] }),
//         });
//         const data = await res.json();
//         if (data.success && data.data) {
//           setIsInCart(Boolean(data.data[productId]));
//         }
//       } catch (_) {}
//     };
//     checkStatus();
//   }, [productId]);

//   const nextImage = (e) => {
//     if (e) { e.preventDefault(); e.stopPropagation(); }
//     if (hasMultipleImages) {
//       setActiveIndex((prev) => (prev + 1) % productImages.length);
//       setHasUserNavigated(true);
//     }
//   };
//   const prevImage = (e) => {
//     if (e) { e.preventDefault(); e.stopPropagation(); }
//     if (hasMultipleImages) {
//       setActiveIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
//       setHasUserNavigated(true);
//     }
//   };
//   const goToImage = (e, index) => {
//     if (e) { e.preventDefault(); e.stopPropagation(); }
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
//       if (imageErrors[hoverIndex]) return productImages[0] || '/placeholder-product.jpg';
//       return image;
//     }
//     const image = productImages[activeIndex] || productImages[0];
//     if (imageErrors[activeIndex]) return '/placeholder-product.jpg';
//     return image;
//   };

//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (isInCart) { if (onViewInCart) onViewInCart(); return; }
//     if (isOutOfStock) { toast.error('Product is out of stock!'); return; }

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
//       if (token) headers.Authorization = `Bearer ${token}`;
//       else if (sessionId) headers['x-session-id'] = sessionId;

//       const response = await fetch(`${API_URL}/api/cart`, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({ productId, quantity: 1 }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
//         toast.success('Added to cart!', { id: toastId });
//         setIsInCart(true);
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         toast.error(data.error || 'Failed to add to cart', { id: toastId });
//       }
//     } catch (error) {
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
//         stars.push(<Star key={i} className="h-3 w-3 fill-current text-yellow-400" />);
//       } else if (i === fullStars && hasHalfStar) {
//         stars.push(
//           <div key={i} className="relative h-3 w-3">
//             <Star className="absolute h-3 w-3 text-gray-200" />
//             <div className="absolute left-0 top-0 h-3 w-3 w-1/2 overflow-hidden">
//               <Star className="h-3 w-3 fill-current text-yellow-400" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(<Star key={i} className="h-3 w-3 text-gray-300" />);
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
//       className="group w-full h-full"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={handleMouseLeave}
//     >
//       <Link href={`/product/${productSlug}`} className="block h-full">
//         <article
//           className="
//             relative flex h-full flex-col
//             bg-white border border-gray-200 rounded-md overflow-hidden
//             transition-all duration-300
//             hover:border-[#d92f45]
//             hover:shadow-[0_8px_24px_rgba(217,47,69,0.10)]
//           "
//         >
//           {/* IMAGE */}
//           <div className="relative w-full aspect-[0.79] overflow-hidden bg-[#fafafa]">
//             <Image
//               src={getCurrentImage()}
//               alt={productName}
//               fill
//               sizes="(max-width: 640px) 48vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
//               className={`object-cover transition-transform duration-500 ease-out ${
//                 isHovered ? 'scale-[1.03]' : 'scale-100'
//               }`}
//               onError={() =>
//                 handleImageError(
//                   isHovered && hasHoverImage && !isMobile && !hasUserNavigated ? 1 : activeIndex
//                 )
//               }
//               quality={90}
//             />

//             <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/[0.03]" />

//             {/* Radial shade on hover / mobile */}
//             <div
//               className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 ${
//                 isMobile ? 'opacity-100' : isHovered ? 'opacity-100' : 'opacity-0'
//               }`}
//               style={{
//                 background:
//                   'radial-gradient(circle 130px at 100% 0%, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.28) 35%, rgba(0,0,0,0.10) 65%, rgba(0,0,0,0) 100%)',
//               }}
//             />

//             {/* Discount badge */}
//             {discountPercent > 0 && (
//               <div className="absolute left-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#d92f45] text-white shadow-md">
//                 <span className="text-[10px] font-bold leading-none text-center">
//                   {discountPercent}%<br />OFF
//                 </span>
//               </div>
//             )}

//             {/* Out of stock */}
//             {isOutOfStock && (
//               <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/55">
//                 <span className="rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white">
//                   Out of Stock
//                 </span>
//               </div>
//             )}

//             {/* Low stock */}
//             {!isOutOfStock && isLowStock && (
//               <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 rounded bg-orange-500 px-2 py-1 text-[9px] font-medium text-white shadow-md">
//                 <AlertTriangle className="h-2.5 w-2.5" />
//                 <span>Only {stockQuantity} left</span>
//               </div>
//             )}

//             {/* Hover actions */}
//             <div
//               className={`absolute right-2.5 top-2.5 z-30 flex flex-col gap-2.5 transition-all duration-300 ease-out ${
//                 isMobile
//                   ? 'translate-x-0 opacity-100'
//                   : isHovered
//                   ? 'translate-x-0 opacity-100'
//                   : 'translate-x-3 opacity-0'
//               }`}
//             >
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

//               <button
//                 type="button"
//                 onClick={handleViewDetails}
//                 aria-label="Quick view"
//                 className="group/btn flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] transition-all duration-200 hover:scale-125"
//               >
//                 <Eye className="h-5 w-5 transition-colors duration-200 group-hover/btn:text-[#d92f45]" />
//               </button>
//             </div>

//             {/* Image nav */}
//             {hasMultipleImages && (
//               <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
//                 <button
//                   type="button"
//                   onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevImage(e); }}
//                   className="rounded-full p-0.5"
//                   aria-label="Previous image"
//                 >
//                   <ChevronLeft className="h-3.5 w-3.5 text-white drop-shadow-md" />
//                 </button>
//                 <div className="flex items-center gap-1.5">
//                   {productImages.map((_, index) => (
//                     <button
//                       key={index}
//                       type="button"
//                       onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToImage(e, index); }}
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
//                   onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextImage(e); }}
//                   className="rounded-full p-0.5"
//                   aria-label="Next image"
//                 >
//                   <ChevronRight className="h-3.5 w-3.5 text-white drop-shadow-md" />
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* DETAILS */}
//           <div className="flex flex-1 flex-col px-3 pt-2 pb-3">
//             <h3
//               className="min-h-[42px] text-[14px] font-normal leading-[1.35] text-[#1a1a1a] sm:text-[15px] line-clamp-2"
//               style={{ fontFamily: FONT_FAMILY }}
//               title={productName}
//             >
//               {truncateText(productName, 60)}
//             </h3>

//             <div className="mt-0.5 flex items-center gap-1">
//               <div className="flex items-center gap-0.5">{renderStars()}</div>
//               <span className="text-[11px] font-normal text-gray-600" style={{ fontFamily: FONT_FAMILY }}>
//                 {rating.toFixed(1)}
//               </span>
//             </div>

//             <div className="mt-1 flex items-center justify-between gap-2">
//               <p className="text-[15px] font-semibold text-[#1a1a1a] sm:text-[16px]" style={{ fontFamily: FONT_FAMILY }}>
//                 Tk. {formatPrice(currentPrice)}
//                 {discountPercent > 0 && (
//                   <span className="ml-2 text-[11px] font-normal text-gray-400 line-through">
//                     Tk. {formatPrice(originalPrice)}
//                   </span>
//                 )}
//               </p>

//               <button
//                 type="button"
//                 onClick={handleAddToCart}
//                 disabled={isOutOfStock || cartStatusLoading}
//                 aria-label={isInCart ? 'View in cart' : 'Add to cart'}
//                 className={`flex shrink-0 items-center justify-center transition-all duration-200 hover:scale-110 disabled:cursor-not-allowed disabled:opacity-60 ${
//                   isInCart
//                     ? 'h-8 w-8 rounded-full bg-[#d92f45] text-white shadow-md'
//                     : isOutOfStock
//                     ? 'h-9 w-9 text-gray-300'
//                     : 'h-9 w-9 text-[#d92f45] hover:text-[#b82238]'
//                 }`}
//               >
//                 {cartStatusLoading ? (
//                   <Loader2 className={`animate-spin ${isInCart ? 'h-4 w-4' : 'h-5 w-5'}`} />
//                 ) : (
//                   <ShoppingBag className={isInCart ? 'h-4 w-4' : 'h-5 w-5'} strokeWidth={1.8} />
//                 )}
//               </button>
//             </div>
//           </div>
//         </article>
//       </Link>
//     </motion.div>
//   );
// };

// // ============================================================
// // MAIN PAGE
// // ============================================================
// export default function CollectionsPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [tags, setTags] = useState([]);
//   const [tagsLoading, setTagsLoading] = useState(true);
//   const [activeTagSlug, setActiveTagSlug] = useState(null);

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalProducts, setTotalProducts] = useState(0);
//   const [viewMode, setViewMode] = useState('grid');

//   const [searchInput, setSearchInput] = useState('');
//   const [search, setSearch] = useState('');
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const searchTimerRef = useRef(null);

//   // Read ?tag=<slug>
//   useEffect(() => {
//     const tagSlug = searchParams.get('tag');
//     setActiveTagSlug(tagSlug || null);
//     setCurrentPage(1);
//   }, [searchParams]);

//   // Fetch tags
//   useEffect(() => {
//     const fetchTags = async () => {
//       setTagsLoading(true);
//       try {
//         const res = await fetch(`${API_URL}/api/tags?isActive=true`, { cache: 'no-store' });
//         const data = await res.json();
//         if (data.success) {
//           const sorted = [...(data.data || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
//           setTags(sorted);
//         }
//       } catch (err) {
//         console.error('Failed to fetch tags:', err);
//       } finally {
//         setTagsLoading(false);
//       }
//     };
//     fetchTags();
//   }, []);

//   // Fetch products
//   const fetchProducts = useCallback(async () => {
//     setLoading(true);
//     try {
//       const params = new URLSearchParams();
//       params.append('page', currentPage);
//       params.append('limit', ITEMS_PER_PAGE);
//       params.append('sort', 'newest');
//       if (activeTagSlug) params.append('tags', activeTagSlug);
//       if (search.trim()) params.append('search', search.trim());

//       const res = await fetch(`${API_URL}/api/products?${params.toString()}`, { cache: 'no-store' });
//       const data = await res.json();
//       if (data.success) {
//         setProducts(data.data || []);
//         setTotalPages(data.pagination?.pages || 1);
//         setTotalProducts(data.pagination?.total || 0);
//       }
//     } catch (err) {
//       console.error('Failed to fetch products:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [activeTagSlug, search, currentPage]);

//   useEffect(() => { fetchProducts(); }, [fetchProducts]);

//   const handleTagClick = (slug) => {
//     const params = new URLSearchParams(window.location.search);
//     if (slug) params.set('tag', slug);
//     else params.delete('tag');
//     router.push(`/collections${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
//   };

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchInput(value);
//     if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
//     searchTimerRef.current = setTimeout(() => {
//       setSearch(value);
//       setCurrentPage(1);
//     }, 500);
//   };

//   const handleClearSearch = () => {
//     setSearchInput('');
//     setSearch('');
//     setCurrentPage(1);
//   };

//   const activeTag = tags.find((t) => t.slug === activeTagSlug);

//   return (
//     <>
//       <Navbar />

//       {/* HERO — red/black/white */}
//       <div className="bg-white border-b border-gray-200">
//         <div className="container mx-auto px-4 max-w-7xl py-8 md:py-10">
//           <div className="flex flex-col items-center text-center">
          
//             <h1
//               className="text-2xl md:text-4xl lg:text-5xl font-light text-[#1a1a1a] tracking-tight"
//             //   style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//             >
//               Shop By{' '}
//               <span className="font-medium text-[#d92f45] italic">Collections</span>
//             </h1>
//             <div className="mt-2 h-[2px] w-14 bg-[#d92f45]" />
//             <p className="text-gray-500 text-sm mt-3 max-w-lg" style={{ fontFamily: FONT_FAMILY }}>
//               {activeTag
//                 ? `Browse products from the "${activeTag.name}" collection`
//                 : 'Discover our handpicked collections made just for you'}
//             </p>

//             {/* Search */}
//             <div className="w-full max-w-md mt-5">
//               <div className="relative flex items-center bg-white border border-gray-200 rounded-full shadow-sm overflow-hidden focus-within:border-[#d92f45] focus-within:ring-2 focus-within:ring-[#d92f45]/15 transition-all">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchInput}
//                   onChange={handleSearchChange}
//                   className="w-full pl-11 pr-10 py-2.5 text-sm border-0 focus:outline-none bg-transparent text-[#1a1a1a] placeholder:text-gray-400"
//                   style={{ fontFamily: FONT_FAMILY }}
//                 />
//                 {searchInput && (
//                   <button
//                     onClick={handleClearSearch}
//                     className="absolute right-3 p-1 text-gray-400 hover:text-[#d92f45] transition-colors"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="min-h-screen bg-[#fafafa]">
//         <div className="container mx-auto px-4 max-w-7xl py-5">

//           {/* TAG FILTER — modern pill tabs */}
//           <div className="mb-5">
//             <div className="flex items-center gap-3 mb-3">
//               <span
//                 className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-medium whitespace-nowrap"
//                 style={{ fontFamily: FONT_FAMILY }}
//               >
//                 Filter by collection
//               </span>
//               <div className="flex-1 h-px bg-gray-200" />
//             </div>

//             <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
//               {/* All */}
//               <button
//                 onClick={() => handleTagClick(null)}
//                 className={`group relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 border ${
//                   !activeTagSlug
//                     ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-md shadow-black/10'
//                     : 'bg-white text-gray-700 border-gray-200 hover:border-[#d92f45] hover:text-[#d92f45]'
//                 }`}
//                 style={{ fontFamily: FONT_FAMILY }}
//               >
//                 <Sparkles className="w-3.5 h-3.5" />
//                 All Collections
//                 {!activeTagSlug && (
//                   <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#d92f45] text-white text-[9px] font-bold">
//                     {totalProducts}
//                   </span>
//                 )}
//               </button>

//               {/* Tag chips */}
//               {tagsLoading
//                 ? [...Array(5)].map((_, i) => (
//                     <div key={i} className="h-9 w-28 rounded-full bg-gray-100 animate-pulse shrink-0" />
//                   ))
//                 : tags.map((tag) => {
//                     const isActive = activeTagSlug === tag.slug;
//                     return (
//                       <button
//                         key={tag._id}
//                         onClick={() => handleTagClick(tag.slug)}
//                         className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 border overflow-hidden ${
//                           isActive
//                             ? 'bg-[#d92f45] text-white border-[#d92f45] shadow-md shadow-[#d92f45]/25'
//                             : 'bg-white text-gray-700 border-gray-200 hover:border-[#d92f45] hover:text-[#d92f45]'
//                         }`}
//                         style={{ fontFamily: FONT_FAMILY }}
//                       >
//                         {tag.image && (
//                           <span
//                             className={`w-5 h-5 rounded-full overflow-hidden shrink-0 ${
//                               isActive ? 'ring-2 ring-white/60' : 'ring-1 ring-gray-200'
//                             }`}
//                           >
//                             <img
//                               src={tag.image}
//                               alt=""
//                               className="w-full h-full object-cover"
//                             />
//                           </span>
//                         )}
//                         {tag.name}
//                         {isActive && (
//                           <X
//                             className="w-3 h-3 ml-0.5 opacity-80 group-hover:opacity-100"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleTagClick(null);
//                             }}
//                           />
//                         )}
//                       </button>
//                     );
//                   })}
//             </div>
//           </div>

//           {/* ACTIVE TAG HEADER BANNER */}
//           <AnimatePresence>
//             {activeTag && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.25 }}
//                 className="mb-5"
//               >
//                 <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] text-white px-5 py-4 sm:px-6 sm:py-5">
//                   {/* Decorative blur */}
//                   <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[#d92f45]/25 blur-3xl pointer-events-none" />
//                   <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-[#d92f45]/15 blur-3xl pointer-events-none" />

//                   <div className="relative flex items-center justify-between gap-4">
//                     <div className="flex items-center gap-4 min-w-0">
//                       {activeTag.image && (
//                         <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-2 ring-[#d92f45] shrink-0">
//                           <img
//                             src={activeTag.image}
//                             alt={activeTag.name}
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                       )}
//                       <div className="min-w-0">
//                         <p
//                           className="text-[10px] uppercase tracking-[0.25em] text-[#d92f45] font-medium"
//                           style={{ fontFamily: FONT_FAMILY }}
//                         >
//                           Collection
//                         </p>
//                         <h2
//                           className="text-lg sm:text-2xl font-medium tracking-tight truncate"
//                           style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                         >
//                           {activeTag.name}
//                         </h2>
//                         <p
//                           className="text-[11px] sm:text-xs text-white/60 mt-0.5"
//                           style={{ fontFamily: FONT_FAMILY }}
//                         >
//                           {totalProducts} product{totalProducts !== 1 ? 's' : ''} in this collection
//                         </p>
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => handleTagClick(null)}
//                       className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#d92f45] border border-white/15 hover:border-[#d92f45] text-xs font-medium transition-all"
//                       style={{ fontFamily: FONT_FAMILY }}
//                     >
//                       <X className="w-3.5 h-3.5" />
//                       Clear
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* RESULT HEADER + VIEW TOGGLE */}
//           <div className="mb-4 flex items-center justify-between">
//             <p className="text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY }}>
//               {loading
//                 ? 'Loading products...'
//                 : `Showing ${products.length} of ${totalProducts} product${totalProducts !== 1 ? 's' : ''}`}
//             </p>
//             <div className="flex items-center gap-0.5 bg-white border border-gray-200 rounded-full p-0.5">
//               <button
//                 onClick={() => setViewMode('grid')}
//                 className={`p-1.5 rounded-full transition-all ${
//                   viewMode === 'grid'
//                     ? 'bg-[#d92f45] text-white'
//                     : 'text-gray-500 hover:bg-gray-100'
//                 }`}
//               >
//                 <Grid className="w-3.5 h-3.5" />
//               </button>
//               <button
//                 onClick={() => setViewMode('list')}
//                 className={`p-1.5 rounded-full transition-all ${
//                   viewMode === 'list'
//                     ? 'bg-[#d92f45] text-white'
//                     : 'text-gray-500 hover:bg-gray-100'
//                 }`}
//               >
//                 <List className="w-3.5 h-3.5" />
//               </button>
//             </div>
//           </div>

//           {/* PRODUCTS */}
//           {loading ? (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
//               {[...Array(10)].map((_, i) => (
//                 <div key={i} className="bg-white rounded-md border border-gray-200 overflow-hidden animate-pulse">
//                   <div className="aspect-[0.79] bg-gray-100" />
//                   <div className="p-3 space-y-2">
//                     <div className="h-3 bg-gray-100 rounded w-3/4" />
//                     <div className="h-4 bg-gray-100 rounded w-1/2" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : products.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
//               <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//               <p className="text-sm text-gray-500 mb-3" style={{ fontFamily: FONT_FAMILY }}>
//                 No products found{activeTag ? ` in "${activeTag.name}"` : ''}
//               </p>
//               {activeTagSlug && (
//                 <button
//                   onClick={() => handleTagClick(null)}
//                   className="px-5 py-2 bg-[#d92f45] text-white text-xs font-medium rounded-full hover:bg-[#b82238] transition-colors"
//                   style={{ fontFamily: FONT_FAMILY }}
//                 >
//                   Show All Products
//                 </button>
//               )}
//             </div>
//           ) : (
//             <>
//               {viewMode === 'grid' ? (
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
//                   {products.map((p) => (
//                     <ProductCard key={p._id} product={p} onViewInCart={() => setIsCartOpen(true)} />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {products.map((p) => (
//                     <ProductCard key={p._id} product={p} onViewInCart={() => setIsCartOpen(true)} />
//                   ))}
//                 </div>
//               )}

//               {/* PAGINATION */}
//               {totalPages > 1 && (
//                 <div className="flex justify-center items-center gap-1.5 mt-10">
//                   <button
//                     onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-full disabled:opacity-40 text-xs hover:border-[#d92f45] hover:text-[#d92f45] transition-colors"
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     <ChevronLeft className="w-3 h-3" />
//                     Prev
//                   </button>
//                   {[...Array(totalPages)].map((_, i) => {
//                     const n = i + 1;
//                     if (n === 1 || n === totalPages || (n >= currentPage - 1 && n <= currentPage + 1)) {
//                       return (
//                         <button
//                           key={n}
//                           onClick={() => setCurrentPage(n)}
//                           className={`min-w-[30px] h-8 text-xs font-medium rounded-full transition-all ${
//                             currentPage === n
//                               ? 'bg-[#d92f45] text-white shadow-md shadow-[#d92f45]/25'
//                               : 'border border-gray-200 text-gray-700 hover:border-[#d92f45] hover:text-[#d92f45]'
//                           }`}
//                           style={{ fontFamily: FONT_FAMILY }}
//                         >
//                           {n}
//                         </button>
//                       );
//                     } else if (n === currentPage - 2 || n === currentPage + 2) {
//                       return <span key={n} className="text-xs text-gray-400">...</span>;
//                     }
//                     return null;
//                   })}
//                   <button
//                     onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                     className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-full disabled:opacity-40 text-xs hover:border-[#d92f45] hover:text-[#d92f45] transition-colors"
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     Next
//                     <ChevronRight className="w-3 h-3" />
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
//       <Footer />

//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </>
//   );
// }


'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CartSidebar from '../components/CartSidebar';
import {
  Search,
  Grid,
  List,
  X,
  Loader2,
  Package,
  Sparkles,
  Star,
  AlertTriangle,
  ShoppingBag,
  Heart,
  Eye,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';

const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const ITEMS_PER_PAGE = 30;

// ============================================================
// HELPERS
// ============================================================
const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

const truncateText = (text, limit = 60) => {
  if (!text) return '';
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
};

const formatPrice = (price) => (price ? price.toFixed(0) : '0');

// ============================================================
// PRODUCT CARD — Red/Black/White theme
// ============================================================
const ProductCard = ({ product, onViewInCart }) => {
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
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

  // Images
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

  const hasHoverImage = productImages.length > 1;
  const hasMultipleImages = productImages.length > 1;
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

  // Wishlist
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

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      setHasUserNavigated(false);
      setActiveIndex(0);
    }
  }, [isHovered]);

  // Check cart status
  useEffect(() => {
    const checkStatus = async () => {
      const token = localStorage.getItem('token');
      const sessionId = localStorage.getItem('cartSessionId');
      if (!token && !sessionId) return;
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers.Authorization = `Bearer ${token}`;
      else headers['x-session-id'] = sessionId;
      try {
        const res = await fetch(`${API_URL}/api/cart/check-status`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ productIds: [productId] }),
        });
        const data = await res.json();
        if (data.success && data.data) {
          setIsInCart(Boolean(data.data[productId]));
        }
      } catch (_) {}
    };
    checkStatus();
  }, [productId]);

  const nextImage = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (hasMultipleImages) {
      setActiveIndex((prev) => (prev + 1) % productImages.length);
      setHasUserNavigated(true);
    }
  };
  const prevImage = (e) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (hasMultipleImages) {
      setActiveIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
      setHasUserNavigated(true);
    }
  };
  const goToImage = (e, index) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
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
      if (imageErrors[hoverIndex]) return productImages[0] || '/placeholder-product.jpg';
      return image;
    }
    const image = productImages[activeIndex] || productImages[0];
    if (imageErrors[activeIndex]) return '/placeholder-product.jpg';
    return image;
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCart) { if (onViewInCart) onViewInCart(); return; }
    if (isOutOfStock) { toast.error('Product is out of stock!'); return; }

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
      if (token) headers.Authorization = `Bearer ${token}`;
      else if (sessionId) headers['x-session-id'] = sessionId;

      const response = await fetch(`${API_URL}/api/cart`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      const data = await response.json();
      if (data.success) {
        if (data.sessionId && !token) localStorage.setItem('cartSessionId', data.sessionId);
        toast.success('Added to cart!', { id: toastId });
        setIsInCart(true);
        window.dispatchEvent(new Event('cart-update'));
      } else {
        toast.error(data.error || 'Failed to add to cart', { id: toastId });
      }
    } catch (error) {
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
        stars.push(<Star key={i} className="h-3 w-3 fill-current text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-3 w-3">
            <Star className="absolute h-3 w-3 text-gray-200" />
            <div className="absolute left-0 top-0 h-3 w-3 w-1/2 overflow-hidden">
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
            bg-white border border-gray-200 rounded-md overflow-hidden
            transition-all duration-300
            hover:border-[#d92f45]
            hover:shadow-[0_8px_24px_rgba(217,47,69,0.10)]
          "
        >
          {/* IMAGE */}
          <div className="relative w-full aspect-[0.79] overflow-hidden bg-[#fafafa]">
            <Image
              src={getCurrentImage()}
              alt={productName}
              fill
              sizes="(max-width: 640px) 48vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
              className={`object-cover transition-transform duration-500 ease-out ${
                isHovered ? 'scale-[1.03]' : 'scale-100'
              }`}
              onError={() =>
                handleImageError(
                  isHovered && hasHoverImage && !isMobile && !hasUserNavigated ? 1 : activeIndex
                )
              }
              quality={90}
            />

            <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/[0.03]" />

            {/* Radial shade on hover / mobile */}
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
                <span className="text-[10px] font-bold leading-none text-center">
                  {discountPercent}%<br />OFF
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

            {/* Hover actions */}
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

            {/* Image nav */}
            {hasMultipleImages && (
              <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); prevImage(e); }}
                  className="rounded-full p-0.5"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-3.5 w-3.5 text-white drop-shadow-md" />
                </button>
                <div className="flex items-center gap-1.5">
                  {productImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); goToImage(e, index); }}
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
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); nextImage(e); }}
                  className="rounded-full p-0.5"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-white drop-shadow-md" />
                </button>
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="flex flex-1 flex-col px-3 pt-2 pb-3">
            <h3
              className="min-h-[42px] text-[14px] font-normal leading-[1.35] text-[#1a1a1a] sm:text-[15px] line-clamp-2"
              style={{ fontFamily: FONT_FAMILY }}
              title={productName}
            >
              {truncateText(productName, 60)}
            </h3>

            <div className="mt-0.5 flex items-center gap-1">
              <div className="flex items-center gap-0.5">{renderStars()}</div>
              <span className="text-[11px] font-normal text-gray-600" style={{ fontFamily: FONT_FAMILY }}>
                {rating.toFixed(1)}
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between gap-2">
              <p className="text-[15px] font-semibold text-[#1a1a1a] sm:text-[16px]" style={{ fontFamily: FONT_FAMILY }}>
                Tk. {formatPrice(currentPrice)}
                {discountPercent > 0 && (
                  <span className="ml-2 text-[11px] font-normal text-gray-400 line-through">
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
                  <Loader2 className={`animate-spin ${isInCart ? 'h-4 w-4' : 'h-5 w-5'}`} />
                ) : (
                  <ShoppingBag className={isInCart ? 'h-4 w-4' : 'h-5 w-5'} strokeWidth={1.8} />
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
// MAIN PAGE
// ============================================================
export default function CollectionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tags, setTags] = useState([]);
  const [tagsLoading, setTagsLoading] = useState(true);
  const [activeTagSlug, setActiveTagSlug] = useState(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [viewMode, setViewMode] = useState('grid');

  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const searchTimerRef = useRef(null);

  // Read ?tag=<slug>
  useEffect(() => {
    const tagSlug = searchParams.get('tag');
    setActiveTagSlug(tagSlug || null);
    setCurrentPage(1);
  }, [searchParams]);

  // Fetch tags
  useEffect(() => {
    const fetchTags = async () => {
      setTagsLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/tags?isActive=true`, { cache: 'no-store' });
        const data = await res.json();
        if (data.success) {
          const sorted = [...(data.data || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
          setTags(sorted);
        }
      } catch (err) {
        console.error('Failed to fetch tags:', err);
      } finally {
        setTagsLoading(false);
      }
    };
    fetchTags();
  }, []);

  // Fetch products
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', ITEMS_PER_PAGE);
      params.append('sort', 'newest');
      if (activeTagSlug) params.append('tags', activeTagSlug);
      if (search.trim()) params.append('search', search.trim());

      const res = await fetch(`${API_URL}/api/products?${params.toString()}`, { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setProducts(data.data || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalProducts(data.pagination?.total || 0);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  }, [activeTagSlug, search, currentPage]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleTagClick = (slug) => {
    const params = new URLSearchParams(window.location.search);
    if (slug) params.set('tag', slug);
    else params.delete('tag');
    router.push(`/collections${params.toString() ? `?${params.toString()}` : ''}`, { scroll: false });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setSearch(value);
      setCurrentPage(1);
    }, 500);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setSearch('');
    setCurrentPage(1);
  };

  const activeTag = tags.find((t) => t.slug === activeTagSlug);

  return (
    <>
      <Navbar />

      {/* HERO — red/black/white */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-7xl py-8 md:py-10">
          <div className="flex flex-col items-center text-center">

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-light text-[#1a1a1a] tracking-tight">
              Shop By{' '}
              <span className="font-medium text-[#d92f45] italic">Collections</span>
            </h1>
            <div className="mt-2 h-[2px] w-14 bg-[#d92f45]" />
            <p className="text-gray-500 text-sm mt-3 max-w-lg" style={{ fontFamily: FONT_FAMILY }}>
              {activeTag
                ? `Browse products from the "${activeTag.name}" collection`
                : 'Discover our handpicked collections made just for you'}
            </p>

            {/* Search */}
            <div className="w-full max-w-md mt-5">
              <div className="relative flex items-center bg-white border border-gray-200 rounded-full shadow-sm overflow-hidden focus-within:border-[#d92f45] focus-within:ring-2 focus-within:ring-[#d92f45]/15 transition-all">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  className="w-full pl-11 pr-10 py-2.5 text-sm border-0 focus:outline-none bg-transparent text-[#1a1a1a] placeholder:text-gray-400"
                  style={{ fontFamily: FONT_FAMILY }}
                />
                {searchInput && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-3 p-1 text-gray-400 hover:text-[#d92f45] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="min-h-screen bg-[#fafafa]">
        <div className="container mx-auto px-4 max-w-7xl py-5">

          {/* TAG FILTER — modern pill tabs */}
          <div className="mb-5">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-[11px] uppercase tracking-[0.2em] text-gray-400 font-medium whitespace-nowrap"
                style={{ fontFamily: FONT_FAMILY }}
              >
                Filter by collection
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {/* All */}
              <button
                onClick={() => handleTagClick(null)}
                className={`group relative flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 border ${
                  !activeTagSlug
                    ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] shadow-md shadow-black/10'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-[#d92f45] hover:text-[#d92f45]'
                }`}
                style={{ fontFamily: FONT_FAMILY }}
              >
                <Sparkles className="w-3.5 h-3.5" />
                All Collections
                {!activeTagSlug && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-[#d92f45] text-white text-[9px] font-bold">
                    {totalProducts}
                  </span>
                )}
              </button>

              {/* Tag chips */}
              {tagsLoading
                ? [...Array(5)].map((_, i) => (
                    <div key={i} className="h-9 w-28 rounded-full bg-gray-100 animate-pulse shrink-0" />
                  ))
                : tags.map((tag) => {
                    const isActive = activeTagSlug === tag.slug;
                    return (
                      <button
                        key={tag._id}
                        onClick={() => handleTagClick(tag.slug)}
                        className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 border overflow-hidden ${
                          isActive
                            ? 'bg-[#d92f45] text-white border-[#d92f45] shadow-md shadow-[#d92f45]/25'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-[#d92f45] hover:text-[#d92f45]'
                        }`}
                        style={{ fontFamily: FONT_FAMILY }}
                      >
                        {tag.image && (
                          <span
                            className={`w-5 h-5 rounded-full overflow-hidden shrink-0 ${
                              isActive ? 'ring-2 ring-white/60' : 'ring-1 ring-gray-200'
                            }`}
                          >
                            <img
                              src={tag.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </span>
                        )}
                        {tag.name}
                        {isActive && (
                          <X
                            className="w-3 h-3 ml-0.5 opacity-80 group-hover:opacity-100"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTagClick(null);
                            }}
                          />
                        )}
                      </button>
                    );
                  })}
            </div>
          </div>

          {/* ACTIVE TAG HEADER BANNER */}
          <AnimatePresence>
            {activeTag && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="mb-5"
              >
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] text-white px-5 py-4 sm:px-6 sm:py-5">
                  {/* Decorative blur */}
                  <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[#d92f45]/25 blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-[#d92f45]/15 blur-3xl pointer-events-none" />

                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      {activeTag.image && (
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden ring-2 ring-[#d92f45] shrink-0">
                          <img
                            src={activeTag.image}
                            alt={activeTag.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p
                          className="text-[10px] uppercase tracking-[0.25em] text-[#d92f45] font-medium"
                          style={{ fontFamily: FONT_FAMILY }}
                        >
                          Collection
                        </p>
                        <h2
                          className="text-lg sm:text-2xl font-medium tracking-tight truncate"
                          style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                        >
                          {activeTag.name}
                        </h2>
                        <p
                          className="text-[11px] sm:text-xs text-white/60 mt-0.5"
                          style={{ fontFamily: FONT_FAMILY }}
                        >
                          {totalProducts} product{totalProducts !== 1 ? 's' : ''} in this collection
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleTagClick(null)}
                      className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#d92f45] border border-white/15 hover:border-[#d92f45] text-xs font-medium transition-all"
                      style={{ fontFamily: FONT_FAMILY }}
                    >
                      <X className="w-3.5 h-3.5" />
                      Clear
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        

          {/* PRODUCTS */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-white rounded-md border border-gray-200 overflow-hidden animate-pulse">
                  <div className="aspect-[0.79] bg-gray-100" />
                  <div className="p-3 space-y-2">
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500 mb-3" style={{ fontFamily: FONT_FAMILY }}>
                No products found{activeTag ? ` in "${activeTag.name}"` : ''}
              </p>
              {activeTagSlug && (
                <button
                  onClick={() => handleTagClick(null)}
                  className="px-5 py-2 bg-[#d92f45] text-white text-xs font-medium rounded-full hover:bg-[#b82238] transition-colors"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  Show All Products
                </button>
              )}
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                  {products.map((p) => (
                    <ProductCard key={p._id} product={p} onViewInCart={() => setIsCartOpen(true)} />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {products.map((p) => (
                    <ProductCard key={p._id} product={p} onViewInCart={() => setIsCartOpen(true)} />
                  ))}
                </div>
              )}

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-1.5 mt-10">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-full disabled:opacity-40 text-xs hover:border-[#d92f45] hover:text-[#d92f45] transition-colors"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    <ChevronLeft className="w-3 h-3" />
                    Prev
                  </button>
                  {[...Array(totalPages)].map((_, i) => {
                    const n = i + 1;
                    if (n === 1 || n === totalPages || (n >= currentPage - 1 && n <= currentPage + 1)) {
                      return (
                        <button
                          key={n}
                          onClick={() => setCurrentPage(n)}
                          className={`min-w-[30px] h-8 text-xs font-medium rounded-full transition-all ${
                            currentPage === n
                              ? 'bg-[#d92f45] text-white shadow-md shadow-[#d92f45]/25'
                              : 'border border-gray-200 text-gray-700 hover:border-[#d92f45] hover:text-[#d92f45]'
                          }`}
                          style={{ fontFamily: FONT_FAMILY }}
                        >
                          {n}
                        </button>
                      );
                    } else if (n === currentPage - 2 || n === currentPage + 2) {
                      return <span key={n} className="text-xs text-gray-400">...</span>;
                    }
                    return null;
                  })}
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-1.5 border border-gray-200 rounded-full disabled:opacity-40 text-xs hover:border-[#d92f45] hover:text-[#d92f45] transition-colors"
                    style={{ fontFamily: FONT_FAMILY }}
                  >
                    Next
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Footer />

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </>
  );
}