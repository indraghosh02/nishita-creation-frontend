// app/search/page.js
import { Suspense } from 'react';
import SearchClient from './SearchClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Search page - Nishita's Creation themed
function SearchLoading() {
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

// Nishita's Creation Search Page SEO Metadata
export const metadata = {
  title: "Search Handicraft Products | Batik, Block Print & Applique - Nishita's Creation Bangladesh",
  description: "Search for authentic Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet & deshi products at Nishita's Creation Bangladesh. Find the perfect traditional handicraft for your needs.",
  keywords: [
    // Primary search keywords
    "search handicraft products bangladesh",
    "find batik bd",
    "nishitas creation search",
    "handicraft product finder",
    "search deshi products bangladesh",
    
    // Batik search
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
    
    // Block print search
    "block print saree bangladesh",
    "block printed three piece bd",
    "block print kurti bangladesh",
    "block print bedsheet bd",
    "hand block print saree bangladesh",
    "block print panjabi bd",
    "block print dupatta bangladesh",
    "block printed dress bd",
    "block print salwar kameez bd",
    
    // Applique search
    "applique saree bangladesh",
    "applique three piece bd",
    "applique kurti bangladesh",
    "applique bedsheet bd",
    "applique cushion bangladesh",
    "handmade applique bd",
    "applique work saree bd",
    
    // Saree search
    "saree price bangladesh",
    "batik saree online bd",
    "block print saree price bd",
    "cotton saree bangladesh",
    "handloom saree bd",
    "designer saree bangladesh",
    "daily wear saree bd",
    "wedding saree bd",
    
    // Three Piece search
    "three piece price bangladesh",
    "batik three piece bd",
    "block print three piece bangladesh",
    "salwar kameez bd",
    "unstitched three piece bangladesh",
    
    // Panjabi search
    "panjabi price bangladesh",
    "batik panjabi bd",
    "block print panjabi bangladesh",
    "cotton panjabi bd",
    "eid panjabi bangladesh",
    
    // Kurti search
    "kurti price bangladesh",
    "batik kurti bd",
    "block print kurti bangladesh",
    "cotton kurti bd",
    "deshi kurti bangladesh",
    
    // Bedsheet search
    "bedsheet price bangladesh",
    "batik bedsheet bd",
    "block print bedsheet bangladesh",
    "cotton bedsheet bd",
    "deshi bedsheet bangladesh",
    
    // Jashore/Khulna Region
    "jashore batik bangladesh",
    "jessore block print bd",
    "khulna batik saree",
    "jashore deshi products",
    
    // Fabric search
    "cotton fabric bangladesh",
    "handloom cotton bd",
    "muslin fabric bangladesh",
    "khadi products bd",
    "soft cotton saree bangladesh",
    
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
    
    // Occasions
    "eid collection batik bd",
    "puja collection deshi bangladesh",
    "wedding collection batik bd",
    "daily wear deshi dress bangladesh",
    "gift deshi products bd",
    
    // Color & style
    "traditional color saree bd",
    "vibrant batik saree bangladesh",
    "earthy tone deshi dress bd",
    "pastel batik kurti bangladesh",
    
    // Size & fit
    "free size saree bangladesh",
    "unstitched three piece bd",
    "custom fit deshi dress bangladesh",
    "plus size batik saree bd",
    
    // Deals
    "batik products on sale bd",
    "discount handicraft bangladesh",
    "batik deals jashore",
    "handicraft bundle offers bd"
  ],
  openGraph: {
    title: "Search Handicraft Products | Batik, Block Print & Applique - Nishita's Creation",
    description: "Find authentic Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet & deshi products. Search and discover the best traditional handicraft at Nishita's Creation Bangladesh.",
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com') + '/search',
    siteName: "Nishita's Creation",
    images: [
      {
        url: '/search-og-nishitas-creation.jpg',
        width: 1200,
        height: 630,
        alt: "Search Handicraft Products - Nishita's Creation Bangladesh",
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
    title: "Search Handicraft Products | Batik, Block Print & Applique - Nishita's Creation",
    description: "Find authentic Batik, Block Print, Applique, Saree, Three Piece, Panjabi & Kurti. Search and discover traditional handicraft at Nishita's Creation Bangladesh.",
    images: ['/search-twitter-nishitas-creation.jpg'],
  },
  alternates: {
    canonical: '/search',
    languages: {
      'en': '/search',
      'bn': '/bn/search',
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
  other: {
    'application-name': "Nishita's Creation Search",
    'msapplication-TileColor': '#29362f',
    'theme-color': '#29362f',
    'page-type': 'search-results',
    'user-action': 'search-products',
    'service-type': 'product-search',
    'product-categories': 'Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet, Dupatta, Deshi Collection',
    'authenticity': '100% Original Handmade Products',
    'quality-guarantee': 'Quality Assured Handicraft Products',
    'search-capabilities': 'Product Name, Category, Fabric Type, Color, Size, Craft Technique, Price Range',
    
    // Craft product types
    'craft-types': 'Batik, Block Print, Applique, Hand Embroidery',
    'batik-types': 'Batik Saree, Batik Three Piece, Batik Kurti, Batik Panjabi, Batik Bedsheet',
    'block-print-types': 'Block Print Saree, Block Print Three Piece, Block Print Kurti, Block Print Panjabi, Block Print Bedsheet',
    'applique-types': 'Applique Saree, Applique Three Piece, Applique Cushion, Applique Bedsheet',
    'fabric-types': 'Cotton, Handloom Cotton, Soft Cotton, Muslin, Khadi',
    
    // Craft features
    'craft-techniques': 'Hand Block Print, Batik Print, Applique Work, Hand Embroidery',
    'origin': 'Jashore, Khulna, Bangladesh',
    'artisan-info': 'Made by skilled local artisans in our own factory',
    'care-instructions': 'Hand Wash Recommended, Do Not Bleach, Dry in Shade',
    'color-options': 'Traditional, Natural, Earthy, Vibrant, Pastel Tones',
    'size-options': 'Free Size, Unstitched, Custom Fit Available',
    
    // Safety & Ethics
    'fabric-safety': 'Skin-Friendly, Breathable Cotton, Natural Dyes',
    'ethical-features': 'Handmade, Artisan-Supported, Eco-Friendly Options',
    'certification': 'Own Factory Production, Artisan Craftsmanship',
    
    // Search & Filter
    'search-method': 'Keyword Search',
    'filter-options': 'Price Range, Category, Fabric Type, Color, Size, Craft Technique, Occasion',
    'sort-options': 'Relevance, Price Low to High, Price High to Low, Newest First, Top Rated',
    'result-count': 'Dynamic',
    
    // Customer support
    'customer-support': 'support@nishitascreation.com',
    'craft-consultant': 'Available for Product Guidance',
    'support-hours': '10:00 AM - 10:00 PM (Everyday)',
    'return-policy': '7 Days Return Policy',
    'satisfaction-guarantee': '100% Satisfaction Guarantee',
    
    // Product details
    'occasion': 'Daily Wear, Eid, Puja, Wedding, Casual, Party, Office',
    'special-features': 'Own Factory, Skilled Artisans, Traditional Craft, Handmade, Authentic Deshi Products',
  },
};

// Generate JSON-LD structured data for Search page
export const generateJsonLd = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/search`,
    name: "Search Handicraft Products - Nishita's Creation",
    description: "Search for authentic Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet & deshi products at Nishita's Creation Bangladesh.",
    url: `${BASE_URL}/search`,
    inLanguage: 'en',
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
          name: 'Search',
          item: `${BASE_URL}/search`
        }
      ]
    },
    mainEntity: {
      '@type': 'SearchResultsPage',
      name: "Nishita's Creation Search Results",
      description: 'Search results for Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti & traditional Bangladeshi handicrafts',
      about: {
        '@type': 'Thing',
        name: 'Handicraft & Deshi Products Search',
        description: 'Search for Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet & traditional Bangladeshi handicrafts'
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };
};

// Server component with Suspense
export default function SearchPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<SearchLoading />}>
        <SearchClient />  
      </Suspense>
    </>
  );
}