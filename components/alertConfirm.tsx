// AllertConfirm.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
    visible: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const AllertConfirm: React.FC<Props> = ({ visible, message, onConfirm, onCancel }) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.message}>Are you sure to {message}?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={onCancel} style={styles.cancelBtn}>
                            <Text style={styles.btnText}>Batal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onConfirm} style={styles.confirmBtn}>
                            <Text style={styles.btnText}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AllertConfirm;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000099',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 12,
        width: '70%',
        alignItems: 'center',
    },
    message: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 12,
    },
    cancelBtn: {
        backgroundColor: '#666',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,
    },
    confirmBtn: {
        backgroundColor: '#3730A3',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 8,

    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "center"
    },
});
