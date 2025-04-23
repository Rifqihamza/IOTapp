import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableHighlight, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { get_user_devices } from "@/api/device";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Icons
const DeviceListPages = () => {
    const router = useRouter();

    const [devicesData, setDevicesData] = useState([
        {
            device_id: "",
            device_name: "Loading..",
            created_at: "Loading..",
            connected_controllables: 0
        }
    ]);

    useEffect(() => {
        get_user_devices().then(result => {
            if(result.success) {
                setDevicesData(result.data.data.devices_data);
            }
        })
    }, []);

    const addDeviceBtn = () => {

    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Back Button */}
            <View style={styles.topNavWrapper}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <AntDesign name="left" size={20} color="white" />
                </TouchableOpacity>
                <View>
                    <TouchableOpacity onPress={() => addDeviceBtn()}>
                        <MaterialCommunityIcons name="plus" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.deviceListContainer}>
                {
                    devicesData.map((deviceData, index) => {
                        return <TouchableHighlight
                        key={index}
                        style={{ backgroundColor: "#3730A3", borderRadius: 15, margin: 10, padding: 20 }}
                        onPress={async () => {
                            await AsyncStorage.setItem("device_id", deviceData.device_id);
                            router.push("/WidgetPages");
                        }}>
                            <View>
                                <Text style={{ color: "white",fontWeight: "bold", fontSize: 24 }} >{deviceData.device_name}</Text>
                                <Text style={{ color: "white",fontSize: 18 }} >{deviceData.connected_controllables} connected controllables</Text>
                                <Text style={{ color: "white",fontSize: 18, opacity: 0.5 }} >{deviceData.created_at}</Text>
                            </View>
                        </TouchableHighlight>
                    })
                }
            </View>
        </SafeAreaView>
    );
};

export default DeviceListPages;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
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
    deviceListContainer: {

    }
});
 