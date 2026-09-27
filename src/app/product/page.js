// // app/product/page.js
// import { Suspense } from 'react';
// import ProductClient from './ProductClient';

// // Loading fallback component for Beauty Bucket product page
// function ProductLoading() {
//   return (
//     <div className="min-h-screen bg-[#FFF5F6]">
//       <div className="container mx-auto px-3 sm:px-4 max-w-7xl py-4 sm:py-8 mt-16">
//         <div className="animate-pulse">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
//             {/* Image Skeleton */}
//             <div>
//               <div className="bg-gradient-to-br from-[#FFF5F6] to-[#EE4275]/20 rounded-2xl h-64 sm:h-80 md:h-96"></div>
//               <div className="flex gap-2 mt-3 sm:mt-4">
//                 {[1, 2, 3, 4].map(i => (
//                   <div key={i} className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-[#EE4275]/20 rounded-lg"></div>
//                 ))}
//               </div>
//             </div>
            
//             {/* Content Skeleton */}
//             <div className="space-y-3 sm:space-y-4">
//               <div className="h-6 sm:h-8 bg-[#EE4275]/30 rounded w-3/4"></div>
//               <div className="h-4 sm:h-6 bg-[#EE4275]/20 rounded w-1/2"></div>
//               <div className="h-16 sm:h-24 bg-[#EE4275]/20 rounded"></div>
//               <div className="h-10 sm:h-12 bg-[#EE4275]/30 rounded w-full"></div>
//               <div className="flex gap-3">
//                 <div className="h-8 sm:h-10 bg-[#EE4275]/20 rounded w-24"></div>
//                 <div className="h-8 sm:h-10 bg-[#EE4275]/20 rounded w-24"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Beauty Bucket Product Details Page SEO Metadata
// export const metadata = {
//   title: "Premium Beauty Products & Cosmetics | Beauty Bucket Bangladesh",
//   description: "Discover premium skincare, makeup, fragrances, hair care, body care at Beauty Bucket. 100% authentic beauty products with quality guarantee. ✓COD ✓bKash/Nagad ✓Nationwide Delivery.",
//   keywords: [
//     // Primary
//     "beauty bucket bd",
//     "premium cosmetics store bangladesh",
//     "best beauty price bd",
//     "online beauty shop bangladesh",
//     "authentic beauty products bd",
//     "cosmetics store dhaka",
    
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
    
//     // Beauty Bucket Brand
//     "beauty bucket original price bd",
//     "beauty bucket skincare bangladesh",
//     "beauty bucket makeup price bd",
//     "beauty bucket official store",
//     "beauty bucket product review",
//     "beauty bucket authenticity bd",
//     "beauty bucket accessories",
    
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
    
//     // Shopping Intent
//     "buy cosmetics online bd",
//     "best beauty price in dhaka",
//     "authentic makeup bangladesh",
//     "original beauty products bd",
//     "cosmetics shop bangladesh",
//     "beauty store dhaka bd",
    
//     // Payment & Delivery
//     "cod beauty products bangladesh",
//     "bkash payment cosmetics",
//     "nagad beauty store",
//     "free delivery beauty dhaka",
//     "quality guarantee beauty bd",
//     "authentic cosmetics bangladesh",
    
//     // Reviews & Ratings
//     "best beauty review bd",
//     "top rated cosmetics bangladesh",
//     "customer reviews beauty",
//     "trusted beauty store",
//     "beauty rating bangladesh",
    
//     // Natural & Organic
//     "natural skincare bangladesh",
//     "organic beauty products bd",
//     "herbal cosmetics price bangladesh",
//     "vegan beauty bd",
//     "cruelty free makeup bangladesh",
//     "clean beauty products bd"
//   ],
//   openGraph: {
//     title: "Beauty Bucket - Premium Beauty Products & Cosmetics | Bangladesh's Trusted Beauty Store",
//     description: "Shop skincare, makeup, fragrances, hair care, body care & more. 100% authentic beauty products with quality guarantee. ✓COD ✓bKash/Nagad ✓Free Delivery on 3000+ BDT",
//     url: process.env.NEXT_PUBLIC_BASE_URL + '/product' || 'https://beautybucket.com.bd/product',
//     siteName: "Beauty Bucket",
//     images: [
//       {
//         url: '/product-og-beautybucket.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Beauty Bucket - Premium Beauty Products and Cosmetics in Bangladesh',
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
//     title: "Beauty Bucket - Premium Beauty Products & Cosmetics",
//     description: "Discover premium skincare, makeup, fragrances, hair care, and body care. 100% authentic beauty products with quality guarantee.",
//     images: ['/product-twitter-beautybucket.jpg'],
//   },
//   alternates: {
//     canonical: '/product',
//     languages: {
//       'en': '/product',
//       'bn': '/bn/product',
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
//   // Additional metadata for product pages
//   other: {
//     'application-name': 'Beauty Bucket Products',
//     'msapplication-TileColor': '#EE4275',
//     'theme-color': '#EE4275',
//     'page-type': 'product-details',
//     'product-category': 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Beauty Accessories, Natural Beauty, K-Beauty',
//     'authenticity': '100% Genuine Beauty Products',
//     'quality-guarantee': '100% Authentic Products Guaranteed',
//     'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
//     'delivery-time': '1-3 Business Days',
//     'free-delivery': 'Orders over 3000 BDT',
    
//     // Product Specifications
//     'brands-available': 'L\'Oréal, Maybelline, NYX, MAC, Estée Lauder, Clinique, Kiehl\'s, The Ordinary, Cosrx, Innisfree, Laneige, Nivea, Pond\'s, Garnier, Vaseline',
//     'skin-types': 'All Skin Types, Dry Skin, Oily Skin, Combination Skin, Sensitive Skin, Acne-Prone Skin, Mature Skin',
//     'ingredients': 'Vitamin C, Hyaluronic Acid, Retinol, Niacinamide, Salicylic Acid, Glycolic Acid, Ceramides, Peptides, Squalane, Rosehip Oil, Shea Butter, Aloe Vera',
//     'beauty-concerns': 'Acne, Aging, Hyperpigmentation, Dryness, Dullness, Fine Lines, Wrinkles, Dark Spots, Uneven Skin Tone',
//     'safety-features': 'Dermatologically Tested, Hypoallergenic, Non-Comedogenic, Fragrance Free (Options Available), Paraben Free (Options Available)',
//     'ethical-features': 'Cruelty Free Options, Vegan Options, Eco-Friendly Packaging Options',
//     'certification': 'ISO, GMP Certified',
    
//     // Customer Service
//     'customer-support': 'support@beautybucket.com',
//     'support-hours': '10:00 AM - 10:00 PM (Everyday)',
//     'return-policy': '7 Days Return Policy',
//     'satisfaction-guarantee': '100% Satisfaction Guarantee',
    
//     // Product Features
//     'shades-available': 'Fair to Deep Skin Tones',
//     'texture-types': 'Cream, Gel, Serum, Oil, Balm, Powder, Liquid, Stick',
//     'formulation-types': 'Water-based, Oil-based, Silicone-based, Hybrid',
//     'finish-types': 'Matte, Dewy, Satin, Natural, Glow, Shimmer, Metallic',
//     'coverage-levels': 'Sheer, Light, Medium, Full, Buildable',
//     'skin-benefits': 'Hydrating, Brightening, Anti-Aging, Soothing, Calming, Firming, Plumping',
//   },
// };

// // Generate JSON-LD structured data for Product page
// export const generateJsonLd = () => {
//   return {
//     '@context': 'https://schema.org',
//     '@graph': [
//       {
//         '@type': 'WebPage',
//         '@id': process.env.NEXT_PUBLIC_BASE_URL + '/product' || 'https://beautybucket.com.bd/product',
//         name: 'Product Details - Beauty Bucket',
//         description: 'View detailed information about our premium beauty products, cosmetics, and skincare.',
//         url: process.env.NEXT_PUBLIC_BASE_URL + '/product' || 'https://beautybucket.com.bd/product',
//         inLanguage: 'en',
//         breadcrumb: {
//           '@type': 'BreadcrumbList',
//           itemListElement: [
//             {
//               '@type': 'ListItem',
//               position: 1,
//               name: 'Home',
//               item: process.env.NEXT_PUBLIC_BASE_URL || 'https://beautybucket.com.bd'
//             },
//             {
//               '@type': 'ListItem',
//               position: 2,
//               name: 'Products',
//               item: process.env.NEXT_PUBLIC_BASE_URL + '/products' || 'https://beautybucket.com.bd/products'
//             },
//             {
//               '@type': 'ListItem',
//               position: 3,
//               name: 'Product Details',
//               item: process.env.NEXT_PUBLIC_BASE_URL + '/product' || 'https://beautybucket.com.bd/product'
//             }
//           ]
//         }
//       },
//       {
//         '@type': 'Product',
//         '@id': process.env.NEXT_PUBLIC_BASE_URL + '/product#product' || 'https://beautybucket.com.bd/product#product',
//         name: 'Beauty Bucket Premium Beauty Products & Cosmetics',
//         description: 'High-quality skincare, makeup, fragrances, hair care, and body care products. 100% authentic beauty products with quality guarantee.',
//         brand: {
//           '@type': 'Brand',
//           name: 'Beauty Bucket'
//         },
//         offers: {
//           '@type': 'AggregateOffer',
//           priceCurrency: 'BDT',
//           priceSpecification: {
//             '@type': 'PriceSpecification',
//             minPrice: '200',
//             maxPrice: '20000',
//             priceCurrency: 'BDT',
//           },
//           availability: 'https://schema.org/InStock',
//           seller: {
//             '@type': 'Organization',
//             name: 'Beauty Bucket Bangladesh'
//           }
//         },
//         aggregateRating: {
//           '@type': 'AggregateRating',
//           ratingValue: '4.9',
//           reviewCount: '500+',
//           bestRating: '5',
//           worstRating: '1'
//         },
//         review: {
//           '@type': 'Review',
//           reviewRating: {
//             '@type': 'Rating',
//             ratingValue: '4.9',
//             bestRating: '5'
//           },
//           author: {
//             '@type': 'Person',
//             name: 'Verified Customer'
//           },
//           reviewBody: 'Amazing quality beauty products! The skincare transformed my skin. Highly recommend Beauty Bucket!'
//         },
//         additionalProperty: [
//           {
//             '@type': 'PropertyValue',
//             name: 'Product Categories',
//             value: 'Skincare, Makeup, Fragrances, Hair Care, Body Care, Beauty Accessories, Natural Beauty, K-Beauty'
//           },
//           {
//             '@type': 'PropertyValue',
//             name: 'Brands Available',
//             value: 'L\'Oréal, Maybelline, NYX, MAC, Estée Lauder, Clinique, Kiehl\'s, The Ordinary, Cosrx, Innisfree, Laneige, Nivea, Pond\'s, Garnier, Vaseline'
//           },
//           {
//             '@type': 'PropertyValue',
//             name: 'Skin Types',
//             value: 'All Skin Types, Dry Skin, Oily Skin, Combination Skin, Sensitive Skin, Acne-Prone Skin, Mature Skin'
//           },
//           {
//             '@type': 'PropertyValue',
//             name: 'Key Ingredients',
//             value: 'Vitamin C, Hyaluronic Acid, Retinol, Niacinamide, Salicylic Acid, Glycolic Acid, Ceramides, Peptides, Squalane, Rosehip Oil, Shea Butter, Aloe Vera'
//           },
//           {
//             '@type': 'PropertyValue',
//             name: 'Beauty Concerns',
//             value: 'Acne, Aging, Hyperpigmentation, Dryness, Dullness, Fine Lines, Wrinkles, Dark Spots, Uneven Skin Tone'
//           },
//           {
//             '@type': 'PropertyValue',
//             name: 'Quality Guarantee',
//             value: '100% Authentic Products Guaranteed'
//           },
//           {
//             '@type': 'PropertyValue',
//             name: 'Ethical Features',
//             value: 'Cruelty Free Options, Vegan Options, Eco-Friendly Packaging Options'
//           },
//           {
//             '@type': 'PropertyValue',
//             name: 'Skin Safety',
//             value: 'Dermatologically Tested, Hypoallergenic, Non-Comedogenic, Fragrance Free (Options Available), Paraben Free (Options Available)'
//           }
//         ]
//       },
//       {
//         '@type': 'FAQPage',
//         '@id': process.env.NEXT_PUBLIC_BASE_URL + '/product#faq' || 'https://beautybucket.com.bd/product#faq',
//         mainEntity: [
//           {
//             '@type': 'Question',
//             name: 'Are Beauty Bucket products authentic?',
//             acceptedAnswer: {
//               '@type': 'Answer',
//               text: 'Yes, all Beauty Bucket products are 100% authentic and come with a quality guarantee. We source directly from authorized distributors and official brands.'
//             }
//           },
//           {
//             '@type': 'Question',
//             name: 'What types of products does Beauty Bucket sell?',
//             acceptedAnswer: {
//               '@type': 'Answer',
//               text: 'Beauty Bucket sells premium skincare, makeup, fragrances, hair care, body care, and beauty accessories from top brands including L\'Oréal, Maybelline, NYX, MAC, Estée Lauder, The Ordinary, Cosrx, and many more.'
//             }
//           },
//           {
//             '@type': 'Question',
//             name: 'Are Beauty Bucket products suitable for all skin types?',
//             acceptedAnswer: {
//               '@type': 'Answer',
//               text: 'Yes, Beauty Bucket offers products for all skin types including dry, oily, combination, sensitive, and acne-prone skin. We also have options for mature skin and specific skin concerns.'
//             }
//           },
//           {
//             '@type': 'Question',
//             name: 'What payment methods do you accept?',
//             acceptedAnswer: {
//               '@type': 'Answer',
//               text: 'We accept Cash on Delivery, bKash, Nagad, Rocket, and Credit Card payments for your convenience.'
//             }
//           },
//           {
//             '@type': 'Question',
//             name: 'What is the delivery time for beauty products?',
//             acceptedAnswer: {
//               '@type': 'Answer',
//               text: 'Products are delivered within 1-3 business days across Bangladesh. Free delivery is available for orders over 3000 BDT.'
//             }
//           },
//           {
//             '@type': 'Question',
//             name: 'Do you have cruelty-free and vegan beauty options?',
//             acceptedAnswer: {
//               '@type': 'Answer',
//               text: 'Yes, Beauty Bucket offers a wide selection of cruelty-free and vegan beauty products. You can find these clearly labeled in our product descriptions.'
//             }
//           }
//         ]
//       }
//     ]
//   };
// };

// // Server component with Suspense
// export default function ProductPage() {
//   // Generate JSON-LD
//   const jsonLd = generateJsonLd();
  
//   return (
//     <>
//       {/* JSON-LD Structured Data */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//       />
//       <Suspense fallback={<ProductLoading />}>
//         <ProductClient />
//       </Suspense>
//     </>
//   );
// }

// app/product/page.js
import { Suspense } from 'react';
import ProductClient from './ProductClient';

// Loading fallback component for Nishita's Creation product page
function ProductLoading() {
  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl py-4 sm:py-8 mt-16">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            {/* Image Skeleton */}
            <div>
              <div className="bg-gradient-to-br from-[#f7f4ef] to-[#A8B8A0]/30 rounded-2xl h-64 sm:h-80 md:h-96"></div>
              <div className="flex gap-2 mt-3 sm:mt-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 sm:w-14 sm:h-14 md:w-20 md:h-20 bg-[#29362f]/15 rounded-lg"></div>
                ))}
              </div>
            </div>
            
            {/* Content Skeleton */}
            <div className="space-y-3 sm:space-y-4">
              <div className="h-6 sm:h-8 bg-[#29362f]/25 rounded w-3/4"></div>
              <div className="h-4 sm:h-6 bg-[#5a6660]/20 rounded w-1/2"></div>
              <div className="h-16 sm:h-24 bg-[#5a6660]/15 rounded"></div>
              <div className="h-10 sm:h-12 bg-[#29362f]/20 rounded w-full"></div>
              <div className="flex gap-3">
                <div className="h-8 sm:h-10 bg-[#29362f]/15 rounded w-24"></div>
                <div className="h-8 sm:h-10 bg-[#29362f]/15 rounded w-24"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Nishita's Creation Product Details Page SEO Metadata
export const metadata = {
  title: "Authentic Batik, Block Print & Applique Products | Nishita's Creation Bangladesh",
  description: "Discover authentic Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti & deshi products at Nishita's Creation. 100% original handmade products from our own factory in Jashore. ✓COD ✓bKash/Nagad ✓Nationwide Delivery.",
  keywords: [
    // Primary
    "nishitas creation bd",
    "batik store bangladesh",
    "block print shop bd",
    "handicraft store bangladesh",
    "authentic batik products bd",
    "deshi products store jashore",
    
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
    
    // Nishita's Creation Brand
    "nishitas creation original price bd",
    "nishitas creation batik bangladesh",
    "nishitas creation block print bd",
    "nishitas creation official store",
    "nishitas creation product review",
    "nishitas creation authenticity bd",
    "nishitas creation handicraft",
    
    // Shopping Intent
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
    "quality guarantee handicraft bd",
    "authentic batik bangladesh",
    
    // Reviews & Ratings
    "best batik review bd",
    "top rated handicraft bangladesh",
    "customer reviews batik",
    "trusted handicraft store",
    "batik rating bangladesh",
    
    // Cultural & Traditional
    "bangladeshi traditional textile",
    "bengali batik craft",
    "deshi fashion bangladesh",
    "traditional bengali dress bd",
    "heritage textile bangladesh",
    "artisan made deshi products",
    "handmade deshi dress bd",
    "eid collection bangladesh",
    "puja collection bd"
  ],
  openGraph: {
    title: "Nishita's Creation - Authentic Batik, Block Print & Handicraft Products | Bangladesh's Trusted Store",
    description: "Shop Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti & deshi products. 100% original handmade products from our own factory in Jashore. ✓COD ✓bKash/Nagad ✓Free Delivery on 3000+ BDT",
    url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com') + '/product',
    siteName: "Nishita's Creation",
    images: [
      {
        url: '/product-og-nishitas-creation.jpg',
        width: 1200,
        height: 630,
        alt: "Nishita's Creation - Authentic Batik, Block Print & Applique Handicraft Products in Bangladesh",
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
    title: "Nishita's Creation - Authentic Batik, Block Print & Handicraft Products",
    description: "Discover authentic Batik, Block Print, Applique, Saree, Three Piece & Panjabi. 100% original handmade products from Jashore.",
    images: ['/product-twitter-nishitas-creation.jpg'],
  },
  alternates: {
    canonical: '/product',
    languages: {
      'en': '/product',
      'bn': '/bn/product',
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
  // Additional metadata for product pages
  other: {
    'application-name': "Nishita's Creation Products",
    'msapplication-TileColor': '#29362f',
    'theme-color': '#29362f',
    'page-type': 'product-details',
    'product-category': 'Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet, Dupatta, Deshi Collection',
    'authenticity': '100% Original Handmade Products',
    'quality-guarantee': '100% Original Handmade Products Guaranteed',
    'payment-methods': 'Cash on Delivery, bKash, Nagad, Rocket, Credit Card',
    'delivery-time': '1-3 Business Days',
    'free-delivery': 'Orders over 3000 BDT',
    
    // Craft Specifications
    'craft-techniques': 'Hand Block Print, Batik Print, Applique Work, Hand Embroidery',
    'fabric-types': 'Cotton, Handloom Cotton, Soft Cotton, Muslin, Khadi',
    'origin': 'Jashore, Khulna, Bangladesh',
    'artisan-info': 'Made by skilled local artisans in our own factory',
    'care-instructions': 'Hand Wash Recommended, Do Not Bleach, Dry in Shade',
    'color-options': 'Traditional, Natural, Earthy, Vibrant, Pastel Tones',
    'size-options': 'Free Size, Unstitched, Custom Fit Available',
    'occasion': 'Daily Wear, Eid, Puja, Wedding, Casual, Party, Office',
    'certification': 'Own Factory Production, Artisan Craftsmanship',
    
    // Customer Service
    'customer-support': 'support@nishitascreation.com',
    'support-hours': '10:00 AM - 10:00 PM (Everyday)',
    'return-policy': '7 Days Return Policy',
    'satisfaction-guarantee': '100% Satisfaction Guarantee',
    
    // Product Features
    'craft-benefits': 'Authentic, Handmade, Traditional, Skin-Friendly, Breathable Fabrics',
    'fabric-benefits': 'Breathable, Natural, Comfortable, Durable',
    'handmade-quality': 'Handmade Quality Assurance Records',
    'special-features': 'Own Factory, Skilled Artisans, Traditional Craft, Handmade, Authentic Deshi Products',
  },
};

// Generate JSON-LD structured data for Product page
export const generateJsonLd = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://nishitascreation.com';
  
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${BASE_URL}/product`,
        name: "Product Details - Nishita's Creation",
        description: 'View detailed information about our authentic Batik, Block Print, Applique & deshi products.',
        url: `${BASE_URL}/product`,
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
              name: 'Products',
              item: `${BASE_URL}/products`
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'Product Details',
              item: `${BASE_URL}/product`
            }
          ]
        }
      },
      {
        '@type': 'Product',
        '@id': `${BASE_URL}/product#product`,
        name: "Nishita's Creation Authentic Handicraft Products",
        description: 'High-quality Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti & traditional Bangladeshi handicraft products. 100% original handmade with quality guarantee.',
        brand: {
          '@type': 'Brand',
          name: "Nishita's Creation"
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'BDT',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: '300',
            maxPrice: '15000',
            priceCurrency: 'BDT',
          },
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: "Nishita's Creation Bangladesh"
          }
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '500+',
          bestRating: '5',
          worstRating: '1'
        },
        review: {
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: '4.9',
            bestRating: '5'
          },
          author: {
            '@type': 'Person',
            name: 'Verified Customer'
          },
          reviewBody: 'Amazing quality handicraft products! The Batik saree is beautiful and the craftsmanship is excellent. Highly recommend Nishita\'s Creation!'
        },
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Product Categories',
            value: 'Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet, Dupatta, Deshi Collection'
          },
          {
            '@type': 'PropertyValue',
            name: 'Craft Techniques',
            value: 'Hand Block Print, Batik Print, Applique Work, Hand Embroidery'
          },
          {
            '@type': 'PropertyValue',
            name: 'Fabric Types',
            value: 'Cotton, Handloom Cotton, Soft Cotton, Muslin, Khadi'
          },
          {
            '@type': 'PropertyValue',
            name: 'Origin',
            value: 'Jashore, Khulna, Bangladesh'
          },
          {
            '@type': 'PropertyValue',
            name: 'Artisan Info',
            value: 'Made by skilled local artisans in our own factory'
          },
          {
            '@type': 'PropertyValue',
            name: 'Care Instructions',
            value: 'Hand Wash Recommended, Do Not Bleach, Dry in Shade'
          },
          {
            '@type': 'PropertyValue',
            name: 'Quality Guarantee',
            value: '100% Original Handmade Products Guaranteed'
          },
          {
            '@type': 'PropertyValue',
            name: 'Occasion',
            value: 'Daily Wear, Eid, Puja, Wedding, Casual, Party, Office'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': `${BASE_URL}/product#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: "Are Nishita's Creation products authentic?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Yes, all Nishita's Creation products are 100% original handmade products made in our own factory by skilled local artisans in Jashore, Bangladesh."
            }
          },
          {
            '@type': 'Question',
            name: "What types of products does Nishita's Creation sell?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "Nishita's Creation sells authentic Batik, Block Print, Applique, Saree, Three Piece, Panjabi, Kurti, Bedsheet, Dupatta & deshi products. All products are handmade with traditional Bangladeshi craft techniques."
            }
          },
          {
            '@type': 'Question',
            name: "What fabrics are used in Nishita's Creation products?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "We use high-quality cotton, handloom cotton, soft cotton, muslin, and khadi fabrics. All fabrics are skin-friendly and breathable for comfortable wear."
            }
          },
          {
            '@type': 'Question',
            name: 'What payment methods do you accept?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We accept Cash on Delivery, bKash, Nagad, Rocket, and Credit Card payments for your convenience.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the delivery time for handicraft products?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Products are delivered within 1-3 business days across Bangladesh. Free delivery is available for orders over 3000 BDT.'
            }
          },
          {
            '@type': 'Question',
            name: 'How should I care for my Batik or Block Print products?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We recommend hand washing with mild detergent, do not bleach, and dry in shade to preserve the colors and fabric quality of your handmade products.'
            }
          }
        ]
      }
    ]
  };
};

// Server component with Suspense
export default function ProductPage() {
  // Generate JSON-LD
  const jsonLd = generateJsonLd();
  
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<ProductLoading />}>
        <ProductClient />
      </Suspense>
    </>
  );
}