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
// chi tiết sp
export const getProductDetail = async (productId) => {
  console.log("Product ID:", productId); // Kiểm tra xem ID có đúng không
  try {
    const response = await api.get(`/products/detail/${productId}`);
    console.log('🔵 Raw axios response:', response); // Log toàn bộ response từ API
    console.log('🔵 Data từ API:', response.data); // Log data trả về từ response

    // Kiểm tra xem dữ liệu có trong response.data không
    if (response && response.data) {
      console.log("Data from API:", response.data);
      setProduct(response.data);
    } else {
      console.error("API did not return data:", response);
    }
  } catch (error) {
    console.error('Lỗi khi lấy chi tiết sản phẩm:', error.response?.data || error.message);
    throw error;
  }
};


// lấy sp theo danh mục
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


