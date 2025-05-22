import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface Props {
    color?: string
    onToggle?: (state: boolean) => void
}

const ControllableLED: React.FC<Props> = ({ color = "white", onToggle }) => {
    const [state, setState] = useState(false);

    const toggleLight = () => {
        if (onToggle) {
            onToggle(!state);
        }

        setState(!state);
    }

    return (<TouchableOpacity onPress={toggleLight}>
        <MaterialCommunityIcons name={state ? "lightbulb-on" : "lightbulb-outline"} size={40} color={color} />
    </TouchableOpacity>);
};

export default ControllableLED;

const styles = StyleSheet.create({

});