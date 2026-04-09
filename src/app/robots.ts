import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Replace with your actual domain
  const baseUrl = "https://psyz1.vercel.app/";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"], // Prevent search engines from crawling your admin/API routes
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
