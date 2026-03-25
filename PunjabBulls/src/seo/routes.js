import { generatedRouteMeta } from "./generatedPages.js";

const baseRouteMeta = {
  "/": {
    title:
      "PunjabBulls Technology Pvt. Ltd. | ERP & Digital Transformation Company in India",
    description:
      "PunjabBulls helps Indian businesses modernize operations with Microsoft Dynamics 365 Business Central, ERP implementation, CRM strategy, cloud migration, and consulting services.",
    keywords: [
      "ERP company India",
      "digital transformation company India",
      "Microsoft Dynamics 365 Business Central partner India",
      "ERP implementation services",
      "business automation consulting",
    ],
    canonical: "/",
    prerender: true,
    sitemap: true,
    changefreq: "daily",
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
    title:
      "Rice ERP, Rice Mill ERP Software & Business Central Solutions | PunjabBulls",
    description:
      "Explore PunjabBulls rice ERP and rice mill ERP software for Indian businesses, including Microsoft Dynamics 365 Business Central, stock and sales management, GST automation, compliance workflows, and industry-focused ERP solutions.",
    keywords: [
      "rice erp",
      "rice mill ERP software",
      "rice mill erp",
      "rice mill management software",
      "rice ERP",
      "ERP for rice mills",
      "erp for rice mill",
      "erp software for rice mill",
      "rice processing ERP software",
      "Microsoft Dynamics 365 Business Central India",
      "ERP software for manufacturers",
      "stock and sales management software",
      "GST automation software India",
    ],
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
    keywords: [
      "industry ERP solutions",
      "retail ERP software",
      "distribution ERP software",
      "manufacturing ERP software",
      "ERP for Indian businesses",
    ],
    canonical: "/industries",
    prerender: true,
    sitemap: true,
    changefreq: "monthly",
    priority: "0.9",
  },
  "/best-erp-for-rice-milling-industry": {
    title: "Best ERP for Rice Mills | Microsoft Dynamics Business Central | PunjabBulls",
    description:
      "Tailored ERP solutions for rice milling businesses, streamlining operations, inventory management, and compliance with Microsoft Dynamics 365 Business Central.",
    canonical: "/best-erp-for-rice-milling-industry",
    prerender: true,
    sitemap: true,
    changefreq: "monthly",
    priority: "0.8",
  },
  "/contact": {
    title: "Contact PunjabBulls | ERP Consultation & Business Enquiries",
    description:
      "Contact PunjabBulls for ERP implementation, Microsoft Dynamics 365 Business Central consulting, and digital transformation support across India.",
    keywords: [
      "ERP consultation India",
      "Business Central consultant India",
      "PunjabBulls contact",
      "ERP implementation support",
    ],
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
    keywords: [
      "ERP blog",
      "Business Central blog",
      "CRM insights",
      "GST compliance articles",
      "digital transformation blog India",
    ],
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
    keywords: [
      "what is Microsoft Dynamics 365 Business Central",
      "Business Central ERP",
      "Dynamics 365 ERP India",
      "ERP for growing businesses",
    ],
    canonical: "/about/what-is-business-central",
    prerender: true,
    sitemap: true,
    changefreq: "monthly",
    priority: "0.8",
  },
  "/terms": {
    title: "Terms & Conditions | PunjabBulls Technology Pvt. Ltd.",
    description:
      "Review the PunjabBulls terms and conditions for using our website, services, and published content.",
    canonical: "/terms",
    prerender: false,
    sitemap: false,
    changefreq: "yearly",
    priority: "0.3",
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

export const staticRouteMeta = {
  ...baseRouteMeta,
  ...generatedRouteMeta,
};

export const prerenderRoutes = Object.entries(staticRouteMeta)
  .filter(([, meta]) => meta.prerender)
  .map(([path]) => path);

export const sitemapRoutes = Object.entries(staticRouteMeta)
  .filter(([, meta]) => meta.sitemap)
  .map(([path, meta]) => ({ path, ...meta }));
