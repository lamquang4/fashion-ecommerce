"use client";
import TableOfContent from "@/components/ui/TableOfContent";
import { Blog } from "@/types/type";
import { generateNumberingTOC } from "@/utils/generateNumberingTOC";
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

  const numberedHeadings = useMemo(
    () => generateNumberingTOC(headings),
    [headings]
  );

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
    <section className="mb-[40px] relative px-[15px]">
      <div className=" w-full max-w-[1230px] mx-auto">
        <div className="main-prose">
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
        </div>

        <div className="flex gap-[25px] flex-wrap">
          <div className="order-2 lg:order-1 relative lg:flex-1 main-prose">
            <p>{blog?.summary || ""}</p>

            <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
          </div>

          <div className="order-1 lg:order-2 border border-gray-300 w-full lg:w-[300px] h-full lg:sticky top-[80px] overflow-y-auto max-h-[400px] rounded-md block">
            <TableOfContent headings={numberedHeadings} maxLevel={maxLevel} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogDetail;
