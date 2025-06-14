import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const EditableField = ({ label, value, isEditing, onEdit, onSave }) => {
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        if (!isEditing) {
            setInputValue(value);
        }
    }, [isEditing, value]);

    const handleSave = () => {
        if (inputValue.trim() === "") {
            Alert.alert("Validation Error", "This field cannot be empty.");
            return;
        }
        onSave(inputValue.trim());
    };

    return (
        <View style={{ marginBottom: 15, width: '90%' }}>
            <Text style={{ fontSize: 18 }}>{label}</Text>
            {isEditing ? (
                <View style={styles.editContainer}>
                    <TextInput
                        style={styles.input}
                        value={inputValue}
                        onChangeText={setInputValue}
                        autoFocus
                    />
                    <TouchableOpacity onPress={handleSave}>
                        <Feather name="check" size={24} color="green" />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.details}>
                    <Text style={{ fontSize: 18 }}>{value}</Text>
                    <TouchableOpacity onPress={onEdit}>
                        <Feather name="edit" size={25} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    details: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderColor: "black",
        borderBottomWidth: 0.5,
        backgroundColor: "#e8e8e8",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: 8,
    },
    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 10,
        backgroundColor: '#fff',
    },
});

export default EditableField;