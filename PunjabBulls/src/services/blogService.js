import api from "../api/client";

export const getBlogs = async (params) => {
  try {
    const { data } = await api.get("/api/blogs", { params });
    return data;
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export const deleteBlog = async (id) => {
  try {
    const { data } = await api.delete(`/api/blogs/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    alert(error);
  }
};
