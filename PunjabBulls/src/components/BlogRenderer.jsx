import React from "react";

export default function BlogRenderer({ content }) {
  if (!content || !content.blocks) return null;

  return (
    <div className="max-w-none leading-7 text-gray-800">
      {content.blocks.map((block, index) => {
        switch (block.type) {
          /* ================= HEADER ================= */
          case "header": {
            const level = block.data.level || 2;

            const headingStyles = {
              1: "text-3xl font-bold mt-10 mb-4",
              2: "text-2xl font-semibold mt-8 mb-3",
              3: "text-xl font-semibold mt-6 mb-2",
              4: "text-lg font-semibold mt-5 mb-2",
              5: "text-base font-semibold mt-4 mb-2",
              6: "text-sm font-semibold mt-4 mb-2",
            };

            const Tag = `h${level}`;

            return (
              <Tag
                key={index}
                className={headingStyles[level] || headingStyles[2]}
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );
          }

          /* ================= PARAGRAPH ================= */
          case "paragraph":
            return (
              <p
                key={index}
                className="mb-4"
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );

          /* ================= LIST ================= */
          case "list": {
            const isOrdered = block.data.style === "ordered";

            const ListTag = isOrdered ? "ol" : "ul";

            return (
              <ListTag
                key={index}
                className={`${
                  isOrdered ? "list-decimal" : "list-disc"
                } pl-6 mb-6 space-y-2`}
              >
                {block.data.items.map((item, i) => (
                  <li
                    key={i}
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                ))}
              </ListTag>
            );
          }

          /* ================= IMAGE ================= */
          case "image":
            return (
              <div key={index} className="my-8">
                <img
                  src={block.data.file?.url}
                  alt={block.data.caption || "Blog image"}
                  className="w-full rounded-lg"
                />
                {block.data.caption && (
                  <p
                    className="text-sm text-center text-gray-500 mt-2"
                    dangerouslySetInnerHTML={{
                      __html: block.data.caption,
                    }}
                  />
                )}
              </div>
            );

          /* ================= QUOTE ================= */
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-4 border-gray-400 pl-4 italic my-6 text-gray-700"
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );

          /* ================= CODE ================= */
          case "code":
            return (
              <pre
                key={index}
                className="bg-gray-900 text-white p-4 rounded-lg my-6 overflow-x-auto"
              >
                <code>{block.data.code}</code>
              </pre>
            );

          /* ================= DELIMITER ================= */
          case "delimiter":
            return (
              <div key={index} className="my-10 text-center text-gray-400">
                ***
              </div>
            );

          /* ================= WARNING ================= */
          case "warning":
            return (
              <div
                key={index}
                className="bg-yellow-100 border-l-4 border-yellow-500 p-4 my-6"
              >
                <p className="font-semibold">{block.data.title}</p>
                <p>{block.data.message}</p>
              </div>
            );

          /* ================= EMBED (YouTube etc.) ================= */
          case "embed":
            return (
              <div key={index} className="my-8">
                <div className="aspect-video">
                  <iframe
                    src={block.data.embed}
                    title="Embedded content"
                    className="w-full h-full rounded-lg"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              </div>
            );

          /* ================= TABLE ================= */
          case "table":
            return (
              <div key={index} className="overflow-x-auto my-6">
                <table className="table-auto border-collapse border border-gray-300 w-full">
                  <tbody>
                    {block.data.content.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="border border-gray-300 px-3 py-2"
                            dangerouslySetInnerHTML={{ __html: cell }}
                          />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          /* ================= RAW HTML (ADMIN CONTROLLED) ================= */
          case "raw":
            return (
              <div
                key={index}
                className="my-6"
                dangerouslySetInnerHTML={{ __html: block.data.html }}
              />
            );

          /* ================= FALLBACK ================= */
          default:
            return null;
        }
      })}
    </div>
  );
}