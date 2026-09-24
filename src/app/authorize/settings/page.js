
// // app/admin/settings/page.js
// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { toast } from 'sonner';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   User, 
//   Mail, 
//   Phone, 
//   Save,
//   Lock,
//   Eye,
//   EyeOff,
//   Shield,
//   Clock,
//   CheckCircle,
//   AlertCircle,
//   Edit,
//   Key,
//   Info,
//   Sparkles,
//   Smartphone,
//   Gift,
//   Briefcase,
//   Calendar,
//   Award,
//   Heart,
//   Store,
//   ArrowLeft,
//   Zap
// } from 'lucide-react';
// import ProtectedRoute from '@/app/components/ProtectedRoute';

// // ============================================================
// // FONT CONSTANTS - MATCHING ABOUT PAGE
// // ============================================================
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', Georgia, serif";
// const FONT_FAMILY_INTER = "'Inter', sans-serif";

// export default function AdminSettings() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [changingPassword, setChangingPassword] = useState(false);
//   const [activeTab, setActiveTab] = useState('view');
  
//   const [userData, setUserData] = useState({
//     contactPerson: '',
//     email: '',
//     phone: '',
//     whatsapp: '',
//     role: '',
//     emailVerified: false,
//     lastLogin: null,
//     loginCount: 0,
//     createdAt: null
//   });

//   const [editFormData, setEditFormData] = useState({
//     contactPerson: '',
//     phone: '',
//     whatsapp: ''
//   });

//   const [passwordData, setPasswordData] = useState({
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: ''
//   });

//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState(0);

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');

//       const response = await fetch('http://localhost:5000/api/auth/me', {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });

//       const data = await response.json();

//       if (response.ok) {
//         const user = data.user;
//         setUserData({
//           contactPerson: user.contactPerson || '',
//           email: user.email || '',
//           phone: user.phone || '',
//           whatsapp: user.whatsapp || '',
//           role: user.role || 'admin',
//           emailVerified: user.emailVerified || false,
//           lastLogin: user.lastLogin || null,
//           loginCount: user.loginCount || 0,
//           createdAt: user.createdAt || null
//         });

//         setEditFormData({
//           contactPerson: user.contactPerson || '',
//           phone: user.phone || '',
//           whatsapp: user.whatsapp || ''
//         });
//       } else {
//         toast.error('Failed to load profile');
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       toast.error('Connection Error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleProfileUpdate = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//       const token = localStorage.getItem('token');

//       const response = await fetch('http://localhost:5000/api/auth/profile', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           contactPerson: editFormData.contactPerson,
//           phone: editFormData.phone,
//           whatsapp: editFormData.whatsapp
//         })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setUserData(prev => ({
//           ...prev,
//           contactPerson: editFormData.contactPerson,
//           phone: editFormData.phone,
//           whatsapp: editFormData.whatsapp
//         }));

//         const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
//         localStorage.setItem('user', JSON.stringify({
//           ...storedUser,
//           contactPerson: editFormData.contactPerson,
//           phone: editFormData.phone,
//           whatsapp: editFormData.whatsapp
//         }));

//         toast.success('Profile Updated! 🎉');
//         setActiveTab('view');
//       } else {
//         toast.error('Update Failed');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       toast.error('Connection Error');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handlePasswordChange = async (e) => {
//     e.preventDefault();
    
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       toast.error('Password Mismatch');
//       return;
//     }

//     if (passwordData.newPassword.length < 8) {
//       toast.error('Password must be at least 8 characters');
//       return;
//     }

//     setChangingPassword(true);

//     try {
//       const token = localStorage.getItem('token');

//       const response = await fetch('http://localhost:5000/api/auth/change-password', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           currentPassword: passwordData.currentPassword,
//           newPassword: passwordData.newPassword
//         })
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success('Password Changed Successfully!');
//         setPasswordData({
//           currentPassword: '',
//           newPassword: '',
//           confirmPassword: ''
//         });
//         setActiveTab('view');
//       } else {
//         toast.error(data.error || 'Current password is incorrect');
//       }
//     } catch (error) {
//       console.error('Error changing password:', error);
//       toast.error('Connection Error');
//     } finally {
//       setChangingPassword(false);
//     }
//   };

//   const calculatePasswordStrength = (password) => {
//     let strength = 0;
//     if (password.length >= 8) strength++;
//     if (/[A-Z]/.test(password)) strength++;
//     if (/[a-z]/.test(password)) strength++;
//     if (/[0-9]/.test(password)) strength++;
//     if (/[^A-Za-z0-9]/.test(password)) strength++;
//     setPasswordStrength(strength);
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handlePasswordInputChange = (e) => {
//     const { name, value } = e.target;
//     setPasswordData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     if (name === 'newPassword') {
//       calculatePasswordStrength(value);
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Never';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-[#52665a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600 font-medium" style={{ fontFamily: FONT_FAMILY_INTER }}>Loading your profile...</p>
//           <Sparkles className="w-5 h-5 text-[#52665a] mx-auto mt-2 animate-pulse" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ProtectedRoute pageKey="settings">
//     <div className="min-h-screen bg-[#f7f4ef]">
//       {/* Header - Sage Green Theme */}
//       <div className="bg-white border-b border-[#52665a]/20 shadow-lg sticky top-0 z-10">
//         <div className="px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <Link href="/authorize/dashboard" className="p-2 hover:bg-[#e2e3dd]/40 rounded-lg transition-colors">
//                 <ArrowLeft className="w-5 h-5 text-[#29362f]/80 hover:text-[#29362f]" />
//               </Link>
//               <div>
//                 <div className="flex items-center gap-2">
//                   <Shield className="w-6 h-6 text-[#52665a]" />
//                   <h1 className="text-xl font-bold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Settings</h1>
//                 </div>
//                 <p className="text-sm text-[#52665a]/60 mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>Manage your account information and security</p>
//               </div>
//             </div>
//             <Sparkles className="w-5 h-5 text-[#52665a]" />
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="container mx-auto px-4 max-w-4xl py-8">
//         {/* Tabs - Sage Green Theme */}
//         <div className="mb-6 border-b border-[#e2e3dd]/60 bg-white rounded-t-xl px-4 shadow-sm">
//           <div className="flex gap-1 overflow-x-auto">
//             {[
//               { id: 'view', label: 'Profile Info', icon: Info },
//               { id: 'edit', label: 'Edit Profile', icon: Edit },
//               { id: 'security', label: 'Security', icon: Key }
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-6 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
//                   activeTab === tab.id
//                     ? 'text-[#52665a]'
//                     : 'text-[#29362f]/60 hover:text-[#52665a]'
//                 }`}
//                 style={{ fontFamily: FONT_FAMILY_INTER }}
//               >
//                 <div className="flex items-center gap-2">
//                   <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#52665a]' : 'text-[#52665a]/40'}`} />
//                   {tab.label}
//                 </div>
//                 {activeTab === tab.id && (
//                   <motion.div
//                     layoutId="activeTab"
//                     className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#52665a]"
//                     initial={false}
//                     transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                   />
//                 )}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Tab Content - Sage Green Theme */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//           >
//             {/* Profile Info Tab */}
//             {activeTab === 'view' && (
//               <div className="bg-white rounded-xl shadow-lg border border-[#e2e3dd]/60 overflow-hidden">
//                 <div className="px-6 py-4 border-b border-[#e2e3dd]/60 bg-[#f7f4ef]">
//                   <h2 className="text-lg font-semibold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Profile Information</h2>
//                   <p className="text-sm text-[#52665a]/60 mt-0.5" style={{ fontFamily: FONT_FAMILY_INTER }}>Your account details and information</p>
//                 </div>

//                 <div className="p-6">
//                   {/* Profile Header */}
//                   <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[#e2e3dd]/60">
//                     <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#52665a] to-[#71816F] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-[#52665a]/25" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       {userData.contactPerson?.charAt(0) || userData.email?.charAt(0)}
//                     </div>
//                     <div>
//                       <h3 className="text-xl font-bold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{userData.contactPerson}</h3>
//                       <div className="flex flex-wrap items-center gap-2 mt-1">
//                         <span className="px-3 py-1 bg-[#f7f4ef] text-[#52665a] rounded-full text-xs font-medium border border-[#52665a]/30 flex items-center gap-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                           <Shield className="w-3 h-3" />
//                           {userData.role === 'super_admin' ? 'Super Admin' : 
//                            userData.role === 'admin' ? 'Admin' :
//                            userData.role === 'moderator' ? 'Moderator' :
//                            userData.role === 'call_center_agent' ? 'Call Center Agent' : 'User'}
//                         </span>
//                         {userData.emailVerified && (
//                           <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-200" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                             <CheckCircle className="w-3 h-3" />
//                             Verified
//                           </span>
//                         )}
//                         <Sparkles className="w-4 h-4 text-[#52665a]" />
//                       </div>
//                     </div>
//                   </div>

//                   {/* Information Grid */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                       <h4 className="text-sm font-semibold text-[#52665a] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                         <User className="w-4 h-4" />
//                         Personal Information
//                       </h4>
                      
//                       <div className="space-y-3">
//                         <div className="flex items-start gap-3 p-3 bg-[#f7f4ef] rounded-lg border border-[#e2e3dd]/60">
//                           <User className="w-4 h-4 text-[#52665a] mt-0.5" />
//                           <div>
//                             <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Full Name</p>
//                             <p className="text-sm font-medium text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{userData.contactPerson}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-3 p-3 bg-[#f7f4ef] rounded-lg border border-[#e2e3dd]/60">
//                           <Mail className="w-4 h-4 text-[#52665a] mt-0.5" />
//                           <div>
//                             <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Email Address</p>
//                             <p className="text-sm font-medium text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{userData.email}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-3 p-3 bg-[#f7f4ef] rounded-lg border border-[#e2e3dd]/60">
//                           <Phone className="w-4 h-4 text-[#52665a] mt-0.5" />
//                           <div>
//                             <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Phone Number</p>
//                             <p className="text-sm font-medium text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{userData.phone || 'Not provided'}</p>
//                           </div>
//                         </div>

//                         {userData.whatsapp && (
//                           <div className="flex items-start gap-3 p-3 bg-[#f7f4ef] rounded-lg border border-[#e2e3dd]/60">
//                             <Smartphone className="w-4 h-4 text-green-500 mt-0.5" />
//                             <div>
//                               <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>WhatsApp</p>
//                               <p className="text-sm font-medium text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{userData.whatsapp}</p>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <div className="space-y-4">
//                       <h4 className="text-sm font-semibold text-[#52665a] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                         <Clock className="w-4 h-4" />
//                         Account Information
//                       </h4>
                      
//                       <div className="space-y-3">
//                         <div className="flex items-start gap-3 p-3 bg-[#f7f4ef] rounded-lg border border-[#e2e3dd]/60">
//                           <Clock className="w-4 h-4 text-[#52665a] mt-0.5" />
//                           <div>
//                             <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Member Since</p>
//                             <p className="text-sm font-medium text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{formatDate(userData.createdAt)}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-3 p-3 bg-[#f7f4ef] rounded-lg border border-[#e2e3dd]/60">
//                           <Shield className="w-4 h-4 text-[#52665a] mt-0.5" />
//                           <div>
//                             <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Access Level</p>
//                             <p className="text-sm font-medium text-[#29362f] capitalize" style={{ fontFamily: FONT_FAMILY_INTER }}>{userData.role || 'User'}</p>
//                           </div>
//                         </div>

//                         <div className="flex items-start gap-3 p-3 bg-[#f7f4ef] rounded-lg border border-[#e2e3dd]/60">
//                           <Heart className="w-4 h-4 text-[#52665a] mt-0.5" />
//                           <div>
//                             <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>Last Login</p>
//                             <p className="text-sm font-medium text-[#29362f]" style={{ fontFamily: FONT_FAMILY_INTER }}>{userData.lastLogin ? formatDate(userData.lastLogin) : 'Never'}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="mt-6 pt-6 border-t border-[#e2e3dd]/60 flex flex-wrap gap-3">
//                     <button
//                       onClick={() => setActiveTab('edit')}
//                       className="px-6 py-2.5 bg-gradient-to-r from-[#52665a] to-[#71816F] text-white rounded-lg hover:shadow-lg hover:shadow-[#52665a]/25 transition-all text-sm font-medium flex items-center gap-2 shadow-md"
//                       style={{ fontFamily: FONT_FAMILY_INTER }}
//                     >
//                       <Edit className="w-4 h-4" />
//                       Edit Profile
//                     </button>
//                     <button
//                       onClick={() => setActiveTab('security')}
//                       className="px-6 py-2.5 border border-[#e2e3dd]/60 text-[#29362f] rounded-lg hover:bg-[#f7f4ef] hover:border-[#52665a]/30 transition-all text-sm font-medium flex items-center gap-2"
//                       style={{ fontFamily: FONT_FAMILY_INTER }}
//                     >
//                       <Key className="w-4 h-4 text-[#52665a]" />
//                       Change Password
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Edit Profile Tab */}
//             {activeTab === 'edit' && (
//               <div className="bg-white rounded-xl shadow-lg border border-[#e2e3dd]/60 overflow-hidden">
//                 <div className="px-6 py-4 border-b border-[#e2e3dd]/60 bg-[#f7f4ef]">
//                   <h2 className="text-lg font-semibold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Edit Profile</h2>
//                   <p className="text-sm text-[#52665a]/60 mt-0.5" style={{ fontFamily: FONT_FAMILY_INTER }}>Update your personal information</p>
//                 </div>

//                 <form onSubmit={handleProfileUpdate} className="p-6">
//                   <div className="space-y-5">
//                     <div>
//                       <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                         Full Name <span className="text-[#52665a]">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="contactPerson"
//                         value={editFormData.contactPerson}
//                         onChange={handleEditChange}
//                         required
//                         className="w-full px-4 py-2.5 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
//                         style={{ fontFamily: FONT_FAMILY_INTER }}
//                         placeholder="Your full name"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                         Email Address
//                       </label>
//                       <div className="relative">
//                         <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52665a]/40" />
//                         <input
//                           type="email"
//                           value={userData.email}
//                           disabled
//                           className="w-full pl-10 pr-4 py-2.5 border border-[#e2e3dd]/60 rounded-lg bg-[#f7f4ef] text-[#52665a]/60 cursor-not-allowed"
//                           style={{ fontFamily: FONT_FAMILY_INTER }}
//                         />
//                       </div>
//                       <p className="text-xs text-[#52665a]/40 mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>Email cannot be changed</p>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                           Phone Number <span className="text-[#52665a]">*</span>
//                         </label>
//                         <div className="relative">
//                           <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52665a]/40" />
//                           <input
//                             type="tel"
//                             name="phone"
//                             value={editFormData.phone}
//                             onChange={handleEditChange}
//                             required
//                             className="w-full pl-10 pr-4 py-2.5 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
//                             style={{ fontFamily: FONT_FAMILY_INTER }}
//                             placeholder="+880 1234 567890"
//                           />
//                         </div>
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                           WhatsApp Number
//                         </label>
//                         <div className="relative">
//                           <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52665a]/40" />
//                           <input
//                             type="tel"
//                             name="whatsapp"
//                             value={editFormData.whatsapp}
//                             onChange={handleEditChange}
//                             className="w-full pl-10 pr-4 py-2.5 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
//                             style={{ fontFamily: FONT_FAMILY_INTER }}
//                             placeholder="+880 1234 567890"
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-3 pt-4">
//                       <button
//                         type="button"
//                         onClick={() => setActiveTab('view')}
//                         className="flex-1 px-6 py-2.5 border border-[#e2e3dd]/60 rounded-lg hover:bg-[#f7f4ef] transition-all font-medium text-[#29362f]"
//                         style={{ fontFamily: FONT_FAMILY_INTER }}
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={saving}
//                         className="flex-1 px-6 py-2.5 bg-gradient-to-r from-[#52665a] to-[#71816F] text-white rounded-lg hover:shadow-lg hover:shadow-[#52665a]/25 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
//                         style={{ fontFamily: FONT_FAMILY_INTER }}
//                       >
//                         {saving ? (
//                           <>
//                             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                             Saving...
//                           </>
//                         ) : (
//                           <>
//                             <Save className="w-4 h-4" />
//                             Save Changes
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             )}

//             {/* Security Tab */}
//             {activeTab === 'security' && (
//               <div className="bg-white rounded-xl shadow-lg border border-[#e2e3dd]/60 overflow-hidden">
//                 <div className="px-6 py-4 border-b border-[#e2e3dd]/60 bg-[#f7f4ef]">
//                   <h2 className="text-lg font-semibold text-[#29362f]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Security Settings</h2>
//                   <p className="text-sm text-[#52665a]/60 mt-0.5" style={{ fontFamily: FONT_FAMILY_INTER }}>Change your password to keep your account secure</p>
//                 </div>

//                 <form onSubmit={handlePasswordChange} className="p-6">
//                   <div className="space-y-5">
//                     <div>
//                       <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                         Current Password <span className="text-[#52665a]">*</span>
//                       </label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52665a]/40" />
//                         <input
//                           type={showCurrentPassword ? "text" : "password"}
//                           name="currentPassword"
//                           value={passwordData.currentPassword}
//                           onChange={handlePasswordInputChange}
//                           required
//                           className="w-full pl-10 pr-10 py-2.5 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
//                           style={{ fontFamily: FONT_FAMILY_INTER }}
//                           placeholder="Enter your current password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52665a]/40 hover:text-[#52665a]"
//                         >
//                           {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                         New Password <span className="text-[#52665a]">*</span>
//                       </label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52665a]/40" />
//                         <input
//                           type={showNewPassword ? "text" : "password"}
//                           name="newPassword"
//                           value={passwordData.newPassword}
//                           onChange={handlePasswordInputChange}
//                           required
//                           className="w-full pl-10 pr-10 py-2.5 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
//                           style={{ fontFamily: FONT_FAMILY_INTER }}
//                           placeholder="Enter new password (min. 8 characters)"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowNewPassword(!showNewPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52665a]/40 hover:text-[#52665a]"
//                         >
//                           {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>

//                       {passwordData.newPassword && (
//                         <div className="mt-2">
//                           <div className="flex items-center gap-1 mb-1">
//                             {[1,2,3,4,5].map((level) => (
//                               <div
//                                 key={level}
//                                 className={`h-1 flex-1 rounded-full ${
//                                   level <= passwordStrength 
//                                     ? level <= 2 ? 'bg-[#52665a]' : level <= 4 ? 'bg-[#52665a]' : 'bg-green-500'
//                                     : 'bg-[#e2e3dd]'
//                                 }`}
//                               />
//                             ))}
//                           </div>
//                           <p className="text-xs text-[#52665a]/60" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                             {passwordStrength <= 2 ? 'Weak' : passwordStrength <= 4 ? 'Medium' : 'Strong'} password
//                           </p>
//                         </div>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-[#29362f] mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                         Confirm New Password <span className="text-[#52665a]">*</span>
//                       </label>
//                       <div className="relative">
//                         <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#52665a]/40" />
//                         <input
//                           type={showConfirmPassword ? "text" : "password"}
//                           name="confirmPassword"
//                           value={passwordData.confirmPassword}
//                           onChange={handlePasswordInputChange}
//                           required
//                           className="w-full pl-10 pr-10 py-2.5 border border-[#e2e3dd]/60 rounded-lg focus:ring-2 focus:ring-[#52665a] focus:border-transparent transition-all bg-white hover:border-[#52665a]/30"
//                           style={{ fontFamily: FONT_FAMILY_INTER }}
//                           placeholder="Confirm your new password"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-[#52665a]/40 hover:text-[#52665a]"
//                         >
//                           {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                         </button>
//                       </div>

//                       {passwordData.confirmPassword && (
//                         <p className={`text-xs mt-1 flex items-center gap-1 ${
//                           passwordData.newPassword === passwordData.confirmPassword
//                             ? 'text-green-600'
//                             : 'text-[#52665a]'
//                         }`} style={{ fontFamily: FONT_FAMILY_INTER }}>
//                           {passwordData.newPassword === passwordData.confirmPassword ? (
//                             <>✓ Passwords match</>
//                           ) : (
//                             <>✗ Passwords do not match</>
//                           )}
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex items-center gap-3 pt-4">
//                       <button
//                         type="button"
//                         onClick={() => setActiveTab('view')}
//                         className="flex-1 px-6 py-2.5 border border-[#e2e3dd]/60 rounded-lg hover:bg-[#f7f4ef] transition-all font-medium text-[#29362f]"
//                         style={{ fontFamily: FONT_FAMILY_INTER }}
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={changingPassword}
//                         className="flex-1 px-6 py-2.5 bg-gradient-to-r from-[#52665a] to-[#71816F] text-white rounded-lg hover:shadow-lg hover:shadow-[#52665a]/25 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
//                         style={{ fontFamily: FONT_FAMILY_INTER }}
//                       >
//                         {changingPassword ? (
//                           <>
//                             <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                             Updating...
//                           </>
//                         ) : (
//                           <>
//                             <Key className="w-4 h-4" />
//                             Update Password
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//     </ProtectedRoute>
//   );
// }



// app/admin/settings/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Save,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
  Key,
  Info,
  Sparkles,
  Smartphone,
  Gift,
  Briefcase,
  Calendar,
  Award,
  Heart,
  Store,
  ArrowLeft,
  Zap
} from 'lucide-react';
import ProtectedRoute from '@/app/components/ProtectedRoute';

// ============================================================
// FONT CONSTANTS - MATCHING ABOUT PAGE
// ============================================================
const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', Georgia, serif";
const FONT_FAMILY_INTER = "'Inter', sans-serif";

export default function AdminSettings() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('view');
  
  const [userData, setUserData] = useState({
    contactPerson: '',
    email: '',
    phone: '',
    whatsapp: '',
    role: '',
    emailVerified: false,
    lastLogin: null,
    loginCount: 0,
    createdAt: null
  });

  const [editFormData, setEditFormData] = useState({
    contactPerson: '',
    phone: '',
    whatsapp: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        const user = data.user;
        setUserData({
          contactPerson: user.contactPerson || '',
          email: user.email || '',
          phone: user.phone || '',
          whatsapp: user.whatsapp || '',
          role: user.role || 'admin',
          emailVerified: user.emailVerified || false,
          lastLogin: user.lastLogin || null,
          loginCount: user.loginCount || 0,
          createdAt: user.createdAt || null
        });

        setEditFormData({
          contactPerson: user.contactPerson || '',
          phone: user.phone || '',
          whatsapp: user.whatsapp || ''
        });
      } else {
        toast.error('Failed to load profile');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Connection Error');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          contactPerson: editFormData.contactPerson,
          phone: editFormData.phone,
          whatsapp: editFormData.whatsapp
        })
      });

      const data = await response.json();

      if (response.ok) {
        setUserData(prev => ({
          ...prev,
          contactPerson: editFormData.contactPerson,
          phone: editFormData.phone,
          whatsapp: editFormData.whatsapp
        }));

        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({
          ...storedUser,
          contactPerson: editFormData.contactPerson,
          phone: editFormData.phone,
          whatsapp: editFormData.whatsapp
        }));

        toast.success('Profile Updated! 🎉');
        setActiveTab('view');
      } else {
        toast.error('Update Failed');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Connection Error');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Password Mismatch');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setChangingPassword(true);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5000/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Password Changed Successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setActiveTab('view');
      } else {
        toast.error(data.error || 'Current password is incorrect');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Connection Error');
    } finally {
      setChangingPassword(false);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'newPassword') {
      calculatePasswordStrength(value);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-black font-medium" style={{ fontFamily: FONT_FAMILY_INTER }}>Loading your profile...</p>
          <Sparkles className="w-5 h-5 text-black mx-auto mt-2 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute pageKey="settings">
    <div className="min-h-screen bg-white">
      {/* Header - White Theme */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/authorize/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-black hover:text-gray-700" />
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-black" />
                  <h1 className="text-xl font-bold text-black" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Settings</h1>
                </div>
                <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>Manage your account information and security</p>
              </div>
            </div>
            <Sparkles className="w-5 h-5 text-black" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-4xl py-8">
        {/* Tabs - White Theme */}
        <div className="mb-6 border-b border-gray-200 bg-white rounded-t-xl px-4 shadow-sm">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'view', label: 'Profile Info', icon: Info },
              { id: 'edit', label: 'Edit Profile', icon: Edit },
              { id: 'security', label: 'Security', icon: Key }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium transition-all relative whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-black'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                style={{ fontFamily: FONT_FAMILY_INTER }}
              >
                <div className="flex items-center gap-2">
                  <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-black' : 'text-gray-400'}`} />
                  {tab.label}
                </div>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content - White Theme */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Profile Info Tab */}
            {activeTab === 'view' && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-semibold text-black" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Profile Information</h2>
                  <p className="text-sm text-gray-500 mt-0.5" style={{ fontFamily: FONT_FAMILY_INTER }}>Your account details and information</p>
                </div>

                <div className="p-6">
                  {/* Profile Header */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-black to-gray-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-black/20" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
                      {userData.contactPerson?.charAt(0) || userData.email?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>{userData.contactPerson}</h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="px-3 py-1 bg-gray-100 text-black rounded-full text-xs font-medium border border-gray-300 flex items-center gap-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                          <Shield className="w-3 h-3" />
                          {userData.role === 'super_admin' ? 'Super Admin' : 
                           userData.role === 'admin' ? 'Admin' :
                           userData.role === 'moderator' ? 'Moderator' :
                           userData.role === 'call_center_agent' ? 'Call Center Agent' : 'User'}
                        </span>
                        {userData.emailVerified && (
                          <span className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full border border-green-200" style={{ fontFamily: FONT_FAMILY_INTER }}>
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                        <Sparkles className="w-4 h-4 text-black" />
                      </div>
                    </div>
                  </div>

                  {/* Information Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-black flex items-center gap-2" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        <User className="w-4 h-4" />
                        Personal Information
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <User className="w-4 h-4 text-black mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>Full Name</p>
                            <p className="text-sm font-medium text-black" style={{ fontFamily: FONT_FAMILY_INTER }}>{userData.contactPerson}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <Mail className="w-4 h-4 text-black mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>Email Address</p>
                            <p className="text-sm font-medium text-black" style={{ fontFamily: FONT_FAMILY_INTER }}>{userData.email}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <Phone className="w-4 h-4 text-black mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>Phone Number</p>
                            <p className="text-sm font-medium text-black" style={{ fontFamily: FONT_FAMILY_INTER }}>{userData.phone || 'Not provided'}</p>
                          </div>
                        </div>

                        {userData.whatsapp && (
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <Smartphone className="w-4 h-4 text-green-600 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>WhatsApp</p>
                              <p className="text-sm font-medium text-black" style={{ fontFamily: FONT_FAMILY_INTER }}>{userData.whatsapp}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-sm font-semibold text-black flex items-center gap-2" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        <Clock className="w-4 h-4" />
                        Account Information
                      </h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <Clock className="w-4 h-4 text-black mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>Member Since</p>
                            <p className="text-sm font-medium text-black" style={{ fontFamily: FONT_FAMILY_INTER }}>{formatDate(userData.createdAt)}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <Shield className="w-4 h-4 text-black mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>Access Level</p>
                            <p className="text-sm font-medium text-black capitalize" style={{ fontFamily: FONT_FAMILY_INTER }}>{userData.role || 'User'}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <Heart className="w-4 h-4 text-black mt-0.5" />
                          <div>
                            <p className="text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>Last Login</p>
                            <p className="text-sm font-medium text-black" style={{ fontFamily: FONT_FAMILY_INTER }}>{userData.lastLogin ? formatDate(userData.lastLogin) : 'Never'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveTab('edit')}
                      className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-medium flex items-center gap-2 shadow-md"
                      style={{ fontFamily: FONT_FAMILY_INTER }}
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </button>
                    <button
                      onClick={() => setActiveTab('security')}
                      className="px-6 py-2.5 border border-gray-300 text-black rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all text-sm font-medium flex items-center gap-2"
                      style={{ fontFamily: FONT_FAMILY_INTER }}
                    >
                      <Key className="w-4 h-4 text-black" />
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Profile Tab */}
            {activeTab === 'edit' && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-semibold text-black" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Edit Profile</h2>
                  <p className="text-sm text-gray-500 mt-0.5" style={{ fontFamily: FONT_FAMILY_INTER }}>Update your personal information</p>
                </div>

                <form onSubmit={handleProfileUpdate} className="p-6">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        Full Name <span className="text-black">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={editFormData.contactPerson}
                        onChange={handleEditChange}
                        required
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all text-black placeholder-gray-400 hover:border-gray-400"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          value={userData.email}
                          disabled
                          className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                          style={{ fontFamily: FONT_FAMILY_INTER }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: FONT_FAMILY_INTER }}>Email cannot be changed</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-black mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                          Phone Number <span className="text-black">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={editFormData.phone}
                            onChange={handleEditChange}
                            required
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all text-black placeholder-gray-400 hover:border-gray-400"
                            style={{ fontFamily: FONT_FAMILY_INTER }}
                            placeholder="+880 1234 567890"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-black mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                          WhatsApp Number
                        </label>
                        <div className="relative">
                          <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            type="tel"
                            name="whatsapp"
                            value={editFormData.whatsapp}
                            onChange={handleEditChange}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all text-black placeholder-gray-400 hover:border-gray-400"
                            style={{ fontFamily: FONT_FAMILY_INTER }}
                            placeholder="+880 1234 567890"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setActiveTab('view')}
                        className="flex-1 px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-black"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex-1 px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                      >
                        {saving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-lg font-semibold text-black" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>Security Settings</h2>
                  <p className="text-sm text-gray-500 mt-0.5" style={{ fontFamily: FONT_FAMILY_INTER }}>Change your password to keep your account secure</p>
                </div>

                <form onSubmit={handlePasswordChange} className="p-6">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-black mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        Current Password <span className="text-black">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordInputChange}
                          required
                          className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all text-black placeholder-gray-400 hover:border-gray-400"
                          style={{ fontFamily: FONT_FAMILY_INTER }}
                          placeholder="Enter your current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        New Password <span className="text-black">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordInputChange}
                          required
                          className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all text-black placeholder-gray-400 hover:border-gray-400"
                          style={{ fontFamily: FONT_FAMILY_INTER }}
                          placeholder="Enter new password (min. 8 characters)"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {passwordData.newPassword && (
                        <div className="mt-2">
                          <div className="flex items-center gap-1 mb-1">
                            {[1,2,3,4,5].map((level) => (
                              <div
                                key={level}
                                className={`h-1 flex-1 rounded-full ${
                                  level <= passwordStrength 
                                    ? level <= 2 ? 'bg-gray-400' : level <= 4 ? 'bg-gray-600' : 'bg-green-500'
                                    : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-gray-500" style={{ fontFamily: FONT_FAMILY_INTER }}>
                            {passwordStrength <= 2 ? 'Weak' : passwordStrength <= 4 ? 'Medium' : 'Strong'} password
                          </p>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black mb-1" style={{ fontFamily: FONT_FAMILY_INTER }}>
                        Confirm New Password <span className="text-black">*</span>
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordInputChange}
                          required
                          className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all text-black placeholder-gray-400 hover:border-gray-400"
                          style={{ fontFamily: FONT_FAMILY_INTER }}
                          placeholder="Confirm your new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>

                      {passwordData.confirmPassword && (
                        <p className={`text-xs mt-1 flex items-center gap-1 ${
                          passwordData.newPassword === passwordData.confirmPassword
                            ? 'text-green-600'
                            : 'text-gray-500'
                        }`} style={{ fontFamily: FONT_FAMILY_INTER }}>
                          {passwordData.newPassword === passwordData.confirmPassword ? (
                            <>✓ Passwords match</>
                          ) : (
                            <>✗ Passwords do not match</>
                          )}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setActiveTab('view')}
                        className="flex-1 px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-black"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={changingPassword}
                        className="flex-1 px-6 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-50 shadow-md"
                        style={{ fontFamily: FONT_FAMILY_INTER }}
                      >
                        {changingPassword ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Updating...
                          </>
                        ) : (
                          <>
                            <Key className="w-4 h-4" />
                            Update Password
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
    </ProtectedRoute>
  );
}