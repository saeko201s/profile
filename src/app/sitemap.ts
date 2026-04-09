import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Replace with your actual domain when deploying
  const baseUrl = "https://psyz1.vercel.app/";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Add additional static routes if needed here!
  ];
}
