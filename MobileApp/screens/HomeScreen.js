import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SelectList } from 'react-native-dropdown-select-list'

import Header from "../components/Header";
import { color } from "../styles/Color";

export default function HomeScreen({ navigation }) {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "On Train",
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontSize: 28,
                fontWeight: "400",
                color: "white",
            },
            headerStyle: {
                height: 110,
                backgroundColor: "#26457C",
                borderBottomColor: "transparent",
                shadowColor: "transparent"
            },
            headerRight: () => (
                <Ionicons name="notifications-outline" size={30} color="white" style={{ marginRight: 10 }} />
            )
        });
    }, []);

    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [departureDate, setDepartureDate] = useState("");
    const [returnDate, setReturnDate] = useState("")

    const [fromStaion, setFromStation] = useState("");
    const [toStaion, setToStation] = useState("");

    const [tripType, setTripType] = useState("One Way")

    const handleTripTypeChange = (type) => {
        setTripType(type)
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    // const handleConfirm = (selectedDate) => {
    //     setDate(selectedDate);
    //     setDepartureDate(formatDate(selectedDate));
    //     hideDatePicker();
    // };

    const handleDepartureDate = (selectedDate) => {
        setDate(selectedDate);
        setDepartureDate(formatDate(selectedDate));
        hideDatePicker();
    };

    const handleReturnDate = (selectedDate) => {
        setReturnDate(formatDate(selectedDate));
        hideDatePicker();
    };

    const formatDate = (rawDate) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let month = monthNames[date.getMonth()];
        let day = date.getDate();

        return `${day} ${month} ${year}`;
    };

    const stations = [
        { key: '1', value: 'Colombo' },
        { key: '2', value: 'Kandy' },
        { key: '3', value: 'Ambalangoda' },
        { key: '4', value: 'Kochikade' },
        { key: '5', value: 'colooo' },
        { key: '6', value: 'Ambalangodawwww' },
    ];

    return (
        <View>
            <Header onTripTypeChange={handleTripTypeChange} />
            <ScrollView style={styles.container}>
                <View style={{ ...color.theamBlue, borderRadius: 15 }}>

                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ color: "white", paddingTop: 10, fontSize: 18 }}>From</Text>
                        <SelectList
                            setSelected={setFromStation}
                            data={stations}
                            // save="value"
                            placeholder="Choose Station"
                            arrowicon={<FontAwesome name="chevron-down" size={12} color={'white'} />}
                            boxStyles={{ ...styles.inputField, borderColor: "white" }}
                            inputStyles={styles.textInput}
                            dropdownStyles={{ backgroundColor: color.theamBlue.backgroundColor, maxHeight: 200 }}
                            dropdownTextStyles={{ color: "white" }}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ color: "white", paddingTop: 10, fontSize: 18 }}>To</Text>
                        <SelectList
                            setSelected={setToStation}
                            data={stations}
                            // save="value"
                            placeholder="Choose Station"
                            arrowicon={<FontAwesome name="chevron-down" size={12} color={'white'} />}
                            boxStyles={{ ...styles.inputField, borderColor: "white" }}
                            inputStyles={styles.textInput}
                            dropdownStyles={{ backgroundColor: color.theamBlue.backgroundColor, maxHeight: 200 }}
                            dropdownTextStyles={{ color: "white" }}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ color: "white", paddingTop: 10, fontSize: 18 }}>Departure</Text>
                        <View style={styles.inputField}>
                            <Ionicons name="calendar-number-outline" size={20} color="white" style={{ marginRight: 5 }} />
                            <Pressable onPress={showDatePicker} style={{ flex: 1 }}>
                                <TextInput
                                    fontSize={18}
                                    placeholder='Date'
                                    placeholderTextColor="white"
                                    value={departureDate}
                                    onChangeText={setDepartureDate}
                                    editable={false}
                                    style={styles.textInput}
                                />
                            </Pressable>
                        </View>
                    </View>

                    {tripType === "Round Trip" && (
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text style={{ color: "white", paddingTop: 10, fontSize: 18 }}>Return</Text>
                            <View style={styles.inputField}>
                                <Ionicons name="calendar-number-outline" size={20} color="white" style={{ marginRight: 5 }} />
                                <Pressable onPress={showDatePicker} style={{ flex: 1 }}>
                                    <TextInput
                                        fontSize={18}
                                        placeholder='Date'
                                        placeholderTextColor="white"
                                        value={returnDate}
                                        onChangeText={setReturnDate}
                                        editable={false}
                                        style={styles.textInput}
                                    />
                                </Pressable>
                            </View>
                        </View>
                    )}

                    {/* <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={tripType === "Round Trip" ? handleReturnDate : handleDepartureDate}
                        onCancel={hideDatePicker}
                    /> */}

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={(selectedDate) => {
                            if (tripType === "Round Trip") {
                                if (!departureDate) {
                                    handleDepartureDate(selectedDate); // Set departure date
                                } else {
                                    handleReturnDate(selectedDate); // Set return date
                                }
                            } else {
                                handleDepartureDate(selectedDate); // For One Way trip, set departure date
                            }
                        }}
                        onCancel={hideDatePicker}
                    />


                    {/* <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    /> */}

                    <View style={{ paddingHorizontal: 10, marginBottom: 15 }}>
                        <Text style={{ color: "white", paddingTop: 10, fontSize: 18 }}>No of Passengers</Text>
                        <Pressable style={styles.inputField}>
                            <MaterialIcons name="people-outline" size={24} color="white" />
                            <TextInput placeholder="No of passengers" placeholderTextColor="white" style={styles.textInput} />
                        </Pressable>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        marginHorizontal: 25,
    },
    inputField: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderColor: "white",
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 10,
        borderRadius: 10
    },
    textInput: {
        fontSize: 16,
        color: "white",
        flex: 1,
    },
    pickerButton: {
        padding: 10,
        borderRadius: 5,
        textAlign: "center",
        margin: 5,
        width: 100,
    },
});
