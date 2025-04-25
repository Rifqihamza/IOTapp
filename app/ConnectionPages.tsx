import AllertSuccess from '@/components/alertSuccess';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

const Connectionpages = () => {
    const router = useRouter()

    const btnBack = () => {
        router.replace("/")
    }
    return (
        <SafeAreaView style={style.safeArea}>

            <View style={style.container}>
                <Text style={style.wipContent}>- Work In Progress -</Text>
                <TouchableOpacity style={{
                    backgroundColor: "rgb(84, 44, 195)", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginTop: 20,
                }}
                    onPress={() => btnBack()}>
                    <Text style={{ fontSize: 20, color: "#fff" }
                    } > Back To Home</Text>
                </TouchableOpacity>
            </View >
        </SafeAreaView >
    );
};
export default Connectionpages;

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    wipContent: {
        fontSize: 24,
        fontWeight: "600"
    }
})