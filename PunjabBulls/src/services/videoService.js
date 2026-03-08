import api from "../api/client";

export const uploadVideo = async (data) => {
  const res = await api.post("/api/videos", data);
  return res.data;
};

export const getVideosByPage = async (slug) => {
  const res = await api.get(`/api/videos/${slug}`);
  return res.data.data;
};

export const getAllVideos = async () => {
  const res = await api.get("/api/videos");
  return res.data.data;
};

export const deleteVideo = async (id) => {
  const res = await api.delete(`/api/videos/${id}`);
  return res.data;
};