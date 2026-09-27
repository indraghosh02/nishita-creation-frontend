
// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { motion, AnimatePresence } from 'framer-motion';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import { 
//   FaSearch, 
//   FaPhone, 
//   FaBox, 
//   FaClock, 
//   FaCheckCircle, 
//   FaTruck, 
//   FaMapMarkerAlt, 
//   FaShoppingBag,
//   FaChevronDown,
//   FaChevronUp,
//   FaMoneyBillWave,
//   FaCreditCard,
//   FaExclamationTriangle,
//   FaShippingFast,
//   FaCheckDouble,
//   FaBan,
//   FaSpinner,
//   FaGift,
//   FaUser,
//   FaCalendarAlt,
//   FaDownload,
//   FaFileInvoice,
//   FaHeart,
//   FaStar,
//   FaEnvelope,
//   FaWhatsapp,
//   FaShieldAlt,
//   FaExternalLinkAlt,
//   FaUndo,
//   FaPhoneAlt,
//   FaCheck,
//   FaBoxOpen,
//   FaClipboardCheck,
//   FaChevronLeft,
//   FaChevronRight,
//   FaPause
// } from 'react-icons/fa';
// import { toast } from 'sonner';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';
// import { generateInvoicePDF } from '@/utils/invoicePDF';

// // ========== FONT CONSTANTS - BEAUTY BUCKET THEME ==========
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_PLAYFAIR = " serif";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// // ========== FETCH FOOTER DATA ==========
// const fetchFooterData = async () => {
//   try {
//     const response = await fetch(`${API_URL}/api/footer`);
//     if (!response.ok) throw new Error('Failed to fetch footer data');
//     const data = await response.json();
//     if (data.success && data.data) {
//       return data.data;
//     }
//     return null;
//   } catch (error) {
//     console.error('Error fetching footer data:', error);
//     return null;
//   }
// };

// // ========== GET CONTACT ITEMS FROM FOOTER DATA ==========
// const getContactItemsFromFooter = (footerData) => {
//   if (!footerData) {
//     return [
//       { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-[#77896F]' },
//       { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-[#77896F]' },
//       { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-green-500' }
//     ];
//   }

//   const contacts = [];
//   const company = footerData.company || {};
//   const contactColumn = footerData.columns?.find(col => col.type === 'contact');
//   const items = contactColumn?.items || [];

//   const phoneItem = items.find(item => item.type === 'phone');
//   if (phoneItem) {
//     const cleanPhone = phoneItem.value.replace(/[^0-9+]/g, '');
//     contacts.push({
//       icon: FaPhone,
//       label: 'Phone',
//       value: phoneItem.value,
//       link: `tel:${cleanPhone}`,
//       color: 'text-[#77896F]'
//     });
//   } else if (company.phone) {
//     const cleanPhone = company.phone.replace(/[^0-9+]/g, '');
//     contacts.push({
//       icon: FaPhone,
//       label: 'Phone',
//       value: company.phone,
//       link: `tel:${cleanPhone}`,
//       color: 'text-[#77896F]'
//     });
//   }

//   const emailItem = items.find(item => item.type === 'email');
//   if (emailItem) {
//     contacts.push({
//       icon: FaEnvelope,
//       label: 'Email',
//       value: emailItem.value,
//       link: `mailto:${emailItem.value}`,
//       color: 'text-[#77896F]'
//     });
//   } else if (company.email) {
//     contacts.push({
//       icon: FaEnvelope,
//       label: 'Email',
//       value: company.email,
//       link: `mailto:${company.email}`,
//       color: 'text-[#77896F]'
//     });
//   }

//   const whatsappItem = items.find(item => item.type === 'whatsapp');
//   if (whatsappItem) {
//     const cleanPhone = whatsappItem.value.replace(/[^0-9+]/g, '');
//     contacts.push({
//       icon: FaWhatsapp,
//       label: 'WhatsApp',
//       value: whatsappItem.value,
//       link: `https://wa.me/${cleanPhone}`,
//       color: 'text-green-500'
//     });
//   } else if (company.whatsapp) {
//     const cleanPhone = company.whatsapp.replace(/[^0-9+]/g, '');
//     contacts.push({
//       icon: FaWhatsapp,
//       label: 'WhatsApp',
//       value: company.whatsapp,
//       link: `https://wa.me/${cleanPhone}`,
//       color: 'text-green-500'
//     });
//   }

//   if (contacts.length === 0) {
//     contacts.push(
//       { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-[#77896F]' },
//       { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-[#77896F]' },
//       { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-green-500' }
//     );
//   }

//   return contacts;
// };

// // ========== STATUS CONFIG - Green Theme ==========
// const STATUS_CONFIG = {
//   'placed': { label: 'Order Placed', icon: FaBox, color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', textColor: 'text-[#77896F]', bgColor: 'bg-[#f0f5ed]', borderColor: 'border-[#77896F]/20' },
//   'follow_up': { label: 'Follow Up', icon: FaPhoneAlt, color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', textColor: 'text-[#77896F]', bgColor: 'bg-[#f0f5ed]', borderColor: 'border-[#77896F]/20' },
//   'reminder': { label: 'Reminder', icon: FaClock, color: 'bg-yellow-500', textColor: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
//   'accepted': { label: 'Accepted', icon: FaCheckCircle, color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', textColor: 'text-[#77896F]', bgColor: 'bg-[#f0f5ed]', borderColor: 'border-[#77896F]/20' },
//   'approved': { label: 'Approved', icon: FaClipboardCheck, color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', textColor: 'text-[#77896F]', bgColor: 'bg-[#f0f5ed]', borderColor: 'border-[#77896F]/20' },
//   'hold': { label: 'On Hold', icon: FaPause, color: 'bg-yellow-500', textColor: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
//   'ready_to_ship': { label: 'Ready to Ship', icon: FaBoxOpen, color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', textColor: 'text-[#77896F]', bgColor: 'bg-[#f0f5ed]', borderColor: 'border-[#77896F]/20' },
//   'courier_assigned': { label: 'Assigned to Courier', icon: FaTruck, color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', textColor: 'text-[#77896F]', bgColor: 'bg-[#f0f5ed]', borderColor: 'border-[#77896F]/20' },
//   'processing': { label: 'Processing', icon: FaSpinner, color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', textColor: 'text-[#77896F]', bgColor: 'bg-[#f0f5ed]', borderColor: 'border-[#77896F]/20' },
//   'shipped': { label: 'Shipped', icon: FaShippingFast, color: 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]', textColor: 'text-[#77896F]', bgColor: 'bg-[#f0f5ed]', borderColor: 'border-[#77896F]/20' },
//   'out_for_delivery': { label: 'Out for Delivery', icon: FaTruck, color: 'bg-orange-500', textColor: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
//   'delivered': { label: 'Delivered', icon: FaCheckDouble, color: 'bg-green-500', textColor: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' },
//   'cancelled': { label: 'Cancelled', icon: FaBan, color: 'bg-red-500', textColor: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
//   'rejected': { label: 'Rejected', icon: FaBan, color: 'bg-red-500', textColor: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
//   'refunded': { label: 'Refunded', icon: FaBan, color: 'bg-yellow-500', textColor: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' },
//   'failed': { label: 'Failed', icon: FaExclamationTriangle, color: 'bg-red-500', textColor: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
//   'returned': { label: 'Returned', icon: FaUndo, color: 'bg-purple-500', textColor: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
//   'partial_delivery': { label: 'Partial Delivery', icon: FaBox, color: 'bg-yellow-500', textColor: 'text-yellow-600', bgColor: 'bg-yellow-50', borderColor: 'border-yellow-200' }
// };

// // ========== GET STATUS BADGE COLOR ==========
// const getStatusBadgeColor = (status) => {
//   const colors = {
//     'placed': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
//     'follow_up': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
//     'reminder': 'text-yellow-600 bg-yellow-50 border-yellow-200',
//     'accepted': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
//     'approved': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
//     'hold': 'text-yellow-600 bg-yellow-50 border-yellow-200',
//     'ready_to_ship': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
//     'courier_assigned': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
//     'processing': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
//     'shipped': 'text-[#77896F] bg-[#f0f5ed] border-[#77896F]/20',
//     'out_for_delivery': 'text-orange-600 bg-orange-50 border-orange-200',
//     'delivered': 'text-green-600 bg-green-50 border-green-200',
//     'cancelled': 'text-red-600 bg-red-50 border-red-200',
//     'rejected': 'text-red-600 bg-red-50 border-red-200',
//     'refunded': 'text-yellow-600 bg-yellow-50 border-yellow-200',
//     'failed': 'text-red-600 bg-red-50 border-red-200',
//     'returned': 'text-purple-600 bg-purple-50 border-purple-200',
//     'partial_delivery': 'text-yellow-600 bg-yellow-50 border-yellow-200'
//   };
//   return colors[status] || 'text-gray-600 bg-gray-100 border-gray-200';
// };

// // ========== GET STATUS LABEL ==========
// const getStatusLabel = (status) => {
//   return STATUS_CONFIG[status]?.label || status;
// };

// // ========== GET PAYMENT METHOD BADGE ==========
// const getPaymentMethodBadge = (method) => {
//   const methods = {
//     'cod': { label: 'Cash on Delivery', color: 'bg-[#f0f5ed] text-[#77896F] border-[#77896F]/20', icon: FaMoneyBillWave },
//     'online': { label: 'Online Payment', color: 'bg-[#f0f5ed] text-[#77896F] border-[#77896F]/20', icon: FaCreditCard },
//     'bkash': { label: 'bKash', color: 'bg-[#f0f5ed] text-[#77896F] border-[#77896F]/20', icon: FaMoneyBillWave },
//     'nagad': { label: 'Nagad', color: 'bg-[#f0f5ed] text-[#77896F] border-[#77896F]/20', icon: FaMoneyBillWave }
//   };
//   const info = methods[method] || { label: method || 'Unknown', color: 'bg-gray-100 text-gray-700 border-gray-200', icon: FaMoneyBillWave };
//   const Icon = info.icon;
//   return (
//     <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${info.color}`} style={{ fontFamily: FONT_FAMILY }}>
//       <Icon className="w-3 h-3" />
//       {info.label}
//     </span>
//   );
// };

// // ========== GROUP ITEMS BY PRODUCT (NESTED variantDetails SUPPORT) ==========
// const groupItemsByProduct = (items) => {
//   if (!items || items.length === 0) return [];

//   const grouped = {};

//   items.forEach((item, index) => {
//     let productId = item.productId;
//     if (productId && typeof productId === 'object' && productId._id) {
//       productId = productId._id.toString();
//     } else if (productId) {
//       productId = productId.toString();
//     } else {
//       productId = `item-${index}`;
//     }

//     const productName = item.productName || item.name || item.product?.name || 'Unknown Product';
//     const image = item.image || item.product?.images?.[0]?.url || '';
//     const unit = item.unit || 'pcs';

//     if (!grouped[productId]) {
//       grouped[productId] = {
//         productId,
//         productName,
//         image,
//         unit,
//         basePrice: item.discountPrice || item.regularPrice || 0,
//         regularPrice: item.regularPrice || 0,
//         discountPrice: item.discountPrice || 0,
//         baseRows: [],
//         variantRows: [],
//         colors: [],
//         totalQuantity: 0
//       };
//     }

//     const hasValidColor = item.selectedColor &&
//       item.selectedColor !== 'null' &&
//       item.selectedColor !== '' &&
//       item.selectedColor !== 'undefined';

//     // ============================================================
//     // ✅ CASE 1: NESTED variantDetails[] (from Order schema)
//     // ============================================================
//     if (item.variantDetails && Array.isArray(item.variantDetails) && item.variantDetails.length > 0) {
//       item.variantDetails.forEach(variant => {
//         const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;

//         const variantPrice = variant.variantDiscountPrice > 0
//           ? Number(variant.variantDiscountPrice)
//           : Number(variant.variantRegularPrice) || 0;
//         const variantOriginalPrice = Number(variant.variantRegularPrice) || 0;
//         const variantHasDiscount = variantPrice > 0 && variantOriginalPrice > variantPrice;

//         if (hasSubVariants) {
//           // Variant header row (only shows if it has its own quantity OR acts as header)
//           const isHeaderOnly = (variant.quantity || 0) === 0;

//           grouped[productId].variantRows.push({
//             type: 'variant',
//             variantId: variant.variantId,
//             variantName: variant.variantName || 'Variant',
//             subVariantId: null,
//             subVariantName: null,
//             selectedColor: variant.selectedColor || null,
//             quantity: variant.quantity || 0,
//             price: variantPrice,
//             originalPrice: variantOriginalPrice,
//             hasDiscount: variantHasDiscount,
//             image: variant.image || '',
//             unit: item.unit || 'pcs',
//             isSubVariant: false,
//             isVariant: true,
//             isHeader: isHeaderOnly
//           });

//           if (variant.quantity > 0) {
//             grouped[productId].totalQuantity += variant.quantity;
//           }

//           // Sub-variant rows
//           variant.subVariants.forEach(sub => {
//             const subPrice = sub.subVariantDiscountPrice > 0
//               ? Number(sub.subVariantDiscountPrice)
//               : Number(sub.subVariantRegularPrice) || 0;
//             const subOriginalPrice = Number(sub.subVariantRegularPrice) || 0;
//             const subHasDiscount = subPrice > 0 && subOriginalPrice > subPrice;

//             grouped[productId].variantRows.push({
//               type: 'subVariant',
//               variantId: variant.variantId,
//               variantName: variant.variantName || 'Variant',
//               subVariantId: sub.subVariantId,
//               subVariantName: sub.subVariantName || 'Sub-Variant',
//               selectedColor: sub.selectedColor || variant.selectedColor || null,
//               quantity: sub.quantity || 0,
//               price: subPrice,
//               originalPrice: subOriginalPrice,
//               hasDiscount: subHasDiscount,
//               image: sub.image || variant.image || '',
//               unit: item.unit || 'pcs',
//               isSubVariant: true,
//               isVariant: false
//             });

//             grouped[productId].totalQuantity += sub.quantity || 0;
//           });
//         } else {
//           // Plain variant
//           grouped[productId].variantRows.push({
//             type: 'variant',
//             variantId: variant.variantId,
//             variantName: variant.variantName || 'Variant',
//             subVariantId: null,
//             subVariantName: null,
//             selectedColor: variant.selectedColor || null,
//             quantity: variant.quantity || 0,
//             price: variantPrice,
//             originalPrice: variantOriginalPrice,
//             hasDiscount: variantHasDiscount,
//             image: variant.image || '',
//             unit: item.unit || 'pcs',
//             isSubVariant: false,
//             isVariant: true
//           });

//           grouped[productId].totalQuantity += variant.quantity || 0;
//         }
//       });

//       return;
//     }

//     // ============================================================
//     // ✅ CASE 2: FLAT VARIANT FIELDS (fallback for older data)
//     // ============================================================
//     const isSubVariant = !!(item.subVariantId && item.subVariantId !== 'null' && item.subVariantId !== '');
//     const isVariant = !!(item.variantId && item.variantId !== 'null' && item.variantId !== '');

//     if (isVariant || isSubVariant) {
//       const variantPrice = item.variantDiscountPrice > 0
//         ? Number(item.variantDiscountPrice)
//         : Number(item.variantRegularPrice) > 0
//           ? Number(item.variantRegularPrice)
//           : Number(item.discountPrice) || Number(item.regularPrice) || 0;

//       const originalPrice = Number(item.variantRegularPrice) > 0
//         ? Number(item.variantRegularPrice)
//         : Number(item.regularPrice) || 0;

//       const hasDiscount = originalPrice > 0 && variantPrice > 0 && variantPrice < originalPrice;

//       grouped[productId].variantRows.push({
//         type: isSubVariant ? 'subVariant' : 'variant',
//         itemId: item._id,
//         variantId: item.variantId || null,
//         variantName: item.variantName || 'Variant',
//         subVariantId: item.subVariantId || null,
//         subVariantName: item.subVariantName || null,
//         selectedColor: hasValidColor ? item.selectedColor : null,
//         quantity: item.quantity || 0,
//         price: variantPrice,
//         originalPrice,
//         hasDiscount,
//         image: item.variantImage || item.image || '',
//         unit: item.unit || 'pcs',
//         isSubVariant,
//         isVariant: !isSubVariant
//       });

//       grouped[productId].totalQuantity += item.quantity || 0;
//       return;
//     }

//     // ============================================================
//     // ✅ CASE 3: COLOR ITEMS (no variants)
//     // ============================================================
//     if (item.colors && Array.isArray(item.colors) && item.colors.length > 0) {
//       const validColors = item.colors.filter(c =>
//         c.color && c.color !== 'null' && c.color !== '' && c.color !== 'undefined'
//       );

//       if (validColors.length > 0) {
//         validColors.forEach(c => {
//           const qty = c.quantity || 0;
//           const p = c.price || item.discountPrice || item.regularPrice || 0;

//           const existing = grouped[productId].colors.find(gc => gc.color === c.color);
//           if (existing) {
//             existing.quantity += qty;
//           } else {
//             grouped[productId].colors.push({
//               color: c.color,
//               quantity: qty,
//               price: p
//             });
//           }
//           grouped[productId].totalQuantity += qty;
//         });
//         return;
//       }
//     }

//     if (hasValidColor) {
//       const qty = item.quantity || 0;
//       const p = item.discountPrice || item.regularPrice || 0;

//       const existing = grouped[productId].colors.find(gc => gc.color === item.selectedColor);
//       if (existing) {
//         existing.quantity += qty;
//       } else {
//         grouped[productId].colors.push({
//           color: item.selectedColor,
//           quantity: qty,
//           price: p
//         });
//       }
//       grouped[productId].totalQuantity += qty;
//       return;
//     }

//     // ============================================================
//     // ✅ CASE 4: BASE (no color, no variant)
//     // ============================================================
//     grouped[productId].baseRows.push({
//       itemId: item._id,
//       quantity: item.quantity || 0,
//       price: item.discountPrice || item.regularPrice || 0
//     });
//     grouped[productId].totalQuantity += item.quantity || 0;
//   });

//   return Object.values(grouped);
// };

// // ========== ORDER CARD COMPONENT ==========
// const OrderCard = ({ order, index, contactItems }) => {
//   const [expanded, setExpanded] = useState(false);
//   const [downloading, setDownloading] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
  
//   const statusInfo = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG['placed'];
//   const StatusIcon = statusInfo.icon;

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 640);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const isTerminal = ['cancelled', 'rejected', 'refunded', 'failed'].includes(order.orderStatus);
//   const isDelivered = order.orderStatus === 'delivered';
//   const isReturned = order.orderStatus === 'returned';
//   const isPartialDelivery = order.orderStatus === 'partial_delivery';
//   const isHold = order.orderStatus === 'hold';
//   const hasDelivery = order.deliveryService?.courierOrderId;

//   const groupedItems = groupItemsByProduct(order.items || []);

//   const getStatusTimeline = () => {
//     if (!order.statusHistory || order.statusHistory.length === 0) {
//       return [
//         {
//           status: order.orderStatus,
//           label: getStatusLabel(order.orderStatus),
//           timestamp: order.createdAt,
//           isCurrent: true,
//           isCompleted: true,
//           color: getStatusBadgeColor(order.orderStatus)
//         }
//       ];
//     }
    
//     const uniqueStatuses = [];
//     const seen = new Set();
    
//     order.statusHistory.forEach(entry => {
//       if (!seen.has(entry.status)) {
//         seen.add(entry.status);
//         uniqueStatuses.push({
//           status: entry.status,
//           label: getStatusLabel(entry.status),
//           timestamp: entry.timestamp,
//           color: getStatusBadgeColor(entry.status)
//         });
//       }
//     });
    
//     const hasCurrentStatus = uniqueStatuses.some(s => s.status === order.orderStatus);
//     if (!hasCurrentStatus) {
//       uniqueStatuses.push({
//         status: order.orderStatus,
//         label: getStatusLabel(order.orderStatus),
//         timestamp: order.updatedAt || order.createdAt,
//         color: getStatusBadgeColor(order.orderStatus)
//       });
//     }
    
//     if (uniqueStatuses.length > 0) {
//       uniqueStatuses[uniqueStatuses.length - 1].isCurrent = true;
//       uniqueStatuses[uniqueStatuses.length - 1].isCompleted = true;
//     }
    
//     uniqueStatuses.forEach((s, index) => {
//       s.isCompleted = true;
//       if (index === uniqueStatuses.length - 1) {
//         s.isCurrent = true;
//       }
//     });
    
//     return uniqueStatuses;
//   };

//   const statusTimeline = getStatusTimeline();

//   const handleDownloadInvoice = async (e) => {
//     e.stopPropagation();
//     setDownloading(true);
//     try {
//       const orderId = order._id || order.id || order.orderId;
//       if (!orderId) {
//         toast.error('Order ID not found');
//         setDownloading(false);
//         return;
//       }

//       const response = await fetch(`${API_URL}/api/orders/public/${orderId}`, {
//         headers: { 'Content-Type': 'application/json' }
//       });
      
//       const data = await response.json();
//       if (data.success && data.data) {
//         await generateInvoicePDF(data.data);
//         toast.success('Invoice downloaded successfully!');
//       } else {
//         toast.error(data.error || 'Failed to fetch order details');
//       }
//     } catch (error) {
//       console.error('Download error:', error);
//       toast.error('Failed to download invoice');
//     } finally {
//       setDownloading(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.08 }}
//       className="bg-white rounded-2xl border border-[#c5d5be]/40 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
//     >
//       <div 
//         className="p-4 sm:p-5 cursor-pointer hover:bg-[#f0f5ed] transition-colors"
//         onClick={() => setExpanded(!expanded)}
//       >
//         <div className="flex flex-wrap items-center justify-between gap-3">
//           <div className="flex items-center gap-3 min-w-0">
//             <div className={`w-10 h-10 rounded-full ${statusInfo.bgColor} border ${statusInfo.borderColor} flex items-center justify-center flex-shrink-0`}>
//               <StatusIcon className={`w-5 h-5 ${statusInfo.textColor}`} />
//             </div>
//             <div className="min-w-0">
//               <p className="text-xs text-[#77896F] font-mono truncate" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>#{order.orderNumber}</p>
//               <p className="text-sm font-medium text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
//                 {new Date(order.createdAt).toLocaleDateString('en-BD', {
//                   day: '2-digit',
//                   month: 'short',
//                   year: 'numeric'
//                 })}
//               </p>
//             </div>
//           </div>
          
//           <div className="flex items-center gap-3 flex-shrink-0">
//             <div className="text-right">
//               <p className="text-sm font-bold text-[#77896F]" style={{ fontFamily: FONT_FAMILY }}>৳{order.total?.toFixed(2)}</p>
//             </div>
//             <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(order.orderStatus)}`} style={{ fontFamily: FONT_FAMILY }}>
//               {getStatusLabel(order.orderStatus)}
//             </div>
//             <button
//               onClick={handleDownloadInvoice}
//               disabled={downloading}
//               className="p-1.5 hover:bg-[#f0f5ed] rounded-full transition-colors text-[#77896F]/60 hover:text-[#77896F] disabled:opacity-50"
//               title="Download Invoice"
//             >
//               {downloading ? (
//                 <div className="w-4 h-4 border-2 border-[#77896F] border-t-transparent rounded-full animate-spin" />
//               ) : (
//                 <FaDownload className="w-4 h-4" />
//               )}
//             </button>
//             {expanded ? (
//               <FaChevronUp className="w-4 h-4 text-[#77896F]/60 flex-shrink-0" />
//             ) : (
//               <FaChevronDown className="w-4 h-4 text-[#77896F]/60 flex-shrink-0" />
//             )}
//           </div>
//         </div>
//       </div>

//       <AnimatePresence>
//         {expanded && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="overflow-hidden"
//           >
//             <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 border-t border-[#c5d5be]/40 space-y-4">
//               {!isTerminal && statusTimeline.length > 0 && (
//                 <div className="mb-4">
//                   <h4 className="text-xs font-medium text-[#263b32] mb-3 flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                     <FaClock className="w-3.5 h-3.5 text-[#77896F]" />
//                     Order Progress
//                   </h4>
//                   <div className="relative">
//                     <div className="flex items-start justify-between overflow-x-auto pb-3 gap-1 sm:gap-2">
//                       {statusTimeline.map((step, index) => {
//                         const isLast = index === statusTimeline.length - 1;
//                         const isCompleted = step.isCompleted;
//                         const isCurrent = step.isCurrent;
//                         const formattedTime = step.timestamp ? new Date(step.timestamp).toLocaleString('en-BD', {
//                           day: '2-digit',
//                           month: 'short',
//                           hour: '2-digit',
//                           minute: '2-digit'
//                         }) : '';
                        
//                         return (
//                           <div key={step.status} className="flex flex-col items-center flex-1 min-w-[60px] sm:min-w-[80px] relative">
//                             {!isLast && (
//                               <div className={`absolute top-3 sm:top-4 left-[55%] sm:left-[60%] w-[70%] sm:w-[80%] h-0.5 ${isCompleted ? 'bg-gradient-to-r from-[#77896F] to-[#6b7d63]' : 'bg-[#c5d5be]'}`} />
//                             )}
                            
//                             <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[8px] sm:text-xs font-bold z-10 ${isCompleted ? 'bg-gradient-to-r from-[#77896F] to-[#6b7d63] text-white shadow-md shadow-[#77896F]/25' : 'bg-[#c5d5be]/30 text-[#77896F]/60 border border-[#c5d5be]/40'} ${isCurrent ? 'ring-2 sm:ring-4 ring-[#77896F]/30' : ''}`}>
//                               {isCompleted ? <FaCheck className="w-3 h-3 sm:w-4 sm:h-4" /> : index + 1}
//                             </div>
                            
//                             <span className={`text-[7px] sm:text-[9px] mt-1 sm:mt-1.5 text-center font-medium leading-tight ${isCompleted ? 'text-[#263b32]' : 'text-[#77896F]/40'}`} style={{ fontFamily: FONT_FAMILY }}>
//                               {step.label}
//                             </span>
                            
//                             {step.timestamp && (
//                               <span className="text-[6px] sm:text-[7px] text-[#77896F]/40 mt-0.5 text-center max-w-[50px] sm:max-w-[90px] leading-tight" style={{ fontFamily: FONT_FAMILY }}>
//                                 {formattedTime}
//                               </span>
//                             )}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {isTerminal && (
//                 <div className="mb-4 p-3 rounded-xl border bg-red-50 border-red-200">
//                   <div className="flex items-center gap-2 text-sm text-red-600">
//                     <FaExclamationTriangle className="w-4 h-4" />
//                     <span className="font-medium" style={{ fontFamily: FONT_FAMILY }}>
//                       {order.orderStatus === 'cancelled' ? 'Order Cancelled' : 
//                        order.orderStatus === 'rejected' ? 'Order Rejected' :
//                        order.orderStatus === 'refunded' ? 'Order Refunded' :
//                        'Order Failed'}
//                     </span>
//                   </div>
//                   {order.cancellationReason && (
//                     <p className="text-xs text-red-500 mt-1" style={{ fontFamily: FONT_FAMILY }}>Reason: {order.cancellationReason}</p>
//                   )}
//                 </div>
//               )}

//               <div className="flex flex-wrap gap-3 items-center">
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs text-[#77896F]" style={{ fontFamily: FONT_FAMILY }}>Payment:</span>
//                   {getPaymentMethodBadge(order.paymentMethod)}
//                 </div>
//                 {order.trackingNumber && (
//                   <div className="flex items-center gap-2">
//                     <span className="text-xs text-[#77896F]/60" style={{ fontFamily: FONT_FAMILY }}>Tracking:</span>
//                     <span className="text-xs font-mono text-[#77896F]" style={{ fontFamily: FONT_FAMILY }}>{order.trackingNumber}</span>
//                   </div>
//                 )}
//               </div>

//               {hasDelivery && (
//                 <div className="bg-gradient-to-r from-[#f0f5ed] to-[#c5d5be]/20 border border-[#77896F]/20 rounded-xl p-3">
//                   <h4 className="text-xs font-medium text-[#263b32] flex items-center gap-2 mb-2" style={{ fontFamily: FONT_FAMILY }}>
//                     <FaTruck className="w-3.5 h-3.5 text-[#77896F]" />
//                     Courier Delivery Information
//                   </h4>
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
//                     <div>
//                       <span className="text-[#77896F]/60" style={{ fontFamily: FONT_FAMILY }}>Courier Service:</span>
//                       <span className="font-medium text-[#263b32] ml-1" style={{ fontFamily: FONT_FAMILY }}>{order.deliveryService?.courierName || 'N/A'}</span>
//                     </div>
//                     <div>
//                       <span className="text-[#77896F]/60" style={{ fontFamily: FONT_FAMILY }}>Tracking Number:</span>
//                       <span className="font-mono text-[#77896F] ml-1" style={{ fontFamily: FONT_FAMILY }}>{order.deliveryService?.trackingNumber || 'N/A'}</span>
//                     </div>
//                     {order.deliveryService?.trackingUrl && (
//                       <div className="col-span-1 sm:col-span-2 mt-1 pt-1.5 border-t border-[#77896F]/10">
//                         <div className="flex items-center gap-2">
//                           <span className="text-[#77896F]/60 text-xs" style={{ fontFamily: FONT_FAMILY }}>Track your parcel:</span>
//                           <a
//                             href={order.deliveryService.trackingUrl}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#77896F] to-[#6b7d63] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#77896F]/25 transition-all"
//                             style={{ fontFamily: FONT_FAMILY }}
//                           >
//                             <FaExternalLinkAlt className="w-3 h-3" />
//                             Track on {order.deliveryService?.courierName || 'Courier'}
//                           </a>
//                         </div>
//                         <p className="text-[10px] text-[#77896F]/40 mt-1" style={{ fontFamily: FONT_FAMILY }}>
//                           Click the button above to track your parcel
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* ============================================================
//                   ORDER ITEMS TABLE - WITH VARIANT/SUB-VARIANT SUPPORT
//               ============================================================ */}
//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <h4 className="text-xs font-medium text-[#263b32] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                     <FaShoppingBag className="w-3.5 h-3.5 text-[#77896F]" />
//                     Order Items ({groupedItems.length} products)
//                   </h4>
//                   <span className="text-[10px] text-[#77896F]/40" style={{ fontFamily: FONT_FAMILY }}>
//                     Total: {order.items?.length || 0} items
//                   </span>
//                 </div>

//                 <div className="bg-[#f0f5ed] rounded-xl border border-[#c5d5be]/40 overflow-hidden">
//                   {/* Table Header */}
//                   <div className="grid grid-cols-12 gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-[#c5d5be]/20 border-b border-[#c5d5be]/40 text-[8px] sm:text-[10px] font-medium text-[#465641] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>
//                     <div className="col-span-1 text-center">#</div>
//                     <div className="col-span-4 sm:col-span-5">Product / Variant</div>
//                     <div className="col-span-2 text-center">Color</div>
//                     <div className="col-span-1 text-center">Qty</div>
//                     <div className="col-span-1 text-center hidden sm:block">Unit</div>
//                     <div className="col-span-1 text-right hidden sm:block">Price</div>
//                     <div className="col-span-2 sm:col-span-1 text-right">Total</div>
//                   </div>

//                <div className="max-h-60 overflow-y-auto">
//   {groupedItems.length === 0 ? (
//     <div className="text-center py-4 text-xs text-[#77896F]/40" style={{ fontFamily: FONT_FAMILY }}>
//       No items found
//     </div>
//   ) : (
//     groupedItems.map((group, idx) => {
//       // ============================================================
//       // Build a flat list of rows for this product
//       // ============================================================
//       const rows = [];

//       const hasVariants = group.variantRows.length > 0;

//       // ------------------------------------------------------------
//       // CASE A: Product HAS variants
//       //   → Push a "product header" row that shows the product name,
//       //     then push variant/sub-variant rows below.
//       // ------------------------------------------------------------
//       if (hasVariants) {
//         // Compute product total = sum of ALL children (base + colors + variants + subs)
//         let productTotal = 0;
//         let productQty = 0;

//         group.baseRows.forEach(br => {
//           productTotal += br.price * br.quantity;
//           productQty += br.quantity;
//         });
//         group.colors.forEach(c => {
//           productTotal += c.price * c.quantity;
//           productQty += c.quantity;
//         });
//         group.variantRows.forEach(v => {
//           productTotal += v.price * v.quantity;
//           productQty += v.quantity;
//         });

//         rows.push({
//           kind: 'product-header',
//           name: group.productName,
//           color: null,
//           quantity: productQty,
//           price: productQty > 0 ? productTotal / productQty : 0,
//           originalPrice: null,
//           hasDiscount: false,
//           unit: group.unit,
//           indent: 0,
//           badge: 'Product',
//           image: group.image,
//           isHeaderOnly: false,
//           rowTotal: productTotal,
//           showVariantsNote: true
//         });

//         // Add base rows (rare, but possible alongside variants)
//         group.baseRows.forEach((br) => {
//           rows.push({
//             kind: 'base',
//             name: group.productName,
//             color: null,
//             quantity: br.quantity,
//             price: br.price,
//             originalPrice: null,
//             hasDiscount: false,
//             unit: group.unit,
//             indent: 1,
//             badge: null,
//             image: null,
//             isHeaderOnly: false,
//             rowTotal: br.price * br.quantity
//           });
//         });

//         // Add color rows (rare alongside variants)
//         group.colors.forEach((c) => {
//           rows.push({
//             kind: 'color',
//             name: group.productName,
//             color: c.color,
//             quantity: c.quantity,
//             price: c.price,
//             originalPrice: null,
//             hasDiscount: false,
//             unit: group.unit,
//             indent: 1,
//             badge: null,
//             image: null,
//             isHeaderOnly: false,
//             rowTotal: c.price * c.quantity
//           });
//         });

//         // Add variant rows grouped by variantId
//         const variantGroups = {};
//         group.variantRows.forEach(v => {
//           const key = v.variantId || 'unknown';
//           if (!variantGroups[key]) variantGroups[key] = [];
//           variantGroups[key].push(v);
//         });

//         Object.values(variantGroups).forEach(variants => {
//           variants.sort((a, b) => {
//             if (!a.isSubVariant && b.isSubVariant) return -1;
//             if (a.isSubVariant && !b.isSubVariant) return 1;
//             return 0;
//           });

//           const hasSubVariantInGroup = variants.some(v => v.isSubVariant);

//           variants.forEach((v) => {
//             const isVariantRow = !v.isSubVariant;
//             const isHeaderOnly = isVariantRow
//               && hasSubVariantInGroup
//               && (v.quantity || 0) === 0;

//             rows.push({
//               kind: isVariantRow ? 'variant' : 'subVariant',
//               name: isVariantRow ? v.variantName : v.subVariantName,
//               parentVariantName: v.variantName,
//               color: v.selectedColor,
//               quantity: v.quantity,
//               price: v.price,
//               originalPrice: v.originalPrice,
//               hasDiscount: v.hasDiscount,
//               unit: v.unit,
//               indent: isVariantRow ? 1 : 2,
//               badge: isVariantRow ? 'Variant' : 'Sub',
//               image: null,
//               isHeaderOnly,
//               rowTotal: v.price * v.quantity
//             });
//           });
//         });
//       }
//       // ------------------------------------------------------------
//       // CASE B: Product has NO variants
//       //   → No separate product header. Just render the base/color rows
//       //     using the product's own info (image, name, unit) on the FIRST row.
//       // ------------------------------------------------------------
//       else {
//         // Base rows
//         group.baseRows.forEach((br, i) => {
//           rows.push({
//             kind: 'base',
//             name: group.productName,
//             color: null,
//             quantity: br.quantity,
//             price: br.price,
//             originalPrice: null,
//             hasDiscount: false,
//             unit: group.unit,
//             indent: 0,
//             badge: null,
//             image: group.image,
//             isHeaderOnly: false,
//             isFirstOfGroup: rows.length === 0,
//             rowTotal: br.price * br.quantity
//           });
//         });

//         // Color rows
//         group.colors.forEach((c) => {
//           rows.push({
//             kind: 'color',
//             name: group.productName,
//             color: c.color,
//             quantity: c.quantity,
//             price: c.price,
//             originalPrice: null,
//             hasDiscount: false,
//             unit: group.unit,
//             indent: 0,
//             badge: null,
//             image: group.image,
//             isHeaderOnly: false,
//             isFirstOfGroup: rows.length === 0,
//             rowTotal: c.price * c.quantity
//           });
//         });
//       }

//       // ============================================================
//       // Render
//       // ============================================================
//       return rows.map((row, rowIndex) => {
//         const indent = row.indent || 0;
//         const paddingLeft = indent === 0 ? 'pl-0' : indent === 1 ? 'pl-3' : 'pl-6';
//         const hasColor = !!row.color;
//         const isHeaderOnly = row.isHeaderOnly;
//         const isProductRow = row.kind === 'product-header';
//         const isBaseOrColorRow = row.kind === 'base' || row.kind === 'color';

//         // For a product row in CASE B (base/color), the first row of the group
//         // should show the image. Subsequent color rows also show the image only on the first one.
//         const isFirstOfGroup = row.isFirstOfGroup || isProductRow;

//         const rowTotal = row.rowTotal !== undefined
//           ? row.rowTotal
//           : row.price * row.quantity;

//         return (
//           <div
//             key={`${idx}-${rowIndex}`}
//             className={`grid grid-cols-12 gap-1 sm:gap-2 px-2 sm:px-3 py-2 items-center border-b border-[#c5d5be]/20 last:border-0 hover:bg-gradient-to-r hover:from-[#f0f5ed] hover:to-[#c5d5be]/10 transition-colors ${
//               indent === 2 ? 'bg-blue-50/20' :
//               indent === 1 ? 'bg-purple-50/20' : ''
//             }`}
//           >
//             {/* # Column */}
//             <div className="col-span-1 text-center text-[8px] sm:text-[10px] text-black" style={{ fontFamily: FONT_FAMILY }}>
//               {isProductRow || isFirstOfGroup ? idx + 1 : ''}
//             </div>

//             {/* Product / Variant Column */}
//             <div className={`col-span-4 sm:col-span-5 flex items-center gap-1.5 sm:gap-2 min-w-0 ${paddingLeft}`}>
//               {/* Image — only on the first row of the group */}
//               {isFirstOfGroup && row.image ? (
//                 <img
//                   src={row.image}
//                   alt={row.name}
//                   className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg object-cover flex-shrink-0 bg-white border border-[#c5d5be]/40"
//                   onError={(e) => { e.target.src = 'https://via.placeholder.com/32?text=P'; }}
//                 />
//               ) : (
//                 !isFirstOfGroup && indent > 0 && (
//                   <span className="w-6 sm:w-7 flex-shrink-0 text-[#77896F]/60 text-[10px] text-center font-medium">
//                     {indent === 2 ? '→' : '▸'}
//                   </span>
//                 )
//               )}

//               <div className="min-w-0 flex flex-wrap items-center gap-1">
//                 <p
//                   className={`truncate ${
//                     isProductRow ? 'text-[9px] sm:text-xs font-semibold text-[#263b32]' :
//                     isBaseOrColorRow ? 'text-[9px] sm:text-xs font-medium text-[#263b32]' :
//                     indent === 1 ? 'text-[8px] sm:text-xs font-medium text-purple-700' :
//                     'text-[8px] sm:text-xs text-gray-600'
//                   }`}
//                   title={row.name}
//                   style={{ fontFamily: FONT_FAMILY }}
//                 >
//                   {row.name}
//                 </p>

//                 {/* Badge */}
//                 {row.badge && (
//                   <span
//                     className={`text-[7px] sm:text-[8px] px-1 py-0.5 rounded flex-shrink-0 ${
//                       row.badge === 'Product' ? 'bg-gray-100 text-gray-500' :
//                       row.badge === 'Variant' ? 'bg-purple-100 text-purple-700' :
//                       'bg-blue-100 text-blue-700'
//                     }`}
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     {row.badge}
//                   </span>
//                 )}

//                 {/* "See variants below" note */}
//                 {row.showVariantsNote && (
//                   <span className="text-[7px] sm:text-[8px] text-[#77896F]/60 italic flex-shrink-0" style={{ fontFamily: FONT_FAMILY }}>
//                     (See variants below)
//                   </span>
//                 )}

//                 {/* Discount badge */}
//                 {row.hasDiscount && !isHeaderOnly && !isProductRow && (
//                   <span
//                     className="text-[7px] sm:text-[8px] text-green-600 bg-green-50 px-1 py-0.5 rounded flex-shrink-0"
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     Save {Math.round(((row.originalPrice - row.price) / row.originalPrice) * 100)}%
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Color Column */}
//             <div className="col-span-2 flex justify-center items-center">
//               {hasColor ? (
//                 <div
//                   className="w-5 h-5 rounded-full border-2 border-[#c5d5be]/50 shadow-sm"
//                   style={{ backgroundColor: row.color }}
//                   title={row.color}
//                 />
//               ) : (
//                 <span className="text-[8px] sm:text-[10px] text-[#77896F]/40" style={{ fontFamily: FONT_FAMILY }}>
//                   —
//                 </span>
//               )}
//             </div>

//             {/* Qty Column */}
//             <div className="col-span-1 text-center text-[9px] sm:text-xs font-medium text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
//               {isHeaderOnly ? (
//                 <span className="text-[#77896F]/40">—</span>
//               ) : (
//                 row.quantity || 0
//               )}
//             </div>

//             {/* Unit Column */}
//             <div className="col-span-1 text-center text-[8px] sm:text-[10px] text-[#77896F] hidden sm:block" style={{ fontFamily: FONT_FAMILY }}>
//               {isHeaderOnly ? '' : (row.unit || 'pcs')}
//             </div>

//             {/* Price Column */}
//             <div className="col-span-1 text-right text-[8px] sm:text-[10px] text-[#77896F] hidden sm:block" style={{ fontFamily: FONT_FAMILY }}>
//               {isHeaderOnly ? (
//                 <span className="text-[#77896F]/40">—</span>
//               ) : (
//                 <>
//                   <span className={row.hasDiscount ? 'text-green-600 font-medium' : ''}>
//                     ৳{row.price.toFixed(2)}
//                   </span>
//                   {row.hasDiscount && (
//                     <span className="text-[#77896F]/40 line-through ml-1">
//                       ৳{row.originalPrice.toFixed(2)}
//                     </span>
//                   )}
//                 </>
//               )}
//             </div>

//             {/* Total Column */}
//             <div className="col-span-2 sm:col-span-1 text-right text-[9px] sm:text-xs font-medium text-[#77896F]" style={{ fontFamily: FONT_FAMILY }}>
//               {isHeaderOnly ? (
//                 <span className="text-[#77896F]/40">—</span>
//               ) : (
//                 <>৳{rowTotal.toFixed(2)}</>
//               )}
//             </div>
//           </div>
//         );
//       });
//     })
//   )}
// </div>

//                   {/* Footer */}
//                   <div className="border-t border-[#c5d5be]/40 bg-gradient-to-r from-[#c5d5be]/10 to-[#f0f5ed] px-2 sm:px-3 py-2">
//                     <div className="flex flex-wrap justify-end items-center gap-2 sm:gap-6 text-[9px] sm:text-xs" style={{ fontFamily: FONT_FAMILY }}>
//                       <div>
//                         <span className="text-[#77896F]">Subtotal:</span>
//                         <span className="font-medium text-[#263b32] ml-1">৳{order.subtotal?.toFixed(2)}</span>
//                       </div>
//                       <div>
//                         <span className="text-[#77896F]">Shipping:</span>
//                         <span className="font-medium text-[#263b32] ml-1">৳{order.shippingCost?.toFixed(2)}</span>
//                       </div>
//                       {order.discount > 0 && (
//                         <div>
//                           <span className="text-green-600">Discount:</span>
//                           <span className="font-medium text-green-600 ml-1">- ৳{order.discount?.toFixed(2)}</span>
//                         </div>
//                       )}
//                       <div className="pl-2 sm:pl-4 border-l-2 border-[#c5d5be]/40">
//                         <span className="font-bold text-[#263b32]">Total:</span>
//                         <span className="font-bold text-[#77896F] ml-1">৳{order.total?.toFixed(2)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {order.timeline && order.timeline.length > 0 && (
//                 <div>
//                   <h4 className="text-xs font-medium text-[#263b32] mb-2 flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                     <FaClock className="w-3.5 h-3.5 text-[#77896F]" />
//                     Status History
//                   </h4>
//                   <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2">
//                     {order.timeline.map((entry, idx) => {
//                       const entryStatusInfo = STATUS_CONFIG[entry.status] || STATUS_CONFIG['placed'];
//                       const isCurrent = entry.status === order.orderStatus;
//                       const displayLabel = entryStatusInfo.label || entry.status;
                      
//                       return (
//                         <div key={idx} className="flex items-start gap-2.5">
//                           <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${isCurrent ? 'bg-gradient-to-r from-[#77896F] to-[#6b7d63] ring-2 ring-[#77896F]/30' : 'bg-[#c5d5be]'}`} />
//                           <div className="flex-1">
//                             <div className="flex flex-wrap items-center gap-1.5">
//                               <span className={`text-xs font-medium ${isCurrent ? 'text-[#77896F]' : 'text-[#263b32]'}`} style={{ fontFamily: FONT_FAMILY }}>
//                                 {displayLabel}
//                               </span>
//                               <span className="text-[9px] text-[#77896F]" style={{ fontFamily: FONT_FAMILY }}>{entry.formattedDate}</span>
//                             </div>
//                             {entry.note && (
//                               <p className="text-[10px] text-[#77896F]" style={{ fontFamily: FONT_FAMILY }}>{entry.note}</p>
//                             )}
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}

//               <button
//                 onClick={handleDownloadInvoice}
//                 disabled={downloading}
//                 className="w-full py-2.5 bg-gradient-to-r from-[#77896F] to-[#6b7d63] text-white rounded-xl hover:shadow-lg hover:shadow-[#77896F]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-medium"
//                 style={{ fontFamily: FONT_FAMILY }}
//               >
//                 {downloading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Generating Invoice...
//                   </>
//                 ) : (
//                   <>
//                     <FaFileInvoice className="w-4 h-4" />
//                     Download Invoice
//                   </>
//                 )}
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };

// // ========== MAIN TRACK PAGE ==========
// export default function TrackPage() {
//   const [phone, setPhone] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [trackingData, setTrackingData] = useState(null);
//   const [error, setError] = useState(null);
//   const [searched, setSearched] = useState(false);
//   const [footerData, setFooterData] = useState(null);
//   const [contactItems, setContactItems] = useState([]);

//   useEffect(() => {
//     const loadFooterData = async () => {
//       const data = await fetchFooterData();
//       if (data) {
//         setFooterData(data);
//         const contacts = getContactItemsFromFooter(data);
//         setContactItems(contacts);
//       } else {
//         setContactItems([
//           { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-[#77896F]' },
//           { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-[#77896F]' },
//           { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-green-500' }
//         ]);
//       }
//     };
//     loadFooterData();
//   }, []);

//   const handleSearch = async (e) => {
//     e.preventDefault();
    
//     if (!phone.trim()) {
//       toast.error('Please enter a phone number');
//       return;
//     }
    
//     const phoneRegex = /^01[3-9]\d{8}$/;
//     if (!phoneRegex.test(phone.trim())) {
//       toast.error('Please enter a valid Bangladesh phone number (01XXXXXXXXX)');
//       return;
//     }
    
//     setLoading(true);
//     setError(null);
//     setSearched(true);
    
//     try {
//       const response = await fetch(`${API_URL}/api/orders/track/${phone.trim()}`);
//       const data = await response.json();
      
//       if (data.success) {
//         setTrackingData(data.data);
//         toast.success(`Found ${data.data.totalOrders} order(s)`);
//       } else {
//         setError(data.error || 'No orders found for this phone number');
//         setTrackingData(null);
//       }
//     } catch (error) {
//       console.error('Track error:', error);
//       setError('Network error. Please try again.');
//       setTrackingData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleContactClick = (contact) => {
//     if (contact.label === 'Phone') {
//       window.location.href = contact.link;
//     } else if (contact.label === 'Email') {
//       const email = contact.link.replace('mailto:', '');
//       window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
//     } else if (contact.label === 'WhatsApp') {
//       window.open(contact.link, '_blank', 'noopener,noreferrer');
//     } else {
//       window.open(contact.link, '_blank');
//     }
//   };

//   const getIcon = (IconComponent, className = "w-3 h-3 sm:w-4 sm:h-4") => {
//     return <IconComponent className={className} />;
//   };

//   return (
//     <>
//       <Navbar />
      
//       <div className="min-h-screen bg-[#f8f7f2] pt-12 lg:pt-10 pb-8">
//         <div className="container mx-auto px-4 max-w-4xl">
//           {/* Header */}
//           <div className="text-center mb-6 sm:mb-8">
//             <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3">
//               <DotLottieReact
//                 src="/animations/track.lottie"
//                 loop
//                 autoplay
//                 className="w-full h-full"
//               />
//             </div>
//             <h1 className="text-2xl sm:text-3xl font-light text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
//               Track Your Orders
//             </h1>
//             <p className="text-sm text-[#77896F]/60 mt-1" style={{ fontFamily: FONT_FAMILY }}>Enter your phone number to see all your orders</p>
//           </div>

//           {/* Search Form */}
//           <div className="bg-white rounded-2xl border border-[#c5d5be]/40 p-4 sm:p-6 shadow-sm mb-6 sm:mb-8">
//             <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
//               <div className="flex-1 relative">
//                 <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#77896F]/40" />
//                 <input
//                   type="tel"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   placeholder="Enter your phone number (01XXXXXXXXX)"
//                   className="w-full pl-10 pr-3 py-2.5 border border-[#c5d5be]/50 rounded-xl focus:ring-2 focus:ring-[#77896F] focus:border-transparent outline-none text-sm sm:text-base text-[#263b32] placeholder:text-[#77896F]/40"
//                   style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-2.5 bg-gradient-to-r from-[#77896F] to-[#6b7d63] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#77896F]/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
//                 style={{ fontFamily: FONT_FAMILY }}
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     Searching...
//                   </>
//                 ) : (
//                   <>
//                     <FaSearch className="w-4 h-4" />
//                     Track Orders
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>

//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4 mb-6"
//             >
//               <div className="flex items-center gap-3">
//                 <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
//                   <FaExclamationTriangle className="w-4 h-4 text-red-500" />
//                 </div>
//                 <div>
//                   <p className="text-sm text-red-700 font-medium" style={{ fontFamily: FONT_FAMILY }}>No Orders Found</p>
//                   <p className="text-xs text-red-600" style={{ fontFamily: FONT_FAMILY }}>{error}</p>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {trackingData && (
//             <div className="space-y-4">
//               <div className="bg-gradient-to-r from-[#77896F] to-[#6b7d63] rounded-2xl p-4 text-white shadow-lg shadow-[#77896F]/25">
//                 <div className="flex flex-wrap items-center justify-between gap-3">
//                   <div>
//                     <p className="text-xs text-white/80" style={{ fontFamily: FONT_FAMILY }}>Phone Number</p>
//                     <p className="text-lg font-medium" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{trackingData.phone}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-xs text-white/80" style={{ fontFamily: FONT_FAMILY }}>Total Orders</p>
//                     <p className="text-2xl font-light" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{trackingData.totalOrders}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 {trackingData.orders.map((order, index) => (
//                   <OrderCard key={order.orderNumber || index} order={order} index={index} contactItems={contactItems} />
//                 ))}
//               </div>

//               <div className="text-center pt-4">
//                 <Link href="/products" className="inline-flex items-center gap-2 text-[#77896F] hover:text-[#6b7d63] transition-colors text-sm font-medium" style={{ fontFamily: FONT_FAMILY }}>
//                   <span>←</span> Continue Shopping
//                 </Link>
//               </div>
//             </div>
//           )}

//           {!trackingData && !error && !loading && searched && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="bg-white rounded-2xl border border-[#c5d5be]/40 p-8 sm:p-12 text-center shadow-sm"
//             >
//               <div className="w-16 h-16 mx-auto mb-4 bg-[#f0f5ed] rounded-full flex items-center justify-center border border-[#c5d5be]/40">
//                 <FaSearch className="w-8 h-8 text-[#77896F]/40" />
//               </div>
//               <h3 className="text-lg font-light text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
//                 No Orders Found
//               </h3>
//               <p className="text-sm text-[#77896F]/60" style={{ fontFamily: FONT_FAMILY }}>We couldn't find any orders with this phone number.</p>
//               <p className="text-xs text-[#77896F]/40 mt-2" style={{ fontFamily: FONT_FAMILY }}>Please check the number and try again.</p>
//             </motion.div>
//           )}

//           <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-[#77896F]/60">
//             <div className="flex items-center gap-2">
//               <FaShieldAlt className="w-4 h-4 text-[#77896F]" />
//               <span style={{ fontFamily: FONT_FAMILY }}>Secure Tracking</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaClock className="w-4 h-4 text-[#77896F]" />
//               <span style={{ fontFamily: FONT_FAMILY }}>Real-time Updates</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <FaStar className="w-4 h-4 text-[#77896F]" />
//               <span style={{ fontFamily: FONT_FAMILY }}>Premium Quality</span>
//             </div>
//           </div>

//           <div className="mt-6 sm:mt-8 text-center">
//             <p className="text-xs text-[#77896F]/60" style={{ fontFamily: FONT_FAMILY }}>Need help? Contact our support team</p>
//             <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
//               {contactItems.map((contact, index) => (
//                 <button
//                   key={index}
//                   onClick={() => handleContactClick(contact)}
//                   className={`text-sm hover:opacity-80 transition-colors flex items-center gap-1 ${contact.color}`}
//                   style={{ fontFamily: FONT_FAMILY }}
//                 >
//                   {getIcon(contact.icon)}
//                   <span>{contact.value}</span>
//                 </button>
//               ))}
//               {contactItems.length > 0 && contactItems.map((_, index) => {
//                 if (index < contactItems.length - 1) {
//                   return <span key={`sep-${index}`} className="text-[#77896F]/20 hidden sm:inline">|</span>;
//                 }
//                 return null;
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <Footer />
//     </>
//   );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {
  FaSearch,
  FaPhone,
  FaBox,
  FaClock,
  FaCheckCircle,
  FaTruck,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaChevronDown,
  FaChevronUp,
  FaMoneyBillWave,
  FaCreditCard,
  FaExclamationTriangle,
  FaShippingFast,
  FaCheckDouble,
  FaBan,
  FaSpinner,
  FaGift,
  FaUser,
  FaCalendarAlt,
  FaDownload,
  FaFileInvoice,
  FaHeart,
  FaStar,
  FaEnvelope,
  FaWhatsapp,
  FaShieldAlt,
  FaExternalLinkAlt,
  FaUndo,
  FaPhoneAlt,
  FaCheck,
  FaBoxOpen,
  FaClipboardCheck,
  FaChevronLeft,
  FaChevronRight,
  FaPause,
  FaLeaf,
} from 'react-icons/fa';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { generateInvoicePDF } from '@/utils/invoicePDF';

// ============================================================
// 🎨 NISHAT'S COLLECTION — PREMIUM PALETTE
// ============================================================
const BRAND = '#CC1D34';
const BRAND_DARK = '#8A2530';
const SAGE = '#8B9D83';
const SAGE_DARK = '#6b7d63';
const CREAM = '#f7f4ef';
const CREAM_SOFT = '#fbf9f5';
const BORDER = '#e8e2d6';
const TEXT = '#29362f';
const MUTED = '#687169';

const FONT_HEADING = "'Fraunces', serif";
const FONT_BODY = "'Plus Jakarta Sans', 'Inter', sans-serif";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ============================================================
// FETCH FOOTER DATA
// ============================================================
const fetchFooterData = async () => {
  try {
    const response = await fetch(`${API_URL}/api/footer`);
    if (!response.ok) throw new Error('Failed to fetch footer data');
    const data = await response.json();
    if (data.success && data.data) {
      return data.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return null;
  }
};

// ============================================================
// GET CONTACT ITEMS FROM FOOTER DATA
// ============================================================
const getContactItemsFromFooter = (footerData) => {
  if (!footerData) {
    return [
      { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-[#8A2530]' },
      { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-[#8A2530]' },
      { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-[#6b7d63]' },
    ];
  }

  const contacts = [];
  const company = footerData.company || {};
  const contactColumn = footerData.columns?.find((col) => col.type === 'contact');
  const items = contactColumn?.items || [];

  const phoneItem = items.find((item) => item.type === 'phone');
  if (phoneItem) {
    const cleanPhone = phoneItem.value.replace(/[^0-9+]/g, '');
    contacts.push({
      icon: FaPhone,
      label: 'Phone',
      value: phoneItem.value,
      link: `tel:${cleanPhone}`,
      color: 'text-[#8A2530]',
    });
  } else if (company.phone) {
    const cleanPhone = company.phone.replace(/[^0-9+]/g, '');
    contacts.push({
      icon: FaPhone,
      label: 'Phone',
      value: company.phone,
      link: `tel:${cleanPhone}`,
      color: 'text-[#8A2530]',
    });
  }

  const emailItem = items.find((item) => item.type === 'email');
  if (emailItem) {
    contacts.push({
      icon: FaEnvelope,
      label: 'Email',
      value: emailItem.value,
      link: `mailto:${emailItem.value}`,
      color: 'text-[#8A2530]',
    });
  } else if (company.email) {
    contacts.push({
      icon: FaEnvelope,
      label: 'Email',
      value: company.email,
      link: `mailto:${company.email}`,
      color: 'text-[#8A2530]',
    });
  }

  const whatsappItem = items.find((item) => item.type === 'whatsapp');
  if (whatsappItem) {
    const cleanPhone = whatsappItem.value.replace(/[^0-9+]/g, '');
    contacts.push({
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: whatsappItem.value,
      link: `https://wa.me/${cleanPhone}`,
      color: 'text-[#6b7d63]',
    });
  } else if (company.whatsapp) {
    const cleanPhone = company.whatsapp.replace(/[^0-9+]/g, '');
    contacts.push({
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: company.whatsapp,
      link: `https://wa.me/${cleanPhone}`,
      color: 'text-[#6b7d63]',
    });
  }

  if (contacts.length === 0) {
    contacts.push(
      { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-[#8A2530]' },
      { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-[#8A2530]' },
      { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-[#6b7d63]' }
    );
  }

  return contacts;
};

// ============================================================
// STATUS CONFIG — Nishat's Palette
// ============================================================
const STATUS_CONFIG = {
  'placed': {
    label: 'Order Placed',
    icon: FaBox,
    color: `bg-gradient-to-r from-[${SAGE}] to-[${SAGE_DARK}]`,
    textColor: 'text-[#8B9D83]',
    bgColor: 'bg-[#f0f5ed]',
    borderColor: 'border-[#8B9D83]/25',
  },
  'follow_up': {
    label: 'Follow Up',
    icon: FaPhoneAlt,
    color: `bg-gradient-to-r from-[${SAGE}] to-[${SAGE_DARK}]`,
    textColor: 'text-[#8B9D83]',
    bgColor: 'bg-[#f0f5ed]',
    borderColor: 'border-[#8B9D83]/25',
  },
  'reminder': { label: 'Reminder', icon: FaClock, color: 'bg-amber-500', textColor: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  'accepted': {
    label: 'Accepted',
    icon: FaCheckCircle,
    color: `bg-gradient-to-r from-[${SAGE}] to-[${SAGE_DARK}]`,
    textColor: 'text-[#8B9D83]',
    bgColor: 'bg-[#f0f5ed]',
    borderColor: 'border-[#8B9D83]/25',
  },
  'approved': {
    label: 'Approved',
    icon: FaClipboardCheck,
    color: `bg-gradient-to-r from-[${SAGE}] to-[${SAGE_DARK}]`,
    textColor: 'text-[#8B9D83]',
    bgColor: 'bg-[#f0f5ed]',
    borderColor: 'border-[#8B9D83]/25',
  },
  'hold': { label: 'On Hold', icon: FaPause, color: 'bg-amber-500', textColor: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  'ready_to_ship': {
    label: 'Ready to Ship',
    icon: FaBoxOpen,
    color: `bg-gradient-to-r from-[${SAGE}] to-[${SAGE_DARK}]`,
    textColor: 'text-[#8B9D83]',
    bgColor: 'bg-[#f0f5ed]',
    borderColor: 'border-[#8B9D83]/25',
  },
  'courier_assigned': {
    label: 'Assigned to Courier',
    icon: FaTruck,
    color: `bg-gradient-to-r from-[${SAGE}] to-[${SAGE_DARK}]`,
    textColor: 'text-[#8B9D83]',
    bgColor: 'bg-[#f0f5ed]',
    borderColor: 'border-[#8B9D83]/25',
  },
  'processing': {
    label: 'Processing',
    icon: FaSpinner,
    color: `bg-gradient-to-r from-[${SAGE}] to-[${SAGE_DARK}]`,
    textColor: 'text-[#8B9D83]',
    bgColor: 'bg-[#f0f5ed]',
    borderColor: 'border-[#8B9D83]/25',
  },
  'shipped': {
    label: 'Shipped',
    icon: FaShippingFast,
    color: `bg-gradient-to-r from-[${SAGE}] to-[${SAGE_DARK}]`,
    textColor: 'text-[#8B9D83]',
    bgColor: 'bg-[#f0f5ed]',
    borderColor: 'border-[#8B9D83]/25',
  },
  'out_for_delivery': { label: 'Out for Delivery', icon: FaTruck, color: 'bg-orange-500', textColor: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  'delivered': { label: 'Delivered', icon: FaCheckDouble, color: 'bg-[#6b7d63]', textColor: 'text-[#6b7d63]', bgColor: 'bg-[#f0f5ed]', borderColor: 'border-[#6b7d63]/25' },
  'cancelled': { label: 'Cancelled', icon: FaBan, color: 'bg-red-500', textColor: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  'rejected': { label: 'Rejected', icon: FaBan, color: 'bg-red-500', textColor: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  'refunded': { label: 'Refunded', icon: FaBan, color: 'bg-amber-500', textColor: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  'failed': { label: 'Failed', icon: FaExclamationTriangle, color: 'bg-red-500', textColor: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  'returned': { label: 'Returned', icon: FaUndo, color: 'bg-purple-500', textColor: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-200' },
  'partial_delivery': { label: 'Partial Delivery', icon: FaBox, color: 'bg-amber-500', textColor: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
};

// ============================================================
// GET STATUS BADGE COLOR
// ============================================================
const getStatusBadgeColor = (status) => {
  const colors = {
    'placed': 'text-[#8B9D83] bg-[#f0f5ed] border-[#8B9D83]/25',
    'follow_up': 'text-[#8B9D83] bg-[#f0f5ed] border-[#8B9D83]/25',
    'reminder': 'text-amber-700 bg-amber-50 border-amber-200',
    'accepted': 'text-[#8B9D83] bg-[#f0f5ed] border-[#8B9D83]/25',
    'approved': 'text-[#8B9D83] bg-[#f0f5ed] border-[#8B9D83]/25',
    'hold': 'text-amber-700 bg-amber-50 border-amber-200',
    'ready_to_ship': 'text-[#8B9D83] bg-[#f0f5ed] border-[#8B9D83]/25',
    'courier_assigned': 'text-[#8B9D83] bg-[#f0f5ed] border-[#8B9D83]/25',
    'processing': 'text-[#8B9D83] bg-[#f0f5ed] border-[#8B9D83]/25',
    'shipped': 'text-[#8B9D83] bg-[#f0f5ed] border-[#8B9D83]/25',
    'out_for_delivery': 'text-orange-700 bg-orange-50 border-orange-200',
    'delivered': 'text-[#6b7d63] bg-[#f0f5ed] border-[#6b7d63]/25',
    'cancelled': 'text-red-700 bg-red-50 border-red-200',
    'rejected': 'text-red-700 bg-red-50 border-red-200',
    'refunded': 'text-amber-700 bg-amber-50 border-amber-200',
    'failed': 'text-red-700 bg-red-50 border-red-200',
    'returned': 'text-purple-700 bg-purple-50 border-purple-200',
    'partial_delivery': 'text-amber-700 bg-amber-50 border-amber-200',
  };
  return colors[status] || 'text-[#687169] bg-[#f7f4ef] border-[#e8e2d6]';
};

const getStatusLabel = (status) => STATUS_CONFIG[status]?.label || status;

// ============================================================
// PAYMENT METHOD BADGE
// ============================================================
const getPaymentMethodBadge = (method) => {
  const methods = {
    'cod': { label: 'Cash on Delivery', color: 'bg-[#f7f4ef] text-[#8A2530] border-[#e8e2d6]', icon: FaMoneyBillWave },
    'online': { label: 'Online Payment', color: 'bg-[#f7f4ef] text-[#8A2530] border-[#e8e2d6]', icon: FaCreditCard },
    'bkash': { label: 'bKash', color: 'bg-[#f7f4ef] text-[#8A2530] border-[#e8e2d6]', icon: FaMoneyBillWave },
    'nagad': { label: 'Nagad', color: 'bg-[#f7f4ef] text-[#8A2530] border-[#e8e2d6]', icon: FaMoneyBillWave },
  };
  const info = methods[method] || { label: method || 'Unknown', color: 'bg-[#f7f4ef] text-[#687169] border-[#e8e2d6]', icon: FaMoneyBillWave };
  const Icon = info.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${info.color}`}
      style={{ fontFamily: FONT_BODY }}
    >
      <Icon className="w-3 h-3" />
      {info.label}
    </span>
  );
};

// ============================================================
// BUILD DELIVERY-QUANTITY MAP from order.deliveryItems
// Returns:
//   - null → no deliveryItems; use original behavior
//   - Map<string, {delivered, returned, ordered}> → keyed by:
//       productId|variantId|subVariantId
//       productId|variantId
//       productId|color:xxx
//       productId|plain
// ============================================================
const buildDeliveryQtyMap = (order) => {
  if (!order?.deliveryItems || order.deliveryItems.length === 0) {
    return null;
  }

  const map = new Map();

  order.deliveryItems.forEach((di) => {
    const productId = di.productId?.toString?.() || String(di.productId || '');
    const variantId = di.variantId || null;
    const subVariantId = di.subVariantId || null;
    const selectedColor = di.selectedColor || null;

    let key;
    if (subVariantId) {
      key = `${productId}|${variantId}|${subVariantId}`;
    } else if (variantId) {
      key = `${productId}|${variantId}`;
    } else if (selectedColor) {
      key = `${productId}|color:${selectedColor}`;
    } else {
      key = `${productId}|plain`;
    }

    const existing = map.get(key) || { delivered: 0, returned: 0, ordered: 0 };
    existing.delivered += Number(di.deliveredQuantity) || 0;
    existing.returned += Number(di.returnedQuantity) || 0;
    existing.ordered += Number(di.orderedQuantity) || 0;
    map.set(key, existing);
  });

  return map;
};

// ============================================================
// GROUP ITEMS BY PRODUCT — merges delivered/returned data
// ============================================================
const groupItemsByProduct = (items, deliveryQtyMap = null) => {
  if (!items || items.length === 0) return [];

  const grouped = {};

  // Helper: resolve delivery breakdown for a line
  const resolveDeliveryBreakdown = (productId, variantId, subVariantId, color) => {
    if (!deliveryQtyMap) {
      return null; // no delivery info → use original quantities
    }

    const pid = String(productId);
    let key;
    if (subVariantId) {
      key = `${pid}|${variantId}|${subVariantId}`;
    } else if (variantId) {
      key = `${pid}|${variantId}`;
    } else if (color) {
      key = `${pid}|color:${color}`;
    } else {
      key = `${pid}|plain`;
    }

    const entry = deliveryQtyMap.get(key);
    if (!entry) {
      return { delivered: 0, returned: 0, ordered: 0, hasData: false };
    }
    return { ...entry, hasData: true };
  };

  items.forEach((item, index) => {
    let productId = item.productId;
    if (productId && typeof productId === 'object' && productId._id) {
      productId = productId._id.toString();
    } else if (productId) {
      productId = productId.toString();
    } else {
      productId = `item-${index}`;
    }

    const productName = item.productName || item.name || item.product?.name || 'Unknown Product';
    const image = item.image || item.product?.images?.[0]?.url || '';
    const unit = item.unit || 'pcs';

    if (!grouped[productId]) {
      grouped[productId] = {
        productId,
        productName,
        image,
        unit,
        basePrice: item.discountPrice || item.regularPrice || 0,
        regularPrice: item.regularPrice || 0,
        discountPrice: item.discountPrice || 0,
        baseRows: [],
        variantRows: [],
        colors: [],
        totalQuantity: 0,
        totalDelivered: 0,
        totalReturned: 0,
      };
    }

    const hasValidColor =
      item.selectedColor &&
      item.selectedColor !== 'null' &&
      item.selectedColor !== '' &&
      item.selectedColor !== 'undefined';

    // CASE 1: nested variantDetails
    if (item.variantDetails && Array.isArray(item.variantDetails) && item.variantDetails.length > 0) {
      item.variantDetails.forEach((variant) => {
        const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;

        const variantPrice =
          variant.variantDiscountPrice > 0
            ? Number(variant.variantDiscountPrice)
            : Number(variant.variantRegularPrice) || 0;
        const variantOriginalPrice = Number(variant.variantRegularPrice) || 0;
        const variantHasDiscount = variantPrice > 0 && variantOriginalPrice > variantPrice;

        if (hasSubVariants) {
          const isHeaderOnly = (variant.quantity || 0) === 0;

          const variantDelivery = resolveDeliveryBreakdown(productId, variant.variantId, null, null);
          const variantDelivered = variantDelivery?.delivered || 0;
          const variantReturned = variantDelivery?.returned || 0;

          grouped[productId].variantRows.push({
            type: 'variant',
            variantId: variant.variantId,
            variantName: variant.variantName || 'Variant',
            subVariantId: null,
            subVariantName: null,
            selectedColor: variant.selectedColor || null,
            quantity: variant.quantity || 0,
            deliveredQty: variantDelivered,
            returnedQty: variantReturned,
            price: variantPrice,
            originalPrice: variantOriginalPrice,
            hasDiscount: variantHasDiscount,
            image: variant.image || '',
            unit: item.unit || 'pcs',
            isSubVariant: false,
            isVariant: true,
            isHeader: isHeaderOnly,
          });

          if (variant.quantity > 0) {
            grouped[productId].totalQuantity += variant.quantity;
            grouped[productId].totalDelivered += variantDelivered;
            grouped[productId].totalReturned += variantReturned;
          }

          variant.subVariants.forEach((sub) => {
            const subPrice =
              sub.subVariantDiscountPrice > 0
                ? Number(sub.subVariantDiscountPrice)
                : Number(sub.subVariantRegularPrice) || 0;
            const subOriginalPrice = Number(sub.subVariantRegularPrice) || 0;
            const subHasDiscount = subPrice > 0 && subOriginalPrice > subPrice;

            const subDelivery = resolveDeliveryBreakdown(
              productId,
              variant.variantId,
              sub.subVariantId,
              null
            );
            const subDelivered = subDelivery?.hasData
              ? subDelivery.delivered
              : sub.quantity || 0;
            const subReturned = subDelivery?.returned || 0;

            grouped[productId].variantRows.push({
              type: 'subVariant',
              variantId: variant.variantId,
              variantName: variant.variantName || 'Variant',
              subVariantId: sub.subVariantId,
              subVariantName: sub.subVariantName || 'Sub-Variant',
              selectedColor: sub.selectedColor || variant.selectedColor || null,
              quantity: sub.quantity || 0,
              deliveredQty: subDelivered,
              returnedQty: subReturned,
              price: subPrice,
              originalPrice: subOriginalPrice,
              hasDiscount: subHasDiscount,
              image: sub.image || variant.image || '',
              unit: item.unit || 'pcs',
              isSubVariant: true,
              isVariant: false,
            });

            grouped[productId].totalQuantity += sub.quantity || 0;
            grouped[productId].totalDelivered += subDelivered;
            grouped[productId].totalReturned += subReturned;
          });
        } else {
          const variantDelivery = resolveDeliveryBreakdown(
            productId,
            variant.variantId,
            null,
            variant.selectedColor || null
          );
          const deliveredQty = variantDelivery?.hasData
            ? variantDelivery.delivered
            : variant.quantity || 0;
          const returnedQty = variantDelivery?.returned || 0;

          grouped[productId].variantRows.push({
            type: 'variant',
            variantId: variant.variantId,
            variantName: variant.variantName || 'Variant',
            subVariantId: null,
            subVariantName: null,
            selectedColor: variant.selectedColor || null,
            quantity: variant.quantity || 0,
            deliveredQty,
            returnedQty,
            price: variantPrice,
            originalPrice: variantOriginalPrice,
            hasDiscount: variantHasDiscount,
            image: variant.image || '',
            unit: item.unit || 'pcs',
            isSubVariant: false,
            isVariant: true,
          });

          grouped[productId].totalQuantity += variant.quantity || 0;
          grouped[productId].totalDelivered += deliveredQty;
          grouped[productId].totalReturned += returnedQty;
        }
      });

      return;
    }

    // CASE 2: flat variant
    const isSubVariant = !!(item.subVariantId && item.subVariantId !== 'null' && item.subVariantId !== '');
    const isVariant = !!(item.variantId && item.variantId !== 'null' && item.variantId !== '');

    if (isVariant || isSubVariant) {
      const variantPrice =
        item.variantDiscountPrice > 0
          ? Number(item.variantDiscountPrice)
          : Number(item.variantRegularPrice) > 0
          ? Number(item.variantRegularPrice)
          : Number(item.discountPrice) || Number(item.regularPrice) || 0;

      const originalPrice =
        Number(item.variantRegularPrice) > 0
          ? Number(item.variantRegularPrice)
          : Number(item.regularPrice) || 0;

      const hasDiscount = originalPrice > 0 && variantPrice > 0 && variantPrice < originalPrice;

      const flatDelivery = resolveDeliveryBreakdown(
        productId,
        item.variantId || null,
        item.subVariantId || null,
        hasValidColor ? item.selectedColor : null
      );
      const deliveredQty = flatDelivery?.hasData ? flatDelivery.delivered : item.quantity || 0;
      const returnedQty = flatDelivery?.returned || 0;

      grouped[productId].variantRows.push({
        type: isSubVariant ? 'subVariant' : 'variant',
        itemId: item._id,
        variantId: item.variantId || null,
        variantName: item.variantName || 'Variant',
        subVariantId: item.subVariantId || null,
        subVariantName: item.subVariantName || null,
        selectedColor: hasValidColor ? item.selectedColor : null,
        quantity: item.quantity || 0,
        deliveredQty,
        returnedQty,
        price: variantPrice,
        originalPrice,
        hasDiscount,
        image: item.variantImage || item.image || '',
        unit: item.unit || 'pcs',
        isSubVariant,
        isVariant: !isSubVariant,
      });

      grouped[productId].totalQuantity += item.quantity || 0;
      grouped[productId].totalDelivered += deliveredQty;
      grouped[productId].totalReturned += returnedQty;
      return;
    }

    // CASE 3: colors
    if (item.colors && Array.isArray(item.colors) && item.colors.length > 0) {
      const validColors = item.colors.filter(
        (c) => c.color && c.color !== 'null' && c.color !== '' && c.color !== 'undefined'
      );

      if (validColors.length > 0) {
        validColors.forEach((c) => {
          const qty = c.quantity || 0;
          const p = c.price || item.discountPrice || item.regularPrice || 0;

          const colorDelivery = resolveDeliveryBreakdown(productId, null, null, c.color);
          const deliveredQty = colorDelivery?.hasData ? colorDelivery.delivered : qty;
          const returnedQty = colorDelivery?.returned || 0;

          const existing = grouped[productId].colors.find((gc) => gc.color === c.color);
          if (existing) {
            existing.quantity += qty;
            existing.deliveredQty += deliveredQty;
            existing.returnedQty += returnedQty;
          } else {
            grouped[productId].colors.push({
              color: c.color,
              quantity: qty,
              deliveredQty,
              returnedQty,
              price: p,
            });
          }
          grouped[productId].totalQuantity += qty;
          grouped[productId].totalDelivered += deliveredQty;
          grouped[productId].totalReturned += returnedQty;
        });
        return;
      }
    }

    if (hasValidColor) {
      const qty = item.quantity || 0;
      const p = item.discountPrice || item.regularPrice || 0;

      const colorDelivery = resolveDeliveryBreakdown(productId, null, null, item.selectedColor);
      const deliveredQty = colorDelivery?.hasData ? colorDelivery.delivered : qty;
      const returnedQty = colorDelivery?.returned || 0;

      const existing = grouped[productId].colors.find((gc) => gc.color === item.selectedColor);
      if (existing) {
        existing.quantity += qty;
        existing.deliveredQty += deliveredQty;
        existing.returnedQty += returnedQty;
      } else {
        grouped[productId].colors.push({
          color: item.selectedColor,
          quantity: qty,
          deliveredQty,
          returnedQty,
          price: p,
        });
      }
      grouped[productId].totalQuantity += qty;
      grouped[productId].totalDelivered += deliveredQty;
      grouped[productId].totalReturned += returnedQty;
      return;
    }

    // CASE 4: base
    const baseDelivery = resolveDeliveryBreakdown(productId, null, null, null);
    const baseDelivered = baseDelivery?.hasData ? baseDelivery.delivered : item.quantity || 0;
    const baseReturned = baseDelivery?.returned || 0;

    grouped[productId].baseRows.push({
      itemId: item._id,
      quantity: item.quantity || 0,
      deliveredQty: baseDelivered,
      returnedQty: baseReturned,
      price: item.discountPrice || item.regularPrice || 0,
    });
    grouped[productId].totalQuantity += item.quantity || 0;
    grouped[productId].totalDelivered += baseDelivered;
    grouped[productId].totalReturned += baseReturned;
  });

  return Object.values(grouped);
};

// ============================================================
// ORDER CARD
// ============================================================
// ============================================================
// ORDER CARD
// ============================================================
const OrderCard = ({ order, index, contactItems }) => {
  const [expanded, setExpanded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const statusInfo = STATUS_CONFIG[order.orderStatus] || STATUS_CONFIG['placed'];
  const StatusIcon = statusInfo.icon;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const isTerminal = ['cancelled', 'rejected', 'refunded', 'failed'].includes(order.orderStatus);
  const isDelivered = order.orderStatus === 'delivered';
  const isReturned = order.orderStatus === 'returned';
  const isPartialDelivery = order.orderStatus === 'partial_delivery';
  const isHold = order.orderStatus === 'hold';
  const hasDelivery = order.deliveryService?.courierOrderId;

  // Build delivery quantity map and pass it to grouping
  const deliveryQtyMap = buildDeliveryQtyMap(order);
  const groupedItems = groupItemsByProduct(order.items || [], deliveryQtyMap);

  const hasDeliveryData = !!deliveryQtyMap;
  const anyReturned =
    deliveryQtyMap &&
    Array.from(deliveryQtyMap.values()).some((v) => v.returned > 0);

  // ✅ Returned items — for the "Returned Items" table
  const returnedItems = (order.deliveryItems || []).filter(
    (di) => (di.returnedQuantity || 0) > 0
  );

  // ✅ Returned value — total price of returned units
  const returnedValue = returnedItems.reduce(
    (sum, di) => sum + ((di.returnedQuantity || 0) * (di.unitPrice || 0)),
    0
  );

  // ✅ Net paid = order.paidAmount if set, otherwise total - returned value
  const netPaidAmount = (order.paidAmount && order.paidAmount > 0)
    ? order.paidAmount
    : Math.max(0, (order.total || 0) - returnedValue);

  const showReturnedSection = returnedItems.length > 0;

  const getStatusTimeline = () => {
    if (!order.statusHistory || order.statusHistory.length === 0) {
      return [
        {
          status: order.orderStatus,
          label: getStatusLabel(order.orderStatus),
          timestamp: order.createdAt,
          isCurrent: true,
          isCompleted: true,
          color: getStatusBadgeColor(order.orderStatus),
        },
      ];
    }

    const uniqueStatuses = [];
    const seen = new Set();

    order.statusHistory.forEach((entry) => {
      if (!seen.has(entry.status)) {
        seen.add(entry.status);
        uniqueStatuses.push({
          status: entry.status,
          label: getStatusLabel(entry.status),
          timestamp: entry.timestamp,
          color: getStatusBadgeColor(entry.status),
        });
      }
    });

    const hasCurrentStatus = uniqueStatuses.some((s) => s.status === order.orderStatus);
    if (!hasCurrentStatus) {
      uniqueStatuses.push({
        status: order.orderStatus,
        label: getStatusLabel(order.orderStatus),
        timestamp: order.updatedAt || order.createdAt,
        color: getStatusBadgeColor(order.orderStatus),
      });
    }

    if (uniqueStatuses.length > 0) {
      uniqueStatuses[uniqueStatuses.length - 1].isCurrent = true;
      uniqueStatuses[uniqueStatuses.length - 1].isCompleted = true;
    }

    uniqueStatuses.forEach((s, idx) => {
      s.isCompleted = true;
      if (idx === uniqueStatuses.length - 1) s.isCurrent = true;
    });

    return uniqueStatuses;
  };

  const statusTimeline = getStatusTimeline();

  const handleDownloadInvoice = async (e) => {
    e.stopPropagation();
    setDownloading(true);
    try {
      const orderId = order._id || order.id || order.orderId;
      if (!orderId) {
        toast.error('Order ID not found');
        setDownloading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/orders/public/${orderId}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      if (data.success && data.data) {
        await generateInvoicePDF(data.data);
        toast.success('Invoice downloaded successfully!');
      } else {
        toast.error(data.error || 'Failed to fetch order details');
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download invoice');
    } finally {
      setDownloading(false);
    }
  };

  // Small helper component: renders a qty cell with delivered/returned info
  const QtyCell = ({ row }) => {
    const ordered = row.quantity || 0;
    const delivered = row.deliveredQty ?? ordered;
    const returned = row.returnedQty || 0;

    if (!hasDeliveryData) {
      return (
        <span className="font-medium" style={{ fontFamily: FONT_BODY, color: TEXT }}>
          {ordered}
        </span>
      );
    }

    return (
      <div className="flex flex-col items-center leading-tight">
        <span className="font-semibold" style={{ fontFamily: FONT_BODY, color: TEXT }}>
          {delivered}
        </span>
        {returned > 0 && (
          <span
            className="text-[8px] font-medium"
            style={{ fontFamily: FONT_BODY, color: '#9333ea' }}
            title={`${returned} returned`}
          >
            -{returned}
          </span>
        )}
        {returned > 0 && (
          <span
            className="text-[7px] opacity-70"
            style={{ fontFamily: FONT_BODY, color: MUTED }}
            title={`Ordered: ${ordered}`}
          >
            of {ordered}
          </span>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_-16px_rgba(41,54,47,0.18)]"
      style={{ borderColor: BORDER }}
    >
      {/* Top accent */}
      <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${BRAND} 0%, ${BRAND_DARK} 60%, ${SAGE} 100%)` }} />

      <div
        className="p-4 sm:p-5 cursor-pointer transition-colors"
        style={{ background: expanded ? CREAM_SOFT : '#ffffff' }}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 border"
              style={{ backgroundColor: CREAM, borderColor: BORDER }}
            >
              <StatusIcon className="w-5 h-5" style={{ color: BRAND }} />
            </div>
            <div className="min-w-0">
              <p
                className="text-[10px] tracking-[0.15em] uppercase font-semibold"
                style={{ fontFamily: FONT_BODY, color: MUTED }}
              >
                Order
              </p>
              <p
                className="text-[13px] font-mono truncate"
                style={{ fontFamily: FONT_BODY, color: TEXT }}
              >
                #{order.orderNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.12em]" style={{ fontFamily: FONT_BODY, color: MUTED }}>
                Total
              </p>
              <p className="text-[15px] font-semibold" style={{ fontFamily: FONT_HEADING, color: BRAND }}>
                ৳{order.total?.toFixed(2)}
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.08em] border ${getStatusBadgeColor(order.orderStatus)}`}
              style={{ fontFamily: FONT_BODY }}
            >
              {getStatusLabel(order.orderStatus)}
            </div>
            <button
              onClick={handleDownloadInvoice}
              disabled={downloading}
              className="p-2 rounded-full transition-colors disabled:opacity-50 hover:bg-[#f7f4ef]"
              title="Download Invoice"
              style={{ color: MUTED }}
            >
              {downloading ? (
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <FaDownload className="w-4 h-4" />
              )}
            </button>
            {expanded ? (
              <FaChevronUp className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
            ) : (
              <FaChevronDown className="w-4 h-4 flex-shrink-0" style={{ color: MUTED }} />
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px]" style={{ fontFamily: FONT_BODY, color: MUTED }}>
          <span className="flex items-center gap-1.5">
            <FaCalendarAlt className="w-3 h-3" />
            {new Date(order.createdAt).toLocaleDateString('en-BD', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </span>
          <span className="w-px h-3" style={{ backgroundColor: BORDER }} />
          <span>{order.items?.length || 0} item(s)</span>
          {anyReturned && (
            <>
              <span className="w-px h-3" style={{ backgroundColor: BORDER }} />
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                style={{ background: 'rgba(147,51,234,0.08)', color: '#7e22ce' }}
              >
                Some items returned
              </span>
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2 space-y-4 border-t"
              style={{ borderColor: BORDER }}
            >
              {/* ORDER PROGRESS */}
              {!isTerminal && statusTimeline.length > 0 && (
                <div className="mb-4">
                  <h4
                    className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-3 flex items-center gap-2"
                    style={{ fontFamily: FONT_BODY, color: TEXT }}
                  >
                    <FaClock className="w-3.5 h-3.5" style={{ color: BRAND }} />
                    Order Progress
                  </h4>
                  <div className="relative">
                    <div className="flex items-start justify-between overflow-x-auto pb-3 gap-1 sm:gap-2">
                      {statusTimeline.map((step, idx) => {
                        const isLast = idx === statusTimeline.length - 1;
                        const isCompleted = step.isCompleted;
                        const isCurrent = step.isCurrent;
                        const formattedTime = step.timestamp
                          ? new Date(step.timestamp).toLocaleString('en-BD', {
                              day: '2-digit',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : '';

                        return (
                          <div
                            key={step.status}
                            className="flex flex-col items-center flex-1 min-w-[60px] sm:min-w-[80px] relative"
                          >
                            {!isLast && (
                              <div
                                className="absolute top-3 sm:top-4 left-[55%] sm:left-[60%] w-[70%] sm:w-[80%] h-0.5"
                                style={{
                                  background: isCompleted
                                    ? `linear-gradient(90deg, ${BRAND}, ${BRAND_DARK})`
                                    : BORDER,
                                }}
                              />
                            )}

                            <div
                              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[8px] sm:text-xs font-bold z-10 ${isCurrent ? 'ring-2 sm:ring-4' : ''}`}
                              style={{
                                background: isCompleted
                                  ? `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`
                                  : CREAM,
                                color: isCompleted ? '#fff' : MUTED,
                                boxShadow: isCompleted ? `0 4px 12px -2px rgba(204,29,52,0.35)` : 'none',
                                ringColor: `${BRAND}33`,
                              }}
                            >
                              {isCompleted ? <FaCheck className="w-3 h-3 sm:w-4 sm:h-4" /> : idx + 1}
                            </div>

                            <span
                              className="text-[7px] sm:text-[9px] mt-1 sm:mt-1.5 text-center font-medium leading-tight"
                              style={{
                                fontFamily: FONT_BODY,
                                color: isCompleted ? TEXT : MUTED,
                              }}
                            >
                              {step.label}
                            </span>

                            {step.timestamp && (
                              <span
                                className="text-[6px] sm:text-[7px] mt-0.5 text-center max-w-[50px] sm:max-w-[90px] leading-tight"
                                style={{ fontFamily: FONT_BODY, color: MUTED, opacity: 0.7 }}
                              >
                                {formattedTime}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TERMINAL BANNER */}
              {isTerminal && (
                <div className="mb-4 p-3 rounded-xl border bg-red-50 border-red-200">
                  <div className="flex items-center gap-2 text-sm text-red-700">
                    <FaExclamationTriangle className="w-4 h-4" />
                    <span className="font-medium" style={{ fontFamily: FONT_BODY }}>
                      {order.orderStatus === 'cancelled'
                        ? 'Order Cancelled'
                        : order.orderStatus === 'rejected'
                        ? 'Order Rejected'
                        : order.orderStatus === 'refunded'
                        ? 'Order Refunded'
                        : 'Order Failed'}
                    </span>
                  </div>
                  {order.cancellationReason && (
                    <p className="text-xs text-red-600 mt-1" style={{ fontFamily: FONT_BODY }}>
                      Reason: {order.cancellationReason}
                    </p>
                  )}
                </div>
              )}

              {/* PARTIAL DELIVERY INFO BANNER */}
              {isPartialDelivery && (
                <div
                  className="mb-4 p-3 rounded-xl border"
                  style={{
                    background: 'rgba(245,158,11,0.06)',
                    borderColor: 'rgba(245,158,11,0.35)',
                  }}
                >
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#b45309' }}>
                    <FaBox className="w-4 h-4" />
                    <span className="font-medium" style={{ fontFamily: FONT_BODY }}>
                      Partial Delivery
                    </span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: '#92400e', fontFamily: FONT_BODY }}>
                    Some items from this order were delivered and some were returned. Quantities below reflect
                    what was actually delivered.
                  </p>
                </div>
              )}

              {/* RETURNED INFO BANNER */}
              {isReturned && (
                <div
                  className="mb-4 p-3 rounded-xl border"
                  style={{
                    background: 'rgba(147,51,234,0.06)',
                    borderColor: 'rgba(147,51,234,0.3)',
                  }}
                >
                  <div className="flex items-center gap-2 text-sm" style={{ color: '#7e22ce' }}>
                    <FaUndo className="w-4 h-4" />
                    <span className="font-medium" style={{ fontFamily: FONT_BODY }}>
                      Order Returned
                    </span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: '#6b21a8', fontFamily: FONT_BODY }}>
                    All items from this order were returned.
                  </p>
                </div>
              )}

              {/* PAYMENT + TRACKING ROW */}
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.12em]" style={{ fontFamily: FONT_BODY, color: MUTED }}>
                    Payment:
                  </span>
                  {getPaymentMethodBadge(order.paymentMethod)}
                </div>
                {order.trackingNumber && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.12em]" style={{ fontFamily: FONT_BODY, color: MUTED }}>
                      Tracking:
                    </span>
                    <span className="text-xs font-mono" style={{ fontFamily: FONT_BODY, color: TEXT }}>
                      {order.trackingNumber}
                    </span>
                  </div>
                )}
              </div>

              {/* DELIVERY INFO */}
              {hasDelivery && (
                <div
                  className="rounded-xl p-3 border"
                  style={{ background: CREAM_SOFT, borderColor: BORDER }}
                >
                  <h4
                    className="text-[11px] font-semibold uppercase tracking-[0.15em] flex items-center gap-2 mb-2"
                    style={{ fontFamily: FONT_BODY, color: TEXT }}
                  >
                    <FaTruck className="w-3.5 h-3.5" style={{ color: BRAND }} />
                    Courier Delivery Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                    <div>
                      <span style={{ color: MUTED, fontFamily: FONT_BODY }}>Courier Service: </span>
                      <span className="font-medium" style={{ color: TEXT, fontFamily: FONT_BODY }}>
                        {order.deliveryService?.courierName || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span style={{ color: MUTED, fontFamily: FONT_BODY }}>Tracking Number: </span>
                      <span className="font-mono" style={{ color: TEXT, fontFamily: FONT_BODY }}>
                        {order.deliveryService?.trackingNumber || 'N/A'}
                      </span>
                    </div>
                    {order.deliveryService?.trackingUrl && (
                      <div className="col-span-1 sm:col-span-2 mt-1 pt-1.5 border-t" style={{ borderColor: BORDER }}>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] uppercase tracking-[0.12em]" style={{ color: MUTED, fontFamily: FONT_BODY }}>
                            Track your parcel:
                          </span>
                          <a
                            href={order.deliveryService.trackingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] rounded-full text-white transition-all hover:opacity-90"
                            style={{
                              background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
                              fontFamily: FONT_BODY,
                              boxShadow: '0 4px 12px -4px rgba(204,29,52,0.5)',
                            }}
                          >
                            <FaExternalLinkAlt className="w-3 h-3" />
                            Track on {order.deliveryService?.courierName || 'Courier'}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ORDER ITEMS */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4
                    className="text-[11px] font-semibold uppercase tracking-[0.15em] flex items-center gap-2"
                    style={{ fontFamily: FONT_BODY, color: TEXT }}
                  >
                    <FaShoppingBag className="w-3.5 h-3.5" style={{ color: BRAND }} />
                    Order Items ({groupedItems.length} product{groupedItems.length > 1 ? 's' : ''})
                  </h4>
                  <span className="text-[10px]" style={{ color: MUTED, fontFamily: FONT_BODY }}>
                    Total: {order.items?.length || 0} item(s)
                  </span>
                </div>

                <div className="rounded-xl border overflow-hidden" style={{ borderColor: BORDER, background: CREAM_SOFT }}>
                  {/* Header */}
                  <div
                    className="grid grid-cols-12 gap-1 sm:gap-2 px-2 sm:px-3 py-2 border-b text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.1em]"
                    style={{ background: CREAM, borderColor: BORDER, color: MUTED, fontFamily: FONT_BODY }}
                  >
                    <div className="col-span-1 text-center">#</div>
                    <div className="col-span-4 sm:col-span-5">Product / Variant</div>
                    <div className="col-span-2 text-center">Color</div>
                    <div className="col-span-1 text-center">{hasDeliveryData ? 'Deliv.' : 'Qty'}</div>
                    <div className="col-span-1 text-center hidden sm:block">Unit</div>
                    <div className="col-span-1 text-right hidden sm:block">Price</div>
                    <div className="col-span-2 sm:col-span-1 text-right">Total</div>
                  </div>

                  <div className="max-h-60 overflow-y-auto">
                    {groupedItems.length === 0 ? (
                      <div className="text-center py-4 text-xs" style={{ color: MUTED, fontFamily: FONT_BODY }}>
                        No items found
                      </div>
                    ) : (
                      groupedItems.map((group, idx) => {
                        const rows = [];
                        const hasVariants = group.variantRows.length > 0;

                        if (hasVariants) {
                          let productTotal = 0;
                          let productQty = 0;
                          let productDelivered = 0;
                          let productReturned = 0;

                          group.baseRows.forEach((br) => {
                            productTotal += br.price * br.quantity;
                            productQty += br.quantity;
                            productDelivered += br.deliveredQty ?? br.quantity;
                            productReturned += br.returnedQty || 0;
                          });
                          group.colors.forEach((c) => {
                            productTotal += c.price * c.quantity;
                            productQty += c.quantity;
                            productDelivered += c.deliveredQty ?? c.quantity;
                            productReturned += c.returnedQty || 0;
                          });
                          group.variantRows.forEach((v) => {
                            productTotal += v.price * v.quantity;
                            productQty += v.quantity;
                            productDelivered += v.deliveredQty ?? v.quantity;
                            productReturned += v.returnedQty || 0;
                          });

                          rows.push({
                            kind: 'product-header',
                            name: group.productName,
                            color: null,
                            quantity: productQty,
                            deliveredQty: productDelivered,
                            returnedQty: productReturned,
                            price: productQty > 0 ? productTotal / productQty : 0,
                            originalPrice: null,
                            hasDiscount: false,
                            unit: group.unit,
                            indent: 0,
                            badge: 'Product',
                            image: group.image,
                            isHeaderOnly: false,
                            rowTotal: productTotal,
                            showVariantsNote: true,
                          });

                          group.baseRows.forEach((br) => {
                            rows.push({
                              kind: 'base',
                              name: group.productName,
                              color: null,
                              quantity: br.quantity,
                              deliveredQty: br.deliveredQty,
                              returnedQty: br.returnedQty,
                              price: br.price,
                              originalPrice: null,
                              hasDiscount: false,
                              unit: group.unit,
                              indent: 1,
                              badge: null,
                              image: null,
                              isHeaderOnly: false,
                              rowTotal: br.price * br.quantity,
                            });
                          });

                          group.colors.forEach((c) => {
                            rows.push({
                              kind: 'color',
                              name: group.productName,
                              color: c.color,
                              quantity: c.quantity,
                              deliveredQty: c.deliveredQty,
                              returnedQty: c.returnedQty,
                              price: c.price,
                              originalPrice: null,
                              hasDiscount: false,
                              unit: group.unit,
                              indent: 1,
                              badge: null,
                              image: null,
                              isHeaderOnly: false,
                              rowTotal: c.price * c.quantity,
                            });
                          });

                          const variantGroups = {};
                          group.variantRows.forEach((v) => {
                            const key = v.variantId || 'unknown';
                            if (!variantGroups[key]) variantGroups[key] = [];
                            variantGroups[key].push(v);
                          });

                          Object.values(variantGroups).forEach((variants) => {
                            variants.sort((a, b) => {
                              if (!a.isSubVariant && b.isSubVariant) return -1;
                              if (a.isSubVariant && !b.isSubVariant) return 1;
                              return 0;
                            });

                            const hasSubVariantInGroup = variants.some((v) => v.isSubVariant);

                            variants.forEach((v) => {
                              const isVariantRow = !v.isSubVariant;
                              const isHeaderOnly =
                                isVariantRow && hasSubVariantInGroup && (v.quantity || 0) === 0;

                              rows.push({
                                kind: isVariantRow ? 'variant' : 'subVariant',
                                name: isVariantRow ? v.variantName : v.subVariantName,
                                parentVariantName: v.variantName,
                                color: v.selectedColor,
                                quantity: v.quantity,
                                deliveredQty: v.deliveredQty,
                                returnedQty: v.returnedQty,
                                price: v.price,
                                originalPrice: v.originalPrice,
                                hasDiscount: v.hasDiscount,
                                unit: v.unit,
                                indent: isVariantRow ? 1 : 2,
                                badge: isVariantRow ? 'Variant' : 'Sub',
                                image: null,
                                isHeaderOnly,
                                rowTotal: v.price * v.quantity,
                              });
                            });
                          });
                        } else {
                          group.baseRows.forEach((br) => {
                            rows.push({
                              kind: 'base',
                              name: group.productName,
                              color: null,
                              quantity: br.quantity,
                              deliveredQty: br.deliveredQty,
                              returnedQty: br.returnedQty,
                              price: br.price,
                              originalPrice: null,
                              hasDiscount: false,
                              unit: group.unit,
                              indent: 0,
                              badge: null,
                              image: group.image,
                              isHeaderOnly: false,
                              isFirstOfGroup: rows.length === 0,
                              rowTotal: br.price * br.quantity,
                            });
                          });

                          group.colors.forEach((c) => {
                            rows.push({
                              kind: 'color',
                              name: group.productName,
                              color: c.color,
                              quantity: c.quantity,
                              deliveredQty: c.deliveredQty,
                              returnedQty: c.returnedQty,
                              price: c.price,
                              originalPrice: null,
                              hasDiscount: false,
                              unit: group.unit,
                              indent: 0,
                              badge: null,
                              image: group.image,
                              isHeaderOnly: false,
                              isFirstOfGroup: rows.length === 0,
                              rowTotal: c.price * c.quantity,
                            });
                          });
                        }

                        return rows.map((row, rowIndex) => {
                          const indent = row.indent || 0;
                          const paddingLeft = indent === 0 ? 'pl-0' : indent === 1 ? 'pl-3' : 'pl-6';
                          const hasColor = !!row.color;
                          const isHeaderOnly = row.isHeaderOnly;
                          const isProductRow = row.kind === 'product-header';
                          const isBaseOrColorRow = row.kind === 'base' || row.kind === 'color';
                          const isFirstOfGroup = row.isFirstOfGroup || isProductRow;
                          const rowTotal = row.rowTotal !== undefined ? row.rowTotal : row.price * row.quantity;

                          return (
                            <div
                              key={`${idx}-${rowIndex}`}
                              className="grid grid-cols-12 gap-1 sm:gap-2 px-2 sm:px-3 py-2 items-center border-b last:border-0 transition-colors"
                              style={{ borderColor: BORDER }}
                            >
                              <div className="col-span-1 text-center text-[8px] sm:text-[10px]" style={{ fontFamily: FONT_BODY, color: MUTED }}>
                                {isProductRow || isFirstOfGroup ? idx + 1 : ''}
                              </div>

                              <div className={`col-span-4 sm:col-span-5 flex items-center gap-1.5 sm:gap-2 min-w-0 ${paddingLeft}`}>
                                {isFirstOfGroup && row.image ? (
                                  <img
                                    src={row.image}
                                    alt={row.name}
                                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg object-cover flex-shrink-0 border bg-white"
                                    style={{ borderColor: BORDER }}
                                    onError={(e) => {
                                      e.target.src = 'https://via.placeholder.com/32?text=P';
                                    }}
                                  />
                                ) : (
                                  !isFirstOfGroup &&
                                  indent > 0 && (
                                    <span className="w-6 sm:w-8 flex-shrink-0 text-[10px] text-center font-medium" style={{ color: MUTED }}>
                                      {indent === 2 ? '→' : '▸'}
                                    </span>
                                  )
                                )}

                                <div className="min-w-0 flex flex-wrap items-center gap-1">
                                  <p
                                    className={`truncate ${
                                      isProductRow
                                        ? 'text-[10px] sm:text-[12px] font-semibold'
                                        : isBaseOrColorRow
                                        ? 'text-[9px] sm:text-[11px] font-medium'
                                        : indent === 1
                                        ? 'text-[9px] sm:text-[11px] font-medium'
                                        : 'text-[9px] sm:text-[11px]'
                                    }`}
                                    title={row.name}
                                    style={{
                                      fontFamily: FONT_BODY,
                                      color: isProductRow ? TEXT : indent === 1 ? BRAND_DARK : MUTED,
                                    }}
                                  >
                                    {row.name}
                                  </p>

                                  {row.badge && (
                                    <span
                                      className={`text-[7px] sm:text-[8px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider ${
                                        row.badge === 'Product'
                                          ? 'bg-[#f7f4ef] text-[#687169]'
                                          : row.badge === 'Variant'
                                          ? 'bg-purple-50 text-purple-700'
                                          : 'bg-blue-50 text-blue-700'
                                      }`}
                                      style={{ fontFamily: FONT_BODY }}
                                    >
                                      {row.badge}
                                    </span>
                                  )}

                                  {row.showVariantsNote && (
                                    <span className="text-[7px] sm:text-[8px] italic" style={{ color: MUTED, fontFamily: FONT_BODY }}>
                                      (See variants below)
                                    </span>
                                  )}

                                  {row.hasDiscount && !isHeaderOnly && !isProductRow && (
                                    <span
                                      className="text-[7px] sm:text-[8px] font-semibold px-1.5 py-0.5 rounded"
                                      style={{ background: '#f0f5ed', color: SAGE_DARK, fontFamily: FONT_BODY }}
                                    >
                                      Save {Math.round(((row.originalPrice - row.price) / row.originalPrice) * 100)}%
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div className="col-span-2 flex justify-center items-center">
                                {hasColor ? (
                                  <div
                                    className="w-5 h-5 rounded-full border-2 shadow-sm"
                                    style={{ backgroundColor: row.color, borderColor: BORDER }}
                                    title={row.color}
                                  />
                                ) : (
                                  <span className="text-[8px] sm:text-[10px]" style={{ color: MUTED }}>
                                    —
                                  </span>
                                )}
                              </div>

                              <div className="col-span-1 text-center text-[9px] sm:text-xs" style={{ fontFamily: FONT_BODY }}>
                                {isHeaderOnly ? (
                                  <span style={{ color: MUTED }}>—</span>
                                ) : (
                                  <QtyCell row={row} />
                                )}
                              </div>

                              <div className="col-span-1 text-center text-[8px] sm:text-[10px] hidden sm:block" style={{ fontFamily: FONT_BODY, color: MUTED }}>
                                {isHeaderOnly ? '' : row.unit || 'pcs'}
                              </div>

                              <div className="col-span-1 text-right text-[8px] sm:text-[10px] hidden sm:block" style={{ fontFamily: FONT_BODY, color: MUTED }}>
                                {isHeaderOnly ? (
                                  <span style={{ color: MUTED }}>—</span>
                                ) : (
                                  <>
                                    <span className={row.hasDiscount ? 'font-medium' : ''} style={{ color: row.hasDiscount ? SAGE_DARK : MUTED }}>
                                      ৳{row.price.toFixed(2)}
                                    </span>
                                    {row.hasDiscount && (
                                      <span className="line-through ml-1" style={{ color: MUTED, opacity: 0.6 }}>
                                        ৳{row.originalPrice.toFixed(2)}
                                      </span>
                                    )}
                                  </>
                                )}
                              </div>

                              <div className="col-span-2 sm:col-span-1 text-right text-[9px] sm:text-xs font-semibold" style={{ fontFamily: FONT_BODY, color: BRAND }}>
                                {isHeaderOnly ? <span style={{ color: MUTED }}>—</span> : <>৳{rowTotal.toFixed(2)}</>}
                              </div>
                            </div>
                          );
                        });
                      })
                    )}
                  </div>

                  {/* Footer — now shows Total / Returned / Net Paid when returned items exist */}
                  <div
                    className="border-t px-2 sm:px-3 py-3"
                    style={{ borderColor: BORDER, background: CREAM }}
                  >
                    <div className="flex flex-wrap justify-end items-center gap-2 sm:gap-6 text-[10px] sm:text-xs" style={{ fontFamily: FONT_BODY }}>
                      <div>
                        <span style={{ color: MUTED }}>Subtotal:</span>
                        <span className="font-medium ml-1" style={{ color: TEXT }}>
                          ৳{order.subtotal?.toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span style={{ color: MUTED }}>Shipping:</span>
                        <span className="font-medium ml-1" style={{ color: TEXT }}>
                          ৳{order.shippingCost?.toFixed(2)}
                        </span>
                      </div>
                      {order.discount > 0 && (
                        <div>
                          <span style={{ color: SAGE_DARK }}>Discount:</span>
                          <span className="font-medium ml-1" style={{ color: SAGE_DARK }}>
                            - ৳{order.discount?.toFixed(2)}
                          </span>
                        </div>
                      )}

                      {/* ✅ Total */}
                      <div className="pl-2 sm:pl-4 border-l-2" style={{ borderColor: BRAND }}>
                        <span className="font-bold" style={{ color: TEXT }}>Total:</span>
                        <span className="font-bold ml-1" style={{ color: BRAND, fontFamily: FONT_HEADING, fontSize: '1.05rem' }}>
                          ৳{order.total?.toFixed(2)}
                        </span>
                      </div>

                      {/* ✅ Returned value — only when there are returns */}
                      {showReturnedSection && (
                        <div className="pl-2 sm:pl-4 border-l-2" style={{ borderColor: '#9333ea' }}>
                          <span className="font-bold" style={{ color: '#7e22ce' }}>Returned:</span>
                          <span className="font-bold ml-1" style={{ color: '#7e22ce', fontFamily: FONT_HEADING, fontSize: '1.05rem' }}>
                            - ৳{returnedValue.toFixed(2)}
                          </span>
                        </div>
                      )}

                      {/* ✅ Net Paid */}
                      {showReturnedSection && (
                        <div className="pl-2 sm:pl-4 border-l-2 border-double" style={{ borderColor: SAGE_DARK }}>
                          <span className="font-bold" style={{ color: SAGE_DARK }}>Net Paid:</span>
                          <span className="font-bold ml-1" style={{ color: SAGE_DARK, fontFamily: FONT_HEADING, fontSize: '1.05rem' }}>
                            ৳{netPaidAmount.toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ============================================================ */}
              {/* ✅ NEW: RETURNED ITEMS TABLE (only for partial/returned)       */}
              {/* ============================================================ */}
              {showReturnedSection && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4
                      className="text-[11px] font-semibold uppercase tracking-[0.15em] flex items-center gap-2"
                      style={{ fontFamily: FONT_BODY, color: '#7e22ce' }}
                    >
                      <FaUndo className="w-3.5 h-3.5" style={{ color: '#7e22ce' }} />
                      Returned Items ({returnedItems.length})
                    </h4>
                    <span className="text-[10px]" style={{ color: MUTED, fontFamily: FONT_BODY }}>
                      Value: ৳{returnedValue.toFixed(2)}
                    </span>
                  </div>

                  <div
                    className="rounded-xl border overflow-hidden"
                    style={{
                      borderColor: 'rgba(147,51,234,0.25)',
                      background: 'rgba(147,51,234,0.04)',
                    }}
                  >
                    {/* Header */}
                    <div
                      className="grid grid-cols-12 gap-1 sm:gap-2 px-2 sm:px-3 py-2 border-b text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.1em]"
                      style={{
                        background: 'rgba(147,51,234,0.08)',
                        borderColor: 'rgba(147,51,234,0.2)',
                        color: '#7e22ce',
                        fontFamily: FONT_BODY,
                      }}
                    >
                      <div className="col-span-1 text-center">#</div>
                      <div className="col-span-5 sm:col-span-6">Product / Variant</div>
                      <div className="col-span-2 text-center">Returned</div>
                      <div className="col-span-2 sm:col-span-1 text-right">Price</div>
                      <div className="col-span-2 sm:col-span-2 text-right">Total</div>
                    </div>

                    <div className="max-h-60 overflow-y-auto">
                      {returnedItems.map((di, idx) => {
                        const label = [di.productName, di.variantName, di.subVariantName]
                          .filter(Boolean)
                          .join(' / ');
                        const qty = di.returnedQuantity || 0;
                        const unitPrice = di.unitPrice || 0;
                        const lineTotal = qty * unitPrice;

                        return (
                          <div
                            key={di._id || idx}
                            className="grid grid-cols-12 gap-1 sm:gap-2 px-2 sm:px-3 py-2 items-center border-b last:border-0"
                            style={{ borderColor: 'rgba(147,51,234,0.12)' }}
                          >
                            <div
                              className="col-span-1 text-center text-[8px] sm:text-[10px]"
                              style={{ fontFamily: FONT_BODY, color: MUTED }}
                            >
                              {idx + 1}
                            </div>

                            <div className="col-span-5 sm:col-span-6 flex items-center gap-1.5 sm:gap-2 min-w-0">
                              {di.image ? (
                                <img
                                  src={di.image}
                                  alt={di.productName}
                                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg object-cover flex-shrink-0 border bg-white"
                                  style={{ borderColor: 'rgba(147,51,234,0.2)' }}
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/32?text=P';
                                  }}
                                />
                              ) : (
                                <span
                                  className="w-6 sm:w-8 flex-shrink-0 text-[10px] text-center font-medium"
                                  style={{ color: MUTED }}
                                >
                                  ↺
                                </span>
                              )}

                              <div className="min-w-0 flex flex-wrap items-center gap-1">
                                <p
                                  className="truncate text-[9px] sm:text-[11px] font-medium"
                                  title={label}
                                  style={{ fontFamily: FONT_BODY, color: TEXT }}
                                >
                                  {label}
                                </p>
                                <span
                                  className="text-[7px] sm:text-[8px] px-1.5 py-0.5 rounded font-semibold uppercase tracking-wider"
                                  style={{
                                    background: 'rgba(147,51,234,0.1)',
                                    color: '#7e22ce',
                                    fontFamily: FONT_BODY,
                                  }}
                                >
                                  Returned
                                </span>
                                {di.selectedColor && (
                                  <div className="flex items-center gap-1">
                                    <span
                                      className="w-3 h-3 rounded-full border"
                                      style={{
                                        backgroundColor: di.selectedColor,
                                        borderColor: BORDER,
                                      }}
                                      title={di.selectedColor}
                                    />
                                  </div>
                                )}
                              </div>
                            </div>

                            <div
                              className="col-span-2 text-center text-[10px] sm:text-xs font-semibold"
                              style={{ fontFamily: FONT_BODY, color: '#7e22ce' }}
                            >
                              {qty}
                            </div>

                            <div
                              className="col-span-2 sm:col-span-1 text-right text-[8px] sm:text-[10px]"
                              style={{ fontFamily: FONT_BODY, color: MUTED }}
                            >
                              ৳{unitPrice.toFixed(2)}
                            </div>

                            <div
                              className="col-span-2 text-right text-[9px] sm:text-xs font-semibold"
                              style={{ fontFamily: FONT_BODY, color: '#7e22ce' }}
                            >
                              ৳{lineTotal.toFixed(2)}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Footer */}
                    <div
                      className="border-t px-2 sm:px-3 py-2 flex flex-wrap justify-end items-center gap-2 sm:gap-4 text-[10px] sm:text-xs"
                      style={{
                        borderColor: 'rgba(147,51,234,0.2)',
                        background: 'rgba(147,51,234,0.06)',
                        fontFamily: FONT_BODY,
                      }}
                    >
                      <div>
                        <span style={{ color: MUTED }}>Returned Value:</span>
                        <span className="font-bold ml-1" style={{ color: '#7e22ce' }}>
                          ৳{returnedValue.toFixed(2)}
                        </span>
                      </div>
                      <div className="pl-2 sm:pl-4 border-l-2" style={{ borderColor: '#9333ea' }}>
                        <span className="font-bold" style={{ color: SAGE_DARK }}>Net Paid:</span>
                        <span className="font-bold ml-1" style={{ color: SAGE_DARK, fontFamily: FONT_HEADING }}>
                          ৳{netPaidAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TIMELINE */}
              {order.timeline && order.timeline.length > 0 && (
                <div>
                  <h4
                    className="text-[11px] font-semibold uppercase tracking-[0.15em] mb-2 flex items-center gap-2"
                    style={{ fontFamily: FONT_BODY, color: TEXT }}
                  >
                    <FaClock className="w-3.5 h-3.5" style={{ color: BRAND }} />
                    Status History
                  </h4>
                  <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2">
                    {order.timeline.map((entry, idx) => {
                      const entryStatusInfo = STATUS_CONFIG[entry.status] || STATUS_CONFIG['placed'];
                      const isCurrent = entry.status === order.orderStatus;
                      const displayLabel = entryStatusInfo.label || entry.status;

                      return (
                        <div key={idx} className="flex items-start gap-2.5">
                          <div
                            className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                            style={{
                              background: isCurrent ? `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})` : BORDER,
                              boxShadow: isCurrent ? `0 0 0 3px rgba(204,29,52,0.15)` : 'none',
                            }}
                          />
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span
                                className="text-xs font-medium"
                                style={{ fontFamily: FONT_BODY, color: isCurrent ? BRAND : TEXT }}
                              >
                                {displayLabel}
                              </span>
                              <span className="text-[9px]" style={{ fontFamily: FONT_BODY, color: MUTED }}>
                                {entry.formattedDate}
                              </span>
                            </div>
                            {entry.note && (
                              <p className="text-[10px]" style={{ fontFamily: FONT_BODY, color: MUTED }}>
                                {entry.note}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* DOWNLOAD BUTTON */}
              <button
                onClick={handleDownloadInvoice}
                disabled={downloading}
                className="w-full py-3 rounded-xl text-white transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[0.1em] hover:opacity-90"
                style={{
                  background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
                  fontFamily: FONT_BODY,
                  boxShadow: '0 8px 24px -8px rgba(204,29,52,0.5)',
                  letterSpacing: '0.12em',
                }}
              >
                {downloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating Invoice...
                  </>
                ) : (
                  <>
                    <FaFileInvoice className="w-4 h-4" />
                    Download Invoice
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
// ============================================================
// MAIN TRACK PAGE
// ============================================================
export default function TrackPage() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [footerData, setFooterData] = useState(null);
  const [contactItems, setContactItems] = useState([]);

  useEffect(() => {
    const loadFooterData = async () => {
      const data = await fetchFooterData();
      if (data) {
        setFooterData(data);
        const contacts = getContactItemsFromFooter(data);
        setContactItems(contacts);
      } else {
        setContactItems([
          { icon: FaPhone, label: 'Phone', value: '+880 1XXXXXXXXX', link: 'tel:+8801XXXXXXXXX', color: 'text-[#8A2530]' },
          { icon: FaEnvelope, label: 'Email', value: 'support@example.com', link: 'mailto:support@example.com', color: 'text-[#8A2530]' },
          { icon: FaWhatsapp, label: 'WhatsApp', value: '+880 1XXXXXXXXX', link: 'https://wa.me/8801XXXXXXXXX', color: 'text-[#6b7d63]' },
        ]);
      }
    };
    loadFooterData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!phone.trim()) {
      toast.error('Please enter a phone number');
      return;
    }

    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(phone.trim())) {
      toast.error('Please enter a valid Bangladesh phone number (01XXXXXXXXX)');
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const response = await fetch(`${API_URL}/api/orders/track/${phone.trim()}`);
      const data = await response.json();

      if (data.success) {
        setTrackingData(data.data);
        toast.success(`Found ${data.data.totalOrders} order(s)`);
      } else {
        setError(data.error || 'No orders found for this phone number');
        setTrackingData(null);
      }
    } catch (error) {
      console.error('Track error:', error);
      setError('Network error. Please try again.');
      setTrackingData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleContactClick = (contact) => {
    if (contact.label === 'Phone') {
      window.location.href = contact.link;
    } else if (contact.label === 'Email') {
      const email = contact.link.replace('mailto:', '');
      window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
    } else if (contact.label === 'WhatsApp') {
      window.open(contact.link, '_blank', 'noopener,noreferrer');
    } else {
      window.open(contact.link, '_blank');
    }
  };

  const getIcon = (IconComponent, className = 'w-3 h-3 sm:w-4 sm:h-4') => {
    return <IconComponent className={className} />;
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-12 lg:pt-10 pb-8 relative overflow-hidden" style={{ background: CREAM }}>
        {/* Background glow orbs */}
        <div
          className="pointer-events-none absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
          style={{ background: '#d7dfd2', top: '-200px', left: '-160px' }}
        />
        <div
          className="pointer-events-none absolute w-[450px] h-[450px] rounded-full blur-[120px] opacity-25"
          style={{ background: '#e7d9d0', top: '120px', right: '-140px' }}
        />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-6 sm:mb-8"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-3">
              <DotLottieReact src="/animations/track.lottie" loop autoplay className="w-full h-full" />
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="h-px w-8" style={{ background: SAGE }} />
              <span
                className="text-[9px] font-semibold uppercase tracking-[0.35em]"
                style={{ color: MUTED, fontFamily: FONT_BODY }}
              >
                Order Tracking
              </span>
              <span className="h-px w-8" style={{ background: SAGE }} />
            </div>

            <h1
              className="text-[34px] sm:text-[48px] font-light leading-[1.05] tracking-[-0.03em]"
              style={{ fontFamily: FONT_HEADING, color: TEXT }}
            >
              Track Your{' '}
              <span className="italic" style={{ color: BRAND }}>
                Orders
              </span>
            </h1>
            <p
              className="text-sm mt-2 max-w-md mx-auto"
              style={{ fontFamily: FONT_BODY, color: MUTED }}
            >
              Enter your phone number to see all your orders
            </p>
          </motion.div>

          {/* SEARCH FORM */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative bg-white rounded-2xl p-5 sm:p-6 mb-6 sm:mb-8 shadow-[0_20px_60px_-24px_rgba(41,54,47,0.18)] border"
            style={{ borderColor: BORDER }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
              style={{
                background: `linear-gradient(90deg, ${BRAND} 0%, ${BRAND_DARK} 60%, ${SAGE} 100%)`,
              }}
            />

            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mt-1">
              <div className="flex-1 relative group">
                <FaPhone
                  className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 transition-colors"
                  style={{ color: MUTED }}
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full pl-10 pr-3 py-3 text-sm rounded-xl outline-none transition-all"
                  style={{
                    fontFamily: FONT_BODY,
                    background: CREAM_SOFT,
                    border: `1px solid ${BORDER}`,
                    color: TEXT,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = BRAND;
                    e.target.style.boxShadow = `0 0 0 3px ${BRAND}15`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = BORDER;
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 text-white font-semibold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-sm uppercase tracking-[0.12em] hover:opacity-90"
                style={{
                  background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
                  fontFamily: FONT_BODY,
                  boxShadow: '0 8px 24px -8px rgba(204,29,52,0.5)',
                }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <FaSearch className="w-3.5 h-3.5" />
                    Track Orders
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* ERROR */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-l-4 border-red-500 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FaExclamationTriangle className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-red-700 font-medium" style={{ fontFamily: FONT_BODY }}>
                    No Orders Found
                  </p>
                  <p className="text-xs text-red-600" style={{ fontFamily: FONT_BODY }}>
                    {error}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* RESULTS */}
          {trackingData && (
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl p-5 text-white shadow-lg relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
                  boxShadow: '0 20px 60px -20px rgba(204,29,52,0.55)',
                }}
              >
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-white/5 blur-2xl" />

                <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
                  <div>
                    <p
                      className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-1"
                      style={{ fontFamily: FONT_BODY }}
                    >
                      Phone Number
                    </p>
                    <p className="text-lg font-medium" style={{ fontFamily: FONT_HEADING }}>
                      {trackingData.phone}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-1"
                      style={{ fontFamily: FONT_BODY }}
                    >
                      Total Orders
                    </p>
                    <p className="text-3xl font-light" style={{ fontFamily: FONT_HEADING }}>
                      {trackingData.totalOrders}
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="space-y-3">
                {trackingData.orders.map((order, index) => (
                  <OrderCard
                    key={order.orderNumber || index}
                    order={order}
                    index={index}
                    contactItems={contactItems}
                  />
                ))}
              </div>

              <div className="text-center pt-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] transition-colors"
                  style={{ color: BRAND, fontFamily: FONT_BODY }}
                >
                  <span>←</span> Continue Shopping
                </Link>
              </div>
            </div>
          )}

          {/* EMPTY STATE */}
          {!trackingData && !error && !loading && searched && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 sm:p-12 text-center shadow-sm border"
              style={{ borderColor: BORDER }}
            >
              <div
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center border"
                style={{ background: CREAM, borderColor: BORDER }}
              >
                <FaSearch className="w-7 h-7" style={{ color: MUTED }} />
              </div>
              <h3
                className="text-lg font-light mb-2"
                style={{ fontFamily: FONT_HEADING, color: TEXT }}
              >
                No Orders Found
              </h3>
              <p className="text-sm" style={{ fontFamily: FONT_BODY, color: MUTED }}>
                We couldn&apos;t find any orders with this phone number.
              </p>
              <p className="text-xs mt-2" style={{ fontFamily: FONT_BODY, color: MUTED, opacity: 0.75 }}>
                Please check the number and try again.
              </p>
            </motion.div>
          )}

          {/* TRUST STRIP */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-2" style={{ color: MUTED, fontFamily: FONT_BODY }}>
              <FaShieldAlt className="w-4 h-4" style={{ color: BRAND }} />
              <span className="uppercase tracking-[0.12em] font-semibold text-[10px]">Secure Tracking</span>
            </div>
            <span className="w-px h-4" style={{ background: BORDER }} />
            <div className="flex items-center gap-2" style={{ color: MUTED, fontFamily: FONT_BODY }}>
              <FaClock className="w-4 h-4" style={{ color: BRAND }} />
              <span className="uppercase tracking-[0.12em] font-semibold text-[10px]">Real-time Updates</span>
            </div>
            <span className="w-px h-4" style={{ background: BORDER }} />
            <div className="flex items-center gap-2" style={{ color: MUTED, fontFamily: FONT_BODY }}>
              <FaStar className="w-4 h-4" style={{ color: BRAND }} />
              <span className="uppercase tracking-[0.12em] font-semibold text-[10px]">Premium Quality</span>
            </div>
          </div>

          {/* CONTACT STRIP */}
          <div className="mt-6 sm:mt-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaLeaf className="w-3 h-3" style={{ color: SAGE }} />
              <p
                className="text-[10px] uppercase tracking-[0.2em] font-semibold"
                style={{ fontFamily: FONT_BODY, color: MUTED }}
              >
                Need help? Contact support
              </p>
              <FaLeaf className="w-3 h-3" style={{ color: SAGE }} />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
              {contactItems.map((contact, index) => (
                <button
                  key={index}
                  onClick={() => handleContactClick(contact)}
                  className={`text-sm hover:opacity-80 transition-colors flex items-center gap-1.5 ${contact.color}`}
                  style={{ fontFamily: FONT_BODY }}
                >
                  {getIcon(contact.icon)}
                  <span>{contact.value}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}