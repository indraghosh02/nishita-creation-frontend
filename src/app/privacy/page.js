// app/privacy/page.js
import { Suspense } from 'react';
import PrivacyClient from './PrivacyClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Privacy page - Nishita's Creation themed
function PrivacyLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f7f4ef] via-[#e8e4d5] to-[#F8F5F0] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-[#29362f]/15 rounded-full animate-pulse mb-4"></div>
          <div className="h-6 w-48 bg-[#29362f]/20 rounded mx-auto animate-pulse"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Nishita's Creation Privacy Policy Page SEO Metadata
export const metadata = {
  title: "Privacy Policy | Protecting Your Personal & Order Information",
  description: "Read Nishita's Creation's privacy policy to understand how we collect, use, and protect your personal information. Learn about data security, cookies, and your privacy rights in Bangladesh.",
  keywords: [
    // Privacy policy specific
    "privacy policy nishitas creation",
    "handicraft store privacy policy bd",
    "batik data protection",
    "nishitas creation privacy practices",
    "online handicraft store privacy bangladesh",
    
    // Data collection
    "personal information collection handicraft",
    "customer data protection handicraft",
    "batik purchase privacy",
    "shopping data security handicraft",
    "handicraft store data collection",
    
    // Security measures
    "ssl encryption handicraft",
    "secure payment batik bd",
    "data security handicraft store",
    "nishitas creation security policy",
    "encryption standards bd handicraft",
    
    // User rights
    "data access rights handicraft",
    "delete my data handicraft",
    "opt out marketing nishitas creation",
    "gdpr compliance handicraft bd",
    "ccpa rights bangladesh handicraft",
    
    // Cookies & tracking
    "cookie policy handicraft",
    "website tracking handicraft",
    "analytics privacy handicraft",
    "user tracking consent bd handicraft",
    
    // Craft specific privacy
    "product preferences data handicraft",
    "batik purchase history",
    "handicraft recommendations privacy",
    "personalized handicraft suggestions",
    
    // Order & product data
    "order data protection handicraft",
    "batik product usage information privacy",
    "handicraft consultation data",
    "fabric care data privacy",
    "handicraft product warranty data",
    
    // Legal compliance
    "data protection bangladesh handicraft",
    "privacy compliance handicraft",
    "ccpa rights handicraft bd",
    "gdpr rights handicraft customers",
    "bangladesh data protection act handicraft",
    
    // Marketing & communications
    "handicraft newsletter privacy",
    "promotional emails privacy handicraft",
    "handicraft offers data usage",
    "marketing consent handicraft",
    "email marketing opt out handicraft",
    
    // Batik specific
    "batik data protection",
    "batik purchase data security",
    "batik preferences privacy",
    
    // Block print specific
    "block print data privacy",
    "handicraft purchase information",
    "saree preferences privacy",
    "block print product compatibility privacy",
    
    // Applique specific
    "applique data privacy",
    "traditional crafts preferences information",
    "applique purchase data",
    
    // Saree & dress specific
    "saree purchase data privacy",
    "three piece preferences information",
    "panjabi purchase privacy",
    "kurti product compatibility data",
    
    // Additional
    "nishitas creation data security",
    "handicraft customer privacy",
    "batik data protection bd",
    "handicraft purchase privacy",
    "online handicraft store privacy",
    "traditional crafts data privacy",
    "deshi products data protection",
    "authentic handicraft privacy"
  ],
  openGraph: {
    title: "Privacy Policy - Nishita's Creation | Your Handicraft Data Protection & Privacy Rights",
    description: "Learn how Nishita's Creation protects your personal information. We're committed to transparent data practices, secure payments, and respecting your privacy rights in Bangladesh.",
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com') + '/privacy',
    siteName: "Nishita's Creation",
    images: [
      {
        url: '/privacy-og-nishitas-creation.jpg',
        width: 1200,
        height: 630,
        alt: "Nishita's Creation Privacy Policy - Your Handicraft Data Protection",
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
    title: "Privacy Policy | Nishita's Creation",
    description: "How we collect, use, and protect your personal information. Your privacy rights and handicraft data security explained.",
    images: ['/privacy-twitter-nishitas-creation.jpg'],
  },
  alternates: {
    canonical: '/privacy',
    languages: {
      'en': '/privacy',
      'bn': '/bn/privacy',
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
  // Privacy page specific metadata
  other: {
    'application-name': "Nishita's Creation Privacy",
    'msapplication-TileColor': '#29362f',
    'theme-color': '#29362f',
    'page-type': 'privacy-policy',
    'privacy-policy-version': '2.0',
    'last-updated': '2024-01-01',
    'data-controller': "Nishita's Creation Bangladesh",
    'privacy-contact': 'privacy@nishitascreation.com',
    'gdpr-compliant': 'true',
    'ccpa-compliant': 'true',
    'data-retention-period': '2 years',
    'cookie-policy': 'opt-in',
    
    // Handicraft specific data collection
    'data-collection-types': 'Name, Email, Phone, Address, Purchase History, Product Interests, Style Preferences, Craft Concerns',
    'preference-data': 'Fabric Preferences, Color Preferences, Size Preferences, Craft Style Preferences (Optional)',
    'data-usage': 'Order Processing, Product Recommendations, Craft Consultation, Marketing (with consent)',
    'third-party-sharing': 'Only with Delivery Partners and Payment Processors',
    
    // Security measures
    'encryption-standard': '256-bit SSL Encryption',
    'payment-security': 'PCI DSS Compliant',
    'data-storage': 'Secure Cloud Storage',
    'access-control': 'Role-Based Access Control',
    
    // User rights
    'rights-access': 'Access Personal Data',
    'rights-correction': 'Correct Inaccurate Data',
    'rights-deletion': 'Request Data Deletion',
    'rights-opt-out': 'Opt-out of Marketing',
    'rights-portability': 'Data Portability',
    
    // Children's privacy
    'children-privacy': 'COPPA Compliant',
    'age-restriction': '13+ with Parental Consent',
    'parental-consent': 'Required for Under 18',
    
    // Cookie policy
    'cookie-types': 'Essential, Analytics, Marketing (optional)',
    'cookie-retention': 'Session and Persistent',
    'third-party-cookies': 'Google Analytics, Social Media',
    
    // Handicraft marketing
    'marketing-consent': 'Explicit Opt-in Required',
    'email-marketing': 'Opt-out Available',
    'personalized-recommendations': 'Based on Purchase History and Style Preferences',
    'handicraft-newsletters': 'Optional Subscription',
    
    // Craft specific privacy
    'preference-data-optional': 'Fabric and Style Preferences (Optional)',
    'product-preferences': 'Handicraft Product Preferences (Optional)',
    'color-preferences': 'Color Preferences (Optional)',
    'size-preferences': 'Size and Fit Preferences (Optional)',
    'fabric-preferences': 'Fabric Type Preferences (Optional)',
    'product-feedback': 'Product Review and Feedback Data',
    'craft-consultation': 'Consultation History (Optional)',
    
    // Batik specific
    'batik-data': 'Batik Product Preferences, Color Preferences (Optional)',
    'craft-concerns': 'Fabric Care, Size Preferences (Optional)',
    
    // Block print specific
    'block-print-data': 'Block Print Style Preferences, Color Preferences (Optional)',
    'color-range': 'Traditional to Modern Color Palettes',
    
    // Applique specific
    'applique-data': 'Applique Design Preferences, Style Categories (Optional)',
    'design-types': 'Traditional, Modern, Contemporary (Optional)',
    
    // Fabric care specific
    'fabric-data': 'Fabric Type Preferences, Care Preferences (Optional)',
    'fabric-types': 'Cotton, Handloom Cotton, Muslin, Khadi (Optional)',
    
    // Legal compliance
    'compliance-standard': 'Bangladesh Data Protection Act',
    'international-compliance': 'GDPR, CCPA',
    'data-breach-notification': '72 Hours',
    'dispute-resolution': 'Customer Support + Regulatory',
    
    // Product safety
    'product-safety-data': 'Safety Certification Records',
    'quality-control': 'Quality Assurance Data',
    'craft-safety': 'Fabric Safety and Care Data',
    'handmade-quality': 'Handmade Quality Assurance Records',
    
    // Craft categories & techniques
    'craft-techniques': 'Hand Block Print, Batik Print, Applique Work, Hand Embroidery',
    'fabric-types': 'Cotton, Handloom Cotton, Soft Cotton, Muslin, Khadi',
    'product-categories': 'Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet, Dupatta, Deshi Collection',
    'origin': 'Jashore, Khulna, Bangladesh',
    
    // Ethical privacy
    'ethical-data': 'Handmade Preferences, Artisan Support Preferences (Optional)',
    'preference-types': 'Traditional Craft Preferences, Color Preferences (Optional)',
    'eco-friendly-preferences': 'Eco-Friendly Packaging Preferences (Optional)',
  },
};

// Generate JSON-LD structured data for Privacy page
export const generateJsonLd = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${BASE_URL}/privacy`,
    name: "Privacy Policy - Nishita's Creation",
    description: "Read Nishita's Creation's privacy policy to understand how we collect, use, and protect your personal information.",
    url: `${BASE_URL}/privacy`,
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
          name: 'Privacy Policy',
          item: `${BASE_URL}/privacy`
        }
      ]
    },
    mainEntity: {
      '@type': 'PrivacyPolicy',
      name: "Nishita's Creation Privacy Policy",
      description: "This privacy policy explains how Nishita's Creation collects, uses, and protects your personal information.",
      datePublished: '2024-01-01',
      dateModified: '2024-01-01',
      jurisdiction: 'Bangladesh',
      appliesTo: {
        '@type': 'Organization',
        name: "Nishita's Creation Bangladesh",
      },
      privacyPolicy: {
        '@type': 'CreativeWork',
        name: "Nishita's Creation Privacy Policy",
        text: "Nishita's Creation is committed to protecting your privacy. We collect personal information to process orders, provide craft consultation, and improve your shopping experience.",
      },
      dataCollection: {
        '@type': 'DataCollection',
        dataType: ['Personal Information', 'Purchase History', 'Product Preferences', 'Fabric Preferences', 'Color Preferences', 'Style Preferences'],
        method: 'User Provided, Automatic Collection',
        usage: 'Order Processing, Craft Consultation, Customer Service, Product Recommendations, Marketing (with consent)'
      },
      dataSecurity: {
        '@type': 'DataSecurity',
        description: 'We use 256-bit SSL encryption and PCI DSS compliant payment processing to protect your data.',
      },
      userRights: {
        '@type': 'DigitalDocument',
        name: 'User Rights',
        description: 'You have the right to access, correct, delete, and opt-out of marketing communications.',
      },
      productCategories: {
        '@type': 'ItemList',
        name: 'Product Categories Covered',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Batik' },
          { '@type': 'ListItem', position: 2, name: 'Block Print' },
          { '@type': 'ListItem', position: 3, name: 'Applique' },
          { '@type': 'ListItem', position: 4, name: 'Saree' },
          { '@type': 'ListItem', position: 5, name: 'Three Piece' },
          { '@type': 'ListItem', position: 6, name: 'Panjabi' },
          { '@type': 'ListItem', position: 7, name: 'Kurti' },
          { '@type': 'ListItem', position: 8, name: 'Bedsheet' },
        ]
      }
    },
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      '@type': 'Organization',
      name: "Nishita's Creation Bangladesh",
    }
  };
};

// Server component with Suspense
export default function PrivacyPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<PrivacyLoading />}>
        <PrivacyClient />
      </Suspense>
    </>
  );
}