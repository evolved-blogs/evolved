import api from "@src/utils/axios";
import { CreateUser } from "./createUser.type";

export const createUser = async (data: CreateUser) => {
  try {
    const response = await api.post("/auth/create-user", data);
    return { success: response.status === 201 };
  } catch (error) {
    throw error;
  }
};
