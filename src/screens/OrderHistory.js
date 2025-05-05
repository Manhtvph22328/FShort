import React, { useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity, Image,
  ScrollView, FlatList, StyleSheet, ActivityIndicator, Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, getOrdersByStatus } from '../redux/action/orderAction';
import { addToCart } from '../redux/action/cartAction';

// Map tiếng Việt sang enum backend
const STATUS_TABS = [
  { label: "Đang chờ", value: "Pending" },
  { label: "Đang giao", value: "Processed" },
  { label: "Đã giao", value: "Delivered" },
  { label: "Đã hủy", value: "Cancelled" }
];

const OrderHistory = () => {
  const [selectedTab, setSelectedTab] = useState("Đang chờ");
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { orders, loading, error } = useSelector((state) => state.order);

  const handleReBuy = (order) => {
    for (const item of order.products) {
      dispatch(addToCart({
        productId: item.productId._id,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      }));
    }
    navigation.navigate('Tabs', { screen: 'Car' });
  }
  // Chuyển tiếng Việt sang enum để gọi API
  useEffect(() => {
    const statusEnum = STATUS_TABS.find(tab => tab.label === selectedTab)?.value;
    if (statusEnum) {
      dispatch(getOrdersByStatus(statusEnum));
    }
  }, [selectedTab, dispatch]);

  const handleViewDetail = (order) => {
    navigation.navigate('Orderdetail', { order })
  };
  const handleCancelOrder = (orderId) => {
    Alert.alert(
      'Thông báo',
      'Bạn có chắc chắn muốn hủy đơn hàng này không?',
      [
        {
          text: 'Không',
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: () => {
            dispatch(cancelOrder(orderId))
              .then((data) => {
                console.log(data);
                Alert.alert('Thông báo', data.payload.message);
              })
              .catch((error) => {
                Alert.alert('Lỗi', error || 'Không thể hủy đơn hàng');
              });
          },
          style: 'destructive',
        },
      ]
    );
  };

  const renderStatusButtons = (order) => {
    switch (selectedTab) {
      case "Đang chờ":
        return (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => {
              handleCancelOrder(order._id)
            }}>
              <Text style={styles.cancelButtonText}>Hủy đặt</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => {
                handleViewDetail(order)
              }}
            >
              <Text style={styles.detailButtonText}>Chi tiết</Text>
            </TouchableOpacity>
          </View>
        );
      case "Đang giao":
        return (
          <View style={styles.buttonsContainer}>
            <View style={styles.txt}>
              <Text style={styles.txtText}>Đơn hàng đang được giao đến bạn!</Text>
            </View>
          </View>
        );
      case "Đã giao":
        return (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                handleReBuy(order)
              }}
            >
              <Text style={styles.cancelButtonText}>Mua lại</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.detailButton}
              onPress={() => {
                navigation.navigate('ProductReview', { order })
              }}
            >
              <Text style={styles.detailButtonText}>Đánh giá</Text>
            </TouchableOpacity>
          </View>
        );
      case "Đã hủy":
        return (
          <View style={styles.buttonsContainer}>
            <View style={styles.txt2}>
              {
               order.status ===  'Cancelled' ? (
                 <Text style={styles.cancelButtonText}>Đơn hàng đã được hủy</Text>
               ) : (
                 <Text style={styles.cancelButtonText}>Bạn đã từ chối nhận đơn hàng này</Text>
               )
              }
            </View>
          </View>
        );
    }
  };

  const renderOrderItem = ({ item }) => (
    <View key={item._id} style={styles.orderCard}>
      <Text style={styles.orderId}>#{item._id}</Text>
      <View style={styles.orderInfo}>
        {/* Duyệt qua mảng các sản phẩm trong đơn hàng */}
        {item.products.map((productItem, index) => (
          <View key={index} style={styles.productDetails}>
            <Image
              source={{ uri: productItem?.productId?.images?.[0] }}  // Ensure the image URL exists
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>
                {productItem.productId?.name_product || "Tên sản phẩm"} {/* Ensure name exists */}
              </Text>
              <Text style={styles.productMeta}>
                Màu: {productItem.color}, Size: {productItem.size}
              </Text>
              <Text style={styles.productPrice}>
                {productItem.price?.toLocaleString() || "0"}đ {/* Handle price correctly */}
                X {productItem.quantity}
              </Text>
            </View>
          </View>
        ))}
      </View>
      <Text style={styles.productTotal}>
        Thành tiền: <Text style={{ fontWeight: "bold", color: '#E53935' }}>
          {item.totalAmount?.toLocaleString() || "0"}đ {/* Calculate total price */}
        </Text>
      </Text>
      {renderStatusButtons(item)}
    </View>
  );


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../assets/iconback.png")} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sử mua hàng</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {STATUS_TABS.map((tab) => (
          <TouchableOpacity
            key={tab.value}
            style={[styles.tabButton, selectedTab === tab.label && styles.tabButtonActive]}
            onPress={() => setSelectedTab(tab.label)}
          >
            <Text style={[styles.tabText, selectedTab === tab.label && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Loading or Error */}
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={styles.noOrderText}>Đã xảy ra lỗi: {error}</Text>
      ) : orders.length === 0 ? (
        <Text style={styles.noOrderText}>Không có đơn hàng nào</Text>
      ) : (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item._id}
          style={styles.orderList}
        />
      )}
    </View>
  );
};

export default OrderHistory;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  icon: {
    width: 24,
    height: 24
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10
  },

  tabsContainer: {
    flexDirection: "row",
    marginBottom: 15
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 5,
  },
  tabButtonActive: {
    backgroundColor: "black",
    borderColor: "black"
  },
  tabText: {
    fontSize: 14,
    color: "black"
  },
  tabTextActive: {
    color: "white",
    fontWeight: "bold"
  },

  orderList: {
    flex: 1
  },
  orderCard: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  orderId: {
    fontWeight: "bold",
    marginBottom: 5
  },
  orderInfo: {
    flexDirection: "column",
    alignItems: "center",
  },
  productImage: {
    width: 80, height: 80,
    borderRadius: 5,
    marginRight: 10
  },
  productDetails: {
    flex: 1,
    width: "100%",
    flexDirection: 'row',
    marginBottom: 10
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold"
  },
  productMeta: {
    fontSize: 14,
    color: "gray"
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000"
  },
  productTotal: {
    fontSize: 14,
    marginTop: 5
  },
  txt: {
    width: 250,
    height: 34,
    flex: 1,
    paddingVertical: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
  },
  txt2: {
    width: 250,
    height: 34,
    flex: 1,
    paddingVertical: 5,
    backgroundColor: "#FCDAD5",
    borderRadius: 5,
  },
  txtText: {
    fontSize: 14,
    color: "gray",
    left: 10
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 10
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    borderRadius: 35,
    marginRight: 5,
  },
  cancelButtonText: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 14
  },
  detailButton: {
    flex: 1,
    paddingVertical: 8,
    backgroundColor: "#E0E0E0",
    alignItems: "center",
    borderRadius: 35,
  },
  detailButtonText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  noOrderText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray"
  },
});
