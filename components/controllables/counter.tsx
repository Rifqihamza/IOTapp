import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    color?: string;
    onChange?: (counter: number) => void
}

const ControllableCounter: React.FC<Props> = ({ color = "white", onChange }) => {
    const [counter, setCounter] = useState(0);
    
    const updateCounter = (inc: number) => {
        setCounter(counter + inc);
        if(onChange) {
            onChange(counter);
        }
    }
    
    return <View style={{ flexDirection: 'row', gap: 25, alignItems: 'center' }}>
        <TouchableOpacity onPress={() => { updateCounter(-1); }}>
            <FontAwesome6 name="minus" size={20} color={color} />
        </TouchableOpacity>
        <Text style={{ color: color, fontSize: 24, fontWeight: '600' }}>{counter}</Text>
        <TouchableOpacity onPress={() => { updateCounter(1); }}>
            <FontAwesome6 name="plus" size={20} color={color} />
        </TouchableOpacity>
    </View>;
};

export default ControllableCounter;

const styles = StyleSheet.create({

});