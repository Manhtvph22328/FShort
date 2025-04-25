// services/categoryService.js
import api from "./api";

export const getAllCategories = async () => {
  try {
    const response = await api.get("/categories/listCategories"); // Sửa thành /listCategories để khớp với BE
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy danh mục:", error);
    throw error;
  }
};
