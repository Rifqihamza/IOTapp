import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get_user_controllables } from "@/api/device";
import AllertError from "@/components/alertSuccess";
import { Ionicons } from "@expo/vector-icons";
import GridPlane from "@/components/gridplane";
import Widget from "@/components/controllables/widget";
import ControllableButton from "@/components/controllables/button";
import ControllableCounter from "@/components/controllables/counter";
import ControllableGauge from "@/components/controllables/gauge";
import ControllableLED from "@/components/controllables/led";

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
        AsyncStorage.getItem("device_id").then(async (device_id) => {
            setDeviceName((await AsyncStorage.getItem("device_name") || ""));
            const result = await get_user_controllables()
            
            if(!result.success) {
                setErrorMessage("Terjadi kesalahan.");
                setErrorVisible(true);
                return;
            }

            const controllables_data = result.data.data.controllables_data;
            if(Array.isArray(controllables_data)) {
                setWidgetData((controllables_data.filter(value => value.device_id == device_id)) as any);
            }
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

            <GridPlane numCols={5} numRows={5}>
                <Widget controllable_name="LED 1" height={2} width={2} x={4} y={1}>
                    <ControllableLED onToggle={(state) => { console.log(`LED 1 ${state ? "ON" : "OFF"}!`) }} />
                </Widget>
                <Widget controllable_name="LED 2" height={2} width={2} x={4} y={2}>
                    <ControllableLED onToggle={(state) => { console.log(`LED 2 ${state ? "ON" : "OFF"}!`) }} />
                </Widget>
                <Widget controllable_name="LED 3" height={2} width={2} x={4} y={3}>
                    <ControllableLED onToggle={(state) => { console.log(`LED 3 ${state ? "ON" : "OFF"}!`) }} />
                </Widget>
                <Widget controllable_name="Gauge" height={2} width={2} x={1} y={1}>
                    <ControllableGauge />
                </Widget>
                <Widget controllable_name="SW 1" height={2} width={2} x={1} y={2}>
                    <ControllableButton onPress={() => { console.log("PRESSED BUTTON!") }} />
                </Widget>
            </GridPlane>

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
