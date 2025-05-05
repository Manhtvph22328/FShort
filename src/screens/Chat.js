import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { View, TextInput, TouchableOpacity, FlatList, Text, Pressable, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";

// ✅ THAY URL MockAPI thật của bạn vào đây
const API_URL = "https://666036505425580055b2cffb.mockapi.io/chatApi";

export default function ChatApp({ navigation }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const flatListRef = useRef();

    // Load tin nhắn từ MockAPI khi mở app
    const fetchMessages = async () => {
        try {
            const res = await axios.get(API_URL);
            const sorted = res.data.sort(
                (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
            );
            setMessages(sorted);
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: false });
            }, 100);
        } catch (err) {
            console.error("Fetch MockAPI error:", err);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const sendMessage = async () => {
        if (message.trim() === "") return;
        const newMessage = { text: message, sender: "Tôi", timestamp: new Date().toISOString() };
        
        try {
            await axios.post(API_URL, newMessage);
            fetchMessages(); // Tải lại tin nhắn sau khi gửi
        } catch (err) {
            console.error("Save to MockAPI error:", err);
        }

        setMessage('');
        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
    };

    const handleGoBack = () => {
        if (navigation && navigation.goBack) {
            navigation.goBack();
        } else {
            console.log('Go back pressed');
        }
    };

    const handleScreenPress = () => {
        fetchMessages(); // Tải lại tin nhắn khi nhấn vào màn hình
    };

    return (
        <TouchableWithoutFeedback onPress={handleScreenPress}>
            <View style={{ flex: 1, paddingTop: 10 }}>
                {/* Header */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    marginBottom: 10,
                }}>
                    <Pressable onPress={handleGoBack} style={{ padding: 8 }}>
                        <Image
                            source={require('../assets/iconback.png')}
                            style={{ width: 24, height: 24 }}
                            resizeMode="contain"
                        />
                    </Pressable>
                    <Text style={{
                        flex: 1,
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: 'bold',
                        marginRight: 32
                    }}>
                        Chat Shop
                    </Text>
                </View>

                {/* Nội dung Chat */}
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    keyboardVerticalOffset={80}
                >
                    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                        <FlatList
                            ref={flatListRef}
                            data={messages}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={{
                                    alignSelf: item.sender === "Tôi" ? 'flex-end' : 'flex-start',
                                    backgroundColor: item.sender === "Tôi" ? '#dcf8c6' : '#C0C0C0',
                                    borderRadius: 10,
                                    padding: 10,
                                    marginVertical: 4,
                                    marginHorizontal: 10,
                                    maxWidth: '70%',
                                }}>
                                    <Text style={{ fontSize: 16 }}>{item.text}</Text>
                                </View>
                            )}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', paddingBottom: 10 }}
                        />
                    </View>

                    {/* Input box */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderTopWidth: 1,
                        borderColor: '#ddd',
                    }}>
                        <TextInput
                            style={{ flex: 1, borderWidth: 1, padding: 10, borderRadius: 15, marginRight: 10 }}
                            value={message}
                            onChangeText={setMessage}
                            placeholder="Nhập tin nhắn"
                        />
                        <TouchableOpacity style={{
                            alignItems: 'center',
                            backgroundColor: 'black',
                            width: 70, height: 40,
                            borderRadius: 13,
                            justifyContent: 'center',
                        }}
                            onPress={sendMessage}>
                            <Text style={{
                                color: '#ffffff',
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>Gửi</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
}
