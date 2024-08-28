import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BottomTab from './BottomTab';
import { BookingProvider } from '../context/BookingContext';
import BookingScreen from '../screens/BookingScreen';
import TrainDetails from '../screens/TrainDetails';
import SeatSelectionScreen from '../screens/SeatSelectionScreen';
import ConditionsScreen from '../screens/ConditionsScreen';
import PaymentScreen from '../screens/PaymentScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <BookingProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={BottomTab} />
        {/* <Stack.Screen name='Profile' component={ProfileScreen} /> */}
        <Stack.Screen name='Booking' component={BookingScreen}/>
        <Stack.Screen name='DetailsScreen' component={TrainDetails}/>
        <Stack.Screen name='SeatSelection' component={SeatSelectionScreen}/>
        <Stack.Screen name='Conditions' component={ConditionsScreen}/>
        <Stack.Screen name='PaymentScreen' component={PaymentScreen}/>
      </Stack.Navigator>
    </BookingProvider>
  )
}

export default AppStack
