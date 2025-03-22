import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OtpVerificationScreen = () => {
    const navigation = useNavigation();
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(59);
    const inputRefs = useRef([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Xử lý nhập OTP
    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

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

            <View style={styles.maincontent}>
                <Text style={styles.title}>Nhập mã OTP đã gửi tới thiết bị của bạn</Text>

                {/* Input OTP */}
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (inputRefs.current[index] = ref)}
                            style={[styles.otpInput, digit && styles.otpFilled]}
                            maxLength={1}
                            keyboardType="numeric"
                            onChangeText={(value) => handleOtpChange(index, value)}
                            value={digit}
                        />
                    ))}
                </View>
                <Text style={styles.resendText}>
                    Làm mới mã OTP trong <Text style={styles.timerText}>{timer}</Text>
                </Text>
            </View>

            {/* Nút xác nhận */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("ResetPassword")}>
                <Text style={styles.buttonText}>Xác nhận</Text>
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
    lockIcon: {
        width: 180,
        height: 180,
        top: -80
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
    maincontent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "left",
        top: -150
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 15
    },
    otpInput: {
        width: 45,
        height: 45,
        borderWidth: 1,
        borderColor: "#000",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        borderRadius: 10,
        marginHorizontal: 5,
        backgroundColor: "#fff",
    },
    otpFilled: {
        borderColor: "black",
        backgroundColor: "#E5E5E5",
    },

    resendText: {
        fontSize: 14,
        color: "#666",
        fontWeight: "bold",
        left: -80,
        top: 80
    },
    timerText: {
        fontWeight: "bold",
        color: "red"
    },
    button: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 30,
        width: "80%",
        alignItems: "center",
        margin:"auto"
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
});

export default OtpVerificationScreen;