import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL } from "../config";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [details, setDetails] = useState(null);

    const login = async (username, password) => {
        setIsLoading(true);
        try {
            const res = await axios.post(`${BASE_URL}/users/login`, {
                username,
                password
            });

            let userInfo = res.data;

            if (userInfo && userInfo.token) {
                setUserInfo(userInfo);
                setUserToken(userInfo.token);

                await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                await AsyncStorage.setItem('userToken', userInfo.token);

                // console.log('User info:', userInfo);
                // console.log('User token:', userInfo.token);

                await profileDetails(userInfo.token);
            } else {
                Alert.alert('Invalid username or password', 'Please check your username and password.', [
                    {
                        text: 'OK',
                        style: 'cancel',
                    },
                ]);
            }
        } catch (e) {
            console.log(`Login error: ${e}`);
            Alert.alert('Login Error', 'Something went wrong. Please try again.', [
                { text: 'OK', style: 'cancel' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (
        firstName,
        lastName,
        username,
        password,
        gender,
        birthday,
        nic,
        contactNumber,
        email,
        address
    ) => {
        setIsLoading(true);
        try {
            const res = await axios.post(`${BASE_URL}/users/register`, {
                firstName,
                lastName,
                username,
                password,
                gender,
                birthday,
                nic,
                contactNumber,
                email,
                address
            });

            let registerInfo = res.data;
            // console.log("Register info:", registerInfo);

            // Directly log in after successful registration
            if (registerInfo && registerInfo.message) {
                await login(username, password);
                // console.log("Registered and logged in with new credentials");
            } else {
                Alert.alert('Registration Failed', 'Please try again later.', [
                    { text: 'OK', style: 'cancel' },
                ]);
            }
        } catch (e) {
            // console.log(`Register error: ${e}`);
            Alert.alert('Primary key reserved', 'change username, check NIC, contact number and email.', [
                { text: 'OK', style: 'cancel' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await AsyncStorage.removeItem('userInfo');
            await AsyncStorage.removeItem('userToken');
            setUserToken(null);
            setUserInfo(null);
        } catch (e) {
            // console.log(`Logout error: ${e}`);
        } finally {
            setIsLoading(false);
        }
    };

    const profileDetails = async (token) => {
        try {
            const res = await axios.get(`${BASE_URL}/users/details`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            let details = res.data;
            setDetails(details);
            // console.log('Profile details:', details);
        } catch (e) {
            // console.log(`Details error: ${e}`);
        }
    };

    const isLoggedIn = async () => {
        setIsLoading(true);
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');

            if (userInfo && userToken) {
                userInfo = JSON.parse(userInfo);
                setUserToken(userToken);
                setUserInfo(userInfo);
                await profileDetails(userToken);
            }
        } catch (e) {
            // console.log(`isLoggedIn error: ${e}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, register, isLoading, userToken, details, setDetails }}>
            {children}
        </AuthContext.Provider>
    );
};
