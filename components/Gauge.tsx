// components/Gauge.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

interface GaugeProps {
    value: number; // 0 - 100
    label: string;
    unit?: string;
    color?: string;
}

const Gauge: React.FC<GaugeProps> = ({ value, label, unit = '%', color = '#3c98be' }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <AnimatedCircularProgress
                size={130}
                width={12}
                fill={value}
                tintColor={color}
                backgroundColor="#e0e0e0"
                rotation={0}
                lineCap="round"
            >
                {
                    (fill) => (
                        <Text style={styles.valueText}>
                            {Math.round(fill)}{unit}
                        </Text>
                    )
                }
            </AnimatedCircularProgress>
        </View>
    );
};

export default Gauge;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 16,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3c98be',
        marginBottom: 10,
    },
    valueText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});
