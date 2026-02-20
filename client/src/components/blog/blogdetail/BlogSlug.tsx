"use client";
import useGetBlog from "@/hooks/useGetBlog";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import BlogDetail from "./BlogDetail";
import BlogSlider from "../BlogSlider";
import Loading from "../../ui/Loading";
import useGetLatestBlogs from "@/hooks/useGetLatestBlogs";
import BreadCrumb from "@/components/ui/BreadCrumb";

function BlogSlug() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  const { blog, isLoading } = useGetBlog(slug);
  const { blogs } = useGetLatestBlogs();

  useEffect(() => {
    if (isLoading) return;

    if (!blog) {
      toast.error("Không tìm thấy bài viết");
      router.push("/");
      return;
    }
  }, [blog, isLoading, router]);

  const array = [
    {
      name: "Trang chủ",
      href: "/",
    },
    {
      name: "Tất cả tin tức",
      href: `/blog`,
    },
    {
      name: `${blog?.title}`,
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loading height={70} size={50} color="black" thickness={2} />
      ) : (
        <>
          <BreadCrumb items={array} />
          <BlogDetail blog={blog!} />
        </>
      )}

      {!isLoading && <BlogSlider title="Tin tức liên quan" blogs={blogs} />}
    </>
  );
}

export default BlogSlug;
