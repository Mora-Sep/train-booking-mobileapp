import React, { useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, useWindowDimensions, TextInput, Pressable, Platform } from "react-native"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker';

import InputFeild from "../components/InputFeild";
import { color } from '../styles/Color';

export default function RegisterScreen({ navigation }) {
    const windowWidth = useWindowDimensions().width

    const buttonWidth = windowWidth * 0.1;

    const dynamicStyles = StyleSheet.create({
        button: {
            marginHorizontal: buttonWidth,
        },
    });

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false)
    const [dateOfBirth, setDateOfBirth] = useState("");

    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }

    const onChange = ({ type }, selectedDate) => {
        if (type == "set") {
            const currentDate = selectedDate
            setDate(currentDate)
            if (Platform.OS == "android") {
                toggleDatePicker()
                setDateOfBirth(formatDate(currentDate))
            }
        } else {
            toggleDatePicker()
        }
    }

    const confirmIOSDate = () => {
        setDateOfBirth(formatDate(date))
        toggleDatePicker()
    }

    const formatDate = (rawDate) => {
        let date = new Date(rawDate)
        let year = date.getFullYear()
        let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let month = monthNames[date.getMonth()];
        let day = date.getDate()

        return `${day} ${month} ${year}`;
    }

    const handleRegister = () => {
        // registration logic 
        // After successful registration, navigate to HomeScreen
        navigation.navigate('App', { screen: 'Home' });
    };

    return (
        <SafeAreaView style={styles.safecontainer}>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.text}>Create an Account</Text>

                <InputFeild
                    lable={'First-Name'}
                    icon={<Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
                />

                <InputFeild
                    lable={'Last-Name'}
                    icon={<Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
                />

                <InputFeild
                    lable={'Email address'}
                    icon={<MaterialIcons name="alternate-email" size={20} color="#666" style={{ marginRight: 5 }} />}
                    keyboardType="email-address"
                />

                <InputFeild
                    lable={'Password'}
                    icon={<Ionicons name="lock-closed-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
                    inputType="password"
                />

                <View style={styles.dateFeild}>
                    <Ionicons name="calendar-number-outline" size={20} color="#666" style={{ marginRight: 5 }} />
                    {showPicker && (
                        <DateTimePicker
                            mode='date'
                            display='spinner'
                            value={date}
                            onChange={onChange}
                            style={styles.datePicker}
                        />
                    )}

                    {showPicker && Platform.OS == "ios" && (
                        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                            <TouchableOpacity onPress={toggleDatePicker}>
                                <Text style={[styles.pickerbutton, { backgroundColor: "#cdcccf" }, { color: "black" }]}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={confirmIOSDate}>
                                <Text style={[styles.pickerbutton, { backgroundColor: "#60a0d1" }, { color: "black" }]}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {!showPicker && (
                        <Pressable onPress={toggleDatePicker}>
                            <TextInput fontSize={18} placeholder='Date of Birth' value={dateOfBirth} onChangeText={setDateOfBirth} editable={false} style={styles.dateSelected} onPressIn={toggleDatePicker} />
                        </Pressable>
                    )}
                </View>

                <TouchableOpacity onPress={handleRegister}>
                    <Text style={[styles.registerButton, dynamicStyles.button]}>Register</Text>
                </TouchableOpacity>

                <View style={styles.backSection}>
                    <Text style={styles.backText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.backButton}> Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safecontainer: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        paddingHorizontal: 25,
    },
    scrollContainer: {
        paddingTop: 40
    },
    text: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 16,
        marginBottom: 30,
        color: "#143066"
    },
    dateFeild: {
        flexDirection: "row",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        padding: 8,
        marginBottom: 25
    },
    dateText: {
        color: "#999999",
        fontSize: 20
    },
    registerButton: {
        padding: 8,
        borderColor: "black",
        borderWidth: 2,
        marginTop: 80,
        marginBottom: 30,
        borderRadius: 10,
        textAlign: "center",
        ...color.theamBlue,
        color: "black",
        fontSize: 24,
        fontWeight: "bold"
    },
    backSection: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 70,
    },
    backText: {
        fontSize: 18,
        textAlign: "center",
    },
    backButton: {
        color: "black",
        fontSize: 18,
        color: "#1554d1",
        marginHorizontal: 10
    },
    dateSelected: {
        color: "black",
    },
    datePicker: {
        height: 120,
        marginTop: -10
    },
    pickerbutton: {
        paddingHorizontal: 20,
        padding: 8,
        borderColor: "black",
        borderWidth: 1,
        marginTop: 40,
        marginBottom: 30,
        borderRadius: 10,
        textAlign: "center",
        fontSize: 24,
        fontWeight: "bold"
    }
})