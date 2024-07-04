import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BottomTab from './BottomTab';
import { BookingProvider } from '../context/BookingContext';
import BookingScreen from '../screens/BookingScreen';
import TrainDetails from '../screens/TrainDetails';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <BookingProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={BottomTab} />
        {/* <Stack.Screen name='Profile' component={ProfileScreen} /> */}
        <Stack.Screen name='Booking' component={BookingScreen}/>
        <Stack.Screen name='DetailsScreen' component={TrainDetails}/>
      </Stack.Navigator>
    </BookingProvider>
  )
}

export default AppStack
