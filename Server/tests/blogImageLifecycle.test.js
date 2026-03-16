import test from "node:test";
import assert from "node:assert/strict";

import {
  buildImageUpdatePlan,
  collectReferencedImagePublicIds,
  diffPublicIds,
} from "../utils/blogImageLifecycle.js";

test("collectReferencedImagePublicIds gathers cover, thumbnail, and inline images uniquely", () => {
  const ids = collectReferencedImagePublicIds({
    coverImage: { public_id: "cover-1" },
    thumbnailImage: { public_id: "thumb-1" },
    content: {
      blocks: [
        { type: "image", data: { file: { public_id: "inline-1" } } },
        { type: "image", data: { file: { public_id: "inline-1" } } },
      ],
    },
  });

  assert.deepEqual(ids, ["cover-1", "thumb-1", "inline-1"]);
});

test("diffPublicIds returns added and removed ids", () => {
  const result = diffPublicIds(["a", "b"], ["b", "c"]);

  assert.deepEqual(result, {
    added: ["c"],
    removed: ["a"],
  });
});

test("buildImageUpdatePlan defers old deletions and tracks rollback cleanup for new assets", () => {
  const plan = buildImageUpdatePlan({
    currentBlog: {
      coverImage: { public_id: "cover-old" },
      thumbnailImage: { public_id: "thumb-old" },
      content: {
        blocks: [
          { type: "image", data: { file: { public_id: "inline-old" } } },
        ],
      },
    },
    nextCoverImage: { public_id: "cover-new", url: "https://img/cover-new" },
    nextThumbnailImage: { public_id: "thumb-new", url: "https://img/thumb-new" },
    nextContent: {
      blocks: [
        { type: "image", data: { file: { public_id: "inline-new" } } },
      ],
    },
  });

  assert.deepEqual(plan.updates, {
    coverImage: { public_id: "cover-new", url: "https://img/cover-new" },
    thumbnailImage: { public_id: "thumb-new", url: "https://img/thumb-new" },
    content: {
      blocks: [
        { type: "image", data: { file: { public_id: "inline-new" } } },
      ],
    },
  });

  assert.deepEqual(plan.deleteAfterSave, [
    "cover-old",
    "thumb-old",
    "inline-old",
  ]);

  assert.deepEqual(plan.cleanupOnFailure, [
    "cover-new",
    "thumb-new",
    "inline-new",
  ]);
});

test("buildImageUpdatePlan does not schedule deletions when assets are unchanged", () => {
  const sharedContent = {
    blocks: [{ type: "image", data: { file: { public_id: "inline-1" } } }],
  };

  const plan = buildImageUpdatePlan({
    currentBlog: {
      coverImage: { public_id: "cover-1" },
      thumbnailImage: { public_id: "thumb-1" },
      content: sharedContent,
    },
    nextCoverImage: { public_id: "cover-1" },
    nextThumbnailImage: { public_id: "thumb-1" },
    nextContent: sharedContent,
  });

  assert.deepEqual(plan.updates, { content: sharedContent });
  assert.deepEqual(plan.deleteAfterSave, []);
  assert.deepEqual(plan.cleanupOnFailure, []);
});
