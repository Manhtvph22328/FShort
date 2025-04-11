import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
} from 'react-native';
import React, { useState } from 'react';

const ProfileScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(false);
    console.log("User logged out!");
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.appLogo} />
        <Text style={styles.headerText}>Cá nhân</Text>
        <TouchableOpacity>
          <Image source={require('../assets/more.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={styles.card}>
        <View style={styles.profileInfo}>
          <Image style={styles.avatar} source={require('../assets/onboa1.jpg')} />
          <TouchableOpacity
            style={styles.changeAvatarButton}
            onPress={() => setChangeAvatarModalVisible(true)}>
            <Image source={require('../assets/brush.png')} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.name}>Trình Văn Mạnh</Text>
            <Text style={styles.email}>manh@gmail.com</Text>
          </View>
        </View>
      </View>

      {/* Function Card */}
      <View style={styles.card}>
        <View style={styles.functionContainer}>
          <TouchableOpacity style={styles.functionButton} onPress={() => navigation.navigate('EditProfile')}>
            <Image source={require('../assets/profileedit.png')} style={styles.icon} />
            <Text style={styles.functionText}>Chỉnh sửa thông tin cá nhân</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.functionButton} onPress={() => navigation.navigate('EditAdress')}>
            <Image source={require('../assets/adress.png')} style={styles.icon} />
            <Text style={styles.functionText}>Chỉnh sửa địa chỉ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.functionButton} onPress={() => navigation.navigate('OrderHistory')}>
            <Image source={require('../assets/history.png')} style={styles.icon} />
            <Text style={styles.functionText}>Lịch sử mua hàng</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.functionButton} onPress={() => setModalVisible(true)}>
            <Image source={require('../assets/exit.png')} style={styles.icon} />
            <Text style={[styles.functionText, styles.logoutText]}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal xác nhận đăng xuất */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Đăng xuất</Text>
            <Text style={styles.modalMessage}>Bạn có chắc chắn muốn đăng xuất không?</Text>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText2}>Đăng xuất</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  appLogo: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10
  },
  icon: {
    width: 22,
    height: 22,
    marginLeft: 5,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000000',
    flex: 1,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#f4f4f4',
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  changeAvatarButton: {
    marginTop: -15,
    right: -50
  },
  changeAvatarText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  textContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  email: {
    fontSize: 16,
    marginTop: 5,
    color: 'black',
  },
  functionContainer: {
    marginTop: 10,
  },
  functionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  functionText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight:'bold',
    color: '#000000',
  },
  logoutText: {
    color: 'red',
    fontWeight:'bold',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalContainer: {
    backgroundColor: "white",
    width: "100%", height: "40%",
    tSize: 18,
    fontWeight: "bold",
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: "center",
    paddingBottom: 24,
  },
  modalTitle: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight:'bold',
    textAlign: "center"
  },
  modalMessage: {
    fontSize: 20,
    marginBottom: 50,
    fontWeight:'bold',
    textAlign: "center"
  },
  logoutButton: {
    backgroundColor: "black",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
    marginBottom: 10
  },
  cancelButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
    marginBottom: 10
  },
  cancelText: {
    color: "black",
    fontSize: 18,
    fontWeight:'bold',
  },
  logoutText2: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight:'bold',
  },
});

export default ProfileScreen;