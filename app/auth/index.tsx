// app/auth/index.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    SafeAreaView,
    StyleSheet,
    Image,
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function LoginPages() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        if (email === 'admin' && password === '1234') {
            await AsyncStorage.setItem('userToken', 'example-token');
            router.replace('/'); // Ganti halaman ke halaman utama
        } else {
            Alert.alert('Login gagal', 'Email atau password salah');
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
                    <View style={styles.container}>
                        <View style={styles.imgContainer}>
                            <Image
                                source={require('@/assets/images/appLogo-2.png')}
                                style={[styles.logo,]}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.form}>
                            <View style={{ position: "relative" }}>
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    value={email}
                                    onChangeText={setEmail}
                                    style={styles.input}
                                    autoCapitalize="none"
                                />
                            </View>
                            <View>
                                <Text style={styles.label}>Password</Text>
                                <TextInput
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    style={styles.input}
                                />
                            </View>
                            <View style={styles.buttonWrapper}>
                                <TouchableHighlight style={styles.button} onPress={handleLogin} >
                                    <Text style={styles.buttonText}>Login</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    imgContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: Dimensions.get("window").width * 0.8,
        height: Dimensions.get("window").height * 0.3,
    },
    form: {
        width: '100%',
        gap: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
        position: "absolute",
        top: -12,
        left: 20,
        zIndex: 10,
        backgroundColor: "#fff"
    },
    input: {
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 20,
        marginBottom: 20,
        backgroundColor: "#fff",
        borderColor: "#000",
        borderWidth: 0.5,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 3 },
        
    },
    buttonWrapper: {
        width: "100%"
    },
    button: {
        backgroundColor: "#4dc6e8",
        padding: 20,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: 2,
        color: "#fff"
    }
});
