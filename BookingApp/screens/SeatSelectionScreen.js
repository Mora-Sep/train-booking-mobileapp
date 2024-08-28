import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { BookingContext } from "../context/BookingContext";
import FirstClassSeatLayout from '../components/FirstClassSeatLayout';
import SecondClassSeatLayout from '../components/SecondClassSeatLayout';
import ThirdClassSeatLayout from '../components/ThirdClassSeatLayout';

const seatData = {
  1: [ // 1st Class
    { cart: 1, seats: Array.from({ length: 40 }, (_, index) => ({ number: index + 1, status: 0 })) },
    { cart: 2, seats: Array.from({ length: 40 }, (_, index) => ({ number: index + 1, status: 0 })) },
    { cart: 3, seats: Array.from({ length: 40 }, (_, index) => ({ number: index + 1, status: 0 })) },
  ],
  2: [ // 2nd Class
    { cart: 1, seats: Array.from({ length: 50 }, (_, index) => ({ number: index + 1, status: 0 })) },
    { cart: 2, seats: Array.from({ length: 40 }, (_, index) => ({ number: index + 1, status: 0 })) },
    { cart: 3, seats: Array.from({ length: 40 }, (_, index) => ({ number: index + 1, status: 0 })) },
  ],
  3: [ // 3rd Class
    { cart: 1, seats: Array.from({ length: 40 }, (_, index) => ({ number: index + 1, status: 0 })) },
    { cart: 2, seats: Array.from({ length: 40 }, (_, index) => ({ number: index + 1, status: 0 })) },
    { cart: 3, seats: Array.from({ length: 40 }, (_, index) => ({ number: index + 1, status: 0 })) },
    { cart: 4, seats: Array.from({ length: 40 }, (_, index) => ({ number: index + 1, status: 0 })) },
    { cart: 5, seats: Array.from({ length: 40 }, (_, index) => ({ number: index + 1, status: 0 })) },
  ],
};

// Example of booked seats
const bookedSeats = [
  { class: 1, cart: 1, number: 5 },
  { class: 2, cart: 2, number: 10 },
  { class: 3, cart: 3, number: 15 },
];

const SeatSelectionScreen = ({ navigation }) => {

  const { bookingDetails, setBookingDetails } = useContext(BookingContext)
  const TrainName = bookingDetails.selectedTrain.trainName
  const [currentClass, setCurrentClass] = useState(1)
  const [currentCart, setCurrentCart] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const updatedSeats = { ...seatData };
    bookedSeats.forEach(({ class: cls, cart, number }) => {
      const cartIndex = updatedSeats[cls].findIndex(c => c.cart === cart);
      if (cartIndex !== -1) {
        const seatIndex = updatedSeats[cls][cartIndex].seats.findIndex(s => s.number === number);
        if (seatIndex !== -1) {
          updatedSeats[cls][cartIndex].seats[seatIndex].status = 1; // 1 for booked
        }
      }
    });
  }, []);

  const handleSeatSelection = (seat, cart) => {
    setSelectedSeats(prevSeats => {
      const isAlreadySelected = prevSeats.some(
        s => s.cart === cart && s.number === seat.number && s.class === currentClass
      );

      let updatedSeats;

      if (isAlreadySelected) {
        // Remove the seat from the selected seats if it's already selected
        updatedSeats = prevSeats.filter(
          s => !(s.cart === cart && s.number === seat.number && s.class === currentClass)
        );
      } else {
        // Add the seat to the selected seats
        updatedSeats = [...prevSeats, { cart, number: seat.number, class: currentClass }];
      }

      return updatedSeats;
    });
  };

  // Use an effect to update the BookingContext when selectedSeats changes
  useEffect(() => {
    setBookingDetails(prevDetails => ({
      ...prevDetails,
      selectedSeats
    }));
  }, [selectedSeats]);


  const handleNextCart = () => setCurrentCart(prevCart => prevCart + 1);
  const handlePrevCart = () => setCurrentCart(prevCart => prevCart - 1);

  const getSeatLayout = () => {
    const data = seatData[currentClass];
    switch (currentClass) {
      case 1:
        return (
          <FirstClassSeatLayout
            seats={data}
            onSeatSelect={handleSeatSelection}
            selectedSeats={selectedSeats.filter(s => s.class === 1)}
            currentCart={currentCart}
            onNextCart={handleNextCart}
            onPrevCart={handlePrevCart}
          />
        );
      case 2:
        return (
          <SecondClassSeatLayout
            seats={data}
            onSeatSelect={handleSeatSelection}
            selectedSeats={selectedSeats.filter(s => s.class === 2)}
            currentCart={currentCart}
            onNextCart={handleNextCart}
            onPrevCart={handlePrevCart}
          />
        );
      case 3:
        return (
          <ThirdClassSeatLayout
            seats={data}
            onSeatSelect={handleSeatSelection}
            selectedSeats={selectedSeats.filter(s => s.class === 3)}
            currentCart={currentCart}
            onNextCart={handleNextCart}
            onPrevCart={handlePrevCart}
          />
        );
      default:
        return null;
    }
  };


  const classPrices = { 1: 150, 2: 100, 3: 50 };

  // Calculate total price
  const totalPrice = selectedSeats.reduce((total, seat) => {
    return total + classPrices[seat.class];
  }, 0);

  return (

    <View style={styles.container}>
      <ScrollView style={styles.mainContent}>
        <Text style={styles.trainName}>{TrainName}</Text>
        <View style={styles.classSelection}>
          <TouchableOpacity
            style={[styles.classButton, currentClass === 1 && styles.selectedClassButton]}
            onPress={() => {
              setCurrentClass(1);
              setCurrentCart(1);
            }}
          >
            <Text style={styles.classButtonText}>1st Class</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.classButton, currentClass === 2 && styles.selectedClassButton]}
            onPress={() => {
              setCurrentClass(2);
              setCurrentCart(1);
            }}
          >
            <Text style={styles.classButtonText}>2nd Class</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.classButton, currentClass === 3 && styles.selectedClassButton]}
            onPress={() => {
              setCurrentClass(3);
              setCurrentCart(1);
            }}
          >
            <Text style={styles.classButtonText}>3rd Class</Text>
          </TouchableOpacity>
        </View>
        {getSeatLayout()}

        <Text style={styles.selectedSeatsTitle}>Selected Seats:</Text>
        {selectedSeats.length > 0 ? (
          <View>
            {selectedSeats.map((seat, index) => (
              <View key={index} style={styles.selectedSeatRow}>
                <Text style={styles.selectedSeatText}>
                  {seat.class === 1 ? '1C' : seat.class === 2 ? '2C' : '3C'}
                </Text>
                <Text style={styles.selectedSeatText}>{seat.cart}</Text>
                <Text style={styles.selectedSeatText}>{seat.number}</Text>
                <Text style={styles.selectedSeatText}>LKR {classPrices[seat.class]}</Text>
              </View>
            ))}
            <Text style={styles.totalPriceText}>Total: LKR {totalPrice}</Text>
            <TouchableOpacity style={styles.buyButton} onPress={() => navigation.navigate('PaymentScreen', {totalPrice})}>
              <Text style={styles.buyButtonText}>Buy Selected Seats</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.noSeatsText}>No seats selected</Text>
        )}

      </ScrollView>


    </View>

  )
}

export default SeatSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  mainContent: {
    // flex: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  trainName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 20,
  },
  classSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  classButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#e5e7eb',
    borderRadius: 5,
  },
  selectedClassButton: {
    backgroundColor: '#3b82f6',
  },
  classButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  seatLayoutContainer: {
    flex: 1,
  },
  cartNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cartButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#1f2937',
    borderRadius: 5,
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: '#9ca3af',
  },
  cartText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  seat: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  availableSeat: {
    backgroundColor: '#10b981',
  },
  bookedSeat: {
    backgroundColor: '#ef4444',
  },
  selectedSeat: {
    backgroundColor: '#fbbf24',
  },
  emptySpace: {
    backgroundColor: 'transparent',
  },
  sidebar: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
  },
  selectedSeatsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1f2937',
  },
  selectedSeatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  selectedSeatText: {
    fontSize: 16,
    color: '#1f2937',
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#1f2937',
  },
  buyButton: {
    marginTop: 20,
    backgroundColor: '#3b82f6',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 15
  },
  buyButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noSeatsText: {
    color: '#9ca3af',
    fontSize: 16,
    marginBottom: 15
  },
});
