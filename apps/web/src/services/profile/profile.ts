import api from "@src/utils/axios";
import { Profile } from "./profile.type";

export const updateProfile = async (data: Profile) => {
  try {
    const response = await api.patch("/profile", data);

    console.log("response", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
