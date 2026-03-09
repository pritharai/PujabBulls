// import { useEffect, useRef } from "react";
// import EditorJS from "@editorjs/editorjs";
// import Header from "@editorjs/header";
// import List from "@editorjs/list";
// import ImageTool from "@editorjs/image";
// import Code from "@editorjs/code";
// import Quote from "@editorjs/quote";
// import Table from "@editorjs/table";
// import Embed from "@editorjs/embed";
// // import Checklist from "@editorjs/checklist";
// import Delimiter from "@editorjs/delimiter";
// import InlineCode from "@editorjs/inline-code";
// import Marker from "@editorjs/marker";
// import ColorPlugin from "editorjs-text-color-plugin";


// export default function Editor({ onChange, initialData }) {
//   const editorRef = useRef(null);
//   const API_URL = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     if (!editorRef.current) {
//       editorRef.current = new EditorJS({
//         holder: "editorjs",
//         data: initialData || {},

//         async onChange(api) {
//           const content = await api.saver.save();
//           onChange(content);
//         },

//         tools: {
//           header: {
//             class: Header,
//             inlineToolbar: true
//           },

//           list: {
//             class: List,
//             inlineToolbar: true
//           },

//           // checklist: {
//           //   class: Checklist,
//           //   inlineToolbar: true
//           // },

//           table: {
//             class: Table,
//             inlineToolbar: true
//           },

//           quote: {
//             class: Quote,
//             inlineToolbar: true
//           },

//           code: Code,

//           inlineCode: InlineCode,

//           delimiter: Delimiter,

//           embed: Embed,
//           // youtube: YoutubeTool,   

    

//           marker: {
//             class: Marker
//           },

//           Color: {
//             class: ColorPlugin,
//             config: {
//               colorCollections: [
//                 "#000000",
//                 "#EF4444",
//                 "#3B82F6",
//                 "#10B981",
//                 "#F59E0B",
//                 "#9333EA"
//               ],
//               defaultColor: "#000000",
//               type: "text"
//             }
//           },

//           image: {
//             class: ImageTool,
//             config: {
//               endpoints: {
//                 byFile: `${API_URL}/api/upload/editor`
//               },
//               additionalRequestHeaders: {
//                 Authorization: `Bearer ${localStorage.getItem("adminToken")}`
//               }
//             }
//           }
//         },

//         inlineToolbar: [
//           "bold",
//           "italic",
//           "link",
//           // "marker",
//           // "Color",
//           // "inlineCode"
//         ]
//       });
//     }

//     return () => {
//       if (editorRef.current) {
//         editorRef.current.destroy();
//         editorRef.current = null;
//       }
//     };
//   }, []);

//   return <div id="editorjs" className="border p-4 bg-white" />;
// }

import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Code from "@editorjs/code";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Embed from "@editorjs/embed";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import ColorPlugin from "editorjs-text-color-plugin";

export default function Editor({ onChange, initialData }) {

  const editorRef = useRef(null);
  const instanceRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {

    if (instanceRef.current) return;

    const editor = new EditorJS({

      holder: editorRef.current,

      data: initialData || {},

      async onChange(api) {
        const content = await api.saver.save();
        onChange(content);
      },

      tools: {

        header: {
          class: Header,
          inlineToolbar: true
        },

        list: {
          class: List,
          inlineToolbar: true
        },

        table: {
          class: Table,
          inlineToolbar: true
        },

        quote: {
          class: Quote,
          inlineToolbar: true
        },

        code: Code,

        inlineCode: InlineCode,

        delimiter: Delimiter,

        embed: Embed,

        marker: {
          class: Marker
        },

        Color: {
          class: ColorPlugin,
          config: {
            colorCollections: [
              "#000000",
              "#EF4444",
              "#3B82F6",
              "#10B981",
              "#F59E0B",
              "#9333EA"
            ],
            defaultColor: "#000000",
            type: "text"
          }
        },

        image: {
          class: ImageTool,
          config: {

            endpoints: {
              byFile: `${API_URL}/api/upload/editor`
            },

            additionalRequestHeaders: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            }

          }
        }

      },

      inlineToolbar: [
        "bold",
        "italic",
        "link"
      ]

    });

    instanceRef.current = editor;

    return () => {

      if (instanceRef.current) {
        instanceRef.current.destroy();
        instanceRef.current = null;
      }

    };

  }, [initialData]);

  return (
    <div
      ref={editorRef}
      className="border p-4 bg-white"
    />
  );
}