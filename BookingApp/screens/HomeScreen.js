import React, { useContext, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, TouchableOpacity, Image, useWindowDimensions, Alert } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SelectList } from 'react-native-dropdown-select-list'

import Header from "../components/Header";
import { color } from "../styles/Color";
import { BookingContext } from "../context/BookingContext";

export default function HomeScreen({ navigation }) {

    const { bookingDetails, setBookingDetails } = useContext(BookingContext)

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
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [activeDateField, setActiveDateField] = useState(null);

    const handleTripTypeChange = (type) => {
        setBookingDetails({ ...bookingDetails, tripType: type })
    }

    const showDatePicker = (field) => {
        setActiveDateField(field);
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirmDate = (selectedDate) => {
        if (activeDateField === 'departure') {
            setBookingDetails({ ...bookingDetails, departureDate: formatDate(selectedDate) });
        } else if (activeDateField === 'return') {
            setBookingDetails({ ...bookingDetails, returnDate: formatDate(selectedDate) });
        }
        hideDatePicker();
    };

    const formatDate = (rawDate) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let monthNum = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        let month = monthNum[date.getMonth()];
        let day = date.getDate();

        if (day < 10) {
            day = `0${day}`;
        }

        return `${year}-${month}-${day}`;
    };

    const stations = [
        { key: '1', value: 'Colombo' },
        { key: '2', value: 'Kandy' },
        { key: '3', value: 'Ambalangoda' },
        { key: '4', value: 'Kochikade' },
        { key: '5', value: 'colooo' },
        { key: '6', value: 'Ambalangodawwww' },
    ];

    const handleSearchTrain = () => {
        if (!bookingDetails.fromStation || !bookingDetails.toStation || !bookingDetails.departureDate || !bookingDetails.numPassengers) {
            Alert.alert('Invalid Details', 'Please enter all the details', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
        else {
            navigation.navigate('Booking')
        }
    }

    const findStationName = (key) => {
        const station = stations.find(station => station.key === key);
        return station ? station.value : "";
    };

    return (
        <View style={{backgroundColor: "#dadef5"}}>
            <Header onTripTypeChange={handleTripTypeChange} />
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={[color.theamBlue, { borderRadius: 15 }]}>

                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={{ color: "white", paddingTop: 10, fontSize: 18 }}>From</Text>
                        <SelectList
                            setSelected={(key) => setBookingDetails({ ...bookingDetails, fromStation: findStationName(key) })}
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
                            // setSelected={setToStation}
                            setSelected={(key) => setBookingDetails({ ...bookingDetails, toStation: findStationName(key) })}
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
                            <Pressable onPress={() => showDatePicker('departure')} style={{ flex: 1 }}>
                                <TextInput
                                    fontSize={18}
                                    placeholder='Select Date'
                                    placeholderTextColor="white"
                                    value={bookingDetails.departureDate}
                                    onChangeText={(value) => setBookingDetails({ ...bookingDetails, departureDate: value })}
                                    editable={false}
                                    style={styles.textInput}
                                />
                            </Pressable>
                        </View>
                    </View>

                    {bookingDetails.tripType === "Round Trip" && (
                        <View style={{ paddingHorizontal: 10 }}>
                            <Text style={{ color: "white", paddingTop: 10, fontSize: 18 }}>Return</Text>
                            <View style={styles.inputField}>
                                <Ionicons name="calendar-number-outline" size={20} color="white" style={{ marginRight: 5 }} />
                                <Pressable onPress={() => showDatePicker('return')} style={{ flex: 1 }}>
                                
                                    <TextInput
                                        fontSize={18}
                                        placeholder='Select Date'
                                        placeholderTextColor="white"
                                        value={bookingDetails.returnDate}
                                        onChangeText={(value) => setBookingDetails({ ...bookingDetails, returnDate: value })}
                                        editable={false}
                                        style={styles.textInput}
                                    />
                                </Pressable>
                            </View>
                        </View>
                    )}

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={hideDatePicker}
                    />

                    <View style={{ paddingHorizontal: 10, marginBottom: 15 }}>
                        <Text style={{ color: "white", paddingTop: 10, fontSize: 18 }}>No of Passengers</Text>
                        <Pressable style={styles.inputField}>
                            <MaterialIcons name="people-outline" size={24} color="white" />
                            <TextInput
                                placeholder="No of passengers"
                                placeholderTextColor="white"
                                value= {bookingDetails.numPassengers}
                                onChangeText={(value) => setBookingDetails({...bookingDetails, numPassengers: value})}
                                style={styles.textInput}
                                keyboardType="numeric"
                            />
                        </Pressable>
                    </View>

                </View>

                <TouchableOpacity onPress={handleSearchTrain}>
                    <Text style={[styles.searchButton, { marginTop: 80 }]}>SEARCH TRAIN</Text>
                </TouchableOpacity>

                <View style={{ backgroundColor: "#e6e6e6", paddingTop: 20 }}>
                    <Text style={{ color: "#26457C", fontSize: 30, fontWeight: "600", textAlign: "center" }}>Warrent Passenger</Text>
                    <TouchableOpacity style={{ marginHorizontal: 20 }}>
                        <Text style={[styles.searchButton, { marginTop: 40 }]}>WARRENT TICKET</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginHorizontal: 25,
        marginBottom: 30
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
    searchButton: {
        padding: 8,
        borderColor: "black",
        borderWidth: 2,
        // marginTop: 80,
        marginBottom: 70,
        borderRadius: 30,
        textAlign: "center",
        ...color.theamBlue,
        color: "white",
        fontSize: 20,
        fontWeight: "450"
    },
});

