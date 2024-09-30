import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { BookingContext } from "../context/BookingContext";
import FirstClassSeatLayout from '../components/FirstClassSeatLayout';
import SecondClassSeatLayout from '../components/SecondClassSeatLayout';
import ThirdClassSeatLayout from '../components/ThirdClassSeatLayout';
import { BASE_URL } from '../config';

const SeatSelectionScreen = ({ navigation }) => {

  const { bookingDetails} = useContext(BookingContext)

  const [currentClass, setCurrentClass] = useState(1)
  const [currentCart, setCurrentCart] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatData, setSeatData] = useState({});  

  const TrainName = bookingDetails.selectedTrain.trainName
  const trainID = bookingDetails.selectedTrain.ID
  const departureTime = bookingDetails.selectedTrain.departureDateAndTime
  const arrivalTime = bookingDetails.selectedTrain.arrivalDateAndTime
  const originName = bookingDetails.fromStation
  const destinationName = bookingDetails.toStation
  const departureDate = bookingDetails.departureDate

  const firstClassPrice = parseInt(bookingDetails.selectedTrain.prices[0].price, 10);
  const secondClassPrice = parseInt(bookingDetails.selectedTrain.prices[1].price, 10);
  const thirdClassPrice = parseInt(bookingDetails.selectedTrain.prices[2].price, 10);

  const classPrices = { 1: firstClassPrice, 2: secondClassPrice, 3: thirdClassPrice };

  useEffect(() => {
    const fetchBookedSeats = async () => {
      try {
        const response = await fetch(`${BASE_URL}/booking/get/seats?from=${originName}&to=${destinationName}&frequency=${departureDate}&id=${trainID}`);
        if (!response.ok) {
          throw new Error('Failed to fetch booked seats');
        }
        const data = await response.json();
        processBookedSeats(data);
      } catch (error) {
        console.error('Error fetching seats:', error);
      }
    };

    fetchBookedSeats();
  }, [originName, destinationName, trainID, BASE_URL, departureDate]);

  const processBookedSeats = (data) => {
    const updatedSeatData = {
      1: generateSeatData(bookingDetails.selectedTrain.seatReservations[0]),
      2: generateSeatData(bookingDetails.selectedTrain.seatReservations[1]),
      3: generateSeatData(bookingDetails.selectedTrain.seatReservations[2]),
    };

    data.forEach((classData, classIndex) => {
      classData.forEach((cartData, cartIndex) => {
        cartData.forEach(seatNumber => {
          const cart = updatedSeatData[classIndex + 1][cartIndex];
          const seat = cart.seats.find(seat => seat.number === seatNumber);
          if (seat) {
            seat.status = 1; // Mark as booked
          }
        });
      });
    });

    setSeatData(updatedSeatData);
  };

  const generateSeatData = (seatReservation) => {
    const { totalCarts, totalCount } = seatReservation;
    let seatData = [];
    let seatNumber = 1;

    for (let cartIndex = 0; cartIndex < totalCarts; cartIndex++) {
      const seatsPerCart = Math.ceil(totalCount / totalCarts);
      const cartSeats = [];

      for (let seatIndex = 0; seatIndex < seatsPerCart; seatIndex++) {
        cartSeats.push({
          number: seatNumber++,
          status: 0
        });
      }

      seatData.push({
        cart: cartIndex + 1,
        seats: cartSeats
      });
    }

    return seatData;
  };

  const handleSeatSelection = (seat, cart) => {
    setSelectedSeats(prevSeats => {
      const isAlreadySelected = prevSeats.some(
        s => s.cart === cart && s.number === seat.number && s.class === currentClass
      );
      if (isAlreadySelected) {
        return prevSeats.filter(
          s => !(s.cart === cart && s.number === seat.number && s.class === currentClass)
        );
      } else {
        return [...prevSeats, { cart, number: seat.number, class: currentClass }];
      }
    });
  };

  const handleNextCart = () => setCurrentCart(prevCart => prevCart + 1);
  const handlePrevCart = () => setCurrentCart(prevCart => prevCart - 1);

  const getSeatLayout = () => {
    const data = seatData[currentClass];
    if (!data) {
      return <Text>Loading seat layout...</Text>;
    }

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

  const totalPrice = selectedSeats.reduce((total, seat) => total + classPrices[seat.class], 0);

  const handleProceedToCheckout = () => {
    navigation.navigate('PaymentScreen', {
      selectedSeats,
      totalPrice,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.main}>
        <View style={styles.trainInfo}>
          <Text style={styles.trainName}>{TrainName}</Text>
          <View style={styles.routeInfo}>
            <Text style={styles.routeText}>{originName}</Text>
            <Text style={styles.routeText}>{destinationName}</Text>
          </View>
          <View style={styles.timeInfo}>
            <Text style={styles.timeText}>Departure: {departureTime}</Text>
            <Text style={styles.timeText}>Arrival: {arrivalTime}</Text>
          </View>
        </View>

        <View style={styles.classSelector}>
          {['1st Class', '2nd Class', '3rd Class'].map((label, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.classButton, currentClass === idx + 1 ? styles.selectedClass : null]}
              onPress={() => {
                setCurrentClass(idx + 1);
                setCurrentCart(1);
              }}
            >
              <Text style={styles.classText}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {getSeatLayout()}

        <Text style={styles.selectedSeatsTitle}>Selected Seats:</Text>
        <View>
          {selectedSeats.map((seat, index) => (
            <View key={index} style={styles.seatRow}>
              <Text>{seat.class}C</Text>
              <Text>Cart {seat.cart}</Text>
              <Text>Seat {seat.number}</Text>
              <Text>Price: {classPrices[seat.class]} LKR</Text>
            </View>
          ))}
        </View>
        <Text style={styles.totalPriceText}>Total Price: {totalPrice} LKR</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleProceedToCheckout}
          disabled={selectedSeats.length === 0}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
        </TouchableOpacity>

      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    padding: 10,
  },
  main: {
    flex: 4,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  trainInfo: {
    alignItems: 'center',
    marginBottom: 10,
  },
  trainName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  trainImage: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  routeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  routeText: {
    fontSize: 18,
    color: '#3B82F6',
  },
  timeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 14,
    color: '#6B7280',
  },
  classSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  classButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#E5E7EB',
  },
  selectedClass: {
    backgroundColor: '#3B82F6',
  },
  classText: {
    color: '#fff',
  },
  selectedSeatsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: '#3B82F6',
    padding: 10,
    borderRadius: 5,
    marginBottom:15
  },
  checkoutText: {
    color: '#fff',
    textAlign: 'center',
  },
  noSeatsText: {
    color: '#9ca3af',
    fontSize: 16,
    marginBottom: 15
  }
});

export default SeatSelectionScreen;