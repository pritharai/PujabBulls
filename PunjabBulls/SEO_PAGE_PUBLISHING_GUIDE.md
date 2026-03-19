# SEO Page Publishing Guide

This guide explains how to publish a new SEO page from an existing blog entry and deploy it safely without creating Git conflicts.

## What This Feature Does

The admin panel can generate a page entry from a blog. After copying that entry into the frontend codebase and deploying, the website will automatically:

- create the new page URL
- apply the SEO title, description, keywords, canonical, and image
- include the page in navigation areas if selected
- include the page in internal related links if selected
- include the page in `sitemap.xml` during build

You do not need to edit routing files manually for generated SEO pages.

## Before You Start

Make sure you have:

- access to the frontend repository
- permission to pull from and push to `main`
- the ability to run `npm install` if needed
- the ability to run `npm run build`

If dependencies are already installed, you usually only need `git pull`, make the change, build, commit, and push.

## Important Rule Before Every Change

Always pull the latest code from `main` before making any changes.

Use this sequence every time:

```bash
git checkout main
git pull origin main
```

This reduces the chance of editing an old version of the file and running into avoidable merge conflicts.

## Files You Need To Touch

For generated SEO pages, you only need to update one file:

- `src/seo/generatedPages.js`

You do not need to manually edit:

- `src/App.jsx`
- `src/seo/routes.js`
- navbar files
- footer files

Those parts already read from `generatedPages.js` automatically.

## Step 1: Generate The Page Entry From Admin

1. Log in to the admin panel.
2. Open `Manage Blogs`.
3. Find the blog you want to convert into an SEO page.
4. Click `Create Page`.
5. Review and update the fields:
   - URL slug
   - page heading
   - SEO title
   - meta description
   - keywords
   - navigation label if you want it shown in the `More` menu
   - sort order
   - whether to show it in the `More` menu
   - whether to show it in the footer
   - whether to show it in related links
6. Make sure the path is marked as available.
7. Click `Copy Entry`.

## How To Handle The URL Slug

The `URL slug` field controls the final page URL.

Example:

- slug: `paddy-rice-erp-planning`
- final URL: `https://www.punjabbulls.com/paddy-rice-erp-planning`

Use the slug carefully because it becomes the live page address after deployment.

### Rules For Choosing The Slug

- keep it short and readable
- use words separated by hyphens
- do not use spaces
- do not use special characters
- do not reuse a slug that is already being used by another page
- keep the slug closely matched to the page topic and target keyword

### If You Are Creating A New SEO Page

Choose a fresh slug that clearly describes the page topic.

Example:

- `rice-erp-software`
- `business-central-for-rice-mills`
- `inventory-management-for-rice-industry`

### If You Are Improving An Existing SEO Page

If the page already exists and is performing well, keep the same slug and improve the content on that same URL.

This is usually the best SEO approach.

Do not create a new slug just because you are adding more content.

### If You Want To Replace An Existing Page

If the page is still about the same topic, keep the same slug.

If the page topic is changing completely, do not reuse the old slug automatically. In that case, check first whether:

- the old page should stay live and be improved
- the old page should redirect to a closely related replacement page
- a new slug is more appropriate

### Before Copying The Entry

Always check that the admin screen says the path is available.

If it shows a conflict:

- change the slug
- check again
- only copy the entry after the conflict is resolved

## Step 2: Paste The Entry Into The Frontend Repo

Open this file:

- `src/seo/generatedPages.js`

You will see an exported array named `generatedSeoPages`.

Paste the copied entry inside that array.

Example:

```js
export const generatedSeoPages = [
  {
    ...
  },
];
```

Do not paste it outside the array.

## Step 3: Save And Test Locally

Run:

```bash
npm run build
npm run preview
```

Then open the local preview URL shown in the terminal and verify:

- the new page URL opens correctly
- the page content looks correct
- the title and description are correct
- the page appears in the `More` menu if enabled
- the page appears in the footer if enabled
- the page appears in related links if enabled

If something looks wrong, fix the entry in `src/seo/generatedPages.js`, then build again.

## Step 4: Commit And Push

After verifying locally, commit the change.

Recommended sequence:

```bash
git checkout main
git pull origin main
git add src/seo/generatedPages.js
git commit -m "Add SEO page for <page-name>"
git push origin main
```

If you already edited the file before pulling and Git says there is a conflict risk, stop and pull carefully before pushing. Do not force push.

## Step 5: Deploy

Deploy the frontend in the normal way your team already uses for production.

During the build:

- the new page route will be created automatically
- SEO metadata will be included automatically
- `sitemap.xml` will be regenerated automatically

This means the new page will be part of the production sitemap after a successful deployment.

## Step 6: Check Sitemap After Deployment

After deployment, open:

- `https://www.punjabbulls.com/sitemap.xml`

Confirm that the new page URL appears in the sitemap.

If the page URL is not present:

- confirm the entry was pasted correctly in `src/seo/generatedPages.js`
- confirm `sitemap: true` was included
- confirm the deployment used the latest code

## Step 7: Submit In Google Search Console

After deployment:

1. Open Google Search Console.
2. Use the URL Inspection tool.
3. Paste the full new page URL.
4. Request indexing.

If this is a normal page addition and the sitemap is already in Search Console, you usually do not need to add the sitemap again. Google will eventually discover the updated sitemap automatically.

If needed, you can also resubmit:

- `https://www.punjabbulls.com/sitemap.xml`

## Updating An Existing SEO Page

If you want to improve a page later, the best approach is usually to keep the same URL and update the content.

This is normally the safest SEO option because:

- the page keeps its existing ranking history
- any backlinks to that URL still point to the same page
- Google can recrawl the same page and understand the improved content

Keeping the same URL and making the page better is usually a positive SEO action.

Good examples of safe improvements:

- adding more useful content
- improving headings and page structure
- adding FAQs
- improving the SEO title and meta description
- improving internal linking
- expanding the page to answer more user questions
- improving mobile readability and page quality

This usually works well as long as the page still targets the same topic and user intent.

## When Updating A Page Can Cause Problems

Updating a page can create SEO issues if the URL stays the same but the page topic changes too much.

Be careful if:

- the page starts targeting a completely different keyword
- the search intent changes from one topic to another
- important ranking content is removed
- the page becomes much thinner or weaker than before

If the page is already performing well, do not replace it with unrelated content just because you want to reuse the URL.

## Removing A Page

If you want to remove a generated SEO page:

1. delete that page entry from `src/seo/generatedPages.js`
2. build and deploy again

After deployment:

- the page route will no longer exist
- the page will be removed from navigation areas
- the page will be removed from related links
- the page will be removed from `sitemap.xml` on the next build

Google will eventually recrawl the site and stop treating that URL as an active page.

## Important Warning Before Removing A Page

If a page already has good SEO performance, removing it can cause loss of:

- rankings
- traffic
- backlinks value
- trust signals already associated with that URL

Because of that, removal should not be the default choice for a page that is performing well.

## Better Option Than Deleting A Good Page

If the page has good SEO and you want to make it better, keep the same URL and improve the content instead of deleting it.

That is usually better than starting over with a new URL.

If the topic still matches, keeping the same URL and updating the content is the preferred approach.

## If A Page Must Be Replaced

If you no longer want the old page but there is another closely related page that should take its place, the best long-term SEO approach is usually to redirect the old URL to the most relevant replacement page.

Do not redirect a page to an unrelated destination.

If you are unsure whether to remove, improve, or redirect a page, ask before deploying the change.

## Good Practices

- Keep page slugs short and clear.
- Do not reuse a slug that already belongs to another page.
- Write a strong SEO title and a clear meta description.
- Use keywords that match the intent of the page.
- Only show the page in the navbar if it is important enough to deserve global visibility.
- Use footer and related links for supporting pages.
- If a page is already performing well, improve it on the same URL instead of deleting it.
- Always build locally before pushing.
- Always pull latest `main` before making changes.

## What Not To Do

- Do not edit multiple SEO files manually for the same page.
- Do not create duplicate slugs.
- Do not push without pulling latest `main` first.
- Do not force push to `main`.
- Do not skip the local build check.

## Quick Checklist

1. Pull latest `main`
2. Generate page entry from admin
3. Paste into `src/seo/generatedPages.js`
4. Run `npm run build`
5. Run `npm run preview`
6. Verify the page locally
7. Commit and push
8. Deploy
9. Check `sitemap.xml`
10. Request indexing in Google Search Console
