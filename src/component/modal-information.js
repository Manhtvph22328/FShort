import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Modal from 'react-native-modal';

const AddressFormModal = ({
  isVisible,
  onClose,
  onSubmit,
  initialData
}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.information.name);
      setPhoneNumber(initialData.information.phoneNumber);
      setAddress(initialData.information.address);
    } else {
      setName('');
      setPhoneNumber('');
      setAddress('');
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!name || !phoneNumber || !address) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    const newData = {
      ...initialData,
      information: {
        name,
        phoneNumber,
        address
      }
    };

    onSubmit(newData);
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.title}>
          {initialData ? 'Chỉnh sửa địa chỉ' : 'Nhập thông tin địa chỉ mới'}
        </Text>

        <TextInput
          placeholder="Tên người nhận"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Tỉnh / Thành Phố"
            value={address}
            onChangeText={setAddress}
            style={styles.inputFlex}
          />

          <Image source={require("../assets/location.png")} style={styles.icon2} />
        </View>


        <Text style={styles.Text}>Số điện thoại nhận hàng</Text>
        <View style={styles.inputContainer}>
          <Image source={require("../assets/iconCo.png")} style={styles.flagIcon} />
          <TextInput
            placeholder="Số điện thoại"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={styles.inputFlex}
          />
          <Image source={require("../assets/phone-256.webp")} style={styles.icon2} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {initialData ? 'Lưu thay đổi' : 'Thêm mới'}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default AddressFormModal;

const styles = StyleSheet.create({
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12
  },
  inputFlex: {
    flex: 1,
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    marginTop: '20',
    borderRadius: 30,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  },
  flagIcon: {
    width: 30,
    height: 25,
    marginRight: 5,
    marginLeft: 5
  },
  icon2: {
    width: 22,
    height: 22,
    tintColor: "black",
    marginRight: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  Text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
    marginTop: 15, marginBottom: 15,
  },
});
