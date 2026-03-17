# Image Audit Logging Guide

This project includes an image audit logging system for blog uploads, blog updates, and Cloudinary deletions.

Use this guide to monitor image activity and investigate cases where a blog image appears to be missing or deleted.

## What Gets Logged

The system records image-related events such as:

- image upload success or failure
- editor image upload success or failure
- blog creation validation failures
- blog creation success or failure
- blog update planning
- blog update success or failure
- blog delete requests
- Cloudinary delete success
- Cloudinary delete failure
- Cloudinary delete skipped because another blog still references the same image

## Where Logs Are Stored

Logs are written to 3 places:

1. MongoDB
   Collection: `auditlogs`

2. Local JSON log file
   Path: `Server/logs/image-audit.log`

3. Backend console
   The server prints each event as one JSON line in the terminal

## Best Source Of Truth

Use MongoDB as the main source of truth.

Why:

- it survives server restarts
- it survives Render free tier restarts and redeploys
- it powers the admin log viewer page

Use local JSON logs only for temporary runtime debugging.

## Frontend Log Viewer

There is a protected admin-only page for viewing image logs:

`/admin/image-audit-logs`

Local example:

`http://localhost:5173/admin/image-audit-logs`

Production example:

`https://your-frontend-domain/admin/image-audit-logs`

This page is not linked in the navbar. Open it manually after admin login.

## What You Can Filter In The UI

The log page supports filtering by:

- `publicId`
- `blogId`
- `eventType`
- `level`
- `limit`

Use this to narrow down exactly which image or blog is involved.

## Backend API For Logs

The frontend reads from this protected admin API:

`GET /api/audit/image-events`

Examples:

- `GET /api/audit/image-events`
- `GET /api/audit/image-events?publicId=blog_images/abc123`
- `GET /api/audit/image-events?blogId=67d6abc1234567890`
- `GET /api/audit/image-events?eventType=cloudinary_delete_failed`
- `GET /api/audit/image-events?level=warn&limit=200`

## Important Event Types

These are the most useful events during investigation:

- `upload_success`
  A normal cover image upload succeeded.

- `editor_upload_success`
  An inline editor image upload succeeded.

- `blog_update_plan_built`
  The server calculated which old image IDs are going to be removed and which new image IDs would be rolled back if the save fails.

- `blog_updated`
  The blog save completed successfully.

- `blog_delete_requested`
  A delete action was requested for a blog and the server queued related image cleanup.

- `cloudinary_delete_result`
  The server attempted to delete a Cloudinary asset and got a response.

- `cloudinary_delete_failed`
  The Cloudinary delete call failed.

- `cloudinary_delete_skipped_shared_reference`
  The delete was intentionally skipped because another blog still references the same `publicId`.

## Fields You Will See In Each Log Entry

Each audit record can contain:

- `timestamp`
- `level`
- `domain`
- `eventType`
- `requestId`
- `method`
- `route`
- `actor`
- `blog`
- `asset`
- `details`

### Actor

Contains:

- admin role
- admin email
- IP address
- user agent

### Blog

Contains:

- blog id
- slug
- title

### Asset

Contains:

- `publicId`
- image URL when available
- folder name when available

### Details

This is the most important part during debugging. It may contain:

- uploaded image IDs
- delete queue
- rollback cleanup queue
- Cloudinary response
- Cloudinary error message
- shared reference blog details

## How To Monitor Locally

### Option 1: Frontend admin page

Open:

`http://localhost:5173/admin/image-audit-logs`

### Option 2: Backend terminal

Start the backend and watch the console output. Every log event appears there as JSON.

### Option 3: Local log file

Watch the file live:

```powershell
Get-Content Server\logs\image-audit.log -Wait
```

Show last 50 lines:

```powershell
Get-Content Server\logs\image-audit.log -Tail 50
```

Search by image public id:

```powershell
Select-String -Path Server\logs\image-audit.log -Pattern "blog_images/abc123"
```

## How To Investigate A Missing Image

Use this sequence:

1. Find the missing image URL or `publicId`.
2. Open `/admin/image-audit-logs`.
3. Filter by that `publicId`.
4. Check if there was:
   - `blog_update_plan_built`
   - `blog_delete_requested`
   - `cloudinary_delete_result`
   - `cloudinary_delete_failed`
   - `cloudinary_delete_skipped_shared_reference`
5. Match the `timestamp`, `requestId`, `blog.id`, and `actor.email`.
6. Confirm whether the image was:
   - uploaded
   - queued for deletion
   - actually deleted
   - skipped because another blog still used it

## How Shared Image Protection Works

Before deleting a Cloudinary asset, the server checks whether another blog still references that same `publicId`.

If another blog references it:

- the delete is skipped
- the skip is logged as `cloudinary_delete_skipped_shared_reference`

This is important protection against accidental cross-blog image deletion.

## Render Free Tier Note

On Render free tier:

- MongoDB logs remain available
- local JSON file logs are temporary
- local file logs can disappear after restart, redeploy, or service spin-down

So for production monitoring on Render free tier, always use:

- MongoDB
- `/admin/image-audit-logs`

## If The Log Page Shows Nothing

Check these:

1. Backend is running.
2. Frontend is using the correct backend URL in `VITE_API_URL`.
3. You are logged in as admin.
4. MongoDB connection is working.
5. The backend route `/api/audit/image-events` is deployed.

## Files Related To This System

Backend:

- `Server/utils/auditLogger.js`
- `Server/utils/cloudinaryAssetManager.js`
- `Server/models/AuditLog.js`
- `Server/controllers/auditController.js`
- `Server/routes/auditRoutes.js`
- `Server/controllers/blogController.js`
- `Server/controllers/uploadController.js`

Frontend:

- `PunjabBulls/src/Pages/Admin/ImageAuditLogs.jsx`
- `PunjabBulls/src/services/auditService.js`

## Recommendation

For day-to-day monitoring:

- use `/admin/image-audit-logs`

For deep incident investigation:

- filter logs by `publicId` and `blogId`
- compare timestamps and request IDs
- verify whether a delete was requested, completed, failed, or skipped
