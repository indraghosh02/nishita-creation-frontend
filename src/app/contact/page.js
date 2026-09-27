// app/contact/page.js
import { Suspense } from 'react';
import ContactClient from './ContactClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Contact page - Nishita's Creation themed
function ContactLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f7f4ef] via-[#A8B8A0]/20 to-[#29362f]/10 flex items-center justify-center">
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

// Nishita's Creation - Contact Us Page SEO Metadata
export const metadata = {
  title: "Contact Us | Get in Touch with Nishita's Creation",
  description: "Contact Nishita's Creation customer support for questions about Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, orders, delivery, or product authenticity. Call, email, or visit us in Jashore. We're here to help!",
  keywords: [
    // Contact specific
    "contact nishitas creation",
    "batik store customer care bd",
    "block print support bangladesh",
    "nishitas creation helpline",
    "customer service handicraft bd",
    
    // Contact methods
    "batik shop phone number",
    "nishitas creation email address",
    "handicraft store location jashore",
    "customer care number nishitas creation",
    "batik support bd",
    "deshi products helpline",
    
    // Support inquiries
    "batik order help",
    "block print delivery support bangladesh",
    "applique return contact",
    "product inquiry nishitas creation",
    "quality guarantee support handicraft",
    "traditional crafts help",
    "saree product support bd",
    
    // Business inquiries
    "handicraft business contact",
    "batik wholesale inquiry",
    "block print supplier bangladesh",
    "partnership handicraft bd",
    "brand collaboration crafts",
    
    // Social media
    "nishitas creation facebook",
    "nishitas creation instagram",
    "handicraft store social media",
    "batik store youtube",
    "deshi store tiktok",
    "nishitas creation pinterest",
    
    // Location
    "handicraft store jashore address",
    "batik shop jashore",
    "nishitas creation office location",
    "batik store near me jashore",
    "deshi showroom jashore",
    
    // Craft specific
    "batik consultation bd",
    "block print advice bangladesh",
    "applique help jashore",
    "handicraft support bd",
    "deshi product expert inquiry",
    "batik consultation jashore",
    
    // Customer service
    "handicraft product support",
    "batik helpline bd",
    "deshi customer care",
    "nishitas creation assistance",
    "craft expert help",
    "handicraft support team",
    
    // Quality & Authenticity
    "authentic handicraft products bd",
    "batik authenticity check",
    "genuine deshi warranty bd",
    "handicraft quality guarantee",
    "nishitas creation authenticity support",
    "handicraft return policy",
    "batik product exchange",
    
    // Product categories
    "batik support bangladesh",
    "block print service jashore",
    "applique help bd",
    "saree support bangladesh",
    "three piece service",
    "panjabi help",
    "kurti support bd",
    "bedsheet products inquiry",
    
    // Expert advice
    "batik care advice bd",
    "block print tips bangladesh",
    "applique selection help",
    "handicraft consultation jashore",
    "fabric care support bd",
    "craft expert guidance",
    "handicraft recommendation",
    
    // Order & Delivery
    "batik order status bd",
    "block print delivery check",
    "handicraft shipment tracking",
    "deshi order support bangladesh",
    "cod handicraft order help",
    "bkash payment support bd",
    "nagad deshi order help"
  ],
  openGraph: {
    title: "Contact Nishita's Creation - We're Here to Help | Batik, Block Print & Deshi Products Bangladesh",
    description: "Need help with your handicraft order? Have questions about Batik, Block Print, Applique, or product authenticity? Contact our friendly craft experts via phone, email, or visit our Jashore store.",
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com') + '/contact',
    siteName: "Nishita's Creation",
    images: [
      {
        url: '/contact-og-nishitas-creation.jpg',
        width: 1200,
        height: 630,
        alt: "Contact Nishita's Creation - Customer Support for Batik, Block Print & Applique Products",
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
    title: "Contact Nishita's Creation | Customer Support",
    description: "Questions about Batik, Block Print, Applique, or orders? Contact our friendly craft experts. Call, email, or visit us in Jashore.",
    images: ['/contact-twitter-nishitas-creation.jpg'],
  },
  alternates: {
    canonical: '/contact',
    languages: {
      'en': '/contact',
      'bn': '/bn/contact',
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
  // Contact page specific metadata
  other: {
    'application-name': "Nishita's Creation Contact",
    'msapplication-TileColor': '#29362f',
    'theme-color': '#29362f',
    'page-type': 'contact-us',
    'contact-email': 'support@nishitascreation.com',
    'contact-phone': '+8801234567890',
    'business-hours': 'Mon-Sat 10AM-10PM, Sun 10AM-6PM',
    'address-locality': 'Jashore',
    'address-region': 'Khulna',
    'address-country': 'BD',
    'product-categories': 'Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet, Dupatta, Deshi Collection',
    'authenticity': '100% Original Handmade Products',
    'craft-consultation': 'Available via Chat & Phone',
    'customer-care-type': 'Craft Experts Support',
    'quality-guarantee': '100% Original Handmade Products Guaranteed',
    'service-available': 'Product Support, Authenticity Check, Product Exchange, Craft Consultation, Fabric Care Advice',
    'craft-techniques': 'Hand Block Print, Batik Print, Applique Work, Hand Embroidery',
    'fabric-types': 'Cotton, Handloom Cotton, Soft Cotton, Muslin, Khadi',
    'origin': 'Jashore, Khulna, Bangladesh',
    'artisan-info': 'Made by skilled local artisans in our own factory',
    'care-instructions': 'Hand Wash Recommended, Do Not Bleach, Dry in Shade',
    'color-options': 'Traditional, Natural, Earthy, Vibrant, Pastel Tones',
    'occasion': 'Daily Wear, Eid, Puja, Wedding, Casual, Party, Office',
    'return-policy': '7 Days Return Policy',
    'free-delivery': 'Free delivery over 3000 BDT',
    'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'size-options': 'Free Size, Unstitched, Custom Fit Available',
    'special-features': 'Own Factory, Skilled Artisans, Traditional Craft, Handmade, Authentic Deshi Products',
    'craft-benefits': 'Authentic, Handmade, Traditional, Skin-Friendly, Breathable Fabrics',
  },
};

// Generate JSON-LD structured data
export const generateJsonLd = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${BASE_URL}/contact`,
    name: "Contact Nishita's Creation - Customer Support",
    description: "Contact Nishita's Creation customer support for questions about Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, orders, delivery, or product authenticity.",
    url: `${BASE_URL}/contact`,
    inLanguage: 'en',
    about: {
      '@type': 'Thing',
      name: 'Handicraft & Deshi Products Customer Support',
      description: 'Support for Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet, and traditional Bangladeshi crafts'
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
          name: 'Contact Us',
          item: `${BASE_URL}/contact`
        }
      ]
    },
    mainEntity: {
      '@type': 'Organization',
      name: "Nishita's Creation Bangladesh",
      url: BASE_URL,
      email: 'support@nishitascreation.com',
      telephone: '+8801234567890',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jashore Sadar',
        addressLocality: 'Jashore',
        addressRegion: 'Khulna',
        postalCode: '7400',
        addressCountry: 'BD'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+8801234567890',
        contactType: 'customer service',
        availableLanguage: ['English', 'Bengali'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '10:00',
          closes: '22:00'
        }
      },
      sameAs: [
        'https://facebook.com/nishitascreationbd',
        'https://instagram.com/nishitascreation.bd',
        'https://twitter.com/NishitasCreation',
        'https://pinterest.com/nishitascreationbd',
        'https://youtube.com/nishitascreationbd',
        'https://tiktok.com/@nishitascreationbd'
      ],
      openingHours: ['Mo-Sa 10:00-22:00', 'Su 10:00-18:00']
    }
  };
};

// Server component with Suspense
export default function ContactPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<ContactLoading />}>
        <ContactClient />
      </Suspense>
    </>
  );
}