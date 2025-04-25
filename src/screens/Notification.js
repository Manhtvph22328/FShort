import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const notifications = {
    "Hôm nay": [
        {
            icon: require('../assets/iconNofi1.png'),
            iconBg: '#A5C7E5',
            title: 'Đặt hàng thành công',
            desc: 'Bạn đã đặt Áo Hoodie thành công !'
        },
        {
            icon: require('../assets/iconNofi1.png'),
            iconBg: '#88E1DC',
            title: 'Kết nối ví điện tử thành công',
            desc: 'Ví điện tử của bạn đã được kết nối'
        }
    ],
    "Hôm qua": [
        {
            icon: require('../assets/iconNofi1.png'),
            iconBg: '#E5A5A5',
            title: 'Đơn hàng đã huỷ',
            desc: 'Bạn đã huỷ đặt sản phẩm này'
        },
        {
            icon: require('../assets/iconNofi1.png'),
            iconBg: '#A5B6E5',
            title: 'Có 1 yêu cầu đang được duyệt',
            desc: 'Yêu cầu của bạn đang trong thời gian xét duyệt'
        }
    ],
    "02/09/2024": [
        {
            icon: require('../assets/iconNofi1.png'),
            iconBg: '#A5C7E5',
            title: 'Đặt hàng thành công',
            desc: 'Bạn đã đặt Áo sơ mi trắng thành công !'
        }
    ]
};

const NotificationScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../assets/iconback.png')}
                        style={{ width: 24, height: 24, left:10 }}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Thông báo</Text>
            </View>

            {/* Nội dung thông báo */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {Object.entries(notifications).map(([date, items], idx) => (
                    <View key={idx} style={styles.section}>
                        <Text style={styles.sectionTitle}>{date}</Text>
                        {items.map((item, i) => (
                            <View key={i} style={styles.card}>
                                <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
                                    <Image source={item.icon} style={styles.icon} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>{item.title}</Text>
                                    <Text style={styles.desc}>{item.desc}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom: 30,
        marginTop: 30
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '600',
        right:200
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30
    },
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10
    },
    iconContainer: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
    },
    icon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    textContainer: {
        flex: 1
    },
    title: {
        fontWeight: '600',
        fontSize: 14
    },
    desc: {
        fontSize: 13,
        color: '#444'
    }
});
