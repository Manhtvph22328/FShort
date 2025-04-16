import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getAllProducts } from '../services/productService';

const AllProduct = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Lỗi khi tải sản phẩm:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../assets/iconback.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>Danh sách sản phẩm</Text>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {products.map((product) => (
                    <TouchableOpacity
                        key={product._id}
                        onPress={() => navigation.navigate('ShirtDetail', { product })}
                    >
                        <View style={styles.card}>
                            <View style={styles.imageContainer}>
                                {product.images && product.images.length > 0 && (
                                    <Image
                                        source={{ uri: product.images[0] }}
                                        style={styles.image}
                                    />
                                )}
                            </View>

                            <View style={styles.info}>
                                <Text style={styles.name}>{product.name_product || "Tên sản phẩm"}</Text>
                                {product.rating && (
                                    <View style={styles.ratingContainer}>
                                        <Text style={styles.rating}>⭐ {product.rating}</Text>
                                    </View>
                                )}
                                <Text style={styles.price}>{product.price.toLocaleString()}₫</Text>
                            </View>
                            <TouchableOpacity style={styles.heartIcon}>
                                <Image
                                    source={require('../assets/favoriteOn.png')}
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 10 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },

    icon: {
        width: 25,
        height: 25,
        marginLeft: 5,
    },
    headerTextContainer: {
        flex: 1,
        alignItems: 'center',
    },

    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
        top: 1,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        alignItems: 'center',
        elevation: 2, // nếu Android
        shadowColor: '#000', // nếu iOS
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },

    info: { flex: 1, marginLeft: 20 },
    name: { fontSize: 18, fontWeight: 'bold' },
    ratingContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
    rating: { fontSize: 14, color: '#f1c40f' },
    price: { fontSize: 16, fontWeight: 'bold', color: '#ff5733' },
    heartIcon: { position: 'absolute', top: 10, right: 10 },
});

export default AllProduct;
