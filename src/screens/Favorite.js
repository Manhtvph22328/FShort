import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const productsfavo = [
    {
        id: 1,
        title: 'Áo Hoodie',
        price: '300.000₫',
        rating: 3.5,
        quantity: 99,
        image: require('../assets/Sp1.jpg'),
        description: 'Chất liệu vải dày dặn.',
        description2: 'Áo hoodie, áo khoác nam nữ chất nỉ dày form rộng có mũ giá rẻ, luôn luôn cập nhật những mẫu mã sản phẩm mơi, đa dạng phù hợp với các bạn trẻ, hứa hẹn luôn đem lại cho bạn những sản phẩm thời trang ưng ý và hoàn hảo nhất.',
        description3: 'Chất liệu: Nỉ cào bông, vải dày dặn, mềm, mịn, mặc thoáng mát, đường chỉ may chắc chắm, không bị giãn,...',
        description4: 'Công nghệ sử dụng: Sử dụng máy in pet chất lượng cao nhất để đảm bảo sản phẩm luôn rõ nét',
        description5: 'Ưu điểm: Màu sắc, hình ảnh in lên áo cam kết đẹp và sắc nét hơn so với hình mẫu',
    },
    {
        id: 2,
        title: 'Áo Hoodie Xám',
        price: '320.000₫',
        rating: 4.0,
        quantity: 99,
        image: require('../assets/Sp2.jpg'),
        description: 'Thoải mái, phong cách.',
        description2: 'Áo hoodie, áo khoác nam nữ chất nỉ dày form rộng có mũ giá rẻ, luôn luôn cập nhật những mẫu mã sản phẩm mơi, đa dạng phù hợp với các bạn trẻ, hứa hẹn luôn đem lại cho bạn những sản phẩm thời trang ưng ý và hoàn hảo nhất.',
        description3: 'Chất liệu: Nỉ cào bông, vải dày dặn, mềm, mịn, mặc thoáng mát, đường chỉ may chắc chắm, không bị giãn,...',
        description4: 'Công nghệ sử dụng: Sử dụng máy in pet chất lượng cao nhất để đảm bảo sản phẩm luôn rõ nét',
        description5: 'Ưu điểm: Màu sắc, hình ảnh in lên áo cam kết đẹp và sắc nét hơn so với hình mẫu',
    },
    {
        id: 3,
        title: 'Áo Hoodie Đen',
        price: '290.000₫',
        rating: 4.2,
        quantity: 99,
        image: require('../assets/Sp3.jpg'),
        description: 'Mềm mại, giữ ấm tốt.',
        description2: 'Áo hoodie, áo khoác nam nữ chất nỉ dày form rộng có mũ giá rẻ, luôn luôn cập nhật những mẫu mã sản phẩm mơi, đa dạng phù hợp với các bạn trẻ, hứa hẹn luôn đem lại cho bạn những sản phẩm thời trang ưng ý và hoàn hảo nhất.',
        description3: 'Chất liệu: Nỉ cào bông, vải dày dặn, mềm, mịn, mặc thoáng mát, đường chỉ may chắc chắm, không bị giãn,...',
        description4: 'Công nghệ sử dụng: Sử dụng máy in pet chất lượng cao nhất để đảm bảo sản phẩm luôn rõ nét',
        description5: 'Ưu điểm: Màu sắc, hình ảnh in lên áo cam kết đẹp và sắc nét hơn so với hình mẫu',
    },
    {
        id: 4,
        title: 'Áo Hoodie Trắng',
        price: '350.000₫',
        rating: 4.6,
        quantity: 99,
        image: require('../assets/Sp2.jpg'),
        description: 'Đẹp và phong cách.',
        description2: 'Áo hoodie, áo khoác nam nữ chất nỉ dày form rộng có mũ giá rẻ, luôn luôn cập nhật những mẫu mã sản phẩm mơi, đa dạng phù hợp với các bạn trẻ, hứa hẹn luôn đem lại cho bạn những sản phẩm thời trang ưng ý và hoàn hảo nhất.',
        description3: 'Chất liệu: Nỉ cào bông, vải dày dặn, mềm, mịn, mặc thoáng mát, đường chỉ may chắc chắm, không bị giãn,...',
        description4: 'Công nghệ sử dụng: Sử dụng máy in pet chất lượng cao nhất để đảm bảo sản phẩm luôn rõ nét',
        description5: 'Ưu điểm: Màu sắc, hình ảnh in lên áo cam kết đẹp và sắc nét hơn so với hình mẫu',
    },
];

const Favorite = () => {
    const navigation = useNavigation();

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
                    <Text style={styles.headerText}>Danh sách yêu thích</Text>
                </View>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                {productsfavo.map((product) => (
                    <TouchableOpacity
                        key={product.id}
                        onPress={() => navigation.navigate('ShirtDetail', { product })}
                    >
                        <View key={product.id} style={styles.card}>
                            <Image source={product.image} style={styles.image} />
                            <View style={styles.info}>
                                <Text style={styles.name}>{product.title}</Text>
                                <Text style={styles.rating}>{product.description}</Text>
                                <View style={styles.ratingContainer}>
                                    <Text style={styles.rating}>⭐ {product.rating}</Text>
                                </View>
                                <Text style={styles.price}>{product.price}</Text>
                            </View>
                            <TouchableOpacity style={styles.heartIcon}>
                                <Image source={require('../assets/favoriteOn.png')} style={styles.icon} />
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
        justifyContent: 'space-between',
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 5,
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
        marginBottom: 5,
        top: 1,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
        alignItems: 'center',
        position: 'relative',
    },
    image: { width: 100, height: 100, borderRadius: 10 },
    info: { flex: 1, marginLeft: 20 },
    name: { fontSize: 18, fontWeight: 'bold' },
    ratingContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
    rating: { fontSize: 14 },
    price: { fontSize: 16, fontWeight: 'bold', color: '#ff5733' },
    heartIcon: { position: 'absolute', top: 10, right: 10 },
});

export default Favorite;
