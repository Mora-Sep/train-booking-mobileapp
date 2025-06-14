import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, useWindowDimensions, TextInput, Pressable, Platform, Alert } from "react-native"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import InputFeild from "../components/InputFeild";
import { color } from '../styles/Color';
import { AuthContext } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
    const windowWidth = useWindowDimensions().width

    const buttonWidth = windowWidth * 0.1;

    const dynamicStyles = StyleSheet.create({
        button: {
            marginHorizontal: buttonWidth,
        },
    });

    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState("");

    const { register } = useContext(AuthContext)

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [gender, setGender] = useState(null);
    const [nic, setNic] = useState(null);
    const [contactNumber, setContactNumber] = useState(null);
    const [email, setEmail] = useState(null);
    const [address, setAddress] = useState(null);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (selectedDate) => {
        setDate(selectedDate);
        setDateOfBirth(formatDate(selectedDate));
        hideDatePicker();
    };

    const formatDate = (rawDate) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let monthNum = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
        let month = monthNum[date.getMonth()];
        let day = date.getDate();

        return `${year}-${month}-${day}`;
    };

    const handleRegister = (firstName, lastName, username, password, gender, dateOfBirth, nic, contactNumber, email, address) => {
        if (!firstName || !lastName || !username || !password || !gender || !dateOfBirth || !nic || !contactNumber || !email || !address) {
            Alert.alert('Incomplete entries', 'Please enter required data', [
                {
                    text: 'OK',
                    style: 'cancel',
                },
            ]);
            return;
        } else {
            register(firstName, lastName, username, password, gender, dateOfBirth, nic, contactNumber, email, address)
        }
    }


    return (
        <SafeAreaView style={styles.safecontainer}>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.text}>Create an Account</Text>

                <InputFeild
                    lable={'First-Name'}
                    icon={<Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
                    value={firstName}
                    onChangeText={text => setFirstName(text)}
                />

                <InputFeild
                    lable={'Last-Name'}
                    icon={<Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
                    value={lastName}
                    onChangeText={text => setLastName(text)}
                />

                <InputFeild
                    lable={'User-Name'}
                    icon={<Ionicons name="person-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
                    value={username}
                    onChangeText={text => setUsername(text)}
                />

                <InputFeild
                    lable={'Gender'}
                    value={gender}
                    onChangeText={text => setGender(text)}
                />

                <InputFeild
                    lable={'NIC'}
                    icon={<AntDesign name='idcard' size={20} color="#666" style={{ marginRight: 5 }} />}
                    value={nic}
                    onChangeText={text => setNic(text)}
                />

                <InputFeild
                    lable={'Email address'}
                    icon={<MaterialIcons name="alternate-email" size={20} color="#666" style={{ marginRight: 5 }} />}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />

                <InputFeild
                    lable={'Password'}
                    icon={<Ionicons name="lock-closed-outline" size={20} color="#666" style={{ marginRight: 5 }} />}
                    inputType="password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                />

                <View style={styles.dateFeild}>
                    <Ionicons name="calendar-number-outline" size={20} color="#666" style={{ marginRight: 5 }} />
                    <Pressable onPress={showDatePicker} style={{ flex: 1 }}>
                        <TextInput
                            fontSize={18}
                            placeholder='Date of Birth'
                            value={dateOfBirth}
                            onChangeText={setDateOfBirth}
                            editable={false}
                            // style={styles.textInput}
                            style={styles.dateSelected}
                        />
                    </Pressable>

                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    display='spinner'
                />

                <InputFeild
                    lable={'Contact Number'}
                    icon={<Ionicons name='call-outline' size={20} color="#666" style={{ marginRight: 5 }} />}
                    value={contactNumber}
                    onChangeText={text => setContactNumber(text)}
                />

                <InputFeild
                    lable={'Address'}
                    value={address}
                    onChangeText={text => setAddress(text)}
                />

                <TouchableOpacity onPress={() => {handleRegister(firstName, lastName, username, password, gender, dateOfBirth, nic, contactNumber, email, address)}}>
                    <Text style={[styles.registerButton, , dynamicStyles.button]}>Register</Text>
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
    // dateText: {
    //     color: "#999999",
    //     fontSize: 20
    // },
    registerButton: {
        padding: 8,
        borderColor: "black",
        borderWidth: 2,
        marginTop: 80,
        marginBottom: 30,
        borderRadius: 10,
        textAlign: "center",
        ...color.theamBlue,
        color: "white",
        fontSize: 24,
        fontWeight: "450"
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

})