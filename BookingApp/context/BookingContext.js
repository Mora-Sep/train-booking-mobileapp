import React, { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const initialBookingDetails = {
        fromStation: '',
        toStation: '',
        departureDate: '',
        returnDate: '',
        numPassengers: '',
        passengerType: 'General',
        selectedClass: '',
        selectedTrain: {},
        selectedSeats: [],
        tripType: 'One Way'
    };

    const [bookingDetails, setBookingDetails] = useState(initialBookingDetails);

    // Function to reset booking details to initial values
    const resetBookingDetails = () => {
        setBookingDetails(initialBookingDetails);
    };

    const contextValue = {
        bookingDetails,
        setBookingDetails,
        resetBookingDetails 
    };

    return (
        <BookingContext.Provider value={contextValue}>
            {children}
        </BookingContext.Provider>
    );
};
