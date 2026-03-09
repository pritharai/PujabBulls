import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "../../components/Editor";
import api from "../../api/client";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState({});
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [initialContent, setInitialContent] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  // Fetch blog
  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await api.get(`/api/blogs/id/${id}`);
      const blog = data.blog;
      console.log("Blog fetched:", blog);
      console.log("Cover image:", blog.coverImage);

      setTitle(blog.title);
      setContent(blog.content);
      setExcerpt(blog.excerpt);
      setInitialContent(blog.content);
      setCoverImage(blog.coverImage);
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  const handleCoverUpload = async (e) => {

    if (uploading) return;

    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg","image/png","image/webp"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG, and WEBP images are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {

      setUploading(true);

      const { data } = await api.post("/api/upload", formData);

      setCoverImage({
        url: data.url,
        public_id: data.public_id,
      });

    } catch (err) {

      alert("Image upload failed");

    } finally {

      setUploading(false);

    }

  };

    const handleUpdate = async () => {

      if (!title || !excerpt || !content || !coverImage) {
        alert("All fields including main image required");
        return;
      }

      try {

        setUpdating(true);

        await api.put(`/api/blogs/${id}`, {
          title,
          excerpt,
          content,
          coverImage,
        });

        navigate("/admin/blogs");

      } catch (err) {

        alert("Blog update failed");

      } finally {

        setUpdating(false);

      }

    };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Edit Blog</h1>

      <input
        type="text"
        className="border p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
      />

      <div className="flex flex-col gap-2">
        <label>Main Image</label>

        {coverImage && (
          <div className="flex flex-col gap-2">

            <img
              src={coverImage.url}
              alt="Current Cover"
              className="w-40 rounded"
            />

            <button
              onClick={() => setCoverImage(null)}
              className="text-red-500 text-sm"
            >
              Remove Image
            </button>

          </div>
        )}

        <input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleCoverUpload}
            disabled={uploading}
          />
      </div>

      {uploading && (
  <p className="text-sm text-gray-500">Uploading image...</p>
)}

      <Editor
        initialData={initialContent}
        onChange={setContent}
      />

      <button
        onClick={handleUpdate}
        disabled={updating}
        className="bg-black text-white px-6 py-2"
      >
        {updating ? "Updating..." : "Update Blog"}
      </button>
    </div>
  );
}