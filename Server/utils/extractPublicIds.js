export const extractPublicIdsFromContent = (content) => {
  const publicIds = [];

  if (!content?.blocks) return publicIds;

  content.blocks.forEach((block) => {
    if (block.type === "image") {

      const publicId = block.data?.file?.public_id;

      if (publicId) {
        publicIds.push(publicId);
      }

      // fallback if public_id missing (old blogs)
      else if (block.data?.file?.url) {

        const url = block.data.file.url;

        const parts = url.split("/");
        const fileWithExtension = parts.slice(-2).join("/");

        const extracted = fileWithExtension.replace(/\.[^/.]+$/, "");

        publicIds.push(extracted);
      }
    }
  });

  return publicIds;
};

