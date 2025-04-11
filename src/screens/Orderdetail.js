import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Orderdetail = () => {
    const [paymentMethod, setPaymentMethod] = React.useState("cash");
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
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
            <View style={styles.addressContainer}>
                <View style={styles.tt}>
                    <TouchableOpacity>
                        <Image source={require("../assets/oto.png")} style={styles.iconoto} />
                    </TouchableOpacity>
                    <Text style={styles.addressTitle}>Địa chỉ giao hàng</Text>
                </View>
                <View style={styles.tt2}>
                    <Text style={styles.addressName}>Trịnh Văn Mạnh</Text>
                    <Text style={styles.addressPhone}>0123456789</Text>
                    <Text style={styles.addressDetail}>Số 3 Xuân Phương, Hồ Thị, Phương Canh, Nam Từ Liêm, Hà Nội</Text>
                </View>
            </View>

            <View style={styles.txt}>
                <View style={styles.tt}>
                    <TouchableOpacity>
                        <Image source={require("../assets/shopping-cart.png")} style={styles.iconoto} />
                    </TouchableOpacity>
                    <Text style={styles.ttTitle}>Sản phẩm</Text>
                </View>
            </View>
            <View style={styles.productContainer}>
                <Image source={require("../assets/Sp1.jpg")} style={styles.productImage} />
                <View style={styles.productDetails}>
                    <Text style={styles.productName}>Áo Hoodie</Text>
                    <Text style={styles.productVariant}>Kích thước: XL   Màu sắc: Black</Text>
                    <Text style={styles.productPrice}>300.000 đ</Text>
                </View>
                <Text style={styles.quaty}>x1</Text>
            </View>

            <View style={styles.txt}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalBold}>Tổng tiền hàng</Text>
                    <Text style={styles.totalPrice2}>300.000 đ</Text>
                </View>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalText}>Phí Ship</Text>
                    <Text style={styles.totalPrice}>0 đ</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalBold}>Tổng thanh toán</Text>
                    <Text style={styles.totalBoldRed}>300.000 đ</Text>
                </View>
            </View>

            <View style={styles.txt}>
                <View style={styles.totalContainer2}>
                <Image source={require("../assets/cod.png")} style={styles.radioIcon} />
                <Text style={styles.paymentMethod}>Hình thức thanh toán</Text>
                </View>
                <Text style={styles.txt3}>Thanh toán khi nhận hàng</Text>
            </View>

            <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>Huỷ đơn hàng</Text>
            </TouchableOpacity>
        </View>
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
        flexDirection: 'colum',
        left: 28,
        justifyContent: 'space-between',
    },
    addressContainer: {
        width: '100%',
        height: 'auto',
        padding: 10,
        backgroundColor: "#EEEEEE",
        borderRadius: 10,
        marginBottom: 10,
    },
    addressTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        left: -195,
    },
    ttTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#444444",
        left: -240
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
        height: 'auto',
        padding: 10,
        backgroundColor: "#EEEEEE",
        borderRadius: 10,
        marginBottom: 10,
    },
    txt: {
        width: 'auto',
        height: 'auto',
        padding: 10,
        backgroundColor: "#EEEEEE",
        marginBottom: 10,
    },
    txt2: {
        flexDirection: "row",
        alignItems: "center",
        width: 'auto',
        height: 'auto',
        padding: 10,
        backgroundColor: "#EEEEEE",
        marginBottom: 10,
    },
    txt3: {
     marginLeft: 30,
     color:'gray'
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
        fontSize: 20,
        fontWeight: "bold"
    },
    productVariant: {
        color: "gray",
        top: 20,
    },
    productPrice: {
        color: "red",
        fontWeight: "bold",
        top: 25, fontSize: 17,
    },
    quaty: {
        color: "#444",
        top: 75, fontSize: 15,
    },
    totalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 5
    },
    totalContainer2: {
        flexDirection: "row",
        alignItems: "center",
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
        width: 1, height: 20,
        marginLeft: 30, marginRight: 50,
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
        fontSize: 15,
        fontWeight: "bold",
        marginTop: 5
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5
    },
    radioIcon: {
        width: 25,
        height: 25,
        marginRight: 5,
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
        bottom: 20, top: 20,
        margin: 'auto',
        width: "90%",
    }
    ,
    orderButtonText: {
        color: "white",
        fontWeight: "bold"
    },
});

export default Orderdetail;