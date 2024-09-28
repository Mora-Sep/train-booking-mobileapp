import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { BookingContext } from '../context/BookingContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { BASE_URL } from '../config';

export default function BookingScreen({ navigation }) {
    const { bookingDetails, setBookingDetails } = useContext(BookingContext);
    const [traindata, setTraindata] = useState([]);

    const { fromStation, toStation, departureDate, returnDate, tripType } = bookingDetails;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: "Select Your Train",
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
            headerLeft: () => (
                <Ionicons
                    name="chevron-back" size={40}
                    color="white"
                    style={{ marginLeft: 20 }}
                    onPress={() => navigation.goBack()}
                />
            )
        });
    }, []);

    useEffect(() => {
        const fetchTrainData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/booking/search`, {
                    params: {
                        from: fromStation,
                        to: toStation,
                        frequency: departureDate,
                        returnDate: tripType === 'Round Trip' ? returnDate : undefined,
                    },
                });
                // setTraindata(response.data);
                if (Array.isArray(response.data)) {
                    // Filter out any null or undefined items
                    const validTrains = response.data.filter(train => train && train.ID);
                    setTraindata(validTrains);
                } else {
                    console.error("Unexpected API response structure:", response.data);
                    setTraindata([]); // Set to empty array to prevent errors
                }
            } catch (error) {
                console.error("Error fetching train data:", error);
                setTraindata([]);
            }
        };
        fetchTrainData();
    }, [fromStation, toStation, departureDate, returnDate, tripType]);

    const handleProceed = (train) => {
        setBookingDetails({ ...bookingDetails, selectedTrain: train });
        navigation.navigate('DetailsScreen');
    };

    // Render each train item
    const renderTrainItem = ({ item }) => (
        <View style={styles.cardContainer}>
            <Text style={styles.cardText}>Train ID: {item.ID}</Text>
            <Text style={styles.cardText}>Train Name: {item.trainName}</Text>
            <Text style={styles.cardText}>Departure Time: {item.departureDateAndTime}</Text>
            <Text style={styles.cardText}>Arrival Time: {item.arrivalDateAndTime}</Text>
            <Text style={styles.cardText}>Classes:</Text>
            {item.seatReservations.map((classItem, index) => (
                <View key={index} style={styles.classContainer}>
                    <Text>Class Type: {classItem.class}</Text>
                    <Text>Available Seats: {classItem.totalCount}</Text>
                </View>
            ))}
            <Pressable onPress={() => handleProceed(item)} style={styles.proceedButton}>
                <Text style={styles.proceedButtonText}>Proceed</Text>
            </Pressable>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>From Station: {fromStation}</Text>
            <Text style={styles.headingText}>To Station: {toStation}</Text>
            <Text style={styles.headingText}>Departure Date: {departureDate}</Text>
            {tripType === 'Round Trip' && <Text style={styles.headingText}>Return Date: {returnDate}</Text>}
            <Text style={styles.headingText}>No of Passengers: {bookingDetails.numPassengers}</Text>

            <FlatList
                data={traindata}
                renderItem={renderTrainItem}
                keyExtractor={item => item.ID.toString()}
                ListEmptyComponent={<Text>No trains available for the selected criteria.</Text>}
                style={styles.flatList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#dadef5",
    },
    headingText: {
        fontSize: 15,
        fontWeight: "bold",
    },
    cardContainer: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: "white",
    },
    cardText: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: "600",
    },
    classContainer: {
        marginLeft: 20,
        marginBottom: 10,
    },
    proceedButton: {
        backgroundColor: "#26457C",
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 10,
        borderRadius: 10,
    },
    proceedButtonText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
    },
    flatList: {
        marginTop: 20,
        width: '100%',
    },
});
