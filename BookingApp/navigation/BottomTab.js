import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from '../screens/HomeScreen';
import OfferScreen from '../screens/OfferScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BookingHistory from '../screens/BookingHistory';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {backgroundColor: '#26457C', paddingBottom: 5, paddingTop: 10},
            tabBarInactiveTintColor: '#adadad',
            tabBarActiveTintColor: 'white',
        }}>
            <Tab.Screen
                name="Home1"
                component={HomeScreen}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name='home' color={color} size={size} />;
                    }
                }}
            />
            <Tab.Screen
                name="History"
                component={BookingHistory}
                options={{
                    tabBarLabel: "History",
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialIcons name='book-online' color={color} size={size} />;
                    }
                }}
            />
            <Tab.Screen
                name='Offers'
                component={OfferScreen}
                options={{
                    tabBarLabel: "Offers",
                    tabBarIcon: ({ color, size }) => {
                        return <MaterialIcons name='celebration' color={color} size={size} />;
                    }
                }}
            />
            <Tab.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => {
                        return <Feather name='user' color={color} size={size} />;
                    }
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomTab;
