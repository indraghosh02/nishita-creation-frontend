// app/videos/page.js
import { Suspense } from 'react';
import VideosClient from './VideosClient';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function VideosLoading() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f7f4ef] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto bg-[#e8e4d5] rounded-full animate-pulse mb-4" />
          <div className="h-5 w-52 bg-[#e8e4d5] rounded mx-auto animate-pulse" />
          <div className="h-3 w-72 bg-[#e8e4d5] rounded mx-auto mt-3 animate-pulse" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export const metadata = {
  title:
    "Videos & Live Sessions | Nishita's Creation - Watch Craft Tutorials, Batik & Block Print Showcases",
  description:
    "Explore Nishita's Creation's video library — Batik & Block Print tutorials, craft techniques, customer reviews, and upcoming live sessions featuring authentic Bangladeshi handicrafts from Jashore.",
  keywords: [
    // Primary video keywords
    "handicraft videos bangladesh",
    "batik video tutorials bd",
    "nishitas creation videos",
    "live handicraft sessions bd",
    "handicraft product videos bangladesh",
    "batik tutorials bangladesh",
    "block print videos bd",
    
    // Craft tutorials
    "batik making tutorial bd",
    "block print tutorial bangladesh",
    "applique video tutorial bd",
    "handicraft making video bangladesh",
    "traditional craft tutorial bd",
    "batik dyeing video bangladesh",
    "block printing techniques video bd",
    
    // Product showcases
    "batik saree showcase bd",
    "block print saree video bangladesh",
    "applique work showcase bd",
    "handicraft collection video bangladesh",
    "deshi products showcase bd",
    "traditional saree video bangladesh",
    
    // Customer reviews
    "batik review bangladesh",
    "block print review bd",
    "handicraft review video bangladesh",
    "customer testimonials bd",
    "deshi products review bangladesh",
    
    // Live sessions
    "live handicraft session bd",
    "live batik demo bangladesh",
    "live block print bd",
    "artisan live session bangladesh",
    "handicraft live stream bd",
    
    // Behind the scenes
    "behind the scenes handicraft bd",
    "artisan workshop video bangladesh",
    "batik factory tour bd",
    "handicraft making process bangladesh",
    "jashore artisan video bd",
  ],
  openGraph: {
    title: "Videos & Live Sessions | Nishita's Creation",
    description:
      'Discover Batik & Block Print tutorials, craft techniques, customer reviews, and upcoming live sessions from authentic Bangladeshi artisans.',
    url:
      (process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com') +
      '/videos',
    siteName: "Nishita's Creation",
    type: 'website',
    locale: 'en_BD',
    alternateLocale: ['bn_BD'],
    images: [
      {
        url: '/videos-og-nishitas-creation.jpg',
        width: 1200,
        height: 630,
        alt: "Videos & Live Sessions - Nishita's Creation | Batik, Block Print & Applique Tutorials",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@NishitasCreation',
    creator: '@NishitasCreation',
    title: "Videos & Live Sessions | Nishita's Creation",
    description:
      "Watch Batik & Block Print tutorials, product reviews, and join live handicraft sessions from Jashore, Bangladesh.",
    images: ['/videos-twitter-nishitas-creation.jpg'],
  },
  alternates: {
    canonical: '/videos',
    languages: {
      'en': '/videos',
      'bn': '/bn/videos',
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
    'application-name': "Nishita's Creation Videos",
    'msapplication-TileColor': '#29362f',
    'theme-color': '#29362f',
    'page-type': 'video-library',
    'content-type': 'Video Tutorials, Live Sessions, Product Showcases',
    'product-category': 'Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet, Dupatta, Deshi Collection',
    'craft-techniques': 'Hand Block Print, Batik Print, Applique Work, Hand Embroidery',
    'fabric-types': 'Cotton, Handloom Cotton, Soft Cotton, Muslin, Khadi',
    'origin': 'Jashore, Khulna, Bangladesh',
    'artisan-info': 'Made by skilled local artisans in our own factory',
    'video-topics': 'Craft Tutorials, Product Showcases, Customer Reviews, Behind the Scenes, Live Sessions',
    'special-features': 'Own Factory, Skilled Artisans, Traditional Craft, Handmade, Authentic Deshi Products',
    'language-of-instruction': 'Bengali, English',
    'target-audience': 'Craft Enthusiasts, Batik Lovers, Block Print & Applique Shoppers, Deshi Product Lovers in Bangladesh',
    'customer-support': 'support@nishitascreation.com',
    'business-hours': '10:00 AM - 10:00 PM (Everyday)',
  },
};

export default function VideosPage() {
  return (
    <Suspense fallback={<VideosLoading />}>
      <VideosClient />
    </Suspense>
  );
}