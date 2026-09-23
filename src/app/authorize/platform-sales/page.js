'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  FaGlobe,
  FaFacebook,
  FaInstagram,
  FaStore,
  FaBox,
  FaCheckDouble,
  FaBan,
  FaUndo,
  FaMoneyBillWave,
  FaChartLine,
  FaSpinner,
  FaSearch,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaUsers,
  FaInfoCircle,
  FaPercentage,
  FaEye,
  FaFileInvoice,
  FaDownload,
  FaUser,
  FaMapMarkerAlt,
  FaTruck,
  FaExclamationTriangle,
  FaTimesCircle,
  FaClipboardList,
  FaMobile,
  FaTablet,
  FaDesktop,
  FaLaptop,
  FaHeadset,
  FaClock
} from 'react-icons/fa';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// ========== PLATFORMS ==========
const PLATFORMS = [
  { value: 'website', label: 'Website', icon: FaGlobe },
  { value: 'facebook', label: 'Facebook', icon: FaFacebook },
  { value: 'instagram', label: 'Instagram', icon: FaInstagram },
  { value: 'showroom', label: 'Showroom', icon: FaStore }
];

// ========== ORDER STATUSES ==========
const ORDER_STATUSES = [
  { value: 'placed', label: 'Placed', color: 'bg-[#E2E7EA] text-black border-black/30', icon: FaClock },
  { value: 'follow_up', label: 'Follow Up', color: 'bg-[#E2E7EA] text-black border-black/30', icon: FaHeadset },
  { value: 'reminder', label: 'Reminder', color: 'bg-[#E2E7EA] text-black border-black/30', icon: FaClock },
  { value: 'accepted', label: 'Accepted', color: 'bg-[#E2E7EA] text-black border-black/30', icon: FaCheckDouble },
  { value: 'approved', label: 'Approved', color: 'bg-black/10 text-black border-black/30', icon: FaCheckDouble },
  { value: 'hold', label: 'On Hold', color: 'bg-yellow-50 text-yellow-600 border-yellow-200', icon: FaClock },
  { value: 'processing', label: 'Processing', color: 'bg-blue-50 text-black border-blue-200', icon: FaSpinner },
  { value: 'courier_assigned', label: 'Courier Assigned', color: 'bg-black/10 text-black border-black/30', icon: FaTruck },
  { value: 'partial_delivery', label: 'Partial Delivery', color: 'bg-yellow-100 text-yellow-800 border-yellow-300', icon: FaCheckDouble },
  { value: 'ready_to_ship', label: 'Ready to Ship', color: 'bg-[#E2E7EA] text-black border-black/30', icon: FaBox },
  { value: 'rejected', label: 'Rejected', color: 'bg-orange-50 text-orange-600 border-orange-200', icon: FaTimesCircle },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-50 text-red-600 border-red-200', icon: FaBan },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-50 text-green-600 border-green-200', icon: FaCheckDouble },
  { value: 'returned', label: 'Returned', color: 'bg-purple-50 text-purple-600 border-purple-200', icon: FaUndo },
  { value: 'shipped', label: 'Shipped', color: 'bg-[#E2E7EA] text-black border-black/30', icon: FaTruck },
  { value: 'out_for_delivery', label: 'Out for Delivery', color: 'bg-[#E2E7EA] text-black border-black/30', icon: FaTruck }
];

const PAYMENT_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-[#E2E7EA] text-black border-black/30' },
  { value: 'partial', label: 'Partial Paid', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { value: 'paid', label: 'Paid', color: 'bg-black/10 text-black border-black/30' },
  { value: 'failed', label: 'Failed', color: 'bg-red-50 text-red-600 border-red-200' },
  { value: 'refunded', label: 'Refunded', color: 'bg-[#E2E7EA] text-black border-black/30' }
];

const getStatusInfo = (status) =>
  ORDER_STATUSES.find((s) => s.value === status) || {
    label: status,
    color: 'bg-gray-100 text-gray-800 border-gray-200',
    icon: FaClock
  };

const getPaymentInfo = (status) =>
  PAYMENT_STATUSES.find((p) => p.value === status) || {
    label: status,
    color: 'bg-gray-100 text-gray-800 border-gray-200'
  };

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString('en-BD', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'N/A';

const formatCurrency = (amount) => `৳${parseFloat(amount || 0).toFixed(2)}`;

// ============================================================
// ORDER DETAILS MODAL
// ============================================================
const OrderDetailsModal = ({ isOpen, onClose, order }) => {
  const [expandedProducts, setExpandedProducts] = useState({});

  if (!isOpen || !order) return null;

  const statusInfo = getStatusInfo(order.orderStatus);
  const paymentInfo = getPaymentInfo(order.paymentStatus);
  const StatusIcon = statusInfo.icon;

  const toggleProduct = (idx) => {
    setExpandedProducts((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getDeviceIcon = (deviceType) => {
    switch (deviceType?.toLowerCase()) {
      case 'mobile': return <FaMobile className="w-3.5 h-3.5" />;
      case 'tablet': return <FaTablet className="w-3.5 h-3.5" />;
      case 'desktop': return <FaDesktop className="w-3.5 h-3.5" />;
      default: return <FaLaptop className="w-3.5 h-3.5" />;
    }
  };

  const getDeviceInfo = (deviceInfo) => {
    if (!deviceInfo) return null;
    const parts = [];
    if (deviceInfo.deviceType) parts.push(deviceInfo.deviceType);
    if (deviceInfo.browser) parts.push(deviceInfo.browser);
    if (deviceInfo.os) parts.push(deviceInfo.os);
    return parts.join(' • ');
  };

  const getStatusNotes = () => {
    if (!order.statusHistory || order.statusHistory.length === 0) return [];
    return order.statusHistory
      .filter((entry) => entry.note && entry.note.trim() !== '')
      .map((entry) => {
        let userEmail = null;
        let userName = null;
        if (entry.updatedBy && typeof entry.updatedBy === 'object') {
          userEmail = entry.updatedBy.email || null;
          userName = entry.updatedBy.contactPerson || entry.updatedBy.name || null;
        }
        return {
          status: entry.status,
          note: entry.note,
          timestamp: entry.timestamp,
          updatedByRole: entry.updatedByRole || 'system',
          updatedByEmail: userEmail,
          updatedByName: userName
        };
      });
  };

  const statusNotes = getStatusNotes();

  const isCancelled = order.orderStatus === 'cancelled';
  const isDelivered = order.orderStatus === 'delivered';
  const isCourierAssigned = order.orderStatus === 'courier_assigned';
  const isRejected = order.orderStatus === 'rejected';
  const isReturned = order.orderStatus === 'returned';
  const isPartialDelivery = order.orderStatus === 'partial_delivery';

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative bg-white rounded-2xl border border-black/30 shadow-2xl w-full max-w-4xl my-8 overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 bg-black text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaFileInvoice className="w-5 h-5" />
              <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>
                Order Details
              </h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">
            Order #{order.orderNumber || order._id?.slice(-8).toUpperCase()}
          </p>
        </div>

        <div className="p-5 max-h-[65vh] overflow-y-auto">
          {/* Status badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border ${statusInfo.color}`}>
              <StatusIcon className="w-3 h-3" />
              <span className="font-medium">Order: {statusInfo.label}</span>
            </span>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs border ${paymentInfo.color}`}>
              <FaMoneyBillWave className="w-3 h-3" />
              <span className="font-medium">Payment: {paymentInfo.label}</span>
              {order.paidAmount > 0 && (
                <span className="text-[10px] opacity-80">(৳{order.paidAmount.toFixed(2)})</span>
              )}
            </span>
          </div>

          {/* Device Info */}
          {order.deviceInfo && (
            <div className="mb-5 bg-[#E2E7EA]/50 rounded-xl p-3 border border-black/30">
              <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
                <FaGlobe className="w-3.5 h-3.5 text-black" />
                Device & Location Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B]">IP Address:</span>
                  <span className="font-mono text-black">{order.deviceInfo.ipAddress || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B]">Device:</span>
                  <span className="flex items-center gap-1 text-black">
                    {getDeviceIcon(order.deviceInfo.deviceType)}
                    {getDeviceInfo(order.deviceInfo) || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B]">Browser:</span>
                  <span className="text-black">
                    {order.deviceInfo.browser || 'N/A'} {order.deviceInfo.browserVersion || ''}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B]">OS:</span>
                  <span className="text-black">
                    {order.deviceInfo.os || 'N/A'} {order.deviceInfo.osVersion || ''}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Status banners */}
          {isDelivered && order.deliveredAt && (
            <div className="mb-5 bg-black/10 border-l-4 border-black rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaCheckDouble className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-black">Order Delivered</h4>
                  <p className="text-xs text-black/80 mt-1">
                    <span className="font-medium">Delivered on:</span>{' '}
                    {new Date(order.deliveredAt).toLocaleDateString('en-BD', {
                      day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {isPartialDelivery && (
            <div className="mb-5 bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaCheckDouble className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-yellow-700">Partial Delivery</h4>
                  <p className="text-xs text-yellow-600 mt-1">
                    Only part of this order has been delivered.
                  </p>
                  {(order.paidAmount > 0 || order.returnedAmount > 0) && (
                    <div className="mt-2 flex flex-wrap gap-3 text-xs">
                      {order.paidAmount > 0 && (
                        <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                          <FaMoneyBillWave className="inline w-2.5 h-2.5 mr-0.5" />
                          Paid: ৳{order.paidAmount.toFixed(2)}
                        </span>
                      )}
                      {order.returnedAmount > 0 && (
                        <span className="text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                          <FaUndo className="inline w-2.5 h-2.5 mr-0.5" />
                          Returned: ৳{order.returnedAmount.toFixed(2)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {isCancelled && order.cancellationReason && (
            <div className="mb-5 bg-red-50 border-l-4 border-red-500 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaExclamationTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-red-700">Order Cancelled</h4>
                  <p className="text-xs text-red-600 mt-1">
                    <span className="font-medium">Reason:</span> {order.cancellationReason}
                  </p>
                </div>
              </div>
            </div>
          )}

          {isRejected && order.rejectionReason && (
            <div className="mb-5 bg-orange-50 border-l-4 border-orange-500 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaTimesCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-orange-700">Order Rejected</h4>
                  <p className="text-xs text-orange-600 mt-1">
                    <span className="font-medium">Reason:</span> {order.rejectionReason}
                  </p>
                </div>
              </div>
            </div>
          )}

          {isReturned && (
            <div className="mb-5 bg-purple-50 border-l-4 border-purple-500 rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaUndo className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-purple-700">Order Returned</h4>
                  <p className="text-xs text-purple-600 mt-1">
                    This order has been returned.
                  </p>
                </div>
              </div>
            </div>
          )}

          {isCourierAssigned && order.deliveryService?.courierName && (
            <div className="mb-5 bg-black/10 border-l-4 border-black rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaTruck className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-black">Courier Assigned</h4>
                  <p className="text-xs text-black/80 mt-1">
                    <span className="font-medium">Courier:</span>{' '}
                    {order.deliveryService.courierName || 'N/A'}
                  </p>
                  {order.deliveryService.trackingNumber && (
                    <p className="text-xs text-black/80 mt-1">
                      <span className="font-medium">Tracking:</span>{' '}
                      {order.deliveryService.trackingNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Customer & Delivery info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-black/20">
              <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
                <FaUser className="w-3.5 h-3.5 text-black" />
                Customer Information
              </h3>
              <div className="space-y-1 text-xs">
                <p>
                  <span className="text-[#64748B]">Name:</span>{' '}
                  <span className="text-black font-medium">{order.customerInfo?.fullName}</span>
                </p>
                {order.customerInfo?.email && (
                  <p>
                    <span className="text-[#64748B]">Email:</span>{' '}
                    <span className="text-black">{order.customerInfo.email}</span>
                  </p>
                )}
                <p>
                  <span className="text-[#64748B]">Phone:</span>{' '}
                  <span className="text-black">{order.customerInfo?.phone}</span>
                </p>
                {order.customerInfo?.note && (
                  <p>
                    <span className="text-[#64748B]">Note:</span>{' '}
                    <span className="text-black">{order.customerInfo.note}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-black/20">
              <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
                <FaMapMarkerAlt className="w-3.5 h-3.5 text-black" />
                Delivery Information
              </h3>
              <div className="space-y-1 text-xs">
                <p>
                  <span className="text-[#64748B]">Division:</span>{' '}
                  <span className="font-medium text-black">{order.customerInfo?.division || 'N/A'}</span>
                </p>
                <p>
                  <span className="text-[#64748B]">District:</span>{' '}
                  <span className="font-medium text-black">{order.customerInfo?.city || 'N/A'}</span>
                </p>
                <p>
                  <span className="text-[#64748B]">Upazila/Thana:</span>{' '}
                  <span className="font-medium text-black">{order.customerInfo?.zone || 'N/A'}</span>
                </p>
                <p>
                  <span className="text-[#64748B]">Address:</span>{' '}
                  <span className="text-black">{order.customerInfo?.address}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-5">
            <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
              <FaBox className="w-3.5 h-3.5 text-black" />
              Order Items ({order.items?.length || 0})
            </h3>
            <div className="space-y-2">
              {order.items?.map((item, idx) => {
                const hasVariants = item.variantDetails && item.variantDetails.length > 0;
                const isExpanded = expandedProducts[idx] !== false;

                return (
                  <div key={idx} className="border border-black/20 rounded-xl overflow-hidden bg-white">
                    <div className="flex items-center gap-3 p-3 bg-[#E2E7EA]/30">
                      <img
                        src={item.image || 'https://via.placeholder.com/48?text=No+Image'}
                        alt={item.productName}
                        className="w-12 h-12 rounded-lg object-cover border border-black/20 flex-shrink-0"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/48?text=No+Image'; }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-black text-sm truncate">
                          {item.productName}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#64748B] mt-0.5">
                          <span>Qty: <strong className="text-black">{item.quantity}</strong></span>
                          <span>•</span>
                          <span>
                            Price:{' '}
                            <strong className="text-black">
                              ৳{(item.discountPrice > 0 ? item.discountPrice : item.regularPrice || 0).toFixed(2)}
                            </strong>
                          </span>
                          <span>•</span>
                          <span>
                            Total:{' '}
                            <strong className="text-black">
                              ৳{((item.discountPrice > 0 ? item.discountPrice : item.regularPrice || 0) * item.quantity).toFixed(2)}
                            </strong>
                          </span>
                          {hasVariants && (
                            <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                              {item.variantDetails.length} variant{item.variantDetails.length > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                      {hasVariants && (
                        <button
                          onClick={() => toggleProduct(idx)}
                          className="p-1.5 text-[#64748B] hover:text-black hover:bg-white rounded-lg transition-colors"
                        >
                          {isExpanded ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
                        </button>
                      )}
                    </div>

                    {hasVariants && isExpanded && (
                      <div className="p-3 space-y-2 bg-white">
                        {item.variantDetails.map((variant, vIdx) => {
                          const hasSub = variant.subVariants && variant.subVariants.length > 0;

                          if (hasSub) {
                            return (
                              <div key={vIdx} className="border-l-2 border-purple-300 pl-3">
                                <div className="flex items-center gap-2 mb-1">
                                  {variant.image && (
                                    <img
                                      src={variant.image}
                                      alt={variant.variantName}
                                      className="w-7 h-7 rounded object-cover border border-gray-200"
                                      onError={(e) => { e.target.src = 'https://via.placeholder.com/28?text=?'; }}
                                    />
                                  )}
                                  <span className="text-xs font-semibold text-purple-700">
                                    {variant.variantName}
                                  </span>
                                  <span className="text-[9px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded">
                                    Variant
                                  </span>
                                </div>
                                <div className="ml-3 space-y-1">
                                  {variant.subVariants.map((sub, sIdx) => (
                                    <div
                                      key={sIdx}
                                      className="flex items-center gap-2 text-xs bg-gray-50 rounded-lg px-2 py-1"
                                    >
                                      {sub.image && (
                                        <img
                                          src={sub.image}
                                          alt={sub.subVariantName}
                                          className="w-6 h-6 rounded object-cover border border-gray-200"
                                          onError={(e) => { e.target.src = 'https://via.placeholder.com/24?text=?'; }}
                                        />
                                      )}
                                      <span className="text-gray-800 font-medium">
                                        {sub.subVariantName}
                                      </span>
                                      <span className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded">
                                        Sub
                                      </span>
                                      <span className="ml-auto text-gray-600">
                                        Qty: <strong>{sub.quantity}</strong>
                                      </span>
                                      <span className="text-gray-600">
                                        ৳{(sub.subVariantDiscountPrice || sub.subVariantRegularPrice || 0).toFixed(2)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div
                              key={vIdx}
                              className="flex items-center gap-2 text-xs border-l-2 border-purple-300 pl-3 py-1"
                            >
                              {variant.image && (
                                <img
                                  src={variant.image}
                                  alt={variant.variantName}
                                  className="w-7 h-7 rounded object-cover border border-gray-200"
                                  onError={(e) => { e.target.src = 'https://via.placeholder.com/28?text=?'; }}
                                />
                              )}
                              <span className="text-purple-700 font-medium">
                                {variant.variantName}
                              </span>
                              <span className="text-[9px] bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded">
                                Variant
                              </span>
                              <span className="ml-auto text-gray-600">
                                Qty: <strong>{variant.quantity}</strong>
                              </span>
                              <span className="text-gray-600">
                                ৳{(variant.variantDiscountPrice || variant.variantRegularPrice || 0).toFixed(2)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {!hasVariants && item.colors && item.colors.length > 0 && (
                      <div className="p-3 bg-white space-y-1">
                        {item.colors.map((color, cIdx) => (
                          <div
                            key={cIdx}
                            className="flex items-center gap-2 text-xs bg-gray-50 rounded-lg px-2 py-1"
                          >
                            <span
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: color.color }}
                            />
                            <span className="font-medium text-gray-800">{color.color}</span>
                            <span className="ml-auto text-gray-600">
                              Qty: <strong>{color.quantity}</strong>
                            </span>
                            <span className="text-gray-600">
                              ৳{(color.price || 0).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-[#E2E7EA]/30 rounded-xl p-3 border border-black/20">
            <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
              <FaMoneyBillWave className="w-3.5 h-3.5 text-black" />
              Payment Summary
            </h3>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-[#64748B]">Subtotal:</span>
                <span className="text-black font-medium">৳{(order.subtotal || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748B]">Shipping:</span>
                <span className="text-black font-medium">৳{(order.shippingCost || 0).toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span className="font-medium">- ৳{order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-black/20 pt-1 mt-1">
                <span className="font-bold text-black text-sm">Total:</span>
                <span className="font-bold text-black text-sm">৳{(order.total || 0).toFixed(2)}</span>
              </div>
              {order.paidAmount > 0 && (
                <div className="flex justify-between text-green-600 font-bold">
                  <span>
                    <FaMoneyBillWave className="inline w-3 h-3 mr-1" />
                    Paid:
                  </span>
                  <span>৳{order.paidAmount.toFixed(2)}</span>
                </div>
              )}
              {order.returnedAmount > 0 && (
                <div className="flex justify-between text-purple-600 font-bold">
                  <span>
                    <FaUndo className="inline w-3 h-3 mr-1" />
                    Returned:
                  </span>
                  <span>৳{order.returnedAmount.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Per-Item Delivery Table */}
          {order.deliveryItems && order.deliveryItems.length > 0 && (
            <div className="mt-5">
              <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
                <FaTruck className="w-3.5 h-3.5 text-black" />
                Delivery Status (Per Item)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-[#E2E7EA]">
                    <tr>
                      <th className="px-2 py-1.5 text-left text-black">Product / Variant</th>
                      <th className="px-2 py-1.5 text-center text-black">Ordered</th>
                      <th className="px-2 py-1.5 text-center text-green-700">Delivered</th>
                      <th className="px-2 py-1.5 text-center text-purple-700">Returned</th>
                      <th className="px-2 py-1.5 text-center text-yellow-700">Pending</th>
                      <th className="px-2 py-1.5 text-center text-black">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.deliveryItems.map((di, idx) => {
                      const label = [di.productName, di.variantName, di.subVariantName]
                        .filter(Boolean)
                        .join(' / ');
                      const statusColor =
                        di.deliveryStatus === 'delivered'
                          ? 'bg-green-100 text-green-700 border-green-300'
                          : di.deliveryStatus === 'returned'
                          ? 'bg-purple-100 text-purple-700 border-purple-300'
                          : di.deliveryStatus === 'partial'
                          ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                          : 'bg-gray-100 text-gray-600 border-gray-300';
                      const statusLabel =
                        di.deliveryStatus === 'delivered'
                          ? 'Delivered'
                          : di.deliveryStatus === 'returned'
                          ? 'Returned'
                          : di.deliveryStatus === 'partial'
                          ? 'Partial'
                          : 'Pending';
                      const deliveredAmt = (di.deliveredQuantity || 0) * (di.unitPrice || 0);
                      const returnedAmt = (di.returnedQuantity || 0) * (di.unitPrice || 0);

                      return (
                        <tr key={di._id || idx} className="border-b border-gray-100">
                          <td className="px-2 py-1.5 text-black">
                            <div className="flex items-center gap-1.5">
                              {di.image && (
                                <img
                                  src={di.image}
                                  alt={di.productName}
                                  className="w-6 h-6 rounded object-cover border border-gray-200 flex-shrink-0"
                                  onError={(e) => { e.target.src = 'https://via.placeholder.com/24?text=?'; }}
                                />
                              )}
                              <div>
                                <div className="font-medium text-[11px]">{label}</div>
                                {di.selectedColor && (
                                  <div className="text-[9px] text-gray-500 flex items-center gap-1">
                                    <span
                                      className="inline-block w-3 h-3 rounded-full border border-gray-300"
                                      style={{ backgroundColor: di.selectedColor }}
                                    />
                                    {di.selectedColor}
                                  </div>
                                )}
                                {deliveredAmt > 0 && (
                                  <div className="text-[9px] text-green-600">+৳{deliveredAmt.toFixed(2)}</div>
                                )}
                                {returnedAmt > 0 && (
                                  <div className="text-[9px] text-purple-600">-৳{returnedAmt.toFixed(2)}</div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="text-center text-black font-medium px-2 py-1.5">
                            {di.orderedQuantity}
                          </td>
                          <td className="text-center text-green-700 font-medium px-2 py-1.5">
                            {di.deliveredQuantity || 0}
                          </td>
                          <td className="text-center text-purple-700 font-medium px-2 py-1.5">
                            {di.returnedQuantity || 0}
                          </td>
                          <td className="text-center text-yellow-700 font-medium px-2 py-1.5">
                            {di.pendingQuantity || 0}
                          </td>
                          <td className="text-center px-2 py-1.5">
                            <span
                              className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${statusColor}`}
                            >
                              {statusLabel}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="mt-5 bg-[#E2E7EA]/50 rounded-xl p-3 border border-black/30">
            <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
              <FaInfoCircle className="w-3.5 h-3.5 text-black" />
              Additional Information
            </h3>

            {order.orderPlatform && (
              <div className="mb-2">
                <p className="text-xs">
                  <span className="text-[#64748B]">Order Platform:</span>
                  <span className="text-black font-medium ml-1 capitalize">{order.orderPlatform}</span>
                </p>
              </div>
            )}

            {order.couponCode && (
              <div className="mb-2">
                <p className="text-xs">
                  <span className="text-[#64748B]">Coupon Applied:</span>
                  <span className="text-black font-medium ml-1">{order.couponCode}</span>
                </p>
              </div>
            )}

            {order.deliveryNote && (
              <div className="mb-2">
                <p className="text-xs">
                  <span className="text-[#64748B]">Order Note:</span>
                  <span className="text-black font-medium ml-1 whitespace-pre-wrap">
                    {order.deliveryNote}
                  </span>
                </p>
              </div>
            )}

            {statusNotes.length > 0 && (
              <div>
                <p className="text-xs font-medium text-black mb-1.5 flex items-center gap-1">
                  <FaClipboardList className="w-3 h-3 text-black" />
                  Status History Notes
                </p>
                <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1">
                  {statusNotes.map((note, index) => {
                    const sLabel = ORDER_STATUSES.find((s) => s.value === note.status)?.label || note.status;
                    const formattedDate = note.timestamp
                      ? new Date(note.timestamp).toLocaleString('en-BD', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      : '';

                    let updatedByDisplay = 'System';
                    if (note.updatedByEmail) updatedByDisplay = note.updatedByEmail;
                    else if (note.updatedByName) updatedByDisplay = note.updatedByName;
                    else if (note.updatedByRole && note.updatedByRole !== 'system')
                      updatedByDisplay = note.updatedByRole;

                    return (
                      <div key={index} className="bg-white rounded-lg p-2 border border-black/20">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-medium text-black">{sLabel}</span>
                          <span className="text-[10px] text-[#64748B]">{formattedDate}</span>
                        </div>
                        <p className="text-xs text-[#64748B] mt-0.5 break-words">{note.note}</p>
                        <span className="text-[10px] text-[#64748B]/60 mt-0.5 block">
                          Updated by: {updatedByDisplay}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-black/30 bg-[#E2E7EA]/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-black text-white rounded-xl hover:bg-[#485442] transition-colors text-sm"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================================
// STAT CARD
// ============================================================
const StatCard = ({ title, value, icon, color, subtitle }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm border border-black/20 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[#64748B] font-medium">{title}</p>
        <p className="text-xl font-bold text-black mt-0.5">{value?.toLocaleString() || 0}</p>
        {subtitle && <p className="text-[10px] text-[#64748B] mt-0.5">{subtitle}</p>}
      </div>
      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
    </div>
  </div>
);

// ============================================================
// MAIN PAGE
// ============================================================
export default function PlatformSaleDetailsPage() {
  const router = useRouter();

  const [activePlatform, setActivePlatform] = useState('website');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDateFilters, setShowDateFilters] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const fetchPlatformSales = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const params = new URLSearchParams({
        platform: activePlatform,
        page: currentPage,
        limit: 20
      });

      if (searchTerm.trim()) params.append('search', searchTerm.trim());
      if (statusFilter && statusFilter !== 'all') params.append('orderStatus', statusFilter);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await fetch(
        `http://localhost:5000/api/orders/admin/platform-sales?${params}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        toast.error(result.error || 'Failed to fetch platform sales');
      }
    } catch (error) {
      console.error('Fetch platform sales error:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  }, [activePlatform, currentPage, searchTerm, statusFilter, startDate, endDate, router]);

  useEffect(() => {
    fetchPlatformSales();
  }, [fetchPlatformSales]);

  const handlePlatformChange = (platform) => {
    setActivePlatform(platform);
    setCurrentPage(1);
    setStatusFilter('all');
    setSearchTerm('');
  };

  const handleClearDates = () => {
    setStartDate('');
    setEndDate('');
    setCurrentPage(1);
  };

  const selectedSummary = data?.platforms?.[activePlatform] || {
    totalOrders: 0,
    delivered: 0,
    partialDelivered: 0,
    cancelled: 0,
    returned: 0,
    rejected: 0,
    totalRevenue: 0,
    totalPaid: 0,
    totalRevenueDelivered: 0,
    totalCostDelivered: 0,
    totalProfit: 0,
    profitMargin: '0.00'
  };

  const orders = data?.orders || [];
  const pagination = data?.pagination || { total: 0, page: 1, pages: 1 };

  const getPlatformIcon = (platform) => {
    const p = PLATFORMS.find((x) => x.value === platform);
    return p ? p.icon : FaGlobe;
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  return (
    <ProtectedRoute pageKey="all_orders">
      <div className="min-h-screen bg-pink-100/20 pb-12 pt-6">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-black/25">
                <FaChartLine className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1
                  className="text-2xl md:text-3xl font-bold text-black"
                  style={{ fontFamily: '"Playfair Display"' }}
                >
                  Platform Sale Details
                </h1>
                <p className="text-sm text-[#64748B] mt-0.5">
                  Platform-wise order breakdown & profit margins
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowDateFilters(!showDateFilters)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-xl transition-colors text-sm ${
                showDateFilters
                  ? 'bg-black text-white border-black'
                  : 'bg-white border-black/30 text-black hover:bg-[#E2E7EA]'
              }`}
            >
              <FaCalendarAlt className="w-4 h-4" />
              Date Filter
              {(startDate || endDate) && (
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
              )}
              {showDateFilters ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
            </button>
          </div>

          {/* DATE FILTERS */}
          {showDateFilters && (
            <div className="bg-white rounded-2xl border border-black/30 p-4 mb-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-black mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 border border-black/30 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-black mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-3 py-2 border border-black/30 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black text-sm"
                  />
                </div>
                {(startDate || endDate) && (
                  <div className="flex items-end">
                    <button
                      onClick={handleClearDates}
                      className="px-4 py-2 bg-[#E2E7EA] text-black rounded-xl hover:bg-black/10 transition-colors text-sm"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* PLATFORM TABS */}
          <div className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {PLATFORMS.map((p) => {
                const Icon = p.icon;
                const summary = data?.platforms?.[p.value] || { totalOrders: 0 };
                const isActive = activePlatform === p.value;

                return (
                  <button
                    key={p.value}
                    onClick={() => handlePlatformChange(p.value)}
                    className={`relative p-4 rounded-2xl border-2 transition-all text-left ${
                      isActive
                        ? 'bg-black text-white border-black shadow-lg shadow-black/25'
                        : 'bg-white text-black border-black/20 hover:border-black/40 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-black'}`} />
                      <span className="font-bold text-sm">{p.label}</span>
                    </div>
                    <p className={`text-xl font-bold ${isActive ? 'text-white' : 'text-black'}`}>
                      {summary.totalOrders || 0}
                    </p>
                    <p className={`text-[10px] ${isActive ? 'text-white/70' : 'text-[#64748B]'}`}>
                      total orders
                    </p>
                    {isActive && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* LOADING */}
          {loading && !data && (
            <div className="bg-white rounded-2xl border border-black/30 p-12 shadow-sm flex flex-col items-center justify-center">
              <FaSpinner className="w-8 h-8 text-black animate-spin mb-3" />
              <p className="text-sm text-[#64748B]">Loading platform data...</p>
            </div>
          )}

          {/* RESULTS */}
          {data && (
            <>
              {/* STATS */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                <StatCard
                  title="Total Orders"
                  value={selectedSummary.totalOrders}
                  icon={<FaBox className="w-5 h-5 text-black" />}
                  color="bg-black/10"
                  subtitle="All statuses"
                />
                <StatCard
                  title="Delivered"
                  value={selectedSummary.delivered}
                  icon={<FaCheckDouble className="w-5 h-5 text-green-600" />}
                  color="bg-green-50"
                  subtitle="Completed"
                />
                <StatCard
                  title="Partial Delivery"
                  value={selectedSummary.partialDelivered}
                  icon={<FaCheckDouble className="w-5 h-5 text-yellow-600" />}
                  color="bg-yellow-50"
                  subtitle="Partially delivered"
                />
                <StatCard
                  title="Cancelled"
                  value={selectedSummary.cancelled}
                  icon={<FaBan className="w-5 h-5 text-red-600" />}
                  color="bg-red-50"
                  subtitle="Not fulfilled"
                />
                <StatCard
                  title="Returned"
                  value={selectedSummary.returned}
                  icon={<FaUndo className="w-5 h-5 text-purple-600" />}
                  color="bg-purple-50"
                  subtitle="Returned items"
                />
                <StatCard
                  title="Total Paid"
                  value={formatCurrency(selectedSummary.totalPaid)}
                  icon={<FaMoneyBillWave className="w-5 h-5 text-black" />}
                  color="bg-black/10"
                //   subtitle={`Paid: ${formatCurrency(selectedSummary.totalPaid)}`}
                />
              </div>

              {/* PROFIT MARGIN PANEL */}
              <div className="bg-white rounded-2xl border border-black/30 p-5 mb-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <FaPercentage className="w-5 h-5 text-black" />
                  <h2 className="text-lg font-bold text-black">
                    Profit Margin — {PLATFORMS.find((p) => p.value === activePlatform)?.label}
                  </h2>
                  <span className="text-xs text-[#64748B] bg-[#E2E7EA] px-2 py-0.5 rounded-full border border-black/20">
                    Delivered + Partial Delivery items
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="bg-[#E2E7EA]/40 rounded-xl p-3 border border-black/20">
                    <p className="text-xs text-[#64748B]">Delivered Revenue</p>
                    <p className="text-lg font-bold text-emerald-600">
                      {formatCurrency(selectedSummary.totalRevenueDelivered)}
                    </p>
                    <p className="text-[10px] text-[#64748B] mt-0.5">
                      From delivered + partial items
                    </p>
                  </div>
                  <div className="bg-[#E2E7EA]/40 rounded-xl p-3 border border-black/20">
                    <p className="text-xs text-[#64748B]">Delivered Cost</p>
                    <p className="text-lg font-bold text-orange-600">
                      {formatCurrency(selectedSummary.totalCostDelivered)}
                    </p>
                  </div>
                  <div className="bg-[#E2E7EA]/40 rounded-xl p-3 border border-black/20">
                    <p className="text-xs text-[#64748B]">Total Profit</p>
                    <p
                      className={`text-lg font-bold ${
                        selectedSummary.totalProfit > 0
                          ? 'text-emerald-600'
                          : selectedSummary.totalProfit < 0
                          ? 'text-red-600'
                          : 'text-black'
                      }`}
                    >
                      {formatCurrency(selectedSummary.totalProfit)}
                    </p>
                  </div>
                  <div className="bg-black/10 rounded-xl p-3 border border-black/20">
                    <p className="text-xs text-[#64748B]">Profit Margin</p>
                    <p
                      className={`text-lg font-bold ${
                        parseFloat(selectedSummary.profitMargin) > 0
                          ? 'text-emerald-600'
                          : parseFloat(selectedSummary.profitMargin) < 0
                          ? 'text-red-600'
                          : 'text-black'
                      }`}
                    >
                      {selectedSummary.profitMargin}%
                    </p>
                  </div>
                </div>

                {/* Cross-platform comparison */}
                <div className="mt-4 pt-4 border-t border-black/20">
                  <p className="text-xs font-semibold text-black mb-2 flex items-center gap-1">
                    <FaInfoCircle className="w-3 h-3" />
                    Profit Margin Comparison (All Platforms)
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {PLATFORMS.map((p) => {
                      const s = data.platforms[p.value];
                      const margin = parseFloat(s?.profitMargin || '0');
                      return (
                        <div
                          key={p.value}
                          className={`rounded-xl p-2 border ${
                            p.value === activePlatform
                              ? 'bg-black text-white border-black'
                              : 'bg-white border-black/20'
                          }`}
                        >
                          <p
                            className={`text-[10px] ${
                              p.value === activePlatform ? 'text-white/70' : 'text-[#64748B]'
                            }`}
                          >
                            {p.label}
                          </p>
                          <p
                            className={`text-sm font-bold ${
                              p.value === activePlatform
                                ? 'text-white'
                                : margin > 0
                                ? 'text-emerald-600'
                                : margin < 0
                                ? 'text-red-600'
                                : 'text-black'
                            }`}
                          >
                            {s?.profitMargin || '0.00'}%
                          </p>
                          <p
                            className={`text-[9px] ${
                              p.value === activePlatform ? 'text-white/60' : 'text-[#64748B]'
                            }`}
                          >
                            Profit: {formatCurrency(s?.totalProfit || 0)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* ORDERS TABLE */}
              <div className="bg-white rounded-2xl border border-black/30 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-black/30 flex flex-col md:flex-row gap-3 justify-between items-start md:items-center">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-black flex items-center gap-1.5">
                      {(() => {
                        const Icon = getPlatformIcon(activePlatform);
                        return <Icon className="w-4 h-4" />;
                      })()}
                      {PLATFORMS.find((p) => p.value === activePlatform)?.label} Orders
                    </span>
                    <span className="text-xs text-[#64748B] bg-[#E2E7EA] px-2 py-0.5 rounded-full border border-black/20">
                      {pagination.total} total
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-3.5 h-3.5" />
                      <input
                        type="text"
                        placeholder="Search order, customer..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                        className="w-full pl-9 pr-8 py-2 border border-black/30 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black text-sm"
                      />
                      {searchTerm && (
                        <button
                          onClick={() => {
                            setSearchTerm('');
                            setCurrentPage(1);
                          }}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#64748B] hover:text-black"
                        >
                          <FaTimes className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <select
                      value={statusFilter}
                      onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="px-3 py-2 border border-black/30 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="delivered">Delivered</option>
                      <option value="partial_delivery">Partial Delivery</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="returned">Returned</option>
                      <option value="placed">Placed</option>
                      <option value="processing">Processing</option>
                    </select>
                  </div>
                </div>

                {loading ? (
                  <div className="p-12 flex items-center justify-center">
                    <FaSpinner className="w-6 h-6 animate-spin text-black" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-[#E2E7EA] rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaBox className="w-6 h-6 text-[#64748B]" />
                    </div>
                    <p className="text-sm font-medium text-black mb-1">No orders found</p>
                    <p className="text-xs text-[#64748B]">
                      There are no orders matching the current filters.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                      <thead className="bg-[#E2E7EA]/50 border-b border-black/30">
                        <tr>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-[#64748B]">
                            Order ID
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-[#64748B]">
                            Customer
                          </th>
                          <th className="px-3 py-3 text-right text-xs font-semibold text-[#64748B]">
                            Total
                          </th>
                          <th className="px-3 py-3 text-right text-xs font-semibold text-[#64748B]">
                            Paid
                          </th>
                          <th className="px-3 py-3 text-center text-xs font-semibold text-[#64748B]">
                            Status
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold text-[#64748B]">
                            Date
                          </th>
                          <th className="px-3 py-3 text-center text-xs font-semibold text-[#64748B]">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => {
                          const statusInfo = getStatusInfo(order.orderStatus);
                          const StatusIcon = statusInfo.icon;
                          return (
                            <tr
                              key={order._id}
                              className="border-b border-black/20 hover:bg-[#E2E7EA]/30 transition-colors"
                            >
                              <td className="px-3 py-3 text-xs font-mono text-black whitespace-nowrap">
                                {order.orderNumber || order._id?.slice(-8).toUpperCase()}
                              </td>
                              <td className="px-3 py-3 text-xs">
                                <div className="font-medium text-black truncate max-w-[180px]">
                                  {order.customerInfo?.fullName}
                                </div>
                                <div className="text-[#64748B] text-[10px] truncate max-w-[180px]">
                                  {order.customerInfo?.phone}
                                </div>
                              </td>
                              <td className="px-3 py-3 text-xs text-right font-bold text-black whitespace-nowrap">
                                {formatCurrency(order.total)}
                              </td>
                              <td className="px-3 py-3 text-xs text-right whitespace-nowrap">
                                {order.paidAmount > 0 ? (
                                  <span className="font-medium text-green-600">
                                    {formatCurrency(order.paidAmount)}
                                  </span>
                                ) : (
                                  <span className="text-[#64748B]">—</span>
                                )}
                                {order.returnedAmount > 0 && (
                                  <div className="text-[10px] text-purple-600 font-medium">
                                    Ret: {formatCurrency(order.returnedAmount)}
                                  </div>
                                )}
                              </td>
                              <td className="px-3 py-3 text-center">
                                <span
                                  className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] border ${statusInfo.color}`}
                                >
                                  <StatusIcon className="w-2.5 h-2.5" />
                                  {statusInfo.label}
                                </span>
                              </td>
                              <td className="px-3 py-3 text-xs text-[#64748B] whitespace-nowrap">
                                {formatDate(order.createdAt)}
                              </td>
                              <td className="px-3 py-3 text-center">
                                <button
                                  onClick={() => handleViewOrder(order)}
                                  className="p-1.5 text-black hover:bg-[#E2E7EA] rounded transition-colors"
                                  title="View Details"
                                >
                                  <FaEye className="w-4 h-4" />
                                </button>
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
                  <div className="px-3 py-3 border-t border-black/30 flex items-center justify-between bg-[#E2E7EA]/20">
                    <p className="text-xs text-[#64748B]">
                      Showing {orders.length} of {pagination.total} orders
                    </p>
                    <div className="flex gap-1 items-center">
                      <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 border border-black/30 rounded-xl hover:bg-white disabled:opacity-50 transition"
                      >
                        <FaChevronLeft className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1 text-xs text-black">
                        Page {currentPage} of {pagination.pages}
                      </span>
                      <button
                        onClick={() => setCurrentPage((p) => Math.min(pagination.pages, p + 1))}
                        disabled={currentPage === pagination.pages}
                        className="p-1.5 border border-black/30 rounded-xl hover:bg-white disabled:opacity-50 transition"
                      >
                        <FaChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ORDER DETAILS MODAL */}
      <OrderDetailsModal
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedOrder(null);
        }}
        order={selectedOrder}
      />
    </ProtectedRoute>
  );
}