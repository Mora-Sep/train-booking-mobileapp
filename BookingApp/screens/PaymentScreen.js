import React, { useState } from 'react';
import { Button, View, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { BASE_URL } from '../config';

const PaymentScreen = ({navigation, route}) => {

  const { selectedSeats, bookingReference, finalPrice } = route.params;

  const bookingRefID = bookingReference; 
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const response = await fetch(`${BASE_URL}/booking/get-payment-intent?bookingRefID=${bookingRefID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch client secret');
      }

      const { clientSecret } = await response.json();
      return clientSecret;
    } catch (error) {
      console.error('Error fetching payment intent client secret:', error);
      Alert.alert('Error', error.message);
      return null;
    }
  };

  const initializePaymentSheet = async () => {
    const clientSecret = await fetchPaymentIntentClientSecret();

    if (!clientSecret) {
      console.error('Failed to retrieve client secret');
      return false;
    }

    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: 'trainticketbooking', 
    });

    if (error) {
      console.error('Error initializing payment sheet:', error);
      Alert.alert('Error', error.message);
      return false;
    }

    return true;
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      console.error('Error presenting payment sheet:', error);
      Alert.alert('Payment failed', error.message);
    } else {
      navigation.navigate('PaymentSuccessScreen')
    }
  };

  const handlePayPress = async () => {
    setLoading(true);
    const initialized = await initializePaymentSheet();
    if (initialized) {
      await openPaymentSheet();
    }
    setLoading(false);
  };

  return (
    <StripeProvider publishableKey="pk_test_51Q3h2fGgM5IeGXpnCy4JDcSIl2Bsx5KvF80XipMjKXJ3Sg6cRgvfBZQFlVV0iPQDx9X46RpRLIADSk3cMAdp1I5G008R6cV6Pb">
      <View style={{ padding: 20, backgroundColor: "#dadef5", flex:1}}>
        <Text style={{fontSize:20, fontWeight:"bold", marginBottom:20}}>Booking Summary:</Text>
        {selectedSeats.map((seat, index) => (
          <View key={index} style={styles.seatRow}>
            <Text>{seat.class}Class</Text>
            <Text>Cart {seat.cart}</Text>
            <Text>Seat {seat.number}</Text>
          </View>
        ))}
      <Text style={styles.totalPriceText}>Total Price: {finalPrice} LKR</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Pay Now" onPress={handlePayPress} />
      )}
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  seatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    marginBottom:50
  }
});

export default PaymentScreen;