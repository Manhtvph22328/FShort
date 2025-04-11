import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ForgotPasswordScreen = () => {
    const navigation = useNavigation();
    const [selectedMethod, setSelectedMethod] = useState(null);

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
                    <Text style={styles.headerText}>Quên mật khẩu</Text>
                </View>
            </View>

            <Image source={require("../assets/lock.png")} style={styles.image} />

            <View style={styles.maincontent}>
                <TouchableOpacity
                    style={[styles.option, selectedMethod === "sms" && styles.selected]}
                    onPress={() => setSelectedMethod("sms")}
                >
                    <View style={styles.iconbgr}>
                        <Image source={require("../assets/chat.png")} style={styles.icon} />
                    </View>
                    <View>
                        <Text style={styles.txt}> Gửi SMS</Text>
                        <Text style={styles.txt2}>+84 **** 789</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.option, selectedMethod === "email" && styles.selected]}
                    onPress={() => setSelectedMethod("email")}
                >
                    <View style={styles.iconbgr}>
                        <Image source={require("../assets/smss.png")} style={styles.icon} />
                    </View>
                    <View>
                        <Text style={styles.txt}> Gửi Email</Text>
                        <Text style={styles.txt2}> kha*****@gmail.com</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("OtpVerification")}>
                <Text style={styles.buttonText}>Tiếp tục</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        left:10,
        justifyContent: 'space-between',
    },
    icon: {
        width: 25,
        height: 25,
    },
    iconbgr: {
        width: 45,
        height: 45,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
    },
    maincontent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },
    txt: {
        fontSize: 14,
        color:'gray',
        fontWeight: "bold",
        left: 10
    },
    txt2: {
        fontSize: 16,
        fontWeight: "bold",
        left: 10
    },
    image: {
        width: 200,
        height: 200,
        top: 15,
        margin: 'auto'
    },
    option: {
        width: "80%",
        padding: 27,
        marginVertical: 10,
        backgroundColor: "#ffffff",
        borderRadius: 15,
        alignItems: "center",
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#000000',
    },
    selected: {
        borderColor: "#000",
        backgroundColor: '#DDDDDD',
        borderWidth: 1
    },
    button: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 30,
        bottom: 20,
        width: "80%",
        alignItems: "center",
        margin: 'auto'
    },
    buttonText: {
        color: "white",
        fontWeight: "bold"
    },
});

export default ForgotPasswordScreen;