import api from "@src/utils/axios";
import { UploadFileArgs, UploadFileResponse } from "./upload.type";

export const uploadFile = async ({
  file,
}: UploadFileArgs): Promise<UploadFileResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("/file-upload/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadMultipleFiles = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await api.post("/file-upload/upload-multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
