import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default function Greeting() {
    const getGreeting = (): string => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) {
            return 'Good Morning';
        } else if (hour >= 12 && hour < 17) {
            return 'Good Afternoon';
        } else if (hour >= 17 && hour < 21) {
            return 'Good Evening';
        } else {
            return 'Good Night';
        }
    };

    return (
        <View>
            <Text style={styles.greeting}>{getGreeting()}!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    greeting: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 600,
    },
});
