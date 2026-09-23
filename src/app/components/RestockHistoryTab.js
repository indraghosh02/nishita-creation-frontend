

// 'use client';

// import { useState, useEffect, useCallback, useMemo } from 'react';
// import {
//   FaSearch,
//   FaSpinner,
//   FaHistory,
//   FaEye,
//   FaUser,
//   FaCalendarAlt,
//   FaSyncAlt,
//   FaFilter,
//   FaTimes,
// } from 'react-icons/fa';

// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// // Quick filter presets
// const DATE_PRESETS = [
//   { key: 'all', label: 'All Time' },
//   { key: 'today', label: 'Today' },
//   { key: 'week', label: 'This Week' },
//   { key: 'month', label: 'This Month' },
//   { key: 'year', label: 'This Year' },
//   { key: 'custom', label: 'Custom' },
// ];

// function getPresetRange(preset) {
//   const now = new Date();
//   const end = new Date(now);
//   end.setHours(23, 59, 59, 999);

//   switch (preset) {
//     case 'today': {
//       const start = new Date(now);
//       start.setHours(0, 0, 0, 0);
//       return { from: start, to: end };
//     }
//     case 'week': {
//       const start = new Date(now);
//       const day = start.getDay(); // 0 = Sunday
//       const diff = day === 0 ? 6 : day - 1; // week starts Monday
//       start.setDate(start.getDate() - diff);
//       start.setHours(0, 0, 0, 0);
//       return { from: start, to: end };
//     }
//     case 'month': {
//       const start = new Date(now.getFullYear(), now.getMonth(), 1);
//       start.setHours(0, 0, 0, 0);
//       return { from: start, to: end };
//     }
//     case 'year': {
//       const start = new Date(now.getFullYear(), 0, 1);
//       start.setHours(0, 0, 0, 0);
//       return { from: start, to: end };
//     }
//     default:
//       return { from: null, to: null };
//   }
// }

// function toInputDate(d) {
//   if (!d) return '';
//   const yyyy = d.getFullYear();
//   const mm = String(d.getMonth() + 1).padStart(2, '0');
//   const dd = String(d.getDate()).padStart(2, '0');
//   return `${yyyy}-${mm}-${dd}`;
// }

// export default function RestockHistoryTab({ onViewHistory }) {
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);
//   const [pagination, setPagination] = useState({
//     total: 0,
//     pages: 0,
//     limit: 20,
//   });

//   // Date filter state
//   const [datePreset, setDatePreset] = useState('all');
//   const [customFrom, setCustomFrom] = useState('');
//   const [customTo, setCustomTo] = useState('');
//   const [showFilters, setShowFilters] = useState(false);

//   // Compute from/to based on preset
//   const { from, to } = useMemo(() => {
//     if (datePreset === 'custom') {
//       return {
//         from: customFrom ? new Date(customFrom) : null,
//         to: customTo ? new Date(customTo) : null,
//       };
//     }
//     if (datePreset === 'all') return { from: null, to: null };
//     return getPresetRange(datePreset);
//   }, [datePreset, customFrom, customTo]);

//   const fetchLogs = useCallback(async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const token = localStorage.getItem('token');
//       const qp = new URLSearchParams({
//         page: String(page),
//         limit: '20',
//       });
//       if (search.trim()) qp.set('search', search.trim());
//       if (from) qp.set('from', from.toISOString());
//       if (to) qp.set('to', to.toISOString());

//       const res = await fetch(
//         `${API_URL}/api/products/admin/restock-logs?${qp}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const json = await res.json();
//       if (json.success) {
//         setLogs(json.data || []);
//         setPagination(json.pagination || {});
//       } else {
//         setError(json.error || 'Failed to load restock logs');
//       }
//     } catch (e) {
//       setError(e.message || 'Network error');
//     } finally {
//       setLoading(false);
//     }
//   }, [page, search, from, to]);

//   useEffect(() => {
//     fetchLogs();
//   }, [fetchLogs]);

//   // Reset to page 1 when any filter changes
//   useEffect(() => {
//     setPage(1);
//   }, [search, datePreset, customFrom, customTo]);

//   // Debounce search
//   useEffect(() => {
//     const t = setTimeout(() => setPage(1), 400);
//     return () => clearTimeout(t);
//   }, [search]);

//   const handleView = (log) => {
//     onViewHistory({
//       _id:
//         log.productId +
//         '-' +
//         (log.variantId || 'base') +
//         '-' +
//         (log.subVariantId || 'base'),
//       productId: log.productId,
//       productName: log.productName,
//       variantId: log.variantId,
//       subVariantId: log.subVariantId,
//       variantName: log.variantName,
//       subVariantName: log.subVariantName,
//       skuCode: log.skuCode,
//       barcode: log.barcode,
//     });
//   };

//   const clearFilters = () => {
//     setSearch('');
//     setDatePreset('all');
//     setCustomFrom('');
//     setCustomTo('');
//   };

//   const hasActiveFilters =
//     search.trim() ||
//     datePreset !== 'all' ||
//     customFrom ||
//     customTo;

//   return (
//     <div className="bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden">
//       {/* Toolbar */}
//       <div className="px-4 py-3 border-b border-black/10 bg-gray-50 flex items-center justify-between gap-3 flex-wrap">
//         <div className="flex items-center gap-2">
//           <FaHistory className="w-4 h-4 text-black" />
//           <h2 className="text-sm font-semibold text-black">
//             Restock History
//           </h2>
//           <span className="text-xs text-gray-500">
//             ({pagination.total || 0} product
//             {pagination.total === 1 ? '' : 's'})
//           </span>
//         </div>

//         <div className="flex items-center gap-2">
//           <div className="relative">
//             <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5 pointer-events-none" />
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search product / SKU / barcode / email..."
//               className="pl-9 pr-3 py-2 text-xs border border-black/15 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black placeholder:text-gray-400 w-72"
//             />
//           </div>

//           <button
//             onClick={() => setShowFilters((v) => !v)}
//             className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
//               showFilters || hasActiveFilters
//                 ? 'bg-black text-white border-black'
//                 : 'bg-white text-gray-700 border-black/15 hover:bg-gray-100'
//             }`}
//             title="Filters"
//           >
//             <FaFilter className="w-3 h-3" />
//             Filters
//             {hasActiveFilters && (
//               <span className="ml-1 w-1.5 h-1.5 rounded-full bg-green-400" />
//             )}
//           </button>

//           <button
//             onClick={fetchLogs}
//             className="p-2 text-gray-600 hover:text-black hover:bg-gray-200 rounded-lg transition-colors"
//             title="Refresh"
//           >
//             <FaSyncAlt
//               className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}
//             />
//           </button>
//         </div>
//       </div>

//       {/* Filter panel */}
//       {showFilters && (
//         <div className="px-4 py-3 border-b border-black/10 bg-white">
//           <div className="flex items-center justify-between gap-3 flex-wrap">
//             <div className="flex items-center gap-1.5 flex-wrap">
//               {DATE_PRESETS.map((p) => (
//                 <button
//                   key={p.key}
//                   onClick={() => setDatePreset(p.key)}
//                   className={`px-3 py-1.5 text-[11px] font-medium rounded-full border transition-colors ${
//                     datePreset === p.key
//                       ? 'bg-black text-white border-black'
//                       : 'bg-white text-gray-600 border-black/15 hover:bg-gray-100'
//                   }`}
//                 >
//                   {p.label}
//                 </button>
//               ))}
//             </div>

//             {hasActiveFilters && (
//               <button
//                 onClick={clearFilters}
//                 className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
//               >
//                 <FaTimes className="w-2.5 h-2.5" />
//                 Clear Filters
//               </button>
//             )}
//           </div>

//           {datePreset === 'custom' && (
//             <div className="flex items-center gap-3 mt-3 flex-wrap">
//               <div className="flex items-center gap-2">
//                 <label className="text-[11px] font-medium text-gray-600">
//                   From:
//                 </label>
//                 <input
//                   type="date"
//                   value={customFrom}
//                   onChange={(e) => setCustomFrom(e.target.value)}
//                   max={customTo || toInputDate(new Date())}
//                   className="px-2.5 py-1.5 text-xs border border-black/15 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                 />
//               </div>
//               <div className="flex items-center gap-2">
//                 <label className="text-[11px] font-medium text-gray-600">
//                   To:
//                 </label>
//                 <input
//                   type="date"
//                   value={customTo}
//                   onChange={(e) => setCustomTo(e.target.value)}
//                   min={customFrom}
//                   max={toInputDate(new Date())}
//                   className="px-2.5 py-1.5 text-xs border border-black/15 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Body */}
//       <div className="p-4">
//         {loading && logs.length === 0 && (
//           <div className="py-16 text-center text-gray-500 text-sm">
//             <FaSpinner className="w-5 h-5 animate-spin mx-auto mb-2" />
//             Loading restock history...
//           </div>
//         )}

//         {error && !loading && (
//           <div className="py-16 text-center text-red-500 text-sm">{error}</div>
//         )}

//         {!loading && !error && logs.length === 0 && (
//           <div className="py-16 text-center">
//             <FaHistory className="w-12 h-12 text-gray-300 mx-auto mb-3" />
//             <p className="text-sm text-gray-500 font-medium">
//               No restock history found
//             </p>
//             <p className="text-xs text-gray-400 mt-1">
//               {hasActiveFilters
//                 ? 'Try adjusting your filters.'
//                 : 'Restock a product and it will appear here.'}
//             </p>
//           </div>
//         )}

//         {logs.length > 0 && (
//           <div className="overflow-x-auto -mx-4">
//             <table className="w-full min-w-[1000px] text-sm">
//               <thead>
//                 <tr className="border-b border-gray-100 bg-gray-50/50">
//                   <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
//                     Product
//                   </th>
//                   <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
//                     Variant
//                   </th>
//                   <th className="text-right px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
//                     Last Qty
//                   </th>
//                   <th className="text-center px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
//                     Stock
//                   </th>
//                   <th className="text-center px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
//                     Total Restocked
//                   </th>
//                   <th className="text-center px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
//                     Events
//                   </th>
//                   <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
//                     Last By
//                   </th>
//                   <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
//                     Last Restocked
//                   </th>
//                   <th className="text-right px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {logs.map((log) => (
//                   <tr
//                     key={log._id?.toString?.() || `${log.productId}-${log.variantId}-${log.subVariantId}`}
//                     className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
//                   >
//                     <td className="px-4 py-3 max-w-[240px]">
//                       <p className="text-xs font-medium text-black truncate">
//                         {log.productName}
//                       </p>
//                       <p className="text-[10px] text-gray-400 font-mono mt-0.5">
//                         {log.skuCode || log.barcode || '—'}
//                       </p>
//                     </td>
//                     <td className="px-4 py-3">
//                       {log.variantName || log.subVariantName ? (
//                         <div className="flex flex-col gap-0.5">
//                           {log.variantName && (
//                             <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-medium self-start">
//                               {log.variantName}
//                             </span>
//                           )}
//                           {log.subVariantName && (
//                             <span className="text-[10px] text-gray-500">
//                               ↳ {log.subVariantName}
//                             </span>
//                           )}
//                         </div>
//                       ) : (
//                         <span className="text-[10px] text-gray-400">—</span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 text-right">
//                       <span className="text-sm font-bold text-green-700">
//                         +{log.addQuantity}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-center text-[11px] text-gray-600">
//                       {log.previousStock} →{' '}
//                       <span className="font-semibold text-black">
//                         {log.newStock}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-center">
//                       <span className="text-xs font-bold text-blue-700">
//                         +{log.totalRestocked}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3 text-center">
//                       <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 font-medium">
//                         {log.totalEvents}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-1.5 text-[11px] text-gray-700">
//                         <FaUser className="w-2.5 h-2.5 text-blue-600" />
//                         {/* <span className="font-medium">
//                           {log.restockedByName || 'Unknown'}
//                         </span> */}
//                            {log.restockedByEmail && (
//                         <p className="text-[10px] text-blue-600 mt-0.5">
//                           {log.restockedByEmail}
//                         </p>
//                       )}
//                       </div>
                   
//                     </td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-1.5 text-[11px] text-gray-700">
//                         <FaCalendarAlt className="w-2.5 h-2.5 text-gray-400" />
//                         {new Date(log.restockedAt).toLocaleDateString()}
//                       </div>
//                       <p className="text-[10px] text-gray-400 mt-0.5">
//                         {new Date(log.restockedAt).toLocaleTimeString()}
//                       </p>
//                     </td>
//                     <td className="px-4 py-3 text-right">
//                       <button
//                         onClick={() => handleView(log)}
//                         className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
//                       >
//                         <FaEye className="w-3 h-3" />
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Pagination */}
//         {pagination.pages > 1 && (
//           <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
//             <p className="text-[11px] text-gray-500">
//               Page {pagination.page} of {pagination.pages}
//             </p>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => setPage((p) => Math.max(1, p - 1))}
//                 disabled={pagination.page <= 1 || loading}
//                 className="px-3 py-1.5 text-xs font-medium border border-black/15 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
//               >
//                 Previous
//               </button>
//               <button
//                 onClick={() =>
//                   setPage((p) => Math.min(pagination.pages, p + 1))
//                 }
//                 disabled={pagination.page >= pagination.pages || loading}
//                 className="px-3 py-1.5 text-xs font-medium border border-black/15 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  FaSearch,
  FaSpinner,
  FaEye,
  FaUser,
  FaCalendarAlt,
  FaSyncAlt,
  FaFilter,
  FaTimes,
  FaTrashAlt,
} from 'react-icons/fa';
import { toast } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const MONTHS = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const currentYear = new Date().getFullYear();
const YEARS = [];
for (let y = currentYear; y >= currentYear - 5; y--) {
  YEARS.push(y);
}

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

export default function RestockHistoryTab({ onViewHistory }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    limit: 20,
  });

  // ✅ Role-based delete
  const [userRole, setUserRole] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Date filter state
  const [showFilters, setShowFilters] = useState(false);
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'day' | 'month' | 'year'
  const [dayDate, setDayDate] = useState('');
  const [monthMonth, setMonthMonth] = useState('');
  const [monthYear, setMonthYear] = useState(String(currentYear));
  const [yearYear, setYearYear] = useState(String(currentYear));

  useEffect(() => {
    setUserRole(getUserRole());
  }, []);

  const canDelete = userRole === 'admin' || userRole === 'super_admin';

  // Compute from/to based on filter mode
  const { from, to } = useMemo(() => {
    if (filterMode === 'day' && dayDate) {
      const start = new Date(dayDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(dayDate);
      end.setHours(23, 59, 59, 999);
      return { from: start, to: end };
    }
    if (filterMode === 'month' && monthMonth && monthYear) {
      const start = new Date(Number(monthYear), Number(monthMonth) - 1, 1);
      start.setHours(0, 0, 0, 0);
      const end = new Date(Number(monthYear), Number(monthMonth), 0);
      end.setHours(23, 59, 59, 999);
      return { from: start, to: end };
    }
    if (filterMode === 'year' && yearYear) {
      const start = new Date(Number(yearYear), 0, 1);
      start.setHours(0, 0, 0, 0);
      const end = new Date(Number(yearYear), 11, 31);
      end.setHours(23, 59, 59, 999);
      return { from: start, to: end };
    }
    return { from: null, to: null };
  }, [filterMode, dayDate, monthMonth, monthYear, yearYear]);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const qp = new URLSearchParams({
        page: String(page),
        limit: '20',
      });
      if (search.trim()) qp.set('search', search.trim());
      if (from) qp.set('from', from.toISOString());
      if (to) qp.set('to', to.toISOString());

      const res = await fetch(
        `${API_URL}/api/products/admin/restock-logs?${qp}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const json = await res.json();
      if (json.success) {
        setLogs(Array.isArray(json.data) ? json.data : []);
        setPagination(json.pagination || {});
      } else {
        setError(json.error || 'Failed to load restock logs');
      }
    } catch (e) {
      setError(e.message || 'Network error');
    } finally {
      setLoading(false);
    }
  }, [page, search, from, to]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  // Reset to page 1 when any filter changes
  useEffect(() => {
    setPage(1);
  }, [search, filterMode, dayDate, monthMonth, monthYear, yearYear]);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setPage(1), 400);
    return () => clearTimeout(t);
  }, [search]);

  const handleView = (log) => {
    onViewHistory({
      _id: `${log.productId}-${log.variantId || 'base'}-${
        log.subVariantId || 'base'
      }`,
      productId: log.productId,
      productName: log.productName,
      variantId: log.variantId,
      subVariantId: log.subVariantId,
      variantName: log.variantName,
      subVariantName: log.subVariantName,
      skuCode: log.skuCode,
      barcode: log.barcode,
    });
  };

  // ✅ Delete the most recent log entry for this row
  const handleDelete = async (log, rowKey) => {
    if (!canDelete) return;

    const label = [log.productName, log.variantName, log.subVariantName]
      .filter(Boolean)
      .join(' / ');

    if (
      !confirm(
        `Delete the latest restock entry for "${label}"?\n\nThis removes it from history only — it does NOT change stock.`
      )
    ) {
      return;
    }

    const targetId = log.lastLogId;
    if (!targetId) {
      toast.error('Could not locate the latest log entry.');
      return;
    }

    try {
      setDeletingId(rowKey);
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${API_URL}/api/products/admin/restock-logs/${targetId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await res.json();

      if (json.success) {
        toast.success('Restock log deleted');
        fetchLogs();
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

  const clearFilters = () => {
    setSearch('');
    setFilterMode('all');
    setDayDate('');
    setMonthMonth('');
    setMonthYear(String(currentYear));
    setYearYear(String(currentYear));
  };

  const hasActiveFilters =
    search.trim() ||
    (filterMode === 'day' && dayDate) ||
    (filterMode === 'month' && monthMonth) ||
    (filterMode === 'year' && yearYear);

  return (
    <div className="bg-white rounded-2xl border border-black/10 shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="px-4 py-3 border-b border-black/10 bg-gray-50 flex items-center justify-between gap-3 flex-wrap">
        <div className="text-xs text-gray-500">
          {pagination.total || 0} product
          {pagination.total === 1 ? '' : 's'} restocked
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product / SKU / barcode / email..."
              className="pl-9 pr-3 py-2 text-xs border border-black/15 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black placeholder:text-gray-400 w-72"
            />
          </div>

          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${
              showFilters || hasActiveFilters
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 border-black/15 hover:bg-gray-100'
            }`}
            title="Filters"
          >
            <FaFilter className="w-3 h-3" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 w-1.5 h-1.5 rounded-full bg-green-400" />
            )}
          </button>

          <button
            onClick={fetchLogs}
            className="p-2 text-gray-600 hover:text-black hover:bg-gray-200 rounded-lg transition-colors"
            title="Refresh"
          >
            <FaSyncAlt
              className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="px-4 py-3 border-b border-black/10 bg-white">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              {['all', 'day', 'month', 'year'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFilterMode(mode)}
                  className={`px-3 py-1.5 text-[11px] font-medium rounded-full border capitalize transition-colors ${
                    filterMode === mode
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-gray-600 border-black/15 hover:bg-gray-100'
                  }`}
                >
                  {mode === 'all' ? 'All Time' : `By ${mode}`}
                </button>
              ))}
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FaTimes className="w-2.5 h-2.5" />
                Clear Filters
              </button>
            )}
          </div>

          {/* Day picker */}
          {filterMode === 'day' && (
            <div className="flex items-center gap-2 mt-3">
              <label className="text-[11px] font-medium text-gray-600">
                Pick a date:
              </label>
              <input
                type="date"
                value={dayDate}
                onChange={(e) => setDayDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="px-2.5 py-1.5 text-xs border border-black/15 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
          )}

          {/* Month picker */}
          {filterMode === 'month' && (
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <div className="flex items-center gap-2">
                <label className="text-[11px] font-medium text-gray-600">
                  Month:
                </label>
                <select
                  value={monthMonth}
                  onChange={(e) => setMonthMonth(e.target.value)}
                  className="px-2.5 py-1.5 text-xs border border-black/15 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                >
                  <option value="">Select month</option>
                  {MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-[11px] font-medium text-gray-600">
                  Year:
                </label>
                <select
                  value={monthYear}
                  onChange={(e) => setMonthYear(e.target.value)}
                  className="px-2.5 py-1.5 text-xs border border-black/15 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Year picker */}
          {filterMode === 'year' && (
            <div className="flex items-center gap-2 mt-3">
              <label className="text-[11px] font-medium text-gray-600">
                Year:
              </label>
              <select
                value={yearYear}
                onChange={(e) => setYearYear(e.target.value)}
                className="px-2.5 py-1.5 text-xs border border-black/15 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white"
              >
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Body */}
      <div className="p-4">
        {loading && logs.length === 0 && (
          <div className="py-16 text-center text-gray-500 text-sm">
            <FaSpinner className="w-5 h-5 animate-spin mx-auto mb-2" />
            Loading restock history...
          </div>
        )}

        {error && !loading && (
          <div className="py-16 text-center text-red-500 text-sm">{error}</div>
        )}

        {!loading && !error && logs.length === 0 && (
          <div className="py-16 text-center">
            <FaCalendarAlt className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500 font-medium">
              No restock history found
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {hasActiveFilters
                ? 'Try adjusting your filters.'
                : 'Restock a product and it will appear here.'}
            </p>
          </div>
        )}

        {logs.length > 0 && (
          <div className="overflow-x-auto -mx-4">
            <table className="w-full min-w-[1000px] text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                    Variant
                  </th>
                  <th className="text-right px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                    Last Qty
                  </th>
                  <th className="text-center px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="text-center px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                    Total Restocked
                  </th>
                  <th className="text-center px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                    Events
                  </th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                    Last By
                  </th>
                  <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                    Last Date
                  </th>
                  <th className="text-right px-4 py-2.5 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, idx) => {
                  // ✅ rowKey built from strings only — no more log._id object
                  const rowKey = `${log.productId}-${
                    log.variantId || 'base'
                  }-${log.subVariantId || 'base'}-${idx}`;

                  const safeDate = log.restockedAt
                    ? new Date(log.restockedAt)
                    : null;

                  return (
                    <tr
                      key={rowKey}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-4 py-3 max-w-[240px]">
                        <p className="text-xs font-medium text-black truncate">
                          {log.productName || '—'}
                        </p>
                        <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                          {log.skuCode || log.barcode || '—'}
                        </p>
                      </td>
                      {/* <td className="px-4 py-3">
                        {log.variantName || log.subVariantName ? (
                          <div className="flex flex-col gap-0.5">
                            {log.variantName && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-medium self-start">
                                {log.variantName}
                              </span>
                            )}
                            {log.subVariantName && (
                              <span className="text-[10px] text-gray-500">
                                ↳ {log.subVariantName}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-[10px] text-gray-400">—</span>
                        )}
                      </td> */}
                      <td className="px-4 py-3">
  {log.variantName || log.subVariantName ? (
    <div className="flex flex-col gap-0.5">
      {log.variantName && (
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-medium self-start">
          {log.variantName}
        </span>
      )}
      {log.subVariantName && (
        <span className="text-[10px] text-gray-500">
          ↳ {log.subVariantName}
        </span>
      )}
    </div>
  ) : (
    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200 font-medium">
      Base 
    </span>
  )}
</td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm font-bold text-green-700">
                          +{log.addQuantity ?? 0}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center text-[11px] text-gray-600">
                        {log.previousStock ?? 0} →{' '}
                        <span className="font-semibold text-black">
                          {log.newStock ?? 0}
                        </span>
                      </td>

    {/* <td className="px-4 py-3 text-center text-[11px] text-gray-600">
  <div>
    {log.previousStock ?? 0} →{' '}
    <span className="font-semibold text-black">
      {log.newStock ?? 0}
    </span>
  </div>

  {(log.variantId || log.subVariantId) &&
    log.baseStockBefore != null &&
    log.baseStockAfter != null && (
      <div className="text-[10px] text-gray-400 mt-0.5">
        base: {log.baseStockBefore} → {log.baseStockAfter}
      </div>
    )}
</td> */}
                      <td className="px-4 py-3 text-center">
                        <span className="text-xs font-bold text-blue-700">
                          +{log.totalRestocked ?? 0}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200 font-medium">
                          {log.totalEvents ?? 0}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-700">
                          <FaUser className="w-2.5 h-2.5 text-blue-600" />
                          <span className="font-medium">
                            {/* {log.restockedByName || 'Unknown'} */}
                              {log.restockedByEmail && (
                          <p className="text-[10px] text-blue-600 mt-0.5">
                            {log.restockedByEmail}
                          </p>
                        )}
                          </span>
                        </div>
                      
                      </td>
                      <td className="px-4 py-3">
                        {safeDate ? (
                          <>
                            <div className="flex items-center gap-1.5 text-[11px] text-gray-700">
                              <FaCalendarAlt className="w-2.5 h-2.5 text-gray-400" />
                              {safeDate.toLocaleDateString()}
                            </div>
                            <p className="text-[10px] text-gray-400 mt-0.5">
                              {safeDate.toLocaleTimeString()}
                            </p>
                          </>
                        ) : (
                          <span className="text-[10px] text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleView(log)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                          >
                            <FaEye className="w-3 h-3" />
                            View
                          </button>

                          {canDelete && (
                            <button
                              onClick={() => handleDelete(log, rowKey)}
                              disabled={deletingId === rowKey}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Delete latest restock entry"
                            >
                              {deletingId === rowKey ? (
                                <FaSpinner className="w-3 h-3 animate-spin" />
                              ) : (
                                <FaTrashAlt className="w-3 h-3" />
                              )}
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <p className="text-[11px] text-gray-500">
              Page {pagination.page} of {pagination.pages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={pagination.page <= 1 || loading}
                className="px-3 py-1.5 text-xs font-medium border border-black/15 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setPage((p) => Math.min(pagination.pages, p + 1))
                }
                disabled={pagination.page >= pagination.pages || loading}
                className="px-3 py-1.5 text-xs font-medium border border-black/15 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}