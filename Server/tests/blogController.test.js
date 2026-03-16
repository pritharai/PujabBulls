import test from "node:test";
import assert from "node:assert/strict";

import Blog from "../models/Blog.js";
import cloudinary from "../config/cloudinary.js";
import {
  createBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blogController.js";

function createResponse() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

function sortIds(ids) {
  return [...ids].sort();
}

test("createBlog removes uploaded assets when validation fails", async (t) => {
  const destroyed = [];
  t.mock.method(cloudinary.uploader, "destroy", async (publicId) => {
    destroyed.push(publicId);
  });

  const req = {
    body: {
      title: "",
      content: null,
      coverImage: { public_id: "cover-new" },
      thumbnailImage: { public_id: "thumb-new" },
    },
  };
  const res = createResponse();

  await createBlog(req, res);

  assert.equal(res.statusCode, 400);
  assert.equal(res.body.message, "Title and content are required");
  assert.deepEqual(sortIds(destroyed), ["cover-new", "thumb-new"]);
});

test("createBlog removes uploaded assets if persistence fails", async (t) => {
  const destroyed = [];
  t.mock.method(console, "error", () => {});
  t.mock.method(Blog, "findOne", async () => null);
  t.mock.method(Blog, "create", async () => {
    throw new Error("db failure");
  });
  t.mock.method(cloudinary.uploader, "destroy", async (publicId) => {
    destroyed.push(publicId);
  });

  const req = {
    body: {
      title: "Punjab Bulls",
      excerpt: "Excerpt",
      content: {
        blocks: [
          { type: "image", data: { file: { public_id: "inline-new" } } },
        ],
      },
      coverImage: { public_id: "cover-new" },
      thumbnailImage: { public_id: "thumb-new" },
    },
  };
  const res = createResponse();

  await createBlog(req, res);

  assert.equal(res.statusCode, 500);
  assert.deepEqual(sortIds(destroyed), [
    "cover-new",
    "inline-new",
    "thumb-new",
  ]);
});

test("updateBlog deletes replaced assets after a successful save", async (t) => {
  const destroyed = [];
  const blog = {
    _id: "blog-1",
    title: "Old Title",
    slug: "old-title",
    excerpt: "Old excerpt",
    status: "draft",
    coverImage: { public_id: "cover-old", url: "https://img/cover-old.jpg" },
    thumbnailImage: {
      public_id: "thumb-old",
      url: "https://img/thumb-old.jpg",
    },
    content: {
      blocks: [
        { type: "image", data: { file: { public_id: "inline-old" } } },
      ],
    },
    async save() {},
  };

  t.mock.method(Blog, "findById", async () => blog);
  t.mock.method(Blog, "findOne", async () => null);
  t.mock.method(cloudinary.uploader, "destroy", async (publicId) => {
    destroyed.push(publicId);
  });

  const req = {
    params: { id: "blog-1" },
    body: {
      title: "New Title",
      excerpt: "New excerpt",
      status: "published",
      coverImage: { public_id: "cover-new", url: "https://img/cover-new.jpg" },
      thumbnailImage: {
        public_id: "thumb-new",
        url: "https://img/thumb-new.jpg",
      },
      content: {
        blocks: [
          { type: "image", data: { file: { public_id: "inline-new" } } },
        ],
      },
    },
  };
  const res = createResponse();

  await updateBlog(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(blog.title, "New Title");
  assert.equal(blog.slug, "new-title");
  assert.equal(blog.status, "published");
  assert.deepEqual(sortIds(destroyed), [
    "cover-old",
    "inline-old",
    "thumb-old",
  ]);
});

test("updateBlog rolls back new assets when save fails", async (t) => {
  const destroyed = [];
  t.mock.method(console, "error", () => {});
  const blog = {
    _id: "blog-1",
    title: "Same Title",
    slug: "same-title",
    excerpt: "Excerpt",
    coverImage: { public_id: "cover-old" },
    thumbnailImage: { public_id: "thumb-old" },
    content: {
      blocks: [
        { type: "image", data: { file: { public_id: "inline-old" } } },
      ],
    },
    async save() {
      throw new Error("save failure");
    },
  };

  t.mock.method(Blog, "findById", async () => blog);
  t.mock.method(cloudinary.uploader, "destroy", async (publicId) => {
    destroyed.push(publicId);
  });

  const req = {
    params: { id: "blog-1" },
    body: {
      title: "Same Title",
      coverImage: { public_id: "cover-new" },
      thumbnailImage: { public_id: "thumb-new" },
      content: {
        blocks: [
          { type: "image", data: { file: { public_id: "inline-new" } } },
        ],
      },
    },
  };
  const res = createResponse();

  await updateBlog(req, res);

  assert.equal(res.statusCode, 500);
  assert.deepEqual(sortIds(destroyed), [
    "cover-new",
    "inline-new",
    "thumb-new",
  ]);
});

test("updateBlog removes uploaded assets when the blog does not exist", async (t) => {
  const destroyed = [];
  t.mock.method(Blog, "findById", async () => null);
  t.mock.method(cloudinary.uploader, "destroy", async (publicId) => {
    destroyed.push(publicId);
  });

  const req = {
    params: { id: "missing-blog" },
    body: {
      coverImage: { public_id: "cover-new" },
      thumbnailImage: { public_id: "thumb-new" },
      content: {
        blocks: [
          { type: "image", data: { file: { public_id: "inline-new" } } },
        ],
      },
    },
  };
  const res = createResponse();

  await updateBlog(req, res);

  assert.equal(res.statusCode, 404);
  assert.deepEqual(sortIds(destroyed), [
    "cover-new",
    "inline-new",
    "thumb-new",
  ]);
});

test("deleteBlog removes cover, thumbnail, and inline assets", async (t) => {
  const destroyed = [];
  let deleted = false;
  const blog = {
    coverImage: { public_id: "cover-old" },
    thumbnailImage: { public_id: "thumb-old" },
    content: {
      blocks: [
        {
          type: "image",
          data: {
            file: {
              url: "https://res.cloudinary.com/demo/image/upload/v1/blogs/inline-old.jpg",
            },
          },
        },
      ],
    },
    async deleteOne() {
      deleted = true;
    },
  };

  t.mock.method(Blog, "findById", async () => blog);
  t.mock.method(cloudinary.uploader, "destroy", async (publicId) => {
    destroyed.push(publicId);
  });

  const req = {
    params: { id: "blog-1" },
  };
  const res = createResponse();

  await deleteBlog(req, res);

  assert.equal(res.statusCode, 200);
  assert.equal(deleted, true);
  assert.deepEqual(sortIds(destroyed), [
    "blogs/inline-old",
    "cover-old",
    "thumb-old",
  ]);
});
