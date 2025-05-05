import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback, FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/action/cartAction';
import api from '../services/api';
import ProductImageSlider from '../component/productSlide';

const ShirtDetailScreen = ({ route }) => {
  const { product } = route.params;
  console.log(product);
  useEffect(() => {
    console.log(modalVisible)
  }, [modalVisible])
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const [reviews, setReviews] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    const getReviews = async () => {
      const res = await api.get('review/getReview', {
        params: {
          productId: product._id,
        }
      })
      setReviews(res.reviews);
    }
    getReviews();
  }, [product._id])
  const getSizeDescription = (size) => {
    switch (size.toUpperCase()) {
      case 'S':
        return 'Nặng: 45-55kg ~ Cao: 1m55-1m65';
      case 'M':
        return 'Nặng 55-65kg ~ Cao: 1m65-1m72';
      case 'L':
        return 'Nặng: 65-75kg ~ Cao: 1m72-1m78';
      case 'XL':
        return 'Nặng: 75-90kg ~ Cao: >1m78';
      default:
        return 'Không có mô tả';
    }
  };

  const renderReview = ({ item }) => {
    return (
      <View style={styles.reviewContainer}>
        <Image
          source={{ uri: item?.userId?.avatar }}
          style={styles.avatar}
        />

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.reviewerName}>
            {item?.userId?.fullname || 'Người dùng ẩn danh'}
          </Text>

          <Text style={styles.reviewDate}>
            {new Date(item?.createdAt).toLocaleString('vi-VN')}
          </Text>

          <Text style={styles.reviewText}>{item?.comment}</Text>
        </View>

        <Text style={styles.reviewRating}>⭐ {item?.rating}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* ScrollView để vuốt ảnh */}
      <ScrollView style={styles.scrollContainer}>
        <ProductImageSlider images={product.images} />

        {/* Hiển thị thông tin sản phẩm */}
        <View style={styles.detailsContainer}>
          <View style={styles.infoContainer}>
            <View style={styles.priceRow}>
              <Text style={styles.price}>
                {product.price.toLocaleString('vi-VN')}₫
              </Text>
              <TouchableOpacity onPress={() => { }}>
                <Image
                  source={require("../assets/favoriteOn.png")}
                  style={styles.iconFavoInline}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.productName}>
              {product.name_product ? product.name_product : 'Sản phẩm không có tên'}
            </Text>

            <Text style={styles.sold}>
              Đã bán: {product.sold || 0}
            </Text>
          </View>

          {/* Mô tả từng dòng */}
          {/* Mô tả phần 1 */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Mô tả</Text>
            {product.description && product.description.length > 0 ? (
              <Text style={styles.description}>{product.description[0]}</Text> // Hiển thị mô tả đầu tiên
            ) : (
              <Text style={styles.description}>Không có mô tả</Text>
            )}
          </View>

          {/* Mô tả phần 2 - Chi tiết */}
          {product.description && product.description.length > 1 && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.sectionTitle}>Chi tiết</Text>
              {product.description.slice(1).map((desc, index) => (
                <Text key={index} style={styles.description}>• {desc}</Text> // Hiển thị các mô tả còn lại
              ))}
            </View>
          )}
        </View>


        {/* Kích cỡ */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Kích cỡ</Text>
          {product.size && product.size.length > 0 ? (
            product.size.map((size, index) => (
              <Text key={index} style={styles.description}>
                ● Size {size}: {getSizeDescription(size)}
              </Text>
            ))
          ) : (
            <Text style={styles.description}>Không có thông tin kích cỡ</Text>
          )}
        </View>


        {/* Đánh giá */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Đánh giá</Text>
          <View style={styles.reviewRow}>
            <Text style={styles.rating}>⭐ {product.rating || 0}</Text>
          </View>
          {/* Đánh giá demo fix cứng */}
          <FlatList
            data={reviews}
            renderItem={renderReview}
            keyExtractor={item => item._id}
            nestedScrollEnabled
            scrollEnabled={false} // không cuộn riêng FlatList
          />


        </View>
      </ScrollView>
      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.chatButton}>
          <Image source={require('../assets/chat.png')} style={styles.icon2} />
          <Text style={styles.buttonText1}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText2}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText3}>Mua ngay</Text>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {/* Header */}
                <View style={styles.modalHeader}>
                  <Image source={{ uri: product.images[0] }} style={styles.modalImage} />
                  <View>
                    <Text style={styles.modalTitle}>{product.name_product}</Text>
                    <Text style={styles.sold2}>Kho: {product.quantity}</Text>
                    <Text style={styles.modalPrice}>{product.price}</Text>
                  </View>
                </View>

                {/* Chọn kích thước */}
                {/* Chọn kích thước từ API và hiển thị mô tả */}
                <Text style={styles.sectionTitle}>Kích thước</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {product.size && product.size.map((size) => {
                    const sizeDescriptions = {
                      S: 'Nặng: 45-55kg ~ Cao: 1m55-1m65',
                      M: 'Nặng: 55-65kg ~ Cao: 1m65-1m72',
                      L: 'Nặng: 65-75kg ~ Cao: 1m72-1m78',
                      XL: 'Nặng: 75-90kg ~ Cao: >1m78',
                    };

                    return (
                      <TouchableOpacity
                        key={size}
                        style={[
                          styles.sortButton,
                          selectedSize === size && styles.selectedButton
                        ]}
                        onPress={() => setSelectedSize(size)}
                      >
                        <Text
                          style={[
                            styles.sortText,
                            selectedSize === size && styles.selectedText
                          ]}
                        >
                          {size}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

                {selectedSize && (
                  <Text style={styles.description}>
                    {(() => {
                      const descMap = {
                        S: 'Nặng: 45-55kg ~ Cao: 1m55-1m65',
                        M: 'Nặng: 55-65kg ~ Cao: 1m65-1m72',
                        L: 'Nặng: 65-75kg ~ Cao: 1m72-1m78',
                        XL: 'Nặng: 75-90kg ~ Cao: >1m78',
                      };
                      return descMap[selectedSize] || 'Không có mô tả cho size này';
                    })()}
                  </Text>
                )}


                {/* Chọn màu sắc */}
                <Text style={styles.sectionTitle}>Màu sắc</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {product.color && product.color.map(color => (
                    <TouchableOpacity
                      key={color}
                      style={[
                        styles.colorButton,
                        selectedColor === color && styles.selectedButton
                      ]}
                      onPress={() => setSelectedColor(color)}>
                      <Text
                        style={[
                          styles.sortText,
                          selectedColor === color && styles.selectedText
                        ]}>
                        {color}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                {/* Footer */}
                <View style={styles.modalFooter}>
                  <TouchableOpacity style={styles.cartButtonmodal} onPress={() => {
                    dispatch(addToCart({
                      productId: product._id,
                      quantity: 1,
                      size: selectedSize,
                      color: selectedColor,
                    }))
                    setModalVisible(false);
                  }} >
                    <Text style={styles.buttonText2}>Thêm vào giỏ hàng</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buyButtonmodal} onPress={() => navigation.navigate('Order')}>
                    <Text style={styles.buttonText3}>Mua ngay</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  infoContainer: {
    marginBottom: 15,
  },

  scrollContainer: {
    paddingBottom: 80,
  },
  header: {
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    resizeMode: "cover",
    height: 300
  },
  imageContainer: {
    height: 350,
  },

  detailsContainer: {
    padding: 15
  },
  icon: {
    width: 35,
    height: 35,
    left: 160,
    top: -280
  },
  icon2: {
    width: 25,
    height: 25,
  },
  iconFavo: {
    width: 26,
    height: 26,
    left: 350,
    top: 16
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 5,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  sold: {
    fontSize: 14,
    color: 'gray',
  },

  sold2: {
    fontSize: 14,
    color: 'gray',
    // top: -20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10
  },
  description: {
    fontSize: 15,
    color: '#333',
    marginBottom: 5
  },
  mapImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginTop: 10
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  viewAll: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray'
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  reviewDate: {
    fontSize: 12,
    color: 'gray'
  },
  reviewText: {
    fontSize: 14,
    color: '#333'
  },
  reviewRating: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 'auto'
  },
  footer: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd'
  },
  chatButton: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
  cartButton: {
    flex: 2,
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButton: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 40,
    justifyContent: 'center',
  },
  buttonText1: {
    color: '#808080',
    fontWeight: 'bold'
  },
  buttonText2: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonText3: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },

  //modal
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalImage: {
    width: 100, height: 100,
    marginRight: 10,
    borderRadius: 15
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    bottom: 10,
  },
  modalPrice: {
    color: 'red',
    fontSize: 16
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5
  },
  sizeButton: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 5
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 60
  },
  sortButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  sortText: {
    fontSize: 14,
    color: '#333',
  },
  selectedText: {
    color: 'white',
  },
  colorButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  cartButtonmodal: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 40,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  buyButtonmodal: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 40,
    justifyContent: 'center',
  },
  detailContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 4,
  },
  soldText: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconFavoInline: {
    width: 26,
    height: 26,
    marginLeft: 10,
  },

});

export default ShirtDetailScreen;
