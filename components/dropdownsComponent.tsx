import { View, TouchableOpacity, Text, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

type DropdownItem = {
    value: string;
    label: string;
};

type Props = {
    data: DropdownItem[];                 // external data
    onSelect?: (value: string) => void;  // callback
};

export default function DropdownsComponent({ data, onSelect }: Props) {
    const [expanded, setExpanded] = useState(false);

    const handleSelect = (item: DropdownItem) => {
        setExpanded(false);
        if (onSelect) onSelect(item.value);
    };

    return (
        <View style={style.container}>
            <TouchableOpacity style={style.button} onPress={() => setExpanded(prev => !prev)}>
                <Text style={style.text}>Select</Text>
                <AntDesign name={expanded ? "caretup" : "caretdown"} color={'black'} size={16} />
            </TouchableOpacity>

            {expanded && (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={style.dropdownItem} onPress={() => handleSelect(item)}>
                            <Text style={style.itemText}>{item.label}</Text>
                        </TouchableOpacity>
                    )}
                    style={style.dropdown}
                />
            )}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        width: "100%",
        marginTop: 10,
    },
    text: {
        fontSize: 15,
        opacity: 0.8,
        marginRight: 8,
    },
    button: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    dropdown: {
        position: "absolute",
        top: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 15,
    },
    itemText: {
        fontSize: 14,
    },
});
