import { CreateBlogQuery } from "./blog.type";
import api from "@src/utils/axios";

export const createBlog = async (data: CreateBlogQuery) => {
  try {
    const response = await api.post("/blog/create", {
      ...data,
      status: "PUBLISHED",
    });
    return { success: response.status === 201 };
  } catch (error) {
    throw error;
  }
};

export const getBlogs = async () => {
  try {
    const response = await api.get("/blog");
    console.log("response", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBlogBySlug = async (slug: string) => {
  try {
    const response = await api.get(`/blog/get-blog/${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
