# SEO Page Publishing Guide

This guide explains how to create a generated SEO page from an existing blog, push it through GitHub, deploy it, verify it in the sitemap, and request indexing in Google.


## What This Feature Does

The admin panel can generate one page entry from a blog post. After that entry is pasted into the frontend repository and deployed, the website will automatically:

- create the new page URL
- Edit the page title, meta description, canonical URL and meta keywords
- render the blog content as a standalone SEO page
- add the page to the sitemap if `sitemap` is enabled
- add the page to the `More` menu if selected
- add the page to the footer resources list if selected
- add the page to the custom page related-links section if selected

You do not need to manually edit:

- `src/App.jsx`
- `src/seo/routes.js`
- navbar configuration files
- footer configuration files
- sitemap files

Those parts already read generated SEO pages automatically.

## Important Workflow Summary

The full workflow is:

1. Create or choose a blog in admin
2. Click `Create Page`
3. Fill the SEO page form
4. Copy the generated code
5. Paste it into `src/seo/generatedPages.js`
6. Commit and push to GitHub
7. Deploy the frontend
8. Check that the page appears live
9. Check that the page appears in `sitemap.xml`
10. Request indexing for the new URL in Google Search Console

## Before You Start

Make sure you have:

- permission to push to the main branch
- Node.js and dependencies installed.

## Files You Need To Touch

For generated SEO pages, the normal content workflow only needs one code file:

- `src/seo/generatedPages.js`

That is the file where the copied page entry must be pasted.

## Step 1: Generate The Page Entry In Admin

1. Log in to the admin panel.
2. Open `Manage Blogs`.
3. Find the blog you want to turn into a page.
4. Click `Create Page`.
5. Fill the fields in the page generator.
6. Make sure the path shows as available.
7. Click `Copy Entry`.

## What Each Field Means

### URL Slug

This controls the final page URL.

Example:

- slug entered: `rice-erp-software`
- final URL: `https://www.punjabbulls.com/rice-erp-software`

How it works:

- the system converts the slug into a path beginning with `/`
- spaces are converted to hyphens
- special characters are removed
- uppercase letters become lowercase

Good slug examples:

- `rice-erp-software`
- `business-central-for-rice-mills`
- `inventory-management-for-food-industry`

Do not:

- use spaces intentionally
- use symbols
- use a slug that already belongs to another page
- change the slug of an already-performing page unless there is a real SEO reason

If the modal shows a path conflict, do not copy the entry yet. Change the slug until the path is available.

### H1 Heading

This is the main visible heading on the page.

This is what the user sees as the page headline after opening the page.

### SEO Title

This becomes the HTML `<title>` tag shown in:

- the browser tab
- Google search results, when Google chooses to use it
- social previews in some cases

Keep it clear, relevant, and aligned with the page topic.

### Meta Description

This becomes the HTML meta description. It is not usually visible on the page itself, but it can appear in Google search snippets.

Write one short, clear summary of the page.

### Intro Excerpt

This is visible on the page itself, usually near the top under the heading.

It is a short introduction for the user.

### SEO Keywords

These are optional keywords stored in the page metadata.

What they do in this project:

- they are written into the page HTML as `<meta name="keywords" ...>`
- they are included in the generated page code

What they do not do:

- they do not appear in `sitemap.xml`
- they are not a major Google ranking factor

Use them as supporting metadata only. The stronger SEO signals are still:

- page title
- meta description
- H1
- page content
- internal links
- canonical URL
- sitemap presence

### Navbar Label

This is the short name shown in the UI when the page is listed in navigation-based sections.

Where it appears:

- in the desktop `More` menu
- in the mobile `More` menu
- in the footer resources list
- in custom page related-links cards

If `Navbar Label` is filled, that label is shown.

If it is empty, the system falls back to the page heading.

Use a short label here. This is for UI display, not full SEO metadata.

### Priority

This value goes into the page's `<priority>` tag inside `sitemap.xml`.

Example:

```xml
<priority>0.7</priority>
```

It is a hint for search engines about the relative importance of the page inside the site. It is not a guarantee of ranking.

### Change Frequency

This value goes into the page's `<changefreq>` tag inside `sitemap.xml`.

Example:

```xml
<changefreq>monthly</changefreq>
```

It is only a hint for crawlers about how often the page is expected to change.

Use:

- `weekly` for pages you expect to update often
- `monthly` for pages that change sometimes
- `yearly` for pages that are mostly static

Google may ignore this value, but it is still valid sitemap metadata.

### Sort Order

This controls the order of the page in generated custom-page lists.

It affects:

- the `More` menu order
- the footer resources order
- the related custom pages order

How it works:

- lower numbers appear first
- higher numbers appear later

Examples:

- `1` appears before `5`
- `5` appears before `99`
- `-10` appears before `-2`

Important note:

- the form visually suggests a minimum of `1`
- but the current code still accepts negative values if they are entered
- a negative value will sort before positive values

Recommended practice:

- use `1`, `2`, `3`, `4` for the most important pages
- use larger numbers like `50` or `99` for lower-priority pages
- avoid negative values unless you intentionally want a page forced to the top

### Show In More Menu

If enabled, the page appears under the `More` menu in the navbar.

This affects:

- desktop navbar dropdown
- mobile navbar dropdown

It does not create a top-level main nav item like `Home` or `Products`. It only places the page inside the `More` section.

### Show In Footer

If enabled, the page appears in the footer under the generated resources links.

### Show In Related Links

If enabled, the page appears as one of the related custom pages shown on generated SEO pages.

This section is for custom/generated pages. It is not used for normal blog pages.

## Step 2: Paste The Entry Into The Frontend Repository

Open this file:

- `src/seo/generatedPages.js`

You will see an exported array named `generatedSeoPages`.

Paste the copied entry inside that array.

Example:

```js
export const generatedSeoPages = [
  {
    path: "/rice-erp-software",
    heading: "Rice ERP Software",
    ...
  },
];
```

Do not paste the entry:

- outside the array
- into a different file
- above the `export const generatedSeoPages = [` line

## Step 3: Test Locally Before Pushing

Run:

```bash
npm run build
npm run preview
```

Then verify:

- the new URL opens correctly
- the page content looks correct
- the H1 is correct
- the SEO title looks correct
- the meta description is correct
- the page shows in the `More` menu if enabled
- the page shows in the footer if enabled
- the page shows in related custom-page links if enabled

If something is wrong, edit the pasted entry in `src/seo/generatedPages.js`, then build again.

## Step 4: Commit And Push To GitHub

Always pull the latest code first before making or pushing changes.

Recommended sequence:

```bash
git checkout main
git pull origin main
git add .\PunjabBulls\src\seo\generatedPages.js    
git commit -m "Add SEO page for <page-name>"
git push origin main
```

This sends the new page entry to GitHub.

If your deployment platform is connected to GitHub, pushing to the production branch may automatically trigger deployment.

If your team deploys manually after push, complete the deployment step after GitHub is updated.

Do not:

- force push
- skip pulling latest code
- edit old local code and push without syncing first

## Step 5: Deploy The Frontend

Deploy the frontend in the same way your team normally deploys production.

During the build, the site will automatically:

- create the new generated page route
- apply the SEO metadata
- include the page in the correct navigation areas
- regenerate `sitemap.xml`

After a successful deployment, the new page should be live at its final URL.

## Step 6: Check The Live Page

After deployment, open the final page URL and confirm:

- the page loads
- the heading is correct
- the page layout looks correct
- the page is accessible from the expected menus if enabled

## Step 7: Check The Sitemap

After deployment, open:

- `https://www.punjabbulls.com/sitemap.xml`

Confirm that the new page URL appears there.

The sitemap should include entries like:

```xml
<url>
  <loc>https://www.punjabbulls.com/rice-erp-software</loc>
  <lastmod>2026-03-21</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.7</priority>
</url>
```

If the URL is missing from the sitemap, check:

- the page entry was pasted correctly
- `sitemap: true` is present in the entry
- the latest code was deployed
- the build completed successfully

## Step 8: Request Indexing In Google Search Console

After deployment:

1. Open Google Search Console.
2. Use the `URL Inspection` tool.
3. Paste the full live page URL.
4. Run inspection.
5. Click `Request Indexing`.

This is the right step for a brand new page URL.

## When To Submit The Sitemap Again

If `https://www.punjabbulls.com/sitemap.xml` is already added in Search Console, you usually do not need to add it again for every new page.

Google can discover the new page from the updated sitemap automatically after recrawl.

You may still resubmit the sitemap manually if:

- you want to prompt a fresh crawl
- the sitemap was changed recently and you want to verify it was read
- the sitemap was never submitted before

The sitemap URL to submit is:

- `https://www.punjabbulls.com/sitemap.xml`

## Where To See The SEO Keywords After Deployment

The SEO keywords do not show in the visual page body by default.

They appear in the page source as a meta tag.

To check them:

1. Open the live page.
2. Right click and choose `View Page Source`.
3. Search for `meta name="keywords"`.

You should see something like:

```html
<meta name="keywords" content="rice erp, rice mill software, business central" />
```

Important note:

Google generally does not rely on `meta keywords` for rankings. Treat these as optional supporting metadata, not the main SEO lever.

## How Navigation Display Works

Generated pages do not become top-level main menu items automatically.

If `Show In More Menu` is enabled:

- the page is listed under `More`
- the visible text is `Navbar Label` if present
- if `Navbar Label` is blank, the visible text falls back to the page heading

If `Show In Footer` is enabled:

- the page is listed in the footer resources section
- the visible text is also `Navbar Label` first, then heading as fallback

If `Show In Related Links` is enabled:

- the page appears in the related custom-page section on generated SEO pages

## Updating An Existing Generated SEO Page

If a page already exists and you want to improve it, the safest SEO approach is usually:

- keep the same URL
- keep the same topic
- improve the content and metadata

That helps preserve:

- existing ranking history
- backlinks already pointing to the URL
- index stability

Good updates include:

- improving the title
- improving the description
- expanding content depth
- improving headings
- improving internal linking
- improving readability

## When Not To Reuse The Same URL

Be careful about keeping the same slug if the page topic is changing completely.

If the intent is no longer the same, ask first whether the better choice is:

- improving the existing page
- creating a new page with a new slug
- redirecting the old page to a more relevant replacement

## Removing A Generated Page

If you need to remove a generated SEO page:

1. delete the page entry from `src/seo/generatedPages.js`
2. build again
3. deploy again

After deployment:

- the route will no longer exist
- the page will disappear from the `More` menu
- the page will disappear from the footer
- the page will disappear from related custom-page links
- the page will disappear from the sitemap

Do not remove a page casually if it already ranks well.

## Good Practices

- keep slugs short, clear, and topic-specific
- use one page for one clear intent
- keep the same URL if you are improving the same topic
- use short `Navbar Label` text for cleaner UI
- use sensible positive sort order values
- verify the page locally before pushing
- push to GitHub only after checking the generated entry carefully
- check the live page after deployment
- check the sitemap after deployment
- request indexing for new URLs in Search Console

## What Not To Do

- do not edit routing files manually for generated pages
- do not create duplicate slugs
- do not force push to the main branch
- do not skip deployment verification
- do not expect `meta keywords` alone to improve rankings
- do not use sort order carelessly if multiple pages compete for the same menu placement

## Quick Checklist

1. Open the target blog in admin
2. Click `Create Page`
3. Fill the page fields carefully
4. Confirm the path is available
5. Copy the generated entry
6. Paste it into `src/seo/generatedPages.js`
7. Run `npm run build`
8. Preview and verify locally
9. Commit and push to GitHub
10. Deploy the frontend
11. Open the live page
12. Check `https://www.punjabbulls.com/sitemap.xml`
13. Request indexing for the new URL in Google Search Console
