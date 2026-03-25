import React from "react";

export default function BlogRenderer({ content }) {
  if (!content || !content.blocks) return null;

  return (
    <div className="max-w-none break-words text-base leading-7 text-gray-800 sm:text-[17px] [&_a]:break-words [&_a]:text-blue-600 [&_a]:underline">
      {content.blocks.map((block, index) => {
        switch (block.type) {
          case "header": {
            const level = block.data.level || 2;

            const headingStyles = {
              1: "mt-10 mb-4 text-3xl font-bold leading-tight",
              2: "mt-8 mb-3 text-2xl font-semibold leading-tight",
              3: "mt-6 mb-2 text-xl font-semibold leading-snug",
              4: "mt-5 mb-2 text-lg font-semibold leading-snug",
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

          case "paragraph": {
              const text = block.data.text;

              const youtubeRegex =
                /(https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+))/;

              const match = text.match(youtubeRegex);

              if (match) {
                const videoId = match[2];

                return (
                  <div key={index} className="my-8">
                    <div className="aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        className="w-full h-full rounded-lg"
                        allowFullScreen
                      />
                    </div>
                  </div>
                );
              }

              const html = text.replace(
                /<a /g,
                '<a target="_blank" rel="noopener noreferrer" '
              );

              return (
                <p
                  key={index}
                  className="mb-4 leading-7 sm:leading-8"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              );
            }

          case "list": {
            const isOrdered = block.data.style === "ordered";

            const ListTag = isOrdered ? "ol" : "ul";

            return (
              <ListTag
                key={index}
                className={`${
                  isOrdered ? "list-decimal" : "list-disc"
                } mb-6 pl-5 pr-1 space-y-2 sm:pl-6`}
              >
                {block.data.items.map((item, i) => (
                  <li
                    key={i}
                    className="leading-7 sm:leading-8"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                ))}
              </ListTag>
            );
          }

          case "image":
            return (
              <div key={index} className="my-8">
                <img
                  src={block.data.file?.url}
                  alt={block.data.caption || "Blog image"}
                  loading="lazy"
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

          case "quote":
            return (
              <blockquote
                key={index}
                className="my-6 border-l-4 border-gray-400 pl-4 italic leading-7 text-gray-700 sm:pl-5 sm:leading-8"
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );

          case "code":
            return (
              <pre
                key={index}
                className="my-6 overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-white sm:text-base"
              >
                <code>{block.data.code}</code>
              </pre>
            );

          case "delimiter":
            return (
              <div key={index} className="my-10 text-center text-gray-400">
                ***
              </div>
            );

          case "warning":
            return (
              <div
                key={index}
                className="my-6 border-l-4 border-yellow-500 bg-yellow-100 p-4"
              >
                <p className="font-semibold">{block.data.title}</p>
                <p>{block.data.message}</p>
              </div>
            );

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

          case "table":
            return (
              <div key={index} className="overflow-x-auto my-6">
                <table className="w-full min-w-[640px] table-auto border-collapse border border-gray-300">
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


           case "youtube":
            return (
              <div key={index} className="my-8 aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${block.data.url.split("v=")[1]}`}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                />
              </div>
  ); 

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
      <p className="mt-8">
        Explore more on our{" "}
        <a href="/products">ERP products</a> and{" "}
        <a href="/industries">industry solutions</a> to see how PunjabBulls
        applies these ideas in real business environments.
      </p>
    </div>
  );
}
