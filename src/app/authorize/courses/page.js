// app/authorize/courses/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Loader2,
  Users,
  Calendar,
  Clock,
  DollarSign,
  BookOpen,
  UserPlus,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Facebook,
  MessageCircle,
  Upload,
  Image as ImageIcon,
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import { useNavbar } from '@/app/hooks/useNavbar';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// ============================================================
// LOGO HELPER
// ============================================================
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

// ============================================================
// IMAGE UPLOAD COMPONENT
// ============================================================
const ImageUpload = ({ imageUrl, onImageChange, onImageRemove }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState(imageUrl || '');

  useEffect(() => {
    setPreview(imageUrl || '');
  }, [imageUrl]);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'nishats-collection'
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        return {
          url: data.secure_url,
          publicId: data.public_id,
        };
      } else {
        throw new Error(data.error?.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Invalid format. Allowed: JPG, PNG, WebP');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large. Max: 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreview(event.target.result);
      };
      reader.readAsDataURL(file);

      const result = await uploadToCloudinary(file);
      if (result && result.url) {
        onImageChange(result.url);
        toast.success('Image uploaded successfully!');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
      setPreview('');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onImageRemove();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative inline-block">
          <div className="flex h-40 w-full max-w-sm items-center justify-center overflow-hidden rounded-xl border-2 border-[#8B9D83]/30 bg-gray-50">
            <img
              src={preview}
              alt="Course Image"
              className="max-h-full max-w-full object-contain"
            />
          </div>
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/50">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1.5 text-white transition-colors hover:bg-red-600 shadow-lg"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex h-40 w-full max-w-sm cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#8B9D83]/40 bg-gray-50 transition-colors hover:border-[#8B9D83] hover:bg-[#8B9D83]/5"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-[#8B9D83]" />
              <p className="mt-2 text-sm text-gray-500">Uploading...</p>
            </>
          ) : (
            <>
              <ImageIcon className="h-10 w-10 text-[#8B9D83]/60" />
              <p className="mt-2 text-sm font-medium text-gray-600">
                Click to upload image
              </p>
              <p className="text-xs text-gray-400">JPG, PNG, WebP (max 5MB)</p>
            </>
          )}
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={handleFileSelect}
        disabled={isUploading}
      />
    </div>
  );
};

// ============================================================
// COURSE FORM MODAL
// ============================================================
const CourseFormModal = ({ isOpen, onClose, course, onSave }) => {
  const [formData, setFormData] = useState({
    courseName: '',
    courseDetails: '',
    contactNumber: '',
    startDate: '',
    endDate: '',
    classTime: '',
    totalClasses: 1,
    courseFee: 0,
    registrationDeadline: '',
    maxRegistrations: '',
    image: '',
    isActive: true,
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (course) {
      setFormData({
        courseName: course.courseName || '',
        courseDetails: course.courseDetails || '',
        contactNumber: course.contactNumber || '',
        startDate: course.startDate
          ? new Date(course.startDate).toISOString().split('T')[0]
          : '',
        endDate: course.endDate
          ? new Date(course.endDate).toISOString().split('T')[0]
          : '',
        classTime: course.classTime || '',
        totalClasses: course.totalClasses || 1,
        courseFee: course.courseFee || 0,
        registrationDeadline: course.registrationDeadline
          ? new Date(course.registrationDeadline).toISOString().split('T')[0]
          : '',
        maxRegistrations: course.maxRegistrations || '',
        image: course.image || '',
        isActive: course.isActive !== false,
      });
    } else {
      setFormData({
        courseName: '',
        courseDetails: '',
        contactNumber: '',
        startDate: '',
        endDate: '',
        classTime: '',
        totalClasses: 1,
        courseFee: 0,
        registrationDeadline: '',
        maxRegistrations: '',
        image: '',
        isActive: true,
      });
    }
    setErrors({});
  }, [course, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.courseName.trim()) {
      newErrors.courseName = 'Course name is required';
    }
    if (!formData.courseDetails.trim()) {
      newErrors.courseDetails = 'Course details are required';
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    if (!formData.classTime.trim()) {
      newErrors.classTime = 'Class time is required';
    }
    if (!formData.totalClasses || formData.totalClasses < 1) {
      newErrors.totalClasses = 'At least 1 class is required';
    }
    if (formData.courseFee === '' || formData.courseFee < 0) {
      newErrors.courseFee = 'Valid course fee is required';
    }
    if (!formData.registrationDeadline) {
      newErrors.registrationDeadline = 'Registration deadline is required';
    }

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) < new Date(formData.startDate)) {
        newErrors.endDate = 'End date must be after start date';
      }
    }
    if (formData.registrationDeadline && formData.startDate) {
      if (new Date(formData.registrationDeadline) > new Date(formData.startDate)) {
        newErrors.registrationDeadline = 'Deadline must be before or on start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const url = course
        ? `${API_URL}/api/courses/admin/${course._id}`
        : `${API_URL}/api/courses/admin`;

      const method = course ? 'PUT' : 'POST';

      const payload = {
        ...formData,
        totalClasses: parseInt(formData.totalClasses),
        courseFee: parseFloat(formData.courseFee),
        maxRegistrations: formData.maxRegistrations
          ? parseInt(formData.maxRegistrations)
          : null,
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          course ? 'Course updated successfully!' : 'Course created successfully!'
        );
        onSave();
        onClose();
      } else {
        toast.error(data.error || 'Failed to save course');
      }
    } catch (error) {
      console.error('Save course error:', error);
      toast.error('Failed to save course');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#8B9D83]/5">
          <h2 className="text-xl font-semibold text-[#2D1B2E]">
            {course ? 'Edit Course' : 'Create New Course'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Course Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.courseName}
              onChange={(e) =>
                setFormData({ ...formData, courseName: e.target.value })
              }
              className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none ${
                errors.courseName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Basic Computer Course"
            />
            {errors.courseName && (
              <p className="text-xs text-red-500 mt-1">{errors.courseName}</p>
            )}
          </div>

          {/* Course Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Details <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.courseDetails}
              onChange={(e) =>
                setFormData({ ...formData, courseDetails: e.target.value })
              }
              rows={4}
              className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none resize-none ${
                errors.courseDetails ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe the course content, what students will learn, etc."
            />
            {errors.courseDetails && (
              <p className="text-xs text-red-500 mt-1">{errors.courseDetails}</p>
            )}
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="tel"
                value={formData.contactNumber}
                onChange={(e) =>
                  setFormData({ ...formData, contactNumber: e.target.value })
                }
                className={`w-full pl-10 pr-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none ${
                  errors.contactNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 01712345678"
              />
            </div>
            {errors.contactNumber && (
              <p className="text-xs text-red-500 mt-1">{errors.contactNumber}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              Students can call this number for course details
            </p>
          </div>

          {/* Course Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Image <span className="text-gray-400">(Optional)</span>
            </label>
            <ImageUpload
              imageUrl={formData.image}
              onImageChange={(url) => setFormData({ ...formData, image: url })}
              onImageRemove={() => setFormData({ ...formData, image: '' })}
            />
          </div>

          {/* Dates Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none ${
                  errors.startDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.startDate && (
                <p className="text-xs text-red-500 mt-1">{errors.startDate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none ${
                  errors.endDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.endDate && (
                <p className="text-xs text-red-500 mt-1">{errors.endDate}</p>
              )}
            </div>
          </div>

          {/* Class Time & Total Classes */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class Time <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.classTime}
                onChange={(e) =>
                  setFormData({ ...formData, classTime: e.target.value })
                }
                className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none ${
                  errors.classTime ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 10:00 AM - 12:00 PM"
              />
              {errors.classTime && (
                <p className="text-xs text-red-500 mt-1">{errors.classTime}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Classes <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={formData.totalClasses}
                onChange={(e) =>
                  setFormData({ ...formData, totalClasses: e.target.value })
                }
                onWheel={(e) => e.target.blur()}
                className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none ${
                  errors.totalClasses ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.totalClasses && (
                <p className="text-xs text-red-500 mt-1">{errors.totalClasses}</p>
              )}
            </div>
          </div>

          {/* Course Fee & Max Registrations */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Fee (৳) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.courseFee}
                onChange={(e) =>
                  setFormData({ ...formData, courseFee: e.target.value })
                }
                onWheel={(e) => e.target.blur()}
                className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none ${
                  errors.courseFee ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.courseFee && (
                <p className="text-xs text-red-500 mt-1">{errors.courseFee}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Registrations <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="number"
                min="1"
                value={formData.maxRegistrations}
                onChange={(e) =>
                  setFormData({ ...formData, maxRegistrations: e.target.value })
                }
                onWheel={(e) => e.target.blur()}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none"
                placeholder="Leave empty for unlimited"
              />
            </div>
          </div>

          {/* Registration Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Registration Deadline <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.registrationDeadline}
              onChange={(e) =>
                setFormData({ ...formData, registrationDeadline: e.target.value })
              }
              className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none ${
                errors.registrationDeadline ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.registrationDeadline && (
              <p className="text-xs text-red-500 mt-1">
                {errors.registrationDeadline}
              </p>
            )}
          </div>

          {/* Active Toggle */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 text-[#8B9D83] focus:ring-[#8B9D83]"
              />
              <span className="text-sm font-medium text-gray-700">Course Active</span>
            </label>
            <span className="text-xs text-gray-500">
              {formData.isActive ? 'Visible on website' : 'Hidden from website'}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-[#8B9D83] rounded-xl hover:bg-[#6B7D63] disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {course ? 'Update Course' : 'Create Course'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MANUAL REGISTRATION MODAL
// ============================================================
const ManualRegistrationModal = ({ isOpen, onClose, courseId, onSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    facebookId: '',
    whatsappNumber: '',
    status: 'confirmed',
    paymentStatus: 'unpaid',
    paymentAmount: 0,
    paymentMethod: '',
    paymentNote: '',
    adminNotes: '',
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        address: '',
        facebookId: '',
        whatsappNumber: '',
        status: 'confirmed',
        paymentStatus: 'unpaid',
        paymentAmount: 0,
        paymentMethod: '',
        paymentNote: '',
        adminNotes: '',
      });
      setErrors({});
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${API_URL}/api/courses/admin/${courseId}/manual-register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            paymentAmount: parseFloat(formData.paymentAmount) || 0,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success('Registration added successfully!');
        onSuccess();
        onClose();
      } else {
        toast.error(data.error || 'Failed to add registration');
      }
    } catch (error) {
      console.error('Manual register error:', error);
      toast.error('Failed to add registration');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#8B9D83]/5">
          <h2 className="text-lg font-semibold text-[#2D1B2E]">Manual Registration</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="01XXXXXXXXX"
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-gray-400">(Optional)</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={2}
              className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none resize-none ${
                errors.address ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.address && (
              <p className="text-xs text-red-500 mt-1">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Facebook ID <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.facebookId}
                onChange={(e) =>
                  setFormData({ ...formData, facebookId: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none"
                placeholder="facebook.com/username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) =>
                  setFormData({ ...formData, whatsappNumber: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none"
                placeholder="01XXXXXXXXX"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Registration Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none"
            >
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Payment Information
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Status
                </label>
                <select
                  value={formData.paymentStatus}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentStatus: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none"
                >
                  <option value="unpaid">Unpaid</option>
                  <option value="partial">Partial</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount (৳)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.paymentAmount}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentAmount: e.target.value })
                  }
                  onWheel={(e) => e.target.blur()}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <input
                type="text"
                value={formData.paymentMethod}
                onChange={(e) =>
                  setFormData({ ...formData, paymentMethod: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none"
                placeholder="e.g., bKash, Cash"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Admin Notes <span className="text-gray-400">(Optional)</span>
            </label>
            <textarea
              value={formData.adminNotes}
              onChange={(e) =>
                setFormData({ ...formData, adminNotes: e.target.value })
              }
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-[#8B9D83] rounded-xl hover:bg-[#6B7D63] disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                Add Registration
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// COURSE DETAILS MODAL (Admin view)
// ============================================================
const CourseDetailsModal = ({ isOpen, onClose, courseId, onRefresh }) => {
  const [course, setCourse] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showManualModal, setShowManualModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [actionLoading, setActionLoading] = useState({});

  const fetchCourseDetails = async () => {
    if (!courseId) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(searchQuery && { search: searchQuery }),
      });

      const response = await fetch(
        `${API_URL}/api/courses/admin/${courseId}?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      if (data.success) {
        setCourse(data.data.course);
        setRegistrations(data.data.registrations);
        setPagination(data.data.pagination);
      } else {
        toast.error(data.error || 'Failed to load course');
      }
    } catch (error) {
      console.error('Fetch course details error:', error);
      toast.error('Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && courseId) {
      fetchCourseDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, courseId, page, statusFilter]);

  useEffect(() => {
    if (isOpen) {
      setPage(1);
      setSearchQuery('');
      setStatusFilter('all');
    }
  }, [isOpen]);

  const handleSearch = () => {
    setPage(1);
    fetchCourseDetails();
  };

  const handleConfirm = async (registrationId) => {
    setActionLoading((prev) => ({ ...prev, [registrationId]: true }));
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${API_URL}/api/courses/admin/registration/${registrationId}/confirm`,
        {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success('Registration confirmed!');
        fetchCourseDetails();
        onRefresh?.();
      } else {
        toast.error(data.error || 'Failed to confirm');
      }
    } catch (error) {
      toast.error('Failed to confirm registration');
    } finally {
      setActionLoading((prev) => ({ ...prev, [registrationId]: false }));
    }
  };

  const handleCancel = async (registrationId) => {
    if (!confirm('Are you sure you want to cancel this registration?')) return;

    setActionLoading((prev) => ({ ...prev, [registrationId]: true }));
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${API_URL}/api/courses/admin/registration/${registrationId}/cancel`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reason: 'Cancelled by admin' }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success('Registration cancelled!');
        fetchCourseDetails();
        onRefresh?.();
      } else {
        toast.error(data.error || 'Failed to cancel');
      }
    } catch (error) {
      toast.error('Failed to cancel registration');
    } finally {
      setActionLoading((prev) => ({ ...prev, [registrationId]: false }));
    }
  };

  const handleDelete = async (registrationId) => {
    if (
      !confirm(
        'Are you sure you want to delete this registration? This cannot be undone.'
      )
    )
      return;

    setActionLoading((prev) => ({ ...prev, [registrationId]: true }));
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${API_URL}/api/courses/admin/registration/${registrationId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success('Registration deleted!');
        fetchCourseDetails();
        onRefresh?.();
      } else {
        toast.error(data.error || 'Failed to delete');
      }
    } catch (error) {
      toast.error('Failed to delete registration');
    } finally {
      setActionLoading((prev) => ({ ...prev, [registrationId]: false }));
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      confirmed: 'bg-green-100 text-green-700 border-green-200',
      cancelled: 'bg-red-100 text-red-700 border-red-200',
      completed: 'bg-blue-100 text-blue-700 border-blue-200',
    };
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full border ${
          styles[status] || 'bg-gray-100 text-gray-700'
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#8B9D83]/5">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-semibold text-[#2D1B2E]">
              {course?.courseName || 'Course Details'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowManualModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#8B9D83] rounded-xl hover:bg-[#6B7D63]"
            >
              <UserPlus className="h-4 w-4" />
              Add Student
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#8B9D83]" />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {/* Course Info */}
            {course && (
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex gap-4 mb-4">
                  {course.image && (
                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={course.image}
                        alt={course.courseName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-xl p-3 border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Start Date</p>
                        <p className="text-sm font-medium text-gray-800">
                          {new Date(course.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">End Date</p>
                        <p className="text-sm font-medium text-gray-800">
                          {new Date(course.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Class Time</p>
                        <p className="text-sm font-medium text-gray-800">
                          {course.classTime}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Total Classes</p>
                        <p className="text-sm font-medium text-gray-800">
                          {course.totalClasses}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Course Fee</p>
                        <p className="text-sm font-medium text-gray-800">
                          ৳{course.courseFee}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">
                          Max Registrations
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          {course.maxRegistrations || 'Unlimited'}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Deadline</p>
                        <p className="text-sm font-medium text-gray-800">
                          {new Date(course.registrationDeadline).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Contact</p>
                        <p className="text-sm font-medium text-gray-800 flex items-center gap-1">
                          <Phone className="h-3 w-3 text-[#8B9D83]" />
                          {course.contactNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                    Pending: {course.stats?.pending || 0}
                  </span>
                  <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-green-100 text-green-700">
                    Confirmed: {course.stats?.confirmed || 0}
                  </span>
                  <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-red-100 text-red-700">
                    Cancelled: {course.stats?.cancelled || 0}
                  </span>
                  {/* <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                    Completed: {course.stats?.completed || 0}
                  </span> */}
                </div>
              </div>
            )}

            {/* Filters */}
            <div className="p-4 border-b border-gray-200 flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Search by name, phone, email..."
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
              <button
                onClick={handleSearch}
                className="px-4 py-2 text-sm font-medium text-white bg-[#8B9D83] rounded-xl hover:bg-[#6B7D63]"
              >
                Search
              </button>
            </div>

            {/* Registrations Table */}
            <div className="p-4">
              {registrations.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-gray-500">No registrations found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-3 font-medium text-gray-600">
                          Name
                        </th>
                        <th className="text-left py-3 px-3 font-medium text-gray-600">
                          Contact
                        </th>
                        <th className="text-left py-3 px-3 font-medium text-gray-600">
                          Address
                        </th>
                        <th className="text-left py-3 px-3 font-medium text-gray-600">
                          Status
                        </th>
                        {/* <th className="text-left py-3 px-3 font-medium text-gray-600">
                          Payment
                        </th> */}
                        <th className="text-left py-3 px-3 font-medium text-gray-600">
                          Registered
                        </th>
                        <th className="text-right py-3 px-3 font-medium text-gray-600">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((reg) => (
                        <tr
                          key={reg._id}
                          className="border-b border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-3 px-3">
                            <p className="font-medium text-gray-800">
                              {reg.fullName}
                            </p>
                            {reg.facebookId && (
                              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                <Facebook className="h-3 w-3" />
                                {reg.facebookId}
                              </p>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            <p className="flex items-center gap-1 text-gray-600">
                              <Phone className="h-3 w-3" />
                              {reg.phone}
                            </p>
                            {reg.email && (
                              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                                <Mail className="h-3 w-3" />
                                {reg.email}
                              </p>
                            )}
                            {reg.whatsappNumber && (
                              <p className="text-xs text-green-600 flex items-center gap-1 mt-0.5">
                                <MessageCircle className="h-3 w-3" />
                                {reg.whatsappNumber}
                              </p>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            <p className="text-gray-600 text-xs max-w-[200px] truncate">
                              {reg.address}
                            </p>
                          </td>
                          <td className="py-3 px-3">
                            {getStatusBadge(reg.status)}
                            {reg.registrationSource === 'admin' && (
                              <span className="ml-1 text-xs text-gray-400">
                                (Admin)
                              </span>
                            )}
                          </td>
                          {/* <td className="py-3 px-3">
                            <span
                              className={`text-xs font-medium ${
                                reg.paymentStatus === 'paid'
                                  ? 'text-green-600'
                                  : reg.paymentStatus === 'partial'
                                  ? 'text-yellow-600'
                                  : 'text-gray-500'
                              }`}
                            >
                              {reg.paymentStatus.charAt(0).toUpperCase() +
                                reg.paymentStatus.slice(1)}
                            </span>
                            {reg.paymentAmount > 0 && (
                              <p className="text-xs text-gray-400">
                                ৳{reg.paymentAmount}
                              </p>
                            )}
                          </td> */}
                          <td className="py-3 px-3 text-xs text-gray-500">
                            {new Date(reg.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-3">
                            <div className="flex items-center justify-end gap-1">
                              {reg.status === 'pending' && (
                                <button
                                  onClick={() => handleConfirm(reg._id)}
                                  disabled={actionLoading[reg._id]}
                                  className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg"
                                  title="Confirm"
                                >
                                  {actionLoading[reg._id] ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <CheckCircle className="h-4 w-4" />
                                  )}
                                </button>
                              )}
                              {(reg.status === 'pending' ||
                                reg.status === 'confirmed') && (
                                <button
                                  onClick={() => handleCancel(reg._id)}
                                  disabled={actionLoading[reg._id]}
                                  className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg"
                                  title="Cancel"
                                >
                                  <XCircle className="h-4 w-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(reg._id)}
                                disabled={actionLoading[reg._id]}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600">
                    Page {page} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setPage((p) => Math.min(pagination.totalPages, p + 1))
                    }
                    disabled={page === pagination.totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Manual Registration Modal */}
      <ManualRegistrationModal
        isOpen={showManualModal}
        onClose={() => setShowManualModal(false)}
        courseId={courseId}
        onSuccess={() => {
          fetchCourseDetails();
          onRefresh?.();
        }}
      />
    </div>
  );
};

// ============================================================
// HELPER: Safe date formatting (always includes year)
// ============================================================
const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

// ============================================================
// COURSE CARD (Admin list) — small thumbnail on left
// ============================================================
const CourseCard = ({
  course,
  logo,
  onViewDetails,
  onEdit,
  onDelete,
  deleteLoading,
}) => {
  const now = new Date();
  const deadline = course.registrationDeadline
    ? new Date(course.registrationDeadline)
    : null;
  const isBeforeDeadline = deadline && now <= deadline;
  const hasSpace =
    course.maxRegistrations === null ||
    (course.stats?.confirmed || 0) < course.maxRegistrations;

  const getStatusBadge = () => {
    if (!course.isActive) {
      return {
        label: 'Inactive',
        className: 'bg-gray-100 text-gray-600',
        dot: '#6b7280',
      };
    }
    if (!isBeforeDeadline) {
      return {
        label: 'Closed',
        className: 'bg-red-100 text-red-700',
        dot: '#b91c1c',
      };
    }
    if (!hasSpace) {
      return {
        label: 'Full',
        className: 'bg-orange-100 text-orange-700',
        dot: '#c2410c',
      };
    }
    return {
      label: 'Open',
      className: 'bg-green-100 text-green-700',
      dot: '#15803d',
    };
  };

  const status = getStatusBadge();
  const hasImage = !!course.image;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-[#8B9D83]/40 hover:shadow-[0_8px_24px_-16px_rgba(41,54,47,0.2)] transition-all">
      {/* ✅ Always use horizontal layout — thumbnail is ALWAYS small */}
      <div className="flex items-start gap-4">
        {/* ==================================================
            SMALL THUMBNAIL / LOGO FALLBACK
            Fixed 96x96 — never full width
        ================================================== */}
        <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-[#f7f4ef] border border-gray-100">
          {hasImage ? (
            <img
              src={course.image}
              alt={course.courseName}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#f7f4ef] via-[#f0ebe2] to-[#e8e2d6]">
              {logo?.logoUrl ? (
                <img
                  src={getLogoUrl(logo.logoUrl)}
                  alt={logo.text || 'Logo'}
                  className="max-h-[65%] max-w-[70%] object-contain"
                />
              ) : (
                <span className="text-[9px] font-bold text-[#2D1B2E] text-center px-1 leading-tight">
                  {logo?.text || "Nishat's Collection"}
                </span>
              )}
            </div>
          )}
        </div>

        {/* ==================================================
            COURSE INFO
        ================================================== */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2 flex-wrap sm:flex-nowrap">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-semibold text-[#2D1B2E] line-clamp-1">
                {course.courseName}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                {course.courseDetails}
              </p>
            </div>
            <div className="flex-shrink-0">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${status.className}`}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: status.dot }}
                />
                {status.label}
              </span>
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3 text-sm">
            <div className="flex items-center gap-1.5 text-gray-600">
              <Calendar className="h-4 w-4 text-[#8B9D83] flex-shrink-0" />
              <span className="text-xs">
                {formatDate(course.startDate)} — {formatDate(course.endDate)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <Clock className="h-4 w-4 text-[#8B9D83] flex-shrink-0" />
              <span className="text-xs">{course.classTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <BookOpen className="h-4 w-4 text-[#8B9D83] flex-shrink-0" />
              <span className="text-xs">{course.totalClasses} classes</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600">
              <DollarSign className="h-4 w-4 text-[#8B9D83] flex-shrink-0" />
              <span className="text-xs">
                ৳{course.courseFee?.toLocaleString()}
              </span>
            </div>
            {course.contactNumber && (
              <div className="flex items-center gap-1.5 text-gray-600">
                <Phone className="h-4 w-4 text-[#8B9D83] flex-shrink-0" />
                <span className="text-xs">{course.contactNumber}</span>
              </div>
            )}
          </div>

          {/* Stats + Actions row — combined so it works on all screen sizes */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
            {/* Stats */}
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-700">
                Pending: {course.stats?.pending || 0}
              </span>
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                Confirmed: {course.stats?.confirmed || 0}
              </span>
              <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
                Cancelled: {course.stats?.cancelled || 0}
              </span>
              {course.maxRegistrations && (
                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                  Max: {course.maxRegistrations}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => onViewDetails(course._id)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#8B9D83] border border-[#8B9D83] rounded-xl hover:bg-[#8B9D83]/10 transition-colors"
              >
                <Users className="h-4 w-4" />
                Registrations
              </button>
              <button
                onClick={() => onEdit(course)}
                className="p-2 text-gray-500 hover:text-[#8B9D83] hover:bg-[#8B9D83]/10 rounded-lg"
                title="Edit"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onDelete(course._id)}
                disabled={deleteLoading === course._id}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg disabled:opacity-50"
                title="Delete"
              >
                {deleteLoading === course._id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN COURSE MANAGEMENT PAGE
// ============================================================
export default function CourseManagementPage() {
  const router = useRouter();
  const { navbarData } = useNavbar();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isActiveFilter, setIsActiveFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [authorized, setAuthorized] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!token || !userData) {
        router.push('/login');
        return;
      }

      try {
        const user = JSON.parse(userData);
        if (!['admin', 'super_admin', 'moderator'].includes(user.role)) {
          toast.error('You do not have permission to access this page');
          router.push('/');
          return;
        }
        setAuthorized(true);
      } catch (error) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(searchQuery && { search: searchQuery }),
        ...(isActiveFilter !== '' && { isActive: isActiveFilter }),
      });

      const response = await fetch(
        `${API_URL}/api/courses/admin/all?${params}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      if (data.success) {
        setCourses(data.data);
        setPagination(data.pagination);
      } else {
        toast.error(data.error || 'Failed to load courses');
      }
    } catch (error) {
      console.error('Fetch courses error:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authorized) {
      fetchCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, isActiveFilter, authorized]);

  const handleSearch = () => {
    setPage(1);
    fetchCourses();
  };

  const handleDeleteCourse = async (courseId) => {
    if (
      !confirm(
        'Are you sure you want to delete this course? This action cannot be undone.'
      )
    )
      return;

    setDeleteLoading(courseId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/courses/admin/${courseId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Course deleted successfully!');
        fetchCourses();
      } else {
        toast.error(data.error || 'Failed to delete course');
      }
    } catch (error) {
      console.error('Delete course error:', error);
      toast.error('Failed to delete course');
    } finally {
      setDeleteLoading(null);
    }
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setShowFormModal(true);
  };

  const openCreateModal = () => {
    setEditingCourse(null);
    setShowFormModal(true);
  };

  const openDetailsModal = (courseId) => {
    setSelectedCourseId(courseId);
    setShowDetailsModal(true);
  };

  if (!authorized) return null;

  return (
    <ProtectedRoute pageKey="manage_courses">
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#2D1B2E] flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-[#8B9D83]" />
              Course Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Create and manage courses, view registrations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchCourses}
              className="p-2 text-[#8B9D83] hover:bg-[#8B9D83]/10 rounded-lg"
              title="Refresh"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#8B9D83] rounded-xl hover:bg-[#6B7D63]"
            >
              <Plus className="h-4 w-4" />
              Create Course
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search courses..."
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none bg-white"
            />
          </div>
          <select
            value={isActiveFilter}
            onChange={(e) => {
              setIsActiveFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8B9D83] focus:border-transparent outline-none bg-white"
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <button
            onClick={handleSearch}
            className="px-4 py-2.5 text-sm font-medium text-white bg-[#8B9D83] rounded-xl hover:bg-[#6B7D63]"
          >
            Search
          </button>
        </div>

        {/* Courses List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-[#8B9D83]" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <BookOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500 mb-4">
              Create your first course to get started
            </p>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#8B9D83] rounded-xl hover:bg-[#6B7D63]"
            >
              <Plus className="h-4 w-4" />
              Create Course
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                logo={navbarData?.logo}
                onViewDetails={openDetailsModal}
                onEdit={openEditModal}
                onDelete={handleDeleteCourse}
                deleteLoading={deleteLoading}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm border border-gray-300 rounded-xl disabled:opacity-50 hover:bg-white bg-white"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {pagination.totalPages}
            </span>
            <button
              onClick={() =>
                setPage((p) => Math.min(pagination.totalPages, p + 1))
              }
              disabled={page === pagination.totalPages}
              className="px-4 py-2 text-sm border border-gray-300 rounded-xl disabled:opacity-50 hover:bg-white bg-white"
            >
              Next
            </button>
          </div>
        )}

        {/* Modals */}
        <CourseFormModal
          isOpen={showFormModal}
          onClose={() => {
            setShowFormModal(false);
            setEditingCourse(null);
          }}
          course={editingCourse}
          onSave={fetchCourses}
        />

        <CourseDetailsModal
          isOpen={showDetailsModal}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedCourseId(null);
          }}
          courseId={selectedCourseId}
          onRefresh={fetchCourses}
        />
      </div>
    </ProtectedRoute>
  );
}