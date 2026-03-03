import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Code from "@editorjs/code";
import Quote from "@editorjs/quote";

export default function Editor({ onChange, initialData }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        data: initialData || {},
        async onChange(api) {
          const content = await api.saver.save();
          onChange(content);
        },
        tools: {
          header: Header,
          list: List,
          code: Code,
          quote: Quote,
          image: {
            class: ImageTool,
            config: {
              endpoints: {
                byFile: "http://localhost:5000/api/upload/editor",
              },
              additionalRequestHeaders: {
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
              },
            },
          },
        },
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return <div id="editorjs" className="border p-4 bg-white" />;
}