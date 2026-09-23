'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertTriangle, PackageX, Search, RefreshCw, Edit, ArrowLeft,
  Loader2, ChevronLeft, ChevronRight, Package, X, Filter,
  TrendingDown, Boxes, ExternalLink,
} from 'lucide-react';
import { toast } from 'sonner';
import ProtectedRoute from '@/app/components/ProtectedRoute';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function StockAlertPage() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ outOfStock: 0, lowStock: 0, total: 0 });

  const [search, setSearch] = useState('');
  const [alertType, setAlertType] = useState('all'); // all | out | low
  const [sortBy, setSortBy] = useState('lowest');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  // ---------- Fetch ----------
  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: currentPage,
        limit: 20,
        alertType,
        sort: sortBy,
      });
      if (search.trim()) params.append('search', search.trim());

      const res = await fetch(
        `${API_URL}/api/products/admin/stock-alerts?${params.toString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const json = await res.json();

      if (json.success) {
        setProducts(json.data || []);
        setSummary(json.summary || { outOfStock: 0, lowStock: 0, total: 0 });
        setTotalPages(json.pagination?.pages || 1);
        setTotalProducts(json.pagination?.total || 0);
      } else {
        toast.error(json.error || 'Failed to load stock alerts');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }, [currentPage, alertType, sortBy, search]);

  useEffect(() => {
    const t = setTimeout(() => {
      setCurrentPage(1);
      fetchAlerts();
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, alertType, sortBy]);

  useEffect(() => {
    fetchAlerts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // ---------- Handlers ----------
  const handleEdit = (id) => {
    window.open(`/authorize/editProduct?id=${id}`, '_blank');
  };

  const clearFilters = () => {
    setSearch('');
    setAlertType('all');
    setSortBy('lowest');
    setCurrentPage(1);
  };

  const getImage = (p) => {
    const img = p?.images?.[0];
    if (!img) return null;
    return typeof img === 'string' ? img : img.url;
  };

  return (
    <ProtectedRoute pageKey="stock_alert">
      <div className="min-h-screen bg-gray-50 pb-16">
        {/* HEADER */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.push('/authorize/dashboard')}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  title="Back to dashboard"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                <div className="w-10 h-10 bg-gradient-to-r from-rose-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg md:text-xl font-bold text-gray-900">
                    Stock Alerts
                  </h1>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Products that are out of stock or at/below alert level
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push('/authorize/restock')}
                  className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-xl hover:bg-[#485442] transition-colors shadow-sm"
                >
                  <Boxes className="w-4 h-4" />
                  Restock Items
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </button>
                <button
                  onClick={fetchAlerts}
                  className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50"
                  title="Refresh"
                >
                  <RefreshCw className={`w-5 h-5 text-gray-700 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => { setAlertType('all'); setCurrentPage(1); }}
              className={`text-left p-4 rounded-2xl border-2 transition-all shadow-sm ${
                alertType === 'all'
                  ? 'border-black bg-white'
                  : 'border-gray-200 bg-white hover:border-gray-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">{summary.total}</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => { setAlertType('out'); setCurrentPage(1); }}
              className={`text-left p-4 rounded-2xl border-2 transition-all shadow-sm ${
                alertType === 'out'
                  ? 'border-red-500 bg-red-50/50'
                  : 'border-gray-200 bg-white hover:border-red-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                  <PackageX className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-red-600">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-700">{summary.outOfStock}</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => { setAlertType('low'); setCurrentPage(1); }}
              className={`text-left p-4 rounded-2xl border-2 transition-all shadow-sm ${
                alertType === 'low'
                  ? 'border-amber-500 bg-amber-50/50'
                  : 'border-gray-200 bg-white hover:border-amber-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-amber-600">Low Stock</p>
                  <p className="text-2xl font-bold text-amber-700">{summary.lowStock}</p>
                </div>
              </div>
            </button>
          </div>

          {/* FILTERS */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by product name, SKU, barcode, or brand..."
                  className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                className="px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white"
              >
                <option value="lowest">Sort: Lowest Stock First</option>
                <option value="highest">Sort: Highest Stock First</option>
                {/* <option value="name_asc">Sort: Name A → Z</option>
                <option value="newest">Sort: Recently Updated</option> */}
              </select>
            </div>

            {(search || alertType !== 'all' || sortBy !== 'lowest') && (
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  <Filter className="inline w-3 h-3 mr-1" />
                  Filters active
                </span>
                <button
                  onClick={clearFilters}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* LIST */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <h2 className="text-sm font-semibold text-gray-900">
                  Alert Items
                </h2>
                <span className="text-xs text-gray-500">
                  ({totalProducts} product{totalProducts !== 1 ? 's' : ''})
                </span>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                <span className="ml-2 text-sm text-gray-500">Loading...</span>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <Package className="w-14 h-14 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-600">
                  No stock alerts — everything looks good!
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Products appear here when stock hits 0 or falls to/below the alert level.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {products.map((p) => {
                  const img = getImage(p);
                  const isOut = p.alertLevel === 'out';
                  return (
                    <div key={p._id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start gap-4">
                        {/* image */}
                        <div className="w-16 h-16 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                          {img ? (
                            <img src={img} alt={p.productName} className="w-full h-full object-cover" />
                          ) : (
                            <Package className="w-6 h-6 text-gray-300" />
                          )}
                        </div>

                        {/* details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3 flex-wrap">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                  {p.productName}
                                </p>
                                <span
                                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                                    isOut
                                      ? 'bg-red-100 text-red-700 border-red-300'
                                      : 'bg-amber-100 text-amber-700 border-amber-300'
                                  }`}
                                >
                                  {isOut ? 'Out of Stock' : 'Low Stock'}
                                </span>
                                {p.hasVariants && (
                                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full border bg-purple-100 text-purple-700 border-purple-300">
                                    Has Variants
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500 flex-wrap">
                                {p.skuCode && (
                                  <span className="font-mono">SKU: {p.skuCode}</span>
                                )}
                                {p.barcode && (
                                  <span className="font-mono">Barcode: {p.barcode}</span>
                                )}
                              
                              </div>

                              {/* stock numbers */}
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[11px] text-gray-500">Current:</span>
                                  <span
                                    className={`text-sm font-bold ${
                                      isOut ? 'text-red-600' : 'text-amber-600'
                                    }`}
                                  >
                                    {p.stockQuantity ?? 0}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[11px] text-gray-500">Alert Level:</span>
                                  <span className="text-sm font-semibold text-gray-700">
                                    {p.stockAlertQuantity ?? 0}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* actions */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <button
                                onClick={() => handleEdit(p._id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
                                title="Edit product"
                              >
                                <Edit className="w-3 h-3" />
                                Edit
                              </button>
                              <button
                                onClick={() => router.push('/authorize/restock')}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-black text-white rounded-lg hover:bg-[#485442] transition-colors shadow-sm"
                                title="Go to Restock page"
                              >
                                <Boxes className="w-3 h-3" />
                                Restock
                              </button>
                            </div>
                          </div>
{p.hasVariants && p.alertVariants?.length > 0 && (
  <div className="mt-3 pt-3 border-t border-gray-100">
    <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
      Variant Stock (display only)
    </p>
    <div className="flex flex-wrap gap-2">
      {p.alertVariants.map((v, i) => (
        <div
          key={i}
          className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border text-[11px] ${
            v.isOut
              ? 'bg-red-50 border-red-200'
              : 'bg-gray-50 border-gray-200'
          }`}
        >
          <span className="font-medium text-gray-800">{v.name || 'Variant'}</span>
          <span className="text-gray-400">•</span>
          <span className={v.isOut ? 'text-red-600 font-semibold' : 'text-gray-700 font-semibold'}>
            {v.stockQuantity ?? 0}
          </span>
        </div>
      ))}
    </div>
  </div>
)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* pagination */}
            {totalPages > 1 && (
              <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                <span className="text-xs text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 border border-gray-200 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-40"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 border border-gray-200 rounded-lg bg-white hover:bg-gray-100 disabled:opacity-40"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}