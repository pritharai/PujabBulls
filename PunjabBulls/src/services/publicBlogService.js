import api from "../api/client";

export const fetchPublishedBlogs = async (params) => {
  const { data } = await api.get("/api/blogs", {
    params: { ...params, status: "published" },
  });
  return data;
};

export const fetchBlogBySlug = async (slug) => {
  const { data } = await api.get(`/api/blogs/${slug}`);
  return data;
};