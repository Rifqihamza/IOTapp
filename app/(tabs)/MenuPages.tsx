import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image } from 'react-native';
const MenuPages = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require("@/assets/images/workInProgress.jpg")} style={{ width: 400, height: 400, borderRadius: 50, }} />
                <Text style={{ fontSize: 16, fontWeight: 600, color: '#333' }}>- Menu Pages -</Text>
                <Text style={{ fontSize: 14, color: '#333' }}>Work In Progress</Text>
            </View>
        </SafeAreaView>
    );
};

export default MenuPages;

const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
});