import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, updateCart } from '../redux/action/cartAction'; // Đảm bảo import updateCart

const CartScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cart?.products || []);
  const [selectAll, setSelectAll] = useState(false);
  // Lấy giỏ hàng từ Redux khi component được render
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  // Hàm toggle checkbox của một sản phẩm
  const toggleCheckbox = useCallback(async (item) => {
    const newChecked = !item.checked;
    await dispatch(updateCart({ itemId: item._id, quantity: item.quantity, checked: newChecked }));
  }, [dispatch]);

  // Hàm toggle chọn tất cả sản phẩm trong giỏ hàng
  const toggleSelectAll = useCallback(async () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    for (const item of cartItems) {
      await dispatch(updateCart({ itemId: item._id, quantity: item.quantity, checked: newSelectAll }));
    }
  }, [cartItems, selectAll, dispatch]);

  // Hàm tăng số lượng sản phẩm
  const incrementQuantity = useCallback(async (item) => {
    const newQuantity = item.quantity + 1;
    await dispatch(updateCart({ itemId: item._id, quantity: newQuantity, checked: item.checked }));
  }, [dispatch]);

  // Hàm giảm số lượng sản phẩm
  const decrementQuantity = useCallback(async (item) => {
    if (item.quantity > 0) {
      const newQuantity = item.quantity - 1;
      await dispatch(updateCart({ itemId: item._id, quantity: newQuantity, checked: item.checked }));
    }
  }, [dispatch]);

  // Tính tổng tiền của giỏ hàng
  const totalAmount = cartItems.reduce((sum, item) => (item.checked ? sum + item.price * item.quantity : sum), 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.headerLogo} />
        <Text style={styles.headerTitle}>Giỏ Hàng</Text>
      </View>

      <ScrollView>
        {cartItems.map((item) => (
          <View key={item._id} style={styles.itemContainer}>
            <TouchableOpacity style={{flex : 1,height : '100%',justifyContent : 'center'}} onPress={() => toggleCheckbox(item)}>
              <Image source={item.checked ? require('../assets/checkOn.png') : require('../assets/checkOff.png')} style={styles.checkbox} />
            </TouchableOpacity>

            <Image source={{ uri: item.productId.images[0] }} style={[styles.image]} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.productId.name_product}</Text>
              <Text style={styles.itemDesc}>Kích thước: {item.size}, Màu sắc: {item.color}</Text>
              <Text style={styles.itemPrice}>{item.price.toLocaleString()} VND</Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => decrementQuantity(item)}>
                  <Image source={require('../assets/min.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => incrementQuantity(item)}>
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
        <TouchableOpacity style={styles.checkoutButton} onPress={()=>{
            const cartSelected = cartItems.filter(item => item.checked);
            navigation.navigate('Order',{cartItems : cartSelected});
        }}>
          <Text style={styles.checkoutText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

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
    width: 45,
    height: 45,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 12
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
    marginLeft: 5
  },
  itemContainer: {
    height :140,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent : 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    height: 100,
    marginLeft : 10,
    width : 100,
    borderRadius: 10,
    margin: 5
  },
  itemDetails: {
    flex: 9,
    marginLeft: 5
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
    marginTop: 4
  },
  itemPrice: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 4
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10
  },
  checkbox: {
    width: 25,
    height: 25,
    borderRadius: 3,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginTop: 5
  },
  totalText: {
    fontSize: 14,
    marginLeft: 10
  },
  totalText2: {
    fontSize: 14
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red'
  },
  checkbox2: {
    width: 25,
    height: 25,
    marginLeft: 10
  },
  checkoutButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25
  },
  checkoutText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  }
});
