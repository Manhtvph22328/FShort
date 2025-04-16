// productService.js
import api from "./api";


const BASE_IMAGE_URL = 'http://10.0.3.2:5000';

const fixProductImages = (product) => ({
  ...product,
  images: product.images.map(img =>
    img.startsWith('http') ? img : `${BASE_IMAGE_URL}${img}`
  )
});

export const getAllProducts = async () => {
  try {
    const response = await api.get('/products/listProducts');
    const products = response.data;
    return products.map(fixProductImages);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    throw error;
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await api.get(`/products/category/${categoryId}`);
    const products = response.data;
    return products.map(fixProductImages);
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
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tìm kiếm sản phẩm:', error);
    throw error;
  }
};


