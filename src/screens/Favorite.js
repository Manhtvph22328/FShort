import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist, removeFromWishlist, addToWishlist } from '../redux/action/wishlistAction';  // Thêm addToWishlist
import { useNavigation } from '@react-navigation/native';

const Favorite = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { items: favoriteProducts, loading, error } = useSelector((state) => state.wishlist);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState(null);

    useEffect(() => {
        dispatch(getWishlist());
    }, [dispatch]);

    // Hàm xử lý thêm/xóa sản phẩm khỏi danh sách yêu thích

    const handleToggleFavorite = (product) => {
        const isFavorite = favoriteProducts.some(item => item._id === product._id);
        // Kiểm tra nếu sản phẩm đã có trong danh sách yêu thích
        if (isFavorite) {
            dispatch(removeFromWishlist(product._id));
            // Xóa khỏi danh sách yêu thích
        } else {
            dispatch(addToWishlist(product));
        }
    };


    const handleShowModal = (product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };


    const handleRemoveFavorite = () => {
        if (selectedProduct) {
            // console.log("Xóa sản phẩm:", selectedProduct._id);
            handleToggleFavorite(selectedProduct); // gọi lại toggle để xoá
            setModalVisible(false);
        } else {
            console.log("Không có sản phẩm để xóa.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/iconback.png')} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Danh sách yêu thích</Text>
            </View>

            {loading ? (
                <Text>Đang tải...</Text>
            ) : error ? (
                <Text>{error}</Text>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {favoriteProducts.length === 0 ? (
                        <Text style={styles.emptyText}>Chưa có sản phẩm yêu thích.</Text>
                    ) : (
                        favoriteProducts && favoriteProducts.map((product) => (
                            <TouchableOpacity
                                key={product._id}
                                onPress={() => navigation.navigate('ShirtDetail', { product })}
                            >
                                <View style={styles.card}>
                                    <Image
                                        source={{ uri: product.images?.[0] }}
                                        style={styles.image}
                                    />
                                    <View style={styles.info}>
                                        <Text style={styles.name}>{product.name_product}</Text>
                                        <Text style={styles.price}>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)} / cái
                                        </Text>

                                    </View>
                                    {/* Icon trái tim */}
                                    <TouchableOpacity
                                        style={styles.heartIcon}
                                        onPress={() => handleToggleFavorite(product)}
                                    >
                                        <Image
                                            source={favoriteProducts.some(item => item._id === product._id)
                                                ? require('../assets/favoriteOnRed.png')
                                                : require('../assets/favorite.png')}
                                            style={styles.icon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        ))
                    )}
                </ScrollView>
            )}

            {/* Modal xác nhận xóa sản phẩm yêu thích */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Bạn muốn xoá khỏi mục yêu thích?</Text>

                        {selectedProduct && (
                            <View style={styles.modalProduct}>
                                <Image source={{ uri: selectedProduct.image }} style={styles.modalImage} />
                                <Text style={styles.modalProductName}>{selectedProduct.title}</Text>
                                <Text style={styles.modalProductPrice}>{selectedProduct.price}</Text>
                            </View>
                        )}

                        {/* Xác nhận xoá */}
                        <TouchableOpacity style={styles.confirmButton} onPress={handleRemoveFavorite}>
                            <Text style={styles.confirmText}>Đồng ý</Text>
                        </TouchableOpacity>

                        {/* Hủy bỏ */}
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.cancelText}>Huỷ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        width: 24,
        height: 24,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    card: {
        flexDirection: 'row',
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        marginRight: 12,
    },
    info: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: '#888',
    },
    heartIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: 300,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    modalProduct: {
        alignItems: 'center',
        marginBottom: 12,
    },
    modalImage: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        marginBottom: 8,
    },
    modalProductName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalProductPrice: {
        fontSize: 14,
        color: '#888',
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    confirmText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#F44336',
        padding: 10,
        borderRadius: 8,
    },
    cancelText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Favorite;
