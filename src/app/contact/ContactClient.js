
// // app/contact/ContactClient.js
// 'use client';

// import { motion, AnimatePresence } from 'framer-motion';
// import Link from 'next/link';
// import { useState, useEffect } from 'react';

// import {
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaClock,
//   FaPaperPlane,
//   FaCheckCircle,
//   FaArrowRight,
//   FaUser,
//   FaFacebookF,
//   FaInstagram,
//   FaYoutube,
//   FaPinterestP,
//   FaTiktok,
//   FaShieldAlt,
//   FaTruck,
//   FaHeart,
//   FaStar,
//   FaGlobe,
//   FaWhatsapp,
//   FaAward,
//   FaUsers,
//   FaGem,
// } from 'react-icons/fa';

// import {
//   GiLipstick,
//   GiSparkles,
// } from 'react-icons/gi';

// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // ============================================================
// // FONTS - Beauty Bucket Theme
// // ============================================================

// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_PLAYFAIR = " serif";

// // ============================================================
// // ICON MAP
// // ============================================================

// const ICON_MAP = {
//   FaHeart,
//   FaShieldAlt,
//   FaTruck,
//   FaCheckCircle,
//   FaClock,
//   FaStar,
//   FaUsers,
//   FaAward,
//   FaGlobe,
//   FaWhatsapp,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaGem,
//   GiLipstick,
//   GiSparkles,

//   // Aliases
//   Heart: FaHeart,
//   Shield: FaShieldAlt,
//   CheckCircle: FaCheckCircle,
//   Truck: FaTruck,
//   Clock: FaClock,
//   Star: FaStar,
//   Users: FaUsers,
//   Award: FaAward,
//   Globe: FaGlobe,
//   Whatsapp: FaWhatsapp,
//   Phone: FaPhone,
//   Envelope: FaEnvelope,
//   MapMarker: FaMapMarkerAlt,
//   Gem: FaGem,
//   Lipstick: GiLipstick,
//   Sparkles: GiSparkles,
// };

// const SOCIAL_ICON_MAP = {
//   FaFacebookF,
//   FaInstagram,
//   FaYoutube,
//   FaPinterest: FaPinterestP,
//   FaPinterestP,
//   FaTiktok,
// };

// const getIcon = (iconName) => {
//   if (!iconName) return FaStar;
//   return ICON_MAP[iconName] || FaStar;
// };

// const getSocialIcon = (iconName) => {
//   if (!iconName) return FaFacebookF;
//   return SOCIAL_ICON_MAP[iconName] || FaFacebookF;
// };

// // ============================================================
// // ANIMATION VARIANTS
// // ============================================================

// const fadeInUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: 'easeOut' },
//   },
// };

// const fadeInLeft = {
//   hidden: { opacity: 0, x: -40 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.7, ease: 'easeOut' },
//   },
// };

// const fadeInRight = {
//   hidden: { opacity: 0, x: 40 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     transition: { duration: 0.7, ease: 'easeOut' },
//   },
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1, delayChildren: 0.1 },
//   },
// };

// const scaleUp = {
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: { duration: 0.45, ease: 'easeOut' },
//   },
// };

// // ============================================================
// // COMPONENT
// // ============================================================

// export default function ContactClient() {
//   const [contactData, setContactData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     subject: '',
//     message: '',
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formStatus, setFormStatus] = useState({
//     submitted: false,
//     success: false,
//     message: '',
//   });

//   // ============================================================
//   // FORM CHANGE
//   // ============================================================

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ============================================================
//   // FORM SUBMIT
//   // ============================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setFormStatus({ submitted: true, success: false, message: 'Sending...' });
//     setIsSubmitting(true);

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//       const response = await fetch(`${apiUrl}/api/contact`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           phone: formData.phone,
//           subject: formData.subject || 'General Inquiry',
//           message: formData.message,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         setFormStatus({
//           submitted: true,
//           success: true,
//           message: data.message || "Thank you! We'll get back to you within 24 hours.",
//         });
//         setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

//         setTimeout(() => {
//           setFormStatus({ submitted: false, success: false, message: '' });
//         }, 5000);
//       } else {
//         throw new Error(data.error || 'Failed to send message');
//       }
//     } catch (error) {
//       console.error('Contact form error:', error);
//       setFormStatus({
//         submitted: true,
//         success: false,
//         message: error.message || 'Failed to send message. Please try again later.',
//       });

//       setTimeout(() => {
//         setFormStatus({ submitted: false, success: false, message: '' });
//       }, 5000);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // ============================================================
//   // DEFAULT DATA
//   // ============================================================

//   const defaultData = {
//     hero: {
//       bgImage: '/images/bg10.jpg',
//       badge: 'Get in Touch',
//       title: "We'd Love to",
//       highlightText: 'Hear From You',
//       description:
//         "Have questions about products, orders, or anything else? We're here to help and respond within 24 hours.",
//     },
//     stats: [
//       { icon: 'FaUsers', value: '10K+', label: 'Happy Customers' },
//       { icon: 'FaStar', value: '4.9/5', label: 'Average Rating' },
//       { icon: 'FaAward', value: '100%', label: 'Authentic Products' },
//       { icon: 'FaClock', value: '24/7', label: 'Support Available' },
//     ],
//     quickContacts: [
//       {
//         icon: 'FaPhone',
//         label: 'Phone',
//         value: '+880 1XXXXXXX',
//         link: 'tel:+8801XXXXXXX',
//       },
//       {
//         icon: 'FaWhatsapp',
//         label: 'WhatsApp',
//         value: '+880 1XXXXXXX',
//         link: 'https://wa.me/8801XXXXXXX',
//       },
//       {
//         icon: 'FaEnvelope',
//         label: 'Email',
//         value: 'support@beautybucket.com',
//         link: 'mailto:support@beautybucket.com',
//       },
//       {
//         icon: 'FaMapMarkerAlt',
//         label: 'Our Shop',
//         value: 'House #470, Avenue #6, Road #6, Mirpur DOHS, Dhaka',
//         link: 'https://maps.google.com',
//       },
//     ],
//     leftSide: {
//       badge: 'Beauty Bucket',
//       title: "Let's Connect",
//       subtitle: '& Make Beauty Happen',
//       description:
//         'Whether you have questions about a product, need assistance with an order, or just want some beauty advice - our team is ready to help you.',
//       features: [
//         {
//           icon: 'CheckCircle',
//           title: 'Quick Response',
//           description: 'We reply within 24 hours',
//         },
//         {
//           icon: 'Shield',
//           title: 'Expert Advice',
//           description: 'Get guidance from beauty experts',
//         },
//         {
//           icon: 'Truck',
//           title: 'Order Support',
//           description: 'Track and manage your orders',
//         },
//       ],
//     },
//     socialLinks: [
//       { platform: 'facebook', url: '#', icon: 'FaFacebookF', color: 'hover:bg-[#1877F2]' },
//       { platform: 'instagram', url: '#', icon: 'FaInstagram', color: 'hover:bg-[#E4405F]' },
//       { platform: 'youtube', url: '#', icon: 'FaYoutube', color: 'hover:bg-[#FF0000]' },
//       { platform: 'pinterest', url: '#', icon: 'FaPinterest', color: 'hover:bg-[#BD081C]' },
//       { platform: 'tiktok', url: '#', icon: 'FaTiktok', color: 'hover:bg-[#000000]' },
//     ],
//     map: {
//       title: 'Find Us',
//       embedCode:
//         'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.5029279808477!2d90.3686038739732!3d23.83626858547701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c14a38f924d3%3A0x39a8c038652ae720!2sHouse%20470%2C%20R9PC%2BHGM%2C%206%20Avenue%206%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1781765267904!5m2!1sen!2sbd',
//     },
//     cta: {
//       bgImage: '/images/pattern.png',
//       badge: 'Still Have Questions?',
//       title: "We're Here to Help",
//       description: 'Our beauty experts are ready to assist you with any questions about products or orders.',
//       buttonText: 'Call Now',
//       buttonLink: 'tel:+8801871733305',
//       secondaryButtonText: 'Browse Products',
//       secondaryButtonLink: '/products',
//     },
//     form: {
//       title: 'Get In Touch',
//       description: "Fill in the form and we'll get back to you within 24 hours",
//       successMessage: "Thank you! We'll get back to you within 24 hours.",
//     },
//   };

//   // ============================================================
//   // FETCH CONTACT DATA
//   // ============================================================

//   useEffect(() => {
//     const fetchContactData = async () => {
//       try {
//         setIsLoading(true);
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
//         const response = await fetch(`${apiUrl}/api/contact`, {
//           method: 'GET',
//           headers: { 'Content-Type': 'application/json' },
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch contact data: ${response.status}`);
//         }

//         const result = await response.json();

//         if (result.success && result.data) {
//           const mergedData = {
//             hero: { ...defaultData.hero, ...result.data.hero },
//             stats: result.data.stats || defaultData.stats,
//             quickContacts: result.data.quickContacts || defaultData.quickContacts,
//             leftSide: { ...defaultData.leftSide, ...result.data.leftSide },
//             socialLinks: result.data.socialLinks || defaultData.socialLinks,
//             faq: { ...defaultData.faq, ...result.data.faq },
//             map: { ...defaultData.map, ...result.data.map },
//             cta: { ...defaultData.cta, ...result.data.cta },
//             form: { ...defaultData.form, ...result.data.form },
//           };
//           setContactData(mergedData);
//         } else {
//           setContactData(defaultData);
//         }
//       } catch (err) {
//         console.error('❌ Error fetching contact data:', err);
//         setContactData(defaultData);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchContactData();
//   }, []);

//   // ============================================================
//   // LOADING
//   // ============================================================

//   if (isLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-[#f8f7f2] flex items-center justify-center -mt-20">
//           <div className="text-center">
//             <div className="inline-block w-8 h-8 border-4 border-[#8B9D83] border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-[#53645a] mt-3 text-sm" style={{ fontFamily: FONT_FAMILY }}>
//               Loading...
//             </p>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const data = contactData || defaultData;
//   const { hero, quickContacts, leftSide, socialLinks, map, cta, form } = data;

//   let mapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3649.5029279808477!2d90.3686038739732!3d23.83626858547701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c14a38f924d3%3A0x39a8c038652ae720!2sHouse%20470%2C%20R9PC%2BHGM%2C%206%20Avenue%206%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1781765267904!5m2!1sen!2sbd';

//   if (map?.embedCode) {
//     if (map.embedCode.includes('<iframe')) {
//       const srcMatch = map.embedCode.match(/src="([^"]+)"/);
//       if (srcMatch && srcMatch[1]) mapSrc = srcMatch[1];
//     } else if (map.embedCode.startsWith('http://') || map.embedCode.startsWith('https://')) {
//       mapSrc = map.embedCode;
//     }
//   }

//   return (
//     <>
//       <Navbar />

//       <main className="min-h-screen bg-[#f8f7f2] overflow-hidden -mt-20">

//         {/* ======================================================
//             HERO - REFERENCE STYLE / BEAUTY EDITORIAL
//         ====================================================== */}

//         <section className="relative min-h-[200px] sm:min-h-[200px] lg:min-h-[250px] overflow-hidden bg-[#f3eee7]">
          
//           {/* Background */}
//           <div className="absolute inset-0">
//             <div
//               className="absolute inset-0 bg-cover bg-center"
//               style={{
//                 backgroundImage: `url('${hero?.bgImage || '/images/bg10.jpg'}')`,
//               }}
//             />

//             {/* Soft cream overlay */}
//             <div className="absolute inset-0 bg-[#f3eee7]/5" />

//             {/* Left side readability gradient */}
//             <div className="absolute inset-0 bg-gradient-to-r from-[#f3eee7]/55 via-[#f3eee7]/25 to-transparent" />

//             {/* Very subtle right fade */}
//             <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-transparent to-[#f3eee7]/10" />
//           </div>

//           {/* Decorative soft shapes */}
//           <div className="absolute -left-20 -top-20 w-56 h-56 rounded-full bg-white/30 blur-3xl" />
//           <div className="absolute right-0 bottom-0 w-72 h-72 rounded-full bg-[#c9bca8]/10 blur-3xl" />

//           <div className="container mx-auto px-5 sm:px-8 lg:px-10 relative z-10 h-full">
//             <div className="min-h-[200px] sm:min-h-[200px] lg:min-h-[250px]  flex items-center">

//               <motion.div
//                 initial="hidden"
//                 animate="visible"
//                 variants={fadeInLeft}
//                 className="
//                   w-full
//                   max-w-[390px]
//                   sm:max-w-[460px]
//                   lg:max-w-[510px]
//                   py-10
//                   sm:py-12
//                   lg:py-14
//                 "
//               >

//                 {/* Small editorial label */}
//                 <div className="flex items-center gap-2 mb-3 sm:mb-4">
//                   <span className="w-7 sm:w-9 h-px bg-[#8B9D83]" />

//                   <span
//                     className="
//                       text-[8px]
//                       sm:text-[9px]
//                       uppercase
//                       tracking-[0.28em]
//                       text-[#68776b]
//                     "
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     {hero?.badge || 'Get in Touch'}
//                   </span>
//                 </div>

//                 {/* Main Heading */}
//                 <h1
//                   className="
//                     text-[32px]
//                     leading-[0.98]
//                     sm:text-[40px]
//                     sm:leading-[1]
//                     lg:text-[50px]
//                     lg:leading-[1]
//                     font-normal
//                     text-[#263b32]
//                     tracking-[-0.025em]
//                   "
//                   style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                 >
//                   {hero?.title || "We'd Love to"}

//                   <span
//                     className="
//                       block
//                       text-[#789072]
//                       font-normal
//                     "
//                   >
//                     {hero?.highlightText || 'Hear From You'}
//                   </span>
//                 </h1>

//                 {/* Small decorative line */}
//                 <div className="flex items-center gap-2 mt-4 mb-3">
//                   <span className="w-12 sm:w-16 h-[1px] bg-[#8B9D83]/60" />
//                   <span className="w-1 h-1 rounded-full bg-[#8B9D83]" />
//                 </div>

//                 {/* Description */}
//                 <p
//                   className="
//                     max-w-[330px]
//                     sm:max-w-[390px]
//                     text-[9px]
//                     sm:text-[10px]
//                     lg:text-[11px]
//                     leading-[1.7]
//                     text-[#59655d]
//                   "
//                   style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                 >
//                   {hero?.description ||
//                     "Have questions about products, orders, or anything else? We're here to help and respond within 24 hours."}
//                 </p>

//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* ======================================================
//             MAIN CONTACT AREA - Green Theme
//         ====================================================== */}

//         <section className="relative py-8 sm:py-14 lg:py-10 bg-[#f8f7f2]">
//           <div className="absolute top-0 right-0 w-80 h-80 bg-[#8B9D83]/5 rounded-full blur-3xl pointer-events-none" />
//           <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6b7d63]/5 rounded-full blur-3xl pointer-events-none" />

//           <div className="container mx-auto px-4 relative z-10">
//             <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

//               {/* ==================================================
//                   LEFT SIDE - Green Theme
//               ================================================== */}

//               <motion.div
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.15 }}
//                 variants={fadeInLeft}
//               >
//                 <div className="mb-5">
//                   <div className="flex items-center gap-2 mb-2">
//                     <span className="w-8 h-0.5 bg-[#8B9D83]" />
//                     <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#8B9D83]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       Contact Information
//                     </span>
//                   </div>
//                   <h2 className="text-2xl sm:text-3xl font-light text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
//                     We'd Love to Hear
//                     <span className="text-[#8B9D83] font-medium"> From You</span>
//                   </h2>
//                 </div>

//                 {/* Contact Cards */}
//                 <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
//                   {quickContacts?.map((info, idx) => {
//                     const Icon = getIcon(info.icon);
//                     return (
//                       <motion.a
//                         key={idx}
//                         href={info.link || '#'}
//                         variants={scaleUp}
//                         whileHover={{ y: -4 }}
//                         transition={{ duration: 0.2 }}
//                         className="group relative bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 border border-[#c5d5be]/60 hover:border-[#8B9D83]/40 shadow-sm hover:shadow-xl hover:shadow-[#8B9D83]/10 transition-all duration-300 overflow-hidden"
//                       >
//                         <div className="absolute inset-0 bg-gradient-to-br from-[#8B9D83]/0 to-[#8B9D83]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                         <div className="relative z-10">
//                           <div className="flex items-start gap-2 sm:gap-3">
//                             <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-[#f0f5ed] text-[#8B9D83] flex items-center justify-center flex-shrink-0 group-hover:bg-[#8B9D83] group-hover:text-white transition-all duration-300">
//                               <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
//                             </div>
//                             <div className="min-w-0">
//                               <h3 className="text-xs sm:text-sm font-medium text-[#263b32] mb-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                                 {info.label}
//                               </h3>
//                               <p className="text-[9px] sm:text-[11px] lg:text-xs text-[#53645a] leading-relaxed line-clamp-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                                 {info.value}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.a>
//                     );
//                   })}
//                 </motion.div>

//                 {/* Map - Green Theme */}
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.6 }}
//                   className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-[#c5d5be]/60 shadow-sm"
//                 >
//                   <div className="px-4 py-3 sm:px-5 sm:py-4 flex items-center justify-between border-b border-[#c5d5be]/40">
//                     <div className="flex items-center gap-2">
//                       <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#f0f5ed] flex items-center justify-center">
//                         <FaMapMarkerAlt className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8B9D83]" />
//                       </div>
//                       <div>
//                         <h3 className="text-sm sm:text-base font-medium text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
//                           {map?.title || 'Find Us'}
//                         </h3>
//                         <p className="text-[9px] sm:text-[10px] text-[#53645a]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                           Visit our location
//                         </p>
//                       </div>
//                     </div>
//                     <a
//                       href={quickContacts?.find((item) => item.icon === 'FaMapMarkerAlt')?.link || 'https://maps.google.com'}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-[10px] sm:text-xs text-[#8B9D83] font-medium flex items-center gap-1 hover:gap-2 transition-all"
//                       style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                     >
//                       Open Map
//                       <FaArrowRight className="w-2.5 h-2.5" />
//                     </a>
//                   </div>
//                   <iframe
//                     src={mapSrc}
//                     width="100%"
//                     height="260"
//                     style={{ border: 0 }}
//                     allowFullScreen
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                     className="w-full h-[220px] sm:h-[260px] lg:h-[280px]"
//                     title="BeautyBucket Location"
//                   />
//                 </motion.div>
//               </motion.div>

//               {/* ==================================================
//                   RIGHT SIDE - FORM - Green Theme
//               ================================================== */}

//               <motion.div
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.15 }}
//                 variants={fadeInRight}
//               >
//                 <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#c5d5be]/60 shadow-xl shadow-[#8B9D83]/5 p-5 sm:p-7 lg:p-8">
//                   <div className="mb-6">
//                     <div className="flex items-center gap-2 mb-2">
//                       <span className="w-7 h-0.5 bg-[#8B9D83]" />
//                       <span className="text-xs uppercase tracking-[0.15em] text-[#8B9D83] font-medium" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                         Send a Message
//                       </span>
//                     </div>
//                     <h2 className="text-2xl sm:text-3xl font-light text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
//                       {form?.title || 'Get In Touch'}
//                     </h2>
//                     <p className="text-xs sm:text-sm text-[#53645a] mt-2" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       {form?.description || "Fill in the form and we'll get back to you within 24 hours"}
//                     </p>
//                   </div>

//                   <AnimatePresence mode="wait">
//                     {formStatus.submitted && formStatus.success ? (
//                       <motion.div
//                         initial={{ opacity: 0, scale: 0.95 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.95 }}
//                         className="bg-green-50 border border-green-200 rounded-2xl p-7 sm:p-10 text-center"
//                       >
//                         <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                           <FaCheckCircle className="text-green-600 w-8 h-8" />
//                         </div>
//                         <h3 className="text-xl font-light text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
//                           Message Sent! ✨
//                         </h3>
//                         <p className="text-sm text-[#53645a] mb-5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                           {formStatus.message}
//                         </p>
//                         <button
//                           onClick={() => setFormStatus({ submitted: false, success: false, message: '' })}
//                           className="text-[#8B9D83] font-medium text-sm hover:underline"
//                           style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                         >
//                           Send Another Message →
//                         </button>
//                       </motion.div>
//                     ) : (
//                       <form onSubmit={handleSubmit} className="space-y-4">
//                         {/* Name */}
//                         <div>
//                           <label className="block text-xs font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                             Name <span className="text-[#8B9D83]">*</span>
//                           </label>
//                           <div className="relative">
//                             <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B9D83]/40 w-3.5 h-3.5" />
//                             <input
//                               type="text"
//                               name="name"
//                               value={formData.name}
//                               onChange={handleChange}
//                               required
//                               placeholder="Your Name"
//                               className="w-full pl-10 pr-4 py-3 text-sm border border-[#c5d5be]/50 rounded-xl bg-white text-[#263b32] placeholder:text-[#8B9D83] outline-none focus:border-[#8B9D83] focus:ring-2 focus:ring-[#8B9D83]/20 transition-all"
//                               style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                             />
//                           </div>
//                         </div>

//                         {/* Email + Phone */}
//                         <div className="grid sm:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-xs font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                               Email <span className="text-[#8B9D83]">*</span>
//                             </label>
//                             <div className="relative">
//                               <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B9D83]/40 w-3.5 h-3.5" />
//                               <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="info@email.com"
//                                 className="w-full pl-10 pr-3 py-3 text-sm border border-[#c5d5be]/50 rounded-xl bg-white text-[#263b32] placeholder:text-[#8B9D83] outline-none focus:border-[#8B9D83] focus:ring-2 focus:ring-[#8B9D83]/20 transition-all"
//                                 style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                               />
//                             </div>
//                           </div>

//                           <div>
//                             <label className="block text-xs font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                               Phone <span className="text-[#8B9D83]">*</span>
//                             </label>
//                             <div className="relative">
//                               <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B9D83]/40 w-3.5 h-3.5" />
//                               <input
//                                 type="tel"
//                                 name="phone"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="+880 1XXXXXXXXX"
//                                 className="w-full pl-10 pr-3 py-3 text-sm border border-[#c5d5be]/50 rounded-xl bg-white text-[#263b32] placeholder:text-[#8B9D83] outline-none focus:border-[#8B9D83] focus:ring-2 focus:ring-[#8B9D83]/20 transition-all"
//                                 style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                               />
//                             </div>
//                           </div>
//                         </div>

//                         {/* Subject */}
//                         <div>
//                           <label className="block text-xs font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                             Subject
//                           </label>
//                           <input
//                             type="text"
//                             name="subject"
//                             value={formData.subject}
//                             onChange={handleChange}
//                             placeholder="e.g. Product Inquiry"
//                             className="w-full px-4 py-3 text-sm border border-[#c5d5be]/50 rounded-xl bg-white text-[#263b32] placeholder:text-[#8B9D83] outline-none focus:border-[#8B9D83] focus:ring-2 focus:ring-[#8B9D83]/20 transition-all"
//                             style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                           />
//                         </div>

//                         {/* Message */}
//                         <div>
//                           <label className="block text-xs font-medium text-[#263b32] mb-1.5" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                             Message <span className="text-[#8B9D83]">*</span>
//                           </label>
//                           <textarea
//                             name="message"
//                             value={formData.message}
//                             onChange={handleChange}
//                             required
//                             rows={5}
//                             placeholder="Tell us how we can help you..."
//                             className="w-full px-4 py-3 text-sm border border-[#c5d5be]/50 rounded-xl bg-white text-[#263b32] placeholder:text-[#8B9D83] outline-none focus:border-[#8B9D83] focus:ring-2 focus:ring-[#8B9D83]/20 transition-all resize-none"
//                             style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                           />
//                         </div>

//                         {/* Submit - Green */}
//                         <button
//                           type="submit"
//                           disabled={isSubmitting}
//                           className="w-full py-3.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63] text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-[#8B9D83]/25 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
//                           style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                         >
//                           {isSubmitting ? (
//                             <>
//                               <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                               Sending...
//                             </>
//                           ) : (
//                             <>
//                               <FaPaperPlane className="w-4 h-4" />
//                               Send Message
//                             </>
//                           )}
//                         </button>

//                         {/* Privacy */}
//                         <p className="text-center text-[10px] text-[#8B9D83]/40" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                           🔒 Your information is safe with us. We'll never share your data.
//                         </p>

//                         {/* Error */}
//                         {formStatus.submitted && !formStatus.success && formStatus.message !== 'Sending...' && (
//                           <motion.div
//                             initial={{ opacity: 0, y: -5 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             className="p-3 bg-red-50 border border-red-200 rounded-xl text-center"
//                           >
//                             <p className="text-xs text-red-600" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                               {formStatus.message}
//                             </p>
//                           </motion.div>
//                         )}
//                       </form>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </motion.div>

//             </div>
//           </div>
//         </section>

//         {/* ======================================================
//             LET'S CONNECT SECTION - Green Theme
//         ====================================================== */}

//         <section className="py-8 sm:py-16 lg:py-10 bg-white">
//           <div className="container mx-auto px-4">
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.15 }}
//               variants={fadeInUp}
//               className="max-w-4xl mx-auto text-center"
//             >
//               <div className="flex items-center justify-center gap-3 mb-4">
//                 <span className="w-10 sm:w-14 h-px bg-gradient-to-r from-transparent to-[#8B9D83]" />
//                 <span className="text-xs sm:text-sm uppercase tracking-[0.16em] text-[#8B9D83] font-medium" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                   {leftSide?.badge || 'Beauty Bucket'}
//                 </span>
//                 <span className="w-10 sm:w-14 h-px bg-gradient-to-l from-transparent to-[#8B9D83]" />
//               </div>

//               <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-[#263b32]" style={{ fontFamily: FONT_FAMILY }}>
//                 {leftSide?.title || "Let's Connect"}
//                 <span className="block sm:inline text-[#8B9D83] font-medium">
//                   {' '}{leftSide?.subtitle || '& Make Beauty Happen'}
//                 </span>
//               </h2>

//               <p className="max-w-2xl mx-auto mt-4 text-xs sm:text-sm lg:text-base text-[#53645a] leading-relaxed" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 {leftSide?.description}
//               </p>
//             </motion.div>

//             {/* Features - Green Theme */}
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, amount: 0.1 }}
//               variants={staggerContainer}
//               className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto mt-8"
//             >
//               {leftSide?.features?.map((feature, idx) => {
//                 const Icon = getIcon(feature.icon);
//                 return (
//                   <motion.div
//                     key={idx}
//                     variants={scaleUp}
//                     whileHover={{ y: -5 }}
//                     className="bg-[#f8f7f2] border border-[#c5d5be]/50 rounded-2xl p-5 text-center hover:border-[#8B9D83]/40 hover:shadow-lg hover:shadow-[#8B9D83]/10 transition-all duration-300"
//                   >
//                     <div className="w-11 h-11 mx-auto mb-3 rounded-full bg-[#f0f5ed] text-[#8B9D83] flex items-center justify-center">
//                       <Icon className="w-5 h-5" />
//                     </div>
//                     <h3 className="text-sm font-medium text-[#263b32] mb-1" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       {feature.title}
//                     </h3>
//                     <p className="text-xs text-[#53645a]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                       {feature.description}
//                     </p>
//                   </motion.div>
//                 );
//               })}
//             </motion.div>

//             {/* Social Links */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//               className="text-center mt-8"
//             >
//               <p className="text-xs text-[#53645a] mb-3" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 Follow us & stay connected
//               </p>
//               <div className="flex justify-center gap-2.5">
//                 {socialLinks?.map((social, idx) => {
//                   const Icon = getSocialIcon(social.icon);
//                   return (
//                     <a
//                       key={idx}
//                       href={social.url || '#'}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       aria-label={social.platform}
//                       className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-[#c5d5be]/60 text-[#53645a] flex items-center justify-center hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${social.color || 'hover:bg-[#8B9D83]'}`}
//                     >
//                       <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
//                     </a>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           </div>
//         </section>

//         {/* ======================================================
//             CTA - Green Theme
//         ====================================================== */}
//         {/* ======================================================
//             CTA - Left Aligned Text Design with Background Image
//         ====================================================== */}

//         <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
//           <div className="absolute inset-0">
//             {/* Background Image - Now visible */}
//             <div
//               className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//               style={{ 
//                 backgroundImage: `url('${cta?.bgImage || '/images/cta-bg.jpg'}')`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//               }}
//             />
//             {/* Gradient Overlay - Made semi-transparent so image shows through */}
//             <div className="absolute inset-0 bg-gradient-to-br from-[#8B9D83]/35 to-[#6b7d63]/35" />
//             {/* Subtle dark overlay for readability */}
//             <div className="absolute inset-0 bg-black/10" />
//             <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
//             <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
//           </div>

//           <div className="container mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={fadeInUp}
//               className="max-w-3xl"
//             >
//               {/* Small badge - optional */}
//               {cta?.badge && (
//                 <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-4">
//                   <GiSparkles className="w-3.5 h-3.5 text-white" />
//                   <span className="text-xs sm:text-sm text-white font-medium" style={{ fontFamily: FONT_FAMILY }}>
//                     {cta?.badge}
//                   </span>
//                 </div>
//               )}

//               {/* Main Heading - Left Aligned */}
//               <h2 
//                 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white mb-3 leading-tight" 
//                 style={{ fontFamily: FONT_FAMILY }}
//               >
//                 {cta?.title || "We're Here to Help"}
//               </h2>

//               {/* Description - Left Aligned */}
//               <p 
//                 className="text-xs sm:text-sm lg:text-base text-white/90 max-w-xl mb-7 leading-relaxed" 
//                 style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//               >
//                 {cta?.description || 'Our beauty experts are ready to assist you with any questions about products or orders.'}
//               </p>

//               {/* Buttons - Left Aligned */}
//               <div className="flex flex-wrap gap-3">
//                 <a 
//                   href={cta?.buttonLink || 'tel:+8801871733305'}
//                   className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-[#8B9D83] rounded-xl text-xs sm:text-sm font-medium hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
//                   style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                 >
//                   <FaPhone className="w-3.5 h-3.5" />
//                   {cta?.buttonText || 'Call Now'}
//                 </a>

//                 <Link 
//                   href={cta?.secondaryButtonLink || '/products'}
//                   className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-white/40 text-white rounded-xl text-xs sm:text-sm font-medium hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
//                   style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                 >
//                   {cta?.secondaryButtonText || 'Browse Products'}
//                   <FaArrowRight className="w-3.5 h-3.5" />
//                 </Link>
//               </div>
//             </motion.div>
//           </div>
//         </section>

//       </main>

//       <Footer />
//     </>
//   );
// }

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaArrowRight,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaPinterestP,
  FaTiktok,
  FaShieldAlt,
  FaTruck,
  FaHeart,
  FaStar,
  FaGlobe,
  FaWhatsapp,
  FaAward,
  FaUsers,
  FaGem,
} from 'react-icons/fa';

import { GiSparkles } from 'react-icons/gi';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// ============================================================
// CONSTANTS
// ============================================================

const BRAND = '#CC1D34';
const TEXT_PRIMARY = '#29362f';
const TEXT_MUTED = '#687169';
const TEXT_SOFT = '#7e897e';

const FONT_SERIF = "Georgia, 'Times New Roman', serif";
const FONT_BODY = "'Inter', system-ui, sans-serif";

// ============================================================
// ICON MAP
// ============================================================

const ICON_MAP = {
  FaHeart, FaShieldAlt, FaTruck, FaCheckCircle, FaClock, FaStar,
  FaUsers, FaAward, FaGlobe, FaWhatsapp, FaPhone, FaEnvelope,
  FaMapMarkerAlt, FaGem, GiSparkles,
  // Aliases
  Heart: FaHeart, Shield: FaShieldAlt, CheckCircle: FaCheckCircle,
  Truck: FaTruck, Clock: FaClock, Star: FaStar, Users: FaUsers,
  Award: FaAward, Globe: FaGlobe, Whatsapp: FaWhatsapp,
  Phone: FaPhone, Envelope: FaEnvelope, MapMarker: FaMapMarkerAlt,
  Gem: FaGem, Sparkles: GiSparkles,
};

const SOCIAL_ICON_MAP = {
  FaFacebookF, FaInstagram, FaYoutube,
  FaPinterest: FaPinterestP, FaPinterestP, FaTiktok,
};

const getIcon = (name) => (!name ? FaStar : ICON_MAP[name] || FaStar);
const getSocialIcon = (name) => (!name ? FaFacebookF : SOCIAL_ICON_MAP[name] || FaFacebookF);

// ============================================================
// ANIMATIONS
// ============================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const scaleUp = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
};

// ============================================================
// COMPONENT
// ============================================================

export default function ContactClient() {
  const [contactData, setContactData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: '',
  });

  // ----------------------------------------------------------
  // FORM HANDLERS
  // ----------------------------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitted: true, success: false, message: 'Sending...' });
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || 'General Inquiry',
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus({
          submitted: true,
          success: true,
          message:
            data.message ||
            "Thank you! We'll get back to you within 24 hours.",
        });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

        setTimeout(() => {
          setFormStatus({ submitted: false, success: false, message: '' });
        }, 5000);
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setFormStatus({
        submitted: true,
        success: false,
        message: error.message || 'Failed to send message. Please try again later.',
      });
      setTimeout(() => {
        setFormStatus({ submitted: false, success: false, message: '' });
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ----------------------------------------------------------
  // DEFAULT DATA
  // ----------------------------------------------------------

  const defaultData = {
    hero: {
      bgImage: '/images/contact-hero.jpg',
      badge: 'Get In Touch',
      title: "We'd Love to",
      highlightText: 'Hear From You',
      description:
        "Have questions about our handcrafted clothing, orders, or anything else? We're here to help and respond within 24 hours.",
    },
    quickContacts: [
      {
        icon: 'FaMapMarkerAlt',
        label: 'Our Location',
        value: 'Motijheel, Dhaka',
        link: 'https://maps.google.com',
        description:
          'Visit our flagship outlet to explore our latest handcrafted collection in person.',
      },
     {
  icon: 'FaEnvelope',
  label: 'Email Address',
  value: 'hello@nishitascollection.com',
  link: 'https://mail.google.com/mail/?view=cm&fs=1&to=hello@nishitascollection.com',
  description:
    "Drop us a line and we'll get back to you within 24 hours.",
},
      {
        icon: 'FaPhone',
        label: 'Call Us Now',
        value: '+880 1XXX-XXXXXX',
        link: 'tel:+8801XXXXXXXXX',
        description:
          'Our customer care team is available from 10 AM to 8 PM every day.',
      },
    ],
    socialLinks: [
      { platform: 'facebook',  url: '#', icon: 'FaFacebookF', color: 'hover:bg-[#1877F2]' },
      { platform: 'instagram', url: '#', icon: 'FaInstagram', color: 'hover:bg-[#E4405F]' },
      { platform: 'youtube',   url: '#', icon: 'FaYoutube',   color: 'hover:bg-[#FF0000]' },
      { platform: 'pinterest', url: '#', icon: 'FaPinterest', color: 'hover:bg-[#BD081C]' },
      { platform: 'tiktok',    url: '#', icon: 'FaTiktok',    color: 'hover:bg-[#000000]' },
    ],
    map: {
      title: 'Find Us',
      embedCode: 'https://www.google.com/maps?q=Motijheel,Dhaka&output=embed',
    },
    cta: {
      bgImage: '/images/cta-bg.jpg',
      badge: 'Still Have Questions?',
      title: "We're Here to Help",
      description:
        'Our team is ready to assist you with anything — from sizing to styling.',
      buttonText: 'Call Now',
      buttonLink: 'tel:+8801XXXXXXXXX',
      secondaryButtonText: 'Browse Collection',
      secondaryButtonLink: '/products',
    },
    form: {
      title: "We'd Love to Hear From You",
      description: "Fill in the form and we'll get back to you within 24 hours",
      successMessage: "Thank you! We'll get back to you within 24 hours.",
    },
  };

  // ----------------------------------------------------------
  // FETCH
  // ----------------------------------------------------------

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        setIsLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/contact`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

        const result = await response.json();

        if (result.success && result.data) {
          const mergedData = {
            hero: { ...defaultData.hero, ...result.data.hero },
            quickContacts: result.data.quickContacts || defaultData.quickContacts,
            socialLinks: result.data.socialLinks || defaultData.socialLinks,
            map: { ...defaultData.map, ...result.data.map },
            cta: { ...defaultData.cta, ...result.data.cta },
            form: { ...defaultData.form, ...result.data.form },
          };
          setContactData(mergedData);
        } else {
          setContactData(defaultData);
        }
      } catch (err) {
        console.error('❌ Error fetching contact data:', err);
        setContactData(defaultData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactData();
  }, []);

  // ----------------------------------------------------------
  // LOADING
  // ----------------------------------------------------------

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center bg-[#f7f4ef] -mt-20">
          <div className="text-center">
            <div className="mx-auto inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#7e897e] border-t-transparent" />
            <p className="mt-3 text-sm text-[#687169]" style={{ fontFamily: FONT_BODY }}>
              Loading...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const data = contactData || defaultData;
  const { hero, quickContacts, socialLinks, map, cta, form } = data;

  // Map src extraction
  let mapSrc = 'https://www.google.com/maps?q=Motijheel,Dhaka&output=embed';
  if (map?.embedCode) {
    if (map.embedCode.includes('<iframe')) {
      const m = map.embedCode.match(/src="([^"]+)"/);
      if (m && m[1]) mapSrc = m[1];
    } else if (map.embedCode.startsWith('http')) {
      mapSrc = map.embedCode;
    }
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#f7f4ef] -mt-16">

        {/* ======================================================
            HERO — shorter, responsive
        ====================================================== */}
     <section className="relative overflow-hidden bg-[#f7f4ef]">
  <div className="absolute inset-0">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('${hero?.bgImage || '/images/contact-hero.jpg'}')` }}
    />
    {/* Black overlay */}
    <div className="absolute inset-0 bg-black/20" />
    <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
  </div>

  {/* Left decorative circle */}
  <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl sm:h-72 sm:w-72" />

  <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInLeft}
      className="min-h-[200px] max-w-2xl py-8 sm:min-h-[240px] sm:py-12 md:min-h-[280px] md:py-16"
    >
      <div className="mb-2 flex items-center gap-2 sm:mb-3">
        <span className="h-px w-6 bg-white/70 sm:w-8" />
        <span
          className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/85 sm:text-[10px] md:text-xs"
          style={{ fontFamily: FONT_BODY }}
        >
          {hero?.badge || 'Get In Touch'}
        </span>
      </div>

      <h1
        className="text-3xl leading-[1.05] font-normal text-white sm:text-4xl md:text-5xl lg:text-6xl"
        style={{ fontFamily: FONT_SERIF }}
      >
        {hero?.title || "We'd Love to"}
        <span className="block" style={{ color: '#F1EFE3' }}>
          {hero?.highlightText || 'Hear From You'}
        </span>
      </h1>

      <div className="mt-3 mb-2 flex items-center gap-2 sm:mt-4 sm:mb-3">
        <span className="h-px w-10 bg-white/50 sm:w-14" />
        <span className="h-1 w-1 rounded-full bg-white" />
      </div>

      <p
        className="max-w-lg text-[10px] leading-5 text-white/90 sm:text-[11px] sm:leading-6 md:text-xs md:leading-7"
        style={{ fontFamily: FONT_BODY }}
      >
        {hero?.description ||
          "Have questions about products, orders, or anything else? We're here to help and respond within 24 hours."}
      </p>
    </motion.div>
  </div>
</section>
        {/* ======================================================
            QUICK CONTACT CARDS
        ====================================================== */}
      <section className="relative z-10 mx-auto -mt-4 max-w-7xl px-4 sm:-mt-6 sm:px-6 lg:px-8">
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    variants={staggerContainer}
    className="grid gap-3 sm:gap-4 lg:grid-cols-[1fr_1fr_1fr_0.95fr] lg:gap-5"
  >
    {quickContacts?.slice(0, 3).map((info, idx) => {
      const Icon = getIcon(info.icon);
      const isExternal = info.link?.startsWith('http');
      return (
        <motion.a
          key={idx}
          href={info.link || '#'}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          variants={scaleUp}
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-[#e2ddd4] bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white sm:h-11 sm:w-11"
              style={{ backgroundColor: BRAND }}
            >
              <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div className="min-w-0">
              <h3
                className="text-sm font-medium text-[#29362f] sm:text-base md:text-lg"
                style={{ fontFamily: FONT_SERIF }}
              >
                {info.label}
              </h3>
              <p
                className="mt-0.5 truncate text-[10px] sm:text-[11px] md:text-xs"
                style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
              >
                {info.value}
              </p>
            </div>
          </div>
          <div className="my-3 h-px bg-[#e2ddd4] sm:my-4" />
          <p
            className="text-[10px] leading-5 sm:text-[11px] md:text-xs"
            style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
          >
            {info.description || "Reach us anytime — we're always happy to help."}
          </p>
        </motion.a>
      );
    })}

    {/* Reach Out block */}
    <motion.div
      variants={scaleUp}
      className="flex flex-col justify-center px-2 py-3 lg:px-4 lg:py-4"
    >
      <h2
        className="text-xl leading-tight text-[#29362f] sm:text-2xl md:text-3xl"
        style={{ fontFamily: FONT_SERIF }}
      >
        Reach Out
        <br />
        <span style={{ color: BRAND }}>Today Easily!</span>
      </h2>
      <p
        className="mt-2 text-[10px] leading-5 sm:mt-3 sm:text-[11px] sm:leading-6"
        style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
      >
        We'd love to help you with anything — from sizing to styling.
      </p>
    </motion.div>
  </motion.div>
</section>

        {/* ======================================================
            MAIN — Map + Social + Form
        ====================================================== */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 md:py-20 lg:px-8">
          <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-12">

            {/* LEFT — Map + Social */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeInLeft}
            >
              <h2
                className="text-2xl text-[#29362f] sm:text-3xl md:text-4xl lg:text-5xl"
                style={{ fontFamily: FONT_SERIF }}
              >
                Stay Connected!
              </h2>

              <p
                className="mt-3 max-w-xl text-[10px] leading-5 sm:mt-4 sm:text-[11px] sm:leading-6 md:text-xs md:leading-7"
                style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
              >
                Follow along with Nishita's Collection for new drops, artisan
                stories, behind-the-scenes from our workshop, and early access
                to seasonal collections. We love hearing from our community.
              </p>

              {/* Map */}
              <div className="mt-5 h-[220px] w-full overflow-hidden rounded-md border border-[#e2ddd4] sm:mt-6 sm:h-[260px] md:h-[300px]">
                <iframe
                  title={map?.title || 'Location Map'}
                  src={mapSrc}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              {/* Social */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <h3
                  className="text-base text-[#29362f] sm:text-lg md:text-xl"
                  style={{ fontFamily: FONT_SERIF }}
                >
                  Follow Us Here :
                </h3>

                <div className="flex flex-wrap gap-2">
                  {socialLinks?.map((social, idx) => {
                    const Icon = getSocialIcon(social.icon);
                    return (
                      <a
                        key={idx}
                        href={social.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.platform}
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:opacity-85 sm:h-9 sm:w-9 ${social.color || ''}`}
                        style={{ backgroundColor: BRAND }}
                      >
                        <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* RIGHT — Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeInRight}
              className="rounded-2xl bg-[#edf1ea] p-5 sm:p-6 md:rounded-[28px] md:p-8 lg:p-10"
            >
              <h2
                className="text-lg text-[#29362f] sm:text-xl md:text-2xl lg:text-3xl"
                style={{ fontFamily: FONT_SERIF }}
              >
                {form?.title || "We'd Love to Hear From You"}
              </h2>

              <p
                className="mt-2 text-[10px] sm:text-[11px] md:text-xs"
                style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
              >
                {form?.description || "Fill in the form and we'll get back to you within 24 hours"}
              </p>

              <AnimatePresence mode="wait">
                {formStatus.submitted && formStatus.success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mt-5 rounded-2xl border border-green-200 bg-green-50 p-6 text-center sm:mt-6 sm:p-8"
                  >
                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 sm:mb-4 sm:h-16 sm:w-16">
                      <FaCheckCircle className="h-7 w-7 text-green-600 sm:h-8 sm:w-8" />
                    </div>
                    <h3
                      className="mb-2 text-lg text-[#29362f] sm:text-xl"
                      style={{ fontFamily: FONT_SERIF }}
                    >
                      Message Sent!
                    </h3>
                    <p
                      className="mb-4 text-xs sm:mb-5 sm:text-sm"
                      style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
                    >
                      {formStatus.message}
                    </p>
                    <button
                      onClick={() => setFormStatus({ submitted: false, success: false, message: '' })}
                      className="text-xs font-medium hover:underline sm:text-sm"
                      style={{ color: BRAND, fontFamily: FONT_BODY }}
                    >
                      Send Another Message →
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-5 space-y-3 sm:mt-6 sm:space-y-4">

                    {/* Name */}
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Full Name"
                      className="h-11 w-full rounded-full border border-transparent bg-white px-4 text-[13px] outline-none transition placeholder:text-[#9aa39c] focus:border-[#CC1D34] sm:h-12 sm:px-5 sm:text-sm md:h-14 md:px-6"
                      style={{ color: TEXT_PRIMARY, fontFamily: FONT_BODY }}
                    />

                    {/* Phone + Email */}
                    <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Phone Number"
                        className="h-11 w-full rounded-full border border-transparent bg-white px-4 text-[13px] outline-none transition placeholder:text-[#9aa39c] focus:border-[#CC1D34] sm:h-12 sm:px-5 sm:text-sm md:h-14 md:px-6"
                        style={{ color: TEXT_PRIMARY, fontFamily: FONT_BODY }}
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Your Email"
                        className="h-11 w-full rounded-full border border-transparent bg-white px-4 text-[13px] outline-none transition placeholder:text-[#9aa39c] focus:border-[#CC1D34] sm:h-12 sm:px-5 sm:text-sm md:h-14 md:px-6"
                        style={{ color: TEXT_PRIMARY, fontFamily: FONT_BODY }}
                      />
                    </div>

                    {/* Subject */}
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject (optional)"
                      className="h-11 w-full rounded-full border border-transparent bg-white px-4 text-[13px] outline-none transition placeholder:text-[#9aa39c] focus:border-[#CC1D34] sm:h-12 sm:px-5 sm:text-sm md:h-14 md:px-6"
                      style={{ color: TEXT_PRIMARY, fontFamily: FONT_BODY }}
                    />

                    {/* Message */}
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      placeholder="Message"
                      className="w-full resize-none rounded-2xl border border-transparent bg-white px-4 py-3 text-[13px] outline-none transition placeholder:text-[#9aa39c] focus:border-[#CC1D34] sm:px-5 sm:py-4 sm:text-sm md:px-6 md:py-5"
                      style={{ color: TEXT_PRIMARY, fontFamily: FONT_BODY }}
                    />

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-full text-[13px] font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:h-12 sm:text-sm"
                      style={{ backgroundColor: BRAND, fontFamily: FONT_BODY }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Now!
                          <FaPaperPlane className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>

                    <p
                      className="text-center text-[9px] sm:text-[10px]"
                      style={{ color: TEXT_SOFT, fontFamily: FONT_BODY }}
                    >
                      🔒 Your information is safe with us.
                    </p>

                    {/* Error */}
                    {formStatus.submitted && !formStatus.success && formStatus.message !== 'Sending...' && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border border-red-200 bg-red-50 p-3 text-center"
                      >
                        <p className="text-xs text-red-600" style={{ fontFamily: FONT_BODY }}>
                          {formStatus.message}
                        </p>
                      </motion.div>
                    )}
                  </form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ======================================================
            CTA — cream overlay style (matches About page)
        ====================================================== */}
        {cta && (
          <section className="relative overflow-hidden">
            <div className="relative min-h-[200px] sm:min-h-[240px] md:min-h-[280px]">
              {cta.bgImage && (
                <img
                  src={cta.bgImage}
                  alt={cta.title || ''}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              {/* Cream overlay */}
              <div className="absolute inset-0 bg-[#F1EFE3]/75" />

              <div className="relative z-10 flex min-h-[200px] items-center justify-center px-4 text-center sm:min-h-[240px] sm:px-5 md:min-h-[280px]">
                <div className="max-w-xl text-[#29362f]">
                  <GiSparkles
                    className="mx-auto mb-2.5 opacity-70 sm:mb-3"
                    size={18}
                    strokeWidth={1.2}
                  />
                  <h2
                    className="text-xl sm:text-2xl md:text-3xl"
                    style={{ fontFamily: FONT_SERIF }}
                  >
                    {cta.title}
                  </h2>
                  {cta.description && (
                    <p
                      className="mx-auto mt-2.5 max-w-md text-[11px] leading-5 text-[#5a6660] sm:mt-3 sm:text-xs md:text-sm"
                      style={{ fontFamily: FONT_BODY }}
                    >
                      {cta.description}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                    {cta.buttonText && (
                      <a
                        href={cta.buttonLink || '#'}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-medium text-white transition hover:opacity-90 sm:px-5 sm:py-2.5"
                        style={{ backgroundColor: BRAND, fontFamily: FONT_BODY }}
                      >
                        <FaPhone className="h-3 w-3" />
                        {cta.buttonText}
                      </a>
                    )}

                    {cta.secondaryButtonText && (
                      <Link
                        href={cta.secondaryButtonLink || '/products'}
                        className="inline-flex items-center gap-2 rounded-full border border-[#29362f]/25 px-4 py-2 text-[11px] font-medium text-[#29362f] transition hover:bg-[#29362f]/5 sm:px-5 sm:py-2.5"
                        style={{ fontFamily: FONT_BODY }}
                      >
                        {cta.secondaryButtonText}
                        <FaArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      <Footer />
    </>
  );
}