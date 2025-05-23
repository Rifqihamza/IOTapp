import React, { useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const dropdownItems = [
    { value: 'edit', label: 'Edit Project' },
    { value: 'delete', label: 'Delete Project' },
    { value: 'share', label: 'Share Project' },
];

// Sample project data - replace with your actual data
const projectData = [
    {
        id: '1',
        name: 'Web Development Project',
        status: 'active',
        statusColor: 'green',
    },
];

type DropdownSheetContentProps = {
    onSelect: (value: string) => void;
};

const DropdownSheetContent = ({ onSelect }: DropdownSheetContentProps) => (
    <View style={styles.sheetContent}>
        {dropdownItems.map((item) => (
            <TouchableOpacity
                key={item.value}
                style={styles.sheetItem}
                onPress={() => onSelect(item.value)}
            >
                <Text style={styles.sheetItemText}>{item.label}</Text>
            </TouchableOpacity>
        ))}
    </View>
);

type RBSheetref = any;

type ProjectItemProps = {
    item: {
        id: string;
        name: string;
        status: string;
        statusColor: string;
    };
    onProjectPress: (projectId: string) => void;
    onMenuPress: (projectId: string) => void;
};

const ProjectItem = ({ item, onProjectPress, onMenuPress }: ProjectItemProps) => (
    <View style={styles.containerWidget}>
        <TouchableOpacity
            onPress={() => onProjectPress(item.id)}
            style={styles.innerConWidget}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <TouchableOpacity onPress={() => onMenuPress(item.id)}>
                    <AntDesign name="bars" size={28} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.cardIcon}>
                <FontAwesome5 name="project-diagram" size={100} color="black" />
            </View>
            <View style={styles.statusContainer}>
                <Text style={styles.statusText}>{item.status}</Text>
                <View style={[styles.statusDot, { backgroundColor: item.statusColor }]} />
            </View>
        </TouchableOpacity>
    </View>
);

const ProjectPage = () => {
    const refRBSheet = useRef<RBSheetref | null>(null);
    const router = useRouter();

    const handleDropdownSelect = (value: string) => {
        refRBSheet.current?.close();
        console.log(`Selected: ${value}`);
        // Add actions as needed: navigation, confirmation, etc.
    };

    const navigateToPlayground = (projectId?: string) => {
        // You can pass the projectId to the widget menu if needed
        router.push('/PlaygroundPage/playgroundPage');
    };

    const handleProjectPress = (projectId: string) => {
        console.log(`Project ${projectId} pressed`);
        navigateToPlayground(projectId);
    };

    const handleMenuPress = (projectId: string) => {
        console.log(`Menu pressed for project ${projectId}`);
        refRBSheet.current?.open();
    };

    const renderProjectItem = ({ item }: { item: typeof projectData[0] }) => (
        <ProjectItem
            item={item}
            onProjectPress={handleProjectPress}
            onMenuPress={handleMenuPress}
        />
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Top Navigation */}
            <View style={styles.topNavWrapper}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <AntDesign name="left" size={20} color="white" />
                    <Text style={{ color: "#fff", fontSize: 20, fontWeight: "600" }}>Kembali</Text>
                </TouchableOpacity>
            </View>

            {/* Project List */}
            <FlatList
                data={projectData}
                renderItem={renderProjectItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                numColumns={1}
            />

            {/* Bottom Sheet */}
            <RBSheet
                ref={refRBSheet}
                useNativeDriver={false}
                height={500}
                customModalProps={{
                    animationType: 'slide',
                    statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{ enabled: false }}
            >
                <DropdownSheetContent onSelect={handleDropdownSelect} />
            </RBSheet>

            {/* Floating Add Button */}
            <TouchableOpacity
                onPress={() => console.log('Add Project Pressed')}
                style={styles.addProjectBtn}
            >
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ProjectPage;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topNavWrapper: {
        backgroundColor: '#3730A3',
        paddingHorizontal: 15,
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
    listContainer: {
        paddingBottom: 100, // Add space for floating button
    },
    containerWidget: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    innerConWidget: {
        height: 200, // Fixed height for consistent card size
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 15,
        padding: 20,
        position: 'relative',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: '500',
        flex: 1, // Allow text to wrap if needed
        marginRight: 10,
    },
    cardIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusContainer: {
        position: 'absolute',
        bottom: 10,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    statusText: {
        fontSize: 16,
        textTransform: 'capitalize',
    },
    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    sheetContent: {
        padding: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    sheetItem: {
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    sheetItemText: {
        fontSize: 16,
    },
    addProjectBtn: {
        position: 'absolute',
        bottom: 30,
        right: 35,
        padding: 20,
        backgroundColor: '#3730A3',
        borderRadius: 50,
        elevation: 5,
    },
});