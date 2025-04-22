import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GamePad } from '@/components/Gampead';
const GamepadScreen = () => {
    return (
        <View style={styles.container}>
            <GamePad
                onMove={({ x, y }) => console.log('Move:', x, y)}
                onPressButton={(btn) => console.log('Pressed:', btn)}
            />
        </View>
    );
};

export default GamepadScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
});
