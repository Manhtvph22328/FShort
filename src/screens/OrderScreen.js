import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {cancelOrder, createOrder, payment} from '../redux/action/orderAction';
import {orderSuccess} from '../redux/reducer/cartSlice';
import generatePaymentCode from '../utils/genaratePaymentCode';

const OrderScreen = ({navigation,route}) => {
    const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
    const [name, setName] = useState('Trình Văn Mạnh');
    const [phoneNumber, setPhoneNumber] = useState('0355435100');
    const [address, setAddress] = useState('80 Xuân Phương, Hoè Thị, Hà Nội');
    const [newOrder, setNewOrder] = useState(null);
    const dispatch = useDispatch();
    const cartItems = route.params.cartItems;

    const totalAmount = cartItems.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const handleCreateOrder = () => {
        dispatch(createOrder({
            shippingAddress: { address, phoneNumber, name },
            paymentMethod,
        })).then(async (data) => {
            if (data.meta.requestStatus === 'fulfilled') {
                const order = data.payload;
                await processOrderByPaymentMethod(order);
            } else {
                Alert.alert('Lỗi', 'Tạo đơn hàng thất bại.');
            }
        });
    };

    const processOrderByPaymentMethod = async (order) => {
        if (order.paymentMethod === 'Cash On Delivery') {
            navigation.replace('OrderDone');
        } else {
            await processOnlinePayment(order);
        }
    };

    const processOnlinePayment = async (order) => {
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
                setNewOrder(order);
                Linking.openURL(url); // Mở link thanh toán MoMo
            } else {
                Alert.alert('Lỗi', 'Không lấy được link thanh toán từ MoMo.');
            }
        } else {
            Alert.alert('Lỗi', paymentResult.payload || 'Thanh toán thất bại.');
        }
    };
    const handleCancelOrder = () => {
        const orderId = newOrder._id;
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
                            if (data.meta.requestStatus === 'fulfilled') {
                                Alert.alert('Thông báo', data.payload.message);
                                navigation.replace('OrderHistory');
                            }
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

    return (
      <ScrollView style={styles.container}>
          <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    source={require('../assets/iconback.png')}
                    style={styles.icon}
                  />
              </TouchableOpacity>
              <View style={styles.headerTextContainer}>
                  <Text style={styles.headerText}>Đơn Hàng</Text>
              </View>
          </View>

          <View style={styles.addressContainer}>
              <View style={styles.tt}>
                  <TouchableOpacity>
                      <Image source={require("../assets/oto.png")} style={styles.iconoto} />
                  </TouchableOpacity>
                  <Text style={styles.addressTitle}>Địa chỉ giao hàng</Text>
                  <Text style={styles.editaddress}>Thay đổi</Text>
              </View>
              <View style={styles.tt2}>
                  <Text style={styles.addressName}>{name}</Text>
                  <Text style={styles.addressPhone}>{phoneNumber}</Text>
                  <Text style={styles.addressDetail}>{address}</Text>
              </View>
          </View>

          <View style={styles.txt}>
              <View style={styles.tt}>
                  <TouchableOpacity>
                      <Image source={require("../assets/shopping-cart.png")} style={styles.iconoto} />
                  </TouchableOpacity>
                  <Text style={styles.ttTitle}>Mặt hàng đã chọn</Text>
              </View>
          </View>

          {cartItems.map((item, index) => (
            <View key={index} style={styles.productContainer}>
                <Image source={{ uri: item.productId.images[0] }} style={styles.productImage} />
                <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.productId.name_product}</Text>
                    <Text style={styles.productVariant}>
                        Kích thước: {item.size}   Màu sắc: {item.color}
                    </Text>
                    <Text style={styles.productPrice}>
                        {item.price.toLocaleString("vi-VN")} đ
                    </Text>
                </View>
                <Text style={styles.quaty}>x{item.quantity}</Text>
            </View>
          ))}

          <View style={styles.txt}>
              <View style={styles.totalContainer}>
                  <Text style={styles.totalBold}>Tổng tiền hàng</Text>
                  <Text style={styles.totalPrice2}>
                      {totalAmount.toLocaleString("vi-VN")} đ
                  </Text>
              </View>
              <View style={styles.totalContainer}>
                  <Text style={styles.totalText}>Phí Ship</Text>
                  <Text style={styles.totalPrice}>0 đ</Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.totalContainer}>
                  <Text style={styles.totalBold}>Tổng thanh toán</Text>
                  <Text style={styles.totalBoldRed}>
                      {totalAmount.toLocaleString("vi-VN")} đ
                  </Text>
              </View>
          </View>

          <View style={styles.txt}>
              <Text style={styles.paymentMethod}>Phương thức thanh toán</Text>

              {/* COD */}
              <TouchableOpacity
                onPress={() => setPaymentMethod("Cash On Delivery")}
                style={styles.radioContainer}
              >
                  <Image source={require("../assets/cod.png")} style={styles.radioIcon} />
                  <Text>Thanh toán khi nhận hàng</Text>
                  <Image
                    source={
                        paymentMethod === "Cash On Delivery"
                          ? require("../assets/tick-circle.png")
                          : require("../assets/tickoff.png")
                    }
                    style={styles.radioIcon2}
                  />
              </TouchableOpacity>

              {/* MOMO */}
              <TouchableOpacity
                onPress={() => setPaymentMethod("Momo")}
                style={styles.radioContainer}
              >
                  <Image source={require("../assets/momo.png")} style={styles.radioIcon} />
                  <Text>Ví điện tử Momo</Text>
                  <Image
                    source={
                        paymentMethod === "Momo"
                          ? require("../assets/tick-circle.png")
                          : require("../assets/tickoff.png")
                    }
                    style={styles.radioIcon2}
                  />
              </TouchableOpacity>
          </View>


          <View style={styles.txt2}>
              <Image source={require("../assets/vocher.png")} style={styles.radioIcon} />
              <Text>Vocher</Text>
              <View style={styles.line2}></View>
              <Text>Chọn hoặc nhập mã</Text>
          </View>

          {
              newOrder !== null ? (
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
                    onPress={() => {
                        handleCancelOrder();
                    }}
                  >
                      <Text style={styles.orderButtonText}>Hủy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={()=>{
                        processOnlinePayment(newOrder)
                    }}
                    style={{width : '50%',
                      backgroundColor : 'blue',
                      borderRadius : 8,alignItems : 'center',
                      justifyContent :'center'}}>
                      <Text style={styles.orderButtonText}>Thanh toán</Text>
                  </TouchableOpacity>
              </View>
            ) : (
                <TouchableOpacity style={styles.orderButton} onPress={handleCreateOrder}>
                    <Text style={styles.orderButtonText}>Đặt hàng</Text>
                </TouchableOpacity>
              )
          }
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        width: 25,
        height: 25,
        left: 5
    },
    iconoto: {
        width: 25,
        height: 25,
        left: -5
    },
    headerTextContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 15,
        paddingVertical: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
        top: 1,
    },
    tt: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    tt2: {
        flexDirection: 'column',
        left: 28,
        justifyContent: 'space-between',
    },
    addressContainer: {
        width: '100%',
        padding: 10,
        backgroundColor: "#EEEEEE",
        borderRadius: 10,
        marginBottom: 10,
    },
    addressTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        left: -70
    },
    ttTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#444444",
        left: -190
    },
    editaddress: {
        fontWeight: "bold",
        color: "#CC0000",
    },
    addressName: {
        fontWeight: "bold"
    },
    addressPhone: {
        color: "black"
    },
    addressDetail: {
        width: 300,
        height: 35,
        color: "gray"
    },
    productContainer: {
        flexDirection: "row",
        width: '100%',
        padding: 10,
        backgroundColor: "#EEEEEE",
        borderRadius: 10,
        marginBottom: 10,
    },
    txt: {
        width: 'auto',
        padding: 10,
        backgroundColor: "#EEEEEE",
        marginBottom: 10,
    },
    txt2: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#EEEEEE",
        marginBottom: 10,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10
    },
    productDetails: {
        flex: 1
    },
    productName: {
        fontSize: 18,
        fontWeight: "bold"
    },
    productVariant: {
        color: "gray",
        top: 20,
    },
    productPrice: {
        color: "red",
        fontWeight: "bold",
        top: 25,
        fontSize: 17,
    },
    quaty: {
        color: "#444",
        top: 75,
        fontSize: 15,
    },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5
    },
    totalText: {
        color: "#880000"
    },
    totalPrice: {
        color: "#880000",
        fontWeight: "bold"
    },
    totalPrice2: {
        color: "gray",
    },
    line: {
        backgroundColor: "black",
        height: 1
    },
    line2: {
        backgroundColor: "black",
        width: 1,
        height: 20,
        marginLeft: 30,
        marginRight: 50,
    },
    totalBold: {
        fontWeight: "bold",
        fontSize: 16
    },
    totalBoldRed: {
        fontWeight: "bold",
        fontSize: 16,
        color: "red"
    },
    paymentMethod: {
        fontWeight: "bold",
        marginTop: 10
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5
    },
    radioIcon: {
        width: 25,
        height: 25,
        marginRight: 10
    },
    radioIcon2: {
        width: 25,
        height: 25,
        marginLeft: "auto"
    },
    orderButton: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 35,
        alignItems: "center",
        marginVertical: 20,
        alignSelf: 'center',
        width: "90%",
    },
    orderButtonText: {
        color: "white",
        fontWeight: "bold"
    },
});

export default OrderScreen;
