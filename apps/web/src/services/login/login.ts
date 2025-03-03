import api from "@src/utils/axios";
import { Login } from "./login.type";

export const login = async (data: Login) => {
  try {
    const response = await api.post("/auth/login", data);
    return { success: response.status === 200 };
  } catch (error) {
    throw error;
  }
};
