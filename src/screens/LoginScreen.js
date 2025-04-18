
import React, { useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../contexts/AuthContext';

const LoginScreen = () => {

  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { login } = useContext(AuthContext);
  console.log('AuthContext:', useContext(AuthContext)); 

  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    console.log('Đang gửi:', { username: trimmedUsername, password: trimmedPassword });

    try {
      const res = await axios.post('http://192.168.1.19:5000/api/users/login', {
        username: trimmedUsername,
        password: trimmedPassword,
      });

      console.log('Login response:', res.data);
      login(res.data.user, res.data.token);

      navigation.navigate('Car');
    } catch (error) {
      if (error.response) {
        console.log('Login error:', error.response.data);
        setErrorMessage(error.response.data.message || 'Đăng nhập thất bại!');
      } else {
        console.log('Login error:', error.message);
        setErrorMessage('Lỗi kết nối tới server!');
      }
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      <Text style={styles.title}>với tài khoản</Text>
      <Text style={styles.title2}>của bạn</Text>

      <View style={styles.inputContainer}>
        <Image source={require('../assets/iconuser.png')} style={styles.icon} />
        <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      </View>

      <View style={styles.inputContainer}>
        <Image source={require('../assets/look.png')} style={styles.icon} />
        <TextInput
          style={[styles.input]}
          placeholder="Mật khẩu"
          placeholderTextColor="#B0B0B0"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Image
            source={
              isPasswordVisible
                ? require('../assets/eyeOpen.png')
                : require('../assets/eyeClosed.png')
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.textclick}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
          <Image
            source={require('../assets/iconnext.png')}
            style={styles.buttonIcon}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.txt}>Bạn chưa có tài khoản?</Text>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.textclick}>Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 45,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  title2: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 70,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
  },
  inputError: {
    borderColor: 'red',
    backgroundColor: '#ffe6e6',
  },
  eyeIcon: {
    width: 26,
    height: 26,
  },
  button: {
    width: '100%',
    backgroundColor: '#000000',
    borderRadius: 45,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 35,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 22,
    height: 22,
    marginLeft: 10,
    backgroundColor:'#ffffff',
    marginTop: 3,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt: {
    fontSize: 16,
    marginBottom: 40,
    marginLeft: 40,
    color: '#BEBEBE',
  },
  textclick: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 40,
    marginLeft: 3,
    color: '#000000',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 10,
  },
});

export default LoginScreen;