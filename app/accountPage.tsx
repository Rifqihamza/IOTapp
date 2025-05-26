import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight, Platform, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllertConfirm from '@/components/alertConfirm';

// Icons
import AntDesign from '@expo/vector-icons/AntDesign';
const AccountPages = () => {
    const [showAlert, setShowAlert] = useState(false)
    const router = useRouter();

    const dataAccountDummy = {
        name: "Jhon Doe",
        email: "example@gmail.com",
        password: "********",
        role: "Admin",
        country: "indonesia",
        timezone: "Asia/Jakarta"
    };

    const handleLogout = () => {
        setShowAlert(true);
    };

    const confirmLogout = async () => {
        setShowAlert(false);
        await AsyncStorage.removeItem('userToken');
        router.replace('/auth');
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Profile Picture Section */}
            <View style={styles.containerImgProfile}>
                <ImageBackground
                    source={require('@/assets/images/circuitPattern.png')}
                    style={styles.bgPattern}
                />
                {/* Back Button */}
                <View style={styles.backButtonWrapper}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <AntDesign name="left" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <Image source={require("@/assets/images/avatar.jpg")} style={styles.imgProfile} />
                <TouchableOpacity style={styles.btnChangePict} onPress={() => console.log("Change Picture")}>
                    <AntDesign name="camera" size={28} color="black" />
                </TouchableOpacity>
            </View>

            {/* Data Profile Section */}
            <View style={styles.dataProfile}>
                <View style={styles.headerTitle}>
                    <Text style={styles.headerText}>Profile Kamu!</Text>
                    <TouchableHighlight
                        style={styles.btnEdit}
                        underlayColor={"#4338CA"}
                        onPress={() => router.push({ pathname: "/editProfile/editProfilePages" })}>
                        <Text style={styles.btnEditTitle}>Edit Profile</Text>
                    </TouchableHighlight>
                </View>
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
                <View style={styles.dataRow}>
                    <Text style={styles.label}>Role</Text>
                    <Text style={styles.value}>{dataAccountDummy.role}</Text>
                </View>
                <View style={styles.dataRow}>
                    <Text style={styles.label}>Country</Text>
                    <Text style={styles.value}>{dataAccountDummy.country}</Text>
                </View>
                <View style={styles.dataRow}>
                    <Text style={styles.label}>Timezone</Text>
                    <Text style={styles.value}>{dataAccountDummy.timezone}</Text>
                </View>
            </View>
            <View style={styles.logoutButtonWrapper}>
                <TouchableHighlight
                    style={{
                        backgroundColor: "#3730A3",
                        padding: 15,
                        borderRadius: 10,
                        marginTop: 30
                    }}
                    underlayColor={"#4338CA"}
                    onPress={handleLogout} // langsung aja, ga perlu arrow function kalau ga ada parameter
                >
                    <Text style={{
                        fontSize: 18,
                        fontWeight: "500",
                        textAlign: "center",
                        color: "#fff"
                    }}>
                        Logout
                    </Text>
                </TouchableHighlight>

                <AllertConfirm
                    visible={showAlert}
                    message="logout"
                    onConfirm={confirmLogout}
                    onCancel={() => setShowAlert(false)}
                />

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
        top: 0,
        left: 10,
        zIndex: 1,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    containerImgProfile: {
        flex: 1,
        backgroundColor: '#312E81',
        alignItems: "center",
        paddingVertical: 50,
        position: "relative"
    },
    bgPattern: {
        height: Platform.OS === 'web' ? '100%' : 500,
        width: Platform.OS === 'web' ? '100%' : 500,
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0.9,
    },
    imgProfile: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: '#4338CA',
        resizeMode: "contain"
    },
    btnChangePict: {
        backgroundColor: "#fff",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        marginTop: 10,
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
    headerTitle: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        marginBottom: 20
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
    },
    btnEdit: {
        backgroundColor: "#3730A3",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    btnEditTitle: {
        fontSize: 12,
        fontWeight: "500",
        textAlign: "center",
        color: "#fff"
    },
    dataRow: {
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#aaa',
    },
    value: {
        fontSize: 18,
        color: '#000',
        fontWeight: '500',
    },
    logoutButtonWrapper: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        justifyContent: "center"
    }
});
