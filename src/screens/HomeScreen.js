import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAllProducts } from '../services/productService';
import { getAllCategories } from '../services/categoryService';

// ... (imports giữ nguyên)
const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Gợi ý cho bạn');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [productData, categoryData] = await Promise.all([
          getAllProducts(),
          getAllCategories()
        ]);
        console.log(productData);
        setProducts(productData);
        setCategories(categoryData);
      } catch (error) {
        console.error("Fetch error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const getFilteredProducts = () => {
    if (selectedCategory === 'Gợi ý cho bạn') {
      return products.filter((product) => product.rating > 4.0);
    } else if (selectedCategory === 'Phổ biến') {
      return products.filter((product) => product.rating > 3.5);
    } else if (selectedCategory === 'Bán chạy') {
      return [...products].sort((a, b) => b.sold - a.sold).slice(0, 10);
    }

    const selectedCat = categories.find((cat) => cat.name === selectedCategory);
    if (selectedCat) {
      return products.filter((product) => product.category === selectedCat._id);
    }

    return products;
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Men's Shop FSport</Text>
          <Text style={styles.subHeaderText}>Hello, My Friend</Text>
        </View>
        <TouchableOpacity onPress={()  => navigation.navigate('Notification')}>
          <Image source={require('../assets/notificationOn.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
          <Image source={require('../assets/favoriteOn.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Danh mục tĩnh */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
        {['Gợi ý cho bạn', 'Phổ biến', 'Bán chạy'].map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryButton, selectedCategory === category && styles.selectedCategoryButton]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat._id}
            style={[styles.categoryButton, selectedCategory === cat.name && styles.selectedCategoryButton]}
            onPress={() => setSelectedCategory(cat.name)}
          >
            <Text style={[styles.categoryText, selectedCategory === cat.name && styles.selectedCategoryText]}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Danh sách sản phẩm theo danh mục */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardContainer}>
        {getFilteredProducts().map((product) => (
          <TouchableOpacity
            key={product._id}
            onPress={() => navigation.navigate('ShirtDetail', { product })}
          >
            <View style={styles.card}>
              <View style={styles.imageContainer}>
                {product.images?.length > 0 && (
                  <Image
                    source={{ uri: product.images[0] }}
                    style={styles.cardImage}
                  />
                )}
                {/* Đánh giá ở góc trên phải */}
                {product.rating ? (
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>★ {product.rating}</Text>
                  </View>
                ) : null}
                {/* Nội dung dưới */}
                <View style={styles.cardBottom}>
                  <View style={styles.cardInfoLeft}>
                    <Text
                      style={styles.gridTitle}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {product.name_product}
                    </Text>

                    <Text style={styles.cardPrice}>{product.price}₫</Text>
                  </View>
                  <Text style={styles.cardSoldRight}>Đã bán: {product.sold}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>


      {/* Header danh sách sản phẩm */}
      <View style={styles.productHeader}>
        <Text style={styles.productText}>Danh sách sản phẩm</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AllSp')}>
          <Text style={styles.viewAllText}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách tất cả sản phẩm */}
      <View style={styles.gridContainer}>
        {products.map((product, index) => (
          <TouchableOpacity
            key={product._id}
            onPress={() => navigation.navigate('ShirtDetail', { product })}
            style={[
              styles.gridItem,
              index % 2 === 0 ? { marginRight: 10 } : null
            ]}
          >
            <View style={styles.cardGrid}>
              {product.images?.length > 0 && (
                <Image
                  source={{ uri: product.images[0] }}
                  style={styles.gridImage}
                />
              )}
              <View style={styles.gridInfo}>
                <View style={styles.gridInfoLeft}>
                  <Text style={styles.gridTitle} numberOfLines={2} ellipsizeMode="tail">
                    {product.name_product}
                  </Text>
                  <Text style={styles.gridPrice}>{product.price}₫</Text>
                  <Text style={styles.gridSold}>Đã bán: {product.sold}</Text>
                </View>
                {product.rating ? (
                  <Text style={styles.gridRating}>★ {product.rating}</Text>
                ) : null}
              </View>

            </View>
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexGrow: 1,
    paddingBottom: 150,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  logo: {
    width: 45,
    height: 45,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 12,
  },
  icon: {
    width: 22,
    height: 22,
    marginLeft: 5,
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 27,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
    top: 20,
  },
  subHeaderText: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    top: 25,
    right: 50,
  },
  viewAllText: {
    fontSize: 14,
    color: '#808080',
    fontWeight: '500',
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 10,
    top: 15,
  },
  categoryButton: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000000',
  },
  selectedCategoryButton: {
    backgroundColor: '#000000'
  },
  categoryText: {
    fontSize: 14,
    color: '#000',
  },
  selectedCategoryText: {
    color: '#ffffff'
  },
  cardContainer: {
    flexDirection: 'row',
    height: 'auto',
    marginBottom: 30,
  },
  card: {
    marginRight: 20,
    borderRadius: 20,
    position: 'relative',
    width: 250,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // elevation: 8,
    marginBottom: 10,
    marginTop: 20,
    height: 'auto', // Đảm bảo chiều cao tự động theo nội dung
  },

  imageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardDetails: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  cardPrice: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
    marginVertical: 2,
  },
  cardSold: {
    fontSize: 14,
    color: '#333',
    marginTop: 2,
  },
  cardRating: {
    borderRadius: 8,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
    backgroundColor: '#FFF8DC',
    color: '#FFD700',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  wishlistButton: {
    position: 'absolute',
    top: -30,
    right: 15,
  },
  cardWishlistIcon: {
    width: 25,
    height: 25,
  },
  productHeader: {
    // top: -100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10
  },
  productText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },

  ratingBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFF8DC',
    borderColor: '#FFD700',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    zIndex: 1,
  },
  ratingText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start', // Đảm bảo không bị đẩy xuống quá dưới
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 5, // Thêm margin trên để tránh chồng lấp
  },
  cardInfoLeft: {
    flexShrink: 1,
  },
  cardSoldRight: {
    fontSize: 12,
    top:43,
    color: '#666',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 50, // Tăng marginBottom để tránh chồng lên phần dưới
  },


  gridItem: {
    width: '48%',
    marginBottom: 15,
    marginTop: 5,  // Thêm margin trên nếu cần
  },


  cardGrid: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // elevation: 6, // Hiệu ứng bóng cho Android
  },

  gridImage: {
    width: '100%',
    height: 150,
  },

  gridInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 8,
    height: 100,
  },

  gridInfoLeft: {
    flex: 1,
  },
  gridTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 2,
    height: 36, // Giữ ổn định chiều cao dòng tiêu đề
  },

  gridPrice: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },

  gridSold: {
    fontSize: 12,
    color: '#333',
  },

  gridRating: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default HomeScreen;
