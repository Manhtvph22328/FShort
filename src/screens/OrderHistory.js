import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

const ordersData = [
  {
    id: 141,
    status: "Đang chờ",
    product: {
      name: "Áo Hoodie",
      size: "S",
      color: "Vàng",
      price: 300000,
      quantity: 1,
      image: require("../assets/Sp3.jpg"),
    },
  },
  {
    id: 142,
    status: "Đang chờ",
    product: {
      name: "Áo Hoodie",
      size: "S",
      color: "Vàng",
      price: 300000,
      quantity: 1,
      image: require("../assets/Sp2.jpg"),
    },
  },
  {
    id: 143,
    status: "Đang chờ",
    product: {
      name: "Áo Hoodie",
      size: "S",
      color: "Vàng",
      price: 300000,
      quantity: 1,
      image: require("../assets/Sp1.jpg"),
    },
  },
  {
    id: 144,
    status: "Đang giao",
    product: {
      name: "Áo Hoodie Xám",
      size: "M",
      color: "Xám",
      price: 320000,
      quantity: 1,
      image: require("../assets/Sp2.jpg"),
    },
  },
  {
    id: 145,
    status: "Đã giao",
    product: {
      name: "Áo Hoodie Đen",
      size: "L",
      color: "Đen",
      price: 290000,
      quantity: 1,
      image: require("../assets/Sp1.jpg"),
    },
  },
  {
    id: 146,
    status: "Đã hủy",
    product: {
      name: "Áo Hoodie Đen",
      size: "L",
      color: "Đen",
      price: 290000,
      quantity: 1,
      image: require("../assets/Sp1.jpg"),
    },
  }
];

const OrderHistory = () => {
  const [selectedTab, setSelectedTab] = useState("Đang chờ");
  const navigation = useNavigation();

  const filteredOrders = ordersData.filter(
    (order) => order.status === selectedTab
  );


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../assets/iconback.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lịch sử mua hàng</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {["Đang chờ", "Đang giao", "Đã giao", "Đã hủy"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.tabButtonActive,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Danh sách đơn hàng */}
      <ScrollView style={styles.orderList}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <Text style={styles.orderId}>#{order.id}</Text>
              <View style={styles.orderInfo}>
                <Image source={order.product.image} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>{order.product.name}</Text>
                  <Text style={styles.productMeta}>
                    Màu {order.product.color}, Size: {order.product.size}
                  </Text>
                  <Text style={styles.productPrice}>
                    {order.product.price.toLocaleString()}đ
                  </Text>
                  <Text style={styles.productTotal}>
                    Thành tiền: <Text style={{ fontWeight: "bold", color: '#E53935' }}>
                      {(order.product.price * order.product.quantity).toLocaleString()}đ
                    </Text>
                  </Text>
                </View>
              </View>

              {selectedTab === "Đang chờ" && (
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Hủy đặt</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.detailButton} onPress={() => navigation.navigate('Orderdetail')}>
                    <Text style={styles.detailButtonText}>Chi tiết</Text>
                  </TouchableOpacity>
                </View>
              )}
              {selectedTab === "Đang giao" && (
                <View style={styles.buttonsContainer}>
                  <View style={styles.txt}>
                    <Text style={styles.txtText}>Đơn hàng đang được giao đến bạn!</Text>
                  </View>
                </View>
              )}
              {selectedTab === "Đã giao" && (
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Mua lại</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.detailButton}>
                    <Text style={styles.detailButtonText}>Đánh giá</Text>
                  </TouchableOpacity>
                </View>
              )}
              {selectedTab === "Đã hủy" && (
                <View style={styles.buttonsContainer}>
                  <View style={styles.txt2}>
                    <Text style={styles.txtText}>Đơn hàng đã được huỷ !</Text>
                  </View>
                </View>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noOrderText}>Không có đơn hàng nào</Text>
        )}
      </ScrollView>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20
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
    flexDirection: "row",
    alignItems: "center"
  },
  productImage: {
    width: 80, height: 80,
    borderRadius: 5,
    marginRight: 10
  },
  productDetails: {
    flex: 1
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
    left:10
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
    arginTop: 20,
    fontSize: 16,
    color: "gray"
  },
});

export default OrderHistory;