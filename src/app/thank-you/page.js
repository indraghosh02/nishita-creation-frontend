// app/thank-you/page.js
import { Suspense } from 'react';
import ThankYouClient from './ThankYouClient';

// Import Navbar and Footer for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component - Nishita's Creation themed
function ThankYouLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f7f4ef] pt-20 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#29362f] border-t-transparent rounded-full animate-spin"></div>
      </div>
      <Footer />
    </>
  );
}

// Nishita's Creation - Thank You Page SEO Metadata
export const metadata = {
  title: "Thank You | Order Placed - Nishita's Creation",
  description: "Thank you for your order at Nishita's Creation. Your authentic Batik, Block Print & Applique products are being prepared with care. We'll contact you shortly to confirm delivery.",
  keywords: [
    // Order confirmation
    "thank you nishitas creation",
    "order confirmed handicraft bd",
    "batik order confirmation",
    "block print order success",
    "handicraft order placed",
    "deshi products order confirmed",
    
    // Post-purchase
    "order success batik bd",
    "thank you handicraft order",
    "order confirmation block print",
    "handicraft purchase confirmed",
    "deshi order success bangladesh",
    
    // Delivery & tracking
    "batik order tracking bd",
    "handicraft delivery confirmation",
    "block print order status",
    "deshi products delivery bd",
    "handicraft shipment tracking",
    
    // Customer support
    "nishitas creation support",
    "handicraft order help",
    "batik order inquiry",
    "block print customer care",
    "handicraft order assistance"
  ],
  openGraph: {
    title: "Thank You - Order Confirmed | Nishita's Creation Bangladesh",
    description: "Thank you for your order! Your authentic Batik, Block Print & Applique products from Nishita's Creation are being prepared with care. We'll contact you soon.",
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com') + '/thank-you',
    siteName: "Nishita's Creation",
    images: [
      {
        url: '/thank-you-og-nishitas-creation.jpg',
        width: 1200,
        height: 630,
        alt: "Thank You - Order Confirmed | Nishita's Creation Handicraft Products Bangladesh",
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
    title: "Thank You | Order Confirmed - Nishita's Creation",
    description: "Your order has been confirmed. Thank you for shopping authentic Batik, Block Print & Applique products from Nishita's Creation.",
    images: ['/thank-you-twitter-nishitas-creation.jpg'],
  },
  alternates: {
    canonical: '/thank-you',
    languages: {
      'en': '/thank-you',
      'bn': '/bn/thank-you',
    },
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
  // Additional metadata
  other: {
    'application-name': "Nishita's Creation Thank You",
    'msapplication-TileColor': '#29362f',
    'theme-color': '#29362f',
    'page-type': 'order-confirmation',
    'page-purpose': 'thank-you',
    'no-index': 'true',
  },
};

// Server component with Suspense
export default function ThankYouPage() {
  return (
    <Suspense fallback={<ThankYouLoading />}>
      <ThankYouClient />
    </Suspense>
  );
}