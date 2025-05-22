import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
    controllable_name: string;
    width: number;
    height: number;
    x: number;
    y: number;
    children?: React.ReactNode;
    label?: string; 
}

export type WidgetProps = React.FC<Props>

const Widget: WidgetProps = ({ controllable_name, width, height, x, y, children }) => {
    return <View style={styles.widgetItem}>
        {children}
        <Text style={styles.widgetTitle}>{controllable_name}</Text>
    </View>
}

export default Widget;

const styles = StyleSheet.create({
    widgetItem: {
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#3730A3',
        padding: 10,
        boxSizing: "border-box",
        aspectRatio: "1 / 1"
    },
    widgetTitle: {
        color: '#fff',
        fontSize: 16
    },
});
