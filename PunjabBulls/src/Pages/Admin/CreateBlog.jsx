import { useState } from "react";
import Editor from "../../components/Editor";
import api from "../../api/client";
import { useNavigate } from "react-router-dom";

export default function CreateBlog() {
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [content, setContent] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const navigate = useNavigate();

    const handleCoverUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        const { data } = await api.post("/api/upload", formData);
        setCoverImage({
            url: data.url,
            public_id: data.public_id,
        });
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

        const data = await api.post("/api/blogs", {
            title,
            excerpt,
            content,
            status: "published",
            coverImage,
        });
        console.log(data.data)
        navigate("/admin/blogs");
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

            {/* Wrap it in a div for spacing and add a label */}
            <div className="flex flex-col gap-2">
                <label className="font-medium text-gray-700">Cover Image</label>
                <input
                    type="file"
                    onChange={handleCoverUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
            </div>

            <Editor onChange={setContent} />

            <button
                onClick={handleSubmit}
                className="bg-black text-white px-6 py-2"
            >
                Publish
            </button>
        </div>
    );
}