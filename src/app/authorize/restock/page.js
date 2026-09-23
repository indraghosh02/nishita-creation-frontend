
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import {
//   FaSearch,
//   FaBarcode,
//   FaPlus,
//   FaMinus,
//   FaEdit,
//   FaTrashAlt,
//   FaSpinner,
//   FaTimes,
//   FaBox,
//   FaCheckCircle,
//   FaSave,
//   FaUndo,
//   FaInfoCircle,
//   FaImage,
//   FaArrowUp,
//   FaBolt,
//   FaHistory, // ✅ new
// } from 'react-icons/fa';
// import { toast } from 'sonner';
// import ProtectedRoute from '@/app/components/ProtectedRoute';
// import RestockHistoryModal from '@/app/components/RestockHistoryModal'; // ✅ new
// import RestockHistoryTab from '@/app/components/RestockHistoryTab';     // ✅ new

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
// const SCAN_RESET_MS = 200;

// // ============================================================
// // Restock Cart Row
// // ============================================================
// function RestockRow({
//   item,
//   onIncrease,
//   onDecrease,
//   onSetQty,
//   onRemove,
//   onEdit,
//   onSaveExtra,
// }) {
//   const [qtyInput, setQtyInput] = useState(String(item.addQuantity ?? 0));
//   const [saving, setSaving] = useState(false);

//   useEffect(() => {
//     setQtyInput(String(item.addQuantity ?? 0));
//   }, [item.addQuantity]);

//   const commitQty = () => {
//     const n = parseInt(qtyInput, 10);
//     if (isNaN(n) || n < 0) {
//       setQtyInput(String(item.addQuantity ?? 0));
//       return;
//     }
//     onSetQty(item._id, n);
//     setQtyInput(String(n));
//   };

//   const handleSaveExtra = async () => {
//     if (!onSaveExtra) return;
//     if (!item.addQuantity || item.addQuantity <= 0) {
//       toast.error('Enter a quantity greater than 0 to save');
//       return;
//     }
//     setSaving(true);
//     try {
//       await onSaveExtra(item);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const label = [item.productName, item.variantName, item.subVariantName]
//     .filter(Boolean)
//     .join(' / ');

//   const isVariant = !!(item.variantId || item.subVariantId);
//   const addedCount = item.addQuantity || 0;

//   const newStockPreview = item.currentStock + addedCount;

//   const hasUnsavedExtra = !isVariant && addedCount > 0;

//   return (
//     <div
//       className={`border rounded-xl p-3 bg-white transition-all ${
//         !isVariant
//           ? 'border-green-200 bg-green-50/20'
//           : 'border-black/15 hover:border-black/30'
//       }`}
//     >
//       <div className="flex items-start gap-3">
//         <div className="w-14 h-14 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center border border-gray-200">
//           {item.image ? (
//             <img
//               src={item.image}
//               alt={label}
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.style.display = 'none';
//               }}
//             />
//           ) : (
//             <FaImage className="w-5 h-5 text-gray-300" />
//           )}
//         </div>

//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-2 flex-wrap">
//             <p className="text-sm font-semibold text-black truncate">
//               {label}
//             </p>
//             {isVariant && (
//               <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-medium">
//                 Variant
//               </span>
//             )}
//             {!isVariant && (
//               <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-300 font-medium flex items-center gap-1">
//                 <FaBolt className="w-2 h-2" />
//                 +1 Auto-Saved
//               </span>
//             )}
//             {hasUnsavedExtra && (
//               <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-300 font-medium flex items-center gap-1">
//                 <FaArrowUp className="w-2 h-2" />
//                 +{addedCount} unsaved
//               </span>
//             )}
//           </div>

//           <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
//             {item.skuCode && (
//               <span className="text-[10px] text-gray-500 font-mono">
//                 SKU: {item.skuCode}
//               </span>
//             )}
//             {item.barcode && (
//               <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
//                 <FaBarcode className="w-2.5 h-2.5" />
//                 {item.barcode}
//               </span>
//             )}
//           </div>

//           <div className="flex items-center gap-2 mt-1">
//             <span className="text-[10px] text-gray-500">Current Stock:</span>
//             <span className="text-xs font-bold text-black">
//               {item.currentStock}
//             </span>
//             {item.selectedColor && (
//               <div className="flex items-center gap-1">
//                 <span
//                   className="inline-block w-3 h-3 rounded-full border border-gray-300"
//                   style={{ backgroundColor: item.selectedColor }}
//                 />
//                 <span className="text-[9px] text-gray-500">
//                   {item.selectedColor}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         <button
//           onClick={() => onRemove(item._id)}
//           className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
//           title="Remove from list"
//         >
//           <FaTrashAlt className="w-3.5 h-3.5" />
//         </button>
//       </div>

//       {/* Quantity controls */}
//       <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-100 flex-wrap">
//         <div className="flex items-center gap-2 flex-wrap">
//           <label className="text-xs font-medium text-gray-600">
//             {isVariant ? 'Add Quantity:' : 'Add Extra Quantity:'}
//           </label>

//           <div className="flex items-center border border-black/20 rounded-lg overflow-hidden bg-white">
//             <button
//               type="button"
//               onClick={() => onDecrease(item._id)}
//               disabled={addedCount <= 0}
//               className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
//               title="Remove 1"
//             >
//               <FaMinus className="w-2.5 h-2.5 text-black" />
//             </button>

//             <input
//               type="number"
//               min="0"
//               value={qtyInput}
//               onChange={(e) => setQtyInput(e.target.value)}
//               onBlur={commitQty}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter') {
//                   commitQty();
//                   e.target.blur();
//                 }
//               }}
//               className="w-16 text-center text-sm py-1 focus:outline-none text-black font-medium"
//             />

//             <button
//               type="button"
//               onClick={() => onIncrease(item._id)}
//               className="w-7 h-7 flex items-center justify-center hover:bg-gray-50"
//               title="Add 1"
//             >
//               <FaPlus className="w-2.5 h-2.5 text-black" />
//             </button>
//           </div>

//           <div className="flex items-center gap-2 text-xs">
//             <span className="text-gray-500">
//               {isVariant ? '→ New Stock:' : 'Stock now:'}
//             </span>
//             <span className="font-bold text-black">{newStockPreview}</span>
//           </div>
//         </div>

//         <div className="flex items-center gap-2">
//           {!isVariant && hasUnsavedExtra && (
//             <button
//               type="button"
//               onClick={handleSaveExtra}
//               disabled={saving}
//               className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm disabled:opacity-50"
//               title="Save the extra quantity to inventory"
//             >
//               {saving ? (
//                 <FaSpinner className="w-3 h-3 animate-spin" />
//               ) : (
//                 <FaSave className="w-3 h-3" />
//               )}
//               {saving ? 'Saving...' : 'Save Quantity'}
//             </button>
//           )}

//           <button
//             type="button"
//             onClick={() => onEdit(item)}
//             className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
//             title="Edit product"
//           >
//             <FaEdit className="w-3 h-3" />
//             Edit
//           </button>
//         </div>
//       </div>

//       {!isVariant && (
//         <div className="mt-2 pt-2 border-t border-green-100 text-[11px] text-green-700 flex items-center gap-1.5 flex-wrap">
//           <FaCheckCircle className="w-3 h-3" />
//           <span>
//             +1 already saved (Stock: <strong>{item.currentStock}</strong>).
//           </span>
//           {hasUnsavedExtra && (
//             <span className="text-amber-700 font-medium">
//               • Click <strong>Save Quantity</strong> to add the extra{' '}
//               {addedCount}.
//             </span>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// // ============================================================
// // Product Search Result Row
// // ============================================================
// function ProductSearchResult({ product, onAdd, onClose }) {
//   const [expanded, setExpanded] = useState(false);

//   const hasVariants =
//     product.hasVariants && product.variantTypes?.length > 0;

//   const baseImage =
//     product.images?.[0]?.url ||
//     (typeof product.images?.[0] === 'string' ? product.images[0] : '') ||
//     '';

//   return (
//     <div className="border-b border-gray-100 last:border-0">
//       <div
//         className="p-3 hover:bg-gray-50 transition-colors cursor-pointer"
//         onMouseDown={(e) => {
//           e.preventDefault();
//           if (hasVariants) {
//             setExpanded((v) => !v);
//           } else {
//             onAdd({
//               product,
//               variant: null,
//               subVariant: null,
//             });
//             onClose();
//           }
//         }}
//       >
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200">
//             {baseImage ? (
//               <img
//                 src={baseImage}
//                 alt={product.productName}
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <FaImage className="w-4 h-4 text-gray-300" />
//             )}
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-sm font-medium text-black truncate">
//               {product.productName}
//             </p>
//             <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-500">
//               {product.skuCode && (
//                 <span className="font-mono">SKU: {product.skuCode}</span>
//               )}
//               {product.barcode && (
//                 <span className="font-mono flex items-center gap-1">
//                   <FaBarcode className="w-2.5 h-2.5" />
//                   {product.barcode}
//                 </span>
//               )}
//               <span>
//                 Stock:{' '}
//                 <span className="font-medium text-black">
//                   {product.stockQuantity || 0}
//                 </span>
//               </span>
//             </div>
//           </div>
//           {hasVariants ? (
//             <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-medium">
//               {expanded ? 'Hide Variants' : 'Has Variants'}
//             </span>
//           ) : (
//             <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200 font-medium flex items-center gap-1">
//               <FaBolt className="w-2.5 h-2.5" />
//               Instant +1
//             </span>
//           )}
//         </div>
//       </div>

//       {expanded && hasVariants && (
//         <div className="px-3 pb-3 bg-gray-50 border-t border-gray-100">
//           {product.variantTypes.map((vt, vi) => (
//             <div key={vi} className="mt-2">
//               <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
//                 {vt.type}
//               </p>
//               <div className="space-y-1">
//                 {(vt.variants || []).map((variant, vIdx) => (
//                   <div key={vIdx}>
//                     <div
//                       onMouseDown={(e) => {
//                         e.preventDefault();
//                         onAdd({
//                           product,
//                           variant,
//                           subVariant: null,
//                         });
//                         onClose();
//                       }}
//                       className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200 hover:border-black/40 cursor-pointer transition-all"
//                     >
//                       <div className="flex items-center gap-2 min-w-0">
//                         {variant.color && (
//                           <span
//                             className="w-3 h-3 rounded-full border border-gray-300 flex-shrink-0"
//                             style={{ backgroundColor: variant.color }}
//                           />
//                         )}
//                         <span className="text-xs font-medium text-black truncate">
//                           {variant.name}
//                         </span>
//                         {variant.skuCode && (
//                           <span className="text-[9px] text-gray-400 font-mono">
//                             {variant.skuCode}
//                           </span>
//                         )}
//                       </div>
//                       <div className="flex items-center gap-2 flex-shrink-0">
//                         <span className="text-[10px] text-gray-500">
//                           Stock:{' '}
//                           <span className="font-medium text-black">
//                             {variant.stockQuantity || 0}
//                           </span>
//                         </span>
//                         <FaPlus className="w-3 h-3 text-black" />
//                       </div>
//                     </div>

//                     {(variant.subVariants || []).length > 0 && (
//                       <div className="pl-4 mt-1 space-y-1">
//                         {variant.subVariants.map((sub, sIdx) => (
//                           <div
//                             key={sIdx}
//                             onMouseDown={(e) => {
//                               e.preventDefault();
//                               onAdd({
//                                 product,
//                                 variant,
//                                 subVariant: sub,
//                               });
//                               onClose();
//                             }}
//                             className="flex items-center justify-between p-1.5 bg-white rounded-md border border-gray-200 hover:border-black/40 cursor-pointer transition-all"
//                           >
//                             <div className="flex items-center gap-2 min-w-0">
//                               {sub.color && (
//                                 <span
//                                   className="w-2.5 h-2.5 rounded-full border border-gray-300 flex-shrink-0"
//                                   style={{ backgroundColor: sub.color }}
//                                 />
//                               )}
//                               <span className="text-[11px] text-gray-700 truncate">
//                                 {sub.name}
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-2 flex-shrink-0">
//                               <span className="text-[9px] text-gray-500">
//                                 Stock:{' '}
//                                 <span className="font-medium text-black">
//                                   {sub.stockQuantity || 0}
//                                 </span>
//                               </span>
//                               <FaPlus className="w-2.5 h-2.5 text-black" />
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ============================================================
// // Main Restock Page
// // ============================================================
// export default function RestockPage() {
//   // ✅ NEW: active tab
//   const [activeTab, setActiveTab] = useState('restock'); // 'restock' | 'history'

//   // ✅ NEW: modal state
//   const [historyItem, setHistoryItem] = useState(null);

//   const [items, setItems] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [searching, setSearching] = useState(false);
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [scanBuffer, setScanBuffer] = useState('');
//   const [scannerActive, setScannerActive] = useState(false);
//   const [recentScans, setRecentScans] = useState([]);

//   const scanBufferRef = useRef('');
//   const scanTimerRef = useRef(null);
//   const searchTimerRef = useRef(null);
//   const searchInputRef = useRef(null);
//   const dropdownRef = useRef(null);

//   // Persist items
//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem('restock_cart');
//       if (saved) {
//         const parsed = JSON.parse(saved);
//         if (Array.isArray(parsed)) setItems(parsed);
//       }
//     } catch (e) {
//       console.error('Failed to load restock cart:', e);
//     }
//   }, []);

//   useEffect(() => {
//     try {
//       localStorage.setItem('restock_cart', JSON.stringify(items));
//     } catch (e) {
//       console.error('Failed to persist restock cart:', e);
//     }
//   }, [items]);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target) &&
//         searchInputRef.current &&
//         !searchInputRef.current.contains(e.target)
//       ) {
//         setShowSearchResults(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // ✅ Scanner only active on the Restock tab
//   useEffect(() => {
//     if (activeTab !== 'restock') return;

//     const handleKeyDown = (e) => {
//       const tag = document.activeElement?.tagName;
//       const isTyping =
//         tag === 'INPUT' ||
//         tag === 'TEXTAREA' ||
//         tag === 'SELECT' ||
//         document.activeElement?.isContentEditable;

//       if (isTyping) return;

//       if (e.key === 'Enter' || e.key === 'Tab') {
//         if (e.key === 'Tab') e.preventDefault();
//         const code = scanBufferRef.current.trim();
//         if (code && code.length >= 4) {
//           handleBarcodeScanned(code);
//         }
//         scanBufferRef.current = '';
//         setScanBuffer('');
//         setScannerActive(false);
//         if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
//         return;
//       }

//       if (!/^[a-zA-Z0-9-]$/.test(e.key)) return;

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

//     window.addEventListener('keydown', handleKeyDown);
//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//       if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [activeTab]);

//   // Backend helpers
//   const fetchProductByBarcode = async (code) => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(
//         `${API_URL}/api/products/barcode/${encodeURIComponent(code)}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       if (!res.ok) return null;
//       const json = await res.json();
//       if (json.success && json.data) return json.data;
//       return null;
//     } catch (e) {
//       console.error('Barcode fetch failed:', e);
//       return null;
//     }
//   };

//   const saveToBackend = async ({
//     productId,
//     variantId,
//     subVariantId,
//     addQuantity,
//   }) => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`${API_URL}/api/products/restock-bulk`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           items: [
//             {
//               productId,
//               variantId,
//               subVariantId,
//               addQuantity,
//             },
//           ],
//         }),
//       });
//       const json = await res.json();
//       if (json.success && json.data?.updatedCount > 0) {
//         return { success: true, result: json.data.results?.[0] };
//       }
//       return { success: false, error: json.error || 'Failed' };
//     } catch (e) {
//       console.error('Save to backend error:', e);
//       return { success: false, error: 'Network error' };
//     }
//   };

//   const searchProducts = async (query) => {
//     const term = query.trim();
//     if (!term) {
//       setSearchResults([]);
//       setShowSearchResults(false);
//       return;
//     }

//     setSearching(true);
//     try {
//       const token = localStorage.getItem('token');
//       const qp = new URLSearchParams({ search: term, limit: 12 });
//       const res = await fetch(`${API_URL}/api/products?${qp}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const json = await res.json();
//       if (json.success) {
//         setSearchResults(json.data || []);
//         setShowSearchResults(true);
//       }
//     } catch (e) {
//       console.error('Search failed:', e);
//       toast.error('Search failed');
//     } finally {
//       setSearching(false);
//     }
//   };

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//     if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
//     searchTimerRef.current = setTimeout(() => searchProducts(value), 400);
//   };

//   const clearSearch = () => {
//     setSearchQuery('');
//     setSearchResults([]);
//     setShowSearchResults(false);
//     if (searchInputRef.current) searchInputRef.current.focus();
//   };

//   const handleBarcodeScanned = async (code) => {
//     const toastId = toast.loading(`Looking up: ${code}`);

//     const product = await fetchProductByBarcode(code);

//     if (!product) {
//       toast.error(`No product found for barcode: ${code}`, { id: toastId });
//       return;
//     }

//     let matched = null;
//     if (product.hasVariants && product.variantTypes?.length) {
//       for (const vt of product.variantTypes) {
//         for (const v of vt.variants || []) {
//           if (v.barcode === code || v.skuCode === code) {
//             matched = { variant: v, subVariant: null };
//             break;
//           }
//           for (const sv of v.subVariants || []) {
//             if (sv.barcode === code || sv.skuCode === code) {
//               matched = { variant: v, subVariant: sv };
//               break;
//             }
//           }
//           if (matched) break;
//         }
//         if (matched) break;
//       }
//     }

//     if (!product.hasVariants || !product.variantTypes?.length) {
//       toast.dismiss(toastId);
//       await handleSimpleProductAdd(product);
//       return;
//     }

//     if (matched) {
//       toast.dismiss(toastId);
//       handleVariantAdd({
//         product,
//         variant: matched.variant,
//         subVariant: matched.subVariant,
//       });
//       return;
//     }

//     toast.info(
//       `"${product.productName}" has variants. Pick one from search.`,
//       { id: toastId }
//     );
//     setSearchQuery(product.productName);
//     setSearchResults([product]);
//     setShowSearchResults(true);
//   };

//   const handleSimpleProductAdd = async (product) => {
//     const productId = product._id;

//     const saveResult = await saveToBackend({
//       productId,
//       variantId: null,
//       subVariantId: null,
//       addQuantity: 1,
//     });

//     if (!saveResult.success) {
//       toast.error(saveResult.error || 'Failed to update stock');
//       return;
//     }

//     const newStock = saveResult.result?.newStock;

//     const image =
//       product.images?.[0]?.url ||
//       (typeof product.images?.[0] === 'string' ? product.images[0] : '') ||
//       '';

//     setItems((prev) => {
//       const idx = prev.findIndex(
//         (it) =>
//           it.productId === productId &&
//           !it.variantId &&
//           !it.subVariantId
//       );

//       if (idx >= 0) {
//         const updated = [...prev];
//         updated[idx] = {
//           ...updated[idx],
//           currentStock:
//             typeof newStock === 'number'
//               ? newStock
//               : updated[idx].currentStock + 1,
//         };
//         return updated;
//       }

//       return [
//         ...prev,
//         {
//           _id: `${productId}-base-base-${Date.now()}`,
//           productId,
//           variantId: null,
//           subVariantId: null,
//           productName: product.productName,
//           variantName: '',
//           subVariantName: '',
//           skuCode: product.skuCode || '',
//           barcode: product.barcode || '',
//           image,
//           selectedColor: product.colors?.[0] || '',
//           currentStock:
//             typeof newStock === 'number'
//               ? newStock
//               : Number(product.stockQuantity) || 0,
//           addQuantity: 0,
//         },
//       ];
//     });

//     toast.success(`+1 → ${product.productName} (stock saved)`, {
//       duration: 1800,
//     });

//     setRecentScans((prev) =>
//       [
//         {
//           code: product.barcode || product.skuCode || productId,
//           productName: product.productName,
//           variantName: '',
//           subVariantName: '',
//           timestamp: new Date(),
//         },
//         ...prev.slice(0, 4),
//       ].slice(0, 5)
//     );
//   };

//   const handleVariantAdd = ({ product, variant, subVariant }) => {
//     const productId = product._id;
//     const variantId = variant?.id || variant?._id || null;
//     const subVariantId = subVariant?.id || subVariant?._id || null;

//     let currentStock = 0;
//     let image = '';
//     let skuCode = '';
//     let barcode = '';
//     let variantName = '';
//     let subVariantName = '';
//     let selectedColor = '';

//     if (variant && !subVariant) {
//       currentStock = Number(variant.stockQuantity) || 0;
//       image = variant.imagePreviews?.[0] || variant.images?.[0] || '';
//       skuCode = variant.skuCode || '';
//       barcode = variant.barcode || '';
//       variantName = variant.name || '';
//       selectedColor = variant.color || '';
//     } else if (subVariant) {
//       currentStock = Number(subVariant.stockQuantity) || 0;
//       image = subVariant.imagePreviews?.[0] || subVariant.images?.[0] || '';
//       skuCode = subVariant.skuCode || '';
//       barcode = subVariant.barcode || '';
//       variantName = variant?.name || '';
//       subVariantName = subVariant.name || '';
//       selectedColor = subVariant.color || variant?.color || '';
//     }

//     if (image && typeof image === 'object') image = image.url || '';

//     const displayLabel = [product.productName, variantName, subVariantName]
//       .filter(Boolean)
//       .join(' / ');

//     setItems((prev) => {
//       const existing = prev.find(
//         (it) =>
//           it.productId === productId &&
//           it.variantId === variantId &&
//           it.subVariantId === subVariantId
//       );

//       if (existing) {
//         const newQty = (existing.addQuantity || 0) + 1;
//         toast.success(`+1 → ${displayLabel} (now ${newQty})`, {
//           duration: 1800,
//         });
//         return prev.map((it) =>
//           it === existing ? { ...it, addQuantity: newQty } : it
//         );
//       }

//       toast.success(`Added: ${displayLabel}`, { duration: 1800 });
//       return [
//         ...prev,
//         {
//           _id: `${productId}-${variantId || 'base'}-${subVariantId || 'base'}-${Date.now()}`,
//           productId,
//           variantId,
//           subVariantId,
//           productName: product.productName,
//           variantName,
//           subVariantName,
//           skuCode,
//           barcode,
//           image,
//           selectedColor,
//           currentStock,
//           addQuantity: 1,
//         },
//       ];
//     });

//     setRecentScans((prev) =>
//       [
//         {
//           code: barcode || skuCode || productId,
//           productName: product.productName,
//           variantName,
//           subVariantName,
//           timestamp: new Date(),
//         },
//         ...prev.slice(0, 4),
//       ].slice(0, 5)
//     );
//   };

//   const increaseQty = (id) => {
//     setItems((prev) =>
//       prev.map((it) =>
//         it._id === id
//           ? { ...it, addQuantity: (it.addQuantity || 0) + 1 }
//           : it
//       )
//     );
//   };

//   const decreaseQty = (id) => {
//     setItems((prev) =>
//       prev.map((it) =>
//         it._id === id
//           ? { ...it, addQuantity: Math.max(0, (it.addQuantity || 0) - 1) }
//           : it
//       )
//     );
//   };

//   const setQty = (id, qty) => {
//     setItems((prev) =>
//       prev.map((it) => (it._id === id ? { ...it, addQuantity: qty } : it))
//     );
//   };

//   const saveExtraQuantity = async (item) => {
//     const qty = item.addQuantity || 0;
//     if (qty <= 0) {
//       toast.error('No quantity to save');
//       return;
//     }

//     const saveResult = await saveToBackend({
//       productId: item.productId,
//       variantId: null,
//       subVariantId: null,
//       addQuantity: qty,
//     });

//     if (!saveResult.success) {
//       toast.error(saveResult.error || 'Failed to save quantity');
//       return;
//     }

//     const newStock = saveResult.result?.newStock;

//     setItems((prev) =>
//       prev.map((it) =>
//         it._id === item._id
//           ? {
//               ...it,
//               addQuantity: 0,
//               currentStock:
//                 typeof newStock === 'number'
//                   ? newStock
//                   : it.currentStock + qty,
//             }
//           : it
//       )
//     );

//     toast.success(`+${qty} saved → ${item.productName}`, { duration: 1800 });
//   };

//   const removeItem = (id) => {
//     const item = items.find((it) => it._id === id);
//     if (!item) return;

//     const isVariant = !!(item.variantId || item.subVariantId);

//     if (!isVariant && (item.addQuantity || 0) > 0) {
//       if (
//         !confirm(
//           `This product has ${item.addQuantity} unsaved extra quantity. Removing will lose it. Continue?`
//         )
//       ) {
//         return;
//       }
//     } else if (!isVariant) {
//       if (
//         !confirm(
//           "This product's +1 was already saved. Removing it from the list won't undo the stock change. Continue?"
//         )
//       ) {
//         return;
//       }
//     }

//     setItems((prev) => prev.filter((it) => it._id !== id));
//     toast.success('Removed');
//   };

//   const clearCart = () => {
//     if (items.length === 0) return;
//     if (!confirm('Clear all items from the restock list?')) return;
//     setItems([]);
//     toast.success('Restock list cleared');
//   };

//   const handleEdit = (item) => {
//     window.open(`/authorize/editProduct?id=${item.productId}`, '_blank');
//   };

//   const handleSubmit = async () => {
//     const variantItems = items.filter(
//       (it) =>
//         (it.variantId || it.subVariantId) && (it.addQuantity || 0) > 0
//     );

//     if (variantItems.length === 0) {
//       toast.info('No pending variants to submit.');
//       return;
//     }

//     setSaving(true);
//     const toastId = toast.loading('Updating variant stock...');

//     try {
//       const token = localStorage.getItem('token');
//       const payload = {
//         items: variantItems.map((it) => ({
//           productId: it.productId,
//           variantId: it.variantId,
//           subVariantId: it.subVariantId,
//           addQuantity: it.addQuantity,
//         })),
//       };

//       const res = await fetch(`${API_URL}/api/products/restock-bulk`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       const json = await res.json();

//       if (json.success) {
//         toast.success(
//           `Stock updated for ${json.data?.updatedCount || variantItems.length} variant(s)`,
//           { id: toastId, duration: 4000 }
//         );
//         setItems((prev) =>
//           prev.filter(
//             (it) =>
//               !(
//                 (it.variantId || it.subVariantId) &&
//                 (it.addQuantity || 0) > 0
//               )
//           )
//         );
//       } else {
//         toast.error(json.error || 'Failed to update stock', { id: toastId });
//       }
//     } catch (e) {
//       console.error('Restock submit error:', e);
//       toast.error('Network error', { id: toastId });
//     } finally {
//       setSaving(false);
//     }
//   };

//   const totalItems = items.length;
//   const totalUnits = items.reduce((sum, it) => sum + (it.addQuantity || 0), 0);
//   const pendingVariantCount = items.filter(
//     (it) => (it.variantId || it.subVariantId) && (it.addQuantity || 0) > 0
//   ).length;
//   const pendingSimpleCount = items.filter(
//     (it) =>
//       !it.variantId && !it.subVariantId && (it.addQuantity || 0) > 0
//   ).length;

//   return (
//     <ProtectedRoute pageKey="restock">
//       <div className="min-h-screen bg-gray-50 pb-24">
//         {/* HEADER */}
//         <div className="bg-white border-b border-black/10 sticky top-0 z-30 shadow-sm">
//           <div className="max-w-6xl mx-auto px-4 py-4">
//             <div className="flex items-center justify-between gap-4 flex-wrap">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 bg-gradient-to-r from-black to-[#485442] rounded-xl flex items-center justify-center shadow-md">
//                   <FaBox className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-lg md:text-xl font-bold text-black">
//                     Restock Inventory
//                   </h1>
//                   <p className="text-xs text-gray-500 mt-0.5">
//                     Simple products save instantly · Variants submit together
//                   </p>
//                 </div>
//               </div>

//               {/* ✅ Scanner pill only relevant on restock tab */}
//               {activeTab === 'restock' && (
//                 <div
//                   className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${
//                     scannerActive
//                       ? 'bg-green-50 border-green-400 text-green-700'
//                       : 'bg-gray-50 border-gray-200 text-gray-500'
//                   }`}
//                 >
//                   <div
//                     className={`w-2 h-2 rounded-full ${
//                       scannerActive
//                         ? 'bg-green-500 animate-pulse'
//                         : 'bg-gray-400'
//                     }`}
//                   />
//                   {scannerActive ? 'Scanner Active' : 'Ready to Scan'}
//                 </div>
//               )}
//             </div>

//             {/* ✅ TABS */}
//             <div className="mt-4 flex items-center gap-1 border-b border-gray-200 -mb-4">
//               <button
//                 onClick={() => setActiveTab('restock')}
//                 className={`px-4 py-2.5 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
//                   activeTab === 'restock'
//                     ? 'border-black text-black'
//                     : 'border-transparent text-gray-500 hover:text-black'
//                 }`}
//               >
//                 <FaBox className="w-3.5 h-3.5" />
//                 Restock
//                 {totalItems > 0 && (
//                   <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-black text-white font-semibold">
//                     {totalItems}
//                   </span>
//                 )}
//               </button>
//               <button
//                 onClick={() => setActiveTab('history')}
//                 className={`px-4 py-2.5 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
//                   activeTab === 'history'
//                     ? 'border-black text-black'
//                     : 'border-transparent text-gray-500 hover:text-black'
//                 }`}
//               >
//                 <FaHistory className="w-3.5 h-3.5" />
//                 Restock History
//               </button>
//             </div>

//             {scannerActive && activeTab === 'restock' && (
//               <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
//                 <FaBarcode className="w-4 h-4 text-green-600" />
//                 <span className="text-xs text-green-700 font-mono">
//                   Scanning: {scanBuffer}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="max-w-6xl mx-auto px-4 py-6">
//           {/* ============================================ */}
//           {/* TAB: RESTOCK                                 */}
//           {/* ============================================ */}
//           {activeTab === 'restock' && (
//             <>
//               {/* SEARCH + INFO */}
//               <div className="bg-white rounded-2xl border border-black/10 shadow-sm p-4 mb-6">
//                 <div className="flex items-start gap-3 mb-3">
//                   <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
//                     <FaInfoCircle className="w-4 h-4 text-blue-600" />
//                   </div>
//                   <div className="text-xs text-blue-800 leading-relaxed space-y-0.5">
//                     <p>
//                       <FaBolt className="inline w-3 h-3 text-green-600 mr-1" />
//                       <strong>Simple products</strong> → +1 saved instantly on
//                       scan. Add extra via +/−, then click{' '}
//                       <strong>Save Quantity</strong>.
//                     </p>
//                     <p>
//                       <strong>Variant products</strong> → pick a variant;
//                       submit when ready.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="relative" ref={dropdownRef}>
//                   <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-10 pointer-events-none" />
//                   <input
//                     ref={searchInputRef}
//                     type="text"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     onFocus={() => {
//                       if (searchResults.length > 0)
//                         setShowSearchResults(true);
//                     }}
//                     placeholder="Search by product name, SKU, or barcode..."
//                     className="w-full pl-10 pr-10 py-3 text-sm border border-black/15 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black placeholder:text-gray-400"
//                   />
//                   {searching && (
//                     <FaSpinner className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-black" />
//                   )}
//                   {!searching && searchQuery && (
//                     <button
//                       onClick={clearSearch}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
//                     >
//                       <FaTimes className="w-3.5 h-3.5" />
//                     </button>
//                   )}

//                   {showSearchResults && (
//                     <div
//                       className="absolute left-0 right-0 top-full mt-2 bg-white border border-black/15 rounded-xl shadow-xl z-50 max-h-[420px] overflow-y-auto"
//                       onMouseDown={(e) => e.preventDefault()}
//                     >
//                       {searchResults.length === 0 ? (
//                         <div className="p-6 text-center text-xs text-gray-500">
//                           No products found for "{searchQuery}"
//                         </div>
//                       ) : (
//                         searchResults.map((product) => (
//                           <ProductSearchResult
//                             key={product._id}
//                             product={product}
//                             onAdd={(args) => {
//                               const hasVariants =
//                                 args.product?.hasVariants &&
//                                 args.product?.variantTypes?.length > 0;
//                               if (hasVariants && args.variant) {
//                                 handleVariantAdd(args);
//                               } else {
//                                 handleSimpleProductAdd(args.product);
//                               }
//                             }}
//                             onClose={() => {
//                               setShowSearchResults(false);
//                               setSearchQuery('');
//                             }}
//                           />
//                         ))
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* RECENT SCANS */}
//               {recentScans.length > 0 && (
//                 <div className="mb-6">
//                   <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
//                     Recent Scans
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {recentScans.map((scan, i) => (
//                       <div
//                         key={i}
//                         className="flex items-center gap-2 px-3 py-1.5 bg-white border border-black/10 rounded-full text-xs"
//                       >
//                         <FaCheckCircle className="w-3 h-3 text-green-500" />
//                         <span className="text-gray-700">
//                           {[
//                             scan.productName,
//                             scan.variantName,
//                             scan.subVariantName,
//                           ]
//                             .filter(Boolean)
//                             .join(' / ')}
//                         </span>
//                         <span className="text-gray-400 font-mono text-[10px]">
//                           {scan.code}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* RESTOCK LIST */}
//               <div className="bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden">
//                 <div className="px-4 py-3 border-b border-black/10 bg-gray-50 flex items-center justify-between flex-wrap gap-2">
//                   <div className="flex items-center gap-2 flex-wrap">
//                     <FaBox className="w-4 h-4 text-black" />
//                     <h2 className="text-sm font-semibold text-black">
//                       Restock List
//                     </h2>
//                     <span className="text-xs text-gray-500">
//                       ({totalItems} item{totalItems !== 1 ? 's' : ''},{' '}
//                       {totalUnits} extra unit{totalUnits !== 1 ? 's' : ''})
//                     </span>
//                     {pendingVariantCount > 0 && (
//                       <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-medium">
//                         {pendingVariantCount} variant(s) pending
//                       </span>
//                     )}
//                     {pendingSimpleCount > 0 && (
//                       <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-300 font-medium">
//                         {pendingSimpleCount} simple item(s) with unsaved qty
//                       </span>
//                     )}
//                   </div>
//                   {items.length > 0 && (
//                     <button
//                       onClick={clearCart}
//                       className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
//                     >
//                       <FaTrashAlt className="w-3 h-3" />
//                       Clear All
//                     </button>
//                   )}
//                 </div>

//                 <div className="p-4">
//                   {items.length === 0 ? (
//                     <div className="text-center py-12">
//                       <FaBarcode className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//                       <p className="text-sm text-gray-500 font-medium">
//                         No items in restock list
//                       </p>
//                       <p className="text-xs text-gray-400 mt-1">
//                         Scan a barcode or search for products to add them here
//                       </p>
//                     </div>
//                   ) : (
//                     <div className="space-y-3">
//                       {items.map((item) => (
//                         <RestockRow
//                           key={item._id}
//                           item={item}
//                           onIncrease={increaseQty}
//                           onDecrease={decreaseQty}
//                           onSetQty={setQty}
//                           onRemove={removeItem}
//                           onEdit={handleEdit}
//                           onSaveExtra={saveExtraQuantity}
//                         />
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </>
//           )}

//           {/* ============================================ */}
//           {/* TAB: HISTORY                                 */}
//           {/* ============================================ */}
//           {activeTab === 'history' && (
//             <RestockHistoryTab onViewHistory={setHistoryItem} />
//           )}
//         </div>

//         {/* STICKY FOOTER — only on Restock tab */}
//         {activeTab === 'restock' && items.length > 0 && (
//           <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-black/10 shadow-2xl">
//             <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
//               <div className="text-xs text-gray-600">
//                 <span className="font-bold text-black">{totalItems}</span>{' '}
//                 item(s) ·{' '}
//                 <span className="font-bold text-black">{totalUnits}</span>{' '}
//                 extra unit(s)
//                 {pendingVariantCount > 0 && (
//                   <span className="ml-2 text-amber-600">
//                     · {pendingVariantCount} variant pending
//                   </span>
//                 )}
//                 {pendingSimpleCount > 0 && (
//                   <span className="ml-2 text-green-600">
//                     · {pendingSimpleCount} simple unsaved
//                   </span>
//                 )}
//               </div>

//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={clearCart}
//                   disabled={saving}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
//                 >
//                   <FaUndo className="w-3.5 h-3.5" />
//                   Reset
//                 </button>
//                 <button
//                   onClick={handleSubmit}
//                   disabled={saving || pendingVariantCount === 0}
//                   className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-xl hover:bg-[#485442] transition-all text-sm font-medium shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
//                 >
//                   {saving ? (
//                     <FaSpinner className="w-4 h-4 animate-spin" />
//                   ) : (
//                     <FaSave className="w-4 h-4" />
//                   )}
//                   {saving
//                     ? 'Updating...'
//                     : pendingVariantCount > 0
//                     ? `Submit ${pendingVariantCount} Variant(s)`
//                     : 'All Saved'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ✅ HISTORY MODAL */}
//         {historyItem && (
//           <RestockHistoryModal
//             item={historyItem}
//             onClose={() => setHistoryItem(null)}
//           />
//         )}
//       </div>
//     </ProtectedRoute>
//   );
// }



'use client';

import { useState, useEffect, useRef } from 'react';
import {
  FaSearch,
  FaBarcode,
  FaPlus,
  FaMinus,
  FaEdit,
  FaTrashAlt,
  FaSpinner,
  FaTimes,
  FaBox,
  FaCheckCircle,
  FaSave,
  FaUndo,
  FaInfoCircle,
  FaImage,
  FaArrowUp,
  FaBolt,
  FaHistory,
} from 'react-icons/fa';
import { toast } from 'sonner';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import RestockHistoryModal from '@/app/components/RestockHistoryModal';
import RestockHistoryTab from '@/app/components/RestockHistoryTab';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const SCAN_RESET_MS = 200;

// Small helper — safe UUID across browsers
function generateRequestId() {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
  } catch (e) {
    // fall through
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

// ============================================================
// Restock Cart Row
// ============================================================
function RestockRow({
  item,
  onIncrease,
  onDecrease,
  onSetQty,
  onRemove,
  onEdit,
  onSaveExtra,
}) {
  const [qtyInput, setQtyInput] = useState(String(item.addQuantity ?? 0));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setQtyInput(String(item.addQuantity ?? 0));
  }, [item.addQuantity]);

  const commitQty = () => {
    const n = parseInt(qtyInput, 10);
    if (isNaN(n) || n < 0) {
      setQtyInput(String(item.addQuantity ?? 0));
      return;
    }
    onSetQty(item._id, n);
    setQtyInput(String(n));
  };

  const handleSaveExtra = async () => {
    if (!onSaveExtra) return;
    if (!item.addQuantity || item.addQuantity <= 0) {
      toast.error('Enter a quantity greater than 0 to save');
      return;
    }
    setSaving(true);
    try {
      await onSaveExtra(item);
    } finally {
      setSaving(false);
    }
  };

  const label = [item.productName, item.variantName, item.subVariantName]
    .filter(Boolean)
    .join(' / ');

  const isVariant = !!(item.variantId || item.subVariantId);
  const addedCount = item.addQuantity || 0;

  const newStockPreview = item.currentStock + addedCount;

  const hasUnsavedExtra = !isVariant && addedCount > 0;

  return (
    <div
      className={`border rounded-xl p-3 bg-white transition-all ${
        !isVariant
          ? 'border-green-200 bg-green-50/20'
          : 'border-black/15 hover:border-black/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-14 h-14 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center border border-gray-200">
          {item.image ? (
            <img
              src={item.image}
              alt={label}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <FaImage className="w-5 h-5 text-gray-300" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-black truncate">
              {label}
            </p>
            {isVariant && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-medium">
                Variant
              </span>
            )}
            {!isVariant && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-300 font-medium flex items-center gap-1">
                <FaBolt className="w-2 h-2" />
                +1 Auto-Saved
              </span>
            )}
            {hasUnsavedExtra && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-300 font-medium flex items-center gap-1">
                <FaArrowUp className="w-2 h-2" />
                +{addedCount} unsaved
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5">
            {item.skuCode && (
              <span className="text-[10px] text-gray-500 font-mono">
                SKU: {item.skuCode}
              </span>
            )}
            {item.barcode && (
              <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1">
                <FaBarcode className="w-2.5 h-2.5" />
                {item.barcode}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-gray-500">Current Stock:</span>
            <span className="text-xs font-bold text-black">
              {item.currentStock}
            </span>
            {item.selectedColor && (
              <div className="flex items-center gap-1">
                <span
                  className="inline-block w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: item.selectedColor }}
                />
                <span className="text-[9px] text-gray-500">
                  {item.selectedColor}
                </span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => onRemove(item._id)}
          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
          title="Remove from list"
        >
          <FaTrashAlt className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-100 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <label className="text-xs font-medium text-gray-600">
            {isVariant ? 'Add Quantity:' : 'Add Extra Quantity:'}
          </label>

          <div className="flex items-center border border-black/20 rounded-lg overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => onDecrease(item._id)}
              disabled={addedCount <= 0}
              className="w-7 h-7 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Remove 1"
            >
              <FaMinus className="w-2.5 h-2.5 text-black" />
            </button>

            <input
              type="number"
              min="0"
              value={qtyInput}
              onChange={(e) => setQtyInput(e.target.value)}
              onBlur={commitQty}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  commitQty();
                  e.target.blur();
                }
              }}
              className="w-16 text-center text-sm py-1 focus:outline-none text-black font-medium"
            />

            <button
              type="button"
              onClick={() => onIncrease(item._id)}
              className="w-7 h-7 flex items-center justify-center hover:bg-gray-50"
              title="Add 1"
            >
              <FaPlus className="w-2.5 h-2.5 text-black" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500">
              {isVariant ? '→ New Stock:' : 'Stock now:'}
            </span>
            <span className="font-bold text-black">{newStockPreview}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isVariant && hasUnsavedExtra && (
            <button
              type="button"
              onClick={handleSaveExtra}
              disabled={saving}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm disabled:opacity-50"
              title="Save the extra quantity to inventory"
            >
              {saving ? (
                <FaSpinner className="w-3 h-3 animate-spin" />
              ) : (
                <FaSave className="w-3 h-3" />
              )}
              {saving ? 'Saving...' : 'Save Quantity'}
            </button>
          )}

          <button
            type="button"
            onClick={() => onEdit(item)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
            title="Edit product"
          >
            <FaEdit className="w-3 h-3" />
            Edit
          </button>
        </div>
      </div>

      {!isVariant && (
        <div className="mt-2 pt-2 border-t border-green-100 text-[11px] text-green-700 flex items-center gap-1.5 flex-wrap">
          <FaCheckCircle className="w-3 h-3" />
          <span>
            +1 already saved (Stock: <strong>{item.currentStock}</strong>).
          </span>
          {hasUnsavedExtra && (
            <span className="text-amber-700 font-medium">
              • Click <strong>Save Quantity</strong> to add the extra{' '}
              {addedCount}.
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Product Search Result Row
// ============================================================
function ProductSearchResult({ product, onAdd, onClose }) {
  const [expanded, setExpanded] = useState(false);

  const hasVariants =
    product.hasVariants && product.variantTypes?.length > 0;

  const baseImage =
    product.images?.[0]?.url ||
    (typeof product.images?.[0] === 'string' ? product.images[0] : '') ||
    '';

  return (
    <div className="border-b border-gray-100 last:border-0">
      <div
        className="p-3 hover:bg-gray-50 transition-colors cursor-pointer"
        onMouseDown={(e) => {
          e.preventDefault();
          if (hasVariants) {
            setExpanded((v) => !v);
          } else {
            onAdd({
              product,
              variant: null,
              subVariant: null,
            });
            onClose();
          }
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200">
            {baseImage ? (
              <img
                src={baseImage}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaImage className="w-4 h-4 text-gray-300" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-black truncate">
              {product.productName}
            </p>
            <div className="flex items-center gap-2 mt-0.5 text-[10px] text-gray-500">
              {product.skuCode && (
                <span className="font-mono">SKU: {product.skuCode}</span>
              )}
              {product.barcode && (
                <span className="font-mono flex items-center gap-1">
                  <FaBarcode className="w-2.5 h-2.5" />
                  {product.barcode}
                </span>
              )}
              <span>
                Stock:{' '}
                <span className="font-medium text-black">
                  {product.stockQuantity || 0}
                </span>
              </span>
            </div>
          </div>
          {hasVariants ? (
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-medium">
              {expanded ? 'Hide Variants' : 'Has Variants'}
            </span>
          ) : (
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200 font-medium flex items-center gap-1">
              <FaBolt className="w-2.5 h-2.5" />
              Instant +1
            </span>
          )}
        </div>
      </div>

      {expanded && hasVariants && (
        <div className="px-3 pb-3 bg-gray-50 border-t border-gray-100">
          {product.variantTypes.map((vt, vi) => (
            <div key={vi} className="mt-2">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                {vt.type}
              </p>
              <div className="space-y-1">
                {(vt.variants || []).map((variant, vIdx) => (
                  <div key={vIdx}>
                    <div
                      onMouseDown={(e) => {
                        e.preventDefault();
                        onAdd({
                          product,
                          variant,
                          subVariant: null,
                        });
                        onClose();
                      }}
                      className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200 hover:border-black/40 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {variant.color && (
                          <span
                            className="w-3 h-3 rounded-full border border-gray-300 flex-shrink-0"
                            style={{ backgroundColor: variant.color }}
                          />
                        )}
                        <span className="text-xs font-medium text-black truncate">
                          {variant.name}
                        </span>
                        {variant.skuCode && (
                          <span className="text-[9px] text-gray-400 font-mono">
                            {variant.skuCode}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[10px] text-gray-500">
                          Stock:{' '}
                          <span className="font-medium text-black">
                            {variant.stockQuantity || 0}
                          </span>
                        </span>
                        <FaPlus className="w-3 h-3 text-black" />
                      </div>
                    </div>

                    {(variant.subVariants || []).length > 0 && (
                      <div className="pl-4 mt-1 space-y-1">
                        {variant.subVariants.map((sub, sIdx) => (
                          <div
                            key={sIdx}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              onAdd({
                                product,
                                variant,
                                subVariant: sub,
                              });
                              onClose();
                            }}
                            className="flex items-center justify-between p-1.5 bg-white rounded-md border border-gray-200 hover:border-black/40 cursor-pointer transition-all"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {sub.color && (
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-gray-300 flex-shrink-0"
                                  style={{ backgroundColor: sub.color }}
                                />
                              )}
                              <span className="text-[11px] text-gray-700 truncate">
                                {sub.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-[9px] text-gray-500">
                                Stock:{' '}
                                <span className="font-medium text-black">
                                  {sub.stockQuantity || 0}
                                </span>
                              </span>
                              <FaPlus className="w-2.5 h-2.5 text-black" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Main Restock Page
// ============================================================
export default function RestockPage() {
  const [activeTab, setActiveTab] = useState('restock');
  const [historyItem, setHistoryItem] = useState(null);

  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [saving, setSaving] = useState(false);
  const [scanBuffer, setScanBuffer] = useState('');
  const [scannerActive, setScannerActive] = useState(false);
  const [recentScans, setRecentScans] = useState([]);

  const scanBufferRef = useRef('');
  const scanTimerRef = useRef(null);
  const searchTimerRef = useRef(null);
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  // ✅ Synchronous guards against duplicate submissions
  const submittingRef = useRef(false);
  const saveExtraRef = useRef(false);
  const simpleAddRef = useRef(false);

  // Persist items
  useEffect(() => {
    try {
      const saved = localStorage.getItem('restock_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch (e) {
      console.error('Failed to load restock cart:', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('restock_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to persist restock cart:', e);
    }
  }, [items]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target)
      ) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Barcode scanner — only on Restock tab
  useEffect(() => {
    if (activeTab !== 'restock') return;

    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName;
      const isTyping =
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        document.activeElement?.isContentEditable;

      if (isTyping) return;

      if (e.key === 'Enter' || e.key === 'Tab') {
        if (e.key === 'Tab') e.preventDefault();
        const code = scanBufferRef.current.trim();
        if (code && code.length >= 4) {
          handleBarcodeScanned(code);
        }
        scanBufferRef.current = '';
        setScanBuffer('');
        setScannerActive(false);
        if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
        return;
      }

      if (!/^[a-zA-Z0-9-]$/.test(e.key)) return;

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

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Backend helpers
  const fetchProductByBarcode = async (code) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${API_URL}/api/products/barcode/${encodeURIComponent(code)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) return null;
      const json = await res.json();
      if (json.success && json.data) return json.data;
      return null;
    } catch (e) {
      console.error('Barcode fetch failed:', e);
      return null;
    }
  };

  const saveToBackend = async ({
    productId,
    variantId,
    subVariantId,
    addQuantity,
  }) => {
    try {
      const token = localStorage.getItem('token');
      const requestId = generateRequestId();

      const res = await fetch(`${API_URL}/api/products/restock-bulk`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId,
          items: [
            {
              productId,
              variantId,
              subVariantId,
              addQuantity,
            },
          ],
        }),
      });
      const json = await res.json();
      if (json.success && json.data?.updatedCount > 0) {
        return { success: true, result: json.data.results?.[0] };
      }
      return { success: false, error: json.error || 'Failed' };
    } catch (e) {
      console.error('Save to backend error:', e);
      return { success: false, error: 'Network error' };
    }
  };

  // Search
  const searchProducts = async (query) => {
    const term = query.trim();
    if (!term) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setSearching(true);
    try {
      const token = localStorage.getItem('token');
      const qp = new URLSearchParams({ search: term, limit: 12 });
      const res = await fetch(`${API_URL}/api/products?${qp}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        setSearchResults(json.data || []);
        setShowSearchResults(true);
      }
    } catch (e) {
      console.error('Search failed:', e);
      toast.error('Search failed');
    } finally {
      setSearching(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => searchProducts(value), 400);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
    if (searchInputRef.current) searchInputRef.current.focus();
  };

  // Barcode scan
  const handleBarcodeScanned = async (code) => {
    const toastId = toast.loading(`Looking up: ${code}`);

    const product = await fetchProductByBarcode(code);

    if (!product) {
      toast.error(`No product found for barcode: ${code}`, { id: toastId });
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
      toast.dismiss(toastId);
      await handleSimpleProductAdd(product);
      return;
    }

    if (matched) {
      toast.dismiss(toastId);
      handleVariantAdd({
        product,
        variant: matched.variant,
        subVariant: matched.subVariant,
      });
      return;
    }

    toast.info(
      `"${product.productName}" has variants. Pick one from search.`,
      { id: toastId }
    );
    setSearchQuery(product.productName);
    setSearchResults([product]);
    setShowSearchResults(true);
  };

  // Simple product: auto-save +1
  const handleSimpleProductAdd = async (product) => {
    if (simpleAddRef.current) return; // ✅ prevent scanner double-fire
    simpleAddRef.current = true;

    try {
      const productId = product._id;

      const saveResult = await saveToBackend({
        productId,
        variantId: null,
        subVariantId: null,
        addQuantity: 1,
      });

      if (!saveResult.success) {
        toast.error(saveResult.error || 'Failed to update stock');
        return;
      }

      const newStock = saveResult.result?.newStock;

      const image =
        product.images?.[0]?.url ||
        (typeof product.images?.[0] === 'string' ? product.images[0] : '') ||
        '';

      setItems((prev) => {
        const idx = prev.findIndex(
          (it) =>
            it.productId === productId &&
            !it.variantId &&
            !it.subVariantId
        );

        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = {
            ...updated[idx],
            currentStock:
              typeof newStock === 'number'
                ? newStock
                : updated[idx].currentStock + 1,
          };
          return updated;
        }

        return [
          ...prev,
          {
            _id: `${productId}-base-base-${Date.now()}`,
            productId,
            variantId: null,
            subVariantId: null,
            productName: product.productName,
            variantName: '',
            subVariantName: '',
            skuCode: product.skuCode || '',
            barcode: product.barcode || '',
            image,
            selectedColor: product.colors?.[0] || '',
            currentStock:
              typeof newStock === 'number'
                ? newStock
                : Number(product.stockQuantity) || 0,
            addQuantity: 0,
          },
        ];
      });

      toast.success(`+1 → ${product.productName} (stock saved)`, {
        duration: 1800,
      });

      setRecentScans((prev) =>
        [
          {
            code: product.barcode || product.skuCode || productId,
            productName: product.productName,
            variantName: '',
            subVariantName: '',
            timestamp: new Date(),
          },
          ...prev.slice(0, 4),
        ].slice(0, 5)
      );
    } finally {
      simpleAddRef.current = false;
    }
  };

  // Variant product: add to cart only
  const handleVariantAdd = ({ product, variant, subVariant }) => {
    const productId = product._id;
    const variantId = variant?.id || variant?._id || null;
    const subVariantId = subVariant?.id || subVariant?._id || null;

    let currentStock = 0;
    let image = '';
    let skuCode = '';
    let barcode = '';
    let variantName = '';
    let subVariantName = '';
    let selectedColor = '';

    if (variant && !subVariant) {
      currentStock = Number(variant.stockQuantity) || 0;
      image = variant.imagePreviews?.[0] || variant.images?.[0] || '';
      skuCode = variant.skuCode || '';
      barcode = variant.barcode || '';
      variantName = variant.name || '';
      selectedColor = variant.color || '';
    } else if (subVariant) {
      currentStock = Number(subVariant.stockQuantity) || 0;
      image = subVariant.imagePreviews?.[0] || subVariant.images?.[0] || '';
      skuCode = subVariant.skuCode || '';
      barcode = subVariant.barcode || '';
      variantName = variant?.name || '';
      subVariantName = subVariant.name || '';
      selectedColor = subVariant.color || variant?.color || '';
    }

    if (image && typeof image === 'object') image = image.url || '';

    const displayLabel = [product.productName, variantName, subVariantName]
      .filter(Boolean)
      .join(' / ');

    setItems((prev) => {
      const existing = prev.find(
        (it) =>
          it.productId === productId &&
          it.variantId === variantId &&
          it.subVariantId === subVariantId
      );

      if (existing) {
        const newQty = (existing.addQuantity || 0) + 1;
        toast.success(`+1 → ${displayLabel} (now ${newQty})`, {
          duration: 1800,
        });
        return prev.map((it) =>
          it === existing ? { ...it, addQuantity: newQty } : it
        );
      }

      toast.success(`Added: ${displayLabel}`, { duration: 1800 });
      return [
        ...prev,
        {
          _id: `${productId}-${variantId || 'base'}-${
            subVariantId || 'base'
          }-${Date.now()}`,
          productId,
          variantId,
          subVariantId,
          productName: product.productName,
          variantName,
          subVariantName,
          skuCode,
          barcode,
          image,
          selectedColor,
          currentStock,
          addQuantity: 1,
        },
      ];
    });

    setRecentScans((prev) =>
      [
        {
          code: barcode || skuCode || productId,
          productName: product.productName,
          variantName,
          subVariantName,
          timestamp: new Date(),
        },
        ...prev.slice(0, 4),
      ].slice(0, 5)
    );
  };

  // Quantity controls
  const increaseQty = (id) => {
    setItems((prev) =>
      prev.map((it) =>
        it._id === id
          ? { ...it, addQuantity: (it.addQuantity || 0) + 1 }
          : it
      )
    );
  };

  const decreaseQty = (id) => {
    setItems((prev) =>
      prev.map((it) =>
        it._id === id
          ? { ...it, addQuantity: Math.max(0, (it.addQuantity || 0) - 1) }
          : it
      )
    );
  };

  const setQty = (id, qty) => {
    setItems((prev) =>
      prev.map((it) => (it._id === id ? { ...it, addQuantity: qty } : it))
    );
  };

  // Save Extra Quantity (simple products only)
  const saveExtraQuantity = async (item) => {
    if (saveExtraRef.current) return; // ✅ block duplicate clicks
    const qty = item.addQuantity || 0;
    if (qty <= 0) {
      toast.error('No quantity to save');
      return;
    }

    saveExtraRef.current = true;
    try {
      const saveResult = await saveToBackend({
        productId: item.productId,
        variantId: null,
        subVariantId: null,
        addQuantity: qty,
      });

      if (!saveResult.success) {
        toast.error(saveResult.error || 'Failed to save quantity');
        return;
      }

      const newStock = saveResult.result?.newStock;

      setItems((prev) =>
        prev.map((it) =>
          it._id === item._id
            ? {
                ...it,
                addQuantity: 0,
                currentStock:
                  typeof newStock === 'number'
                    ? newStock
                    : it.currentStock + qty,
              }
            : it
        )
      );

      toast.success(`+${qty} saved → ${item.productName}`, { duration: 1800 });
    } finally {
      saveExtraRef.current = false;
    }
  };

  const removeItem = (id) => {
    const item = items.find((it) => it._id === id);
    if (!item) return;

    const isVariant = !!(item.variantId || item.subVariantId);

    if (!isVariant && (item.addQuantity || 0) > 0) {
      if (
        !confirm(
          `This product has ${item.addQuantity} unsaved extra quantity. Removing will lose it. Continue?`
        )
      ) {
        return;
      }
    } else if (!isVariant) {
      if (
        !confirm(
          "This product's +1 was already saved. Removing it from the list won't undo the stock change. Continue?"
        )
      ) {
        return;
      }
    }

    setItems((prev) => prev.filter((it) => it._id !== id));
    toast.success('Removed');
  };

  const clearCart = () => {
    if (items.length === 0) return;
    if (!confirm('Clear all items from the restock list?')) return;
    setItems([]);
    toast.success('Restock list cleared');
  };

  const handleEdit = (item) => {
    window.open(`/authorize/editProduct?id=${item.productId}`, '_blank');
  };

  // ✅ Submit — with synchronous lock
  const handleSubmit = async () => {
    if (submittingRef.current) return; // ✅ block duplicate submissions

    const variantItems = items.filter(
      (it) =>
        (it.variantId || it.subVariantId) && (it.addQuantity || 0) > 0
    );

    if (variantItems.length === 0) {
      toast.info('No pending variants to submit.');
      return;
    }

    submittingRef.current = true;
    setSaving(true);
    const toastId = toast.loading('Updating variant stock...');

    try {
      const token = localStorage.getItem('token');
      const requestId = generateRequestId(); // ✅ new id per submit

      const payload = {
        requestId,
        items: variantItems.map((it) => ({
          productId: it.productId,
          variantId: it.variantId,
          subVariantId: it.subVariantId,
          addQuantity: it.addQuantity,
        })),
      };

      const res = await fetch(`${API_URL}/api/products/restock-bulk`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json.success) {
        toast.success(
          `Stock updated for ${
            json.data?.updatedCount || variantItems.length
          } variant(s)`,
          { id: toastId, duration: 4000 }
        );
        setItems((prev) =>
          prev.filter(
            (it) =>
              !(
                (it.variantId || it.subVariantId) &&
                (it.addQuantity || 0) > 0
              )
          )
        );
      } else {
        toast.error(json.error || 'Failed to update stock', { id: toastId });
      }
    } catch (e) {
      console.error('Restock submit error:', e);
      toast.error('Network error', { id: toastId });
    } finally {
      setSaving(false);
      submittingRef.current = false; // ✅ release lock
    }
  };

  const totalItems = items.length;
  const totalUnits = items.reduce((sum, it) => sum + (it.addQuantity || 0), 0);
  const pendingVariantCount = items.filter(
    (it) => (it.variantId || it.subVariantId) && (it.addQuantity || 0) > 0
  ).length;
  const pendingSimpleCount = items.filter(
    (it) =>
      !it.variantId && !it.subVariantId && (it.addQuantity || 0) > 0
  ).length;

  return (
    <ProtectedRoute pageKey="restock">
      <div className="min-h-screen bg-gray-50 pb-24">
        {/* HEADER */}
        <div className="bg-white border-b border-black/10 sticky top-0 z-30 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-black to-[#485442] rounded-xl flex items-center justify-center shadow-md">
                  <FaBox className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-bold text-black">
                    Restock Inventory
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Simple products save instantly · Variants submit together
                  </p>
                </div>
              </div>

              {activeTab === 'restock' && (
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all ${
                    scannerActive
                      ? 'bg-green-50 border-green-400 text-green-700'
                      : 'bg-gray-50 border-gray-200 text-gray-500'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      scannerActive
                        ? 'bg-green-500 animate-pulse'
                        : 'bg-gray-400'
                    }`}
                  />
                  {scannerActive ? 'Scanner Active' : 'Ready to Scan'}
                </div>
              )}
            </div>

            {/* TABS */}
            <div className="mt-4 flex items-center gap-1 border-b border-gray-200 -mb-4">
              <button
                onClick={() => setActiveTab('restock')}
                className={`px-4 py-2.5 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === 'restock'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-black'
                }`}
              >
                <FaBox className="w-3.5 h-3.5" />
                Restock
                {totalItems > 0 && (
                  <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded-full bg-black text-white font-semibold">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2.5 text-sm font-medium flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === 'history'
                    ? 'border-black text-black'
                    : 'border-transparent text-gray-500 hover:text-black'
                }`}
              >
                <FaHistory className="w-3.5 h-3.5" />
                Restock History
              </button>
            </div>

            {scannerActive && activeTab === 'restock' && (
              <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                <FaBarcode className="w-4 h-4 text-green-600" />
                <span className="text-xs text-green-700 font-mono">
                  Scanning: {scanBuffer}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* TAB: RESTOCK */}
          {activeTab === 'restock' && (
            <>
              <div className="bg-white rounded-2xl border border-black/10 shadow-sm p-4 mb-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaInfoCircle className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-xs text-blue-800 leading-relaxed space-y-0.5">
                    <p>
                      <FaBolt className="inline w-3 h-3 text-green-600 mr-1" />
                      <strong>Simple products</strong> → +1 saved instantly on
                      scan. Add extra via +/−, then click{' '}
                      <strong>Save Quantity</strong>.
                    </p>
                    <p>
                      <strong>Variant products</strong> → pick a variant;
                      submit when ready.
                    </p>
                  </div>
                </div>

                <div className="relative" ref={dropdownRef}>
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-10 pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => {
                      if (searchResults.length > 0)
                        setShowSearchResults(true);
                    }}
                    placeholder="Search by product name, SKU, or barcode..."
                    className="w-full pl-10 pr-10 py-3 text-sm border border-black/15 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black placeholder:text-gray-400"
                  />
                  {searching && (
                    <FaSpinner className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-black" />
                  )}
                  {!searching && searchQuery && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                    >
                      <FaTimes className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {showSearchResults && (
                    <div
                      className="absolute left-0 right-0 top-full mt-2 bg-white border border-black/15 rounded-xl shadow-xl z-50 max-h-[420px] overflow-y-auto"
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {searchResults.length === 0 ? (
                        <div className="p-6 text-center text-xs text-gray-500">
                          No products found for "{searchQuery}"
                        </div>
                      ) : (
                        searchResults.map((product) => (
                          <ProductSearchResult
                            key={product._id}
                            product={product}
                            onAdd={(args) => {
                              const hasVariants =
                                args.product?.hasVariants &&
                                args.product?.variantTypes?.length > 0;
                              if (hasVariants && args.variant) {
                                handleVariantAdd(args);
                              } else {
                                handleSimpleProductAdd(args.product);
                              }
                            }}
                            onClose={() => {
                              setShowSearchResults(false);
                              setSearchQuery('');
                            }}
                          />
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              {recentScans.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Recent Scans
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentScans.map((scan, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-black/10 rounded-full text-xs"
                      >
                        <FaCheckCircle className="w-3 h-3 text-green-500" />
                        <span className="text-gray-700">
                          {[
                            scan.productName,
                            scan.variantName,
                            scan.subVariantName,
                          ]
                            .filter(Boolean)
                            .join(' / ')}
                        </span>
                        <span className="text-gray-400 font-mono text-[10px]">
                          {scan.code}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden">
                <div className="px-4 py-3 border-b border-black/10 bg-gray-50 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <FaBox className="w-4 h-4 text-black" />
                    <h2 className="text-sm font-semibold text-black">
                      Restock List
                    </h2>
                    <span className="text-xs text-gray-500">
                      ({totalItems} item{totalItems !== 1 ? 's' : ''},{' '}
                      {totalUnits} extra unit{totalUnits !== 1 ? 's' : ''})
                    </span>
                    {pendingVariantCount > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-medium">
                        {pendingVariantCount} variant(s) pending
                      </span>
                    )}
                    {pendingSimpleCount > 0 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-300 font-medium">
                        {pendingSimpleCount} simple item(s) with unsaved qty
                      </span>
                    )}
                  </div>
                  {items.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
                    >
                      <FaTrashAlt className="w-3 h-3" />
                      Clear All
                    </button>
                  )}
                </div>

                <div className="p-4">
                  {items.length === 0 ? (
                    <div className="text-center py-12">
                      <FaBarcode className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500 font-medium">
                        No items in restock list
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Scan a barcode or search for products to add them here
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {items.map((item) => (
                        <RestockRow
                          key={item._id}
                          item={item}
                          onIncrease={increaseQty}
                          onDecrease={decreaseQty}
                          onSetQty={setQty}
                          onRemove={removeItem}
                          onEdit={handleEdit}
                          onSaveExtra={saveExtraQuantity}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* TAB: HISTORY */}
          {activeTab === 'history' && (
            <RestockHistoryTab onViewHistory={setHistoryItem} />
          )}
        </div>

        {/* STICKY FOOTER — only on Restock tab */}
        {activeTab === 'restock' && items.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-black/10 shadow-2xl">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3 flex-wrap">
              <div className="text-xs text-gray-600">
                <span className="font-bold text-black">{totalItems}</span>{' '}
                item(s) ·{' '}
                <span className="font-bold text-black">{totalUnits}</span>{' '}
                extra unit(s)
                {pendingVariantCount > 0 && (
                  <span className="ml-2 text-amber-600">
                    · {pendingVariantCount} variant pending
                  </span>
                )}
                {pendingSimpleCount > 0 && (
                  <span className="ml-2 text-green-600">
                    · {pendingSimpleCount} simple unsaved
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={clearCart}
                  disabled={saving}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  <FaUndo className="w-3.5 h-3.5" />
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={saving || pendingVariantCount === 0}
                  className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-xl hover:bg-[#485442] transition-all text-sm font-medium shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <FaSpinner className="w-4 h-4 animate-spin" />
                  ) : (
                    <FaSave className="w-4 h-4" />
                  )}
                  {saving
                    ? 'Updating...'
                    : pendingVariantCount > 0
                    ? `Submit ${pendingVariantCount} Variant(s)`
                    : 'All Saved'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* HISTORY MODAL */}
        {historyItem && (
          <RestockHistoryModal
            item={historyItem}
            onClose={() => setHistoryItem(null)}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}