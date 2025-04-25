import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

function OrderDone({navigation}) {
  return (
    <View style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      padding: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopColor: '#BBBBBB',
      borderTopWidth: 0.5,
    }}>
      <Image source={require('../assets/ic_greenCheck3.png')} style={{width: 80, height: 80, marginTop: 20}} />
      <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold', marginTop: 20}}>Cảm ơn bạn đã đặt hàng!</Text>
      <Text style={{color: '#737373', fontSize: 14, marginTop: 20, marginBottom: 10}}>Bạn sẽ nhận được thông tin cập
        nhận về sản phẩm trong hộp thư thông báo.</Text>
      <TouchableOpacity style={{
        backgroundColor: '#ff7f00',
        padding: 12,
        borderRadius: 40,
        alignItems: 'center',
        width: '100%',
        margin: 10,
      }}
         onPress={() => navigation.replace('OrderHistory')}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
          Xem đơn hàng
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default OrderDone;
