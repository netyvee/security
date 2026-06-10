import type { Metadata } from "next";

export const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://security.vigilservices.co.uk";

export const defaultOGImage = `${siteUrl}/api/og`;

export function buildMetadata(overrides: Partial<Metadata> & {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}): Metadata {
  const { title, description, path, ogImage, ...rest } = overrides;
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "Vigil Security Services",
      locale: "en_GB",
      images: [
        {
          url: ogImage ?? defaultOGImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage ?? defaultOGImage],
    },
    ...rest,
  };
}
