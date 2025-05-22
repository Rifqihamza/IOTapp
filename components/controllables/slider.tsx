import Slider from "@react-native-community/slider";
import React from "react";
import { StyleSheet } from "react-native";

interface Props {
    maxValue: number;
    minValue?: number;
    step?: number;
    maxTrackTintColor?: string;
    minTrackTintColor?: string;
    thumbTintColor?: string;
}

const ControllableSlider: React.FC<Props> = ({ maxValue, minValue = 0, step = 1, maxTrackTintColor = "#000", minTrackTintColor = "#fff", thumbTintColor = "#fff" }) => {
    return (<Slider
        style={{ width: 150, height: 40, marginTop: 20 }}
        minimumValue={minValue}
        maximumValue={maxValue}
        step={step}
        minimumTrackTintColor={minTrackTintColor}
        maximumTrackTintColor={maxTrackTintColor}
        thumbTintColor={thumbTintColor}
    />);
};

export default ControllableSlider;

const styles = StyleSheet.create({

});