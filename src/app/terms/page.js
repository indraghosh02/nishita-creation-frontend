// app/terms/page.js
import { Suspense } from 'react';
import TermsClient from './TermsClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Terms page - Nishita's Creation themed
function TermsLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f7f4ef] to-[#e8e4d5] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#29362f]/15 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-[#29362f]/20 rounded mx-auto animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Nishita's Creation - Terms & Conditions Page SEO Metadata
export const metadata = {
  title: "Terms & Conditions - Nishita's Creation | Legal Terms for Handicraft Products Purchase",
  description: "Read Nishita's Creation's terms and conditions for online Batik, Block Print, Applique & deshi products purchases in Bangladesh. Learn about pricing, shipping, returns, product authenticity, and legal policies for traditional handicraft products.",
  keywords: [
    // Legal terms specific
    "terms and conditions nishitas creation",
    "handicraft store legal terms bd",
    "batik products purchase terms",
    "nishitas creation policies",
    "online handicraft store terms bangladesh",
    "legal terms handicraft bd",
    
    // Purchase terms
    "handicraft purchase agreement",
    "batik products terms bd",
    "nishitas creation return policy",
    "handicraft warranty terms",
    "refund policy handicraft products",
    "consumer handicraft terms",
    
    // Shipping terms
    "handicraft delivery terms",
    "shipping policy batik bd",
    "cod terms handicraft products",
    "nishitas creation shipping policy",
    "deshi products delivery policy bd",
    "express delivery terms handicraft",
    
    // Payment terms
    "handicraft payment terms",
    "bkash payment policy batik",
    "nagad payment terms handicraft",
    "handicraft pricing policy",
    "emi payment terms bd handicraft",
    "credit card payment policy handicraft",
    
    // Authenticity & Quality
    "handicraft product authenticity policy",
    "batik quality guarantee",
    "authenticity guarantee terms bd",
    "quality assurance handicraft products",
    "genuine products policy bd",
    "batik product authenticity",
    
    // Returns & Exchanges
    "handicraft return policy bangladesh",
    "batik exchange policy",
    "saree return terms bd",
    "block print product return policy",
    "applique return policy bd",
    "handicraft product exchange terms",
    
    // Warranty & Service
    "handicraft warranty policy",
    "batik product guarantee",
    "quality claim terms bd",
    "after sales service policy handicraft",
    "handicraft support terms",
    "satisfaction guarantee terms",
    
    // Legal compliance
    "handicraft safety compliance",
    "consumer rights handicraft bd",
    "product liability handicraft",
    "nishitas creation legal information",
    "handicraft standards bd",
    "batik product regulations bd",
    
    // Account terms
    "user account terms handicraft",
    "customer agreement handicraft",
    "nishitas creation account policy",
    "handicraft buyer agreement",
    
    // Privacy & Security
    "privacy policy handicraft products",
    "data protection handicraft bd",
    "secure transaction terms handicraft",
    "customer data policy bd handicraft",
    
    // Craft specific
    "batik product terms",
    "block print purchase policy",
    "handicraft consumer protection",
    "batik product warranty bd",
    "authentic handicraft terms",
    "handicraft shopping terms bd",
    
    // Additional
    "consumer protection bd handicraft",
    "digital commerce terms handicraft",
    "online purchase policy bd handicraft",
    "handicraft buyer protection",
    "batik transaction terms",
    "eco-friendly handicraft policy"
  ],
  openGraph: {
    title: "Terms & Conditions - Nishita's Creation | Legal Information for Handicraft Purchases",
    description: "Review Nishita's Creation's complete terms and conditions. Understand our policies on pricing, shipping, returns, authenticity, privacy, and customer responsibilities for authentic Batik, Block Print & Applique products.",
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com') + '/terms',
    siteName: "Nishita's Creation",
    images: [
      {
        url: '/terms-og-nishitas-creation.jpg',
        width: 1200,
        height: 630,
        alt: "Nishita's Creation Terms & Conditions - Legal Information for Handicraft Products",
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
    title: "Terms & Conditions | Nishita's Creation",
    description: "Read Nishita's Creation's terms for online Batik, Block Print & Applique purchases in Bangladesh. Pricing, shipping, returns, authenticity, and privacy policies.",
    images: ['/terms-twitter-nishitas-creation.jpg'],
  },
  alternates: {
    canonical: '/terms',
    languages: {
      'en': '/terms',
      'bn': '/bn/terms',
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
  // Terms page specific metadata
  other: {
    'application-name': "Nishita's Creation Terms",
    'msapplication-TileColor': '#29362f',
    'theme-color': '#29362f',
    'page-type': 'legal-terms',
    'last-updated': '2024-01-01',
    'jurisdiction': 'Bangladesh',
    'legal-entity': "Nishita's Creation BD",
    'company-registration': 'Registered in Bangladesh',
    'tax-id': 'TIN: 123456789',
    
    // Policy details
    'return-policy-period': '7 Days',
    'authenticity-guarantee': '100% Original Handmade Products',
    'refund-policy': 'Within 7-14 business days',
    'replacement-policy': 'Within 7 days of delivery',
    'exchange-policy': 'Subject to terms and conditions',
    
    // Consumer rights
    'consumer-protection': 'Bangladesh Consumer Rights Act',
    'dispute-resolution': 'Mediation and Arbitration',
    'governing-law': 'Laws of Bangladesh',
    
    // Shipping policy
    'shipping-policy': 'Nationwide Delivery',
    'delivery-time': '1-3 business days',
    'free-delivery': 'Orders over 3000 BDT',
    'shipping-charges': 'As per delivery location',
    'cod-charge': 'Free for all orders',
    
    // Payment policy
    'accepted-payments': 'COD, bKash, Nagad, Rocket, Credit Card',
    'payment-security': '256-bit SSL Encrypted',
    'refund-processing': '5-7 business days',
    
    // Authenticity & Quality
    'authenticity-policy': '100% Original Handmade Products',
    'quality-guarantee': 'Quality Assured Handicraft Products',
    'quality-check': 'Pre-shipment Quality Check',
    'brand-authorization': 'Own Factory Production',
    'certified-products': 'Handmade with Skilled Artisan Craftsmanship',
    
    // Product safety
    'safety-standards': 'Natural Fabrics, Skin-Friendly',
    'skin-safety': 'Breathable Cotton, Skin-Friendly Dyes',
    'ingredient-transparency': 'Full Fabric & Dye Disclosure Available',
    'ethical-standards': 'Handmade, Artisan-Supported, Eco-Friendly Options',
    'eco-friendly': 'Eco-Friendly Packaging Options',
    
    // Data protection
    'privacy-policy': 'Data Protection Compliant',
    'data-collection': 'Order & Delivery Information Only',
    'data-sharing': 'Not shared with third parties',
    'data-security': 'Encrypted Storage',
    
    // Craft specific policies
    'fabric-care': 'Hand Wash Recommended, Do Not Bleach, Dry in Shade',
    'size-guide': 'Free Size, Unstitched, Custom Fit Available',
    'color-accuracy': 'Handcrafted products may have slight color variations',
    'craft-authenticity': 'Each product is handmade with unique artisan character',
    
    // Additional
    'business-hours': '10:00 AM - 10:00 PM (Everyday)',
    'customer-support': 'support@nishitascreation.com',
    'emergency-contact': '+880123456789',
    'terms-version': 'v2.0',
    'effective-date': 'January 1, 2024',
    'craft-expert': 'Available for Product Guidance',
    'craft-techniques': 'Hand Block Print, Batik Print, Applique Work, Hand Embroidery',
    'fabric-types': 'Cotton, Handloom Cotton, Soft Cotton, Muslin, Khadi',
    'origin': 'Jashore, Khulna, Bangladesh',
  },
};

// Server component with Suspense
export default function TermsPage() {
  return (
    <Suspense fallback={<TermsLoading />}>
      <TermsClient />
    </Suspense>
  );
}