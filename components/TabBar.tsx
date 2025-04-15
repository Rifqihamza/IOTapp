import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    return (
        <View style={styles.tabBarContainer}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;
                const color = isFocused ? '#fff' : '#4dc6e8';

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const renderIcon = () => {
                    if (route.name === 'index') {
                        return <Feather name="home" size={24} color={color} />;
                    } else if (route.name === 'MenuPages') {
                        return <FontAwesome name="bars" size={24} color={color} />;
                    }
                    return null;
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        onPress={onPress}
                        style={[
                            styles.tabButton,
                            isFocused && styles.focusedTabButton, // Apply focused styles
                        ]}
                    >
                        <View style={isFocused && styles.focusedIconContainer}>
                            <View style={isFocused && styles.icon}>
                                {renderIcon()}
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default CustomTabBar;

const styles = StyleSheet.create({
    tabBarContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        paddingVertical: 10,
        elevation: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    tabButton: {
        width: 70,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    focusedTabButton: {
        paddingTop: 0, // Move the focused button upwards
    },
    icon: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    focusedIconContainer: {
        transform: [{ translateY: -20 }], // Move the icon and background up
        backgroundColor: '#4dc6e8', // Optional: Add a background color for the focused state
        borderRadius: 50, // Optional: Add border radius for a circular effect

        elevation: 5,

        shadowColor: "#999",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 3,
        },
    }
});