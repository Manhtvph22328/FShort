import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addInformation,
  getInformation,
  setCheckedInformation,
  updateInformation,
} from '../redux/action/informationAction';
import { RadioButton } from 'react-native-paper';
import AddressFormModal from '../component/modal-information';

const InformationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { information } = useSelector(state => state.information);
  const [checked, setChecked] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editData, setEditData] = useState(null);

  // Khi load dữ liệu xong, mặc định chọn item đầu tiên

  useEffect(() => {
    if (checked !== null) {
      dispatch(setCheckedInformation(checked));
    }
  }, [checked]);
  useEffect(() => {
    dispatch(getInformation());
  }, [dispatch]);

  const handleSubmitForm = (data) => {
    console.log(data);
    if (data._id) {
      // update địa chỉ
      dispatch(updateInformation(data));
    } else {
      // thêm địa chỉ mới
      dispatch(addInformation(data));
    }
  };
  const handleEdit = (item) => {
    setEditData(item);
    setIsFormVisible(true);
  };
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.row}>
        <RadioButton
          value={item._id}
          status={item.checked === true ? 'checked' : 'unchecked'}
          onPress={() => setChecked(item._id)}
          color="black"
        />

        <View style={styles.infoContent}>
          <Text style={styles.name}>{item?.information?.name}</Text>
          <Text style={styles.phoneNumber}>{item?.information?.phoneNumber}</Text>
          <Text style={styles.address}>{item?.information?.address}</Text>
        </View>

        <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
          <Text style={styles.editText}>Sửa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const handleAddNew = () => {
    setEditData(null);
    setIsFormVisible(true);
  };

  const renderFooter = () => (
    <TouchableOpacity style={styles.addNewAddress} onPress={handleAddNew}>
      <Image source={require('../assets/add.png')} style={styles.iconPlus} />
      <Text style={styles.addText}>Thêm địa chỉ mới</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/iconback.png')}
            style={styles.iconBack}
          />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>Địa chỉ nhận hàng</Text>
        </View>
      </View>

      <FlatList
        data={information}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
      />
      <AddressFormModal
        isVisible={isFormVisible}
        onClose={() => setIsFormVisible(false)}
        onSubmit={handleSubmitForm}
        initialData={editData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBack: {
    width: 25,
    height: 25,
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 15,
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  phoneNumber: {
    fontSize: 14,
    color: '#333',
  },
  address: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    marginRight: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  editText: {
    color: 'gray',
    fontSize: 14,
  },
  addNewAddress: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    flexDirection: 'row',
    borderBottomColor: '#ccc',
  },
  iconPlus: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  addText: {
    fontSize: 18,
    color: 'black',
  },
});

export default InformationScreen;
