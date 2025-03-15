import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';

const EditdressScreen = () => {
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
                    <Text style={styles.headerText}>Chỉnh sửa địa chỉ</Text>
                </View>
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.inputFlex} placeholder="Tỉnh / Thành Phố" />
                <Image source={require("../assets/location.png")} style={styles.icon2} />
            </View>

            <TextInput style={styles.input} placeholder="Quận / Huyện" />
            <TextInput style={styles.input} placeholder="Xã / Phường" />
            <TextInput style={styles.input} placeholder="Địa chỉ chi tiết(số nhà, tên đường)" />

            <Text style={styles.Text}>Số điện thoại nhận hàng</Text>

            <View style={styles.inputContainer}>
                <Image source={require("../assets/iconCo.png")} style={styles.flagIcon} />
                <TextInput style={styles.inputFlex} placeholder="0987645633" keyboardType="phone-pad" />
                <Image source={require("../assets/phone-256.webp")} style={styles.icon2} />
            </View>

            <TouchableOpacity style={styles.updateButton}>
                <Text style={styles.updateButtonText}>Cập nhật</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F5F5", padding: 20 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 5,
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
    Text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
        marginTop: 15, marginBottom:15,
    },
    input: {
        backgroundColor: "#fff",
        height: 70,
        padding: 15,
        borderRadius: 15,
        marginBottom: 10
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10
    },
    inputFlex: {
        flex: 1
    },
    icon2: {
        width: 22,
        height: 22,
        tintColor: "black"
    },
    flagIcon: {
        width: 30,
        height: 25,
        marginRight: 10
    },
    updateButton: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 35,
        alignItems: "center",
        marginTop: 230
    },
    updateButtonText: {
        color: "white",
        fontWeight: "bold"
    },
});

export default EditdressScreen;
