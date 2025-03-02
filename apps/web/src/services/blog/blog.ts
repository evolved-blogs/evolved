import { CreateBlogQuery } from "./blog.type";
import api from "@src/utils/axios";

export const createBlog = async (data: CreateBlogQuery) => {
  try {
    console.log("Data:", data);
    const response = await api.post("/blog/create", {
      ...data,
      status: "PUBLISHED",
    });
    console.log("Response:", response);
    return { success: response.status === 201 };
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};
