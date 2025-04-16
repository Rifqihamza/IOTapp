import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface ItemRoute {
    name: string;
    route: string;
    icon: React.ReactNode;
}

const MenuPages = () => {
    const router = useRouter();

    const listItem: ItemRoute[] = [
        { name: 'Gamepad', route: '/GamepadPages', icon: <Ionicons name="game-controller" size={50} color="white" /> },
        { name: 'Controller', route: '/ControllerPages', icon: <MaterialIcons name="dashboard" size={50} color="white" /> },
        { name: 'Display', route: '/DisplayPages', icon: <MaterialIcons name="display-settings" size={50} color="white" /> },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Back Button */}
            <View style={styles.backButtonWrapper}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <AntDesign name="left" size={20} color="black" />
                    <Text style={styles.backText}>Kembali</Text>
                </TouchableOpacity>
            </View>

            {/* Scrollable Menu */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.menuWrapper}>
                    {listItem.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => router.push(item.route as any)}
                            style={styles.menuItem}>
                            {item.icon}
                            <Text style={styles.menuText}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MenuPages;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f9f9f9',
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
        color: '#000',
    },
    scrollContainer: {
        paddingTop: 70,
        paddingHorizontal: 30
    },
    menuWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center",
        gap: 20,
    },
    menuItem: {
        backgroundColor: '#4dc6e8',
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: 200,

        elevation: 5,

        shadowColor: '#aeaeae',
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    menuText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center',
    },
});
