import { useState } from "react";
import Editor from "../../components/Editor";
import api from "../../api/client";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();


    const handleCoverUpload = async (e) => {

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
        alert(err.response?.data?.message || "Image upload failed");

    } finally {

        setUploading(false);

    }

    };


    const handleSubmit = async () => {

    if (!title || !content) {
        alert("Title and content required");
        return;
    }

    if (!coverImage) {
        alert("Main image is required before publishing");
        return;
    }

    try {

        setSubmitting(true);

        await api.post("/api/blogs", {
        title,
        excerpt,
        content,
        status: "published",
        coverImage,
        });

        navigate("/admin/blogs");

    } catch (err) {
        alert(err.response?.data?.message || "Blog creation failed");

    } finally {

        setSubmitting(false);

    }

    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-semibold">Create Blog</h1>

            <input
                type="text"
                placeholder="Title"
                className="border p-2 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Summary of the Blog"
                className="border p-2 w-full"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
            />

            {coverImage && (
                <img
                    src={coverImage.url}
                    alt="Cover Preview"
                    className="w-40 rounded"
                />
                )}
            {/* Wrap it in a div for spacing and add a label */}
            <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">Cover Image</label>
                <input
                    type="file"
                     accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={handleCoverUpload}
                    disabled={uploading} />

                {uploading && (
                <p className="text-sm text-blue-500">Uploading image...</p>
                )}
            </div>

            <Editor onChange={setContent} />

            <button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-black text-white px-6 py-2"
                >
                {submitting ? "Publishing..." : "Publish"}
            </button>
        </div>
    );
}
