// DatePickerComp.tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    Platform,
    StyleSheet,
    TouchableHighlight,
    Modal,
} from 'react-native';
import DateTimePicker, {
    DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

const DatePickerComp: React.FC = () => {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const togglePicker = () => {
        setShowPicker(prev => !prev);
    };

    const onChange = (event: DateTimePickerEvent, date?: Date) => {
        if (event.type === 'set' && date) {
            setSelectedDate(date);
        }
        if (Platform.OS === 'android') {
            setShowPicker(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableHighlight
                style={styles.pickerBtn}
                onPress={togglePicker}
                underlayColor="#312E81"
            >
                <Text style={styles.pickerBtnText}>
                    {selectedDate ? selectedDate.toDateString() : 'Select Date'}
                </Text>
            </TouchableHighlight>

            {/* iOS: gunakan modal */}
            {Platform.OS === 'ios' ? (
                <Modal transparent animationType="slide" visible={showPicker}>
                    <View style={styles.modalBackdrop}>
                        <View style={styles.modalContent}>
                            <DateTimePicker
                                value={selectedDate || new Date()}
                                mode="date"
                                display="spinner"
                                locale="en-EN"
                                onChange={onChange}
                            />
                            <TouchableHighlight
                                style={styles.doneButton}
                                onPress={() => setShowPicker(false)}
                                underlayColor="#888"
                            >
                                <Text style={styles.doneButtonText}>Done</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            ) : (
                showPicker && (
                    <DateTimePicker
                        value={selectedDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={onChange}
                    />
                )
            )}
        </View>
    );
};

export default DatePickerComp;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    pickerBtn: {
        backgroundColor: '#3730A3',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    pickerBtnText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000066',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        paddingVertical: 20,
        paddingHorizontal: 16,
        alignItems: 'center',
        width: '80%',
    },
    doneButton: {
        marginTop: 16,
        backgroundColor: '#3730A3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 12,
    },
    doneButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});
