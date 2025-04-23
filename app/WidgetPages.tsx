import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get_user_controllables, get_user_devices } from "@/api/device";
import AllertError from "@/components/alertSuccess";
import { Ionicons } from "@expo/vector-icons";

const WidgetPages = () => {
    const router = useRouter();

    const [widgetData, setWidgetData] = useState([
        {
            id: 0,
            name: "",
            device_id: "",
            category: "",
            topic_name: "",
        }
    ]);
    const [errorVisible, setErrorVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Terjadi kesalahan.");
    const [deviceName, setDeviceName] = useState("Loading..")
    
    
    useEffect(() => {
        AsyncStorage.getItem("device_id").then((device_id) => {
            get_user_controllables().then((result) => {
                if(!result.success) {
                    setErrorMessage("Terjadi kesalahan.");
                    setErrorVisible(true);
                    return;
                }

                const controllables_data = result.data.data.controllables_data;
                if(Array.isArray(controllables_data)) {
                    setWidgetData((controllables_data.filter(value => value.device_id == device_id)) as any);
                }
            });

            get_user_devices().then((result) => {
                if(!result.success) {
                    setErrorMessage("Terjadi kesalahan.");
                    setErrorVisible(true);
                    return;
                } 

                console.log("RESULT:");
                console.log(result.data.data.devices_data);
                

                setDeviceName((Array.from(result.data.data.devices_data).find(value => (value as any).device_id == device_id) as any).device_name);
            });
        })
    }, [])
    
    
    const addWidgetBtn = () => {
        router.push({ pathname: "/widgetPages/widgetPages" })
    }
    
    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Back Button */}
            <View style={styles.topNavWrapper}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="close" size={28} color="white" />
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity onPress={() => addWidgetBtn()}>
                            <MaterialCommunityIcons name="view-dashboard-edit" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.headerTitleWrapper}>
                    <Text style={styles.headerTitle}>{deviceName}</Text>
                </View>
            </View>

            <View style={styles.containerWidget}>
                <View style={styles.innerConWidget}>
                    {widgetData.map((widget_data, index) => {
                        return <TouchableOpacity key={index} style={styles.widget}><Text style={{color: "white"}}>{widget_data.name}</Text></TouchableOpacity>;
                    })}
                </View>
            </View>

            {/* Alert */}
            <AllertError
                visible={errorVisible}
                message={errorMessage}
                onConfirm={() => {setErrorVisible(false)}}
            />
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
    },
    widget: {
        backgroundColor: "#3730A3",
        padding: 15,
        boxSizing: "border-box"
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: '600'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTitleWrapper: {
        marginTop: 20
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff'
    },
});
