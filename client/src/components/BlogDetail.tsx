"use client";
import { Blog } from "@/types/type";
import { removeVietNamese } from "@/utils/removeVietnamese";
import { useEffect, useMemo, useState } from "react";
type Props = {
  blog: Blog;
};

function BlogDetail({ blog }: Props) {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: number }[]
  >([]);
  const [parsedContent, setParsedContent] = useState<string>("");

  useEffect(() => {
    if (!blog?.content) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(blog.content, "text/html");

    const elements = Array.from(doc.querySelectorAll("h2, h3, h4"));
    const newHeadings = elements.map((elem) => {
      const id = elem.id || removeVietNamese(elem.textContent || "");
      elem.setAttribute("id", id);
      return {
        id,
        text: elem.textContent || "",
        level: Number(elem.nodeName.charAt(1)),
      };
    });

    setHeadings(newHeadings);

    setParsedContent(doc.body.innerHTML);
  }, [blog?.content]);

  const maxLevel = useMemo(() => {
    if (!headings.length) return 1;
    return Math.min(...headings.map((h) => h.level));
  }, [headings]);

  return (
    <section className="my-[40px] relative">
      <div className=" w-full max-w-[1230px] px-[10px] sm:px-[15px] mx-auto">
        <div className="flex gap-[25px] flex-wrap">
          <div className="main-prose flex-1">
            <h1>{blog?.title}</h1>

            <p className="font-normal">
              Ngày đăng:{" "}
              <span>
                {blog &&
                  new Date(blog?.createdAt).toLocaleString("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
              </span>
            </p>

            <hr />

            <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
          </div>

          <div className="border border-gray-300 w-[300px] h-full sticky top-[80px] overflow-y-auto max-h-[400px] rounded-md lg:block hidden">
            <div className="space-y-3">
              <div className="sticky top-0 bg-white border-b border-gray-300 p-3">
                <h5 className=" font-semibold">Nội dung bài viết</h5>
              </div>

              <ol className="text-[0.9rem] font-normal space-y-[10px] p-3 pt-0">
                {headings.map((h, index) => (
                  <li
                    className="hover:underline underline-offset-2 decoration-[#158ed4] flex"
                    key={h.id}
                    style={{
                      marginLeft:
                        h.level !== maxLevel
                          ? `${(h.level - maxLevel) * 16}px`
                          : "0px",
                    }}
                  >
                    <a href={`#${h.id}`}>
                      {index + 1}.{" "}
                      <span className="text-[#158ed4] ">{h.text}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogDetail;
