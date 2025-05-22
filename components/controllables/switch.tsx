import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

interface Props {
    toggleState: boolean;
    accentColor?: string;
    onToggle?: (state: boolean) => void;
}

const ControllableSwitch: React.FC<Props> = ({ toggleState, onToggle, accentColor = "white" }) => {
    const [state, setState] = useState(false);
    const switchToggle = () => {
        if (onToggle) {
            onToggle(!state);
        }

        setState(!state);
    }

    return (<MaterialCommunityIcons name={state ? "toggle-switch" : "toggle-switch-off"} size={50} color={accentColor} onPress={switchToggle} />);
};

export default ControllableSwitch;

const styles = StyleSheet.create({

});