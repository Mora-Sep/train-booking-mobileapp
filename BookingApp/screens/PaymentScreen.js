import React, { useState } from 'react';
import { Button, View, Text, ActivityIndicator, Alert } from 'react-native';
import { StripeProvider, useStripe } from '@stripe/stripe-react-native';
import { BASE_URL } from '../config';

const PaymentScreen = ({navigation}) => {
  // Hardcode the bookingRefID for now
  const bookingRefID = 'CSPW5OO20NYH'; // Replace with any test reference ID
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentIntentClientSecret = async () => {
    try {
      // Fetch the payment intent client secret using a GET request
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
      merchantDisplayName: 'trainticketbooking', // Replace with your chosen name
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
      // Alert.alert('Success', 'Payment successful!');
      // Perform post-payment actions here (e.g., navigate to a confirmation screen)
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
      <View style={{ padding: 20, flex: 1, justifyContent: 'center', backgroundColor: "#dadef5" }}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>Pay for your booking</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Pay Now" onPress={handlePayPress}/>
        )}
      </View>
    </StripeProvider>
  );
};

export default PaymentScreen;