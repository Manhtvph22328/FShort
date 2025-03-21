import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
    Modal,
    StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const reviewsData = [
    {
        id: 1,
        name: "Trịnh Văn Mạnh",
        date: "29/08/2024",
        review: "Áo đẹp, chất liệu tốt",
        rating: 5,
        avatar: require("../assets/avt.jpg"),
    },
    {
        id: 2,
        name: "Hiếu idol",
        date: "29/08/2024",
        review: "Áo chất hơn nước cất, tôi rất thích",
        rating: 5,
        avatar: require("../assets/avt.jpg"),
    },
    {
        id: 3,
        name: "Quang boy phố",
        date: "29/08/2024",
        review: "Áo cháy hơn pháo, tôi sẽ ủng hộ tiếp",
        rating: 4,
        avatar: require("../assets/avt.jpg"),
    },
    {
        id: 4,
        name: "Linh Vloc",
        date: "29/08/2024",
        review: "Áo mặc làm content rất hợp",
        rating: 3,
        avatar: require("../assets/avt.jpg"),
    },
];

const categories = ["Tất cả", "5", "4", "3"];

const Evaluate = () => {
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(5);

    const filteredReviews =
        selectedCategory === "Tất cả"
            ? reviewsData
            : reviewsData.filter((review) => review.rating.toString() === selectedCategory);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setReviewText("");
        setRating(5);
    };

    const submitReview = () => {
        if (reviewText.trim()) {
            console.log("Đánh giá:", { reviewText, rating });
            closeModal();
        }
    };
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../assets/iconback.png")} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Đánh giá</Text>
            </View>

            <View style={styles.filterContainer}>
                {categories.map((category) => (
                    <TouchableOpacity
                        key={category}
                        style={[styles.filterButton, selectedCategory === category && styles.activeFilter]}
                        onPress={() => setSelectedCategory(category)}
                    >
                        <Text style={[styles.filterText, selectedCategory === category && styles.activeFilterText]}>
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={filteredReviews}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.reviewCard}>
                        <Image source={item.avatar} style={styles.avatar} />
                        <View style={styles.reviewContent}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.date}>{item.date}</Text>
                            <Text style={styles.reviewText}>{item.review}</Text>
                        </View>
                        <View style={styles.ratingContainer}>
                            <Image source={require("../assets/SaoOn.png")} style={styles.starIcon} />
                            <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.detailButton} onPress={openModal}>
                <Text style={styles.detailButtonText}>Viết đánh giá</Text>
            </TouchableOpacity>

            {/* Modal đánh giá */}
            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Viết đánh giá</Text>
                        <View style={styles.starContainer}>
                            {[...Array(5)].map((_, index) => (
                                <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
                                    <Image source={index < rating ? require("../assets/SaoOn.png") : 
                                        require("../assets/star.png")} style={styles.starIcon} />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập đánh giá của bạn..."
                            value={reviewText}
                            onChangeText={setReviewText}
                            multiline
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={submitReview}>
                            <Text style={styles.modalButtonText}>Đánh giá</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalButtonClose} onPress={closeModal}>
                            <Text style={styles.modalButtonCloseText}>Để sau</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Evaluate;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    filterContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 16,
    },
    filterButton: {
        height: 40, width: 80,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: "#e0e0e0",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#000000",
        marginHorizontal: 5,
    },
    activeFilter: {
        backgroundColor: "#000",
    },
    filterText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    activeFilterText: {
        color: "#fff",
    },
    reviewCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 10,
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    reviewContent: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    date: {
        fontSize: 14,
        color: "gray",
    },
    reviewText: {
        fontSize: 14,
        marginTop: 4,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        fontSize: 16,
        fontWeight: "bold",
    },
    detailButton: {
        padding: 14,
        backgroundColor: "#000000",
        margin: 20,
        borderRadius: 25,
        alignItems: "center"
    },
    detailButtonText: {
        color: "#fff",
        fontWeight: "bold"
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    starContainer: {
        flexDirection: "row",
        marginVertical: 10,
    },
    starIcon: {
        width: 25,
        height: 25,
        marginHorizontal: 5,
    },
    input: {
        width: "100%",
        height: 100,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 10,
        textAlignVertical: "top",
        marginBottom: 10,
    },
    modalButton: {
        backgroundColor: "black",
        padding: 15,
        borderRadius: 25,
        width: 150,
        alignItems: "center",
    },
    modalButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    modalButtonClose: {
        marginTop: 10,
    },
    modalButtonCloseText: {
        color: "gray",
        fontWeight: "bold",
    },
});
