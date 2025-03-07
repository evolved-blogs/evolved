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
