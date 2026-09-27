// app/checkout/page.js
import { Suspense } from 'react';
import CheckoutClient from './CheckoutClient';

// Import for loading state
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Loading fallback component for Checkout page - Nishita's Creation themed
function CheckoutLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f7f4ef] pt-20 sm:pt-24">
        <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-[#29362f] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// Nishita's Creation Checkout Page SEO Metadata
export const metadata = {
  title: "Secure Checkout | Complete Your Handicraft Order - Nishita's Creation Bangladesh",
  description: "Secure checkout for your authentic handicraft products at Nishita's Creation Bangladesh. ✓ Cash on Delivery ✓ bKash/Nagad ✓ Credit Card ✓ 100% Original Handmade ✓ Free delivery on orders over 3000 BDT. Complete your purchase safely.",
  keywords: [
    // Checkout specific
    "secure checkout bangladesh",
    "handicraft checkout page",
    "complete order handicraft bd",
    "nishitas creation checkout",
    "payment checkout batik",
    "secure online payment bd",
    
    // Payment methods
    "cash on delivery checkout",
    "bkash payment online bd",
    "nagad payment gateway",
    "credit card payment handicraft",
    "online payment bd",
    "mobile payment bd",
    "digital payment handicraft",
    "emi payment batik bd",
    
    // Customer info
    "shipping address bd",
    "delivery information handicraft",
    "billing details handicraft",
    "order confirmation bd",
    "buyer information bd",
    
    // Order summary
    "review order before payment",
    "batik cart checkout",
    "finalize purchase handicraft",
    "place order batik bd",
    "deshi product checkout",
    
    // Security
    "secure payment bd",
    "safe online shopping handicraft",
    "encrypted checkout",
    "ssl commerce payment",
    "secure transaction bd",
    "protected checkout bd",
    "payment security bd",
    
    // Delivery
    "free delivery on handicraft",
    "home delivery bd",
    "batik shipping charges",
    "delivery inside dhaka",
    "delivery outside dhaka",
    "express delivery handicraft",
    "same day delivery dhaka",
    
    // Coupon & discount
    "batik coupon code",
    "discount on handicraft bd",
    "promo code batik",
    "offer on handicraft purchase",
    "festival offer bd",
    
    // Trust signals
    "7 day return policy",
    "secure handicraft shopping",
    "verified checkout",
    "100% original handmade",
    "authentic products bd",
    "trusted handicraft store",
    
    // Additional
    "batik purchase bd",
    "handicraft checkout process",
    "order tracking bd",
    "invoice generation bd",
    "payment confirmation",
    "order receipt bd",
    
    // Craft-specific
    "buy batik online bd",
    "block print saree checkout",
    "applique three piece order",
    "panjabi kurti purchase bd",
    "jashore handicraft order",
    "deshi products checkout"
  ],
  openGraph: {
    title: "Secure Checkout - Nishita's Creation | Complete Your Handicraft Order",
    description: "Safe and secure checkout for your handicraft purchase. Pay with Cash on Delivery, bKash, Nagad, or Credit Card. Free delivery on orders over 3000 BDT. 100% original handmade products.",
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com') + '/checkout',
    siteName: "Nishita's Creation",
    images: [
      {
        url: '/checkout-og-nishitas-creation.jpg',
        width: 1200,
        height: 630,
        alt: "Nishita's Creation Secure Checkout - Complete Your Handicraft Order",
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
    title: "Secure Checkout | Nishita's Creation Bangladesh",
    description: "Complete your handicraft purchase securely. COD, bKash, Nagad, and Credit Card accepted. Free delivery over 3000 BDT. 100% original handmade products.",
    images: ['/checkout-twitter-nishitas-creation.jpg'],
  },
  alternates: {
    canonical: '/checkout',
    languages: {
      'en': '/checkout',
      'bn': '/bn/checkout',
    },
  },
  robots: {
    index: false,  // Checkout pages should not be indexed by search engines
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  // Additional metadata for better SEO
  other: {
    'application-name': "Nishita's Creation Checkout",
    'msapplication-TileColor': '#29362f',
    'theme-color': '#29362f',
    'page-type': 'checkout',
    'user-action': 'complete-purchase',
    'payment-methods': 'cod,bkash,nagad,credit-card',
    'secure-checkout': 'true',
    'return-policy': '7 Days Return Policy',
    'quality-guarantee': '100% Original Handmade Products',
    'delivery-estimate': '1-3 business days',
    'free-delivery-threshold': '3000 BDT',
    
    // Payment security
    'ssl-secured': 'true',
    'encryption': '256-bit SSL Encryption',
    'payment-processor': 'SSL Commerz',
    
    // Additional checkout info
    'order-tracking': 'Available',
    'invoice-format': 'Digital Invoice',
    'payment-confirmation': 'Instant Confirmation',
    'customer-support': '10:00 AM - 10:00 PM (Everyday)',
    
    // Order types
    'accepted-orders': 'Individual, Corporate, Bulk, Wholesale',
    'gift-option': 'Available',
    'tax-included': 'Yes (VAT Included)',
    
    // Craft-specific
    'product-categories': 'Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet, Dupatta, Deshi Collection',
    'craft-techniques': 'Hand Block Print, Batik Print, Applique Work, Hand Embroidery',
    'fabric-types': 'Cotton, Handloom Cotton, Soft Cotton, Muslin, Khadi',
    'origin': 'Jashore, Khulna, Bangladesh',
    'artisan-info': 'Made by skilled local artisans in our own factory',
    'occasion': 'Daily Wear, Eid, Puja, Wedding, Casual, Party, Office',
    'special-features': 'Own Factory, Skilled Artisans, Traditional Craft, Handmade, Authentic Deshi Products',
    'customer-support-email': 'support@nishitascreation.com',
  },
};

// Server component with Suspense
export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutClient />
    </Suspense>
  );
}