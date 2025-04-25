// productService.js
import api from "./api";


export const getAllProducts = async () => {
  try {
    const response = await api.get('/products/listProducts');
    return response;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    throw error;
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/products/category/${categoryId}`);
    return response;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm theo danh mục:", error);
    throw error;
  }
};

// productService.js

export const searchProducts = async (keyword) => {
  try {
    // Sử dụng phương thức GET thay vì POST và truyền keyword qua query params
    const response = await api.get('/products/searchProducts', {
      params: { keyword: keyword.trim() } // Truyền keyword qua query params
    });
    return response;
  } catch (error) {
    console.error('Lỗi khi tìm kiếm sản phẩm:', error);
    throw error;
  }
};


