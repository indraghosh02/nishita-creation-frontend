
// 'use client';

// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { useState, useEffect } from 'react';
// import { 
//   FaFacebookF, 
//   FaInstagram, 
//   FaTwitter, 
//   FaWhatsapp,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaClock,
//   FaTruck,
//   FaShieldAlt,
//   FaYoutube,
//   FaLinkedinIn,
//   FaCcVisa,
//   FaCcMastercard,
//   FaPaypal,
//   FaApplePay,
//   FaPinterestP,
//   FaTiktok,
//   FaHeart,
//   FaStar
// } from 'react-icons/fa';
// import { HiOutlineBadgeCheck, HiOutlineChip } from 'react-icons/hi';
// import { IoIosFlash } from 'react-icons/io';
// import { GiLipstick } from 'react-icons/gi';

// // Font constants - Beauty Bucket Theme
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// // Icon mapping for social platforms
// const SOCIAL_ICONS = {
//   facebook: FaFacebookF,
//   instagram: FaInstagram,
//   twitter: FaTwitter,
//   whatsapp: FaWhatsapp,
//   youtube: FaYoutube,
//   linkedin: FaLinkedinIn,
//   pinterest: FaPinterestP,
//   tiktok: FaTiktok,
// };

// export default function Footer() {
//   const router = useRouter();
//   const currentYear = new Date().getFullYear();
//   const [footerData, setFooterData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Fetch footer data from backend
//   useEffect(() => {
//     const fetchFooterData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/footer`);
        
//         if (!response.ok) {
//           throw new Error('Failed to fetch footer data');
//         }
        
//         const data = await response.json();
        
//         if (data.success && data.data) {
//           setFooterData(data.data);
//         } else {
//           throw new Error('Invalid footer data');
//         }
//       } catch (err) {
//         console.error('Error fetching footer data:', err);
//         setFooterData(getDefaultFooterData());
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchFooterData();
//   }, []);

//   // Default fallback data - Beauty Bucket theme
//   const getDefaultFooterData = () => ({
//     backgroundImage: '/images/footer.png',
//     company: {
//       name: "Beauty Bucket",
//       tagline: "Premium Beauty Essentials",
//       description: "Discover premium beauty products with expert care, fast delivery, and a touch of luxury across Bangladesh.",
//       address: "Dhaka, Bangladesh",
//       phone: "+880 1XXXXXXXXX",
//       email: "support@beautybucket.com",
//       hours: "Always Open • 24/7 Online Ordering • Quick Response",
//       logoUrl: "/images/logo3.png",
//     },
//     columns: [
//       {
//         id: 'default_1',
//         title: 'Company',
//         type: 'links',
//         items: [
//           { id: 'dl1', label: 'Home', url: '/' },
//           { id: 'dl2', label: 'Products', url: '/products' },
//           { id: 'dl3', label: 'Track Order', url: '/track' },
//           { id: 'dl4', label: 'About Us', url: '/about' },
//         ]
//       },
//       {
//         id: 'default_2',
//         title: 'Support',
//         type: 'support',
//         items: [
//           { id: 'ds1', label: 'Contact Us', url: '/contact' },
//           { id: 'ds2', label: 'Register', url: '/register' },
//           { id: 'ds3', label: 'Terms & Conditions', url: '/terms' },
//           { id: 'ds4', label: 'Privacy Policy', url: '/privacy' },
//         ],
//         socialLinks: [
//           { platform: 'facebook', url: 'https://facebook.com/beautybucket', active: true },
//           { platform: 'instagram', url: 'https://instagram.com/beautybucket', active: true },
//           { platform: 'youtube', url: 'https://youtube.com/beautybucket', active: true },
//         ]
//       },
//       {
//         id: 'default_3',
//         title: 'Contact Us',
//         type: 'contact',
//         items: [
//           { id: 'dc1', type: 'address', label: 'Address', value: 'Dhaka, Bangladesh' },
//           { id: 'dc2', type: 'phone', label: 'Phone', value: '+880 1XXXXXXXXX' },
//           { id: 'dc3', type: 'email', label: 'Email', value: 'support@beautybucket.com' },
//           { id: 'dc4', type: 'hours', label: 'Hours', value: 'Always Open • 24/7 Online Ordering' },
//         ]
//       }
//     ],
//     trustBadges: [
//       { type: 'authentic', label: '100% Authentic', active: true },
//       { type: 'warranty', label: 'Official Warranty', active: true },
//       { type: 'delivery', label: 'Fast Delivery', active: true },
//     ],
//     paymentMethods: [
//       { method: 'visa', active: true },
//       { method: 'mastercard', active: true },
//       { method: 'bkash', active: true },
//       { method: 'nagad', active: true },
//     ],
//     showTrustBadges: true,
//     showPaymentMethods: true,
//     footerText: 'All rights reserved.',
//     showCopyright: true,
//   });

//   // Get social links from columns
//   const getSocialLinks = () => {
//     if (!footerData) return [];
//     const supportColumn = footerData.columns?.find(col => col.type === 'support' || col.type === 'social');
//     if (supportColumn?.socialLinks) {
//       return supportColumn.socialLinks.filter(link => link.active);
//     }
//     return [];
//   };

//   // Get column items by column title
//   const getColumnItems = (title) => {
//     if (!footerData) return [];
//     const column = footerData.columns?.find(col => col.title === title);
//     return column?.items || [];
//   };

//   // Get contact column items
//   const getContactItems = () => {
//     if (!footerData) return [];
//     const contactColumn = footerData.columns?.find(col => col.type === 'contact');
//     return contactColumn?.items || [];
//   };

//   const openGmail = (email) => {
//     window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
//   };

//   // Render contact item based on type
//   const renderContactItem = (item) => {
//     const icons = {
//       address: FaMapMarkerAlt,
//       phone: FaPhone,
//       email: FaEnvelope,
//       hours: FaClock,
//     };
//     const Icon = icons[item.type];
//     if (!Icon) return null;

//     if (item.type === 'email') {
//       return (
//         <motion.button 
//           key={item.id}
//           onClick={() => openGmail(item.value)}
//           className="flex items-center gap-1.5 sm:gap-2 text-white/70 hover:text-[#8B9D83] transition-colors group w-full text-left"
//           style={{ fontFamily: FONT_FAMILY }}
//           whileHover={{ x: 2 }}
//         >
//           <Icon className="text-[#8B9D83] text-[10px] sm:text-[11px] flex-shrink-0" />
//           <span className="text-[11px] sm:text-[13px] break-all">{item.value}</span>
//         </motion.button>
//       );
//     }

//     if (item.type === 'address') {
//       return (
//         <motion.a 
//           key={item.id}
//           href={`https://maps.google.com/?q=${encodeURIComponent(item.value)}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="flex items-start gap-1.5 sm:gap-2 text-white/70 hover:text-[#8B9D83] transition-colors group"
//           style={{ fontFamily: FONT_FAMILY }}
//           whileHover={{ x: 2 }}
//         >
//           <Icon className="text-[#8B9D83] text-[10px] sm:text-[11px] mt-0.5 flex-shrink-0" />
//           <span className="text-[11px] sm:text-[13px] leading-tight">{item.value}</span>
//         </motion.a>
//       );
//     }

//     if (item.type === 'phone') {
//       return (
//         <motion.a 
//           key={item.id}
//           href={`tel:${item.value}`}
//           className="flex items-center gap-1.5 sm:gap-2 text-white/70 hover:text-[#8B9D83] transition-colors group"
//           style={{ fontFamily: FONT_FAMILY }}
//           whileHover={{ x: 2 }}
//         >
//           <Icon className="text-[#8B9D83] text-[10px] sm:text-[11px] flex-shrink-0" />
//           <span className="text-[11px] sm:text-[13px]">{item.value}</span>
//         </motion.a>
//       );
//     }

//     if (item.type === 'hours') {
//       return (
//         <div key={item.id} className="flex items-start gap-1.5 sm:gap-2 text-white/70" style={{ fontFamily: FONT_FAMILY }}>
//           <Icon className="text-[#8B9D83] text-[10px] sm:text-[11px] mt-0.5 flex-shrink-0" />
//           <span className="text-[11px] sm:text-[13px] leading-tight">{item.value}</span>
//         </div>
//       );
//     }

//     return null;
//   };

//   // Show loading state
//   if (isLoading) {
//     return (
//       <footer className="relative text-white overflow-hidden bg-[#1A0E14]">
//         <div className="container mx-auto px-4 py-6 lg:py-5 relative z-10">
//           <div className="flex items-center justify-center min-h-[200px]">
//             <div className="text-center">
//               <div className="inline-block w-8 h-8 border-4 border-white/20 border-t-[#8B9D83] rounded-full animate-spin"></div>
//               <p className="text-white/50 text-sm mt-2" style={{ fontFamily: FONT_FAMILY }}>Loading footer...</p>
//             </div>
//           </div>
//         </div>
//       </footer>
//     );
//   }

//   if (!footerData) {
//     return null;
//   }

//   const company = footerData.company || {};
//   const socialLinks = getSocialLinks();
//   const companyItems = getColumnItems('Company');
//   const supportItems = getColumnItems('Support');
//   const contactItems = getContactItems();
//   const showPaymentMethods = footerData.showPaymentMethods !== false;
//   const showCopyright = footerData.showCopyright !== false;
//   const hasLogo = company.logoUrl && company.logoUrl.trim() !== '';

//   const backgroundImage = footerData.backgroundImage || '';

//   return (
//     <footer className="relative text-white overflow-hidden bg-[#1A0E14]">
//       {/* Background Image with Gradient Overlay */}
//       {backgroundImage && backgroundImage.trim() !== '' && (
//         <div className="absolute inset-0 z-0">
//           <div 
//             className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//             style={{
//               backgroundImage: `url('${backgroundImage}')`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center',
//             }}
//           ></div>
//           <div className="absolute inset-0 bg-gradient-to-b from-[#1A0E14]/90 via-[#1A0E14]/85 to-[#1A0E14]/90"></div>
//           <div className="absolute inset-0 bg-gradient-to-t from-[#8B9D83]/5 via-transparent to-[#8B9D83]/5"></div>
//           <div className="absolute top-0 left-0 w-96 h-96 bg-[#8B9D83]/5 rounded-full filter blur-3xl"></div>
//           <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#6b7d63]/5 rounded-full filter blur-3xl"></div>
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#8B9D83]/3 rounded-full filter blur-3xl"></div>
//         </div>
//       )}
      
//       {/* Top Accent Line - Green */}
//       <div className="relative z-10 w-full h-0.5 bg-gradient-to-r from-[#8B9D83] via-[#6b7d63] to-[#8B9D83]"></div>
      
//       {/* Main Footer */}
//       <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8 lg:py-10">
        
//         {/* Main Grid - 50% Left / 50% Right */}
//         <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2">
          
//           {/* Left Side: Brand Info - Center on mobile, left on desktop */}
//           <div className="flex flex-col items-center text-center md:items-start md:text-left pr-0 md:pr-8">
//             {/* Logo */}
//             <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
//               {hasLogo ? (
//                 <img 
//                   src={company.logoUrl} 
//                   alt={company.name || 'Beauty Bucket'} 
//                   className="w-auto object-contain"
//                   style={{ height: '45px', width: 'auto' }}
//                 />
//               ) : (
//                 <div>
//                   <h2 className="text-xl md:text-2xl font-bold text-white" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     {company.name || 'Beauty Bucket'}
//                   </h2>
//                   <span className="text-[9px] md:text-[10px] text-[#8B9D83] tracking-wider uppercase" style={{ fontFamily: FONT_FAMILY }}>
//                     Premium Beauty
//                   </span>
//                 </div>
//               )}
//             </div>
            
//             <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-4 max-w-sm" style={{ fontFamily: FONT_FAMILY }}>
//               {company.description}
//             </p>

//             {/* Social Links - Center on mobile, left on desktop */}
//             <div className="flex items-center justify-center md:justify-start gap-2">
//               <span className="text-xs text-white/40 font-medium mr-1 hidden sm:inline" style={{ fontFamily: FONT_FAMILY }}>Follow us:</span>
//               {socialLinks.length > 0 ? (
//                 socialLinks.map((social, index) => {
//                   const IconComponent = SOCIAL_ICONS[social.platform];
//                   if (!IconComponent) return null;
//                   return (
//                     <motion.a
//                       key={social.platform || index}
//                       href={social.url || '#'}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#8B9D83] hover:text-white hover:border-[#8B9D83] transition-all duration-300 group"
//                       whileHover={{ y: -2 }}
//                       title={social.platform}
//                     >
//                       <IconComponent size={11} className="text-white/70 group-hover:text-white sm:text-[12px]" />
//                     </motion.a>
//                   );
//                 })
//               ) : (
//                 <>
//                   <motion.a href="#" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#8B9D83] transition-all duration-300 group" whileHover={{ y: -2 }}>
//                     <FaFacebookF size={11} className="text-white/70 group-hover:text-white sm:text-[12px]" />
//                   </motion.a>
//                   <motion.a href="#" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#8B9D83] transition-all duration-300 group" whileHover={{ y: -2 }}>
//                     <FaInstagram size={11} className="text-white/70 group-hover:text-white sm:text-[12px]" />
//                   </motion.a>
//                   <motion.a href="#" className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#8B9D83] transition-all duration-300 group" whileHover={{ y: -2 }}>
//                     <FaYoutube size={11} className="text-white/70 group-hover:text-white sm:text-[12px]" />
//                   </motion.a>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Right Side: Navigation Columns - 50% */}
//           <div className="grid grid-cols-3 gap-.5  md:gap-4">
            
//             {/* Company Column */}
//             <div>
//               <h3 className="text-[10px] sm:text-xs font-bold text-white/60 mb-2 sm:mb-3 uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>
//                 Company
//               </h3>
//               <ul className="space-y-1.5 sm:space-y-2">
//                 {(companyItems.length > 0 ? companyItems : [
//                   { id: '1', label: 'Home', url: '/' },
//                   { id: '2', label: 'Products', url: '/products' },
//                   { id: '3', label: 'Track Order', url: '/track' },
//                   { id: '4', label: 'About Us', url: '/about' },
//                 ]).map((link) => (
//                   <li key={link.id}>
//                     <Link 
//                       href={link.url}
//                       className="text-white/50 hover:text-[#8B9D83] transition-colors duration-200 text-[10px] sm:text-[13px]"
//                       style={{ fontFamily: FONT_FAMILY }}
//                     >
//                       {link.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Support Column */}
//             <div className="-ml-4  ">
//               <h3 className="text-[10px] sm:text-xs font-bold text-white/60 mb-2 sm:mb-3 uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>
//                 Support
//               </h3>
//               <ul className="space-y-1.5 sm:space-y-2">
//                 {(supportItems.length > 0 ? supportItems : [
//                   { id: '1', label: 'Contact Us', url: '/contact' },
//                   { id: '2', label: 'Register', url: '/register' },
//                   { id: '3', label: 'Terms & Conditions', url: '/terms' },
//                   { id: '4', label: 'Privacy Policy', url: '/privacy' },
//                 ]).map((link) => (
//                   <li key={link.id}>
//                     <Link 
//                       href={link.url}
//                       className="text-white/50 hover:text-[#8B9D83] transition-colors duration-200 text-[10px] sm:text-[13px]"
//                       style={{ fontFamily: FONT_FAMILY }}
//                     >
//                       {link.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Contact Us Column */}
//             <div className="-ml-4">
//               <h3 className="text-[10px] sm:text-xs font-bold text-white/60 mb-2 sm:mb-3 uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>
//                 Contact
//               </h3>
              
//               <div className="space-y-1.5 sm:space-y-2">
//                 {contactItems.length > 0 ? (
//                   contactItems.map((item) => renderContactItem(item))
//                 ) : (
//                   <>
//                     <motion.a 
//                       href={`https://maps.google.com/?q=${encodeURIComponent('Dhaka, Bangladesh')}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="flex items-start gap-1.5 sm:gap-2 text-white/50 hover:text-[#8B9D83] transition-colors group"
//                       style={{ fontFamily: FONT_FAMILY }}
//                       whileHover={{ x: 2 }}
//                     >
//                       <FaMapMarkerAlt className="text-[#8B9D83] text-[10px] sm:text-[11px] mt-0.5 flex-shrink-0" />
//                       <span className="text-[10px] sm:text-[13px] leading-tight">Dhaka, Bangladesh</span>
//                     </motion.a>
                    
//                     <motion.a 
//                       href="tel:+8801XXXXXXXXX"
//                       className="flex items-center gap-1.5 sm:gap-2 text-white/50 hover:text-[#8B9D83] transition-colors group"
//                       style={{ fontFamily: FONT_FAMILY }}
//                       whileHover={{ x: 2 }}
//                     >
//                       <FaPhone className="text-[#8B9D83] text-[10px] sm:text-[11px] flex-shrink-0" />
//                       <span className="text-[10px] sm:text-[13px]">+880 1XXXXXXXXX</span>
//                     </motion.a>
                    
//                     <motion.button 
//                       onClick={() => openGmail('support@beautybucket.com')}
//                       className="flex items-center gap-1.5 sm:gap-2 text-white/50 hover:text-[#8B9D83] transition-colors group w-full text-left"
//                       style={{ fontFamily: FONT_FAMILY }}
//                       whileHover={{ x: 2 }}
//                     >
//                       <FaEnvelope className="text-[#8B9D83] text-[10px] sm:text-[11px] flex-shrink-0" />
//                       <span className="text-[10px] sm:text-[13px] break-all">support@beautybucket.com</span>
//                     </motion.button>
                    
//                     <div className="flex items-start gap-1.5 sm:gap-2 text-white/50" style={{ fontFamily: FONT_FAMILY }}>
//                       <FaClock className="text-[#8B9D83] text-[10px] sm:text-[11px] mt-0.5 flex-shrink-0" />
//                       <span className="text-[10px] sm:text-[13px] leading-tight">Always Open</span>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//           </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="pt-3 mt-3 border-t border-white/10">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
//             {showCopyright && (
//               <p className="text-white/40 text-[10px] sm:text-[11px]" style={{ fontFamily: FONT_FAMILY }}>
//                 © {currentYear} <span className="text-[#8B9D83] font-medium">{company.name || 'Beauty Bucket'}</span>. {footerData.footerText || 'All rights reserved.'}
//               </p>
//             )}
            
//             <div className="flex items-center gap-2">
//               <span className="text-white/40 text-[10px] sm:text-[11px]" style={{ fontFamily: FONT_FAMILY }}>Made with</span>
//               <FaHeart className="text-[#8B9D83] text-[9px] sm:text-[10px]" />
//               <span className="text-white/40 text-[10px] sm:text-[11px]" style={{ fontFamily: FONT_FAMILY }}>for beauty lovers</span>
//             </div>
            
//             {/* Payment Methods */}
//             {showPaymentMethods && footerData.paymentMethods && footerData.paymentMethods.length > 0 && (
//               <div className="flex items-center gap-2">
//                 <span className="text-white/40 text-[10px] sm:text-[11px]" style={{ fontFamily: FONT_FAMILY }}>Secure:</span>
//                 <div className="flex gap-1">
//                   {footerData.paymentMethods
//                     .filter(pm => pm.active)
//                     .map((pm) => (
//                       <div key={pm.method} className="px-1.5 sm:px-2 py-0.5 bg-white/10 rounded border border-white/20 text-[9px] sm:text-[10px] text-white/40" style={{ fontFamily: FONT_FAMILY }}>
//                         {pm.method.charAt(0).toUpperCase() + pm.method.slice(1)}
//                       </div>
//                     ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaPhone, FaEnvelope,
  FaMapMarkerAlt, FaClock, FaYoutube, FaLinkedinIn, FaPinterestP, FaTiktok,
  FaHeart, FaTag
} from 'react-icons/fa';

const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

const SOCIAL_ICONS = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  twitter: FaTwitter,
  whatsapp: FaWhatsapp,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
  pinterest: FaPinterestP,
  tiktok: FaTiktok,
};

// ============================================================
// Palette — maroon bg, white text, cream hover
// ============================================================
const BG_COLOR = '#8F2530';       // maroon
const WHITE = '#FFFFFF';          // default text
const CREAM = '#F1EFE3';          // hover text

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [footerData, setFooterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/footer`
        );
        if (!res.ok) throw new Error('Failed to fetch footer data');
        const data = await res.json();
        if (data.success && data.data) setFooterData(data.data);
        else throw new Error('Invalid footer data');
      } catch (err) {
        console.error('Error fetching footer data:', err);
        setFooterData(getDefaultFooterData());
      } finally {
        setIsLoading(false);
      }
    };
    fetchFooterData();
  }, []);

  const getDefaultFooterData = () => ({
    backgroundImage: '',
    company: {
      name: "Nishita's Creation",
      tagline: 'ব্লকপ্রিন্ট, এপ্লিক ও যশোরের হাতের কাজের পণ্য',
      description: 'নিজস্ব কারখানা ও দক্ষ কারিগরের হাত ধরে তৈরি প্রতিটি পণ্য — ঐতিহ্য, শিল্প ও যত্নের ছোঁয়ায়। সারা বাংলাদেশে দ্রুত ডেলিভারি ও নির্ভরযোগ্য সেবা।',
      logoUrl: "/images/logo3.png",
    },
    columns: [
      { id: 'd1', title: 'Company', type: 'links',
        items: [
          { id: 'l1', type: 'link', label: 'Home', url: '/' },
          { id: 'l2', type: 'link', label: 'Products', url: '/products' },
          { id: 'l3', type: 'link', label: 'Track Order', url: '/track' },
          { id: 'l4', type: 'link', label: 'About Us', url: '/about' },
        ] },
      { id: 'd2', title: 'Support', type: 'support',
        items: [
          { id: 's1', type: 'link', label: 'Contact Us', url: '/contact' },
          { id: 's2', type: 'link', label: 'Register', url: '/register' },
          { id: 's3', type: 'link', label: 'Terms', url: '/terms' },
          { id: 's4', type: 'link', label: 'Privacy', url: '/privacy' },
        ],
        socialLinks: [
          { platform: 'facebook', url: '#', active: true },
          { platform: 'instagram', url: '#', active: true },
        ] },
      { id: 'd3', title: 'Explore', type: 'links',
        items: [
          { id: 'e1', type: 'link', label: 'Courses', url: '/courses' },
          { id: 'e2', type: 'link', label: 'Videos', url: '/videos' },
        ] },
      { id: 'd4', title: 'Contact Us', type: 'contact',
        items: [
          { id: 'c1', type: 'address', value: 'Dhaka, Bangladesh' },
          { id: 'c2', type: 'phone', value: '+880 1XXXXXXXXX' },
          { id: 'c3', type: 'email', value: 'support@nishitascreation.com' },
          { id: 'c4', type: 'hours', value: 'Always Open' },
        ] },
    ],
    trustBadges: [], paymentMethods: [],
    showTrustBadges: true, showPaymentMethods: true,
    footerText: 'All rights reserved.', showCopyright: true,
  });

  const getSocialLinks = () => {
    if (!footerData) return [];
    const col = footerData.columns?.find(c => c.type === 'support' || c.type === 'social');
    return col?.socialLinks?.filter(l => l.active) || [];
  };

  const openGmail = (email) =>
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');

  if (isLoading) {
    return (
      <footer className="relative overflow-hidden" style={{ background: BG_COLOR }}>
        <div className="container mx-auto px-4 py-6 relative z-10">
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <div
                className="inline-block w-8 h-8 border-4 rounded-full animate-spin"
                style={{ borderColor: 'rgba(255,255,255,0.2)', borderTopColor: WHITE }}
              ></div>
              <p className="text-sm mt-2" style={{ fontFamily: FONT_FAMILY, color: 'rgba(255,255,255,0.55)' }}>
                Loading footer...
              </p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  if (!footerData) return null;

  const company = footerData.company || {};
  const socialLinks = getSocialLinks();
  const hasLogo = company.logoUrl && company.logoUrl.trim() !== '';

  const backgroundImage = (footerData.backgroundImage || '').trim();
  const hasBackgroundImage = backgroundImage !== '';

  // ============================================================
  // Text colors — always white on maroon / image
  // ============================================================
  const TEXT_PRIMARY = WHITE;
  const TEXT_MUTED = 'rgba(255,255,255,0.80)';
  const TEXT_FAINT = 'rgba(255,255,255,0.60)';
  const BORDER_SOFT = 'rgba(255,255,255,0.18)';
  const HOVER_COLOR = CREAM; // #F1EFE3

  const rightColumns = (footerData.columns || []).slice(0, 4);

  // --------------- Contact item renderer ---------------
  const renderContactItem = (item) => {
    const icons = { address: FaMapMarkerAlt, phone: FaPhone, email: FaEnvelope, hours: FaClock };
    const Icon = icons[item.type];
    if (!Icon) return null;

    const value = item.value || item.label || '';
    if (!value) return null;

    const baseClass =
      'flex items-start gap-1.5 sm:gap-2 transition-colors w-full text-left';

    if (item.type === 'email') {
      return (
        <motion.button
          key={item.id}
          onClick={() => openGmail(value)}
          className={baseClass}
          style={{ fontFamily: FONT_FAMILY, color: TEXT_MUTED }}
          onMouseEnter={(e) => (e.currentTarget.style.color = HOVER_COLOR)}
          onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_MUTED)}
          whileHover={{ x: 2 }}
        >
          <Icon className="text-[10px] sm:text-[11px] flex-shrink-0 mt-0.5" style={{ color: WHITE }} />
          <span className="text-[11px] sm:text-[13px] break-all">{value}</span>
        </motion.button>
      );
    }
    if (item.type === 'address') {
      return (
        <motion.a
          key={item.id}
          href={`https://maps.google.com/?q=${encodeURIComponent(value)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClass}
          style={{ fontFamily: FONT_FAMILY, color: TEXT_MUTED }}
          onMouseEnter={(e) => (e.currentTarget.style.color = HOVER_COLOR)}
          onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_MUTED)}
          whileHover={{ x: 2 }}
        >
          <Icon className="text-[10px] sm:text-[11px] mt-0.5 flex-shrink-0" style={{ color: WHITE }} />
          <span className="text-[11px] sm:text-[13px] leading-tight">{value}</span>
        </motion.a>
      );
    }
    if (item.type === 'phone') {
      return (
        <motion.a
          key={item.id}
          href={`tel:${value}`}
          className={baseClass}
          style={{ fontFamily: FONT_FAMILY, color: TEXT_MUTED }}
          onMouseEnter={(e) => (e.currentTarget.style.color = HOVER_COLOR)}
          onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_MUTED)}
          whileHover={{ x: 2 }}
        >
          <Icon className="text-[10px] sm:text-[11px] flex-shrink-0 mt-0.5" style={{ color: WHITE }} />
          <span className="text-[11px] sm:text-[13px]">{value}</span>
        </motion.a>
      );
    }
    if (item.type === 'hours') {
      return (
        <div
          key={item.id}
          className={baseClass}
          style={{ fontFamily: FONT_FAMILY, color: TEXT_MUTED }}
        >
          <Icon className="text-[10px] sm:text-[11px] mt-0.5 flex-shrink-0" style={{ color: WHITE }} />
          <span className="text-[11px] sm:text-[13px] leading-tight">{value}</span>
        </div>
      );
    }
    return null;
  };

  // --------------- Link column renderer ---------------
  const renderLinkColumnItems = (column) => {
    const items = column.items || [];
    if (items.length === 0) {
      return (
        <p className="text-[10px] sm:text-[12px]" style={{ fontFamily: FONT_FAMILY, color: TEXT_FAINT }}>
          No items
        </p>
      );
    }
    return (
      <ul className="space-y-1.5 sm:space-y-2">
        {items.map((item) => {
          const url = item.url || '#';
          const label = item.label || item.category?.name || 'Untitled';
          const isCategory = item.type === 'category';
          return (
            <li key={item.id}>
              <Link
                href={url}
                className="text-[11px] sm:text-[13px] flex items-center gap-1 group transition-colors"
                style={{ fontFamily: FONT_FAMILY, color: TEXT_MUTED }}
                onMouseEnter={(e) => (e.currentTarget.style.color = HOVER_COLOR)}
                onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_MUTED)}
              >
                {isCategory && (
                  <FaTag
                    className="text-[7px] sm:text-[8px] opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    style={{ color: WHITE }}
                  />
                )}
                <span className="truncate">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: hasBackgroundImage ? 'transparent' : BG_COLOR,
      }}
    >
      {/* ====================================================
          BACKGROUND IMAGE LAYER (only when image exists)
      ==================================================== */}
      {hasBackgroundImage && (
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
          />
          {/* Dark overlay for legible white text */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/65 to-black/70" />
        </div>
      )}

      {/* Top accent line — white */}
      <div
        className="relative z-10 w-full h-0.5"
        style={{
          background: `linear-gradient(to right, rgba(255,255,255,0.35), rgba(255,255,255,0.75), rgba(255,255,255,0.35))`,
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8 lg:py-10">

        {/* ====================================================
            MAIN GRID — 40% brand / 60% columns on desktop
        ==================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-6 md:gap-6">

          {/* LEFT: BRAND */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left md:pr-6">
            <div className="flex flex-col items-center md:items-start gap-2 mb-3">
              {hasLogo ? (
                <img
                  src={company.logoUrl}
                  alt={company.name || 'Logo'}
                  className="w-auto object-contain"
                  style={{ height: '50px' }}
                />
              ) : (
                <h2
                  className="text-lg md:text-xl font-bold"
                  style={{ fontFamily: FONT_FAMILY_PLAYFAIR, color: TEXT_PRIMARY }}
                >
                  {company.name || "Nishita's Creation"}
                </h2>
              )}

              {company.tagline && (
                <span
                  className="text-[10px] md:text-[11px] tracking-wide text-center md:text-left max-w-md"
                  style={{ fontFamily: FONT_FAMILY, color: TEXT_FAINT }}
                >
                  {company.tagline}
                </span>
              )}
            </div>

            <p
              className="text-xs sm:text-[13px] leading-relaxed mb-4 max-w-md"
              style={{ fontFamily: FONT_FAMILY, color: TEXT_MUTED }}
            >
              {company.description}
            </p>

            {/* Social */}
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span
                className="text-[11px] font-medium mr-1 hidden sm:inline"
                style={{ fontFamily: FONT_FAMILY, color: TEXT_FAINT }}
              >
                Follow us:
              </span>
              {socialLinks.map((social, index) => {
                const Icon = SOCIAL_ICONS[social.platform];
                if (!Icon) return null;
                const socialBg = 'rgba(255,255,255,0.10)';
                return (
                  <motion.a
                    key={social.platform || index}
                    href={social.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group"
                    style={{
                      background: socialBg,
                      border: `1px solid ${BORDER_SOFT}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = CREAM;
                      e.currentTarget.style.borderColor = CREAM;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = socialBg;
                      e.currentTarget.style.borderColor = BORDER_SOFT;
                    }}
                    whileHover={{ y: -2 }}
                  >
                    <Icon
                      size={11}
                      className="transition-colors group-hover:!text-[#8F2530]"
                      style={{ color: WHITE }}
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* RIGHT: 4 COLUMNS */}
         {/* RIGHT: 4 COLUMNS — last column pulled further left on desktop */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-4 md:gap-x-0 lg:gap-x-0">
  {rightColumns.map((col, idx) => {
    if (!col) return <div key={`empty-${idx}`} />;

    const isLast = idx === rightColumns.length - 1;
    // Push last column further left (negative margin)
    const lastClass = isLast ? 'md:-ml-6 lg:-ml-12' : '';

    if (col.type === 'contact') {
      return (
        <div key={col.id || idx} className={lastClass}>
          <h3
            className="text-[10px] sm:text-xs font-bold mb-2 sm:mb-3 uppercase tracking-wider"
            style={{ fontFamily: FONT_FAMILY, color: TEXT_PRIMARY }}
          >
            {col.title || 'Contact'}
          </h3>
          <div className="space-y-1.5 sm:space-y-2">
            {(col.items || []).map((it) => renderContactItem(it))}
          </div>
        </div>
      );
    }

    return (
      <div key={col.id || idx} className={lastClass}>
        <h3
          className="text-[10px] sm:text-xs font-bold mb-2 sm:mb-3 uppercase tracking-wider"
          style={{ fontFamily: FONT_FAMILY, color: TEXT_PRIMARY }}
        >
          {col.title}
        </h3>
        {renderLinkColumnItems(col)}
      </div>
    );
  })}
</div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-3 mt-5 -mb-6" style={{ borderTop: `1px solid ${BORDER_SOFT}` }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
            {footerData.showCopyright !== false && (
              <p
                className="text-[10px] sm:text-[11px]"
                style={{ fontFamily: FONT_FAMILY, color: TEXT_FAINT }}
              >
                © {currentYear}{' '}
                <span style={{ color: TEXT_PRIMARY, fontWeight: 500 }}>
                  {company.name || "Nishita's Creation"}
                </span>
                . {footerData.footerText || 'All rights reserved.'}
              </p>
            )}

            <div className="flex items-center gap-2">
              <span
                className="text-[10px] sm:text-[11px]"
                style={{ fontFamily: FONT_FAMILY, color: TEXT_FAINT }}
              >
                Made with
              </span>
              <FaHeart className="text-[9px] sm:text-[10px]" style={{ color: WHITE }} />
              <span
                className="text-[10px] sm:text-[11px]"
                style={{ fontFamily: FONT_FAMILY, color: TEXT_FAINT }}
              >
                for beauty lovers
              </span>
            </div>

            {footerData.showPaymentMethods !== false && footerData.paymentMethods?.length > 0 && (
              <div className="flex items-center gap-2">
                <span
                  className="text-[10px] sm:text-[11px]"
                  style={{ fontFamily: FONT_FAMILY, color: TEXT_FAINT }}
                >
                  Secure:
                </span>
                <div className="flex gap-1">
                  {footerData.paymentMethods
                    .filter((pm) => pm.active)
                    .map((pm) => (
                      <div
                        key={pm.method}
                        className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px]"
                        style={{
                          fontFamily: FONT_FAMILY,
                          color: TEXT_MUTED,
                          background: 'rgba(255,255,255,0.10)',
                          border: `1px solid ${BORDER_SOFT}`,
                        }}
                      >
                        {pm.method.charAt(0).toUpperCase() + pm.method.slice(1)}
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}