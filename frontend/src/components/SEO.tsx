import { useEffect } from "react";
import type React from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const defaultTitle = "The Print Route - Smart Print Routing SaaS Platform";
const defaultDescription =
  "Turn fragmented print requests into a predictable, routed workflow. Route print orders automatically across providers and countries with smart routing, unified tracking, and cost optimization.";
// Use environment variable for base URL, fallback to default
// Update this with your production domain
const defaultUrl = import.meta.env.VITE_SITE_URL || "https://theprintroute.com";
const defaultImage = `${defaultUrl}/og-image.jpg`;
const siteName = "The Print Route";

export const SEO: React.FC<SEOProps> = ({
  title = defaultTitle,
  description = defaultDescription,
  keywords = "print routing, print management, print workflow, SaaS, automation, print fulfillment, routing platform, print logistics, TAN integration, n8n integration",
  image = defaultImage,
  url = defaultUrl,
  type = "website",
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper function to update or create meta tag
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${property}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Helper function to update or create link tag
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      
      if (!element) {
        element = document.createElement("link");
        element.rel = rel;
        document.head.appendChild(element);
      }
      element.href = href;
    };

    // Primary Meta Tags
    updateMetaTag("title", title);
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Canonical URL
    updateLinkTag("canonical", url);

    // Open Graph / Facebook
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:site_name", siteName, true);

    // Twitter
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:url", url);
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Structured Data (JSON-LD) for better LLM/AI search
    // Remove existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach((script) => script.remove());

    // SoftwareApplication Schema
    const softwareAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "The Print Route",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description: description,
      url: url,
      publisher: {
        "@type": "Organization",
        name: "The Print Route",
        url: url,
      },
      featureList: [
        "Smart print routing",
        "Multi-provider management",
        "Unified tracking",
        "Cost optimization",
        "API integration",
        "Workflow automation",
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.5",
        ratingCount: "1",
      },
    };

    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "The Print Route",
      url: url,
      logo: `${url}/logo.png`,
      description: description,
      sameAs: [],
    };

    // WebSite Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "The Print Route",
      url: url,
      description: description,
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${url}/search?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    };

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: url,
        },
      ],
    };

    // Add all structured data scripts
    [softwareAppSchema, organizationSchema, websiteSchema, breadcrumbSchema].forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      // Optionally clean up on unmount (but usually we want to keep meta tags)
      // For a SPA, we might want to keep them, so cleanup is minimal
    };
  }, [title, description, keywords, image, url, type]);

  // This component doesn't render anything
  return null;
};