// app/login/page.js
import { Suspense } from 'react';
import LoginClient from './LoginClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Login page - Nishita's Creation themed
function LoginLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#29362f] border-t-transparent rounded-full animate-spin"></div>
      </div>
      <Footer />
    </>
  );
}

// Nishita's Creation Login Page SEO Metadata
export const metadata = {
  title: "Login to Nishita's Creation | Sign In / Sign Up for Authentic Batik, Block Print & Handicraft Products",
  description: "Login to your Nishita's Creation account to shop authentic Batik, Block Print, Applique, Saree, Three Piece, Panjabi & deshi products. Track orders, save wishlist, get craft tips, and exclusive handicraft deals.",
  keywords: [
    // Login specific
    "login nishitas creation",
    "sign in handicraft store bd",
    "customer login bangladesh handicraft",
    "nishitas creation account access",
    "member login handicraft",
    
    // Account related
    "my handicraft account",
    "batik shopping login",
    "handicraft products account bd",
    "premium handicraft login",
    "nishitas creation member sign in",
    
    // Benefits
    "track handicraft orders",
    "save wishlist login handicraft",
    "exclusive handicraft deals",
    "batik discount for members",
    "handicraft product discount",
    
    // Authentication
    "secure login handicraft",
    "handicraft store authentication",
    "online handicraft shop login bd",
    "nishitas creation customer portal",
    
    // User intent
    "access my handicraft account",
    "login to buy batik online",
    "handicraft shopping account bd",
    "handicraft store sign in",
    
    // Craft specific
    "batik account login",
    "block print store login bd",
    "applique account access",
    "saree store sign in",
    "three piece login bd",
    "panjabi account access",
    "kurti account login",
    "deshi products login",
    
    // Local keywords
    "login jashore handicraft store",
    "premium handicraft account",
    "handicraft store customer login",
    "handicraft shopping account bd",
    
    // Craft enthusiast
    "handicraft lover account",
    "batik enthusiast login",
    "traditional crafts lover account bd",
    "handicraft community login",
    "deshi product tips account",
    
    // New customer
    "create handicraft account",
    "register handicraft store bd",
    "new handicraft customer",
    "handicraft account sign up"
  ],
  openGraph: {
    title: "Login to Nishita's Creation - Your Handicraft Account | Bangladesh",
    description: "Sign in to your Nishita's Creation account to shop authentic Batik, Block Print, Applique, Saree, Three Piece, Panjabi & more. 100% original handmade products!",
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com') + '/login',
    siteName: "Nishita's Creation",
    images: [
      {
        url: '/login-og-nishitas-creation.jpg',
        width: 1200,
        height: 630,
        alt: "Nishita's Creation Login - Sign in to Your Handicraft Account",
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
    title: "Login to Nishita's Creation | Handicraft Store Bangladesh",
    description: "Sign in to access your handicraft account, track orders, save favorites, get craft tips, and exclusive member deals!",
    images: ['/login-twitter-nishitas-creation.jpg'],
  },
  alternates: {
    canonical: '/login',
    languages: {
      'en': '/login',
      'bn': '/bn/login',
    },
  },
  robots: {
    index: false,  // Login pages should not be indexed
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  // Additional metadata
  other: {
    'application-name': "Nishita's Creation Login",
    'msapplication-TileColor': '#29362f',
    'theme-color': '#29362f',
    'page-type': 'login',
    'user-action': 'authentication',
    'business-name': "Nishita's Creation Bangladesh",
    'business-type': 'E-commerce Handicraft & Deshi Products Store',
    'secure-login': '256-bit SSL Encrypted',
    'session-timeout': '7 days',
    
    // Craft specific benefits
    'craft-consultation': 'Available with Account',
    'personalized-recommendations': 'Based on Purchase History & Preferences',
    'style-saver': 'Save Your Style & Fabric Preferences',
    'wishlist-feature': 'Save Favorite Handicraft Products',
    'price-alerts': 'Get Notified on Price Drops',
    'exclusive-offers': 'Member-Only Discounts',
    'early-access': 'Early Access to New Collections',
    'craft-tips': 'Exclusive Craft Tips & Care Guides',
    'order-tracking': 'Real-time Order Tracking',
    
    // Account features
    'saved-preferences': 'Store Your Fabric & Style Preferences',
    'color-preferences': 'Color Preferences (Optional)',
    'size-preferences': 'Size & Fit Preferences (Optional)',
    'occasion-preferences': 'Occasion Preferences (Optional)',
    'product-reviews': 'Write & Read Product Reviews',
    'purchase-history': 'View Purchase History',
    'craft-consultation-history': 'View Craft Consultation History',
    
    // Product categories
    'product-categories': 'Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet, Dupatta, Deshi Collection',
    'craft-techniques': 'Hand Block Print, Batik Print, Applique Work, Hand Embroidery',
    'fabric-types': 'Cotton, Handloom Cotton, Soft Cotton, Muslin, Khadi',
    'origin': 'Jashore, Khulna, Bangladesh',
    'artisan-info': 'Made by skilled local artisans in our own factory',
    'occasion': 'Daily Wear, Eid, Puja, Wedding, Casual, Party, Office',
    
    // Security
    'two-factor-auth': 'Available for Enhanced Security',
    'password-recovery': 'Secure Password Recovery',
    'data-protection': 'GDPR & CCPA Compliant',
    'customer-support': 'support@nishitascreation.com',
    'support-hours': '10:00 AM - 10:00 PM (Everyday)',
    
    // Payment & delivery
    'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'free-delivery': 'Orders over 3000 BDT',
    'return-policy': '7 Days Return Policy',
  },
};

// Generate JSON-LD structured data
export const generateJsonLd = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/login`,
    name: "Login - Nishita's Creation",
    description: "Login to your Nishita's Creation account to shop authentic Batik, Block Print & Applique handicraft products.",
    url: `${BASE_URL}/login`,
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
          name: 'Login',
          item: `${BASE_URL}/login`
        }
      ]
    },
    mainEntity: {
      '@type': 'WebApplication',
      name: 'Customer Login System',
      description: 'Login to access your handicraft account, track orders, and get personalized craft recommendations',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires modern browser'
    }
  };
};

// Server component with Suspense
export default function LoginPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<LoginLoading />}>
        <LoginClient />
      </Suspense>
    </>
  );
}