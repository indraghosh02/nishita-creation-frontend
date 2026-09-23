// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   FaTimes,
//   FaSpinner,
//   FaHistory,
//   FaUser,
//   FaCalendarAlt,
//   FaBoxOpen,
// } from 'react-icons/fa';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// export default function RestockHistoryModal({ item, onClose }) {
//   const [loading, setLoading] = useState(true);
//   const [logs, setLogs] = useState([]);
//   const [summary, setSummary] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (!item) return;

//     const load = async () => {
//       setLoading(true);
//       setError('');
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch(
//           `${API_URL}/api/products/${item.productId}/restock-history?limit=200`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         const json = await res.json();
//         if (json.success) {
//           setLogs(json.data || []);
//           setSummary(json.summary || null);
//         } else {
//           setError(json.error || 'Failed to load history');
//         }
//       } catch (e) {
//         setError(e.message || 'Network error');
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, [item]);

//   if (!item) return null;

//   const label = [item.productName, item.variantName, item.subVariantName]
//     .filter(Boolean)
//     .join(' / ');

//   return (
//     <div
//       className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <FaHistory className="w-4 h-4 text-blue-600" />
//             <h3 className="text-sm font-semibold text-black">
//               Restock History
//             </h3>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100"
//           >
//             <FaTimes className="w-4 h-4" />
//           </button>
//         </div>

//         {/* Product label */}
//         <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
//           <p className="text-sm font-medium text-black truncate">{label}</p>
//           <p className="text-[11px] text-gray-500 mt-0.5">
//             SKU: {item.skuCode || '—'} · Barcode: {item.barcode || '—'}
//           </p>
//         </div>

//         {/* Summary */}
//         {summary && (
//           <div className="px-5 py-3 grid grid-cols-3 gap-3 border-b border-gray-100">
//             <div className="text-center">
//               <p className="text-[10px] uppercase text-gray-500 tracking-wider">
//                 Total Restocked
//               </p>
//               <p className="text-lg font-bold text-black">
//                 +{summary.totalRestocked}
//               </p>
//             </div>
//             <div className="text-center border-x border-gray-100">
//               <p className="text-[10px] uppercase text-gray-500 tracking-wider">
//                 Events
//               </p>
//               <p className="text-lg font-bold text-black">
//                 {summary.totalEvents}
//               </p>
//             </div>
//             <div className="text-center">
//               <p className="text-[10px] uppercase text-gray-500 tracking-wider">
//                 Last
//               </p>
//               <p className="text-xs font-medium text-black mt-1">
//                 {summary.lastRestock
//                   ? new Date(summary.lastRestock).toLocaleDateString()
//                   : '—'}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Body */}
//         <div className="flex-1 overflow-y-auto p-5">
//           {loading && (
//             <div className="py-10 text-center text-gray-500 text-sm">
//               <FaSpinner className="w-5 h-5 animate-spin mx-auto mb-2" />
//               Loading...
//             </div>
//           )}

//           {error && !loading && (
//             <div className="py-10 text-center text-red-500 text-sm">
//               {error}
//             </div>
//           )}

//           {!loading && !error && logs.length === 0 && (
//             <div className="py-10 text-center text-gray-500 text-sm">
//               <FaBoxOpen className="w-8 h-8 mx-auto mb-2 text-gray-300" />
//               No restock history yet
//             </div>
//           )}

//           {!loading && !error && logs.length > 0 && (
//             <div className="space-y-2">
//               {logs.map((log) => (
//                 <div
//                   key={log._id}
//                   className="p-3 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
//                 >
//                   <div className="flex items-start justify-between gap-3">
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center gap-2 flex-wrap">
//                         <span className="text-sm font-bold text-green-700">
//                           +{log.addQuantity}
//                         </span>
//                         <span className="text-[11px] text-gray-500">
//                           {log.previousStock} → {log.newStock}
//                         </span>
//                         {log.variantName && (
//                           <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
//                             {log.variantName}
//                             {log.subVariantName
//                               ? ` / ${log.subVariantName}`
//                               : ''}
//                           </span>
//                         )}
//                         <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
//                           {log.source}
//                         </span>
//                       </div>

//                       <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1.5 text-[11px] text-gray-500">
//                         <span className="flex items-center gap-1">
//                           <FaUser className="w-2.5 h-2.5" />
//                           {/* {log.restockedByName || 'Unknown'} */}
//                           {log.restockedByEmail && (
//                             <span className="text-blue-600">
//                               {log.restockedByEmail}
//                             </span>
//                           )}
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <FaCalendarAlt className="w-2.5 h-2.5" />
//                           {new Date(log.restockedAt).toLocaleString()}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import {
  FaTimes,
  FaSpinner,
  FaHistory,
  FaUser,
  FaCalendarAlt,
  FaBoxOpen,
  FaTrashAlt,
} from 'react-icons/fa';
import { toast } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Read role from JWT
function getUserRole() {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || '';
    }
  } catch (e) {
    console.error('Error reading user role:', e);
  }
  return '';
}

export default function RestockHistoryModal({ item, onClose }) {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const canDelete = userRole === 'admin' || userRole === 'super_admin';

  useEffect(() => {
    setUserRole(getUserRole());
  }, []);

  const loadHistory = async () => {
    if (!item) return;
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${API_URL}/api/products/${item.productId}/restock-history?limit=200`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const json = await res.json();
      if (json.success) {
        // ✅ Filter to only entries matching this modal's variant selection
        // so the per-product history doesn't show *other* variants' events too
        const allLogs = json.data || [];
        const filtered = allLogs.filter(
          (l) =>
            String(l.variantId || '') === String(item.variantId || '') &&
            String(l.subVariantId || '') === String(item.subVariantId || '')
        );
        setLogs(filtered);

        // Recompute summary from filtered entries
        if (filtered.length > 0) {
          const totalRestocked = filtered.reduce(
            (sum, l) => sum + (l.addQuantity || 0),
            0
          );
          setSummary({
            totalRestocked,
            totalEvents: filtered.length,
            lastRestock: filtered[0]?.restockedAt || null,
          });
        } else {
          setSummary({
            totalRestocked: 0,
            totalEvents: 0,
            lastRestock: null,
          });
        }
      } else {
        setError(json.error || 'Failed to load history');
      }
    } catch (e) {
      setError(e.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  // ✅ Delete a single log entry
  const handleDeleteEntry = async (log) => {
    if (!canDelete) return;

    if (
      !confirm(
        `Delete this restock entry?\n\n+${log.addQuantity} units on ${new Date(
          log.restockedAt
        ).toLocaleString()}\n\nThis only removes it from history — stock is NOT changed.`
      )
    ) {
      return;
    }

    try {
      setDeletingId(log._id);
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${API_URL}/api/products/admin/restock-logs/${log._id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await res.json();
      if (json.success) {
        toast.success('Restock entry deleted');
        // Optimistic removal
        setLogs((prev) => prev.filter((l) => l._id !== log._id));
        setSummary((prev) => {
          if (!prev) return prev;
          const remaining = logs.filter((l) => l._id !== log._id);
          const totalRestocked = remaining.reduce(
            (sum, l) => sum + (l.addQuantity || 0),
            0
          );
          return {
            totalRestocked,
            totalEvents: remaining.length,
            lastRestock: remaining[0]?.restockedAt || null,
          };
        });
      } else {
        toast.error(json.error || 'Failed to delete');
      }
    } catch (e) {
      console.error('Delete error:', e);
      toast.error('Network error');
    } finally {
      setDeletingId(null);
    }
  };

  if (!item) return null;

  const label = [item.productName, item.variantName, item.subVariantName]
    .filter(Boolean)
    .join(' / ');

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaHistory className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-semibold text-black">
              Restock History
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-black hover:bg-gray-100"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>

        {/* Product label */}
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
          <p className="text-sm font-medium text-black truncate">{label}</p>
          <p className="text-[11px] text-gray-500 mt-0.5">
            SKU: {item.skuCode || '—'} · Barcode: {item.barcode || '—'}
          </p>
        </div>

        {/* Summary */}
        {summary && (
          <div className="px-5 py-3 grid grid-cols-3 gap-3 border-b border-gray-100">
            <div className="text-center">
              <p className="text-[10px] uppercase text-gray-500 tracking-wider">
                Total Restocked
              </p>
              <p className="text-lg font-bold text-black">
                +{summary.totalRestocked}
              </p>
            </div>
            <div className="text-center border-x border-gray-100">
              <p className="text-[10px] uppercase text-gray-500 tracking-wider">
                Events
              </p>
              <p className="text-lg font-bold text-black">
                {summary.totalEvents}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase text-gray-500 tracking-wider">
                Last
              </p>
              <p className="text-xs font-medium text-black mt-1">
                {summary.lastRestock
                  ? new Date(summary.lastRestock).toLocaleDateString()
                  : '—'}
              </p>
            </div>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {loading && (
            <div className="py-10 text-center text-gray-500 text-sm">
              <FaSpinner className="w-5 h-5 animate-spin mx-auto mb-2" />
              Loading...
            </div>
          )}

          {error && !loading && (
            <div className="py-10 text-center text-red-500 text-sm">
              {error}
            </div>
          )}

          {!loading && !error && logs.length === 0 && (
            <div className="py-10 text-center text-gray-500 text-sm">
              <FaBoxOpen className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              No restock history yet
            </div>
          )}

          {!loading && !error && logs.length > 0 && (
            <div className="space-y-2">
              {logs.map((log) => (
                <div
                  key={log._id}
                  className="p-3 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-green-700">
                          +{log.addQuantity}
                        </span>
                        {/* <span className="text-[11px] text-gray-500">
                          {log.previousStock} → {log.newStock}
                        </span> */}

                        <span className="text-[11px] text-gray-500">
  {log.previousStock} → {log.newStock}
</span>

{/* ✅ base product snapshot for variant / sub-variant rows */}
{(log.variantId || log.subVariantId) &&
  log.baseStockBefore != null &&
  log.baseStockAfter != null && (
    <span className="text-[10px] text-gray-400">
      · base: {log.baseStockBefore} → {log.baseStockAfter}
    </span>
  )}
                        {log.variantName && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                            {log.variantName}
                            {log.subVariantName
                              ? ` / ${log.subVariantName}`
                              : ''}
                          </span>
                        )}
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                          {log.source}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1.5 text-[11px] text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaUser className="w-2.5 h-2.5" />
                          {/* {log.restockedByName || 'Unknown'} */}
                          {log.restockedByEmail && (
                            <span className="text-gray-400">
                              {log.restockedByEmail}
                            </span>
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt className="w-2.5 h-2.5" />
                          {new Date(log.restockedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* ✅ Delete entry button (admin only) */}
                    {canDelete && (
                      <button
                        onClick={() => handleDeleteEntry(log)}
                        disabled={deletingId === log._id}
                        className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title="Delete this restock entry"
                      >
                        {deletingId === log._id ? (
                          <FaSpinner className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <FaTrashAlt className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}