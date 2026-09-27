


// // app/layout.js
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { Toaster } from "sonner";
// import dynamic from 'next/dynamic'; 

// import ScrollToTop from "./components/layout/ScrollToTop";
// import PromotionalModalWrapper from "./components/PromotionalModalWrapper";
// import NewsletterPopup from "./components/NewsletterPopup";
// import UnifiedPopupManager from "./components/UnifiedPopupManager";
// import PixelTracker from "./components/PixelTracker";
// import CustomCodeInjector from "./components/CustomCodeInjector";

// import ChatWrapper from "./components/ChatWrapper"; 

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// // ============================================
// // BEAUTY BUCKET - Premium Beauty & Cosmetics E-commerce (Bangladesh)
// // Complete SEO Optimization for Beauty Market
// // ============================================

// export const metadata = {
//   // Base metadata
//   metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'),
//   title: {
//     default: "Beauty Bucket | Premium Beauty & Cosmetics Store in Bangladesh - Skincare, Makeup, Fragrances & More",
//     template: "%s | Beauty Bucket Bangladesh"
//   },
//   description: "Beauty Bucket - Bangladesh's trusted premium beauty store. Shop authentic skincare, makeup, fragrances, hair care, body care & beauty accessories. ✓COD ✓bKash/Nagad ✓100% Authentic ✓Best Prices",
  
//   // Keywords optimized for Bangladesh beauty market
//   keywords: [
//     // Primary keywords
//     "online beauty store bangladesh",
//     "beauty bucket bd",
//     "cosmetics shop dhaka",
//     "best beauty products bangladesh",
    
//     // Skincare
//     "skincare products bangladesh",
//     "best skincare routine bd",
//     "face cream price bangladesh",
//     "serum price bd",
//     "vitamin c serum bangladesh",
//     "hyaluronic acid serum bd",
//     "sunscreen price bangladesh",
//     "moisturizer price bd",
//     "face wash price bangladesh",
//     "toner price bd",
//     "eye cream bangladesh",
//     "retinol serum bd",
//     "niacinamide serum price bangladesh",
//     "face mask price bd",
//     "sheet mask bangladesh",
    
//     // Makeup
//     "makeup products bangladesh",
//     "foundation price bd",
//     "concealer price bangladesh",
//     "lipstick price bd",
//     "liquid lipstick bangladesh",
//     "mascara price bd",
//     "eyeshadow palette bangladesh",
//     "kajal price bd",
//     "eyeliner price bangladesh",
//     "blush price bd",
//     "highlighter bangladesh",
//     "bronzer price bd",
//     "setting spray bangladesh",
//     "makeup brushes bd",
//     "primer price bangladesh",
    
//     // Hair Care
//     "hair care products bangladesh",
//     "shampoo price bd",
//     "conditioner price bangladesh",
//     "hair serum bd",
//     "hair oil price bangladesh",
//     "hair mask bd",
//     "hair spray price bangladesh",
//     "dry shampoo bangladesh",
//     "hair growth serum bd",
    
//     // Fragrances
//     "perfume price in bangladesh",
//     "women perfume bd",
//     "men perfume price bangladesh",
//     "attar price bd",
//     "fragrance oil bangladesh",
//     "body mist price bd",
//     "deodorant price bangladesh",
//     "luxury perfume bd",
    
//     // Body Care
//     "body lotion price bangladesh",
//     "body scrub bd",
//     "body wash price bangladesh",
//     "body butter bangladesh",
//     "hand cream price bd",
//     "foot cream bangladesh",
    
//     // Natural & Organic
//     "natural skincare bangladesh",
//     "organic beauty products bd",
//     "herbal cosmetics price bangladesh",
//     "vegan beauty bd",
//     "cruelty free makeup bangladesh",
//     "clean beauty products bd",
    
//     // Beauty Accessories
//     "beauty accessories bangladesh",
//     "makeup sponge bd",
//     "beauty blender price bangladesh",
//     "makeup bag bd",
//     "mirror price bangladesh",
//     "beauty tools bd",
    
//     // Shopping intent
//     "buy cosmetics online bangladesh",
//     "best beauty price in bd",
//     "beauty shop dhaka",
//     "authentic makeup bangladesh",
//     "beauty store near me",
//     "cosmetics shop bd",
    
//     // Payment & Delivery
//     "cod beauty products bangladesh",
//     "bkash payment cosmetics",
//     "nagad beauty store",
//     "free delivery beauty dhaka",
//     "warranty cosmetics bangladesh",
    
//     // Trending beauty
//     "korean skincare bangladesh",
//     "k beauty products bd",
//     "vegan makeup bangladesh",
//     "clean beauty bd",
//     "cruelty free beauty products bangladesh",
//     "sustainable beauty bd",
//     "glow skincare bangladesh"
//   ],
  
//   authors: [{ name: "Beauty Bucket", url: "https://beautybucket.com.bd" }],
//   creator: "Beauty Bucket",
//   publisher: "Beauty Bucket Bangladesh",
  
//   // Robots configuration
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },
  
//   // Canonical URL
//   alternates: {
//     canonical: '/',
//     languages: {
//       'en-US': '/en',
//       'bn-BD': '/bn',
//     },
//   },
  
//   // Open Graph for social sharing (Facebook, WhatsApp, LinkedIn)
//   openGraph: {
//     title: "Beauty Bucket - Bangladesh's Premium Beauty Store | Skincare, Makeup, Fragrances",
//     description: "✓COD Available ✓bKash/Nagad ✓100% Authentic ✓Best Prices. Shop premium skincare, makeup, fragrances, hair care & beauty accessories at Beauty Bucket Bangladesh.",
//     url: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
//     siteName: "Beauty Bucket",
//     images: [
//       {
//         url: '/og-image-beautybucket.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Beauty Bucket - Premium Beauty Store in Bangladesh | Shop Cosmetics Online',
//       },
//     ],
//     locale: 'en_BD',
//     alternateLocale: ['bn_BD'],
//     type: 'website',
//     emails: ['support@beautybucket.com'],
//     phoneNumbers: ['+880123456789'],
//     countryName: 'Bangladesh',
//   },
  
//   // Twitter Card optimization
//   twitter: {
//     card: 'summary_large_image',
//     site: '@BeautyBucketBD',
//     siteId: 'beautybucket_bangladesh',
//     creator: '@BeautyBucketBD',
//     creatorId: 'beautybucket',
//     title: "Beauty Bucket - Premium Beauty Store Bangladesh | Skincare, Makeup & Cosmetics",
//     description: "Bangladesh's trusted premium beauty store. Shop authentic skincare, makeup, fragrances, hair care. COD & bKash/Nagad available. 100% authentic products.",
//     images: ['/twitter-card-beautybucket.jpg'],
//   },
  
//   // Verification (add your actual verification codes)
//   verification: {
//     google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
//     facebook: process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION || '',
//     me: 'beautybucket@contact',
//   },
  
//   // Additional metadata
//   category: "Premium Beauty & Cosmetics E-commerce",
//   classification: "Online Beauty Store | Cosmetics Bangladesh | Skincare Products",
  
//   // App links for mobile
//   appleWebApp: {
//     title: "Beauty Bucket",
//     statusBarStyle: "default",
//     capable: true,
//   },
  
//   // Format detection
//   formatDetection: {
//     email: true,
//     address: true,
//     telephone: true,
//   },
  
//   // Theme & Viewport - Beauty Bucket brand colors (Pink theme)
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "#EE4275" },
//     { media: "(prefers-color-scheme: dark)", color: "#CC3366" },
//   ],
//   viewport: {
//     width: "device-width",
//     initialScale: 1,
//     maximumScale: 5,
//     userScalable: true,
//   },
  
//   // Manifest for PWA
//   manifest: "/manifest.json",
  
//   // Other important SEO tags
//   other: {
//     'geo.region': 'BD',
//     'geo.placename': 'Dhaka',
//     'geo.position': '23.8103;90.4125',
//     'ICBM': '23.8103, 90.4125',
//     'copyright': `Beauty Bucket ${new Date().getFullYear()}`,
//     'distribution': 'global',
//     'rating': 'General',
//     'revisit-after': '1 day',
//     'language': 'English, Bengali',
//     'audience': 'Beauty Enthusiasts, Skincare Lovers, Makeup Artists, Women in Bangladesh',
//     'target_country': 'Bangladesh',
//     'price_range': '200-20000 BDT',
//     'currency': 'BDT',
//     'delivery': 'Cash on Delivery, Free Delivery over 3000 BDT',
//     'payment_methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
//     'warranty': '100% Authentic Products Guaranteed',
//   },
// };

// // Structured Data for better SEO (JSON-LD)
// export const generateJsonLd = () => {
//   return {
//     '@context': 'https://schema.org',
//     '@graph': [
//       {
//         '@type': 'Organization',
//         '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/#organization`,
//         name: 'Beauty Bucket Bangladesh',
//         url: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
//         logo: 'https://beautybucket.com.bd/logo.png',
//         sameAs: [
//           'https://facebook.com/beautybucketbd',
//           'https://instagram.com/beautybucket.bd',
//           'https://twitter.com/BeautyBucketBD',
//           'https://pinterest.com/beautybucketbd',
//           'https://youtube.com/beautybucketbd',
//           'https://tiktok.com/@beautybucketbd',
//         ],
//         description: 'Premium beauty, skincare, and cosmetics store in Bangladesh.',
//         address: {
//           '@type': 'PostalAddress',
//           addressCountry: 'BD',
//           addressLocality: 'Dhaka',
//           addressRegion: 'Dhaka',
//           postalCode: '1212',
//           streetAddress: 'Gulshan Avenue',
//         },
//         contactPoint: {
//           '@type': 'ContactPoint',
//           telephone: '+880123456789',
//           contactType: 'customer service',
//           availableLanguage: ['English', 'Bengali'],
//           hoursAvailable: {
//             '@type': 'OpeningHoursSpecification',
//             dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//             opens: '10:00',
//             closes: '22:00',
//           },
//         },
//       },
//       {
//         '@type': 'WebSite',
//         '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/#website`,
//         url: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
//         name: 'Beauty Bucket - Premium Beauty E-commerce Bangladesh',
//         description: 'Best online beauty store in Bangladesh. Shop premium skincare, makeup, fragrances, hair care & beauty accessories.',
//         publisher: { '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/#organization` },
//         potentialAction: {
//           '@type': 'SearchAction',
//           target: {
//             '@type': 'EntryPoint',
//             urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/search?q={search_term_string}`,
//           },
//           'query-input': 'required name=search_term_string',
//         },
//         inLanguage: ['en', 'bn'],
//       },
//       {
//         '@type': 'Store',
//         '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/#store`,
//         name: 'Beauty Bucket Online Store',
//         url: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
//         image: 'https://beautybucket.com.bd/store-image.jpg',
//         priceRange: '৳200 - ৳20000',
//         currenciesAccepted: 'BDT',
//         paymentAccepted: 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
//         openingHours: 'Mo-Su 10:00-22:00',
//         telephone: '+880123456789',
//         email: 'support@beautybucket.com',
//         description: 'Premium beauty, skincare, makeup, and cosmetics products.',
//         address: {
//           '@type': 'PostalAddress',
//           addressCountry: 'BD',
//           addressLocality: 'Dhaka',
//         },
//         // Beauty-specific schema
//         product: {
//           '@type': 'Product',
//           name: 'Premium Beauty Products',
//           description: 'Authentic skincare, makeup, fragrances, hair care & body care products',
//           brand: {
//             '@type': 'Brand',
//             name: 'Beauty Bucket',
//           },
//           offers: {
//             '@type': 'AggregateOffer',
//             priceCurrency: 'BDT',
//             availability: 'https://schema.org/InStock',
//             priceSpecification: {
//               '@type': 'PriceSpecification',
//               minPrice: '200',
//               maxPrice: '20000',
//               priceCurrency: 'BDT',
//             },
//           },
//         },
//       },
//       // Add ItemList for beauty categories
//       {
//         '@type': 'ItemList',
//         name: 'Beauty Categories',
//         description: 'Browse our wide selection of beauty and cosmetic products',
//         numberOfItems: 8,
//         itemListElement: [
//           {
//             '@type': 'ListItem',
//             position: 1,
//             name: 'Skincare',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/skincare`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 2,
//             name: 'Makeup',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/makeup`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 3,
//             name: 'Fragrances',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/fragrances`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 4,
//             name: 'Hair Care',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/hair-care`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 5,
//             name: 'Body Care',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/body-care`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 6,
//             name: 'Natural Beauty',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/natural-beauty`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 7,
//             name: 'Beauty Accessories',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/accessories`,
//           },
//           {
//             '@type': 'ListItem',
//             position: 8,
//             name: 'K-Beauty',
//             url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/category/k-beauty`,
//           },
//         ],
//       },
//       // BreadcrumbList for navigation
//       {
//         '@type': 'BreadcrumbList',
//         name: 'Breadcrumb',
//         itemListElement: [
//           {
//             '@type': 'ListItem',
//             position: 1,
//             name: 'Home',
//             item: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd',
//           },
//           {
//             '@type': 'ListItem',
//             position: 2,
//             name: 'Beauty',
//             item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/beauty`,
//           },
//         ],
//       },
//     ],
//   };
// };

// export default function RootLayout({ children }) {
//   // Generate JSON-LD structured data
//   const jsonLd = generateJsonLd();
  
//   return (
//     <html 
//       lang="en" 
//       data-scroll-behavior="smooth" 
//       data-theme="light" 
//       suppressHydrationWarning
//       style={{ colorScheme: 'light' }}
//       dir="ltr"
//     >
//       <head>
//         {/* Basic Meta Tags */}
//         <meta charSet="utf-8" />
//         <meta name="color-scheme" content="light only" />
//         <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        
//         {/* SEO Meta Tags */}
//         <meta name="description" content="Beauty Bucket - Bangladesh's premium beauty store. Shop skincare, makeup, fragrances, hair care & beauty accessories. ✓COD ✓bKash/Nagad ✓100% Authentic ✓Best Prices" />
//         <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
//         <meta name="googlebot" content="index, follow" />
        
//         {/* Geo Tags for Bangladesh */}
//         <meta name="geo.region" content="BD" />
//         <meta name="geo.placename" content="Dhaka" />
//         <meta name="geo.position" content="23.8103;90.4125" />
//         <meta name="ICBM" content="23.8103, 90.4125" />
        
//         {/* Business Meta Tags */}
//         <meta name="business:contact_data:country_name" content="Bangladesh" />
//         <meta name="business:contact_data:website" content={process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'} />
//         <meta name="business:contact_data:email" content="support@beautybucket.com" />
        
//         {/* Beauty E-commerce Meta Tags */}
//         <meta name="og:availability" content="in stock" />
//         <meta name="product:retailer_item_id" content="global" />
//         <meta name="shopping:price_currency" content="BDT" />
//         <meta name="shopping:authorized_seller" content="true" />
//         <meta name="shopping:return_policy" content="7 days return" />
//         <meta name="shopping:authenticity" content="100% authentic products" />
//         <meta name="beauty:categories" content="Skincare, Makeup, Fragrances, Hair Care, Body Care" />
//         <meta name="beauty:brands" content="Estée Lauder, L'Oréal, MAC, NARS, Clinique, Kiehl's, The Ordinary" />
        
//         {/* Favicon & App Icons */}
//         <link rel="icon" href="/favicon.ico" sizes="any" />
//         <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
//         <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
//         <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
//         <link rel="manifest" href="/site.webmanifest" />
        
//         {/* Theme Color - Beauty Bucket Brand Color (Pink) */}
//         <meta name="theme-color" content="#EE4275" />
//         <meta name="msapplication-TileColor" content="#EE4275" />
        
//         {/* Structured Data JSON-LD */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//         />
        
//         {/* Preconnect for Performance */}
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
//         {/* Google Fonts - Playfair Display + Courgette for Beauty Brand */}
//         {/* <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700;800;900&family=Courgette&display=swap" rel="stylesheet" /> */}
//         <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700;800;900&family=Courgette&display=swap&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900" rel="stylesheet" />
        
//         {/* Canonical URL */}
//         <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'} />
        
//         {/* Alternate Language Versions */}
//         <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/en`} />
//         <link rel="alternate" hrefLang="bn" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'}/bn`} />
//         <link rel="alternate" hrefLang="x-default" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'} />
        
//         {/* CSS Variables for Beauty Bucket Theme - Pink + Rose + Blush */}
//         <style>{`
//           :root {
//             color-scheme: light only;
//             --primary-color: #EE4275;
//             --secondary-color: #FF6B9D;
//             --accent-color: #FF8FAB;
//             --beauty-pink: #EE4275;
//             --beauty-rose: #FF6B9D;
//             --beauty-blush: #FFD2DB;
//             --beauty-dark: #2D1B2E;
//             --beauty-light: #FFF5F6;
//             --beauty-gold: #FFD700;
//             --beauty-gradient: linear-gradient(135deg, #EE4275, #FF6B9D);
//           }
//         `}</style>
//       </head>
//       <body 
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//         suppressHydrationWarning
//       >
//         <div className="h-16"></div>
//         {children}

//         <PixelTracker />
//         <CustomCodeInjector />
        
//         {/* Toast Notifications */}
//         <Toaster 
//           position="top-right"
//           richColors
//           closeButton
//           expand={true}
//           duration={4000}
//           theme="light"
//           toastOptions={{
//             style: {
//               background: '#FFFFFF',
//               color: '#333333',
//               border: '1px solid #EE4275',
//               borderRadius: '12px',
//               marginTop: '40px',
//             },
//           }}
//         />
        
//         {/* UI Components */}
//         <ScrollToTop />
//          {/* <ChatWrapper /> */}

//         {/* Optional Popup Components - Uncomment when ready */}
//         {/* <PromotionalModalWrapper /> */}
//         {/* <NewsletterPopup /> */}
//         {/* <UnifiedPopupManager /> */}
//       </body>
//     </html>
//   );
// }


// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import dynamic from 'next/dynamic'; 

import ScrollToTop from "./components/layout/ScrollToTop";
import PromotionalModalWrapper from "./components/PromotionalModalWrapper";
import NewsletterPopup from "./components/NewsletterPopup";
import UnifiedPopupManager from "./components/UnifiedPopupManager";
import PixelTracker from "./components/PixelTracker";
import CustomCodeInjector from "./components/CustomCodeInjector";

import ChatWrapper from "./components/ChatWrapper"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// ============================================

export const metadata = {
  // Base metadata
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'),
  title: {
    default: "Nishita's Creation | ব্লকপ্রিন্ট, এপ্লিক, যশোরের হাতের কাজের পণ্য - BlockPrint, Batik & Deshi Products Bangladesh",
    template: "%s | Nishita's Creation Bangladesh"
  },
  description: "Nishita's Creation - ব্লকপ্রিন্ট, এপ্লিক, যশোরের হাতের কাজের পণ্য। নিজস্ব কারখানা ও দক্ষ কারিগর দিয়ে তৈরি প্রতিটি পণ্য। Shop authentic Batik, Block Printed & Applique Saree, Three Piece, Bedsheet, Panjabi, Kurti & Deshi Textiles. ✓COD ✓bKash/Nagad ✓100% Original",
  
  // Keywords optimized for Bangladesh batik, block print & applique market
  keywords: [
    // Primary keywords
    "nishitas creation",
    "block print bangladesh",
    "applique bangladesh",
    "jashore handicraft",
    "batik products bangladesh",
    "deshi products bangladesh",
    "ব্লকপ্রিন্ট",
    "এপ্লিক",
    "যশোরের হাতের কাজ",
    
    // Batik
    "batik saree bangladesh",
    "batik three piece bd",
    "batik kurti bangladesh",
    "batik print saree bd",
    "batik bedsheet bangladesh",
    "batik panjabi bd",
    "handmade batik saree bangladesh",
    "batik dupatta bd",
    "batik dress bangladesh",
    "batik salwar kameez bd",
    
    // Block Print
    "block print saree bangladesh",
    "block printed three piece bd",
    "block print kurti bangladesh",
    "block print bedsheet bd",
    "hand block print saree bangladesh",
    "block print panjabi bd",
    "block print dupatta bangladesh",
    "block printed dress bd",
    "block print salwar kameez bd",
    "traditional block print saree bd",
    
    // Applique
    "applique saree bangladesh",
    "applique three piece bd",
    "applique kurti bangladesh",
    "applique bedsheet bd",
    "applique cushion bangladesh",
    "handmade applique bd",
    "traditional applique bangladesh",
    "applique work saree bd",
    
    // Jashore Handicrafts
    "jashore hand made saree",
    "jessore block print bd",
    "jashore applique work",
    "khulna batik saree",
    "jashore deshi products",
    "jessore traditional crafts",
    
    // Deshi Products
    "deshi saree bangladesh",
    "deshi three piece bd",
    "deshi dress bangladesh",
    "deshi panjabi bd",
    "deshi kurti bangladesh",
    "traditional deshi products bd",
    "bangladeshi traditional dress",
    
    // Saree
    "saree price bangladesh",
    "batik saree online bd",
    "block print saree price bd",
    "cotton saree bangladesh",
    "handloom saree bd",
    "designer saree bangladesh",
    
    // Three Piece & Salwar Kameez
    "three piece price bangladesh",
    "batik three piece bd",
    "block print three piece bangladesh",
    "salwar kameez bd",
    "unstitched three piece bangladesh",
    
    // Panjabi & Men's Wear
    "panjabi price bangladesh",
    "batik panjabi bd",
    "block print panjabi bangladesh",
    "cotton panjabi bd",
    "eid panjabi bangladesh",
    
    // Kurti & Women's Wear
    "kurti price bangladesh",
    "batik kurti bd",
    "block print kurti bangladesh",
    "cotton kurti bd",
    "deshi kurti bangladesh",
    
    // Bedsheet & Home Textile
    "bedsheet price bangladesh",
    "batik bedsheet bd",
    "block print bedsheet bangladesh",
    "cotton bedsheet bd",
    "deshi bedsheet bangladesh",
    
    // Shopping intent
    "buy batik online bangladesh",
    "buy block print saree bd",
    "deshi products online bangladesh",
    "authentic batik bangladesh",
    "batik shop bd",
    "block print shop bangladesh",
    
    // Payment & Delivery
    "cod deshi products bangladesh",
    "bkash payment batik bd",
    "nagad deshi store",
    "free delivery batik dhaka",
    
    // Cultural & Traditional
    "bangladeshi traditional textile",
    "bengali batik craft",
    "deshi fashion bangladesh",
    "traditional bengali dress bd",
    "heritage textile bangladesh",
    "artisan made deshi products",
    "eid collection bangladesh",
    "puja collection bd",
    "wedding saree bangladesh"
  ],
  
  authors: [{ name: "Nishita's Creation", url: "https://nishitascreation.com" }],
  creator: "Nishita's Creation",
  publisher: "Nishita's Creation Bangladesh",
  
  // Robots configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Canonical URL
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en',
      'bn-BD': '/bn',
    },
  },
  
  // Open Graph for social sharing (Facebook, WhatsApp, LinkedIn)
  openGraph: {
    title: "Nishita's Creation - ব্লকপ্রিন্ট, এপ্লিক, যশোরের হাতের কাজের পণ্য | Batik & Deshi Products Bangladesh",
    description: "✓COD Available ✓bKash/Nagad ✓100% Original ✓Own Factory. Shop authentic Batik, Block Printed & Applique Saree, Three Piece, Bedsheet, Panjabi & Kurti. Crafted by skilled artisans of Jashore, Bangladesh.",
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com',
    siteName: "Nishita's Creation",
    images: [
      {
        url: '/og-image-nishitas-creation.jpg',
        width: 1200,
        height: 630,
        alt: "Nishita's Creation - ব্লকপ্রিন্ট, এপ্লিক, যশোরের হাতের কাজের পণ্য | Batik & Block Printed Products Bangladesh",
      },
    ],
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
    type: 'website',
    emails: ['support@nishitascreation.com'],
    phoneNumbers: ['+880123456789'],
    countryName: 'Bangladesh',
  },
  
  // Twitter Card optimization
  twitter: {
    card: 'summary_large_image',
    site: '@NishitasCreation',
    siteId: 'nishitascreation_bd',
    creator: '@NishitasCreation',
    creatorId: 'nishitascreation',
    title: "Nishita's Creation - ব্লকপ্রিন্ট, এপ্লিক, যশোরের হাতের কাজের পণ্য",
    description: "Bangladesh's trusted store for authentic Batik, Block Printed & Applique Saree, Three Piece, Bedsheet, Panjabi. COD & bKash/Nagad available. 100% original deshi products.",
    images: ['/twitter-card-nishitas-creation.jpg'],
  },
  
  // Verification (add your actual verification codes)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_VERIFICATION || '',
    me: 'nishitascreation@contact',
  },
  
  // Additional metadata
  category: "Traditional Bangladeshi Textiles & Deshi Products E-commerce",
  classification: "Batik | Block Print | Applique | Deshi Products Bangladesh | Jashore Handicrafts",
  
  // App links for mobile
  appleWebApp: {
    title: "Nishita's Creation",
    statusBarStyle: "default",
    capable: true,
  },
  
  // Format detection
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  
  // Theme & Viewport - Nishita's Creation brand colors (Cream + Deep Green)
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F1EFE3" },
    { media: "(prefers-color-scheme: dark)", color: "#29362f" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  
  // Manifest for PWA
  manifest: "/manifest.json",
  
  // Other important SEO tags
  other: {
    'geo.region': 'BD',
    'geo.placename': 'Jashore',
    'geo.position': '23.1667;89.2167',
    'ICBM': '23.1667, 89.2167',
    'copyright': `Nishita's Creation ${new Date().getFullYear()}`,
    'distribution': 'global',
    'rating': 'General',
    'revisit-after': '1 day',
    'language': 'English, Bengali',
    'audience': 'Deshi Product Lovers, Batik Enthusiasts, Block Print & Applique Shoppers in Bangladesh',
    'target_country': 'Bangladesh',
    'price_range': '300-15000 BDT',
    'currency': 'BDT',
    'delivery': 'Cash on Delivery, Free Delivery over 3000 BDT',
    'payment_methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'warranty': '100% Original Deshi Products Guaranteed',
  },
};

// Structured Data for better SEO (JSON-LD)
export const generateJsonLd = () => {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'}/#organization`,
        name: "Nishita's Creation Bangladesh",
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com',
        logo: 'https://nishitascreation.com/logo.png',
        sameAs: [
          'https://facebook.com/nishitascreationbd',
          'https://instagram.com/nishitascreation.bd',
          'https://twitter.com/NishitasCreation',
          'https://pinterest.com/nishitascreationbd',
          'https://youtube.com/nishitascreationbd',
        ],
        description: 'Authentic Batik, Block Print & Applique deshi products from Jashore, Bangladesh. Own factory with skilled artisans crafting each product with love.',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'BD',
          addressLocality: 'Jashore',
          addressRegion: 'Khulna',
          postalCode: '7400',
          streetAddress: 'Jashore Sadar',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+880123456789',
          contactType: 'customer service',
          availableLanguage: ['English', 'Bengali'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '10:00',
            closes: '22:00',
          },
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'}/#website`,
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com',
        name: "Nishita's Creation - ব্লকপ্রিন্ট, এপ্লিক, যশোরের হাতের কাজের পণ্য",
        description: 'Best online store for Batik, Block Print & Applique deshi products in Bangladesh. Shop authentic saree, three piece, bedsheet, panjabi & kurti.',
        publisher: { '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
        inLanguage: ['en', 'bn'],
      },
      {
        '@type': 'Store',
        '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'}/#store`,
        name: "Nishita's Creation Online Store",
        url: process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com',
        image: 'https://nishitascreation.com/store-image.jpg',
        priceRange: '৳300 - ৳15000',
        currenciesAccepted: 'BDT',
        paymentAccepted: 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
        openingHours: 'Mo-Su 10:00-22:00',
        telephone: '+880123456789',
        email: 'support@nishitascreation.com',
        description: 'Authentic Batik, Block Print & Applique deshi products from Jashore, Bangladesh.',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'BD',
          addressLocality: 'Jashore',
        },
        // Product-specific schema
        product: {
          '@type': 'Product',
          name: 'Batik, Block Print & Applique Deshi Products',
          description: 'Authentic Batik, Block Print & Applique Saree, Three Piece, Bedsheet, Panjabi, Kurti & traditional deshi textiles from Jashore',
          brand: {
            '@type': 'Brand',
            name: "Nishita's Creation",
          },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'BDT',
            availability: 'https://schema.org/InStock',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: '300',
              maxPrice: '15000',
              priceCurrency: 'BDT',
            },
          },
        },
      },
      // Add ItemList for product categories
      {
        '@type': 'ItemList',
        name: 'Product Categories',
        description: 'Browse our wide collection of Batik, Block Print & Applique deshi products',
        numberOfItems: 8,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Batik Saree',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'}/category/batik-saree`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Block Print Saree',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'}/category/block-print-saree`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Applique Work',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'}/category/applique-work`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: 'Three Piece',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'}/category/three-piece`,
          },
          {
            '@type': 'ListItem',
            position: 5,
            name: 'Panjabi',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'}/category/panjabi`,
          },
          {
            '@type': 'ListItem',
            position: 6,
            name: 'Kurti',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'}/category/kurti`,
          },
          {
            '@type': 'ListItem',
            position: 7,
            name: 'Bedsheet',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'}/category/bedsheet`,
          },
          {
            '@type': 'ListItem',
            position: 8,
            name: 'Deshi Collection',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'}/category/deshi-collection`,
          },
        ],
      },
      // BreadcrumbList for navigation
      {
        '@type': 'BreadcrumbList',
        name: 'Breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Deshi Products',
            item: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'}/deshi-products`,
          },
        ],
      },
    ],
  };
};

export default function RootLayout({ children }) {
  // Generate JSON-LD structured data
  const jsonLd = generateJsonLd();
  
  return (
    <html 
      lang="en" 
      data-scroll-behavior="smooth" 
      data-theme="light" 
      suppressHydrationWarning
      style={{ colorScheme: 'light' }}
      dir="ltr"
    >
      <head>
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="color-scheme" content="light only" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Nishita's Creation - ব্লকপ্রিন্ট, এপ্লিক, যশোরের হাতের কাজের পণ্য। নিজস্ব কারখানা ও দক্ষ কারিগর দিয়ে তৈরি প্রতিটি পণ্য। Authentic Batik, Block Print & Applique Saree, Three Piece, Bedsheet, Panjabi. ✓COD ✓bKash/Nagad ✓100% Original" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Geo Tags for Jashore, Bangladesh */}
        <meta name="geo.region" content="BD" />
        <meta name="geo.placename" content="Jashore" />
        <meta name="geo.position" content="23.1667;89.2167" />
        <meta name="ICBM" content="23.1667, 89.2167" />
        
        {/* Business Meta Tags */}
        <meta name="business:contact_data:country_name" content="Bangladesh" />
        <meta name="business:contact_data:website" content={process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'} />
        <meta name="business:contact_data:email" content="support@nishitascreation.com" />
        
        {/* E-commerce Meta Tags */}
        <meta name="og:availability" content="in stock" />
        <meta name="product:retailer_item_id" content="global" />
        <meta name="shopping:price_currency" content="BDT" />
        <meta name="shopping:authorized_seller" content="true" />
        <meta name="shopping:return_policy" content="7 days return" />
        <meta name="shopping:authenticity" content="100% original deshi products" />
        <meta name="product:categories" content="Batik Saree, Block Print Saree, Applique Work, Three Piece, Panjabi, Kurti, Bedsheet" />
        <meta name="product:origin" content="Jashore, Bangladesh" />
        <meta name="product:artisan" content="Skilled local artisans from our own factory" />
        <meta name="product:type" content="Batik, Block Print, Applique, Deshi Products" />
        
        {/* Favicon & App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color - Nishita's Creation Brand Color (Cream) */}
        <meta name="theme-color" content="#F1EFE3" />
        <meta name="msapplication-TileColor" content="#29362f" />
        
        {/* Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts - Playfair Display + Inter + Courgette */}
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700;800;900&family=Courgette&display=swap&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900" rel="stylesheet" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'} />
        
        {/* Alternate Language Versions */}
        <link rel="alternate" hrefLang="en" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'}/en`} />
        <link rel="alternate" hrefLang="bn" href={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'}/bn`} />
        <link rel="alternate" hrefLang="x-default" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com'} />
        
        {/* CSS Variables for Nishita's Creation Theme - Cream + Deep Green */}
        <style>{`
          :root {
            color-scheme: light only;
            --primary-color: #29362f;
            --secondary-color: #5a6660;
            --accent-color: #8B9D83;
            --brand-cream: #F1EFE3;
            --brand-dark: #29362f;
            --brand-green: #5a6660;
            --brand-sage: #A8B8A0;
            --brand-deep: #6B7D63;
            --brand-gradient: linear-gradient(135deg, #29362f, #5a6660);
          }
        `}</style>
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <div className="h-16"></div>
        {children}

        <PixelTracker />
        <CustomCodeInjector />
        
        {/* Toast Notifications */}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          expand={true}
          duration={4000}
          theme="light"
          toastOptions={{
            style: {
              background: '#FFFFFF',
              color: '#29362f',
              border: '1px solid #A8B8A0',
              borderRadius: '12px',
              marginTop: '40px',
            },
          }}
        />
        
        {/* UI Components */}
        <ScrollToTop />
         {/* <ChatWrapper /> */}

        {/* Optional Popup Components - Uncomment when ready */}
        {/* <PromotionalModalWrapper /> */}
        {/* <NewsletterPopup /> */}
        {/* <UnifiedPopupManager /> */}
      </body>
    </html>
  );
}