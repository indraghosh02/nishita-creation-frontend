
// 'use client';

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { toast } from 'sonner';
// import {
//   FaTruck, FaTimes, FaSpinner, FaCheckCircle, FaUndo,
//   FaClock, FaPlus, FaMinus, FaInfoCircle, FaSave, FaMoneyBillWave
// } from 'react-icons/fa';

// // ========== Row component ==========
// function DeliveryItemRow({ item, onChange }) {
//   const total = item.orderedQuantity || 0;
//   const delivered = item.deliveredQuantity || 0;
//   const returned = item.returnedQuantity || 0;
//   const pending = total - delivered - returned;
//   const unitPrice = item.unitPrice || 0;

//   const label = [item.productName, item.variantName, item.subVariantName]
//     .filter(Boolean)
//     .join(' / ');

//   const setDelivered = (val) => {
//     const d = Math.max(0, Math.min(total, val));
//     const r = returned;
//     const p = total - d - r;
//     onChange({ deliveredQuantity: d, returnedQuantity: r, pendingQuantity: p });
//   };

//   const setReturned = (val) => {
//     const r = Math.max(0, Math.min(total, val));
//     const d = delivered;
//     const p = total - d - r;
//     onChange({ deliveredQuantity: d, returnedQuantity: r, pendingQuantity: p });
//   };

//   const markAllDelivered = () =>
//     onChange({ deliveredQuantity: total, returnedQuantity: 0, pendingQuantity: 0 });
//   const markAllReturned = () =>
//     onChange({ deliveredQuantity: 0, returnedQuantity: total, pendingQuantity: 0 });
//   const markAllPending = () =>
//     onChange({ deliveredQuantity: 0, returnedQuantity: 0, pendingQuantity: total });

//   const statusColor =
//     delivered === total ? 'bg-green-100 text-green-700 border-green-300'
//     : returned === total ? 'bg-purple-100 text-purple-700 border-purple-300'
//     : pending === total ? 'bg-gray-100 text-gray-600 border-gray-300'
//     : 'bg-yellow-100 text-yellow-700 border-yellow-300';

//   const statusLabel =
//     delivered === total ? 'Delivered'
//     : returned === total ? 'Returned'
//     : pending === total ? 'Pending'
//     : 'Partial';

//   const rowDeliveredAmount = delivered * unitPrice;
//   const rowReturnedAmount = returned * unitPrice;

//   return (
//     <div className="border border-black/20 rounded-xl p-3 bg-white">
//       <div className="flex items-start justify-between gap-2 mb-2">
//         <div className="flex items-start gap-2 min-w-0">
//           {item.image && (
//             <img
//               src={item.image}
//               alt={item.productName}
//               className="w-9 h-9 rounded object-cover border border-black/20 flex-shrink-0"
//               onError={(e) => { e.target.src = 'https://via.placeholder.com/36?text=?'; }}
//             />
//           )}
//           <div className="min-w-0">
//             <p className="text-xs font-semibold text-black truncate">{label}</p>
//             <p className="text-[10px] text-[#64748B]">
//               Ordered: {total} × ৳{unitPrice.toFixed(2)} = ৳{(total * unitPrice).toFixed(2)}
//             </p>
//           </div>
//         </div>
//         <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${statusColor} flex-shrink-0`}>
//           {statusLabel}
//         </span>
//       </div>

//       <div className="flex flex-wrap gap-1 mb-2">
//         <button type="button" onClick={markAllDelivered} className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 hover:bg-green-100">
//           <FaCheckCircle className="inline w-2.5 h-2.5 mr-0.5" /> All Delivered
//         </button>
//         <button type="button" onClick={markAllReturned} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100">
//           <FaUndo className="inline w-2.5 h-2.5 mr-0.5" /> All Returned
//         </button>
//         <button type="button" onClick={markAllPending} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100">
//           <FaClock className="inline w-2.5 h-2.5 mr-0.5" /> All Pending
//         </button>
//       </div>

//       <div className="grid grid-cols-3 gap-2">
//         <div>
//           <label className="block text-[10px] font-medium text-green-700 mb-1">Delivered</label>
//           <div className="flex items-center border border-green-300 rounded-lg overflow-hidden bg-white">
//             <button type="button" onClick={() => setDelivered(delivered - 1)} disabled={delivered <= 0} className="w-6 h-6 flex items-center justify-center hover:bg-green-50 disabled:opacity-40">
//               <FaMinus className="w-2.5 h-2.5 text-green-700" />
//             </button>
//             <input
//               type="number" min="0" max={total} value={delivered}
//               onChange={(e) => setDelivered(parseInt(e.target.value) || 0)}
//               className="w-full text-center text-xs py-0.5 focus:outline-none text-black"
//             />
//             <button type="button" onClick={() => setDelivered(delivered + 1)} disabled={delivered + returned >= total} className="w-6 h-6 flex items-center justify-center hover:bg-green-50 disabled:opacity-40">
//               <FaPlus className="w-2.5 h-2.5 text-green-700" />
//             </button>
//           </div>
//         </div>

//         <div>
//           <label className="block text-[10px] font-medium text-purple-700 mb-1">Returned</label>
//           <div className="flex items-center border border-purple-300 rounded-lg overflow-hidden bg-white">
//             <button type="button" onClick={() => setReturned(returned - 1)} disabled={returned <= 0} className="w-6 h-6 flex items-center justify-center hover:bg-purple-50 disabled:opacity-40">
//               <FaMinus className="w-2.5 h-2.5 text-purple-700" />
//             </button>
//             <input
//               type="number" min="0" max={total} value={returned}
//               onChange={(e) => setReturned(parseInt(e.target.value) || 0)}
//               className="w-full text-center text-xs py-0.5 focus:outline-none text-black"
//             />
//             <button type="button" onClick={() => setReturned(returned + 1)} disabled={delivered + returned >= total} className="w-6 h-6 flex items-center justify-center hover:bg-purple-50 disabled:opacity-40">
//               <FaPlus className="w-2.5 h-2.5 text-purple-700" />
//             </button>
//           </div>
//         </div>

//         <div>
//           <label className="block text-[10px] font-medium text-gray-500 mb-1">Pending</label>
//           <div className="flex items-center justify-center border border-gray-300 rounded-lg bg-gray-50 h-[26px]">
//             <span className="text-xs font-medium text-gray-600">{pending}</span>
//           </div>
//         </div>
//       </div>

//       {/* Row amounts */}
//       <div className="mt-2 pt-2 border-t border-gray-100 flex flex-wrap gap-2 text-[10px]">
//         {rowDeliveredAmount > 0 && (
//           <span className="text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
//             Collect: ৳{rowDeliveredAmount.toFixed(2)}
//           </span>
//         )}
//         {rowReturnedAmount > 0 && (
//           <span className="text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
//             Returned: ৳{rowReturnedAmount.toFixed(2)}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }

// // ========== Main Modal ==========
// export default function PartialDeliveryModal({ isOpen, onClose, order, onSaved }) {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [note, setNote] = useState('');

//   useEffect(() => {
//     if (isOpen && order?._id) {
//       loadItems();
//     }
//   }, [isOpen, order?._id]);

//   const loadItems = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${order._id}/partial-delivery-items`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const data = await res.json();
//       if (data.success) {
//         setItems(data.data.deliveryItems || []);
//       } else {
//         toast.error(data.error || 'Failed to load delivery items');
//       }
//     } catch (e) {
//       console.error(e);
//       toast.error('Network error loading items');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleItemChange = (id, patch) => {
//     setItems((prev) =>
//       prev.map((it) => (it._id === id ? { ...it, ...patch } : it))
//     );
//   };

//   const handleSave = async () => {
//     for (const it of items) {
//       const total = (it.deliveredQuantity || 0) + (it.returnedQuantity || 0) + (it.pendingQuantity || 0);
//       if (total !== it.orderedQuantity) {
//         toast.error(
//           `"${it.productName}": delivered + returned + pending must equal ${it.orderedQuantity}`
//         );
//         return;
//       }
//     }

//     setSaving(true);
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${order._id}/partial-delivery`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             deliveryItems: items.map((it) => ({
//               _id: it._id,
//               deliveredQuantity: it.deliveredQuantity || 0,
//               returnedQuantity: it.returnedQuantity || 0,
//               pendingQuantity: it.pendingQuantity || 0,
//               note: it.note || '',
//             })),
//             note,
//           }),
//         }
//       );
//       const data = await res.json();
//       if (data.success) {
//         toast.success(data.message || 'Partial delivery saved');
//         onSaved?.();
//         onClose();
//       } else {
//         toast.error(data.error || 'Failed to save partial delivery');
//       }
//     } catch (e) {
//       console.error(e);
//       toast.error('Network error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ===== Totals =====
//   const totalDelivered = items.reduce((s, i) => s + (i.deliveredQuantity || 0), 0);
//   const totalReturned = items.reduce((s, i) => s + (i.returnedQuantity || 0), 0);
//   const totalPending = items.reduce((s, i) => s + (i.pendingQuantity || 0), 0);
//   const totalOrdered = items.reduce((s, i) => s + (i.orderedQuantity || 0), 0);

//   // ===== Amounts =====
//   const deliveredAmount = items.reduce(
//     (s, i) => s + (i.deliveredQuantity || 0) * (i.unitPrice || 0),
//     0
//   );
//   const returnedAmount = items.reduce(
//     (s, i) => s + (i.returnedQuantity || 0) * (i.unitPrice || 0),
//     0
//   );

//   const subtotal = order?.subtotal || 0;
//   const shipping = order?.shippingCost || 0;
//   const discount = order?.discount || 0;

//   const deliveredRatio = subtotal > 0 ? Math.min(1, deliveredAmount / subtotal) : 0;
//   const applicableShipping = deliveredAmount > 0 ? shipping : 0;
//   const applicableDiscount = Math.round(discount * deliveredRatio * 100) / 100;

//   let previewPaidAmount = deliveredAmount + applicableShipping - applicableDiscount;
//   if (previewPaidAmount < 0) previewPaidAmount = 0;
//   if (previewPaidAmount > (order?.total || 0)) previewPaidAmount = order?.total || 0;
//   previewPaidAmount = Math.round(previewPaidAmount * 100) / 100;

//   let previewStatus = 'pending';
//   if (previewPaidAmount <= 0) previewStatus = 'pending';
//   else if (previewPaidAmount >= (order?.total || 0) - 0.01) previewStatus = 'paid';
//   else previewStatus = 'partial';

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.95 }}
//         className="relative bg-white rounded-2xl border border-black/30 shadow-2xl w-full max-w-2xl overflow-hidden"
//       >
//         {/* Header */}
//         <div className="p-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaTruck className="w-5 h-5" />
//               <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>
//                 Partial Delivery
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

//         {/* Quantity summary */}
//         <div className="px-4 pt-3">
//           <div className="grid grid-cols-4 gap-2 text-center">
//             <div className="bg-gray-50 rounded-lg py-1.5 border border-gray-200">
//               <p className="text-[10px] text-gray-500">Ordered</p>
//               <p className="text-sm font-bold text-black">{totalOrdered}</p>
//             </div>
//             <div className="bg-green-50 rounded-lg py-1.5 border border-green-200">
//               <p className="text-[10px] text-green-600">Delivered</p>
//               <p className="text-sm font-bold text-green-700">{totalDelivered}</p>
//             </div>
//             <div className="bg-purple-50 rounded-lg py-1.5 border border-purple-200">
//               <p className="text-[10px] text-purple-600">Returned</p>
//               <p className="text-sm font-bold text-purple-700">{totalReturned}</p>
//             </div>
//             <div className="bg-yellow-50 rounded-lg py-1.5 border border-yellow-200">
//               <p className="text-[10px] text-yellow-600">Pending</p>
//               <p className="text-sm font-bold text-yellow-700">{totalPending}</p>
//             </div>
//           </div>
//         </div>

//         {/* Amount summary */}
//         <div className="px-4 pt-3">
//           <div className="bg-gradient-to-r from-[#E2E7EA] to-white border border-black/20 rounded-xl p-3">
//             <div className="grid grid-cols-3 gap-2 text-center">
//               <div>
//                 <p className="text-[10px] text-[#64748B]">Delivered Value</p>
//                 <p className="text-sm font-bold text-green-700">৳{deliveredAmount.toFixed(2)}</p>
//               </div>
//               <div>
//                 <p className="text-[10px] text-[#64748B]">Returned Value</p>
//                 <p className="text-sm font-bold text-purple-700">৳{returnedAmount.toFixed(2)}</p>
//               </div>
//               <div>
//                 <p className="text-[10px] text-[#64748B]">Will Collect</p>
//                 <p className="text-sm font-bold text-black">৳{previewPaidAmount.toFixed(2)}</p>
//               </div>
//             </div>
//             <div className="mt-2 pt-2 border-t border-black/10 flex items-center justify-between text-[10px]">
//               <span className="text-[#64748B]">
//                 <FaMoneyBillWave className="inline w-2.5 h-2.5 mr-1" />
//                 Payment will be marked:
//               </span>
//               <span className={`font-semibold px-2 py-0.5 rounded-full ${
//                 previewStatus === 'paid' ? 'bg-green-100 text-green-700'
//                 : previewStatus === 'partial' ? 'bg-yellow-100 text-yellow-700'
//                 : 'bg-gray-100 text-gray-700'
//               }`}>
//                 {previewStatus.toUpperCase()}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Items */}
//         <div className="p-4 space-y-3 max-h-[45vh] overflow-y-auto">
//           {loading ? (
//             <div className="flex items-center justify-center py-10">
//               <FaSpinner className="w-5 h-5 animate-spin text-black" />
//               <span className="ml-2 text-sm text-gray-500">Loading items...</span>
//             </div>
//           ) : items.length === 0 ? (
//             <div className="text-center py-10 text-sm text-gray-500">No items found</div>
//           ) : (
//             items.map((it) => (
//               <DeliveryItemRow
//                 key={it._id}
//                 item={it}
//                 onChange={(patch) => handleItemChange(it._id, patch)}
//               />
//             ))
//           )}

//           <div className="pt-2">
//             <label className="block text-xs font-medium text-black mb-1">
//               Overall Note (optional)
//             </label>
//             <textarea
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               rows={2}
//               className="w-full px-3 py-1.5 text-sm border border-black/30 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black resize-none"
//               placeholder="Any notes about this partial delivery..."
//             />
//           </div>

//           <div className="text-[10px] text-[#64748B] bg-blue-50 p-2 rounded-lg border border-blue-200 flex items-start gap-1.5">
//             <FaInfoCircle className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
//             <span>
//               For each item: <strong>Delivered + Returned + Pending must equal Ordered</strong>.
//               Payment will be auto-updated based on delivered items.
//             </span>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="p-4 border-t border-black/30 bg-[#E2E7EA]/20 flex gap-3">
//           <button onClick={onClose} className="flex-1 px-3 py-2 border border-black/30 text-[#64748B] rounded-xl hover:bg-white text-sm">
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={saving || items.length === 0}
//             className="flex-1 px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
//           >
//             {saving ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaSave className="w-3 h-3" />}
//             Save Partial Delivery
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  FaTruck, FaTimes, FaSpinner, FaCheckCircle, FaUndo,
  FaClock, FaPlus, FaMinus, FaInfoCircle, FaSave, FaMoneyBillWave
} from 'react-icons/fa';

// ========== Row component ==========
function DeliveryItemRow({ item, onChange }) {
  const total = item.orderedQuantity || 0;
  const delivered = item.deliveredQuantity || 0;
  const returned = item.returnedQuantity || 0;
  const pending = total - delivered - returned;
  const unitPrice = item.unitPrice || 0;

  const label = [item.productName, item.variantName, item.subVariantName]
    .filter(Boolean)
    .join(' / ');

  const setDelivered = (val) => {
    const d = Math.max(0, Math.min(total, val));
    const r = returned;
    const p = total - d - r;
    onChange({ deliveredQuantity: d, returnedQuantity: r, pendingQuantity: p });
  };

  const setReturned = (val) => {
    const r = Math.max(0, Math.min(total, val));
    const d = delivered;
    const p = total - d - r;
    onChange({ deliveredQuantity: d, returnedQuantity: r, pendingQuantity: p });
  };

  const markAllDelivered = () =>
    onChange({ deliveredQuantity: total, returnedQuantity: 0, pendingQuantity: 0 });
  const markAllReturned = () =>
    onChange({ deliveredQuantity: 0, returnedQuantity: total, pendingQuantity: 0 });
  const markAllPending = () =>
    onChange({ deliveredQuantity: 0, returnedQuantity: 0, pendingQuantity: total });

  const statusColor =
    delivered === total ? 'bg-green-100 text-green-700 border-green-300'
    : returned === total ? 'bg-purple-100 text-purple-700 border-purple-300'
    : pending === total ? 'bg-gray-100 text-gray-600 border-gray-300'
    : 'bg-yellow-100 text-yellow-700 border-yellow-300';

  const statusLabel =
    delivered === total ? 'Delivered'
    : returned === total ? 'Returned'
    : pending === total ? 'Pending'
    : 'Partial';

  const rowDeliveredAmount = delivered * unitPrice;
  const rowReturnedAmount = returned * unitPrice;

  return (
    <div className="border border-black/20 rounded-xl p-3 bg-white">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start gap-2 min-w-0">
          {item.image && (
            <img
              src={item.image}
              alt={item.productName}
              className="w-9 h-9 rounded object-cover border border-black/20 flex-shrink-0"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/36?text=?'; }}
            />
          )}
          <div className="min-w-0">
            <p className="text-xs font-semibold text-black truncate">{label}</p>
            <p className="text-[10px] text-[#64748B]">
              Ordered: {total} × ৳{unitPrice.toFixed(2)} = ৳{(total * unitPrice).toFixed(2)}
            </p>
          </div>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${statusColor} flex-shrink-0`}>
          {statusLabel}
        </span>
      </div>

      <div className="flex flex-wrap gap-1 mb-2">
        <button type="button" onClick={markAllDelivered} className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 hover:bg-green-100">
          <FaCheckCircle className="inline w-2.5 h-2.5 mr-0.5" /> All Delivered
        </button>
        <button type="button" onClick={markAllReturned} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100">
          <FaUndo className="inline w-2.5 h-2.5 mr-0.5" /> All Returned
        </button>
        <button type="button" onClick={markAllPending} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100">
          <FaClock className="inline w-2.5 h-2.5 mr-0.5" /> All Pending
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className="block text-[10px] font-medium text-green-700 mb-1">Delivered</label>
          <div className="flex items-center border border-green-300 rounded-lg overflow-hidden bg-white">
            <button type="button" onClick={() => setDelivered(delivered - 1)} disabled={delivered <= 0} className="w-6 h-6 flex items-center justify-center hover:bg-green-50 disabled:opacity-40">
              <FaMinus className="w-2.5 h-2.5 text-green-700" />
            </button>
            <input
              type="number" min="0" max={total} value={delivered}
              onChange={(e) => setDelivered(parseInt(e.target.value) || 0)}
              className="w-full text-center text-xs py-0.5 focus:outline-none text-black"
            />
            <button type="button" onClick={() => setDelivered(delivered + 1)} disabled={delivered + returned >= total} className="w-6 h-6 flex items-center justify-center hover:bg-green-50 disabled:opacity-40">
              <FaPlus className="w-2.5 h-2.5 text-green-700" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-medium text-purple-700 mb-1">Returned</label>
          <div className="flex items-center border border-purple-300 rounded-lg overflow-hidden bg-white">
            <button type="button" onClick={() => setReturned(returned - 1)} disabled={returned <= 0} className="w-6 h-6 flex items-center justify-center hover:bg-purple-50 disabled:opacity-40">
              <FaMinus className="w-2.5 h-2.5 text-purple-700" />
            </button>
            <input
              type="number" min="0" max={total} value={returned}
              onChange={(e) => setReturned(parseInt(e.target.value) || 0)}
              className="w-full text-center text-xs py-0.5 focus:outline-none text-black"
            />
            <button type="button" onClick={() => setReturned(returned + 1)} disabled={delivered + returned >= total} className="w-6 h-6 flex items-center justify-center hover:bg-purple-50 disabled:opacity-40">
              <FaPlus className="w-2.5 h-2.5 text-purple-700" />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-medium text-gray-500 mb-1">Pending</label>
          <div className="flex items-center justify-center border border-gray-300 rounded-lg bg-gray-50 h-[26px]">
            <span className="text-xs font-medium text-gray-600">{pending}</span>
          </div>
        </div>
      </div>

      {/* Row amounts */}
      <div className="mt-2 pt-2 border-t border-gray-100 flex flex-wrap gap-2 text-[10px]">
        {rowDeliveredAmount > 0 && (
          <span className="text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
            Collect: ৳{rowDeliveredAmount.toFixed(2)}
          </span>
        )}
        {rowReturnedAmount > 0 && (
          <span className="text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
            Returned: ৳{rowReturnedAmount.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
}

// ========== Main Modal ==========
export default function PartialDeliveryModal({
  isOpen,
  onClose,
  order,
  onSaved,
  overrideStatus = false,   // ✅ NEW: unlock any-status conversion when true
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (isOpen && order?._id) {
      loadItems();
    }
  }, [isOpen, order?._id]);

  const loadItems = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      // ✅ Append overrideStatus query when true
      const qs = overrideStatus ? '?overrideStatus=true' : '';
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${order._id}/partial-delivery-items${qs}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (data.success) {
        setItems(data.data.deliveryItems || []);
      } else {
        toast.error(data.error || 'Failed to load delivery items');
      }
    } catch (e) {
      console.error(e);
      toast.error('Network error loading items');
    } finally {
      setLoading(false);
    }
  };

  const handleItemChange = (id, patch) => {
    setItems((prev) =>
      prev.map((it) => (it._id === id ? { ...it, ...patch } : it))
    );
  };

  const handleSave = async () => {
    for (const it of items) {
      const total = (it.deliveredQuantity || 0) + (it.returnedQuantity || 0) + (it.pendingQuantity || 0);
      if (total !== it.orderedQuantity) {
        toast.error(
          `"${it.productName}": delivered + returned + pending must equal ${it.orderedQuantity}`
        );
        return;
      }
    }

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/orders/${order._id}/partial-delivery`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            deliveryItems: items.map((it) => ({
              _id: it._id,
              deliveredQuantity: it.deliveredQuantity || 0,
              returnedQuantity: it.returnedQuantity || 0,
              pendingQuantity: it.pendingQuantity || 0,
              note: it.note || '',
            })),
            note,
            overrideStatus,   // ✅ Forward flag to backend
          }),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || 'Partial delivery saved');
        onSaved?.();
        onClose();
      } else {
        toast.error(data.error || 'Failed to save partial delivery');
      }
    } catch (e) {
      console.error(e);
      toast.error('Network error');
    } finally {
      setSaving(false);
    }
  };

  // ===== Totals =====
  const totalDelivered = items.reduce((s, i) => s + (i.deliveredQuantity || 0), 0);
  const totalReturned = items.reduce((s, i) => s + (i.returnedQuantity || 0), 0);
  const totalPending = items.reduce((s, i) => s + (i.pendingQuantity || 0), 0);
  const totalOrdered = items.reduce((s, i) => s + (i.orderedQuantity || 0), 0);

  // ===== Amounts =====
  const deliveredAmount = items.reduce(
    (s, i) => s + (i.deliveredQuantity || 0) * (i.unitPrice || 0),
    0
  );
  const returnedAmount = items.reduce(
    (s, i) => s + (i.returnedQuantity || 0) * (i.unitPrice || 0),
    0
  );

  const subtotal = order?.subtotal || 0;
  const shipping = order?.shippingCost || 0;
  const discount = order?.discount || 0;

  const deliveredRatio = subtotal > 0 ? Math.min(1, deliveredAmount / subtotal) : 0;
  const applicableShipping = deliveredAmount > 0 ? shipping : 0;
  const applicableDiscount = Math.round(discount * deliveredRatio * 100) / 100;

  let previewPaidAmount = deliveredAmount + applicableShipping - applicableDiscount;
  if (previewPaidAmount < 0) previewPaidAmount = 0;
  if (previewPaidAmount > (order?.total || 0)) previewPaidAmount = order?.total || 0;
  previewPaidAmount = Math.round(previewPaidAmount * 100) / 100;

  let previewStatus = 'pending';
  if (previewPaidAmount <= 0) previewStatus = 'pending';
  else if (previewPaidAmount >= (order?.total || 0) - 0.01) previewStatus = 'paid';
  else previewStatus = 'partial';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-2xl border border-black/30 shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaTruck className="w-5 h-5" />
              <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>
                Partial Delivery
              </h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">
            Order #{order?.orderNumber || order?._id?.slice(-8).toUpperCase()}
          </p>
          {overrideStatus && (
            <p className="text-[10px] text-white/90 mt-1 bg-white/20 inline-block px-2 py-0.5 rounded-full">
              ⚡ Admin Override Mode
            </p>
          )}
        </div>

        {/* Quantity summary */}
        <div className="px-4 pt-3">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-gray-50 rounded-lg py-1.5 border border-gray-200">
              <p className="text-[10px] text-gray-500">Ordered</p>
              <p className="text-sm font-bold text-black">{totalOrdered}</p>
            </div>
            <div className="bg-green-50 rounded-lg py-1.5 border border-green-200">
              <p className="text-[10px] text-green-600">Delivered</p>
              <p className="text-sm font-bold text-green-700">{totalDelivered}</p>
            </div>
            <div className="bg-purple-50 rounded-lg py-1.5 border border-purple-200">
              <p className="text-[10px] text-purple-600">Returned</p>
              <p className="text-sm font-bold text-purple-700">{totalReturned}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg py-1.5 border border-yellow-200">
              <p className="text-[10px] text-yellow-600">Pending</p>
              <p className="text-sm font-bold text-yellow-700">{totalPending}</p>
            </div>
          </div>
        </div>

        {/* Amount summary */}
        <div className="px-4 pt-3">
          <div className="bg-gradient-to-r from-[#E2E7EA] to-white border border-black/20 rounded-xl p-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-[10px] text-[#64748B]">Delivered Value</p>
                <p className="text-sm font-bold text-green-700">৳{deliveredAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#64748B]">Returned Value</p>
                <p className="text-sm font-bold text-purple-700">৳{returnedAmount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#64748B]">Will Collect</p>
                <p className="text-sm font-bold text-black">৳{previewPaidAmount.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-black/10 flex items-center justify-between text-[10px]">
              <span className="text-[#64748B]">
                <FaMoneyBillWave className="inline w-2.5 h-2.5 mr-1" />
                Payment will be marked:
              </span>
              <span className={`font-semibold px-2 py-0.5 rounded-full ${
                previewStatus === 'paid' ? 'bg-green-100 text-green-700'
                : previewStatus === 'partial' ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-700'
              }`}>
                {previewStatus.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="p-4 space-y-3 max-h-[45vh] overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <FaSpinner className="w-5 h-5 animate-spin text-black" />
              <span className="ml-2 text-sm text-gray-500">Loading items...</span>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-10 text-sm text-gray-500">No items found</div>
          ) : (
            items.map((it) => (
              <DeliveryItemRow
                key={it._id}
                item={it}
                onChange={(patch) => handleItemChange(it._id, patch)}
              />
            ))
          )}

          <div className="pt-2">
            <label className="block text-xs font-medium text-black mb-1">
              Overall Note (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className="w-full px-3 py-1.5 text-sm border border-black/30 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black resize-none"
              placeholder="Any notes about this partial delivery..."
            />
          </div>

          <div className="text-[10px] text-[#64748B] bg-blue-50 p-2 rounded-lg border border-blue-200 flex items-start gap-1.5">
            <FaInfoCircle className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
            <span>
              For each item: <strong>Delivered + Returned + Pending must equal Ordered</strong>.
              Payment will be auto-updated based on delivered items.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-black/30 bg-[#E2E7EA]/20 flex gap-3">
          <button onClick={onClose} className="flex-1 px-3 py-2 border border-black/30 text-[#64748B] rounded-xl hover:bg-white text-sm">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || items.length === 0}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            {saving ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaSave className="w-3 h-3" />}
            Save Partial Delivery
          </button>
        </div>
      </motion.div>
    </div>
  );
}