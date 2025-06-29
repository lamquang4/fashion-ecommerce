"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { setLoading } from "@/redux/features/loadingSlice";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export interface Product {
  _id: string;
  name: string;
  price: number;
  discount: number;
  description: string;
  image: string[];
  slug: string;
  status: number;
  category: {
    _id: string;
    namecategory: string;
    gender: number;
  };
  inventory: {
    _id: string;
    quantity: number;
    size: string;
    color: {
      _id: string;
      namecolor: string;
      codecolor: string;
    };
  }[];
  createdAt: string;
}

export default function useGetProductsSlug(slug: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [keyword, setKeyword] = useState("");

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const dispatch = useAppDispatch();

  const fetchProducts = async () => {
    dispatch(setLoading(true));
    try {
      const res = await axios.get(
        `/api/get-products/${slug}?page=${page}&limit=${limit}`,
        {
          params: {
            keyword,
          },
        }
      );
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.total);
    } catch (err) {
      console.error("Lỗi:", err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, limit, keyword]);

  return {
    products,
    fetchProducts,
    totalPages,
    totalItems,
    currentPage: page,
    limit,
    setKeyword,
  };
}
