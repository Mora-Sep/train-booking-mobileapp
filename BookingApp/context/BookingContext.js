import React, { createContext, useState } from 'react'


export const BookingContext = createContext()

export const BookingProvider = ({ children }) => {
    const [bookingDetails, setBookingDetails] = useState({
        fromStation: '',
        toStation: '',
        departureDate: '',
        returnDate: '',
        numPassengers: '',
        selectedClass: '',
        selectedTrain: {},
        selectedSeats: [],
        tripType: 'One Way'
    })

    const contextValue = {bookingDetails,setBookingDetails}

    return(
        <BookingContext.Provider value={contextValue}>
            {children}
        </BookingContext.Provider>
    );
}