// app/auth/index.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    SafeAreaView,
    StyleSheet,
    Image,
    ActivityIndicator,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import CustomText from '@/components/customText';
import AllertSuccess from '@/components/alertSuccess';
import AllertFailed from '@/components/alertFailed';
import Feather from '@expo/vector-icons/Feather';

export default function LoginPages() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successVisible, setSuccessVisible] = useState(false);
    const [failedVisible, setFailedVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const handleLogin = () => {
        setIsLoading(true); // set loading true sebelum proses login
        setTimeout(() => {  // Simulasi waktu loading (ganti dengan request asli jika perlu)
            if (email === 'admin@gmail.com' && password === '1234') {
                setSuccessVisible(true); // tampilkan alert sukses
            } else {
                setFailedVisible(true); // tampilkan alert gagal
                setEmail('');
                setPassword('');
            }
            setIsLoading(false); // set loading false setelah proses selesai
        }, 2000); // Simulasi delay 2 detik
    };

    const handleConfirmSuccess = async () => {
        setSuccessVisible(false);
        await AsyncStorage.setItem('userToken', 'example-token');
        router.replace('/');
    };

    const handleRegist = () => {
        console.log("Regist Pressed")
    }

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
                                source={require('@/assets/images/appLogo/appLogo-2x.png')}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                        </View>
                        <View style={styles.form}>
                            <View style={styles.inputContainer}>
                                <CustomText style={styles.label}>Email</CustomText>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        value={email}
                                        onChangeText={setEmail}
                                        style={styles.input}
                                        autoCapitalize="none"
                                        inputMode='email'
                                    />
                                    <Feather name="mail" size={24} color="#777" style={styles.inputIcon} />
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Password</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry
                                        style={styles.input}
                                    />
                                    <Feather name="lock" size={24} color="#777" style={styles.inputIcon} />
                                </View>
                            </View>
                            <View style={styles.buttonWrapper}>
                                {/* Login Button */}
                                <View style={styles.buttonWrapper}>
                                    {/* Login Button */}
                                    <TouchableHighlight style={styles.button} underlayColor={"#312E81"} onPress={handleLogin} disabled={isLoading}>
                                        <View style={styles.buttonContent}>
                                            {isLoading ? (
                                                <ActivityIndicator size="small" color="#fff" />
                                            ) : (
                                                <Text style={styles.buttonText}>Login</Text>
                                            )}
                                        </View>
                                    </TouchableHighlight>
                                </View>

                                {/* Alert */}
                                <AllertSuccess
                                    visible={successVisible}
                                    message="Login Berhasil"
                                    onConfirm={handleConfirmSuccess}
                                />

                                <AllertFailed
                                    visible={failedVisible}
                                    message="Login Gagal"
                                    onConfirm={() => setFailedVisible(false)}
                                />
                                {/* End Alert */}

                                <View style={styles.registerPrompt}>
                                    <Text style={styles.registerText}>Belum Punya Akun?</Text>
                                    <TouchableHighlight underlayColor={"#fff"} onPress={() => handleRegist()}>
                                        <Text style={styles.registerLink}>Buat Akun.</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView >
    );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        padding: 40,
        gap: 50,
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
        gap: 30,
    },
    inputContainer: {
        position: "relative",
    },
    label: {
        fontSize: width * 0.050,
        fontWeight: '600',
        marginBottom: 4,
        position: 'absolute',
        top: -width * 0.030,
        left: width * 0.05,
        zIndex: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 4,
    },
    inputWrapper: {
        position: "relative",
        flexDirection: "row",
        alignItems: 'center',
    },
    input: {
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 20,
        paddingRight: 50, // Make room for the icon
        backgroundColor: "#fff",
        borderColor: "#000",
        borderWidth: 0.5,
        elevation: 5,
        shadowColor: "#aaa",
        shadowOpacity: 0.2,
        shadowOffset: { width: 2, height: 3 },
        fontSize: 20,
        width: "100%",
    },
    inputIcon: {
        position: "absolute",
        right: 15,
    },
    buttonWrapper: {
        width: "100%",
        marginTop: 10,
    },
    buttonContent: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#3730A3",
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: 2,
        color: "#fff"
    },
    registerPrompt: {
        flexDirection: "row",
        gap: 5,
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    registerText: {
        fontSize: 18,
        fontWeight: "500"
    },
    registerLink: {
        fontSize: 18,
        fontWeight: "500",
        color: "#4ca4f5"
    },
    loadingContainer: {
        position: "absolute",
        backgroundColor: "#000",
        zIndex: 10,
    }
});