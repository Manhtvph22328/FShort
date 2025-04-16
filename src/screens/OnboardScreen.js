import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
        id: 1,
        title: 'Nhiều kiểu dáng, \nthoải mái lựa chọn',
        description: 'Trải nghiệm những cuộc đi chơi với nhiều kiểu phối\nđồ khác nhau. Đảm bảo rằng bạn luôn cảm thấy tự\ntin trong những cuộc hẹn.',
        image: require('../assets/onboa1.jpg'),
    },
    {
        id: 2,
        title: 'Tìm thời trang đẹp nhất,\n cho buổi hẹn hò của bạn',
        description: 'Khám phá các mẫu mới nhất cho những buổi date\ncủa bạn, tự tin khoe cá tính với bạn gái của mình.',
        image: require('../assets/onboa2.jpg'),
    },
    {
        id: 3,
        title: 'Khám phá thế giới\ncùng chúng tôi',
        description: 'Cùng chúng tôi bước vào những cuộc phiêu lưu mới \nmẻ và thú vị, khám phá thế giới đầy sắc màu và đa dạng.',
        image: require('../assets/onboa3.jpg'),
    },
];

const OnboardScreen = ({navigation}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sliderRef = useRef(null);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.cachRong}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.text}>{item.description}</Text>
                    </View>

                    <View style={styles.khoangTrong}>
                        <View style={styles.paginationContainer}>
                            {slides.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.paginationDot,
                                        activeIndex === index ? styles.activeDot : styles.inactiveDot,
                                    ]}
                                />
                            ))}
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, styles.nextButton]}
                        onPress={() => {
                            if (activeIndex < slides.length - 1) {
                                sliderRef.current.goToSlide(activeIndex + 1, true);
                            } else {
                                navigation.navigate('Login');
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>Tiếp theo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.skipButton]}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.nextButtonText}>Bỏ qua</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    };

    return (
        <AppIntroSlider
            renderItem={renderItem}
            data={slides}
            onSlideChange={(index) => setActiveIndex(index)}
            renderPagination={() => null}
            ref={sliderRef}
        />
    );
}

export default OnboardScreen

const styles = StyleSheet.create({
    cachRong: {
        width: '100%',
        height: '37%',
    },
    khoangTrong: {
        marginTop: 30,
    },
    slide: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 18,
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    title: {
        color: '#000000',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        margin:'auto',
        bottom: 5
    },
    text: {
        color: '#000000',
        fontSize: 14.9,
        textAlign: 'center',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    paginationDot: {
        width: 15,
        height: 15,
        marginHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 2,
        borderWidth: 1,
    },
    activeDot: {
        backgroundColor: '#000000',
        borderColor: 'transparent',
    },
    inactiveDot: {
        backgroundColor: 'white',
        borderColor: '#727272',
    },
    button: {
        width: '90%',
        height: 60,
        marginVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextButton: {
        backgroundColor: '#000000',
    },
    skipButton: {
        backgroundColor: '#E2E2E2',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    nextButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});