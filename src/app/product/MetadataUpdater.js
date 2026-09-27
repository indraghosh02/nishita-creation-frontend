'use client';

import { useEffect } from 'react';

export default function MetadataUpdater({ product }) {
  useEffect(() => {
    if (!product) return;
    
    const updateMetadata = () => {
      try {
        // Get SEO data from product metaSettings or generate fallback for Nishita's Creation
        const metaTitle = product.metaSettings?.metaTitle || 
          `${product.productName} - Authentic Handicraft | Nishita's Creation Bangladesh`;
        
        const metaDescription = product.metaSettings?.metaDescription || 
          `${product.productName} - Authentic handmade ${product.category?.name || 'handicraft'} from Nishita's Creation Bangladesh. ${product.shortDescription?.substring(0, 150) || ''} ✓100% Original Handmade ✓Own Factory in Jashore ✓Free Delivery on orders above 3000 BDT.`;
        
        const metaKeywords = product.metaSettings?.metaKeywords || [
          product.productName,
          product.category?.name,
          product.tags,
          'batik',
          'block print',
          'applique',
          'handicraft',
          'saree',
          'three piece',
          'panjabi',
          'kurti',
          'bedsheet',
          'dupatta',
          'deshi products',
          'traditional crafts',
          'handmade products',
          'jashore handicraft',
          'authentic batik',
          'block print saree',
          'bangladeshi traditional textile',
          ...(product.tags || [])
        ].flat().filter(Boolean);
        
        // Get primary image
        const primaryImage = product.images?.find(img => img.isPrimary)?.url || 
                             product.images?.[0]?.url || 
                             '/nishitas-creation-default-og.jpg';
        
        // Update document title
        document.title = metaTitle;
        
        // Helper function to update or create meta tags
        const updateOrCreateMetaTag = (name, content, isProperty = false) => {
          if (!content) return;
          
          let meta;
          if (isProperty) {
            meta = document.querySelector(`meta[property="${name}"]`);
          } else {
            meta = document.querySelector(`meta[name="${name}"]`);
          }
          
          if (meta) {
            meta.setAttribute('content', content);
          } else {
            meta = document.createElement('meta');
            if (isProperty) {
              meta.setAttribute('property', name);
            } else {
              meta.setAttribute('name', name);
            }
            meta.setAttribute('content', content);
            document.head.appendChild(meta);
          }
        };
        
        // Update basic meta tags
        updateOrCreateMetaTag('description', metaDescription);
        updateOrCreateMetaTag('keywords', Array.isArray(metaKeywords) ? metaKeywords.join(', ') : metaKeywords);
        
        // Open Graph tags
        updateOrCreateMetaTag('og:title', metaTitle, true);
        updateOrCreateMetaTag('og:description', metaDescription, true);
        updateOrCreateMetaTag('og:url', `https://nishitascreation.com/product/${product._id}`, true);
        updateOrCreateMetaTag('og:image', primaryImage, true);
        updateOrCreateMetaTag('og:type', 'product', true);
        updateOrCreateMetaTag('og:site_name', "Nishita's Creation", true);
        updateOrCreateMetaTag('og:availability', product.stockQuantity > 0 ? 'in stock' : 'out of stock', true);
        updateOrCreateMetaTag('og:price:amount', product.discountPrice || product.regularPrice, true);
        updateOrCreateMetaTag('og:price:currency', 'BDT', true);
        
        // Twitter tags
        updateOrCreateMetaTag('twitter:title', metaTitle);
        updateOrCreateMetaTag('twitter:description', metaDescription);
        updateOrCreateMetaTag('twitter:image', primaryImage);
        updateOrCreateMetaTag('twitter:card', 'summary_large_image');
        updateOrCreateMetaTag('twitter:site', '@NishitasCreation');
        
        // Canonical link
        let canonical = document.querySelector('link[rel="canonical"]');
        const canonicalUrl = `https://nishitascreation.com/product/${product._id}`;
        if (canonical) {
          canonical.setAttribute('href', canonicalUrl);
        } else {
          canonical = document.createElement('link');
          canonical.setAttribute('rel', 'canonical');
          canonical.setAttribute('href', canonicalUrl);
          document.head.appendChild(canonical);
        }
        
        // Remove existing JSON-LD if any
        const existingJsonLd = document.querySelector('#product-json-ld');
        if (existingJsonLd) {
          existingJsonLd.remove();
        }
        
        // Add JSON-LD structured data for better SEO - Nishita's Creation specific
        const currentPrice = product.discountPrice && product.discountPrice < product.regularPrice 
          ? product.discountPrice 
          : product.regularPrice;
        
        const jsonLd = {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.productName,
          "description": metaDescription,
          "image": primaryImage,
          "sku": product.skuCode || product._id,
          "mpn": product.skuCode || product._id,
          "brand": {
            "@type": "Brand",
            "name": product.brand || "Nishita's Creation",
            "logo": "https://nishitascreation.com/logo.png"
          },
          "manufacturer": {
            "@type": "Organization",
            "name": "Nishita's Creation",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BD",
              "addressLocality": "Jashore",
              "addressRegion": "Khulna"
            }
          },
          "offers": {
            "@type": "Offer",
            "price": currentPrice,
            "priceCurrency": "BDT",
            "availability": product.stockQuantity > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            "url": `https://nishitascreation.com/product/${product._id}`,
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingDestination": {
                "@type": "DefinedRegion",
                "addressCountry": "BD"
              },
              "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "businessDays": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              }
            }
          },
          "additionalProperty": [
            {
              "@type": "PropertyValue",
              "name": "Category",
              "value": product.category?.name || product.categoryName || "Handicraft"
            },
            {
              "@type": "PropertyValue",
              "name": "Condition",
              "value": "New, Handmade"
            },
            {
              "@type": "PropertyValue",
              "name": "Origin",
              "value": "Jashore, Khulna, Bangladesh"
            },
            {
              "@type": "PropertyValue",
              "name": "Craft Technique",
              "value": "Hand Block Print, Batik Print, Applique Work"
            },
            {
              "@type": "PropertyValue",
              "name": "Fabric Type",
              "value": "Cotton, Handloom Cotton, Soft Cotton"
            }
          ]
        };
        
        // Add subcategory info if available
        if (product.subcategoryName) {
          jsonLd.additionalProperty.push({
            "@type": "PropertyValue",
            "name": "Subcategory",
            "value": product.subcategoryName
          });
        }
        
        // Add brand info if available
        if (product.brand) {
          jsonLd.additionalProperty.push({
            "@type": "PropertyValue",
            "name": "Brand",
            "value": product.brand
          });
        }
        
        // Add color if available
        if (product.colors && product.colors.length > 0) {
          jsonLd.color = product.colors;
        }
        
        // Add rating if available
        if (product.rating && product.rating > 0) {
          jsonLd.aggregateRating = {
            "@type": "AggregateRating",
            "ratingValue": product.rating,
            "reviewCount": product.reviewCount || 0,
            "bestRating": "5",
            "worstRating": "1"
          };
        }
        
        // Add COD availability
        jsonLd.additionalProperty.push({
          "@type": "PropertyValue",
          "name": "Cash on Delivery",
          "value": product.codAvailable !== false ? "Available" : "Not Available"
        });
        
        // Add authenticity
        jsonLd.additionalProperty.push({
          "@type": "PropertyValue",
          "name": "Authenticity",
          "value": "100% Original Handmade Product"
        });
        
        // Add return policy
        jsonLd.additionalProperty.push({
          "@type": "PropertyValue",
          "name": "Return Policy",
          "value": "7 Days Return Policy"
        });
        
        // Add care instructions
        jsonLd.additionalProperty.push({
          "@type": "PropertyValue",
          "name": "Care Instructions",
          "value": "Hand Wash Recommended, Do Not Bleach, Dry in Shade"
        });
        
        // Add occasion if available
        if (product.occasion) {
          jsonLd.additionalProperty.push({
            "@type": "PropertyValue",
            "name": "Occasion",
            "value": product.occasion
          });
        }
        
        // Add size options if available
        if (product.sizeOptions) {
          jsonLd.additionalProperty.push({
            "@type": "PropertyValue",
            "name": "Size Options",
            "value": product.sizeOptions
          });
        }
        
        // Add the JSON-LD script to head
        const script = document.createElement('script');
        script.id = 'product-json-ld';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(jsonLd);
        document.head.appendChild(script);
        
        // Add organization JSON-LD if not present
        const existingOrgJsonLd = document.querySelector('#organization-json-ld');
        if (!existingOrgJsonLd) {
          const orgJsonLd = {
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "Nishita's Creation",
            "url": "https://nishitascreation.com",
            "logo": "https://nishitascreation.com/logo.png",
            "description": "Bangladesh's trusted store for authentic Batik, Block Print, Applique & deshi products from Jashore. Made with love by skilled local artisans in our own factory.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BD",
              "addressLocality": "Jashore",
              "addressRegion": "Khulna",
              "postalCode": "7400"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Service",
              "telephone": "+8801234567890",
              "email": "support@nishitascreation.com",
              "availableLanguage": ["English", "Bengali"]
            },
            "sameAs": [
              "https://www.facebook.com/nishitascreationbd",
              "https://www.instagram.com/nishitascreation.bd",
              "https://twitter.com/NishitasCreation"
            ],
            "priceRange": "৳300 - ৳15000",
            "currenciesAccepted": "BDT",
            "paymentAccepted": "Cash on Delivery, bKash, Nagad, Rocket, Credit Card",
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              "opens": "10:00",
              "closes": "22:00"
            }
          };
          
          const orgScript = document.createElement('script');
          orgScript.id = 'organization-json-ld';
          orgScript.type = 'application/ld+json';
          orgScript.textContent = JSON.stringify(orgJsonLd);
          document.head.appendChild(orgScript);
        }
        
        console.log('Metadata updated for Nishita\'s Creation product:', product.productName);
        console.log('JSON-LD added for product:', product.productName);
        
      } catch (error) {
        console.error('Error updating metadata:', error);
      }
    };
    
    updateMetadata();
  }, [product]);
  
  return null;
}