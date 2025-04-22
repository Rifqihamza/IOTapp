import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    PanResponder,
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    GestureResponderEvent,
    PanResponderGestureState,
    Dimensions,
} from 'react-native';

type Props = {
    onMove?: (position: { x: number; y: number }) => void;
    onPressButton?: (button: 'A' | 'B' | 'X' | 'Y') => void;
};

export const GamePad: React.FC<Props> = ({ onMove, onPressButton }) => {
    const pan = useRef(new Animated.ValueXY()).current;
    const [isPortrait, setIsPortrait] = useState(Dimensions.get('screen').height >= Dimensions.get('screen').width);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (
                e: GestureResponderEvent,
                gestureState: PanResponderGestureState
            ) => {
                if (onMove) {
                    onMove({ x: gestureState.dx, y: gestureState.dy });
                }

                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                }).start();
            },
        })
    ).current;

    useEffect(() => {
        const onChange = () => {
            const { height, width } = Dimensions.get('screen');
            setIsPortrait(height >= width);
        };

        const subscription = Dimensions.addEventListener('change', onChange);

        return () => {
            subscription.remove(); // cleanup
        };
    }, []);

    const renderButton = (label: 'A' | 'B' | 'X' | 'Y', positionStyle: any) => (
        <TouchableOpacity
            key={label}
            style={[styles.button, positionStyle]}
            onPress={() => onPressButton?.(label)}
        >
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    );

    const portraitButtons = [
        renderButton('A', { bottom: 60, right: 50 }),
        renderButton('B', { bottom: 110, right: 100 }),
        renderButton('X', { bottom: 160, right: 50 }),
        renderButton('Y', { bottom: 110, right: 0 }),
    ];

    const landscapeButtons = ['X', 'Y', 'B', 'A'].map((label, i) =>
        renderButton(label as 'A' | 'B' | 'X' | 'Y', {
            bottom: 40,
            right: 40 + i * 70,
        })
    );

    return (
        <View style={styles.container}>
            {/* Joystick */}
            <View style={styles.joystickBase}>
                <Animated.View
                    {...panResponder.panHandlers}
                    style={[styles.joystickThumb, pan.getLayout()]}
                />
            </View>

            {/* Action Buttons */}
            {isPortrait ? portraitButtons : landscapeButtons}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 300,
        pointerEvents: 'box-none',
    },
    joystickBase: {
        position: 'absolute',
        left: 40,
        bottom: 40,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    joystickThumb: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#555',
    },
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        backgroundColor: '#ff5252',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
