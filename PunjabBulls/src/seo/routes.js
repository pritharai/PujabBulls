export const staticRouteMeta = {
  "/": {
    title:
      "PunjabBulls Technology Pvt. Ltd. | ERP & Digital Transformation Company in India",
    description:
      "PunjabBulls helps Indian businesses modernize operations with Microsoft Dynamics 365 Business Central, ERP implementation, CRM strategy, cloud migration, and consulting services.",
    canonical: "/",
    prerender: true,
    sitemap: true,
    changefreq: "weekly",
    priority: "1.0",
  },
  "/about": {
    title: "About PunjabBulls | ERP, CRM & Digital Transformation Experts",
    description:
      "Learn how PunjabBulls delivers enterprise ERP, CRM, and digital transformation solutions backed by industry expertise, strategic consulting, and reliable execution.",
    canonical: "/about",
    prerender: true,
    sitemap: true,
    changefreq: "monthly",
    priority: "0.8",
  },
  "/products": {
    title: "ERP Products | Microsoft Dynamics 365 Business Central Solutions",
    description:
      "Explore PunjabBulls ERP and compliance solutions for Indian businesses, including Microsoft Dynamics 365 Business Central, GST workflows, and industry-specific automation.",
    canonical: "/products",
    prerender: true,
    sitemap: true,
    changefreq: "monthly",
    priority: "0.9",
  },
  "/industries": {
    title: "Industry ERP Solutions | Retail, Distribution & Manufacturing",
    description:
      "Discover PunjabBulls ERP solutions built for retail, distribution, and manufacturing teams that need operational visibility, compliance, and scalable workflows.",
    canonical: "/industries",
    prerender: true,
    sitemap: true,
    changefreq: "monthly",
    priority: "0.9",
  },
  "/contact": {
    title: "Contact PunjabBulls | ERP Consultation & Business Enquiries",
    description:
      "Contact PunjabBulls for ERP implementation, Microsoft Dynamics 365 Business Central consulting, and digital transformation support across India.",
    canonical: "/contact",
    prerender: true,
    sitemap: true,
    changefreq: "monthly",
    priority: "0.7",
  },
  "/privacy-policy": {
    title: "Privacy Policy | PunjabBulls Technology Pvt. Ltd.",
    description:
      "Read the PunjabBulls privacy policy to understand how we collect, use, secure, and manage personal information across our services.",
    canonical: "/privacy-policy",
    prerender: true,
    sitemap: true,
    changefreq: "yearly",
    priority: "0.3",
  },
  "/blogs": {
    title: "PunjabBulls Blog | ERP, CRM & Business Central Insights",
    description:
      "Read PunjabBulls insights on ERP implementation, Microsoft Dynamics 365 Business Central, compliance, cloud systems, and digital operations.",
    canonical: "/blogs",
    prerender: true,
    sitemap: true,
    changefreq: "weekly",
    priority: "0.8",
  },
  "/about/what-is-business-central": {
    title: "What Is Microsoft Dynamics 365 Business Central? | PunjabBulls",
    description:
      "Understand what Microsoft Dynamics 365 Business Central is, how it works, and why growing businesses use it to manage finance, sales, service, and operations.",
    canonical: "/about/what-is-business-central",
    prerender: true,
    sitemap: true,
    changefreq: "monthly",
    priority: "0.7",
  },
  "/404": {
    title: "Page Not Found | PunjabBulls",
    description:
      "The page you requested could not be found. Explore PunjabBulls solutions, industries, and resources from the available navigation.",
    canonical: "/404",
    prerender: true,
    sitemap: false,
    noindex: true,
  },
};

export const prerenderRoutes = Object.entries(staticRouteMeta)
  .filter(([, meta]) => meta.prerender)
  .map(([path]) => path);

export const sitemapRoutes = Object.entries(staticRouteMeta)
  .filter(([, meta]) => meta.sitemap)
  .map(([path, meta]) => ({ path, ...meta }));

