import api from "@src/utils/axios";
import { Login } from "./login.type";

export const login = async (data: Login) => {
  try {
    const response = await api.post("/auth/login", data);

    console.log("response", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
