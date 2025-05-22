import React, { useEffect, useState } from "react";
import { ColorValue, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

interface Props {
    color?: ColorValue
    onPress?: () => void
}

const ControllableButton: React.FC<Props> = ({ color = "white", onPress }) => {
    const [backgroundColor, setBackgroundColor] = useState(color || undefined);

    useEffect(() => {
        setBackgroundColor(undefined);
    }, []);

    return (<TouchableWithoutFeedback onPress={onPress} onPressIn={() => setBackgroundColor(color)} onPressOut={() => setBackgroundColor(undefined)}>
        <View style={{ width: 40, height: 40, borderWidth: 2, borderRadius: 100, borderColor: color, backgroundColor: backgroundColor }} />
    </TouchableWithoutFeedback>);
};

export default ControllableButton;