import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ResetPasswordScreen = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = () => {
        if (password === confirmPassword && password.length > 0) {
            setModalVisible(true);
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
                {/* Icon khóa lớn */}
                <Image source={require("../assets/lock.png")} style={styles.lockIcon} />

                <Text style={styles.title}>Tạo mật khẩu mới</Text>
                <View style={styles.inputContainer}>
                    <Image source={require("../assets/look.png")} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={showPassword ? require("../assets/eyeOpen.png") : require("../assets/eyeClosed.png")}
                            style={styles.eyeIcon}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Image source={require("../assets/look.png")} style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập lại mật khẩu"
                        secureTextEntry={!showConfirmPassword}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <Image
                            source={showConfirmPassword ? require("../assets/eyeOpen.png") : require("../assets/eyeClosed.png")}
                            style={styles.eyeIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Tiếp tục</Text>
            </TouchableOpacity>

            {/* Modal chúc mừng */}
            <Modal transparent={true} visible={modalVisible} animationType="fade">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={require("../assets/connect.png")} style={styles.checkmarkIcon} />
                        <Text style={styles.modalTitle}>Xin chúc mừng!</Text>
                        <Text style={styles.modalText}>Tài khoản của bạn đã sẵn sàng</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setModalVisible(false);
                                navigation.navigate("Login");
                            }}
                        >
                            <Text style={styles.modalButtonText}>Đi tới màn hình đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ResetPasswordScreen;

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
    maincontent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5F5F5",
    },
    lockIcon: {
        width: 180,
        height: 180,
        top: -80
    },
    title: {
        fontSize: 15,
        color: 'gray',
        fontWeight: "bold",
        marginBottom: 10,
        left: -100
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
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 15,
        width: "90%",
        height: 60,
        marginBottom: 20,
    },
    inputIcon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    eyeIcon: {
        width: 20,
        height: 20
    },
    input: {
        flex: 1,
        height: 50
    },

    button: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 30,
        width: "80%",
        justifyContent: 'flex-end',
        alignItems: "center",
        margin: 'auto'
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    // Modal styles
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalContent: {
        backgroundColor: "white",
        width: "80%",
        padding: 25,
        borderRadius: 20,
        alignItems: "center",
        elevation: 5
    },
    checkmarkContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15
    },
    checkmarkIcon: {
        width: 200,
        height: 200,

    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10
    },
    modalText: {
        color: "#888",
        fontSize: 14,
        marginBottom: 20
    },
    modalButton: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 10,
        width: "100%",
        alignItems: "center"
    },
    modalButtonText: {
        color: "white",
        fontWeight: "bold"
    }
});
