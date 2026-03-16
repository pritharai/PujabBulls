import { extractPublicIdsFromContent } from "./extractPublicIds.js";

export function getAssetPublicId(asset) {
  return asset?.public_id || null;
}

export function uniquePublicIds(ids = []) {
  return [...new Set(ids.filter(Boolean))];
}

export function collectReferencedImagePublicIds({
  coverImage,
  thumbnailImage,
  content,
} = {}) {
  return uniquePublicIds([
    getAssetPublicId(coverImage),
    getAssetPublicId(thumbnailImage),
    ...extractPublicIdsFromContent(content),
  ]);
}

export function diffPublicIds(previousIds = [], nextIds = []) {
  const previous = new Set(uniquePublicIds(previousIds));
  const next = new Set(uniquePublicIds(nextIds));

  return {
    added: [...next].filter((id) => !previous.has(id)),
    removed: [...previous].filter((id) => !next.has(id)),
  };
}

export function buildImageUpdatePlan({
  currentBlog,
  nextCoverImage,
  nextThumbnailImage,
  nextContent,
}) {
  const deleteAfterSave = [];
  const cleanupOnFailure = [];
  const updates = {};

  const currentCoverId = getAssetPublicId(currentBlog?.coverImage);
  const nextCoverId = getAssetPublicId(nextCoverImage);

  if (nextCoverImage && nextCoverId !== currentCoverId) {
    updates.coverImage = nextCoverImage;
    deleteAfterSave.push(currentCoverId);
    cleanupOnFailure.push(nextCoverId);
  }

  const currentThumbnailId = getAssetPublicId(currentBlog?.thumbnailImage);
  const nextThumbnailId = getAssetPublicId(nextThumbnailImage);

  if (nextThumbnailImage && nextThumbnailId !== currentThumbnailId) {
    updates.thumbnailImage = nextThumbnailImage;
    deleteAfterSave.push(currentThumbnailId);
    cleanupOnFailure.push(nextThumbnailId);
  }

  if (nextContent && nextContent.blocks) {
    const currentInlineIds = extractPublicIdsFromContent(currentBlog?.content);
    const nextInlineIds = extractPublicIdsFromContent(nextContent);
    const { added, removed } = diffPublicIds(currentInlineIds, nextInlineIds);

    updates.content = nextContent;
    deleteAfterSave.push(...removed);
    cleanupOnFailure.push(...added);
  }

  return {
    updates,
    deleteAfterSave: uniquePublicIds(deleteAfterSave),
    cleanupOnFailure: uniquePublicIds(cleanupOnFailure),
  };
}
