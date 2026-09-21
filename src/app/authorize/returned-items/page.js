// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { toast } from 'sonner';
// import { motion } from 'framer-motion';
// import {
//   FaSearch, FaEye, FaSpinner, FaTimes, FaChevronLeft, FaChevronRight,
//   FaBox, FaUndo, FaBan, FaCheckCircle, FaMoneyBillWave, FaTruck,
//   FaInfoCircle, FaClipboardList, FaPlus, FaMinus, FaRecycle, FaTrashAlt
// } from 'react-icons/fa';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // ========== STATUS DISPLAY HELPERS ==========
// const ORDER_STATUS_LABEL = {
//   'partial_delivery': 'Partial Delivery',
//   'returned': 'Returned',
// };

// const getOrderStatusBadge = (status) => {
//   if (status === 'partial_delivery') {
//     return 'bg-yellow-100 text-yellow-800 border-yellow-300';
//   }
//   if (status === 'returned') {
//     return 'bg-purple-100 text-purple-800 border-purple-300';
//   }
//   return 'bg-gray-100 text-gray-700 border-gray-300';
// };

// // ========== PROCESS ROW: one delivery item's return processing ==========
// function ReturnedItemRow({ item, onProcess, processing }) {
//   const returned = item.returnedQuantity || 0;
//   const damaged = item.damagedQuantity || 0;
//   const restocked = item.restockedQuantity || 0;
//   const pending = item.pendingQuantity || 0;

//   const [damageQty, setDamageQty] = useState(0);
//   const [restockQty, setRestockQty] = useState(0);
//   const [note, setNote] = useState(item.note || '');

//   const label = [item.productName, item.variantName, item.subVariantName]
//     .filter(Boolean).join(' / ');

//   const isFullyProcessed = pending === 0;

//   const handleProcess = () => {
//     const d = Math.max(0, parseInt(damageQty) || 0);
//     const r = Math.max(0, parseInt(restockQty) || 0);

//     if (d === 0 && r === 0) {
//       toast.error('Enter at least one damaged or restocked quantity');
//       return;
//     }
//     if (d + r > pending) {
//       toast.error(`Total (${d + r}) exceeds pending quantity (${pending})`);
//       return;
//     }

//     onProcess(item.deliveryItemId, d, r, note);
//     setDamageQty(0);
//     setRestockQty(0);
//   };

//   const statusColor = isFullyProcessed
//     ? 'bg-green-100 text-green-700 border-green-300'
//     : 'bg-yellow-100 text-yellow-700 border-yellow-300';

//   return (
//     <div className="border border-black/20 rounded-xl p-3 bg-white">
//       {/* Header */}
//       <div className="flex items-start justify-between gap-2 mb-2">
//         <div className="flex items-start gap-2 min-w-0">
//           {item.image && (
//             <img
//               src={item.image}
//               alt={item.productName}
//               className="w-10 h-10 rounded object-cover border border-black/20 flex-shrink-0"
//               onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=?'; }}
//             />
//           )}
//           <div className="min-w-0">
//             <p className="text-xs font-semibold text-black truncate">{label}</p>
//             <p className="text-[10px] text-[#64748B]">
//               Returned: {returned} × ৳{item.unitPrice?.toFixed(2) || '0.00'}
//             </p>
//             {item.selectedColor && (
//               <div className="flex items-center gap-1 mt-0.5">
//                 <span
//                   className="inline-block w-3 h-3 rounded-full border border-gray-300"
//                   style={{ backgroundColor: item.selectedColor }}
//                 />
//                 <span className="text-[9px] text-gray-500">{item.selectedColor}</span>
//               </div>
//             )}
//           </div>
//         </div>
//         <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium flex-shrink-0 ${statusColor}`}>
//           {isFullyProcessed ? 'Processed' : `${pending} Pending`}
//         </span>
//       </div>

//       {/* Quantities Grid */}
//       <div className="grid grid-cols-3 gap-2 mb-2 text-center">
//         <div className="bg-gray-50 rounded-lg py-1.5 border border-gray-200">
//           <p className="text-[10px] text-gray-500">Returned</p>
//           <p className="text-sm font-bold text-black">{returned}</p>
//         </div>
//         <div className="bg-red-50 rounded-lg py-1.5 border border-red-200">
//           <p className="text-[10px] text-red-600">Damaged</p>
//           <p className="text-sm font-bold text-red-700">{damaged}</p>
//         </div>
//         <div className="bg-green-50 rounded-lg py-1.5 border border-green-200">
//           <p className="text-[10px] text-green-600">Restocked</p>
//           <p className="text-sm font-bold text-green-700">{restocked}</p>
//         </div>
//       </div>

//       {/* Pending action */}
//       {!isFullyProcessed && (
//         <div className="border-t border-gray-100 pt-2 mt-2">
//           <div className="grid grid-cols-2 gap-2 mb-2">
//             <div>
//               <label className="block text-[10px] font-medium text-red-700 mb-1">
//                 Mark Damaged
//               </label>
//               <div className="flex items-center border border-red-300 rounded-lg overflow-hidden bg-white">
//                 <button
//                   type="button"
//                   onClick={() => setDamageQty(Math.max(0, damageQty - 1))}
//                   className="w-6 h-6 flex items-center justify-center hover:bg-red-50"
//                 >
//                   <FaMinus className="w-2.5 h-2.5 text-red-700" />
//                 </button>
//                 <input
//                   type="number"
//                   min="0"
//                   max={pending}
//                   value={damageQty}
//                   onChange={(e) => setDamageQty(Math.max(0, Math.min(pending - restockQty, parseInt(e.target.value) || 0)))}
//                   className="w-full text-center text-xs py-0.5 focus:outline-none text-black"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setDamageQty(Math.min(pending - restockQty, damageQty + 1))}
//                   className="w-6 h-6 flex items-center justify-center hover:bg-red-50"
//                 >
//                   <FaPlus className="w-2.5 h-2.5 text-red-700" />
//                 </button>
//               </div>
//             </div>
//             <div>
//               <label className="block text-[10px] font-medium text-green-700 mb-1">
//                 Restock
//               </label>
//               <div className="flex items-center border border-green-300 rounded-lg overflow-hidden bg-white">
//                 <button
//                   type="button"
//                   onClick={() => setRestockQty(Math.max(0, restockQty - 1))}
//                   className="w-6 h-6 flex items-center justify-center hover:bg-green-50"
//                 >
//                   <FaMinus className="w-2.5 h-2.5 text-green-700" />
//                 </button>
//                 <input
//                   type="number"
//                   min="0"
//                   max={pending}
//                   value={restockQty}
//                   onChange={(e) => setRestockQty(Math.max(0, Math.min(pending - damageQty, parseInt(e.target.value) || 0)))}
//                   className="w-full text-center text-xs py-0.5 focus:outline-none text-black"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setRestockQty(Math.min(pending - damageQty, restockQty + 1))}
//                   className="w-6 h-6 flex items-center justify-center hover:bg-green-50"
//                 >
//                   <FaPlus className="w-2.5 h-2.5 text-green-700" />
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="mb-2">
//             <input
//               type="text"
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               placeholder="Optional note..."
//               className="w-full px-2 py-1 text-xs border border-black/30 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black"
//             />
//           </div>

//           <div className="flex gap-2">
//             <button
//               type="button"
//               onClick={() => { setDamageQty(pending); setRestockQty(0); }}
//               className="flex-1 text-[10px] px-2 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
//             >
//               <FaBan className="inline w-2.5 h-2.5 mr-0.5" /> All Damaged
//             </button>
//             <button
//               type="button"
//               onClick={() => { setRestockQty(pending); setDamageQty(0); }}
//               className="flex-1 text-[10px] px-2 py-1 rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
//             >
//               <FaRecycle className="inline w-2.5 h-2.5 mr-0.5" /> All Restock
//             </button>
//           </div>

//           <button
//             type="button"
//             onClick={handleProcess}
//             disabled={processing || (damageQty === 0 && restockQty === 0)}
//             className="mt-2 w-full text-xs px-3 py-1.5 rounded-lg bg-black text-white hover:bg-[#485442] disabled:opacity-50 flex items-center justify-center gap-1.5"
//           >
//             {processing ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaCheckCircle className="w-3 h-3" />}
//             Confirm Processing
//           </button>
//         </div>
//       )}

//       {isFullyProcessed && item.note && (
//         <p className="text-[10px] text-[#64748B] italic mt-1">
//           Note: {item.note}
//         </p>
//       )}
//     </div>
//   );
// }

// // ========== VIEW MODAL ==========
// function ReturnedItemsModal({ isOpen, onClose, order, onRefresh }) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [processingId, setProcessingId] = useState(null);

//   useEffect(() => {
//     if (isOpen && order?._id) {
//       loadData();
//     }
//   }, [isOpen, order?._id]);

//   const loadData = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${order._id}/returned-items`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const json = await res.json();
//       if (json.success) {
//         setData(json.data);
//       } else {
//         toast.error(json.error || 'Failed to load returned items');
//       }
//     } catch (e) {
//       console.error(e);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleProcess = async (deliveryItemId, damagedQuantity, restockedQuantity, note) => {
//     setProcessingId(deliveryItemId);
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${order._id}/returned-items/process`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             deliveryItemId,
//             damagedQuantity,
//             restockedQuantity,
//             note,
//           }),
//         }
//       );
//       const json = await res.json();
//       if (json.success) {
//         toast.success(json.message || 'Processed');
//         await loadData();
//         onRefresh?.();
//       } else {
//         toast.error(json.error || 'Failed to process');
//       }
//     } catch (e) {
//       console.error(e);
//       toast.error('Network error');
//     } finally {
//       setProcessingId(null);
//     }
//   };

//   if (!isOpen) return null;

//   const summary = data?.summary;
//   const items = summary?.items || [];

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         className="relative bg-white rounded-2xl border border-black/30 shadow-2xl w-full max-w-3xl overflow-hidden"
//       >
//         {/* Header */}
//         <div className="p-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaUndo className="w-5 h-5" />
//               <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>
//                 Returned Items
//               </h2>
//             </div>
//             <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg">
//               <FaTimes className="w-4 h-4" />
//             </button>
//           </div>
//           <p className="text-xs text-white/80 mt-1">
//             Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}
//           </p>
//         </div>

//         {/* Summary bar */}
//         {summary && (
//           <div className="px-4 pt-3">
//             <div className="grid grid-cols-4 gap-2 text-center">
//               <div className="bg-gray-50 rounded-lg py-1.5 border border-gray-200">
//                 <p className="text-[10px] text-gray-500">Returned</p>
//                 <p className="text-sm font-bold text-black">{summary.totalReturned}</p>
//               </div>
//               <div className="bg-red-50 rounded-lg py-1.5 border border-red-200">
//                 <p className="text-[10px] text-red-600">Damaged</p>
//                 <p className="text-sm font-bold text-red-700">{summary.totalDamaged}</p>
//               </div>
//               <div className="bg-green-50 rounded-lg py-1.5 border border-green-200">
//                 <p className="text-[10px] text-green-600">Restocked</p>
//                 <p className="text-sm font-bold text-green-700">{summary.totalRestocked}</p>
//               </div>
//               <div className="bg-yellow-50 rounded-lg py-1.5 border border-yellow-200">
//                 <p className="text-[10px] text-yellow-600">Pending</p>
//                 <p className="text-sm font-bold text-yellow-700">{summary.totalPending}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Body */}
//         <div className="p-4 space-y-3 max-h-[55vh] overflow-y-auto">
//           {loading ? (
//             <div className="flex items-center justify-center py-10">
//               <FaSpinner className="w-5 h-5 animate-spin text-black" />
//               <span className="ml-2 text-sm text-gray-500">Loading...</span>
//             </div>
//           ) : items.length === 0 ? (
//             <div className="text-center py-10 text-sm text-gray-500">
//               No returned items in this order.
//             </div>
//           ) : (
//             items.map((item) => (
//               <ReturnedItemRow
//                 key={item.deliveryItemId}
//                 item={item}
//                 processing={processingId === item.deliveryItemId}
//                 onProcess={handleProcess}
//               />
//             ))
//           )}

//           <div className="text-[10px] text-[#64748B] bg-blue-50 p-2 rounded-lg border border-blue-200 flex items-start gap-1.5">
//             <FaInfoCircle className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
//             <span>
//               Only <strong>returned</strong> quantities are shown here.
//               Restocking adds the quantity back to the product / variant stock.
//               Damaged items are recorded but not added back to stock.
//             </span>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="p-4 border-t border-black/30 bg-[#E2E7EA]/20 flex justify-end">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 bg-black text-white rounded-xl hover:bg-[#485442] text-sm"
//           >
//             Close
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// // ========== MAIN PAGE ==========
// export default function ReturnedItemsPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [returnStatusFilter, setReturnStatusFilter] = useState('all'); // all | pending | processed
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   const fetchOrders = useCallback(async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const queryParams = new URLSearchParams({
//         page: currentPage,
//         limit: 20,
//       });
//       if (searchTerm) queryParams.append('search', searchTerm);
//       if (returnStatusFilter !== 'all') queryParams.append('returnStatus', returnStatusFilter);

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/returned-items/all?${queryParams}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const json = await res.json();
//       if (json.success) {
//         setOrders(json.data);
//         setTotalPages(json.pagination.pages);
//         setTotalOrders(json.pagination.total);
//       } else {
//         toast.error(json.error || 'Failed to fetch');
//       }
//     } catch (e) {
//       console.error(e);
//       toast.error('Network error');
//     } finally {
//       setLoading(false);
//     }
//   }, [currentPage, searchTerm, returnStatusFilter]);

//   useEffect(() => {
//     fetchOrders();
//   }, [fetchOrders]);

//   const handleRefresh = () => {
//     fetchOrders();
//   };

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString('en-BD', {
//       day: '2-digit',
//       month: 'short',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });

//   return (
//     <ProtectedRoute pageKey="returned_items">
//       <div className="min-h-screen bg-pink-100/20 pb-12 pt-6">
//         <div className="container mx-auto px-4 max-w-7xl">
//           {/* Header */}
//           <div className="flex items-center gap-3 mb-6">
//             <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
//               <FaUndo className="w-5 h-5 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: '"Playfair Display"' }}>
//                 Returned Items
//               </h1>
//               <p className="text-sm text-[#64748B] mt-0.5">
//                 Process returned / partially delivered items — mark as damaged or restock
//               </p>
//             </div>
//           </div>

//           {/* Filters */}
//           <div className="bg-white rounded-2xl border border-black/30 p-4 mb-6 shadow-sm">
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="flex-1 relative">
//                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-4 h-4" />
//                 <input
//                   type="text"
//                   placeholder="Search by Order ID, Customer, Phone, or Product..."
//                   value={searchTerm}
//                   onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
//                   className="w-full pl-10 pr-10 py-2 border border-black/30 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-black placeholder:text-[#64748B]"
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={() => { setSearchTerm(''); setCurrentPage(1); }}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#64748B] hover:text-black"
//                   >
//                     <FaTimes className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>

//               <select
//                 value={returnStatusFilter}
//                 onChange={(e) => { setReturnStatusFilter(e.target.value); setCurrentPage(1); }}
//                 className="px-4 py-2 border border-black/30 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-black text-sm"
//               >
//                 <option value="all">All Returned Orders</option>
//                 <option value="pending">Pending Processing</option>
//                 <option value="processed">Fully Processed</option>
//               </select>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="bg-white rounded-2xl border border-black/30 shadow-sm overflow-hidden">
//             <div className="w-full overflow-x-auto">
//               <table className="w-full min-w-[1000px]">
//                 <thead className="bg-[#E2E7EA]/50 border-b border-black/30">
//                   <tr>
//                     <th className="px-3 py-2 text-left text-xs font-semibold text-[#64748B]">Order ID</th>
//                     <th className="px-3 py-2 text-left text-xs font-semibold text-[#64748B]">Customer</th>
//                     <th className="px-3 py-2 text-left text-xs font-semibold text-[#64748B]">Phone</th>
//                     <th className="px-3 py-2 text-center text-xs font-semibold text-[#64748B]">Status</th>
//                     <th className="px-3 py-2 text-center text-xs font-semibold text-[#64748B]">Returned</th>
//                     <th className="px-3 py-2 text-center text-xs font-semibold text-red-600">Damaged</th>
//                     <th className="px-3 py-2 text-center text-xs font-semibold text-green-600">Restocked</th>
//                     <th className="px-3 py-2 text-center text-xs font-semibold text-yellow-600">Pending</th>
//                     <th className="px-3 py-2 text-left text-xs font-semibold text-[#64748B]">Date</th>
//                     <th className="px-3 py-2 text-center text-xs font-semibold text-[#64748B]">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td colSpan={10} className="px-4 py-8 text-center">
//                         <div className="flex justify-center">
//                           <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin" />
//                         </div>
//                       </td>
//                     </tr>
//                   ) : orders.length === 0 ? (
//                     <tr>
//                       <td colSpan={10} className="px-4 py-8 text-center text-[#64748B] text-sm">
//                         No returned orders found
//                       </td>
//                     </tr>
//                   ) : (
//                     orders.map((order) => (
//                       <tr key={order._id} className="border-b border-black/20 hover:bg-[#E2E7EA]/30 transition-colors">
//                         <td className="px-3 py-2 text-xs font-mono text-black whitespace-nowrap">
//                           {order.orderNumber || order._id.slice(-8).toUpperCase()}
//                         </td>
//                         <td className="px-3 py-2 text-xs">
//                           <div className="font-medium text-black">{order.customerInfo?.fullName}</div>
//                         </td>
//                         <td className="px-3 py-2 text-xs text-black whitespace-nowrap">
//                           {order.customerInfo?.phone}
//                         </td>
//                         <td className="px-3 py-2 text-center">
//                           <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border font-medium ${getOrderStatusBadge(order.orderStatus)}`}>
//                             {order.orderStatus === 'partial_delivery' ? <FaBox className="w-2.5 h-2.5" /> : <FaUndo className="w-2.5 h-2.5" />}
//                             {ORDER_STATUS_LABEL[order.orderStatus] || order.orderStatus}
//                           </span>
//                         </td>
//                         <td className="px-3 py-2 text-center text-xs font-bold text-black">
//                           {order.returnSummary?.totalReturned || 0}
//                         </td>
//                         <td className="px-3 py-2 text-center text-xs font-bold text-red-600">
//                           {order.returnSummary?.totalDamaged || 0}
//                         </td>
//                         <td className="px-3 py-2 text-center text-xs font-bold text-green-600">
//                           {order.returnSummary?.totalRestocked || 0}
//                         </td>
//                         <td className="px-3 py-2 text-center text-xs font-bold text-yellow-600">
//                           {order.returnSummary?.totalPending || 0}
//                         </td>
//                         <td className="px-3 py-2 text-xs text-[#64748B] whitespace-nowrap">
//                           {formatDate(order.updatedAt || order.createdAt)}
//                         </td>
//                         <td className="px-3 py-2 text-center">
//                           <button
//                             onClick={() => { setSelectedOrder(order); setShowModal(true); }}
//                             className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-black text-white rounded-lg hover:bg-[#485442] transition-colors"
//                             title="View Returned Items"
//                           >
//                             <FaEye className="w-3 h-3" />
//                             View
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="px-3 py-2 border-t border-black/30 flex flex-wrap items-center justify-between gap-3 bg-[#E2E7EA]/20">
//                 <p className="text-xs text-[#64748B]">
//                   Showing {orders.length} of {totalOrders} orders
//                 </p>
//                 <div className="flex gap-1">
//                   <button
//                     onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                     disabled={currentPage === 1}
//                     className="p-1.5 border border-black/30 rounded-xl hover:bg-white disabled:opacity-50 transition text-black"
//                   >
//                     <FaChevronLeft className="w-3 h-3" />
//                   </button>
//                   <span className="px-2 py-1 text-xs text-black">
//                     Page {currentPage} of {totalPages}
//                   </span>
//                   <button
//                     onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//                     disabled={currentPage === totalPages}
//                     className="p-1.5 border border-black/30 rounded-xl hover:bg-white disabled:opacity-50 transition text-black"
//                   >
//                     <FaChevronRight className="w-3 h-3" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       <ReturnedItemsModal
//         isOpen={showModal}
//         onClose={() => setShowModal(false)}
//         order={selectedOrder}
//         onRefresh={handleRefresh}
//       />
//     </ProtectedRoute>
//   );
// }

'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  FaSearch, FaEye, FaSpinner, FaTimes, FaChevronLeft, FaChevronRight,
  FaBox, FaUndo, FaBan, FaCheckCircle, FaMoneyBillWave, FaTruck,
  FaInfoCircle, FaClipboardList, FaPlus, FaMinus, FaRecycle, FaTrashAlt
} from 'react-icons/fa';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import PartialDeliveryModal from '@/app/components/PartialDeliveryModal';

// ========== STATUS DISPLAY HELPERS ==========
const ORDER_STATUS_LABEL = {
  'partial_delivery': 'Partial Delivery',
  'returned': 'Returned',
};

const getOrderStatusBadge = (status) => {
  if (status === 'partial_delivery') {
    return 'bg-yellow-100 text-yellow-800 border-yellow-300';
  }
  if (status === 'returned') {
    return 'bg-purple-100 text-purple-800 border-purple-300';
  }
  return 'bg-gray-100 text-gray-700 border-gray-300';
};

// ========== PROCESS ROW ==========
function ReturnedItemRow({ item, onProcess, processing }) {
  const returned = item.returnedQuantity || 0;
  const damaged = item.damagedQuantity || 0;
  const restocked = item.restockedQuantity || 0;
  const pending = item.pendingQuantity || 0;

  const [damageQty, setDamageQty] = useState(0);
  const [restockQty, setRestockQty] = useState(0);
  const [note, setNote] = useState(item.note || '');

  const label = [item.productName, item.variantName, item.subVariantName]
    .filter(Boolean).join(' / ');

  const isFullyProcessed = pending === 0;

  const handleProcess = () => {
    const d = Math.max(0, parseInt(damageQty) || 0);
    const r = Math.max(0, parseInt(restockQty) || 0);

    if (d === 0 && r === 0) {
      toast.error('Enter at least one damaged or restocked quantity');
      return;
    }
    if (d + r > pending) {
      toast.error(`Total (${d + r}) exceeds pending quantity (${pending})`);
      return;
    }

    onProcess(item.deliveryItemId, d, r, note);
    setDamageQty(0);
    setRestockQty(0);
  };

  const statusColor = isFullyProcessed
    ? 'bg-green-100 text-green-700 border-green-300'
    : 'bg-yellow-100 text-yellow-700 border-yellow-300';

  return (
    <div className="border border-black/20 rounded-xl p-3 bg-white">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start gap-2 min-w-0">
          {item.image && (
            <img
              src={item.image}
              alt={item.productName}
              className="w-10 h-10 rounded object-cover border border-black/20 flex-shrink-0"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=?'; }}
            />
          )}
          <div className="min-w-0">
            <p className="text-xs font-semibold text-black truncate">{label}</p>
            <p className="text-[10px] text-[#64748B]">
              Returned: {returned} × ৳{item.unitPrice?.toFixed(2) || '0.00'}
            </p>
            {item.selectedColor && (
              <div className="flex items-center gap-1 mt-0.5">
                <span
                  className="inline-block w-3 h-3 rounded-full border border-gray-300"
                  style={{ backgroundColor: item.selectedColor }}
                />
                <span className="text-[9px] text-gray-500">{item.selectedColor}</span>
              </div>
            )}
          </div>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium flex-shrink-0 ${statusColor}`}>
          {isFullyProcessed ? 'Processed' : `${pending} Pending`}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-2 text-center">
        <div className="bg-gray-50 rounded-lg py-1.5 border border-gray-200">
          <p className="text-[10px] text-gray-500">Returned</p>
          <p className="text-sm font-bold text-black">{returned}</p>
        </div>
        <div className="bg-red-50 rounded-lg py-1.5 border border-red-200">
          <p className="text-[10px] text-red-600">Damaged</p>
          <p className="text-sm font-bold text-red-700">{damaged}</p>
        </div>
        <div className="bg-green-50 rounded-lg py-1.5 border border-green-200">
          <p className="text-[10px] text-green-600">Restocked</p>
          <p className="text-sm font-bold text-green-700">{restocked}</p>
        </div>
      </div>

      {!isFullyProcessed && (
        <div className="border-t border-gray-100 pt-2 mt-2">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <label className="block text-[10px] font-medium text-red-700 mb-1">
                Mark Damaged
              </label>
              <div className="flex items-center border border-red-300 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setDamageQty(Math.max(0, damageQty - 1))}
                  className="w-6 h-6 flex items-center justify-center hover:bg-red-50"
                >
                  <FaMinus className="w-2.5 h-2.5 text-red-700" />
                </button>
                <input
                  type="number"
                  min="0"
                  max={pending}
                  value={damageQty}
                  onChange={(e) => setDamageQty(Math.max(0, Math.min(pending - restockQty, parseInt(e.target.value) || 0)))}
                  className="w-full text-center text-xs py-0.5 focus:outline-none text-black"
                />
                <button
                  type="button"
                  onClick={() => setDamageQty(Math.min(pending - restockQty, damageQty + 1))}
                  className="w-6 h-6 flex items-center justify-center hover:bg-red-50"
                >
                  <FaPlus className="w-2.5 h-2.5 text-red-700" />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-medium text-green-700 mb-1">
                Restock
              </label>
              <div className="flex items-center border border-green-300 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setRestockQty(Math.max(0, restockQty - 1))}
                  className="w-6 h-6 flex items-center justify-center hover:bg-green-50"
                >
                  <FaMinus className="w-2.5 h-2.5 text-green-700" />
                </button>
                <input
                  type="number"
                  min="0"
                  max={pending}
                  value={restockQty}
                  onChange={(e) => setRestockQty(Math.max(0, Math.min(pending - damageQty, parseInt(e.target.value) || 0)))}
                  className="w-full text-center text-xs py-0.5 focus:outline-none text-black"
                />
                <button
                  type="button"
                  onClick={() => setRestockQty(Math.min(pending - damageQty, restockQty + 1))}
                  className="w-6 h-6 flex items-center justify-center hover:bg-green-50"
                >
                  <FaPlus className="w-2.5 h-2.5 text-green-700" />
                </button>
              </div>
            </div>
          </div>

          <div className="mb-2">
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional note..."
              className="w-full px-2 py-1 text-xs border border-black/30 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => { setDamageQty(pending); setRestockQty(0); }}
              className="flex-1 text-[10px] px-2 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
            >
              <FaBan className="inline w-2.5 h-2.5 mr-0.5" /> All Damaged
            </button>
            <button
              type="button"
              onClick={() => { setRestockQty(pending); setDamageQty(0); }}
              className="flex-1 text-[10px] px-2 py-1 rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100"
            >
              <FaRecycle className="inline w-2.5 h-2.5 mr-0.5" /> All Restock
            </button>
          </div>

          <button
            type="button"
            onClick={handleProcess}
            disabled={processing || (damageQty === 0 && restockQty === 0)}
            className="mt-2 w-full text-xs px-3 py-1.5 rounded-lg bg-black text-white hover:bg-[#485442] disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            {processing ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaCheckCircle className="w-3 h-3" />}
            Confirm Processing
          </button>
        </div>
      )}

      {isFullyProcessed && item.note && (
        <p className="text-[10px] text-[#64748B] italic mt-1">
          Note: {item.note}
        </p>
      )}
    </div>
  );
}

// ========== VIEW MODAL ==========
function ReturnedItemsModal({ isOpen, onClose, order, onRefresh }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (isOpen && order?._id) {
      loadData();
    }
  }, [isOpen, order?._id]);

  const loadData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${order._id}/returned-items`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      } else {
        toast.error(json.error || 'Failed to load returned items');
      }
    } catch (e) {
      console.error(e);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleProcess = async (deliveryItemId, damagedQuantity, restockedQuantity, note) => {
    setProcessingId(deliveryItemId);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${order._id}/returned-items/process`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            deliveryItemId,
            damagedQuantity,
            restockedQuantity,
            note,
          }),
        }
      );
      const json = await res.json();
      if (json.success) {
        toast.success(json.message || 'Processed');
        await loadData();
        onRefresh?.();
      } else {
        toast.error(json.error || 'Failed to process');
      }
    } catch (e) {
      console.error(e);
      toast.error('Network error');
    } finally {
      setProcessingId(null);
    }
  };

  if (!isOpen) return null;

  const summary = data?.summary;
  const items = summary?.items || [];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl border border-black/30 shadow-2xl w-full max-w-3xl overflow-hidden"
      >
        <div className="p-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaUndo className="w-5 h-5" />
              <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>
                Returned Items
              </h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">
            Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}
          </p>
        </div>

        {summary && (
          <div className="px-4 pt-3">
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-gray-50 rounded-lg py-1.5 border border-gray-200">
                <p className="text-[10px] text-gray-500">Returned</p>
                <p className="text-sm font-bold text-black">{summary.totalReturned}</p>
              </div>
              <div className="bg-red-50 rounded-lg py-1.5 border border-red-200">
                <p className="text-[10px] text-red-600">Damaged</p>
                <p className="text-sm font-bold text-red-700">{summary.totalDamaged}</p>
              </div>
              <div className="bg-green-50 rounded-lg py-1.5 border border-green-200">
                <p className="text-[10px] text-green-600">Restocked</p>
                <p className="text-sm font-bold text-green-700">{summary.totalRestocked}</p>
              </div>
              <div className="bg-yellow-50 rounded-lg py-1.5 border border-yellow-200">
                <p className="text-[10px] text-yellow-600">Pending</p>
                <p className="text-sm font-bold text-yellow-700">{summary.totalPending}</p>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 space-y-3 max-h-[55vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <FaSpinner className="w-5 h-5 animate-spin text-black" />
              <span className="ml-2 text-sm text-gray-500">Loading...</span>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-10 text-sm text-gray-500">
              No returned items in this order.
            </div>
          ) : (
            items.map((item) => (
              <ReturnedItemRow
                key={item.deliveryItemId}
                item={item}
                processing={processingId === item.deliveryItemId}
                onProcess={handleProcess}
              />
            ))
          )}

          <div className="text-[10px] text-[#64748B] bg-blue-50 p-2 rounded-lg border border-blue-200 flex items-start gap-1.5">
            <FaInfoCircle className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>
              Only <strong>returned</strong> quantities are shown here.
              Restocking adds the quantity back to the product / variant stock.
              Damaged items are recorded but not added back to stock.
            </span>
          </div>
        </div>

        <div className="p-4 border-t border-black/30 bg-[#E2E7EA]/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-[#485442] text-sm"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================
// ✅ ADD RETURNED ORDER MODAL
// ============================================================
function AddReturnedOrderModal({ isOpen, onClose, onAdded, existingOrderIds = [] }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [chosenStatus, setChosenStatus] = useState('returned');
  const [submitting, setSubmitting] = useState(false);

  const existingSet = new Set((existingOrderIds || []).map((id) => id?.toString()));

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSelectedOrder(null);
      setChosenStatus('returned');
      setSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const term = query.trim();
    if (!term) {
      setResults([]);
      return;
    }
    const timer = setTimeout(() => {
      searchOrders(term);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, isOpen]);

  const searchOrders = async (term) => {
    setSearching(true);
    try {
      const token = localStorage.getItem('token');
      const qp = new URLSearchParams({ page: 1, limit: 15, search: term });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/admin/all?${qp}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const json = await res.json();
      if (json.success) {
        setResults(json.data || []);
      } else {
        setResults([]);
        toast.error(json.error || 'Search failed');
      }
    } catch (e) {
      console.error(e);
      toast.error('Network error');
      setResults([]);
    } finally {
      setSearching(false);
    }
  };

  const handleAdd = async () => {
    if (!selectedOrder) {
      toast.error('Please select an order first');
      return;
    }

    if (existingSet.has(selectedOrder._id?.toString())) {
      toast.error('This order is already in the Returned Items list');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');

      // Partial delivery → hand off to parent's PartialDeliveryModal
      if (chosenStatus === 'partial_delivery') {
        onClose();
        onAdded(selectedOrder, 'partial_delivery', { overrideStatus: true });
        setSubmitting(false);
        return;
      }

      // Returned → call update-return-status WITH override flag
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${selectedOrder._id}/return-status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            orderStatus: 'returned',
            overrideStatus: true,   // ✅ unlock any-status conversion
          }),
        }
      );
      const json = await res.json();
      if (json.success) {
        toast.success('Order added as Returned');
        onClose();
        onAdded(selectedOrder, 'returned', { overrideStatus: true });
      } else {
        toast.error(json.error || 'Failed to add order');
      }
    } catch (e) {
      console.error(e);
      toast.error('Network error');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const statusColors = {
    'placed': 'bg-gray-100 text-gray-700 border-gray-300',
    'follow_up': 'bg-blue-50 text-blue-700 border-blue-200',
    'accepted': 'bg-blue-100 text-blue-700 border-blue-300',
    'approved': 'bg-green-50 text-green-700 border-green-200',
    'processing': 'bg-yellow-50 text-yellow-700 border-yellow-200',
    'courier_assigned': 'bg-purple-50 text-purple-700 border-purple-200',
    'ready_to_ship': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'delivered': 'bg-green-100 text-green-700 border-green-300',
    'cancelled': 'bg-red-50 text-red-700 border-red-200',
    'returned': 'bg-purple-100 text-purple-700 border-purple-300',
    'partial_delivery': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl border border-black/30 shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        <div className="p-4 bg-gradient-to-r from-black to-[#485442] text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaUndo className="w-5 h-5" />
              <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>
                Add Returned Order
              </h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">
            Search by Order ID, customer name, or phone — any status allowed
          </p>
        </div>

        <div className="p-4 pb-2">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] w-4 h-4" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. NC1001, or customer name..."
              className="w-full pl-10 pr-10 py-2.5 text-sm border border-black/30 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black placeholder:text-[#64748B]"
              autoFocus
            />
            {searching && (
              <FaSpinner className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-black" />
            )}
            {!searching && query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-black"
              >
                <FaTimes className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="px-4 pb-2 max-h-[40vh] overflow-y-auto">
          {!query.trim() ? (
            <div className="text-center py-8 text-xs text-[#64748B]">
              Start typing an Order ID or customer name to search...
            </div>
          ) : searching ? (
            <div className="text-center py-8 text-xs text-[#64748B]">
              Searching...
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#64748B]">
              No orders found matching "{query}"
            </div>
          ) : (
            <div className="space-y-2">
              {results.map((order) => {
                const alreadyExists = existingSet.has(order._id?.toString());
                const isSelected = !alreadyExists && selectedOrder?._id === order._id;

                return (
                  <div
                    key={order._id}
                    onClick={() => {
                      if (alreadyExists) {
                        toast.error('This order is already in the Returned Items list');
                        return;
                      }
                      setSelectedOrder(order);
                    }}
                    className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                      alreadyExists
                        ? 'border-gray-200 bg-gray-50 opacity-70 cursor-not-allowed'
                        : isSelected
                        ? 'border-black bg-black/5 shadow-sm cursor-pointer'
                        : 'border-black/20 hover:border-black/50 hover:bg-[#E2E7EA]/30 cursor-pointer'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-mono font-semibold ${
                          alreadyExists ? 'text-gray-500 line-through' : 'text-black'
                        }`}>
                          {order.orderNumber || order._id?.slice(-8).toUpperCase()}
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-medium ${
                          statusColors[order.orderStatus] || 'bg-gray-100 text-gray-700 border-gray-300'
                        }`}>
                          {order.orderStatus}
                        </span>
                        {alreadyExists && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full border font-semibold bg-red-50 text-red-600 border-red-200 flex items-center gap-1">
                            <FaInfoCircle className="w-2.5 h-2.5" />
                            Already Exists
                          </span>
                        )}
                      </div>
                      <p className={`text-[11px] mt-1 truncate ${
                        alreadyExists ? 'text-gray-400' : 'text-black'
                      }`}>
                        {order.customerInfo?.fullName} · {order.customerInfo?.phone}
                      </p>
                      <p className={`text-[10px] ${
                        alreadyExists ? 'text-gray-400' : 'text-[#64748B]'
                      }`}>
                        Total: ৳{order.total?.toFixed(2)} · {order.items?.length || 0} items
                      </p>
                    </div>
                    {alreadyExists ? (
                      <FaBan className="w-4 h-4 text-red-400 flex-shrink-0" />
                    ) : isSelected ? (
                      <FaCheckCircle className="w-4 h-4 text-black flex-shrink-0" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {selectedOrder && (
          <div className="px-4 pb-3 pt-2 border-t border-black/10">
            <p className="text-[11px] font-medium text-black mb-2">
              Add this order as:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setChosenStatus('returned')}
                className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                  chosenStatus === 'returned'
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/40'
                }`}
              >
                <FaUndo className={`w-4 h-4 ${chosenStatus === 'returned' ? 'text-purple-600' : 'text-gray-400'}`} />
                <div className="text-left">
                  <p className={`text-xs font-semibold ${chosenStatus === 'returned' ? 'text-purple-700' : 'text-gray-600'}`}>
                    Returned
                  </p>
                  <p className="text-[9px] text-[#64748B]">Full order return</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setChosenStatus('partial_delivery')}
                className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                  chosenStatus === 'partial_delivery'
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 hover:border-yellow-300 hover:bg-yellow-50/40'
                }`}
              >
                <FaBox className={`w-4 h-4 ${chosenStatus === 'partial_delivery' ? 'text-yellow-600' : 'text-gray-400'}`} />
                <div className="text-left">
                  <p className={`text-xs font-semibold ${chosenStatus === 'partial_delivery' ? 'text-yellow-700' : 'text-gray-600'}`}>
                    Partial Delivery
                  </p>
                  <p className="text-[9px] text-[#64748B]">Choose per-item</p>
                </div>
              </button>
            </div>

            {chosenStatus === 'partial_delivery' && (
              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-[10px] text-blue-700 flex items-start gap-1.5">
                  <FaInfoCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  <span>
                    You'll be taken to the Partial Delivery editor to mark each product/variant as delivered or returned.
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        <div className="p-4 border-t border-black/30 bg-[#E2E7EA]/20 flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-black/30 text-[#64748B] rounded-xl hover:bg-white text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            disabled={!selectedOrder || submitting}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-[#485442] disabled:opacity-50 text-sm flex items-center justify-center gap-2 min-w-[140px]"
          >
            {submitting ? (
              <FaSpinner className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <FaPlus className="w-3.5 h-3.5" />
            )}
            {chosenStatus === 'partial_delivery' ? 'Continue' : 'Add as Returned'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ========== MAIN PAGE ==========
export default function ReturnedItemsPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [returnStatusFilter, setReturnStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showPartialDeliveryModal, setShowPartialDeliveryModal] = useState(false);
  const [partialDeliveryOverride, setPartialDeliveryOverride] = useState(false);

  const [allExistingIds, setAllExistingIds] = useState([]);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 20,
      });
      if (searchTerm) queryParams.append('search', searchTerm);
      if (returnStatusFilter !== 'all') queryParams.append('returnStatus', returnStatusFilter);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/returned-items/all?${queryParams}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const json = await res.json();
      if (json.success) {
        setOrders(json.data);
        setTotalPages(json.pagination.pages);
        setTotalOrders(json.pagination.total);
      } else {
        toast.error(json.error || 'Failed to fetch');
      }
    } catch (e) {
      console.error(e);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, returnStatusFilter]);

  const fetchAllExistingIds = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/returned-items/all?page=1&limit=1000`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const json = await res.json();
      if (json.success) {
        setAllExistingIds(json.data.map((o) => o._id));
      }
    } catch (e) {
      console.error('fetchAllExistingIds error:', e);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    fetchAllExistingIds();
  }, [fetchAllExistingIds]);

  const handleRefresh = () => {
    fetchOrders();
    fetchAllExistingIds();
  };

  // ✅ Handle when an order was added from the modal
  const handleOrderAdded = (order, chosenStatus, opts = {}) => {
    if (chosenStatus === 'partial_delivery') {
      setSelectedOrder(order);
      setPartialDeliveryOverride(opts.overrideStatus === true);
      setShowPartialDeliveryModal(true);
    } else {
      fetchOrders();
      fetchAllExistingIds();
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-BD', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <ProtectedRoute pageKey="returned_items">
      <div className="min-h-screen bg-pink-100/20 pb-12 pt-6">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <FaUndo className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-black" style={{ fontFamily: '"Playfair Display"' }}>
                  Returned Items
                </h1>
                <p className="text-sm text-[#64748B] mt-0.5">
                  Process returned / partially delivered items — mark as damaged or restock
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all text-sm font-medium shadow-sm"
            >
              <FaPlus className="w-4 h-4" />
              Add Returned Order
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-black/30 p-4 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by Order ID, Customer, Phone, or Product..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-10 pr-10 py-2 border border-black/30 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-black placeholder:text-[#64748B]"
                />
                {searchTerm && (
                  <button
                    onClick={() => { setSearchTerm(''); setCurrentPage(1); }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#64748B] hover:text-black"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </div>

              <select
                value={returnStatusFilter}
                onChange={(e) => { setReturnStatusFilter(e.target.value); setCurrentPage(1); }}
                className="px-4 py-2 border border-black/30 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-black text-sm"
              >
                <option value="all">All Returned Orders</option>
                <option value="pending">Pending Processing</option>
                <option value="processed">Fully Processed</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-black/30 shadow-sm overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead className="bg-[#E2E7EA]/50 border-b border-black/30">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-[#64748B]">Order ID</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-[#64748B]">Customer</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-[#64748B]">Phone</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-[#64748B]">Status</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-[#64748B]">Returned</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-red-600">Damaged</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-green-600">Restocked</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-yellow-600">Pending</th>
                    <th className="px-3 py-2 text-left text-xs font-semibold text-[#64748B]">Date</th>
                    <th className="px-3 py-2 text-center text-xs font-semibold text-[#64748B]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={10} className="px-4 py-8 text-center">
                        <div className="flex justify-center">
                          <div className="w-6 h-6 border-3 border-black border-t-transparent rounded-full animate-spin" />
                        </div>
                      </td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="px-4 py-8 text-center text-[#64748B] text-sm">
                        No returned orders found
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order._id} className="border-b border-black/20 hover:bg-[#E2E7EA]/30 transition-colors">
                        <td className="px-3 py-2 text-xs font-mono text-black whitespace-nowrap">
                          {order.orderNumber || order._id.slice(-8).toUpperCase()}
                        </td>
                        <td className="px-3 py-2 text-xs">
                          <div className="font-medium text-black">{order.customerInfo?.fullName}</div>
                        </td>
                        <td className="px-3 py-2 text-xs text-black whitespace-nowrap">
                          {order.customerInfo?.phone}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border font-medium ${getOrderStatusBadge(order.orderStatus)}`}>
                            {order.orderStatus === 'partial_delivery' ? <FaBox className="w-2.5 h-2.5" /> : <FaUndo className="w-2.5 h-2.5" />}
                            {ORDER_STATUS_LABEL[order.orderStatus] || order.orderStatus}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-center text-xs font-bold text-black">
                          {order.returnSummary?.totalReturned || 0}
                        </td>
                        <td className="px-3 py-2 text-center text-xs font-bold text-red-600">
                          {order.returnSummary?.totalDamaged || 0}
                        </td>
                        <td className="px-3 py-2 text-center text-xs font-bold text-green-600">
                          {order.returnSummary?.totalRestocked || 0}
                        </td>
                        <td className="px-3 py-2 text-center text-xs font-bold text-yellow-600">
                          {order.returnSummary?.totalPending || 0}
                        </td>
                        <td className="px-3 py-2 text-xs text-[#64748B] whitespace-nowrap">
                          {formatDate(order.updatedAt || order.createdAt)}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <button
                            onClick={() => { setSelectedOrder(order); setShowModal(true); }}
                            className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-black text-white rounded-lg hover:bg-[#485442] transition-colors"
                            title="View Returned Items"
                          >
                            <FaEye className="w-3 h-3" />
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="px-3 py-2 border-t border-black/30 flex flex-wrap items-center justify-between gap-3 bg-[#E2E7EA]/20">
                <p className="text-xs text-[#64748B]">
                  Showing {orders.length} of {totalOrders} orders
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 border border-black/30 rounded-xl hover:bg-white disabled:opacity-50 transition text-black"
                  >
                    <FaChevronLeft className="w-3 h-3" />
                  </button>
                  <span className="px-2 py-1 text-xs text-black">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 border border-black/30 rounded-xl hover:bg-white disabled:opacity-50 transition text-black"
                  >
                    <FaChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Modal */}
      <ReturnedItemsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        order={selectedOrder}
        onRefresh={handleRefresh}
      />

      {/* Add Returned Order Modal */}
      <AddReturnedOrderModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdded={handleOrderAdded}
        existingOrderIds={allExistingIds}
      />

      {/* Partial Delivery Modal (reused) */}
      <PartialDeliveryModal
        isOpen={showPartialDeliveryModal}
        onClose={() => {
          setShowPartialDeliveryModal(false);
          setSelectedOrder(null);
          setPartialDeliveryOverride(false);
        }}
        order={selectedOrder}
        overrideStatus={partialDeliveryOverride}
        onSaved={() => {
          setShowPartialDeliveryModal(false);
          setSelectedOrder(null);
          setPartialDeliveryOverride(false);
          fetchOrders();
          fetchAllExistingIds();
        }}
      />
    </ProtectedRoute>
  );
}