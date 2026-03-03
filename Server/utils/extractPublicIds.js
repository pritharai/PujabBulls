export const extractPublicIdsFromContent = (content) => {
  const publicIds = [];

  if (!content?.blocks) return publicIds;

  content.blocks.forEach((block) => {
    if (block.type === "image" && block.data?.file?.url) {
      const url = block.data.file.url;

      // Extract public_id from Cloudinary URL
      const parts = url.split("/");
      const fileWithExtension = parts.slice(-2).join("/"); 
      // blog_images/abc123.jpg

      const publicId = fileWithExtension.replace(/\.[^/.]+$/, ""); 
      // blog_images/abc123

      publicIds.push(publicId);
    }
  });

  return publicIds;
};