import React, {useEffect} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert, Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {cancelOrder, payment} from '../redux/action/orderAction';
import generatePaymentCode from '../utils/genaratePaymentCode';


const ORDER_STATUS = {
    Pending : "Đặt hàng thành công",
    Processed : "Đơn hàng đã được người bạn xác nhận và chuẩn bị giao đến bạn",
    Delivered : "Đơn hàng đã được giao đến bạn",
    Cancelled : "Đơn hàng đã bị hủy"
}

const Orderdetail = ({ route, navigation }) => {
    const order = route.params.order;
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(order);
    }, []);
    const handleCancelOrder = () => {
        Alert.alert(
          'Xác nhận',
          'Bạn có chắc chắn muốn huỷ đơn hàng này không?',
          [
              { text: 'Không', style: 'cancel' },
              {
                  text: 'Có',
                  onPress: () => {
                      dispatch(cancelOrder(order._id))
                        .then((data) => {
                            console.log(data);
                            Alert.alert('Thông báo', data.payload.message);
                            navigation.goBack();
                        })
                        .catch((error) => {
                            Alert.alert('Lỗi', error || 'Không thể hủy đơn hàng');
                        });
                  },
                  style: 'destructive',
              }
          ]
        );
    };
    const processOnlinePayment = async () => {
        const paymentCode = generatePaymentCode();
        const [paymentResult] = await Promise.all([
            dispatch(payment({
                rawOrderId: paymentCode,
                priceProduct: order.totalAmount,
                idOrder: order._id,
            }))
        ]);

        if (payment.fulfilled.match(paymentResult)) {
            const url = paymentResult.payload;
            if (url) {
                Linking.openURL(url); // Mở link thanh toán MoMo
            } else {
                Alert.alert('Lỗi', 'Không lấy được link thanh toán từ MoMo.');
            }
        } else {
            Alert.alert('Lỗi', paymentResult.payload || 'Thanh toán thất bại.');
        }
    };
    return (
      <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    source={require('../assets/iconback.png')}
                    style={styles.icon}
                  />
              </TouchableOpacity>
              <View style={styles.headerTextContainer}>
                  <Text style={styles.headerText}>Chi Tiết Đơn Hàng</Text>
              </View>
          </View>

          {/* Address */}
          <View style={styles.addressContainer}>
              <View style={styles.tt}>
                  <Image source={require("../assets/oto.png")} style={styles.iconoto} />
                  <Text style={styles.addressTitle}>Địa chỉ giao hàng</Text>
              </View>
              <View style={styles.tt2}>
                  <Text style={styles.addressName}>{order.shippingAddress?.name || 'Người nhận'}</Text>
                  <Text style={styles.addressPhone}>0{order.shippingAddress?.phoneNumber || 'SĐT'}</Text>
                  <Text style={styles.addressDetail}>{order.shippingAddress?.address || 'Địa chỉ giao hàng'}</Text>
              </View>
          </View>

          {/* Sản phẩm */}
          <View style={styles.txt}>
              <View style={styles.tt}>
                  <Image source={require("../assets/shopping-cart.png")} style={styles.iconoto} />
                  <Text style={styles.ttTitle}>Sản phẩm</Text>
              </View>
          </View>

          {/* Danh sách sản phẩm (ví dụ một sản phẩm) */}
          {order.products?.map((item, index) => (
            <View key={index} style={styles.productContainer}>
                <Image source={{ uri: item.productId.images[0] }} style={styles.productImage} />
                <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.productId.name_product}</Text>
                    <Text style={styles.productVariant}>Size: {item.size} | Màu: {item.color}</Text>
                    <Text style={styles.productPrice}>{item.price?.toLocaleString()} đ</Text>
                </View>
                <Text style={styles.quaty}>x{item.quantity}</Text>
            </View>
          ))}

          {/* Tổng tiền */}
          <View style={styles.txt}>
              <View style={styles.totalContainer}>
                  <Text style={styles.totalBold}>Tổng tiền hàng</Text>
                  <Text style={styles.totalPrice2}>{order.totalAmount?.toLocaleString()} đ</Text>
              </View>
              <View style={styles.totalContainer}>
                  <Text style={styles.totalText}>Phí Ship</Text>
                  <Text style={styles.totalPrice}>0 đ</Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.totalContainer}>
                  <Text style={styles.totalBold}>Tổng thanh toán</Text>
                  <Text style={styles.totalBoldRed}>{order.totalAmount?.toLocaleString()} đ</Text>
              </View>
          </View>

          {/* Hình thức thanh toán */}
          <View style={styles.txt}>
              <View style={styles.totalContainer2}>
                  <Image source={require("../assets/cod.png")} style={styles.radioIcon} />
                  <Text style={styles.paymentMethod}>Hình thức thanh toán</Text>
              </View>
              <Text style={styles.txt3}>{order.paymentMethod || 'Thanh toán khi nhận hàng'}</Text>
          </View>

          <View style={{ marginTop: 20 ,backgroundColor : 'EEEEEE',marginLeft : 10}}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Lịch sử trạng thái:</Text>

              {order.statusHistory.map((item, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                    <Text style={{ fontWeight: '600', color: '#333',fontSize : 14, }}>
                        {ORDER_STATUS[item.status] || item.status}
                    </Text>
                    <Text style={{ color: '#666', fontSize: 14 }}>
                        {new Date(item.date).toLocaleString('vi-VN')}
                    </Text>
                </View>
              ))}
          </View>




          <View style={{position : 'absolute',bottom : 50,padding : 10,width : '100%'}}>
              {/* Button hủy đơn nếu đang chờ xử lý */}
              {
                  order.status === 'Pending' && order.paymentMethod === 'Cash On Delivery' ? (
                    <TouchableOpacity style={styles.orderButton} onPress={handleCancelOrder}>
                        <Text style={styles.orderButtonText}>Huỷ đơn hàng</Text>
                    </TouchableOpacity>
                  ) : order.paymentStatus === 'Unpaid' && order.paymentMethod === 'Momo' ? (
                    <View style={{
                        flexDirection: "row",
                        justifyContent : 'space-between',
                        height : 50,
                        gap : 10
                    }}>
                        <TouchableOpacity
                          style={{width : '50%',
                              backgroundColor : 'gray',
                              borderRadius : 8,alignItems : 'center',
                              justifyContent :'center'}}
                          onPress={handleCancelOrder}
                        >
                            <Text style={styles.orderButtonText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={processOnlinePayment}
                          style={{width : '50%',
                              backgroundColor : 'blue',
                              borderRadius : 8,alignItems : 'center',
                              justifyContent :'center'}}>
                            <Text style={styles.orderButtonText}>Thanh toán</Text>
                        </TouchableOpacity>
                    </View>
                  ) : null
              }
          </View>

      </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 10 },
    header: { flexDirection: 'row', alignItems: 'center' },
    icon: { width: 25, height: 25, left: 5 },
    iconoto: { width: 25, height: 25, left: -5 },
    headerTextContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 15,
        paddingVertical: 10,
    },
    headerText: { fontSize: 20, fontWeight: 'bold', color: 'black' },
    tt: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    tt2: { flexDirection: 'column', left: 28 },
    addressContainer: {
        width: '100%',
        padding: 10,
        backgroundColor: "#EEEEEE",
        borderRadius: 10,
        marginBottom: 10,
    },
    addressTitle: { fontSize: 16, fontWeight: "bold", color: "black", left: -195 },
    addressName: { fontWeight: "bold" },
    addressPhone: { color: "black" },
    addressDetail: { width: 300, color: "gray" },
    txt: {
        width: 'auto',
        padding: 10,
        backgroundColor: "#EEEEEE",
        marginBottom: 10,
    },
    txt3: { marginLeft: 30, color: 'gray' },
    ttTitle: { fontSize: 16, fontWeight: "bold", color: "#444444", left: -240 },
    productContainer: {
        flexDirection: "row",
        width: '100%',
        padding: 10,
        backgroundColor: "#EEEEEE",
        borderRadius: 10,
        marginBottom: 10,
    },
    productImage: { width: 100, height: 100, borderRadius: 10, marginRight: 10 },
    productDetails: { flex: 1 },
    productName: { fontSize: 18, fontWeight: "bold" },
    productVariant: { color: "gray", marginTop: 10 },
    productPrice: { color: "red", fontWeight: "bold", marginTop: 5, fontSize: 17 },
    quaty: { color: "#444", marginTop: 70, fontSize: 15 },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5
    },
    totalContainer2: { flexDirection: "row", alignItems: "center" },
    totalText: { color: "#880000" },
    totalPrice: { color: "#880000", fontWeight: "bold" },
    totalPrice2: { color: "gray" },
    line: { backgroundColor: "black", height: 1 },
    totalBold: { fontWeight: "bold", fontSize: 16 },
    totalBoldRed: { fontWeight: "bold", fontSize: 16, color: "red" },
    paymentMethod: { fontSize: 15, fontWeight: "bold", marginTop: 5 },
    radioIcon: { width: 25, height: 25, marginRight: 5 },
    orderButton: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 35,
        alignItems: "center",
        marginTop: 20,
        width : '90%',
        alignSelf: "center",
    },
    orderButtonText: { color: "white", fontWeight: "bold" },
});

export default Orderdetail;
