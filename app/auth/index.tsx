// app/auth/index.tsx
import React, { useEffect, useState } from 'react';
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
import AllertSuccess from '@/components/alertSuccess';
import AllertFailed from '@/components/alertFailed';
import Feather from '@expo/vector-icons/Feather';
import { request_login, request_token } from "@/api/account";

export default function LoginPages() {
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');
    const [successVisible, setSuccessVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState("Login Berhasil!");
    const [failedVisible, setFailedVisible] = useState(false);
    const [failedMessage, setFailedMessage] = useState("Login Gagal!");
    const [isLoading, setIsLoading] = useState(false)
    const [showInputToken, setShowInputToken] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);

    const [verificationId, setVerificationId] = useState("");
    
    const router = useRouter();

    useEffect(() => {
        if(showInputToken) {
            setShowInputToken(false);
        }
    }, [email])
    
    const handleGetToken = () => {
        setIsLoading(true); // set loading true sebelum proses login
        request_token(email).then((result) => {
            if(result.success) {
                setVerificationId(result.data.data.id); // Dapatkan ID untuk verifikasi
                setSuccessVisible(true); // tampilkan alert sukses
                setSuccessMessage("Tolong cek email anda."); // Update pesan sukses
                setIsLoading(false); // set loading false setelah proses selesai
                setShowInputToken(true);
                setTimeout(() => {
                    setSuccessVisible(false); // tampilkan alert sukses
                }, 1000);
            }
            else {
                setFailedVisible(true); // tampilkan alert error
                setFailedMessage("Terjadi kesalahan."); // Update pesan error
                setIsLoading(false); // set loading false setelah proses selesai
                setShowInputToken(false);
                setTimeout(() => {
                    setFailedVisible(false); // hilangkan alert error
                }, 1000);
            }
        }).catch(error => {
            setFailedVisible(true); // tampilkan alert error
            setFailedMessage("Terjadi error."); // Update pesan error
            setIsLoading(false); // set loading false setelah proses selesai
            setShowInputToken(false);
            setTimeout(() => {
                setFailedVisible(false); // hilangkan alert error
            }, 1000);
        });
    };

    const handleLogin = () => {
        setIsLoading(true); // set loading true sebelum proses login
        request_login(token, verificationId).then(result => {
            if(result.success) {
                setSuccessVisible(true); // tampilkan alert sukses
                setSuccessMessage("Berhasil login!"); // Update pesan sukses
                setIsLoading(false); // set loading false setelah proses selesai
                setShowInputToken(false);
                setSuccessLogin(true);
            }
            else {
                setFailedVisible(true); // tampilkan alert sukses
                setFailedMessage("Terjadi kesalahan!"); // Update pesan sukses
                setIsLoading(false); // set loading false setelah proses selesai
                setShowInputToken(false);
            }
        })
    }

    const handleConfirmSuccess = async () => {
        if(successLogin) {
            setSuccessVisible(false);
            await AsyncStorage.setItem('userToken', 'example-token');
            router.replace('/');
        }
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
                                <Text style={styles.label}>Email</Text>
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
                            <View style={[styles.inputContainer, showInputToken ? styles.visible : styles.hide]}>
                                <Text style={styles.label}>Password</Text>
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        value={token}
                                        onChangeText={setToken}
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
                                    <TouchableHighlight style={styles.button} underlayColor={"#312E81"} onPress={(showInputToken ? handleLogin : handleGetToken)} disabled={isLoading}>
                                        <View style={styles.buttonContent}>
                                            {isLoading ? (
                                                <ActivityIndicator size="small" color="#fff" />
                                            ) : (
                                                <Text style={styles.buttonText}>{showInputToken ? "Login" : "Dapatkan Token"}</Text>
                                            )}
                                        </View>
                                    </TouchableHighlight>
                                </View>

                                {/* Alert */}
                                <AllertSuccess
                                    visible={successVisible}
                                    message={successMessage}
                                    onConfirm={handleConfirmSuccess}
                                />

                                <AllertFailed
                                    visible={failedVisible}
                                    message={failedMessage}
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
    },
    hide: {
        opacity: 0
    },
    visible: {
        opacity: 1
    }
});