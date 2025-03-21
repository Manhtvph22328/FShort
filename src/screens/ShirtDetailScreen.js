import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ShirtDetailScreen = ({ route }) => {
  const { product } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* ScrollView để vuốt ảnh */}
      <ScrollView style={styles.scrollContainer}>
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}
          style={styles.imageContainer}>
          {product.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.productImage} />
          ))}
        </ScrollView>

        <TouchableOpacity onPress={() => { }}>
          <Image
            source={require("../assets/favoriteOn.png")}
            style={styles.iconFavo}
          />
        </TouchableOpacity>

        {/* Hiển thị thông tin sản phẩm */}
        <View style={styles.detailsContainer}>
          <Text style={styles.price}>{product.price}</Text>
          <Text style={styles.productName}>{product.title}</Text>
          <Text style={styles.sold}>Đã bán: 999</Text>

          {/* Mô tả sản phẩm */}
          <Text style={styles.sectionTitle}>Mô tả</Text>
          <Text style={styles.description}>   {product.description2}</Text>

          {/* Mô tả sản phẩm */}
          <Text style={styles.sectionTitle}>Chi tiết</Text>
          <Text style={styles.description}>  ●  {product.description3}</Text>
          <Text style={styles.description}>  ●  {product.description4}</Text>
          <Text style={styles.description}>  ●  {product.description5}</Text>
        </View>

        {/* Kích cỡ */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Kích cỡ</Text>
          <Text style={styles.description}>  ●  Size M: 35 - 45kg</Text>
          <Text style={styles.description}>  ●  Size L: 45 - 55kg</Text>
          <Text style={styles.description}>  ●  Size XL: 55 - 65kg</Text>
          <Text style={styles.description}>  ●  Size 2XL: 66 - 75kg</Text>
        </View>

        {/* Đánh giá */}
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Đánh giá</Text>
          <View style={styles.reviewRow}>
            <Text style={styles.rating}>⭐ 3.5</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Evaluate')}>
              <Text style={styles.viewAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reviewContainer}>
            <Image source={require('../assets/Sp1.jpg')} style={styles.avatar} />
            <View>
              <Text style={styles.reviewerName}>Trịnh Văn Mạnh</Text>
              <Text style={styles.reviewDate}>28/09/2024</Text>
              <Text style={styles.reviewText}>Áo đẹp, đúng kích cỡ, sẽ mua lại lần tiếp theo.</Text>
            </View>
            <Text style={styles.reviewRating}>⭐ 5</Text>
          </View>
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
                    <Text style={styles.modalTitle}>{product.title}</Text>
                    <Text style={styles.sold2}>Kho: {product.quantity}</Text>
                    <Text style={styles.modalPrice}>{product.price}</Text>
                  </View>
                </View>

                {/* Chọn kích thước */}
                <Text style={styles.sectionTitle}>Kích thước</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {['M', 'L', 'XL', '2XL'].map(size => (
                    <TouchableOpacity
                      key={size}
                      style={[
                        styles.sortButton,
                        selectedSize === size && styles.selectedButton
                      ]}
                      onPress={() => setSelectedSize(size)}>
                      <Text
                        style={[
                          styles.sortText,
                          selectedSize === size && styles.selectedText
                        ]}>
                        {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                {/* Chọn màu sắc */}
                <Text style={styles.sectionTitle}>Màu sắc</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {['Trắng', 'Đen'].map(color => (
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
                  <TouchableOpacity style={styles.cartButtonmodal} >
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    top: -25
  },
  productName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 5,
    top: -20
  },
  sold: {
    fontSize: 14,
    color: 'gray',
    top: -20
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
    fontWeight:'bold',
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
    alignItems: 'center',
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
    alignItems: 'center',
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
    alignItems: 'center',
  },
  buyButtonmodal: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 350,
  },
  productImage: {
    width: 400,
    height: 350,
    resizeMode: "cover",
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
});

export default ShirtDetailScreen;