import {Alert, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LoadingDialog from '../dialogs/loadingDialog';
import api from '../services/api';

function ProductReview({ navigation, route }) {
  const order = route.params?.order;
  const [orderReview, setOrderReview] = useState(order);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [productId, setProductId] = useState(null);
  useEffect(() => {
    console.log(order);
  }, [order]);

  const closeModal = () => {
    setModalVisible(false);
    setReviewText("");
    setProductId(null)
    setRating(5);
  };

  const submitReview = async () => {
    if (!productId) {
      Alert.alert('Thông báo', 'Vui lòng chọn sản phẩm cần đánh giá');
      return;
    }

    if (reviewText.trim()) {
      console.log("Đánh giá:", { reviewText, rating });

      try {
        const res = await api.post('/review/createReview', {
          comment: reviewText,
          productId: productId,
          orderId: order._id,
          rating: rating,
        });

        // Hiển thị thông báo thành công

        // ✅ Cập nhật isReviewed = true trong local state
        const updatedProducts = order.products.map((product) => {
          if (product.productId === productId) {
            return { ...product, isReviewed: true };
          }
          return product;
        });

        setOrderReview(res.order);
        Alert.alert('Thành công', res.message || 'Đánh giá thành công');

        closeModal();

      } catch (error) {
        console.log("Lỗi gửi đánh giá:", error?.response?.message || error.message);
      }
      finally {
        closeModal();
      }
    } else {
      Alert.alert('Thông báo', 'Vui lòng nhập nội dung đánh giá');
    }
  };
  const renderItem = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
      <View style={styles.productDetails}>
        {/* The "Review Now" button */}

        <Image
          source={{ uri: item?.productId?.images?.[0] }}
          style={styles.productImage}
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>
            {item?.productId?.name_product || 'Tên sản phẩm'}
          </Text>
          <Text style={styles.productMeta}>
            Màu: {item?.color || 'Không rõ'}, Size: {item?.size || 'Không rõ'}
          </Text>
          <Text style={styles.productPrice}>
            {(item?.price || 0).toLocaleString()}đ x {item?.quantity || 0}
          </Text>
        </View>
      </View>
        {
          !item.isReviewed &&(
            <View style={{flex : '1',alignItems : 'flex-end'}}>
              <TouchableOpacity style={styles.reviewButton} onPress={() => {
                setProductId(item.productId._id);
                setModalVisible(true);
              }}>
                <Text style={styles.reviewButtonText}>Đánh giá ngay</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </View>

    );
  };

  if (!order?.products?.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Không có sản phẩm nào trong đơn hàng này.</Text>
      </View>
    );
  }

  return (
    <>
      <LoadingDialog isVisible={isLoading}/>

      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Viết đánh giá</Text>
            <View style={styles.starContainer}>
              {[...Array(5)].map((_, index) => (
                <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
                  <Image source={index < rating ? require("../assets/SaoOn.png") :
                    require("../assets/star.png")} style={styles.starIcon} />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Nhập đánh giá của bạn..."
              value={reviewText}
              onChangeText={setReviewText}
              multiline
            />
            <TouchableOpacity style={styles.modalButton} onPress={submitReview}>
              <Text style={styles.modalButtonText}>Đánh giá</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButtonClose} onPress={closeModal}>
              <Text style={styles.modalButtonCloseText}>Để sau</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../assets/iconback.png")} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sử mua hàng</Text>
      </View>

      <FlatList
        data={orderReview.products}
        renderItem={renderItem}
        keyExtractor={item => item.productId._id}
      />
    </View>
    </>

  );
}

export default ProductReview;

// Only keep the styles that are being used
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  icon: {
    width: 24,
    height: 24,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  productDetails: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },

  reviewButton: {
    width : '40%',
    alignItems: 'center',
    backgroundColor: '#ffa417', // Button color (orange)
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  reviewButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },

  productImage: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 15,
  },

  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },

  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  productMeta: {
    fontSize: 14,
    color: 'gray',
  },

  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 16,
    color: 'gray',
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  starContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  starIcon: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
  },
  input: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    textAlignVertical: "top",
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 25,
    width: 150,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalButtonClose: {
    marginTop: 10,
  },
  modalButtonCloseText: {
    color: "gray",
    fontWeight: "bold",
  },
});

