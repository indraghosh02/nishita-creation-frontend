
// // app/products/page.js
// import { Suspense } from 'react';
// import ProductsClient from './ProductsClient';

// // Loading fallback for Beauty Bucket products page
// function ProductsLoading() {
//   return (
//     <div className="min-h-screen bg-[#f7f4ef]">
//       <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
//         {/* Loading Skeleton - Beauty Bucket themed */}
//         <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
//           {[...Array(12)].map((_, index) => (
//             <div key={index} className="bg-white rounded-xl border border-[#e2e3dd]/60 overflow-hidden animate-pulse shadow-sm hover:shadow-md transition-shadow">
//               <div className="h-32 sm:h-40 bg-gradient-to-br from-[#f7f4ef] to-[#52665a]/20"></div>
//               <div className="p-2 sm:p-3">
//                 <div className="h-3 sm:h-4 bg-[#52665a]/30 rounded mb-2 w-3/4"></div>
//                 <div className="h-5 sm:h-6 bg-[#52665a]/30 rounded mb-2 w-1/2"></div>
//                 <div className="h-2 sm:h-3 bg-[#52665a]/20 rounded mb-2"></div>
//                 <div className="h-6 sm:h-8 bg-[#29362f]/20 rounded"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Beauty Bucket - Premium Beauty & Cosmetics SEO Metadata
// export const metadata = {
//   title: "Shop All Premium Beauty Products & Cosmetics | Skincare, Makeup, Fragrances & More",
//   description: "Browse 100+ premium beauty products at Beauty Bucket Bangladesh. ✓ Skincare ✓ Makeup ✓ Fragrances ✓ Hair Care ✓ Body Care. 100% authentic with COD & bKash/Nagad payment.",
//   keywords: [
//     // Primary keywords
//     "buy beauty products online bangladesh",
//     "premium cosmetics shop dhaka",
//     "beauty bucket products",
//     "best beauty store bd",
//     "online cosmetics store bangladesh",
//     "beauty product price in bd",
    
//     // Skincare
//     "skincare products bangladesh",
//     "best skincare routine bd",
//     "face cream price bangladesh",
//     "serum price bd",
//     "vitamin c serum bangladesh",
//     "hyaluronic acid serum bd",
//     "sunscreen price bangladesh",
//     "moisturizer price bd",
//     "face wash price bangladesh",
//     "toner price bd",
//     "eye cream bangladesh",
//     "retinol serum bd",
//     "niacinamide serum price bangladesh",
//     "face mask price bd",
//     "sheet mask bangladesh",
//     "glycolic acid toner bd",
//     "salicylic acid serum bangladesh",
//     "alpha arbutin serum bd",
//     "peptide serum bangladesh",
//     "ceramide moisturizer bd",
//     "squalane oil bangladesh",
//     "rosehip oil price bd",
//     "jade roller bangladesh",
//     "gua sha tool bd",
//     "under eye patches bangladesh",
    
//     // Makeup
//     "makeup products bangladesh",
//     "foundation price bd",
//     "concealer price bangladesh",
//     "lipstick price bd",
//     "liquid lipstick bangladesh",
//     "mascara price bd",
//     "eyeshadow palette bangladesh",
//     "kajal price bd",
//     "eyeliner price bangladesh",
//     "blush price bd",
//     "highlighter bangladesh",
//     "bronzer price bd",
//     "setting spray bangladesh",
//     "makeup brushes bd",
//     "primer price bangladesh",
//     "bb cream bangladesh",
//     "cc cream price bd",
//     "compact powder bangladesh",
//     "loose powder price bd",
//     "makeup remover bangladesh",
//     "micellar water bd",
//     "eyebrow pencil price bangladesh",
//     "lip liner bd",
//     "lip gloss price bangladesh",
//     "matte lipstick bd",
//     "creamy lipstick bangladesh",
//     "tinted moisturizer bd",
//     "face palette bangladesh",
    
//     // Fragrances
//     "perfume price in bangladesh",
//     "women perfume bd",
//     "men perfume price bangladesh",
//     "attar price bd",
//     "fragrance oil bangladesh",
//     "body mist price bd",
//     "deodorant price bangladesh",
//     "luxury perfume bd",
//     "designer perfume bangladesh",
//     "niche fragrance bd",
//     "perfume gift set bangladesh",
//     "travel size perfume bd",
//     "oud perfume price bangladesh",
//     "fruity fragrance bd",
//     "floral perfume bangladesh",
//     "woody fragrance bd",
//     "fresh perfume bangladesh",
//     "oriental fragrance bd",
//     "unisex perfume bd",
//     "perfume oil bangladesh",
    
//     // Hair Care
//     "hair care products bangladesh",
//     "shampoo price bd",
//     "conditioner price bangladesh",
//     "hair serum bd",
//     "hair oil price bangladesh",
//     "hair mask bd",
//     "hair spray price bangladesh",
//     "dry shampoo bangladesh",
//     "hair growth serum bd",
//     "scalp scrub bangladesh",
//     "leave in conditioner bd",
//     "heat protectant spray bangladesh",
//     "hair tonic price bd",
//     "anti dandruff shampoo bangladesh",
//     "color protect shampoo bd",
//     "volume shampoo bangladesh",
//     "silk serum bd",
//     "hair butter bangladesh",
//     "curl cream price bd",
//     "edge control gel bangladesh",
    
//     // Body Care
//     "body lotion price bangladesh",
//     "body scrub bd",
//     "body wash price bangladesh",
//     "body butter bangladesh",
//     "hand cream price bd",
//     "foot cream bangladesh",
//     "body oil bangladesh",
//     "body mist price bd",
//     "body serum bangladesh",
//     "body exfoliator bd",
//     "body moisturizer bangladesh",
//     "after sun lotion bd",
//     "tinted body lotion bangladesh",
//     "firming cream bd",
//     "stretch mark cream bangladesh",
    
//     // Natural & Organic
//     "natural skincare bangladesh",
//     "organic beauty products bd",
//     "herbal cosmetics price bangladesh",
//     "vegan beauty bd",
//     "cruelty free makeup bangladesh",
//     "clean beauty products bd",
//     "organic face cream bangladesh",
//     "natural makeup bd",
//     "chemical free skincare bangladesh",
//     "eco friendly beauty bd",
//     "sustainable beauty bangladesh",
//     "plant based cosmetics bd",
//     "botanical skincare bangladesh",
//     "natural hair care bd",
//     "organic lip balm bangladesh",
    
//     // Beauty Accessories
//     "beauty accessories bangladesh",
//     "makeup sponge bd",
//     "beauty blender price bangladesh",
//     "makeup bag bd",
//     "mirror price bangladesh",
//     "beauty tools bd",
//     "makeup brush set bangladesh",
//     "beauty organizer bd",
//     "vanity mirror bangladesh",
//     "travel makeup bag bd",
//     "beauty blender cleanser bangladesh",
    
//     // K-Beauty & Trends
//     "korean skincare bangladesh",
//     "k beauty products bd",
//     "korean makeup bangladesh",
//     "glass skin routine bd",
//     "korean face mask bangladesh",
//     "korean toner bd",
//     "korean serum bangladesh",
//     "korean moisturizer bd",
//     "korean sunscreen bangladesh",
//     "japanese skincare bd",
//     "j beauty products bangladesh",
//     "japanese toner bd",
    
//     // Shopping intent
//     "buy cosmetics online bd",
//     "best beauty deals dhaka",
//     "premium beauty bangladesh",
//     "authentic makeup bd",
//     "gift beauty sets bangladesh",
//     "beauty gifts for her",
//     "luxury cosmetics bd",
//     "beauty shop near me",
//     "cosmetics store bd",
//     "trusted beauty store bangladesh",
    
//     // Payment & Delivery
//     "cod beauty products bangladesh",
//     "bkash payment cosmetics",
//     "nagad beauty store",
//     "free delivery beauty dhaka",
//     "authentic products bd",
//     "trusted cosmetics store",
//     "100% original beauty bd",
//     "brand warranty cosmetics",
//     "genuine makeup bangladesh",
    
//     // Trending
//     "best beauty products 2024 bangladesh",
//     "latest makeup bd",
//     "new skincare bangladesh",
//     "top beauty products 2025 bd",
//     "premium beauty bangladesh",
//     "best value beauty products",
//     "beauty haul bangladesh",
//     "skincare routine bd",
//     "makeup tutorial products bd",
    
//     // Brands
//     "loreal products bangladesh",
//     "maybelline cosmetics bd",
//     "nyx makeup bangladesh",
//     "mac cosmetics bd",
//     "estee lauder bangladesh",
//     "clinique products bd",
//     "kiels bangladesh",
//     "the ordinary serums bd",
//     "cosrx skincare bangladesh",
//     "innisfree products bd",
//     "laneige bangladesh",
//     "nivea beauty bd",
//     "ponds products bangladesh",
//     "garnier skincare bd",
//     "vaseline beauty products bangladesh"
//   ],
//   openGraph: {
//     title: "Beauty Bucket Products - Bangladesh's Premium Collection of Beauty & Cosmetics",
//     description: "Shop premium skincare, makeup, fragrances, hair care, body care & beauty accessories. 100% authentic products with free delivery across Bangladesh. COD and bKash/Nagad accepted.",
//     url: process.env.NEXT_PUBLIC_BASE_URL + '/products' || 'https://beautybucket.com.bd/products',
//     siteName: "Beauty Bucket",
//     images: [
//       {
//         url: '/products-og-beautybucket.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Beauty Bucket Premium Collection - Skincare, Makeup, Fragrances, Hair Care, Body Care',
//       },
//     ],
//     type: 'website',
//     locale: 'en_BD',
//     alternateLocale: ['bn_BD'],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     site: '@BeautyBucketBD',
//     creator: '@BeautyBucketBD',
//     title: "Beauty Bucket Products - Premium Beauty & Cosmetics in Bangladesh",
//     description: "Shop 100+ premium beauty products, skincare, makeup, fragrances. 100% authentic. COD & bKash/Nagad available.",
//     images: ['/products-twitter-beautybucket.jpg'],
//   },
//   alternates: {
//     canonical: '/products',
//     languages: {
//       'en': '/products',
//       'bn': '/bn/products',
//     },
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-snippet': -1,
//       'max-image-preview': 'large',
//       'max-video-preview': -1,
//     },
//   },
//   // Additional metadata for better SEO
//   other: {
//     'application-name': 'Beauty Bucket Products',
//     'msapplication-TileColor': '#52665a',
//     'theme-color': '#52665a',
//     'price-range': '200-20000 BDT',
//     'target-audience': 'Beauty Enthusiasts, Skincare Lovers, Makeup Artists, Women, Men, Teenagers, Professionals',
//     'product-category': 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Beauty Accessories, Natural Beauty, K-Beauty',
//     'authenticity': '100% Authentic Products',
//     'return-policy': '7 Days Return Policy',
//     'product-types': 'Skincare Products, Makeup Products, Fragrances, Hair Care Products, Body Care Products, Beauty Accessories',
//     'condition': 'New, Original, Brand New, Sealed',
//     'brands-available': 'L\'Oréal, Maybelline, NYX, MAC, Estée Lauder, Clinique, Kiehl\'s, The Ordinary, Cosrx, Innisfree, Laneige, Nivea, Pond\'s, Garnier, Vaseline',
//     'skin-types': 'All Skin Types, Dry Skin, Oily Skin, Combination Skin, Sensitive Skin, Acne-Prone Skin, Mature Skin',
//     'ingredients': 'Vitamin C, Hyaluronic Acid, Retinol, Niacinamide, Salicylic Acid, Glycolic Acid, Ceramides, Peptides, Squalane, Rosehip Oil, Shea Butter, Aloe Vera',
//     'beauty-concerns': 'Acne, Aging, Hyperpigmentation, Dryness, Dullness, Fine Lines, Wrinkles, Dark Spots, Uneven Skin Tone',
//     'safety-features': 'Dermatologically Tested, Hypoallergenic, Non-Comedogenic, Fragrance Free (Options Available), Paraben Free (Options Available)',
//     'ethical-features': 'Cruelty Free Options, Vegan Options, Eco-Friendly Packaging Options',
//     'warranty': '100% Genuine Products Guaranteed',
//     'shades-available': 'Fair to Deep Skin Tones',
//     'texture-types': 'Cream, Gel, Serum, Oil, Balm, Powder, Liquid, Stick',
//   },
// };

// // Server component with Suspense for Beauty Bucket products page
// export default function ProductsPage() {
//   return (
//     <Suspense fallback={<ProductsLoading />}>
//       <ProductsClient />
//     </Suspense>
//   );
// }


// app/products/page.js
import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

// Loading fallback for Nishita's Creation products page
function ProductsLoading() {
  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      <div className="container mx-auto px-4 max-w-7xl py-6 md:py-8">
        {/* Loading Skeleton - Nishita's Creation themed */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl border border-[#e2e3dd]/60 overflow-hidden animate-pulse shadow-sm hover:shadow-md transition-shadow">
              <div className="h-32 sm:h-40 bg-gradient-to-br from-[#f7f4ef] to-[#A8B8A0]/30"></div>
              <div className="p-2 sm:p-3">
                <div className="h-3 sm:h-4 bg-[#29362f]/20 rounded mb-2 w-3/4"></div>
                <div className="h-5 sm:h-6 bg-[#29362f]/25 rounded mb-2 w-1/2"></div>
                <div className="h-2 sm:h-3 bg-[#5a6660]/20 rounded mb-2"></div>
                <div className="h-6 sm:h-8 bg-[#29362f]/15 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Nishita's Creation - Products SEO Metadata
export const metadata = {
  title: "Shop All Products | Batik, Block Print & Applique Collection - Saree, Three Piece, Panjabi, Kurti",
  description: "Browse authentic Batik, Block Print & Applique products at Nishita's Creation Bangladesh. ✓ Saree ✓ Three Piece ✓ Panjabi ✓ Kurti ✓ Bedsheet ✓ Deshi Collection. 100% original handmade products with COD & bKash/Nagad payment.",
  keywords: [
    // Primary keywords
    "nishitas creation products",
    "batik products bangladesh",
    "block print products bd",
    "applique products bangladesh",
    "deshi products online bd",
    "jashore handicraft products",
    "traditional deshi dress bangladesh",
    "handmade products bangladesh",
    
    // Batik
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
    "batik print three piece bangladesh",
    "batik cotton saree bd",
    
    // Block Print
    "block print saree bangladesh",
    "block printed three piece bd",
    "block print kurti bangladesh",
    "block print bedsheet bd",
    "hand block print saree bangladesh",
    "block print panjabi bd",
    "block print dupatta bangladesh",
    "block printed dress bd",
    "block print salwar kameez bd",
    "traditional block print saree bd",
    "block print cotton saree bd",
    
    // Applique
    "applique saree bangladesh",
    "applique three piece bd",
    "applique kurti bangladesh",
    "applique bedsheet bd",
    "applique cushion bangladesh",
    "handmade applique bd",
    "traditional applique bangladesh",
    "applique work saree bd",
    "applique quilt bangladesh",
    
    // Saree
    "saree price bangladesh",
    "batik saree online bd",
    "block print saree price bd",
    "cotton saree bangladesh",
    "handloom saree bd",
    "designer saree bangladesh",
    "daily wear saree bd",
    "party saree bangladesh",
    "wedding saree bd",
    "eid saree bangladesh",
    
    // Three Piece & Salwar Kameez
    "three piece price bangladesh",
    "batik three piece bd",
    "block print three piece bangladesh",
    "salwar kameez bd",
    "unstitched three piece bangladesh",
    "cotton three piece bd",
    "deshi three piece bangladesh",
    
    // Panjabi & Men's Wear
    "panjabi price bangladesh",
    "batik panjabi bd",
    "block print panjabi bangladesh",
    "cotton panjabi bd",
    "eid panjabi bangladesh",
    "men deshi dress bd",
    "deshi panjabi bangladesh",
    
    // Kurti & Women's Wear
    "kurti price bangladesh",
    "batik kurti bd",
    "block print kurti bangladesh",
    "cotton kurti bd",
    "deshi kurti bangladesh",
    "women deshi dress bd",
    
    // Bedsheet & Home Textile
    "bedsheet price bangladesh",
    "batik bedsheet bd",
    "block print bedsheet bangladesh",
    "cotton bedsheet bd",
    "deshi bedsheet bangladesh",
    "handmade bedsheet bd",
    "cushion cover bangladesh",
    "home textile bd",
    
    // Jashore/Khulna Region
    "jashore batik bangladesh",
    "jessore block print bd",
    "khulna batik saree",
    "jashore deshi products",
    "jessore traditional crafts",
    
    // Shopping intent
    "buy batik online bangladesh",
    "buy block print saree bd",
    "deshi products online bangladesh",
    "authentic batik bangladesh",
    "batik shop bd",
    "block print shop bangladesh",
    "traditional dress online bd",
    "online deshi shop bangladesh",
    
    // Payment & Delivery
    "cod deshi products bangladesh",
    "bkash payment batik bd",
    "nagad deshi store",
    "free delivery batik dhaka",
    "online deshi shop bangladesh",
    
    // Cultural & Traditional
    "bangladeshi traditional textile",
    "bengali batik craft",
    "deshi fashion bangladesh",
    "traditional bengali dress bd",
    "heritage textile bangladesh",
    "artisan made deshi products",
    "handmade deshi dress bd",
    "eid collection bangladesh",
    "puja collection bd",
    
    // Occasions & Collections
    "eid collection batik bd",
    "puja collection deshi bangladesh",
    "wedding collection batik bd",
    "daily wear deshi dress bangladesh",
    "gift deshi products bd"
  ],
  openGraph: {
    title: "Nishita's Creation Products - Batik, Block Print & Applique Collection Bangladesh",
    description: "Shop authentic Batik, Block Print & Applique Saree, Three Piece, Panjabi, Kurti, Bedsheet & Deshi Collection. 100% original products with free delivery across Bangladesh. COD and bKash/Nagad accepted.",
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com') + '/products',
    siteName: "Nishita's Creation",
    images: [
      {
        url: '/products-og-nishitas-creation.jpg',
        width: 1200,
        height: 630,
        alt: "Nishita's Creation - Batik, Block Print & Applique Collection | Saree, Three Piece, Panjabi, Kurti",
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
    title: "Nishita's Creation - Batik, Block Print & Applique Products Bangladesh",
    description: "Shop authentic Batik, Block Print & Applique Saree, Three Piece, Panjabi, Kurti. 100% original. COD & bKash/Nagad available.",
    images: ['/products-twitter-nishitas-creation.jpg'],
  },
  alternates: {
    canonical: '/products',
    languages: {
      'en': '/products',
      'bn': '/bn/products',
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
    'application-name': "Nishita's Creation Products",
    'msapplication-TileColor': '#29362f',
    'theme-color': '#29362f',
    'price-range': '300-15000 BDT',
    'target-audience': 'Deshi Product Lovers, Batik Enthusiasts, Block Print & Applique Shoppers, Men & Women in Bangladesh',
    'product-category': 'Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet, Dupatta, Deshi Collection',
    'authenticity': '100% Original Handmade Products',
    'return-policy': '7 Days Return Policy',
    'product-types': 'Batik Saree, Block Print Saree, Applique Work, Three Piece, Panjabi, Kurti, Bedsheet, Cushion Cover, Dupatta, Scarf',
    'condition': 'New, Original, Handmade, Factory Made',
    'craft-techniques': 'Hand Block Print, Batik Print, Applique Work, Hand Embroidery',
    'fabric-types': 'Cotton, Handloom Cotton, Soft Cotton, Muslin, Khadi',
    'origin': 'Jashore, Khulna, Bangladesh',
    'artisan-info': 'Made by skilled local artisans in our own factory',
    'care-instructions': 'Hand Wash Recommended, Do Not Bleach, Dry in Shade',
    'color-options': 'Traditional, Natural, Earthy, Vibrant, Pastel Tones',
    'size-options': 'Free Size, Unstitched, Custom Fit Available',
    'occasion': 'Daily Wear, Eid, Puja, Wedding, Casual, Party, Office',
    'warranty': '100% Original Deshi Products Guaranteed',
    'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'delivery-info': 'Free Delivery over 3000 BDT, Nationwide Delivery in Bangladesh',
    'special-features': 'Own Factory, Skilled Artisans, Traditional Craft, Handmade, Authentic Deshi Products',
  },
};

// Server component with Suspense for Nishita's Creation products page
export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsClient />
    </Suspense>
  );
}