import React from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const WidgetPages = () => {
    const router = useRouter();

    const addWidgetBtn = () => {
        router.push({ pathname: "/widgetPages/widgetPages" })
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Back Button */}
            <View style={styles.topNavWrapper}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <AntDesign name="left" size={20} color="white" />
                </TouchableOpacity>
                <View>
                    <TouchableOpacity onPress={() => addWidgetBtn()}>
                        <MaterialCommunityIcons name="view-dashboard-edit" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.containerWidget}>
                <View style={styles.innerConWidget}>

                </View>
            </View>
        </SafeAreaView>
    );
};

export default WidgetPages;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topNavWrapper: {
        backgroundColor: "#3730A3",
        paddingHorizontal: 35,
        paddingVertical: 25,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    containerWidget: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    innerConWidget: {
        width: "100%",
    }
});
