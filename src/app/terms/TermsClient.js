


// // app/terms/page.js
// 'use client';

// import { motion } from 'framer-motion';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import {
//   FaCheckCircle,
//   FaArrowRight,
//   FaFileContract,
//   FaUserShield,
//   FaCreditCard,
//   FaTruck,
//   FaShoppingBag,
//   FaHands,
//   FaLock,
//   FaExclamationTriangle,
//   FaBalanceScale,
//   FaPrint,
//   FaListUl,
//   FaHeart,
//   FaSparkles
// } from 'react-icons/fa';
// import { GiSparkles } from 'react-icons/gi';
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // Font constants - Same as Contact page
// const FONT_FAMILY = "'Raleway', 'Inter', sans-serif";
// const FONT_FAMILY_PLAYFAIR = "'Playfair Display', Georgia, serif";
// const FONT_FAMILY_INTER = "'Inter', sans-serif";

// // Animation variants
// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// };

// const fadeInLeft = {
//   hidden: { opacity: 0, x: -40 },
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
//     transition: { staggerChildren: 0.08, delayChildren: 0.05 },
//   },
// };

// // Icon mapping
// const ICON_MAP = {
//   FaFileContract: FaFileContract,
//   FaShoppingBag: FaShoppingBag,
//   FaCreditCard: FaCreditCard,
//   FaTruck: FaTruck,
//   FaHands: FaHands,
//   FaUserShield: FaUserShield,
//   FaLock: FaLock,
//   FaBalanceScale: FaBalanceScale,
//   FaExclamationTriangle: FaExclamationTriangle,
// };

// const getIcon = (iconName) => {
//   const Icon = ICON_MAP[iconName];
//   return Icon || FaFileContract;
// };

// export default function TermsPage() {
//   const [termsData, setTermsData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [activeId, setActiveId] = useState(1);

//   // Fetch terms data from backend
//   useEffect(() => {
//     const fetchTermsData = async () => {
//       try {
//         setIsLoading(true);
//         const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
//         const response = await fetch(`${apiUrl}/api/terms`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
        
//         if (!response.ok) {
//           throw new Error(`Failed to fetch terms: ${response.status}`);
//         }
        
//         const result = await response.json();
        
//         if (result.success && result.data) {
//           setTermsData(result.data);
//           if (result.data.sections && result.data.sections.length > 0) {
//             setActiveId(result.data.sections[0].id);
//           }
//         } else {
//           setTermsData(getDefaultData());
//         }
//       } catch (err) {
//         console.error('Error fetching terms:', err);
//         setTermsData(getDefaultData());
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTermsData();
//   }, []);

//   const getDefaultData = () => ({
//     heroTitle: 'Terms & Conditions',
//     heroDescription: 'Please read these terms carefully before using our website and services. By accessing our platform, you agree to be bound by these terms.',
//     introText: 'Welcome to BeautyBucket. These Terms & Conditions ("Terms") govern your use of the BeautyBucket website, mobile application, and all related services (collectively, the "Platform"). By accessing or using our Platform, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Platform.',
//     heroImage: '/images/bg10.jpg',
//     ctaImage: '/images/pattern.png',
//     lastUpdated: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
//     sections: [
//       {
//         id: 1,
//         title: 'Acceptance of Terms',
//         icon: 'FaFileContract',
//         description: 'By using BeautyBucket\'s website and services, you agree to comply with and be bound by these Terms & Conditions.',
//         details: [
//           'These terms apply to all users of the BeautyBucket platform',
//           'By placing an order, you accept these terms in full',
//           'We reserve the right to update these terms at any time',
//           'Continued use constitutes acceptance of updated terms'
//         ]
//       },
//       {
//         id: 2,
//         title: 'User Accounts',
//         icon: 'FaUserShield',
//         description: 'To access certain features of our Platform, you may be required to create a user account.',
//         details: [
//           'You are responsible for maintaining the confidentiality of your account credentials',
//           'You agree to provide accurate and complete information when creating your account',
//           'You are solely responsible for all activities that occur under your account',
//           'We reserve the right to suspend or terminate accounts that violate these terms'
//         ]
//       },
//       {
//         id: 3,
//         title: 'Product Information & Pricing',
//         icon: 'FaShoppingBag',
//         description: 'We strive to provide accurate product descriptions, images, and pricing information on our Platform.',
//         details: [
//           'Product images are for illustrative purposes and may vary from actual products',
//           'Prices are subject to change without prior notice',
//           'We reserve the right to correct any errors in pricing or product information',
//           'All products are subject to availability'
//         ]
//       },
//       {
//         id: 4,
//         title: 'Payments & Transactions',
//         icon: 'FaCreditCard',
//         description: 'All payments made through our Platform are processed securely through our trusted payment partners.',
//         details: [
//           'We accept various payment methods including credit/debit cards and mobile payments',
//           'All transactions are processed in BDT (Bangladeshi Taka)',
//           'You agree to pay all charges incurred under your account',
//           'We use SSL encryption to protect your payment information'
//         ]
//       },
//       {
//         id: 5,
//         title: 'Shipping & Delivery',
//         icon: 'FaTruck',
//         description: 'We are committed to delivering your orders in a timely and efficient manner.',
//         details: [
//           'Delivery times are estimated and may vary based on location',
//           'You will receive a tracking number once your order is shipped',
//           'We are not responsible for delays caused by courier services or customs',
//           'Please ensure your delivery address is accurate and complete'
//         ]
//       },
//       {
//         id: 6,
//         title: 'Returns & Refunds',
//         icon: 'FaHands',
//         description: 'Your satisfaction is our priority. We offer a transparent returns and refunds policy.',
//         details: [
//           'Returns are accepted within 7 days of delivery with original packaging',
//           'Products must be unused and in original condition',
//           'Refunds will be processed within 5-7 business days',
//           'Shipping charges are non-refundable'
//         ]
//       },
//       {
//         id: 7,
//         title: 'Intellectual Property',
//         icon: 'FaBalanceScale',
//         description: 'All content on our Platform is protected by copyright, trademark, and other intellectual property laws.',
//         details: [
//           'All content including text, images, logos, and designs are owned by BeautyBucket',
//           'You may not reproduce, distribute, or create derivative works without permission',
//           'Trademarks and logos may not be used without prior written consent',
//           'Unauthorized use of our intellectual property will result in legal action'
//         ]
//       },
//       {
//         id: 8,
//         title: 'Limitation of Liability',
//         icon: 'FaExclamationTriangle',
//         description: 'BeautyBucket provides the Platform and services "as is" without warranties of any kind.',
//         details: [
//           'We are not liable for any indirect, incidental, or consequential damages',
//           'Our liability is limited to the purchase price of the product',
//           'We do not guarantee that the Platform will be uninterrupted or error-free',
//           'You use the Platform at your own risk'
//         ]
//       },
//       {
//         id: 9,
//         title: 'Governing Law',
//         icon: 'FaBalanceScale',
//         description: 'These Terms are governed by and construed in accordance with the laws of Bangladesh.',
//         details: [
//           'Any disputes shall be subject to the exclusive jurisdiction of Dhaka courts',
//           'Bangladesh laws shall apply to all matters relating to these terms',
//           'If any provision is found to be invalid, the remaining provisions remain in effect',
//           'These terms constitute the entire agreement between you and BeautyBucket'
//         ]
//       }
//     ]
//   });

//   // Track which section is in view to highlight the sidebar TOC
//   useEffect(() => {
//     if (!termsData?.sections) return;

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

//     termsData.sections.forEach((section) => {
//       const el = document.getElementById(`section-${section.id}`);
//       if (el) observer.observe(el);
//     });

//     return () => observer.disconnect();
//   }, [termsData]);

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

//   const data = termsData || getDefaultData();
//   const { heroTitle, heroDescription, introText, heroImage, ctaImage, sections, lastUpdated } = data;

//   return (
//     <>
//       <Navbar />

//       <main className="min-h-screen bg-[#f8f7f2] -mt-20">

//         {/* ======================================================
//             HERO - Green Theme (Same as Contact)
//         ====================================================== */}

//         <section className="relative min-h-[180px] sm:min-h-[180px] lg:min-h-[250px] overflow-hidden bg-[#f3eee7]">
//           {/* Background */}
//           <div className="absolute inset-0">
//             <div
//               className="absolute inset-0 bg-cover bg-center"
//               style={{
//                 backgroundImage: `url('${heroImage || '/images/bg10.jpg'}')`,
//               }}
//             />
//             {/* Soft cream overlay */}
//             <div className="absolute inset-0 bg-[#f3eee7]/35" />
//             {/* Left side readability gradient */}
//             <div className="absolute inset-0 bg-gradient-to-r from-[#f3eee7]/35 via-[#f3eee7]/15 to-transparent" />
//             {/* Very subtle right fade */}
//             <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-transparent to-[#f3eee7]/10" />
//           </div>

//           {/* Decorative soft shapes */}
//           <div className="absolute -left-20 -top-20 w-56 h-56 rounded-full bg-white/30 blur-3xl" />
//           <div className="absolute right-0 bottom-0 w-72 h-72 rounded-full bg-[#c9bca8]/10 blur-3xl" />

//           <div className="container mx-auto px-5 sm:px-8 lg:px-10 relative z-10 h-full">
//             <div className="min-h-[180px] sm:min-h-[180px] lg:min-h-[250px] flex items-center">
//               <motion.div
//                 initial="hidden"
//                 animate="visible"
//                 variants={fadeInLeft}
//                 className="w-full max-w-[390px] sm:max-w-[460px] lg:max-w-[510px] py-10 sm:py-12 lg:py-14"
//               >
//                 {/* Small editorial label */}
//                 <div className="flex items-center gap-2 mb-3 sm:mb-4">
//                   <span className="w-7 sm:w-9 h-px bg-[#8B9D83]" />
//                   <span
//                     className="text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-[#68776b]"
//                     style={{ fontFamily: FONT_FAMILY }}
//                   >
//                     Legal Agreement
//                   </span>
//                 </div>

//                 {/* Main Heading */}
//                 <h1
//                   className="text-[32px] leading-[0.98] sm:text-[40px] sm:leading-[1] lg:text-[50px] lg:leading-[1] font-normal text-[#263b32] tracking-[-0.025em]"
//                   style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                 >
//                   {heroTitle || 'Terms & Conditions'}
//                 </h1>

//                 {/* Small decorative line */}
//                 <div className="flex items-center gap-2 mt-4 mb-3">
//                   <span className="w-12 sm:w-16 h-[1px] bg-[#8B9D83]/60" />
//                   <span className="w-1 h-1 rounded-full bg-[#8B9D83]" />
//                 </div>

//                 {/* Description */}
//                 <p
//                   className="max-w-[330px] sm:max-w-[390px] text-[9px] sm:text-[10px] lg:text-[11px] leading-[1.7] text-[#59655d]"
//                   style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                 >
//                   {heroDescription || 'Please read these terms carefully before using our website and services.'}
//                 </p>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* ======================================================
//             BODY - Green Theme
//         ====================================================== */}

//         <section className="py-12 lg:py-16 bg-[#f8f7f2]">
//           <div className="container mx-auto px-4">
//             <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-14">
//               {/* Sidebar TOC - Green Theme */}
//               <aside className="hidden lg:block">
//                 <div className="sticky top-28">
//                   <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#263b32] mb-4" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                     <FaListUl className="w-3.5 h-3.5 text-[#8B9D83]" />
//                     On this page
//                   </div>
//                   <nav className="space-y-1 border-l border-[#c5d5be]/60">
//                     {sections && sections.map((section) => (
//                       <a
//                         key={section.id}
//                         href={`#section-${section.id}`}
//                         className={`block pl-4 pr-2 py-1.5 -ml-px border-l text-sm transition-colors ${
//                           activeId === section.id
//                             ? 'border-[#8B9D83] text-[#8B9D83] font-medium'
//                             : 'border-transparent text-[#53645a] hover:text-[#263b32]'
//                         }`}
//                         style={{ fontFamily: FONT_FAMILY_INTER }}
//                       >
//                         {String(section.id).padStart(2, '0')}. {section.title}
//                       </a>
//                     ))}
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
//                   className="text-[#53645a] leading-relaxed text-sm lg:text-base pb-8 mb-8 border-b border-[#c5d5be]/40"
//                   style={{ fontFamily: FONT_FAMILY_INTER }}
//                 >
//                   {introText || 'Welcome to BeautyBucket. These Terms & Conditions govern your use of our website and services.'}
//                 </motion.p>

//                 {sections && sections.map((section) => {
//                   const Icon = getIcon(section.icon);
//                   return (
//                     <motion.div
//                       key={section.id}
//                       variants={fadeInUp}
//                       id={`section-${section.id}`}
//                       data-section-id={section.id}
//                       className="mb-10 lg:mb-12 scroll-mt-28"
//                     >
//                       <div className="flex items-start gap-4 mb-4">
//                         <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#c5d5be]/60 bg-white text-[#8B9D83] flex-shrink-0 text-xs font-semibold" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                           {String(section.id).padStart(2, '0')}
//                         </div>
//                         <div className="flex-1 pt-1">
//                           <h2 className="text-lg lg:text-xl font-light text-[#263b32] flex items-center gap-2" style={{ fontFamily: FONT_FAMILY }}>
//                             {section.title}
//                           </h2>
//                         </div>
//                       </div>

//                       <div className="pl-13 lg:pl-13">
//                         <p className="text-sm lg:text-base text-[#53645a] leading-relaxed mb-4" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                           {section.description}
//                         </p>

//                         <ul className="space-y-2.5">
//                           {section.details && section.details.map((detail, idx) => (
//                             <li
//                               key={idx}
//                               className="flex items-start gap-2.5 text-sm text-[#263b32] leading-relaxed" style={{ fontFamily: FONT_FAMILY_INTER }}
//                             >
//                               <FaCheckCircle className="w-3.5 h-3.5 text-[#8B9D83] mt-0.5 flex-shrink-0" />
//                               <span>{detail}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>

//                       <div className="mt-8 border-t border-[#c5d5be]/30" />
//                     </motion.div>
//                   );
//                 })}

//                 {/* Important Notice - Green Theme */}
//                 <motion.div
//                   variants={fadeInUp}
//                   className="bg-white rounded-xl p-6 lg:p-8 border border-[#c5d5be]/60 mt-4 shadow-sm"
//                 >
//                   <div className="flex items-start gap-4">
//                     <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#f0f5ed] flex-shrink-0">
//                       <FaExclamationTriangle className="w-4 h-4 text-[#8B9D83]" />
//                     </div>
//                     <div>
//                       <h3 className="text-base font-light text-[#263b32] mb-2" style={{ fontFamily: FONT_FAMILY }}>
//                         Important Notice
//                       </h3>
//                       <p className="text-sm text-[#53645a] leading-relaxed" style={{ fontFamily: FONT_FAMILY_INTER }}>
//                         These Terms & Conditions are a legal agreement between you and BeautyBucket.
//                         By using our Platform, you acknowledge that you have read, understood, and agree
//                         to be bound by these Terms. If you have any questions, please contact our support team.
//                       </p>
//                       <div className="flex flex-wrap gap-5 mt-4">
//                         <Link
//                           href="/contact"
//                           className="inline-flex items-center gap-1.5 text-[#8B9D83] hover:text-[#6b7d63] font-medium text-sm transition-colors" style={{ fontFamily: FONT_FAMILY_INTER }}
//                         >
//                           Contact Us
//                           <FaArrowRight className="w-3 h-3" />
//                         </Link>
//                         <Link
//                           href="/privacy"
//                           className="inline-flex items-center gap-1.5 text-[#8B9D83] hover:text-[#6b7d63] font-medium text-sm transition-colors" style={{ fontFamily: FONT_FAMILY_INTER }}
//                         >
//                           Privacy Policy
//                           <FaArrowRight className="w-3 h-3" />
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* Last Updated */}
//                 {lastUpdated && (
//                   <motion.p
//                     variants={fadeInUp}
//                     className="text-xs text-[#8B9D83]/50 mt-6 text-right"
//                     style={{ fontFamily: FONT_FAMILY_INTER }}
//                   >
//                     Last Updated: {lastUpdated}
//                   </motion.p>
//                 )}
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* ======================================================
//             CTA - Green Theme (Left Aligned)
//         ====================================================== */}

//         <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
//           <div className="absolute inset-0">
//             <div
//               className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//               style={{ 
//                 backgroundImage: `url('${ctaImage || '/images/cta-bg.jpg'}')`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//               }}
//             />
//             <div className="absolute inset-0 bg-gradient-to-br from-[#8B9D83]/85 to-[#6b7d63]/85" />
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
//               <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-4">
//                 <GiSparkles className="w-3.5 h-3.5 text-white" />
//                 <span className="text-xs sm:text-sm text-white font-medium" style={{ fontFamily: FONT_FAMILY }}>
//                   Have Questions?
//                 </span>
//               </div>

//               <h2 
//                 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-white mb-3 leading-tight" 
//                 style={{ fontFamily: FONT_FAMILY }}
//               >
//                 Have Questions About Our Terms?
//               </h2>

//               <p 
//                 className="text-xs sm:text-sm lg:text-base text-white/90 max-w-xl mb-7 leading-relaxed" 
//                 style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//               >
//                 Our team is here to help you understand our policies and ensure your experience is seamless.
//               </p>

//               <div className="flex flex-wrap gap-3">
//                 <Link 
//                   href="/contact"
//                   className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white text-[#8B9D83] rounded-xl text-xs sm:text-sm font-medium hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
//                   style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                 >
//                   <FaArrowRight className="w-3.5 h-3.5" />
//                   Contact Support
//                 </Link>

//                 <Link 
//                   href="/products"
//                   className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 border border-white/40 text-white rounded-xl text-xs sm:text-sm font-medium hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
//                   style={{ fontFamily: FONT_FAMILY_PLAYFAIR }}
//                 >
//                   <FaShoppingBag className="w-3.5 h-3.5" />
//                   Start Shopping
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
  FaFileContract,
  FaUserShield,
  FaCreditCard,
  FaTruck,
  FaShoppingBag,
  FaHands,
  FaLock,
  FaExclamationTriangle,
  FaBalanceScale,
  FaListUl,
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
  FaFileContract,
  FaShoppingBag,
  FaCreditCard,
  FaTruck,
  FaHands,
  FaUserShield,
  FaLock,
  FaBalanceScale,
  FaExclamationTriangle,
};

const getIcon = (iconName) => ICON_MAP[iconName] || FaFileContract;

// ============================================================
// COMPONENT
// ============================================================

export default function TermsPage() {
  const [termsData, setTermsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeId, setActiveId] = useState(1);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  useEffect(() => {
    const fetchTermsData = async () => {
      try {
        setIsLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/terms`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`Failed to fetch terms: ${response.status}`);

        const result = await response.json();

        if (result.success && result.data) {
          setTermsData(result.data);
          if (result.data.sections?.length > 0) {
            setActiveId(result.data.sections[0].id);
          }
        } else {
          setTermsData(getDefaultData());
        }
      } catch (err) {
        console.error('Error fetching terms:', err);
        setTermsData(getDefaultData());
      } finally {
        setIsLoading(false);
      }
    };

    fetchTermsData();
  }, []);

  const getDefaultData = () => ({
    heroTitle: 'Terms & Conditions',
    heroDescription:
      'Please read these terms carefully before using our website and services.',
    introText:
      "Welcome to Nishita's Collection. These Terms & Conditions govern your use of our website and services.",
    heroImage: '/images/contact-hero.jpg',
    ctaImage: '/images/cta-bg.jpg',
    lastUpdated: new Date().toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric',
    }),
    sections: [],
  });

  // ----------------------------------------------------------
  // TOC active-section tracker (same logic as working green page)
  // ----------------------------------------------------------
  useEffect(() => {
    if (!termsData?.sections) return;

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

    termsData.sections.forEach((section) => {
      const el = document.getElementById(`section-${section.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [termsData]);

  const handleTocClick = () => setMobileTocOpen(false);

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

  const data = termsData || getDefaultData();
  const { heroTitle, heroDescription, introText, heroImage, ctaImage, sections, lastUpdated } = data;

  return (
    <>
      <Navbar />

      {/* ⚠️ NOTE: NO `overflow-hidden` on <main> — that would break the sticky sidebar */}
      <main className="relative min-h-screen bg-[#f7f4ef]">

        {/* ======================================================
            HERO
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
              className="mx-auto flex min-h-[180px] max-w-2xl flex-col items-center py-8 text-center sm:min-h-[220px] sm:py-12 md:min-h-[260px] md:py-16"
            >
              <div className="mb-2 flex items-center justify-center gap-2 sm:mb-3">
                <span className="h-px w-6 bg-white/70 sm:w-8" />
                <span
                  className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/85 sm:text-[10px] md:text-xs"
                  style={{ fontFamily: FONT_BODY }}
                >
                  Legal Agreement
                </span>
                <span className="h-px w-6 bg-white/70 sm:w-8" />
              </div>

              <h1
                className="text-2xl leading-[1.05] font-normal text-white sm:text-3xl md:text-4xl lg:text-5xl"
                style={{ fontFamily: FONT_SERIF }}
              >
                {heroTitle || 'Terms & Conditions'}
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
                {heroDescription || 'Please read these terms carefully before using our website and services.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* ======================================================
            BODY — TOC + Content
        ====================================================== */}
        <section className="py-8 sm:py-10 lg:py-16" style={{ backgroundColor: BG_PRIMARY }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">

            {/* Mobile TOC */}
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
                      {sections.map((section) => (
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
                              {String(section.id).padStart(2, '0')}
                            </span>
                            <span className="truncate">{section.title}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>
            )}

            {/* Grid: sticky sidebar (desktop) + content */}
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
                    {sections?.map((section) => (
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
                        {String(section.id).padStart(2, '0')}. {section.title}
                      </a>
                    ))}
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

                {sections?.map((section) => {
                  const Icon = getIcon(section.icon);
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
                          {String(section.id).padStart(2, '0')}
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
                        These Terms & Conditions are a legal agreement between you and
                        Nishita's Collection. By using our Platform, you acknowledge that you have
                        read, understood, and agree to be bound by these Terms. If you have any
                        questions, please contact our support team.
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
                          href="/privacy"
                          className="inline-flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-80 sm:text-sm"
                          style={{ color: BRAND, fontFamily: FONT_BODY }}
                        >
                          Privacy Policy
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
            CTA
        ====================================================== */}
        <section className="relative overflow-hidden">
          <div className="relative min-h-[200px] sm:min-h-[240px] md:min-h-[280px]">
            {ctaImage && (
              <img
                src={ctaImage}
                alt="Have questions"
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
                  Have Questions About Our Terms?
                </h2>
                <p
                  className="mx-auto mt-2.5 max-w-md text-[11px] leading-5 sm:mt-3 sm:text-xs md:text-sm"
                  style={{ color: '#5a6660', fontFamily: FONT_BODY }}
                >
                  Our team is here to help you understand our policies and ensure your
                  experience is seamless.
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-medium text-white transition hover:opacity-90 sm:px-5 sm:py-2.5"
                    style={{ backgroundColor: BRAND, fontFamily: FONT_BODY }}
                  >
                    <FaArrowRight className="h-3 w-3" />
                    Contact Support
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 rounded-full border border-[#29362f]/25 px-4 py-2 text-[11px] font-medium transition hover:bg-[#29362f]/5 sm:px-5 sm:py-2.5"
                    style={{ color: TEXT_PRIMARY, fontFamily: FONT_BODY }}
                  >
                    <FaShoppingBag className="h-3 w-3" />
                    Start Shopping
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