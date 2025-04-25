// AllertSuccess.tsx
import React, { useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Animated,
    Easing,
    Image,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';

interface Props {
    visible: boolean;
    message: string;
    onClose?: () => void;
}

const AllertSuccess: React.FC<Props> = ({ visible, message, onClose }) => {
    const scaleValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 600,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
            }).start(() => {
                setTimeout(() => {
                    Animated.timing(scaleValue, {
                        toValue: 0,
                        duration: 500,
                        easing: Easing.in(Easing.ease),
                        useNativeDriver: true,
                    }).start(() => {
                        if (onClose) onClose();
                    });
                }, 2000); 
            });
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <Modal visible={visible} transparent animationType="none">
            <View style={styles.overlay}>
                <Animated.View
                    style={[styles.container, { transform: [{ scale: scaleValue }] }]}
                >
                    <Image
                        source={require('@/assets/images/wavePerson.png')}
                        style={styles.backgroundImage}
                    />
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Perhatian!</Text>
                    </View>
                    <View style={styles.content}>
                        <Feather name="check-circle" size={80} color="green" />
                        <Text style={styles.message}>Yes! {message}</Text>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default AllertSuccess;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000099',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#fff',
        overflow: 'hidden',
        padding: 24,
        borderRadius: 12,
        width: '70%',
    },
    backgroundImage: {
        width: 200,
        height: 200,
        position: 'absolute',
        right: -70,
        bottom: 0,
        zIndex: -10,
        opacity: 0.4,
    },
    header: {
        position: 'absolute',
        top: 10,
        left: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#3730A3',
        borderRadius: 10,
    },
    headerText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        marginTop: 40,
        alignItems: 'center',
    },
    message: {
        color: '#000',
        fontWeight: '600',
        borderRadius: 14,
        padding: 20,
        fontSize: 24,
        marginTop: 15,
        textAlign: 'center',
    },
});
