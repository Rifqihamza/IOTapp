import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight, Alert, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Icons
import AntDesign from '@expo/vector-icons/AntDesign';
const AccountPages = () => {
    const router = useRouter();

    const dataAccountDummy = {
        name: "M Rifqi Hamza",
        email: "rifqihamza30@gmail.com",
        password: "********"
    };

    const handleLogout = async () => {
        Alert.alert(
            "Logout",
            "Apakah kamu yakin ingin keluar?",
            [
                {
                    text: "Batal",
                    style: "cancel"
                },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        await AsyncStorage.removeItem("userToken");
                        router.replace("/auth");
                    }
                }
            ]
        )
    };
    return (
        <SafeAreaView style={styles.safeArea}>

            {/* Back Button */}
            <View style={styles.backButtonWrapper}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <AntDesign name="left" size={20} color="white" />
                    <Text style={styles.backText}>Kembali</Text>
                </TouchableOpacity>
            </View>

            {/* Profile Picture Section */}
            <View style={styles.containerImgProfile}>
                <Image source={require("@/assets/images/avatar.jpg")} style={styles.imgProfile} />
                <TouchableOpacity style={{ marginTop: 10 }} onPress={() => console.log("Change Picture")}>
                    <AntDesign name="camera" size={28} color="white" />
                </TouchableOpacity>
            </View>

            {/* Data Profile Section */}
            <View style={styles.dataProfile}>
                <Text style={styles.headerText}>Profile Kamu!</Text>
                <View style={styles.dataRow}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>{dataAccountDummy.name}</Text>
                </View>
                <View style={styles.dataRow}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{dataAccountDummy.email}</Text>
                </View>
                <View style={styles.dataRow}>
                    <Text style={styles.label}>Password</Text>
                    <Text style={styles.value}>{dataAccountDummy.password}</Text>
                </View>
                <TouchableHighlight style={{ backgroundColor: "#4dc6e8", padding: 15, borderRadius: 10, marginTop: 30 }} onPress={() => router.push("/")}>
                    <Text style={{ fontSize: 18, fontWeight: "500", textAlign: "center", color: "#fff" }}>Edit Profile</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.logoutButtonWrapper}>
                <TouchableHighlight style={{ backgroundColor: "#4dc6e8", padding: 15, borderRadius: 10, marginTop: 30 }} onPress={() => handleLogout()}>
                    <Text style={{ fontSize: 18, fontWeight: "500", textAlign: "center", color: "#fff" }}>Logout</Text>
                </TouchableHighlight>
            </View>

        </SafeAreaView>
    );
};

export default AccountPages;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    backButtonWrapper: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
    },
    backText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
    containerImgProfile: {
        flex: 1,
        backgroundColor: '#4dc6e8',
        alignItems: "center",
        paddingVertical: 75
    },
    imgProfile: {
        width: 125,
        height: 125,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: '#3c98be',
        resizeMode: "contain"
    },
    dataProfile: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 30,
        paddingHorizontal: 20,
        height: "70%",
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    dataRow: {
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#999',
    },
    value: {
        fontSize: 18,
        color: '#333',
        fontWeight: '500',
    },
    logoutButtonWrapper: {
        position: 'fixed',
        bottom: 20,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        justifyContent: "center"
    }
});
