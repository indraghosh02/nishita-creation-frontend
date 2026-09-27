
// // src/app/authorize/dashboard/page.js
// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion';

// import {
//   FaBox,
//   FaShoppingCart,
//   FaMoneyBillWave,
//   FaUsers,
//   FaChartLine,
//   FaStar,
//   FaClock,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaTruck,
//   FaEye,
//   FaSpinner,
//   FaCalendarAlt,
//   FaChevronDown,
//   FaChevronUp,
//   FaDownload,
//   FaFilter,
//   FaPercent,
//   FaDollarSign,
//   FaStore,
//   FaArrowRight,
//   FaPhone,
//   FaUserCircle,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaTag,
//   FaFire,
//   FaRocket,
//   FaAward,
//   FaClipboardList,
//   FaChartBar
// } from 'react-icons/fa';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // ============================================================
// // FONT CONSTANTS - MATCHING ABOUT PAGE
// // ============================================================
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', Georgia, serif";
// const FONT_FAMILY_INTER = "'Inter', sans-serif";

// // ============================================================
// // COLOR PALETTE - MATCHING ABOUT PAGE
// // ============================================================
// const COLORS = {
//   primary: '#52665a',
//   primaryDark: '#405347',
//   primaryLight: '#71816F',
//   accent: '#B88C8D',
//   accentLight: '#E8C8C7',
//   accentDark: '#9C7072',
//   bgCream: '#f7f4ef',
//   bgWarm: '#F8F5F0',
//   bgLight: '#faf9f5',
//   textDark: '#29362f',
//   textMedium: '#526257',
//   textLight: '#687169',
//   textMuted: '#85827B',
//   borderLight: '#e2e3dd',
//   borderMedium: '#DED8D1',
//   borderAccent: '#bfc5bd',
// };

// // ============================================================
// // HELPER FUNCTIONS
// // ============================================================

// const getUserRole = () => {
//   try {
//     const userData = localStorage.getItem('user');
//     if (userData) {
//       const parsed = JSON.parse(userData);
//       return parsed.role || '';
//     }
//     return '';
//   } catch (error) {
//     return '';
//   }
// };

// const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-BD', {
//     style: 'currency',
//     currency: 'BDT',
//     minimumFractionDigits: 0
//   }).format(amount || 0);
// };

// const formatDate = (date) => {
//   if (!date) return 'N/A';
//   return new Date(date).toLocaleDateString('en-BD', {
//     day: '2-digit',
//     month: 'short',
//     year: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });
// };

// // ========== UPDATED: GET STATUS COLOR - SAGE GREEN STYLE ==========
// const getStatusColor = (status) => {
//   const colors = {
//     placed: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
//     follow_up: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
//     reminder: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
//     accepted: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
//     approved: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
//     hold: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
//     ready_to_ship: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
//     courier_assigned: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
//     processing: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
//     shipped: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
//     out_for_delivery: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
//     delivered: 'bg-black/10 text-black border-black/20',
//     cancelled: 'bg-red-50 text-red-600 border-red-200',
//     rejected: 'bg-red-50 text-red-600 border-red-200',
//     returned: 'bg-purple-50 text-purple-600 border-purple-200',
//     refunded: 'bg-gray-100 text-gray-600 border-gray-200',
//     failed: 'bg-red-50 text-red-600 border-red-200',
//     partial_delivery: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60'
//   };
//   return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
// };

// // ========== UPDATED: GET STATUS LABEL ==========
// const getStatusLabel = (status) => {
//   const labels = {
//     placed: 'Placed',
//     follow_up: 'Follow Up',
//     reminder: 'Reminder',
//     accepted: 'Accepted',
//     approved: 'Approved',
//     hold: 'On Hold',
//     ready_to_ship: 'Ready to Ship',
//     courier_assigned: 'Courier Assigned',
//     processing: 'Processing',
//     shipped: 'Shipped',
//     out_for_delivery: 'Out for Delivery',
//     delivered: 'Delivered',
//     cancelled: 'Cancelled',
//     rejected: 'Rejected',
//     returned: 'Returned',
//     refunded: 'Refunded',
//     failed: 'Failed',
//     partial_delivery: 'Partial Delivery'
//   };
//   return labels[status] || status;
// };

// // ============================================================
// // STAT CARD COMPONENT - SAGE GREEN STYLE
// // ============================================================

// const StatCard = ({ title, value, icon, color, subtitle, onClick, loading }) => {
//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e3dd]/60 animate-pulse">
//         <div className="h-3 bg-[#e2e3dd]/60 rounded w-1/2 mb-2"></div>
//         <div className="h-7 bg-[#e2e3dd]/60 rounded w-3/4"></div>
//       </div>
//     );
//   }

//   return (
//     <div 
//       className={`bg-white rounded-2xl p-4 shadow-sm border border-[#e2e3dd]/60 hover:shadow-[0_8px_25px_rgba(82,102,90,0.12)] transition-all ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
//       onClick={onClick}
//     >
//       <div className="flex items-start justify-between">
//         <div>
//           <p className="text-xs text-gray-500 font-medium uppercase tracking-wide" style={{ fontFamily: FONT_FAMILY_INTER }}>{title}</p>
//           <p className="text-xl font-bold text-[#29362f] mt-0.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{value}</p>
//           {subtitle && <p className="text-[10px] text-gray-500 mt-0.5" style={{ fontFamily: FONT_FAMILY_INTER }}>{subtitle}</p>}
//         </div>
//         <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // ORDER STATUS CARD COMPONENT - SAGE GREEN STYLE
// // ============================================================

// const OrderStatusCard = ({ status, count, totalOrders, onClick }) => {
//   const colorClass = getStatusColor(status);
//   const label = getStatusLabel(status);
//   const percentage = totalOrders > 0 ? Math.round((count / totalOrders) * 100) : 0;

//   return (
//     <div 
//       className={`p-2.5 rounded-xl border ${colorClass} hover:shadow-[0_4px_12px_rgba(82,102,90,0.1)] transition-all ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
//       onClick={onClick}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-[10px] font-medium" style={{ fontFamily: FONT_FAMILY_INTER }}>{label}</p>
//           <p className="text-lg font-bold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{count}</p>
//         </div>
//         <div className="text-[10px] font-medium text-black">{percentage}%</div>
//       </div>
//       <div className="w-full bg-[#e2e3dd]/60 rounded-full h-1 mt-1">
//         <div 
//           className="h-1 rounded-full bg-gradient-to-r from-black to-black"
//           style={{ width: `${Math.min(percentage, 100)}%` }}
//         />
//       </div>
//     </div>
//   );
// };

// // ============================================================
// // TOP PRODUCTS COMPONENT - SAGE GREEN STYLE
// // ============================================================

// const TopProductsList = ({ products, loading }) => {
//   if (loading) {
//     return (
//       <div className="space-y-2">
//         {[...Array(5)].map((_, i) => (
//           <div key={`loading-${i}`} className="flex items-center gap-2 animate-pulse">
//             <div className="w-2 h-2 bg-[#e2e3dd]/60 rounded-full"></div>
//             <div className="flex-1">
//               <div className="h-2.5 bg-[#e2e3dd]/60 rounded w-3/4 mb-1"></div>
//               <div className="h-2 bg-[#e2e3dd]/60 rounded w-1/2"></div>
//             </div>
//             <div className="h-3.5 bg-[#e2e3dd]/60 rounded w-14"></div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (!products || products.length === 0) {
//     return (
//       <div className="text-center py-6 text-gray-500 text-xs" style={{ fontFamily: FONT_FAMILY_INTER }}>
//         <FaBox className="w-6 h-6 mx-auto mb-1 text-[#e2e3dd]" />
//         No sales data available
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-2">
//       {products.map((product, index) => {
//         const isTop = index < 3;
//         const icon = isTop ? (
//           index === 0 ? <FaFire className="w-2.5 h-2.5 text-black" /> :
//           index === 1 ? <FaChartBar className="w-2.5 h-2.5 text-black" /> :
//           <FaAward className="w-2.5 h-2.5 text-black" />
//         ) : null;

//         const sellingPrice = product.discountPrice || product.regularPrice || 0;
//         const uniqueKey = product.id && product.id !== 'unknown' 
//           ? `product-${product.id}` 
//           : `product-${index}-${Date.now()}`;

//         return (
//           <div 
//             key={uniqueKey}
//             className="flex items-center gap-2 p-1.5 bg-[#f7f4ef] rounded-lg hover:bg-[#e2e3dd]/40 transition-colors"
//           >
//             <div className="flex-shrink-0 w-5 text-center font-bold text-[10px] text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>
//               #{index + 1}
//             </div>
//             {product.image ? (
//               <img 
//                 src={product.image} 
//                 alt={product.name} 
//                 className="w-7 h-7 rounded-lg object-cover border border-[#e2e3dd]/60"
//               />
//             ) : (
//               <div className="w-7 h-7 rounded-lg bg-[#f7f4ef] flex items-center justify-center">
//                 <FaBox className="w-3.5 h-3.5 text-[#e2e3dd]" />
//               </div>
//             )}
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-1">
//                 <p className="text-[11px] font-medium text-[#29362f] truncate" style={{ fontFamily: FONT_FAMILY_INTER }}>{product.name}</p>
//                 {icon}
//               </div>
//               <div className="flex items-center gap-1.5 flex-wrap">
//                 <p className="text-[9px] text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>{product.sales || 0} sales</p>
//                 <p className="text-[9px] font-semibold text-black" style={{ fontFamily: FONT_FAMILY_INTER }}>@{formatCurrency(sellingPrice)}</p>
//                 {product.discountPrice && product.discountPrice < product.regularPrice && (
//                   <span className="text-[8px] text-black bg-[#f7f4ef] px-1 rounded">
//                     -{Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100)}%
//                   </span>
//                 )}
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // ============================================================
// // RECENT ORDERS COMPONENT - SAGE GREEN STYLE
// // ============================================================

// const RecentOrdersList = ({ orders, loading, onViewOrder }) => {
//   if (loading) {
//     return (
//       <div className="space-y-1.5">
//         {[...Array(5)].map((_, i) => (
//           <div key={`recent-loading-${i}`} className="flex items-center gap-2 animate-pulse p-1.5 border-b border-[#e2e3dd]/30">
//             <div className="h-2.5 bg-[#e2e3dd]/60 rounded w-16"></div>
//             <div className="flex-1">
//               <div className="h-2.5 bg-[#e2e3dd]/60 rounded w-1/3 mb-0.5"></div>
//               <div className="h-2 bg-[#e2e3dd]/60 rounded w-1/4"></div>
//             </div>
//             <div className="h-3.5 bg-[#e2e3dd]/60 rounded w-14"></div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   if (!orders || orders.length === 0) {
//     return (
//       <div className="text-center py-6 text-gray-500 text-xs" style={{ fontFamily: FONT_FAMILY_INTER }}>
//         <FaShoppingCart className="w-6 h-6 mx-auto mb-1 text-[#e2e3dd]" />
//         No recent orders
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-1.5">
//       {orders.slice(0, 10).map((order) => {
//         const statusColor = getStatusColor(order.orderStatus);
//         const statusLabel = getStatusLabel(order.orderStatus);
//         const isPaid = order.paymentStatus === 'paid';

//         return (
//           <div 
//             key={order._id || `order-${Math.random()}`}
//             className="flex items-center gap-2 p-1.5 hover:bg-[#f7f4ef] rounded-lg transition-colors cursor-pointer border-b border-[#e2e3dd]/30 last:border-0"
//             onClick={() => onViewOrder && onViewOrder(order._id)}
//           >
//             <div className="flex-shrink-0">
//               <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-medium ${statusColor}`} style={{ fontFamily: FONT_FAMILY_INTER }}>
//                 {statusLabel}
//               </span>
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="text-[11px] font-medium text-[#29362f] truncate" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                 {order.orderNumber || order._id?.slice(-8).toUpperCase()}
//               </p>
//               <p className="text-[9px] text-gray-500 truncate" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                 {order.customerInfo?.fullName || 'Guest'} • {order.customerInfo?.phone || 'N/A'}
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="text-[11px] font-semibold text-black" style={{ fontFamily: FONT_FAMILY_INTER }}>{formatCurrency(order.total)}</p>
//               <p className="text-[8px] text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>{formatDate(order.createdAt)}</p>
//               {isPaid && (
//                 <span className="text-[7px] text-black bg-[#f7f4ef] px-1 py-0.5 rounded">Paid</span>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // ============================================================
// // MAIN DASHBOARD COMPONENT
// // ============================================================

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [userRole, setUserRole] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);

//   // Dashboard data states
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     totalRevenue: 0,
//     totalProfit: 0,
//     totalProducts: 0,
//     totalReviews: 0,
//     paidOrders: 0,
//     pendingPayment: 0,
//     orderStatuses: {},
//     recentOrders: [],
//     topProducts: [],
//     averageProfitMargin: 0,
//     totalCost: 0,
//     totalQuantity: 0
//   });

//   // Filter states - Default to current month
//   const [filterType, setFilterType] = useState('month');
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//   const isAdminOrSuperAdmin = ['super_admin', 'admin'].includes(userRole);
//   const isModerator = userRole === 'moderator';

//   // Months array
//   const months = [
//     { value: 1, name: 'January' },
//     { value: 2, name: 'February' },
//     { value: 3, name: 'March' },
//     { value: 4, name: 'April' },
//     { value: 5, name: 'May' },
//     { value: 6, name: 'June' },
//     { value: 7, name: 'July' },
//     { value: 8, name: 'August' },
//     { value: 9, name: 'September' },
//     { value: 10, name: 'October' },
//     { value: 11, name: 'November' },
//     { value: 12, name: 'December' }
//   ];

//   // Years array
//   const getYears = () => {
//     const currentYear = new Date().getFullYear();
//     const years = [];
//     for (let i = currentYear; i >= currentYear - 5; i--) {
//       years.push(i);
//     }
//     return years;
//   };

//   // ============================================================
//   // FETCH DASHBOARD DATA
//   // ============================================================

//   const fetchDashboardData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         router.push('/auth/login');
//         return;
//       }

//       // Build date range
//       let startDate, endDate;
//       let dateParams = {};

//       if (filterType === 'all') {
//         // No date filter - all time
//       } else if (filterType === 'month') {
//         startDate = new Date(selectedYear, selectedMonth - 1, 1);
//         startDate.setHours(0, 0, 0, 0);
//         endDate = new Date(selectedYear, selectedMonth, 0);
//         endDate.setHours(23, 59, 59, 999);
//         dateParams = {
//           startDate: startDate.toISOString(),
//           endDate: endDate.toISOString()
//         };
//       } else if (filterType === 'year') {
//         startDate = new Date(selectedYear, 0, 1);
//         startDate.setHours(0, 0, 0, 0);
//         endDate = new Date(selectedYear, 11, 31);
//         endDate.setHours(23, 59, 59, 999);
//         dateParams = {
//           startDate: startDate.toISOString(),
//           endDate: endDate.toISOString()
//         };
//       }

//       // ============================================================
//       // 1. FETCH FILTERED ORDER STATS
//       // ============================================================
//       let statsUrl = 'http://localhost:5000/api/orders/admin/stats/filtered';
//       if (filterType !== 'all' && dateParams.startDate && dateParams.endDate) {
//         statsUrl += `?startDate=${encodeURIComponent(dateParams.startDate)}&endDate=${encodeURIComponent(dateParams.endDate)}`;
//       }
      
//       const statsResponse = await fetch(statsUrl, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const statsData = await statsResponse.json();
//       const orderStats = statsData.success ? statsData.data : {};

//       // ============================================================
//       // 2. FETCH PROFIT MARGIN DATA (For revenue & profit)
//       // ============================================================
//       const profitParams = new URLSearchParams({
//         orderStatus: 'delivered',
//         paymentStatus: 'paid'
//       });

//       if (filterType !== 'all' && dateParams.startDate && dateParams.endDate) {
//         profitParams.append('startDate', dateParams.startDate);
//         profitParams.append('endDate', dateParams.endDate);
//       }

//       const profitResponse = await fetch(
//         `http://localhost:5000/api/orders/admin/profit-margin?${profitParams.toString()}`,
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );
//       const profitData = await profitResponse.json();

//       // ============================================================
//       // 3. FETCH RECENT ORDERS (ALL ORDERS - NOT JUST PAID)
//       // ============================================================
//       let ordersParams = new URLSearchParams({
//         limit: 10,
//         sort: '-createdAt'
//       });

//       if (filterType !== 'all' && dateParams.startDate && dateParams.endDate) {
//         ordersParams.append('startDate', dateParams.startDate);
//         ordersParams.append('endDate', dateParams.endDate);
//       }

//       const recentOrdersResponse = await fetch(
//         `http://localhost:5000/api/orders/admin/all?${ordersParams.toString()}`,
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );
//       const recentOrdersData = await recentOrdersResponse.json();
//       const recentOrders = recentOrdersData.success ? recentOrdersData.data : [];

//       // ============================================================
//       // 4. FETCH PRODUCT STATS
//       // ============================================================
//       const productsResponse = await fetch(
//         `http://localhost:5000/api/products/admin/all?limit=999`,
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );
//       const productsData = await productsResponse.json();
//       const products = productsData.success ? productsData.data : [];
//       const totalProducts = products.length;

//       // ============================================================
//       // 5. FETCH REVIEWS COUNT
//       // ============================================================
//       const reviewsResponse = await fetch(
//         `http://localhost:5000/api/reviews`,
//         { headers: { 'Authorization': `Bearer ${token}` } }
//       );
//       const reviewsData = await reviewsResponse.json();
//       const totalReviews = reviewsData.success ? reviewsData.data?.length || 0 : 0;

//       // ============================================================
//       // PROCESS DATA
//       // ============================================================
      
//       // Order stats from filtered endpoint
//       const totalOrders = orderStats.totalOrders || 0;
//       const pendingPayment = orderStats.pendingPayment || 0;

//       // Order status distribution (FILTERED)
//       const orderStatuses = {
//         placed: orderStats.placedOrders || 0,
//         follow_up: orderStats.followUpOrders || 0,
//         reminder: orderStats.reminderOrders || 0,
//         accepted: orderStats.acceptedOrders || 0,
//         approved: orderStats.approvedOrders || 0,
//         hold: orderStats.holdOrders || 0,
//         ready_to_ship: orderStats.readyToShipOrders || 0,
//         courier_assigned: orderStats.courierAssignedOrders || 0,
//         processing: orderStats.processingOrders || 0,
//         shipped: orderStats.shippedOrders || 0,
//         out_for_delivery: orderStats.outForDeliveryOrders || 0,
//         delivered: orderStats.deliveredOrders || 0,
//         cancelled: orderStats.cancelledOrders || 0,
//         rejected: orderStats.rejectedOrders || 0,
//         returned: orderStats.returnedOrders || 0,
//         partial_delivery: orderStats.partialDeliveryOrders || 0,
//         refunded: orderStats.refundedOrders || 0,
//         failed: orderStats.failedOrders || 0
//       };

//       // Profit data
//       const profitSummary = profitData.success ? profitData.data.summary : {};
//       const totalRevenue = profitSummary.totalRevenue || 0;
//       const totalProfit = profitSummary.totalProfit || 0;
//       const averageProfitMargin = profitSummary.averageProfitMargin || 0;
//       const paidOrders = profitSummary.totalOrders || 0;

//       // Top products from profit data
//       const productDetails = profitData.success ? profitData.data.productProfitDetails || [] : [];
//       const topProducts = productDetails
//         .sort((a, b) => b.totalRevenue - a.totalRevenue)
//         .slice(0, 5)
//         .map(p => ({
//           id: p.productId || `product-${Math.random()}`,
//           name: p.productName || 'Unknown Product',
//           sales: p.totalQuantity || 0,
//           revenue: p.totalRevenue || 0,
//           image: p.image || '',
//           discountPrice: p.averageSellingPrice || 0,
//           regularPrice: p.averageSellingPrice || 0
//         }));

//       // ============================================================
//       // SET STATE
//       // ============================================================

//       setStats({
//         totalOrders,
//         totalRevenue,
//         totalProfit,
//         totalProducts,
//         totalReviews,
//         paidOrders: paidOrders,
//         pendingPayment: pendingPayment,
//         orderStatuses,
//         recentOrders: recentOrders,
//         topProducts,
//         averageProfitMargin: averageProfitMargin
//       });

//     } catch (error) {
//       console.error('Error fetching dashboard data:', error);
//       toast.error('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   }, [filterType, selectedMonth, selectedYear, router]);

//   // ============================================================
//   // EFFECTS
//   // ============================================================

//   useEffect(() => {
//     const role = getUserRole();
//     setUserRole(role);
//   }, []);

//   useEffect(() => {
//     if (userRole) {
//       fetchDashboardData();
//     }
//   }, [userRole, fetchDashboardData]);

//   // ============================================================
//   // HANDLERS
//   // ============================================================

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchDashboardData();
//   };

//   const getFilterLabel = () => {
//     if (filterType === 'all') return 'All Time';
//     if (filterType === 'month') {
//       const month = months.find(m => m.value === selectedMonth);
//       return `${month?.name} ${selectedYear}`;
//     }
//     return `Year ${selectedYear}`;
//   };

//   const orderStatuses = stats.orderStatuses || {};

//   const activeStatuses = Object.entries(orderStatuses)
//     .filter(([_, count]) => count > 0)
//     .sort((a, b) => b[1] - a[1]);

//   // ============================================================
//   // RENDER
//   // ============================================================

//   return (
//     <ProtectedRoute pageKey="dashboard">
//       <div className="min-h-screen bg-gradient-to-b from-white via-[#f7f4ef]/30 to-white p-4 md:p-6">
//         <div className="max-w-7xl mx-auto">

//           {/* ============================================================
//               HEADER
//               ============================================================ */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-gradient-to-r from-black to-black rounded-xl flex items-center justify-center shadow-lg shadow-black/20">
//                 <FaChartLine className="w-4 h-4 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                   Dashboard
//                 </h1>
//                 <p className="text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                   Welcome back! Here's what's happening.
//                   <span className="ml-1.5 text-[10px] text-black font-medium bg-[#f7f4ef] px-2 py-0.5 rounded-full border border-[#e2e3dd]/60">
//                     {getFilterLabel()}
//                   </span>
//                 </p>
//               </div>
//             </div>

//             <button
//               onClick={handleRefresh}
//               disabled={refreshing}
//               className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#e2e3dd]/60 text-[#29362f] rounded-lg hover:bg-[#f7f4ef] transition-colors text-xs disabled:opacity-50"
//             >
//               <FaSpinner className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
//               Refresh
//             </button>
//           </div>

//           {/* ============================================================
//               COMPACT FILTERS - ALWAYS VISIBLE
//               ============================================================ */}
//           <div className="bg-white rounded-xl border border-[#e2e3dd]/60 shadow-sm overflow-hidden mb-4">
//             <div className="flex flex-wrap items-center gap-2 p-2.5">
//               <span className="text-[10px] font-medium text-gray-500 mr-1" style={{ fontFamily: FONT_FAMILY_INTER }}>View:</span>
              
//               <button
//                 onClick={() => setFilterType('all')}
//                 className={`px-2.5 py-1 text-[10px] font-medium rounded-lg transition-colors ${
//                   filterType === 'all' ? 'bg-gradient-to-r from-black to-black text-white shadow-sm' : 'bg-white text-gray-500 hover:bg-[#f7f4ef] border border-[#e2e3dd]/60'
//                 }`}
//                 style={{ fontFamily: FONT_FAMILY_INTER }}
//               >
//                 All
//               </button>
              
//               <button
//                 onClick={() => setFilterType('month')}
//                 className={`px-2.5 py-1 text-[10px] font-medium rounded-lg transition-colors ${
//                   filterType === 'month' ? 'bg-gradient-to-r from-black to-black text-white shadow-sm' : 'bg-white text-gray-500 hover:bg-[#f7f4ef] border border-[#e2e3dd]/60'
//                 }`}
//                 style={{ fontFamily: FONT_FAMILY_INTER }}
//               >
//                 Monthly
//               </button>
              
//               <button
//                 onClick={() => setFilterType('year')}
//                 className={`px-2.5 py-1 text-[10px] font-medium rounded-lg transition-colors ${
//                   filterType === 'year' ? 'bg-gradient-to-r from-black to-black text-white shadow-sm' : 'bg-white text-gray-500 hover:bg-[#f7f4ef] border border-[#e2e3dd]/60'
//                 }`}
//                 style={{ fontFamily: FONT_FAMILY_INTER }}
//               >
//                 Yearly
//               </button>

//               <div className="h-5 w-px bg-[#e2e3dd]/60 mx-1"></div>

//               {filterType === 'month' && (
//                 <div className="flex items-center gap-1.5">
//                   <select
//                     value={selectedMonth}
//                     onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//                     className="px-2 py-1 text-[10px] border border-[#e2e3dd]/60 rounded-lg focus:ring-1 focus:ring-black focus:border-transparent bg-white text-[#29362f]"
//                     style={{ fontFamily: FONT_FAMILY_INTER }}
//                   >
//                     {months.map(month => (
//                       <option key={month.value} value={month.value}>{month.name}</option>
//                     ))}
//                   </select>
//                   <select
//                     value={selectedYear}
//                     onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//                     className="px-2 py-1 text-[10px] border border-[#e2e3dd]/60 rounded-lg focus:ring-1 focus:ring-black focus:border-transparent bg-white text-[#29362f]"
//                     style={{ fontFamily: FONT_FAMILY_INTER }}
//                   >
//                     {getYears().map(year => (
//                       <option key={year} value={year}>{year}</option>
//                     ))}
//                   </select>
//                 </div>
//               )}

//               {filterType === 'year' && (
//                 <select
//                   value={selectedYear}
//                   onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//                   className="px-2 py-1 text-[10px] border border-[#e2e3dd]/60 rounded-lg focus:ring-1 focus:ring-black focus:border-transparent bg-white text-[#29362f]"
//                   style={{ fontFamily: FONT_FAMILY_INTER }}
//                 >
//                   {getYears().map(year => (
//                     <option key={year} value={year}>{year}</option>
//                   ))}
//                 </select>
//               )}

//               <button
//                 onClick={handleRefresh}
//                 disabled={refreshing}
//                 className="ml-auto px-2.5 py-1 bg-gradient-to-r from-black to-black text-white text-[10px] font-medium rounded-lg hover:shadow-lg hover:shadow-black/25 transition-all disabled:opacity-50"
//                 style={{ fontFamily: FONT_FAMILY_INTER }}
//               >
//                 Apply
//               </button>
//             </div>
//           </div>

//           {/* ============================================================
//               STATS CARDS - ROLE BASED
//               ============================================================ */}

//           {/* ADMIN/SUPER ADMIN: Full stats */}
//           {isAdminOrSuperAdmin && (
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
//               <StatCard
//                 title="Revenue"
//                 value={formatCurrency(stats.totalRevenue)}
//                 icon={<FaMoneyBillWave className="w-3.5 h-3.5 text-black" />}
//                 color="bg-[#f7f4ef]"
//                 subtitle={`${getFilterLabel()}`}
//                 loading={loading}
//               />
//               <StatCard
//                 title="Profit"
//                 value={formatCurrency(stats.totalProfit)}
//                 icon={<FaChartLine className="w-3.5 h-3.5 text-black" />}
//                 color="bg-[#f7f4ef]"
//                 subtitle={`${stats.averageProfitMargin?.toFixed(1) || 0}% margin`}
//                 loading={loading}
//               />
//               <StatCard
//                 title="Orders"
//                 value={stats.totalOrders}
//                 icon={<FaShoppingCart className="w-3.5 h-3.5 text-black" />}
//                 color="bg-[#f7f4ef]"
//                 subtitle={`${stats.paidOrders} delivered & paid`}
//                 loading={loading}
//               />
//               <StatCard
//                 title="Products"
//                 value={stats.totalProducts}
//                 icon={<FaBox className="w-3.5 h-3.5 text-black" />}
//                 color="bg-[#f7f4ef]"
//                 loading={loading}
//               />
//             </div>
//           )}

//           {/* MODERATOR: Limited stats */}
//           {isModerator && (
//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
//               <StatCard
//                 title="Orders"
//                 value={stats.totalOrders}
//                 icon={<FaShoppingCart className="w-3.5 h-3.5 text-black" />}
//                 color="bg-[#f7f4ef]"
//                 subtitle={`${getFilterLabel()}`}
//                 loading={loading}
//               />
//               <StatCard
//                 title="Products"
//                 value={stats.totalProducts}
//                 icon={<FaBox className="w-3.5 h-3.5 text-black" />}
//                 color="bg-[#f7f4ef]"
//                 loading={loading}
//               />
//               <StatCard
//                 title="Reviews"
//                 value={stats.totalReviews}
//                 icon={<FaStar className="w-3.5 h-3.5 text-black" />}
//                 color="bg-[#f7f4ef]"
//                 loading={loading}
//               />
//             </div>
//           )}

//           {/* ============================================================
//               ORDER STATUS OVERVIEW (FILTERED)
//               ============================================================ */}

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
//             {/* Order Status Cards */}
//             <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-sm border border-[#e2e3dd]/60">
//               <div className="flex items-center justify-between mb-3">
//                 <h2 className="text-sm font-semibold text-[#29362f] flex items-center gap-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                   <FaClock className="w-4 h-4 text-black" />
//                   Order Status
//                   <span className="text-[10px] font-normal text-gray-500 bg-[#f7f4ef] px-1.5 py-0.5 rounded-full border border-[#e2e3dd]/60">
//                     {getFilterLabel()}
//                   </span>
//                 </h2>
//                 <button
//                   onClick={() => router.push('/authorize/orders')}
//                   className="text-[10px] text-black hover:text-[#405347] flex items-center gap-0.5 transition-colors"
//                   style={{ fontFamily: FONT_FAMILY_INTER }}
//                 >
//                   View All <FaArrowRight className="w-2.5 h-2.5" />
//                 </button>
//               </div>

//               {loading ? (
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                   {[...Array(4)].map((_, i) => (
//                     <div key={`status-loading-${i}`} className="p-2 rounded-xl border border-[#e2e3dd]/60 animate-pulse">
//                       <div className="h-2.5 bg-[#e2e3dd]/60 rounded w-1/2 mb-1.5"></div>
//                       <div className="h-5 bg-[#e2e3dd]/60 rounded w-1/3"></div>
//                     </div>
//                   ))}
//                 </div>
//               ) : activeStatuses.length === 0 ? (
//                 <div className="text-center py-4 text-gray-500 text-xs" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                   <FaClipboardList className="w-5 h-5 mx-auto mb-1 text-[#e2e3dd]" />
//                   No orders found for {getFilterLabel()}
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                   {activeStatuses.slice(0, 8).map(([status, count]) => (
//                     <OrderStatusCard
//                       key={`status-${status}`}
//                       status={status}
//                       count={count}
//                       totalOrders={stats.totalOrders}
//                       onClick={() => router.push(`/authorize/orders?status=${status}`)}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Top Selling Products */}
//             <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e3dd]/60">
//               <div className="flex items-center justify-between mb-3">
//                 <h2 className="text-sm font-semibold text-[#29362f] flex items-center gap-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                   <FaFire className="w-4 h-4 text-black" />
//                   Top Products
//                 </h2>
//                 <button
//                   onClick={() => router.push('/authorize/all-products')}
//                   className="text-[10px] text-black hover:text-[#405347] flex items-center gap-0.5 transition-colors"
//                   style={{ fontFamily: FONT_FAMILY_INTER }}
//                 >
//                   View All <FaArrowRight className="w-2.5 h-2.5" />
//                 </button>
//               </div>

//               <TopProductsList
//                 products={stats.topProducts}
//                 loading={loading}
//               />
//             </div>
//           </div>

//           {/* ============================================================
//               ADDITIONAL STATS - ADMIN ONLY
//               ============================================================ */}

//           {isAdminOrSuperAdmin && (
//             <div className="grid grid-cols-2 gap-3 mb-4">
//               <StatCard
//                 title="Delivered & Paid Orders"
//                 value={stats.paidOrders}
//                 icon={<FaCheckCircle className="w-3.5 h-3.5 text-black" />}
//                 color="bg-[#f7f4ef]"
//                 subtitle={`${getFilterLabel()}`}
//                 loading={loading}
//                 onClick={() => router.push('/authorize/orders?status=delivered')}
//               />
//               <StatCard
//                 title="Pending Payments"
//                 value={stats.pendingPayment}
//                 icon={<FaClock className="w-3.5 h-3.5 text-black" />}
//                 color="bg-[#f7f4ef]"
//                 loading={loading}
//                 onClick={() => router.push('/authorize/orders?payment=pending')}
//               />
//             </div>
//           )}

//           {/* ============================================================
//               RECENT ORDERS (ALL ORDERS - NOT JUST PAID)
//               ============================================================ */}

//           <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e3dd]/60">
//             <div className="flex items-center justify-between mb-3">
//               <h2 className="text-sm font-semibold text-[#29362f] flex items-center gap-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 <FaTruck className="w-4 h-4 text-black" />
//                 Recent Orders
//                 <span className="text-[10px] font-normal text-gray-500 bg-[#f7f4ef] px-1.5 py-0.5 rounded-full border border-[#e2e3dd]/60">
//                   {getFilterLabel()}
//                 </span>
//               </h2>
//               <button
//                 onClick={() => router.push('/authorize/orders')}
//                 className="text-[10px] text-black hover:text-[#405347] flex items-center gap-0.5 transition-colors"
//                 style={{ fontFamily: FONT_FAMILY_INTER }}
//               >
//                 View All <FaArrowRight className="w-2.5 h-2.5" />
//               </button>
//             </div>

//             <RecentOrdersList
//               orders={stats.recentOrders}
//               loading={loading}
//               onViewOrder={(orderId) => router.push(`/authorize/orders?view=${orderId}`)}
//             />
//           </div>

//           {/* ============================================================
//               ROLE INDICATOR
//               ============================================================ */}

//           <div className="mt-4 text-center text-[10px] text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>
//             <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white rounded-full border border-[#e2e3dd]/60">
//               <FaUserCircle className="w-3 h-3 text-black" />
//               Role: <span className="font-medium text-[#29362f]">
//                 {userRole ? userRole.replace('_', ' ').toUpperCase() : 'Unknown'}
//               </span>
//               {isAdminOrSuperAdmin && (
//                 <span className="text-[8px] text-black bg-[#f7f4ef] px-1 py-0.5 rounded-full border border-[#e2e3dd]/60">
//                   Full Access
//                 </span>
//               )}
//               {isModerator && (
//                 <span className="text-[8px] text-black bg-[#f7f4ef] px-1 py-0.5 rounded-full border border-[#e2e3dd]/60">
//                   Limited
//                 </span>
//               )}
//             </span>
//           </div>

//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// }
// src/app/authorize/dashboard/page.js
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import {
  FaBox,
  FaShoppingCart,
  FaMoneyBillWave,
  FaUsers,
  FaChartLine,
  FaStar,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
  FaEye,
  FaSpinner,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaDownload,
  FaFilter,
  FaPercent,
  FaDollarSign,
  FaStore,
  FaArrowRight,
  FaPhone,
  FaUserCircle,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTag,
  FaFire,
  FaRocket,
  FaAward,
  FaClipboardList,
  FaChartBar,
  FaGlobe,
  FaFacebook,
  FaInstagram,
  FaToggleOn,
  FaToggleOff,
  FaHourglassHalf,
  FaBoxOpen,
  FaCheckDouble,
  FaBan,
  FaUndo,
  FaHeadset,
  FaSync,
  FaCalendarDay,
  FaCalendarWeek,
  FaCalendar,
  FaPercentage,
  FaShoppingBasket,
  FaPlus,
  FaEdit,
  FaWarehouse,
  FaBarcode,
  FaTags,
  FaUserPlus,
  FaFileInvoiceDollar,
  FaCog,
  FaExclamationTriangle,
  FaEllipsisH,
  FaRegClock,
  FaRegCheckCircle,
  FaRegTimesCircle,
} from 'react-icons/fa';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// ============================================================
// FONT CONSTANTS
// ============================================================
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = "serif";
const FONT_FAMILY_INTER = "'Inter', sans-serif";

// ============================================================
// COLOR PALETTE
// ============================================================
const COLORS = {
  primary: '#52665a',
  primaryDark: '#405347',
  primaryLight: '#71816F',
  accent: '#B88C8D',
  accentLight: '#E8C8C7',
  accentDark: '#9C7072',
  bgCream: '#f7f4ef',
  bgWarm: '#F8F5F0',
  bgLight: '#faf9f5',
  textDark: '#29362f',
  textMedium: '#526257',
  textLight: '#687169',
  textMuted: '#85827B',
  borderLight: '#e2e3dd',
  borderMedium: '#DED8D1',
  borderAccent: '#bfc5bd',
  pink: '#f43f75',
  blue: '#6685f5',
  purple: '#8b5cf6',
  orange: '#f59e0b',
  green: '#55b995',
  sage: '#8b9d83',
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

const getUserRole = () => {
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      return parsed.role || '';
    }
    return '';
  } catch (error) {
    return '';
  }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

const formatCurrencyDetailed = (amount) => {
  return `৳${parseFloat(amount || 0).toFixed(2)}`;
};

const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-BD', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// ========== STATUS COLOR - SAGE GREEN STYLE ==========
const getStatusColor = (status) => {
  const colors = {
    placed: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
    follow_up: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
    reminder: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
    accepted: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
    approved: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
    hold: 'bg-amber-50 text-amber-600 border-amber-200',
    ready_to_ship: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
    courier_assigned: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
    processing: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
    shipped: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
    out_for_delivery: 'bg-[#f7f4ef] text-black border-[#e2e3dd]/60',
    delivered: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    cancelled: 'bg-red-50 text-red-600 border-red-200',
    rejected: 'bg-red-50 text-red-600 border-red-200',
    returned: 'bg-purple-50 text-purple-600 border-purple-200',
    refunded: 'bg-gray-100 text-gray-600 border-gray-200',
    failed: 'bg-red-50 text-red-600 border-red-200',
    partial_delivery: 'bg-amber-50 text-amber-700 border-amber-300',
  };
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const getStatusLabel = (status) => {
  const labels = {
    placed: 'Placed',
    follow_up: 'Follow Up',
    reminder: 'Reminder',
    accepted: 'Accepted',
    approved: 'Approved',
    hold: 'On Hold',
    ready_to_ship: 'Ready to Ship',
    courier_assigned: 'Courier Assigned',
    processing: 'Processing',
    shipped: 'Shipped',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    rejected: 'Rejected',
    returned: 'Returned',
    refunded: 'Refunded',
    failed: 'Failed',
    partial_delivery: 'Partial Delivery',
  };
  return labels[status] || status;
};

const getStatusIcon = (status) => {
  const icons = {
    placed: FaClock,
    follow_up: FaHeadset,
    reminder: FaClock,
    accepted: FaCheckCircle,
    approved: FaCheckDouble,
    hold: FaHourglassHalf,
    ready_to_ship: FaBox,
    courier_assigned: FaTruck,
    processing: FaSpinner,
    shipped: FaTruck,
    out_for_delivery: FaTruck,
    delivered: FaCheckDouble,
    cancelled: FaBan,
    rejected: FaTimesCircle,
    returned: FaUndo,
    partial_delivery: FaCheckDouble,
    refunded: FaUndo,
    failed: FaTimesCircle,
  };
  return icons[status] || FaClipboardList;
};

// All order statuses in display order
const ALL_ORDER_STATUSES = [
  'placed',
  'follow_up',
  'reminder',
  'accepted',
  'approved',
  'hold',
  'processing',
  'courier_assigned',
  'ready_to_ship',
  'partial_delivery',
  'shipped',
  'out_for_delivery',
  'delivered',
  'returned',
  'rejected',
  'cancelled',
  'refunded',
  'failed',
];

// ============================================================
// STAT CARD COMPONENT
// ============================================================

const StatCard = ({ title, value, icon, color, subtitle, onClick, loading, change, changeColor }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#e2e3dd]/60 animate-pulse">
        <div className="h-3 bg-[#e2e3dd]/60 rounded w-1/2 mb-2"></div>
        <div className="h-7 bg-[#e2e3dd]/60 rounded w-3/4"></div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl p-4 shadow-sm border border-[#e2e3dd]/60 hover:shadow-[0_8px_25px_rgba(82,102,90,0.12)] transition-all ${
        onClick ? 'cursor-pointer hover:scale-[1.02]' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <p
            className="text-xs text-gray-500 font-medium uppercase tracking-wide truncate"
            style={{ fontFamily: FONT_FAMILY_INTER }}
          >
            {title}
          </p>
          <p
            className="text-xl font-bold text-[#29362f] mt-0.5"
            style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
          >
            {value}
          </p>
          {subtitle && (
            <p className="text-[10px] text-gray-500 mt-0.5" style={{ fontFamily: FONT_FAMILY_INTER }}>
              {subtitle}
            </p>
          )}
          {change && (
            <p
              className={`text-[9px] font-medium mt-0.5 ${changeColor || 'text-emerald-500'}`}
              style={{ fontFamily: FONT_FAMILY_INTER }}
            >
              {change}
            </p>
          )}
        </div>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// ORDER STATUS CARD COMPONENT
// ============================================================

const OrderStatusCard = ({ status, count, totalOrders, onClick }) => {
  const colorClass = getStatusColor(status);
  const label = getStatusLabel(status);
  const Icon = getStatusIcon(status);
  const percentage = totalOrders > 0 ? Math.round((count / totalOrders) * 100) : 0;

  return (
    <div
      className={`p-2.5 rounded-xl border ${colorClass} hover:shadow-[0_4px_12px_rgba(82,102,90,0.1)] transition-all ${
        onClick ? 'cursor-pointer hover:scale-[1.02]' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 min-w-0">
          <Icon className="w-3 h-3 flex-shrink-0" />
          <p
            className="text-[10px] font-medium truncate"
            style={{ fontFamily: FONT_FAMILY_INTER }}
          >
            {label}
          </p>
        </div>
        <div className="text-[10px] font-medium text-black flex-shrink-0 ml-1">
          {percentage}%
        </div>
      </div>
      <p
        className="text-lg font-bold text-[#29362f] mt-0.5"
        style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
      >
        {count}
      </p>
      <div className="w-full bg-[#e2e3dd]/60 rounded-full h-1 mt-1">
        <div
          className="h-1 rounded-full bg-gradient-to-r from-black to-black"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};

// ============================================================
// PLATFORM STAT CARD
// ============================================================

const PlatformCard = ({ platform, data, isActive, onClick }) => {
  const platformConfig = {
    website: { label: 'Website', icon: FaGlobe, color: '#f43f75' },
    facebook: { label: 'Facebook', icon: FaFacebook, color: '#6685f5' },
    instagram: { label: 'Instagram', icon: FaInstagram, color: '#8b5cf6' },
    showroom: { label: 'Showroom', icon: FaStore, color: '#55b995' },
  };

  const config = platformConfig[platform] || platformConfig.website;
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl border-2 transition-all text-left ${
        isActive
          ? 'bg-black text-white border-black shadow-lg shadow-black/25'
          : 'bg-white text-[#29362f] border-[#e2e3dd]/60 hover:border-black/40'
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-black'}`} />
        <span className="font-bold text-xs" style={{ fontFamily: FONT_FAMILY_INTER }}>
          {config.label}
        </span>
      </div>
      <p
        className={`text-lg font-bold ${isActive ? 'text-white' : 'text-[#29362f]'}`}
        style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
      >
        {data?.totalOrders || 0}
      </p>
      <p
        className={`text-[9px] ${isActive ? 'text-white/70' : 'text-gray-500'}`}
        style={{ fontFamily: FONT_FAMILY_INTER }}
      >
        orders
      </p>
      {data?.netProfitAfterDiscount !== undefined && (
        <p className={`text-[9px] font-semibold mt-0.5 ${isActive ? 'text-emerald-300' : 'text-emerald-600'}`}>
          Net: {formatCurrency(data.netProfitAfterDiscount)}
        </p>
      )}
    </button>
  );
};

// ============================================================
// TOP PRODUCTS COMPONENT
// ============================================================

const TopProductsList = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={`loading-${i}`} className="flex items-center gap-2 animate-pulse">
            <div className="w-2 h-2 bg-[#e2e3dd]/60 rounded-full"></div>
            <div className="flex-1">
              <div className="h-2.5 bg-[#e2e3dd]/60 rounded w-3/4 mb-1"></div>
              <div className="h-2 bg-[#e2e3dd]/60 rounded w-1/2"></div>
            </div>
            <div className="h-3.5 bg-[#e2e3dd]/60 rounded w-14"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 text-xs" style={{ fontFamily: FONT_FAMILY_INTER }}>
        <FaBox className="w-6 h-6 mx-auto mb-1 text-[#e2e3dd]" />
        No sales data available
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {products.map((product, index) => {
        const isTop = index < 3;
        const icon = isTop ? (
          index === 0 ? (
            <FaFire className="w-2.5 h-2.5 text-black" />
          ) : index === 1 ? (
            <FaChartBar className="w-2.5 h-2.5 text-black" />
          ) : (
            <FaAward className="w-2.5 h-2.5 text-black" />
          )
        ) : null;

        const sellingPrice = product.discountPrice || product.regularPrice || 0;
        const uniqueKey =
          product.id && product.id !== 'unknown'
            ? `product-${product.id}`
            : `product-${index}-${Date.now()}`;

        return (
          <div
            key={uniqueKey}
            className="flex items-center gap-2 p-1.5 bg-[#f7f4ef] rounded-lg hover:bg-[#e2e3dd]/40 transition-colors"
          >
            <div
              className="flex-shrink-0 w-5 text-center font-bold text-[10px] text-gray-500"
              style={{ fontFamily: FONT_FAMILY_INTER }}
            >
              #{index + 1}
            </div>
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-7 h-7 rounded-lg object-cover border border-[#e2e3dd]/60"
              />
            ) : (
              <div className="w-7 h-7 rounded-lg bg-[#f7f4ef] flex items-center justify-center">
                <FaBox className="w-3.5 h-3.5 text-[#e2e3dd]" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p
                  className="text-[11px] font-medium text-[#29362f] truncate"
                  style={{ fontFamily: FONT_FAMILY_INTER }}
                >
                  {product.name}
                </p>
                {icon}
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="text-[9px] text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  {product.sales || 0} sales
                </p>
                <p
                  className="text-[9px] font-semibold text-black"
                  style={{ fontFamily: FONT_FAMILY_INTER }}
                >
                  @{formatCurrency(sellingPrice)}
                </p>
                {product.discountPrice && product.discountPrice < product.regularPrice && (
                  <span className="text-[8px] text-black bg-[#f7f4ef] px-1 rounded">
                    -{Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ============================================================
// LOW STOCK PRODUCTS COMPONENT
// ============================================================

const LowStockProductsList = ({ products, loading, onViewAll }) => {
  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={`low-stock-loading-${i}`} className="flex items-center gap-2 animate-pulse">
            <div className="w-7 h-7 bg-[#e2e3dd]/60 rounded-lg"></div>
            <div className="flex-1">
              <div className="h-2.5 bg-[#e2e3dd]/60 rounded w-3/4 mb-1"></div>
              <div className="h-2 bg-[#e2e3dd]/60 rounded w-1/2"></div>
            </div>
            <div className="h-4 bg-[#e2e3dd]/60 rounded w-8"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 text-xs" style={{ fontFamily: FONT_FAMILY_INTER }}>
        <FaBoxOpen className="w-6 h-6 mx-auto mb-1 text-emerald-400" />
        <p className="text-emerald-600 font-medium">All products are well stocked!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {products.slice(0, 5).map((product, index) => {
        const stock = Number(product.stockQuantity) || 0;
        const alertQty = Number(product.stockAlertQuantity) || 0;
        const isOutOfStock = stock <= 0;

        return (
          <div
            key={product._id || index}
            className={`flex items-center gap-2 p-1.5 rounded-lg transition-colors ${
              isOutOfStock
                ? 'bg-red-50 hover:bg-red-100'
                : 'bg-amber-50 hover:bg-amber-100'
            }`}
          >
            {product.images?.[0]?.url ? (
              <img
                src={product.images[0].url}
                alt={product.productName}
                className="w-7 h-7 rounded-lg object-cover border border-[#e2e3dd]/60"
              />
            ) : (
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center border border-[#e2e3dd]/60">
                <FaBox className="w-3.5 h-3.5 text-[#e2e3dd]" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p
                className="text-[11px] font-medium text-[#29362f] truncate"
                style={{ fontFamily: FONT_FAMILY_INTER }}
              >
                {product.productName}
              </p>
              <div className="flex items-center gap-1.5">
                <p className="text-[9px] text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  SKU: {product.skuCode || 'N/A'}
                </p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <span
                className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-medium ${
                  isOutOfStock
                    ? 'bg-red-100 text-red-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {isOutOfStock ? (
                  <>
                    <FaTimesCircle className="w-2 h-2" />
                    Out
                  </>
                ) : (
                  <>
                    <FaExclamationTriangle className="w-2 h-2" />
                    {stock} left
                  </>
                )}
              </span>
            </div>
          </div>
        );
      })}

      {products.length > 5 && (
        <button
          onClick={onViewAll}
          className="w-full text-center text-[10px] text-black hover:text-[#405347] py-1 transition-colors"
          style={{ fontFamily: FONT_FAMILY_INTER }}
        >
          View all {products.length} low stock products →
        </button>
      )}
    </div>
  );
};

// ============================================================
// RECENT ORDERS COMPONENT
// ============================================================

const RecentOrdersList = ({ orders, loading, onViewOrder }) => {
  if (loading) {
    return (
      <div className="space-y-1.5">
        {[...Array(5)].map((_, i) => (
          <div
            key={`recent-loading-${i}`}
            className="flex items-center gap-2 animate-pulse p-1.5 border-b border-[#e2e3dd]/30"
          >
            <div className="h-2.5 bg-[#e2e3dd]/60 rounded w-16"></div>
            <div className="flex-1">
              <div className="h-2.5 bg-[#e2e3dd]/60 rounded w-1/3 mb-0.5"></div>
              <div className="h-2 bg-[#e2e3dd]/60 rounded w-1/4"></div>
            </div>
            <div className="h-3.5 bg-[#e2e3dd]/60 rounded w-14"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-6 text-gray-500 text-xs" style={{ fontFamily: FONT_FAMILY_INTER }}>
        <FaShoppingCart className="w-6 h-6 mx-auto mb-1 text-[#e2e3dd]" />
        No recent orders
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      {orders.slice(0, 10).map((order) => {
        const statusColor = getStatusColor(order.orderStatus);
        const statusLabel = getStatusLabel(order.orderStatus);
        const isPaid = order.paymentStatus === 'paid';

        return (
          <div
            key={order._id || `order-${Math.random()}`}
            className="flex items-center gap-2 p-1.5 hover:bg-[#f7f4ef] rounded-lg transition-colors cursor-pointer border-b border-[#e2e3dd]/30 last:border-0"
            onClick={() => onViewOrder && onViewOrder(order._id)}
          >
            <div className="flex-shrink-0">
              <span
                className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-medium ${statusColor}`}
                style={{ fontFamily: FONT_FAMILY_INTER }}
              >
                {statusLabel}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-[11px] font-medium text-[#29362f] truncate"
                style={{ fontFamily: FONT_FAMILY_INTER }}
              >
                {order.orderNumber || order._id?.slice(-8).toUpperCase()}
              </p>
              <p className="text-[9px] text-gray-500 truncate" style={{ fontFamily: FONT_FAMILY_INTER }}>
                {order.customerInfo?.fullName || 'Guest'} • {order.customerInfo?.phone || 'N/A'}
              </p>
            </div>
            <div className="text-right">
              <p
                className="text-[11px] font-semibold text-black"
                style={{ fontFamily: FONT_FAMILY_INTER }}
              >
                {formatCurrency(order.total)}
              </p>
              <p className="text-[8px] text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>
                {formatDate(order.createdAt)}
              </p>
              {isPaid && (
                <span className="text-[7px] text-black bg-[#f7f4ef] px-1 py-0.5 rounded">Paid</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ============================================================
// FILTER CONTROLS COMPONENT
// ============================================================

const FilterControls = ({
  periodType,
  setPeriodType,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  selectedDay,
  setSelectedDay,
  months,
  getYears,
  getDaysInMonth,
  compact = false,
}) => {
  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setPeriodType('day')}
          className={`px-2 py-1 text-[10px] font-medium rounded-lg transition-colors flex items-center gap-1 ${
            periodType === 'day'
              ? 'bg-black text-white'
              : 'bg-white text-gray-500 hover:bg-[#f7f4ef] border border-[#e2e3dd]/60'
          }`}
          style={{ fontFamily: FONT_FAMILY_INTER }}
        >
          <FaCalendarDay className="w-2.5 h-2.5" />
          Day
        </button>
        <button
          onClick={() => setPeriodType('week')}
          className={`px-2 py-1 text-[10px] font-medium rounded-lg transition-colors flex items-center gap-1 ${
            periodType === 'week'
              ? 'bg-black text-white'
              : 'bg-white text-gray-500 hover:bg-[#f7f4ef] border border-[#e2e3dd]/60'
          }`}
          style={{ fontFamily: FONT_FAMILY_INTER }}
        >
          <FaCalendarWeek className="w-2.5 h-2.5" />
          Week
        </button>
        <button
          onClick={() => setPeriodType('month')}
          className={`px-2 py-1 text-[10px] font-medium rounded-lg transition-colors flex items-center gap-1 ${
            periodType === 'month'
              ? 'bg-black text-white'
              : 'bg-white text-gray-500 hover:bg-[#f7f4ef] border border-[#e2e3dd]/60'
          }`}
          style={{ fontFamily: FONT_FAMILY_INTER }}
        >
          <FaCalendarAlt className="w-2.5 h-2.5" />
          Month
        </button>
        <button
          onClick={() => setPeriodType('year')}
          className={`px-2 py-1 text-[10px] font-medium rounded-lg transition-colors flex items-center gap-1 ${
            periodType === 'year'
              ? 'bg-black text-white'
              : 'bg-white text-gray-500 hover:bg-[#f7f4ef] border border-[#e2e3dd]/60'
          }`}
          style={{ fontFamily: FONT_FAMILY_INTER }}
        >
          <FaCalendar className="w-2.5 h-2.5" />
          Year
        </button>

        <div className="h-4 w-px bg-[#e2e3dd]/60 mx-1"></div>

        {periodType === 'day' && (
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(parseInt(e.target.value))}
            className="px-2 py-1 text-[10px] border border-[#e2e3dd]/60 rounded-lg bg-white text-[#29362f]"
            style={{ fontFamily: FONT_FAMILY_INTER }}
          >
            {[...Array(getDaysInMonth(selectedYear, selectedMonth))].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        )}

        {(periodType === 'day' || periodType === 'month') && (
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="px-2 py-1 text-[10px] border border-[#e2e3dd]/60 rounded-lg bg-white text-[#29362f]"
            style={{ fontFamily: FONT_FAMILY_INTER }}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.name}
              </option>
            ))}
          </select>
        )}

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="px-2 py-1 text-[10px] border border-[#e2e3dd]/60 rounded-lg bg-white text-[#29362f]"
          style={{ fontFamily: FONT_FAMILY_INTER }}
        >
          {getYears().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return null;
};

// ============================================================
// QUICK ACTIONS COMPONENT
// ============================================================

const QuickActions = ({ router, userRole }) => {
  const isAdminOrSuperAdmin = ['super_admin', 'admin'].includes(userRole);

  const actions = [
    {
      label: 'Add Product',
      icon: FaPlus,
      color: 'bg-black text-white hover:bg-[#405347]',
      onClick: () => router.push('/authorize/addProduct'),
      roles: ['super_admin', 'admin', 'moderator'],
    },
    {
      label: 'View Orders',
      icon: FaClipboardList,
      color: 'bg-blue-500 text-white hover:bg-blue-600',
      onClick: () => router.push('/authorize/orders'),
      roles: ['super_admin', 'admin', 'moderator'],
    },
    {
      label: 'Stock Alerts',
      icon: FaExclamationTriangle,
      color: 'bg-amber-500 text-white hover:bg-amber-600',
      onClick: () => router.push('/authorize/stock-alert'),
      roles: ['super_admin', 'admin', 'moderator'],
    },
    {
      label: 'Restock',
      icon: FaWarehouse,
      color: 'bg-emerald-500 text-white hover:bg-emerald-600',
      onClick: () => router.push('/authorize/restock'),
      roles: ['super_admin', 'admin', 'moderator'],
    },
    {
      label: 'Profit Margin',
      icon: FaPercentage,
      color: 'bg-purple-500 text-white hover:bg-purple-600',
      onClick: () => router.push('/authorize/profit-margin'),
      roles: ['super_admin', 'admin'],
    },
    {
      label: 'Platform Sales',
      icon: FaChartLine,
      color: 'bg-pink-500 text-white hover:bg-pink-600',
      onClick: () => router.push('/authorize/platform-sales'),
      roles: ['super_admin', 'admin'],
    },
    {
      label: 'Add User',
      icon: FaUserPlus,
      color: 'bg-indigo-500 text-white hover:bg-indigo-600',
      onClick: () => router.push('/authorize/create-users'),
      roles: ['super_admin', 'admin'],
    },
    {
      label: 'Settings',
      icon: FaCog,
      color: 'bg-gray-600 text-white hover:bg-gray-700',
      onClick: () => router.push('/authorize/settings'),
      roles: ['super_admin', 'admin'],
    },
  ];

  const filteredActions = actions.filter((action) => action.roles.includes(userRole));

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e3dd]/60">
      <div className="flex items-center gap-2 mb-3">
        <FaRocket className="w-4 h-4 text-black" />
        <h2
          className="text-sm font-semibold text-[#29362f]"
          style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
        >
          Quick Actions
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {filteredActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              onClick={action.onClick}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all ${action.color} shadow-sm hover:shadow-md`}
            >
              <Icon className="w-4 h-4" />
              <span
                className="text-[10px] font-medium text-center leading-tight"
                style={{ fontFamily: FONT_FAMILY_INTER }}
              >
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================
// MAIN DASHBOARD COMPONENT
// ============================================================

export default function AdminDashboard() {
  const router = useRouter();
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Dashboard data states
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProfit: 0,
    totalProducts: 0,
    activeProducts: 0,
    inactiveProducts: 0,
    comingSoonProducts: 0,
    totalReviews: 0,
    paidOrders: 0,
    pendingPayment: 0,
    orderStatuses: {},
    recentOrders: [],
    topProducts: [],
    lowStockProducts: [],
    averageProfitMargin: 0,
    totalCost: 0,
    totalQuantity: 0,
    totalDiscount: 0,
    netProfitAfterDiscount: 0,
    averageNetProfitMargin: 0,
  });

  // Platform sales data
  const [platformData, setPlatformData] = useState({
    website: {
      totalOrders: 0,
      totalRevenue: 0,
      totalProfit: 0,
      netProfitAfterDiscount: 0,
      profitMargin: '0.00',
      delivered: 0,
      cancelled: 0,
      returned: 0,
    },
    facebook: {
      totalOrders: 0,
      totalRevenue: 0,
      totalProfit: 0,
      netProfitAfterDiscount: 0,
      profitMargin: '0.00',
      delivered: 0,
      cancelled: 0,
      returned: 0,
    },
    instagram: {
      totalOrders: 0,
      totalRevenue: 0,
      totalProfit: 0,
      netProfitAfterDiscount: 0,
      profitMargin: '0.00',
      delivered: 0,
      cancelled: 0,
      returned: 0,
    },
    showroom: {
      totalOrders: 0,
      totalRevenue: 0,
      totalProfit: 0,
      netProfitAfterDiscount: 0,
      profitMargin: '0.00',
      delivered: 0,
      cancelled: 0,
      returned: 0,
    },
  });
  const [selectedPlatform, setSelectedPlatform] = useState('website');
  const [platformLoading, setPlatformLoading] = useState(false);

  // Sales chart data
  const [salesChartData, setSalesChartData] = useState([]);
  const [salesChartLoading, setSalesChartLoading] = useState(false);

  // Period filter states - Default to current month
  const [periodType, setPeriodType] = useState('month');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  // Separate period for order status
  const [orderPeriodType, setOrderPeriodType] = useState('month');
  const [orderSelectedMonth, setOrderSelectedMonth] = useState(new Date().getMonth() + 1);
  const [orderSelectedYear, setOrderSelectedYear] = useState(new Date().getFullYear());
  const [orderSelectedDay, setOrderSelectedDay] = useState(new Date().getDate());

  // Sales chart period (separate)
  const [salesPeriodType, setSalesPeriodType] = useState('week');
  const [salesSelectedMonth, setSalesSelectedMonth] = useState(new Date().getMonth() + 1);
  const [salesSelectedYear, setSalesSelectedYear] = useState(new Date().getFullYear());
  const [salesSelectedDay, setSalesSelectedDay] = useState(new Date().getDate());

  // Show/hide filter panels
  const [showProfitFilters, setShowProfitFilters] = useState(false);
  const [showOrderFilters, setShowOrderFilters] = useState(false);
  const [showPlatformFilters, setShowPlatformFilters] = useState(false);
  const [showSalesChartFilters, setShowSalesChartFilters] = useState(false);

  const isAdminOrSuperAdmin = ['super_admin', 'admin'].includes(userRole);
  const isModerator = userRole === 'moderator';

  // Months array
  const months = [
    { value: 1, name: 'January' },
    { value: 2, name: 'February' },
    { value: 3, name: 'March' },
    { value: 4, name: 'April' },
    { value: 5, name: 'May' },
    { value: 6, name: 'June' },
    { value: 7, name: 'July' },
    { value: 8, name: 'August' },
    { value: 9, name: 'September' },
    { value: 10, name: 'October' },
    { value: 11, name: 'November' },
    { value: 12, name: 'December' },
  ];

  const getYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 5; i--) {
      years.push(i);
    }
    return years;
  };

  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

  // ============================================================
  // DATE RANGE HELPERS
  // ============================================================

  const getDateRange = useCallback((type, month, year, day) => {
    let startDate, endDate;

    if (type === 'day') {
      startDate = new Date(year, month - 1, day);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(year, month - 1, day);
      endDate.setHours(23, 59, 59, 999);
    } else if (type === 'week') {
      const today = new Date(year, month - 1, day);
      const dayOfWeek = today.getDay();
      startDate = new Date(today);
      startDate.setDate(today.getDate() - dayOfWeek);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 6);
      endDate.setHours(23, 59, 59, 999);
    } else if (type === 'month') {
      startDate = new Date(year, month - 1, 1);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(year, month, 0);
      endDate.setHours(23, 59, 59, 999);
    } else if (type === 'year') {
      startDate = new Date(year, 0, 1);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(year, 11, 31);
      endDate.setHours(23, 59, 59, 999);
    }

    return {
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    };
  }, []);

  const getFilterLabel = useCallback(
    (type, month, year, day) => {
      if (type === 'day') {
        return `${day} ${months.find((m) => m.value === month)?.name} ${year}`;
      }
      if (type === 'week') {
        const { startDate, endDate } = getDateRange(type, month, year, day);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return `${start.getDate()} ${months[start.getMonth()]?.name} - ${end.getDate()} ${
          months[end.getMonth()]?.name
        }`;
      }
      if (type === 'month') {
        return `${months.find((m) => m.value === month)?.name} ${year}`;
      }
      return `Year ${year}`;
    },
    [getDateRange, months]
  );

  // ============================================================
  // EMPTY CHART DATA (period-aware)
  // ============================================================
  const getEmptySalesData = useCallback((periodType) => {
    const data = [];
    const today = new Date();

    if (periodType === 'day') {
      data.push({
        date: today.toISOString().split('T')[0],
        dateLabel: today.toLocaleDateString('en-BD', { day: '2-digit', month: 'short' }),
        total: 0,
        website: 0,
        facebook: 0,
        instagram: 0,
        showroom: 0,
        orders: 0,
      });
      return data;
    }

    if (periodType === 'week') {
      for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        data.push({
          date: d.toISOString().split('T')[0],
          dateLabel: d.toLocaleDateString('en-BD', { day: '2-digit', month: 'short' }),
          total: 0,
          website: 0,
          facebook: 0,
          instagram: 0,
          showroom: 0,
          orders: 0,
        });
      }
      return data;
    }

    if (periodType === 'month') {
      const y = today.getFullYear();
      const m = today.getMonth();
      const daysInMonth = new Date(y, m + 1, 0).getDate();
      for (let i = 1; i <= daysInMonth; i++) {
        const d = new Date(y, m, i);
        data.push({
          date: d.toISOString().split('T')[0],
          dateLabel: d.toLocaleDateString('en-BD', { day: '2-digit', month: 'short' }),
          total: 0,
          website: 0,
          facebook: 0,
          instagram: 0,
          showroom: 0,
          orders: 0,
        });
      }
      return data;
    }

    // year → 12 months
    const y = today.getFullYear();
    for (let i = 0; i < 12; i++) {
      const d = new Date(y, i, 1);
      data.push({
        date: `${y}-${String(i + 1).padStart(2, '0')}-01`,
        dateLabel: d.toLocaleDateString('en-BD', { month: 'short' }),
        total: 0,
        website: 0,
        facebook: 0,
        instagram: 0,
        showroom: 0,
        orders: 0,
      });
    }
    return data;
  }, []);

  // ============================================================
  // FETCH PRODUCT STATS
  // ============================================================

  const fetchProductStats = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:5000/api/products/admin/all?limit=9999', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (data.success && data.data) {
        const products = data.data;
        const totalProducts = products.length;
        const activeProducts = products.filter((p) => p.isActive === true).length;
        const inactiveProducts = products.filter((p) => p.isActive === false).length;
        const comingSoonProducts = products.filter((p) => p.comingSoon === true).length;

        // Get low stock products (top 5 lowest)
        const lowStockProducts = products
          .filter((p) => {
            const stock = Number(p.stockQuantity) || 0;
            const alertQty = Number(p.stockAlertQuantity) || 0;
            return stock <= 0 || (alertQty > 0 && stock <= alertQty);
          })
          .sort((a, b) => {
            const aStock = Number(a.stockQuantity) || 0;
            const bStock = Number(b.stockQuantity) || 0;
            return aStock - bStock;
          })
          .slice(0, 5);

        setStats((prev) => ({
          ...prev,
          totalProducts,
          activeProducts,
          inactiveProducts,
          comingSoonProducts,
          lowStockProducts,
        }));
      }
    } catch (error) {
      console.error('Error fetching product stats:', error);
    }
  }, []);

  // ============================================================
  // FETCH DASHBOARD DATA (Orders, Profit, etc.)
  // ============================================================

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      // Get date range for profit/orders
      const { startDate, endDate } = getDateRange(
        periodType,
        selectedMonth,
        selectedYear,
        selectedDay
      );

      // Get date range for order status
      const { startDate: orderStartDate, endDate: orderEndDate } = getDateRange(
        orderPeriodType,
        orderSelectedMonth,
        orderSelectedYear,
        orderSelectedDay
      );

      // 1. FETCH FILTERED ORDER STATS
      let statsUrl = 'http://localhost:5000/api/orders/admin/stats/filtered';
      if (orderStartDate && orderEndDate) {
        statsUrl += `?startDate=${encodeURIComponent(orderStartDate)}&endDate=${encodeURIComponent(
          orderEndDate
        )}`;
      }

      const statsResponse = await fetch(statsUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const statsData = await statsResponse.json();
      const orderStats = statsData.success ? statsData.data : {};

      // 2. FETCH PROFIT MARGIN DATA
      const profitParams = new URLSearchParams({
        orderStatus: 'delivered',
        paymentStatus: 'paid',
      });

      if (startDate && endDate) {
        profitParams.append('startDate', startDate);
        profitParams.append('endDate', endDate);
      }

      const profitResponse = await fetch(
        `http://localhost:5000/api/orders/admin/profit-margin?${profitParams.toString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const profitData = await profitResponse.json();
      const profitSummary = profitData.success ? profitData.data.summary : {};

      // 3. FETCH RECENT ORDERS
      let ordersParams = new URLSearchParams({
        limit: 10,
        sort: '-createdAt',
      });

      if (orderStartDate && orderEndDate) {
        ordersParams.append('startDate', orderStartDate);
        ordersParams.append('endDate', orderEndDate);
      }

      const recentOrdersResponse = await fetch(
        `http://localhost:5000/api/orders/admin/all?${ordersParams.toString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const recentOrdersData = await recentOrdersResponse.json();
      const recentOrders = recentOrdersData.success ? recentOrdersData.data : [];

      // 4. FETCH REVIEWS COUNT
      const reviewsResponse = await fetch(`http://localhost:5000/api/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const reviewsData = await reviewsResponse.json();
      const totalReviews = reviewsData.success ? reviewsData.data?.length || 0 : 0;

      // PROCESS DATA
      const totalOrders = orderStats.totalOrders || 0;
      const pendingPayment = orderStats.pendingPayment || 0;

      const orderStatuses = {
        placed: orderStats.placedOrders || 0,
        follow_up: orderStats.followUpOrders || 0,
        reminder: orderStats.reminderOrders || 0,
        accepted: orderStats.acceptedOrders || 0,
        approved: orderStats.approvedOrders || 0,
        hold: orderStats.holdOrders || 0,
        ready_to_ship: orderStats.readyToShipOrders || 0,
        courier_assigned: orderStats.courierAssignedOrders || 0,
        processing: orderStats.processingOrders || 0,
        shipped: orderStats.shippedOrders || 0,
        out_for_delivery: orderStats.outForDeliveryOrders || 0,
        delivered: orderStats.deliveredOrders || 0,
        cancelled: orderStats.cancelledOrders || 0,
        rejected: orderStats.rejectedOrders || 0,
        returned: orderStats.returnedOrders || 0,
        partial_delivery: orderStats.partialDeliveryOrders || 0,
        refunded: orderStats.refundedOrders || 0,
        failed: orderStats.failedOrders || 0,
      };

      const totalRevenue = profitSummary.totalRevenue || 0;
      const totalProfit = profitSummary.totalProfit || 0;
      const averageProfitMargin = profitSummary.averageProfitMargin || 0;
      const paidOrders = profitSummary.totalOrders || 0;
      const totalDiscount = profitSummary.totalDiscount || 0;
      const netProfitAfterDiscount = profitSummary.netProfitAfterDiscount || 0;
      const averageNetProfitMargin = profitSummary.averageNetProfitMargin || 0;

      const productDetails = profitData.success ? profitData.data.productProfitDetails || [] : [];
      const topProducts = productDetails
        .sort((a, b) => b.totalRevenue - a.totalRevenue)
        .slice(0, 5)
        .map((p) => ({
          id: p.productId || `product-${Math.random()}`,
          name: p.productName || 'Unknown Product',
          sales: p.totalQuantity || 0,
          revenue: p.totalRevenue || 0,
          image: p.image || '',
          discountPrice: p.averageSellingPrice || 0,
          regularPrice: p.averageSellingPrice || 0,
        }));

      setStats((prev) => ({
        ...prev,
        totalOrders,
        totalRevenue,
        totalProfit,
        totalReviews,
        paidOrders,
        pendingPayment,
        orderStatuses,
        recentOrders,
        topProducts,
        averageProfitMargin,
        totalDiscount,
        netProfitAfterDiscount,
        averageNetProfitMargin,
      }));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [
    periodType,
    selectedMonth,
    selectedYear,
    selectedDay,
    orderPeriodType,
    orderSelectedMonth,
    orderSelectedYear,
    orderSelectedDay,
    router,
    getDateRange,
  ]);

  // ============================================================
  // FETCH PLATFORM SALES DATA
  // ============================================================

  const fetchPlatformData = useCallback(async () => {
    if (!isAdminOrSuperAdmin) return;

    setPlatformLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const { startDate, endDate } = getDateRange(
        periodType,
        selectedMonth,
        selectedYear,
        selectedDay
      );

      const params = new URLSearchParams({
        platform: 'website',
        limit: 1,
      });

      if (startDate && endDate) {
        params.append('startDate', startDate);
        params.append('endDate', endDate);
      }

      const response = await fetch(
        `http://localhost:5000/api/orders/admin/platform-sales?${params.toString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();

      if (data.success && data.data?.platforms) {
        setPlatformData(data.data.platforms);
      }
    } catch (error) {
      console.error('Error fetching platform data:', error);
    } finally {
      setPlatformLoading(false);
    }
  }, [isAdminOrSuperAdmin, periodType, selectedMonth, selectedYear, selectedDay, getDateRange]);

  // ============================================================
  // FETCH SALES CHART DATA (uses new trend endpoint)
  // ============================================================

  const fetchSalesChartData = useCallback(async () => {
    if (!isAdminOrSuperAdmin) return;

    setSalesChartLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const { startDate, endDate } = getDateRange(
        salesPeriodType,
        salesSelectedMonth,
        salesSelectedYear,
        salesSelectedDay
      );

      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await fetch(
        `http://localhost:5000/api/orders/admin/platform-sales-trend?${params.toString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await response.json();

      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setSalesChartData(data.data);
      } else {
        setSalesChartData(getEmptySalesData(salesPeriodType));
      }
    } catch (error) {
      console.error('Error fetching sales chart data:', error);
      setSalesChartData(getEmptySalesData(salesPeriodType));
    } finally {
      setSalesChartLoading(false);
    }
  }, [
    isAdminOrSuperAdmin,
    salesPeriodType,
    salesSelectedMonth,
    salesSelectedYear,
    salesSelectedDay,
    getDateRange,
    getEmptySalesData,
  ]);

  // ============================================================
  // EFFECTS
  // ============================================================

  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);
  }, []);

  useEffect(() => {
    if (userRole) {
      fetchProductStats();
      fetchDashboardData();
      if (isAdminOrSuperAdmin) {
        fetchPlatformData();
        fetchSalesChartData();
      }
    }
  }, [
    userRole,
    fetchProductStats,
    fetchDashboardData,
    fetchPlatformData,
    fetchSalesChartData,
    isAdminOrSuperAdmin,
  ]);

  // Refetch platform data when period changes
  useEffect(() => {
    if (userRole && isAdminOrSuperAdmin) {
      fetchPlatformData();
    }
  }, [periodType, selectedMonth, selectedYear, selectedDay, userRole, isAdminOrSuperAdmin, fetchPlatformData]);

  // Refetch sales chart when period changes
  useEffect(() => {
    if (userRole && isAdminOrSuperAdmin) {
      fetchSalesChartData();
    }
  }, [
    salesPeriodType,
    salesSelectedMonth,
    salesSelectedYear,
    salesSelectedDay,
    userRole,
    isAdminOrSuperAdmin,
    fetchSalesChartData,
  ]);

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleRefresh = () => {
    setRefreshing(true);
    fetchProductStats();
    fetchDashboardData();
    if (isAdminOrSuperAdmin) {
      fetchPlatformData();
      fetchSalesChartData();
    }
  };

  const orderStatuses = stats.orderStatuses || {};

  // Get ALL order statuses (including zero counts)
  const allStatusesWithCounts = useMemo(() => {
    return ALL_ORDER_STATUSES.map((status) => ({
      status,
      count: orderStatuses[status] || 0,
    }));
  }, [orderStatuses]);

  // Get order source distribution for pie chart
  const orderSourceData = useMemo(() => {
    if (!isAdminOrSuperAdmin) return [];

    const totalFromPlatforms = Object.values(platformData).reduce(
      (sum, p) => sum + (p.totalOrders || 0),
      0
    );

    if (totalFromPlatforms === 0) return [];

    return [
      { name: 'Website', value: platformData.website?.totalOrders || 0, color: COLORS.pink },
      { name: 'Facebook', value: platformData.facebook?.totalOrders || 0, color: COLORS.blue },
      { name: 'Instagram', value: platformData.instagram?.totalOrders || 0, color: COLORS.purple },
      { name: 'Showroom', value: platformData.showroom?.totalOrders || 0, color: COLORS.green },
    ].filter((item) => item.value > 0);
  }, [platformData, isAdminOrSuperAdmin]);

  const totalOrderSourceCount = useMemo(() => {
    return orderSourceData.reduce((sum, item) => sum + item.value, 0);
  }, [orderSourceData]);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <ProtectedRoute pageKey="dashboard">
      <div className="min-h-screen bg-gradient-to-b from-white via-[#f7f4ef]/30 to-white p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* ============================================================
              HEADER
              ============================================================ */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-black to-black rounded-xl flex items-center justify-center shadow-lg shadow-black/20">
                <FaChartLine className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1
                  className="text-xl font-bold text-[#29362f]"
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                >
                  Dashboard
                </h1>
                <p className="text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>
                  Welcome back! Here's what's happening.
                </p>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#e2e3dd]/60 text-[#29362f] rounded-lg hover:bg-[#f7f4ef] transition-colors text-xs disabled:opacity-50"
            >
              {refreshing ? (
                <FaSpinner className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <FaSync className="w-3.5 h-3.5" />
              )}
              Refresh
            </button>
          </div>

          {/* ============================================================
              PRODUCT STATS CARDS - ALL ROLES
              ============================================================ */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <StatCard
              title="Total Products"
              value={stats.totalProducts}
              icon={<FaBox className="w-3.5 h-3.5 text-black" />}
              color="bg-[#f7f4ef]"
              subtitle="All products"
              loading={loading}
              onClick={() => router.push('/authorize/all-products')}
            />
            <StatCard
              title="Active"
              value={stats.activeProducts}
              icon={<FaToggleOn className="w-3.5 h-3.5 text-emerald-600" />}
              color="bg-emerald-50"
              subtitle="Published products"
              loading={loading}
              onClick={() => router.push('/authorize/all-products?status=active')}
            />
            <StatCard
              title="Inactive"
              value={stats.inactiveProducts}
              icon={<FaToggleOff className="w-3.5 h-3.5 text-gray-500" />}
              color="bg-gray-100"
              subtitle="Unpublished products"
              loading={loading}
              onClick={() => router.push('/authorize/all-products?status=inactive')}
            />
            <StatCard
              title="Coming Soon"
              value={stats.comingSoonProducts}
              icon={<FaHourglassHalf className="w-3.5 h-3.5 text-amber-600" />}
              color="bg-amber-50"
              subtitle="Upcoming products"
              loading={loading}
              onClick={() => router.push('/authorize/all-products?status=coming_soon')}
            />
          </div>

          {/* ============================================================
              PROFIT MARGIN SECTION - ADMIN & SUPER ADMIN ONLY
              ============================================================ */}
          {isAdminOrSuperAdmin && (
            <div className="mb-4">
              {/* Filter Bar */}
              <div className="bg-white rounded-xl border border-[#e2e3dd]/60 shadow-sm overflow-hidden mb-3">
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5">
                  <div className="flex items-center gap-2">
                    <FaPercentage className="w-4 h-4 text-black" />
                    <span
                      className="text-sm font-semibold text-[#29362f]"
                      style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                    >
                      Profit Margin
                    </span>
                    <span className="text-[10px] text-gray-500 bg-[#f7f4ef] px-1.5 py-0.5 rounded-full border border-[#e2e3dd]/60">
                      {getFilterLabel(periodType, selectedMonth, selectedYear, selectedDay)}
                    </span>
                  </div>

                  <button
                    onClick={() => setShowProfitFilters(!showProfitFilters)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium rounded-lg transition-colors ${
                      showProfitFilters
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-500 hover:bg-[#f7f4ef] border border-[#e2e3dd]/60'
                    }`}
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    <FaFilter className="w-2.5 h-2.5" />
                    Filters
                    {showProfitFilters ? (
                      <FaChevronUp className="w-2.5 h-2.5" />
                    ) : (
                      <FaChevronDown className="w-2.5 h-2.5" />
                    )}
                  </button>
                </div>

                {showProfitFilters && (
                  <div className="p-2.5 border-t border-[#e2e3dd]/60 bg-[#f7f4ef]/50">
                    <FilterControls
                      periodType={periodType}
                      setPeriodType={setPeriodType}
                      selectedMonth={selectedMonth}
                      setSelectedMonth={setSelectedMonth}
                      selectedYear={selectedYear}
                      setSelectedYear={setSelectedYear}
                      selectedDay={selectedDay}
                      setSelectedDay={setSelectedDay}
                      months={months}
                      getYears={getYears}
                      getDaysInMonth={getDaysInMonth}
                      compact
                    />
                  </div>
                )}
              </div>

              {/* Profit Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <StatCard
                  title="Revenue"
                  value={formatCurrency(stats.totalRevenue)}
                  icon={<FaMoneyBillWave className="w-3.5 h-3.5 text-emerald-600" />}
                  color="bg-emerald-50"
                  subtitle="Delivered + Paid"
                  loading={loading}
                />
                <StatCard
                  title="Total Profit"
                  value={formatCurrency(stats.totalProfit)}
                  icon={<FaChartLine className="w-3.5 h-3.5 text-black" />}
                  color="bg-[#f7f4ef]"
                  subtitle={`${stats.averageProfitMargin?.toFixed(1) || 0}% margin`}
                  loading={loading}
                />
                <StatCard
                  title="Discount"
                  value={formatCurrency(stats.totalDiscount)}
                  icon={<FaTag className="w-3.5 h-3.5 text-red-500" />}
                  color="bg-red-50"
                  subtitle="Total discount given"
                  loading={loading}
                />
                <StatCard
                  title="Net Profit"
                  value={formatCurrency(stats.netProfitAfterDiscount)}
                  icon={<FaDollarSign className="w-3.5 h-3.5 text-emerald-700" />}
                  color="bg-emerald-100"
                  subtitle={`${stats.averageNetProfitMargin?.toFixed(1) || 0}% net margin`}
                  loading={loading}
                />
                <StatCard
                  title="Delivered Orders"
                  value={stats.paidOrders}
                  icon={<FaCheckDouble className="w-3.5 h-3.5 text-black" />}
                  color="bg-[#f7f4ef]"
                  subtitle="Delivered & Paid"
                  loading={loading}
                  onClick={() => router.push('/authorize/orders?status=delivered')}
                />
              </div>
            </div>
          )}

          {/* ============================================================
              ORDER STATUS SECTION - ALL ROLES (ALL STATUSES SHOWN)
              ============================================================ */}
          <div className="mb-4">
            {/* Filter Bar */}
            <div className="bg-white rounded-xl border border-[#e2e3dd]/60 shadow-sm overflow-hidden mb-3">
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5">
                <div className="flex items-center gap-2">
                  <FaClipboardList className="w-4 h-4 text-black" />
                  <span
                    className="text-sm font-semibold text-[#29362f]"
                    style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                  >
                    Order Status Breakdown
                  </span>
                  <span className="text-[10px] text-gray-500 bg-[#f7f4ef] px-1.5 py-0.5 rounded-full border border-[#e2e3dd]/60">
                    {getFilterLabel(
                      orderPeriodType,
                      orderSelectedMonth,
                      orderSelectedYear,
                      orderSelectedDay
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowOrderFilters(!showOrderFilters)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium rounded-lg transition-colors ${
                      showOrderFilters
                        ? 'bg-black text-white'
                        : 'bg-white text-gray-500 hover:bg-[#f7f4ef] border border-[#e2e3dd]/60'
                    }`}
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    <FaFilter className="w-2.5 h-2.5" />
                    Filters
                    {showOrderFilters ? (
                      <FaChevronUp className="w-2.5 h-2.5" />
                    ) : (
                      <FaChevronDown className="w-2.5 h-2.5" />
                    )}
                  </button>
                  <button
                    onClick={() => router.push('/authorize/orders')}
                    className="text-[10px] text-black hover:text-[#405347] flex items-center gap-0.5 transition-colors"
                    style={{ fontFamily: FONT_FAMILY_INTER }}
                  >
                    View All <FaArrowRight className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>

              {showOrderFilters && (
                <div className="p-2.5 border-t border-[#e2e3dd]/60 bg-[#f7f4ef]/50">
                  <FilterControls
                    periodType={orderPeriodType}
                    setPeriodType={setOrderPeriodType}
                    selectedMonth={orderSelectedMonth}
                    setSelectedMonth={setOrderSelectedMonth}
                    selectedYear={orderSelectedYear}
                    setSelectedYear={setOrderSelectedYear}
                    selectedDay={orderSelectedDay}
                    setSelectedDay={setOrderSelectedDay}
                    months={months}
                    getYears={getYears}
                    getDaysInMonth={getDaysInMonth}
                    compact
                  />
                </div>
              )}
            </div>

            {/* Order Status Cards - ALL STATUSES */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e3dd]/60">
              {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={`status-loading-${i}`}
                      className="p-2 rounded-xl border border-[#e2e3dd]/60 animate-pulse"
                    >
                      <div className="h-2.5 bg-[#e2e3dd]/60 rounded w-1/2 mb-1.5"></div>
                      <div className="h-5 bg-[#e2e3dd]/60 rounded w-1/3"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {/* Summary Row */}
                  <div className="flex flex-wrap items-center gap-4 mb-3 pb-3 border-b border-[#e2e3dd]/60">
                    <div className="flex items-center gap-2">
                      <FaShoppingCart className="w-4 h-4 text-black" />
                      <span
                        className="text-sm font-bold text-[#29362f]"
                        style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                      >
                        {stats.totalOrders} Total Orders
                      </span>
                    </div>
                  
                  </div>

                  {/* ALL Status Cards Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {allStatusesWithCounts.map(({ status, count }) => (
                      <OrderStatusCard
                        key={`status-${status}`}
                        status={status}
                        count={count}
                        totalOrders={stats.totalOrders}
                        onClick={() => router.push(`/authorize/orders?status=${status}`)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ============================================================
              SALES OVERVIEW CHART - ADMIN & SUPER ADMIN ONLY
              ============================================================ */}
          {isAdminOrSuperAdmin && (
            <div className="mb-4">
              {/* Filter Bar */}
              <div className="bg-white rounded-xl border border-[#e2e3dd]/60 shadow-sm overflow-hidden mb-3">
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5">
                  <div className="flex items-center gap-2">
                    <FaChartLine className="w-4 h-4 text-black" />
                    <span
                      className="text-sm font-semibold text-[#29362f]"
                      style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                    >
                      Sales Overview
                    </span>
                    <span className="text-[10px] text-gray-500 bg-[#f7f4ef] px-1.5 py-0.5 rounded-full border border-[#e2e3dd]/60">
                      {getFilterLabel(
                        salesPeriodType,
                        salesSelectedMonth,
                        salesSelectedYear,
                        salesSelectedDay
                      )}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Legend */}
                    <div className="hidden lg:flex items-center gap-3 text-[9px] text-gray-500">
                      <span className="flex items-center gap-1">
                        <span
                          className="h-1.5 w-4 rounded-full"
                          style={{ backgroundColor: COLORS.pink }}
                        />
                        Total
                      </span>
                      <span className="flex items-center gap-1">
                        <span
                          className="h-1.5 w-4 rounded-full"
                          style={{ backgroundColor: COLORS.purple }}
                        />
                        Website
                      </span>
                      <span className="flex items-center gap-1">
                        <span
                          className="h-1.5 w-4 rounded-full"
                          style={{ backgroundColor: COLORS.blue }}
                        />
                        Facebook
                      </span>

                        <span className="flex items-center gap-1">
    <span className="h-1.5 w-4 rounded-full" style={{ backgroundColor: COLORS.orange }} />
    Instagram
  </span>
                      <span className="flex items-center gap-1">
                        <span
                          className="h-1.5 w-4 rounded-full"
                          style={{ backgroundColor: COLORS.green }}
                        />
                        Showroom
                      </span>
                    </div>

                    <button
                      onClick={() => setShowSalesChartFilters(!showSalesChartFilters)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium rounded-lg transition-colors ${
                        showSalesChartFilters
                          ? 'bg-black text-white'
                          : 'bg-white text-gray-500 hover:bg-[#f7f4ef] border border-[#e2e3dd]/60'
                      }`}
                      style={{ fontFamily: FONT_FAMILY_INTER }}
                    >
                      <FaFilter className="w-2.5 h-2.5" />
                      Filters
                      {showSalesChartFilters ? (
                        <FaChevronUp className="w-2.5 h-2.5" />
                      ) : (
                        <FaChevronDown className="w-2.5 h-2.5" />
                      )}
                    </button>
                  </div>
                </div>

                {showSalesChartFilters && (
                  <div className="p-2.5 border-t border-[#e2e3dd]/60 bg-[#f7f4ef]/50">
                    <FilterControls
                      periodType={salesPeriodType}
                      setPeriodType={setSalesPeriodType}
                      selectedMonth={salesSelectedMonth}
                      setSelectedMonth={setSalesSelectedMonth}
                      selectedYear={salesSelectedYear}
                      setSelectedYear={setSalesSelectedYear}
                      selectedDay={salesSelectedDay}
                      setSelectedDay={setSalesSelectedDay}
                      months={months}
                      getYears={getYears}
                      getDaysInMonth={getDaysInMonth}
                      compact
                    />
                  </div>
                )}
              </div>

              {/* Chart */}
              <div className="bg-white rounded-xl border border-[#e2e3dd]/60 shadow-sm p-4">
                {salesChartLoading ? (
                  <div className="h-[250px] flex items-center justify-center">
                    <FaSpinner className="w-6 h-6 animate-spin text-black" />
                  </div>
                ) : (
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={salesChartData}
                        margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                      >
                        <CartesianGrid stroke="#eeeeee" strokeDasharray="2 2" vertical={true} />

                        <XAxis
                          dataKey="dateLabel"
                          tick={{ fontSize: 9, fill: '#9ca3af' }}
                          axisLine={false}
                          tickLine={false}
                          interval="preserveStartEnd"
                          minTickGap={20}
                        />

                        <YAxis
                          tick={{ fontSize: 9, fill: '#9ca3af' }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(value) =>
                            value >= 1000 ? `${(value / 1000).toFixed(0)}K` : value
                          }
                        />

                        <Tooltip
                          contentStyle={{
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '11px',
                            boxShadow: '0 5px 20px rgba(0,0,0,.08)',
                          }}
                          formatter={(value) => `৳ ${value.toLocaleString()}`}
                        />

                        <Line
                          type="monotone"
                          dataKey="total"
                          stroke={COLORS.pink}
                          strokeWidth={2}
                          dot={{ r: 3, fill: COLORS.pink }}
                          activeDot={{ r: 5 }}
                        />

                        <Line
                          type="monotone"
                          dataKey="website"
                          stroke={COLORS.purple}
                          strokeWidth={1.5}
                          dot={false}
                        />

                        <Line
                          type="monotone"
                          dataKey="facebook"
                          stroke={COLORS.blue}
                          strokeWidth={1.5}
                          dot={false}
                        />

                        <Line
                          type="monotone"
                          dataKey="instagram"
                          stroke={COLORS.orange}
                          strokeWidth={1.5}
                          dot={false}
                        />

                        <Line
                          type="monotone"
                          dataKey="showroom"
                          stroke={COLORS.green}
                          strokeWidth={1.5}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================================
              PLATFORM SALES SUMMARY - ADMIN & SUPER ADMIN ONLY
              (WITH FILTER OPTION)
              ============================================================ */}
          {isAdminOrSuperAdmin && (
            <div className="mb-4">
              <div className="bg-white rounded-xl border border-[#e2e3dd]/60 shadow-sm overflow-hidden">
                {/* ✅ Filter Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 border-b border-[#e2e3dd]/60">
                  <div className="flex items-center gap-2">
                    <FaGlobe className="w-4 h-4 text-black" />
                    <span
                      className="text-sm font-semibold text-[#29362f]"
                      style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                    >
                      Platform Sales Summary
                    </span>
                    <span className="text-[10px] text-gray-500 bg-[#f7f4ef] px-1.5 py-0.5 rounded-full border border-[#e2e3dd]/60">
                      {getFilterLabel(periodType, selectedMonth, selectedYear, selectedDay)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowPlatformFilters(!showPlatformFilters)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-medium rounded-lg transition-colors ${
                        showPlatformFilters
                          ? 'bg-black text-white'
                          : 'bg-white text-gray-500 hover:bg-[#f7f4ef] border border-[#e2e3dd]/60'
                      }`}
                      style={{ fontFamily: FONT_FAMILY_INTER }}
                    >
                      <FaFilter className="w-2.5 h-2.5" />
                      Filters
                      {showPlatformFilters ? (
                        <FaChevronUp className="w-2.5 h-2.5" />
                      ) : (
                        <FaChevronDown className="w-2.5 h-2.5" />
                      )}
                    </button>
                    <button
                      onClick={() => router.push('/authorize/platform-sales')}
                      className="text-[10px] text-black hover:text-[#405347] flex items-center gap-0.5 transition-colors"
                      style={{ fontFamily: FONT_FAMILY_INTER }}
                    >
                      View Details <FaArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>

                {/* ✅ Filter Panel */}
                {showPlatformFilters && (
                  <div className="p-2.5 bg-[#f7f4ef]/50 border-b border-[#e2e3dd]/60">
                    <FilterControls
                      periodType={periodType}
                      setPeriodType={setPeriodType}
                      selectedMonth={selectedMonth}
                      setSelectedMonth={setSelectedMonth}
                      selectedYear={selectedYear}
                      setSelectedYear={setSelectedYear}
                      selectedDay={selectedDay}
                      setSelectedDay={setSelectedDay}
                      months={months}
                      getYears={getYears}
                      getDaysInMonth={getDaysInMonth}
                      compact
                    />
                  </div>
                )}

                <div className="p-4">
                  {platformLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl border border-[#e2e3dd]/60 animate-pulse"
                        >
                          <div className="h-3 bg-[#e2e3dd]/60 rounded w-1/2 mb-2"></div>
                          <div className="h-6 bg-[#e2e3dd]/60 rounded w-3/4"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['website', 'facebook', 'instagram', 'showroom'].map((platform) => (
                          <PlatformCard
                            key={platform}
                            platform={platform}
                            data={platformData[platform]}
                            isActive={selectedPlatform === platform}
                            onClick={() => setSelectedPlatform(platform)}
                          />
                        ))}
                      </div>

                      {/* Platform Performance */}
                      {orderSourceData.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-[#e2e3dd]/60">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Pie Chart */}
                            <div className="flex flex-col items-center">
                              <h4
                                className="text-xs font-semibold text-[#29362f] mb-3"
                                style={{ fontFamily: FONT_FAMILY_INTER }}
                              >
                                Order Distribution
                              </h4>
                              <div className="relative h-[180px] w-[180px]">
                                <ResponsiveContainer width="100%" height="100%">
                                  <PieChart>
                                    <Pie
                                      data={orderSourceData}
                                      dataKey="value"
                                      nameKey="name"
                                      cx="50%"
                                      cy="50%"
                                      innerRadius={50}
                                      outerRadius={80}
                                      paddingAngle={2}
                                      strokeWidth={2}
                                      stroke="#fff"
                                    >
                                      {orderSourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                      ))}
                                    </Pie>
                                    <Tooltip
                                      contentStyle={{
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '11px',
                                        boxShadow: '0 5px 20px rgba(0,0,0,.08)',
                                      }}
                                    />
                                  </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                  <p
                                    className="text-xl font-bold text-[#29362f]"
                                    style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
                                  >
                                    {totalOrderSourceCount}
                                  </p>
                                  <p
                                    className="text-[9px] text-gray-500"
                                    style={{ fontFamily: FONT_FAMILY_INTER }}
                                  >
                                    Total Orders
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Platform List */}
                            <div className="space-y-2">
                              <h4
                                className="text-xs font-semibold text-[#29362f] mb-3"
                                style={{ fontFamily: FONT_FAMILY_INTER }}
                              >
                                Platform Breakdown
                              </h4>
                              {orderSourceData.map((item) => {
                                const percentage =
                                  totalOrderSourceCount > 0
                                    ? Math.round((item.value / totalOrderSourceCount) * 100)
                                    : 0;
                                return (
                                  <div key={item.name} className="flex items-center gap-2 text-xs">
                                    <span
                                      className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                                      style={{ backgroundColor: item.color }}
                                    />
                                    <span
                                      className="w-20 text-gray-600"
                                      style={{ fontFamily: FONT_FAMILY_INTER }}
                                    >
                                      {item.name}
                                    </span>
                                    <div className="flex-1 h-1.5 bg-[#e2e3dd]/60 rounded-full overflow-hidden">
                                      <div
                                        className="h-full rounded-full"
                                        style={{
                                          width: `${percentage}%`,
                                          backgroundColor: item.color,
                                        }}
                                      />
                                    </div>
                                    <span
                                      className="w-8 text-right font-semibold text-[#29362f]"
                                      style={{ fontFamily: FONT_FAMILY_INTER }}
                                    >
                                      {item.value}
                                    </span>
                                    <span
                                      className="w-10 text-right text-gray-400"
                                      style={{ fontFamily: FONT_FAMILY_INTER }}
                                    >
                                      ({percentage}%)
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

       {/* ============================================================
    RECENT ORDERS (LEFT) & TOP PRODUCTS + LOW STOCK (RIGHT)
    ============================================================ */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
  {/* ===== LEFT COLUMN: Recent Orders ===== */}
  <div className="lg:col-span-2 bg-white rounded-xl p-4 shadow-sm border border-[#e2e3dd]/60">
    <div className="flex items-center justify-between mb-3">
      <h2
        className="text-sm font-semibold text-[#29362f] flex items-center gap-1.5"
        style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
      >
        <FaTruck className="w-4 h-4 text-black" />
        Recent Orders
      </h2>
      <button
        onClick={() => router.push('/authorize/orders')}
        className="text-[10px] text-black hover:text-[#405347] flex items-center gap-0.5 transition-colors"
        style={{ fontFamily: FONT_FAMILY_INTER }}
      >
        View All <FaArrowRight className="w-2.5 h-2.5" />
      </button>
    </div>

    <RecentOrdersList
      orders={stats.recentOrders}
      loading={loading}
      onViewOrder={(orderId) => router.push(`/authorize/orders?view=${orderId}`)}
    />
  </div>

  {/* ===== RIGHT COLUMN: Top Products + Low Stock stacked ===== */}
  <div className="flex flex-col gap-4">

    {/* Top 5 Products */}
    <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e3dd]/60">
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-sm font-semibold text-[#29362f] flex items-center gap-1.5"
          style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
        >
          <FaFire className="w-4 h-4 text-black" />
          Top 5 Products
        </h2>
        <button
          onClick={() => router.push('/authorize/all-products')}
          className="text-[10px] text-black hover:text-[#405347] flex items-center gap-0.5 transition-colors"
          style={{ fontFamily: FONT_FAMILY_INTER }}
        >
          View All <FaArrowRight className="w-2.5 h-2.5" />
        </button>
      </div>

      <TopProductsList products={stats.topProducts} loading={loading} />
    </div>

    {/* Low Stock Alerts — under Top Products */}
    <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e3dd]/60">
      <div className="flex items-center justify-between mb-3">
        <h2
          className="text-sm font-semibold text-[#29362f] flex items-center gap-1.5"
          style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
        >
          <FaExclamationTriangle className="w-4 h-4 text-amber-500" />
          Low Stock Alerts
        </h2>
        <button
          onClick={() => router.push('/authorize/stock-alert')}
          className="text-[10px] text-black hover:text-[#405347] flex items-center gap-0.5 transition-colors"
          style={{ fontFamily: FONT_FAMILY_INTER }}
        >
          View All <FaArrowRight className="w-2.5 h-2.5" />
        </button>
      </div>

      <LowStockProductsList
        products={stats.lowStockProducts}
        loading={loading}
        onViewAll={() => router.push('/authorize/stock-alert')}
      />
    </div>

  </div>
</div>



{/* For moderators: Reviews & Orders stats */}
{isModerator && (
  <div className="grid grid-cols-2 gap-3 mb-4">
    <StatCard
      title="Total Reviews"
      value={stats.totalReviews}
      icon={<FaStar className="w-3.5 h-3.5 text-black" />}
      color="bg-[#f7f4ef]"
      subtitle="Customer reviews"
      loading={loading}
      onClick={() => router.push('/authorize/reviews')}
    />
    <StatCard
      title="Total Orders"
      value={stats.totalOrders}
      icon={<FaShoppingCart className="w-3.5 h-3.5 text-black" />}
      color="bg-[#f7f4ef]"
      subtitle="All time orders"
      loading={loading}
      onClick={() => router.push('/authorize/orders')}
    />
  </div>
)}

          {/* ============================================================
              QUICK ACTIONS
              ============================================================ */}
          <QuickActions router={router} userRole={userRole} />

          {/* ============================================================
              ROLE INDICATOR
              ============================================================ */}
          <div
            className="mt-4 text-center text-[10px] text-gray-500"
            style={{ fontFamily: FONT_FAMILY_INTER }}
          >
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white rounded-full border border-[#e2e3dd]/60">
              <FaUserCircle className="w-3 h-3 text-black" />
              Role:{' '}
              <span className="font-medium text-[#29362f]">
                {userRole ? userRole.replace('_', ' ').toUpperCase() : 'Unknown'}
              </span>
              {isAdminOrSuperAdmin && (
                <span className="text-[8px] text-black bg-[#f7f4ef] px-1 py-0.5 rounded-full border border-[#e2e3dd]/60">
                  Full Access
                </span>
              )}
              {isModerator && (
                <span className="text-[8px] text-black bg-[#f7f4ef] px-1 py-0.5 rounded-full border border-[#e2e3dd]/60">
                  Limited
                </span>
              )}
            </span>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}