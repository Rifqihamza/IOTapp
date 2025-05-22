import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

interface Props {
    value: number; // 0 - 100
    label: string;
    unit?: string;
    color?: string;
}

const ControllableGauge: React.FC<Props> = ({
    value,
    label,
    unit = '%',
    color = '#22D3EE',
}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <AnimatedCircularProgress
                size={100}
                width={10}
                fill={value}
                tintColor={color}
                backgroundColor="#e5e5e5"
                rotation={-100}
                arcSweepAngle={200}
                lineCap="round"
                style={{ position: "absolute", top: 0, }}
            >
                {(fill) => (
                    <Text style={styles.valueText}>
                        {Math.round(fill)}{unit}
                    </Text>
                )}
            </AnimatedCircularProgress>
        </View>
    );
};

export default ControllableGauge;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: "100%",
        width: "100%"
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 10,
    },
    valueText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
    },
});
