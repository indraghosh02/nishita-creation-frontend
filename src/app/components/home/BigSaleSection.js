
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import Link from 'next/link';
// import { motion, useReducedMotion } from 'framer-motion';
// import {
//   ShoppingBag,
//   Loader2,
//   ShoppingCart,
//   ChevronLeft,
//   ChevronRight,
// } from 'lucide-react';
// import { toast } from 'sonner';
// import CartSidebar from '../CartSidebar';

// // Font constants
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// // Design tokens
// const INK = '#17130F';
// const IVORY = '#F8F5EF';
// const STONE = '#EFEAE0';
// const RED = '#D92F45';

// const calculateDiscountPercentage = (regularPrice, discountPrice) => {
//   if (regularPrice && discountPrice && discountPrice < regularPrice) {
//     return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
//   }
//   return 0;
// };

// const formatPrice = (price) => (price ? price.toFixed(0) : '0');

// // ============================================================
// // SALE BANNER — original "SALE / UPTO 40% OFF" design
// // + continuous breathing zoom animation on the whole banner
// // ============================================================
// function SaleBannerCompact({ maxDiscount }) {
//   const prefersReducedMotion = useReducedMotion();
//   const discount =
//     maxDiscount && maxDiscount > 0 ? Math.round(maxDiscount) : 40;

//   return (
//     <section className="flex h-full w-full items-center justify-center py-6 sm:py-8 lg:py-6 -mt-14">
//       <motion.div
//         className="mx-auto flex w-full max-w-[420px] flex-col items-center px-2 sm:px-3"
//         // Continuous breathing: gentle scale 1 → 1.05 → 1, forever
//         animate={
//           prefersReducedMotion
//             ? { scale: 1 }
//             : {
//                 scale: [1, 1.05, 1],
//               }
//         }
//         transition={
//           prefersReducedMotion
//             ? { duration: 0 }
//             : {
//                 duration: 3.5,
//                 ease: 'easeInOut',
//                 repeat: Infinity,
//                 repeatType: 'loop',
//               }
//         }
//       >
//         {/* SALE */}
//         <h2
//           className="mb-3 font-serif text-[44px] leading-none tracking-[-2px] text-black sm:mb-4 sm:text-[56px] lg:mb-4 lg:text-[60px]"
//           style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//         >
//           SALE
//         </h2>

//         {/* MAIN SALE BOX */}
//         <div className="relative w-full max-w-[400px]">
//           {/* MAIN CONTENT */}
//           <div className="flex w-full">
//             {/* UPTO — BLACK */}
//             <div className="flex h-[95px] w-[57%] items-center justify-center bg-black sm:h-[120px] lg:h-[130px]">
//               <span
//                 className="font-serif text-[52px] font-bold leading-none tracking-[-3px] text-white sm:text-[68px] lg:text-[78px]"
//                 style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//               >
//                 UPTO
//               </span>
//             </div>

//             {/* 40% OFF — white box, red numeral, black accents */}
//             <div className="relative flex h-[95px] w-[43%] items-center justify-center overflow-hidden border border-black bg-white sm:h-[120px] lg:h-[130px]">
//               <span
//                 className="relative z-10 font-serif text-[62px] font-bold leading-none tracking-[-5px] text-[#cf2029] sm:text-[80px] lg:text-[92px]"
//                 style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//               >
//                 {discount}
//               </span>

//               <span
//                 className="relative z-20 -ml-1.5 self-start pt-1 font-serif text-[30px] font-bold leading-none text-[#202020] sm:-ml-2 sm:pt-1.5 sm:text-[40px] lg:text-[46px]"
//                 style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//               >
//                 %
//               </span>

//               <span
//                 className="absolute bottom-[6px] right-[8px] z-20 font-serif text-[17px] font-bold leading-none text-[#202020] sm:bottom-[9px] sm:right-[11px] sm:text-[22px] lg:bottom-[10px] lg:right-[13px] lg:text-[26px]"
//                 style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//               >
//                 OFF
//               </span>
//             </div>
//           </div>

//           {/* REFLECTION */}
//           <div
//             className="pointer-events-none flex w-full origin-top scale-y-[-1] opacity-[0.14]"
//             style={{
//               maskImage:
//                 'linear-gradient(to bottom, black 0%, transparent 75%)',
//               WebkitMaskImage:
//                 'linear-gradient(to bottom, black 0%, transparent 75%)',
//             }}
//           >
//             <div className="flex h-[95px] w-[57%] items-center justify-center bg-gradient-to-b from-gray-300 to-white sm:h-[120px] lg:h-[130px]">
//               <span
//                 className="font-serif text-[52px] font-bold leading-none tracking-[-3px] text-white sm:text-[68px] lg:text-[78px]"
//                 style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//               >
//                 UPTO
//               </span>
//             </div>

//             <div className="relative flex h-[95px] w-[43%] items-center justify-center overflow-hidden bg-white sm:h-[120px] lg:h-[130px]">
//               <span
//                 className="font-serif text-[62px] font-bold leading-none tracking-[-5px] text-[#cf2029] sm:text-[80px] lg:text-[92px]"
//                 style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//               >
//                 {discount}
//               </span>

//               <span
//                 className="-ml-1.5 self-start pt-1 font-serif text-[30px] font-bold leading-none text-[#202020] sm:-ml-2 sm:pt-1.5 sm:text-[40px] lg:text-[46px]"
//                 style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//               >
//                 %
//               </span>

//               <span
//                 className="absolute bottom-[6px] right-[8px] font-serif text-[17px] font-bold leading-none text-[#202020] sm:bottom-[9px] sm:right-[11px] sm:text-[22px] lg:bottom-[10px] lg:right-[13px] lg:text-[26px]"
//                 style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//               >
//                 OFF
//               </span>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// }

// // ============================================================
// // PRODUCT CARD (unchanged)
// // ============================================================
// const OfferProductCard = ({
//   product,
//   isInCart: propIsInCart,
//   onCartStatusChange,
//   onViewInCart,
//   index,
// }) => {
//   const [cartStatusLoading, setCartStatusLoading] = useState(false);
//   const [isInCart, setIsInCart] = useState(propIsInCart || false);
//   const [isHovered, setIsHovered] = useState(false);
//   const prefersReducedMotion = useReducedMotion();
//   const discountPercent = calculateDiscountPercentage(
//     product.regularPrice,
//     product.discountPrice
//   );
//   const productImage =
//     product.images?.[0]?.url ||
//     product.images?.[0] ||
//     'https://via.placeholder.com/400?text=Product';

//   useEffect(() => {
//     setIsInCart(propIsInCart || false);
//   }, [propIsInCart]);

//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();

//     if (isInCart) {
//       onViewInCart();
//       return;
//     }

//     if (product.stockQuantity <= 0) {
//       toast.error('Product is out of stock!');
//       return;
//     }

//     setCartStatusLoading(true);
//     const toastId = toast.loading('Adding to bag...');

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
//         body: JSON.stringify({ productId: product._id, quantity: 1 }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         if (data.sessionId && !token) {
//           localStorage.setItem('cartSessionId', data.sessionId);
//         }
//         toast.success('Added to bag!', { id: toastId });
//         setIsInCart(true);
//         if (onCartStatusChange) onCartStatusChange(product._id, true);
//         window.dispatchEvent(new Event('cart-update'));
//       } else {
//         toast.error(data.error || 'Failed to add to bag', { id: toastId });
//       }
//     } catch (error) {
//       console.error('Add to cart error:', error);
//       toast.error('Network error. Please try again.', { id: toastId });
//     } finally {
//       setCartStatusLoading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{
//         duration: prefersReducedMotion ? 0 : 0.45,
//         delay: prefersReducedMotion ? 0 : (index % 6) * 0.04,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       className="group relative aspect-[3/4] overflow-hidden rounded-[10px] sm:aspect-[4/5] "
//       style={{ backgroundColor: STONE }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Link href={`/product/${product.slug || product._id}`} className="block h-full">
//         <img
//           src={productImage}
//           alt={product.productName}
//           className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = 'https://via.placeholder.com/400?text=Product';
//           }}
//           loading="lazy"
//         />

//         <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

//         {discountPercent > 0 && (
//           <div
//             className="absolute left-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border sm:h-9 sm:w-9"
//             style={{
//               borderColor: 'rgba(248,245,239,0.4)',
//               backgroundColor: 'rgba(23,19,15,0.85)',
//             }}
//           >
//             <span
//               className="text-[10px] font-semibold sm:text-[11px]"
//               style={{ fontFamily: FONT_FAMILY, color: IVORY }}
//             >
//               -{discountPercent}%
//             </span>
//           </div>
//         )}

//         <div className="absolute inset-x-2 bottom-2 z-10 sm:inset-x-2.5 sm:bottom-2.5">
//           <h3
//             className="text-[10px] font-medium leading-tight text-white line-clamp-1 sm:text-[11px] md:text-[12px]"
//             style={{ fontFamily: FONT_FAMILY }}
//           >
//             {product.productName}
//           </h3>

//           <div className="mt-1 flex items-center justify-between gap-1.5">
//             <div className="flex items-baseline gap-1.5">
//               <span
//                 className="text-[12px] font-semibold text-white sm:text-[13px] md:text-[14px]"
//                 style={{ fontFamily: FONT_FAMILY }}
//               >
//                 Tk. {formatPrice(product.discountPrice || product.regularPrice)}
//               </span>
//               {product.discountPrice > 0 && (
//                 <span
//                   className="text-[9px] text-white/55 line-through sm:text-[10px]"
//                   style={{ fontFamily: FONT_FAMILY }}
//                 >
//                   Tk. {formatPrice(product.regularPrice)}
//                 </span>
//               )}
//             </div>

//             <button
//               onClick={handleAddToCart}
//               disabled={cartStatusLoading}
//               aria-label={isInCart ? 'View in bag' : 'Add to bag'}
//               className={`hidden shrink-0 items-center justify-center rounded-full p-1.5 shadow-sm transition-all duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:flex ${
//                 isHovered ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
//               }`}
//               style={{ backgroundColor: IVORY, color: INK }}
//               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = RED)}
//               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = IVORY)}
//             >
//               {cartStatusLoading ? (
//                 <Loader2 className="h-3 w-3 animate-spin" />
//               ) : isInCart ? (
//                 <ShoppingCart className="h-3 w-3" />
//               ) : (
//                 <ShoppingBag className="h-3 w-3" />
//               )}
//             </button>

//             <button
//               onClick={handleAddToCart}
//               disabled={cartStatusLoading}
//               aria-label={isInCart ? 'View in bag' : 'Add to bag'}
//               className="flex shrink-0 items-center justify-center rounded-full p-1 shadow-sm sm:hidden"
//               style={{ backgroundColor: IVORY, color: INK }}
//             >
//               {cartStatusLoading ? (
//                 <Loader2 className="h-2.5 w-2.5 animate-spin" />
//               ) : isInCart ? (
//                 <ShoppingCart className="h-2.5 w-2.5" />
//               ) : (
//                 <ShoppingBag className="h-2.5 w-2.5" />
//               )}
//             </button>
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// };

// // ============================================================
// // MAIN OFFER SECTION (unchanged)
// // ============================================================
// export default function OfferSection() {
//   const [allProducts, setAllProducts] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [productsInCart, setProductsInCart] = useState({});

//   const ITEMS_PER_PAGE = 4;

//   const getCurrentProducts = () => {
//     if (allProducts.length === 0) return [];
//     const start = currentPage * ITEMS_PER_PAGE;
//     const end = Math.min(start + ITEMS_PER_PAGE, allProducts.length);
//     return allProducts.slice(start, end);
//   };

//   const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
//   const maxDiscount = allProducts[0]?.discountPercent || 0;

//   const checkCartStatus = async (productsList) => {
//     if (!productsList || productsList.length === 0) return;

//     const productIds = productsList.map((p) => p._id);
//     const token = localStorage.getItem('token');
//     let sessionId = localStorage.getItem('cartSessionId');

//     const headers = {};

//     if (!token && !sessionId) {
//       sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
//       localStorage.setItem('cartSessionId', sessionId);
//     }

//     if (token) headers['Authorization'] = `Bearer ${token}`;
//     else if (sessionId) headers['x-session-id'] = sessionId;
//     else {
//       const empty = {};
//       productIds.forEach((id) => (empty[id] = false));
//       setProductsInCart(empty);
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/cart/check-status', {
//         method: 'POST',
//         headers: { ...headers, 'Content-Type': 'application/json' },
//         body: JSON.stringify({ productIds }),
//       });
//       const data = await response.json();
//       if (data.success) setProductsInCart(data.data);
//     } catch (error) {
//       console.error('Error checking cart status:', error);
//     }
//   };

//   const updateCartStatus = useCallback(async () => {
//     if (allProducts.length === 0) return;
//     await checkCartStatus(allProducts);
//   }, [allProducts]);

//   useEffect(() => {
//     const fetchSaleProducts = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(
//           'http://localhost:5000/api/products?limit=100&populateTags=true'
//         );
//         const data = await response.json();

//         if (data.success) {
//           const discountedProducts = data.data
//             .filter(
//               (p) =>
//                 p.discountPrice > 0 &&
//                 p.discountPrice < p.regularPrice &&
//                 p.isActive !== false
//             )
//             .map((p) => ({
//               ...p,
//               discountPercent: calculateDiscountPercentage(
//                 p.regularPrice,
//                 p.discountPrice
//               ),
//             }))
//             .sort((a, b) => b.discountPercent - a.discountPercent);

//           setAllProducts(discountedProducts);
//           await checkCartStatus(discountedProducts);
//         }
//       } catch (error) {
//         console.error('Error fetching sale products:', error);
//         setAllProducts([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSaleProducts();
//   }, []);

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

//   const handlePrev = () => setCurrentPage((p) => Math.max(0, p - 1));
//   const handleNext = () => setCurrentPage((p) => Math.min(totalPages - 1, p + 1));

//   const currentProducts = getCurrentProducts();
//   const hasPrev = currentPage > 0;
//   const hasNext = currentPage < totalPages - 1;

//   if (isLoading) {
//     return (
//       <section className="w-full py-6 sm:py-8" style={{ backgroundColor: IVORY }}>
//         <div className="mx-auto max-w-[1500px] px-3 sm:px-4 md:px-6 lg:px-10">
//           <div className="grid grid-cols-1 gap-4 lg:grid-cols-[380px_1fr] lg:gap-6 lg:items-stretch">
//             <div
//               className="min-h-[420px] animate-pulse rounded-[10px]"
//               style={{ backgroundColor: STONE }}
//             />
//             <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-4">
//               {[...Array(4)].map((_, i) => (
//                 <div
//                   key={i}
//                   className="aspect-[4/5] animate-pulse rounded-[10px]"
//                   style={{ backgroundColor: STONE }}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (allProducts.length === 0) {
//     if (typeof window !== 'undefined') {
//       console.warn(
//         '[OfferSection] No discounted products found. Section hidden. ' +
//           'Ensure some products have discountPrice > 0 and discountPrice < regularPrice.'
//       );
//     }
//     return null;
//   }

//   return (
//     <>
//       <section
//         id="sale-products"
//         className="w-full py-6 md:py-2 "
//         style={{ backgroundColor: IVORY }}
//       >
//         <div className="mx-auto max-w-[1500px] px-3 sm:px-4 md:px-6 lg:px-10">
//           {totalPages > 1 && (
//             <div className="mb-5 flex items-center justify-between sm:mb-6">
//               <p
//                 className="text-[11px] tabular-nums tracking-[0.02em]"
//                 style={{ fontFamily: FONT_FAMILY, color: 'rgba(23,19,15,0.5)' }}
//               >
               
//               </p>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={handlePrev}
//                   disabled={!hasPrev}
//                   aria-label="Previous products"
//                   className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
//                   style={{
//                     borderColor: hasPrev
//                       ? 'rgba(23,19,15,0.2)'
//                       : 'rgba(23,19,15,0.08)',
//                     color: hasPrev ? INK : 'rgba(23,19,15,0.25)',
//                   }}
//                   onMouseEnter={(e) => {
//                     if (hasPrev) {
//                       e.currentTarget.style.borderColor = RED;
//                       e.currentTarget.style.color = RED;
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.borderColor = hasPrev
//                       ? 'rgba(23,19,15,0.2)'
//                       : 'rgba(23,19,15,0.08)';
//                     e.currentTarget.style.color = hasPrev
//                       ? INK
//                       : 'rgba(23,19,15,0.25)';
//                   }}
//                 >
//                   <ChevronLeft className="h-3.5 w-3.5" />
//                 </button>
//                 <button
//                   onClick={handleNext}
//                   disabled={!hasNext}
//                   aria-label="Next products"
//                   className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
//                   style={{
//                     borderColor: hasNext
//                       ? 'rgba(23,19,15,0.2)'
//                       : 'rgba(23,19,15,0.08)',
//                     color: hasNext ? INK : 'rgba(23,19,15,0.25)',
//                   }}
//                   onMouseEnter={(e) => {
//                     if (hasNext) {
//                       e.currentTarget.style.borderColor = RED;
//                       e.currentTarget.style.color = RED;
//                     }
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.borderColor = hasNext
//                       ? 'rgba(23,19,15,0.2)'
//                       : 'rgba(23,19,15,0.08)';
//                     e.currentTarget.style.color = hasNext
//                       ? INK
//                       : 'rgba(23,19,15,0.25)';
//                   }}
//                 >
//                   <ChevronRight className="h-3.5 w-3.5" />
//                 </button>
//               </div>
//             </div>
//           )}

//           <div className="grid grid-cols-1 gap-4 lg:grid-cols-[380px_1fr] lg:gap-6 xl:grid-cols-[420px_1fr] lg:items-stretch">
//             <div className="flex items-stretch justify-center lg:min-h-[420px]">
//               <SaleBannerCompact maxDiscount={maxDiscount} />
//             </div>

//             <div className="flex flex-col">
//               <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-4">
//                 {currentProducts.map((product, index) => (
//                   <OfferProductCard
//                     key={`${product._id}-${currentPage}-${index}`}
//                     product={product}
//                     index={index}
//                     isInCart={productsInCart[product._id] || false}
//                     onCartStatusChange={onCartStatusChange}
//                     onViewInCart={openCartSidebar}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
//     </>
//   );
// }


'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ShoppingBag,
  Loader2,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';
import CartSidebar from '../CartSidebar';

// Font constants
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// Design tokens
const INK = '#17130F';
const IVORY = '#F8F5EF';
const STONE = '#EFEAE0';
const RED = '#D92F45';

const calculateDiscountPercentage = (regularPrice, discountPrice) => {
  if (regularPrice && discountPrice && discountPrice < regularPrice) {
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  }
  return 0;
};

const formatPrice = (price) => (price ? price.toFixed(0) : '0');

// ============================================================
// SALE BANNER
// Reduced sizes on mobile + no gap above
// ============================================================
function SaleBannerCompact({ maxDiscount }) {
  const prefersReducedMotion = useReducedMotion();
  const discount =
    maxDiscount && maxDiscount > 0 ? Math.round(maxDiscount) : 40;

  return (
    <section className="flex h-full w-full items-center justify-center py-2 sm:py-4 lg:py-6 -mt-8 md:-mt-10">
      <motion.div
        className="mx-auto flex w-full max-w-[320px] flex-col items-center px-2 sm:max-w-[380px] sm:px-3 lg:max-w-[420px]"
        animate={
          prefersReducedMotion
            ? { scale: 1 }
            : {
                scale: [1, 1.05, 1],
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : {
                duration: 3.5,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatType: 'loop',
              }
        }
      >
        {/* SALE */}
        <h2
          className="mb-2 font-serif text-[30px] leading-none tracking-[-1.5px] text-black sm:mb-3 sm:text-[44px] lg:mb-4 lg:text-[60px]"
          style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
        >
          SALE
        </h2>

        {/* MAIN SALE BOX */}
        <div className="relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px]">
          {/* MAIN CONTENT */}
          <div className="flex w-full">
            {/* UPTO — BLACK */}
            <div className="flex h-[64px] w-[57%] items-center justify-center bg-black sm:h-[95px] lg:h-[130px]">
              <span
                className="font-serif text-[34px] font-bold leading-none tracking-[-2px] text-white sm:text-[52px] sm:tracking-[-3px] lg:text-[78px]"
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              >
                UPTO
              </span>
            </div>

            {/* 40% OFF */}
            <div className="relative flex h-[64px] w-[43%] items-center justify-center overflow-hidden border border-black bg-white sm:h-[95px] lg:h-[130px]">
              <span
                className="relative z-10 font-serif text-[40px] font-bold leading-none tracking-[-3px] text-[#cf2029] sm:text-[62px] sm:tracking-[-5px] lg:text-[92px]"
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              >
                {discount}
              </span>

              <span
                className="relative z-20 -ml-1 self-start pt-0.5 font-serif text-[20px] font-bold leading-none text-[#202020] sm:-ml-1.5 sm:pt-1 sm:text-[30px] lg:text-[46px]"
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              >
                %
              </span>

              <span
                className="absolute bottom-[4px] right-[5px] z-20 font-serif text-[11px] font-bold leading-none text-[#202020] sm:bottom-[6px] sm:right-[8px] sm:text-[17px] lg:bottom-[10px] lg:right-[13px] lg:text-[26px]"
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              >
                OFF
              </span>
            </div>
          </div>

          {/* REFLECTION */}
          <div
            className="pointer-events-none flex w-full origin-top scale-y-[-1] opacity-[0.14]"
            style={{
              maskImage:
                'linear-gradient(to bottom, black 0%, transparent 75%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 0%, transparent 75%)',
            }}
          >
            <div className="flex h-[64px] w-[57%] items-center justify-center bg-gradient-to-b from-gray-300 to-white sm:h-[95px] lg:h-[130px]">
              <span
                className="font-serif text-[34px] font-bold leading-none tracking-[-2px] text-white sm:text-[52px] sm:tracking-[-3px] lg:text-[78px]"
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              >
                UPTO
              </span>
            </div>

            <div className="relative flex h-[64px] w-[43%] items-center justify-center overflow-hidden bg-white sm:h-[95px] lg:h-[130px]">
              <span
                className="font-serif text-[40px] font-bold leading-none tracking-[-3px] text-[#cf2029] sm:text-[62px] sm:tracking-[-5px] lg:text-[92px]"
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              >
                {discount}
              </span>

              <span
                className="-ml-1 self-start pt-0.5 font-serif text-[20px] font-bold leading-none text-[#202020] sm:-ml-1.5 sm:pt-1 sm:text-[30px] lg:text-[46px]"
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              >
                %
              </span>

              <span
                className="absolute bottom-[4px] right-[5px] font-serif text-[11px] font-bold leading-none text-[#202020] sm:bottom-[6px] sm:right-[8px] sm:text-[17px] lg:bottom-[10px] lg:right-[13px] lg:text-[26px]"
                style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
              >
                OFF
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ============================================================
// PRODUCT CARD (unchanged)
// ============================================================
const OfferProductCard = ({
  product,
  isInCart: propIsInCart,
  onCartStatusChange,
  onViewInCart,
  index,
}) => {
  const [cartStatusLoading, setCartStatusLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(propIsInCart || false);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const discountPercent = calculateDiscountPercentage(
    product.regularPrice,
    product.discountPrice
  );
  const productImage =
    product.images?.[0]?.url ||
    product.images?.[0] ||
    'https://via.placeholder.com/400?text=Product';

  useEffect(() => {
    setIsInCart(propIsInCart || false);
  }, [propIsInCart]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isInCart) {
      onViewInCart();
      return;
    }

    if (product.stockQuantity <= 0) {
      toast.error('Product is out of stock!');
      return;
    }

    setCartStatusLoading(true);
    const toastId = toast.loading('Adding to bag...');

    try {
      const token = localStorage.getItem('token');
      let sessionId = localStorage.getItem('cartSessionId');

      const headers = { 'Content-Type': 'application/json' };

      if (!token && !sessionId) {
        sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
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
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.sessionId && !token) {
          localStorage.setItem('cartSessionId', data.sessionId);
        }
        toast.success('Added to bag!', { id: toastId });
        setIsInCart(true);
        if (onCartStatusChange) onCartStatusChange(product._id, true);
        window.dispatchEvent(new Event('cart-update'));
      } else {
        toast.error(data.error || 'Failed to add to bag', { id: toastId });
      }
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Network error. Please try again.', { id: toastId });
    } finally {
      setCartStatusLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.45,
        delay: prefersReducedMotion ? 0 : (index % 6) * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative aspect-[3/4] overflow-hidden rounded-[10px] sm:aspect-[4/5]"
      style={{ backgroundColor: STONE }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug || product._id}`} className="block h-full">
        <img
          src={productImage}
          alt={product.productName}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/400?text=Product';
          }}
          loading="lazy"
        />

        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {discountPercent > 0 && (
          <div
            className="absolute left-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border sm:h-9 sm:w-9"
            style={{
              borderColor: 'rgba(248,245,239,0.4)',
              backgroundColor: 'rgba(23,19,15,0.85)',
            }}
          >
            <span
              className="text-[10px] font-semibold sm:text-[11px]"
              style={{ fontFamily: FONT_FAMILY, color: IVORY }}
            >
              -{discountPercent}%
            </span>
          </div>
        )}

        <div className="absolute inset-x-2 bottom-2 z-10 sm:inset-x-2.5 sm:bottom-2.5">
          <h3
            className="text-[10px] font-medium leading-tight text-white line-clamp-1 sm:text-[11px] md:text-[12px]"
            style={{ fontFamily: FONT_FAMILY }}
          >
            {product.productName}
          </h3>

          <div className="mt-1 flex items-center justify-between gap-1.5">
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-[12px] font-semibold text-white sm:text-[13px] md:text-[14px]"
                style={{ fontFamily: FONT_FAMILY }}
              >
                Tk. {formatPrice(product.discountPrice || product.regularPrice)}
              </span>
              {product.discountPrice > 0 && (
                <span
                  className="text-[9px] text-white/55 line-through sm:text-[10px]"
                  style={{ fontFamily: FONT_FAMILY }}
                >
                  Tk. {formatPrice(product.regularPrice)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={cartStatusLoading}
              aria-label={isInCart ? 'View in bag' : 'Add to bag'}
              className={`hidden shrink-0 items-center justify-center rounded-full p-1.5 shadow-sm transition-all duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:flex ${
                isHovered ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
              }`}
              style={{ backgroundColor: IVORY, color: INK }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = RED)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = IVORY)}
            >
              {cartStatusLoading ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : isInCart ? (
                <ShoppingCart className="h-3 w-3" />
              ) : (
                <ShoppingBag className="h-3 w-3" />
              )}
            </button>

            <button
              onClick={handleAddToCart}
              disabled={cartStatusLoading}
              aria-label={isInCart ? 'View in bag' : 'Add to bag'}
              className="flex shrink-0 items-center justify-center rounded-full p-1 shadow-sm sm:hidden"
              style={{ backgroundColor: IVORY, color: INK }}
            >
              {cartStatusLoading ? (
                <Loader2 className="h-2.5 w-2.5 animate-spin" />
              ) : isInCart ? (
                <ShoppingCart className="h-2.5 w-2.5" />
              ) : (
                <ShoppingBag className="h-2.5 w-2.5" />
              )}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// ============================================================
// MAIN OFFER SECTION
// ============================================================
export default function OfferSection() {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [productsInCart, setProductsInCart] = useState({});

  const ITEMS_PER_PAGE = 4;

  const getCurrentProducts = () => {
    if (allProducts.length === 0) return [];
    const start = currentPage * ITEMS_PER_PAGE;
    const end = Math.min(start + ITEMS_PER_PAGE, allProducts.length);
    return allProducts.slice(start, end);
  };

  const totalPages = Math.ceil(allProducts.length / ITEMS_PER_PAGE);
  const maxDiscount = allProducts[0]?.discountPercent || 0;

  const checkCartStatus = async (productsList) => {
    if (!productsList || productsList.length === 0) return;

    const productIds = productsList.map((p) => p._id);
    const token = localStorage.getItem('token');
    let sessionId = localStorage.getItem('cartSessionId');

    const headers = {};

    if (!token && !sessionId) {
      sessionId = `guest_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      localStorage.setItem('cartSessionId', sessionId);
    }

    if (token) headers['Authorization'] = `Bearer ${token}`;
    else if (sessionId) headers['x-session-id'] = sessionId;
    else {
      const empty = {};
      productIds.forEach((id) => (empty[id] = false));
      setProductsInCart(empty);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/cart/check-status', {
        method: 'POST',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify({ productIds }),
      });
      const data = await response.json();
      if (data.success) setProductsInCart(data.data);
    } catch (error) {
      console.error('Error checking cart status:', error);
    }
  };

  const updateCartStatus = useCallback(async () => {
    if (allProducts.length === 0) return;
    await checkCartStatus(allProducts);
  }, [allProducts]);

  useEffect(() => {
    const fetchSaleProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          'http://localhost:5000/api/products?limit=100&populateTags=true'
        );
        const data = await response.json();

        if (data.success) {
          const discountedProducts = data.data
            .filter(
              (p) =>
                p.discountPrice > 0 &&
                p.discountPrice < p.regularPrice &&
                p.isActive !== false
            )
            .map((p) => ({
              ...p,
              discountPercent: calculateDiscountPercentage(
                p.regularPrice,
                p.discountPrice
              ),
            }))
            .sort((a, b) => b.discountPercent - a.discountPercent);

          setAllProducts(discountedProducts);
          await checkCartStatus(discountedProducts);
        }
      } catch (error) {
        console.error('Error fetching sale products:', error);
        setAllProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaleProducts();
  }, []);

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

  const handlePrev = () => setCurrentPage((p) => Math.max(0, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages - 1, p + 1));

  const currentProducts = getCurrentProducts();
  const hasPrev = currentPage > 0;
  const hasNext = currentPage < totalPages - 1;

  if (isLoading) {
    return (
      <section className="w-full py-6 sm:py-8" style={{ backgroundColor: IVORY }}>
        <div className="mx-auto max-w-[1500px] px-3 sm:px-4 md:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[380px_1fr] lg:gap-6 lg:items-stretch">
            <div
              className="min-h-[220px] animate-pulse rounded-[10px] sm:min-h-[280px] lg:min-h-[420px]"
              style={{ backgroundColor: STONE }}
            />
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/5] animate-pulse rounded-[10px]"
                  style={{ backgroundColor: STONE }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (allProducts.length === 0) {
    if (typeof window !== 'undefined') {
      console.warn(
        '[OfferSection] No discounted products found. Section hidden. ' +
          'Ensure some products have discountPrice > 0 and discountPrice < regularPrice.'
      );
    }
    return null;
  }

  return (
    <>
      <section
        id="sale-products"
        className="w-full py-6 sm:py-6 md:py-2 -mb-10 md:-mb-32"
        style={{ backgroundColor: IVORY }}
      >
        <div className="mx-auto max-w-[1500px] px-3 sm:px-4 md:px-6 lg:px-10">
          {totalPages > 1 && (
            <div className="mb-3 flex items-center justify-end sm:mb-5 md:mb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={!hasPrev}
                  aria-label="Previous products"
                  className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
                  style={{
                    borderColor: hasPrev
                      ? 'rgba(23,19,15,0.2)'
                      : 'rgba(23,19,15,0.08)',
                    color: hasPrev ? INK : 'rgba(23,19,15,0.25)',
                  }}
                  onMouseEnter={(e) => {
                    if (hasPrev) {
                      e.currentTarget.style.borderColor = RED;
                      e.currentTarget.style.color = RED;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = hasPrev
                      ? 'rgba(23,19,15,0.2)'
                      : 'rgba(23,19,15,0.08)';
                    e.currentTarget.style.color = hasPrev
                      ? INK
                      : 'rgba(23,19,15,0.25)';
                  }}
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={!hasNext}
                  aria-label="Next products"
                  className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed"
                  style={{
                    borderColor: hasNext
                      ? 'rgba(23,19,15,0.2)'
                      : 'rgba(23,19,15,0.08)',
                    color: hasNext ? INK : 'rgba(23,19,15,0.25)',
                  }}
                  onMouseEnter={(e) => {
                    if (hasNext) {
                      e.currentTarget.style.borderColor = RED;
                      e.currentTarget.style.color = RED;
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = hasNext
                      ? 'rgba(23,19,15,0.2)'
                      : 'rgba(23,19,15,0.08)';
                    e.currentTarget.style.color = hasNext
                      ? INK
                      : 'rgba(23,19,15,0.25)';
                  }}
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-[380px_1fr] lg:gap-6 xl:grid-cols-[420px_1fr] lg:items-stretch">
            <div className="flex items-stretch justify-center lg:min-h-[420px]">
              <SaleBannerCompact maxDiscount={maxDiscount} />
            </div>

            <div className="flex flex-col">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-4 -mt-20 md:-mt-0.5">
                {currentProducts.map((product, index) => (
                  <OfferProductCard
                    key={`${product._id}-${currentPage}-${index}`}
                    product={product}
                    index={index}
                    isInCart={productsInCart[product._id] || false}
                    onCartStatusChange={onCartStatusChange}
                    onViewInCart={openCartSidebar}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CartSidebar isOpen={isCartOpen} onClose={closeCartSidebar} />
    </>
  );
}