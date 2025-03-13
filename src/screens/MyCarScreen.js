import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Áo sơ mi Thomb', size: '42', color: 'Blue', price: 200000, quantity: 1, checked: false, image: require('../assets/Sp1.jpg') },
    { id: '2', name: 'Áo Hoodie', size: '42', color: 'Black', price: 300000, quantity: 1, checked: false, image: require('../assets/Sp2.jpg') },
    { id: '3', name: 'Áo Hoodie', size: '42', color: 'Black', price: 300000, quantity: 1, checked: false, image: require('../assets/Sp3.jpg') },
    { id: '4', name: 'Áo Hoodie', size: '42', color: 'Black', price: 300000, quantity: 1, checked: false, image: require('../assets/Sp2.jpg') },
    { id: '5', name: 'Áo Hoodie', size: '42', color: 'Black', price: 300000, quantity: 1, checked: false, image: require('../assets/Sp1.jpg') },
  ]);

  const [selectAll, setSelectAll] = useState(false);

  const toggleCheckbox = useCallback((id) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      const itemIndex = updatedItems.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        updatedItems[itemIndex] = { ...updatedItems[itemIndex], checked: !updatedItems[itemIndex].checked };
      }
      return updatedItems;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectAll((prevSelectAll) => {
      const newSelectAll = !prevSelectAll;
      setCartItems((prevItems) =>
        prevItems.map((item) => ({ ...item, checked: newSelectAll }))
      );
      return newSelectAll;
    });
  }, []);

  const incrementQuantity = useCallback((id) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      const itemIndex = updatedItems.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        updatedItems[itemIndex] = { ...updatedItems[itemIndex], quantity: updatedItems[itemIndex].quantity + 1 };
      }
      return updatedItems;
    });
  }, []);

  const decrementQuantity = useCallback((id) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      const itemIndex = updatedItems.findIndex((item) => item.id === id);
      if (itemIndex !== -1 && updatedItems[itemIndex].quantity > 1) {
        updatedItems[itemIndex] = { ...updatedItems[itemIndex], quantity: updatedItems[itemIndex].quantity - 1 };
      }
      return updatedItems;
    });
  }, []);

  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum, item) => (item.checked ? sum + item.price * item.quantity : sum), 0);
  }, [cartItems]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.headerLogo} />
        <Text style={styles.headerTitle}>Giỏ Hàng</Text>
      </View>

      <ScrollView>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <TouchableOpacity onPress={() => toggleCheckbox(item.id)}>
              <Image source={item.checked ? require('../assets/checkOn.png') : require('../assets/checkOff.png')} style={styles.checkbox} />
            </TouchableOpacity>

            <Image source={item.image} style={styles.image} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDesc}>Kích thước: {item.size}, Màu sắc: {item.color}</Text>
              <Text style={styles.itemPrice}>{item.price.toLocaleString()} VND</Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decrementQuantity(item.id)}>
                  <Image source={require('../assets/min.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => incrementQuantity(item.id)}>
                  <Image source={require('../assets/max.png')} style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={toggleSelectAll}>
          <Image source={selectAll ? require('../assets/checkOn.png') : require('../assets/checkOff.png')} style={styles.checkbox2} />
        </TouchableOpacity>
        <Text style={styles.totalText}>Tất cả</Text>
        <View>
          <Text style={styles.totalText2}>Tổng thanh toán</Text>
          <Text style={styles.totalAmount}>{totalAmount.toLocaleString()} VND</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  headerLogo: {
    width: 45, height: 45,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10
  },
  icon: {
    width: 22,
    height: 22,
    marginLeft: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  itemDesc: {
    fontSize: 12,
    color: 'gray',
    backgroundColor: '#EEEEEE',
    borderRadius: 7,
    padding: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 3,
    top: -40
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
  },
  totalText: {
    flex: 1,
    fontSize: 14,
    left: 5
  },
  totalText2: {
    flex: 1,
    fontSize: 14,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    justifyContent:'space-between'
  },
  checkbox2: {
    width: 25,
    height: 25,
  
    borderRadius: 3,
  },
  checkoutButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    left: 10
  },
  checkoutText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  },
});

export default CartScreen;