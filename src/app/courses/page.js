// app/courses/page.jsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo, useRef } from 'react';
import { toast } from 'sonner';
import {
  Calendar,
  Clock,
  BookOpen,
  Users,
  Search,
  Loader2,
  X,
  Phone,
  Mail,
  MapPin,
  Facebook,
  MessageCircle,
  User,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Clock3,
  XCircle,
  Award,
  Sparkles,
} from 'lucide-react';
import Navbar from '@/app/components/layout/Navbar';
import Footer from '@/app/components/layout/Footer';
import { useNavbar } from '@/app/hooks/useNavbar';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

/* =========================================================
   BRAND + FONTS
========================================================= */
const BRAND = '#CC1D34';
const ACCENT_SAGE = '#8B9D83';
const ACCENT_SAGE_DARK = '#6b7d63';
const DARK_TEXT = '#29362f';
const MUTED_TEXT = '#687169';

const FONT_HEADING = "'Fraunces', serif";
const FONT_BODY = "'Plus Jakarta Sans', 'Inter', sans-serif";

/* =========================================================
   SAFE DATE FORMATTERS  (year always shown)
========================================================= */
const safeDate = (d) => {
  if (!d) return null;
  const date = new Date(d);
  if (isNaN(date.getTime())) return null;
  return date;
};

const formatRangeDate = (d) => {
  const date = safeDate(d);
  if (!date) return '—';
  // "10 Jan 2025" — always with year
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const formatClosesDate = (d) => {
  const date = safeDate(d);
  if (!date) return '—';
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

/* =========================================================
   ANIMATIONS
========================================================= */
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const scaleFade = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

/* =========================================================
   LOGO HELPER
========================================================= */
const getLogoUrl = (url) => {
  if (!url) return '/logo.png';
  if (url.includes('cloudinary.com')) {
    const parts = url.split('/upload/');
    if (parts.length === 2) {
      return `${parts[0]}/upload/f_auto,q_auto:good,fl_preserve_transparency/${parts[1]}`;
    }
  }
  return url;
};

/* =========================================================
   REGISTRATION MODAL  (unchanged)
========================================================= */
const RegistrationModal = ({ isOpen, onClose, course, user, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    facebookId: '',
    whatsappNumber: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.contactPerson || user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        address: user.address || '',
        whatsappNumber: user.whatsapp || '',
      }));
    }
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(?:01|8801)\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid Bangladeshi phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${API_URL}/api/courses/${course._id}/register`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...formData,
          clientDeviceInfo: {
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            language: navigator.language,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        if (data.data.isAutoConfirmed) {
          toast.success('Registration confirmed successfully!');
        } else {
          toast.success('Registration submitted! Please wait for confirmation.');
        }
        onSuccess?.();
      } else {
        toast.error(data.error || 'Failed to register');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Failed to register. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#18221d]/85 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl max-h-[90vh] overflow-hidden rounded-[24px] bg-[#f7f4ef] shadow-[0_24px_80px_-12px_rgba(0,0,0,0.5)] flex flex-col"
          >
            <div className="relative px-6 sm:px-8 pt-6 sm:pt-8 pb-5 border-b border-black/5">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 text-[#687169] hover:text-[#29362f] rounded-full hover:bg-black/5 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-3.5 w-3.5" style={{ color: BRAND }} />
                <span
                  className="text-[9px] font-semibold uppercase tracking-[0.28em]"
                  style={{ fontFamily: FONT_BODY, color: BRAND }}
                >
                  Enrollment
                </span>
              </div>

              <h2
                className="text-[24px] sm:text-[28px] font-light leading-[1.1] tracking-[-0.02em] text-[#29362f]"
                style={{ fontFamily: FONT_HEADING }}
              >
                {course?.courseName}
              </h2>
            </div>

            {success ? (
              <div className="p-8 sm:p-10 text-center">
                <div
                  className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(139,157,131,0.12)' }}
                >
                  <CheckCircle
                    className="h-8 w-8"
                    style={{ color: ACCENT_SAGE }}
                  />
                </div>
                <h3
                  className="text-[22px] sm:text-[26px] font-light text-[#29362f] mb-2"
                  style={{ fontFamily: FONT_HEADING }}
                >
                  Registration Submitted
                </h3>
                <p
                  className="text-[12px] sm:text-sm text-[#687169] mb-6 leading-relaxed max-w-sm mx-auto"
                  style={{ fontFamily: FONT_BODY }}
                >
                  {user &&
                  ['super_admin', 'admin', 'moderator', 'call_center_agent'].includes(
                    user.role
                  )
                    ? 'Your registration has been automatically confirmed.'
                    : 'Your registration is pending. We will contact you soon to confirm.'}
                </p>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-[11px] font-semibold uppercase tracking-[0.15em] transition-all hover:opacity-90"
                  style={{ backgroundColor: BRAND, fontFamily: FONT_BODY }}
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="px-6 sm:px-8 py-4 bg-white/60 border-b border-black/5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p
                        className="text-[9px] uppercase tracking-[0.2em] text-[#8a938a] mb-1"
                        style={{ fontFamily: FONT_BODY }}
                      >
                        Course Fee
                      </p>
                      <p
                        className="text-[15px] font-semibold"
                        style={{ fontFamily: FONT_HEADING, color: BRAND }}
                      >
                        ৳{course?.courseFee?.toLocaleString()}
                      </p>
                    </div>
                    {course?.contactNumber && (
                      <div>
                        <p
                          className="text-[9px] uppercase tracking-[0.2em] text-[#8a938a] mb-1"
                          style={{ fontFamily: FONT_BODY }}
                        >
                          Contact
                        </p>
                        <a
                          href={`tel:${course.contactNumber}`}
                          className="text-[12px] font-medium text-[#29362f] hover:underline flex items-center gap-1"
                          style={{ fontFamily: FONT_BODY }}
                        >
                          <Phone className="h-3 w-3" />
                          {course.contactNumber}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-4"
                >
                  {user && (
                    <div
                      className="p-3 rounded-xl flex items-start gap-2"
                      style={{
                        backgroundColor: 'rgba(139,157,131,0.08)',
                        border: '1px solid rgba(139,157,131,0.2)',
                      }}
                    >
                      <CheckCircle
                        className="h-3.5 w-3.5 mt-0.5 flex-shrink-0"
                        style={{ color: ACCENT_SAGE }}
                      />
                      <p
                        className="text-[11px] leading-relaxed"
                        style={{ fontFamily: FONT_BODY, color: ACCENT_SAGE_DARK }}
                      >
                        Your info has been pre-filled from your account.
                      </p>
                    </div>
                  )}

                  <FormField
                    label="Full Name"
                    required
                    icon={User}
                    error={errors.fullName}
                  >
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-[13px] outline-none transition-all focus:ring-2 ${
                        errors.fullName
                          ? 'border-red-300 focus:ring-red-100'
                          : 'border-black/10 focus:border-transparent'
                      }`}
                      style={{ fontFamily: FONT_BODY }}
                      placeholder="Enter your full name"
                      onFocus={(e) => {
                        if (!errors.fullName)
                          e.currentTarget.style.boxShadow = `0 0 0 3px rgba(139,157,131,0.15)`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.boxShadow = '';
                      }}
                    />
                  </FormField>

                  <FormField
                    label="Phone Number"
                    required
                    icon={Phone}
                    error={errors.phone}
                  >
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-[13px] outline-none transition-all focus:ring-2 ${
                        errors.phone
                          ? 'border-red-300 focus:ring-red-100'
                          : 'border-black/10 focus:border-transparent'
                      }`}
                      style={{ fontFamily: FONT_BODY }}
                      placeholder="01XXXXXXXXX"
                      onFocus={(e) => {
                        if (!errors.phone)
                          e.currentTarget.style.boxShadow = `0 0 0 3px rgba(139,157,131,0.15)`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.boxShadow = '';
                      }}
                    />
                  </FormField>

                  <FormField label="Email" icon={Mail} optional>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 bg-white border border-black/10 rounded-xl text-[13px] outline-none transition-all"
                      style={{ fontFamily: FONT_BODY }}
                      placeholder="your@email.com"
                      onFocus={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 0 3px rgba(139,157,131,0.15)`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.boxShadow = '';
                      }}
                    />
                  </FormField>

                  <FormField
                    label="Address"
                    required
                    icon={MapPin}
                    error={errors.address}
                    iconTop
                  >
                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      rows={2}
                      className={`w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-[13px] outline-none resize-none transition-all focus:ring-2 ${
                        errors.address
                          ? 'border-red-300 focus:ring-red-100'
                          : 'border-black/10 focus:border-transparent'
                      }`}
                      style={{ fontFamily: FONT_BODY }}
                      placeholder="Your full address"
                      onFocus={(e) => {
                        if (!errors.address)
                          e.currentTarget.style.boxShadow = `0 0 0 3px rgba(139,157,131,0.15)`;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.boxShadow = '';
                      }}
                    />
                  </FormField>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField label="Facebook ID" icon={Facebook} optional>
                      <input
                        type="text"
                        value={formData.facebookId}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            facebookId: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 bg-white border border-black/10 rounded-xl text-[13px] outline-none transition-all"
                        style={{ fontFamily: FONT_BODY }}
                        placeholder="facebook.com/username"
                        onFocus={(e) => {
                          e.currentTarget.style.boxShadow = `0 0 0 3px rgba(139,157,131,0.15)`;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.boxShadow = '';
                        }}
                      />
                    </FormField>

                    <FormField label="WhatsApp" icon={MessageCircle} optional>
                      <input
                        type="tel"
                        value={formData.whatsappNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            whatsappNumber: e.target.value,
                          })
                        }
                        className="w-full pl-10 pr-4 py-3 bg-white border border-black/10 rounded-xl text-[13px] outline-none transition-all"
                        style={{ fontFamily: FONT_BODY }}
                        placeholder="01XXXXXXXXX"
                        onFocus={(e) => {
                          e.currentTarget.style.boxShadow = `0 0 0 3px rgba(139,157,131,0.15)`;
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.boxShadow = '';
                        }}
                      />
                    </FormField>
                  </div>

                  <div
                    className="p-3 rounded-xl flex items-start gap-2"
                    style={{
                      backgroundColor: 'rgba(204,29,52,0.04)',
                      border: '1px solid rgba(204,29,52,0.12)',
                    }}
                  >
                    <AlertCircle
                      className="h-3.5 w-3.5 mt-0.5 flex-shrink-0"
                      style={{ color: BRAND }}
                    />
                    <p
                      className="text-[11px] leading-relaxed"
                      style={{ fontFamily: FONT_BODY, color: '#8a2530' }}
                    >
                      After registration, our team will contact you to confirm
                      enrollment and share payment details.
                    </p>
                  </div>
                </form>

                <div className="px-6 sm:px-8 py-4 border-t border-black/5 bg-white/60 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#687169] hover:text-[#29362f] transition-colors"
                    style={{ fontFamily: FONT_BODY }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-white text-[11px] font-semibold uppercase tracking-[0.12em] transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_14px_-4px_rgba(204,29,52,0.5)]"
                    style={{ backgroundColor: BRAND, fontFamily: FONT_BODY }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Submitting
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-3.5 w-3.5" />
                        Register
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* =========================================================
   FORM FIELD HELPER
========================================================= */
function FormField({ label, required, optional, icon: Icon, error, children, iconTop }) {
  return (
    <div>
      <label
        className="flex items-center gap-1 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#687169]"
        style={{ fontFamily: FONT_BODY }}
      >
        {label}
        {required && <span style={{ color: BRAND }}>*</span>}
        {optional && (
          <span className="text-[#8a938a] normal-case tracking-normal font-normal text-[10px] ml-1">
            (optional)
          </span>
        )}
      </label>
      <div className="relative">
        {Icon && (
          <Icon
            className={`absolute left-3.5 h-4 w-4 text-[#8a938a] pointer-events-none ${
              iconTop ? 'top-3.5' : 'top-1/2 -translate-y-1/2'
            }`}
          />
        )}
        {children}
      </div>
      {error && (
        <p
          className="text-[10px] text-red-500 mt-1"
          style={{ fontFamily: FONT_BODY }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   COURSE CARD — COMPACT
   - Image height reduced (aspect 16/11 → 16/9)
   - Padding tightened
   - Date range pill + Closes moved to a single bottom row
   - Bottom row layout: [Closes date]  [CTA button]
========================================================= */
const CourseCard = ({ course, onRegister, userRegistration, index, logo }) => {
  const now = new Date();
  const regDeadline = safeDate(course.registrationDeadline);
  const isBeforeDeadline = regDeadline ? now <= regDeadline : false;
  const isFull =
    course.maxRegistrations !== null &&
    (course.confirmedRegistrations || 0) >= course.maxRegistrations;
  const canRegister = isBeforeDeadline && !isFull && course.isRegistrationOpen;

  const hasRegistered = !!userRegistration;
  const registrationStatus = userRegistration?.status;

  const getStatusBadge = () => {
    if (!isBeforeDeadline) {
      return {
        label: 'Closed',
        className: 'bg-[#f3e2e3] text-[#8a2530]',
        dot: '#8a2530',
      };
    }
    if (isFull) {
      return {
        label: 'Full',
        className: 'bg-[#f5e9d8] text-[#8a5a1f]',
        dot: '#8a5a1f',
      };
    }
    return {
      label: 'Open',
      className: 'bg-[#e4ecdd] text-[#4d6642]',
      dot: '#4d6642',
    };
  };

  const statusBadge = getStatusBadge();
  const hasImage = !!course.image;

  return (
    <motion.div
      variants={scaleFade}
      custom={index}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-[16px] bg-white ring-1 transition-all duration-300 hover:shadow-[0_18px_40px_-18px_rgba(41,54,47,0.25)] ${
        hasRegistered && registrationStatus === 'confirmed'
          ? 'ring-2 ring-[#8B9D83]/40'
          : hasRegistered && registrationStatus === 'pending'
          ? 'ring-2 ring-[#d4a04a]/40'
          : 'ring-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_6px_20px_-12px_rgba(0,0,0,0.1)]'
      }`}
    >
      {/* IMAGE / LOGO FALLBACK — shorter aspect for a compact card */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[#f7f4ef]">
        {hasImage ? (
          <img
            src={course.image}
            alt={course.courseName}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#f7f4ef] via-[#f0ebe2] to-[#e8e2d6]">
            <div className="absolute inset-0 opacity-[0.35]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] aspect-square rounded-full border border-[#8B9D83]/20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45%] aspect-square rounded-full border border-[#8B9D83]/15" />
            </div>

            {logo?.logoUrl ? (
              <img
                src={getLogoUrl(logo.logoUrl)}
                alt={logo.text || 'Logo'}
                className="relative z-10 max-h-[55%] max-w-[55%] object-contain drop-shadow-[0_4px_12px_rgba(41,54,47,0.08)] transition-transform duration-700 group-hover:scale-[1.04]"
              />
            ) : (
              <div className="relative z-10 flex flex-col items-center text-center px-4">
                <span
                  className="text-[20px] sm:text-[22px] font-light leading-none tracking-[-0.02em] text-[#29362f]"
                  style={{ fontFamily: FONT_HEADING }}
                >
                  {logo?.text || "Nishat's Collection"}
                </span>
                {logo?.highlightText && (
                  <span
                    className="mt-1 text-[8px] font-semibold uppercase tracking-[0.35em]"
                    style={{ fontFamily: FONT_BODY, color: BRAND }}
                  >
                    {logo.highlightText}
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Overlay */}
        {hasImage ? (
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none" />
        ) : (
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#29362f]/25 to-transparent pointer-events-none" />
        )}

        {/* Status Badge — top left */}
        <div className="absolute top-2.5 left-2.5 z-20">
          <div
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-[0.12em] ${statusBadge.className}`}
            style={{ fontFamily: FONT_BODY }}
          >
            <span
              className="inline-block w-1 h-1 rounded-full"
              style={{ backgroundColor: statusBadge.dot }}
            />
            {statusBadge.label}
          </div>
        </div>

        {/* Registration Badge — top right */}
        {hasRegistered &&
          (registrationStatus === 'confirmed' || registrationStatus === 'pending') && (
            <div className="absolute top-2.5 right-2.5 z-20">
              <div
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-[0.12em] text-white shadow-lg ${
                  registrationStatus === 'confirmed'
                    ? 'bg-[#4d6642]'
                    : 'bg-[#a67c2e]'
                }`}
                style={{ fontFamily: FONT_BODY }}
              >
                {registrationStatus === 'confirmed' ? (
                  <>
                    <CheckCircle className="h-2 w-2" />
                    Registered
                  </>
                ) : (
                  <>
                    <Clock3 className="h-2 w-2" />
                    Pending
                  </>
                )}
              </div>
            </div>
          )}

        {/* Fee — bottom left */}
        <div className="absolute bottom-2.5 left-2.5 z-20">
          <p
            className={`text-[7px] uppercase tracking-[0.22em] mb-0.5 ${
              hasImage ? 'text-white/70' : 'text-white/85'
            }`}
            style={{ fontFamily: FONT_BODY }}
          >
            Course Fee
          </p>
          <p
            className="text-[18px] font-light leading-none text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
            style={{ fontFamily: FONT_HEADING }}
          >
            ৳{course.courseFee?.toLocaleString()}
          </p>
        </div>
      </div>

      {/* BODY — compact spacing */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <h3
          className="text-[16px] sm:text-[17px] font-light leading-[1.2] tracking-[-0.01em] text-[#29362f] mb-1.5 line-clamp-2"
          style={{ fontFamily: FONT_HEADING }}
        >
          {course.courseName}
        </h3>

        {/* Description */}
        <p
          className="text-[11px] leading-[1.55] text-[#687169] mb-3 line-clamp-2"
          style={{ fontFamily: FONT_BODY }}
        >
          {course.courseDetails}
        </p>

        {/* Date range pill — now with year */}
        <div
          className="mb-3 inline-flex items-center gap-1.5 self-start rounded-full px-2.5 py-1"
          style={{
            backgroundColor: 'rgba(139,157,131,0.10)',
            border: '1px solid rgba(139,157,131,0.18)',
          }}
        >
          <Calendar className="h-2.5 w-2.5" style={{ color: ACCENT_SAGE_DARK }} />
          <span
            className="text-[9.5px] font-medium text-[#4d5a4d]"
            style={{ fontFamily: FONT_BODY }}
          >
            {formatRangeDate(course.startDate)}
            <span className="mx-1 text-[#8a938a]">→</span>
            {formatRangeDate(course.endDate)}
          </span>
        </div>

        {/* Meta row — inline icons only, tighter */}
        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-black/5 text-[10px] text-[#687169] flex-wrap" style={{ fontFamily: FONT_BODY }}>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-[#8a938a]" />
            {course.classTime}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="h-3 w-3 text-[#8a938a]" />
            {course.totalClasses} classes
          </span>
        </div>

        {/* Contact Row — tighter */}
        {course.contactNumber && (
          <a
            href={`tel:${course.contactNumber}`}
            className="group/contact mb-3 inline-flex items-center gap-1.5 self-start text-[10px] transition-colors"
            style={{ fontFamily: FONT_BODY }}
          >
            <span
              className="flex items-center justify-center w-6 h-6 rounded-full transition-colors"
              style={{
                backgroundColor: 'rgba(139,157,131,0.12)',
                color: ACCENT_SAGE_DARK,
              }}
            >
              <Phone className="h-2.5 w-2.5" />
            </span>
            <span className="text-[#687169] group-hover/contact:text-[#29362f] transition-colors">
              <span className="text-[#8a938a]">Call: </span>
              <span className="font-semibold text-[#29362f]">
                {course.contactNumber}
              </span>
            </span>
          </a>
        )}

        {/* Registration status block */}
        {hasRegistered && (
          <div className="mb-3">
            <RegistrationStatusBlock
              status={registrationStatus}
              registeredAt={userRegistration.createdAt}
              confirmedAt={userRegistration.confirmedAt}
            />
          </div>
        )}

        <div className="flex-1" />

        {/* BOTTOM ROW — Closes (left)  ·  CTA (right) */}
        <div className="flex items-center justify-between gap-2 pt-1">
          {/* Left: Closes date */}
          <div className="min-w-0">
            {isBeforeDeadline ? (
              <p
                className="text-[9px] text-[#8a938a] leading-tight"
                style={{ fontFamily: FONT_BODY }}
              >
                Registration Closes:
                <br />
                <span className="font-semibold text-[#687169]">
                  {formatClosesDate(course.registrationDeadline)}
                </span>
              </p>
            ) : (
              <p
                className="text-[9px] text-[#8a938a] leading-tight"
                style={{ fontFamily: FONT_BODY }}
              >
                Closed on
                <br />
                <span className="font-semibold text-[#687169]">
                  {formatClosesDate(course.registrationDeadline)}
                </span>
              </p>
            )}
          </div>

          {/* Right: CTA button */}
          {hasRegistered ? (
            registrationStatus === 'cancelled' ? (
              <button
                onClick={() => canRegister && onRegister(course)}
                disabled={!canRegister}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[9.5px] font-semibold uppercase tracking-[0.12em] transition-all ${
                  canRegister
                    ? 'text-white shadow-[0_4px_14px_-4px_rgba(204,29,52,0.5)] hover:opacity-90'
                    : 'text-[#8a938a] bg-[#f0ede6] cursor-not-allowed'
                }`}
                style={{
                  fontFamily: FONT_BODY,
                  ...(canRegister ? { backgroundColor: BRAND } : {}),
                }}
              >
                {canRegister ? (
                  <>
                    Register Again
                    <ArrowRight className="h-3 w-3" />
                  </>
                ) : (
                  'Unavailable'
                )}
              </button>
            ) : (
              <div
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[9.5px] font-semibold uppercase tracking-[0.12em]"
                style={{
                  fontFamily: FONT_BODY,
                  backgroundColor:
                    registrationStatus === 'confirmed'
                      ? 'rgba(77,102,66,0.10)'
                      : 'rgba(166,124,46,0.10)',
                  color:
                    registrationStatus === 'confirmed' ? '#4d6642' : '#a67c2e',
                }}
              >
                {registrationStatus === 'confirmed' ? (
                  <>
                    <CheckCircle className="h-3 w-3" />
                    Enrolled
                  </>
                ) : (
                  <>
                    <Clock3 className="h-3 w-3" />
                    Awaiting
                  </>
                )}
              </div>
            )
          ) : (
            <button
              onClick={() => canRegister && onRegister(course)}
              disabled={!canRegister}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[9.5px] font-semibold uppercase tracking-[0.12em] transition-all ${
                canRegister
                  ? 'text-white shadow-[0_4px_14px_-4px_rgba(204,29,52,0.5)] hover:opacity-90'
                  : 'text-[#8a938a] bg-[#f0ede6] cursor-not-allowed'
              }`}
              style={{
                fontFamily: FONT_BODY,
                ...(canRegister ? { backgroundColor: BRAND } : {}),
              }}
            >
              {canRegister ? (
                <>
                  Register
                  <ArrowRight className="h-3 w-3" />
                </>
              ) : (
                'Unavailable'
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/* =========================================================
   REGISTRATION STATUS BLOCK
========================================================= */
function RegistrationStatusBlock({ status, registeredAt, confirmedAt }) {
  const config = {
    pending: {
      icon: Clock3,
      label: 'Registration Pending',
      bg: 'rgba(166,124,46,0.06)',
      border: 'rgba(166,124,46,0.2)',
      color: '#a67c2e',
    },
    confirmed: {
      icon: CheckCircle,
      label: 'You are Registered',
      bg: 'rgba(77,102,66,0.06)',
      border: 'rgba(77,102,66,0.2)',
      color: '#4d6642',
    },
    cancelled: {
      icon: XCircle,
      label: 'Registration Cancelled',
      bg: 'rgba(138,37,48,0.06)',
      border: 'rgba(138,37,48,0.2)',
      color: '#8a2530',
    },
    completed: {
      icon: Award,
      label: 'Course Completed',
      bg: 'rgba(61,90,143,0.06)',
      border: 'rgba(61,90,143,0.2)',
      color: '#3d5a8f',
    },
  };

  const cfg = config[status] || config.pending;
  const Icon = cfg.icon;

  const fmt = (d) => {
    if (!d) return null;
    const date = safeDate(d);
    if (!date) return null;
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div
      className="rounded-lg px-2.5 py-2 flex items-start gap-2"
      style={{ backgroundColor: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      <Icon
        className="h-3 w-3 mt-0.5 flex-shrink-0"
        style={{ color: cfg.color }}
      />
      <div className="min-w-0 flex-1">
        <p
          className="text-[10px] font-semibold"
          style={{ fontFamily: FONT_BODY, color: cfg.color }}
        >
          {cfg.label}
        </p>
        <p
          className="text-[9.5px] mt-0.5 leading-tight"
          style={{ fontFamily: FONT_BODY, color: cfg.color, opacity: 0.75 }}
        >
          {status === 'pending' && registeredAt && (
            <>Submitted {fmt(registeredAt)}</>
          )}
          {status === 'confirmed' &&
            (confirmedAt ? (
              <>Confirmed {fmt(confirmedAt)}</>
            ) : (
              <>Your seat is confirmed</>
            ))}
          {status === 'cancelled' && <>You can register again below</>}
          {status === 'completed' && <>Congratulations on finishing!</>}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */
export default function CoursesPage() {
  const { navbarData } = useNavbar();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [userRegistrations, setUserRegistrations] = useState({});

  const searchAbortRef = useRef(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  const fetchUserRegistrations = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUserRegistrations({});
      return;
    }
    try {
      const response = await fetch(
        `${API_URL}/api/courses/user/my-registrations`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      if (data.success) setUserRegistrations(data.data || {});
    } catch (error) {
      console.error('Fetch user registrations error:', error);
    }
  };

  useEffect(() => {
    if (user) fetchUserRegistrations();
    else setUserRegistrations({});
  }, [user]);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 350);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      if (searchAbortRef.current) searchAbortRef.current.abort();
      const controller = new AbortController();
      searchAbortRef.current = controller;

      const params = new URLSearchParams({
        page: page.toString(),
        limit: '9',
        ...(debouncedQuery && { search: debouncedQuery }),
        ...(statusFilter && { status: statusFilter }),
      });

      const response = await fetch(`${API_URL}/api/courses?${params}`, {
        signal: controller.signal,
      });
      const data = await response.json();

      if (data.success) {
        setCourses(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      if (error.name === 'AbortError') return;
      console.error('Fetch courses error:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter, debouncedQuery]);

  const handleRegister = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleRegistrationSuccess = () => {
    fetchUserRegistrations();
  };

  const filterOptions = [
    { value: '', label: 'All Courses' },
    { value: 'open', label: 'Open' },
    { value: 'closed', label: 'Closed' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'ongoing', label: 'Ongoing' },
  ];

  const isTyping = searchQuery.trim() !== debouncedQuery && searchQuery.trim() !== '';

  return (
    <>
      <Navbar />

      <main className="relative overflow-hidden bg-[#f7f4ef] pt-16">
        <div className="pointer-events-none absolute left-[-180px] top-[120px] h-[400px] w-[400px] rounded-full bg-[#d7dfd2]/30 blur-[100px]" />
        <div className="pointer-events-none absolute right-[-160px] top-[400px] h-[450px] w-[450px] rounded-full bg-[#e7d9d0]/30 blur-[100px]" />

        {/* HERO */}
        <section className="relative px-4 pb-8 pt-12 sm:px-6 sm:pb-12 sm:pt-20 lg:px-8 -mt-24">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="relative z-10 mx-auto max-w-[900px] text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-[#a9afa5]" />
              <span
                className="text-[9px] font-semibold uppercase tracking-[0.35em] text-[#7e897e]"
                style={{ fontFamily: FONT_BODY }}
              >
                Enrollment Open
              </span>
              <span className="h-px w-8 bg-[#a9afa5]" />
            </div>

            <h1
              className="text-[36px] font-light leading-[1.02] tracking-[-0.035em] text-[#29362f] sm:text-[56px] md:text-[64px]"
              style={{ fontFamily: FONT_HEADING }}
            >
              Our{' '}
              <span className="italic" style={{ color: BRAND }}>
                Courses
              </span>
            </h1>

            <p
              className="mx-auto mt-4 max-w-[520px] text-[13px] leading-relaxed text-[#687169] sm:text-[14px]"
              style={{ fontFamily: FONT_BODY }}
            >
              Discover thoughtfully designed courses. Enroll today and start
              your journey with us.
            </p>
          </motion.div>
        </section>

        {/* FILTER BAR */}
        <section className="relative px-4 pb-6 sm:px-6 sm:pb-8 lg:px-8">
          <div className="mx-auto max-w-[1400px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a938a]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search courses by name..."
                  className="w-full rounded-full border border-black/5 bg-white/80 py-3 pl-11 pr-11 text-[13px] text-[#29362f] placeholder:text-[#8a938a] outline-none backdrop-blur transition-all focus:border-transparent"
                  style={{ fontFamily: FONT_BODY }}
                  onFocus={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 0 3px rgba(139,157,131,0.15)`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.boxShadow = '';
                  }}
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  {(isTyping || (loading && searchQuery)) && (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-[#8B9D83]" />
                  )}
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                      className="flex h-6 w-6 items-center justify-center rounded-full text-[#8a938a] hover:bg-black/5 hover:text-[#29362f] transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 no-scrollbar">
                <div className="inline-flex items-center gap-1 rounded-full border border-black/5 bg-white/80 p-1 backdrop-blur shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                  {filterOptions.map((opt) => {
                    const isActive = statusFilter === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setStatusFilter(opt.value);
                          setPage(1);
                        }}
                        className={`relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors sm:px-4 ${
                          isActive
                            ? 'text-white'
                            : 'text-[#29362f]/70 hover:text-[#29362f]'
                        }`}
                        style={{ fontFamily: FONT_BODY }}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="activeCourseFilter"
                            className="absolute inset-0 rounded-full shadow-[0_2px_8px_-2px_rgba(204,29,52,0.5)]"
                            style={{ backgroundColor: BRAND }}
                            transition={{
                              type: 'spring',
                              stiffness: 380,
                              damping: 32,
                            }}
                          />
                        )}
                        <span className="relative z-10">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* COURSES GRID */}
        <section className="relative px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1400px]">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-[#8B9D83] border-t-transparent" />
              </div>
            ) : courses.length === 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="flex flex-col items-center justify-center rounded-[24px] border border-dashed border-[#c5d5be] bg-white/60 py-20 backdrop-blur-sm"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#edf1ea] text-[#748571]">
                  <BookOpen className="h-6 w-6" />
                </div>
                <p
                  className="text-[15px] font-medium text-[#59635c]"
                  style={{ fontFamily: FONT_HEADING }}
                >
                  {debouncedQuery
                    ? `No courses found for "${debouncedQuery}"`
                    : 'No courses available'}
                </p>
                <p
                  className="mt-1 text-[11px] text-[#8a938a]"
                  style={{ fontFamily: FONT_BODY }}
                >
                  {debouncedQuery
                    ? 'Try a different search term.'
                    : 'Check back soon — new courses are added regularly.'}
                </p>
              </motion.div>
            ) : (
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {courses.map((course, i) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    index={i}
                    onRegister={handleRegister}
                    userRegistration={userRegistrations[course._id]}
                    logo={navbarData?.logo}
                  />
                ))}
              </motion.div>
            )}

            {pagination.totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-3">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#29362f] ring-1 ring-black/5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:bg-[#f0f5ed] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white"
                  aria-label="Previous page"
                >
                  <ArrowRight className="h-3.5 w-3.5 rotate-180" />
                </button>

                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#687169]"
                  style={{ fontFamily: FONT_BODY }}
                >
                  {page} / {pagination.totalPages}
                </span>

                <button
                  onClick={() =>
                    setPage((p) => Math.min(pagination.totalPages, p + 1))
                  }
                  disabled={page === pagination.totalPages}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-[0_2px_8px_-2px_rgba(204,29,52,0.5)] transition-all disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ backgroundColor: BRAND }}
                  aria-label="Next page"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {selectedCourse && (
        <RegistrationModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedCourse(null);
            fetchCourses();
          }}
          course={selectedCourse}
          user={user}
          onSuccess={handleRegistrationSuccess}
        />
      )}

      <Footer />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `,
        }}
      />
    </>
  );
}