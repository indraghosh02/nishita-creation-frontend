// // app/track/page.js
// import { Suspense } from 'react';
// import TrackClient from './TrackClient';

// // Import for loading state
// import Navbar from '../components/layout/Navbar';
// import Footer from '../components/layout/Footer';

// // Loading fallback component for Track page
// function TrackLoading() {
//   return (
//     <>
//       <Navbar />
//       <div className="min-h-screen bg-[#FFF5F6] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 mx-auto bg-[#EE4275]/20 rounded-full animate-pulse mb-4"></div>
//           <div className="h-6 w-48 bg-[#EE4275]/20 rounded mx-auto animate-pulse"></div>
//           <div className="h-4 w-64 bg-[#EE4275]/20 rounded mx-auto mt-3 animate-pulse"></div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// // Beauty Bucket Track Page SEO Metadata
// export const metadata = {
//   title: "Track Your Orders - Beauty Bucket | Beauty Product Delivery Tracking",
//   description: "Track your skincare, makeup, fragrances, hair care and beauty orders easily with your phone number. Check order status, delivery updates, and tracking information for all your purchases from Beauty Bucket Bangladesh.",
//   keywords: [
//     // Primary tracking keywords
//     "track order bangladesh",
//     "beauty product order tracking",
//     "beauty bucket track",
//     "order status check bd",
//     "track my order",
//     "cosmetics delivery tracking",
//     "beauty delivery status",
//     "online order tracking bd",
    
//     // Delivery tracking
//     "track order by phone",
//     "bangladesh cosmetics delivery",
//     "order tracking system",
//     "delivery status bd",
//     "skincare order tracking",
//     "makeup delivery tracking",
//     "fragrance order status",
//     "hair care tracking bd",
//     "beauty accessories delivery",
//     "cosmetics tracking",
    
//     // Customer support
//     "beauty order help",
//     "tracking support bd",
//     "delivery inquiry bangladesh",
//     "order status support",
//     "cosmetics shipping tracking",
//     "product delivery tracking",
//     "order inquiry beauty",
//     "delivery status cosmetics",
    
//     // Local keywords
//     "track order dhaka",
//     "beauty tracking bangladesh",
//     "order status bangladesh",
//     "beauty bucket delivery",
//     "cosmetics order tracking bd",
//     "premium beauty tracking",
//     "cosmetics order tracking dhaka",
//     "beauty shop delivery status",
    
//     // Product specific tracking
//     "skincare order tracking",
//     "makeup delivery status",
//     "fragrance order tracking",
//     "hair care delivery tracking",
//     "body care order status",
//     "beauty accessories delivery tracking",
//     "cosmetics order status",
//     "beauty product delivery tracking",
    
//     // Customer service
//     "beauty customer support",
//     "cosmetics order inquiry",
//     "beauty accessories tracking",
//     "premium cosmetics support",
//     "authentic beauty tracking",
//     "quality guarantee tracking",
    
//     // Beauty specific
//     "beauty order tracking bangladesh",
//     "cosmetics order status bd",
//     "skincare accessories tracking",
//     "beauty devices tracking",
//     "makeup kit delivery",
//     "beauty tools tracking",
//     "fragrance order status",
    
//     // Courier & Logistics
//     "courier status beauty bd",
//     "delivery partner tracking",
//     "shipment tracking bangladesh",
//     "order dispatch status",
//     "out for delivery tracking",
//     "cod order tracking",
//     "online payment order status",
    
//     // Beauty order types
//     "cosmetics gift delivery",
//     "beauty box tracking",
//     "skincare set delivery",
//     "makeup collection tracking",
//     "fragrance gift order",
//     "beauty haul tracking",
//     "cosmetics subscription tracking"
//   ],
//   openGraph: {
//     title: "Track Your Orders - Beauty Bucket | Beauty Product Order Tracking",
//     description: "Enter your phone number to track all your beauty orders. Get real-time updates on delivery status and order progress from Beauty Bucket Bangladesh.",
//     url: process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://beautybucket.com.bd/track',
//     siteName: "Beauty Bucket",
//     images: [
//       {
//         url: '/track-og-beautybucket.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Track Your Orders - Beauty Bucket Bangladesh',
//       },
//     ],
//     type: 'website',
//     locale: 'en_BD',
//     alternateLocale: ['bn_BD'],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     site: '@BeautyBucketBD',
//     creator: '@BeautyBucketBD',
//     title: "Track Your Orders | Beauty Bucket",
//     description: "Track all your beauty orders with your phone number. Check delivery status and order updates for skincare, makeup, fragrances, hair care and more.",
//     images: ['/track-twitter-beautybucket.jpg'],
//   },
//   alternates: {
//     canonical: '/track',
//     languages: {
//       'en': '/track',
//       'bn': '/bn/track',
//     },
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-snippet': -1,
//       'max-image-preview': 'large',
//       'max-video-preview': -1,
//     },
//   },
//   // Additional metadata
//   other: {
//     'application-name': 'Beauty Bucket Track',
//     'msapplication-TileColor': '#EE4275',
//     'theme-color': '#EE4275',
//     'page-type': 'order-tracking',
//     'user-action': 'track-orders',
//     'service-type': 'order-tracking',
//     'product-category': 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Beauty Accessories, Natural Beauty, K-Beauty',
    
//     // Tracking service info
//     'tracking-method': 'Phone Number',
//     'tracking-status': 'Real-time Updates',
//     'order-history': 'Available',
//     'delivery-updates': 'Live Tracking',
//     'tracking-accuracy': 'High Precision',
    
//     // Support information
//     'customer-support-phone': '+880123456789',
//     'customer-support-email': 'support@beautybucket.com',
//     'support-hours': '10:00 AM - 10:00 PM (Everyday)',
//     'beauty-consultant': 'Available via Support',
//     'live-chat': 'Available',
    
//     // Business info
//     'business-name': 'Beauty Bucket Bangladesh',
//     'business-type': 'E-commerce Beauty & Cosmetics Store',
//     'service-area': 'Nationwide Delivery',
//     'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
//     'established': '2024',
    
//     // Delivery info
//     'delivery-time': '1-3 Business Days',
//     'free-delivery': 'Orders over 3000 BDT',
//     'cod-charge': 'Free for all orders',
//     'delivery-partners': 'Multiple Delivery Partners',
//     'same-day-delivery': 'Available in Dhaka',
//     'express-delivery': 'Available',
    
//     // Product guarantees
//     'authenticity-guarantee': '100% Genuine Beauty Products',
//     'quality-check': 'Pre-shipment Quality Check',
//     'quality-guarantee': '100% Authentic Products Guaranteed',
//     'satisfaction-guarantee': 'Money Back Guarantee',
//     'return-policy': '7 Days Return Policy',
    
//     // Beauty product specs
//     'brands-available': 'L\'Oréal, Maybelline, NYX, MAC, Estée Lauder, Clinique, Kiehl\'s, The Ordinary, Cosrx, Innisfree, Laneige, Nivea, Pond\'s, Garnier, Vaseline',
//     'skin-types': 'All Skin Types, Dry Skin, Oily Skin, Combination Skin, Sensitive Skin, Acne-Prone Skin, Mature Skin',
//     'ingredients': 'Vitamin C, Hyaluronic Acid, Retinol, Niacinamide, Salicylic Acid, Glycolic Acid, Ceramides, Peptides, Squalane, Rosehip Oil, Shea Butter, Aloe Vera',
//     'beauty-concerns': 'Acne, Aging, Hyperpigmentation, Dryness, Dullness, Fine Lines, Wrinkles, Dark Spots, Uneven Skin Tone',
//     'ethical-features': 'Cruelty Free Options, Vegan Options, Eco-Friendly Packaging Options',
//     'safety-features': 'Dermatologically Tested, Hypoallergenic, Non-Comedogenic, Fragrance Free (Options Available), Paraben Free (Options Available)',
    
//     // Beauty product details
//     'shades-available': 'Fair to Deep Skin Tones',
//     'texture-types': 'Cream, Gel, Serum, Oil, Balm, Powder, Liquid, Stick',
//     'formulation-types': 'Water-based, Oil-based, Silicone-based, Hybrid',
//     'finish-types': 'Matte, Dewy, Satin, Natural, Glow, Shimmer, Metallic',
//     'coverage-levels': 'Sheer, Light, Medium, Full, Buildable',
//     'skin-benefits': 'Hydrating, Brightening, Anti-Aging, Soothing, Calming, Firming, Plumping',
//   },
// };

// // Generate JSON-LD structured data
// export const generateJsonLd = () => {
//   return {
//     '@context': 'https://schema.org',
//     '@type': 'WebPage',
//     '@id': process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://beautybucket.com.bd/track',
//     name: 'Track Your Orders - Beauty Bucket',
//     description: 'Track your beauty orders easily with your phone number. Check order status, delivery updates, and tracking information for skincare, makeup, fragrances, hair care, and more.',
//     url: process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://beautybucket.com.bd/track',
//     inLanguage: 'en',
//     about: {
//       '@type': 'Thing',
//       name: 'Beauty Order Tracking',
//       description: 'Track beauty products, cosmetics, skincare, makeup, and accessories orders'
//     },
//     breadcrumb: {
//       '@type': 'BreadcrumbList',
//       itemListElement: [
//         {
//           '@type': 'ListItem',
//           position: 1,
//           name: 'Home',
//           item: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'
//         },
//         {
//           '@type': 'ListItem',
//           position: 2,
//           name: 'Track Orders',
//           item: process.env.NEXT_PUBLIC_BASE_URL + '/track' || 'https://beautybucket.com.bd/track'
//         }
//       ]
//     },
//     mainEntity: {
//       '@type': 'WebApplication',
//       name: 'Beauty Bucket Order Tracking System',
//       description: 'Track beauty products, cosmetics, skincare, and makeup orders by phone number',
//       applicationCategory: 'BusinessApplication',
//       operatingSystem: 'All',
//       browserRequirements: 'Requires modern browser',
//       offers: {
//         '@type': 'Offer',
//         description: 'Order tracking service for beauty and cosmetics purchases',
//         category: 'E-commerce Tracking',
//         availability: 'https://schema.org/InStock',
//         price: '0',
//         priceCurrency: 'BDT'
//       }
//     }
//   };
// };

// // Server component with Suspense
// export default function TrackPage() {
//   // Generate JSON-LD
//   const jsonLd = generateJsonLd();
  
//   return (
//     <>
//       {/* JSON-LD Structured Data */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />
//       <Suspense fallback={<TrackLoading />}>
//         <TrackClient />
//       </Suspense>
//     </>
//   );
// }

// app/track/page.js
import { Suspense } from 'react';
import TrackClient from './TrackClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Track page - Nishita's Creation themed
function TrackLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#29362f]/15 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-[#29362f]/20 rounded mx-auto animate-pulse"></div>
          <div className="h-4 w-64 bg-[#5a6660]/20 rounded mx-auto mt-3 animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Nishita's Creation - Track Page SEO Metadata
export const metadata = {
  title: "Track Your Orders - Nishita's Creation | Handicraft Product Delivery Tracking",
  description: "Track your Batik, Block Print, Applique, Saree, Three Piece, Panjabi & Kurti orders easily with your phone number. Check order status, delivery updates, and tracking information for all your purchases from Nishita's Creation Bangladesh.",
  keywords: [
    // Primary tracking keywords
    "track order bangladesh",
    "handicraft product order tracking",
    "nishitas creation track",
    "order status check bd",
    "track my order",
    "batik delivery tracking",
    "handicraft delivery status",
    "online order tracking bd",
    
    // Delivery tracking
    "track order by phone",
    "bangladesh handicraft delivery",
    "order tracking system",
    "delivery status bd",
    "batik order tracking",
    "block print delivery tracking",
    "applique order status",
    "saree tracking bd",
    "handicraft accessories delivery",
    "deshi products tracking",
    
    // Customer support
    "handicraft order help",
    "tracking support bd",
    "delivery inquiry bangladesh",
    "order status support",
    "batik shipping tracking",
    "product delivery tracking",
    "order inquiry handicraft",
    "delivery status handicraft",
    
    // Local keywords
    "track order jashore",
    "handicraft tracking bangladesh",
    "order status bangladesh",
    "nishitas creation delivery",
    "batik order tracking bd",
    "traditional handicraft tracking",
    "handicraft order tracking jashore",
    "deshi shop delivery status",
    
    // Product specific tracking
    "batik order tracking",
    "block print delivery status",
    "applique order tracking",
    "saree delivery tracking",
    "three piece order status",
    "panjabi delivery tracking",
    "kurti order status",
    "bedsheet delivery tracking",
    
    // Customer service
    "handicraft customer support",
    "batik order inquiry",
    "deshi products tracking",
    "traditional handicraft support",
    "authentic batik tracking",
    "quality guarantee tracking",
    
    // Craft specific
    "batik order tracking bangladesh",
    "block print order status bd",
    "applique tracking",
    "handicraft delivery",
    "saree kit delivery",
    "handicraft tracking",
    "batik order status",
    
    // Courier & Logistics
    "courier status handicraft bd",
    "delivery partner tracking",
    "shipment tracking bangladesh",
    "order dispatch status",
    "out for delivery tracking",
    "cod order tracking",
    "online payment order status",
    
    // Order types
    "batik gift delivery",
    "handicraft box tracking",
    "batik set delivery",
    "block print collection tracking",
    "applique gift order",
    "handicraft haul tracking",
    "deshi products subscription tracking"
  ],
  openGraph: {
    title: "Track Your Orders - Nishita's Creation | Handicraft Product Order Tracking",
    description: "Enter your phone number to track all your handicraft orders. Get real-time updates on delivery status and order progress from Nishita's Creation Bangladesh.",
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com') + '/track',
    siteName: "Nishita's Creation",
    images: [
      {
        url: '/track-og-nishitas-creation.jpg',
        width: 1200,
        height: 630,
        alt: "Track Your Orders - Nishita's Creation Bangladesh",
      },
    ],
    type: 'website',
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@NishitasCreation',
    creator: '@NishitasCreation',
    title: "Track Your Orders | Nishita's Creation",
    description: "Track all your handicraft orders with your phone number. Check delivery status and order updates for Batik, Block Print, Applique, Saree, Three Piece and more.",
    images: ['/track-twitter-nishitas-creation.jpg'],
  },
  alternates: {
    canonical: '/track',
    languages: {
      'en': '/track',
      'bn': '/bn/track',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  // Additional metadata
  other: {
    'application-name': "Nishita's Creation Track",
    'msapplication-TileColor': '#29362f',
    'theme-color': '#29362f',
    'page-type': 'order-tracking',
    'user-action': 'track-orders',
    'service-type': 'order-tracking',
    'product-category': 'Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet, Dupatta, Deshi Collection',
    
    // Tracking service info
    'tracking-method': 'Phone Number',
    'tracking-status': 'Real-time Updates',
    'order-history': 'Available',
    'delivery-updates': 'Live Tracking',
    'tracking-accuracy': 'High Precision',
    
    // Support information
    'customer-support-phone': '+880123456789',
    'customer-support-email': 'support@nishitascreation.com',
    'support-hours': '10:00 AM - 10:00 PM (Everyday)',
    'craft-consultant': 'Available via Support',
    'live-chat': 'Available',
    
    // Business info
    'business-name': "Nishita's Creation Bangladesh",
    'business-type': 'E-commerce Handicraft & Deshi Products Store',
    'service-area': 'Nationwide Delivery',
    'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'established': '2024',
    
    // Delivery info
    'delivery-time': '1-3 Business Days',
    'free-delivery': 'Orders over 3000 BDT',
    'cod-charge': 'Free for all orders',
    'delivery-partners': 'Multiple Delivery Partners',
    'same-day-delivery': 'Available in Dhaka',
    'express-delivery': 'Available',
    
    // Product guarantees
    'authenticity-guarantee': '100% Original Handmade Products',
    'quality-check': 'Pre-shipment Quality Check',
    'quality-guarantee': '100% Original Handmade Products Guaranteed',
    'satisfaction-guarantee': 'Money Back Guarantee',
    'return-policy': '7 Days Return Policy',
    
    // Craft product specs
    'craft-techniques': 'Hand Block Print, Batik Print, Applique Work, Hand Embroidery',
    'fabric-types': 'Cotton, Handloom Cotton, Soft Cotton, Muslin, Khadi',
    'origin': 'Jashore, Khulna, Bangladesh',
    'artisan-info': 'Made by skilled local artisans in our own factory',
    'care-instructions': 'Hand Wash Recommended, Do Not Bleach, Dry in Shade',
    'color-options': 'Traditional, Natural, Earthy, Vibrant, Pastel Tones',
    'occasion': 'Daily Wear, Eid, Puja, Wedding, Casual, Party, Office',
    
    // Product details
    'size-options': 'Free Size, Unstitched, Custom Fit Available',
    'fabric-care': 'Hand Wash, Do Not Bleach, Dry in Shade',
    'special-features': 'Own Factory, Skilled Artisans, Traditional Craft, Handmade, Authentic Deshi Products',
    'craft-benefits': 'Authentic, Handmade, Traditional, Skin-Friendly, Breathable Fabrics',
  },
};

// Generate JSON-LD structured data
export const generateJsonLd = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/track`,
    name: "Track Your Orders - Nishita's Creation",
    description: "Track your handicraft orders easily with your phone number. Check order status, delivery updates, and tracking information for Batik, Block Print, Applique, Saree, Three Piece, and more.",
    url: `${BASE_URL}/track`,
    inLanguage: 'en',
    about: {
      '@type': 'Thing',
      name: 'Handicraft Order Tracking',
      description: 'Track Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, and traditional Bangladeshi handicraft orders'
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: BASE_URL
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Track Orders',
          item: `${BASE_URL}/track`
        }
      ]
    },
    mainEntity: {
      '@type': 'WebApplication',
      name: "Nishita's Creation Order Tracking System",
      description: 'Track handicraft products, Batik, Block Print, and Applique orders by phone number',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires modern browser',
      offers: {
        '@type': 'Offer',
        description: 'Order tracking service for handicraft and deshi product purchases',
        category: 'E-commerce Tracking',
        availability: 'https://schema.org/InStock',
        price: '0',
        priceCurrency: 'BDT'
      }
    }
  };
};

// Server component with Suspense
export default function TrackPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<TrackLoading />}>
        <TrackClient />
      </Suspense>
    </>
  );
}