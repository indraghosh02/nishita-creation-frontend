// app/about/page.js
import { Suspense } from 'react';
import AboutClient from './AboutClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for About page - Nishita's Creation themed
function AboutLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#F1EFE3] via-[#e8e4d5] to-[#A8B8A0] flex items-center justify-center">
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

// Nishita's Creation - About Us Page SEO Metadata
export const metadata = {
  title: "About Nishita's Creation | Authentic Batik, Block Print & Deshi Products from Jashore",
  description: "Learn about Nishita's Creation - Bangladesh's trusted store for authentic Batik, Block Print & Applique deshi products. Our own factory & skilled artisans craft every product with love in Jashore. Quality guarantee and best prices.",
  keywords: [
    // About us specific
    "about nishitas creation",
    "batik store bangladesh",
    "block print company bd",
    "applique brand bangladesh",
    "deshi products store bd",
    "jashore handicraft company",
    "traditional crafts brand bangladesh",
    
    // Mission & values
    "handicraft company mission",
    "batik store values",
    "authentic deshi products bangladesh",
    "quality batik bd",
    "quality guarantee handicrafts",
    "own factory handicraft bangladesh",
    "skilled artisans bangladesh",
    
    // Trust signals
    "why choose nishitas creation",
    "trusted batik store bd",
    "verified handicraft store bd",
    "genuine deshi products bangladesh",
    "authentic block print store bd",
    "premium handicraft store bd",
    "authentic batik store bd",
    
    // Team & milestones
    "nishitas creation team",
    "handicraft company journey bd",
    "craft industry bangladesh",
    "traditional textile company bangladesh",
    "artisan team jashore",
    
    // Company info
    "online handicraft store about",
    "batik retailer bangladesh",
    "traditional crafts store jashore",
    "authorized deshi seller bd",
    "authentic handicraft bangladesh",
    
    // Social proof
    "happy customers handicraft bd",
    "deshi product lovers bangladesh",
    "nishitas creation reviews",
    "customer trust handicraft bd",
    "satisfied buyers bd",
    "recommended batik store bd",
    "trusted deshi store bd",
    
    // Product categories
    "batik products bd",
    "block print products bangladesh",
    "applique store bd",
    "traditional saree bangladesh",
    "three piece store bd",
    "panjabi bangladesh",
    "deshi kurti bd",
    
    // Additional keywords
    "best batik price bd",
    "authentic handicraft warranty bd",
    "certified craft seller bangladesh",
    "trusted deshi provider jashore",
    "quality assurance handicraft bd",
    "traditional craft consultation bd",
    "batik expert bd",
    "block print artisan bangladesh"
  ],
  openGraph: {
    title: "About Nishita's Creation - Our Story | Batik, Block Print & Deshi Products Bangladesh",
    description: "Discover the Nishita's Creation story. From our own factory in Jashore to your doorstep — we're on a mission to bring authentic Batik, Block Print & Applique deshi products to every household in Bangladesh.",
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com') + '/about',
    siteName: "Nishita's Creation",
    images: [
      {
        url: '/about-og-nishitas-creation.jpg',
        width: 1200,
        height: 630,
        alt: "About Nishita's Creation - Authentic Batik, Block Print & Applique Products from Jashore, Bangladesh",
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
    title: "About Nishita's Creation | Batik, Block Print & Deshi Products Bangladesh",
    description: "Learn about our mission to provide authentic Batik, Block Print & Applique deshi products with quality guarantee. Made with love by Jashore artisans!",
    images: ['/about-twitter-nishitas-creation.jpg'],
  },
  alternates: {
    canonical: '/about',
    languages: {
      'en': '/about',
      'bn': '/bn/about',
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
    'application-name': "Nishita's Creation About",
    'msapplication-TileColor': '#29362f',
    'theme-color': '#29362f',
    'page-type': 'about-us',
    'business-type': 'ecommerce-handicraft-store',
    'founded-year': '2020',
    'headquarters': 'Jashore, Khulna, Bangladesh',
    'service-area': 'Nationwide Delivery',
    'product-categories': 'Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet, Dupatta, Deshi Collection',
    'craft-techniques': 'Hand Block Print, Batik Print, Applique Work, Hand Embroidery',
    'fabric-types': 'Cotton, Handloom Cotton, Soft Cotton, Muslin, Khadi',
    'quality-guarantee': '100% Original Handmade Products',
    'certifications': 'Authorized Handicraft Retailer, Own Factory Production',
    'employee-count': 'Skilled Local Artisans Team',
    'customer-count': '5,000+ Satisfied Deshi Product Lovers',
    'social-responsibility': 'Empowering Local Artisans & Traditional Crafts in Bangladesh',
    'contact-email': 'support@nishitascreation.com',
    'contact-phone': '+880123456789',
    'business-hours': '10:00 AM - 10:00 PM (Everyday)',
    'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'special-features': 'Own Factory, Skilled Artisans, Traditional Craft, Handmade, Authentic Deshi Products',
    'artisan-info': 'Made by skilled local artisans in our own factory',
    'care-instructions': 'Hand Wash Recommended, Do Not Bleach, Dry in Shade',
    'color-options': 'Traditional, Natural, Earthy, Vibrant, Pastel Tones',
    'occasion': 'Daily Wear, Eid, Puja, Wedding, Casual, Party, Office',
    'origin': 'Jashore, Khulna, Bangladesh',
    'craft-commitment': 'Preserving traditional Bangladeshi crafts through authentic handmade products',
  },
};

// Server component with Suspense
export default function AboutPage() {
  return (
    <Suspense fallback={<AboutLoading />}>
      <AboutClient />
    </Suspense>
  );
}