
// 'use client';

// import { useState, useEffect, useRef, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion';
// import {
//   Scan, Search, Plus, Minus, Trash2, Printer, ShoppingCart,
//   Loader2, X, CheckCircle, Package, Tag, AlertCircle,
//   Layers, Circle, Barcode, User, Phone, MapPin, Save,
//   Receipt, RotateCcw, ChevronDown, ChevronUp
// } from 'lucide-react';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
// const SCAN_RESET_MS = 300;      // buffer reset when keystrokes stall
// const SCAN_KEY_GAP_MS = 80;     // keystrokes closer than this = scanner

// // ============================================================
// // Helpers
// // ============================================================
// function makeSlug(name, fallbackId) {
//   let slug = (name || '')
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/^-+|-+$/g, '');
//   if (!slug) slug = `pos-${fallbackId || Date.now()}`;
//   return slug;
// }

// const getColorName = (color) => {
//   const map = {
//     '#000000': 'Black', '#FFFFFF': 'White', '#FF0000': 'Red',
//     '#00FF00': 'Green', '#0000FF': 'Blue', '#FFFF00': 'Yellow',
//     '#A52A2A': 'Brown', '#808080': 'Gray'
//   };
//   return map[color] || color;
// };

// // ============================================================
// // POS CART ROW
// // ============================================================
// function PosCartRow({ item, onQtyChange, onRemove }) {
//   const [qtyInput, setQtyInput] = useState(String(item.quantity || 1));

//   useEffect(() => {
//     setQtyInput(String(item.quantity || 1));
//   }, [item.quantity]);

//   const label = [item.productName, item.variantName, item.subVariantName]
//     .filter(Boolean).join(' / ');

//   const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
//   const lineTotal = price * item.quantity;
//   const hasDiscount = item.discountPrice > 0 && item.discountPrice < item.regularPrice;

//   const commitQty = () => {
//     const n = parseInt(qtyInput, 10);
//     if (isNaN(n) || n < 1) {
//       setQtyInput(String(item.quantity || 1));
//       return;
//     }
//     if (n > item.stockQuantity) {
//       toast.warning(`Only ${item.stockQuantity} in stock`);
//       setQtyInput(String(item.quantity));
//       return;
//     }
//     onQtyChange(item._id, n);
//     setQtyInput(String(n));
//   };

//   return (
//     <div className="border border-gray-200 rounded-xl p-3 bg-white hover:border-black/30 transition-all">
//       <div className="flex items-start gap-3">
//         <div className="w-14 h-14 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200 flex items-center justify-center">
//           {item.image ? (
//             <img src={item.image} alt={label} className="w-full h-full object-cover"
//               onError={(e) => { e.target.style.display = 'none'; }} />
//           ) : (
//             <Package className="w-5 h-5 text-gray-300" />
//           )}
//         </div>

//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 flex-wrap">
//             <p className="text-sm font-semibold text-black truncate">{label}</p>
//             {item.variantId && (
//               <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-medium">
//                 Variant
//               </span>
//             )}
//           </div>
//           {item.barcode && (
//             <p className="text-[10px] text-gray-500 font-mono mt-0.5 flex items-center gap-1">
//               <Barcode className="w-2.5 h-2.5" />{item.barcode}
//             </p>
//           )}
//           <div className="flex items-center gap-2 mt-1 text-xs flex-wrap">
//             <span className="text-gray-500">Unit:</span>
//             <span className="font-semibold text-black">৳{price.toFixed(2)}</span>
//             {hasDiscount && (
//               <span className="text-gray-400 line-through">৳{item.regularPrice.toFixed(2)}</span>
//             )}
//             <span className="text-gray-400">|</span>
//             <span className="text-gray-500">Stock: {item.stockQuantity}</span>
//           </div>
//         </div>

//         <button onClick={() => onRemove(item._id)}
//           className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
//           <Trash2 className="w-3.5 h-3.5" />
//         </button>
//       </div>

//       <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-100">
//         <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
//           <button type="button"
//             onClick={() => onQtyChange(item._id, Math.max(1, item.quantity - 1))}
//             disabled={item.quantity <= 1}
//             className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">
//             <Minus className="w-3 h-3" />
//           </button>
//           <input type="number" min="1" max={item.stockQuantity}
//             value={qtyInput}
//             onChange={(e) => setQtyInput(e.target.value)}
//             onBlur={commitQty}
//             onKeyDown={(e) => { if (e.key === 'Enter') { commitQty(); e.target.blur(); } }}
//             className="w-14 text-center text-sm py-1 focus:outline-none text-black font-medium" />
//           <button type="button"
//             onClick={() => onQtyChange(item._id, item.quantity + 1)}
//             disabled={item.quantity >= item.stockQuantity}
//             className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">
//             <Plus className="w-3 h-3" />
//           </button>
//         </div>
//         <span className="text-base font-bold text-black">৳{lineTotal.toFixed(2)}</span>
//       </div>
//     </div>
//   );
// }

// // ============================================================
// // MAIN POS PAGE
// // ============================================================
// export default function ShowroomPosPage() {
//   const router = useRouter();

//   const [cart, setCart] = useState([]);
//   const [discount, setDiscount] = useState(0);
//   const [note, setNote] = useState('');

//   const [customer, setCustomer] = useState({
//     fullName: '',
//     phone: '',
//     address: '',
//   });

//   const [manualCode, setManualCode] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [searching, setSearching] = useState(false);
//   const [showSearchResults, setShowSearchResults] = useState(false);

//   // Scanner refs
//   const scanBufferRef = useRef('');
//   const scanTimerRef = useRef(null);
//   const lastKeyTimeRef = useRef(0);
//   const [scanBuffer, setScanBuffer] = useState('');
//   const [scannerActive, setScannerActive] = useState(false);

//   const [submitting, setSubmitting] = useState(false);
//   const [completedOrder, setCompletedOrder] = useState(null);
//   const [showReceipt, setShowReceipt] = useState(false);
//   const [scanLookupLoading, setScanLookupLoading] = useState(false);

//   const [variantPickerProduct, setVariantPickerProduct] = useState(null);

//   const searchInputRef = useRef(null);
//   const manualInputRef = useRef(null);

//   // ========== TOTALS ==========
//   const subtotal = cart.reduce((sum, it) => {
//     const p = it.discountPrice > 0 ? it.discountPrice : it.regularPrice;
//     return sum + p * it.quantity;
//   }, 0);
//   const total = Math.max(0, subtotal - (discount || 0));
//   const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

//   // ========== GLOBAL BARCODE SCANNER ==========
//   // Works from ANYWHERE on the page. Human typing is slow; scanners type
//   // digits in a fast burst (< SCAN_KEY_GAP_MS between keys). Any fast burst
//   // ending in Enter/Tab is treated as a barcode scan — even if focus is
//   // inside a text field. Any digits the scanner typed into an input get
//   // cleared automatically.
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       const now = Date.now();
//       const sinceLast = now - (lastKeyTimeRef.current || 0);
//       lastKeyTimeRef.current = now;

//       const isFastBurst = sinceLast > 0 && sinceLast < SCAN_KEY_GAP_MS;

//       const tag = document.activeElement?.tagName;
//       const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
//       const activeEl = document.activeElement;

//       // ---- Enter or Tab: end of a scan ----
//       if (e.key === 'Enter' || e.key === 'Tab') {
//         const code = scanBufferRef.current.trim();

//         if (code && code.length >= 4) {
//           // This is a scan — stop it from doing anything else
//           e.preventDefault();
//           e.stopPropagation();

//           handleBarcodeScan(code);

//           // Clear the input the scanner typed into, if any
//           if (isTyping && activeEl && 'value' in activeEl) {
//             try {
//               const proto = activeEl instanceof HTMLTextAreaElement
//                 ? HTMLTextAreaElement.prototype
//                 : activeEl instanceof HTMLSelectElement
//                   ? HTMLSelectElement.prototype
//                   : HTMLInputElement.prototype;
//               const nativeSetter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
//               if (nativeSetter) {
//                 nativeSetter.call(activeEl, '');
//                 activeEl.dispatchEvent(new Event('input', { bubbles: true }));
//               } else {
//                 activeEl.value = '';
//               }
//             } catch (err) {
//               activeEl.value = '';
//             }
//           }

//           // Also clear the top scan input if digits landed there
//           setManualCode('');

//           scanBufferRef.current = '';
//           setScanBuffer('');
//           setScannerActive(false);
//           if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
//           return;
//         }

//         // No valid buffer — just reset and let the keypress through
//         scanBufferRef.current = '';
//         setScanBuffer('');
//         setScannerActive(false);
//         if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
//         return;
//       }

//       // ---- Only accept typical barcode characters ----
//       if (!/^[a-zA-Z0-9-]$/.test(e.key)) return;

//       // If the user is slowly typing inside an input, don't hijack it
//       if (isTyping && !isFastBurst && scanBufferRef.current.length === 0) {
//         return;
//       }

//       // ---- Record keystroke as part of a potential scan ----
//       setScannerActive(true);
//       scanBufferRef.current += e.key;
//       setScanBuffer(scanBufferRef.current);

//       if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
//       scanTimerRef.current = setTimeout(() => {
//         scanBufferRef.current = '';
//         setScanBuffer('');
//         setScannerActive(false);
//       }, SCAN_RESET_MS);
//     };

//     // Use capture phase so we see keydown before input fields handle it
//     window.addEventListener('keydown', handleKeyDown, true);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown, true);
//       if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // ========== FETCH BY BARCODE ==========
//   const fetchProductByBarcode = useCallback(async (code) => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${API_URL}/api/products/barcode/${encodeURIComponent(code)}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) return null;
//       const json = await res.json();
//       if (json.success && json.data) return json.data;
//       return null;
//     } catch (e) {
//       console.error('Barcode fetch failed:', e);
//       return null;
//     }
//   }, []);

//   // ========== HANDLE SCAN ==========
//   const handleBarcodeScan = async (code) => {
//     setScanLookupLoading(true);
//     const toastId = toast.loading(`Looking up ${code}...`);

//     try {
//       const product = await fetchProductByBarcode(code);

//       if (!product) {
//         toast.error(`No product found for: ${code}`, { id: toastId });
//         return;
//       }

//       let matched = null;
//       if (product.hasVariants && product.variantTypes?.length) {
//         for (const vt of product.variantTypes) {
//           for (const v of vt.variants || []) {
//             if (v.barcode === code || v.skuCode === code) {
//               matched = { variant: v, subVariant: null };
//               break;
//             }
//             for (const sv of v.subVariants || []) {
//               if (sv.barcode === code || sv.skuCode === code) {
//                 matched = { variant: v, subVariant: sv };
//                 break;
//               }
//             }
//             if (matched) break;
//           }
//           if (matched) break;
//         }
//       }

//       if (!product.hasVariants || !product.variantTypes?.length) {
//         addSimpleToCart(product);
//         toast.success(`Added: ${product.productName}`, { id: toastId, duration: 1500 });
//         return;
//       }

//       if (matched) {
//         addVariantToCart(product, matched.variant, matched.subVariant);
//         const label = [product.productName, matched.variant?.name, matched.subVariant?.name]
//           .filter(Boolean).join(' / ');
//         toast.success(`Added: ${label}`, { id: toastId, duration: 1500 });
//         return;
//       }

//       toast.info(`"${product.productName}" has variants — pick one`, { id: toastId });
//       setSearchQuery(product.productName);
//       setSearchResults([product]);
//       setShowSearchResults(true);
//     } finally {
//       setScanLookupLoading(false);
//     }
//   };

//   // ========== ADD SIMPLE ==========
//   const addSimpleToCart = (product) => {
//     const price = product.discountPrice > 0 ? product.discountPrice : product.regularPrice;
//     const image = product.images?.[0]?.url ||
//       (typeof product.images?.[0] === 'string' ? product.images[0] : '') || '';
//     const slug = product.slug || makeSlug(product.productName, product._id);

//     setCart(prev => {
//       const existing = prev.find(it =>
//         it.productId === product._id && !it.variantId && !it.subVariantId
//       );
//       if (existing) {
//         if (existing.quantity + 1 > existing.stockQuantity) {
//           toast.warning(`Only ${existing.stockQuantity} in stock`);
//           return prev;
//         }
//         return prev.map(it =>
//           it._id === existing._id ? { ...it, quantity: it.quantity + 1 } : it
//         );
//       }
//       return [...prev, {
//         _id: `${product._id}-base-${Date.now()}`,
//         productId: product._id,
//         productSlug: slug,
//         variantId: null,
//         subVariantId: null,
//         productName: product.productName,
//         variantName: '',
//         subVariantName: '',
//         skuCode: product.skuCode || '',
//         barcode: product.barcode || '',
//         image,
//         regularPrice: product.regularPrice || 0,
//         discountPrice: product.discountPrice || 0,
//         stockQuantity: product.stockQuantity || 0,
//         quantity: 1,
//         selectedColor: null,
//       }];
//     });
//   };

//   // ========== ADD VARIANT ==========
//   const addVariantToCart = (product, variant, subVariant) => {
//     const productId = product._id;
//     const variantId = variant?.id || variant?._id || null;
//     const subVariantId = subVariant?.id || subVariant?._id || null;
//     const slug = product.slug || makeSlug(product.productName, productId);

//     let currentStock = 0, image = '', skuCode = '', barcode = '';
//     let variantName = '', subVariantName = '', selectedColor = '';
//     let regularPrice = product.regularPrice || 0, discountPrice = product.discountPrice || 0;

//     if (subVariant) {
//       currentStock = Number(subVariant.stockQuantity) || 0;
//       image = subVariant.imagePreviews?.[0] || subVariant.images?.[0] || product.images?.[0]?.url || '';
//       skuCode = subVariant.skuCode || '';
//       barcode = subVariant.barcode || '';
//       variantName = variant?.name || '';
//       subVariantName = subVariant.name || '';
//       selectedColor = subVariant.color || variant?.color || '';
//       regularPrice = subVariant.regularPrice || variant?.regularPrice || product.regularPrice || 0;
//       discountPrice = subVariant.discountPrice || variant?.discountPrice || product.discountPrice || 0;
//     } else if (variant) {
//       currentStock = Number(variant.stockQuantity) || 0;
//       image = variant.imagePreviews?.[0] || variant.images?.[0] || product.images?.[0]?.url || '';
//       skuCode = variant.skuCode || '';
//       barcode = variant.barcode || '';
//       variantName = variant.name || '';
//       selectedColor = variant.color || '';
//       regularPrice = variant.regularPrice || product.regularPrice || 0;
//       discountPrice = variant.discountPrice || product.discountPrice || 0;
//     }

//     if (typeof image === 'object' && image?.url) image = image.url;

//     const productImage = product.images?.[0]?.url ||
//       (typeof product.images?.[0] === 'string' ? product.images[0] : '') || '';
//     if (!image) image = productImage;

//     setCart(prev => {
//       const existing = prev.find(it =>
//         it.productId === productId &&
//         it.variantId === variantId &&
//         it.subVariantId === subVariantId
//       );
//       if (existing) {
//         if (existing.quantity + 1 > existing.stockQuantity) {
//           toast.warning(`Only ${existing.stockQuantity} in stock`);
//           return prev;
//         }
//         return prev.map(it => it._id === existing._id ? { ...it, quantity: it.quantity + 1 } : it);
//       }
//       return [...prev, {
//         _id: `${productId}-${variantId || 'base'}-${subVariantId || 'base'}-${Date.now()}`,
//         productId,
//         productSlug: slug,
//         variantId,
//         subVariantId,
//         productName: product.productName,
//         variantName,
//         subVariantName,
//         skuCode,
//         barcode,
//         image,
//         regularPrice,
//         discountPrice,
//         stockQuantity: currentStock,
//         quantity: 1,
//         selectedColor,
//       }];
//     });
//   };

//   // ========== QTY / REMOVE ==========
//   const handleQtyChange = (id, newQty) => {
//     setCart(prev => prev.map(it => {
//       if (it._id === id) {
//         if (newQty > it.stockQuantity) {
//           toast.warning(`Only ${it.stockQuantity} in stock`);
//           return it;
//         }
//         return { ...it, quantity: newQty };
//       }
//       return it;
//     }));
//   };

//   const handleRemove = (id) => {
//     setCart(prev => prev.filter(it => it._id !== id));
//   };

//   const clearCart = () => {
//     if (cart.length === 0) return;
//     if (!confirm('Clear all items?')) return;
//     setCart([]);
//     setDiscount(0);
//     setNote('');
//   };

//   // ========== MANUAL CODE ENTRY ==========
//   const handleManualSubmit = async (e) => {
//     e.preventDefault();
//     if (!manualCode.trim()) return;
//     await handleBarcodeScan(manualCode.trim());
//     setManualCode('');
//     manualInputRef.current?.focus();
//   };

//   // ========== PRODUCT SEARCH ==========
//   const searchProducts = useCallback(async (q) => {
//     if (!q || q.length < 2) {
//       setSearchResults([]);
//       return;
//     }
//     setSearching(true);
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${API_URL}/api/orders/search-products?query=${encodeURIComponent(q)}&limit=10`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const json = await res.json();
//       if (json.success) setSearchResults(json.data || []);
//     } catch (e) {
//       console.error('Search failed:', e);
//     } finally {
//       setSearching(false);
//     }
//   }, []);

//   useEffect(() => {
//     const t = setTimeout(() => {
//       if (searchQuery.trim()) {
//         searchProducts(searchQuery);
//         setShowSearchResults(true);
//       } else {
//         setSearchResults([]);
//         setShowSearchResults(false);
//       }
//     }, 300);
//     return () => clearTimeout(t);
//   }, [searchQuery, searchProducts]);

//   const handleSearchResultClick = async (product) => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${API_URL}/api/products/${product._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const json = await res.json();
//       const fullProduct = json.success ? json.data.product : product;

//       const hasVariants = fullProduct.hasVariants && fullProduct.variantTypes?.length > 0;

//       if (!hasVariants) {
//         addSimpleToCart(fullProduct);
//         toast.success(`Added: ${fullProduct.productName}`);
//         setSearchQuery('');
//         setSearchResults([]);
//         setShowSearchResults(false);
//         return;
//       }

//       setVariantPickerProduct(fullProduct);
//     } catch (e) {
//       console.error(e);
//       toast.error('Failed to load product');
//     }
//   };

//   // ========== CHECKOUT ==========
//   const handleCheckout = async () => {
//     if (cart.length === 0) {
//       toast.error('Cart is empty');
//       return;
//     }

//     setSubmitting(true);
//     try {
//       const token = localStorage.getItem('token');

//       const items = cart.map(it => {
//         const slug = it.productSlug || makeSlug(it.productName, it.productId);
//         return {
//           productId: it.productId,
//           productName: it.productName,
//           productSlug: slug,
//           image: it.image,
//           regularPrice: it.regularPrice,
//           discountPrice: it.discountPrice,
//           quantity: it.quantity,
//           variantId: it.variantId,
//           variantName: it.variantName,
//           subVariantId: it.subVariantId,
//           subVariantName: it.subVariantName,
//           variantRegularPrice: it.regularPrice,
//           variantDiscountPrice: it.discountPrice,
//           selectedColor: it.selectedColor,
//           colors: [],
//         };
//       });

//       const payload = {
//         items,
//         subtotal,
//         shippingCost: 0,
//         discount: discount || 0,
//         total,
//         paymentMethod: 'cod',
//         orderPlatform: 'showroom',
//         orderStatus: 'delivered',
//         saveOrder: true,
//         customerInfo: {
//           fullName: customer.fullName || 'Showroom Walk-in Customer',
//           email: '',
//           phone: customer.phone || 'N/A',
//           division: 'Showroom',
//           address: customer.address || 'Showroom',
//           city: 'Showroom',
//           zone: 'Showroom',
//           area: '',
//           zipCode: '',
//           country: 'Bangladesh',
//           note: note || '',
//         },
//         clientDeviceInfo: {
//           deviceType: 'desktop',
//           browser: 'POS',
//           os: 'Showroom',
//         },
//       };

//       const res = await fetch(`${API_URL}/api/orders/showroom/pos`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       const json = await res.json();

//       if (json.success) {
//         toast.success('Sale completed!');
//         setCompletedOrder(json.data);
//         setShowReceipt(true);
//         setCart([]);
//         setDiscount(0);
//         setNote('');
//         setCustomer({ fullName: '', phone: '', address: '' });
//       } else {
//         toast.error(json.error || 'Failed to complete sale');
//       }
//     } catch (e) {
//       console.error('Checkout error:', e);
//       toast.error('Network error');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//    // ========== PRINT ==========
//   const handlePrintReceipt = () => {
//     if (!completedOrder) return;

//     const w = window.open('', '_blank', 'width=380,height=700');
//     if (!w) {
//       toast.error('Please allow popups to print');
//       return;
//     }

//     // ============================================================
//     // Expand each item into one or more printable rows.
//     // ============================================================
//     const printableRows = [];

//     (completedOrder.items || []).forEach((item) => {
//       const vds = Array.isArray(item.variantDetails) ? item.variantDetails : [];

//       // ---------- Case 1: nested variantDetails[] ----------
//       if (vds.length > 0) {
//         vds.forEach((vd) => {
//           const subs = Array.isArray(vd.subVariants) ? vd.subVariants : [];

//           if (subs.length > 0) {
//             subs.forEach((sv) => {
//               const regularPrice = Number(
//                 sv.subVariantRegularPrice ??
//                 vd.variantRegularPrice ??
//                 item.regularPrice ??
//                 0
//               );
//               const discountPrice = Number(
//                 sv.subVariantDiscountPrice ??
//                 vd.variantDiscountPrice ??
//                 item.discountPrice ??
//                 0
//               );
//               const qty = Number(sv.quantity || 0);
//               const label = `${item.productName} (${vd.variantName || ''} / ${sv.subVariantName || ''})`
//                 .replace(/\s+\/\s+\)/, ')');

//               printableRows.push({
//                 label,
//                 quantity: qty,
//                 regularPrice,
//                 discountPrice,
//                 image: sv.image || vd.image || item.image,
//               });
//             });
//           } else {
//             const regularPrice = Number(
//               vd.variantRegularPrice ?? item.regularPrice ?? 0
//             );
//             const discountPrice = Number(
//               vd.variantDiscountPrice ?? item.discountPrice ?? 0
//             );
//             const qty = Number(vd.quantity || 0);
//             const label = vd.variantName
//               ? `${item.productName} (${vd.variantName})`
//               : item.productName;

//             printableRows.push({
//               label,
//               quantity: qty,
//               regularPrice,
//               discountPrice,
//               image: vd.image || item.image,
//             });
//           }
//         });
//         return;
//       }

//       // ---------- Case 2: flat variant/sub-variant on the item ----------
//       if (item.variantId || item.subVariantId) {
//         const regularPrice = Number(
//           item.variantRegularPrice ?? item.regularPrice ?? 0
//         );
//         const discountPrice = Number(
//           item.variantDiscountPrice ?? item.discountPrice ?? 0
//         );
//         const variantPart = item.subVariantName
//           ? `${item.variantName || ''}${item.variantName ? ' / ' : ''}${item.subVariantName}`
//           : (item.variantName || '');
//         const label = variantPart
//           ? `${item.productName} (${variantPart})`
//           : item.productName;

//         printableRows.push({
//           label,
//           quantity: Number(item.quantity || 0),
//           regularPrice,
//           discountPrice,
//           image: item.image,
//         });
//         return;
//       }

//       // ---------- Case 3: plain product ----------
//       printableRows.push({
//         label: item.productName,
//         quantity: Number(item.quantity || 0),
//         regularPrice: Number(item.regularPrice || 0),
//         discountPrice: Number(item.discountPrice || 0),
//         image: item.image,
//       });
//     });

//     // ============================================================
//     // Build HTML rows (numbered)
//     // ============================================================
//     const itemsHtml = printableRows
//       .filter((row) => row.quantity > 0)
//       .map((row, index) => {
//         const hasDiscount =
//           row.discountPrice > 0 && row.discountPrice < row.regularPrice;
//         const effective = hasDiscount ? row.discountPrice : row.regularPrice;
//         const lineTotal = effective * row.quantity;

//         const priceLine = hasDiscount
//           ? `x${row.quantity} @ ৳${row.discountPrice.toFixed(2)} ` +
//             `<s style="color:#888;">৳${row.regularPrice.toFixed(2)}</s>`
//           : `x${row.quantity} @ ৳${row.regularPrice.toFixed(2)}`;

//         return `
//           <tr>
//             <td style="padding:4px 0;vertical-align:top;width:16px;">
//               ${index + 1}.
//             </td>
//             <td style="padding:4px 0;vertical-align:top;">
//               ${row.label}
//               <br><small style="color:#555;">${priceLine}</small>
//             </td>
//             <td style="text-align:right;padding:4px 0;vertical-align:top;">
//               ৳${lineTotal.toFixed(2)}
//             </td>
//           </tr>`;
//       })
//       .join('');

//     // ============================================================
//     // Totals + customer info + NOTE
//     // ============================================================
//     const hasOrderDiscount = (completedOrder.discount || 0) > 0;
//     const subtotalRow = `
//       <tr>
//         <td>Subtotal</td>
//         <td class="right">৳${Number(completedOrder.subtotal || 0).toFixed(2)}</td>
//       </tr>`;
//     const discountRow = hasOrderDiscount
//       ? `<tr>
//            <td>Discount</td>
//            <td class="right">- ৳${Number(completedOrder.discount || 0).toFixed(2)}</td>
//          </tr>`
//       : '';

//     const isWalkIn =
//       !completedOrder.customerInfo?.fullName ||
//       completedOrder.customerInfo.fullName === 'Showroom Walk-in Customer';
//     const customerRow =
//       !isWalkIn && completedOrder.customerInfo?.fullName
//         ? `<div><b>Customer:</b> ${completedOrder.customerInfo.fullName}</div>`
//         : '';
//     const phoneRow =
//       completedOrder.customerInfo?.phone &&
//       completedOrder.customerInfo.phone !== 'N/A'
//         ? `<div><b>Phone:</b> ${completedOrder.customerInfo.phone}</div>`
//         : '';

//     // ✅ Order note (from POS "Order note" field, saved to customerInfo.note)
//     const rawNote = (completedOrder.customerInfo?.note || '').trim();
//     const escapedNote = rawNote
//       .replace(/&/g, '&amp;')
//       .replace(/</g, '&lt;')
//       .replace(/>/g, '&gt;')
//       .replace(/"/g, '&quot;');
//     const noteRow = rawNote
//       ? `<div style="margin-top:4px;padding-top:4px;border-top:1px dashed #999;">
//            <b>Note:</b> ${escapedNote}
//          </div>`
//       : '';

//     // ============================================================
//     // Write the receipt
//     // ============================================================
//     w.document.write(`
//       <html>
//       <head>
//         <title>Receipt ${completedOrder.orderNumber}</title>
//         <style>
//           * { font-family: 'Courier New', monospace; }
//           body { padding: 12px; max-width: 340px; margin: 0 auto; color: #000; }
//           h1 { font-size: 18px; text-align: center; margin: 0 0 2px 0; letter-spacing: 1px; }
//           .shop-sub { font-size: 10px; text-align: center; color: #666; margin: 0 0 4px 0; }
//           h2 { font-size: 12px; text-align: center; font-weight: normal; margin: 0 0 10px 0; color:#666; }
//           hr { border: none; border-top: 1px dashed #999; margin: 8px 0; }
//           table { width: 100%; font-size: 12px; border-collapse: collapse; }
//           .right { text-align: right; }
//           .bold { font-weight: bold; }
//           .total { font-size: 15px; }
//           .small { font-size: 10px; color: #666; }
//           .footer { text-align:center; font-size:11px; margin-top:8px; }
//           .thanks { text-align:center; font-size:11px; font-weight:bold; margin-top:6px; }
//         </style>
//       </head>
//       <body>
//         <h1>NISHITA'S CREATION</h1>
//         <div class="shop-sub">SHOWROOM SALE RECEIPT</div>
//         <hr>
//         <div style="font-size:12px;">
//           <div><b>Order:</b> ${completedOrder.orderNumber || ''}</div>
//           <div><b>Date:</b> ${new Date(completedOrder.createdAt).toLocaleString('en-BD')}</div>
//           ${customerRow}
//           ${phoneRow}
//           ${noteRow}
//         </div>
//         <hr>
//         <table>${itemsHtml}</table>
//         <hr>
//         <table>
//           ${subtotalRow}
//           ${discountRow}
//           <tr class="total">
//             <td class="bold">TOTAL</td>
//             <td class="right bold">৳${Number(completedOrder.total || 0).toFixed(2)}</td>
//           </tr>
//         </table>
//         <hr>
//         <div class="thanks">Thank you for shopping with us!</div>
//         <div class="footer">Please keep this receipt.</div>
//         <div class="footer">Nishita's Creation · Showroom</div>
//       </body>
//       </html>`);
//     w.document.close();
//     w.focus();
//     setTimeout(() => w.print(), 250);
//   };

//   // ========== RENDER ==========
//   return (
//     <ProtectedRoute pageKey="all_orders">
//       <div className="min-h-screen bg-gray-50">
//         {/* HEADER */}
//         <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
//           <div className="max-w-7xl mx-auto px-4 py-4">
//             <div className="flex items-center justify-between flex-wrap gap-3">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gradient-to-r from-black to-[#485442] rounded-xl flex items-center justify-center shadow-md">
//                   <Scan className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-lg md:text-xl font-bold text-black">Showroom POS</h1>
//                   <p className="text-xs text-gray-500">Scan products · Charge customer · Print receipt</p>
//                 </div>
//               </div>

//               <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${
//                 scannerActive
//                   ? 'bg-green-50 border-green-400 text-green-700'
//                   : 'bg-gray-50 border-gray-200 text-gray-500'
//               }`}>
//                 <div className={`w-2 h-2 rounded-full ${scannerActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
//                 {scannerActive ? `Scanning: ${scanBuffer}` : 'Ready to Scan'}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 py-6">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* LEFT */}
//             <div className="lg:col-span-2 space-y-4">
//               <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
//                 <form onSubmit={handleManualSubmit} className="flex gap-2 mb-3">
//                   <div className="relative flex-1">
//                     <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                     <input
//                       ref={manualInputRef}
//                       type="text"
//                       value={manualCode}
//                       onChange={(e) => setManualCode(e.target.value)}
//                       placeholder="Scan or type barcode / SKU and press Enter"
//                       autoFocus
//                       className="w-full pl-10 pr-3 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
//                     />
//                     {scanLookupLoading && (
//                       <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
//                     )}
//                   </div>
//                   <button type="submit"
//                     className="px-4 py-3 bg-black text-white text-sm rounded-xl hover:bg-[#485442] font-medium">
//                     Add
//                   </button>
//                 </form>

//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     ref={searchInputRef}
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     onFocus={() => { if (searchResults.length) setShowSearchResults(true); }}
//                     placeholder="Or search product by name..."
//                     className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
//                   />
//                   {searching && (
//                     <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
//                   )}
//                 </div>

//                 {showSearchResults && searchResults.length > 0 && (
//                   <div className="mt-2 max-h-72 overflow-y-auto border border-gray-200 rounded-xl bg-white shadow-lg">
//                     {searchResults.map(p => (
//                       <button key={p._id} type="button"
//                         onClick={() => handleSearchResultClick(p)}
//                         className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0 flex items-center gap-3">
//                         <img src={p.images?.[0]?.url || 'https://via.placeholder.com/40'}
//                           alt={p.productName}
//                           className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0" />
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-medium text-black truncate">{p.productName}</p>
//                           <div className="flex items-center gap-2 text-xs text-gray-500">
//                             <span>৳{(p.discountPrice || p.regularPrice).toFixed(2)}</span>
//                             <span>Stock: {p.stockQuantity}</span>
//                             {p.hasVariants && (
//                               <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700">Variants</span>
//                             )}
//                           </div>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
//                 <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <ShoppingCart className="w-4 h-4 text-black" />
//                     <h2 className="text-sm font-semibold text-black">Cart</h2>
//                     <span className="text-xs text-gray-500">({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
//                   </div>
//                   {cart.length > 0 && (
//                     <button onClick={clearCart}
//                       className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
//                       <RotateCcw className="w-3 h-3" /> Clear
//                     </button>
//                   )}
//                 </div>
//                 <div className="p-4">
//                   {cart.length === 0 ? (
//                     <div className="text-center py-12">
//                       <Scan className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                       <p className="text-sm text-gray-500 font-medium">No items yet</p>
//                       <p className="text-xs text-gray-400 mt-1">Scan a barcode or search to add products</p>
//                     </div>
//                   ) : (
//                     <div className="space-y-3">
//                       {cart.map(item => (
//                         <PosCartRow key={item._id} item={item}
//                           onQtyChange={handleQtyChange} onRemove={handleRemove} />
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT: CHECKOUT */}
//             <div className="lg:col-span-1">
//               <div className="bg-white rounded-2xl border border-gray-200 shadow-sm sticky top-24">
//                 <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
//                   <h2 className="text-sm font-semibold text-black flex items-center gap-2">
//                     <Receipt className="w-4 h-4" /> Checkout
//                   </h2>
//                 </div>

//                 <div className="p-4 space-y-4">
//                   {/* Customer section — always expanded (not toggleable) */}
//                   <div className="space-y-2 pb-3 border-b border-gray-100">
//                     <div className="flex items-center gap-2">
//                       <User className="w-3.5 h-3.5 text-gray-500" />
//                       <p className="text-xs font-medium text-gray-700">Customer (optional)</p>
//                     </div>
//                     <input type="text" value={customer.fullName}
//                       onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
//                       placeholder="Customer name"
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black" />
//                     <input type="tel" value={customer.phone}
//                       onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
//                       placeholder="Phone"
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black" />
//                     <textarea value={customer.address} rows="2"
//                       onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
//                       placeholder="Address"
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black resize-none" />
//                   </div>

//                   <div className="space-y-2 text-sm">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Subtotal</span>
//                       <span className="font-medium text-black">৳{subtotal.toFixed(2)}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Tag className="w-4 h-4 text-gray-400" />
//                       <input type="text" inputMode="decimal"
//                         value={discount === 0 ? '' : discount}
//                         onChange={(e) => {
//                           const v = e.target.value;
//                           if (v === '' || /^\d*\.?\d*$/.test(v)) {
//                             setDiscount(v === '' ? 0 : parseFloat(v) || 0);
//                           }
//                         }}
//                         placeholder="Discount ৳"
//                         className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black" />
//                     </div>
//                     {discount > 0 && (
//                       <div className="flex justify-between text-green-600">
//                         <span>Discount</span>
//                         <span>- ৳{discount.toFixed(2)}</span>
//                       </div>
//                     )}
//                   </div>

//                   <div className="border-t border-gray-100 pt-3">
//                     <div className="flex justify-between items-center text-lg font-bold">
//                       <span>Total</span>
//                       <span>৳{total.toFixed(2)}</span>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">Order note (optional)</label>
//                     <textarea value={note} rows="2" onChange={(e) => setNote(e.target.value)}
//                       placeholder="Add note..."
//                       className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black resize-none" />
//                   </div>

//                   <button onClick={handleCheckout}
//                     disabled={submitting || cart.length === 0}
//                     className="w-full py-3 bg-black text-white rounded-xl hover:bg-[#485442] text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
//                     {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
//                     {submitting ? 'Processing...' : `Complete Sale ৳${total.toFixed(2)}`}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ============================================================ */}
//         {/* VARIANT PICKER — stays open, shows remaining variants        */}
//         {/* ============================================================ */}
//         {variantPickerProduct && (() => {
//           const productId = variantPickerProduct._id;
//           const cartVariants = cart.filter(it => it.productId === productId);

//           const usedVariantIds = new Set();
//           const usedSubVariantIdsByVariant = {}; // { variantId: Set(subVariantIds) }

//           cartVariants.forEach(it => {
//             if (!it.variantId) return;
//             usedVariantIds.add(it.variantId);
//             if (it.subVariantId) {
//               if (!usedSubVariantIdsByVariant[it.variantId]) {
//                 usedSubVariantIdsByVariant[it.variantId] = new Set();
//               }
//               usedSubVariantIdsByVariant[it.variantId].add(it.subVariantId);
//             }
//           });

//           const product = variantPickerProduct;

//           const stillAddable = product.variantTypes.some(vt =>
//             vt.variants.some(v => {
//               const hasSubs = v.subVariants && v.subVariants.length > 0;
//               if (!hasSubs) return !usedVariantIds.has(v.id);
//               const used = usedSubVariantIdsByVariant[v.id] || new Set();
//               return v.subVariants.some(sv => !used.has(sv.id));
//             })
//           );

//           return (
//             <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col"
//               >
//                 <div className="p-4 border-b border-gray-100 flex items-center justify-between">
//                   <div>
//                     <h3 className="text-sm font-semibold">
//                       Choose variant · {product.productName}
//                     </h3>
//                     <p className="text-xs text-gray-500 mt-0.5">
//                       Add multiple variants — click Done when finished
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => setVariantPickerProduct(null)}
//                     className="p-1 hover:bg-gray-100 rounded-lg"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>

//                 <div className="p-4 overflow-y-auto space-y-3">
//                   {product.variantTypes.map((vt, i) => (
//                     <div key={i}>
//                       <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
//                         {vt.type}
//                       </p>

//                       {vt.variants.map(v => {
//                         const hasSubs = v.subVariants && v.subVariants.length > 0;
//                         const subVariantsUsed = usedSubVariantIdsByVariant[v.id] || new Set();
//                         const variantFullyUsed = !hasSubs && usedVariantIds.has(v.id);

//                         const remainingSubs = hasSubs
//                           ? v.subVariants.filter(sv => !subVariantsUsed.has(sv.id))
//                           : [];

//                         return (
//                           <div key={v.id} className="mb-2">
//                             {/* Variant-only (no subs) */}
//                             {!hasSubs && (
//                               <button
//                                 type="button"
//                                 disabled={variantFullyUsed}
//                                 onClick={() => {
//                                   addVariantToCart(product, v, null);
//                                   toast.success(`Added ${v.name}`);
//                                 }}
//                                 className={`w-full flex items-center justify-between p-2 rounded-lg border transition-all ${
//                                   variantFullyUsed
//                                     ? 'bg-green-50 border-green-300 cursor-not-allowed opacity-70'
//                                     : 'border-gray-200 hover:border-black cursor-pointer'
//                                 }`}
//                               >
//                                 <span className="text-sm font-medium flex items-center gap-2">
//                                   {variantFullyUsed && (
//                                     <CheckCircle className="w-4 h-4 text-green-600" />
//                                   )}
//                                   {v.name}
//                                 </span>
//                                 <span className="text-xs text-gray-500">
//                                   Stock: {v.stockQuantity} · ৳
//                                   {(v.discountPrice || v.regularPrice || 0).toFixed(2)}
//                                   {variantFullyUsed && (
//                                     <span className="ml-2 text-green-600 font-medium">
//                                       in cart
//                                     </span>
//                                   )}
//                                 </span>
//                               </button>
//                             )}

//                             {/* Variant with subs — show remaining subs as buttons */}
//                             {hasSubs && (
//                               <div>
//                                 <div className="flex items-center justify-between p-2 bg-gray-50 rounded-t-lg border border-gray-200 border-b-0">
//                                   <span className="text-sm font-medium text-gray-800">
//                                     {v.name}
//                                   </span>
//                                   {remainingSubs.length === 0 ? (
//                                     <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-300">
//                                       All added
//                                     </span>
//                                   ) : (
//                                     <span className="text-[10px] text-gray-500">
//                                       {subVariantsUsed.size}/{v.subVariants.length} added
//                                     </span>
//                                   )}
//                                 </div>
//                                 <div className="pl-3 border-l-2 border-gray-200">
//                                   {remainingSubs.length === 0 ? (
//                                     <div className="p-2 text-xs text-gray-400 text-center border border-t-0 border-gray-200 rounded-b-lg bg-white">
//                                       All sub-variants added
//                                     </div>
//                                   ) : (
//                                     remainingSubs.map(sv => (
//                                       <button
//                                         key={sv.id}
//                                         type="button"
//                                         onClick={() => {
//                                           addVariantToCart(product, v, sv);
//                                           toast.success(`Added ${v.name} / ${sv.name}`);
//                                         }}
//                                         className="w-full flex items-center justify-between p-2 rounded-lg border border-gray-200 hover:border-black cursor-pointer bg-white my-1"
//                                       >
//                                         <span className="text-xs flex items-center gap-2">
//                                           <Plus className="w-3 h-3 text-gray-400" />
//                                           → {sv.name}
//                                         </span>
//                                         <span className="text-[10px] text-gray-500">
//                                           Stock: {sv.stockQuantity} · ৳
//                                           {(sv.discountPrice || sv.regularPrice || 0).toFixed(2)}
//                                         </span>
//                                       </button>
//                                     ))
//                                   )}
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   ))}

//                   {!stillAddable && (
//                     <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-center">
//                       <p className="text-xs text-green-700 font-medium">
//                         All variants added ✓
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
//                   <button
//                     onClick={() => setVariantPickerProduct(null)}
//                     className="flex-1 px-4 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-[#485442]"
//                   >
//                     Done ({cart.filter(it => it.productId === product._id).reduce((s, i) => s + i.quantity, 0)} items)
//                   </button>
//                 </div>
//               </motion.div>
//             </div>
//           );
//         })()}

//         {/* RECEIPT */}
//         {showReceipt && completedOrder && (
//           <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//             <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
//               className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col">
//               <div className="p-4 bg-gradient-to-r from-black to-[#485442] text-white flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5" />
//                   <h3 className="text-base font-bold">Sale Completed</h3>
//                 </div>
//                 <button onClick={() => { setShowReceipt(false); setCompletedOrder(null); }}
//                   className="p-1 hover:bg-white/20 rounded-lg">
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>

//               <div className="p-4 overflow-y-auto">
//                 <div className="text-center mb-4">
//                   <h2 className="text-xl font-bold">SHOWROOM SALE</h2>
//                   <p className="text-xs text-gray-500">Order: {completedOrder.orderNumber}</p>
//                   <p className="text-xs text-gray-500">{new Date(completedOrder.createdAt).toLocaleString('en-BD')}</p>
//                 </div>

//                 <div className="border-t border-b border-dashed border-gray-300 py-3">
//                   {completedOrder.items.map((item, i) => {
//                     const label = [item.productName, item.variantName, item.subVariantName].filter(Boolean).join(' / ');
//                     const p = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
//                     return (
//                       <div key={i} className="flex justify-between text-xs py-1">
//                         <div className="flex-1">
//                           <div className="font-medium">{label}</div>
//                           <div className="text-gray-500">x{item.quantity} @ ৳{p.toFixed(2)}</div>
//                         </div>
//                         <div className="font-medium">৳{(p * item.quantity).toFixed(2)}</div>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 <div className="pt-3 space-y-1 text-sm">
//                   <div className="flex justify-between"><span>Subtotal</span><span>৳{completedOrder.subtotal.toFixed(2)}</span></div>
//                   {completedOrder.discount > 0 && (
//                     <div className="flex justify-between text-green-600"><span>Discount</span><span>- ৳{completedOrder.discount.toFixed(2)}</span></div>
//                   )}
//                   <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
//                     <span>Total</span><span>৳{completedOrder.total.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
//                 <button onClick={() => { setShowReceipt(false); setCompletedOrder(null); }}
//                   className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium hover:bg-white">
//                   Close
//                 </button>
//                 <button onClick={handlePrintReceipt}
//                   className="flex-1 px-4 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-[#485442] flex items-center justify-center gap-2">
//                   <Printer className="w-4 h-4" /> Print Receipt
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </div>
//     </ProtectedRoute>
//   );
// }




'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  Scan, Search, Plus, Minus, Trash2, Printer, ShoppingCart,
  Loader2, X, CheckCircle, Package, Tag, AlertCircle,
  Layers, Circle, Barcode, User, Phone, MapPin, Save,
  Receipt, RotateCcw, ChevronDown, ChevronUp, CreditCard
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const SCAN_RESET_MS = 300;      // buffer reset when keystrokes stall
const SCAN_KEY_GAP_MS = 80;     // keystrokes closer than this = scanner

// ============================================================
// Helpers
// ============================================================
function makeSlug(name, fallbackId) {
  let slug = (name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (!slug) slug = `pos-${fallbackId || Date.now()}`;
  return slug;
}

const getColorName = (color) => {
  const map = {
    '#000000': 'Black', '#FFFFFF': 'White', '#FF0000': 'Red',
    '#00FF00': 'Green', '#0000FF': 'Blue', '#FFFF00': 'Yellow',
    '#A52A2A': 'Brown', '#808080': 'Gray'
  };
  return map[color] || color;
};

// ============================================================
// POS CART ROW
// ============================================================
function PosCartRow({ item, onQtyChange, onRemove }) {
  const [qtyInput, setQtyInput] = useState(String(item.quantity || 1));

  useEffect(() => {
    setQtyInput(String(item.quantity || 1));
  }, [item.quantity]);

  const label = [item.productName, item.variantName, item.subVariantName]
    .filter(Boolean).join(' / ');

  const price = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
  const lineTotal = price * item.quantity;
  const hasDiscount = item.discountPrice > 0 && item.discountPrice < item.regularPrice;

  const commitQty = () => {
    const n = parseInt(qtyInput, 10);
    if (isNaN(n) || n < 1) {
      setQtyInput(String(item.quantity || 1));
      return;
    }
    if (n > item.stockQuantity) {
      toast.warning(`Only ${item.stockQuantity} in stock`);
      setQtyInput(String(item.quantity));
      return;
    }
    onQtyChange(item._id, n);
    setQtyInput(String(n));
  };

  return (
    <div className="border border-gray-200 rounded-xl p-3 bg-white hover:border-black/30 transition-all">
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden border border-gray-200 flex items-center justify-center">
          {item.image ? (
            <img src={item.image} alt={label} className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }} />
          ) : (
            <Package className="w-5 h-5 text-gray-300" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-black truncate">{label}</p>
            {item.variantId && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-medium">
                Variant
              </span>
            )}
          </div>
          {item.barcode && (
            <p className="text-[10px] text-gray-500 font-mono mt-0.5 flex items-center gap-1">
              <Barcode className="w-2.5 h-2.5" />{item.barcode}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1 text-xs flex-wrap">
            <span className="text-gray-500">Unit:</span>
            <span className="font-semibold text-black">৳{price.toFixed(2)}</span>
            {hasDiscount && (
              <span className="text-gray-400 line-through">৳{item.regularPrice.toFixed(2)}</span>
            )}
            <span className="text-gray-400">|</span>
            <span className="text-gray-500">Stock: {item.stockQuantity}</span>
          </div>
        </div>

        <button onClick={() => onRemove(item._id)}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
          <button type="button"
            onClick={() => onQtyChange(item._id, Math.max(1, item.quantity - 1))}
            disabled={item.quantity <= 1}
            className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">
            <Minus className="w-3 h-3" />
          </button>
          <input type="number" min="1" max={item.stockQuantity}
            value={qtyInput}
            onChange={(e) => setQtyInput(e.target.value)}
            onBlur={commitQty}
            onKeyDown={(e) => { if (e.key === 'Enter') { commitQty(); e.target.blur(); } }}
            className="w-14 text-center text-sm py-1 focus:outline-none text-black font-medium" />
          <button type="button"
            onClick={() => onQtyChange(item._id, item.quantity + 1)}
            disabled={item.quantity >= item.stockQuantity}
            className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40">
            <Plus className="w-3 h-3" />
          </button>
        </div>
        <span className="text-base font-bold text-black">৳{lineTotal.toFixed(2)}</span>
      </div>
    </div>
  );
}

// ============================================================
// MAIN POS PAGE
// ============================================================
export default function ShowroomPosPage() {
  const router = useRouter();

  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');   // ✅ NEW

  const [customer, setCustomer] = useState({
    fullName: '',
    phone: '',
    address: '',
  });

  const [manualCode, setManualCode] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Scanner refs
  const scanBufferRef = useRef('');
  const scanTimerRef = useRef(null);
  const lastKeyTimeRef = useRef(0);
  const [scanBuffer, setScanBuffer] = useState('');
  const [scannerActive, setScannerActive] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [scanLookupLoading, setScanLookupLoading] = useState(false);

  const [variantPickerProduct, setVariantPickerProduct] = useState(null);

  const searchInputRef = useRef(null);
  const manualInputRef = useRef(null);

  // ========== TOTALS ==========
  const subtotal = cart.reduce((sum, it) => {
    const p = it.discountPrice > 0 ? it.discountPrice : it.regularPrice;
    return sum + p * it.quantity;
  }, 0);
  const total = Math.max(0, subtotal - (discount || 0));
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  // ========== GLOBAL BARCODE SCANNER ==========
  // Works from ANYWHERE on the page. Human typing is slow; scanners type
  // digits in a fast burst (< SCAN_KEY_GAP_MS between keys). Any fast burst
  // ending in Enter/Tab is treated as a barcode scan — even if focus is
  // inside a text field. Any digits the scanner typed into an input get
  // cleared automatically.
  useEffect(() => {
    const handleKeyDown = (e) => {
      const now = Date.now();
      const sinceLast = now - (lastKeyTimeRef.current || 0);
      lastKeyTimeRef.current = now;

      const isFastBurst = sinceLast > 0 && sinceLast < SCAN_KEY_GAP_MS;

      const tag = document.activeElement?.tagName;
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
      const activeEl = document.activeElement;

      // ---- Enter or Tab: end of a scan ----
      if (e.key === 'Enter' || e.key === 'Tab') {
        const code = scanBufferRef.current.trim();

        if (code && code.length >= 4) {
          // This is a scan — stop it from doing anything else
          e.preventDefault();
          e.stopPropagation();

          handleBarcodeScan(code);

          // Clear the input the scanner typed into, if any
          if (isTyping && activeEl && 'value' in activeEl) {
            try {
              const proto = activeEl instanceof HTMLTextAreaElement
                ? HTMLTextAreaElement.prototype
                : activeEl instanceof HTMLSelectElement
                  ? HTMLSelectElement.prototype
                  : HTMLInputElement.prototype;
              const nativeSetter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
              if (nativeSetter) {
                nativeSetter.call(activeEl, '');
                activeEl.dispatchEvent(new Event('input', { bubbles: true }));
              } else {
                activeEl.value = '';
              }
            } catch (err) {
              activeEl.value = '';
            }
          }

          // Also clear the top scan input if digits landed there
          setManualCode('');

          scanBufferRef.current = '';
          setScanBuffer('');
          setScannerActive(false);
          if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
          return;
        }

        // No valid buffer — just reset and let the keypress through
        scanBufferRef.current = '';
        setScanBuffer('');
        setScannerActive(false);
        if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
        return;
      }

      // ---- Only accept typical barcode characters ----
      if (!/^[a-zA-Z0-9-]$/.test(e.key)) return;

      // If the user is slowly typing inside an input, don't hijack it
      if (isTyping && !isFastBurst && scanBufferRef.current.length === 0) {
        return;
      }

      // ---- Record keystroke as part of a potential scan ----
      setScannerActive(true);
      scanBufferRef.current += e.key;
      setScanBuffer(scanBufferRef.current);

      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
      scanTimerRef.current = setTimeout(() => {
        scanBufferRef.current = '';
        setScanBuffer('');
        setScannerActive(false);
      }, SCAN_RESET_MS);
    };

    // Use capture phase so we see keydown before input fields handle it
    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ========== FETCH BY BARCODE ==========
  const fetchProductByBarcode = useCallback(async (code) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/products/barcode/${encodeURIComponent(code)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return null;
      const json = await res.json();
      if (json.success && json.data) return json.data;
      return null;
    } catch (e) {
      console.error('Barcode fetch failed:', e);
      return null;
    }
  }, []);

  // ========== HANDLE SCAN ==========
  const handleBarcodeScan = async (code) => {
    setScanLookupLoading(true);
    const toastId = toast.loading(`Looking up ${code}...`);

    try {
      const product = await fetchProductByBarcode(code);

      if (!product) {
        toast.error(`No product found for: ${code}`, { id: toastId });
        return;
      }

      let matched = null;
      if (product.hasVariants && product.variantTypes?.length) {
        for (const vt of product.variantTypes) {
          for (const v of vt.variants || []) {
            if (v.barcode === code || v.skuCode === code) {
              matched = { variant: v, subVariant: null };
              break;
            }
            for (const sv of v.subVariants || []) {
              if (sv.barcode === code || sv.skuCode === code) {
                matched = { variant: v, subVariant: sv };
                break;
              }
            }
            if (matched) break;
          }
          if (matched) break;
        }
      }

      if (!product.hasVariants || !product.variantTypes?.length) {
        addSimpleToCart(product);
        toast.success(`Added: ${product.productName}`, { id: toastId, duration: 1500 });
        return;
      }

      if (matched) {
        addVariantToCart(product, matched.variant, matched.subVariant);
        const label = [product.productName, matched.variant?.name, matched.subVariant?.name]
          .filter(Boolean).join(' / ');
        toast.success(`Added: ${label}`, { id: toastId, duration: 1500 });
        return;
      }

      toast.info(`"${product.productName}" has variants — pick one`, { id: toastId });
      setSearchQuery(product.productName);
      setSearchResults([product]);
      setShowSearchResults(true);
    } finally {
      setScanLookupLoading(false);
    }
  };

  // ========== ADD SIMPLE ==========
  const addSimpleToCart = (product) => {
    const price = product.discountPrice > 0 ? product.discountPrice : product.regularPrice;
    const image = product.images?.[0]?.url ||
      (typeof product.images?.[0] === 'string' ? product.images[0] : '') || '';
    const slug = product.slug || makeSlug(product.productName, product._id);

    setCart(prev => {
      const existing = prev.find(it =>
        it.productId === product._id && !it.variantId && !it.subVariantId
      );
      if (existing) {
        if (existing.quantity + 1 > existing.stockQuantity) {
          toast.warning(`Only ${existing.stockQuantity} in stock`);
          return prev;
        }
        return prev.map(it =>
          it._id === existing._id ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [...prev, {
        _id: `${product._id}-base-${Date.now()}`,
        productId: product._id,
        productSlug: slug,
        variantId: null,
        subVariantId: null,
        productName: product.productName,
        variantName: '',
        subVariantName: '',
        skuCode: product.skuCode || '',
        barcode: product.barcode || '',
        image,
        regularPrice: product.regularPrice || 0,
        discountPrice: product.discountPrice || 0,
        stockQuantity: product.stockQuantity || 0,
        quantity: 1,
        selectedColor: null,
      }];
    });
  };

  // ========== ADD VARIANT ==========
  const addVariantToCart = (product, variant, subVariant) => {
    const productId = product._id;
    const variantId = variant?.id || variant?._id || null;
    const subVariantId = subVariant?.id || subVariant?._id || null;
    const slug = product.slug || makeSlug(product.productName, productId);

    let currentStock = 0, image = '', skuCode = '', barcode = '';
    let variantName = '', subVariantName = '', selectedColor = '';
    let regularPrice = product.regularPrice || 0, discountPrice = product.discountPrice || 0;

    if (subVariant) {
      currentStock = Number(subVariant.stockQuantity) || 0;
      image = subVariant.imagePreviews?.[0] || subVariant.images?.[0] || product.images?.[0]?.url || '';
      skuCode = subVariant.skuCode || '';
      barcode = subVariant.barcode || '';
      variantName = variant?.name || '';
      subVariantName = subVariant.name || '';
      selectedColor = subVariant.color || variant?.color || '';
      regularPrice = subVariant.regularPrice || variant?.regularPrice || product.regularPrice || 0;
      discountPrice = subVariant.discountPrice || variant?.discountPrice || product.discountPrice || 0;
    } else if (variant) {
      currentStock = Number(variant.stockQuantity) || 0;
      image = variant.imagePreviews?.[0] || variant.images?.[0] || product.images?.[0]?.url || '';
      skuCode = variant.skuCode || '';
      barcode = variant.barcode || '';
      variantName = variant.name || '';
      selectedColor = variant.color || '';
      regularPrice = variant.regularPrice || product.regularPrice || 0;
      discountPrice = variant.discountPrice || product.discountPrice || 0;
    }

    if (typeof image === 'object' && image?.url) image = image.url;

    const productImage = product.images?.[0]?.url ||
      (typeof product.images?.[0] === 'string' ? product.images[0] : '') || '';
    if (!image) image = productImage;

    setCart(prev => {
      const existing = prev.find(it =>
        it.productId === productId &&
        it.variantId === variantId &&
        it.subVariantId === subVariantId
      );
      if (existing) {
        if (existing.quantity + 1 > existing.stockQuantity) {
          toast.warning(`Only ${existing.stockQuantity} in stock`);
          return prev;
        }
        return prev.map(it => it._id === existing._id ? { ...it, quantity: it.quantity + 1 } : it);
      }
      return [...prev, {
        _id: `${productId}-${variantId || 'base'}-${subVariantId || 'base'}-${Date.now()}`,
        productId,
        productSlug: slug,
        variantId,
        subVariantId,
        productName: product.productName,
        variantName,
        subVariantName,
        skuCode,
        barcode,
        image,
        regularPrice,
        discountPrice,
        stockQuantity: currentStock,
        quantity: 1,
        selectedColor,
      }];
    });
  };

  // ========== QTY / REMOVE ==========
  const handleQtyChange = (id, newQty) => {
    setCart(prev => prev.map(it => {
      if (it._id === id) {
        if (newQty > it.stockQuantity) {
          toast.warning(`Only ${it.stockQuantity} in stock`);
          return it;
        }
        return { ...it, quantity: newQty };
      }
      return it;
    }));
  };

  const handleRemove = (id) => {
    setCart(prev => prev.filter(it => it._id !== id));
  };

  const clearCart = () => {
    if (cart.length === 0) return;
    if (!confirm('Clear all items?')) return;
    setCart([]);
    setDiscount(0);
    setNote('');
  };

  // ========== MANUAL CODE ENTRY ==========
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    await handleBarcodeScan(manualCode.trim());
    setManualCode('');
    manualInputRef.current?.focus();
  };

  // ========== PRODUCT SEARCH ==========
  const searchProducts = useCallback(async (q) => {
    if (!q || q.length < 2) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/orders/search-products?query=${encodeURIComponent(q)}&limit=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) setSearchResults(json.data || []);
    } catch (e) {
      console.error('Search failed:', e);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (searchQuery.trim()) {
        searchProducts(searchQuery);
        setShowSearchResults(true);
      } else {
        setSearchResults([]);
        setShowSearchResults(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [searchQuery, searchProducts]);

  const handleSearchResultClick = async (product) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/products/${product._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      const fullProduct = json.success ? json.data.product : product;

      const hasVariants = fullProduct.hasVariants && fullProduct.variantTypes?.length > 0;

      if (!hasVariants) {
        addSimpleToCart(fullProduct);
        toast.success(`Added: ${fullProduct.productName}`);
        setSearchQuery('');
        setSearchResults([]);
        setShowSearchResults(false);
        return;
      }

      setVariantPickerProduct(fullProduct);
    } catch (e) {
      console.error(e);
      toast.error('Failed to load product');
    }
  };

  // ========== CHECKOUT ==========
  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');

      const items = cart.map(it => {
        const slug = it.productSlug || makeSlug(it.productName, it.productId);
        return {
          productId: it.productId,
          productName: it.productName,
          productSlug: slug,
          image: it.image,
          regularPrice: it.regularPrice,
          discountPrice: it.discountPrice,
          quantity: it.quantity,
          variantId: it.variantId,
          variantName: it.variantName,
          subVariantId: it.subVariantId,
          subVariantName: it.subVariantName,
          variantRegularPrice: it.regularPrice,
          variantDiscountPrice: it.discountPrice,
          selectedColor: it.selectedColor,
          colors: [],
        };
      });

      const payload = {
        items,
        subtotal,
        shippingCost: 0,
        discount: discount || 0,
        total,
        paymentMethod: paymentMethod || 'cod',   // ✅ from state
        orderPlatform: 'showroom',
        orderStatus: 'delivered',
        saveOrder: true,
        customerInfo: {
          fullName: customer.fullName || 'Showroom Walk-in Customer',
          email: '',
          phone: customer.phone || 'N/A',
          division: 'Showroom',
          address: customer.address || 'Showroom',
          city: 'Showroom',
          zone: 'Showroom',
          area: '',
          zipCode: '',
          country: 'Bangladesh',
          note: note || '',
        },
        clientDeviceInfo: {
          deviceType: 'desktop',
          browser: 'POS',
          os: 'Showroom',
        },
      };

      const res = await fetch(`${API_URL}/api/orders/showroom/pos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.success) {
        toast.success('Sale completed!');
        setCompletedOrder(json.data);
        setShowReceipt(true);
        setCart([]);
        setDiscount(0);
        setNote('');
        setPaymentMethod('cod');   // ✅ reset to default
        setCustomer({ fullName: '', phone: '', address: '' });
      } else {
        toast.error(json.error || 'Failed to complete sale');
      }
    } catch (e) {
      console.error('Checkout error:', e);
      toast.error('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  // ========== PRINT ==========
  const handlePrintReceipt = () => {
    if (!completedOrder) return;

    const w = window.open('', '_blank', 'width=380,height=700');
    if (!w) {
      toast.error('Please allow popups to print');
      return;
    }

    // ============================================================
    // Expand each item into one or more printable rows.
    // ============================================================
    const printableRows = [];

    (completedOrder.items || []).forEach((item) => {
      const vds = Array.isArray(item.variantDetails) ? item.variantDetails : [];

      // ---------- Case 1: nested variantDetails[] ----------
      if (vds.length > 0) {
        vds.forEach((vd) => {
          const subs = Array.isArray(vd.subVariants) ? vd.subVariants : [];

          if (subs.length > 0) {
            subs.forEach((sv) => {
              const regularPrice = Number(
                sv.subVariantRegularPrice ??
                vd.variantRegularPrice ??
                item.regularPrice ??
                0
              );
              const discountPrice = Number(
                sv.subVariantDiscountPrice ??
                vd.variantDiscountPrice ??
                item.discountPrice ??
                0
              );
              const qty = Number(sv.quantity || 0);
              const label = `${item.productName} (${vd.variantName || ''} / ${sv.subVariantName || ''})`
                .replace(/\s+\/\s+\)/, ')');

              printableRows.push({
                label,
                quantity: qty,
                regularPrice,
                discountPrice,
                image: sv.image || vd.image || item.image,
              });
            });
          } else {
            const regularPrice = Number(
              vd.variantRegularPrice ?? item.regularPrice ?? 0
            );
            const discountPrice = Number(
              vd.variantDiscountPrice ?? item.discountPrice ?? 0
            );
            const qty = Number(vd.quantity || 0);
            const label = vd.variantName
              ? `${item.productName} (${vd.variantName})`
              : item.productName;

            printableRows.push({
              label,
              quantity: qty,
              regularPrice,
              discountPrice,
              image: vd.image || item.image,
            });
          }
        });
        return;
      }

      // ---------- Case 2: flat variant/sub-variant on the item ----------
      if (item.variantId || item.subVariantId) {
        const regularPrice = Number(
          item.variantRegularPrice ?? item.regularPrice ?? 0
        );
        const discountPrice = Number(
          item.variantDiscountPrice ?? item.discountPrice ?? 0
        );
        const variantPart = item.subVariantName
          ? `${item.variantName || ''}${item.variantName ? ' / ' : ''}${item.subVariantName}`
          : (item.variantName || '');
        const label = variantPart
          ? `${item.productName} (${variantPart})`
          : item.productName;

        printableRows.push({
          label,
          quantity: Number(item.quantity || 0),
          regularPrice,
          discountPrice,
          image: item.image,
        });
        return;
      }

      // ---------- Case 3: plain product ----------
      printableRows.push({
        label: item.productName,
        quantity: Number(item.quantity || 0),
        regularPrice: Number(item.regularPrice || 0),
        discountPrice: Number(item.discountPrice || 0),
        image: item.image,
      });
    });

    // ============================================================
    // Build HTML rows (numbered)
    // ============================================================
    const itemsHtml = printableRows
      .filter((row) => row.quantity > 0)
      .map((row, index) => {
        const hasDiscount =
          row.discountPrice > 0 && row.discountPrice < row.regularPrice;
        const effective = hasDiscount ? row.discountPrice : row.regularPrice;
        const lineTotal = effective * row.quantity;

        const priceLine = hasDiscount
          ? `x${row.quantity} @ ৳${row.discountPrice.toFixed(2)} ` +
            `<s style="color:#888;">৳${row.regularPrice.toFixed(2)}</s>`
          : `x${row.quantity} @ ৳${row.regularPrice.toFixed(2)}`;

        return `
          <tr>
            <td style="padding:4px 0;vertical-align:top;width:16px;">
              ${index + 1}.
            </td>
            <td style="padding:4px 0;vertical-align:top;">
              ${row.label}
              <br><small style="color:#555;">${priceLine}</small>
            </td>
            <td style="text-align:right;padding:4px 0;vertical-align:top;">
              ৳${lineTotal.toFixed(2)}
            </td>
          </tr>`;
      })
      .join('');

    // ============================================================
    // Totals + customer info + NOTE
    // ============================================================
    const hasOrderDiscount = (completedOrder.discount || 0) > 0;
    const subtotalRow = `
      <tr>
        <td>Subtotal</td>
        <td class="right">৳${Number(completedOrder.subtotal || 0).toFixed(2)}</td>
      </tr>`;
    const discountRow = hasOrderDiscount
      ? `<tr>
           <td>Discount</td>
           <td class="right">- ৳${Number(completedOrder.discount || 0).toFixed(2)}</td>
         </tr>`
      : '';

    const isWalkIn =
      !completedOrder.customerInfo?.fullName ||
      completedOrder.customerInfo.fullName === 'Showroom Walk-in Customer';
    const customerRow =
      !isWalkIn && completedOrder.customerInfo?.fullName
        ? `<div><b>Customer:</b> ${completedOrder.customerInfo.fullName}</div>`
        : '';
    const phoneRow =
      completedOrder.customerInfo?.phone &&
      completedOrder.customerInfo.phone !== 'N/A'
        ? `<div><b>Phone:</b> ${completedOrder.customerInfo.phone}</div>`
        : '';

    // ✅ Order note (from POS "Order note" field, saved to customerInfo.note)
    const rawNote = (completedOrder.customerInfo?.note || '').trim();
    const escapedNote = rawNote
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
    const noteRow = rawNote
      ? `<div style="margin-top:4px;padding-top:4px;border-top:1px dashed #999;">
           <b>Note:</b> ${escapedNote}
         </div>`
      : '';

    // ============================================================
    // Write the receipt
    // ============================================================
    w.document.write(`
      <html>
      <head>
        <title>Receipt ${completedOrder.orderNumber}</title>
        <style>
          * { font-family: 'Courier New', monospace; }
          body { padding: 12px; max-width: 340px; margin: 0 auto; color: #000; }
          h1 { font-size: 18px; text-align: center; margin: 0 0 2px 0; letter-spacing: 1px; }
          .shop-sub { font-size: 10px; text-align: center; color: #666; margin: 0 0 4px 0; }
          h2 { font-size: 12px; text-align: center; font-weight: normal; margin: 0 0 10px 0; color:#666; }
          hr { border: none; border-top: 1px dashed #999; margin: 8px 0; }
          table { width: 100%; font-size: 12px; border-collapse: collapse; }
          .right { text-align: right; }
          .bold { font-weight: bold; }
          .total { font-size: 15px; }
          .small { font-size: 10px; color: #666; }
          .footer { text-align:center; font-size:11px; margin-top:8px; }
          .thanks { text-align:center; font-size:11px; font-weight:bold; margin-top:6px; }
        </style>
      </head>
      <body>
        <h1>NISHITA'S CREATION</h1>
        <div class="shop-sub">SHOWROOM SALE RECEIPT</div>
        <hr>
        <div style="font-size:12px;">
          <div><b>Order:</b> ${completedOrder.orderNumber || ''}</div>
          <div><b>Date:</b> ${new Date(completedOrder.createdAt).toLocaleString('en-BD')}</div>
          ${customerRow}
          ${phoneRow}
          ${noteRow}
        </div>
        <hr>
        <table>${itemsHtml}</table>
        <hr>
        <table>
          ${subtotalRow}
          ${discountRow}
          <tr class="total">
            <td class="bold">TOTAL</td>
            <td class="right bold">৳${Number(completedOrder.total || 0).toFixed(2)}</td>
          </tr>
        </table>
        <hr>
        <div class="thanks">Thank you for shopping with us!</div>
        <div class="footer">Please keep this receipt.</div>
        <div class="footer">Nishita's Creation · Showroom</div>
      </body>
      </html>`);
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 250);
  };

  // ========== RENDER ==========
  return (
    <ProtectedRoute pageKey="all_orders">
      <div className="min-h-screen bg-gray-50">
        {/* HEADER */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-black to-[#485442] rounded-xl flex items-center justify-center shadow-md">
                  <Scan className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-bold text-black">Showroom POS</h1>
                  <p className="text-xs text-gray-500">Scan products · Charge customer · Print receipt</p>
                </div>
              </div>

              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${
                scannerActive
                  ? 'bg-green-50 border-green-400 text-green-700'
                  : 'bg-gray-50 border-gray-200 text-gray-500'
              }`}>
                <div className={`w-2 h-2 rounded-full ${scannerActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                {scannerActive ? `Scanning: ${scanBuffer}` : 'Ready to Scan'}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
                <form onSubmit={handleManualSubmit} className="flex gap-2 mb-3">
                  <div className="relative flex-1">
                    <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      ref={manualInputRef}
                      type="text"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                      placeholder="Scan or type barcode / SKU and press Enter"
                      autoFocus
                      className="w-full pl-10 pr-3 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                    {scanLookupLoading && (
                      <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
                    )}
                  </div>
                  <button type="submit"
                    className="px-4 py-3 bg-black text-white text-sm rounded-xl hover:bg-[#485442] font-medium">
                    Add
                  </button>
                </form>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => { if (searchResults.length) setShowSearchResults(true); }}
                    placeholder="Or search product by name..."
                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  {searching && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />
                  )}
                </div>

                {showSearchResults && searchResults.length > 0 && (
                  <div className="mt-2 max-h-72 overflow-y-auto border border-gray-200 rounded-xl bg-white shadow-lg">
                    {searchResults.map(p => (
                      <button key={p._id} type="button"
                        onClick={() => handleSearchResultClick(p)}
                        className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-0 flex items-center gap-3">
                        <img src={p.images?.[0]?.url || 'https://via.placeholder.com/40'}
                          alt={p.productName}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-200 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-black truncate">{p.productName}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>৳{(p.discountPrice || p.regularPrice).toFixed(2)}</span>
                            <span>Stock: {p.stockQuantity}</span>
                            {p.hasVariants && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700">Variants</span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-black" />
                    <h2 className="text-sm font-semibold text-black">Cart</h2>
                    <span className="text-xs text-gray-500">({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
                  </div>
                  {cart.length > 0 && (
                    <button onClick={clearCart}
                      className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1">
                      <RotateCcw className="w-3 h-3" /> Clear
                    </button>
                  )}
                </div>
                <div className="p-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <Scan className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500 font-medium">No items yet</p>
                      <p className="text-xs text-gray-400 mt-1">Scan a barcode or search to add products</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cart.map(item => (
                        <PosCartRow key={item._id} item={item}
                          onQtyChange={handleQtyChange} onRemove={handleRemove} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT: CHECKOUT */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm sticky top-24">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <h2 className="text-sm font-semibold text-black flex items-center gap-2">
                    <Receipt className="w-4 h-4" /> Checkout
                  </h2>
                </div>

                <div className="p-4 space-y-4">
                  {/* Customer section — always expanded (not toggleable) */}
                  <div className="space-y-2 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-gray-500" />
                      <p className="text-xs font-medium text-gray-700">Customer (optional)</p>
                    </div>
                    <input type="text" value={customer.fullName}
                      onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                      placeholder="Customer name"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black" />
                    <input type="tel" value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="Phone"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black" />
                    <textarea value={customer.address} rows="2"
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      placeholder="Address"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black resize-none" />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-black">৳{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <input type="text" inputMode="decimal"
                        value={discount === 0 ? '' : discount}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (v === '' || /^\d*\.?\d*$/.test(v)) {
                            setDiscount(v === '' ? 0 : parseFloat(v) || 0);
                          }
                        }}
                        placeholder="Discount ৳"
                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black" />
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>- ৳{discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-gray-100 pt-3">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span>৳{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* ✅ Payment Method dropdown */}
                  <div className="border-t border-gray-100 pt-3">
                    <label className="block text-xs font-medium text-gray-600 mb-1 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-gray-500" />
                      Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black bg-white"
                    >
                      <option value="cod">Cash Payment</option>
                      <option value="online">Online Payment</option>
                      <option value="bkash">bKash</option>
                      <option value="nagad">Nagad</option>
                      <option value="rocket">Rocket</option>
                      <option value="bank_transfer">Bank Transfer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Order note (optional)</label>
                    <textarea value={note} rows="2" onChange={(e) => setNote(e.target.value)}
                      placeholder="Add note..."
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-black resize-none" />
                  </div>

                  <button onClick={handleCheckout}
                    disabled={submitting || cart.length === 0}
                    className="w-full py-3 bg-black text-white rounded-xl hover:bg-[#485442] text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                    {submitting ? 'Processing...' : `Complete Sale ৳${total.toFixed(2)}`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* VARIANT PICKER — stays open, shows remaining variants        */}
        {/* ============================================================ */}
        {variantPickerProduct && (() => {
          const productId = variantPickerProduct._id;
          const cartVariants = cart.filter(it => it.productId === productId);

          const usedVariantIds = new Set();
          const usedSubVariantIdsByVariant = {}; // { variantId: Set(subVariantIds) }

          cartVariants.forEach(it => {
            if (!it.variantId) return;
            usedVariantIds.add(it.variantId);
            if (it.subVariantId) {
              if (!usedSubVariantIdsByVariant[it.variantId]) {
                usedSubVariantIdsByVariant[it.variantId] = new Set();
              }
              usedSubVariantIdsByVariant[it.variantId].add(it.subVariantId);
            }
          });

          const product = variantPickerProduct;

          const stillAddable = product.variantTypes.some(vt =>
            vt.variants.some(v => {
              const hasSubs = v.subVariants && v.subVariants.length > 0;
              if (!hasSubs) return !usedVariantIds.has(v.id);
              const used = usedSubVariantIdsByVariant[v.id] || new Set();
              return v.subVariants.some(sv => !used.has(sv.id));
            })
          );

          return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col"
              >
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">
                      Choose variant · {product.productName}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Add multiple variants — click Done when finished
                    </p>
                  </div>
                  <button
                    onClick={() => setVariantPickerProduct(null)}
                    className="p-1 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 overflow-y-auto space-y-3">
                  {product.variantTypes.map((vt, i) => (
                    <div key={i}>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                        {vt.type}
                      </p>

                      {vt.variants.map(v => {
                        const hasSubs = v.subVariants && v.subVariants.length > 0;
                        const subVariantsUsed = usedSubVariantIdsByVariant[v.id] || new Set();
                        const variantFullyUsed = !hasSubs && usedVariantIds.has(v.id);

                        const remainingSubs = hasSubs
                          ? v.subVariants.filter(sv => !subVariantsUsed.has(sv.id))
                          : [];

                        return (
                          <div key={v.id} className="mb-2">
                            {/* Variant-only (no subs) */}
                            {!hasSubs && (
                              <button
                                type="button"
                                disabled={variantFullyUsed}
                                onClick={() => {
                                  addVariantToCart(product, v, null);
                                  toast.success(`Added ${v.name}`);
                                }}
                                className={`w-full flex items-center justify-between p-2 rounded-lg border transition-all ${
                                  variantFullyUsed
                                    ? 'bg-green-50 border-green-300 cursor-not-allowed opacity-70'
                                    : 'border-gray-200 hover:border-black cursor-pointer'
                                }`}
                              >
                                <span className="text-sm font-medium flex items-center gap-2">
                                  {variantFullyUsed && (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  )}
                                  {v.name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Stock: {v.stockQuantity} · ৳
                                  {(v.discountPrice || v.regularPrice || 0).toFixed(2)}
                                  {variantFullyUsed && (
                                    <span className="ml-2 text-green-600 font-medium">
                                      in cart
                                    </span>
                                  )}
                                </span>
                              </button>
                            )}

                            {/* Variant with subs — show remaining subs as buttons */}
                            {hasSubs && (
                              <div>
                                <div className="flex items-center justify-between p-2 bg-gray-50 rounded-t-lg border border-gray-200 border-b-0">
                                  <span className="text-sm font-medium text-gray-800">
                                    {v.name}
                                  </span>
                                  {remainingSubs.length === 0 ? (
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-300">
                                      All added
                                    </span>
                                  ) : (
                                    <span className="text-[10px] text-gray-500">
                                      {subVariantsUsed.size}/{v.subVariants.length} added
                                    </span>
                                  )}
                                </div>
                                <div className="pl-3 border-l-2 border-gray-200">
                                  {remainingSubs.length === 0 ? (
                                    <div className="p-2 text-xs text-gray-400 text-center border border-t-0 border-gray-200 rounded-b-lg bg-white">
                                      All sub-variants added
                                    </div>
                                  ) : (
                                    remainingSubs.map(sv => (
                                      <button
                                        key={sv.id}
                                        type="button"
                                        onClick={() => {
                                          addVariantToCart(product, v, sv);
                                          toast.success(`Added ${v.name} / ${sv.name}`);
                                        }}
                                        className="w-full flex items-center justify-between p-2 rounded-lg border border-gray-200 hover:border-black cursor-pointer bg-white my-1"
                                      >
                                        <span className="text-xs flex items-center gap-2">
                                          <Plus className="w-3 h-3 text-gray-400" />
                                          → {sv.name}
                                        </span>
                                        <span className="text-[10px] text-gray-500">
                                          Stock: {sv.stockQuantity} · ৳
                                          {(sv.discountPrice || sv.regularPrice || 0).toFixed(2)}
                                        </span>
                                      </button>
                                    ))
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}

                  {!stillAddable && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-center">
                      <p className="text-xs text-green-700 font-medium">
                        All variants added ✓
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
                  <button
                    onClick={() => setVariantPickerProduct(null)}
                    className="flex-1 px-4 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-[#485442]"
                  >
                    Done ({cart.filter(it => it.productId === product._id).reduce((s, i) => s + i.quantity, 0)} items)
                  </button>
                </div>
              </motion.div>
            </div>
          );
        })()}

        {/* RECEIPT */}
        {showReceipt && completedOrder && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col">
              <div className="p-4 bg-gradient-to-r from-black to-[#485442] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <h3 className="text-base font-bold">Sale Completed</h3>
                </div>
                <button onClick={() => { setShowReceipt(false); setCompletedOrder(null); }}
                  className="p-1 hover:bg-white/20 rounded-lg">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 overflow-y-auto">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-bold">SHOWROOM SALE</h2>
                  <p className="text-xs text-gray-500">Order: {completedOrder.orderNumber}</p>
                  <p className="text-xs text-gray-500">{new Date(completedOrder.createdAt).toLocaleString('en-BD')}</p>
                </div>

                <div className="border-t border-b border-dashed border-gray-300 py-3">
                  {completedOrder.items.map((item, i) => {
                    const label = [item.productName, item.variantName, item.subVariantName].filter(Boolean).join(' / ');
                    const p = item.discountPrice > 0 ? item.discountPrice : item.regularPrice;
                    return (
                      <div key={i} className="flex justify-between text-xs py-1">
                        <div className="flex-1">
                          <div className="font-medium">{label}</div>
                          <div className="text-gray-500">x{item.quantity} @ ৳{p.toFixed(2)}</div>
                        </div>
                        <div className="font-medium">৳{(p * item.quantity).toFixed(2)}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 space-y-1 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span>৳{completedOrder.subtotal.toFixed(2)}</span></div>
                  {completedOrder.discount > 0 && (
                    <div className="flex justify-between text-green-600"><span>Discount</span><span>- ৳{completedOrder.discount.toFixed(2)}</span></div>
                  )}
                  <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2">
                    <span>Total</span><span>৳{completedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-2">
                <button onClick={() => { setShowReceipt(false); setCompletedOrder(null); }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium hover:bg-white">
                  Close
                </button>
                <button onClick={handlePrintReceipt}
                  className="flex-1 px-4 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-[#485442] flex items-center justify-center gap-2">
                  <Printer className="w-4 h-4" /> Print Receipt
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}