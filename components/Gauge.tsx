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

const Gauge: React.FC<GaugeProps> = ({ value, label, unit = '%', color = '#22D3EE' }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <AnimatedCircularProgress
                size={100}
                width={15}
                fill={value}
                tintColor={color}
                backgroundColor="#fff"
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
        padding: 20,
        borderRadius: 16,
        width: '100%',

    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 10,
    },
    valueText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});
