import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import InputSearchModal from './InputSearch';

// Dữ liệu sản phẩm
const products = [
  { id: 1, title: 'Áo Hoodie', price: '300.000₫', rating: 3.5, image: require('../assets/Sp1.jpg'), description: 'Chất liệu vải dày dặn.' },
  { id: 2, title: 'Áo Hoodie Xám', price: '320.000₫', rating: 4.0, image: require('../assets/Sp2.jpg'), description: 'Thoải mái, phong cách.' },
  { id: 3, title: 'Áo Hoodie Đen', price: '290.000₫', rating: 4.2, image: require('../assets/Sp3.jpg'), description: 'Mềm mại, giữ ấm tốt.' },
  { id: 4, title: 'Áo Hoodie Trắng', price: '350.000₫', rating: 4.6, image: require('../assets/Sp2.jpg'), description: 'Đẹp và phong cách.' },
];

// Danh mục sản phẩm và điều kiện lọc
const categories = {
  'Tất cả': () => true, // Hiển thị tất cả sản phẩm
  'Gợi ý cho bạn': product => product.rating > 4.0,
  'Phổ biến': product => product.rating > 3.5,
  'Xu hướng': product => product.rating > 4.5,
  'Yêu thích': () => false, // Không có sản phẩm
};

export default function SearchScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả'); // Đặt mặc định là "Tất cả"
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Lọc sản phẩm theo danh mục và từ khóa tìm kiếm
  const filteredProducts = products.filter(product =>
    categories[selectedCategory](product) &&
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.headerLogo} />
        <Text style={styles.headerTitle}>Men's Shop FShort</Text>
      </View>

      {/* Search bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Nhập tên sản phẩm..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Image source={require('../assets/searchClose.png')} style={styles.searchIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Image
              source={require('../assets/sortOff.png')}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Object.keys(categories).map(category => ( // Dùng đúng danh sách danh mục
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedCategory(category)} // Không cần kiểm tra lại
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.selectedCategoryText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tiêu đề gợi ý */}
      <View style={styles.suggestionHeader}>
        <Text style={styles.suggestionHeaderText}>{selectedCategory}</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Đang tải...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productDescription}>{item.description}</Text>
                <Text style={styles.productRating}>⭐ {item.rating}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<Text style={styles.emptyText}>Không tìm thấy sản phẩm phù hợp</Text>}
        />
      )}
    {/* gọi Model */}
    <InputSearchModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  headerLogo: {
    width: 45, height: 45,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 12,
  },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#000', marginLeft: 10 },

  // Categories
  categoriesContainer: {
    marginBottom: 15,
  },
  categoryButton: {
    backgroundColor: '#FFFFFF',
    width: 97,
    height: 33,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000000',
    marginHorizontal: 4,
    shadowColor: '#000',
  },
  selectedCategoryButton: {
    backgroundColor: '#000000',
  },
  categoryText: {
    fontSize: 14,
    color: '#000',
  },
  selectedCategoryText: {
    color: '#FFF',
  },
  // Search bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 6,
  },
  suggestionHeader: {
    marginBottom: 10
  },
  suggestionHeaderText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  loadingContainer: {
    marginTop: 50,
    alignItems: 'center'
  },
  listContent: {
    paddingBottom: 30
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
    fontSize: 15
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center'
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  productPrice: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
    marginVertical: 5
  },
  productDescription: {
    fontSize: 12,
    color: '#777'
  },
  productRating: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFA500',
    marginTop: 5
  },
  //modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionButton: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});