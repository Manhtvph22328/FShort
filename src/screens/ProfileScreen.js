import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, { useState } from 'react';

const ProfileScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

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
          <TouchableOpacity style={styles.functionButton} onPress={{}}>
          <Image source={require('../assets/profileedit.png')} style={styles.icon} />
            <Text style={styles.functionText}>Chỉnh sửa thông tin cá nhân</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.functionButton} onPress={{}}>
          <Image source={require('../assets/adress.png')} style={styles.icon} />
            <Text style={styles.functionText}>Chỉnh sửa địa chỉ</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.functionButton} onPress={{}}>
          <Image source={require('../assets/history.png')} style={styles.icon} />
            <Text style={styles.functionText}>Lịch sử mua hàng</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.functionButton} onPress={{}}>
          <Image source={require('../assets/exit.png')} style={styles.icon} />
            <Text style={[styles.functionText, styles.logoutText]}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    borderRadius:10
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
    right:-50
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
    color: '#000000',
  },
  logoutText: {
    color: 'red',
  },
});

export default ProfileScreen;
