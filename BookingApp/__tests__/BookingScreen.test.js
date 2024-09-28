import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import BookingScreen from '../screens/BookingScreen';
import { BookingContext } from '../context/BookingContext';
import axios from 'axios';

// Mock axios
jest.mock('axios');

const mockedNavigate = jest.fn();

const mockBookingDetails = {
    fromStation: 'Colombo',
    toStation: 'Kandy',
    departureDate: '2024-09-01',
    tripType: 'One Way',
    numPassengers: 2,
    selectedTrain: null,
};

const mockTrainData = [
    {
        ID: 1,
        trainName: 'Intercity Express',
        departureDateAndTime: '2024-09-01 08:00 AM',
        arrivalDateAndTime: '2024-09-01 10:00 AM',
        seatReservations: [
            { class: 'First Class', totalCount: 20 },
            { class: 'Second Class', totalCount: 30 }
        ],
    },
];

// Mock navigation prop
const mockNavigation = {
    setOptions: jest.fn(),
    navigate: mockedNavigate,
    goBack: jest.fn(),
};

describe('BookingScreen - One Way', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render the booking details and make an API call to fetch train data for a one-way trip', async () => {
        // Mock axios get response
        axios.get.mockResolvedValueOnce({ data: mockTrainData });

        const { getByText } = render(
            <BookingContext.Provider value={{ bookingDetails: mockBookingDetails, setBookingDetails: jest.fn() }}>
                <BookingScreen navigation={mockNavigation} />
            </BookingContext.Provider>
        );

        // Check if the one-way trip booking details are rendered
        expect(getByText('From Station: Colombo')).toBeTruthy();
        expect(getByText('To Station: Kandy')).toBeTruthy();
        expect(getByText('Departure Date: 2024-09-01')).toBeTruthy();
        expect(getByText('No of Passengers: 2')).toBeTruthy();

        // Wait for the train data to load and render
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
        expect(getByText('Train Name: Intercity Express')).toBeTruthy();
    });

    it('should display a message when no trains are available for the one-way trip', async () => {
        // Mock axios get response with no data
        axios.get.mockResolvedValueOnce({ data: [] });

        const { getByText } = render(
            <BookingContext.Provider value={{ bookingDetails: mockBookingDetails, setBookingDetails: jest.fn() }}>
                <BookingScreen navigation={mockNavigation} />
            </BookingContext.Provider>
        );

        // Wait for the no trains message
        await waitFor(() => expect(getByText('No trains available for the selected criteria.')).toBeTruthy());
    });

    it('should allow the user to select a train and proceed for a one-way trip', async () => {
        // Mock axios get response
        axios.get.mockResolvedValueOnce({ data: mockTrainData });

        const mockSetBookingDetails = jest.fn();

        const { getByText } = render(
            <BookingContext.Provider value={{ bookingDetails: mockBookingDetails, setBookingDetails: mockSetBookingDetails }}>
                <BookingScreen navigation={mockNavigation} />
            </BookingContext.Provider>
        );

        // Wait for the train data to load and render
        await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

        // Simulate user selecting a train and proceeding
        fireEvent.press(getByText('Proceed'));

        expect(mockSetBookingDetails).toHaveBeenCalledWith({
            ...mockBookingDetails,
            selectedTrain: mockTrainData[0],
        });

        // Verify that the navigation to the DetailsScreen is triggered
        expect(mockedNavigate).toHaveBeenCalledWith('DetailsScreen');
    });
});