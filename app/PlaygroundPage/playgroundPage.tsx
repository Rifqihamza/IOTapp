import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
const PlaygroundPage = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Top Navigation */}
            <View style={styles.topNavWrapper}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <AntDesign name="left" size={20} color="white" />
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>Kembali</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/widgetMenuPage/widgetMenuPage')}>
                    <MaterialIcons name="widgets" size={28} color="white" />
                </TouchableOpacity>
            </View>

            {/* Container Playground */}
            <View style={{ flex: 1 }}>

            </View>

        </SafeAreaView>
    )
}

export default PlaygroundPage;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    topNavWrapper: {
        backgroundColor: '#3730A3',
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
})