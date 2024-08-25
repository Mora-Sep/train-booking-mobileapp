import React, { useContext, useEffect, useLayoutEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, TextInput, Pressable, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { BookingContext } from "../context/BookingContext";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { color } from "../styles/Color";

export default function TrainDetails({ navigation }) {

    const { bookingDetails, setBookingDetails } = useContext(BookingContext)

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 40, marginBottom: 10 }}>
                <Ionicons name="chevron-back" size={40} color="#26457C" style={{ marginLeft: 20 }} onPress={() => navigation.goBack()} />
                <Text style={{ color: "#26457C", fontSize: 26, fontWeight: "bold" }}>Train Details</Text>
            </View>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={{ backgroundColor: "#26457C", borderRadius: 15, paddingHorizontal: 15, paddingBottom: 20 }}>
                        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", textAlign: "center", paddingTop: 15 }}>{bookingDetails.selectedTrain.trainName}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 20 }}>
                            <Text style={{ color: "white", fontSize: 15 }}>From :  {bookingDetails.fromStation}</Text>
                            <Text style={{ color: "white", fontSize: 15 }}>{bookingDetails.selectedTrain.departureTime}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 10 }}>
                            <Text style={{ color: "white", fontSize: 15 }}>To :  {bookingDetails.toStation}</Text>
                            <Text style={{ color: "white", fontSize: 15 }}>{bookingDetails.selectedTrain.arrivalTime}</Text>
                        </View>
                    </View>
                </View>

                <View style={{ borderWidth: 3, paddingHorizontal: 20, paddingVertical: 15, borderColor: "#26457C", borderRadius: 5 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                        <View style={{ gap: 5 }}>
                            <Text>Date :</Text>
                            <Text style={{ borderWidth: 1, padding: 5, paddingHorizontal: 30, borderColor: "#6e6e6e" }}>{bookingDetails.departureDate}</Text>
                        </View>
                        <View style={{ gap: 5 }}>
                            <Text>Departure Time:</Text>
                            <Text style={{ borderWidth: 1, padding: 5, paddingHorizontal: 30, borderColor: "#6e6e6e" }}>{bookingDetails.selectedTrain.departureDateAndTime}</Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ gap: 5, marginBottom: 30 }}>
                            <Text>Travellers :</Text>
                            <Text style={{ borderWidth: 1, padding: 5, paddingHorizontal: 30, borderColor: "#6e6e6e" }}>{bookingDetails.passengerType}</Text>
                        </View>
                        <View style={{ gap: 5 }}>
                            <Text>Return Time :</Text>
                            <Text style={{ borderWidth: 1, padding: 5, paddingHorizontal: 30, borderColor: "#6e6e6e" }}>{bookingDetails.selectedTrain.arrivalDateAndTime}</Text>
                        </View>
                    </View>
                </View>

                <View style={{flexDirection: "row", justifyContent:"space-between", marginTop: 100}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home1')} style={{ paddingTop: 10, paddingBottom: 10, marginTop: 10, borderRadius: 10, borderColor:"#26457C", borderWidth: 1 }}>
                        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, color: "#26457C", paddingHorizontal:25 }}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('SeatSelection')} style={{ ...color.theamBlue, paddingTop: 10, paddingBottom: 10, marginTop: 10, borderRadius: 10 }}>
                        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, color: "white", paddingHorizontal:25 }}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        paddingTop: 30,
        flex: 1
    },
    scrollContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: "#dadef5"
    },
    container: {
        paddingBottom: 20,
    }
})