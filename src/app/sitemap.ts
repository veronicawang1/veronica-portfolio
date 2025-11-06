import { DATA } from "@/app/data";
import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoute: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = Object.values(DATA.PROJECTS).map(
    (project) => ({
      url: `${baseUrl}/projects/${project.SLUG}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  return [...staticRoute, ...projectRoutes];
}
