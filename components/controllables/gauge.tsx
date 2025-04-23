import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet } from "react-native";

interface Props {
    color?: string
}

const ControllableGauge: React.FC<Props> = ({ color = "white" }) => {
    return <Entypo name="gauge" size={40} color={color} />;
};

export default ControllableGauge;

const styles = StyleSheet.create({

});