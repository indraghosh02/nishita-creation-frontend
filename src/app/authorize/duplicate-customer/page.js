'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import {
  FaSearch,
  FaSpinner,
  FaTimes,
  FaEye,
  FaBox,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaMoneyBillWave,
  FaUser,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTruck,
  FaUndo,
  FaCheckDouble,
  FaBan,
  FaFileInvoice,
  FaDownload,
  FaExclamationTriangle,
  FaInfoCircle,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaStore,
  FaExternalLinkAlt,
  FaUsers,
  FaChartLine,
  FaClipboardList,
  FaMobile,
  FaTablet,
  FaDesktop,
  FaLaptop,
  FaGlobe as FaGlobeIcon,
  FaChevronLeft,
  FaChevronRight,
  FaSync,
  FaChevronDown,
  FaChevronUp,
  FaHeart,
  FaStar,
  FaUserTag,
  FaHeadset,
  FaBoxOpen,
  FaLayerGroup
} from 'react-icons/fa';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// ========== ORDER STATUSES ==========
const ORDER_STATUSES = [
  { value: 'placed', label: 'Placed', color: 'bg-[#E2E7EA] text-black border-black/30', icon: FaClock },
  { value: 'follow_up', label: 'Follow Up', color: 'bg-[#E2E7EA] text-black border-black/30', icon: FaHeadset },
  { value: 'reminder', label: 'Reminder', color: 'bg-[#E2E7EA] text-black border-black/30', icon: FaClock },
  { value: 'accepted', label: 'Accepted', color: 'bg-[#E2E7EA] text-black border-black/30', icon: FaCheckCircle },
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

// ========== PAYMENT STATUSES ==========
const PAYMENT_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-[#E2E7EA] text-black border-black/30' },
  { value: 'partial', label: 'Partial Paid', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
  { value: 'paid', label: 'Paid', color: 'bg-black/10 text-black border-black/30' },
  { value: 'failed', label: 'Failed', color: 'bg-red-50 text-red-600 border-red-200' },
  { value: 'refunded', label: 'Refunded', color: 'bg-[#E2E7EA] text-black border-black/30' }
];

// ========== HELPERS ==========
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

const getPlatformBadge = (platform) => {
  const platforms = {
    website: { label: 'Website', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: FaGlobe },
    facebook: { label: 'Facebook', color: 'bg-indigo-50 text-indigo-700 border-indigo-200', icon: FaExternalLinkAlt },
    instagram: { label: 'Instagram', color: 'bg-pink-50 text-pink-700 border-pink-200', icon: FaExternalLinkAlt },
    showroom: { label: 'Showroom', color: 'bg-amber-50 text-amber-700 border-amber-200', icon: FaStore }
  };
  const info = platforms[platform] || platforms.website;
  const Icon = info.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border ${info.color}`}>
      <Icon className="w-2.5 h-2.5" />
      {info.label}
    </span>
  );
};

// ============================================================
// ORDER DETAILS MODAL (matches Orders page modal exactly)
// ============================================================
const OrderDetailsModal = ({ isOpen, onClose, order, onDownloadInvoice }) => {
  const [downloading, setDownloading] = useState(false);

  const getColorName = (color) => {
    const colorMap = {
      '#000000': 'Black', '#FFFFFF': 'White', '#FF0000': 'Red',
      '#00FF00': 'Green', '#0000FF': 'Blue', '#FFFF00': 'Yellow',
      '#FF00FF': 'Magenta', '#00FFFF': 'Cyan', '#FFA500': 'Orange',
      '#800080': 'Purple', '#008000': 'Dark Green', '#FFC0CB': 'Pink',
      '#A52A2A': 'Brown', '#808080': 'Gray', '#C0C0C0': 'Silver',
    };
    return colorMap[color] || color;
  };

  const getColorDisplay = (item) => {
    if (item.colors && Array.isArray(item.colors) && item.colors.length > 0) {
      const hasValidColors = item.colors.some(c =>
        c.color && c.color !== 'null' && c.color !== '' && c.color !== 'undefined'
      );
      if (hasValidColors) {
        return item.colors
          .filter(c => c.color && c.color !== 'null' && c.color !== '' && c.color !== 'undefined')
          .map(c => ({
            color: c.color,
            quantity: c.quantity || 0,
            price: c.price || item.discountPrice || item.regularPrice
          }));
      }
    }

    if (item.selectedColor &&
        item.selectedColor !== 'null' &&
        item.selectedColor !== '' &&
        item.selectedColor !== 'undefined') {
      return [{
        color: item.selectedColor,
        quantity: item.quantity || 0,
        price: item.discountPrice || item.regularPrice
      }];
    }

    return [];
  };

  const groupItemsForDisplay = (items) => {
    if (!items || items.length === 0) return [];

    const productGroups = {};

    items.forEach(item => {
      const productId = item.productId?.toString() || 'unknown';

      if (!productGroups[productId]) {
        productGroups[productId] = {
          productId: productId,
          productName: item.productName,
          productSlug: item.productSlug || '',
          image: item.image || '',
          regularPrice: item.regularPrice,
          discountPrice: item.discountPrice || 0,
          unit: item.unit || 'pcs',
          stockQuantity: item.stockQuantity || 0,
          hasVariants: false,
          hasSubVariants: false,
          items: [],
          variantDetails: item.variantDetails || []
        };
      }

      productGroups[productId].items.push(item);

      if (item.isVariant || item.isSubVariant || (item.variantDetails && item.variantDetails.length > 0)) {
        productGroups[productId].hasVariants = true;
      }

      if (item.isSubVariant) {
        productGroups[productId].hasSubVariants = true;
      }

      if (item.variantDetails && item.variantDetails.length > 0) {
        item.variantDetails.forEach(variant => {
          if (variant.subVariants && variant.subVariants.length > 0) {
            productGroups[productId].hasSubVariants = true;
          }
        });
      }
    });

    const result = [];

    Object.values(productGroups).forEach(group => {
      const baseItems = group.items.filter(item =>
        !item.isVariant &&
        !item.isSubVariant &&
        item.isBaseProduct !== false
      );

      const variantItems = group.items.filter(item =>
        item.isVariant === true &&
        !item.isSubVariant
      );

      const subVariantItems = group.items.filter(item =>
        item.isSubVariant === true
      );

      const hasNestedVariants = group.variantDetails && group.variantDetails.length > 0;

      const rows = [];
      const hasAnyVariants = variantItems.length > 0 || subVariantItems.length > 0 || hasNestedVariants;

      // Base product row
      if (baseItems.length > 0) {
        let totalBaseQuantity = 0;
        let totalBasePrice = 0;
        let baseColor = null;
        let hasBaseColor = false;

        baseItems.forEach(item => {
          const colorData = getColorDisplay(item);
          const price = item.discountPrice || item.regularPrice || 0;
          totalBaseQuantity += item.quantity || 0;
          totalBasePrice += price * (item.quantity || 0);

          if (colorData.length > 0 && !hasBaseColor) {
            baseColor = colorData[0].color;
            hasBaseColor = true;
          }
        });

        let variantTotalQuantity = 0;
        let variantTotalPrice = 0;

        variantItems.forEach(v => {
          const price = v.variantDiscountPrice > 0 ? v.variantDiscountPrice :
                       v.variantRegularPrice > 0 ? v.variantRegularPrice :
                       v.discountPrice || v.regularPrice || 0;
          variantTotalQuantity += v.quantity || 0;
          variantTotalPrice += price * (v.quantity || 0);
        });

        subVariantItems.forEach(s => {
          const price = s.variantDiscountPrice > 0 ? s.variantDiscountPrice :
                       s.variantRegularPrice > 0 ? s.variantRegularPrice :
                       s.discountPrice || s.regularPrice || 0;
          variantTotalQuantity += s.quantity || 0;
          variantTotalPrice += price * (s.quantity || 0);
        });

        if (hasNestedVariants) {
          group.variantDetails.forEach(v => {
            if (v.subVariants && v.subVariants.length > 0) {
              v.subVariants.forEach(s => {
                const price = s.subVariantDiscountPrice > 0 ? s.subVariantDiscountPrice :
                             s.subVariantRegularPrice > 0 ? s.subVariantRegularPrice :
                             v.variantRegularPrice || 0;
                variantTotalQuantity += s.quantity || 0;
                variantTotalPrice += price * (s.quantity || 0);
              });
            } else {
              const price = v.variantDiscountPrice > 0 ? v.variantDiscountPrice :
                           v.variantRegularPrice > 0 ? v.variantRegularPrice : 0;
              variantTotalQuantity += v.quantity || 0;
              variantTotalPrice += price * (v.quantity || 0);
            }
          });
        }

        const finalQuantity = hasAnyVariants ? variantTotalQuantity : totalBaseQuantity;
        const finalTotal = hasAnyVariants ? variantTotalPrice : totalBasePrice;

        rows.push({
          type: 'base',
          id: 'base',
          name: group.productName,
          displayName: group.productName,
          image: group.image,
          price: finalQuantity > 0 ? (finalTotal / finalQuantity) : 0,
          quantity: finalQuantity,
          total: finalTotal,
          unit: group.unit || 'pcs',
          color: baseColor,
          hasColor: hasBaseColor,
          isBase: true,
          isVariant: false,
          isSubVariant: false,
          indent: 0,
          badge: 'Product',
          parentName: null,
          grandParentName: null,
          variantId: null,
          subVariantId: null,
          originalPrice: null,
          hasDiscount: false,
          variantName: null,
          subVariantName: null,
          showPrice: !hasAnyVariants
        });
      }

      // Variant rows
      variantItems.forEach(item => {
        const colorData = getColorDisplay(item);
        const hasColor = colorData.length > 0;
        const price = item.variantDiscountPrice > 0 ? item.variantDiscountPrice :
                     item.variantRegularPrice > 0 ? item.variantRegularPrice :
                     item.discountPrice || item.regularPrice || 0;
        const quantity = item.quantity || 0;
        const total = price * quantity;
        const originalPrice = item.variantRegularPrice > 0 && item.variantDiscountPrice > 0 ? item.variantRegularPrice : null;
        const hasDiscount = originalPrice && originalPrice > price;

        rows.push({
          type: 'variant',
          id: item.variantId || `variant-${rows.length}`,
          name: item.variantName || 'Variant',
          displayName: item.variantName || 'Variant',
          image: item.image || group.image,
          price: price,
          originalPrice: originalPrice,
          hasDiscount: hasDiscount,
          quantity: quantity,
          total: total,
          unit: group.unit || 'pcs',
          color: hasColor ? colorData[0].color : null,
          hasColor: hasColor,
          isBase: false,
          isVariant: true,
          isSubVariant: false,
          indent: 1,
          parentName: group.productName,
          badge: 'Variant',
          variantId: item.variantId,
          subVariantId: null,
          grandParentName: null,
          variantName: item.variantName,
          subVariantName: null,
          showPrice: true
        });
      });

      // Sub-variant rows
      subVariantItems.forEach(item => {
        const colorData = getColorDisplay(item);
        const hasColor = colorData.length > 0;
        const price = item.variantDiscountPrice > 0 ? item.variantDiscountPrice :
                     item.variantRegularPrice > 0 ? item.variantRegularPrice :
                     item.discountPrice || item.regularPrice || 0;
        const quantity = item.quantity || 0;
        const total = price * quantity;
        const originalPrice = item.variantRegularPrice > 0 && item.variantDiscountPrice > 0 ? item.variantRegularPrice : null;
        const hasDiscount = originalPrice && originalPrice > price;

        let parentVariantName = item.variantName || 'Variant';
        const parentVariant = variantItems.find(v => v.variantId === item.variantId);
        if (parentVariant) {
          parentVariantName = parentVariant.variantName || 'Variant';
        }

        rows.push({
          type: 'subVariant',
          id: item.subVariantId || `sub-${rows.length}`,
          name: item.subVariantName || 'Sub-Variant',
          displayName: item.subVariantName || 'Sub-Variant',
          image: item.image || group.image,
          price: price,
          originalPrice: originalPrice,
          hasDiscount: hasDiscount,
          quantity: quantity,
          total: total,
          unit: group.unit || 'pcs',
          color: hasColor ? colorData[0].color : null,
          hasColor: hasColor,
          isBase: false,
          isVariant: false,
          isSubVariant: true,
          indent: 2,
          parentName: parentVariantName,
          grandParentName: group.productName,
          badge: 'Sub',
          variantId: item.variantId,
          subVariantId: item.subVariantId,
          variantName: parentVariantName,
          subVariantName: item.subVariantName,
          showPrice: true
        });
      });

      // Nested variantDetails
      if (hasNestedVariants && rows.filter(r => r.isVariant || r.isSubVariant).length === 0) {
        group.variantDetails.forEach(variant => {
          const hasSubVariants = variant.subVariants && variant.subVariants.length > 0;

          if (hasSubVariants) {
            rows.push({
              type: 'variant',
              id: variant.variantId || `variant-${rows.length}`,
              name: variant.variantName || 'Variant',
              displayName: variant.variantName || 'Variant',
              image: variant.image || group.image,
              price: 0,
              originalPrice: null,
              hasDiscount: false,
              quantity: 0,
              total: 0,
              unit: group.unit || 'pcs',
              color: variant.selectedColor || null,
              hasColor: !!variant.selectedColor,
              isBase: false,
              isVariant: true,
              isSubVariant: false,
              indent: 1,
              parentName: group.productName,
              badge: 'Variant',
              variantId: variant.variantId,
              subVariantId: null,
              grandParentName: null,
              variantName: variant.variantName,
              subVariantName: null,
              isHeader: true,
              showPrice: false
            });

            variant.subVariants.forEach(sub => {
              const subPrice = sub.subVariantDiscountPrice > 0 ? sub.subVariantDiscountPrice :
                              sub.subVariantRegularPrice > 0 ? sub.subVariantRegularPrice :
                              variant.variantRegularPrice || 0;
              const subQuantity = sub.quantity || 0;
              const subTotal = subPrice * subQuantity;
              const subOriginalPrice = sub.subVariantRegularPrice > 0 && sub.subVariantDiscountPrice > 0 ? sub.subVariantRegularPrice : null;
              const subHasDiscount = subOriginalPrice && subOriginalPrice > subPrice;

              rows.push({
                type: 'subVariant',
                id: sub.subVariantId || `sub-${rows.length}`,
                name: sub.subVariantName || 'Sub-Variant',
                displayName: sub.subVariantName || 'Sub-Variant',
                image: sub.image || variant.image || group.image,
                price: subPrice,
                originalPrice: subOriginalPrice,
                hasDiscount: subHasDiscount,
                quantity: subQuantity,
                total: subTotal,
                unit: group.unit || 'pcs',
                color: sub.selectedColor || variant.selectedColor || null,
                hasColor: !!(sub.selectedColor || variant.selectedColor),
                isBase: false,
                isVariant: false,
                isSubVariant: true,
                indent: 2,
                parentName: variant.variantName || 'Variant',
                grandParentName: group.productName,
                badge: 'Sub',
                variantId: variant.variantId,
                subVariantId: sub.subVariantId,
                variantName: variant.variantName,
                subVariantName: sub.subVariantName,
                showPrice: true
              });
            });
          } else {
            const price = variant.variantDiscountPrice > 0 ? variant.variantDiscountPrice :
                         variant.variantRegularPrice > 0 ? variant.variantRegularPrice : 0;
            const quantity = variant.quantity || 1;
            const total = price * quantity;
            const originalPrice = variant.variantRegularPrice > 0 && variant.variantDiscountPrice > 0 ? variant.variantRegularPrice : null;
            const hasDiscount = originalPrice && originalPrice > price;

            rows.push({
              type: 'variant',
              id: variant.variantId || `variant-${rows.length}`,
              name: variant.variantName || 'Variant',
              displayName: variant.variantName || 'Variant',
              image: variant.image || group.image,
              price: price,
              originalPrice: originalPrice,
              hasDiscount: hasDiscount,
              quantity: quantity,
              total: total,
              unit: group.unit || 'pcs',
              color: variant.selectedColor || null,
              hasColor: !!variant.selectedColor,
              isBase: false,
              isVariant: true,
              isSubVariant: false,
              indent: 1,
              parentName: group.productName,
              badge: 'Variant',
              variantId: variant.variantId,
              subVariantId: null,
              grandParentName: null,
              variantName: variant.variantName,
              subVariantName: null,
              showPrice: true
            });
          }
        });
      }

      // Fallback
      if (rows.length === 0 && group.items.length > 0) {
        const firstItem = group.items[0];
        const colorData = getColorDisplay(firstItem);
        const hasColor = colorData.length > 0;
        const price = firstItem.discountPrice || firstItem.regularPrice || 0;
        const quantity = firstItem.quantity || 0;
        const total = price * quantity;

        rows.push({
          type: 'base',
          id: 'base',
          name: group.productName,
          displayName: group.productName,
          image: group.image,
          price: price,
          quantity: quantity,
          total: total,
          unit: group.unit || 'pcs',
          color: hasColor ? colorData[0].color : null,
          hasColor: hasColor,
          isBase: true,
          isVariant: false,
          isSubVariant: false,
          indent: 0,
          badge: 'Product',
          parentName: null,
          grandParentName: null,
          variantId: null,
          subVariantId: null,
          originalPrice: null,
          hasDiscount: false,
          variantName: null,
          subVariantName: null,
          showPrice: true
        });
      }

      result.push({
        productId: group.productId,
        productName: group.productName,
        image: group.image,
        hasVariants: group.hasVariants,
        hasSubVariants: group.hasSubVariants,
        rows: rows,
        totalQuantity: rows.reduce((sum, row) => sum + row.quantity, 0),
        subtotal: rows.reduce((sum, row) => sum + row.total, 0)
      });
    });

    return result;
  };

  if (!isOpen || !order) return null;

  const statusInfo = ORDER_STATUSES.find(s => s.value === order.orderStatus);
  const paymentInfo = PAYMENT_STATUSES.find(p => p.value === order.paymentStatus);

  const isCancelled = order.orderStatus === 'cancelled';
  const isDelivered = order.orderStatus === 'delivered';
  const isCourierAssigned = order.orderStatus === 'courier_assigned';
  const isRejected = order.orderStatus === 'rejected';
  const isReturned = order.orderStatus === 'returned';
  const isPartialDelivery = order.orderStatus === 'partial_delivery';

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await onDownloadInvoice(order);
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download invoice');
    } finally {
      setDownloading(false);
    }
  };

  const getDeviceIcon = (deviceType) => {
    switch(deviceType?.toLowerCase()) {
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
      .filter(entry => entry.note && entry.note.trim() !== '')
      .map(entry => {
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
  const groupedItems = groupItemsForDisplay(order.items || []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative bg-white rounded-2xl border border-black/30 shadow-2xl w-full max-w-4xl my-8 overflow-hidden"
      >
        <div className="p-4 bg-black text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaFileInvoice className="w-5 h-5" />
              <h2 className="text-lg font-bold" style={{ fontFamily: '"Playfair Display"' }}>Order Details</h2>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
              <FaTimes className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-white/80 mt-1">Order #{order.orderNumber || order._id?.slice(-8).toUpperCase()}</p>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {/* Status badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border ${statusInfo?.color || 'bg-[#E2E7EA] text-black border-black/30'}`}>
              {statusInfo?.icon && <statusInfo.icon className="w-3 h-3" />}
              <span className="font-medium">Order: {statusInfo?.label || order.orderStatus}</span>
            </span>
            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border ${paymentInfo?.color || 'bg-[#E2E7EA] text-black border-black/30'}`}>
              <FaMoneyBillWave className="w-3 h-3" />
              <span className="font-medium">Payment: {paymentInfo?.label || order.paymentStatus}</span>
              {order.paidAmount > 0 && (
                <span className="text-[10px] opacity-80">(৳{order.paidAmount.toFixed(2)})</span>
              )}
            </span>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs border bg-[#E2E7EA] text-black border-black/30 hover:bg-white transition-colors disabled:opacity-50"
            >
              {downloading ? <FaSpinner className="w-3 h-3 animate-spin" /> : <FaDownload className="w-3 h-3" />}
              Invoice
            </button>
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
                  <span className="text-black">{order.deviceInfo.browser || 'N/A'} {order.deviceInfo.browserVersion || ''}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B]">OS:</span>
                  <span className="text-black">{order.deviceInfo.os || 'N/A'} {order.deviceInfo.osVersion || ''}</span>
                </div>
              </div>
            </div>
          )}

          {/* Delivered banner */}
          {isDelivered && order.deliveredAt && (
            <div className="mb-5 bg-black/10 border-l-4 border-black rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaCheckDouble className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-black">Order Delivered</h4>
                  <p className="text-xs text-black/80 mt-1">
                    <span className="font-medium">Delivered on:</span> {new Date(order.deliveredAt).toLocaleDateString('en-BD', {
                      day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Partial delivery banner */}
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

          {/* Cancelled banner */}
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

          {/* Rejected banner */}
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

          {/* Returned banner */}
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

          {/* Courier Assigned banner */}
          {isCourierAssigned && order.deliveryService && (
            <div className="mb-5 bg-black/10 border-l-4 border-black rounded-xl p-3">
              <div className="flex items-start gap-2">
                <FaTruck className="w-4 h-4 text-black mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-black">Courier Assigned</h4>
                  <p className="text-xs text-black/80 mt-1">
                    <span className="font-medium">Courier:</span> {order.deliveryService.courierName || 'N/A'}
                  </p>
                  {order.deliveryService.trackingNumber && (
                    <p className="text-xs text-black/80 mt-1">
                      <span className="font-medium">Tracking:</span> {order.deliveryService.trackingNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Customer & Delivery info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-black/30">
              <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
                <FaUser className="w-3.5 h-3.5 text-black" />
                Customer Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-[#64748B]">Name:</span> <span className="text-black font-medium">{order.customerInfo?.fullName}</span></p>
                <p><span className="text-[#64748B]">Email:</span> <span className="text-black">{order.customerInfo?.email}</span></p>
                <p><span className="text-[#64748B]">Phone:</span> <span className="text-black">{order.customerInfo?.phone}</span></p>
                {order.customerInfo?.note && (
                  <p><span className="text-[#64748B]">Note:</span> <span className="text-black">{order.customerInfo.note}</span></p>
                )}
              </div>
            </div>

            <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-black/30">
              <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
                <FaMapMarkerAlt className="w-3.5 h-3.5 text-black" />
                Delivery Information
              </h3>
              <div className="space-y-1 text-xs">
                <p><span className="text-[#64748B]">Division:</span> <span className="font-medium text-black">{order.customerInfo?.division || 'N/A'}</span></p>
                <p><span className="text-[#64748B]">District/City:</span> <span className="font-medium text-black">{order.customerInfo?.city || 'N/A'}</span></p>
                <p><span className="text-[#64748B]">Upazila/Thana:</span> <span className="font-medium text-black">{order.customerInfo?.zone || 'N/A'}</span></p>
                {order.customerInfo?.area && (
                  <p><span className="text-[#64748B]">Union/Area:</span> <span className="font-medium text-black">{order.customerInfo.area}</span></p>
                )}
                <p><span className="text-[#64748B]">Address:</span> <span className="text-black">{order.customerInfo?.address}</span></p>
              </div>
            </div>
          </div>

          {/* ========== ORDER ITEMS TABLE ========== */}
          <div className="mb-5">
            <h3 className="font-semibold text-black text-sm mb-2 flex items-center gap-1.5">
              <FaBox className="w-3.5 h-3.5 text-black" />
              Order Items
            </h3>

            {groupedItems.length === 0 ? (
              <p className="text-sm text-[#64748B]">No items found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-[#E2E7EA]">
                    <tr>
                      <th className="px-2 py-1.5 text-left text-black">#</th>
                      <th className="px-2 py-1.5 text-left text-black">Product / Variant</th>
                      <th className="px-2 py-1.5 text-center text-black">Qty</th>
                      <th className="px-2 py-1.5 text-center text-black hidden sm:table-cell">Unit</th>
                      <th className="px-2 py-1.5 text-right text-black hidden sm:table-cell">Price</th>
                      <th className="px-2 py-1.5 text-right text-black">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedItems.map((productGroup, groupIndex) => {
                      const rows = productGroup.rows || [];
                      const hasVariants = productGroup.hasVariants;
                      if (rows.length === 0) return null;
                      let rowNumber = groupIndex + 1;

                      return rows.map((row, rowIndex) => {
                        const indent = row.indent || 0;
                        const paddingLeft = indent === 0 ? 'pl-1' : indent === 1 ? 'pl-4 sm:pl-5' : 'pl-7 sm:pl-9';
                        const showRowNumber = row.isBase ? rowNumber : '';

                        const showPrice = row.showPrice !== false && !row.isHeader && !(row.isBase && hasVariants);
                        const price = row.price || 0;
                        const quantity = row.quantity || 0;
                        const total = row.total || (price * quantity);
                        const isHeaderRow = row.isHeader === true;
                        const rowImage = row.image || null;

                        return (
                          <tr key={`${groupIndex}-${rowIndex}`} className={`border-b border-gray-100 hover:bg-gray-50/50 ${rowIndex === 0 ? 'border-t border-gray-200' : ''}`}>
                            <td className="py-1.5 px-1.5 text-gray-500 text-[8px] sm:text-xs align-middle">{showRowNumber}</td>
                            <td className={`py-1.5 px-1.5 ${paddingLeft} align-middle`}>
                              <div className="flex items-center gap-1.5">
                                {rowImage ? (
                                  <img
                                    src={rowImage}
                                    alt={row.name}
                                    className={`rounded object-cover border border-gray-200 flex-shrink-0 ${
                                      indent === 0 ? 'w-6 h-6 sm:w-8 sm:h-8' :
                                      indent === 1 ? 'w-5 h-5 sm:w-6 sm:h-6' :
                                      'w-4 h-4 sm:w-5 sm:h-5'
                                    }`}
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/32?text=No+Image'; }}
                                  />
                                ) : (
                                  indent > 0 && <span className="text-gray-400 text-[10px] sm:text-xs flex-shrink-0">▸</span>
                                )}
                                <div className="flex flex-wrap items-center gap-0.5 sm:gap-1">
                                  <span className={`break-words ${isHeaderRow ? 'font-bold text-purple-700' : row.isBase ? 'font-semibold text-gray-900' : row.isVariant ? 'font-medium text-gray-800' : 'text-gray-700'} ${isHeaderRow ? 'text-xs sm:text-sm' : 'text-[9px] sm:text-xs'}`}>
                                    {row.displayName || row.name || 'Product'}
                                  </span>
                                  {row.badge && (
                                    <span className={`text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded ml-1 ${row.badge === 'Product' ? 'bg-gray-100 text-gray-500' : row.badge === 'Variant' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                                      {row.badge}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="text-center py-1.5 px-1.5 text-gray-700 text-[9px] sm:text-xs font-medium align-middle">
                              {isHeaderRow ? '-' : quantity}
                            </td>
                            <td className="text-center py-1.5 px-1.5 text-gray-500 text-[8px] sm:text-xs hidden sm:table-cell align-middle">{row.unit || 'pcs'}</td>
                            <td className="text-right py-1.5 px-1.5 text-gray-700 text-[8px] sm:text-xs hidden sm:table-cell align-middle">
                              {isHeaderRow || !showPrice ? '-' : `৳${price.toFixed(2)}`}
                            </td>
                            <td className="text-right py-1.5 px-1.5 font-medium text-gray-900 text-[9px] sm:text-xs align-middle">
                              {isHeaderRow ? '-' : `৳${total.toFixed(2)}`}
                            </td>
                          </tr>
                        );
                      });
                    })}
                  </tbody>
                  <tfoot className="border-t border-black/30">
                    <tr>
                      <td colSpan="5" className="px-2 py-1 text-right font-medium text-black">Subtotal:</td>
                      <td className="px-2 py-1 text-right text-black">৳{order.subtotal?.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="5" className="px-2 py-1 text-right font-medium text-black">Shipping:</td>
                      <td className="px-2 py-1 text-right text-black">৳{order.shippingCost?.toFixed(2)}</td>
                    </tr>
                    {order.discount > 0 && (
                      <tr className="text-green-600">
                        <td colSpan="5" className="px-2 py-1 text-right font-medium">Discount:</td>
                        <td className="px-2 py-1 text-right font-medium">- ৳{order.discount.toFixed(2)}</td>
                      </tr>
                    )}
                    <tr className="text-sm font-bold">
                      <td colSpan="5" className="px-2 py-1 text-right text-black">Total:</td>
                      <td className="px-2 py-1 text-right text-black">৳{order.total?.toFixed(2)}</td>
                    </tr>
                    {order.paidAmount > 0 && (
                      <tr className="text-green-600 font-bold">
                        <td colSpan="5" className="px-2 py-1 text-right">
                          <FaMoneyBillWave className="inline w-3 h-3 mr-1" />
                          Paid:
                        </td>
                        <td className="px-2 py-1 text-right">৳{order.paidAmount.toFixed(2)}</td>
                      </tr>
                    )}
                    {order.returnedAmount > 0 && (
                      <tr className="text-purple-600 font-bold">
                        <td colSpan="5" className="px-2 py-1 text-right">
                          <FaUndo className="inline w-3 h-3 mr-1" />
                          Returned Value:
                        </td>
                        <td className="px-2 py-1 text-right">৳{order.returnedAmount.toFixed(2)}</td>
                      </tr>
                    )}
                  </tfoot>
                </table>
              </div>
            )}
          </div>

          {/* ========== DELIVERY STATUS PER ITEM ========== */}
          {order.deliveryItems && order.deliveryItems.length > 0 && (
            <div className="mb-5">
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
                        .filter(Boolean).join(' / ');
                      const statusColor =
                        di.deliveryStatus === 'delivered' ? 'bg-green-100 text-green-700 border-green-300'
                        : di.deliveryStatus === 'returned' ? 'bg-purple-100 text-purple-700 border-purple-300'
                        : di.deliveryStatus === 'partial' ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                        : 'bg-gray-100 text-gray-600 border-gray-300';
                      const statusLabel =
                        di.deliveryStatus === 'delivered' ? 'Delivered'
                        : di.deliveryStatus === 'returned' ? 'Returned'
                        : di.deliveryStatus === 'partial' ? 'Partial'
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
                                    <span className="inline-block w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: di.selectedColor }} />
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
                          <td className="text-center text-black font-medium px-2 py-1.5">{di.orderedQuantity}</td>
                          <td className="text-center text-green-700 font-medium px-2 py-1.5">{di.deliveredQuantity || 0}</td>
                          <td className="text-center text-purple-700 font-medium px-2 py-1.5">{di.returnedQuantity || 0}</td>
                          <td className="text-center text-yellow-700 font-medium px-2 py-1.5">{di.pendingQuantity || 0}</td>
                          <td className="text-center px-2 py-1.5">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${statusColor}`}>
                              {statusLabel}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {(order.paidAmount > 0 || order.returnedAmount > 0) && (
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-xl flex flex-wrap items-center gap-2 text-xs">
                  <FaMoneyBillWave className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-700">
                    <strong>Collected:</strong> ৳{(order.paidAmount || 0).toFixed(2)}
                  </span>
                  {order.returnedAmount > 0 && (
                    <span className="text-purple-700">
                      <strong>Returned value:</strong> ৳{(order.returnedAmount || 0).toFixed(2)}
                    </span>
                  )}
                  <span className="text-[#64748B] ml-auto">
                    Total: ৳{(order.total || 0).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* ========== ADDITIONAL INFO ========== */}
          <div className="bg-[#E2E7EA]/50 rounded-xl p-3 border border-black/30">
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
                  <span className="text-black font-medium ml-1 whitespace-pre-wrap">{order.deliveryNote}</span>
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
                    const statusLabel = ORDER_STATUSES.find(s => s.value === note.status)?.label || note.status;
                    const formattedDate = note.timestamp ? new Date(note.timestamp).toLocaleString('en-BD', {
                      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    }) : '';

                    let updatedByDisplay = 'System';
                    if (note.updatedByEmail) updatedByDisplay = note.updatedByEmail;
                    else if (note.updatedByName) updatedByDisplay = note.updatedByName;
                    else if (note.updatedByRole && note.updatedByRole !== 'system') updatedByDisplay = note.updatedByRole;

                    return (
                      <div key={index} className="bg-white rounded-lg p-2 border border-black/20">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-medium text-black">{statusLabel}</span>
                          <span className="text-[10px] text-[#64748B]">{formattedDate}</span>
                        </div>
                        <p className="text-xs text-[#64748B] mt-0.5 break-words">{note.note}</p>
                        {updatedByDisplay && (
                          <span className="text-[10px] text-[#64748B]/60 mt-0.5 block">
                            Updated by: {updatedByDisplay}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-black/30 bg-[#E2E7EA]/20 flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1.5 bg-black text-white rounded-xl hover:shadow-lg hover:shadow-black/25 transition-all text-sm">
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
export default function DuplicateCustomerPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [summary, setSummary] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [expandedCustomers, setExpandedCustomers] = useState({});
  const [statusFilter, setStatusFilter] = useState('all');
  const debounceRef = useRef(null);

  // ============================================================
  // SEARCH
  // ============================================================
  const performSearch = useCallback(async (query) => {
    if (!query || query.trim().length < 1) {
      setCustomers([]);
      setAllOrders([]);
      setSummary(null);
      setSearched(false);
      return;
    }

    setSearching(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/orders/duplicate-customers/search?query=${encodeURIComponent(query.trim())}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const data = await response.json();

      if (data.success) {
        setCustomers(data.data.customers || []);
        setAllOrders(data.data.orders || []);
        setSummary(data.data.summary || null);
        setSearched(true);

        // Auto-expand all customers when there are few
        if ((data.data.customers || []).length <= 3) {
          const expanded = {};
          (data.data.customers || []).forEach((c, i) => {
            expanded[i] = true;
          });
          setExpandedCustomers(expanded);
        } else {
          setExpandedCustomers({});
        }

        if (data.data.orders.length === 0) {
          toast.info('No orders found for this customer');
        } else {
          toast.success(`Found ${data.data.orders.length} order(s)`);
        }
      } else {
        toast.error(data.error || 'Search failed');
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Network error while searching');
    } finally {
      setSearching(false);
    }
  }, [router]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      performSearch(value);
    }, 500);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    performSearch(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setCustomers([]);
    setAllOrders([]);
    setSummary(null);
    setSearched(false);
    setStatusFilter('all');
  };

  // ============================================================
  // FILTER ORDERS BY STATUS TAB
  // ============================================================
  const filteredOrders = allOrders.filter((order) => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'active') {
      return !['delivered', 'cancelled', 'returned', 'rejected', 'partial_delivery'].includes(
        order.orderStatus
      );
    }
    return order.orderStatus === statusFilter;
  });

  // ============================================================
  // DOWNLOAD INVOICE
  // ============================================================
  const handleDownloadInvoice = async (order) => {
    const { generateInvoicePDF } = await import('@/utils/invoicePDF');
    await generateInvoicePDF(order);
  };

  // ============================================================
  // TOGGLE CUSTOMER EXPANSION
  // ============================================================
  const toggleCustomer = (idx) => {
    setExpandedCustomers((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <ProtectedRoute pageKey="all_orders">
      <div className="min-h-screen bg-pink-100/20 pb-12 pt-6">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* ========== HEADER ========== */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-black/25">
                <FaUsers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1
                  className="text-2xl md:text-3xl font-bold text-black"
                  style={{ fontFamily: '"Playfair Display"' }}
                >
                  Duplicate Customer
                </h1>
                <p className="text-sm text-[#64748B] mt-0.5">
                  Search customer by name or email to view their full order history
                </p>
              </div>
            </div>
          </div>

          {/* ========== SEARCH BAR ========== */}
          <div className="bg-white rounded-2xl border border-black/30 p-4 mb-6 shadow-sm">
            <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by customer name or email address..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-10 py-2.5 border border-black/30 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent bg-[#E2E7EA]/20 hover:bg-white transition text-black placeholder:text-[#64748B]"
                  autoFocus
                />
                {searching && (
                  <FaSpinner className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4 animate-spin" />
                )}
                {!searching && searchTerm && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#64748B] hover:text-black transition-colors"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={searching || !searchTerm.trim()}
                className="px-6 py-2.5 bg-black text-white rounded-xl hover:shadow-lg hover:shadow-black/25 transition-all text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {searching ? (
                  <>
                    <FaSpinner className="w-4 h-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <FaSearch className="w-4 h-4" />
                    Search
                  </>
                )}
              </button>
            </form>
            <p className="text-[11px] text-[#64748B] mt-2 flex items-center gap-1">
              <FaInfoCircle className="w-3 h-3" />
              Type at least 1 character to search by name or email. Results update automatically.
            </p>
          </div>

          {/* ========== SEARCHING STATE ========== */}
          {searching && !searched && (
            <div className="bg-white rounded-2xl border border-black/30 p-12 shadow-sm flex flex-col items-center justify-center">
              <FaSpinner className="w-8 h-8 text-black animate-spin mb-3" />
              <p className="text-sm text-[#64748B]">Searching for customer orders...</p>
            </div>
          )}

          {/* ========== EMPTY STATE ========== */}
          {!searching && searched && allOrders.length === 0 && (
            <div className="bg-white rounded-2xl border border-black/30 p-12 shadow-sm flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-[#E2E7EA] rounded-full flex items-center justify-center mb-3">
                <FaSearch className="w-6 h-6 text-[#64748B]" />
              </div>
              <p className="text-base font-medium text-black mb-1">No orders found</p>
              <p className="text-sm text-[#64748B] text-center max-w-md">
                No customer matches &quot;{searchTerm}&quot;. Try a different name or email address.
              </p>
            </div>
          )}

          {/* ========== INITIAL STATE ========== */}
          {!searching && !searched && (
            <div className="bg-white rounded-2xl border border-black/30 p-12 shadow-sm flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-[#E2E7EA] rounded-full flex items-center justify-center mb-3">
                <FaUserTag className="w-6 h-6 text-[#64748B]" />
              </div>
              <p className="text-base font-medium text-black mb-1">Search for a customer</p>
              <p className="text-sm text-[#64748B] text-center max-w-md">
                Enter a customer name or email address above to view their complete order history,
                status counts, and total paid amount.
              </p>
            </div>
          )}

          {/* ========== RESULTS ========== */}
          {!searching && searched && allOrders.length > 0 && summary && (
            <>
              {/* ========== STATS CARDS ========== */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                <StatCard
                  title="Total Orders"
                  value={summary.totalOrders}
                  icon={<FaBox className="w-5 h-5 text-black" />}
                  color="bg-black/10"
                  subtitle="All statuses"
                />
                <StatCard
                  title="Delivered"
                  value={summary.delivered}
                  icon={<FaCheckDouble className="w-5 h-5 text-green-600" />}
                  color="bg-green-50"
                  subtitle="Completed"
                />
                <StatCard
                  title="Cancelled"
                  value={summary.cancelled}
                  icon={<FaBan className="w-5 h-5 text-red-600" />}
                  color="bg-red-50"
                  subtitle="Not fulfilled"
                />
                <StatCard
                  title="Partial Delivery"
                  value={summary.partialDelivered}
                  icon={<FaCheckDouble className="w-5 h-5 text-yellow-600" />}
                  color="bg-yellow-50"
                  subtitle="Partially delivered"
                />
                <StatCard
                  title="Returned"
                  value={summary.returned}
                  icon={<FaUndo className="w-5 h-5 text-purple-600" />}
                  color="bg-purple-50"
                  subtitle="Returned items"
                />
                <StatCard
                  title="Total Paid"
                  value={`৳${(summary.totalPaidAmount || 0).toFixed(2)}`}
                  icon={<FaMoneyBillWave className="w-5 h-5 text-black" />}
                  color="bg-black/10"
                  subtitle={`of ৳${(summary.totalOrderAmount || 0).toFixed(2)}`}
                />
              </div>

              {/* ========== CUSTOMER SUMMARY ========== */}
              <div className="bg-white rounded-2xl border border-black/30 p-4 mb-6 shadow-sm">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-black to-[#485442] rounded-full flex items-center justify-center text-white font-semibold">
                      {customers[0]?.fullName?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <p className="font-semibold text-black">{customers[0]?.fullName || 'Unknown'}</p>
                      <p className="text-xs text-[#64748B]">
                        {customers[0]?.email || 'No email'} • {customers[0]?.phone || 'No phone'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-black/10 text-black border border-black/20">
                      <FaUsers className="w-3 h-3" />
                      {customers.length} unique customer{customers.length > 1 ? 's' : ''}
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-black/10 text-black border border-black/20">
                      <FaBox className="w-3 h-3" />
                      {allOrders.length} order{allOrders.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>

              {/* ========== FILTER TABS ========== */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                      statusFilter === 'all'
                        ? 'bg-black text-white shadow-lg shadow-black/25'
                        : 'bg-white text-[#64748B] hover:bg-[#E2E7EA] border border-black/30'
                    }`}
                  >
                    All Orders ({allOrders.length})
                  </button>
                  <button
                    onClick={() => setStatusFilter('active')}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                      statusFilter === 'active'
                        ? 'bg-black text-white shadow-lg shadow-black/25'
                        : 'bg-white text-[#64748B] hover:bg-[#E2E7EA] border border-black/30'
                    }`}
                  >
                    Active ({summary.placed})
                  </button>
                  <button
                    onClick={() => setStatusFilter('delivered')}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                      statusFilter === 'delivered'
                        ? 'bg-green-600 text-white shadow-lg shadow-green-600/25'
                        : 'bg-white text-[#64748B] hover:bg-[#E2E7EA] border border-black/30'
                    }`}
                  >
                    Delivered ({summary.delivered})
                  </button>
                  <button
                    onClick={() => setStatusFilter('cancelled')}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                      statusFilter === 'cancelled'
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                        : 'bg-white text-[#64748B] hover:bg-[#E2E7EA] border border-black/30'
                    }`}
                  >
                    Cancelled ({summary.cancelled})
                  </button>
                  <button
                    onClick={() => setStatusFilter('partial_delivery')}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                      statusFilter === 'partial_delivery'
                        ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-600/25'
                        : 'bg-white text-[#64748B] hover:bg-[#E2E7EA] border border-black/30'
                    }`}
                  >
                    Partial ({summary.partialDelivered})
                  </button>
                  <button
                    onClick={() => setStatusFilter('returned')}
                    className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                      statusFilter === 'returned'
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                        : 'bg-white text-[#64748B] hover:bg-[#E2E7EA] border border-black/30'
                    }`}
                  >
                    Returned ({summary.returned})
                  </button>
                </div>
              </div>

              {/* ========== ORDERS TABLE ========== */}
              <div className="bg-white rounded-2xl border border-black/30 shadow-sm overflow-hidden">
                <div className="w-full overflow-x-auto">
                  <table className="w-full min-w-[900px]">
                    <thead className="bg-[#E2E7EA]/50 border-b border-black/30">
                      <tr>
                        <th className="px-3 py-3 text-left text-xs font-semibold text-[#64748B] whitespace-nowrap">
                          Order ID
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-semibold text-[#64748B] whitespace-nowrap">
                          Customer
                        </th>
                        <th className="px-3 py-3 text-right text-xs font-semibold text-[#64748B] whitespace-nowrap">
                          Order Amount
                        </th>
                        <th className="px-3 py-3 text-right text-xs font-semibold text-[#64748B] whitespace-nowrap">
                          Paid
                        </th>
                        <th className="px-3 py-3 text-center text-xs font-semibold text-[#64748B] whitespace-nowrap">
                          Status
                        </th>
                        <th className="px-3 py-3 text-center text-xs font-semibold text-[#64748B] whitespace-nowrap">
                          Platform
                        </th>
                        <th className="px-3 py-3 text-left text-xs font-semibold text-[#64748B] whitespace-nowrap">
                          Date
                        </th>
                        <th className="px-3 py-3 text-center text-xs font-semibold text-[#64748B] whitespace-nowrap">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="px-4 py-8 text-center text-[#64748B] text-sm">
                            No orders match the selected filter
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order, idx) => {
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
                              <td className="px-3 py-3 text-xs text-right whitespace-nowrap">
                                <div className="font-bold text-black">৳{(order.total || 0).toFixed(2)}</div>
                              </td>
                              <td className="px-3 py-3 text-xs text-right whitespace-nowrap">
                                {order.paidAmount > 0 ? (
                                  <div className="font-medium text-green-600">
                                    ৳{order.paidAmount.toFixed(2)}
                                  </div>
                                ) : (
                                  <span className="text-[#64748B]">—</span>
                                )}
                                {order.returnedAmount > 0 && (
                                  <div className="text-[10px] text-purple-600 font-medium">
                                    Ret: ৳{order.returnedAmount.toFixed(2)}
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
                              <td className="px-3 py-3 text-center">
                                {getPlatformBadge(order.orderPlatform)}
                              </td>
                              <td className="px-3 py-3 text-xs text-[#64748B] whitespace-nowrap">
                                {formatDate(order.createdAt)}
                              </td>
                              <td className="px-3 py-3 text-center">
                                <button
                                  onClick={() => {
                                    setSelectedOrder(order);
                                    setShowDetailsModal(true);
                                  }}
                                  className="p-1.5 text-black hover:bg-[#E2E7EA] rounded transition-colors"
                                  title="View Details"
                                >
                                  <FaEye className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ========== ORDER DETAILS MODAL ========== */}
        <OrderDetailsModal
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedOrder(null);
          }}
          order={selectedOrder}
          onDownloadInvoice={handleDownloadInvoice}
        />
      </div>
    </ProtectedRoute>
  );
}