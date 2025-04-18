import React, { useState, useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // import navigation hook
import { AuthContext } from '../contexts/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import MyCarScreen from '../screens/MyCarScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const navigation = useNavigation(); // lấy navigation
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null); // lưu route bị chặn

  useEffect(() => {
    if (isLoggedIn && pendingRoute) {
      navigation.navigate(pendingRoute);
      setPendingRoute(null);
    }
  }, [isLoggedIn, pendingRoute]);

  const getIcon = (route, focused) => {
    let iconName;
    if (route.name === 'Home') {
      iconName = focused
        ? require('../assets/homeOpen.png')
        : require('../assets/homeClose.png');
    } else if (route.name === 'Search') {
      iconName = focused
        ? require('../assets/searchOpen.png')
        : require('../assets/searchClose.png');
    } else if (route.name === 'Car') {
      iconName = focused
        ? require('../assets/carOpen.png')
        : require('../assets/carClose.png');
    } else if (route.name === 'Profile') {
      iconName = focused
        ? require('../assets/profileOpen.png')
        : require('../assets/profileClose.png');
    }
    return <Image source={iconName} style={{ width: 24, height: 24 }} />;
  };

  const handleTabPress = (route) => {
    if ((route.name === 'Car' ) && !isLoggedIn) {
      setPendingRoute(route.name); // lưu lại route
      setShowLoginModal(true);     // bật modal
      return false;
    }
    return true;
  };

  const handleLoginPress = () => {
    setShowLoginModal(false);
    navigation.navigate('Login'); // chuyển qua màn Login
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#666',
          tabBarIcon: ({ focused }) => getIcon(route, focused),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                const allowNavigate = handleTabPress(route);
                if (allowNavigate) {
                  props.onPress();
                }
              }}
            />
          ),
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Trang Chủ' }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: 'Tìm kiếm' }}
        />
        <Tab.Screen
          name="Car"
          component={MyCarScreen}
          options={{ title: 'Giỏ Hàng' }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Cá Nhân' }}
        />
      </Tab.Navigator>

      {/* Modal đăng nhập */}
      <Modal
        visible={showLoginModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLoginModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Bạn cần đăng nhập để sử dụng chức năng này</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleLoginPress} // chuyển màn login
              >
                <Text style={styles.buttonText}>Đăng nhập</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setShowLoginModal(false)}
              >
                <Text style={styles.buttonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  modalButton: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default TabNavigator;
