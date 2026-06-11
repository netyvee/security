interface SchemaMarkupProps {
  schema: Record<string, unknown>;
}

export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// --- Schema builders ---

export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function buildServiceSchema(opts: {
  name: string;
  description: string;
  url: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: {
      "@type": "LocalBusiness",
      name: "Vigil Cleaning Services",
      telephone: "+442039738892",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Ferguson House, 113 Cranbrook Road",
        addressLocality: "Ilford",
        postalCode: "IG1 4PU",
        addressCountry: "GB",
      },
    },
    areaServed: opts.areaServed ?? "Greater London",
  };
}

export function buildBreadcrumbSchema(
  crumbs: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map(({ name, url }, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: url,
    })),
  };
}

export function buildArticleSchema(opts: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: {
      "@type": "Organization",
      name: "Vigil Cleaning Services",
    },
    publisher: {
      "@type": "Organization",
      name: "Vigil Cleaning Services",
      logo: {
        "@type": "ImageObject",
        url: "https://cleaning.vigilservices.co.uk/images/vigil-logo.png",
      },
    },
  };
}
