import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Đăng ký</Text>
      </View>

      <View style={styles.avatarContainer}>
        <Image source={require('../assets/user.png')} style={styles.avatar} />
        <TouchableOpacity>
          <Image
            source={require('../assets/image.png')}
            style={styles.addIcon}
          />
        </TouchableOpacity>
      </View>

      <TextInput style={styles.input} placeholder="Tên đăng nhập" placeholderTextColor="#B0B0B0" />
      <TextInput style={styles.input} placeholder="Tên đầy đủ" placeholderTextColor="#B0B0B0" />
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#B0B0B0" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Số điện thoại" placeholderTextColor="#B0B0B0" keyboardType="phone-pad" />
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Mật khẩu"
          placeholderTextColor="#B0B0B0"
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Image
            source={
              isPasswordVisible ? require('../assets/eyeOpen.png') : require('../assets/eyeClosed.png')
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <View style={styles.checkmarkContainer}>
              <Image source={require('../assets/check.png')} style={styles.checkmarkIcon} />
            </View>
            <Text style={styles.modalTitle}>Xin chúc mừng!</Text>
            <Text style={styles.modalSubtitle}>Tài khoản của bạn đã sẵn sàng</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setIsModalVisible(false);
                navigation.replace('Login');
              }}>
              <Text style={styles.modalButtonText}>Đi tới màn hình đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F4F4F4',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
  },
  addIcon: {
    width: 35,
    height: 35,
    position: 'absolute',
    bottom: -20,
  },
  input: {
    height: 65,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 25,
    color: '#000',
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 25,
    backgroundColor: '#FFFFFF',
    height: 65,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    color: '#000',
    fontSize: 16,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 45,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  checkmarkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkmarkIcon: {
    width: 50,
    height: 50,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#000000',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RegisterScreen;