export const SITE_URL = "https://zentramedhealth.co.ke";
export const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const canonical = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;

/** Standard social tags for a page (canonical URL + share image). */
export function socialMeta(path: string, image: string = OG_IMAGE) {
  return [
    { property: "og:url", content: canonical(path) },
    { property: "og:image", content: image },
    { name: "twitter:image", content: image },
  ];
}

export const canonicalLink = (path: string) => [{ rel: "canonical", href: canonical(path) }];

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: canonical(it.path),
    })),
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Zentramed Health",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-zentramed.png`,
  image: OG_IMAGE,
  description:
    "Supplier of certified medical equipment, laboratory diagnostics, oxygen therapy, PPE and humanitarian health solutions in Nairobi, Kenya.",
  email: "info@zentramedhealth.co.ke",
  telephone: "+254722708420",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Bazaar Plaza, 9th Floor, Suite A901",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  areaServed: ["Kenya", "East Africa"],
  sameAs: ["https://www.facebook.com/zentramedhealth", "https://www.instagram.com/zentramedhealth"],
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Zentramed Health",
  url: SITE_URL,
};
