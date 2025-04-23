import React, { useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import RBSheet from 'react-native-raw-bottom-sheet';
import Slider from '@react-native-community/slider';

import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import ControllableSwitch from "@/components/controllables/switch";
import ControllableSlider from "@/components/controllables/slider";
import ControllableGauge from '../../components/controllables/gauge';
import ControllableCounter from "@/components/controllables/counter";
import ControllableLED from '../../components/controllables/led';
import ControllableButton from "@/components/controllables/button";

type RBSheetRef = any;

const WidgetPages: React.FC = () => {
    const router = useRouter();
    const sheetAddWidgetRef = useRef<RBSheetRef>(null);
    const sheetNotifRef = useRef<RBSheetRef>(null);
    const sheetInfoRef = useRef<RBSheetRef>(null);

    useEffect(() => {
        sheetAddWidgetRef.current?.close();
        sheetNotifRef.current?.close();
        sheetInfoRef.current?.close();
    }, []);

    const widget = [
        {
            id: 1,
            name: 'Switch',
            icon: <ControllableSwitch toggleState={false} />,
        },
        {
            id: 2,
            name: 'Slider',
            icon: <ControllableSlider maxValue={100} />,
        },
        {
            id: 3,
            name: 'Gauge',
            icon: <ControllableGauge />,
        },
        {
            id: 4,
            name: 'Counter',
            icon: <ControllableCounter />,
        },
        {
            id: 5,
            name: 'LED',
            icon: <ControllableLED />,
        },
        {
            id: 6,
            name: 'Button',
            icon: <ControllableButton />,
        },
    ];

    const AddWidgetSheet = () => (
        <View style={styles.sheetContainer}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>Choose Your Widget!</Text>
                <TouchableOpacity onPress={() => sheetAddWidgetRef.current?.close()} style={styles.sheetCloseButton}>
                    <Text style={styles.sheetCloseButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={widget}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.sheetListWrapper}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.widgetItem}>
                        {item.icon}
                        <Text style={styles.widgetTitle}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );

    const NotificationSheet = () => (
        <View style={styles.sheetContainer}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>Notification</Text>
                <TouchableOpacity onPress={() => sheetNotifRef.current?.close()} style={styles.sheetCloseButton}>
                    <Text style={styles.sheetCloseButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
            {/* Konten notifikasi di sini */}
        </View>
    );

    const InfoSheet = () => (
        <View style={styles.sheetContainer}>
            <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>Information</Text>
                <TouchableOpacity onPress={() => sheetInfoRef.current?.close()} style={styles.sheetCloseButton}>
                    <Text style={styles.sheetCloseButtonText}>Close</Text>
                </TouchableOpacity>
            </View>
            {/* Konten info di sini */}
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerWrapper}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="close" size={28} color="white" />
                    </TouchableOpacity>
                    <View style={styles.iconWrapper}>
                        <TouchableOpacity onPress={() => sheetAddWidgetRef.current?.open()}>
                            <AntDesign name="plussquareo" size={28} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => sheetNotifRef.current?.open()}>
                            <AntDesign name="bells" size={28} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => sheetInfoRef.current?.open()}>
                            <AntDesign name="infocirlceo" size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.headerTitleWrapper}>
                    <Text style={styles.headerTitle}>Build Your App</Text>
                </View>
            </View>

            {/* 3 RBSheets */}
            <RBSheet ref={sheetAddWidgetRef} height={600} openDuration={300} customStyles={{ container: styles.sheetContainer }}>
                <AddWidgetSheet />
            </RBSheet>
            <RBSheet ref={sheetNotifRef} height={800} openDuration={300} customStyles={{ container: styles.sheetContainer }}>
                <NotificationSheet />
            </RBSheet>
            <RBSheet ref={sheetInfoRef} height={700} openDuration={300} customStyles={{ container: styles.sheetContainer }}>
                <InfoSheet />
            </RBSheet>
        </SafeAreaView>
    );
};

export default WidgetPages;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff'
    },
    headerWrapper: {
        backgroundColor: '#3730A3',
        paddingVertical: 25,
        paddingHorizontal: 20,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
    },
    headerTitleWrapper: {
        marginTop: 20
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff'
    },
    sheetContainer: {
        paddingVertical: 20,
        paddingHorizontal: 10,

        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    sheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: '600'
    },
    sheetCloseButton: {
        backgroundColor: '#3730A3',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    sheetCloseButtonText: {
        color: '#fff',
        fontWeight: '600'
    },
    sheetListWrapper: {
        paddingVertical: 20,
        paddingBottom: 60
    },
    widgetItem: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#3730A3',
        paddingVertical: 20,
        paddingHorizontal: 15,
        margin: 10,
        borderRadius: 20,
        minWidth: 150,
    },
    widgetTitle: {
        color: '#fff',
        fontSize: 16
    },
});
