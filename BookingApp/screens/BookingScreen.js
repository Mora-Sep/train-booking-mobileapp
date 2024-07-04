import React, { useContext, useLayoutEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { BookingContext } from '../context/BookingContext';
import { trainData } from '../modal/Data';
import { color } from '../styles/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function BookingScreen({ navigation }) {
    const { bookingDetails } = useContext(BookingContext);

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

    const filteredTrains = trainData.filter(train =>
        train.startingStation === bookingDetails.fromStation &&
        train.endingStation === bookingDetails.toStation &&
        train.date === bookingDetails.departureDate
    );



    const filteredTrainsforRoundTrip = trainData.filter(train => {
        const isDepartureTrip = (
            train.startingStation === bookingDetails.fromStation &&
            train.endingStation === bookingDetails.toStation &&
            train.date === bookingDetails.departureDate
        );

        const matchingReturnTrain = trainData.find(returnTrain =>
            returnTrain.startingStation === bookingDetails.toStation &&
            returnTrain.endingStation === bookingDetails.fromStation &&
            returnTrain.date === bookingDetails.returnDate &&
            returnTrain.trainName === train.trainName
        );

        return isDepartureTrip && matchingReturnTrain;
    });

    const renderTrainItem = ({ item }) => (
        <View style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderColor: '#ccc', backgroundColor: "white" }}>
            <Text style={styles.cardText}>Train ID: {item.trainId}</Text>
            <Text style={styles.cardText}>Train Name: {item.trainName}</Text>
            <Text style={styles.cardText}>Departure Time: {item.departureTime}</Text>
            <Text style={styles.cardText}>Arrival Time: {item.arrivalTime}</Text>
            <Text style={styles.cardText}>Classes:</Text>
            {item.classes.map((classItem, index) => (
                <View key={index} style={{ marginLeft: 20, marginBottom: 10 }}>
                    <Text>Class Type          :    {classItem.classType}</Text>
                    <Text>Price                    :     Rs. {classItem.price}</Text>
                    <Text>Available Seats  :    {classItem.availableSeats}</Text>
                </View>
            ))}
            <Pressable onPress={() => navigation.navigate("DetailsScreen")} style={{ ...color.theamBlue, paddingTop: 10, paddingBottom: 10, marginTop: 10, borderRadius: 10 }}>
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, color: "white" }}>Proceed</Text>
            </Pressable>
        </View>
    );

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: "#dadef5" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%" }}>
                <Text style={styles.headingText}>From Station: {bookingDetails.fromStation}</Text>
                <Text style={styles.headingText}>To Station: {bookingDetails.toStation}</Text>
            </View>
            <Text style={styles.headingText}>Departure Date: {bookingDetails.departureDate}</Text>
            {bookingDetails.tripType === 'Round Trip' && <Text style={styles.headingText}>Return Date: {bookingDetails.returnDate}</Text>}
            <Text style={styles.headingText}>No of Passengers: {bookingDetails.numPassengers}</Text>

            {bookingDetails.tripType === 'One Way' ? (
                <FlatList
                    data={filteredTrains}
                    renderItem={renderTrainItem}
                    keyExtractor={item => item.trainId.toString()}
                    ListEmptyComponent={<Text>No trains available for the selected criteria.</Text>}
                    style={{ marginTop: 20, width: '100%' }}
                />
            ) : (
                <FlatList
                    data={filteredTrainsforRoundTrip}
                    renderItem={renderTrainItem}
                    keyExtractor={item => item.trainId.toString()}
                    ListEmptyComponent={<Text>No trains available for the selected criteria.</Text>}
                    style={{ marginTop: 20, width: '100%' }}
                />
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    headingText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    cardText: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: "600"
    }
})
