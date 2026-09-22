
// // app/privacy/PrivacyClient.js
// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import {
//   FaCheckCircle,
//   FaArrowRight,
//   FaShieldAlt,
//   FaUsers,
//   FaEye,
//   FaLock,
//   FaCookie,
//   FaExclamationTriangle,
//   FaGlobe,
//   FaServer,
//   FaClock,
//   FaPrint,
//   FaListUl,
//   FaShoppingBag,
//   FaEnvelope,
//   FaPhone
// } from 'react-icons/fa';
// import { GiSparkles } from 'react-icons/gi';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // Font constants - Beauty Bucket Theme
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', 'Georgia', serif";

// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.08, delayChildren: 0.05 },
//   },
// };

// // Icon mapping
// const ICON_MAP = {
//   FaShieldAlt: FaShieldAlt,
//   FaShield: FaShieldAlt,
//   FaUsers: FaUsers,
//   FaEye: FaEye,
//   FaLock: FaLock,
//   FaCookie: FaCookie,
//   FaExclamationTriangle: FaExclamationTriangle,
//   FaAlertCircle: FaExclamationTriangle,
//   FaGlobe: FaGlobe,
//   FaServer: FaServer,
//   FaClock: FaClock,
// };

// const getIcon = (iconName) => {
//   const Icon = ICON_MAP[iconName];
//   return Icon || FaShieldAlt;
// };

// export default function PrivacyClient() {
//   const [privacyData, setPrivacyData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeId, setActiveId] = useState(1);

//   // Fetch privacy data from backend
//   useEffect(() => {
//     const fetchPrivacyData = async () => {
//       try {
//         setIsLoading(true);
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
//         const response = await fetch(`${apiUrl}/api/privacy`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
        
//         if (!response.ok) {
//           throw new Error(`Failed to fetch privacy policy: ${response.status}`);
//         }
        
//         const result = await response.json();
        
//         if (result.success && result.data) {
//           setPrivacyData(result.data);
//           if (result.data.sections && result.data.sections.length > 0) {
//             setActiveId(result.data.sections[0].id);
//           }
//         } else {
//           setPrivacyData(getDefaultData());
//         }
//       } catch (err) {
//         console.error('Error fetching privacy policy:', err);
//         setPrivacyData(getDefaultData());
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchPrivacyData();
//   }, []);

//   const getDefaultData = () => ({
//     heroTitle: 'Your Privacy',
//     heroSubtitle: 'Matters to Us',
//     heroDescription: 'We are committed to protecting your personal data and being transparent about how we collect, use, and safeguard your information.',
//     heroImage: '/images/bg10.jpg',
//     ctaImage: '/images/pattern.png',
//     introText: 'Welcome to BeautyBucket. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.',
//     lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
//     quickInfo: {
//       email: 'privacy@beautybucket.com',
//       phone: '+880 1XXXXXXXXX',
//       responseTime: 'Within 24 hours'
//     },
//     sections: [
//       {
//         id: 1,
//         title: 'Information We Collect',
//         icon: 'FaUsers',
//         description: 'We collect information to provide and improve our services to you.',
//         details: [
//           'Name, email address, phone number, and shipping/billing address',
//           'Payment information (processed securely through our payment partners)',
//           'IP address, browser type, device information, and usage data',
//           'Cookies and similar tracking technologies'
//         ]
//       },
//       {
//         id: 2,
//         title: 'How We Use Your Information',
//         icon: 'FaEye',
//         description: 'Your data helps us serve you better and improve our platform.',
//         details: [
//           'Process and fulfill your orders and deliveries',
//           'Communicate with you about orders, products, and promotions',
//           'Improve our website, products, and customer service',
//           'Prevent fraud and ensure the security of our platform'
//         ]
//       },
//       {
//         id: 3,
//         title: 'Data Sharing & Disclosure',
//         icon: 'FaShieldAlt',
//         description: 'We respect your privacy and limit data sharing to trusted partners.',
//         details: [
//           'We never sell or rent your personal data to third parties',
//           'Share data with trusted service providers',
//           'May disclose data when required by law',
//           'Third-party services have their own privacy policies'
//         ]
//       },
//       {
//         id: 4,
//         title: 'Data Security',
//         icon: 'FaLock',
//         description: 'We implement industry-standard security measures to protect your data.',
//         details: [
//           'SSL encryption for all data transmission',
//           'Regular security audits and vulnerability assessments',
//           'Access controls and authentication measures',
//           'Secure data storage with industry-standard practices'
//         ]
//       },
//       {
//         id: 5,
//         title: 'Cookies & Tracking',
//         icon: 'FaCookie',
//         description: 'We use cookies to enhance your browsing experience.',
//         details: [
//           'Essential cookies for site functionality',
//           'Analytics cookies to understand user behavior',
//           'Preference cookies to remember your settings',
//           'You can manage cookie preferences in your browser settings'
//         ]
//       },
//       {
//         id: 6,
//         title: 'Your Rights',
//         icon: 'FaExclamationTriangle',
//         description: 'You have control over your personal data.',
//         details: [
//           'Access, correct, or delete your personal data',
//           'Withdraw consent for marketing communications',
//           'Request data portability',
//           'Lodge a complaint with data protection authorities'
//         ]
//       }
//     ],
//     additionalInfo: [
//       {
//         id: 1,
//         title: 'International Data Transfers',
//         icon: 'FaGlobe',
//         description: 'BeautyBucket operates primarily in Bangladesh. However, we may use service providers located in other countries. When we transfer your data internationally, we ensure that appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.'
//       },
//       {
//         id: 2,
//         title: "Children's Privacy",
//         icon: 'FaUsers',
//         description: 'Our services are not directed at children under 13 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe that your child has provided us with personal data, please contact us immediately.'
//       },
//       {
//         id: 3,
//         title: 'Updates to This Policy',
//         icon: 'FaClock',
//         description: 'We may update this Privacy Policy periodically. The latest version will always be posted on this page with the effective date. We encourage you to review this policy regularly.'
//       }
//     ]
//   });

//   // Track which section is in view to highlight the sidebar TOC
//   useEffect(() => {
//     if (!privacyData?.sections) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const id = entry.target.getAttribute('data-section-id');
//             if (id) setActiveId(Number(id));
//           }
//         });
//       },
//       { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
//     );

//     privacyData.sections.forEach((section) => {
//       const el = document.getElementById(`section-${section.id}`);
//       if (el) observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, [privacyData]);

//   if (isLoading) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-[#f8f7f2] flex items-center justify-center -mt-20">
//           <div className="text-center">
//             <div className="inline-block w-8 h-8 border-4 border-[#8B9D83] border-t-transparent rounded-full animate-spin"></div>
//             <p className="text-[#53645a] mt-2" style={{ fontFamily: FONT_FAMILY }}>Loading privacy policy...</p>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   const data = privacyData || getDefaultData();
//   const { heroTitle, heroSubtitle, heroDescription, heroImage, ctaImage, introText, sections, additionalInfo, lastUpdated, quickInfo } = data;

//   const quickInfoItems = [
//     {
//       icon: <FaEnvelope className="w-4 h-4" />,
//       label: "Privacy Email",
//       value: quickInfo?.email || 'privacy@beautybucket.com',
//       link: `mailto:${quickInfo?.email || 'privacy@beautybucket.com'}`
//     },
//     {
//       icon: <FaPhone className="w-4 h-4" />,
//       label: "Privacy Hotline",
//       value: quickInfo?.phone || '+880 1XXXXXXXXX',
//       link: `tel:${quickInfo?.phone?.replace(/\s/g, '') || '+8801XXXXXXXXX'}`
//     },
//     {
//       icon: <FaClock className="w-4 h-4" />,
//       label: "Response Time",
//       value: quickInfo?.responseTime || 'Within 24 hours'
//     }
//   ];

//   return (
//     <>
//       <Navbar />

//       <main className="min-h-screen bg-[#f8f7f2] -mt-20">

//         {/* ======================================================
//             HERO - Cream/Beige Overlay (Matching ContactClient)
//         ====================================================== */}

//       <section className="relative min-h-[200px] sm:min-h-[200px] lg:min-h-[250px] overflow-hidden bg-[#f3eee7]">
//   <div className="absolute inset-0 z-0">
//     <div 
//       className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//       style={{
//         backgroundImage: `url('${heroImage || '/images/bg10.jpg'}')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//       }}
//     />

//     {/* Cream/Beige overlay - Matching ContactClient */}
//     <div className="absolute inset-0 bg-[#f3eee7]/65" />

//     {/* Left side readability gradient */}
//     <div className="absolute inset-0 bg-gradient-to-r from-[#f3eee7]/55 via-[#f3eee7]/25 to-transparent" />

//     {/* Very subtle right fade */}
//     <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-transparent to-[#f3eee7]/10" />
//   </div>

//   {/* Decorative soft shapes */}
//   <div className="absolute -left-20 -top-20 w-56 h-56 rounded-full bg-white/30 blur-3xl" />
//   <div className="absolute right-0 bottom-0 w-72 h-72 rounded-full bg-[#c9bca8]/10 blur-3xl" />

//   <div className="container mx-auto px-4 relative z-10">
//     <motion.div
//       initial="hidden"
//       animate="visible"
//       variants={fadeInUp}
//       className="max-w-3xl py-10 sm:py-12 lg:py-14"
//     >
//       <div className="flex items-center gap-2 mb-3 sm:mb-4">
//         <span className="w-7 sm:w-9 h-px bg-[#8B9D83]" />
//         <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-[#68776b]" style={{ fontFamily: FONT_FAMILY }}>
//           Privacy Policy
//         </span>
//       </div>

//       <h1 className="text-[32px] leading-[0.98] sm:text-[40px] sm:leading-[1] lg:text-[50px] lg:leading-[1] font-normal text-[#263b32] tracking-[-0.025em]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//         {heroTitle || 'Your Privacy'}
//         <span className="block text-[#789072] font-normal">
//           {heroSubtitle || 'Matters to Us'}
//         </span>
//       </h1>

//       <div className="flex items-center gap-2 mt-4 mb-3">
//         <span className="w-12 sm:w-16 h-[1px] bg-[#8B9D83]/60" />
//         <span className="w-1 h-1 rounded-full bg-[#8B9D83]" />
//       </div>

//       <p className="max-w-[330px] sm:max-w-[390px] text-[9px] sm:text-[10px] lg:text-[11px] leading-[1.7] text-[#59655d]" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//         {heroDescription || 'We are committed to protecting your personal data and being transparent about how we collect, use, and safeguard your information.'}
//       </p>
//     </motion.div>
//   </div>
// </section>

//         {/* ======================================================
//             BODY - Green Theme
//         ====================================================== */}

//         <section className="py-12 lg:py-16 bg-[#f8f7f2]">
//           <div className="container mx-auto px-4">
//             <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-14">
//               {/* Sidebar TOC - Green Theme */}
//               <aside className="hidden lg:block">
//                 <div className="sticky top-28">
//                   <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#263b32] mb-4" style={{ fontFamily: FONT_FAMILY }}>
//                     <FaListUl className="w-3.5 h-3.5 text-[#8B9D83]" />
//                     On this page
//                   </div>
//                   <nav className="space-y-1 border-l border-[#c5d5be]">
//                     {sections && sections.map((section, index) => {
//                       const serialNumber = index + 1;
//                       return (
//                         <a
//                           key={section.id}
//                           href={`#section-${section.id}`}
//                           className={`block pl-4 pr-2 py-1.5 -ml-px border-l text-sm transition-colors ${
//                             activeId === section.id
//                               ? 'border-[#8B9D83] text-[#8B9D83] font-medium'
//                               : 'border-transparent text-[#53645a] hover:text-[#263b32]'
//                           }`}
//                           style={{ fontFamily: FONT_FAMILY }}
//                         >
//                           {String(serialNumber).padStart(2, '0')}. {section.title}
//                         </a>
//                       );
//                     })}
//                   </nav>
//                 </div>
//               </aside>

//               {/* Content - Green Theme */}
//               <motion.div
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 variants={staggerContainer}
//               >
//                 <motion.p
//                   variants={fadeInUp}
//                   className="text-[#53645a] leading-relaxed text-sm lg:text-base pb-8 mb-8 border-b border-[#c5d5be]" style={{ fontFamily: FONT_FAMILY }}
//                 >
//                   {introText || 'Welcome to BeautyBucket. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.'}
//                 </motion.p>

//                 {sections && sections.map((section, index) => {
//                   const Icon = getIcon(section.icon);
//                   const serialNumber = index + 1;
//                   return (
//                     <motion.div
//                       key={section.id}
//                       variants={fadeInUp}
//                       id={`section-${section.id}`}
//                       data-section-id={section.id}
//                       className="mb-10 lg:mb-12 scroll-mt-28"
//                     >
//                       <div className="flex items-start gap-4 mb-4">
//                         <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#c5d5be] bg-[#f0f5ed] text-[#8B9D83] flex-shrink-0 text-xs font-medium" style={{ fontFamily: FONT_FAMILY }}>
//                           {String(serialNumber).padStart(2, '0')}
//                         </div>
//                         <div className="flex-1 pt-1">
//                           <h2 className="text-lg lg:text-xl font-light text-[#263b32] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                             {section.title}
//                           </h2>
//                         </div>
//                       </div>

//                       <div className="pl-13 lg:pl-13">
//                         <p className="text-sm lg:text-base text-[#53645a] leading-relaxed mb-4" style={{ fontFamily: FONT_FAMILY }}>
//                           {section.description}
//                         </p>

//                         <ul className="space-y-2.5">
//                           {section.details && section.details.map((detail, idx) => (
//                             <li
//                               key={idx}
//                               className="flex items-start gap-2.5 text-sm text-[#263b32] leading-relaxed" style={{ fontFamily: FONT_FAMILY }}
//                             >
//                               <FaCheckCircle className="w-3.5 h-3.5 text-[#8B9D83] mt-0.5 flex-shrink-0" />
//                               <span>{detail}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>

//                       <div className="mt-8 border-t border-[#c5d5be]" />
//                     </motion.div>
//                   );
//                 })}

//                 {/* Quick Contact Info - Green Theme */}
//                 <motion.div
//                   variants={fadeInUp}
//                   className="bg-[#f0f5ed] rounded-xl p-6 lg:p-8 border border-[#c5d5be] mt-4"
//                 >
//                   <div className="flex items-center gap-2 mb-4">
//                     <span className="w-10 h-0.5 bg-gradient-to-r from-[#8B9D83] to-[#6b7d63]" />
//                     <span className="text-sm font-medium text-[#8B9D83] uppercase tracking-wider" style={{ fontFamily: FONT_FAMILY }}>Get in Touch</span>
//                   </div>
//                   <h3 className="text-lg lg:text-xl font-light text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
//                     Have Questions About Your Privacy?
//                   </h3>
//                   <p className="text-sm text-[#53645a] mb-6" style={{ fontFamily: FONT_FAMILY }}>
//                     Our privacy team is ready to assist you with any questions or concerns.
//                   </p>

//                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                     {quickInfoItems.map((item, idx) => (
//                       <div key={idx} className="bg-white rounded-lg p-4 border border-[#c5d5be] text-center">
//                         <div className="w-10 h-10 rounded-full bg-[#8B9D83]/10 flex items-center justify-center mx-auto mb-2">
//                           <span className="text-[#8B9D83]">{item.icon}</span>
//                         </div>
//                         <p className="text-[10px] font-medium text-[#53645a] uppercase tracking-wider mb-1" style={{ fontFamily: FONT_FAMILY }}>
//                           {item.label}
//                         </p>
//                         {item.link ? (
//                           <a href={item.link} className="text-sm text-[#8B9D83] hover:text-[#6b7d63] font-semibold transition-colors" style={{ fontFamily: FONT_FAMILY }}>
//                             {item.value}
//                           </a>
//                         ) : (
//                           <p className="text-sm text-[#263b32] font-semibold" style={{ fontFamily: FONT_FAMILY }}>{item.value}</p>
//                         )}
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mt-6 text-center">
//                     <Link href="/contact">
//                       <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#8B9D83] hover:bg-[#6b7d63] text-white rounded-lg transition-colors font-medium text-sm" style={{ fontFamily: FONT_FAMILY }}>
//                         Send Privacy Inquiry
//                         <FaArrowRight className="w-3.5 h-3.5" />
//                       </button>
//                     </Link>
//                   </div>
//                 </motion.div>

//                 {/* Important Notice - Green Theme */}
//                 <motion.div
//                   variants={fadeInUp}
//                   className="bg-[#f0f5ed] rounded-xl p-6 lg:p-8 border border-[#c5d5be] mt-4"
//                 >
//                   <div className="flex items-start gap-4">
//                     <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#8B9D83]/10 flex-shrink-0">
//                       <FaExclamationTriangle className="w-4 h-4 text-[#8B9D83]" />
//                     </div>
//                     <div>
//                       <h3 className="text-base font-light text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
//                         Important Notice
//                       </h3>
//                       <p className="text-sm text-[#53645a] leading-relaxed" style={{ fontFamily: FONT_FAMILY }}>
//                         This Privacy Policy is a legal agreement between you and BeautyBucket. By using our Platform, 
//                         you acknowledge that you have read, understood, and agree to the practices described in this policy.
//                       </p>
//                       <div className="flex flex-wrap gap-5 mt-4">
//                         <Link
//                           href="/contact"
//                           className="inline-flex items-center gap-1.5 text-[#8B9D83] hover:text-[#6b7d63] font-medium text-sm" style={{ fontFamily: FONT_FAMILY }}
//                         >
//                           Contact Us
//                           <FaArrowRight className="w-3 h-3" />
//                         </Link>
//                         <Link
//                           href="/terms"
//                           className="inline-flex items-center gap-1.5 text-[#8B9D83] hover:text-[#6b7d63] font-medium text-sm" style={{ fontFamily: FONT_FAMILY }}
//                         >
//                           Terms & Conditions
//                           <FaArrowRight className="w-3 h-3" />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* ======================================================
//             CTA - Left Aligned with Background Image & Cream Overlay
//         ====================================================== */}

//         <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
//           <div className="absolute inset-0">
//             <div
//               className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//               style={{ 
//                 backgroundImage: `url('${ctaImage || '/images/pattern.png'}')`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//               }}
//             />
//             <div className="absolute inset-0 bg-[#f3eee7]/65" />
//             <div className="absolute inset-0 bg-[#8B9D83]/8" />
//             <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/30 rounded-full blur-3xl" />
//             <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#c9bca8]/20 rounded-full blur-3xl" />
//           </div>

//           <div className="container mx-auto px-4 sm:px-8 lg:px-10 relative z-10">
//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={fadeInUp}
//               className="max-w-3xl"
//             >
//               <div className="inline-flex items-center gap-2 bg-[#8B9D83]/15 backdrop-blur-md border border-[#8B9D83]/20 rounded-full px-4 py-1.5 mb-4">
//                 <GiSparkles className="w-3.5 h-3.5 text-[#8B9D83]" />
//                 <span className="text-xs sm:text-sm text-[#263b32] font-medium" style={{ fontFamily: FONT_FAMILY }}>
//                   Still Have Questions?
//                 </span>
//               </div>

//               <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-[#263b32] mb-3 leading-tight" style={{ fontFamily: FONT_FAMILY }}>
//                 Your Privacy is Our Priority
//               </h2>

//               <p className="text-xs sm:text-sm lg:text-base text-[#53645a] max-w-xl mb-7 leading-relaxed" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                 Have questions about how we handle your data? Our team is here to help.
//               </p>

//               <div className="flex flex-wrap gap-3">
//                 <Link href="/contact">
//                   <button className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#8B9D83] text-white rounded-xl text-xs sm:text-sm font-medium hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     Contact Privacy Team
//                     <FaArrowRight className="w-3.5 h-3.5" />
//                   </button>
//                 </Link>
//                 <Link href="/products">
//                   <button className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-[#8B9D83]/40 text-[#263b32] rounded-xl text-xs sm:text-sm font-medium hover:bg-[#8B9D83]/10 hover:-translate-y-0.5 transition-all duration-300" style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}>
//                     <FaShoppingBag className="w-3.5 h-3.5" />
//                     Browse Products
//                   </button>
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

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  FaCheckCircle,
  FaArrowRight,
  FaShieldAlt,
  FaUsers,
  FaEye,
  FaLock,
  FaCookie,
  FaExclamationTriangle,
  FaGlobe,
  FaServer,
  FaClock,
  FaListUl,
  FaShoppingBag,
  FaEnvelope,
  FaPhone,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// ============================================================
// FONTS & COLORS — Nishita's Collection
// ============================================================

const BRAND = '#CC1D34';
const BG_PRIMARY = '#f7f4ef';
const BG_SOFT = '#edf1ea';
const TEXT_PRIMARY = '#29362f';
const TEXT_MUTED = '#687169';
const TEXT_SOFT = '#7e897e';

const FONT_SERIF = "Georgia, 'Times New Roman', serif";
const FONT_BODY = "'Inter', system-ui, sans-serif";

// ============================================================
// ANIMATIONS
// ============================================================

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

// ============================================================
// ICON MAP
// ============================================================

const ICON_MAP = {
  FaShieldAlt,
  FaShield: FaShieldAlt,
  FaUsers,
  FaEye,
  FaLock,
  FaCookie,
  FaExclamationTriangle,
  FaAlertCircle: FaExclamationTriangle,
  FaGlobe,
  FaServer,
  FaClock,
};

const getIcon = (iconName) => ICON_MAP[iconName] || FaShieldAlt;

// ============================================================
// COMPONENT
// ============================================================

export default function PrivacyClient() {
  const [privacyData, setPrivacyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState(1);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  useEffect(() => {
    const fetchPrivacyData = async () => {
      try {
        setIsLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/privacy`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Failed to fetch privacy policy: ${response.status}`);

        const result = await response.json();

        if (result.success && result.data) {
          setPrivacyData(result.data);
          if (result.data.sections?.length > 0) {
            setActiveId(result.data.sections[0].id);
          }
        } else {
          setPrivacyData(getDefaultData());
        }
      } catch (err) {
        console.error('Error fetching privacy policy:', err);
        setPrivacyData(getDefaultData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrivacyData();
  }, []);

  const getDefaultData = () => ({
    heroTitle: 'Your Privacy',
    heroSubtitle: 'Matters to Us',
    heroDescription:
      'We are committed to protecting your personal data and being transparent about how we collect, use, and safeguard your information.',
    heroImage: '/images/contact-hero.jpg',
    ctaImage: '/images/cta-bg.jpg',
    introText:
      "Welcome to Nishita's Collection. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.",
    lastUpdated: new Date().toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
    }),
    quickInfo: {
      email: 'privacy@nishitascollection.com',
      phone: '+880 1XXXXXXXXX',
      responseTime: 'Within 24 hours',
    },
    sections: [],
  });

  // TOC active-section tracker
  useEffect(() => {
    if (!privacyData?.sections) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section-id');
            if (id) setActiveId(Number(id));
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    );

    privacyData.sections.forEach((section) => {
      const el = document.getElementById(`section-${section.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [privacyData]);

  const handleTocClick = () => setMobileTocOpen(false);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center bg-[#f7f4ef] -mt-20">
          <div className="text-center">
            <div className="mx-auto inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#7e897e] border-t-transparent" />
            <p className="mt-3 text-sm text-[#687169]" style={{ fontFamily: FONT_BODY }}>
              Loading privacy policy...
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const data = privacyData || getDefaultData();
  const {
    heroTitle, heroSubtitle, heroDescription,
    heroImage, ctaImage, introText, sections,
    additionalInfo, lastUpdated, quickInfo,
  } = data;

  const quickInfoItems = [
    {
      icon: <FaEnvelope className="h-4 w-4" />,
      label: 'Privacy Email',
      value: quickInfo?.email || 'privacy@nishitascollection.com',
      link: `mailto:${quickInfo?.email || 'privacy@nishitascollection.com'}`,
    },
    {
      icon: <FaPhone className="h-4 w-4" />,
      label: 'Privacy Hotline',
      value: quickInfo?.phone || '+880 1XXXXXXXXX',
      link: `tel:${quickInfo?.phone?.replace(/\s/g, '') || '+8801XXXXXXXXX'}`,
    },
    {
      icon: <FaClock className="h-4 w-4" />,
      label: 'Response Time',
      value: quickInfo?.responseTime || 'Within 24 hours',
    },
  ];

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen bg-[#f7f4ef] ">

        {/* ======================================================
            HERO — centered
        ====================================================== */}
        <section className="relative overflow-hidden bg-[#f7f4ef] -mt-16">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${heroImage || '/images/contact-hero.jpg'}')` }}
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/75 to-transparent" />
          </div>

          <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl sm:h-72 sm:w-72" />

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInLeft}
              className="mx-auto flex min-h-[200px] max-w-2xl flex-col items-center py-10 text-center sm:min-h-[240px] sm:py-14 md:min-h-[280px] md:py-16"
            >
              <div className="mb-2 flex items-center justify-center gap-2 sm:mb-3">
                <span className="h-px w-6 bg-white/70 sm:w-8" />
                <span
                  className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/85 sm:text-[10px] md:text-xs"
                  style={{ fontFamily: FONT_BODY }}
                >
                  Privacy Policy
                </span>
                <span className="h-px w-6 bg-white/70 sm:w-8" />
              </div>

              <h1
                className="text-3xl leading-[1.05] font-normal text-white sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ fontFamily: FONT_SERIF }}
              >
                {heroTitle || 'Your Privacy'}
                <span className="block" style={{ color: BRAND }}>
                  {heroSubtitle || 'Matters to Us'}
                </span>
              </h1>

              <div className="mt-3 mb-2 flex items-center justify-center gap-2 sm:mt-4 sm:mb-3">
                <span className="h-px w-10 bg-white/50 sm:w-14" />
                <span className="h-1 w-1 rounded-full bg-white" />
                <span className="h-px w-10 bg-white/50 sm:w-14" />
              </div>

              <p
                className="mx-auto max-w-lg text-[10px] leading-5 text-white/90 sm:text-[11px] sm:leading-6 md:text-xs md:leading-7"
                style={{ fontFamily: FONT_BODY }}
              >
                {heroDescription ||
                  'We are committed to protecting your personal data and being transparent about how we collect, use, and safeguard your information.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ======================================================
            BODY — TOC + Content
        ====================================================== */}
        <section className="py-8 sm:py-10 lg:py-16" style={{ backgroundColor: BG_PRIMARY }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            {/* Mobile TOC dropdown */}
            {sections?.length > 0 && (
              <div className="mb-6 lg:hidden">
                <button
                  type="button"
                  onClick={() => setMobileTocOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-xl border border-[#e2ddd4] bg-white px-4 py-3 text-left transition-colors hover:bg-[#f0f5ed]"
                >
                  <span
                    className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider"
                    style={{ color: TEXT_PRIMARY, fontFamily: FONT_BODY }}
                  >
                    <FaListUl className="h-3.5 w-3.5" style={{ color: BRAND }} />
                    On this page
                    <span className="text-xs font-normal text-gray-400">
                      ({sections.length})
                    </span>
                  </span>
                  {mobileTocOpen ? (
                    <FaChevronUp className="h-3.5 w-3.5" style={{ color: BRAND }} />
                  ) : (
                    <FaChevronDown className="h-3.5 w-3.5" style={{ color: BRAND }} />
                  )}
                </button>

                {mobileTocOpen && (
                  <nav className="mt-2 overflow-hidden rounded-xl border border-[#e2ddd4] bg-white">
                    <ul className="divide-y divide-[#e2ddd4]">
                      {sections.map((section, index) => {
                        const serialNumber = index + 1;
                        return (
                          <li key={section.id}>
                            <a
                              href={`#section-${section.id}`}
                              onClick={handleTocClick}
                              className="flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-[#f0f5ed]"
                              style={{
                                fontFamily: FONT_BODY,
                                color: activeId === section.id ? BRAND : TEXT_MUTED,
                                fontWeight: activeId === section.id ? 500 : 400,
                              }}
                            >
                              <span
                                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border border-[#e2ddd4] text-[10px] font-semibold"
                                style={{ color: BRAND }}
                              >
                                {String(serialNumber).padStart(2, '0')}
                              </span>
                              <span className="truncate">{section.title}</span>
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                )}
              </div>
            )}

            {/* Grid */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[240px_1fr] lg:gap-14">

              {/* Desktop sticky sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <div
                    className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: TEXT_PRIMARY, fontFamily: FONT_BODY }}
                  >
                    <FaListUl className="h-3.5 w-3.5" style={{ color: BRAND }} />
                    On this page
                  </div>
                  <nav className="space-y-1 border-l border-[#e2ddd4]">
                    {sections?.map((section, index) => {
                      const serialNumber = index + 1;
                      return (
                        <a
                          key={section.id}
                          href={`#section-${section.id}`}
                          className="block -ml-px border-l py-1.5 pl-4 pr-2 text-sm transition-colors"
                          style={{
                            fontFamily: FONT_BODY,
                            borderColor: activeId === section.id ? BRAND : 'transparent',
                            color: activeId === section.id ? BRAND : TEXT_MUTED,
                            fontWeight: activeId === section.id ? 500 : 400,
                          }}
                        >
                          {String(serialNumber).padStart(2, '0')}. {section.title}
                        </a>
                      );
                    })}
                  </nav>
                </div>
              </aside>

              {/* Content */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <motion.p
                  variants={fadeInUp}
                  className="mb-6 border-b border-[#e2ddd4] pb-6 text-xs leading-relaxed sm:mb-8 sm:pb-8 sm:text-sm lg:text-base"
                  style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
                >
                  {introText}
                </motion.p>

                {sections?.map((section, index) => {
                  const Icon = getIcon(section.icon);
                  const serialNumber = index + 1;
                  return (
                    <motion.div
                      key={section.id}
                      variants={fadeInUp}
                      id={`section-${section.id}`}
                      data-section-id={section.id}
                      className="mb-8 scroll-mt-24 sm:mb-10 lg:mb-12 lg:scroll-mt-28"
                    >
                      <div className="mb-3 flex items-start gap-2.5 sm:mb-4 sm:gap-3 lg:gap-4">
                        <div
                          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-[#e2ddd4] bg-white text-[10px] font-semibold sm:h-9 sm:w-9 sm:text-xs"
                          style={{ color: BRAND, fontFamily: FONT_BODY }}
                        >
                          {String(serialNumber).padStart(2, '0')}
                        </div>
                        <div className="flex-1 pt-1">
                          <h2
                            className="flex items-start gap-2 text-base font-normal leading-tight sm:text-lg lg:text-xl"
                            style={{ color: TEXT_PRIMARY, fontFamily: FONT_SERIF }}
                          >
                            <Icon
                              className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 sm:h-4 sm:w-4"
                              style={{ color: BRAND }}
                            />
                            {section.title}
                          </h2>
                        </div>
                      </div>

                      <div className="pl-10 sm:pl-12">
                        <p
                          className="mb-3 text-xs leading-relaxed sm:mb-4 sm:text-sm lg:text-base"
                          style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
                        >
                          {section.description}
                        </p>

                        <ul className="space-y-2 sm:space-y-2.5">
                          {section.details?.map((detail, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-xs leading-relaxed sm:gap-2.5 sm:text-sm"
                              style={{ color: TEXT_PRIMARY, fontFamily: FONT_BODY }}
                            >
                              <FaCheckCircle
                                className="mt-0.5 h-3 w-3 flex-shrink-0 sm:h-3.5 sm:w-3.5"
                                style={{ color: BRAND }}
                              />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 border-t border-[#e2ddd4] sm:mt-8" />
                    </motion.div>
                  );
                })}


                {/* Important Notice */}
                <motion.div
                  variants={fadeInUp}
                  className="mt-4 rounded-xl border border-[#e2ddd4] bg-white p-5 shadow-sm sm:p-6 lg:p-8"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div
                      className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg sm:h-9 sm:w-9"
                      style={{ backgroundColor: BG_SOFT }}
                    >
                      <FaExclamationTriangle
                        className="h-3.5 w-3.5 sm:h-4 sm:w-4"
                        style={{ color: BRAND }}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3
                        className="mb-2 text-sm font-normal sm:text-base"
                        style={{ color: TEXT_PRIMARY, fontFamily: FONT_SERIF }}
                      >
                        Important Notice
                      </h3>
                      <p
                        className="text-xs leading-relaxed sm:text-sm"
                        style={{ color: TEXT_MUTED, fontFamily: FONT_BODY }}
                      >
                        This Privacy Policy is a legal agreement between you and
                        Nishita's Collection. By using our Platform, you acknowledge that you
                        have read, understood, and agree to the practices described in this
                        policy.
                      </p>
                      <div className="mt-3 flex flex-wrap gap-4 sm:mt-4 sm:gap-5">
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-80 sm:text-sm"
                          style={{ color: BRAND, fontFamily: FONT_BODY }}
                        >
                          Contact Us
                          <FaArrowRight className="h-3 w-3" />
                        </Link>
                        <Link
                          href="/terms"
                          className="inline-flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-80 sm:text-sm"
                          style={{ color: BRAND, fontFamily: FONT_BODY }}
                        >
                          Terms & Conditions
                          <FaArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {lastUpdated && (
                  <motion.p
                    variants={fadeInUp}
                    className="mt-5 text-right text-[10px] sm:mt-6 sm:text-xs"
                    style={{ color: TEXT_SOFT, fontFamily: FONT_BODY }}
                  >
                    Last Updated: {lastUpdated}
                  </motion.p>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================================
            CTA — cream overlay style
        ====================================================== */}
        <section className="relative overflow-hidden">
          <div className="relative min-h-[200px] sm:min-h-[240px] md:min-h-[280px]">
            {ctaImage && (
              <img
                src={ctaImage}
                alt="Your privacy is our priority"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            <div className="absolute inset-0 bg-[#F1EFE3]/75" />

            <div className="relative z-10 flex min-h-[200px] items-center justify-center px-4 text-center sm:min-h-[240px] sm:px-5 md:min-h-[280px]">
              <div className="max-w-xl" style={{ color: TEXT_PRIMARY }}>
                <GiSparkles
                  className="mx-auto mb-2.5 opacity-70 sm:mb-3"
                  size={18}
                  strokeWidth={1.2}
                  style={{ color: BRAND }}
                />
                <h2
                  className="text-xl sm:text-2xl md:text-3xl"
                  style={{ fontFamily: FONT_SERIF }}
                >
                  Your Privacy is Our Priority
                </h2>
                <p
                  className="mx-auto mt-2.5 max-w-md text-[11px] leading-5 sm:mt-3 sm:text-xs md:text-sm"
                  style={{ color: '#5a6660', fontFamily: FONT_BODY }}
                >
                  Have questions about how we handle your data? Our team is here to help.
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-medium text-white transition hover:opacity-90 sm:px-5 sm:py-2.5"
                    style={{ backgroundColor: BRAND, fontFamily: FONT_BODY }}
                  >
                    <FaArrowRight className="h-3 w-3" />
                    Contact Privacy Team
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 rounded-full border border-[#29362f]/25 px-4 py-2 text-[11px] font-medium transition hover:bg-[#29362f]/5 sm:px-5 sm:py-2.5"
                    style={{ color: TEXT_PRIMARY, fontFamily: FONT_BODY }}
                  >
                    <FaShoppingBag className="h-3 w-3" />
                    Browse Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}