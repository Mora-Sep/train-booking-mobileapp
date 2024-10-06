import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config";

export default function BookingHistory({ navigation }) {

    const { userToken } = useContext(AuthContext);
    const [history, setHistory] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Booking History",
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontSize: 24,
                fontWeight: "400",
                color: "white",
            },
            headerStyle: {
                height: 110,
                backgroundColor: "#26457C",
                borderBottomColor: "transparent",
                shadowColor: "transparent"
            },
        });
    }, [navigation]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/booking/user/search/tickets`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                setHistory(response.data || []);
                // console.log(history);
            } catch (error) {
                console.error("fetching history error: ", error);
            }
        };
        fetchHistory();
    }, [userToken]);

    const groupByBookingRefID = (history) => {
        if (!Array.isArray(history)) return {};  
        return history.reduce((acc, ticket) => {
            const refID = ticket.bookingRefID;
            if (!acc[refID]) {
                acc[refID] = [];
            }
            acc[refID].push(ticket);
            return acc;
        }, {});
    };

    const groupedHistory = groupByBookingRefID(history);

    return (
        <ScrollView style={styles.container}>
            {Object.keys(groupedHistory).map(bookingRefID => (
                <View key={bookingRefID} style={styles.bookingContainer}>
                    <Text style={styles.bookingRefID}>Booking Ref: {bookingRefID}</Text>
                    {groupedHistory[bookingRefID].map(ticket => (
                        <View key={ticket.ticketNumber} style={styles.ticketContainer}>
                            <Text style={styles.ticketText}>Ticket #{ticket.ticketNumber}</Text>
                            <Text>Passenger: {ticket.passenger}</Text>
                            <Text>Origin: {ticket.origin}</Text>
                            <Text>Destination: {ticket.destination}</Text>
                            <Text>Departure Time: {ticket.departureTime}</Text>
                            <Text>Class: {ticket.class}</Text>
                            <Text>Status: {ticket.status}</Text>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.cancelBookingButton}>
                        <Text style={styles.cancelBookingText}>Cancel Booking</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#dadef5",
    },
    bookingContainer: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    bookingRefID: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    ticketContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        paddingBottom: 10,
        marginBottom: 10,
    },
    ticketText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    cancelBookingButton: {
        backgroundColor: "#26457C",
        alignItems: "center",
        borderRadius: 10
    },
    cancelBookingText: {
        color: "white",
        padding: 10,
        fontWeight: "bold",
        fontSize: 18
    }
});
