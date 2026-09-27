// app/wishlist/page.js
import { Suspense } from 'react';
import WishlistClient from './WishlistClient';

// Loading fallback component for Wishlist page - Nishita's Creation themed
function WishlistLoading() {
  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      <Navbar />
      <div className="container mx-auto px-4 max-w-7xl pt-24 py-8">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[#29362f] animate-spin" />
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Import Navbar and Footer for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Loader2 } from 'lucide-react';

// Nishita's Creation Wishlist SEO Metadata
export const metadata = {
  title: "My Wishlist | Save Your Favorite Batik, Block Print & Handicraft Attires",
  description: "View and manage your saved handicraft products on Nishita's Creation wishlist. Save Batik sarees, Block Print three piece, Applique items, Panjabi, Kurti & deshi products for later purchase. Easy checkout when you're ready!",
  keywords: [
    // Wishlist specific
    "handicraft wishlist bangladesh",
    "saved batik list",
    "favorite handicraft bd",
    "nishitas creation wishlist",
    "my handicraft collection",
    
    // Shopping intent
    "save batik for later",
    "wishlist gift ideas handicraft",
    "deshi product favorites",
    "wedding gift wishlist",
    "handicraft shopping list bd",
    
    // Product categories for wishlist
    "batik saree wishlist",
    "block print saved list",
    "applique wishlist bd",
    "three piece save",
    "panjabi favorites",
    "kurti wishlist bd",
    "bedsheet saved list",
    "deshi dress wishlist",
    
    // User intent
    "save items for later purchase",
    "handicraft gift registry",
    "eid shopping list",
    "puja gift list",
    "wedding shopping list bd",
    "online handicraft store favorites",
    
    // Occasions
    "eid collection wishlist bd",
    "puja collection saved bangladesh",
    "wedding collection batik bd",
    "daily wear deshi dress wishlist",
    
    // Jashore/Khulna Region
    "jashore batik wishlist bangladesh",
    "jessore block print saved bd",
    "khulna handicraft wishlist",
    
    // Payment & Delivery
    "cod handicraft wishlist bangladesh",
    "bkash payment batik wishlist",
    "nagad deshi store wishlist",
    "free delivery handicraft dhaka"
  ],
  openGraph: {
    title: "My Wishlist - Nishita's Creation | Save Your Favorite Handicraft Products",
    description: "Your personal wishlist of favorite handicraft products from Nishita's Creation Bangladesh. Save Batik sarees, Block Print three piece, Applique items, Panjabi, Kurti & more. Easy checkout when you're ready to buy!",
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com') + '/wishlist',
    siteName: "Nishita's Creation",
    images: [
      {
        url: '/wishlist-og-nishitas-creation.jpg',
        width: 1200,
        height: 630,
        alt: "Nishita's Creation Wishlist - Save Your Favorite Batik, Block Print & Handicraft Products",
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
    title: "My Wishlist | Nishita's Creation Bangladesh",
    description: "Save and manage your favorite Batik, Block Print & Applique products. Perfect for gift planning and shopping later!",
    images: ['/wishlist-twitter-nishitas-creation.jpg'],
  },
  alternates: {
    canonical: '/wishlist',
    languages: {
      'en': '/wishlist',
      'bn': '/bn/wishlist',
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
  // Additional metadata for better SEO
  other: {
    'application-name': "Nishita's Creation Wishlist",
    'msapplication-TileColor': '#29362f',
    'theme-color': '#29362f',
    'page-type': 'user-wishlist',
    'user-action': 'save-favorites',
    'product-categories': 'Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet, Dupatta, Deshi Collection',
    'craft-techniques': 'Hand Block Print, Batik Print, Applique Work, Hand Embroidery',
    'fabric-types': 'Cotton, Handloom Cotton, Soft Cotton, Muslin, Khadi',
    'origin': 'Jashore, Khulna, Bangladesh',
    'artisan-info': 'Made by skilled local artisans in our own factory',
    'occasion': 'Daily Wear, Eid, Puja, Wedding, Casual, Party, Office',
    'wishlist-features': 'Save for Later, Easy Checkout, Gift Planning, Price Tracking',
    'customer-support': 'support@nishitascreation.com',
    'support-hours': '10:00 AM - 10:00 PM (Everyday)',
    'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'special-features': 'Own Factory, Skilled Artisans, Traditional Craft, Handmade, Authentic Deshi Products',
  },
};

// Server component with Suspense
export default function WishlistPage() {
  return (
    <Suspense fallback={<WishlistLoading />}>
      <WishlistClient />
    </Suspense>
  );
}