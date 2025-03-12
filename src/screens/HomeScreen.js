import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('Gợi ý cho bạn');

  const products = [
    {
      id: 1,
      title: 'Áo Hoodie',
      price: '300.000₫',
      rating: 3.5,
      image: require('../assets/Sp1.jpg'),
      description: 'Chất liệu vải dày dặn.',
    },
    {
      id: 2,
      title: 'Áo Hoodie Xám',
      price: '320.000₫',
      rating: 4.0,
      image: require('../assets/Sp1.jpg'),
      description: 'Thoải mái, phong cách.',
    },
    {
      id: 3,
      title: 'Áo Hoodie Đen',
      price: '290.000₫',
      rating: 4.2,
      image: require('../assets/Sp1.jpg'),
      description: 'Mềm mại, giữ ấm tốt.',
    },
    {
      id: 4,
      title: 'Áo Hoodie Trắng',
      price: '350.000₫',
      rating: 4.6,
      image: require('../assets/Sp1.jpg'),
      description: 'Đẹp và phong cách.',
    },
  ];

  // Hàm lọc sản phẩm theo danh mục
  const getFilteredProducts = () => {
    if (selectedCategory === 'Gợi ý cho bạn') {
      return products.filter((product) => product.rating > 4.0);
    } else if (selectedCategory === 'Phổ biến') {
      return products.filter((product) => product.rating > 3.5);
    } else if (selectedCategory === 'Xu hướng') {
      return products.filter((product) => product.rating > 4.5);
    }
    return products;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Men's Shop FShort</Text>
          <Text style={styles.subHeaderText}>Hello, My Friend</Text>
        </View>

        <TouchableOpacity onPress={{}}>
            <Image
              source={require('../assets/notificationOn.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        <TouchableOpacity onPress={{}}>
            <Image
              source={require('../assets/favoriteOn.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

      </View>

      {/* Categories */}
      <View style={styles.categories}>
        {['Gợi ý cho bạn', 'Phổ biến', 'Xu hướng'].map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category)}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Danh sách sản phẩm theo danh mục */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardContainer}>
        {getFilteredProducts().map((product) => (
          <TouchableOpacity key={product.id}>
            <View style={styles.card}>
              <View style={styles.imageContainer}>
                <Image source={product.image} style={styles.cardImage} />
                <View style={styles.cardDetails}>
                  <TouchableOpacity style={styles.wishlistButton}>
                    <Image
                      source={require('../assets/favorite.png')}
                      style={styles.cardWishlistIcon}
                    />
                  </TouchableOpacity>
                  <Text style={styles.cardTitle}>{product.title}</Text>
                  <Text style={styles.cardDescription}>{product.description}</Text>
                  <Text style={styles.cardPrice}>{product.price}</Text>
                  <Text style={styles.cardRating}>★ {product.rating}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Danh sách sản phẩm */}
      <View style={styles.productHeader}>
        <Text style={styles.productText}>Danh sách sản phẩm</Text>
        <TouchableOpacity onPress={{}}>
          <Text style={styles.viewAllText}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        style={styles.cardContainer2}>
        {products.map((product) => (
          <TouchableOpacity key={product.id}>
            <View style={styles.card}>
              <View style={styles.imageContainer}>
                <Image source={product.image} style={styles.cardImage} />
                <View style={styles.cardDetails}>
                  <TouchableOpacity style={styles.wishlistButton}>
                    <Image
                      source={require('../assets/favorite.png')}
                      style={styles.cardWishlistIcon}
                    />
                  </TouchableOpacity>
                  <Text style={styles.cardTitle}>{product.title}</Text>
                  <Text style={styles.cardDescription}>{product.description}</Text>
                  <Text style={styles.cardPrice}>{product.price}</Text>
                  <Text style={styles.cardRating}>★ {product.rating}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  logo: {
    width: 45, height: 45,
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
    justifyContent: 'space-between',
    marginBottom: 20,
    top: 15,
  },
  categoryButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 2,
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
  },
  card: {
    marginRight: 20,
    borderRadius: 20,
    position: 'relative',
    width: 250,
    height: 450,
    borderWidth: 1,
    borderColor: '#F4F4F4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    top: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 300,
    borderRadius: 20,
  },
  cardDetails: {
    padding: 10,
    top: -100,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    top: -20, left: 10,
  },
  cardDescription: {
    fontSize: 14,
    left: 10, top: -20,
    color: 'white',
    marginVertical: 5
  },
  cardPrice: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginVertical: 2,
    left: 10, top: -10,
  },
  cardRating: {
    borderRadius: 8,
    width: 50,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginTop: 5,
    top: -285,
    left: 175,
  },
  wishlistButton: {
    position: 'absolute',
    top: 60,
    right: 15,
  },
  cardWishlistIcon: {
    width: 25,
    height: 25,
  },
  //danh sach all
  productHeader: {
    top: -100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10
  },
  productText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  cardContainer2: {
    flexDirection: 'row',
    top: -110,
  },
});

export default HomeScreen;