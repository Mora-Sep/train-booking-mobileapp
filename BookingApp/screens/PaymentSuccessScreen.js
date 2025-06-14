import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ETicket from "../components/ETicket";
import { BookingContext } from '../context/BookingContext'; 
import { color } from '../styles/Color';

export default function PaymentSuccessScreen({ navigation }) {
    const { resetBookingDetails } = useContext(BookingContext); 

    const handleNavigate = () => {
        resetBookingDetails(); 
        navigation.navigate('Home'); 
    };

    return (
        <View style={styles.container}>
            <ETicket />
            <TouchableOpacity onPress={handleNavigate} style={styles.navigationButton}>
                <Text style={styles.navigationText}>Go To Dashboard</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#dadef5",
        flex: 1
    },
    navigationButton: {
        marginTop: 20,
        padding: 15,
        ...color.theamBlue,
        borderRadius: 5
    },
    navigationText: {
        color: "white",
        fontSize: 17,
        textAlign: "center",
        fontWeight: "bold"
    }
});
