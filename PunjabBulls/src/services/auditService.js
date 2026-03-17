import api from "../api/client";

export const getImageAuditLogs = async (params) => {
  const { data } = await api.get("/api/audit/image-events", { params });
  return data;
};
