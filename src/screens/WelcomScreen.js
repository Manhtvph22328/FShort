import { View, Image } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { login } from '../redux/reducer/userSlice';

const WelcomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkTokenAndNavigate = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (token) {
          // Có token => chuyển vào Home luôn
          dispatch(login({ accessToken: token }));
          setTimeout(() => {
            navigation.replace('OnBoard');
          }, 2000);
        } else {
          // Không có token => chuyển sang OnBoard sau 2 giây
          setTimeout(() => {
            navigation.replace('OnBoard');
          }, 2000);
        }
      } catch (error) {
        console.log('Lỗi khi đọc token:', error);
        navigation.replace('OnBoard');
      }
    };

    checkTokenAndNavigate();
  }, [navigation]);

  return (
    <View>
      <Image
        source={require('../assets/welcome.jpg')}
        style={{ height: '100%', width: '100%' }}
      />
    </View>
  );
};

export default WelcomeScreen;
