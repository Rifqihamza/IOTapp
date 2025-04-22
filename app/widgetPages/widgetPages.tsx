import React, { useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import RBSheet from 'react-native-raw-bottom-sheet';
import Slider from '@react-native-community/slider';

// Icon
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import AllertComp from '@/components/alertSuccess';
type RBSheetRef = any;

const WidgetPages: React.FC = () => {
    const router = useRouter();
    const sheetRef = useRef<RBSheetRef>(null);

    useEffect(() => {
        sheetRef.current?.close();
    }, []);

    const openRBSheet = () => {
        sheetRef.current?.open();
    };

    const widget = [
        {
            id: 1,
            name: "Switch",
            icon: <MaterialCommunityIcons name="toggle-switch-off" size={50} color="white" />,
        },
        {
            id: 2,
            name: "Slider",
            icon: <Slider
                style={{ width: 150, height: "auto" }} // penting: kasih height lebih tinggi
                minimumValue={0}
                maximumValue={100}
                step={1}
                minimumTrackTintColor="#fff"
                maximumTrackTintColor="#000"
                thumbTintColor="#fff"
            />,
        },
        {
            id: 3,
            name: "Gauge",
            icon: <Entypo name="gauge" size={40} color="white" />
        },
        {
            id: 4,
            name: "Button",
            icon: <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 25, alignItems: "center" }}>
                <FontAwesome6 name="minus" size={20} color="white" />
                <Text style={{ color: "#fff", fontSize: 24, fontWeight: "600" }}>1</Text>
                <FontAwesome6 name="plus" size={20} color="white" />
            </View>,
        },
        {
            id: 5,
            name: "LED",
            icon: <MaterialCommunityIcons name="lightbulb-on-outline" size={40} color="white" />
        }
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.headerWrapper}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="close" size={28} color="white" />
                    </TouchableOpacity>

                    <View style={styles.iconWrapper}>
                        <TouchableOpacity onPress={openRBSheet}>
                            <AntDesign name="plussquareo" size={28} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AntDesign name="bells" size={28} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AntDesign name="infocirlceo" size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.headerTitleWrapper}>
                    <Text style={styles.headerTitle}>Build Your App</Text>
                </View>
            </View>

            {/* Bottom Sheet */}
            <RBSheet
                ref={sheetRef}
                height={500}
                openDuration={300}
                customStyles={{
                    container: styles.sheetContainer,
                }}
                draggable={true}
                dragOnContent={true}
            >
                <View style={styles.sheetHeader}>
                    <Text style={styles.sheetTitle}>Pilih Widget Mu!</Text>
                    <TouchableOpacity
                        onPress={() => sheetRef.current?.close()}
                        style={styles.sheetCloseButton}
                    >
                        <Text style={styles.sheetCloseButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>

                {/* Widget List */}
                <FlatList
                    data={widget}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.sheetListWrapper}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.widgetItem}>
                            {item.icon}
                        </TouchableOpacity>
                    )}
                />

            </RBSheet>
        </SafeAreaView>
    );
};

export default WidgetPages;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff"
    },
    headerWrapper: {
        backgroundColor: "#3730A3",
        paddingVertical: 25,
        paddingHorizontal: 20,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        position: "relative",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    headerTitleWrapper: {
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#fff",
    },
    sheetContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    sheetHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: "600",
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
        fontWeight: '600',
    },
    sheetListWrapper: {
        paddingVertical: 20,
        paddingBottom: 60,
    },
    widgetItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3730A3",
        paddingVertical: 20,
        paddingHorizontal: 15,
        margin: 10,
        borderRadius: 20,
        minWidth: 150, // kasih ukuran minimal
    },
});
