// app/collections/page.js
import { Suspense } from 'react';
import CollectionsClient from './CollectionsClient';

// Loading fallback component for Collections page - Nishita's Creation themed
function CollectionsLoading() {
  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      <div className="container mx-auto px-4 max-w-7xl py-12">
        {/* Hero skeleton */}
        <div className="mx-auto max-w-[900px] text-center mb-12">
          <div className="mx-auto h-3 w-40 animate-pulse rounded bg-[#29362f]/15 mb-4" />
          <div className="mx-auto h-14 w-72 animate-pulse rounded bg-[#29362f]/20 mb-4" />
          <div className="mx-auto h-4 w-96 animate-pulse rounded bg-[#5a6660]/20" />
        </div>

        {/* Collections grid skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-[16px] ring-1 ring-black/5 overflow-hidden animate-pulse shadow-sm"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-[#f7f4ef] to-[#A8B8A0]/30" />
              <div className="p-5">
                <div className="h-4 bg-[#29362f]/20 rounded mb-2 w-3/4" />
                <div className="h-3 bg-[#5a6660]/20 rounded mb-3 w-full" />
                <div className="h-8 bg-[#29362f]/15 rounded-full w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Nishita's Creation - Collections Page SEO Metadata
export const metadata = {
  title: "Our Collections | Batik, Block Print & Applique - Nishita's Creation Bangladesh",
  description: "Browse our curated collections of authentic Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet & deshi products. Handmade with love by skilled artisans from Jashore, Bangladesh. ✓COD ✓bKash/Nagad ✓100% Original",
  keywords: [
    // Primary collection keywords
    "nishitas creation collections",
    "batik collection bangladesh",
    "block print collection bd",
    "applique collection bangladesh",
    "handicraft collections bd",
    "deshi products collection",
    "traditional crafts collection bangladesh",
    "jashore handicraft collection",
    
    // Batik collection
    "batik saree collection bangladesh",
    "batik three piece collection bd",
    "batik kurti collection bangladesh",
    "batik panjabi collection bd",
    "batik bedsheet collection bangladesh",
    "handmade batik collection bd",
    "batik dupatta collection bangladesh",
    
    // Block print collection
    "block print saree collection bangladesh",
    "block print three piece collection bd",
    "block print kurti collection bangladesh",
    "block print panjabi collection bd",
    "block print bedsheet collection bangladesh",
    "hand block print collection bd",
    "block print dupatta collection bangladesh",
    
    // Applique collection
    "applique saree collection bangladesh",
    "applique three piece collection bd",
    "applique kurti collection bangladesh",
    "applique cushion collection bd",
    "applique bedsheet collection bangladesh",
    "handmade applique collection bd",
    
    // Saree collection
    "saree collection bangladesh",
    "batik saree collection bd",
    "block print saree collection bangladesh",
    "cotton saree collection bd",
    "handloom saree collection bangladesh",
    "designer saree collection bd",
    "wedding saree collection bangladesh",
    "eid saree collection bd",
    
    // Three piece collection
    "three piece collection bangladesh",
    "batik three piece collection bd",
    "block print three piece collection bangladesh",
    "unstitched three piece collection bd",
    "cotton three piece collection bangladesh",
    
    // Panjabi collection
    "panjabi collection bangladesh",
    "batik panjabi collection bd",
    "block print panjabi collection bangladesh",
    "cotton panjabi collection bd",
    "eid panjabi collection bangladesh",
    
    // Kurti collection
    "kurti collection bangladesh",
    "batik kurti collection bd",
    "block print kurti collection bangladesh",
    "cotton kurti collection bd",
    "deshi kurti collection bangladesh",
    
    // Bedsheet collection
    "bedsheet collection bangladesh",
    "batik bedsheet collection bd",
    "block print bedsheet collection bangladesh",
    "cotton bedsheet collection bd",
    "handmade bedsheet collection bangladesh",
    
    // Home textile collection
    "cushion cover collection bangladesh",
    "home textile collection bd",
    "dupatta collection bangladesh",
    "scarf collection bd",
    "table runner collection bangladesh",
    
    // Seasonal collections
    "eid collection bangladesh",
    "puja collection bd",
    "wedding collection bangladesh",
    "summer collection bd",
    "winter collection bangladesh",
    "festive collection bd",
    
    // Occasion collections
    "daily wear collection bangladesh",
    "party wear collection bd",
    "office wear collection bangladesh",
    "casual collection bd",
    "traditional collection bangladesh",
    
    // Jashore/Khulna Region
    "jashore batik collection bangladesh",
    "jessore block print collection bd",
    "khulna handicraft collection",
    "jashore deshi products collection",
    
    // Shopping intent
    "buy batik collection online bangladesh",
    "buy block print collection bd",
    "handicraft collection online bangladesh",
    "authentic batik collection bd",
    "traditional collection online bangladesh",
    
    // Payment & Delivery
    "cod handicraft collection bangladesh",
    "bkash payment batik collection bd",
    "nagad deshi collection store",
    "free delivery handicraft dhaka",
    
    // Cultural & Traditional
    "bangladeshi traditional collection",
    "bengali batik collection",
    "deshi fashion collection bangladesh",
    "heritage textile collection bd",
    "artisan made deshi collection",
    "handmade deshi collection bd"
  ],
  openGraph: {
    title: "Our Collections - Nishita's Creation | Batik, Block Print & Applique Bangladesh",
    description: "Browse curated collections of authentic Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti & deshi products. 100% original handmade from Jashore, Bangladesh. COD & bKash/Nagad available.",
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com') + '/collections',
    siteName: "Nishita's Creation",
    images: [
      {
        url: '/collections-og-nishitas-creation.jpg',
        width: 1200,
        height: 630,
        alt: "Nishita's Creation Collections - Batik, Block Print & Applique Handicraft Products Bangladesh",
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
    title: "Our Collections | Nishita's Creation - Batik, Block Print & Applique",
    description: "Browse curated collections of authentic Batik, Block Print, Applique & deshi handicraft products from Jashore, Bangladesh.",
    images: ['/collections-twitter-nishitas-creation.jpg'],
  },
  alternates: {
    canonical: '/collections',
    languages: {
      'en': '/collections',
      'bn': '/bn/collections',
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
    'application-name': "Nishita's Creation Collections",
    'msapplication-TileColor': '#29362f',
    'theme-color': '#29362f',
    'page-type': 'collections',
    'collection-types': 'Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet, Deshi Collection',
    'product-categories': 'Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet, Dupatta, Deshi Collection',
    'craft-techniques': 'Hand Block Print, Batik Print, Applique Work, Hand Embroidery',
    'fabric-types': 'Cotton, Handloom Cotton, Soft Cotton, Muslin, Khadi',
    'origin': 'Jashore, Khulna, Bangladesh',
    'artisan-info': 'Made by skilled local artisans in our own factory',
    'care-instructions': 'Hand Wash Recommended, Do Not Bleach, Dry in Shade',
    'color-options': 'Traditional, Natural, Earthy, Vibrant, Pastel Tones',
    'size-options': 'Free Size, Unstitched, Custom Fit Available',
    'occasion': 'Daily Wear, Eid, Puja, Wedding, Casual, Party, Office',
    'authenticity': '100% Original Handmade Products',
    'quality-guarantee': '100% Original Handmade Products Guaranteed',
    'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'delivery-info': 'Free Delivery over 3000 BDT, Nationwide Delivery in Bangladesh',
    'customer-support': 'support@nishitascreation.com',
    'support-hours': '10:00 AM - 10:00 PM (Everyday)',
    'return-policy': '7 Days Return Policy',
    'special-features': 'Own Factory, Skilled Artisans, Traditional Craft, Handmade, Authentic Deshi Products',
  },
};

// Server component with Suspense
export default function CollectionsPage() {
  return (
    <Suspense fallback={<CollectionsLoading />}>
      <CollectionsClient />
    </Suspense>
  );
}